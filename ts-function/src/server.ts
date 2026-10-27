// Tiny HTTP server that turns Node.js requests into web Requests and calls the handler.
// You normally do not need to edit this file.
import { createServer, type IncomingMessage } from "node:http";
import { Readable } from "node:stream";
import handler from "./handler.js";

const port = Number(process.env.PORT ?? 8080);

function toRequest(req: IncomingMessage): Request {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) value.forEach((v) => headers.append(key, v));
    else if (value !== undefined) headers.set(key, value);
  }
  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  return new Request(url, {
    method: req.method,
    headers,
    body: hasBody ? (Readable.toWeb(req) as ReadableStream) : undefined,
    duplex: "half",
  } as RequestInit);
}

const server = createServer(async (req, res) => {
  try {
    const response = await handler(toRequest(req));
    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    if (response.body && req.method !== "HEAD") {
      Readable.fromWeb(response.body as import("node:stream/web").ReadableStream).pipe(res);
    } else {
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ error: "internal error" }));
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Listening on http://0.0.0.0:${port}`);
});

// Grro sends SIGTERM before stopping the container.
process.on("SIGTERM", () => server.close(() => process.exit(0)));
