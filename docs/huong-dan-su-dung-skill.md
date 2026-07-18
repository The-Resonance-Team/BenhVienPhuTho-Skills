# Hướng dẫn sử dụng skill — theo từng phòng ban

Tài liệu cho **nhân viên các phòng ban** BVĐK tỉnh Phú Thọ dùng trợ lý AI (OpenWork/Claude) để soạn giấy tờ. Không cần biết khái niệm "skill" — chỉ cần gõ đúng từ khóa phòng ban + việc cần làm, AI tự chọn đúng mẫu.

Muốn biết cách cài đặt máy trạm, đăng nhập OpenWork, chọn workspace: xem [`onboarding-cowork.md`](onboarding-cowork.md). Tài liệu này chỉ tập trung **cách gọi đúng skill và ví dụ câu gõ** cho cả 7 phòng ban hiện có.

---

## 1. Cách kích hoạt skill

Cách chắc chắn nhất: gõ **lệnh gạch chéo `/phong-<tên phòng>`** ngay đầu tin nhắn, gọi đúng skill của phòng mình, sau đó mô tả việc cần làm:

| Phòng ban | Lệnh |
|---|---|
| Hành chính quản trị | `/phong-hcqt` |
| Điều dưỡng | `/phong-dieu-duong` |
| Quản lý chất lượng | `/phong-qlcl` |
| Công nghệ thông tin | `/phong-cntt` |
| Kế toán dự án | `/phong-ktda` |
| Vật tư – TBYT | `/phong-vattu` |
| Tổ chức cán bộ | `/phong-tccb` |

Ví dụ: `/phong-hcqt soạn tờ trình phê duyệt dự toán và KHLCNT mua văn phòng phẩm quý 3`.

Không nhớ đúng lệnh hoặc không gõ `/` cũng không sao — chỉ cần **mô tả việc cần làm bằng tiếng Việt tự nhiên**, nhắc rõ:

1. **Tên phòng ban** hoặc từ khóa nghiệp vụ của phòng (vd. "TCCB", "nghỉ hưu", "điều xe", "chỉ định thầu dịch vụ"...).
2. **Loại giấy tờ** muốn soạn (tờ trình, quyết định, công văn, biên bản...).

AI đọc mô tả kỹ thuật (`description`) của từng skill và tự chọn skill khớp nhất — xem cột "Từ khóa kích hoạt" ở mục 3 để biết nên nhắc từ nào. Cách này chậm hơn `/phong-*` một chút (AI phải tự suy luận) nhưng vẫn ra đúng skill nếu mô tả đủ rõ.

**Lần đầu dùng máy mới:** gõ `/setup` hoặc "kiểm tra môi trường trước khi soạn văn bản" để AI tự kiểm tra `officecli` đã cài chưa (skill `setup`). Việc này chỉ cần làm 1 lần/máy — các lần sau AI tự nhận ra đã sẵn sàng và bỏ qua bước cài lại.

---

## 2. Quy trình chung (áp dụng mọi phòng)

1. **Bạn gõ yêu cầu** → AI xác định đúng phòng ban + loại giấy tờ.
2. **AI hỏi gộp một lần** toàn bộ thông tin còn thiếu (đánh số 1, 2, 3...) — không hỏi từng câu một. Bạn trả lời theo đúng định dạng `1=..., 2=..., 3=...` để AI xử lý nhanh nhất.
3. **AI tóm tắt lại** toàn bộ giá trị đã thu thập, xin bạn xác nhận trước khi tạo file.
4. **AI sinh file** `.docx`/`.xlsx` từ mẫu chuẩn của bệnh viện (không tự bịa bố cục mới), kiểm tra lỗi định dạng/nội dung.
5. **AI giao file** kèm ghi chú: còn thiếu trường nào (nếu có), số văn bản/ngày ký để trống chờ Văn thư cấp.

Với dữ liệu cá nhân (CCCD, sổ BHXH, số tài khoản...) hoặc dữ liệu tài chính bệnh viện: AI **luôn hỏi lại bạn**, không tự lấy từ lần soạn trước, dù giá trị không đổi — tránh điền sai khi có thay đổi nhân sự/tài khoản.

---

## 3. Ví dụ câu gõ theo từng phòng ban

### Phòng Hành chính quản trị (HCQT)

**Từ khóa:** HCQT, hành chính quản trị, tờ trình dự toán, KHLCNT, KQLCNT, hợp đồng, điều xe, VPP, dự trù vật tư, đánh giá nhà cung cấp.

Ví dụ:
- "Soạn tờ trình phê duyệt dự toán và KHLCNT mua văn phòng phẩm quý 3 cho phòng HCQT"
- "Làm phiếu điều động xe ô tô đi công tác ngày mai"
- "Soạn biên bản nghiệm thu khối lượng hoàn thành cho hợp đồng vừa ký"

### Phòng Điều dưỡng

**Từ khóa:** điều dưỡng, thi tay nghề, KTV, sinh hoạt khoa học (SHKH), ban chỉ đạo/ban đề thi/giám khảo.

Ví dụ:
- "Soạn quyết định tổ chức thi tay nghề điều dưỡng-KTV năm 2026"
- "Soạn kế hoạch thi tay nghề cho điều dưỡng, dự kiến tháng 9"
- "Làm công văn thông báo sinh hoạt khoa học tháng này cho phòng Điều dưỡng"

### Phòng Quản lý chất lượng (QLCL)

**Từ khóa:** QLCL, khảo sát hài lòng, chỉ số chất lượng, sự cố y khoa, an toàn người bệnh, ISO 9001/15189, 5S, Bộ 83 tiêu chí, đề án cải tiến (PDCA/Lean/FMEA), đào tạo/truyền thông.

Ví dụ:
- "Soạn báo cáo sự cố y khoa tháng này theo mẫu QLCL"
- "Phân tích kết quả khảo sát hài lòng người bệnh quý vừa rồi, tôi có file Excel đính kèm"
- "Soạn đề án cải tiến chất lượng theo PDCA cho vấn đề thời gian chờ khám"

QLCL **chưa có mẫu `.docx` runtime** — AI trả lời bằng bản thảo Markdown đúng thể thức hành chính để bạn dán vào mẫu phòng đang dùng.

### Phòng Công nghệ thông tin (CNTT)

**Từ khóa:** CNTT, mua sắm thiết bị CNTT, tờ trình dự toán/KHLCNT thiết bị, hợp đồng mua bán thiết bị, biên bản giao nhận TSCĐ-CCDC.

Ví dụ:
- "Soạn đơn đề xuất mua sắm máy chủ mới cho phòng CNTT"
- "Soạn tờ trình duyệt KQLCNT cho gói mua máy in đã chọn được nhà thầu"
- "Làm biên bản giao nhận tài sản cố định cho lô máy tính mới nhận"

### Phòng Kế toán dự án (KTDA)

**Từ khóa:** KTDA, kế toán dự án, chỉ định thầu dịch vụ 50–dưới 500 triệu.

Ví dụ:
- "Soạn đơn đề xuất chỉ định thầu dịch vụ bảo trì thang máy"
- "Soạn hợp đồng kinh tế dịch vụ bảo trì điều hòa vừa chốt giá"
- "Làm giấy đề nghị thanh toán cho hợp đồng dịch vụ vệ sinh công nghiệp"

### Phòng Vật tư – TBYT

**Từ khóa:** Vật tư, TBYT, mua sắm vật tư y tế, chào giá trực tuyến, E-TBMT, KHLCNT/KQLCNT, HĐKH, Tổ chuyên gia đấu thầu.

Ví dụ:
- "Soạn chủ trương mua sắm băng ghim và dụng cụ cắt khâu nối"
- "Làm biên bản họp Hội đồng khoa học thống nhất danh mục và tiêu chí kỹ thuật"
- "Soạn hợp đồng kinh tế mua bán hàng hóa cho gói vật tư vừa có KQLCNT"

Quy trình phòng Vật tư dài hơn (qua mạng đấu thầu quốc gia) — AI sẽ hỏi bạn đang ở bước nào trong chu trình (chủ trương → HĐKH → dự toán/KHLCNT → chào giá → KQLCNT → hợp đồng) nếu bạn không nói rõ.

### Phòng Tổ chức cán bộ (TCCB)

**Từ khóa:** TCCB, tổ chức cán bộ, nghỉ hưu, sổ BHXH, chứng chỉ hành nghề, xác nhận công tác, thay đổi nhân lực bệnh viện.

Ví dụ:
- "Soạn quyết định nghỉ hưu để hưởng chế độ BHXH cho một viên chức"
- "Làm giấy xác nhận thời gian công tác phục vụ hồ sơ chứng chỉ hành nghề"
- "Soạn công văn thông báo BHXH về việc thay đổi nhân lực bệnh viện tháng này"

⚠️ TCCB xử lý **dữ liệu cá nhân nhạy cảm nhất** trong toàn bộ skill (CCCD, sổ BHXH, tài khoản lương, nơi cư trú). AI sẽ luôn hỏi lại các trường này, không tự đoán/lấy từ hồ sơ cũ, và không đưa dữ liệu ra ngoài phiên làm việc (không dán Google Forms/Sheets, cloud, agent ngoài).

---

## 4. Việc ngoài luồng skill — nghiên cứu, tìm kiếm, tổng hợp

7 skill ở mục 3 chỉ phủ **soạn giấy tờ theo mẫu chuẩn** của từng phòng. Rất nhiều việc hàng ngày không cần mẫu — AI vẫn hỗ trợ được **không qua skill nào**, dùng thẳng như hỏi một trợ lý bình thường: gõ câu hỏi/tự nhiên, không cần nhắc tên phòng hay từ khóa kích hoạt.

### Tra cứu / nghiên cứu

Hỏi quy định, thuật ngữ, so sánh văn bản pháp luật — **luôn kèm hoặc dán văn bản gốc** nếu có, để AI trích dẫn đúng thay vì suy đoán từ hiểu biết chung (văn bản pháp luật hay hết hiệu lực/thay đổi số hiệu).

- "Giải thích ngưỡng chỉ định thầu theo Luật Đấu thầu hiện hành là bao nhiêu"
- "So sánh điểm khác nhau giữa Thông tư A và Thông tư B, tôi đính kèm cả hai file"
- "Quy trình chỉ định thầu dịch vụ 50–dưới 500 triệu gồm những bước nào"

### Tìm kiếm thông tin

- "Tìm giúp tôi trong các file đã đính kèm phần nói về thời hạn nghiệm thu"
- "Trong đống công văn này, cái nào liên quan đến gói thầu vật tư tháng 6"

### Tổng hợp / tóm tắt

- "Tóm tắt nội dung văn bản này giúp tôi"
- "Gộp 3 báo cáo này thành một bảng so sánh theo tháng"
- "Tổng hợp các sự cố y khoa trong file Excel này theo khoa, không cần phân tích nguyên nhân"

### Soạn thảo tự do (không theo mẫu chính thức)

Ghi chú nội bộ, email, dàn ý trình bày, bản nháp chưa cần đúng thể thức hành chính — cứ mô tả yêu cầu bình thường. Khi việc chạm tới **giấy tờ chính thức có mẫu** (tờ trình, quyết định, hợp đồng...), AI sẽ tự chuyển sang skill đúng phòng ban ở mục 3 thay vì tự bịa bố cục.

### Lưu ý an toàn khi dùng ngoài luồng skill

- Không dán dữ liệu bệnh nhân, CCCD, sổ BHXH, số tài khoản vào câu hỏi nếu không thật sự cần thiết cho việc đang hỏi.
- Với nội dung viện dẫn quy định/số liệu: yêu cầu AI trích dẫn rõ nguồn (tên văn bản/điều khoản, tên file số liệu) — câu trả lời không có nguồn thì hỏi lại, không dùng ngay.
- Việc ngoài luồng skill vẫn nằm trong phiên làm việc trên máy trạm đã cấu hình (mục 3–4 của `onboarding-cowork.md`) — không copy dữ liệu nội bộ sang công cụ AI khác ngoài hệ thống bệnh viện đã duyệt.

---

## 5. Câu hỏi thường gặp

| Tình huống | Cách xử lý |
|---|---|
| AI hỏi thiếu thông tin nhưng bạn trả lời từng câu một | AI sẽ nhắc lại: trả lời gộp một lần theo định dạng `1=..., 2=..., 3=...` |
| File tạo ra còn sót `{{...}}` chưa điền | Báo lại cho AI — đây là trường chưa có dữ liệu thật, chưa nên gửi/ký file này |
| Cần loại giấy tờ chưa có mẫu thật trong hệ thống | AI sẽ báo rõ "chưa có mẫu", đưa bản thảo Markdown tạm và đề nghị bạn cung cấp mẫu `.docx` gốc đã duyệt để thêm vào sau |
| Số văn bản (`___/QĐ-BV`...) bị để trống | Đúng thiết kế — số do Văn thư cấp, không phải AI tự đánh số |
| Không chắc phòng ban nào phù hợp với yêu cầu | Cứ mô tả việc cần làm, AI tự xác định qua từ khóa nghiệp vụ; nếu nhầm, nói rõ tên phòng để AI chuyển đúng skill |
