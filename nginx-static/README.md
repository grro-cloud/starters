# Static site (nginx)

Plain HTML and CSS served by nginx. No build step, no dependencies, no JavaScript.
The smallest thing you can put on Grro.

## Run locally

Any static file server works, for example:

```sh
python3 -m http.server 8080 --directory public
```

Smoke test: `./smoke.sh`.

## Deploy on Grro

Pick **Static site** in the Grro template catalogue, or create a project from
`https://github.com/grrocloud/starters` with path `nginx-static` and the `base` builder.
Grro builds it with Paketo Web Servers. `project.toml` sets `BP_WEB_SERVER=nginx` and
`BP_WEB_SERVER_ROOT=public`, and the buildpack writes an nginx config that listens on `$PORT`.
Health check: `/healthz`, a static file that says `ok`.

The `Procfile` fills in the nginx config the buildpack generates (port and paths), writes it
to `/tmp` and starts nginx, so the site runs under any user id with a read only app folder.
`BPE_OVERRIDE_EXECD_CONF` in `project.toml` switches off the buildpack's own in place rewrite.

Environment variables: `PORT` (set by Grro). Nothing else.

If you need your own nginx settings (redirects, headers), add an `nginx.conf` next to
`project.toml` and remove `BP_WEB_SERVER` and `BP_WEB_SERVER_ROOT` from `project.toml`.
Use `{{port}}` for the listen port and `{{ tempDir }}` for temp paths; the `Procfile` fills
them in.

## Where to edit

- `public/`: every file here is served as is.
- `project.toml`: nginx settings.
- `Procfile`: starts nginx. You rarely need to touch it.

## Use this folder on its own

```sh
npx degit grrocloud/starters/nginx-static my-site
```
