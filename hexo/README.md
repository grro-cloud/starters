# Hexo

A Hexo 8 blog with the default Landscape theme, one post and one page. `hexo generate` turns the
Markdown into static files that nginx serves.

## Run locally

Needs Node.js 24.

```sh
npm install
npm run server            # http://localhost:4000
npx hexo new "My post"    # new file in source/_posts/
```

Tests: `npm test` (generates the site and checks the output).

## Deploy on Grro

Pick **Hexo** in the Grro template catalogue, or create a project from
`https://github.com/grrocloud/starters` with path `hexo` and the `base` builder.
Grro builds it with Paketo Web Servers: `project.toml` runs `npm run build` (`hexo generate`)
and serves `public/` with nginx on `$PORT`. Health check: `/healthz`, a static file in `source/`.

The `Procfile` fills in the nginx config the buildpack generates (port and paths), writes it
to `/tmp` and starts nginx, so the site runs under any user id with a read only app folder.
`BPE_OVERRIDE_EXECD_CONF` in `project.toml` switches off the buildpack's own in place rewrite.

Environment variables: `PORT` (set by Grro). Nothing is read at runtime.

## Where to edit

- `_config.yml`: site title, author, `url` (set it to your domain) and permalinks.
- `_config.landscape.yml`: theme options. Install another theme with npm and set `theme:` to use it.
- `source/_posts/`: blog posts. `source/about/`: an example page.
- `scaffolds/`: templates used by `hexo new`.

## Use this folder on its own

```sh
npx degit grrocloud/starters/hexo my-blog
```
