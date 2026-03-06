const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const publicDir = path.join(rootDir, "public");
const videosDir = path.join(publicDir, "videos");
const outputFile = path.join(publicDir, "videos.json");

fs.mkdirSync(publicDir, { recursive: true });

let files = [];

if (fs.existsSync(videosDir)) {
  files = fs.readdirSync(videosDir)
    .filter((file) => file.toLowerCase().endsWith(".mp4"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

const manifest = { files };
const json = JSON.stringify(manifest, null, 2);

// Write atomically: temp file first, then rename
const tempFile = `${outputFile}.tmp`;
fs.writeFileSync(tempFile, json, "utf8");
fs.renameSync(tempFile, outputFile);

console.log("[manifest] wrote:", outputFile);
console.log("[manifest] contents:");
console.log(json);
