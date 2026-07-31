# Khảo sát Use Case — Bệnh viện Phú Thọ: Demo & Test Suite

## Tổng quan

Bộ tài liệu demo xây dựng từ khảo sát 6 nhân sự tại 3 phòng ban (31/07/2026).
Tất cả 6 yêu cầu đều mức **Cao**.

### Phân bố theo phòng ban
| Phòng ban | Số yêu cầu |
|-----------|-----------|
| Phòng Vật tư - TBYT | 3 |
| Phòng Tổ chức cán bộ | 2 |
| Phòng Đào tạo | 1 |

### Phân loại Use Case
| Loại | Mô tả | Số lượng |
|------|--------|---------|
| **A. Sinh tài liệu hành chính** | Biên bản, tờ trình, quyết định → .docx | 4 |
| **B. Sinh bộ hồ sơ từ mẫu** | Từ list quy trình + mẫu → bộ file docx hoàn chỉnh | 1 |
| **C. Kiểm tra pháp lý** | Review quy định, quy chế, hợp đồng → đánh giá rủi ro | 1 |

---

## Cách sử dụng

1. **Test nhanh**: Mở `test-prompts.md`, copy prompt → paste vào model
2. **Demo chi tiết**: Mở `use-cases.md` để xem bối cảnh + prompt + output mẫu
3. **Đánh giá**: Dùng `evaluation-criteria.md` để chấm điểm model

---

## Files

| File | Nội dung |
|------|----------|
| `test-prompts.md` | 12 prompt sẵn sàng test, chia theo use case |
| `use-cases.md` | 6 use case chi tiết từ khảo sát |
| `evaluation-criteria.md` | Tiêu chí đánh giá model |
| `README.md` | File này |
