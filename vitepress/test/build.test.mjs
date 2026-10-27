// Checks the production build (run "npm run build" first).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const out = "docs/.vitepress/dist";

test("healthz exists and says ok", () => {
  assert.equal(readFileSync(`${out}/healthz`, "utf8").trim(), "ok");
});

test("home page says it runs on Grro", () => {
  assert.match(readFileSync(`${out}/index.html`, "utf8"), /VitePress is running on Grro/);
});

test("guide pages are built", () => {
  assert.ok(existsSync(`${out}/guide/getting-started.html`));
  assert.ok(existsSync(`${out}/guide/writing-pages.html`));
});
