const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const videosDir = path.join(rootDir, "public", "videos");
const outputFile = path.join(rootDir, "public", "videos.json");

fs.mkdirSync(path.dirname(outputFile), { recursive: true });

let files = [];

if (fs.existsSync(videosDir)) {
  files = fs.readdirSync(videosDir)
    .filter((file) => file.toLowerCase().endsWith(".mp4"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

const manifest = { files };

fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2), "utf8");

console.log("[manifest] wrote:", outputFile);
console.log("[manifest] contents:");
console.log(JSON.stringify(manifest, null, 2));
