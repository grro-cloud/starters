# SvelteKit

A SvelteKit 3 app with Svelte 5, built with `@sveltejs/adapter-node` and run as a Node.js
server. Pages are rendered on the server, so loaders, form actions and API routes all work.

## Run locally

Needs Node.js 24.

```sh
npm install
npm run dev               # http://localhost:5173 with hot reload
npm run build && PORT=8080 npm start
```

Tests: `npm test` (type checks, builds, starts the server and calls it).

## Deploy on Grro

Pick **SvelteKit** in the Grro template catalogue, or create a project from
`https://github.com/grro-cloud/starters` with path `sveltekit` and the `base` builder.
Grro builds it with Paketo Node.js: `project.toml` makes it run `npm run build`, and
`npm start` runs `node build` on `$PORT`. Health check: `/healthz`.

The start script tells adapter-node to read the protocol and client address from the
`X-Forwarded-*` headers Grro's router sets, so `url.origin` is your real `https://` address
and form actions pass SvelteKit's cross-site check. Override `PROTOCOL_HEADER`,
`ADDRESS_HEADER` or `XFF_DEPTH` in the project's environment if you put another proxy in front.

Environment variables: `PORT` (set by Grro). Use `$env/dynamic/private` for your own
runtime secrets, so they are read when the server starts rather than baked into the build.

## Where to edit

- `src/routes/+page.svelte` and `+page.server.ts`: the home page and its server loader.
- `src/routes/api/hello/+server.ts`: a JSON endpoint.
- `src/routes/healthz/+server.ts`: the health check.
- `static/`: files served as is.
- `vite.config.ts`: SvelteKit and adapter settings.

## Use this folder on its own

```sh
npx degit grro-cloud/starters/sveltekit my-app
```
