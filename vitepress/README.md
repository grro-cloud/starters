# VitePress

A documentation site built with VitePress: a home page, two guide pages, a sidebar and local
search. It builds to static files that nginx serves.

## Run locally

Needs Node.js 24.

```sh
npm install
npm run dev               # http://localhost:5173
npm run build && npm run preview
```

Tests: `npm test` (builds and checks the output).

## Deploy on Grro

Pick **VitePress** in the Grro template catalogue, or create a project from
`https://github.com/grrocloud/starters` with path `vitepress` and the `base` builder.
Grro builds it with Paketo Web Servers: `project.toml` runs `npm run build` and serves
`docs/.vitepress/dist` with nginx on `$PORT`. Health check: `/healthz`, a static file in
`docs/public/`.

The `Procfile` fills in the nginx config the buildpack generates (port and paths), writes it
to `/tmp` and starts nginx, so the site runs under any user id with a read only app folder.
`BPE_OVERRIDE_EXECD_CONF` in `project.toml` switches off the buildpack's own in place rewrite.

Environment variables: `PORT` (set by Grro). Nothing is read at runtime.

## Where to edit

- `docs/`: one Markdown file per page. `docs/index.md` is the home page.
- `docs/.vitepress/config.mts`: title, navigation, sidebar and search.
- `docs/public/`: files copied as is, including `healthz`.

`package.json` overrides Vite to 6.4.5 because VitePress 1.6.4 ships with Vite 5, which has
open advisories for its dev server. Drop the override once VitePress 2 is stable.

## Use this folder on its own

```sh
npx degit grrocloud/starters/vitepress my-docs
```
