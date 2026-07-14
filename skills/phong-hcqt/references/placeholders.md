# Placeholders / chỗ điền trong template HCQT (bản gốc BV)

Sau LibreOffice convert, tờ trình/QĐ dùng **mẫu BV thật** (không còn skeleton `{{TOKEN}}`).

Agent **chỉ** sửa text trong `<w:t>` tại các chỗ trống / hướng dẫn sẵn trong XML — giữ `w:rPr`.

## Tờ trình dự toán & KHLCNT (`assets/to-trinh-du-toan-khlcnt/`)

| Chỗ trong mẫu | Điền gì |
| --- | --- |
| `Tên dự toán:` / `[Ghi tên dự toán mua sắm]` | Tên gói / nội dung mua |
| `________ đồng` (giá trị dự toán) | Số tiền + “đồng” |
| `[Ghi thời gian thực hiện của dự toán mua sắm]` | Thời gian HĐ / thực hiện |
| `[Thời gian bắt đầu tổ chức LCNT …]` | Thời gian tổ chức LCNT (nếu biết) |
| `[Thời gian thực hiện gói thầu …]` | Thời gian thực hiện gói |
| Chỗ ký / họ tên | Để trống hoặc đúng user — **cấm bịa** |
| Số văn bản | `___` — Văn thư cấp |

Hình thức LCNT: mẫu đã nêu chỉ định thầu rút gọn theo NĐ 214/2025 (ngưỡng ≤500tr) — **không tự đổi** trừ khi user/pháp chế yêu cầu.

## Quy tắc chung

- Copy cả thư mục `assets/<slug>/` → sửa → pack.
- Không gen layout ngoài `assets/`.
- Grilling đủ field trước khi pack.
- Token `{{…}}` (nếu còn ở skeleton backup `_skeleton_bak_*`) chỉ dùng khi chưa convert; bản chính hiện là mẫu BV.
