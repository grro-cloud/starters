// @ts-check
import { defineConfig } from "astro/config";

// Static output: "astro build" writes plain files to dist/, served by nginx on Grro.
export default defineConfig({
  output: "static",
});
