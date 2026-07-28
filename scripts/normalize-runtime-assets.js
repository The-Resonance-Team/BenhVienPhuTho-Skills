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

function isWin32() {
  return process.platform === "win32";
}

// Git Bash's own `tar` on PATH is MSYS2's GNU tar, which can't read or write
// ZIP archives at all ("This does not look like a tar archive"). Windows'
// built-in System32\tar.exe is libarchive/bsdtar and handles ZIP fine, so
// call it by absolute path rather than trust PATH resolution order.
function windowsTar() {
  return path.join(process.env.SystemRoot || "C:\\Windows", "System32", "tar.exe");
}

function unzipFile(source, dest) {
  if (isWin32()) {
    // bsdtar reads an absolute "D:\..." archive path as ssh-style host:path
    // remote syntax because of the drive-letter colon. Running from the
    // file's own directory and passing a relative name sidesteps it.
    run(windowsTar(), ["-xf", path.basename(source), "-C", dest], { cwd: path.dirname(source) });
  } else {
    run("unzip", ["-q", source, "-d", dest]);
  }
}

function zipDir(dest, cwd) {
  if (isWin32()) {
    // Archiving "." makes bsdtar prefix every entry with "./", which breaks
    // OOXML part resolution ([Content_Types].xml is no longer an exact
    // match). Archiving the top-level entries by name avoids the prefix.
    const entries = fs.readdirSync(cwd);
    run(windowsTar(), ["-cf", path.basename(dest), "--format=zip", "-C", cwd, ...entries], { cwd: path.dirname(dest) });
  } else {
    run("zip", ["-q", "-0", "-X", "-r", dest, "."], { cwd });
  }
}

function safeRmSync(target) {
  // Windows can hold a transient exclusive lock (AV scan, indexer) right
  // after a file is read, so EBUSY/EPERM here needs real backoff, not a
  // couple of quick retries.
  const maxAttempts = 20;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      fs.rmSync(target, { force: true, recursive: true });
      return;
    } catch (error) {
      if (attempt === maxAttempts - 1) throw error;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 250);
    }
  }
}

function normalizeFile(file) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "bv-runtime-normalize-"));
  const staged = `${file}.normalized-${process.pid}`;
  try {
    unzipFile(file, tempRoot);
    const wordRoot = path.join(tempRoot, "word");
    for (const name of fs.readdirSync(wordRoot).filter((entry) => entry.endsWith(".xml"))) {
      const xmlFile = path.join(wordRoot, name);
      fs.writeFileSync(xmlFile, normalizeOpenXml(fs.readFileSync(xmlFile, "utf8")));
    }
    // Store entries without recompressing large Office packages. This avoids
    // platform-specific ZIP corruption while preserving the normalized XML.
    zipDir(staged, tempRoot);
    safeRmSync(file);
    fs.renameSync(staged, file);
  } finally {
    if (fs.existsSync(staged)) safeRmSync(staged);
    safeRmSync(tempRoot);
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
