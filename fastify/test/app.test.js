import { after, test } from "node:test";
import assert from "node:assert/strict";
import { buildApp } from "../app.js";

const app = buildApp();
after(() => app.close());

test("GET /healthz returns 200", async () => {
  const res = await app.inject({ method: "GET", url: "/healthz" });
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.json(), { status: "ok" });
});

test("GET / says it runs on Grro", async () => {
  const res = await app.inject({ method: "GET", url: "/" });
  assert.equal(res.statusCode, 200);
  assert.match(res.body, /running on Grro/);
});

test("GET /api/hello greets", async () => {
  const res = await app.inject({ method: "GET", url: "/api/hello?name=Ada" });
  assert.match(res.json().message, /Ada/);
});
