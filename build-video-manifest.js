const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const videosDir = path.join(rootDir, "public", "videos");
const outputFile = path.join(rootDir, "public", "videos.json");

if (!fs.existsSync(videosDir)) {
  console.error("[manifest] Missing public/videos folder");
  process.exit(1);
}

const files = fs.readdirSync(videosDir)
  .filter((file) => file.toLowerCase().endsWith(".mp4"))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

fs.writeFileSync(outputFile, JSON.stringify({ files }, null, 2), "utf8");

console.log("[manifest] wrote:", outputFile);
console.log("[manifest] files:", files);
