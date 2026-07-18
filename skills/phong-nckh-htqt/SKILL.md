---
name: phong-nckh-htqt
description: "Skill Phòng Nghiên cứu khoa học và Hợp tác quốc tế (NCKH&HTQT, thuộc Trung tâm Đào tạo và Chỉ đạo tuyến — BVĐK tỉnh Phú Thọ): đề tài NCKH cấp cơ sở (đăng ký, hội đồng khoa học, nghiệm thu, công nhận), sáng kiến (hội đồng xét duyệt, công nhận), hội đồng đạo đức trong nghiên cứu y sinh học, hội nghị/hội thảo (kế hoạch, đề án, thư mời tài trợ, chứng nhận), hợp tác quốc tế (cán bộ đi nước ngoài, đón chuyên gia/người nước ngoài đến BV), tập san (Y học thực hành, Thông tin thuốc), thử nghiệm lâm sàng (QĐ cử cán bộ, hồ sơ phê duyệt Bộ Y tế). Dùng ngay khi user nhắc NCKH, HTQT, đề tài khoa học, sáng kiến, hội đồng đạo đức, hội nghị, hội thảo, đi nước ngoài, chuyên gia nước ngoài, tập san, thử nghiệm lâm sàng, hoặc soạn giấy tờ Phòng NCKH&HTQT."
---

# Phòng NCKH&HTQT

## Tổng quan

Skill theo phòng **NCKH&HTQT**, một trong hai phòng nghiệp vụ ngang cấp thuộc **Trung tâm Đào tạo và Chỉ đạo tuyến (TT ĐT&CĐT)** — phòng còn lại là **Đào tạo** (xem skill `phong-dao-tao`), khác nhiệm vụ, không dùng nhầm. Văn bản do TT ĐT&CĐT ký dùng ký hiệu `BV-TTĐT&CĐT` hoặc `___/QĐ-BV`/`___/KH-BV` (Giám đốc BV ký theo đề nghị của Giám đốc Trung tâm); văn bản riêng của phòng dùng "Lưu: VT, NCKH&HTQT".

**Không có `assets/*.docx` runtime trong skill này** — toàn bộ nguồn khảo sát (~50 file) là hồ sơ đã ký hoàn tất hoặc văn bản pháp lý, không có mẫu trống nào để convert. Mọi nhánh dưới đây xuất bằng **Markdown đúng thể thức hành chính**, giống nhánh "chưa có mẫu" của `phong-tccb`/`phong-qlcl` nhưng áp dụng cho toàn bộ 6 mảng nghiệp vụ. Khi có mẫu trống thật hoặc hồ sơ được duyệt để sanitize, seed vào `assets/_seed/` và chạy `node scripts/build-runtime-assets.js --source-root <nguồn> --skills phong-nckh-htqt`; sau review mới bật nhánh xuất `.docx`.

## Cổng bắt buộc (áp dụng mọi nhánh)

- **Không bịa dữ liệu cá nhân**: họ tên, ngày sinh, ngạch/bậc/hệ số lương, số hộ chiếu, chức vụ của viên chức đi nước ngoài hoặc tham gia nghiên cứu/thử nghiệm lâm sàng nếu người dùng chưa cung cấp — mức độ nhạy cảm tương đương `phong-tccb`.
- **Xác nhận số hiệu Luật KH&CN hiện hành trước khi trích "Căn cứ"** — hồ sơ nguồn tự thân đã phát hiện lệch số hiệu giữa 2 văn bản ký cách nhau 18 ngày (một trích Luật 29/2013/QH13 đã hết hiệu lực, một trích đúng Luật 93/2025/QH15). Không copy số hiệu từ hồ sơ mẫu cũ — xem `references/nckh-htqt-can-cu-phap-ly.md`.
- **Không bỏ cấp phê duyệt HTQT**: hồ sơ cán bộ đi nước ngoài/đón chuyên gia phải đi đủ chuỗi thẩm quyền Tỉnh ủy → Sở Y tế → (Sở Ngoại vụ/UBND tỉnh nếu có yếu tố quốc tế) → Bệnh viện — xem `references/nckh-htqt-can-cu-phap-ly.md` mục "Phân cấp thẩm quyền HTQT".
- **Đánh dấu dự thảo**: mọi văn bản đầu ra ghi "Dự thảo — chờ [Giám đốc TT ĐT&CĐT] xem xét, [Giám đốc BV] phê duyệt" ở đầu trang.
- Với thử nghiệm lâm sàng: không đưa tên/mã số bệnh nhân vào bản nháp (dữ liệu nguồn không có PHI bệnh nhân, chỉ có cán bộ y tế tham gia nghiên cứu — vẫn là dữ liệu cá nhân viên chức, xử lý như trên).

## Nhánh nghiệp vụ

Xác định nhánh theo từ khóa người dùng nêu; một yêu cầu có thể chạm nhiều nhánh liên tiếp (vd. đề tài NCKH mới → cả nhánh 1 lẫn nhánh 3 nếu cần hội đồng đạo đức).

### 1. Nghiên cứu khoa học — đề tài cấp cơ sở

Một kế hoạch năm (`___/KH-BV`) điều phối cả năm, mốc thời gian chi tiết theo tháng:

Đăng ký trực tuyến (link đăng ký của phòng) → xây đề cương, nộp phòng NCKH&HTQT (T1–T2) → phòng hỗ trợ chỉnh sửa → nộp quyển → **QĐ kiện toàn Hội đồng Khoa học và Công nghệ** (~21 người: PGĐ Chủ tịch, Giám đốc TT ĐT&CĐT làm Thư ký, trưởng khoa/phòng làm ủy viên) song song **QĐ thành lập Hội đồng đạo đức** nếu đề tài có yếu tố nghiên cứu y sinh học (T3, xem nhánh 3) → họp xét duyệt → QĐ phê duyệt triển khai → thực hiện nghiên cứu (T3–T9) → báo cáo tiến độ nếu đề tài gia hạn (T6) → Kế hoạch nghiệm thu (T9) → nộp quyển báo cáo → họp Hội đồng nghiệm thu (T10) → **QĐ công nhận đề tài** (T11) → cấp giấy chứng nhận.

**Hoàn thành khi:** văn bản đủ thể thức, đúng thứ tự bước trong chu trình năm, "Căn cứ" trích Luật KH&CN hiện hành (Cổng bắt buộc), có nêu rõ QĐ kiện toàn hội đồng nào đang hiệu lực (không hardcode thành viên).

### 2. Sáng kiến

Tương tự nhánh 1 nhưng **không qua Hội đồng đạo đức**; có **QĐ thành lập Hội đồng Xét duyệt Sáng kiến cấp cơ sở** riêng (9 thành viên, thư ký + phục vụ hội đồng là cán bộ phòng NCKH&HTQT). Sau công nhận, hồ sơ tốt được chọn dự Hội thi Sáng tạo Khoa học & Kỹ thuật cấp tỉnh — nêu rõ mốc này nếu người dùng hỏi bước tiếp theo sau công nhận.

**Hoàn thành khi:** đúng thể thức, không lẫn quy trình đề tài (không yêu cầu Hội đồng đạo đức cho sáng kiến).

### 3. Hội đồng đạo đức trong nghiên cứu y sinh học

QĐ kiện toàn định kỳ (~11 thành viên: PGĐ Chủ tịch/Phó chủ tịch, giám đốc trung tâm/trưởng khoa ủy viên, 2 chuyên viên phòng NCKH&HTQT làm thư ký chuyên môn/hành chính) + QĐ phê duyệt Biểu giá xét duyệt (12 mức giá theo loại đề cương: Quốc gia/Bộ, Tiến sĩ/CKII, CKI/Thạc sĩ, cấp cơ sở..., quy trình đầy đủ vs rút gọn, 1,5–5 triệu đồng).

Căn cứ chính: Thông tư 43/2024/TT-BYT (xem `references/nckh-htqt-can-cu-phap-ly.md`).

**Hoàn thành khi:** thành phần hội đồng khớp QĐ kiện toàn còn hiệu lực (hỏi người dùng, không hardcode), biểu giá đúng 12 mức nếu văn bản đề cập phí xét duyệt.

### 4. Hội nghị — hội thảo

Chuỗi đầy đủ nhất trong 6 nhánh (ví dụ điển hình: hội thảo có yếu tố quốc tế):

1. **Kế hoạch** (`KH-BV`) — mục đích, thành phần, thời gian/địa điểm, phân công: **Phòng NCKH&HTQT** phụ trách danh sách khách mời + thư mời; **Phòng Marketing & Truyền thông** phụ trách truyền thông/báo chí; **HCQT** phụ trách kinh phí/hậu cần.
2. **Đề án** (`ĐA-BV`) — bắt buộc nếu có yếu tố quốc tế, trình Sở Y tế phê duyệt, có mục riêng "Thông tin về báo cáo viên/diễn giả người nước ngoài" (họ tên, ngày sinh, quốc tịch, số hộ chiếu — Cổng bắt buộc áp dụng).
3. **Công văn xin ý kiến đón tiếp đại biểu nước ngoài** — đi theo chuỗi thẩm quyền ở `references/nckh-htqt-can-cu-phap-ly.md`.
4. **Thư ngỏ mời tài trợ** — 5 mức tài trợ (Kim cương/Vàng/Bạc/Đồng/Đồng tài trợ, ≥20–200 triệu) kèm quyền lợi; có số tài khoản ngân hàng BV — không bịa số tài khoản nếu chưa có.
5. **QĐ công nhận hoàn thành + cấp chứng nhận** cho cán bộ tham dự (giờ tín chỉ đào tạo liên tục theo TT 22/2013 + TT 26/2020: Chủ trì 2h/buổi, Báo cáo viên 2h/báo cáo, Đại biểu 1.5h/buổi).

**Hoàn thành khi:** hội thảo có yếu tố quốc tế đã qua đủ bước Đề án + công văn xin ý kiến (không bỏ qua vì "chỉ là hội thảo nội bộ mở rộng"); giờ tín chỉ trên chứng nhận khớp vai trò (chủ trì/báo cáo viên/đại biểu).

### 5. Hợp tác quốc tế

Hai chiều:

- **Cán bộ BV đi nước ngoài**: Công văn BV xin ý kiến (trích ngang lý lịch: họ tên, ngày sinh, chức vụ, ngạch/bậc/hệ số lương, số lần đi nước ngoài trong năm, nước đến, thời gian, kinh phí/đơn vị tài trợ) → Sở Y tế → UBND tỉnh ra QĐ cho phép → sau chuyến đi: **Báo cáo kết quả** gửi UBND/Sở Ngoại vụ/Sở Y tế (xác nhận hoàn thành, chấp hành quy định Đảng/pháp luật, không tự ý ký kết thỏa thuận với tổ chức nước ngoài).
- **Chuyên gia nước ngoài đến BV**: gộp vào quy trình Đề án hội thảo quốc tế (nhánh 4) — cần lý lịch trích ngang, chứng chỉ hành nghề, photo hộ chiếu.

**Hoàn thành khi:** hồ sơ đi đủ chuỗi thẩm quyền 3 cấp (Cổng bắt buộc), không thiếu báo cáo kết quả sau chuyến đi nếu người dùng hỏi trọn quy trình.

### 6. Tập san

2 ấn phẩm định kỳ: Tập san Y học thực hành + Tập san Thông tin thuốc (khoa Dược viết riêng). Quy trình: Kế hoạch xuất bản (`KH-BV`) → các khoa/phòng cử cán bộ viết bài (tối thiểu 1 bài/đơn vị) → phòng NCKH&HTQT tổng hợp/rà soát → Ban Biên tập thẩm định → sửa lỗi/thiết kế → phát hành trên website BV. Mỗi ấn phẩm có QĐ kiện toàn Ban Biên tập riêng.

**Hoàn thành khi:** đủ vòng thẩm định Ban Biên tập trước phát hành, không bỏ qua bước tổng hợp/rà soát của phòng.

### 7. Thử nghiệm lâm sàng

Cấu trúc hồ sơ mỗi case (nghiên cứu hợp tác với công ty dược, vd AstraZeneca): **QĐ cử cán bộ tham gia nghiên cứu** (căn cứ Hợp đồng Nghiên cứu Lâm sàng + QĐ phê duyệt đề cương của Bộ Y tế) → danh sách cán bộ theo vai trò (Ban chỉ đạo, Nghiên cứu viên chính/viên, Điều dưỡng nghiên cứu, Điều phối viên — cán bộ phòng NCKH&HTQT thường làm điều phối viên) → GCN/QĐ phê duyệt/sửa đổi (amendment) của Bộ Y tế hoặc MOHEC khi đề cương thay đổi.

Căn cứ nền: Thông tư 29/2018/TT-BYT (thử thuốc trên lâm sàng).

**Hoàn thành khi:** QĐ cử cán bộ viện dẫn đúng số QĐ phê duyệt đề cương của Bộ Y tế/MOHEC đang hiệu lực (hỏi người dùng, không suy đoán), vai trò từng cán bộ khớp danh sách vai trò chuẩn ở trên.

## Xuất file

Mặc định: **Markdown có cấu trúc đúng thể thức văn bản hành chính** (quốc hiệu–tiêu ngữ, số/ký hiệu để `___` chờ Văn thư cấp, trích yếu, căn cứ pháp lý — theo `references/nckh-htqt-can-cu-phap-ly.md`, nội dung, nơi nhận, thẩm quyền ký) để người dùng dán vào mẫu phòng đang dùng.

**Không** dùng `officecli new --prompt` hay tự dựng bố cục thay mẫu thật nếu sau này có mẫu `.docx` thật được thêm vào `assets/`.

## Quản trị dữ liệu

- Dữ liệu cá nhân viên chức đi nước ngoài/tham gia nghiên cứu/thử nghiệm lâm sàng (họ tên, ngày sinh, số hộ chiếu, ngạch/bậc/hệ số lương) chỉ dùng trong phiên làm việc — không dán Google Forms/Sheets, AppSheet, cloud, API/agent bên ngoài, không lưu vào file sẽ commit vào repo.
- Với hội nghị/hội thảo có tài trợ: không công khai số tài khoản ngân hàng BV ngoài phạm vi thư mời tài trợ chính thức đã được phê duyệt.
- Xác nhận người ký/phê duyệt trước khi xuất bản; mọi văn bản là dự thảo chờ Giám đốc TT ĐT&CĐT/Giám đốc BV phê duyệt.

## Sau khi xong

1. Trả lời người dùng: đã soạn nội dung gì, còn thiếu dữ liệu/căn cứ pháp lý gì (đặc biệt nếu chưa xác nhận số hiệu Luật KH&CN hiện hành).
2. Nhắc rõ đây là dự thảo, còn chờ xem xét/phê duyệt theo chuỗi thẩm quyền.
