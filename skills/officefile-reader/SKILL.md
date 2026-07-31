---
name: officefile-reader
description: Read Office files (.docx, .xlsx, .pptx, .pdf) and convert to markdown for inspection/analysis. Use when agent needs to READ the content of Office files — not create/edit (that's officecli). Triggers on "đọc file", "xem nội dung", "đọc docx/xlsx/pptx/pdf", "extract text from Office file", or when user provides an Office file for analysis.
---

# officefile-reader

Read Office files → markdown. Four tools: **pandoc** (.docx), **pdfplumber** (.pdf), **markitdown** (.xlsx/.pptx), **PyMuPDF + Tesseract** (scanned PDFs).

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
| `.pdf` (scanned) | **PyMuPDF (fitz)** + **Tesseract** | OCR for scanned PDFs via fitz render → pytesseract |
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

## PyMuPDF + Tesseract (for scanned PDFs)

### Pipeline

```
PDF attach

  │  pdfplumber → 0 chars ?
  │  → có = scan ảnh
  │
  ▼

  fitz.open(pdf)                              ← PyMuPDF mở PDF
      │
      ├─> page[i].get_pixmap(2x)             ← trang → ảnh zoom 2x
      │      │
      │      ▼
      │  pytesseract(image, lang='vie+eng')  ← OCR ảnh → text
      │      │
      │      ▼
      │  Fix garbled text (tự đọc ngữ cảnh)  ← clean noise
      │      │
      ▼      ▼
  Text tiếng Việt → trình bày
```

### Install

```bash
pip install PyMuPDF pytesseract pillow

# macOS
brew install tesseract tesseract-lang

# Linux (Debian/Ubuntu)
sudo apt-get install tesseract-ocr tesseract-ocr-vie

# Windows
# Download Tesseract: https://github.com/UB-Mannheim/tesseract/wiki
# Sau đó tải Vietnamese tessdata:
curl -L -o vie.traineddata https://github.com/tesseract-ocr/tessdata/raw/main/vie.traineddata
copy vie.traineddata "C:\Program Files\Tesseract-OCR\tessdata\"
```

Verify:
```bash
python -c "import fitz; print(fitz.version)"
python -c "import pytesseract; print(pytesseract.get_tesseract_version())"
tesseract --list-langs  # Kiểm tra có 'vie' không
```

### Usage

```python
import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import io
import platform

# Windows: set tesseract path if not in PATH
if platform.system() == "Windows":
    pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def ocr_pdf(pdf_path: str, lang: str = "vie+eng") -> str:
    """OCR a scanned PDF: fitz render 2x → pytesseract → text"""
    doc = fitz.open(pdf_path)
    all_text = []

    for i, page in enumerate(doc):
        # Render page → ảnh zoom 2x
        mat = fitz.Matrix(2, 2)  # 2x zoom = ~144 DPI
        pix = page.get_pixmap(matrix=mat)

        # Convert pixmap → PIL Image (in-memory, no temp file)
        img = Image.open(io.BytesIO(pix.tobytes("png")))

        # OCR ảnh → text
        page_text = pytesseract.image_to_string(img, lang=lang)

        # Fix garbled text (tự đọc ngữ cảnh)
        page_text = fix_garbled(page_text)

        all_text.append(f"--- Page {i+1} ---\n{page_text}")

    doc.close()
    return "\n\n".join(all_text)


def fix_garbled(text: str) -> str:
    """Fix common OCR garbled text for Vietnamese"""
    # Common fixes
    replacements = {
        "đ)": "đ",
        "ă)": "ă",
        "â)": "â",
        "ê)": "ê",
        "ô)": "ô",
        "ơ)": "ơ",
        "ư)": "ư",
    }
    for wrong, correct in replacements.items():
        text = text.replace(wrong, correct)
    return text.strip()


# Usage
text = ocr_pdf("scanned.pdf")
print(text)
```

### Why PyMuPDF over pdf2image

- **No poppler dependency** — pdf2image requires poppler-utils (external binary)
- **Faster rendering** — fitz is C-based, renders at exact zoom without resampling
- **Better memory** — renders one page at a time, not all at once
- **More control** — fine-grained zoom, clip region, rotation handling

### OCR notes

- **Scanned PDFs** = images, not text → need OCR
- `lang='vie+eng'` for Vietnamese + English text
- Slow (1-2s per page) — use only when pdfplumber returns empty
- Quality depends on scan resolution (2x zoom = ~144 DPI,足够 cho OCR)
- pytesseract Python API — simpler than CLI subprocess, returns text trực tiếp

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

1. User provides Office file → pandoc/pdfplumber/markitdown/PyMuPDF+Tesseract to read content
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
- **Scanned PDFs**: pdfplumber extracts text layer only. Scanned images need OCR (use PyMuPDF + Tesseract).
- **Complex layouts**: Multi-column text, text overlapping images may extract out of order.

### pytesseract (OCR)
- **Slow**: 1-2 seconds per page
- **Accuracy**: Depends on scan quality, font, language
- **Vietnamese**: Use `-l vie+eng` for best results
- **Not built-in**: Requires tesseract installation
- **Subprocess**: Uses CLI binary, not Python API

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
| PDF returns empty text | PDF is scanned image → use PyMuPDF + Tesseract OCR |
| Vietnamese OCR garbled | Install Vietnamese tessdata: download `vie.traineddata` from [GitHub](https://github.com/tesseract-ocr/tessdata/raw/main/vie.traineddata) → copy vào thư mục `tessdata/` của tesseract |
| `pytesseract.TesseractNotFoundError` | Windows: set path `pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'` |
| `tesseract` not in PATH | Windows: cài qua `winget install UB-Mannheim.TesseractOCR`, hoặc set path thủ công |
| `markitdown: command not found` | Install: `pip install markitdown` |
| Table formatting broken | Complex tables (merged cells) → use `officecli view` instead |
| Slow on large files | Split file or use `officecli get` for targeted extraction |

---

## Notes

- pandoc + pdfplumber + markitdown + PyMuPDF + Tesseract are **read-only** — cannot create/edit files
- For creating/editing Office files, use `officecli` skill
- Output is markdown — easy to parse, search, summarize
- Works offline, no cloud/API calls
- Safe: no code execution, no macros, no external dependencies
- **PDF decision tree**:
  ```
  PDF?
   ├─ text layer? ──> pdfplumber
   ├─ scan ảnh?  ──> fitz + tesseract
   └─ unsure?    ──> pdfplumber trước, empty → fitz + tesseract
  ```
