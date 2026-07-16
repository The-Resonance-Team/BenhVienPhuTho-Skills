---
name: phong-cntt
description: "Skill Phòng Công nghệ thông tin (BVĐK tỉnh Phú Thọ): mua sắm/LCNT thiết bị CNTT (đề xuất, yêu cầu báo giá, tờ trình/QĐ duyệt dự toán & KHLCNT, hợp đồng kinh tế, biên bản nghiệm thu, thanh lý hợp đồng), biên bản giao nhận TSCĐ-CCDC. Dùng ngay khi user nhắc CNTT, mua sắm thiết bị CNTT, tờ trình dự toán, KHLCNT, KQLCNT, hợp đồng mua bán thiết bị."
---

# Phòng Công nghệ thông tin — officecli templates

## Tổng quan

Skill theo phòng **CNTT**, phủ toàn bộ chu trình mua sắm/LCNT một gói thầu thiết bị CNTT: đề xuất → yêu cầu báo giá → tờ trình + QĐ duyệt dự toán & KHLCNT → thư mời + dự thảo + biên bản hoàn thiện hợp đồng → tờ trình + QĐ duyệt KQLCNT → hợp đồng kinh tế → nghiệm thu → thanh lý → giao nhận tài sản → đề nghị thanh toán. 14 template `.docx` trong `assets/`, sinh file bằng **`officecli merge`** (mỗi template = một file `.docx`, gắn sẵn `{{KEY}}` tại các trường cần điền).

**Trước khi merge:** đảm bảo đã chạy skill **`setup`** (kiểm tra/cài `officecli`) và đọc `../officecli/references/output-safety.md`.

## Nguồn gốc template — đọc trước khi thêm template mới

14 template này được chuyển đổi từ **một hồ sơ mua sắm thật đã hoàn tất** (không phải mẫu trống của bệnh viện, khác `phong-hcqt`/`phong-dieu-duong`). Toàn bộ dữ liệu thật của vụ việc gốc — tên người, tên/địa chỉ/MST/SĐT/tài khoản nhà thầu, MST/tài khoản Bệnh viện, số hợp đồng, ngày tháng tham chiếu, đơn giá và mã hàng từng dòng trong bảng danh mục hàng hoá — đã được xoá và thay bằng `{{KEY}}` hoặc `___`, xác minh bằng quét lại toàn bộ 14 file (không còn tên riêng/số tài khoản/MST/giá trị hợp đồng thật nào sau khi build). Danh mục field đầy đủ theo từng template: `references/cntt-truong-mau.md`.

## Cổng bắt buộc (áp dụng mọi template)

- **Không bịa** `TEN_NHA_THAU`, `MA_SO_THUE_NCC`, `TK_NHA_THAU`, số QĐ/HĐ, ngày tham chiếu văn bản khác nếu người dùng chưa cung cấp.
- **Nhóm dữ liệu định danh/tài chính của Bệnh viện luôn hỏi, không bao giờ hardcode** dù giá trị không đổi giữa các lần dùng: `MA_SO_THUE_BV`, `TK_KHO_BAC_1`, `TK_KHO_BAC_2`, `TK_VIETCOMBANK`, `DIENTHOAI_BV`, `MA_DON_VI_SDNS`. Không lưu các giá trị này vào bất kỳ file nào sẽ commit vào repo (kể cả file tham khảo) — chỉ dùng trong phiên làm việc/`fields.json` tạm.
- **`GIAM_DOC_KY` luôn hỏi**, không hardcode tên Giám đốc hiện tại — chức danh có thể đổi người theo nhiệm kỳ.
- Merge khi còn trường bắt buộc chưa có giá trị thật — không tự chế số liệu để lấp chỗ trống.

## Tham chiếu nhanh — 14 template

| Nhiệm vụ | Template |
|---|---|
| Đơn đề xuất mua sắm | `assets/don-de-xuat-cntt.docx` |
| Yêu cầu báo giá | `assets/yeu-cau-bao-gia-cntt.docx` |
| Tờ trình duyệt dự toán & KHLCNT | `assets/to-trinh-du-toan-khlcnt.docx` |
| QĐ duyệt dự toán & KHLCNT | `assets/qd-phe-duyet-du-toan-khlcnt.docx` |
| Thư mời hoàn thiện hợp đồng | `assets/thu-moi-hoan-thien-hop-dong.docx` |
| Dự thảo hợp đồng | `assets/du-thao-hop-dong.docx` |
| Biên bản hoàn thiện hợp đồng | `assets/bien-ban-hoan-thien-hop-dong.docx` |
| Tờ trình duyệt KQLCNT | `assets/to-trinh-kqlcnt.docx` |
| QĐ duyệt KQLCNT | `assets/qd-phe-duyet-kqlcnt.docx` |
| Hợp đồng kinh tế | `assets/hop-dong.docx` |
| Biên bản nghiệm thu và bàn giao | `assets/bbnt-khoi-luong-hoan-thanh.docx` |
| Biên bản thanh lý hợp đồng | `assets/bien-ban-thanh-ly-hop-dong.docx` |
| Biên bản giao nhận TSCĐ - CCDC | `assets/bien-ban-giao-nhan-tscd-ccdc.docx` |
| Đề nghị thanh toán từ nhà thầu | `assets/de-nghi-thanh-toan-tu-ncc.docx` |

Trường đầy đủ theo từng template (kể cả trường dùng chung và trường riêng): `references/cntt-truong-mau.md`.

## Thu thập trường qua hội thoại (grilling)

**Hỏi tất cả trường còn thiếu GỘP MỘT LẦN** — không hỏi từng câu.

1. **Trích xuất placeholder** từ runtime template bằng `officecli view` — nguồn duy nhất, không dựa vào bảng cứng:
   ```bash
    officecli view assets/<template>.docx text --json

   Dùng JSON trả về để tìm các token `{{KEY}}`.
   ```
2. **Trường suy luận được** từ ngữ cảnh hội thoại/workspace → ghi nhận, **xác nhận lại với người dùng** trước khi dùng.
3. **Gộp tất cả trường chưa có** → hỏi một lần, đánh số, mỗi câu 1–2 dòng, có gợi ý mặc định.
4. **Trường tự động** (`NGAY_KY`/`THANG_KY`/`NAM_KY` = hôm nay, `CHUC_DANH_KY` = "Trưởng phòng Công nghệ thông tin") → điền và thông báo.

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

1. Tạo `fields.json` bằng file tool an toàn trong thư mục tạm, quyền hạn chế; không truyền JSON qua shell string, không in nội dung, và xoá file sau khi hoàn tất.
2. Merge một lần:

   ```bash
   officecli merge assets/to-trinh-du-toan-khlcnt.docx out.docx --data /tmp/fields.json
   ```

3. Chạy toàn bộ checklist trong `../officecli/references/output-safety.md`: `officecli validate`, `officecli view ... issues`, đọc text để tìm `{{...}}`, rồi kiểm tra lại các ô phụ lục sau `set`.

### Bảng phụ lục "Danh mục hàng hoá" (dòng biến đổi) — `officecli set`

7 template (đơn đề xuất, yêu cầu báo giá, tờ trình/QĐ dự toán, dự thảo/BB hoàn thiện hợp đồng, tờ trình/QĐ KQLCNT, hợp đồng, BB nghiệm thu) có bảng danh mục hàng hoá — `officecli merge` chỉ thay khoá vô hướng, không tự nhân/xoá dòng bảng. Các dòng đã blank (`________`) là mẫu ví dụ giữ nguyên số dòng gốc; điền từng ô sau khi merge phần thân:

```bash
officecli get out.docx "/body/tbl[N]/tr[R]"                      # xem đường dẫn/nội dung hiện tại — luôn get trước, đừng đoán
officecli set out.docx "/body/tbl[N]/tr[R]/tc[C]" --prop text="Tên hàng hoá"
```

Chỉ số N/R/C khác nhau theo từng template — xác nhận bằng `get` trước khi `set`.

### Quy tắc quan trọng

- Merge chỉ trên file trong `assets/` — không tạo bố cục mới, không `officecli new --prompt`.
- Số văn bản (`___/QĐ-BV`, `___/HĐKT/...`) để `___` — Văn thư cấp số.
- Không bịa chữ ký/số QĐ/tên nhà thầu/MST/số tài khoản nếu người dùng chưa cung cấp.
- Sau merge: grep kiểm tra không còn `{{...}}` sót; nếu còn → trường đó chưa có trong dữ liệu, hỏi lại.
- Không giao file nếu `officecli validate` hoặc `officecli view <file> issues --type content` còn lỗi chưa xử lý.

## Sau khi xong

1. Trả lời người dùng: đã tạo file gì, còn thiếu trường/dòng phụ lục gì.
2. Đính kèm `.docx`.
