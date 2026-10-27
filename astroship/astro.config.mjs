import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// Grro: set this to your real domain. It is used for canonical URLs,
// Open Graph tags and the sitemap.
const site = "https://example.com";

// https://astro.build/config
export default defineConfig({
  site,
  // Static output: "astro build" writes plain files to dist/, served by nginx on Grro.
  output: "static",
  integrations: [mdx(), sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
    // Grro: the buildpack links node_modules in from another folder. Keep the linked
    // paths so .astro components inside packages (astro-navbar) compile correctly.
    resolve: { preserveSymlinks: true },
  },
});
