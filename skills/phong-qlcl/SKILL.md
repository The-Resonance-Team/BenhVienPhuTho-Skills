---
name: phong-qlcl
description: "Skill Phòng Quản lý chất lượng (BVĐK tỉnh Phú Thọ): văn bản hành chính QLCL, khảo sát & chỉ số chất lượng, sự cố y khoa & an toàn người bệnh, tiêu chuẩn chất lượng (ISO 9001:2015, ISO 15189:2022, 5S, Bộ 83 tiêu chí CLBV 2.0), đề án cải tiến chất lượng (PDCA/Lean/Six Sigma/FMEA), nội dung đào tạo & truyền thông, kiểm tra/tóm tắt văn bản và hỏi-đáp QLCL."
---

# Phòng Quản lý chất lượng

## Tổng quan

Skill theo phòng **QLCL**. Phòng là đơn vị tham mưu cho Giám đốc và Hội đồng quản lý chất lượng bệnh viện (không phải đơn vị ra quyết định cuối cùng) — chi tiết vị trí/chức năng/nhiệm vụ/cơ cấu ở `references/qlcl-to-chuc-nhiem-vu.md`. Danh mục đầy đủ các đầu việc và mức độ AI đã hỗ trợ (Đã thực hiện/Đang thực hiện/chưa bắt đầu) ở `references/qlcl-danh-muc-ai-ho-tro.md` — đối chiếu trước khi mô tả một đầu việc là "mới".

## Cổng bắt buộc (áp dụng mọi nhánh bên dưới)

- **Trích dẫn đúng nguồn**: mọi nội dung viện dẫn quy định/tiêu chuẩn (Thông tư, Quyết định BYT, ISO, Bộ tiêu chí...) phải lấy từ tài liệu người dùng cung cấp trong phiên làm việc. Thiếu tài liệu nguồn → hỏi người dùng cung cấp trước khi soạn, không dùng hiểu biết chung để đoán nội dung điều khoản.
- **Không bịa số liệu**: tỷ lệ, số ca, kết quả khảo sát, chỉ số phải có nguồn (Excel/HIS/Form đã thu thập) do người dùng đưa vào. Chưa có dữ liệu → hỏi nguồn trước khi phân tích/viết nhận xét.
- **Đánh dấu dự thảo**: mọi văn bản hành chính đầu ra ghi rõ "Dự thảo — chờ [Trưởng phòng] xem xét, [Giám đốc] phê duyệt" ở đầu trang, đúng chuỗi thẩm quyền tại `references/qlcl-to-chuc-nhiem-vu.md` mục 4.

## Quản trị dữ liệu bệnh viện

- Ưu tiên dữ liệu đã khử định danh. Không đưa họ tên, mã người bệnh, số hồ sơ, số điện thoại, địa chỉ, hình ảnh, bệnh án, hoặc dữ liệu có thể tái nhận diện vào prompt nếu chưa có phê duyệt của bệnh viện.
- Giữ dữ liệu sự cố, khảo sát và chỉ số trong file/kho lưu trữ được bệnh viện phê duyệt; không tự gửi sang Google Forms, AppSheet, QR service, cloud storage, web API, hoặc agent từ xa.
- Nếu user yêu cầu thiết kế Form/QR/AppSheet, chỉ thiết kế schema/checklist không chứa dữ liệu thật, nêu rõ quyền truy cập, thời hạn lưu, người chịu trách nhiệm và bước phê duyệt CNTT/QLCL trước khi triển khai.
- Tách file dữ liệu nguồn khỏi bản nháp/văn bản đầu ra; chỉ giao bản dự thảo tối thiểu cần thiết và không chèn dữ liệu nhận diện vào phụ lục nếu không bắt buộc.

## Xuất file

Phòng QLCL **chưa có runtime `.docx` trong `assets/`**. Vì vậy:

- Mặc định: trả lời bằng **Markdown có cấu trúc đúng thể thức văn bản hành chính** (quốc hiệu–tiêu ngữ, số/ký hiệu để `___` chờ Văn thư cấp, trích yếu, căn cứ pháp lý, nội dung, nơi nhận, thẩm quyền ký) để người dùng dán vào mẫu phòng đang dùng.
- Khi có mẫu `.docx` thật của phòng (biên bản đánh giá nội bộ ISO, quyết định thành lập tổ, kế hoạch mẫu...), giữ nguồn ngoài repo và dùng `node scripts/build-runtime-assets.js --source-root <private-root> --skills phong-qlcl`; sau review mới đưa bản runtime đã sanitize vào `assets/` và bật nhánh xuất `.docx`.
- **Không** dùng `officecli new --prompt` hay Markdown-tự-do làm bố cục thay cho mẫu thật khi mẫu đã tồn tại.

## Nhánh nghiệp vụ

Xác định nhánh theo từ khóa người dùng nêu; một yêu cầu có thể chạm nhiều nhánh liên tiếp (vd. khảo sát → phân tích → soạn báo cáo dùng cả nhánh 1 và 2).

### 1. Văn bản hành chính QLCL

Từ khóa: công văn, kế hoạch, quyết định, quy chế, biểu mẫu, tờ trình.

1. Hỏi có mẫu/biểu mẫu năm trước không — nếu có, dùng làm khung cập nhật thay vì soạn mới từ đầu.
2. Xác định đúng thể thức: quốc hiệu, số/ký hiệu (`___`), trích yếu, căn cứ pháp lý, nội dung, nơi nhận.
3. Gắn đúng cấp thẩm quyền soạn/ký theo mục 3–4 của `qlcl-to-chuc-nhiem-vu.md`.
4. Đánh dấu DỰ THẢO theo Cổng bắt buộc.

**Hoàn thành khi:** văn bản đủ thể thức, có căn cứ pháp lý cụ thể (không để trống mục căn cứ), đã đánh dấu dự thảo.

### 2. Khảo sát & chỉ số chất lượng

Từ khóa: khảo sát, hài lòng người bệnh/NVYT, chỉ số chất lượng, tỷ lệ, thời gian khám bệnh, Dashboard, phương tiện phục vụ, CSYT Xanh-Sạch-Đẹp.

Chu trình 5 bước lặp lại xuyên suốt danh mục (`qlcl-danh-muc-ai-ho-tro.md`, Tổ 1 & Tổ 2):

1. **Kế hoạch** — dùng biểu mẫu kỳ trước làm khung.
2. **Thiết kế thu thập** — Google Form/QR/AppSheet/checklist điện tử; hỏi khoa/phòng liên quan.
3. **Kiểm soát & nhập liệu** — đối chiếu số phiếu theo khoa, chuẩn hoá dữ liệu trước khi phân tích.
4. **Phân tích** — tính tỷ lệ/chỉ số, so sánh kỳ trước, biểu đồ. Chỉ dùng số liệu người dùng đã cung cấp.
5. **Nhận xét & đề xuất** — giải pháp gắn với nguyên nhân cụ thể tìm được ở bước 4, kèm cơ chế theo dõi hiệu quả sau can thiệp.

**Hoàn thành khi:** đủ 5 bước, mỗi số liệu có nguồn đối chiếu được, đề xuất giải pháp không chung chung (gắn với nguyên nhân đã phân tích).

### 3. Sự cố y khoa & an toàn người bệnh

Từ khóa: sự cố y khoa, phân loại sự cố, té ngã, nhận diện người bệnh, RCA, nguyên nhân gốc, khuyến cáo phòng ngừa, bảng kiểm an toàn phẫu thuật.

1. Phân loại sự cố **chỉ** theo bảng phân loại trong văn bản người dùng cung cấp (Thông tư 43/2018/TT-BYT hoặc văn bản thay thế hiện hành) — chưa có văn bản thì hỏi trước, không tự suy đoán mức độ tổn hại.
2. Tổng hợp theo thời gian/mức độ/khoa.
3. Phân tích nguyên nhân gốc rễ (RCA) dựa trên dữ liệu sự cố đã có.
4. Đề xuất khuyến cáo phòng ngừa gắn với nguyên nhân ở bước 3, kèm cách theo dõi hiệu quả.

**Hoàn thành khi:** mỗi sự cố có mã phân loại truy nguyên được về điều khoản văn bản gốc; khuyến cáo không lặp lại nguyên văn sự cố mà chỉ ra hành động cụ thể.

### 4. Tiêu chuẩn chất lượng (ISO / 5S / Bộ tiêu chí)

Từ khóa: ISO 9001, ISO 15189, 5S, Bộ 83 tiêu chí CLBV 2.0, Bộ tiêu chí CLBV nâng cao, đánh giá nội bộ, rủi ro và cơ hội.

1. Xác định đúng phiên bản/mức yêu cầu **từ tài liệu tiêu chuẩn do người dùng cung cấp** — không dùng hiểu biết chung về ISO/Bộ tiêu chí để điền nội dung điều khoản.
2. Rà soát hiện trạng theo từng tiêu chí: bằng chứng hiện có, căn cứ pháp lý, đơn vị chịu trách nhiệm.
3. Xác định khoảng cách (gap) giữa hiện trạng và mức điểm mục tiêu.
4. Đề xuất giải pháp + đơn vị thực hiện + thời hạn cho từng khoảng cách ở bước 3.

**Hoàn thành khi:** mỗi tiêu chí đang xét có đủ 4 trường bằng chứng/gap/giải pháp/đơn vị-thời hạn — không bỏ trống trường nào của tiêu chí đã chọn để xử lý.

### 5. Đề án cải tiến chất lượng

Từ khóa: đề án cải tiến, PDCA, Lean, Six Sigma, FMEA.

1. Cấu trúc chuẩn: tên đề án, mục tiêu, phạm vi, phân tích hiện trạng, giải pháp theo phương pháp đã chọn, kế hoạch triển khai, chỉ số đo hiệu quả trước–sau.
2. Thu thập/phân tích số liệu trước và sau can thiệp — chỉ dùng số liệu người dùng cung cấp; nêu rõ nếu thiếu số liệu sau can thiệp (đề án đang chạy).
3. Đánh giá tính mới, tính khả thi, hiệu quả kinh tế, khả năng nhân rộng dựa trên số liệu ở bước 2, không mô tả định tính chung chung.

**Hoàn thành khi:** đề án có số liệu trước–sau (hoặc nêu rõ đang thiếu phần nào) và đánh giá hiệu quả định lượng, không chỉ lời văn mô tả.

### 6. Nội dung đào tạo & truyền thông

Từ khóa: bài giảng, poster, bản tin, slide, video hướng dẫn, checklist điện tử.

1. Xác định đối tượng và mục tiêu truyền thông/đào tạo.
2. Xây dựng kịch bản/nội dung bám sát quy trình hoặc tiêu chuẩn hiện hành do người dùng cung cấp — không tự suy diễn quy trình chưa được xác nhận.
3. Chọn hình thức phù hợp kênh (video/poster/slide/bài giảng + ngân hàng câu hỏi nếu là đào tạo).

**Hoàn thành khi:** nội dung đối chiếu được với quy trình/tài liệu nguồn đã cung cấp; có định dạng đầu ra rõ ràng.

### 7. Kiểm tra/tóm tắt văn bản & hỏi-đáp QLCL

Từ khóa: kiểm tra chính tả, tóm tắt, hỏi đáp, trợ lý QLCL.

- **Kiểm tra văn bản**: lỗi chính tả, ngữ pháp, định dạng, tính thống nhất — không chỉnh nội dung chuyên môn nếu không được yêu cầu.
- **Tóm tắt tài liệu**: ngắn gọn, đầy đủ, giữ nguyên số liệu/điều khoản gốc, không diễn giải thêm ý không có trong văn bản.
- **Hỏi-đáp**: trả lời **chỉ** dựa trên tài liệu đã cung cấp trong phiên; luôn trích dẫn tên văn bản/điều khoản cụ thể. Câu hỏi vượt phạm vi tài liệu đã có → nêu rõ giới hạn, đề nghị người dùng cung cấp thêm nguồn thay vì suy đoán.

**Hoàn thành khi:** mọi khẳng định về quy định trong câu trả lời có trích dẫn nguồn cụ thể (tên văn bản + mục/điều nếu có).

## Sau khi xong

1. Trả lời người dùng: đã tạo nội dung gì, còn thiếu dữ liệu/tài liệu nguồn gì (nếu có).
2. Nếu văn bản hành chính: nhắc rõ đây là dự thảo, còn chờ xem xét/phê duyệt theo chuỗi thẩm quyền.
