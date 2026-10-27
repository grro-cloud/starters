import { Hono } from "hono";
import { html } from "hono/html";

export const app = new Hono();

app.get("/healthz", (c) => c.json({ status: "ok" }));

app.get("/", (c) =>
  c.html(html`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Hono on Grro</title>
        <style>body{font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem;line-height:1.5}</style>
      </head>
      <body>
        <h1>Hono is running on Grro</h1>
        <p>Edit <code>src/app.ts</code> to change this page. Try <a href="/api/hello?name=Ada">/api/hello</a>.</p>
      </body>
    </html>`),
);

app.get("/api/hello", (c) => {
  const name = c.req.query("name") ?? "there";
  return c.json({ message: `Hello ${name}, from Hono on Grro.` });
});
