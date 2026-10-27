# Telegram bot

A Telegram bot built with grammY on Node.js 24. It uses long polling, so it needs no public
webhook URL. A tiny HTTP server answers `/healthz` so Grro can check that the process is up.

The bot replies `pong` to `/ping`, greets you on `/start` and echoes any other text.

## Run locally

Needs Node.js 24 and a bot token from [@BotFather](https://t.me/BotFather).

```sh
npm install
TELEGRAM_BOT_TOKEN=123456:ABC... PORT=8080 npm start
```

Then message your bot in Telegram. Tests: `npm test` (runs the bot against a fake Bot API
server, no token or network needed).

## Deploy on Grro

Pick **Telegram bot** in the Grro template catalogue, or create a project from
`https://github.com/grrocloud/starters` with path `telegram-bot` and the `base` builder.
Grro builds it with Paketo Node.js and runs `npm start` (`node main.js`). Health check: `/healthz`.

Set scaling to **minScale 1 and maxScale 1**. Long polling needs the process to stay up
(no scale to zero), and Telegram allows only one poller per token, so never run two copies.

| Variable | Required | What it does |
| --- | --- | --- |
| `TELEGRAM_BOT_TOKEN` | yes | Token from @BotFather. The app exits with an error if it is missing. |
| `TELEGRAM_API_ROOT` | no | Use a self-hosted Bot API server instead of `https://api.telegram.org`. |
| `PORT` | set by Grro | Port for the health server, default 8080. |

`/healthz` returns 200 while the process runs. `GET /` shows the bot state (`starting`,
`polling` or `error`). If the token is wrong or Telegram is unreachable, the error is logged and
the bot retries with a growing delay.

## Where to edit

- `bot.js`: commands and message handlers.
- `main.js`: startup, polling and shutdown.
- `health.js`: the health server.

## Use this folder on its own

```sh
npx degit grrocloud/starters/telegram-bot my-bot
```
