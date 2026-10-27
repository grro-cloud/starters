import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { app } from "../app.js";

let server;
let base;

before(async () => {
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

test("GET /healthz returns 200", async () => {
  const res = await fetch(`${base}/healthz`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: "ok" });
});

test("GET / says it runs on Grro", async () => {
  const res = await fetch(`${base}/`);
  assert.equal(res.status, 200);
  assert.match(await res.text(), /running on Grro/);
});

test("GET /api/hello greets", async () => {
  const res = await fetch(`${base}/api/hello?name=Ada`);
  assert.match((await res.json()).message, /Ada/);
});
