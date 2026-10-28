# React Router

A React Router 8 app in framework mode (what used to be Remix), with React 19 and TypeScript.
Pages are rendered on the server by `react-router-serve`, so loaders, actions and resource
routes all work.

## Run locally

Needs Node.js 24.

```sh
npm install
npm run dev               # http://localhost:5173 with hot reload
npm run build && PORT=8080 npm start
```

Tests: `npm test` (type checks, builds, starts the server and calls it).

## Deploy on Grro

Pick **React Router** in the Grro template catalogue, or create a project from
`https://github.com/grro-cloud/starters` with path `react-router` and the `base` builder.
Grro builds it with Paketo Node.js: `project.toml` makes it run `npm run build`, and
`npm start` runs `react-router-serve ./build/server/index.js`, which listens on `$PORT`.
Health check: `/healthz`.

Environment variables: `PORT` (set by Grro). Read your own settings with `process.env`
inside loaders and actions; they run on the server only.

## Where to edit

- `app/routes.ts`: the list of routes.
- `app/routes/home.tsx`: the home page and its server loader.
- `app/routes/api.hello.ts`: a JSON resource route. `app/routes/healthz.ts`: the health check.
- `app/root.tsx`: the HTML shell and error page. `app/app.css`: styles.
- `public/`: files served as is.

## Use this folder on its own

```sh
npx degit grro-cloud/starters/react-router my-app
```
