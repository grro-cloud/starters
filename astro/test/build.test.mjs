// Checks the production build in dist/ (run "npm run build" first).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("dist/healthz exists and says ok", () => {
  assert.equal(readFileSync("dist/healthz", "utf8").trim(), "ok");
});

test("home page says it runs on Grro", () => {
  assert.match(readFileSync("dist/index.html", "utf8"), /running on Grro/);
});

test("markdown page is built", () => {
  assert.match(readFileSync("dist/about/index.html", "utf8"), /written in Markdown/);
});
