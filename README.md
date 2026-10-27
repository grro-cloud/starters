# Grro starters

Small starter apps you can deploy on [Grro](https://usegrro.com) in one click from the template
catalogue. Each folder is a complete app on its own.

Every starter:

- listens on `0.0.0.0:$PORT` (8080 when `PORT` is not set) and answers `GET /healthz` with 200
- builds with Cloud Native Buildpacks (Paketo) using only its `project.toml`, no Dockerfile
- runs as any non-root user id and only writes to `/tmp`
- pins its dependencies with a lockfile and has tests or a smoke script
- sends no telemetry and contains no secrets

| Folder | What it is | Builder |
| --- | --- | --- |
| [`python-function`](python-function) | One Python `handler(request)` function, standard library server | base |
| [`fastapi`](fastapi) | FastAPI with uvicorn | base |
| [`django`](django) | Django 5.2 LTS, gunicorn, WhiteNoise, SQLite or `DATABASE_URL` | base |
| [`express`](express) | Express 5 on Node.js 24 | base |
| [`hono`](hono) | Hono in TypeScript on Node.js | base |
| [`nestjs`](nestjs) | NestJS 12 | base |
| [`nextjs`](nextjs) | Next.js 16, App Router | base |
| [`ts-function`](ts-function) | One TypeScript handler (web `Request` in, `Response` out) | base |
| [`elysia`](elysia) | Elysia on Node.js through `@elysiajs/node` | base |
| [`telegram-bot`](telegram-bot) | Telegram bot with grammY, long polling | base |
| [`discord-bot`](discord-bot) | Discord bot with discord.js and a `/ping` slash command | base |
| [`react-vite`](react-vite) | React single page app built with Vite, served by nginx | base |
| [`astro`](astro) | Astro static site, served by nginx | base |
| [`hexo`](hexo) | Hexo blog, served by nginx | base |
| [`vitepress`](vitepress) | VitePress docs site, served by nginx | base |
| [`nginx-static`](nginx-static) | Plain HTML and CSS, served by nginx | base |
| [`go-gin`](go-gin) | Go with Gin | base |
| [`spring-boot`](spring-boot) | Spring Boot 4.1 on Java 21 with Maven | base |
| [`laravel`](laravel) | Laravel 12 on PHP with nginx | full |

`base` and `full` are the Grro builders (Paketo jammy base and full). Bots need
minScale 1 and maxScale 1; everything else can scale to zero.

## Use one starter

Deploy it from the Grro catalogue, or copy one folder into a new repository:

```sh
npx degit grrocloud/starters/fastapi my-app
```

Each folder's README explains how to run it locally, how it deploys on Grro and where to edit.

## License

upstream Astroship theme it is based on (see its own `LICENSE`).
