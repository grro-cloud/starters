# NestJS

A minimal NestJS 12 app (one module, one controller) on Node.js 24 and Express. TypeScript is
compiled with `tsc` at build time. No Nest CLI needed.

## Run locally

Needs Node.js 24.

```sh
npm install
npm run build
PORT=8080 npm start
```

Tests: `npm test` (boots the app on a random port and calls it).

## Deploy on Grro

Pick **NestJS** in the Grro template catalogue, or create a project from
`https://github.com/grro-cloud/starters` with path `nestjs` and the `base` builder.
Grro builds it with Paketo Node.js (`BP_NODE_RUN_SCRIPTS=build` in `project.toml`),
then `npm start` runs `node dist/main.js`. Health check: `/healthz`.

Environment variables: `PORT` (set by Grro, defaults to 8080). Nothing else is required.

## Where to edit

- `src/app.controller.ts`: routes.
- `src/app.module.ts`: add controllers, providers and other modules here.
- `src/main.ts`: bootstrap and port.
- `package.json`: dependencies. `overrides` pins `multer` to a patched release until Nest picks it up.

## Use this folder on its own

```sh
npx degit grro-cloud/starters/nestjs my-api
```
