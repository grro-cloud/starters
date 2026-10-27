# Express

A small Express 5 server for Node.js 24. It serves a static landing page from `public/`,
a JSON endpoint and a health check.

## Run locally

Needs Node.js 24.

```sh
npm install
PORT=8080 npm run dev
```

Open http://localhost:8080. Tests: `npm test`.

## Deploy on Grro

Pick **Express** in the Grro template catalogue, or create a project from
`https://github.com/grrocloud/starters` with path `express` and the `base` builder.
Grro builds it with Paketo Node.js and runs `npm start` (`node server.js`). Health check: `/healthz`.

Environment variables: `PORT` (set by Grro, defaults to 8080). Nothing else is required.

## Where to edit

- `app.js`: routes and middleware.
- `public/`: static files, including the landing page.
- `server.js`: starts the server on `$PORT`.
- `package.json`: dependencies and the Node.js version (`engines`).

## Use this folder on its own

```sh
npx degit grrocloud/starters/express my-app
```
