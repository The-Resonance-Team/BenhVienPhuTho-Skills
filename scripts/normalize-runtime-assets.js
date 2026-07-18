#!/usr/bin/env node

// Normalize common conversion defects in runtime DOCX packages without
// touching text content or importing any source documents.

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const { normalizeOpenXml } = require("./openxml-normalize");

const ROOT = path.resolve(__dirname, "..");
const skillArg = process.argv.indexOf("--skills");
const SKILLS = skillArg >= 0 && process.argv[skillArg + 1]
  ? process.argv[skillArg + 1].split(",").filter(Boolean)
  : ["phong-cntt", "phong-ktda", "phong-hcqt", "phong-dieu-duong", "phong-vattu", "phong-tccb", "phong-dao-tao"];

function run(command, args, options = {}) {
  return execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...options });
}

function normalizeFile(file) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "bv-runtime-normalize-"));
  const staged = `${file}.normalized-${process.pid}`;
  try {
    run("unzip", ["-q", file, "-d", tempRoot]);
    const wordRoot = path.join(tempRoot, "word");
    for (const name of fs.readdirSync(wordRoot).filter((entry) => entry.endsWith(".xml"))) {
      const xmlFile = path.join(wordRoot, name);
      fs.writeFileSync(xmlFile, normalizeOpenXml(fs.readFileSync(xmlFile, "utf8")));
    }
    // Store entries without recompressing large Office packages. This avoids
    // platform-specific ZIP corruption while preserving the normalized XML.
    run("zip", ["-q", "-0", "-X", "-r", staged, "."], { cwd: tempRoot });
    fs.renameSync(staged, file);
  } finally {
    if (fs.existsSync(staged)) fs.rmSync(staged, { force: true });
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

let changed = 0;
for (const skill of SKILLS) {
  const assets = path.join(ROOT, "skills", skill, "assets");
  if (!fs.existsSync(assets)) continue;
  for (const name of fs.readdirSync(assets).filter((entry) => entry.endsWith(".docx"))) {
    normalizeFile(path.join(assets, name));
    changed += 1;
  }
}
console.log(`Normalized ${changed} runtime DOCX assets.`);
