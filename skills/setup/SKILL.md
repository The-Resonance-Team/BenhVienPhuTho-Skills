---
name: setup
description: "Setup môi trường BV: kiểm tra skill grilling, officecli, Python packages (markitdown/pdfplumber/pytesseract/PyMuPDF), pandoc, tesseract, Node và npm. Dùng khi user nói setup, /setup, lần đầu, hoặc một skill báo thiếu tooling. Không tự cài đặt; nếu thiếu dependency thì xin user phê duyệt trước."
---

# Setup — tooling (officecli, Python packages, pandoc, tesseract)

## Tổng quan

Năm việc trong một skill:

1. **Grilling tooling** — đảm bảo skill `grilling` có sẵn (cài qua `npx skills add ... --skill grilling` nếu thiếu). Chỉ cần khi user muốn grilling thủ công.
2. **officecli tooling** — kiểm tra binary `officecli` có sẵn trên PATH (chỉ cài sau khi user phê duyệt).
3. **Python packages** — kiểm tra bộ packages đọc file Office: markitdown (.xlsx/.pptx), pdfplumber (.pdf), pytesseract (OCR Python API), PyMuPDF (PDF → ảnh), pillow (Image processing). Chỉ cài sau khi user phê duyệt.
4. **pandoc tooling** — kiểm tra binary `pandoc` có sẵn (chỉ cài sau khi user phê duyệt). Dùng để đọc file .docx → markdown (nhanh hơn markitdown cho .docx).
5. **tesseract** — binary cho OCR scanned PDFs (pytesseract Python package cần tesseract, PyMuPDF render PDF → ảnh).

Upstream: [`iOfficeAI/OfficeCLI`](https://github.com/iOfficeAI/OfficeCLI) — single-binary CLI, đọc/sửa/tạo `.docx`/`.xlsx`/`.pptx`. `phong-hcqt`/`phong-dieu-duong` dùng lệnh `officecli merge <template>.docx <output>.docx --data <fields>.json` để điền `{{KEY}}` trong template.

## Grilling tooling

Skill `grilling` (hỏi từng field một, có gợi ý mặc định). Nếu agent **không tìm thấy** skill `grilling`:

```bash
npx skills add https://github.com/mattpocock/skills --skill grilling
```

Cài xong → thử gọi lại skill `grilling`. Nếu vẫn không thấy, báo user rõ ràng.

Không tự cài skill trong lúc xử lý tài liệu. Việc tải/cài package là thay đổi máy và phải có xác nhận của user trước.

Cần Node/npm (`npx`) trên máy — nếu thiếu, dùng cùng lúc với bước cài `officecli`.

## officecli tooling

Không vendor, không git-clone — một binary duy nhất trên PATH.

```
officecli --version    # đã cài → in version, thoát code 0
officecli               # chỉ kiểm tra binary hiện có; không tự install
```

Cài khi thiếu, sau khi user phê duyệt (ưu tiên theo thứ tự có sẵn trên máy):

```bash
npm install -g @officecli/officecli   # có Node/npm
# hoặc: brew install officecli
```

Không dùng `curl | bash`, `wget | sh`, `irm | iex`, hoặc lệnh tự tải script từ URL.

## Python packages for reading Office files

Bộ Python packages để đọc file Office. Cài khi thiếu, sau khi user phê duyệt:

```bash
pip install markitdown pdfplumber pytesseract PyMuPDF pillow
```

- **markitdown**: .xlsx/.pptx → markdown
- **pdfplumber**: .pdf → text/tables (tốt hơn markitdown cho PDF)
- **pytesseract**: OCR cho scanned PDFs (cần tesseract binary)
- **PyMuPDF**: chuyển PDF → images (cho OCR, thay pdf2image)

Verify: `pip list | grep -E "markitdown|pdfplumber|pytesseract|PyMuPDF|pillow"`.

Cần Python 3 + pip trên máy (bước [3/8] trong `setup.ps1`).

## pandoc tooling (đọc file .docx)

Binary `pandoc` — chuyển `.docx` → markdown. Nhanh hơn markitdown cho .docx, thường có sẵn trên Linux/Mac.

```
pandoc --version    # đã cài → thoát code 0
pandoc -t markdown file.docx    # xuất markdown ra stdout
```

Cài khi thiếu, sau khi user phê duyệt:

```bash
# macOS
brew install pandoc

# Windows
winget install JohnMacFarlane.Pandoc
```

**Lưu ý:** pandoc chỉ tốt cho .docx. Với .xlsx/.pptx/.pdf → dùng Python packages ở trên.

## tesseract + Vietnamese tessdata (OCR cho scanned PDFs)

Cần cho OCR scanned PDFs (pytesseract Python package cần tesseract binary + gói ngôn ngữ, PyMuPDF dùng để render PDF → ảnh).

### Kiểm tra tesseract

```
tesseract --version    # đã cài → thoát code 0
```

### Kiểm tra ngôn ngữ Vietnamese

```bash
# macOS / Linux
tesseract --list-langs | grep vie

# Windows
tesseract --list-langs 2>&1 | findstr vie
```

Nếu **không có `vie`** → cần tải `vie.traineddata`:

```bash
# Tải từ GitHub tessdata (khoảng 3.3MB)
curl -L -o vie.traineddata https://github.com/tesseract-ocr/tessdata/raw/main/vie.traineddata

# Di chuyển vào thư mục tessdata của tesseract
# macOS
cp vie.traineddata $(brew --prefix tesseract)/share/tessdata/

# Linux
sudo cp vie.traineddata /usr/share/tesseract-ocr/4.00/tessdata/

# Windows — tìm thư mục tessdata
# Thường ở: C:\Program Files\Tesseract-OCR\tessdata\
copy vie.traineddata "C:\Program Files\Tesseract-OCR\tessdata\"
```

### Cài tesseract (khi thiếu)

Cài sau khi user phê duyệt:

```bash
# macOS
brew install tesseract tesseract-lang

# Linux (Debian/Ubuntu)
sudo apt-get install tesseract-ocr tesseract-ocr-vie

# Windows
winget install UB-Mannheim.TesseractOCR
# Sau đó tải vie.traineddata như trên
```

### Lưu ý

- OCR chậm (1-2s/page), chỉ dùng khi pdfplumber trả về empty (PDF là ảnh scan).
- Thiếu Vietnamese tessdata → OCR sẽ nhận diện sai ký tự tiếng Việt có dấu.
- Tesseract path trên Windows: thường ở `C:\Program Files\Tesseract-OCR\tesseract.exe`.
- Nếu `pytesseract` không tìm thấy tesseract → set path thủ công:
  ```python
  import pytesseract
  pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
  ```

## Đường dẫn nhanh (bắt buộc — chống chậm mỗi session)

**Trước khi** cài gì hay hỏi dài:

1. Skill `grilling` có trong danh sách skill khả dụng? → **không** cài lại.
2. `officecli --version` chạy được (exit 0)? → **không** cài lại.
3. Python packages đã cài? → `pip list | grep -E "markitdown|pdfplumber|pytesseract|PyMuPDF|pillow"` → **không** cài lại nếu đủ.
4. `pandoc --version` chạy được? → **không** cài lại.
5. `tesseract --version` chạy được? → **không** cài lại.
6. Chỉ khi **thiếu** một trong năm → mới làm bước tương ứng.

Kiểm tra = đọc danh sách skill / chạy `--version` (vài giây). **Cấm** mỗi session: cài lại nếu đã có.

## Tham chiếu nhanh

| Nhiệm vụ             | Cách thức                                                        |
| -------------------- | ----------------------------------------------------------------- |
| Lần đầu /setup       | grilling → officecli → Python packages → pandoc → tesseract |
| Session sau (đã sẵn) | Đường dẫn nhanh: kiểm tra 6 mục trên — bỏ qua cài lại           |
| Thiếu skill grilling | `npx skills add https://github.com/mattpocock/skills --skill grilling` |
| Thiếu Python packages | `pip install markitdown pdfplumber pytesseract PyMuPDF pillow`        |
| Thiếu pandoc         | `brew install pandoc` (Mac) hoặc `winget install JohnMacFarlane.Pandoc` (Windows) |
| Thiếu tesseract      | `brew install tesseract tesseract-lang` (Mac) hoặc `winget install UB-Mannheim.TesseractOCR` (Windows) |

## Các bước (thứ tự)

1. **Kiểm tra đường dẫn nhanh** (mục trên). Cả 6 mục OK → báo "đã sẵn" → dừng setup.
2. Kiểm tra `node --version` và `npm --version` nếu có bước cài package.
3. Thiếu skill `grilling` → xin phê duyệt rồi mới cài (`npx skills add https://github.com/mattpocock/skills --skill grilling`) → xác nhận gọi được.
4. Thiếu officecli → xin phê duyệt rồi mới cài (mục trên) → xác nhận lại `officecli --version`.
5. Thiếu Python packages → xin phê duyệt rồi mới cài (`pip install markitdown pdfplumber pytesseract PyMuPDF pillow`) → xác nhận lại `pip list`.
6. Thiếu pandoc → xin phê duyệt rồi mới cài (`brew install pandoc` hoặc `winget install JohnMacFarlane.Pandoc`) → xác nhận lại `pandoc --version`.
7. Thiếu tesseract → xin phê duyệt rồi mới cài (mục trên) → xác nhận lại `tesseract --version`.
8. Báo user kết quả ngắn.

## Quy tắc quan trọng

- Không hardcode đường dẫn ổ đĩa.
- Thiếu skill `grilling` → xin phê duyệt trước khi chạy `npx skills add https://github.com/mattpocock/skills --skill grilling`.
- **Cấm** `officecli new <loại> --prompt "..."` cho giấy tờ hành chính BV. Chỉ dùng `officecli merge <template>.docx <output>.docx --data <fields>.json` trên runtime template có sẵn trong skill của phòng.
- Đọc `../officecli/references/output-safety.md` trước khi sinh file.

## Sau khi xong

Tóm tắt cho user: (1) skill grilling OK hay vừa cài, (2) officecli OK hay thiếu gì, (3) Python packages OK hay thiếu gì, (4) pandoc OK hay thiếu gì, (5) tesseract OK hay thiếu gì, (6) bước tiếp theo.
