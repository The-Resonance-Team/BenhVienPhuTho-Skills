#!/usr/bin/env node

// Rebuilds an archive-corrupt runtime DOCX from its preserved document.xml
// and a compatible valid package. The original package is copied to /private/tmp
// before replacement so the recovery remains reversible.

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const BACKUP_ROOT = "/private/tmp/bv-runtime-recovery-originals";

const RECOVERIES = [
  {
    target: "skills/phong-dieu-duong/assets/mau-quy-trinh-cham-soc.docx",
    base: "skills/phong-dieu-duong/assets/mau-quy-trinh-ky-thuat.docx",
    relationshipMode: "compatible",
  },
  {
    target: "skills/phong-hcqt/assets/to-trinh-du-toan-khlcnt.docx",
    base: "skills/phong-cntt/assets/to-trinh-du-toan-khlcnt.docx",
    relationshipMode: "shared-footer",
  },
];

function run(command, args, options = {}) {
  return execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...options });
}

function extractDocument(file) {
  return run("unzip", ["-p", file, "word/document.xml"]);
}

function sharedFooterRelationships() {
  const relationships = [];
  for (let index = 2; index <= 8; index += 1) {
    relationships.push(`<Relationship Id="rId${index}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml" />`);
  }
  relationships.push(
    '<Relationship Id="rId9" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml" />',
    '<Relationship Id="rId10" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml" />',
    '<Relationship Id="rId11" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml" />',
    '<Relationship Id="rId12" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable" Target="fontTable.xml" />',
    '<Relationship Id="rId13" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml" />',
  );
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${relationships.join("")}</Relationships>`;
}

function recover({ target, base, relationshipMode }) {
  const targetFile = path.join(ROOT, target);
  const baseFile = path.join(ROOT, base);
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "bv-runtime-recovery-"));
  const staged = `${targetFile}.recovered-${process.pid}`;
  const backup = path.join(BACKUP_ROOT, target);
  try {
    fs.mkdirSync(path.dirname(backup), { recursive: true });
    fs.copyFileSync(targetFile, backup);
    const documentXml = extractDocument(targetFile);
    run("unzip", ["-q", baseFile, "-d", tempRoot]);
    fs.writeFileSync(path.join(tempRoot, "word", "document.xml"), documentXml);
    if (relationshipMode === "shared-footer") {
      fs.writeFileSync(path.join(tempRoot, "word", "_rels", "document.xml.rels"), sharedFooterRelationships());
    }
    run("zip", ["-q", "-0", "-X", "-r", staged, "."], { cwd: tempRoot });
    fs.renameSync(staged, targetFile);
    console.log(`Recovered ${target} from ${base}; backup: ${backup}`);
  } finally {
    if (fs.existsSync(staged)) fs.rmSync(staged, { force: true });
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

for (const recovery of RECOVERIES) recover(recovery);
