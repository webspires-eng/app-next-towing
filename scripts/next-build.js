#!/usr/bin/env node
const path = require("node:path");

// Patch Next's build ID generator so it tolerates missing config hooks.
const buildIdModulePath = require.resolve("next/dist/build/generate-build-id.js");
const originalModule = require(buildIdModulePath);
const originalGenerateBuildId = originalModule.generateBuildId;

const patchedGenerateBuildId = (generate, fallback) => {
  const safeGenerate =
    typeof generate === "function"
      ? generate
      : () => null;
  return originalGenerateBuildId(safeGenerate, fallback);
};

require.cache[buildIdModulePath].exports = {
  __esModule: true,
  generateBuildId: patchedGenerateBuildId,
  default: patchedGenerateBuildId,
};

const userArgs = process.argv.slice(2);
const hasTurboFlag = userArgs.some(
  (arg) => arg === "--turbopack" || arg === "--turbo"
);
const cliArgs = ["build"];
if (!hasTurboFlag) {
  cliArgs.push("--turbopack");
}
cliArgs.push(...userArgs);

process.argv = [process.argv[0], path.resolve("node_modules/.bin/next"), ...cliArgs];

require("next/dist/bin/next");
