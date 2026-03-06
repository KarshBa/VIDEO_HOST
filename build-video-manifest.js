const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const publicDir = path.join(rootDir, "public");
const videosDir = path.join(publicDir, "videos");
const postersDir = path.join(publicDir, "posters");
const outputFile = path.join(publicDir, "videos.json");

console.log("[manifest] rootDir:", rootDir);
console.log("[manifest] publicDir exists:", fs.existsSync(publicDir));
console.log("[manifest] videosDir exists:", fs.existsSync(videosDir));
console.log("[manifest] postersDir exists:", fs.existsSync(postersDir));

fs.mkdirSync(publicDir, { recursive: true });

let videos = [];

if (fs.existsSync(videosDir)) {
  const files = fs.readdirSync(videosDir)
    .filter((file) => file.toLowerCase().endsWith(".mp4"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  videos = files.map((file) => {
    const baseName = path.parse(file).name;
    const posterFile = `${baseName}.jpg`;
    const posterPath = path.join(postersDir, posterFile);

    return {
      filename: file,
      src: `videos/${encodeURIComponent(file)}`,
      poster: fs.existsSync(posterPath)
        ? `posters/${encodeURIComponent(posterFile)}`
        : "",
    };
  });
}

const manifest = { videos };
const json = JSON.stringify(manifest, null, 2);

console.log("[manifest] videos array:", videos);
console.log("[manifest] json to write:", json);
console.log("[manifest] json length:", json.length);

const tempFile = `${outputFile}.tmp`;
fs.writeFileSync(tempFile, json, "utf8");

console.log("[manifest] temp file exists:", fs.existsSync(tempFile));
console.log("[manifest] temp file size:", fs.statSync(tempFile).size);
console.log("[manifest] temp file contents:", fs.readFileSync(tempFile, "utf8"));

fs.renameSync(tempFile, outputFile);

console.log("[manifest] output file exists:", fs.existsSync(outputFile));
console.log("[manifest] output file size:", fs.statSync(outputFile).size);
console.log("[manifest] output file contents:", fs.readFileSync(outputFile, "utf8"));
console.log("[manifest] wrote:", outputFile);
