---
sidebar_position: 3
---

# Deploying

Grro builds this site with Cloud Native Buildpacks. `project.toml` tells the build to run
`npm run build`, which writes static HTML to `build/`, and then serves that folder with
nginx. There is no Node.js server at runtime.

Push to the connected branch and Grro rebuilds and redeploys the site. The health check is
`/healthz`, a small file in `static/`.

Before you share the site, set `url` in `docusaurus.config.ts` to its public address so the
sitemap and canonical links are right.
