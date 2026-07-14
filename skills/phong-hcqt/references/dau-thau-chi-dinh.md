# Chỉ định thầu — ngưỡng & bộ hồ sơ BVĐK tỉnh Phú Thọ

**Nguồn:** gói `thau-duoi-50` và `thau-50-500` dưới `{TAI_LIEU_BV}` (xem `../../DATA-MAP.md`).
Đọc khi user nói chỉ định thầu, LCNT, tờ trình dự toán, phê duyệt KQLCNT, mua sắm dưới 500 triệu.

## Phân nhánh theo giá trị (theo tên bộ mẫu BV)

| Ngưỡng (theo tên gói) | Phạm vi gói | Skill hành động |
| --- | --- | --- |
| Dưới 50 triệu | Dịch vụ **và** mua sắm hàng hóa | Dùng bộ 01 — hồ sơ ngắn hơn |
| Từ 50 triệu đến dưới 500 triệu | **Mua sắm hàng hóa** | Dùng bộ 03 — có tờ trình/QĐ dự toán & KQLCNT |

> Skill **không** thay thế tư vấn pháp chế. Khi user hỏi “đúng Luật Đấu thầu 2023 chưa?”, trả lời: bộ mẫu là thực tiễn BV; cần pháp chế xác nhận ngưỡng/hình thức trước khi trình ký.

## Checklist nhanh khi lập kế hoạch mua

1. Xác định **loại** (DV vs MSHH) và **ước giá**.  
2. Chọn bộ mẫu 01 hoặc 03 theo bảng trên.  
3. Song song với quy trình nội bộ HCQT (QT-01/QT-05): dự trù → duyệt lãnh đạo → NCC/báo giá (VPP: ≥3 báo giá theo QT-05).  
4. Xuất văn bản bằng skill `van-ban` (tờ trình/QĐ) + dẫn `references/mau-to-trinh-mua-sam.md`.  
5. Sau HĐ: nghiệm thu → thanh lý → đề nghị thanh toán + bảng kê.

## Liên hệ QT HCQT

- Mua CCDC/VPP nội bộ: ưu tiên đọc `hcqt-mua-sam.md`.  
- Chỉ định thầu / LCNT theo ngưỡng tiền: đọc file này + `bieu-mau-index.md` phần B/C.  
- Thủ kho / xuất nhập: phân công 2026 — xem `phan-cong-hcqt-2026.md`.
