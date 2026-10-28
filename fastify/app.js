import { fileURLToPath } from "node:url";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";

export function buildApp(opts = {}) {
  // trustProxy: Grro's router sits in front of the app and sets X-Forwarded-*.
  const app = Fastify({ trustProxy: true, ...opts });

  app.register(fastifyStatic, {
    root: fileURLToPath(new URL("./public", import.meta.url)),
  });

  app.get("/healthz", async () => ({ status: "ok" }));

  app.get(
    "/api/hello",
    {
      schema: {
        querystring: {
          type: "object",
          properties: { name: { type: "string", maxLength: 100 } },
        },
      },
    },
    async (req) => {
      const name = req.query.name ?? "there";
      return { message: `Hello ${name}, from Fastify on Grro.` };
    },
  );

  return app;
}
