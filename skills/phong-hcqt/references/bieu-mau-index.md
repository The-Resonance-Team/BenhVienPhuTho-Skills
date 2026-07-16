# Index biểu mẫu — HCQT + chỉ định thầu

**Nguồn gốc:** bộ tài liệu bệnh viện được cung cấp ngoài repo. Danh sách runtime hiện hành phải đối chiếu với `../assets/README.md`.

## A. Biểu mẫu quy trình HCQT (`HCQT-QTQL-*`)

Slug đặt theo nội dung thực tế của runtime template; khi cần kiểm tra, dùng `officecli view <template> text --json`, không unpack XML thủ công.

| Mã | Nội dung thực tế trong file | Có file trong zip? | Slug XML (`assets/`) |
| --- | --- | --- | --- |
| HCQT-QTQL-01-BM01 | DỰ TRÙ VẬT TƯ | Có | `qtvh-01-bm01-du-tru-vat-tu` |
| HCQT-QTQL-01-BM02 | DANH SÁCH NHÀ CUNG ỨNG | Có | `qtvh-01-bm02-danh-sach-ncc` |
| HCQT-QTQL-01-BM03 | PHIẾU ĐÁNH GIÁ NHÀ CUNG ỨNG MỚI | Có | `qtvh-01-bm03-danh-gia-ncc-moi` |
| HCQT-QTQL-01-BM04 | PHIẾU ĐÁNH GIÁ NHÀ CUNG ỨNG CŨ | Có | `qtvh-01-bm04-danh-gia-ncc-cu` |
| HCQT-QTQL-03-BM01…04 | Sổ TS / BB bàn giao / Kiểm kê / Đánh giá TS | **Không** (chỉ nêu trong PDF) | — |
| HCQT-QTQL-04-BM01 | PHIẾU (lệnh điều động xe) | Có | `qtvh-04-bm01-dieu-dong-xe` |
| HCQT-QTQL-04-BM02 | SỔ LỊCH TRÌNH XE | Có | `qtvh-04-bm02-dieu-dong-xe` |
| HCQT-QTQL-05-BM01 | PHIẾU YÊU CẦU LĨNH VĂN PHÒNG PHẨM | Có | `qtvh-05-bm01-van-phong-pham` |
| HCQT-QTQL-05-BM02 | PHIẾU DỰ TRÙ VĂN PHÒNG PHẨM/BIỂU MẪU | Có | `qtvh-05-bm02-van-phong-pham` |
| HCQT-QTQL-06-BM01 | ⚠️ **File lỗi nguồn**: byte-identical với `05-BM01` (md5 trùng) — nội dung thực là "Phiếu yêu cầu lĩnh VPP", KHÔNG phải biểu mẫu bàn giao/nghiệm thu sửa chữa | Có (nhưng sai nội dung) | `qtvh-06-bm01-van-phong-pham-DUPLICATE-of-05bm01` |
| HCQT-QTQL-07-BM01…02 | Lệnh xe / sổ lịch trình (cứu thương) | **Không** | — |
| HCQT-QTQL-08-BM01 | BB kiểm tra PCCC & CNCH | **Không** | — |

**Lưu ý quan trọng:** `HCQT-QTQL-06-BM01.doc` trong kho tài liệu gốc (`E:\TaiLieuBenhVien\Quy trình quản lý vận hành (Phòng HCQT)\06 ...\`) bị copy nhầm từ `05-BM01` (md5 giống hệt). Biểu mẫu bàn giao/nghiệm thu sửa chữa bảo dưỡng thật vẫn **chưa có** trong kho — cần xin lại phòng HCQT bản đúng trước khi dùng slug này làm mẫu chính thức.

Khi user cần BM thiếu: hướng dẫn lấy từ kho HCQT nội bộ, không tự suy diễn nội dung.

## B. Bộ mẫu chỉ định thầu — dưới 50 triệu (DV & MSHH)

Thứ tự hồ sơ gợi ý, kèm slug XML (`assets/`) nếu đã có:

1. Đơn đề xuất — `don-de-xuat`
2. Yêu cầu báo giá — `yeu-cau-bao-gia`
3. Dự toán — `du-toan`
4. Thư mời ký kết HĐ — `thu-moi-ky-hop-dong` + Dự thảo HĐ — `du-thao-hop-dong`
5. Hợp đồng — `hop-dong`
6. BBNT khối lượng hoàn thành — `bbnt-khoi-luong-hoan-thanh`
7. Biên bản thanh lý HĐ — `bien-ban-thanh-ly-hop-dong`
8. Giấy đề nghị thanh toán — `giay-de-nghi-thanh-toan`
9. Bảng kê chứng từ thanh toán (`.xls` — **không phải docx/XML**, giữ nguyên định dạng bảng tính, không unpack)

## C. Bộ mẫu chỉ định thầu — mua sắm hàng hóa 50 triệu đến dưới 500 triệu

Thứ tự hồ sơ gợi ý (đầy hơn &lt;50tr), kèm slug XML:

1. Đơn đề xuất — dùng chung `don-de-xuat` (bộ &lt;50tr; nội dung tương tự)
2. Yêu cầu báo giá hàng hoá — `yeu-cau-bao-gia`
3. Dự toán — `du-toan`
4. **Tờ trình** phê duyệt dự toán và kế hoạch LCNT — `to-trinh-du-toan-khlcnt`
5. **Quyết định** phê duyệt dự toán và KHLCNT — `qd-phe-duyet-du-toan-khlcnt`
6. Thư mời hoàn thiện HĐ — `thu-moi-hoan-thien-hop-dong` + Dự thảo HĐ — `du-thao-hop-dong`
7. Biên bản hoàn thiện HĐ — `bien-ban-hoan-thien-hop-dong`
8. **Tờ trình** phê duyệt kết quả LCNT — `to-trinh-kqlcnt`
9. **Quyết định** phê duyệt KQLCNT — `qd-phe-duyet-kqlcnt`
10. Hợp đồng — `hop-dong`
11. BBNT khối lượng hoàn thành — `bbnt-khoi-luong-hoan-thanh`
12. Biên bản thanh lý HĐ — `bien-ban-thanh-ly-hop-dong`
13. Giấy đề nghị thanh toán — `giay-de-nghi-thanh-toan`
14. Bảng kê chứng từ thanh toán (`.xls`, không unpack)

Các runtime template hiện có là 23 file `.docx` trong `../assets/`; không commit seed, file nguồn, thư mục unpack hoặc dữ liệu hồ sơ thật. Xem `../assets/README.md` để rebuild từ nguồn riêng đã được phê duyệt.
