---
name: phong-ktda
description: "Skill Phòng Kế toán dự án (BVĐK tỉnh Phú Thọ): chỉ định thầu DỊCH VỤ 50–dưới 500 triệu (đơn đề xuất, thư mời báo giá dịch vụ, dự toán, tờ trình/QĐ duyệt dự toán & KHLCNT, hợp đồng kinh tế, biên bản nghiệm thu, thanh lý hợp đồng, giấy đề nghị thanh toán). Dùng ngay khi user nhắc KTDA, kế toán dự án, chỉ định thầu dịch vụ."
---

# Phòng Kế toán dự án — officecli templates

## Tổng quan

Skill theo phòng **KTDA**, phủ chu trình **chỉ định thầu DỊCH VỤ 50–dưới 500 triệu**: đơn đề xuất → thư mời báo giá dịch vụ → dự toán → tờ trình + QĐ duyệt dự toán & KHLCNT → thư mời + dự thảo + biên bản hoàn thiện hợp đồng → tờ trình + QĐ duyệt KQLCNT → hợp đồng kinh tế → nghiệm thu công việc + nghiệm thu khối lượng → thanh lý → đề nghị thanh toán. 15 template `.docx` trong `assets/`, sinh file bằng **`officecli merge`**.

**Trước khi merge:** đảm bảo đã chạy skill **`setup`** (kiểm tra/cài `officecli`).

## Nguồn gốc template

Chuyển đổi từ **mẫu chỉ định thầu DỊCH VỤ chính thức của bệnh viện** (mẫu trống, không phải một vụ việc đã điền thật). Mẫu gốc có sẵn thông tin định danh/tài chính của Bệnh viện (MST, 2 số tài khoản Kho bạc, tài khoản Vietcombank, điện thoại) và tên người đang giữ chức Giám đốc/Kế toán trưởng in cứng trong khối căn cứ/chữ ký — đã thay bằng `{{KEY}}`, theo đúng nguyên tắc "luôn hỏi, không hardcode" đã dùng ở `phong-cntt` (dữ liệu tài chính/định danh đơn vị và người giữ chức vụ có thể đổi). Địa chỉ/pháp lý công khai giữ nguyên. Trường đầy đủ theo từng template: `references/ktda-truong-mau.md`.

## Cổng bắt buộc (áp dụng mọi template)

- **Không bịa** `TEN_NHA_THAU`, `MA_SO_THUE_NCC`, `TK_NHA_THAU`, số QĐ/HĐ/tờ trình nếu người dùng chưa cung cấp.
- **Nhóm dữ liệu định danh/tài chính của Bệnh viện luôn hỏi, không bao giờ hardcode**: `MA_SO_THUE_BV`, `TK_KHO_BAC_1`, `TK_KHO_BAC_2`, `TK_VIETCOMBANK`, `DIENTHOAI_BV`, `MA_DON_VI_SDNS`. Không lưu các giá trị này vào bất kỳ file sẽ commit vào repo — chỉ dùng trong phiên làm việc/`fields.json` tạm.
- **`GIAM_DOC_KY` và `KE_TOAN_TRUONG_KY` luôn hỏi**, không hardcode tên người đang đương nhiệm — chức danh có thể đổi người theo nhiệm kỳ.
- Merge khi còn trường bắt buộc chưa có giá trị thật — không tự chế số liệu để lấp chỗ trống.

## Tham chiếu nhanh — 15 template

| Nhiệm vụ | Template |
|---|---|
| Đơn đề xuất | `assets/don-de-xuat-ktda.docx` |
| Thư mời báo giá dịch vụ | `assets/thu-moi-bao-gia-dich-vu.docx` |
| Dự toán | `assets/du-toan-ktda.docx` |
| Tờ trình duyệt dự toán & KHLCNT | `assets/to-trinh-du-toan-khlcnt.docx` |
| QĐ duyệt dự toán & KHLCNT | `assets/qd-phe-duyet-du-toan-khlcnt.docx` |
| Thư mời hoàn thiện hợp đồng | `assets/thu-moi-hoan-thien-hop-dong.docx` |
| Dự thảo hợp đồng | `assets/du-thao-hop-dong.docx` |
| Biên bản hoàn thiện hợp đồng | `assets/bien-ban-hoan-thien-hop-dong.docx` |
| Tờ trình duyệt KQLCNT | `assets/to-trinh-kqlcnt.docx` |
| QĐ duyệt KQLCNT | `assets/qd-phe-duyet-kqlcnt.docx` |
| Hợp đồng kinh tế | `assets/hop-dong.docx` |
| Biên bản nghiệm thu công việc | `assets/bbnt-cong-viec.docx` |
| Biên bản nghiệm thu khối lượng hoàn thành | `assets/bbnt-khoi-luong-hoan-thanh.docx` |
| Biên bản thanh lý hợp đồng | `assets/bien-ban-thanh-ly-hop-dong.docx` |
| Giấy đề nghị thanh toán | `assets/giay-de-nghi-thanh-toan.docx` |

Trường đầy đủ theo từng template: `references/ktda-truong-mau.md`. `Bảng kê chứng từ thanh toán.xls` gốc chưa convert — xem cuối file tham chiếu.

## Thu thập trường qua hội thoại (grilling)

**Hỏi tất cả trường còn thiếu GỘP MỘT LẦN** — không hỏi từng câu.

1. **Trích xuất placeholder** từ template bằng grep `{{KEY}}` — nguồn duy nhất:
   ```bash
   unzip -p assets/<template>.docx word/document.xml | grep -o '{{[^}]*}}' | sort -u
   ```
2. **Trường suy luận được** từ ngữ cảnh hội thoại/workspace → ghi nhận, **xác nhận lại với người dùng** trước khi dùng.
3. **Gộp tất cả trường chưa có** → hỏi một lần, đánh số, mỗi câu 1–2 dòng, có gợi ý mặc định.
4. **Trường tự động** (`NGAY_KY`/`THANG_KY`/`NAM_KY` = hôm nay, `PHONG_BAN` = "Kế toán dự án", `CHUC_DANH_KY` = "Trưởng phòng Kế toán dự án") → điền và thông báo.

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

```bash
cat > /tmp/fields.json <<'JSON'
{"TEN_GOI_THAU": "...", "TEN_NHA_THAU": "...", "DU_TOAN": "...", "DU_TOAN_BANG_CHU": "...",
 "PHONG_BAN": "Kế toán dự án", "HO_TEN_KY": "...", "NGAY_KY": "20", "THANG_KY": "07", "NAM_KY": "2026", ...}
JSON

officecli merge assets/to-trinh-du-toan-khlcnt.docx out.docx --data /tmp/fields.json

unzip -p out.docx word/document.xml | grep -o '{{[^}]*}}' && echo "CÒN SÓT PLACEHOLDER — dừng lại"
```

### Bảng phụ lục "Danh sách dịch vụ" (dòng biến đổi) — `officecli set`

Hầu hết template có bảng danh sách dịch vụ — `officecli merge` chỉ thay khoá vô hướng, không tự nhân/xoá dòng bảng. Điền từng ô sau khi merge phần thân:

```bash
officecli get out.docx "/body/tbl[N]/tr[R]"                      # xem đường dẫn/nội dung hiện tại — luôn get trước
officecli set out.docx "/body/tbl[N]/tr[R]/tc[C]" --prop text="Tên dịch vụ"
```

Chỉ số N/R/C khác nhau theo từng template — xác nhận bằng `get` trước khi `set`.

### Quy tắc quan trọng

- Merge chỉ trên file trong `assets/` — không tạo bố cục mới, không `officecli new --prompt`.
- Số văn bản (`___/QĐ-BV`, `01/TTr-___`, `02/TTr-___`, số hợp đồng) để `___` — Văn thư cấp số.
- Không bịa chữ ký/số QĐ/tên nhà thầu/MST/số tài khoản nếu người dùng chưa cung cấp.
- `bbnt-khoi-luong-hoan-thanh.docx` và `bien-ban-thanh-ly-hop-dong.docx` có nhiều dòng giá trị khác nhau (tổng giá trị HĐ, giá trị nghiệm thu, giá trị tạm ứng, giá trị còn lại) — chỉ dòng đầu có `{{GIA_TRI_HD}}`, các dòng còn lại hỏi riêng nếu vụ việc có tạm ứng/khấu trừ khác 0.
- Sau merge: grep kiểm tra không còn `{{...}}` sót; nếu còn → trường đó chưa có trong dữ liệu, hỏi lại.

## Sau khi xong

1. Trả lời người dùng: đã tạo file gì, còn thiếu trường/dòng phụ lục gì.
2. Đính kèm `.docx`.
