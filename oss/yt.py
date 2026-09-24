#!/usr/bin/env python3
"""
yt.py - A stripped-down YouTube video downloader (pure stdlib).

Distilled from yt-dlp (https://github.com/yt-dlp/yt-dlp) down to only the
parts needed to download a YouTube video. It mirrors this yt-dlp flow:

  1. Parse the video ID                    (extractor/youtube/_video.py)
  2. Grab INNERTUBE_API_KEY from the       (extractor/youtube/_base.py:
     watch page's ytcfg blob                 _download_ytcfg/_extract_ytcfg)
  3. POST to the Innertube `player` API    (extractor/youtube/_video.py:
     with a mobile client context            _extract_player_response)
  4. Read direct stream URLs from          (extractor/youtube/_video.py)
     streamingData.formats/adaptiveFormats
  5. Download with plain HTTP              (downloader/http.py)

Everything else (playlists, channels, HLS/DASH manifests, SABR, JS signature
decryption, n-challenge, PO tokens, subtitles, thumbnails, metadata, 100s of
other sites, ffmpeg merging...) is stripped away.

Usage:
  yt.py <url-or-id>            # download best progressive (muxed) MP4
  yt.py <url> -F               # list available formats
  yt.py <url> -f ITAG          # download a specific format by itag
  yt.py <url> -o out.mp4       # custom output filename
"""
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

CLIENTS = [
    {
        'clientName': 'ANDROID',
        'clientVersion': '21.26.364',
        'androidSdkVersion': 30,
        'osName': 'Android',
        'osVersion': '11',
        'userAgent': 'com.google.android.youtube/21.26.364 (Linux; U; Android 11) gzip',
        'clientNameId': '3',
    },
    {
        'clientName': 'IOS',
        'clientVersion': '21.26.4',
        'deviceMake': 'Apple',
        'deviceModel': 'iPhone16,2',
        'userAgent': 'com.google.ios.youtube/21.26.4 (iPhone16,2; U; CPU iOS 18_3_2 like Mac OS X;)',
        'clientNameId': '5',
    },
    {
        'clientName': 'VISIONOS',
        'clientVersion': '1.02',
        'deviceMake': 'Apple',
        'deviceModel': 'RealityDevice17,1',
        'userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 15_7_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15',
        'osName': 'visionOS',
        'osVersion': '26.5.23O471',
        'clientNameId': '101',
    },
]


def http_get(url, headers=None):
    req = urllib.request.Request(url, headers=headers or {})
    return urllib.request.urlopen(req, timeout=30)


def extract_video_id(url):
    m = re.fullmatch(r'([\w-]{11})(?:\?\S*)?', url)
    if m:
        return m.group(1)
    m = re.search(
        r'(?:youtube\.com/(?:watch\?[^#]*v=|shorts/|embed/|live/)|youtu\.be/)'
        r'([\w-]{11})', url)
    if m:
        return m.group(1)
    sys.exit(f'error: could not extract a video ID from {url!r}')


def get_api_key(video_id):
    page = http_get(
        f'https://www.youtube.com/watch?v={video_id}',
        headers={'User-Agent': CLIENTS[-1]['userAgent']},
    ).read().decode('utf-8', 'replace')
    m = re.search(r'"INNERTUBE_API_KEY":"([^"]+)"', page)
    if not m:
        sys.exit('error: INNERTUBE_API_KEY not found on watch page')
    api_key = m.group(1)
    print(f'innertube api key: {api_key}')
    return api_key


def request_player(video_id, api_key):
    best, fmts, seen = None, [], set()
    last_error = 'no playable formats'
    for client in CLIENTS:
        print(f'\n--- querying innertube client: {client["clientName"]} ---')
        context = {k: v for k, v in client.items()
                   if k not in ('userAgent', 'clientNameId')}
        payload = {
            'context': {'client': context},
            'videoId': video_id,
            'playbackContext': {'contentPlaybackContext': {
                'html5Preference': 'HTML5_PREF_WANTS'}},
            'contentCheckOk': True,
            'racyCheckOk': True,
        }
        body = json.dumps(payload).encode()
        url = (f'https://www.youtube.com/youtubei/v1/player'
               f'?key={api_key}&prettyPrint=false')
        
        print(f'post url: {url}')
        print(f'post payload (summary): videoId={video_id}, client={client["clientName"]}')

        req = urllib.request.Request(url, data=body, headers={
            'Content-Type': 'application/json',
            'X-YouTube-Client-Name': client['clientNameId'],
            'X-YouTube-Client-Version': client['clientVersion'],
            'User-Agent': client['userAgent'],
        })
        try:
            data = json.load(urllib.request.urlopen(req, timeout=30))
        except (urllib.error.URLError, ValueError) as e:
            last_error = f'{client["clientName"]} request failed: {e}'
            print(f'request error: {last_error}')
            continue

        status = data.get('playabilityStatus', {})
        print(f'playability status: {status.get("status")}')
        
        # Display response preview
        keys = list(data.keys())
        print(f'json blob keys received: {keys}')
        if 'streamingData' in data:
            fmts_count = len(data['streamingData'].get('formats', []))
            adapt_count = len(data['streamingData'].get('adaptiveFormats', []))
            print(f'streamingData found: {fmts_count} muxed formats, {adapt_count} adaptive formats')

        if status.get('status') != 'OK':
            last_error = (f'{client["clientName"]}: '
                          f'{status.get("reason") or status.get("status")}')
            continue
        if best is None:
            best = data
        for f in parse_formats(data, client):
            key3 = (f['itag'], f['has_audio'], bool(f['height']))
            if key3 not in seen:
                seen.add(key3)
                fmts.append(f)
    if not fmts:
        sys.exit(f'error: video not playable — {last_error}')
    print('--------------------------------------------\n')
    return best, fmts


def parse_formats(player_response, client):
    fmts = []
    sd = player_response.get('streamingData', {})
    for f in sd.get('formats', []) + sd.get('adaptiveFormats', []):
        if 'url' not in f:
            continue
        mime = f.get('mimeType', '')
        fmts.append({
            'itag': f.get('itag'),
            'url': f['url'],
            'container': mime.split(';')[0].split('/')[-1] or 'mp4',
            'codecs': (mime.partition('codecs="')[2] or '').rstrip('"'),
            'width': f.get('width'), 'height': f.get('height'),
            'fps': f.get('fps'), 'bitrate': f.get('bitrate', 0),
            'has_audio': 'audioQuality' in f or f.get('audioChannels'),
            'size': int(f.get('contentLength') or 0),
            'ua': client['userAgent'],
            'label': f.get('qualityLabel')
                     or f.get('audioQuality', '').replace('AUDIO_QUALITY_', ''),
        })
    return fmts


def human(n):
    for unit in ('B', 'KiB', 'MiB', 'GiB'):
        if n < 1024 or unit == 'GiB':
            return f'{n:.1f} {unit}'
        n /= 1024


def describe(f):
    kind = 'muxed' if f['has_audio'] and f['height'] else \
           'video' if f['height'] else 'audio'
    return (f'{f["itag"]:>4}  {f["container"]:<5} {kind:<6} '
            f'{f["label"] or "?":<8} {human(f["size"]) if f["size"] else "?":>9}  '
            f'{f["codecs"]}')


def pick_format(fmts, itag=None):
    if itag is not None:
        for f in fmts:
            if f['itag'] == itag:
                return f
        sys.exit(f'error: itag {itag} not available; use -F to list formats')
    muxed = [f for f in fmts if f['has_audio'] and f['height']]
    pool = muxed or [f for f in fmts if f['height']] or fmts
    if not muxed:
        print('warning: no muxed format found; '
              'downloading the best video-only stream (no audio)', file=sys.stderr)
    return max(pool, key=lambda f: (f['height'] or 0, f['bitrate']))


def download(fmt, out_path):
    print(f'final download link: {fmt["url"]}')
    req = urllib.request.Request(fmt['url'], headers={'User-Agent': fmt['ua']})
    with urllib.request.urlopen(req, timeout=30) as r, open(out_path, 'wb') as fp:
        total = int(r.headers.get('Content-Length') or 0)
        got = 0
        while chunk := r.read(64 * 1024):
            fp.write(chunk)
            got += len(chunk)
            if total:
                pct = got / total * 100
                print(f'\r{pct:5.1f}% of {human(total)}', end='', flush=True)
        print(f'\rsaved -> {out_path} ({human(got)})' if total else
              f'saved -> {out_path} ({human(got)})')


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('-')]
    opts = {sys.argv[i]: sys.argv[i + 1] for i in range(1, len(sys.argv) - 1)
            if sys.argv[i].startswith('-') and not sys.argv[i + 1].startswith('-')}
    if not args or '-h' in sys.argv or '--help' in sys.argv:
        sys.exit(__doc__)

    video_id = extract_video_id(args[0])
    print(f'video id: {video_id}')
    api_key = get_api_key(video_id)
    player, fmts = request_player(video_id, api_key)

    title = player.get('videoDetails', {}).get('title', video_id)
    print(f'title: {title}')
    print(f'{len(fmts)} downloadable format(s)')

    if '-F' in sys.argv:
        for f in sorted(fmts, key=lambda f: (-(f["height"] or 0), f["bitrate"])):
            print(f'{describe(f)}\n  -> {f["url"][:90]}...')
        return

    itag = int(opts['-f']) if '-f' in opts else None
    fmt = pick_format(fmts, itag)
    print('selected:', describe(fmt).strip())

    out = opts.get('-o') or re.sub(r'[\\/:*?"<>|]+', '_', title)
    if not out.lower().endswith('.' + fmt['container']):
        out += '.' + fmt['container']
    download(fmt, out)


if __name__ == '__main__':
    main()
