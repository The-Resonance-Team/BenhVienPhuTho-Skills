# Trường theo từng template — Phòng Đào tạo (TT ĐT&CĐT)

Nguồn duy nhất cho danh sách token: `officecli view <file> text --json` + `officecli get <file> "/body/tbl[N]" --depth 3` cho bảng. Bảng dưới đây là ảnh chụp tại thời điểm build — khi có sai lệch, tin vào lệnh `officecli` chạy trực tiếp trên file.

## 1. `giay-xac-nhan-thoi-gian-thuc-hanh.docx` — Giấy xác nhận hoàn thành thực hành

| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `NGAY_KY`/`THANG_KY`/`NAM_KY` | Ngày ký giấy xác nhận | tự động: hôm nay |
| `HO_TEN` | Họ tên người thực hành | hỏi |
| `NGAY_SINH` | Ngày sinh | hỏi |
| `DIA_CHI_CU_TRU` | Địa chỉ cư trú | hỏi |
| `SO_CCCD` | Số CCCD/CMND/căn cước/định danh cá nhân/hộ chiếu | hỏi |
| `NGAY_CAP`/`NOI_CAP` | Ngày cấp/nơi cấp giấy tờ tuỳ thân | hỏi |
| `VAN_BANG_CHUYEN_MON`/`NAM_TOT_NGHIEP` | Văn bằng chuyên môn + năm tốt nghiệp | hỏi |
| `KHOA_THUC_HANH` | Khoa thực hành | hỏi |
| `NGUOI_HUONG_DAN` | Người hướng dẫn | hỏi |
| `THOI_GIAN_THUC_HANH` | Thời gian thực hành (từ ngày–đến ngày) | hỏi |
| `NANG_LUC_CHUYEN_MON` | Nhận xét năng lực chuyên môn | hỏi |

Số văn bản (`___/GXNTH`) để trống — Văn thư cấp. Mục "Đạo đức nghề nghiệp" giữ nguyên văn mẫu chuẩn, chỉ sửa nếu người ký muốn nhận xét khác.

## 2. `hop-dong-thuc-hanh-kbcb.docx` — Hợp đồng thực hành KBCB (Mẫu 06 Phụ lục I NĐ 96/2023/NĐ-CP)

| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `NGAY_KY`/`THANG_KY`/`NAM_KY` | Ngày ký hợp đồng | tự động: hôm nay |
| `PHO_GIAM_DOC_KY` | Phó Giám đốc đại diện Bên A ký | hỏi — không hardcode ai đương nhiệm |
| `DIENTHOAI_BV` | Điện thoại Bệnh viện (Bên A) | hỏi — không hardcode dù ít đổi |
| `HO_TEN` | Họ tên người thực hành (Bên B) | hỏi |
| `NGAY_SINH` | Ngày sinh Bên B | hỏi |
| `VAN_BANG_CHUYEN_MON` | Văn bằng chuyên môn Bên B | hỏi |
| `DIA_CHI_CU_TRU` | Địa chỉ thường trú Bên B | hỏi |
| `SO_CCCD`/`NGAY_CAP`/`NOI_CAP` | Giấy tờ tuỳ thân Bên B | hỏi |
| `NGAY_BAT_DAU`/`THANG_BAT_DAU`/`NAM_BAT_DAU` | Ngày bắt đầu thực hành | hỏi |
| `NGAY_KET_THUC`/`THANG_KET_THUC`/`NAM_KET_THUC` | Ngày kết thúc thực hành | hỏi |
| `DIA_DIEM_THUC_HANH` | Địa điểm thực hành | hỏi |
| `NOI_DUNG_CHUYEN_MON_THUC_HANH` | Nội dung chuyên môn thực hành | hỏi |

Khối Căn cứ (Bộ luật Dân sự 2015, Luật KCB 2023, NĐ 96/2023) và số Điều 1–4 đã khôi phục về literal cố định — không phải `{{KEY}}`, không đổi khi merge. Số hợp đồng (`___/HĐTH-BVĐKTPT`) để trống — Văn thư cấp.

## 3. `qd-phan-cong-nguoi-huong-dan-thuc-hanh.docx` — QĐ phân công người hướng dẫn thực hành

| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `NGAY_KY`/`THANG_KY`/`NAM_KY` | Ngày ký QĐ | tự động: hôm nay |
| `HO_TEN` | Họ tên người được tiếp nhận thực hành | hỏi |
| `NGAY_SINH` | Ngày sinh | hỏi |
| `VAN_BANG_CHUYEN_MON` | Văn bằng chuyên môn | hỏi |
| `KHOA_THUC_HANH` | Khoa thực hành | hỏi |
| `NGAY_BAT_DAU`/`THANG_BAT_DAU`/`NAM_BAT_DAU` | Ngày bắt đầu | hỏi |
| `NGAY_KET_THUC`/`THANG_KET_THUC`/`NAM_KET_THUC` | Ngày kết thúc | hỏi |
| `NGUOI_HUONG_DAN` | Họ tên người hướng dẫn | hỏi |
| `SO_CHUNG_CHI_HANH_NGHE` | Số chứng chỉ hành nghề người hướng dẫn | hỏi |
| `TRINH_DO_CHUYEN_MON_NGUOI_HUONG_DAN` | Trình độ chuyên môn người hướng dẫn | hỏi |

Khối Căn cứ (Luật KCB 2023, NĐ 96/2023, QĐ 15/2022/QĐ-UBND) khôi phục literal cố định. Số QĐ để trống — Văn thư cấp.

## 4. `qd-cu-can-bo-thuc-hanh-don-vi-doi-tac.docx` — QĐ cử cán bộ đi thực hành tại đơn vị đối tác

| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `NGAY_KY`/`THANG_KY`/`NAM_KY` | Ngày ký QĐ | tự động: hôm nay |
| `HO_TEN` | Họ tên cán bộ được cử | hỏi |
| `TEN_DON_VI_DOI_TAC` | Tên đơn vị đối tác nhận đào tạo (vd. BV Sản Nhi Phú Thọ) | hỏi |
| `SO_HOP_DONG_HOP_TAC` | Số hợp đồng thỏa thuận hợp tác làm căn cứ | hỏi |
| `CHUYEN_KHOA_THUC_HANH` | Chuyên khoa thực hành tại đơn vị đối tác | hỏi |
| `NGAY_BAT_DAU`/`NGAY_KET_THUC` | Thời gian đào tạo | hỏi |

Tổng quát cho mọi đối tác/hợp đồng hợp tác — không riêng BV Sản Nhi Phú Thọ (case nguồn). Không bịa `TEN_DON_VI_DOI_TAC`/`SO_HOP_DONG_HOP_TAC` nếu người dùng chưa cung cấp hợp đồng hợp tác thật.

## 5. `ban-cam-ket-thuc-tap-sinh-vien.docx` — Bản cam kết thực hiện nội quy (sinh viên thực tập)

| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `NGAY_KY`/`THANG_KY`/`NAM_KY` | Ngày lập bản cam kết | tự động: hôm nay |
| `TEN_TRUONG` | Tên trường sinh viên | hỏi |
| `TEN_LOP` | Tên lớp | hỏi |
| `THOI_GIAN_THUC_TAP` | Thời gian thực tập | hỏi |

Bảng ký cam kết 12 dòng mẫu (STT/Họ và tên/Ký cam kết/Số điện thoại) — nhân/xoá dòng bằng `officecli add`/`remove` theo sĩ số lớp thật, điền từng ô bằng `officecli set` (không qua `merge`, đây là dữ liệu bảng dòng biến đổi).

## 6. `phieu-khao-sat-thuc-trang-tuyen-duoi.docx` — Phiếu khảo sát thực trạng tuyến dưới

| Placeholder | Ý nghĩa | Ghi chú |
|---|---|---|
| `TEN_DON_VI_KHAO_SAT` | Tên BV/TTYT được khảo sát | hỏi |
| `TEN_KHOA_PHONG` | Tên khoa/phòng khảo sát | hỏi |
| `DIEN_THOAI`/`EMAIL` | Liên hệ đơn vị khảo sát | hỏi |
| `NGUOI_CHIU_TRACH_NHIEM` | Người chịu trách nhiệm nội dung phiếu | hỏi |

Chỉ khối định danh đầu phiếu dùng `{{KEY}}`/`merge`. Toàn bộ thân phiếu (mục A/B/C: nhân lực, cơ cấu tổ chức, cơ sở vật chất, trang thiết bị) là câu hỏi mở/checkbox — điền trực tiếp bằng `officecli set` theo từng đoạn khi khảo sát thực tế, xem `assets/README.md` mục "Giới hạn kỹ thuật".
