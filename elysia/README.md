# Elysia

An Elysia app in TypeScript that runs on Node.js 24 through the official `@elysiajs/node`
adapter. Grro builds with Node.js (there is no Bun on the builder), and `tsc` compiles the code
at build time.

## Run locally

Needs Node.js 24.

```sh
npm install
npm run build
PORT=8080 npm start
```

`npm run dev` builds and restarts on changes to the output. Tests: `npm test`.

## Deploy on Grro

Pick **Elysia** in the Grro template catalogue, or create a project from
`https://github.com/grrocloud/starters` with path `elysia` and the `base` builder.
Grro builds it with Paketo Node.js (`BP_NODE_RUN_SCRIPTS=build` in `project.toml`),
then `npm start` runs `node dist/server.js`. Health check: `/healthz`.

Environment variables: `PORT` (set by Grro, defaults to 8080). Nothing else is required.

## Where to edit

- `src/app.ts`: routes and validation (`t` schemas).
- `src/server.ts`: starts the server on `$PORT`.
- `src/app.test.ts`: tests that call the app without opening a port.

Bun specific APIs (such as `Bun.file`) are not available on Node.js. Use `node:fs` instead.

## Use this folder on its own

```sh
npx degit grrocloud/starters/elysia my-app
```
