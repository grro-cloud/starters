# Vue + Vite

A Vue 3 single page app in TypeScript, built with Vite and served as static files by nginx.
There is no Node.js server at runtime, so it starts instantly and uses very little memory.

## Run locally

Needs Node.js 24.

```sh
npm install
npm run dev               # http://localhost:5173 with hot reload
npm run build && npm run preview
```

Tests: `npm test` (type checks, builds and checks the output).

## Deploy on Grro

Pick **Vue with Vite** in the Grro template catalogue, or create a project from
`https://github.com/grro-cloud/starters` with path `vue-vite` and the `base` builder.
Grro builds it with Paketo Web Servers. `project.toml` tells it to run `npm run build`,
then serve `dist/` with nginx on `$PORT`. Unknown paths fall back to `index.html`
(`BP_WEB_SERVER_ENABLE_PUSH_STATE`), so Vue Router in history mode works.
Health check: `/healthz`, a static file in `public/`.

The `Procfile` fills in the nginx config the buildpack generates (port and paths), writes it
to `/tmp` and starts nginx, so the site runs under any user id with a read only app folder.
`BPE_OVERRIDE_EXECD_CONF` in `project.toml` switches off the buildpack's own in place rewrite.

Environment variables: `PORT` (set by Grro). The app reads nothing at runtime. `VITE_*`
variables are baked in at build time; add them to `project.toml` as `[[io.buildpacks.build.env]]`
entries if you need them.

## Where to edit

- `src/App.vue`: the page.
- `src/style.css`: styles.
- `public/`: files copied as is, including `healthz`.
- `project.toml`: build and nginx settings.

## Use this folder on its own

```sh
npx degit grro-cloud/starters/vue-vite my-app
```
