const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const sourceDir = path.join(__dirname, "source-videos");
const publicDir = path.join(__dirname, "public");
const outputDir = path.join(publicDir, "videos");

if (!fs.existsSync(sourceDir)) {
  console.error("Missing source-videos folder");
  process.exit(1);
}

fs.mkdirSync(publicDir, { recursive: true });
fs.mkdirSync(outputDir, { recursive: true });

const allowedExt = new Set([".mp4", ".mov", ".m4v", ".webm", ".avi", ".mkv"]);

const files = fs.readdirSync(sourceDir)
  .filter(file => allowedExt.has(path.extname(file).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

console.log("[transcode] found files:", files);

for (const file of files) {
  const inputPath = path.join(sourceDir, file);

  // Always publish as .mp4
  const baseName = path.parse(file).name;
  const outputName = `${baseName}.mp4`;
  const outputPath = path.join(outputDir, outputName);

  console.log(`[transcode] converting ${file} -> ${outputName}`);

  const result = spawnSync("ffmpeg", [
    "-y",
    "-i", inputPath,
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "23",
    "-c:a", "aac",
    "-b:a", "128k",
    "-movflags", "+faststart",
    outputPath
  ], { stdio: "inherit" });

  if (result.status !== 0) {
    console.error(`[transcode] ffmpeg failed for ${file}`);
    process.exit(result.status || 1);
  }
}

console.log("[transcode] done");
