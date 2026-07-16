# Placeholders / chỗ điền trong runtime template HCQT

Runtime template là bản đã sanitize từ mẫu bệnh viện. Placeholder thực tế có thể thay đổi theo file; luôn đọc bằng `officecli view <template> text --json` trước khi merge.

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

- Chỉ merge trực tiếp file `.docx` trong `assets/`; không copy thư mục unpack, không pack lại XML thủ công.
- Không gen layout ngoài `assets/`.
- Grilling đủ field trước khi pack.
- Token `{{…}}` (nếu còn ở skeleton backup `_skeleton_bak_*`) chỉ dùng khi chưa convert; bản chính hiện là mẫu BV.
