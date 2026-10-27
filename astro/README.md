# Astro

A minimal Astro site with one layout, one `.astro` page and one Markdown page. It builds to plain
static files that nginx serves, so there is no server code at runtime. Astro telemetry is turned
off in every script and at build time.

## Run locally

Needs Node.js 24.

```sh
npm install
npm run dev               # http://localhost:4321
npm run build && npm run preview
```

Tests: `npm test` (builds and checks the output).

## Deploy on Grro

Pick **Astro** in the Grro template catalogue, or create a project from
`https://github.com/grro-cloud/starters` with path `astro` and the `base` builder.
Grro builds it with Paketo Web Servers: `project.toml` runs `npm run build` and serves `dist/`
with nginx on `$PORT`. Health check: `/healthz`, a static file in `public/`.

The `Procfile` fills in the nginx config the buildpack generates (port and paths), writes it
to `/tmp` and starts nginx, so the site runs under any user id with a read only app folder.
`BPE_OVERRIDE_EXECD_CONF` in `project.toml` switches off the buildpack's own in place rewrite.

Environment variables: `PORT` (set by Grro). Nothing is read at runtime. Build time values go
in `project.toml` as `[[io.buildpacks.build.env]]` entries.

## Where to edit

- `src/pages/`: one file per page (`.astro` or `.md`).
- `src/layouts/Base.astro`: the shared page shell and global styles.
- `public/`: files copied as is, including `healthz`.
- `astro.config.mjs`: Astro settings and integrations.

## Use this folder on its own

```sh
npx degit grro-cloud/starters/astro my-site
```
