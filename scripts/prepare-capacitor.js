const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "www");

function copyFile(source, target) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, fs.readFileSync(source));
}

function copyDir(source, target) {
  if (!fs.existsSync(source)) return;
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const src = path.join(source, entry.name);
    const dest = path.join(target, entry.name);
    if (entry.isDirectory()) copyDir(src, dest);
    else copyFile(src, dest);
  }
}

fs.mkdirSync(outDir, { recursive: true });

copyFile(path.join(root, "index.html"), path.join(outDir, "index.html"));
copyFile(path.join(root, "favicon.ico"), path.join(outDir, "favicon.ico"));
copyFile(path.join(root, "manifest.webmanifest"), path.join(outDir, "manifest.webmanifest"));
copyFile(path.join(root, "sw.js"), path.join(outDir, "sw.js"));
copyDir(path.join(root, "assets"), path.join(outDir, "assets"));

console.log("Prepared Capacitor web assets in www/");
