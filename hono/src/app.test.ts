import { test } from "node:test";
import assert from "node:assert/strict";
import { app } from "./app.js";

test("GET /healthz returns 200", async () => {
  const res = await app.request("/healthz");
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: "ok" });
});

test("GET / says it runs on Grro", async () => {
  const res = await app.request("/");
  assert.match(await res.text(), /running on Grro/);
});

test("GET /api/hello greets", async () => {
  const res = await app.request("/api/hello?name=Ada");
  assert.match(((await res.json()) as { message: string }).message, /Ada/);
});
