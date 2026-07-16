# Templates — `phong-vattu`

Nguồn: một hồ sơ mua sắm **THẬT đã hoàn tất** của Phòng Vật tư – TBYT (gói "Mua sắm băng ghim và dụng cụ cắt khâu nối..."), khác `phong-hcqt`/`phong-dieu-duong` (mẫu trống) — giống cách `phong-cntt` được xây dựng. Toàn bộ tên người, tên/địa chỉ/MST/số tài khoản nhà thầu, MST/số tài khoản Bệnh viện, số quyết định/hợp đồng, ngày tháng tham chiếu, đơn giá/mã hàng đã được xoá và thay bằng `{{KEY}}` — xác minh bằng quét lại toàn bộ 12 file. Định dạng: mỗi template là **một file `.docx`/`.xlsx` duy nhất**, sinh file bằng `officecli merge` — xem `../SKILL.md`.

## Đã convert (12)

| Nguồn gốc | Target | Field (khoá `{{KEY}}` duy nhất) |
|---|---|---|
| `3. QĐ phê duyệt chủ trương mua sắm Băng ghim PTUB.doc` | `qd-phe-duyet-chu-truong-vattu.docx` | 19 |
| `4. Bien ban hop HĐKH thống nhất SL, TCKT. băng ghim.docx` | `bb-hop-hdkh-danh-muc-tckt.docx` | 15 |
| `5. QĐ phe duyet danh muc, so lương, cau hinh ky thuat mua sam bang ghim.doc` | `qd-phe-duyet-danh-muc-tckt.docx` | 20 |
| `7. BB hop TCG thong nhat du toan, KHLCNT - Mua băng ghim.docx` | `bb-hop-tcg-du-toan-khlcnt.docx` | 44 |
| `8. Quyet dinh phe duyet nhiem vu va du toan mua sam bang ghim.docx` | `qd-phe-duyet-nhiem-vu-du-toan.docx` | 22 |
| `9. Tờ trình phê duyệt KHLCNT...docx` (tên file ghi nhầm sản phẩm khác — nội dung thân bài đúng là băng ghim) | `to-trinh-khlcnt-vattu.docx` | 30 |
| `10. QD phe duyet ke hoach lcnt...doc` | `qd-phe-duyet-khlcnt-vattu.docx` | 20 |
| `11. BB Hop Tổ chuyên gia thong nhat xay HSCG băng ghim.doc` | `bb-hop-tcg-xay-hscg.docx` | 25 |
| `15. Tờ trình phê duyệt KQ LCNT - Mua băng ghim.doc` | `to-trinh-kqlcnt-vattu.docx` | 52 |
| `16. QĐ phê duyệt KQLCNT - Mua sam bang ghim.doc` | `qd-phe-duyet-kqlcnt-vattu.docx` | 42 |
| `19.Hop dong VTHC.docx` | `hop-dong-vattu.docx` | 49 (⚠️ file nhạy cảm nhất — định danh/tài chính cả 2 bên) |
| `12.Mẫu số 02A. PHẠM VI CUNG CẤP HÀNG HÓA Bang ghim.xlsx` | `pham-vi-cung-cap-hang-hoa.xlsx` | 0 (mẫu MPI chuẩn, dữ liệu hàng hoá đã xoá — điền tay theo hướng dẫn có sẵn trong sheet) |

`.doc` gốc convert sang `.docx` bằng `textutil -convert docx` (không có LibreOffice trong môi trường build — xem "Giới hạn kỹ thuật" bên dưới).

## Chưa có / không convert

Chu trình sau hợp đồng (nghiệm thu, thanh lý, đề nghị thanh toán) **chưa có mẫu thật của phòng Vật tư** trong hồ sơ nguồn (hồ sơ này dừng ở bước ký hợp đồng) — không bịa mẫu. Tạm dùng cấu trúc tương đương ở `../../phong-hcqt/assets/` (`bbnt-khoi-luong-hoan-thanh.docx`, `bien-ban-thanh-ly-hop-dong.docx`, `giay-de-nghi-thanh-toan.docx`) làm tham khảo cho đến khi có mẫu thật của Vật tư.

Không convert (không phải mẫu thư/quyết định do bệnh viện soạn, hoặc trùng lặp): E-HSMT (PDF cổng quốc gia), "Bìa HSMCG" (trang bìa, trùng thông tin với tờ trình KHLCNT), kết quả chào giá trực tuyến (PDF/zip cổng quốc gia), xác nhận chấp thuận HĐ (ảnh chụp màn hình), bảo lãnh HĐ (do ngân hàng phát hành), bản PDF cuối đã ký trùng với 16 (đã có bản .doc), QĐ 65 kiện toàn TCG (quyết định đứng riêng, PDF-only, chỉ tham chiếu bằng số hiệu qua `{{SO_QD_KIEN_TOAN_TCG}}`), "0.LIST DANH MỤC" (bảng theo dõi tiến độ nội bộ có tên người thật, chỉ dùng để dựng trình tự 22 bước ở `SKILL.md`, không phải mẫu), "6.THAM CHIẾU" và "ÁNH XẠ" (dữ liệu tham chiếu giá của bệnh viện khác / công cụ ánh xạ mã nội bộ).

## Giới hạn kỹ thuật cần biết trước khi sửa tiếp các template `.doc` gốc

Môi trường build này **không có LibreOffice** (`soffice`/`libreoffice` not found), khác quy trình đã dùng ở `phong-hcqt` (`soffice --headless --convert-to docx`). 6 file nguồn `.doc` (`qd-phe-duyet-chu-truong-vattu`, `qd-phe-duyet-danh-muc-tckt`, `qd-phe-duyet-khlcnt-vattu`, `bb-hop-tcg-xay-hscg`, `to-trinh-kqlcnt-vattu`, `qd-phe-duyet-kqlcnt-vattu`) được convert bằng `textutil -convert docx` (built-in macOS) thay thế — kết quả:

- **Bảng bị làm phẳng thành đoạn văn**: các phụ lục dạng bảng (danh mục hàng hoá, KHLCNT) trong nguồn `.doc` mất cấu trúc `<w:tbl>` khi qua `textutil` — nội dung phụ lục trong 6 file này là văn bản đã gộp cột, **không phải bảng Word thật** như ở 5 file nguồn `.docx` (`bb-hop-hdkh-danh-muc-tckt`, `bb-hop-tcg-du-toan-khlcnt`, `qd-phe-duyet-nhiem-vu-du-toan`, `to-trinh-khlcnt-vattu`, `hop-dong-vattu`) và `pham-vi-cung-cap-hang-hoa.xlsx`, nơi bảng phụ lục vẫn là bảng thật (dùng được `officecli get/set` theo đường dẫn `/body/tbl[N]/tr[R]/tc[C]` — xem `../references/vattu-truong-mau.md`).
- **`officecli validate` báo lỗi schema** trên cả 6 file này (ban đầu do `<w:sz-cs>` thay vì `<w:szCs>` — đã sửa; còn lại là thứ tự phần tử con trong `<w:rPr>` không đúng chuẩn OOXML). **Đã kiểm chứng `officecli get`/`set`/`merge` vẫn hoạt động đúng** bất chấp các cảnh báo này (test merge thực tế, xem log phiên làm việc) — chỉ `validate` phàn nàn, không chặn pipeline.
- Khuyến nghị: nếu có LibreOffice, convert lại 6 file `.doc` gốc theo đúng quy trình `phong-hcqt` để có bảng thật + schema sạch.

## Ghi chú kỹ thuật khác

- Một số đoạn (đặc biệt trong `hop-dong-vattu.docx`, `bb-hop-tcg-du-toan-khlcnt.docx`, `qd-phe-duyet-nhiem-vu-du-toan.docx`, `to-trinh-khlcnt-vattu.docx`, `bb-hop-hdkh-danh-muc-tckt.docx`) đã được **dựng lại ở cấp đoạn văn** (gộp toàn bộ run trong `<w:p>` thành một run trước khi thay `{{KEY}}`) vì Word chia nhỏ text thành nhiều run — cách thay chuỗi trực tiếp bỏ sót. Hệ quả: định dạng **trong nội bộ một đoạn** (in đậm/nghiêng cục bộ giữa câu, nếu có) có thể bị đồng nhất về định dạng của run đầu tiên; định dạng cấp đoạn/heading không đổi. `officecli validate` trên các file này báo cảnh báo `MarkupCompatibility` (thiếu khai báo prefix `w14/w15/w16se/wp14` cho thuộc tính `mc:Ignorable`) do ElementTree re-serialize — đã kiểm chứng không ảnh hưởng `get`/`set`/`merge`.
- Bảng "Thành phần dự họp"/"CÁC THÀNH VIÊN" (HĐKH ~26 người, TCG ~36 người) trong `bb-hop-hdkh-danh-muc-tckt.docx` và `bb-hop-tcg-du-toan-khlcnt.docx`: cột **Họ và tên** đã xoá trắng (không hardcode ai đang là thành viên — thành phần đổi theo QĐ kiện toàn), cột Chức vụ/Nhiệm vụ (cấu trúc ghế ngồi) giữ nguyên vì đó là thông tin tổ chức, không phải định danh cá nhân.
