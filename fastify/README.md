# Fastify

A small Fastify 5 server for Node.js 24. It serves a static landing page from `public/`,
a JSON endpoint with a validated query string, and a health check.

## Run locally

Needs Node.js 24.

```sh
npm install
PORT=8080 npm run dev
```

Open http://localhost:8080. Tests: `npm test` (they use `app.inject`, so no port is opened).

## Deploy on Grro

Pick **Fastify** in the Grro template catalogue, or create a project from
`https://github.com/grro-cloud/starters` with path `fastify` and the `base` builder.
Grro builds it with Paketo Node.js and runs `npm start` (`node server.js`). Health check: `/healthz`.

Environment variables: `PORT` (set by Grro, defaults to 8080). Nothing else is required.

## Where to edit

- `app.js`: routes, schemas and plugins.
- `public/`: static files, including the landing page.
- `server.js`: starts the server on `$PORT` and logs requests.
- `package.json`: dependencies and the Node.js version (`engines`).

## Use this folder on its own

```sh
npx degit grro-cloud/starters/fastify my-app
```
