# Discord bot

A Discord bot built with discord.js on Node.js 24. It registers a `/ping` slash command every
time it starts and answers it. A tiny HTTP server answers `/healthz` so Grro can check that the
process is up.

## Run locally

Needs Node.js 24 and an application from the
[Discord developer portal](https://discord.com/developers/applications):

1. Create an application. Copy the **Application ID** (this is `DISCORD_CLIENT_ID`).
2. Under **Bot**, reset and copy the token (this is `DISCORD_TOKEN`).
3. Invite the bot with the OAuth2 URL generator, scopes `bot` and `applications.commands`.

```sh
npm install
DISCORD_TOKEN=... DISCORD_CLIENT_ID=... PORT=8080 npm start
```

Type `/ping` in your server. Tests: `npm test` (no token needed).

## Deploy on Grro

Pick **Discord bot** in the Grro template catalogue, or create a project from
`https://github.com/grrocloud/starters` with path `discord-bot` and the `base` builder.
Grro builds it with Paketo Node.js and runs `npm start` (`node main.js`). Health check: `/healthz`.

Set scaling to **minScale 1 and maxScale 1**. The bot keeps a gateway connection open, so it
must not scale to zero, and two copies would answer every command twice.

| Variable | Required | What it does |
| --- | --- | --- |
| `DISCORD_TOKEN` | yes | Bot token. |
| `DISCORD_CLIENT_ID` | yes | Application ID, used to register slash commands. |
| `DISCORD_GUILD_ID` | no | Register commands in one server only. Changes show up instantly there, while global commands can take a while. |
| `PORT` | set by Grro | Port for the health server, default 8080. |

The app exits if a required variable is missing. If login fails (wrong token, network), the error
is logged and it retries with a growing delay. `GET /` shows the bot state.

## Where to edit

- `commands.js`: slash commands. Add an object with `data` and `execute` to add one.
- `main.js`: startup, command registration and login.
- `health.js`: the health server.

## Use this folder on its own

```sh
npx degit grrocloud/starters/discord-bot my-bot
```
