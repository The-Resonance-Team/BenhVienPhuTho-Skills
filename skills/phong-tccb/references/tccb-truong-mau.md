# Trường theo từng template — Phòng TCCB

Nguồn duy nhất cho danh sách token: `officecli view <file> text --json` (đoạn văn) + `officecli get <file> "/body/tbl[N]" --depth 3` cho từng bảng (chữ ký, danh sách — không hiện ở `view text`). Bảng dưới đây là ảnh chụp tại thời điểm build, dùng để tra cứu nhanh — khi có sai lệch, tin vào lệnh `officecli` chạy trực tiếp trên file, không tin bảng này.

Quy ước: cột "Số lần" đếm occurrence trong file hiện tại của phiên bản asset đã sanitize. Token có "Số lần > 1 với giá trị khác nhau" (`SO_LIEU`/`NGAY_THANG` trong khối Căn cứ) **không liệt kê chi tiết ở đây** — xử lý theo mục "Phần Căn cứ pháp lý" trong `SKILL.md`, không dùng `merge`.

## 1. `qd-nghi-huu.docx` — QĐ nghỉ hưu (Giám đốc BV ký)

| Placeholder | Ý nghĩa | Số lần | Ghi chú |
|---|---|---|---|
| `HO_TEN` | Họ tên viên chức nghỉ hưu | 3 | hỏi |
| `NOI_SINH` | Nơi sinh | 1 | hỏi |
| `CHUC_DANH_NGHE_NGHIEP` | Chức danh nghề nghiệp (vd. Điều dưỡng hạng III) | 1 | hỏi |
| `TRINH_DO_CHUYEN_MON` | Trình độ chuyên môn | 1 | hỏi |
| `DON_VI_CONG_TAC` | Đơn vị/khoa phòng công tác | 1 | hỏi |
| `NOI_CU_TRU` | Nơi cư trú | 1 | hỏi |
| `NGAN_HANG_CHI_NHANH` | Ngân hàng + chi nhánh nhận lương hưu | 1 | hỏi |
| `NOI_KCB_BAN_DAU` | Nơi khám chữa bệnh BHYT ban đầu | 1 | hỏi |
| `GIAM_DOC_KY` | Người ký (Giám đốc BV đương nhiệm) | 1 | hỏi — không hardcode |

Còn: `Số sổ BHXH`, `Số điện thoại di động`, `Số TK`, ngày sinh, ngày hưởng BHXH, ngày ký văn bản, toàn bộ số hiệu/ngày trích dẫn Luật/Nghị định/Quyết định trong khối Căn cứ, số Điều — tất cả đã sanitize thành `{{SO_LIEU}}`/`{{NGAY_THANG}}` lặp lại nhiều lần với giá trị khác nhau. Điền từng đoạn bằng `officecli get`/`set`, không `merge`.

## 2. `tb-nghi-huu.docx` — Thông báo nghỉ hưu

| Placeholder | Ý nghĩa | Số lần | Ghi chú |
|---|---|---|---|
| `HO_TEN` | Họ tên viên chức nghỉ hưu | 3 | hỏi |
| `TRINH_DO_CHUYEN_MON` | Trình độ chuyên môn | 1 | hỏi |
| `CHUC_DANH_NGHE_NGHIEP` | Chức danh nghề nghiệp | 1 | hỏi |
| `DON_VI_CONG_TAC` | Đơn vị/khoa phòng đang công tác | 1 | hỏi |
| `GIAM_DOC_KY` | Người ký | 1 | hỏi |

Chứa `HYPERLINK` field trỏ tới thuvienphapluat.vn cho 2 trích dẫn Nghị định — text hiển thị đã sanitize như phần thân, nhưng URL trong field code vẫn còn số hiệu gốc (không phải PII, chỉ là link tham khảo văn bản pháp luật công khai) — kiểm tra lại URL còn khớp Nghị định đang trích dẫn trước khi gửi, không xoá field nếu không cần.

## 3. `cv-de-nghi-bhxh-giai-quyet-huu-tri.docx` — Công văn đề nghị BHXH giải quyết chế độ hưu trí

| Placeholder | Ý nghĩa | Số lần | Ghi chú |
|---|---|---|---|
| `HO_TEN` | Họ tên viên chức | 1 | hỏi |
| `GIAM_DOC_KY` | Người ký (trong bảng chữ ký cuối trang) | 2 | hỏi |

Còn `mã số BHXH`, ngày hưởng chế độ, số hiệu Luật BHXH trích dẫn — sanitize thành `{{SO_LIEU}}`/`{{NGAY_THANG}}`.

## 4. `cv-bao-cao-soyte-nghi-huu-lanh-dao.docx` — Báo cáo Sở Y tế nghỉ hưu lãnh đạo

Dùng khi người nghỉ hưu là **cán bộ lãnh đạo BV** (Giám đốc/Phó Giám đốc) — thẩm quyền ra quyết định nghỉ hưu thuộc **Sở Y tế**, không phải Giám đốc BV; công văn này chỉ là báo cáo đề nghị Sở ra quyết định.

| Placeholder | Ý nghĩa | Số lần | Ghi chú |
|---|---|---|---|
| `HO_TEN` | Họ tên lãnh đạo nghỉ hưu | 2 | hỏi |
| `TRINH_DO_CHUYEN_MON` | Trình độ chuyên môn | 1 | hỏi |
| `CHUC_DANH_NGHE_NGHIEP` | Chức danh nghề nghiệp | 1 | hỏi |
| `CHUC_VU` | Chức vụ quản lý (vd. Phó Giám đốc BV) | 1 | hỏi |
| `GIAM_DOC_KY` | Người ký báo cáo (Giám đốc BV, không phải người nghỉ hưu) | 2 | hỏi |

## 5. `van-ban-de-nghi-che-do-bhxh.docx` — Văn bản đề nghị (mẫu chuẩn BHXH)

Mẫu biểu chuẩn của cơ quan BHXH (không phải BV soạn) — **người lao động/người hưởng tự kê khai và ký**, không có `GIAM_DOC_KY`.

| Placeholder | Ý nghĩa | Số lần | Ghi chú |
|---|---|---|---|
| `HO_TEN` | Họ và tên người đề nghị / tên chủ tài khoản | 2 | hỏi |
| `GIOI_TINH` | Giới tính | 1 | hỏi |
| `DIA_CHI` | Địa chỉ liên hệ | 1 | hỏi |
| `SO_TAI_KHOAN` | Số tài khoản nhận lương hưu (một phần — phần còn lại nằm trong `{{SO_LIEU}}` liền kề, xem ghi chú) | 1 | hỏi |
| `NGAN_HANG_CHI_NHANH` | Ngân hàng + chi nhánh | 1 | hỏi |
| `NOI_KCB_BAN_DAU` | Nơi đăng ký KCB ban đầu | 1 | hỏi |

**Lưu ý `SO_TAI_KHOAN`**: nguyên văn sau sanitize là `Số tài khoản:{{SO_TAI_KHOAN}}{{SO_LIEU}}` — số tài khoản gốc bị regex cắt làm hai token liền nhau. Khi điền, `get` đoạn `/body/p[24]` (hoặc path hiện tại sau các lần sửa khác) để xem chính xác vị trí, ghi đè cả cụm bằng `officecli set <path> --prop text="Số tài khoản: <số thật>"` thay vì merge riêng từng token.

Còn ngày sinh, số CCCD/định danh cá nhân, số điện thoại, mã số BHXH, thời điểm hưởng — sanitize thành `{{SO_LIEU}}`/`{{NGAY_THANG}}`, không lặp lại đồng nhất (mỗi field một giá trị khác nhau tại một vị trí duy nhất) — xác nhận đúng đoạn bằng `get` trước khi `set`.

## 6. `giay-xac-nhan-thoi-gian-cong-tac.docx` — Giấy xác nhận thời gian công tác

| Placeholder | Ý nghĩa | Số lần | Ghi chú |
|---|---|---|---|
| `HO_TEN` | Họ tên người được xác nhận | 2 | hỏi |
| `DIA_CHI` | Chỗ ở hiện tại | 1 | hỏi |
| `TRINH_DO_CHUYEN_MON` | Trình độ chuyên môn | 1 | hỏi |
| `PHAM_VI_HANH_NGHE` | Phạm vi khám chữa bệnh (vd. Ngoại khoa) | 1 | hỏi |
| `PHO_GIAM_DOC_KY` | Người ký (KT. Giám đốc / Phó Giám đốc) | 2 | hỏi |

"Nơi cấp" CCCD giữ nguyên "Cục trưởng Cục Cảnh sát quản lý hành chính về trật tự xã hội" — đây là cơ quan cấp CCCD gắn chip tập trung toàn quốc từ 2021, **không phải dữ liệu cá nhân**, dùng làm giá trị mặc định; chỉ sửa nếu CCCD của người được xác nhận do nơi khác cấp (CCCD cũ, trước 2021).

## 7. `cv-thongbao-bhxh-thay-doi-nhan-luc.docx` — Thông báo BHXH thay đổi nhân lực + danh sách

| Placeholder | Ý nghĩa | Số lần | Ghi chú |
|---|---|---|---|
| `GIAM_DOC_KY` | Người ký công văn | 2 | hỏi |

Bảng "DANH SÁCH THAY ĐỔI NHÂN LỰC" (`/body/tbl[4]`) — 7 cột (STT, HỌ TÊN, SỐ CCCD, SỐ CCHN/GPHN, THỜI GIAN BẮT ĐẦU, THỜI GIAN KẾT THÚC, TÌNH TRẠNG), còn 1 dòng mẫu (`tr[2]`):

| Cột | Placeholder trong dòng mẫu |
|---|---|
| HỌ TÊN | `{{HO_TEN}}` |
| SỐ CCCD | `{{SO_LIEU}}` |
| SỐ CCHN/GPHN | `{{SO_LIEU}}/PT-CCHN` |
| THỜI GIAN BẮT ĐẦU | (trống) |
| THỜI GIAN KẾT THÚC | `{{NGAY_THANG}}` |
| TÌNH TRẠNG | `{{TINH_TRANG_NHAN_SU}}` (vd. "Chấm dứt hợp đồng làm việc", "Tuyển dụng mới", "Chuyển công tác") |

Nhân dòng theo `officecli add --type row --from "/body/tbl[4]/tr[2]"` cho từng người, xem `SKILL.md` mục "Bảng danh sách nhiều dòng". Dòng "Ấn định danh sách có: `{{SO_LIEU}}` người." cập nhật lại theo số dòng thật.

## Token dùng chung nhiều template

| Token | Ý nghĩa | Xuất hiện ở |
|---|---|---|
| `HO_TEN` | Họ tên đối tượng chính của văn bản | cả 7 template |
| `GIAM_DOC_KY` | Chữ ký Giám đốc BV đương nhiệm | qd-nghi-huu, tb-nghi-huu, cv-de-nghi-bhxh-giai-quyet-huu-tri, cv-bao-cao-soyte-nghi-huu-lanh-dao, cv-thongbao-bhxh-thay-doi-nhan-luc |
| `PHO_GIAM_DOC_KY` | Chữ ký Phó Giám đốc (KT. Giám đốc) | giay-xac-nhan-thoi-gian-cong-tac |
| `NGAN_HANG_CHI_NHANH` | Ngân hàng + chi nhánh nhận lương hưu | qd-nghi-huu, van-ban-de-nghi-che-do-bhxh |
| `NOI_KCB_BAN_DAU` | Nơi khám chữa bệnh BHYT ban đầu | qd-nghi-huu, van-ban-de-nghi-che-do-bhxh |

`SO_LIEU`/`NGAY_THANG`/`DIEN_THOAI`/`GIA_TRI`/`FIELD` là token generic của bộ sanitize tự động (`scripts/build-runtime-assets.js`) — không có tên ngữ nghĩa riêng, có thể lặp lại nhiều lần với giá trị khác nhau trong cùng file. Luôn `get` đoạn cụ thể trước khi `set`, không đoán vị trí.
