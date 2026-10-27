import { Elysia, t } from "elysia";
import { node } from "@elysiajs/node";

const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Elysia on Grro</title>
  <style>body{font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem;line-height:1.5}</style>
</head>
<body>
  <h1>Elysia is running on Grro</h1>
  <p>Elysia on Node.js through <code>@elysiajs/node</code>. Edit <code>src/app.ts</code> to change this page.
  Try <a href="/api/hello?name=Ada">/api/hello</a>.</p>
</body>
</html>`;

export const app = new Elysia({ adapter: node() })
  .get("/", () => new Response(page, { headers: { "content-type": "text/html; charset=utf-8" } }))
  .get("/healthz", () => ({ status: "ok" }))
  .get("/api/hello", ({ query }) => ({ message: `Hello ${query.name ?? "there"}, from Elysia on Grro.` }), {
    query: t.Object({ name: t.Optional(t.String()) }),
  });
