import { test } from "node:test";
import assert from "node:assert/strict";
import { app } from "./app.js";

const call = (path: string) => app.handle(new Request(`http://localhost${path}`));

test("GET /healthz returns 200", async () => {
  const res = await call("/healthz");
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: "ok" });
});

test("GET / says it runs on Grro", async () => {
  assert.match(await (await call("/")).text(), /running on Grro/);
});

test("GET /api/hello greets", async () => {
  const body = (await (await call("/api/hello?name=Ada")).json()) as { message: string };
  assert.match(body.message, /Ada/);
});
