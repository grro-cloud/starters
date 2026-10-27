import { realpathSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

// On Grro the buildpack installs node_modules in a separate layer and links it into the app
// folder. Turbopack only reads files below its root, so widen the root when that is the case.
const appDir = process.cwd();
const modulesDir = realpathSync(path.join(appDir, "node_modules"));
const linkedModules = !modulesDir.startsWith(appDir + path.sep);

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: linkedModules ? { root: path.parse(appDir).root } : {},
};

export default nextConfig;
