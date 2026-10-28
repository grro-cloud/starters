# Docusaurus

A Docusaurus 3 documentation site in TypeScript, built to static HTML and served by nginx.
Write pages in Markdown or MDX in `docs/`; the sidebar is generated from the files.
There is no Node.js server at runtime, so it starts instantly and uses very little memory.

## Run locally

Needs Node.js 24.

```sh
npm install
npm run dev               # http://localhost:3000 with hot reload
npm run build && npm run serve
```

Tests: `npm test` (type checks, builds and checks the output).

## Deploy on Grro

Pick **Docusaurus** in the Grro template catalogue, or create a project from
`https://github.com/grro-cloud/starters` with path `docusaurus` and the `base` builder.
Grro builds it with Paketo Web Servers. `project.toml` tells it to run `npm run build`,
then serve `build/` with nginx on `$PORT`. Health check: `/healthz`, a static file in `static/`.

Pages are built as `folder/index.html` and linked with a trailing slash (`trailingSlash: true`),
so nginx serves them directly. The `Procfile` fills in the nginx config the buildpack generates
(port, paths and relative redirects), writes it to `/tmp` and starts nginx, so the site runs
under any user id with a read only app folder.

Environment variables: `PORT` (set by Grro). The site reads nothing at runtime.

## Where to edit

- `docs/`: the documentation pages.
- `src/pages/index.tsx`: the home page.
- `docusaurus.config.ts`: title, navbar, footer and your site's `url`.
- `src/css/custom.css`: theme colours.
- `static/`: files copied as is, including `healthz`.

## Use this folder on its own

```sh
npx degit grro-cloud/starters/docusaurus my-docs
```
