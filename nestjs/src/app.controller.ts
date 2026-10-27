import { Controller, Get, Header, Query } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  @Header("Content-Type", "text/html; charset=utf-8")
  index(): string {
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>NestJS on Grro</title>
  <style>body{font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem;line-height:1.5}</style>
</head>
<body>
  <h1>NestJS is running on Grro</h1>
  <p>Edit <code>src/app.controller.ts</code> to change this page. Try <a href="/api/hello?name=Ada">/api/hello</a>.</p>
</body>
</html>`;
  }

  @Get("healthz")
  healthz() {
    return { status: "ok" };
  }

  @Get("api/hello")
  hello(@Query("name") name = "there") {
    return { message: `Hello ${name}, from NestJS on Grro.` };
  }
}
