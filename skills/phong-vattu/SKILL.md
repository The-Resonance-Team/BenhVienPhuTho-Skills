---
name: phong-vattu
description: "Skill Phòng Vật tư – TBYT (BVĐK tỉnh Phú Thọ): mua sắm hàng hoá/vật tư y tế trên ngưỡng qua mạng đấu thầu quốc gia (chào giá trực tuyến rút gọn) — chủ trương mua sắm, danh mục/số lượng/tiêu chí kỹ thuật, biên bản Hội đồng khoa học, biên bản Tổ chuyên gia, dự toán, KHLCNT, hồ sơ chào giá, KQLCNT, hợp đồng kinh tế mua bán hàng hoá. Dùng ngay khi user nhắc Vật tư, TBYT, mua sắm vật tư y tế, băng ghim/vật tư tiêu hao/hoá chất xét nghiệm, chào giá trực tuyến, E-TBMT, KHLCNT, KQLCNT, HĐKH, Tổ chuyên gia đấu thầu, hoặc soạn giấy tờ Phòng Vật tư."
---

# Phòng Vật tư – TBYT — officecli templates

## Tổng quan

Skill theo phòng **Vật tư – TBYT**, phủ chu trình mua sắm hàng hoá **trên ngưỡng, qua mạng đấu thầu quốc gia** (chào giá trực tuyến rút gọn) — dài và nhiều bước ký duyệt hơn "chỉ định thầu 50–dưới 500 triệu" của `phong-hcqt`/`phong-ktda`: chủ trương mua sắm → HĐKH thống nhất danh mục/SL/TCKT → QĐ danh mục/TCKT → BB TCG thống nhất dự toán & KHLCNT → QĐ nhiệm vụ & dự toán → tờ trình + QĐ duyệt KHLCNT → BB TCG xây hồ sơ chào giá → tờ trình + QĐ duyệt KQLCNT → hợp đồng kinh tế. 11 template `.docx` + 1 `.xlsx` trong `assets/`, sinh file bằng **`officecli merge`**.

**Trước khi merge:** đảm bảo đã chạy skill **`setup`** (kiểm tra `officecli`) và đọc `../officecli/references/output-safety.md`.

## Nguồn gốc template — đọc trước khi thêm template mới

12 template này chuyển đổi từ **một hồ sơ mua sắm THẬT đã hoàn tất** (gói "Mua sắm băng ghim và dụng cụ cắt khâu nối..."), không phải mẫu trống — cùng cách tiếp cận đã dùng ở `phong-cntt` (khác `phong-hcqt`/`phong-dieu-duong` seed từ mẫu trống). Toàn bộ dữ liệu thật của vụ việc gốc — tên người (Giám đốc, Trưởng phòng Vật tư, Kế toán trưởng, Tổ trưởng TCG, Chủ tịch/Thư ký HĐKH, ~26 thành viên HĐKH, ~36 thành viên TCG, đại diện nhà thầu), MST/tài khoản/điện thoại/fax của cả Bệnh viện và nhà thầu, số quyết định/tờ trình/hợp đồng và ngày tháng tham chiếu nội bộ chu trình, đơn giá/mã hàng/tên hàng hoá từng dòng — đã được xoá và thay bằng `{{KEY}}` hoặc để trắng, xác minh bằng quét lại toàn bộ 12 file (không còn tên riêng/số tài khoản/MST/giá trị hợp đồng thật). Danh mục field đầy đủ theo từng template: `references/vattu-truong-mau.md`. Trạng thái convert + giới hạn kỹ thuật (6/12 file nguồn `.doc` convert bằng `textutil` do môi trường build không có LibreOffice — phụ lục bảng của 6 file này bị làm phẳng thành đoạn văn): `assets/README.md`.

## Cổng bắt buộc (áp dụng mọi template)

- **Không bịa** `TEN_NHA_THAU`, `MA_SO_THUE_NCC`, `TK_NCC`, số QĐ/HĐ/tờ trình, ngày tham chiếu văn bản khác, `SO_ETBMT` nếu người dùng chưa cung cấp.
- **Nhóm dữ liệu định danh/tài chính của Bệnh viện luôn hỏi, không bao giờ hardcode**, dù giá trị không đổi giữa các lần dùng: `MA_SO_THUE_BV`, `DIENTHOAI_BV`, `FAX_BV`, `TK_KHO_BAC_1`, `TK_KHO_BAC_2`, `TK_SACOMBANK`, `TK_VIETCOMBANK`. Không lưu các giá trị này vào bất kỳ file sẽ commit vào repo — chỉ dùng trong phiên làm việc/`fields.json` tạm.
- **`GIAM_DOC_KY`, `TRUONG_PHONG_VATTU_KY`, `KE_TOAN_TRUONG_KY`, `TO_TRUONG_TCG_KY`, `CHU_TICH_HDKH_KY`, `THU_KY_HDKH_KY` luôn hỏi**, không hardcode ai đang đương nhiệm — chức danh có thể đổi người theo nhiệm kỳ hoặc theo quyết định kiện toàn mới.
- **Thành phần Hội đồng khoa học/Tổ chuyên gia** (bảng "Thành phần dự họp") không hardcode danh sách — thành phần đổi theo QĐ kiện toàn còn hiệu lực tại thời điểm họp; hỏi/điền theo QĐ kiện toàn thật của vụ việc đang xử lý.
- Merge khi còn trường bắt buộc chưa có giá trị thật — không tự chế số liệu để lấp chỗ trống.

## Tham chiếu nhanh — 12 template

| Nhiệm vụ | Template |
|---|---|
| QĐ phê duyệt chủ trương mua sắm | `assets/qd-phe-duyet-chu-truong-vattu.docx` |
| BB họp HĐKH thống nhất danh mục/SL/TCKT | `assets/bb-hop-hdkh-danh-muc-tckt.docx` |
| QĐ phê duyệt danh mục/SL/TCKT | `assets/qd-phe-duyet-danh-muc-tckt.docx` |
| BB họp TCG thống nhất dự toán & KHLCNT | `assets/bb-hop-tcg-du-toan-khlcnt.docx` |
| QĐ phê duyệt nhiệm vụ và dự toán | `assets/qd-phe-duyet-nhiem-vu-du-toan.docx` |
| Tờ trình phê duyệt KHLCNT | `assets/to-trinh-khlcnt-vattu.docx` |
| QĐ phê duyệt KHLCNT | `assets/qd-phe-duyet-khlcnt-vattu.docx` |
| BB họp TCG thống nhất xây hồ sơ chào giá | `assets/bb-hop-tcg-xay-hscg.docx` |
| Tờ trình phê duyệt KQLCNT | `assets/to-trinh-kqlcnt-vattu.docx` |
| QĐ phê duyệt KQLCNT | `assets/qd-phe-duyet-kqlcnt-vattu.docx` |
| Hợp đồng kinh tế (mua bán hàng hoá) | `assets/hop-dong-vattu.docx` |
| Phạm vi cung cấp hàng hoá — Mẫu 02A | `assets/pham-vi-cung-cap-hang-hoa.xlsx` |

Trường đầy đủ theo từng template: `references/vattu-truong-mau.md`.

### Chưa có mẫu — nghiệm thu / thanh lý / đề nghị thanh toán

Hồ sơ nguồn dừng ở bước ký hợp đồng (chưa tới nghiệm thu/thanh lý/thanh toán) — **chưa có mẫu thật của Vật tư cho 3 bước này**, không bịa mẫu. Tạm dùng cấu trúc tương đương của `phong-hcqt` làm tham khảo cho tới khi có hồ sơ thật của Vật tư để seed: `../phong-hcqt/assets/bbnt-khoi-luong-hoan-thanh.docx`, `../phong-hcqt/assets/bien-ban-thanh-ly-hop-dong.docx`, `../phong-hcqt/assets/giay-de-nghi-thanh-toan.docx` (đổi `PHONG_BAN` → "Phòng Vật tư – TBYT" khi dùng tạm).

## Thu thập trường qua hội thoại (grilling)

**Hỏi tất cả trường còn thiếu GỘP MỘT LẦN** — không hỏi từng câu.

1. **Trích xuất placeholder** từ runtime template bằng `officecli view` — nguồn duy nhất:
   ```bash
   officecli view assets/<template>.docx text --json

   Dùng JSON trả về để tìm các token `{{KEY}}`; không dựng danh sách field từ trí nhớ.
   ```
2. **Trường suy luận được** từ ngữ cảnh hội thoại/workspace → ghi nhận, **xác nhận lại với người dùng** trước khi dùng.
3. **Gộp tất cả trường chưa có** → hỏi một lần, đánh số, mỗi câu 1–2 dòng, có gợi ý mặc định.
4. **Trường tự động** (`NGAY_KY`/`THANG_KY`/`NAM_KY`/`NGAY_HOP`/`THANG_HOP`/`NAM_HOP` = hôm nay, `PHONG_BAN` = "Phòng Vật tư – TBYT") → điền và thông báo.

Định dạng câu hỏi gộp:
```
Bạn cung cấp các thông tin sau:

1. [TRƯỜNG_1] — [mô tả] (gợi ý: ...)
2. [TRƯỜNG_2] — [mô tả] (gợi ý: ...)
...

Trả lời theo định dạng: 1=giá trị, 2=giá trị, ...
```
**Không hỏi từng câu.** Nếu người dùng trả lời từng câu → nhắc lại yêu cầu trả lời gộp.

Sau khi đủ trường → tóm tắt toàn bộ giá trị → xin xác nhận → merge.

## Sinh file

### Trường thân bài (vô hướng) — `officecli merge`

Tạo `fields.json` bằng file tool an toàn trong thư mục tạm, quyền hạn chế; không in nội dung và xoá file sau khi kiểm tra. Sau đó chạy:

```bash
{"TEN_GOI_THAU": "...", "TEN_DU_TOAN": "...", "TONG_MUC_DU_TOAN": "...", "TONG_MUC_DU_TOAN_CHU": "...",
 "PHONG_BAN": "Phòng Vật tư – TBYT", "GIAM_DOC_KY": "...", "NGAY_KY": "16", "THANG_KY": "07", "NAM_KY": "2026", ...}
officecli merge assets/to-trinh-khlcnt-vattu.docx out.docx --data /tmp/fields.json
officecli validate out.docx
officecli view out.docx issues --type content --limit 100
officecli view out.docx text --json
```

Không giao file khi còn `{{...}}`, lỗi validate, lỗi nội dung, ô trống ngoài dự kiến, hoặc chưa kiểm tra lại số dòng, đơn vị và tổng tiền bằng `officecli get`.

### Bảng phụ lục (dòng biến đổi) — `officecli set`

`officecli merge` chỉ thay khoá vô hướng, không tự nhân/xoá dòng bảng. Hai loại phụ lục trong bộ template này:

- **Danh mục hàng hoá** (`bb-hop-hdkh-danh-muc-tckt`, `bb-hop-tcg-du-toan-khlcnt`, `qd-phe-duyet-nhiem-vu-du-toan`, `to-trinh-khlcnt-vattu`, `hop-dong-vattu`, `pham-vi-cung-cap-hang-hoa.xlsx`): còn 4 dòng mẫu dạng `VT_n_TEN`/`VT_n_TCKT`/`VT_n_DON_GIA`/... — nhân/xoá dòng theo số mặt hàng thật của vụ việc mới.
- **Thành phần dự họp** (`bb-hop-hdkh-danh-muc-tckt`, `bb-hop-tcg-du-toan-khlcnt`): cột Họ và tên đã xoá trắng — điền theo QĐ kiện toàn TCG/HĐKH đang hiệu lực, không hardcode.

```bash
officecli get out.docx "/body/tbl[N]/tr[R]"                      # xem đường dẫn/nội dung hiện tại — luôn get trước
officecli set out.docx "/body/tbl[N]/tr[R]/tc[C]" --prop text="Tên vật tư"
```

Chỉ số N/R/C khác nhau theo từng template — xác nhận bằng `get` trước khi `set`. Với 6 file nguồn `.doc` (`qd-phe-duyet-chu-truong-vattu`, `qd-phe-duyet-danh-muc-tckt`, `qd-phe-duyet-khlcnt-vattu`, `bb-hop-tcg-xay-hscg`, `to-trinh-kqlcnt-vattu`, `qd-phe-duyet-kqlcnt-vattu`), phụ lục bảng đã bị làm phẳng thành đoạn văn khi convert bằng `textutil` (không có LibreOffice trong môi trường build) — sửa trực tiếp bằng `officecli set` trên đoạn văn hoặc dựng lại bảng bằng `officecli add` nếu cần bảng thật (xem `assets/README.md` mục "Giới hạn kỹ thuật").

### Quy tắc quan trọng

- Merge chỉ trên file trong `assets/` — không tạo bố cục mới, không `officecli new --prompt`.
- Số văn bản (`___/QĐ-BV`, `___/TTr-TCG`, `___/HĐKT/___-BVĐKPT`) để `___` — Văn thư cấp số.
- Không bịa chữ ký/số QĐ/tên nhà thầu/MST/số tài khoản nếu người dùng chưa cung cấp.
- Các cảnh báo validate của nguồn cũ không phải tiêu chí chấp nhận cho file đầu ra. File đầu ra phải qua `validate` và `view ... issues --type content`; nếu có lỗi thì dừng.
- Sau merge: đọc `view ... text --json`, kiểm tra token còn sót và dùng `officecli get` đọc lại các bảng đã set; nếu thiếu dữ liệu hoặc lệch tổng → hỏi lại.

## Quản trị dữ liệu

- Không đưa tên bệnh nhân, mã hồ sơ, số điện thoại, địa chỉ, ảnh, bệnh án hoặc dữ liệu định danh khác vào template hay `fields.json` nếu chưa có phê duyệt của bệnh viện.
- Không gửi hồ sơ mua sắm, thông tin nhà thầu, tài khoản hoặc mã số thuế lên biểu mẫu/cloud/API/agent bên ngoài; chỉ dùng kho được phê duyệt.
- Tách dữ liệu nguồn khỏi bản nháp, tối thiểu hóa trường nhận diện, xác nhận người ký và người phê duyệt trước khi xuất bản.

## Sau khi xong

1. Trả lời người dùng: đã tạo file gì, còn thiếu trường/dòng phụ lục gì.
2. Đính kèm `.docx`/`.xlsx`.
