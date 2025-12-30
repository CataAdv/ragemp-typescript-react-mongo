const esbuild = require("esbuild");
const path = require("path");
const chokidar = require("chokidar");
const fs = require("fs");
const jetpack = require("fs-jetpack");
const dotenv = require("dotenv");
const builtinModules = require("builtin-modules");

/* -------------------------
   Load environment variables
------------------------- */
dotenv.config();

/* -------------------------
   Build mode flags
------------------------- */
const isProd = process.env.NODE_ENV === "production";
const isWatch = process.env.WATCH === "true";

/* -------------------------
   Source folder
------------------------- */
const sourcePath = path.resolve("src");

/* -------------------------
   External dependencies
   Node built-ins + local packages
------------------------- */
const pkgJson = jetpack.read("package.json", "json");
const localInstalledPackages = [...Object.keys(pkgJson.dependencies)];
const external = [...builtinModules, ...localInstalledPackages];

/* -------------------------
   Build function
------------------------- */
async function buildOnce() {
  try {
    /* --- Server build --- */
    await esbuild.build({
      entryPoints: [path.resolve(sourcePath, "server", "index.ts")],
      outfile: path.resolve("packages", "rage-mp", "index.js"),
      platform: "node",
      bundle: true,
      minify: isProd,
      sourcemap: false,
      target: "es2019",
      format: "cjs",
      legalComments: "none",
      external
    });

    /* --- Client build --- */
    await esbuild.build({
      entryPoints: [path.resolve(sourcePath, "client", "index.ts")],
      outfile: path.resolve("client_packages", "index.js"),
      platform: "browser",
      bundle: true,
      minify: isProd,
      sourcemap: false,
      target: "es2019",
      format: "cjs",
      legalComments: "none"
    });

    console.log(`\x1b[34m[RAGE-MP]:\x1b[0m Game build successful!`);
  } catch (err) {
    console.error(err.message || err);
  }
}

/* -------------------------
   Watch mode
   Rebuild on file changes
------------------------- */
async function watch() {
  await buildOnce();

  const watcher = chokidar.watch(
    [path.resolve(sourcePath, "server"), path.resolve(sourcePath, "client")],
    { ignoreInitial: true }
  );

  watcher.on("all", async () => {
    await buildOnce();
    console.log("♻️ Rebuilt due to changes");
  });
}

/* -------------------------
   Run build or watch
------------------------- */
if (isWatch) {
  watch();
} else {
  buildOnce();
}
