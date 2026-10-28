// Checks the production build in dist/ (run "npm run build" first).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

test("dist/healthz exists and says ok", () => {
  assert.equal(readFileSync("dist/healthz", "utf8").trim(), "ok");
});

test("dist/index.html loads the bundle", () => {
  assert.match(readFileSync("dist/index.html", "utf8"), /<script src="main-[^"]+\.js" type="module">/);
});

test("bundle contains the landing text", () => {
  const js = readdirSync("dist").filter((f) => f.endsWith(".js"));
  const all = js.map((f) => readFileSync(`dist/${f}`, "utf8")).join("");
  assert.match(all, /running on Grro/);
});
