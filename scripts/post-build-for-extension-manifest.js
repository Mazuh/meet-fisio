"use strict";
const path = require("path");
const fs = require("fs");

console.log("Running post build script for extension manifest...");
console.log();

const assetManifestPath = path.join(__dirname, "../build/asset-manifest.json");
console.log("Assets manifest:", assetManifestPath);

const assetManifestContent = fs.readFileSync(assetManifestPath, {
  encoding: "utf8",
});
const assetManifest = JSON.parse(assetManifestContent);
console.log("Its entrypoints:", assetManifest.entrypoints);

const originalManifestPath = path.join(__dirname, "../build/manifest.json");
console.log("Manifest to be rewritten:", originalManifestPath);

const originalManifestContent = fs.readFileSync(originalManifestPath, {
  encoding: "utf8",
});
const originalManifest = JSON.parse(originalManifestContent);
if (
  !originalManifest.content_scripts.length ||
  originalManifest.content_scripts.length > 1
) {
  console.error(
    "Unexpected amount of content_scripts on original manifest",
    originalManifest
  );
  throw new Error();
}

const rewrittenManifest = {
  ...originalManifest,
  content_scripts: [
    {
      ...originalManifest.content_scripts[0],
      css: assetManifest.entrypoints.filter((it) => it.endsWith(".css")),
      js: assetManifest.entrypoints.filter((it) => it.endsWith(".js")),
    },
  ],
};
const rewrittenManifestContent = JSON.stringify(rewrittenManifest, null, 2);
fs.writeFileSync(originalManifestPath, rewrittenManifestContent);
