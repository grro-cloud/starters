// Starts the production server (run "npm run build" first) and checks the main routes.
import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";

const freePort = () =>
  new Promise((resolve) => {
    const s = createServer().listen(0, "127.0.0.1", () => {
      const { port } = s.address();
      s.close(() => resolve(port));
    });
  });

let proc;
let base;

before(async () => {
  const port = await freePort();
  base = `http://127.0.0.1:${port}`;
  proc = spawn("npm", ["start"], { env: { ...process.env, PORT: String(port) }, stdio: "ignore" });
  for (let i = 0; i < 100; i++) {
    try {
      if ((await fetch(`${base}/healthz`)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error("server did not start");
});

after(() => proc.kill());

test("GET /healthz returns 200", async () => {
  const res = await fetch(`${base}/healthz`);
  assert.equal(res.status, 200);
});

test("GET / says it runs on Grro", async () => {
  assert.match(await (await fetch(`${base}/`)).text(), /running on Grro/);
});

test("GET /api/hello greets", async () => {
  const body = await (await fetch(`${base}/api/hello?name=Ada`)).json();
  assert.match(body.message, /Ada/);
});
