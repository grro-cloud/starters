# TypeScript function

One TypeScript function that answers HTTP requests. You write a handler that takes a standard web
`Request` and returns a `Response`. A tiny Node.js server calls it. TypeScript is compiled with
`tsc` at build time and there are no runtime dependencies.

## Run locally

Needs Node.js 24.

```sh
npm install
npm run build
PORT=8080 npm start
curl "http://localhost:8080/?name=Ada"
```

Tests: `npm test`.

## Deploy on Grro

Pick **TypeScript function** in the Grro template catalogue, or create a project from
`https://github.com/grro-cloud/starters` with path `ts-function` and the `base` builder.
Grro builds it with Paketo Node.js (`BP_NODE_RUN_SCRIPTS=build` in `project.toml` runs `tsc`),
then `npm start` runs `node dist/server.js`. Health check: `/healthz`.

Environment variables: `PORT` (set by Grro, defaults to 8080). Nothing else is required.

## Where to edit

- `src/handler.ts`: your function.
- `src/handler.test.ts`: tests.
- `src/server.ts`: the small HTTP server. You rarely need to touch it.

## Use this folder on its own

```sh
npx degit grro-cloud/starters/ts-function my-function
```
