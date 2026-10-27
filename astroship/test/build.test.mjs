// Checks the production build in dist/ (run "npm run build" first).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

test("dist/healthz exists and says ok", () => {
  assert.equal(readFileSync("dist/healthz", "utf8").trim(), "ok");
});

test("home page is built and says it runs on Grro", () => {
  const html = readFileSync("dist/index.html", "utf8");
  assert.match(html, /Marketing website done with Astro/);
  assert.match(html, /Running on <a[^>]*>Grro<\/a>/);
});

test("other pages are built", () => {
  for (const page of ["about", "blog", "pricing", "contact"]) {
    assert.ok(existsSync(`dist/${page}/index.html`), `${page} missing`);
  }
});
