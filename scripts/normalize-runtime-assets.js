#!/usr/bin/env node

// Normalize common conversion defects in runtime DOCX packages without
// touching text content or importing any source documents.

const fs = require("fs");
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

function isWin32() {
  return process.platform === "win32";
}

// unzip is present on Git Bash on windows-latest as well as Linux/macOS
// runners (confirmed via CI diagnostic), so extraction needs no branch.
function unzipFile(archivePath, extractTo) {
  run("unzip", ["-q", archivePath, "-d", extractTo]);
}

// Git Bash's own `tar` on PATH is MSYS2's GNU tar, which can't write ZIP
// archives (--format=zip is rejected). Windows' built-in System32\tar.exe
// is libarchive/bsdtar and handles ZIP fine, so call it by absolute path
// rather than trust PATH resolution order. `zip` itself is not present on
// windows-latest Git Bash (confirmed via CI diagnostic), so this branch is
// the only option there. NOTE: as of this comment, CI still hits an
// intermittent Windows-only EBUSY on the final unlink/rename a few files
// into this path (see PR history) with no confirmed root cause yet — the
// step is gated off on Windows in the workflow until that's resolved.
function windowsTar() {
  return path.join(process.env.SystemRoot || "C:\\Windows", "System32", "tar.exe");
}

function zipDir(archivePath, sourceDir, workDir) {
  if (isWin32()) {
    // Archiving "." makes bsdtar prefix every entry with "./", which breaks
    // OOXML part resolution ([Content_Types].xml is no longer an exact
    // match). Archiving the top-level entries by name avoids the prefix.
    const entries = fs.readdirSync(sourceDir);
    run(windowsTar(), ["-cf", path.relative(workDir, archivePath), "--format=zip", "-C", sourceDir, ...entries], { cwd: workDir });
  } else {
    run("zip", ["-q", "-0", "-X", "-r", archivePath, "."], { cwd: sourceDir });
  }
}

function safeRmSync(target) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try { fs.rmSync(target, { force: true, recursive: true }); return; } catch { Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 200); }
  }
  fs.rmSync(target, { force: true, recursive: true });
}

function normalizeFile(file) {
  // Kept on the same drive as `file` (unlike os.tmpdir(), which is a
  // different drive on GitHub's Windows runners and would make the final
  // rename fail with EXDEV), but never the assets directory itself — a
  // subprocess's cwd is held open on Windows, and that directory is where
  // `file` is about to be unlinked from.
  const workRoot = fs.mkdtempSync(path.join(ROOT, ".bv-runtime-normalize-"));
  const extractRoot = path.join(workRoot, "extract");
  const staged = path.join(workRoot, "staged.docx");
  try {
    fs.mkdirSync(extractRoot);
    unzipFile(file, extractRoot);
    const wordRoot = path.join(extractRoot, "word");
    for (const name of fs.readdirSync(wordRoot).filter((entry) => entry.endsWith(".xml"))) {
      const xmlFile = path.join(wordRoot, name);
      fs.writeFileSync(xmlFile, normalizeOpenXml(fs.readFileSync(xmlFile, "utf8")));
    }
    // Store entries without recompressing large Office packages. This avoids
    // platform-specific ZIP corruption while preserving the normalized XML.
    zipDir(staged, extractRoot, workRoot);
    safeRmSync(file);
    fs.renameSync(staged, file);
  } finally {
    safeRmSync(workRoot);
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
