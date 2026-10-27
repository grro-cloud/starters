import { createServer } from "node:http";

// Tiny HTTP server so Grro has something to health check.
// GET /healthz answers 200 while the process is up. GET / shows the bot state.
export function startHealthServer(port, getState) {
  const server = createServer((req, res) => {
    const path = new URL(req.url ?? "/", "http://localhost").pathname;
    if (path === "/healthz") {
      res.writeHead(200, { "content-type": "text/plain" });
      return res.end("ok");
    }
    if (path === "/") {
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify({ message: "Telegram bot running on Grro", bot: getState() }));
    }
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
  });
  server.listen(port, "0.0.0.0", () => console.log(`Health server on http://0.0.0.0:${port}`));
  return server;
}
