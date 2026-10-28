# Angular

An Angular 22 single page app with standalone components, signals and the router, built
with the Angular CLI and served as static files by nginx. There is no Node.js server at
runtime, so it starts instantly and uses very little memory.

## Run locally

Needs Node.js 24.

```sh
npm install
npm run dev               # http://localhost:4200 with hot reload
npm run build             # writes the site to dist/
```

Tests: `npm test` (builds and checks the output). CLI usage analytics are turned off in
`angular.json`.

## Deploy on Grro

Pick **Angular** in the Grro template catalogue, or create a project from
`https://github.com/grro-cloud/starters` with path `angular` and the `base` builder.
Grro builds it with Paketo Web Servers. `project.toml` tells it to run `npm run build`,
then serve `dist/` with nginx on `$PORT`. Unknown paths fall back to `index.html`
(`BP_WEB_SERVER_ENABLE_PUSH_STATE`), so Angular routes work on page reload.
Health check: `/healthz`, a static file in `public/`.

The `Procfile` fills in the nginx config the buildpack generates (port and paths), writes it
to `/tmp` and starts nginx, so the site runs under any user id with a read only app folder.
`BPE_OVERRIDE_EXECD_CONF` in `project.toml` switches off the buildpack's own in place rewrite.

Environment variables: `PORT` (set by Grro). The app reads nothing at runtime; settings
that differ per deploy belong in `src/environments` at build time or come from your API.

## Where to edit

- `src/app/home.ts`: the home page.
- `src/app/app.routes.ts`: routes.
- `src/styles.css`: global styles.
- `public/`: files copied as is, including `healthz`.
- `angular.json` and `project.toml`: build and nginx settings.

## Use this folder on its own

```sh
npx degit grro-cloud/starters/angular my-app
```
