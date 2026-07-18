# Văn bản pháp lý tham chiếu — Phòng Đào tạo (TT ĐT&CĐT)

Dùng làm nguồn trích dẫn "Căn cứ..." khi soạn thảo — cả cho 6 template thật lẫn nhánh Markdown. Xác nhận văn bản còn hiệu lực với người dùng trước khi điền, đặc biệt các văn bản nhân sự/tự chủ tài chính hay được sửa đổi.

| Số hiệu | Tên văn bản | Áp dụng cho nhóm |
|---|---|---|
| Luật Khám bệnh, chữa bệnh số 15/2023/QH15 (09/01/2023) | Luật KCB | Nhóm 1 (CGKT), 6 (XN thời gian thực hành), 8 (hội nghị/hội thảo) — căn cứ nền cho hầu hết văn bản chuyên môn của phòng |
| Nghị định 96/2023/NĐ-CP (30/12/2023) | Quy định chi tiết một số điều của Luật KCB | Nhóm 6 — nguồn 2 mẫu chuẩn dùng trong `assets/`: **Mẫu 06 Phụ lục I** (hợp đồng thực hành) và **Mẫu 07 Phụ lục I** (giấy xác nhận). Cũng căn cứ chung Nhóm 1, 4, 5, 7, 8, 9 |
| Thông tư 32/2023/TT-BYT | Hướng dẫn chi tiết thi hành NĐ 96/2023 | Áp dụng cùng NĐ 96/2023 ở mọi nhóm liên quan KCB |
| Bộ luật Dân sự số 91/2015/QH13 (24/11/2015) | Bộ luật Dân sự | Căn cứ nền cho mọi hợp đồng 2 bên (hợp đồng thực hành, HĐNT/HĐCT sinh viên, hợp đồng CGKT) |
| Nghị định 111/2017/NĐ-CP | Tổ chức đào tạo thực hành trong khối ngành sức khỏe | Nhóm 4 (thực hành sinh viên) — căn cứ gốc cho HĐNT/HĐCT, QĐ tiếp nhận sinh viên |
| Luật Chuyển giao công nghệ số 07/2017/QH14 | Chuyển giao công nghệ | Nhóm 1 (CGKT) |
| Thông tư 43/2013/TT-BYT | Phân tuyến kỹ thuật khám chữa bệnh | Nhóm 1 (CGKT) |
| Quyết định 1816/QĐ-BYT | Đề án luân phiên cán bộ tuyến trên hỗ trợ tuyến dưới (Đề án 1816) | Nhóm 1 — căn cứ QĐ cử cán bộ hỗ trợ tuyến dưới |
| Thông tư 22/2013/TT-BYT + Thông tư 26/2020/TT-BYT (sửa đổi) | Đào tạo liên tục cho cán bộ y tế | Nhóm 3 (đào tạo tuyến dưới), 8 (hội nghị/hội thảo) — căn cứ tính giờ tín chỉ, cấp chứng chỉ/chứng nhận |
| Quyết định 3262/BYT-K2ĐT | Công nhận đơn vị đủ điều kiện đào tạo liên tục | Nhóm 3, 8 |
| Luật Viên chức 2010 | Luật Viên chức | Nhóm 2 (sau đại học), 5/7/9 (cử cán bộ tham dự) |
| Nghị định 115/2020/NĐ-CP + Nghị định 85/2023/NĐ-CP (sửa đổi) | Tuyển dụng, sử dụng, quản lý viên chức | Nhóm 2, 5, 7, 9 |
| Nghị định 106/2020/NĐ-CP | Vị trí việc làm và số lượng người làm việc trong đơn vị sự nghiệp công lập | Nhóm 5, 9 |
| Quyết định 466/QĐ-UBND (13/02/2026, UBND tỉnh Phú Thọ) | Vị trí, chức năng, nhiệm vụ, cơ cấu tổ chức BVĐK tỉnh Phú Thọ | Căn cứ chuẩn cho hầu hết QĐ nội bộ của phòng |
| Quyết định 06/2025/QĐ-UBND | Chức năng, nhiệm vụ Sở Y tế tỉnh Phú Thọ | Nhóm 7 (cử cán bộ tuyến trên), 8 (hội nghị/hội thảo) |
| Quyết định 3776/QĐ-BV | Quy chế đào tạo, bồi dưỡng viên chức của Bệnh viện | Nhóm 2, 7 |
| Quyết định 568/QĐ-BV | Quy chế chi tiêu nội bộ của Bệnh viện | Nhóm 2, 7 — căn cứ chi trả lương/phụ cấp/kinh phí đào tạo |
| Nghị định 60/2021/NĐ-CP + Nghị định 111/2025/NĐ-CP | Cơ chế tự chủ tài chính đơn vị sự nghiệp công lập | Nhóm 1, 4 — áp dụng khi hợp đồng CGKT/thực hành có yếu tố thu phí |

## Lưu ý khi dùng

- Nhóm 6 (`assets/hop-dong-thuc-hanh-kbcb.docx`, `assets/qd-phan-cong-nguoi-huong-dan-thuc-hanh.docx`) đã hardcode literal 3 căn cứ đầu (Bộ luật Dân sự 2015, Luật KCB 2023, NĐ 96/2023) trực tiếp trong file — **không phải `{{KEY}}`** vì đây là căn cứ cố định không đổi theo từng lần dùng. Nếu văn bản đổi số hiệu, sửa trực tiếp bằng `officecli set`, không dùng `merge`.
- Văn bản nhân sự/tự chủ tài chính (NĐ 115/2020, NĐ 85/2023, NĐ 60/2021, NĐ 111/2025) hay được sửa đổi/thay thế hơn nhóm KCB — xác nhận với người dùng/Văn thư trước khi trích dẫn cho văn bản mới, không mặc định số hiệu ở bảng trên còn hiệu lực vĩnh viễn.
