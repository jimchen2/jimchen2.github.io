---
layout: default
title: idkwhat
nav_order: 5
---




Here is my guide to the global Internet.

> Note: This blog is written in early 2025.

## Global Websites/Platforms

### Social Media

|                | US                                               | Russia                            | EU                                      | Japan/Korea                     | Open-Source & Other                                       |
| -------------- | ------------------------------------------------ | --------------------------------- | --------------------------------------- | ------------------------------- | --------------------------------------------------------- |
| Video          | YouTube, Twitch                                  | Vk Video, Rutube                  | Stream.cz (Czech)                       | Niconico, SOOP, Naver TV        | Likee (Singapore)， PeerTube (Open-source), Aparat (Iran) |
| Chat           | Whatsapp, Discord, Facebook Messenger, Signal    | Telegram (UAE), Vk Messenger, Max | Viber (Cyprus)                          | Line, KakaoTalk                 | Matrix (Open-source)                                      |
| Micro-Blogging | X, Facebook, Instagram, Threads, Bluesky, Tumblr | Vk, Ok                            | /                                       | Mixi, BAND                      | Mastodon (Open-source), Eitaa (Iran)                      |
| Forums/Q&A     | Reddit, Quora, Hacker News                       | Pikabu, Ответы Mail               | Gutefrage (Germany), Jeuxvideo (France) | Chiebukuro, 2channel, DCinside  | Lemmy (Open-source)                                       |
| Blogging       | Medium, Substack                                 | Dzen, Habr                        | /                                       | Note.com, Naver Blog, Daum Cafe | Ghost (Open-source), Wordpress (Open-source)              |

### Utility

|                 | US                                       | Russia                                      | EU                                                                  | Japan/Korea                                       | Open-Source & Other |
| --------------- | ---------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------- | ------------------- |
| Search          | Google, Bing                             | Yandex                                      | Seznam (Czech)                                                      | Yahoo, Naver                                      | /                   |
| Cloud           | AWS, Azure, GCP, Cloudflare              | Yandex Cloud, Selectel, Timeweb, DDoS Guard | Ionos (Germany), Hetzner (Germany), Upcloud (Finland), OVH (France) | NTT, Fujitsu, Naver, Kakao, Samsung               | /                   |
| LLM             | Google Gemini, Grok, Claude, HuggingFace | Gigachat, Yandex Alice                      | Mistral AI (France)                                                 | /                                                 | /                   |
| Shopping        | Amazon, eBay                             | Ozon, Wildberries                           | Zalando (Germany)                                                   | Rakuten, Coupang                                  | /                   |
| Money           | Paypal, Google Pay                       | SberPay                                     | /                                                                   | Line Pay, Naver Pay, Kakao Pay                    | /                   |
| Mobile Provider | AT&T, Verizon, T-Mobile                  | МТС, МегаФон, Билайн                        | Deutsche Telekom (Germany), Orange (France)                         | NTT Docomo, SoftBank, KDDI, SK Telecom, KT, LG U+ | MTN Irancell (Iran) |

### Entertainment

|        | US                             | Russia                | EU                                 | Japan/Korea                           | Open-Source & Other |
| ------ | ------------------------------ | --------------------- | ---------------------------------- | ------------------------------------- | ------------------- |
| Movies | Netflix, IMDb, Rotten Tomatoes | IVI, Kinopoisk        | AlloCine (France)                  | Watcha, Naver Movie                   | /                   |
| Books  | Goodreads                      | Livelib, Яндекс книги | LovelyBooks (Germany)              | Bookmeter, Aladin                     | /                   |
| Sports | ESPN, NBC, Telemundo           | Match TV              | Kicker (Germany), Sport.cz (Czech) | NHK Sports, Naver Sports, Daum Sports | Varzesh3 (Iran)     |

### Resources

|                | US                                            | Russia                                                                                                                                                     | EU                                                   | Japan/Korea                  | Open-Source & Other                                                                                           |
| -------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Git            | Github                                        | Gitflic                                                                                                                                                    | /                                                    | /                            | Gitlab (Open-source)                                                                                          |
| Maps           | Google Maps, Apple Maps                       | Yandex Maps, 2gis                                                                                                                                          | Here Maps (Germany), Mapy.cz (Czech), Mappy (France) | Yahoo! Japan Maps, Naver Map | OpenStreetMap (Open-source)                                                                                   |
| Wiki           | Wikipedia                                     | Ruwiki                                                                                                                                                     | /                                                    | Namu (Korea)                 | EcuRed (Cuba)                                                                                                 |
| Online Courses | [IAS](https://www.youtube.com/@videosfromIAS) | [МФТИ](https://www.youtube.com/@lectory_fpmi), [МГУ](https://www.youtube.com/@teachin-ru), [EIMI](https://www.youtube.com/@eimipdmirasandchebyshevlab6366) | Carmin TV (France)                                   | /                            | [IMPA](https://www.youtube.com/@impabr), [UNAM](https://www.youtube.com/@InstitutodeMatem%C3%A1ticasdelaUNAM) |
| Tech           | / (mostly independent)                        | [Yandex ML](https://www.youtube.com/@YandexforML), [МФТИ](https://www.youtube.com/@DeepLearningSchool)                                                     | /                                                    | /                            | /                                                                                                             |
| Archive        | Internet Archive                              | /                                                                                                                                                          | archive.today (Czech)                                | /                            | Anna's Archive                                                                                                |

- Internet Archive: Many websites can be archived, for example, Wikipedia pages (since everything changes), Reddit, or YouTube channels before they delete their videos. Internet Archive has a limit of around 200 MB for files and if the webpage contains too much content it won't be able to save everything in external links.
- Extensions, Userscripts: It's basically like automatically running code in the debugging console. You can change the page layout, add keyboard shortcuts, redirect websites, etc. A popular extension is Ublock Origin
- `mp4`, `m3u8`, DASH, Torrent: Local videos use `mp4`. Many websites use `m3u8` to control streaming and quality change by dividing videos into small chunks. You can listen on the network tab to scrape the videos on most websites. YouTube uses a specific format called "DASH" and InnerTube APIs to stop scraping and you can't play YouTube videos sometimes if you have no cookies, so it's constantly a cat-and-mouse between independent developers and the platform. `yt-dlp` is an open-source tool to scrap videos from a list of popular websites. Torrent is a decentralized tool to distribute files P2P (legal or illegal). Some other relevant articles: https://en.wikipedia.org/wiki/123Movies, https://old.reddit.com/r/Piracy/wiki/megathread, https://en.wikipedia.org/wiki/RuTracker.org
- Proxy, VPN, Tor, Browser Fingerprinting: Proxy/VPNs are tools to bypass geopolitical limits, website rate limits, or simply try to be anonymous online. Some relevant websites: [clash](https://en.clash.wiki/), [proxy marketplace](https://guatizi.com/), [Github repo](https://github.com/clash-verge-rev/clash-verge-rev), [Internet censorship Wikipedia](https://zh.wikipedia.org/zh-tw/%E8%A7%84%E9%81%BF%E7%BD%91%E7%BB%9C%E5%AE%A1%E6%9F%A5), [wireguard](https://github.com/WireGuard/wireguard-go). Tor is a protocal to be anonymous online (though nothing is always anonymous) by routing through onion nodes, [see here](https://textbook.cs161.org/network/tor.html). Onion websites (many highly illegal and taboo) are only accessible through tor. If you set up tor, you can access onion websites or normal websites in a normal browser like firefox/chrome, or just conveniently through the tor browser (tor browser protects against browser fingerprinting). Browser fingerprinting is a technique to log your language settings, screen, os, hardware, useragent, timezone, etc, to "guess" who you are and when you accessed the website before, which can be surprisingly accurate, you can [check here](https://amiunique.org/).
- Politics, Violence, Fringe: They aren't onion websites, and Google removed many websites from the search result, but most are just one search away from Yandex. If you look up the DNS records, they usually use "alt-tech" platforms such as DDoS-Guard, Tencent DNSPod, Frantech Solutions, Rumble Cloud, Private Layer, Mevspace, No Ack, etc for CDN/DDoS proection, utilizing geopolitical loopholes. See: https://en.wikipedia.org/wiki/Category:Right-wing_websites (I focus on technology, and I do not endorse any fringe movements or any illegal practices beyond pirating)

> Now the tide is rolling in \
> I don't wanna win \
> Let it take me, let it take me \
> I'll be on my way \
> How long can I stay? \
> In the place that can't contain me

(I'm Tired, Song by Labrinth and Zendaya)
