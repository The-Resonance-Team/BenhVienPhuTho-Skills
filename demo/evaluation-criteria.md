# Tiêu chí Đánh giá Model

## Thang điểm tổng thể

| Tiêu chí | Trọng số | Mô tả |
|----------|----------|-------|
| **A. Thể thức văn bản** | 30% | Đúng NĐ 30/2020/NĐ-CP, font, căn lề, quốc hiệu |
| **B. Nội dung pháp lý** | 25% | Căn cứ pháp lý đúng, còn hiệu lực |
| **C. Tính nhất quán** | 15% | Thông tin nhất quán giữa các phần, các file |
| **D. Tiếng Việt** | 15% | Đúng chính tả, thuật ngữ y tế, văn phong hành chính |
| **E. Khả năng thực thi** | 15% | Output dùng được ngay, placeholder đúng chỗ |

---

## Rubric chi tiết

### A. Thể thức văn bản (30%)

| Điểm | Tiêu chuẩn |
|------|-----------|
| **5** | Đúng hoàn toàn NĐ 30/2020: quốc hiệu, tiêu ngữ, tên cơ quan, số hiệu, ngày tháng, thể thức ký |
| **4** | Sai 1 thành phần phụ (căn lề, cỡ chữ) |
| **3** | Thiếu 1 thành phần bắt buộc (quốc hiệu, tên cơ quan) |
| **2** | Sai thể thức cơ bản (không có tiêu đề, không có số hiệu) |
| **1** | Không theo thể thức hành chính VN |

### B. Nội dung pháp lý (25%)

| Điểm | Tiêu chuẩn |
|------|-----------|
| **5** | Căn cứ pháp lý đầy đủ, chính xác, tất cả còn hiệu lực |
| **4** | Đúng nhưng thiếu 1-2 căn cứ phụ |
| **3** | Có căn cứ sai hoặc hết hiệu lực (1 cái) |
| **2** | Nhiều căn cứ sai, hoặc áp dụng sai luật |
| **1** | Không có căn cứ pháp lý hoặc sai nghiêm trọng |

**Căn cứ pháp lý cần biết:**
- Nghị định 30/2020/NĐ-CP (thể thức văn bản)
- Luật Dược 2016, NĐ 54/2017, NĐ 155/2018 (dược)
- NĐ 96/2023/NĐ-CP (hướng dẫn thực hành)
- Luật Đấu thầu 2023, NĐ 24/2024 (mua sắm)
- Thông tư 29/2023/TT-BYT (danh mục thuốc)

### C. Tính nhất quán (15%)

| Điểm | Tiêu chuẩn |
|------|-----------|
| **5** | Mọi thông tin khớp giữa các phần (tên, ngày, số tiền, danh mục) |
| **4** | 1 chỗ không khớp nhỏ |
| **3** | 2-3 chỗ mâu thuẫn |
| **2** | Mâu thuẫn thông tin quan trọng (số tiền, tên) |
| **1** | Các phần rời rạc, không liên kết |

### D. Tiếng Việt & Thuật ngữ y tế (15%)

| Điểm | Tiêu chuẩn |
|------|-----------|
| **5** | Không lỗi chính tả, thuật ngữ y tế chính xác, văn phong hành chính |
| **4** | 1-2 lỗi chính tả nhỏ |
| **3** | 3-5 lỗi, hoặc dùng sai thuật ngữ |
| **2** | Nhiều lỗi, văn phong không phù hợp |
| **1** | Lỗi nghiêm trọng, dùng từ sai ngữ cảnh |

**Thuật ngữ cần check:**
- "Hội đồng Thuốc và Điều trị" (viết hoa đúng)
- "Biên bản" vs "Tờ trình" vs "Quyết định"
- "Danh mục thuốc thiết yếu" / "Danh mục thuốc bệnh viện"
- "Lựa chọn nhà thầu" (không phải "đấu thầu" mọi trường hợp)

### E. Khả năng thực thi (15%)

| Điểm | Tiêu chuẩn |
|------|-----------|
| **5** | Output dùng được ngay, chỉ cần điền placeholder |
| **4** | Cần chỉnh sửa nhỏ |
| **3** | Cần bổ sung nội dung đáng kể |
| **2** | Thiếu nhiều phần, cần viết lại |
| **1** | Không dùng được |

---

## Cách chấm điểm

### Bước 1: Chạy prompt
Copy prompt từ `test-prompts.md` → paste vào model.

### Bước 2: Lưu output
Lưu output vào file riêng: `output/[model]-[test-id].md`

### Bước 3: Chấm từng tiêu chí
Dùng rubric trên, chấm A-E cho mỗi output.

### Bước 4: Tính điểm tổng
```
Điểm = A×0.30 + B×0.25 + C×0.15 + D×0.15 + E×0.15
```
Thang 1-5.

### Bước 5: So sánh models

| Model | A | B | C | D | E | Tổng |
|-------|---|---|---|---|---|------|
| GPT-4o | | | | | | |
| Claude Sonnet | | | | | | |
| Gemini Pro | | | | | | |

---

## Test nhanh (5 phút)

Nếu chỉ có 5 phút, chạy 3 prompt này:

1. **A2** — Biên bản họp nâng cao (test thể thức + context)
2. **B1** — Bộ hồ sơ mua sắm TBYT (test multi-doc)
3. **C2** — Review hợp đồng (test pháp lý)

3 prompt này cover cả 3 nhóm use case, đủ đánh giá nhanh.
