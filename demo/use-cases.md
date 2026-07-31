# Use Cases Chi Tiết — Bệnh viện Phú Thọ

## Use Case 1: Chức năng nhiệm vụ phòng Tổ chức cán bộ
- **Phòng**: Tổ chức cán bộ
- **Người yêu cầu**: Lê Quyết Thắng
- **Mô tả**: AI hỗ trợ tra cứu, tổng hợp chức năng nhiệm vụ phòng TCCB
- **Output mong muốn**: Tất cả thông tin liên quan
- **Ưu tiên**: Cao

### Prompt Demo
```
Bạn là trợ lý AI của Bệnh viện Phú Thọ. Hãy tổng hợp đầy đủ:
1. Chức năng của Phòng Tổ chức cán bộ
2. Nhiệm vụ cụ thể
3. Quyền hạn
4. Mối quan hệ công tác với các phòng ban khác
5. Căn cứ pháp lý (nếu có)

Trình bày dạng văn bản hành chính, có mục lục rõ ràng.
```

---

## Use Case 2: Biên bản họp Hội đồng thuốc và điều trị
- **Phòng**: Vật tư - TBYT
- **Người yêu cầu**: Thu Anh Đặng
- **Mô tả**: Tạo biên bản họp về xây dựng danh mục thuốc mua sắm
- **Output**: file.docx
- **Ưu tiên**: Cao

### Prompt Demo
```
Hãy soạn Biên bản họp Hội đồng Thuốc và Điều trị Bệnh viện Phú Thọ với nội dung:

Chủ đề: Xây dựng danh mục thuốc để tổ chức mua sắm năm [năm]

Biên bản cần bao gồm:
- Quốc hiệu, tiêu ngữ, tên bệnh viện
- Số biên bản, ngày tháng
- Thành phần tham dự (Chủ tịch HĐ, thư ký, các ủy viên)
- Thời gian, địa điểm họp
- Nội dung thảo luận:
  + Rà soát danh mục thuốc hiện có
  + Đề xuất thuốc cần mua sắm bổ sung
  + Tiêu chí lựa chọn (theo Thông tư 29/2023/TT-BYT)
- Kết luận của Chủ tịch hội đồng
- Chữ ký các thành phần

Định dạng file Word (.docx), font Times New Roman, cỡ 13, theo thể thức văn bản hành chính VN (Nghị định 30/2020/NĐ-CP).
```

---

## Use Case 3: Bộ hồ sơ từ list quy trình + mẫu có sẵn
- **Phòng**: Vật tư - TBYT
- **Người yêu cầu**: Đinh Văn Năm
- **Mô tả**: Từ danh sách hồ sơ kèm mẫu đã cung cấp → xây dựng bộ hồ sơ mới hoàn chỉnh
- **Output**: Nhiều file docx để kiểm soát, trình ký
- **Ưu tiên**: Cao
- **Ghi chú**: Mẫu hồ sơ đã gửi qua Google Drive

### Prompt Demo
```
Tôi cung cấp cho bạn:
1. Danh sách các loại hồ sơ cần xây dựng (theo quy trình mua sắm TBYT)
2. Mẫu hồ sơ đã có (file đính kèm)

Hãy dựa trên mẫu và danh sách để:
- Tạo đầy đủ từng file hồ sơ theo list
- Đảm bảo tính nhất quán giữa các biểu mẫu
- Sử dụng ngôn ngữ hành chính, đúng thể thức
- Các trường thông tin để [placeholder] cho người dùng điền

List hồ sơ:
[Chèn danh sách hồ sơ tại đây]

Xuất ra từng file riêng biệt, đặt tên rõ ràng.
```

---

## Use Case 4: Tờ trình Hội đồng thuốc và điều trị
- **Phòng**: Vật tư - TBYT
- **Người yêu cầu**: Thu Anh Đặng
- **Mô tả**: Tạo tờ trình đề nghị phê duyệt danh mục thuốc mua sắm
- **Output**: file.docx
- **Ưu tiên**: Cao

### Prompt Demo
```
Soạn Tờ trình của Hội đồng Thuốc và Điều trị gửi Giám đốc Bệnh viện Phú Thọ:

Trích yếu: Đề nghị phê duyệt danh mục thuốc để tổ chức mua sắm năm [năm]

Nội dung:
- Căn cứ pháp lý (Luật Dược 2016, NĐ 54/2017, NĐ 155/2018, TT 29/2023)
- Căn cứ nhu cầu sử dụng thuốc của các khoa lâm sàng
- Căn cứ đề xuất của Hội đồng Thuốc và Điều trị (cuộc họp ngày [...])
- Danh mục thuốc đề nghị mua sắm (phụ lục kèm theo)
- Tổng kinh phí dự kiến
- Nguồn kinh phí
- Hình thức lựa chọn nhà thầu

Ký tên: Chủ tịch Hội đồng Thuốc và Điều trị

Format: Times New Roman 13, thể thức văn bản hành chính theo NĐ 30/2020/NĐ-CP.
```

---

## Use Case 5: Quyết định phân công người hướng dẫn thực hành
- **Phòng**: Đào tạo
- **Người yêu cầu**: Nguyễn Thị Nga
- **Mô tả**: Soạn quyết định phân công người hướng dẫn thực hành cho học viên
- **Output**: file doc/docx
- **Ưu tiên**: Cao
- **Căn cứ**: Nghị định 96/2023/NĐ-CP

### Prompt Demo
```
Soạn Quyết định phân công người hướng dẫn thực hành tại Bệnh viện Phú Thọ.

Căn cứ pháp lý:
- Nghị định 96/2023/NĐ-CP quy định về chuyên gia hướng dẫn thực hành
- Luật Khám chữa bệnh 2023
- Quy chế đào tạo của bệnh viện

Thông tin:
- Họ tên người hướng dẫn: [placeholder]
- Chức danh, chuyên khoa: [placeholder]
- Khoa/Phòng công tác: [placeholder]
- Họ tên học viên: [placeholder]
- Chuyên ngành đào tạo: [placeholder]
- Thời gian hướng dẫn: [placeholder]
- Nội dung hướng dẫn: [placeholder]

Quyết định gồm:
1. Điều 1: Phân công người hướng dẫn
2. Điều 2: Nhiệm vụ người hướng dẫn
3. Điều 3: Chế độ chính sách
4. Điều 4: Trách nhiệm các bên
5. Điều 5: Hiệu lực

Format: Thể thức quyết định hành chính, Times New Roman 13.
```

---

## Use Case 6: Kiểm tra, đánh giá văn bản pháp lý
- **Phòng**: Tổ chức cán bộ
- **Người yêu cầu**: Nguyễn Thị Thanh Huyền
- **Mô tả**: AI kiểm tra quy định, quy chế, quy trình, nội quy, KH, BC, hợp đồng, văn bản... thuộc lĩnh vực phụ trách
- **Output mong muốn**:
  1. Đánh giá tính hợp pháp, thống nhất, đồng bộ, rõ ràng, khả thi
  2. Mức độ rủi ro pháp lý
  3. Kiểm tra căn cứ pháp lý (còn hiệu lực / đã sửa đổi / bãi bỏ)
  4. Chỉ ra nội dung mâu thuẫn, chồng chéo
  5. Đề xuất biện pháp kiểm soát rủi ro
  6. Gợi ý sửa câu chữ cụ thể
- **Ưu tiên**: Cao

### Prompt Demo
```
Bạn là chuyên gia pháp lý y tế. Hãy kiểm tra văn bản sau và đánh giá:

[VĂN BẢN CẦN KIỂM TRA]

Yêu cầu đánh giá theo các tiêu chí:

1. **Tính hợp pháp**: Văn bản có tuân thủ pháp luật hiện hành không?
2. **Tính thống nhất**: Có mâu thuẫn với các quy định, quy chế khác của bệnh viện không?
3. **Tính đồng bộ**: Có trùng lặp, chồng chéo không?
4. **Tính rõ ràng**: Ngôn ngữ có dễ hiểu, không mơ hồ không?
5. **Tính khả thi**: Có thể triển khai thực tế không?

Với mỗi vấn đề phát hiện:
- Nêu rõ vị trí (điều, khoản, câu)
- Giải thích nguyên nhân rủi ro
- Đề xuất phương án sửa (viết lại câu chữ cụ thể)
- Liệt kê căn cứ pháp lý liên quan (và trạng thái hiệu lực)

Kết luận: Mức rủi ro tổng thể (Thấp / Trung bình / Cao) và khuyến nghị.
```
