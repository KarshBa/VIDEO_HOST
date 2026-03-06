const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const videosDir = path.join(rootDir, "videos");
const outputFile = path.join(rootDir, "videos.json");

const allowedExt = new Set([".mp4", ".webm", ".ogg", ".m4v"]);

console.log("[build] rootDir:", rootDir);
console.log("[build] videosDir exists:", fs.existsSync(videosDir));

if (!fs.existsSync(videosDir)) {
  console.error("[build] ERROR: Missing /videos folder");
  process.exit(1);
}

const files = fs
  .readdirSync(videosDir)
  .filter((file) => allowedExt.has(path.extname(file).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

console.log("[build] matched video files:", files);

fs.writeFileSync(outputFile, JSON.stringify({ files }, null, 2), "utf8");

console.log("[build] wrote:", outputFile);
console.log("[build] videos.json contents:");
console.log(fs.readFileSync(outputFile, "utf8"));
