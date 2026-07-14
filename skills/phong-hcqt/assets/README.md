# Templates — `phong-hcqt`

Nguồn: gói `{TAI_LIEU_BV}` / `thau-50-500`. Format: mỗi template convert-xong là **một file `.docx` duy nhất** (không phải thư mục unpack XML), gắn sẵn `{{KEY}}` tại các trường cần điền, sinh file bằng `officecli merge` — xem `../SKILL.md`.

## Đã convert (4)

- `to-trinh-du-toan-khlcnt.docx`: từ `04. Tờ trình phê duyệt dự toán và kế hoạch LCNT.doc` (LibreOffice → docx) — 14 field.
- `qd-phe-duyet-du-toan-khlcnt.docx`: từ `05. Quyết định phê duyệt dự toán và KHLCNT - Final.doc` — 9 field.
- `to-trinh-kqlcnt.docx`: từ `08. Tờ trình phê duyệt KQ LCNT.doc` — 12 field.
- `qd-phe-duyet-kqlcnt.docx`: từ `09. Quyết định phê duyệt KQLCNT.doc` — 12 field. (File nguồn từng là một ví dụ đã điền thật — đã xoá sạch dữ liệu thật, thay bằng `{{KEY}}`.)

Bảng phụ lục (danh sách hàng hoá/dịch vụ, dòng biến đổi) trong 4 file trên **chưa** gắn key — điền bằng `officecli set` theo hướng dẫn "Bảng phụ lục" ở `../SKILL.md`.

## Chưa convert (19)

Vẫn là thư mục unpack XML cũ (không có pipeline sinh file — xem "Quick Reference" ở `../SKILL.md`): `bbnt-khoi-luong-hoan-thanh`, `bien-ban-hoan-thien-hop-dong`, `bien-ban-thanh-ly-hop-dong`, `don-de-xuat`, `du-thao-hop-dong`, `du-toan`, `giay-de-nghi-thanh-toan`, `hop-dong`, `thu-moi-hoan-thien-hop-dong`, `thu-moi-ky-hop-dong`, `yeu-cau-bao-gia`, `qtvh-01-bm01-du-tru-vat-tu`, `qtvh-01-bm02-danh-sach-ncc`, `qtvh-01-bm03-danh-gia-ncc-moi`, `qtvh-01-bm04-danh-gia-ncc-cu`, `qtvh-04-bm01-dieu-dong-xe`, `qtvh-04-bm02-dieu-dong-xe`, `qtvh-05-bm01-van-phong-pham`, `qtvh-05-bm02-van-phong-pham`.

(`qtvh-06-bm01-van-phong-pham-DUPLICATE-of-05bm01` đã xoá — trùng 100% với `qtvh-05-bm01-van-phong-pham`, xác nhận bằng `diff -rq`.)

Convert theo đúng cách 4 file trên: xác định blank/`[Ghi ...]` → gắn `{{KEY}}` (tái dùng key có sẵn trong bảng "Field vocabulary" khi khớp nghĩa) → zip thư mục thành một `.docx` → test `officecli merge` (không còn `{{...}}` sót, format giữ nguyên) → xoá thư mục unpack cũ.

## Nguồn gốc file `.doc`/`.docx` gốc BV

`_build_assets.py` / `_convert_doc_templates.py` (đã xoá — phụ thuộc `$DOCX_SKILL_HOME`/vendor `unpack.py` không còn tồn tại, và tự ghi đè file README này) từng dùng để trích các file gốc này từ `{TAI_LIEU_BV}`:

- Zip nguồn: file bắt đầu bằng `03.` dưới `{TAI_LIEU_BV}` (gói `thau-50-500`).
- Khớp tên file trong zip theo các mẫu: `04.`/"Tờ trình phê duyệt dự toán" (→ `to-trinh-du-toan-khlcnt`), `05.`/"Quyết định phê duyệt dự toán"/"KHLCNT" (→ `qd-phe-duyet-du-toan-khlcnt`), `08.`/"Tờ trình phê duyệt KQ" (→ `to-trinh-kqlcnt`), `09.`/"Quyết định phê duyệt KQLCNT" (→ `qd-phe-duyet-kqlcnt`), `10.`/"Hợp đồng" (→ `hop-dong`), `11.`/"BBNT" (→ `bbnt`), `02.`/"Yêu cầu báo giá" (→ `yeu-cau-bao-gia`), `03.`/"Dự toán" (→ `du-toan`).
- File `.doc` gốc: convert sang `.docx` bằng LibreOffice headless (`soffice --headless --convert-to docx`) trước khi zip/gắn `{{KEY}}`.

**File gốc đã sẵn** — `_seed/<slug>.docx` có bản gốc BV (đã LibreOffice-convert nếu cần) cho **cả 20 template chưa convert** lẫn 4 đã convert. Không cần quay lại `{TAI_LIEU_BV}` hay chạy lại 2 script đã xoá; convert bắt đầu từ `unzip -o assets/_seed/<slug>.docx -d assets/<slug>/` rồi gắn `{{KEY}}` như 4 file đã làm.
