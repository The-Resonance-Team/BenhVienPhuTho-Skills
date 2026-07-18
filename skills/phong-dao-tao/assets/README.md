# Templates — `phong-dao-tao`

## Nguồn gốc

6 template chuyển đổi từ **mẫu trống thật** của Trung tâm Đào tạo và Chỉ đạo tuyến (TT ĐT&CĐT) — không phải hồ sơ đã điền (khác `phong-cntt`/`phong-vattu`), giống cách tiếp cận mẫu trống của `phong-hcqt`/`phong-dieu-duong`. File nguồn giữ ngoài git tại `_seed/` (chặn bởi `.gitignore`: `skills/**/assets/_seed/`).

4/6 file nguồn là `.doc` cũ (binary OLE) — máy build không có LibreOffice/soffice/unoconv. Dùng `textutil -convert docx` (built-in macOS) để convert; output vi phạm schema OOXML (child element `sz-cs` sai thứ tự trong `w:rPr`) nhưng `normalizeOpenXml` (`scripts/openxml-normalize.js`, đã được `build-runtime-assets.js` gọi tự động) sửa sạch — `officecli validate` pass 0 lỗi sau build. Cùng kỹ thuật `textutil` đã dùng ở `phong-tccb`/`phong-vattu`.

## Đã convert (6)

| Nguồn gốc (thư mục Đào tạo) | Target | Field chính (`{{KEY}}`) |
|---|---|---|
| `1. Chuyển giao kỹ thuật/Phiếu khảo sát thực trạng Tân Sơn.docx` (đã là `.docx`) | `phieu-khao-sat-thuc-trang-tuyen-duoi.docx` | 6 (chỉ khối định danh đầu phiếu — xem "Giới hạn kỹ thuật") |
| `4. Đào tạo thực hành cho sinh viên/Quyết định tiếp nhận sinh viên/BẢN CAM KẾT.docx` (đã là `.docx`) | `ban-cam-ket-thuc-tap-sinh-vien.docx` | 4 (+ bảng ký cam kết 12 dòng mẫu có sẵn) |
| `6. Đào tạo xác nhận thời gian thực hành/Hồ sơ/Mẫu giấy xác nhận thời gian thực hành.doc` | `giay-xac-nhan-thoi-gian-thuc-hanh.docx` | 15 |
| `6. .../Hồ sơ/Hợp đồng mẫu.doc` (Mẫu 06 Phụ lục I NĐ 96/2023) | `hop-dong-thuc-hanh-kbcb.docx` | 20 |
| `6. .../Hồ sơ/Mẫu.QĐ tiếp nhận.doc` | `qd-phan-cong-nguoi-huong-dan-thuc-hanh.docx` | 16 |
| `6. .../Hồ sơ/QĐ sang học Viện Sản Nhi-Đối với cán bộ Bệnh viện.doc` | `qd-cu-can-bo-thuc-hanh-don-vi-doi-tac.docx` | 8 |

## Quy trình dựng template

1. `node scripts/build-runtime-assets.js --source-root skills --skills phong-dao-tao --debug` — convert `.doc`→`.docx` (bước tiền xử lý thủ công bằng `textutil`, không sửa script gốc), rồi tự động sanitize số/ngày/nhãn:giá trị nhận diện được (giống mọi skill khác trong repo).
2. **Đặt tên field thủ công** (bắt buộc sau bước 1 — sanitizer tự động chỉ bắt số/ngày/nhãn cố định, không đặt tên `{{KEY}}` cho các đoạn để trống dạng `………`/`___` của mẫu gốc): dùng `officecli batch <file> --input <script>.json` (mảng lệnh `set --prop text=...` theo từng `/body/p[N]`, xác nhận path bằng `officecli view <file> text` trước) để thay từng đoạn `………` bằng token ngữ nghĩa (`{{HO_TEN}}`, `{{NGAY_SINH}}`...).
3. Vì mẫu nguồn **đã trống sẵn** (không phải hồ sơ đã điền), bước này không có rủi ro rò rỉ PII — không cần quét bảng/chữ ký như quy trình sanitize hồ sơ thật của `phong-tccb`. Vẫn chạy `officecli validate` + `view ... issues --type content` sau mỗi batch để xác nhận không phá schema.

## Giới hạn kỹ thuật

- **Khối "Căn cứ" pháp lý và số thứ tự "Điều N"**: sanitizer tự động gộp mọi số trong đoạn (kể cả số hiệu Điều/Luật/Nghị định) thành `{{SO_LIEU}}` lặp lại — đã khôi phục thủ công về chữ số thật (Luật KCB 15/2023/QH15, NĐ 96/2023/NĐ-CP...) trong cả 4 file QĐ/Hợp đồng vì đây là **căn cứ pháp lý cố định, không phải dữ liệu biến đổi theo từng lần dùng** (khác trường hợp TCCB, nơi mỗi Căn cứ trích một số hiệu khác nhau mỗi vụ việc). Nếu văn bản pháp luật đổi số hiệu, sửa trực tiếp bằng `officecli set` — không dùng `merge`.
- **`phieu-khao-sat-thuc-trang-tuyen-duoi.docx`**: form khảo sát dài (nhiều trang, có ô checkbox `[ ]` dạng "Đáp ứng Tốt/Trung bình/Chưa đáp ứng" lặp lại nhiều lần và các đoạn trả lời tự do `....`). Chỉ khối định danh đầu phiếu (tên đơn vị/khoa/điện thoại/email/người chịu trách nhiệm) được đặt tên `{{KEY}}`; phần thân khảo sát (mục A/B/C, nhân lực, cơ sở vật chất, trang thiết bị...) **không phải mẫu key-value cố định** — điền trực tiếp bằng `officecli set` theo từng đoạn khi khảo sát thực tế, không qua `merge`. Số thứ tự mục (1/2/3) và số thứ tự lựa chọn checkbox trong phần thân đã bị sanitizer gộp thành `{{SO_LIEU}}` — khi điền, khôi phục lại đúng số gốc (1=Tốt, 2=Trung bình, 3=Chưa đáp ứng) theo ngữ cảnh câu hỏi, không suy diễn khác.
- **`ban-cam-ket-thuc-tap-sinh-vien.docx`**: bảng ký cam kết còn 12 dòng mẫu trống (STT 1–12) — nhân/xoá dòng bằng `officecli add`/`officecli remove` theo đúng sĩ số lớp thực tập thật.
- **`qd-cu-can-bo-thuc-hanh-don-vi-doi-tac.docx`**: nguồn gốc là case cụ thể với Bệnh viện Sản Nhi Phú Thọ (Hợp đồng số 01/2021/BVĐKPT) — **đã tổng quát hoá**, không còn hardcode tên đối tác/số hợp đồng thật (vi phạm quy tắc "không commit dữ liệu hợp đồng" ở `../officecli/references/output-safety.md` phát hiện qua `/review`, đã sửa). Tiêu đề, khối Căn cứ, và địa điểm đều dùng `{{TEN_DON_VI_DOI_TAC}}`/`{{SO_HOP_DONG_HOP_TAC}}`/`{{CHUYEN_KHOA_THUC_HANH}}` — dùng được cho bất kỳ đối tác/hợp đồng nào, không riêng BV Sản Nhi.
- File nguồn `qd-phan-cong-nguoi-huong-dan-thuc-hanh.docx` có 2 dòng Căn cứ gần trùng lặp (`Quyết định số 15/2022/QĐ-UBND`) xuất hiện y hệt cả trong `qd-cu-can-bo-thuc-hanh-don-vi-doi-tac.docx` (2 lần liên tiếp, khác nhau vài chữ "quyền hạn") — giữ nguyên theo đúng mẫu gốc, không tự ý xoá bớt; xác nhận với Văn thư nếu thấy dư thừa khi dùng thật.

## Chưa convert — còn ở dạng hồ sơ thật hoặc chưa có mẫu trống

Xem `SKILL.md` mục "Nhánh chưa có mẫu" cho danh sách đầy đủ theo 9 nhóm nghiệp vụ. Đáng chú ý: Nhóm 2 (Sau đại học), Nhóm 3 (Đào tạo tuyến dưới), Nhóm 5/7/8/9 (các QĐ cử cán bộ tham dự) đều có hồ sơ thật với cấu trúc rất sạch, lặp lại — ứng viên tốt để seed mẫu trống ở lượt sau nếu phòng ĐT&CĐT cung cấp bản trống chính thức hoặc phê duyệt sanitize hồ sơ thật (theo quy trình 2 lớp của `phong-tccb`).
