import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  const port = Number(process.env.PORT ?? 8080);
  await app.listen(port, "0.0.0.0");
  console.log(`Listening on http://0.0.0.0:${port}`);
}

bootstrap();
