import "reflect-metadata";
import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import { AppModule } from "./app.module.js";

let app: INestApplication;
let base: string;

before(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication({ logger: false });
  await app.listen(0, "127.0.0.1");
  base = await app.getUrl();
});

after(() => app.close());

test("GET /healthz returns 200", async () => {
  const res = await fetch(`${base}/healthz`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: "ok" });
});

test("GET / says it runs on Grro", async () => {
  const res = await fetch(`${base}/`);
  assert.match(await res.text(), /running on Grro/);
});

test("GET /api/hello greets", async () => {
  const res = await fetch(`${base}/api/hello?name=Ada`);
  assert.match(((await res.json()) as { message: string }).message, /Ada/);
});
