# Templates — `phong-tccb`

## Nguồn gốc

7 template chuyển đổi từ hồ sơ TCCB thật (BVĐK tỉnh Phú Thọ) của 3 vụ việc nghỉ hưu và 2 vụ việc xác nhận/thông báo nhân sự khác nhau — không phải mẫu trống, không phải một hồ sơ duy nhất như `phong-vattu`. File nguồn giữ ngoài git tại `_seed/` (chặn bởi `.gitignore`: `skills/**/assets/_seed/`).

## Đã convert (7)

| Nguồn gốc (thư mục TCCB.AI) | Target | Field chính (`{{KEY}}`) |
|---|---|---|
| `BHXH/Quyết định nghỉ hưu chuẩn.doc` | `qd-nghi-huu.docx` | 9 (+ Căn cứ pháp lý dạng `{{SO_LIEU}}`/`{{NGAY_THANG}}` không merge được) |
| `BHXH/Thông báo nghỉ hưu.doc` | `tb-nghi-huu.docx` | 5 (+ Căn cứ pháp lý, chứa HYPERLINK field) |
| `BHXH/CÔNG VĂN GIẢI QUYẾT NGHỈ HƯU.docx` | `cv-de-nghi-bhxh-giai-quyet-huu-tri.docx` | 2 |
| `BHXH/CONG VAN gửi sở y tế đối với lãnh đạo nghỉ hưu.docx` | `cv-bao-cao-soyte-nghi-huu-lanh-dao.docx` | 5 |
| `BHXH/VĂN BẢN ĐỀ NGHỊ.docx` | `van-ban-de-nghi-che-do-bhxh.docx` | 6 (mẫu chuẩn BHXH, người lao động tự ký) |
| `CHỨNG CHỈ HÀNH NGHỀ/Giấy xác nhận thời gian công tác tại BV.docx` | `giay-xac-nhan-thoi-gian-cong-tac.docx` | 5 |
| `CHỨNG CHỈ HÀNH NGHỀ/BHXH/CONG VAN THONG BAO GUI BHXH VỀ VIỆC THAY ĐỔI NHÂN LỰC BỆNH VIỆN.docx` | `cv-thongbao-bhxh-thay-doi-nhan-luc.docx` | 1 + bảng danh sách (đã cắt 10 dòng thật còn 1 dòng mẫu) |

2 file `.doc` gốc (`qd-nghi-huu`, `tb-nghi-huu`) convert sang `.docx` bằng `textutil -convert docx` (không có LibreOffice trong môi trường build) trước khi chạy sanitizer — 5 file `.docx` gốc chạy thẳng.

## Quy trình sanitize

`node scripts/build-runtime-assets.js --source-root skills --skills phong-tccb --debug` — quét mọi text node trong `word/*.xml`, thay:

- Số 4–18 chữ số, ngày `DD/MM/YYYY`, số điện thoại, số tiền → token generic.
- Cặp nhãn:giá trị nhận diện được (`mã số thuế`, `số tài khoản`, `họ tên`, `giám đốc`, `kế toán trưởng`, `đại diện`...) → token ngữ nghĩa.

**Không bắt được** (đã xử lý thủ công bằng `officecli set / --find "<chuỗi thật>" --replace "{{KEY}}"` sau khi build):

- Họ tên đứng sau `Ông:`/`Bà:` không có nhãn "họ tên:" (mọi occurrence trong cả 7 file).
- Địa chỉ/nơi cư trú/nơi sinh đứng sau nhãn khác `địa chỉ:` (`Chỗ ở hiện tại:`, `Nơi cư trú:`, `Nơi sinh:`).
- Tên ngân hàng + chi nhánh không đi kèm số (`Ngân hàng Sacombank, chi nhánh Việt Trì, Phú Thọ`).
- **Chữ ký Giám đốc/Phó Giám đốc trong bảng/đoạn riêng** — nằm ở ô bảng cuối trang, tách khỏi nhãn "GIÁM ĐỐC" bởi nhiều dòng trống, sanitizer không nối được ngữ cảnh giữa các đoạn. Phát hiện bằng `officecli get <file> "/body/tbl[N]" --depth 3` — **`officecli view <file> text` không hiển thị nội dung bên trong bảng**, chỉ báo `[Table: N rows]`; bỏ qua bước quét bảng là lỗ hổng PII lớn nhất khi seed template mới.
- Bảng danh sách nhiều người (`cv-thongbao-bhxh-thay-doi-nhan-luc.docx`, cột HỌ TÊN) — cắt từ 11 dòng (header + 10 người thật) còn 2 dòng (header + 1 dòng mẫu) bằng `officecli remove`, sau đó blank cột HỌ TÊN/TÌNH TRẠNG bằng `officecli set`.

Đã xác minh: quét lại toàn bộ 7 file bằng `officecli view text` + `officecli get "/body/tbl[N]" --depth 3` cho mọi bảng, không còn tên riêng, số CCCD/BHXH/tài khoản/điện thoại, địa chỉ hay chữ ký thật.

## Giới hạn kỹ thuật

- **Legal-citation token collision**: khối "Căn cứ" (trích dẫn Luật/Nghị định/Quyết định) và dòng ngày ký đầu trang bị sanitize thành nhiều `{{SO_LIEU}}`/`{{NGAY_THANG}}` **cùng tên khác giá trị** trong cùng file — `officecli merge` (thay theo khoá, áp dụng mọi occurrence) không dùng được cho khối này; phải `get`/`set` từng đoạn. Xem `SKILL.md` mục "Phần Căn cứ pháp lý".
- **Không tự phục hồi số hiệu luật từ hồ sơ nguồn**: hồ sơ gốc của `tb-nghi-huu.docx` trích "Luật Bảo hiểm xã hội ngày 20/11/2014" (đã hết hiệu lực, thay bằng Luật số 41/2024/QH15) trong khi các mẫu khác trong cùng bộ hồ sơ đã dùng luật mới — nghĩa là ngay cả hồ sơ giấy của phòng cũng có bản trích dẫn lỗi thời. Đây là lý do khối Căn cứ **không được hardcode lại từ bản gốc** dù đã biết nội dung — luôn xác nhận với người dùng/quy định hiện hành.
- 2 file nguồn `.doc` (`qd-nghi-huu`, `tb-nghi-huu`) convert bằng `textutil` không có bảng ở đầu/cuối trang (khác 5 file `.docx` gốc) — quốc hiệu/tiêu ngữ và khối chữ ký nằm ở đoạn văn thường (`/body/p[N]`), không phải ô bảng.
- `van-ban-de-nghi-che-do-bhxh.docx` chứa `[formfield:Check4]` (checkbox Word gốc) — giữ nguyên, không phải PII.

## Chưa có mẫu

Báo cáo, Kế hoạch, Quy chế, Quyết định nhân sự khác (bổ nhiệm/miễn nhiệm/tuyển dụng/khen thưởng/kỷ luật/quy hoạch cán bộ) — hồ sơ nguồn (`TCCB.AI/Báo cáo`, `Kế hoạch`, `Quy chế`, `Quyết định`, `Công văn, Tờ trình`) đa dạng về loại, không phải một quy trình lặp lại như nghỉ hưu; chưa chọn được bộ mẫu đại diện để convert. Không bịa mẫu — xem `SKILL.md` mục "Nhánh chưa có mẫu" cho quy trình Markdown tạm thời.
