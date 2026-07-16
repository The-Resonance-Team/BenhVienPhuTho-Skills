# Trường placeholder theo template — Phòng Vật tư – TBYT

Nguồn gốc: 12 template dưới đây chuyển đổi từ **một hồ sơ mua sắm THẬT đã hoàn tất** (gói "Mua sắm băng ghim và dụng cụ cắt khâu nối..."), khác `phong-hcqt`/`phong-ktda` (mẫu trống) — cùng cách tiếp cận với `phong-cntt`. Khác biệt với HCQT/KTDA: đây là chu trình **LCNT hàng hoá trên ngưỡng, qua mạng đấu thầu quốc gia (chào giá trực tuyến rút gọn)** — chủ trương mua sắm → danh mục/SL/TCKT → HĐKH → dự toán/KHLCNT → hồ sơ chào giá → KQLCNT → hợp đồng — dài hơn "chỉ định thầu 50–dưới 500 triệu" của HCQT/KTDA.

Toàn bộ tên người (Giám đốc, Trưởng phòng Vật tư, Kế toán trưởng, Tổ trưởng TCG, Chủ tịch/Thư ký HĐKH, ~26 thành viên HĐKH, ~36 thành viên TCG, đại diện nhà thầu), định danh/tài chính nhà thầu và Bệnh viện, số quyết định/tờ trình/hợp đồng và ngày tháng tham chiếu nội bộ chu trình, đơn giá/mã hàng/tên hàng hoá đã được thay bằng `{{KEY}}` hoặc xoá trắng — xác minh bằng quét lại toàn bộ 12 file (xem `../assets/README.md`). Trích dẫn Luật/Nghị định/Thông tư/Nghị quyết công khai giữ nguyên dạng chữ.

## Từ khoá dùng chung

| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `NGAY_KY`/`THANG_KY`/`NAM_KY` | Ngày ký/lập chính văn bản đó (QĐ, tờ trình, hợp đồng) | tự động: hôm nay |
| `NGAY_HOP`/`THANG_HOP`/`NAM_HOP` | Ngày họp (biên bản) | tự động: hôm nay |
| `GIO_HOP` / `DIA_DIEM_HOP` | Giờ/địa điểm họp | hỏi — gợi ý mặc định "Hội trường số 2, tầng 7, nhà A" nếu đúng địa điểm quen dùng |
| `TEN_GOI_THAU` / `TEN_DU_TOAN` | Tên gói thầu / tên dự toán mua sắm | hỏi |
| `TONG_MUC_DU_TOAN` / `TONG_MUC_DU_TOAN_CHU` | Giá trị dự toán = giá gói thầu (gói đơn, không chia nhỏ) | hỏi |
| `THOI_GIAN_TO_CHUC_LCNT` | Thời gian tổ chức lựa chọn nhà thầu (ngày) | hỏi |
| `THOI_GIAN_THUC_HIEN` | Thời gian thực hiện gói thầu/hợp đồng (ngày) | hỏi |
| `QUY_BAT_DAU_LCNT` | Quý bắt đầu tổ chức LCNT | hỏi |
| `SO_ETBMT` | Số E-TBMT trên mạng đấu thầu quốc gia của gói này | hỏi (cấp sau khi đăng tải, không bịa trước) |
| `KHOA_DE_XUAT` / `NGAY_DE_XUAT` | Khoa đề xuất mua sắm gốc + ngày đề xuất | hỏi |
| `PHONG_BAN` | Tên phòng | tự động: "Phòng Vật tư – TBYT" |

**Người ký — luôn hỏi, không hardcode ai đang đương nhiệm** (chức danh có thể đổi người theo nhiệm kỳ hoặc theo QĐ kiện toàn mới): `GIAM_DOC_KY`, `TRUONG_PHONG_VATTU_KY`, `KE_TOAN_TRUONG_KY`, `TO_TRUONG_TCG_KY`, `CHU_TICH_HDKH_KY`, `THU_KY_HDKH_KY`.

**Cross-ref văn bản trong cùng chu trình — hỏi, đổi theo từng vụ việc** (mẫu ghi `số {{SO_...}} ngày {{NGAY_...}}`):
`SO_QD_CHU_TRUONG`/`NGAY_QD_CHU_TRUONG` (QĐ phê duyệt chủ trương), `SO_QD_DANH_MUC_TCKT`/`NGAY_QD_DANH_MUC_TCKT`, `NGAY_BB_HDKH`, `SO_QD_NHIEM_VU_DU_TOAN`/`NGAY_QD_NHIEM_VU_DU_TOAN`, `NGAY_BB_TCG_DU_TOAN_KHLCNT`, `SO_TTR_KHLCNT`/`NGAY_TTR_KHLCNT`, `SO_QD_KHLCNT`/`NGAY_QD_KHLCNT`, `NGAY_BB_TCG_XAY_HSCG` (nếu dùng), `NGAY_DANG_TAI_KHLCNT`, `NGAY_CHAO_GIA`/`NGAY_KET_THUC_CHAO_GIA`, `NGAY_CHAP_THUAN_TRAO_HD`, `SO_TTR_KQLCNT`/`NGAY_TTR_KQLCNT`, `SO_QD_KQLCNT`/`NGAY_QD_KQLCNT`.

**Tổ chuyên gia/HĐKH kiện toàn** (hỏi — có thể đổi theo QĐ kiện toàn mới ban hành giữa chu trình, xem ghi chú trong hồ sơ gốc mục "Nguồn gốc"): `SO_QD_KIEN_TOAN_TCG`/`NGAY_QD_KIEN_TOAN_TCG`, `SO_QD_KIEN_TOAN_HDKH`/`NGAY_QD_KIEN_TOAN_HDKH`.

**Tham chiếu giá (bên ngoài, để xác định giá kế hoạch theo NĐ 214/2025 điểm c khoản 2 điều 18)** — hỏi, không bịa nếu người dùng chưa cung cấp nguồn tham chiếu thật: `SO_ETBMT_THAM_CHIEU`, `SO_QD_KQLCNT_THAM_CHIEU`/`NGAY_QD_KQLCNT_THAM_CHIEU`, `TEN_DVI_THAM_CHIEU`, `SO_LO_THAM_CHIEU_1..3`.

**Nhà thầu** (hỏi, không bịa nếu chưa có): `TEN_NHA_THAU`, `MA_NHA_THAU` (mã trên cổng mạng đấu thầu, dạng `vnXXXXXXXXXX`), `DIA_CHI_NCC`, `DIENTHOAI_NCC`, `MA_SO_THUE_NCC`, `TK_NCC`, `NGAN_HANG_NCC`, `MA_NGAN_HANG_NCC`, `DAI_DIEN_NCC_HOTEN`, `DAI_DIEN_NCC_CHUCVU`.

**Giá trị hợp đồng** (hỏi): `GIA_TRI_HD`/`GIA_TRI_HD_CHU`, `TY_LE_BAO_DAM_HD`, `GIA_TRI_BAO_DAM_HD`/`GIA_TRI_BAO_DAM_HD_CHU`, `THOI_HAN_THANH_TOAN` (ngày).

**Bệnh viện định danh/tài chính — nhóm luôn hỏi, KHÔNG BAO GIỜ hardcode, không lưu vào file sẽ commit** (đúng nguyên tắc đã dùng ở `phong-cntt`/`phong-ktda`, dù giá trị không đổi giữa các lần dùng): `MA_SO_THUE_BV`, `DIENTHOAI_BV`, `FAX_BV`, `TK_KHO_BAC_1`, `TK_KHO_BAC_2`, `TK_SACOMBANK`, `TK_VIETCOMBANK`.

**Hàng hoá** (gói này có đúng 4 dòng mặt hàng — mẫu ship sẵn 4 bộ khoá theo mẫu `VT_{n}_*`; nếu vụ việc mới có số mặt hàng khác, nhân/xoá dòng bảng bằng `officecli add`/`remove` trước khi merge — xem "Bảng phụ lục" bên dưới): `VT_n_TEN`, `VT_n_TCKT` (tiêu chí kỹ thuật, đoạn dài), `VT_n_QUY_CACH`, `VT_n_KY_MA_HIEU`, `VT_n_NHAN_HIEU`, `VT_n_DON_GIA`, `VT_n_THANH_TIEN`, dùng chung `HANG_SX`/`NUOC_SX`/`NAM_SX` (nếu cùng hãng cho mọi dòng — tách theo dòng nếu khác hãng).

## Bảng phụ lục (dòng biến đổi) — điền qua `officecli set`, không hardcode

`officecli merge` chỉ thay khoá vô hướng, không tự nhân/xoá dòng bảng — đúng giới hạn đã áp dụng ở `phong-hcqt`. Hai loại bảng phụ lục trong bộ template này:

1. **Danh mục hàng hoá** (danh mục/TCKT, KHLCNT, kết quả trúng thầu, phụ lục hợp đồng, `pham-vi-cung-cap-hang-hoa.xlsx`): còn 4 dòng dữ liệu mẫu đã xoá nội dung thật, giữ cấu trúc bảng — điền/nhân dòng bằng `officecli get`/`set`/`add` theo đường dẫn `/body/tbl[N]/tr[R]/tc[C]`. **Chỉ có ở 5 file nguồn `.docx` thật** (`bb-hop-hdkh-danh-muc-tckt`, `bb-hop-tcg-du-toan-khlcnt`, `qd-phe-duyet-nhiem-vu-du-toan`, `to-trinh-khlcnt-vattu`, `hop-dong-vattu`) và xlsx — 6 file nguồn `.doc` (xem `../assets/README.md` mục "Giới hạn kỹ thuật") có phụ lục dạng đoạn văn phẳng, không phải bảng thật; cần dựng lại bảng nếu muốn dùng `officecli set` trên các file này.
2. **Thành phần dự họp / CÁC THÀNH VIÊN** (`bb-hop-hdkh-danh-muc-tckt.docx`, `bb-hop-tcg-du-toan-khlcnt.docx`): cột **Họ và tên** đã xoá trắng — điền theo danh sách thật của QĐ kiện toàn TCG/HĐKH đang hiệu lực tại thời điểm họp (không hardcode, vì thành phần đổi theo quyết định kiện toàn). Cột Chức vụ/Nhiệm vụ giữ cấu trúc ghế ngồi gốc.

## Theo từng template

#### QĐ PHÊ DUYỆT CHỦ TRƯƠNG (`qd-phe-duyet-chu-truong-vattu.docx`)
Trường riêng: `KHOA_DE_XUAT`/`NGAY_DE_XUAT`, `GIAM_DOC_KY`. Phụ lục danh mục đầu tư (4 dòng `VT_n_*`) là đoạn văn phẳng (nguồn `.doc`) — xem giới hạn kỹ thuật.

#### BB HỌP HĐKH THỐNG NHẤT DANH MỤC/SL/TCKT (`bb-hop-hdkh-danh-muc-tckt.docx`)
Trường riêng: `CHU_TICH_HDKH_KY`, `THU_KY_HDKH_KY`, phụ lục danh mục (bảng thật, 4 dòng). Bảng thành phần dự họp (27 dòng) + bảng chữ ký thành viên (24 dòng) đã xoá tên.

#### QĐ PHÊ DUYỆT DANH MỤC/SL/TCKT (`qd-phe-duyet-danh-muc-tckt.docx`)
Trường riêng: `NGAY_BB_HDKH`, `SO_QD_CHU_TRUONG`/`NGAY_QD_CHU_TRUONG`, `GIAM_DOC_KY`. Phụ lục là đoạn văn phẳng (nguồn `.doc`).

#### BB HỌP TCG THỐNG NHẤT DỰ TOÁN & KHLCNT (`bb-hop-tcg-du-toan-khlcnt.docx`)
File nhiều field nhất (44) — có thêm khối "tham chiếu giá" từ vụ việc bên ngoài (`SO_ETBMT_THAM_CHIEU`, `SO_QD_KQLCNT_THAM_CHIEU`, `TEN_DVI_THAM_CHIEU`, `SO_LO_THAM_CHIEU_1..3`) — hỏi nguồn tham chiếu giá thật của vụ việc mới, không tái dùng số liệu vụ băng ghim gốc. Bảng thành phần TCG (36 dòng) đã xoá tên; 2 bảng hàng hoá (tham chiếu + dự kiến) đã xoá dữ liệu.

#### QĐ PHÊ DUYỆT NHIỆM VỤ VÀ DỰ TOÁN (`qd-phe-duyet-nhiem-vu-du-toan.docx`)
Trường riêng: `TONG_MUC_DU_TOAN`/`_CHU`, phụ lục danh mục (bảng thật, 4 dòng `VT_n_*` đầy đủ đơn giá/thành tiền).

#### TỜ TRÌNH PHÊ DUYỆT KHLCNT (`to-trinh-khlcnt-vattu.docx`)
Trường riêng: `THOI_GIAN_TO_CHUC_LCNT`, phụ lục "Danh mục tài liệu" (cross-ref 6 văn bản trước đó — đã genericize) + phụ lục danh mục hàng hoá dự toán (bảng thật, 4 dòng đủ đơn giá). `TO_TRUONG_TCG_KY` ở cuối văn bản.

#### QĐ PHÊ DUYỆT KHLCNT (`qd-phe-duyet-khlcnt-vattu.docx`)
Trường riêng: `SO_TTR_KHLCNT`/`NGAY_TTR_KHLCNT`, `QUY_BAT_DAU_LCNT`, `THOI_GIAN_THUC_HIEN`. Phụ lục KHLCNT (Bảng số 1, 1 dòng — đã scalar-hoá vào `TEN_GOI_THAU`/`TONG_MUC_DU_TOAN`/...) là đoạn văn phẳng (nguồn `.doc`).

#### BB HỌP TCG THỐNG NHẤT XÂY HSCG (`bb-hop-tcg-xay-hscg.docx`)
Trường riêng: `DIA_DIEM_HOP`, không có bảng hàng hoá (biên bản chỉ bàn nội dung hồ sơ mời chào giá). Bảng thành phần TCG là đoạn văn phẳng (nguồn `.doc`) — xoá tên theo danh sách chung đã áp dụng.

#### TỜ TRÌNH PHÊ DUYỆT KQLCNT (`to-trinh-kqlcnt-vattu.docx`)
File nhiều field nhất cùng `bb-hop-tcg-du-toan-khlcnt` (52) — thêm `SO_ETBMT`, `TEN_NHA_THAU`, `MA_NHA_THAU`, `GIA_TRI_HD`/`_CHU`, bảng "Thông tin nhà thầu trúng thầu" + "Thông tin hàng hoá trúng thầu" (5 dòng, gồm `HANG_SX`/`NUOC_SX`/`NAM_SX`/`VT_n_KY_MA_HIEU`/`VT_n_NHAN_HIEU`) — đoạn văn phẳng (nguồn `.doc`).

#### QĐ PHÊ DUYỆT KQLCNT (`qd-phe-duyet-kqlcnt-vattu.docx`)
Trường riêng: `NGAY_CHAP_THUAN_TRAO_HD`, `GIAM_DOC_KY`. Cùng cấu trúc bảng nhà thầu/hàng hoá trúng thầu như tờ trình KQLCNT — đoạn văn phẳng (nguồn `.doc`).

#### HỢP ĐỒNG KINH TẾ (`hop-dong-vattu.docx`) ⚠️ nhạy cảm nhất
Toàn bộ khối Bên A (Bệnh viện: `DIENTHOAI_BV`/`FAX_BV`/`TK_KHO_BAC_1`/`TK_KHO_BAC_2`/`TK_SACOMBANK`/`TK_VIETCOMBANK`/`MA_SO_THUE_BV`/`GIAM_DOC_KY`) và Bên B (nhà thầu: `TEN_NHA_THAU`/`DIA_CHI_NCC`/`DIENTHOAI_NCC`/`MA_SO_THUE_NCC`/`TK_NCC`/`NGAN_HANG_NCC`/`MA_NGAN_HANG_NCC`/`DAI_DIEN_NCC_HOTEN`) — **luôn hỏi từng trường, không bao giờ tái dùng số liệu vụ việc gốc dù có vẻ "cố định"**. Điều 5: `GIA_TRI_HD`/`_CHU`, `TY_LE_BAO_DAM_HD`, `GIA_TRI_BAO_DAM_HD`/`_CHU`, `THOI_HAN_THANH_TOAN`. Số hợp đồng để `___/HĐKT/___-BVĐKPT` (Văn thư cấp). Phụ lục 1 (Bảng giá) + Phụ lục 2 (Danh mục thiết bị, có thêm `VT_n_KY_MA_HIEU`/`NHAN_HIEU`/mã ánh xạ) là **bảng thật** (`.docx` nguồn). Phần "ĐIỀU KIỆN CHUNG CỦA HỢP ĐỒNG" sau Phụ lục 2 là mẫu chuẩn quốc gia (MPI) — giữ nguyên, không phải dữ liệu vụ việc.

#### PHẠM VI CUNG CẤP HÀNG HOÁ — MẪU 02A (`pham-vi-cung-cap-hang-hoa.xlsx`)
Mẫu MPI chuẩn với hướng dẫn điền sẵn trong từng cột (giữ nguyên). 4 dòng dữ liệu mẫu + ô "Ngày giao hàng" đã xoá — điền tay hoặc qua `officecli set` theo `xl/sharedStrings`/cell reference (xem `officecli help xlsx`).
