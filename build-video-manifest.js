const fs = require("fs");
const path = require("path");

const videosDir = path.join(__dirname, "videos");
const outputFile = path.join(__dirname, "videos.json");

const allowedExt = new Set([".mp4", ".webm", ".ogg", ".m4v"]);

if (!fs.existsSync(videosDir)) {
  console.error("Missing /videos folder");
  process.exit(1);
}

const files = fs
  .readdirSync(videosDir)
  .filter((file) => allowedExt.has(path.extname(file).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

fs.writeFileSync(outputFile, JSON.stringify({ files }, null, 2), "utf8");

console.log(`Generated videos.json with ${files.length} video(s).`);
