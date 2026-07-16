# Chỉ mục runtime templates — Phòng Điều dưỡng

Skill chỉ sử dụng các file `.docx` đã sanitize trong `../assets/`. Nguồn gốc
riêng và các bản unpack XML không nằm trong repo.

## Có sẵn (13)

- `mau-quy-trinh-cham-soc.docx`
- `mau-quy-trinh-ky-thuat.docx`
- `mau-truyen-thong-gdsk.docx`
- `nd30-mau-1.1-nghi-quyet.docx`
- `nd30-mau-1.10-giay-nghi-phep.docx`
- `nd30-mau-1.2-quyet-dinh-truc-tiep.docx`
- `nd30-mau-1.3-quyet-dinh-gian-tiep.docx`
- `nd30-mau-1.4-van-ban-co-ten-loai.docx`
- `nd30-mau-1.5-cong-van.docx`
- `nd30-mau-1.6-cong-dien.docx`
- `nd30-mau-1.7-giay-moi.docx`
- `nd30-mau-1.8-giay-gioi-thieu.docx`
- `nd30-mau-1.9-bien-ban.docx`

## Chưa có runtime asset

- `ke-hoach-thi-tay-nghe.docx`
- `diem-kiem-tra-tay-nghe.xlsx`

Khi người dùng yêu cầu hai biểu mẫu này, báo rõ asset chưa có và xin nguồn đã
được phê duyệt. Không tự dựng bố cục thay cho mẫu bệnh viện.

## Quy tắc dùng

Đọc placeholder từ `officecli view <template> text --json`, tạo dữ liệu tạm
với quyền hạn chế, rồi `officecli merge`, `validate`, `view ... issues --type
content`, và đọc lại text/bảng trước khi giao file. Xem
`../../officecli/references/output-safety.md`.
