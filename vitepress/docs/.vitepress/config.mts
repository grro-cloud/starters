import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Docs on Grro",
  description: "A VitePress documentation site running on Grro",
  lastUpdated: false,
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/getting-started" },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting started", link: "/guide/getting-started" },
          { text: "Writing pages", link: "/guide/writing-pages" },
        ],
      },
    ],
    search: { provider: "local" },
    footer: { message: "Running on Grro" },
  },
});
