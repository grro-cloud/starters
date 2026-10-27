# Astroship

A marketing website for a startup or product: landing page, pricing, about, blog and contact
pages, built with Astro and Tailwind CSS. It builds to static files that nginx serves.

**Credit:** this is the free [Astroship](https://github.com/surjithctly/astroship) theme by
[Surjith S M](https://github.com/surjithctly) ([Web3Templates](https://web3templates.com)).
All design and content credit goes to the author. Please keep the "Made by Web3Templates" link
in the footer if you can. A Pro version is sold by the author. The hero illustration is by
[Streamline](https://www.streamlinehq.com/) ([source](https://www.figma.com/community/file/1108400791662599811)).

## License

**This folder is licensed under GPL-3.0, not MIT** like the rest of this repository, because
Astroship itself is GPL-3.0. The full text is in [`LICENSE`](./LICENSE). If you change it and
share the source with others, the GPL applies to your changes too.

Vendored from `https://github.com/surjithctly/astroship` at commit
`da1272bb141abf42a3435d81774df92f0427ad57` (2026-10-01, "upgrade to Astro v7").
Changes made by Grro Labs on 2026-10-27:

- switched from pnpm to npm, pinned exact versions in `package.json` and added `package-lock.json`
- `postcss-selector-parser` overridden to 6.1.5 (security fix, build time only)
- Node.js 24 in `engines`, removed `.npmrc` and `.vscode/`, Astro telemetry turned off in scripts
- `astro.config.mjs`: explicit static output, a placeholder `site` and Vite `preserveSymlinks`
  (needed because the buildpack links `node_modules` in from another folder)
- `public/robots.txt`: placeholder sitemap URL
- added `public/healthz`, `project.toml`, `Procfile`, `test/` and a "Running on Grro" line in the footer
- replaced the upstream README with this one

## Run locally

Needs Node.js 24.

```sh
npm install
npm run dev               # http://localhost:4321
npm run build && npm run preview
```

Tests: `npm test` (builds and checks the output).

## Deploy on Grro

Pick **Astroship** in the Grro template catalogue, or create a project from
`https://github.com/grrocloud/starters` with path `astroship` and the `base` builder.
Grro builds it with Paketo Web Servers: `project.toml` runs `npm run build` and serves `dist/`
with nginx on `$PORT`. Health check: `/healthz`.

The `Procfile` fills in the nginx config the buildpack generates (port and paths), writes it
to `/tmp` and starts nginx, so the site runs under any user id with a read only app folder.
`BPE_OVERRIDE_EXECD_CONF` in `project.toml` switches off the buildpack's own in place rewrite.

Environment variables: `PORT` (set by Grro). Nothing is read at runtime.

## Where to edit

- `astro.config.mjs`: set `site` to your domain (used for canonical URLs and the sitemap).
- `src/pages/`: pages. `src/components/`: hero, features, pricing, navbar, footer and more.
- `src/content/blog/` and `src/content/team/`: blog posts and team members in Markdown.
- `src/components/contactform.astro`: the contact form posts to Web3Forms. Put your own access
  key in it, or point it at your own endpoint.
- `public/robots.txt`: change the sitemap URL to your domain.

## Use this folder on its own

```sh
npx degit grrocloud/starters/astroship my-site
```
