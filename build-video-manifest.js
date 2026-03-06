const fs = require("fs");
const path = require("path");

const videosDir = path.join(__dirname, "public", "videos");
const outputFile = path.join(__dirname, "public", "videos.json");

if (!fs.existsSync(videosDir)) {
  console.error("Missing public/videos folder");
  process.exit(1);
}

const files = fs.readdirSync(videosDir)
  .filter(file => file.toLowerCase().endsWith(".mp4"))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

fs.writeFileSync(outputFile, JSON.stringify({ files }, null, 2), "utf8");

console.log("[manifest] wrote public/videos.json");
console.log(JSON.stringify({ files }, null, 2));
