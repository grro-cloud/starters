import { buildApp } from "./app.js";

const port = Number(process.env.PORT ?? 8080);
const app = buildApp({ logger: true });

await app.listen({ port, host: "0.0.0.0" });

// Grro sends SIGTERM before stopping the container.
process.on("SIGTERM", async () => {
  await app.close();
  process.exit(0);
});
