import { app } from "./app.js";

const port = Number(process.env.PORT ?? 8080);

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on http://0.0.0.0:${port}`);
});

// Grro sends SIGTERM before stopping the container.
process.on("SIGTERM", () => server.close(() => process.exit(0)));
