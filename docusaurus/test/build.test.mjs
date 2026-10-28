// Checks the production build in build/ (run "npm run build" first).
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

test("build/healthz exists and says ok", () => {
  assert.equal(readFileSync("build/healthz", "utf8").trim(), "ok");
});

test("home page is static HTML with the landing text", () => {
  assert.match(readFileSync("build/index.html", "utf8"), /running on Grro/);
});

test("every doc page is built", () => {
  for (const page of ["intro", "writing-pages", "deploying"]) {
    assert.ok(existsSync(`build/docs/${page}/index.html`) || existsSync(`build/docs/${page}.html`), page);
  }
});
