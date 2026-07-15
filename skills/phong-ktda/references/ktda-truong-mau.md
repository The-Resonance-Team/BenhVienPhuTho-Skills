# Trường placeholder theo template — Phòng Kế toán dự án (KTDA)

Nguồn gốc: 15 template dưới đây chuyển đổi từ **mẫu chỉ định thầu DỊCH VỤ (50–dưới 500 triệu)** chính thức của bệnh viện (không phải một vụ việc thật đã điền — khác `phong-cntt`). Khác biệt với gói HCQT/CNTT: đây là mẫu cho **dịch vụ** (không phải mua sắm hàng hoá), nên bảng danh mục dùng "Danh sách dịch vụ" thay vì "Danh mục hàng hoá", và căn cứ pháp lý dùng bộ văn bản mới hơn (Luật Đấu thầu sửa đổi bởi Luật số 57/2024/QH15 và 90/2025/QH15, Quyết định 466/QĐ-UBND ngày 13/02/2026 quy định vị trí/chức năng BV).

Mẫu gốc đã có sẵn tên/MST/số tài khoản/điện thoại **của chính Bệnh viện** in cứng làm thông tin Bên A tiêu chuẩn, và tên Giám đốc/Kế toán trưởng đang đương nhiệm in sẵn ở khối chữ ký. Theo cùng nguyên tắc đã áp dụng cho `phong-cntt` (xem `../phong-cntt/SKILL.md`), toàn bộ nhóm này đã được thay bằng `{{KEY}}` — không hardcode dù là hằng số của đơn vị, vì đây là dữ liệu tài chính/định danh và người giữ chức vụ có thể đổi theo nhiệm kỳ. Địa chỉ/số điện thoại tổng đài công khai của Bệnh viện (đường Nguyễn Tất Thành, phường Việt Trì) và các trích dẫn căn cứ pháp lý giữ nguyên dạng chữ.

## Từ khoá dùng chung

| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `NGAY_KY`/`THANG_KY`/`NAM_KY` | Ngày ký/lập chính văn bản đó | tự động: hôm nay |
| `TEN_GOI_THAU` | Tên gói thầu / dự toán mua sắm dịch vụ | hỏi |
| `PHONG_BAN` | Phòng đề xuất/lập hồ sơ | tự động: "Kế toán dự án" — hỏi nếu khoa/phòng khác dùng chung mẫu này |
| `HO_TEN_KY` / `CHUC_DANH_KY` | Người lập/ký thuộc phòng đề xuất | hỏi — `CHUC_DANH_KY` tự động: "Trưởng phòng Kế toán dự án" |
| `GIAM_DOC_KY` | Tên Giám đốc Bệnh viện | hỏi — **không hardcode**, có thể đổi theo nhiệm kỳ |
| `KE_TOAN_TRUONG_KY` | Tên Kế toán trưởng | hỏi — **không hardcode** |
| `TEN_NHA_THAU` / `DIA_CHI_NHA_THAU` / `MA_SO_THUE_NCC` / `DIENTHOAI_NHA_THAU` / `TK_NHA_THAU` / `NGAN_HANG_NHA_THAU` / `NGUOI_DAI_DIEN_NCC` | Thông tin nhà thầu dịch vụ | hỏi |
| `DIENTHOAI_NGUOI_LH` | SĐT người phụ trách tiếp nhận báo giá | hỏi |

**Nhóm dữ liệu định danh/tài chính của Bệnh viện — luôn hỏi, không bao giờ hardcode**: `MA_SO_THUE_BV`, `TK_KHO_BAC_1`, `TK_KHO_BAC_2`, `TK_VIETCOMBANK`, `DIENTHOAI_BV`, `MA_DON_VI_SDNS`.

## Bảng "Danh sách dịch vụ" (phụ lục biến đổi)

Xuất hiện trong hầu hết template (đơn đề xuất, thư mời báo giá, dự toán, tờ trình/QĐ dự toán, dự thảo/BB hoàn thiện hợp đồng, tờ trình/QĐ KQLCNT, hợp đồng, BBNT) — dòng dữ liệu (STT/tên dịch vụ/mô tả/khối lượng/đơn giá/thành tiền) để nguyên `________` mẫu, điền bằng `officecli set` sau khi merge phần thân — xem "Bảng phụ lục" ở `../SKILL.md`.

## Theo từng template

#### ĐƠN ĐỀ XUẤT (`don-de-xuat-ktda.docx`)
Trường riêng: `PHONG_BAN`, `TEN_GOI_THAU` (tên dịch vụ đề xuất, xuất hiện 3 lần trong văn bản — cùng giá trị).

#### THƯ MỜI BÁO GIÁ DỊCH VỤ (`thu-moi-bao-gia-dich-vu.docx`)
Trường riêng: `TEN_GOI_THAU`, `HO_TEN_KY`/`CHUC_DANH_KY` (người liên hệ nhận báo giá), `DIENTHOAI_NGUOI_LH`. Thời gian/địa điểm nhận báo giá để `___`, điền tay theo lịch thực tế.

#### DỰ TOÁN (`du-toan-ktda.docx`)
Trường riêng: `PHONG_BAN`, `TEN_GOI_THAU`, `DU_TOAN`/`DU_TOAN_BANG_CHU`.

#### TỜ TRÌNH DUYỆT DỰ TOÁN & KHLCNT (`to-trinh-du-toan-khlcnt.docx`)
Trường riêng: `PHONG_BAN`, `TEN_GOI_THAU`, `DU_TOAN`/`DU_TOAN_BANG_CHU`. Số tờ trình mẫu `01/TTr-___` để Văn thư cấp.

#### QĐ DUYỆT DỰ TOÁN & KHLCNT (`qd-phe-duyet-du-toan-khlcnt.docx`)
Trường riêng: `TEN_GOI_THAU`, `DU_TOAN`/`DU_TOAN_BANG_CHU`. Số QĐ để `___`.

#### THƯ MỜI HOÀN THIỆN HỢP ĐỒNG (`thu-moi-hoan-thien-hop-dong.docx`)
Trường riêng: `TEN_NHA_THAU`, `DIA_CHI_NHA_THAU`, `TEN_GOI_THAU`. Thời gian hẹn để `___`.

#### DỰ THẢO HỢP ĐỒNG (`du-thao-hop-dong.docx`)
Trường riêng: `TEN_GOI_THAU`, `GIA_TRI_HD`/`GIA_TRI_CHU`. Khối thông tin Bên B (tên/địa chỉ/MST/tài khoản nhà thầu) để nguyên dấu `:` trống — điền tay hoặc bổ sung `{{KEY}}` khi có nhu cầu tái dùng.

#### BIÊN BẢN HOÀN THIỆN HỢP ĐỒNG (`bien-ban-hoan-thien-hop-dong.docx`)
Trường riêng: `TEN_GOI_THAU`, `TEN_NHA_THAU`, `DIA_CHI_NHA_THAU`, `DIENTHOAI_NHA_THAU`, `MA_SO_THUE_NCC`, `TK_NHA_THAU`, `NGUOI_DAI_DIEN_NCC`, `GIA_TRI_HD`/`GIA_TRI_CHU`.

#### TỜ TRÌNH PHÊ DUYỆT KQLCNT (`to-trinh-kqlcnt.docx`)
Trường riêng: `PHONG_BAN`, `TEN_GOI_THAU`, `DU_TOAN` (giá gói thầu), `TEN_NHA_THAU`. Số tờ trình mẫu `02/TTr-___` để Văn thư cấp.

#### QĐ PHÊ DUYỆT KQLCNT (`qd-phe-duyet-kqlcnt.docx`)
Trường riêng: `TEN_GOI_THAU`, `DU_TOAN`, `TEN_NHA_THAU` (qua căn cứ "giữa Bệnh viện ... và {{TEN_NHA_THAU}}").

#### HỢP ĐỒNG KINH TẾ (`hop-dong.docx`)
Trường riêng: `TEN_GOI_THAU`, `TEN_NHA_THAU` (Bên B), `GIA_TRI_HD`/`GIA_TRI_CHU`. Số hợp đồng để `___`.

#### BIÊN BẢN NGHIỆM THU CÔNG VIỆC (`bbnt-cong-viec.docx`)
Trường riêng: `TEN_NHA_THAU`.

#### BIÊN BẢN NGHIỆM THU KHỐI LƯỢNG HOÀN THÀNH (`bbnt-khoi-luong-hoan-thanh.docx`)
Trường riêng: `TEN_NHA_THAU`, `GIA_TRI_HD` (tổng giá trị hợp đồng). **Lưu ý**: mẫu gốc có 5 dòng giá trị khác nhau (tổng giá trị HĐ, giá trị nghiệm thu, giá trị đề nghị quyết toán, giá trị đã tạm ứng, giá trị còn lại) — chỉ dòng đầu được gắn khoá; 4 dòng còn lại để `___`, điền tay hoặc `officecli set` theo từng vụ việc vì giá trị có thể khác nhau.

#### BIÊN BẢN THANH LÝ HỢP ĐỒNG (`bien-ban-thanh-ly-hop-dong.docx`)
Trường riêng: `TEN_NHA_THAU` (Bên B), `GIA_TRI_HD`. Cùng lưu ý về nhiều dòng giá trị như trên.

#### GIẤY ĐỀ NGHỊ THANH TOÁN (`giay-de-nghi-thanh-toan.docx`)
Trường riêng: `HO_TEN_KY`, `PHONG_BAN`, `TEN_GOI_THAU` (nội dung thanh toán), `SO_TIEN`/`SO_TIEN_CHU`, `TEN_NHA_THAU` (đơn vị thụ hưởng), `TK_NHA_THAU`. Khác `phong-cntt`'s `de-nghi-thanh-toan-tu-ncc.docx` (do nhà thầu lập) — mẫu này do **nội bộ Bệnh viện** lập, có đủ khối ký Người đề nghị / Kế toán kiểm soát / `{{KE_TOAN_TRUONG_KY}}` / `{{GIAM_DOC_KY}}`.

## Chưa chuyển đổi

`Bảng kê chứng từ thanh toán.xls` (định dạng Excel 97-2003/OLE cũ) — file phụ lục kèm giấy đề nghị thanh toán, chưa đưa vào `assets/`. Khi cần: convert sang `.xlsx` bằng LibreOffice trước khi seed, theo đúng quy trình `phong-hcqt` đã dùng cho các file `.doc` gốc.
