// Checks the generated site in public/ (run "npm run build" first).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

test("public/healthz exists and says ok", () => {
  assert.equal(readFileSync("public/healthz", "utf8").trim(), "ok");
});

test("home page lists the welcome post", () => {
  const html = readFileSync("public/index.html", "utf8");
  assert.match(html, /Hexo on Grro/);
  assert.match(html, /Hello from Grro/);
});

test("post and page are generated", () => {
  assert.ok(existsSync("public/2026/10/27/hello-grro/index.html"));
  assert.ok(existsSync("public/about/index.html"));
});
