import { serve } from "@hono/node-server";
import { app } from "./app.js";

const port = Number(process.env.PORT ?? 8080);

const server = serve({ fetch: app.fetch, port, hostname: "0.0.0.0" }, (info) => {
  console.log(`Listening on http://0.0.0.0:${info.port}`);
});

// Grro sends SIGTERM before stopping the container.
process.on("SIGTERM", () => server.close(() => process.exit(0)));
