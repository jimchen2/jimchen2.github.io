## Deploy

```sh
# configure .env
docker run -d --restart always -p 3069:3000 jimchen2/linktree:latest
```

## Build

```sh
# add Dockerfile
docker build --no-cache -t jimchen2/linktree .
```