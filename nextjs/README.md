# Next.js

A Next.js 16 app (App Router, TypeScript) with one page, one API route and a health check.
Telemetry is turned off in every script and at build time.

## Run locally

Needs Node.js 24.

```sh
npm install
npm run dev            # http://localhost:3000
npm run build && PORT=8080 npm start
```

Tests: `npm test` (builds, starts the production server and calls it).

## Deploy on Grro

Pick **Next.js** in the Grro template catalogue, or create a project from
`https://github.com/grro-cloud/starters` with path `nextjs` and the `base` builder.
Grro builds it with Paketo Node.js: `project.toml` sets `BP_NODE_RUN_SCRIPTS=build` so
`next build` runs during the build, then `npm start` runs `next start -H 0.0.0.0 -p $PORT`.
Health check: `/healthz`.

Environment variables: `PORT` (set by Grro, defaults to 8080). Nothing else is required.
`NEXT_PUBLIC_*` variables are baked in at build time, so put them in `project.toml` as
`[[io.buildpacks.build.env]]` entries if you need them.

On Grro the app folder is not writable at runtime (only `/tmp` is), so Next.js cannot keep its
on disk caches there, such as revalidated (ISR) pages or optimized images. Static and dynamic pages
work as usual. If you rely on ISR, configure a custom cache handler.

## Where to edit

- `app/page.tsx`: the home page. Add folders under `app/` for more pages.
- `app/api/hello/route.ts`: an API route.
- `app/healthz/route.ts`: the health check.
- `next.config.ts`: Next.js settings. It widens the Turbopack root when `node_modules` is a link
  to another folder, which is how the buildpack lays it out. Keep that part.

The `build` script sets `NODE_ENV=production` on purpose: the buildpack installs dev dependencies
with `NODE_ENV=development`, and `next build` fails to prerender with that value.

## Use this folder on its own

```sh
npx degit grro-cloud/starters/nextjs my-app
```
