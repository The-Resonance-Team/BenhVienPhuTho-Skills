---
name: officefile-reader
description: Read Office files (.docx, .xlsx, .pptx, .pdf) and convert to markdown for inspection/analysis. Use when agent needs to READ the content of Office files — not create/edit (that's officecli). Triggers on "đọc file", "xem nội dung", "đọc docx/xlsx/pptx/pdf", "extract text from Office file", or when user provides an Office file for analysis.
---

# officefile-reader

Read Office files → markdown. Four tools: **pandoc** (.docx), **pdfplumber** (.pdf), **markitdown** (.xlsx/.pptx), **pytesseract** (scanned PDFs).

## When to use

**READ** Office file content → use this skill.
**CREATE/EDIT** Office files → use `officecli` skill instead.

Common triggers:
- User says "đọc file", "xem nội dung", "đọc docx/xlsx/pptx/pdf"
- User provides an Office file for analysis/inspection
- Need to extract text/tables from Office files
- User asks "what's in this file?"

## Tool selection

| Format | Tool | Why |
|--------|------|-----|
| `.docx` | **pandoc** | Faster, better tables, image extraction, pre-installed on Linux/Mac |
| `.pdf` (text) | **pdfplumber** | Better text/table extraction than markitdown |
| `.pdf` (scanned) | **pytesseract** + **pdf2image** | OCR for scanned PDFs |
| `.xlsx` | **markitdown** | Sheets → markdown tables |
| `.pptx` | **markitdown** | Slides → sections |

---

## pandoc (for .docx)

### Install

Cài qua skill `setup` hoặc `setup.ps1`. Không cài ngầm — hỏi user trước khi cài.

```bash
# macOS
brew install pandoc

# Linux (Debian/Ubuntu)
sudo apt-get install pandoc

# Windows
winget install JohnMacFarlane.Pandoc
```

Verify: `pandoc --version`.

### Usage

```bash
# Single file → stdout
pandoc -t markdown document.docx

# Save to file
pandoc -t markdown document.docx -o output.md

# Extract images
pandoc -t markdown document.docx --extract-media=. -o output.md

# Batch conversion
for f in *.docx; do pandoc -t markdown "$f" -o "${f%.docx}.md"; done
```

### pandoc advantages

- Single binary, no Python dependencies
- Better table structure preservation
- Image extraction built-in
- Often pre-installed on Linux/Mac
- Faster than markitdown for .docx

---

## pdfplumber (for .pdf)

### Install

```bash
pip install pdfplumber
```

Verify: `python -c "import pdfplumber; print(pdfplumber.__version__)"`.

### Usage

```python
import pdfplumber

# Extract text
with pdfplumber.open("document.pdf") as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        print(text)

# Extract tables
with pdfplumber.open("document.pdf") as pdf:
    for i, page in enumerate(pdf.pages):
        tables = page.extract_tables()
        for j, table in enumerate(tables):
            print(f"Table {j+1} on page {i+1}:")
            for row in table:
                print(row)
```

### pdfplumber advantages

- Better text extraction than markitdown (preserves layout)
- Excellent table extraction (handles merged cells)
- Pure Python, no external dependencies
- Works well for most PDFs

---

## pytesseract (for scanned PDFs)

### Install

```bash
pip install pytesseract pdf2image

# macOS
brew install tesseract poppler

# Linux (Debian/Ubuntu)
sudo apt-get install tesseract-ocr poppler-utils

# Windows
# Download Tesseract: https://github.com/UB-Mannheim/tesseract/wiki
# Download poppler: https://github.com/oschwartz10612/poppler-windows/releases
```

### Usage

```python
import pytesseract
from pdf2image import convert_from_path

# Convert PDF to images
images = convert_from_path('scanned.pdf')

# OCR each page
text = ""
for i, image in enumerate(images):
    text += f"Page {i+1}:\n"
    text += pytesseract.image_to_string(image, lang='vie+eng')  # Vietnamese + English
    text += "\n\n"

print(text)
```

### OCR notes

- **Scanned PDFs** = images, not text → need OCR
- `lang='vie+eng'` for Vietnamese + English text
- Slow (1-2s per page) — use only when pdfplumber returns empty
- Quality depends on scan resolution (300 DPI+ recommended)

---

## markitdown (for .xlsx, .pptx)

### Install

Cài qua skill `setup` hoặc `setup.ps1`. Không cài ngầm — hỏi user trước khi cài.

```bash
pip install markitdown
```

Verify: `markitdown --version`. Nếu không found sau khi cài, mở terminal mới.

### Usage

```bash
# Single file → stdout
markitdown spreadsheet.xlsx
markitdown presentation.pptx

# Save to file
markitdown spreadsheet.xlsx > data.md
markitdown deck.pptx > slides.md

# Batch conversion
for f in *.xlsx; do markitdown "$f" > "${f%.xlsx}.md"; done
for f in *.pptx; do markitdown "$f" > "${f%.pptx}.md"; done
```

### PPTX notes

markitdown output for .pptx có slide markers:

```markdown
<!-- Slide number: 1 -->
# Title Slide

Content here...

<!-- Slide number: 2 -->
# Second Slide

More content...
```

Mỗi slide bắt đầu bằng `<!-- Slide number: N -->` — dễ parse, tìm slide cụ thể.

**Visual inspection**: dùng `officecli view deck.pptx html` để xem render, hoặc `officecli get deck.pptx '/slide[N]' --depth 2` để xem cấu trúc slide.

---

## Integration with officecli

**Typical workflow:**

1. User provides Office file → pandoc/pdfplumber/markitdown to read content
2. Analyze/inspect markdown output
3. If need to modify → switch to `officecli` for edits

**Example:**

```bash
# Read .docx with pandoc
pandoc -t markdown report.docx > report-content.md

# Read .pdf with pdfplumber (Python script)
python -c "import pdfplumber; [print(p.extract_text()) for p in pdfplumber.open('report.pdf').pages]" > report-content.md

# Read .xlsx with markitdown
markitdown data.xlsx > data-content.md

# Inspect content (manual or via agent)
# ... decide changes needed ...

# Edit with officecli
officecli set report.docx '/body/p[3]' --prop text="Updated text"
```

---

## Limitations

### pandoc (.docx)
- Scanned images in .docx: extracted as links, not OCR'd
- Complex nested tables: usually good, rare edge cases

### pdfplumber (.pdf)
- **Scanned PDFs**: pdfplumber extracts text layer only. Scanned images need OCR (use pytesseract).
- **Complex layouts**: Multi-column text, text overlapping images may extract out of order.

### pytesseract (OCR)
- **Slow**: 1-2 seconds per page
- **Accuracy**: Depends on scan quality, font, language
- **Vietnamese**: Use `lang='vie+eng'` for best results
- **Not built-in**: Requires tesseract + poppler installation

### markitdown (.xlsx/.pptx)
- **Complex formatting**: Tables with merged cells, nested tables, or unusual layouts may not convert perfectly.
- **Images**: Extracted as links/references, not embedded content.
- **Macros/VBA**: Not extracted (security risk).

For pixel-perfect rendering or editing, use `officecli view` or `officecli get`.

---

## Common pitfalls

| Pitfall | Fix |
|---------|-----|
| `pandoc: command not found` | Install: `brew install pandoc` (Mac) or `winget install JohnMacFarlane.Pandoc` (Windows) |
| `ModuleNotFoundError: pdfplumber` | Install: `pip install pdfplumber` |
| PDF returns empty text | PDF is scanned image → use pytesseract OCR |
| Vietnamese OCR garbled | Use `lang='vie+eng'` in pytesseract |
| `markitdown: command not found` | Install: `pip install markitdown` |
| Table formatting broken | Complex tables (merged cells) → use `officecli view` instead |
| Slow on large files | Split file or use `officecli get` for targeted extraction |

---

## Notes

- pandoc + pdfplumber + markitdown + pytesseract are **read-only** — cannot create/edit files
- For creating/editing Office files, use `officecli` skill
- Output is markdown — easy to parse, search, summarize
- Works offline, no cloud/API calls
- Safe: no code execution, no macros, no external dependencies
- **PDF decision tree**: text PDF → pdfplumber, scanned PDF → pytesseract, unsure → try pdfplumber first, if empty → pytesseract
