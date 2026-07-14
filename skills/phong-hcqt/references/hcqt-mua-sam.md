# HCQT — Mua sắm, VPP, tài sản, BĐSC (tóm tắt vận hành)

**Nguồn:** gói `hcqt-quy-trinh` (`{TAI_LIEU_BV}/Quy trình quản lý vận hành (Phòng HCQT)-….zip`) — xem `../../DATA-MAP.md`.
**Mã series:** `HCQT-QTQL-0x` · Phiên bản trên bìa: 1.0  
**Hiệu lực:** QT-01…06 = 01/8/2023; QT-07…08 = 10/6/2024

Đọc file này khi user hỏi mua sắm hành chính, VPP, TSCĐ thông dụng, sửa chữa hạ tầng/điện nước theo quy trình Phòng HCQT (không dùng cho kho thuốc lâm sàng trừ khi user khẳng định).

## QT-01 — Mua hàng hóa dịch vụ

**Phạm vi:** CCDC/thiết bị văn phòng; VPP; vật rẻ tiền mau hỏng.

**Luồng CCDC/thiết bị VP:** Lập KH (HCQT) ← dự trù khoa → Giám đốc duyệt chủng loại/SL/CL → đánh giá/chọn NCC → ký HĐ → kiểm nhập → nhập kho (Kế toán TS, Thủ kho).

**Luồng VPP / vật rẻ tiền:** KH + định mức tiêu hao → dự trù tháng → duyệt → đánh giá NCC → HĐ → kiểm nhập → nhập kho.

**Actor chính:** Trưởng HCQT, Giám đốc BV, Cán bộ HC, Kế toán TS, Thủ kho, Trưởng khoa/phòng.

**Biểu mẫu (có trong zip):** BM01 dự trù; BM02 DS NCC; BM03 đánh giá NCC mới; BM04 đánh giá NCC cũ.

**Lưu hồ sơ (theo QT):** hầu hết 01 năm tại Phòng HCQT.

**Tham chiếu pháp lý trên QT (cần rà soát khi tư vấn tuân thủ 2026):** TT 107/2017/TT-BTC; NĐ 174/2016; Luật NSNN 83/2015; Luật kế toán 88/2015; **Luật đấu thầu 43/2013** (cũ — nhắc user cần đối chiếu khung hiện hành); QĐ 1895/QĐ-BYT 1997.

## QT-05 — Quản lý sử dụng VPP

**Luồng:** HCQT lập dự trù (BM02) từ phiếu yêu cầu khoa → tờ trình mua + **tối thiểu 03 báo giá NCC** → Lãnh đạo BV phê duyệt → ký HĐ / giao hàng / kiểm tra → chứng từ về TCKT → Thủ kho nhập → khoa lĩnh theo BM01 → xuất kho định kỳ → cuối tháng chuyển phiếu về TCKT; kiểm kê kho hàng tháng.

**Lưu:** Phiếu NXK 03 năm; báo cáo NXT 01 năm.

## QT-03 — Quản lý tài sản

**Luồng:** NCC lắp đặt/nghiệm thu → bàn giao nhiều bên (NCC, Trưởng ĐV, ĐD trưởng, HCQT, kế toán) → cập nhật sổ theo dõi → vận hành/BĐ → kiểm kê/khấu hao/báo cáo.

**BM trong PDF:** BM01 sổ theo dõi; BM02 BB bàn giao; BM03 kiểm kê; BM04 tổng hợp đánh giá.  
**Lưu ý đóng gói:** file BM **không có trong zip** hiện tại — nói rõ “thiếu trong bộ tài liệu đóng gói”, không kết luận vận hành thực tế thiếu BM.

**Lưu hồ sơ:** 10 năm (HCQT + TCKT) cho biên bản/kiểm kê/KHBĐSC.

## QT-06 — Sửa chữa, BĐ hạ tầng điện nước

Khoa báo hỏng → HCQT kiểm tra → tự sửa hoặc đối tác → BB nghiệm thu (BM01 có trong zip) → theo dõi định kỳ. Lưu 10 năm.

## QT-04 / QT-07 — Xe

- **04:** đăng ký dùng xe → HCQT xem xét → lệnh điều xe (BM01) → lái xe thực hiện + sổ lịch trình (BM02).
- **07:** ĐD tư vấn NB/NNNB → liên hệ HCQT/lái xe theo lịch trực → thanh toán → vận chuyển (có thể cử ĐD đi cùng) → sổ lịch trình.  
  BM nêu trong PDF nhưng **không có file trong zip**.

## QT-08 — PCCC & CNCH

Lập KH/nội quy → kiểm kê phương tiện → tập huấn (Công an tỉnh) → kiểm tra định kỳ → lưu hồ sơ. BM01 nêu trong PDF, **không có file trong zip**.

## Lỗi đã biết trong SOP (đừng nhân bản khi soạn lại)

- QT-05/06: tiêu đề §5.1 bị copy nhầm “điều động phương tiện”.
- QT-01/05: mã BM trong đoạn mô tả đôi khi lệch `BM.02.HCQT.*` vs `HCQT-QTQL-0x-BMnn`.
