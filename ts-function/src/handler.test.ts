import { test } from "node:test";
import assert from "node:assert/strict";
import handler from "./handler.js";

const call = (path: string, init?: RequestInit) => handler(new Request(`http://localhost${path}`, init));

test("GET /healthz returns 200", async () => {
  const res = await call("/healthz");
  assert.equal(res.status, 200);
});

test("GET / says it runs on Grro", async () => {
  const body = (await (await call("/?name=Ada")).json()) as { message: string };
  assert.match(body.message, /Ada.*Grro/);
});

test("POST /echo echoes the body", async () => {
  const res = await call("/echo", { method: "POST", body: "hi" });
  assert.equal(await res.text(), "hi");
});

test("unknown path is 404", async () => {
  assert.equal((await call("/nope")).status, 404);
});
