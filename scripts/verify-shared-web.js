const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const pairs = [
  ["index.html", "www/index.html"],
  ["index.html", "android/app/src/main/assets/public/index.html"],
  ["favicon.ico", "www/favicon.ico"],
  ["favicon.ico", "android/app/src/main/assets/public/favicon.ico"],
];

function hash(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(path.join(root, file))).digest("hex");
}

for (const [source, copy] of pairs) {
  if (!fs.existsSync(path.join(root, copy))) {
    throw new Error(`Missing generated copy: ${copy}`);
  }

  const sourceHash = hash(source);
  const copyHash = hash(copy);
  if (sourceHash !== copyHash) {
    throw new Error(`${copy} is not identical to ${source}`);
  }
}

console.log("Shared web payload is identical for browser and Android.");
