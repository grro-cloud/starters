# Hono

A Hono app in TypeScript running on Node.js 24 through `@hono/node-server`. TypeScript is compiled
with `tsc` at build time, so the running app is plain JavaScript and starts fast.

## Run locally

Needs Node.js 24.

```sh
npm install
npm run build
PORT=8080 npm start
```

`npm run dev` rebuilds and restarts on changes. Tests: `npm test`.

## Deploy on Grro

Pick **Hono** in the Grro template catalogue, or create a project from
`https://github.com/grrocloud/starters` with path `hono` and the `base` builder.
Grro builds it with Paketo Node.js. `project.toml` sets `BP_NODE_RUN_SCRIPTS=build`, so `tsc`
runs during the build, then `npm start` runs `node dist/server.js`. Health check: `/healthz`.

Environment variables: `PORT` (set by Grro, defaults to 8080). Nothing else is required.

## Where to edit

- `src/app.ts`: routes.
- `src/server.ts`: starts the server on `$PORT`.
- `src/app.test.ts`: tests that call the app without opening a port.
- `package.json`: dependencies and the Node.js version (`engines`).

## Use this folder on its own

```sh
npx degit grrocloud/starters/hono my-app
```
