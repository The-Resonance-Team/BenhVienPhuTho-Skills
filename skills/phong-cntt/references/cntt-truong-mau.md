# Trường placeholder theo template — Phòng CNTT

Nguồn gốc: 14 template dưới đây được chuyển đổi từ một hồ sơ mua sắm/LCNT thật đã hoàn tất (gói thầu Màn hình/máy in/tivi/ổ cứng/loa và vật tư linh kiện, giá trị hợp đồng ~498 triệu đồng, tháng 3–4/2026). Toàn bộ tên người, tên/địa chỉ/MST/SĐT/số tài khoản nhà thầu, MST/số tài khoản của Bệnh viện, số hợp đồng, ngày tháng tham chiếu văn bản khác, và đơn giá/mã hàng từng dòng trong bảng danh mục hàng hoá đã được thay bằng `{{KEY}}` hoặc `___` — xem "Cổng bắt buộc" trong `../SKILL.md`. Căn cứ pháp lý (Luật Đấu thầu 22/2023/QH15, Nghị định 214/2025/NĐ-CP, Thông tư 79/2025/TT-BTC, Quyết định 2005/QĐ-UBND, Quyết định 6/2025/QĐ-UBND, Bộ Luật Dân sự 91/2015/QH13, Luật Thương mại 36/2005/QH11) được giữ nguyên vì là nội dung pháp lý dùng chung, không gắn với vụ việc cụ thể — kiểm tra hiệu lực định kỳ, thay thế nếu văn bản đã hết hiệu lực.

## Từ khoá dùng chung (mọi template)

| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `NGAY_KY`/`THANG_KY`/`NAM_KY` | Ngày ký/lập chính văn bản đó | tự động: hôm nay |
| `TEN_GOI_THAU` | Tên gói thầu / nội dung mua sắm | hỏi |
| `HO_TEN_KY` | Người lập/ký thuộc Phòng CNTT | hỏi — `CHUC_DANH_KY` tự động: "Trưởng phòng Công nghệ thông tin" nếu không có ghi chú khác |
| `GIAM_DOC_KY` | Tên Giám đốc Bệnh viện | hỏi — **không hardcode**, Giám đốc có thể thay đổi theo nhiệm kỳ |
| `TEN_NHA_THAU` | Tên nhà thầu | hỏi |
| `DIA_CHI_NHA_THAU` | Địa chỉ nhà thầu | hỏi |
| `MA_SO_THUE_NCC` | Mã số thuế nhà thầu | hỏi |
| `DIENTHOAI_NHA_THAU` | Điện thoại nhà thầu | hỏi |
| `TK_NHA_THAU` / `NGAN_HANG_NHA_THAU` | Số tài khoản / ngân hàng nhà thầu | hỏi |
| `NGUOI_DAI_DIEN_NCC` | Người đại diện nhà thầu | hỏi |

**Nhóm dữ liệu định danh/tài chính của Bệnh viện — luôn hỏi, không bao giờ hardcode giá trị thật vào template hay file tham chiếu đã commit** (`MA_SO_THUE_BV`, `TK_KHO_BAC_1`, `TK_KHO_BAC_2`, `TK_VIETCOMBANK`, `DIENTHOAI_BV`, `DIENTHOAI_NGUOI_LH`, `MA_DON_VI_SDNS`) — kể cả khi giá trị không đổi giữa các lần dùng, đây là dữ liệu tài chính/định danh đơn vị, không phải nhãn chung như tên phòng.

## Bảng danh mục hàng hoá (phụ lục biến đổi)

7 template dưới đây có bảng "Danh mục hàng hóa" — cấu trúc bảng giữ nguyên số dòng gốc (mẫu ví dụ), nhưng nội dung từng dòng (tên hàng, mô tả kỹ thuật, đơn giá, thành tiền) đã blank thành `________`. Điền qua `officecli set` theo từng ô — xem "Bảng phụ lục" ở `../SKILL.md`, không dùng `officecli merge` cho các dòng này (merge chỉ thay khoá vô hướng).

## Theo từng template

#### ĐƠN ĐỀ XUẤT (`don-de-xuat-cntt.docx`)
Trường riêng: không — chỉ dùng nhóm chung + bảng hàng hoá (20 dòng ví dụ).

#### YÊU CẦU BÁO GIÁ (`yeu-cau-bao-gia-cntt.docx`)
| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `DIENTHOAI_NGUOI_LH` | SĐT người phụ trách tiếp nhận báo giá | hỏi |
Bảng "Bảng mô tả tính năng, yêu cầu thông số kỹ thuật" (25 dòng) đã blank tên hàng — mô tả tính năng giữ nguyên (không phải dữ liệu vụ việc, là yêu cầu kỹ thuật có thể tái dùng).

#### TỜ TRÌNH DUYỆT DỰ TOÁN & KHLCNT (`to-trinh-du-toan-khlcnt.docx`)
| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `DU_TOAN` / `DU_TOAN_BANG_CHU` | Tổng giá trị dự toán | hỏi / tự chuyển đổi |
| `TEN_NHA_THAU_2` / `TEN_NHA_THAU_3` | Nhà thầu báo giá cạnh tranh (nếu có ≥3 báo giá) | hỏi, để trống nếu chỉ có 1 báo giá |
Bảng "Phần công việc đã thực hiện" và "Danh mục hàng hoá" (25 dòng) đã blank dữ liệu vụ việc.

#### QĐ DUYỆT DỰ TOÁN & KHLCNT (`qd-phe-duyet-du-toan-khlcnt.docx`)
| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `DU_TOAN` / `DU_TOAN_BANG_CHU` | Tổng giá trị dự toán được duyệt | hỏi / tự chuyển đổi |
Số QĐ (`Số: ___/QĐ-BV`) để Văn thư cấp.

#### THƯ MỜI HOÀN THIỆN HỢP ĐỒNG (`thu-moi-hoan-thien-hop-dong.docx`)
Trường riêng: không — chỉ nhóm chung. Ngày/giờ hẹn hoàn thiện hợp đồng để `___`, điền tay theo lịch thực tế.

#### DỰ THẢO HỢP ĐỒNG (`du-thao-hop-dong.docx`)
| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `GIA_TRI_HD` / `GIA_TRI_CHU` | Giá trị hợp đồng | hỏi / tự chuyển đổi |
Đầy đủ khối thông tin Bên A (Bệnh viện) và Bên B (nhà thầu) — MST/số tài khoản Bên A dùng nhóm "luôn hỏi" ở trên.

#### BIÊN BẢN HOÀN THIỆN HỢP ĐỒNG (`bien-ban-hoan-thien-hop-dong.docx`)
| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `GIA_TRI_HD` / `GIA_TRI_CHU` | Giá trị hợp đồng thống nhất | hỏi / tự chuyển đổi |

#### TỜ TRÌNH PHÊ DUYỆT KQLCNT (`to-trinh-kqlcnt.docx`)
| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `DU_TOAN` / `DU_TOAN_BANG_CHU` | Giá gói thầu (giá dự toán) trúng thầu | hỏi / tự chuyển đổi |

#### QĐ PHÊ DUYỆT KQLCNT (`qd-phe-duyet-kqlcnt.docx`)
| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `DU_TOAN` / `DU_TOAN_BANG_CHU` | Giá gói thầu được duyệt | hỏi / tự chuyển đổi |

#### HỢP ĐỒNG KINH TẾ (`hop-dong.docx`)
| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `GIA_TRI_HD` / `GIA_TRI_CHU` | Giá trị hợp đồng | hỏi / tự chuyển đổi |
Số hợp đồng (`Số: ___/HĐKT/...`) để Văn thư cấp. Đầy đủ khối Bên A/Bên B như dự thảo hợp đồng.

#### BIÊN BẢN NGHIỆM THU VÀ BÀN GIAO (`bbnt-khoi-luong-hoan-thanh.docx`)
| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `GIA_TRI_HD` / `GIA_TRI_CHU` | Giá trị nghiệm thu bàn giao / còn phải thanh toán | hỏi — **lưu ý**: mẫu gốc có 3 dòng số tiền (tổng giá trị HĐ, giá trị nghiệm thu, số tiền còn phải thanh toán) đều dùng chung 1 khoá vì vụ việc gốc có 3 giá trị trùng nhau; nếu vụ việc mới có tạm ứng/khấu trừ khác nhau, tách riêng bằng `officecli set` sau khi merge |

#### BIÊN BẢN THANH LÝ HỢP ĐỒNG (`bien-ban-thanh-ly-hop-dong.docx`)
| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `GIA_TRI_HD` / `GIA_TRI_CHU` | Giá trị hợp đồng / giá trị quyết toán | hỏi — cùng lưu ý về khả năng cần tách 1 khoá thành nhiều giá trị như trên |

#### BIÊN BẢN GIAO NHẬN TSCĐ - CCDC (`bien-ban-giao-nhan-tscd-ccdc.docx`)
| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `MA_DON_VI_SDNS` | Mã đơn vị sử dụng NSNN | hỏi |
| `KE_TOAN_TS_KY` | Tên kế toán tài sản (Phòng TCKT) xác nhận | hỏi |
Bảng danh mục TSCĐ/CCDC bàn giao (STT/Tên ký hiệu quy cách/ĐVT/SL/Năm sử dụng/Ghi chú) — tên/ký hiệu thiết bị đã blank; số lượng, năm, ĐVT giữ nguyên làm ví dụ (không phải dữ liệu định danh/tài chính).

#### ĐỀ NGHỊ THANH TOÁN TỪ NHÀ THẦU (`de-nghi-thanh-toan-tu-ncc.docx`)
| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `SO_TIEN` / `SO_TIEN_CHU` | Số tiền đề nghị thanh toán | hỏi / tự chuyển đổi |
Khác `phong-hcqt`'s `giay-de-nghi-thanh-toan.docx` (nội bộ BV lập) — mẫu này do **nhà thầu** lập gửi Bệnh viện, giữ nguyên hướng và văn phong gốc.
