# Nuxt

A Nuxt 4 app with Vue 3, rendered on the server by Nuxt's Nitro server on Node.js.
It has a page that fetches from its own API during rendering, a JSON endpoint and a health check.

## Run locally

Needs Node.js 24.

```sh
npm install
npm run dev               # http://localhost:3000 with hot reload
npm run build && PORT=8080 npm start
```

Tests: `npm test` (builds, starts the server and calls it).

## Deploy on Grro

Pick **Nuxt** in the Grro template catalogue, or create a project from
`https://github.com/grro-cloud/starters` with path `nuxt` and the `base` builder.
Grro builds it with Paketo Node.js: `project.toml` makes it run `npm run build`, and
`npm start` runs `node .output/server/index.mjs`, which listens on `$PORT`.
Health check: `/healthz`. Telemetry is turned off in `nuxt.config.ts` and at build time.

Environment variables: `PORT` (set by Grro). Nuxt reads `NUXT_*` variables at runtime into
`runtimeConfig`, so put secrets there rather than in the build.

## Where to edit

- `app/pages/index.vue`: the home page. Add files in `app/pages/` for more routes.
- `server/api/hello.get.ts`: a JSON endpoint.
- `server/routes/healthz.get.ts`: the health check.
- `public/`: files served as is.
- `nuxt.config.ts`: Nuxt settings.

## Use this folder on its own

```sh
npx degit grro-cloud/starters/nuxt my-app
```
