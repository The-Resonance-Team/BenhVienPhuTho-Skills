---
name: phong-tccb
description: "Skill Phòng Tổ chức cán bộ (TCCB) (BVĐK tỉnh Phú Thọ): xử lý chế độ nghỉ hưu (quyết định, thông báo, công văn đề nghị BHXH giải quyết, báo cáo Sở Y tế nghỉ hưu lãnh đạo, văn bản đề nghị BHXH mẫu chuẩn), xác nhận thời gian công tác phục vụ chứng chỉ hành nghề, thông báo BHXH thay đổi nhân lực bệnh viện. Dùng ngay khi user nhắc TCCB, Tổ chức cán bộ, nghỉ hưu, sổ BHXH, chứng chỉ hành nghề, xác nhận công tác, thay đổi nhân lực bệnh viện, hoặc soạn giấy tờ nhân sự; cũng xử lý báo cáo/kế hoạch/quy chế/quyết định nhân sự khác (bổ nhiệm, tuyển dụng, khen thưởng, kỷ luật, quy hoạch cán bộ) chưa có mẫu thật bằng thể thức hành chính chuẩn."
---

# Phòng Tổ chức cán bộ — officecli templates

## Tổng quan

Skill theo phòng **TCCB**, phòng nắm **dữ liệu cá nhân của viên chức/người lao động** (họ tên, ngày sinh, CCCD, sổ BHXH, tài khoản lương, nơi cư trú) — mức nhạy cảm cao hơn mọi skill khác trong repo này, chịu Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân. Mọi nhánh bên dưới đọc **Cổng bắt buộc** trước khi soạn bất kỳ giấy tờ nào.

7 runtime template `.docx` trong `assets/`, phủ 2 quy trình có mẫu thật:

1. **Xử lý chế độ nghỉ hưu** (5 template): QĐ nghỉ hưu → Thông báo nghỉ hưu → Công văn đề nghị BHXH giải quyết chế độ hưu trí → (nếu là lãnh đạo) Báo cáo Sở Y tế → Văn bản đề nghị theo mẫu chuẩn BHXH.
2. **Xác nhận & thông báo nhân sự** (2 template): Giấy xác nhận thời gian công tác (phục vụ hồ sơ chứng chỉ hành nghề), Công văn thông báo BHXH thay đổi nhân lực bệnh viện.

Các mảng khác của TCCB (Báo cáo, Kế hoạch, Quy chế, Quyết định nhân sự khác như bổ nhiệm/tuyển dụng/khen thưởng/kỷ luật/quy hoạch cán bộ) **chưa có mẫu thật trong `assets/`** — xem mục "Nhánh chưa có mẫu" bên dưới, không bịa layout.

**Trước khi merge:** đảm bảo đã chạy skill **`setup`** (kiểm tra `officecli`) và đọc `../officecli/references/output-safety.md`.

## Nguồn gốc template — đọc trước khi thêm template mới

7 template này chuyển đổi từ **hồ sơ TCCB thật** của 3 vụ việc nghỉ hưu và 2 vụ việc xác nhận/thông báo nhân sự đã hoàn tất, không phải mẫu trống. Quy trình sanitize gồm 2 lớp:

1. **Tự động**: `node scripts/build-runtime-assets.js --source-root skills --skills phong-tccb` — quét mọi `<w:t>` trong `word/*.xml`, thay số (4–18 chữ số, ngày `DD/MM/YYYY`, số điện thoại, số tiền) bằng `{{SO_LIEU}}`/`{{NGAY_THANG}}`/`{{DIEN_THOAI}}`/`{{GIA_TRI}}`, và các cặp nhãn:giá trị nhận diện được (`mã số thuế`, `số tài khoản`, `họ tên`, `giám đốc`, `kế toán trưởng`...) bằng token tương ứng. File nguồn (`assets/_seed/*.docx`) không commit — bị `.gitignore` chặn ở `skills/**/assets/_seed/`.
2. **Thủ công** (bắt buộc sau bước 1 — regex tự động không bắt được): họ tên không đứng sau nhãn (`Ông:`/`Bà:` + tên), địa chỉ/nơi cư trú/nơi sinh không đứng sau nhãn `địa chỉ:`, tên ngân hàng + chi nhánh, chữ ký Giám đốc/Phó Giám đốc nằm ở đoạn/ô bảng riêng biệt (không có nhãn "Giám đốc:" đứng trước) — quét bằng `officecli view <file> text` **và** `officecli get <file> "/body/tbl[N]" --depth 3` (bảng đầu trang/chữ ký/danh sách **không xuất hiện trong `view text`**, chỉ `get` mới thấy nội dung ô), rồi thay bằng `officecli set <file> / --find "<chuỗi thật>" --replace "{{KEY}}"`. Đã xác minh không còn tên riêng, số CCCD/BHXH/tài khoản, địa chỉ hay chữ ký thật trong cả 7 file (kể cả trong bảng).
3. **Bảng danh sách nhiều người** (`cv-thongbao-bhxh-thay-doi-nhan-luc.docx`): hồ sơ gốc có 10 dòng nhân sự thật — đã cắt còn 1 dòng mẫu (header + 1 dòng placeholder), nhân dòng theo `officecli add --from` khi dùng thật.

Danh mục field đầy đủ theo từng template: `references/tccb-truong-mau.md`. Trạng thái convert + giới hạn kỹ thuật: `assets/README.md`.

## Cổng bắt buộc (áp dụng mọi template — không oneshot)

- **Không bịa dữ liệu cá nhân**: `{{HO_TEN}}`, CCCD, số sổ BHXH, số tài khoản, số điện thoại, ngày sinh, nơi sinh, nơi cư trú, địa chỉ liên hệ nếu người dùng chưa cung cấp. Đây là dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP — sai lệch có thể ảnh hưởng quyền lợi BHXH thật của viên chức.
- **`{{GIAM_DOC_KY}}`/`{{PHO_GIAM_DOC_KY}}` luôn hỏi**, không hardcode ai đang đương nhiệm — chức danh đổi người theo nhiệm kỳ.
- **Phần "Căn cứ" (trích dẫn Luật/Nghị định/Quyết định) và dòng ngày ký đầu trang KHÔNG dùng hiểu biết chung hay hồ sơ mẫu cũ để đoán số hiệu/ngày tháng** — auto-sanitize gộp toàn bộ số trong khối Căn cứ thành chuỗi `{{SO_LIEU}}`/`{{NGAY_THANG}}` lặp lại, không phân biệt được qua `merge`; đồng thời chính hồ sơ nguồn đã phát hiện có mẫu trích dẫn **luật cũ đã hết hiệu lực** (một số mẫu TB-BV còn ghi "Luật Bảo hiểm xã hội ngày 20/11/2014" thay vì Luật số 41/2024/QH15 hiện hành). Luôn hỏi người dùng/Văn thư/quy định pháp luật hiện hành trước khi điền — xem "Phần Căn cứ pháp lý" ở mục Sinh file.
- **Không đưa dữ liệu cá nhân viên chức ra ngoài kho được duyệt**: không dán vào Google Forms/Sheets, AppSheet, cloud, API/agent bên ngoài. Không lưu giá trị thật vào bất kỳ file sẽ commit vào repo — chỉ dùng trong phiên làm việc/`fields.json` tạm.
- Merge khi còn trường bắt buộc chưa có giá trị thật — không tự chế số liệu để lấp chỗ trống.

## Tham chiếu nhanh — 7 template

### 1. Xử lý chế độ nghỉ hưu

| Nhiệm vụ | Template |
|---|---|
| QĐ nghỉ hưu để hưởng chế độ BHXH (Giám đốc BV ký) | `assets/qd-nghi-huu.docx` |
| Thông báo nghỉ hưu (gửi viên chức + BHXH) | `assets/tb-nghi-huu.docx` |
| Công văn đề nghị BHXH giải quyết chế độ hưu trí | `assets/cv-de-nghi-bhxh-giai-quyet-huu-tri.docx` |
| Báo cáo Sở Y tế về nghỉ hưu cán bộ lãnh đạo (Sở ra QĐ, không phải Giám đốc BV) | `assets/cv-bao-cao-soyte-nghi-huu-lanh-dao.docx` |
| Văn bản đề nghị theo mẫu chuẩn BHXH (người lao động tự kê khai, ký) | `assets/van-ban-de-nghi-che-do-bhxh.docx` |

### 2. Xác nhận & thông báo nhân sự

| Nhiệm vụ | Template |
|---|---|
| Giấy xác nhận thời gian công tác (hồ sơ chứng chỉ hành nghề) | `assets/giay-xac-nhan-thoi-gian-cong-tac.docx` |
| Công văn thông báo BHXH thay đổi nhân lực bệnh viện + danh sách kèm theo | `assets/cv-thongbao-bhxh-thay-doi-nhan-luc.docx` |

Trường đầy đủ theo từng template: `references/tccb-truong-mau.md`.

### Nhánh chưa có mẫu

Báo cáo (BC tổng kết, BC phân loại viên chức...), Kế hoạch (phòng chống tham nhũng, thi đua...), Quy chế nội bộ, Quyết định nhân sự khác (bổ nhiệm/miễn nhiệm/tuyển dụng/khen thưởng/kỷ luật/quy hoạch cán bộ) **chưa có mẫu thật trong `assets/`** — hồ sơ nguồn đa dạng, không phải một quy trình lặp lại như nghỉ hưu. Mặc định: trả lời bằng **Markdown có cấu trúc đúng thể thức văn bản hành chính** (quốc hiệu–tiêu ngữ, số/ký hiệu để `___` chờ Văn thư cấp, trích yếu, căn cứ pháp lý xin nguồn từ người dùng, nội dung, nơi nhận, thẩm quyền ký) để người dùng dán vào mẫu phòng đang dùng. Khi có mẫu `.docx` thật, seed vào `assets/_seed/` và chạy lại `build-runtime-assets.js` như mục "Nguồn gốc template". Không dùng `officecli new --prompt` hay tự dựng bố cục thay mẫu thật khi mẫu đã tồn tại.

## Thu thập trường qua hội thoại (grilling)

**Hỏi tất cả trường còn thiếu GỘP MỘT LẦN** — không hỏi từng câu.

1. **Trích xuất placeholder** từ runtime template bằng `officecli view <file> text --json` **và** quét bảng bằng `officecli get <file> "/body/tbl[N]" --depth 3` cho từng `tbl[N]` — nguồn duy nhất; nhiều token (chữ ký, danh sách) chỉ nằm trong bảng, không hiện ở `view text`.
2. **Trường suy luận được** từ ngữ cảnh hội thoại/workspace → ghi nhận, **xác nhận lại với người dùng** trước khi dùng.
3. **Gộp tất cả trường chưa có** → hỏi một lần, đánh số, mỗi câu 1–2 dòng, có gợi ý mặc định.
4. **Trường tự động** (`NGAY_KY`/`THANG_KY`/`NAM_KY` = hôm nay, `PHONG_BAN` = "Phòng Tổ chức cán bộ") → điền và thông báo.

Định dạng câu hỏi gộp:
```
Bạn cung cấp các thông tin sau:

1. [TRƯỜNG_1] — [mô tả] (gợi ý: ...)
2. [TRƯỜNG_2] — [mô tả] (gợi ý: ...)
...

Trả lời theo định dạng: 1=giá trị, 2=giá trị, ...
```
**Không hỏi từng câu.** Nếu người dùng trả lời từng câu → nhắc lại yêu cầu trả lời gộp.

Sau khi đủ trường → tóm tắt toàn bộ giá trị (che bớt CCCD/số tài khoản khi tóm tắt lại nếu không cần thiết hiện đầy đủ) → xin xác nhận → merge.

## Sinh file

### Trường định danh/thân bài (an toàn cho `officecli merge`)

Các token có tên ngữ nghĩa riêng (`HO_TEN`, `NOI_SINH`, `NOI_CU_TRU`, `DON_VI_CONG_TAC`, `CHUC_DANH_NGHE_NGHIEP`, `TRINH_DO_CHUYEN_MON`, `CHUC_VU`, `DIA_CHI`, `GIOI_TINH`, `NGAN_HANG_CHI_NHANH`, `SO_TAI_KHOAN`, `NOI_KCB_BAN_DAU`, `PHAM_VI_HANH_NGHE`, `TINH_TRANG_NHAN_SU`, `GIAM_DOC_KY`, `PHO_GIAM_DOC_KY`) xuất hiện với **một giá trị thật duy nhất lặp lại** trong cùng một file — an toàn để `merge`:

```bash
officecli merge assets/qd-nghi-huu.docx out.docx --data /tmp/fields.json
officecli validate out.docx
officecli view out.docx issues --type content --limit 100
```

Tạo `fields.json` bằng file tool an toàn trong thư mục tạm, quyền hạn chế; không in nội dung và xoá file sau khi kiểm tra.

### Phần Căn cứ pháp lý và ngày ký đầu trang — KHÔNG dùng `merge`

`{{SO_LIEU}}`/`{{NGAY_THANG}}` xuất hiện **nhiều lần với giá trị KHÁC NHAU** trong cùng file (số/ngày của từng Luật, Nghị định, Quyết định được trích dẫn, cộng dòng ngày ký "Phú Thọ, ngày ... tháng ... năm ..."). `merge` thay theo khoá là thay **tất cả** occurrence cùng một giá trị — sai. Xử lý từng đoạn riêng:

```bash
officecli view out.docx text --json                              # liệt kê path từng đoạn "Căn cứ ..."
officecli get out.docx "/body/p[15]"                              # xem nguyên văn đoạn cần sửa
officecli set out.docx "/body/p[15]" --prop text="Căn cứ Luật Bảo hiểm xã hội số 41/2024/QH15 ngày 29/06/2024;"
```

Xác nhận số hiệu/ngày với người dùng hoặc quy định pháp luật hiện hành trước khi điền — không chép lại số hiệu từ hồ sơ mẫu cũ (đã phát hiện mẫu nguồn trích luật hết hiệu lực, xem Cổng bắt buộc).

### Bảng danh sách nhiều dòng — `cv-thongbao-bhxh-thay-doi-nhan-luc.docx`

Bảng "DANH SÁCH THAY ĐỔI NHÂN LỰC" còn 1 dòng mẫu (`tr[2]`). Nhân dòng theo số người thật của đợt thông báo:

```bash
officecli add cv-thongbao-bhxh-thay-doi-nhan-luc.docx "/body/tbl[4]" --type row --from "/body/tbl[4]/tr[2]" --after "/body/tbl[4]/tr[2]"
officecli set cv-thongbao-bhxh-thay-doi-nhan-luc.docx "/body/tbl[4]/tr[3]/tc[2]" --prop text="Tên người thứ 2"
```

Cập nhật lại dòng "Ấn định danh sách có: {{SO_LIEU}} người." cho khớp số dòng thật sau khi nhân bản.

### Quy tắc quan trọng

- Merge/set chỉ trên file trong `assets/` — không tạo bố cục mới, không `officecli new --prompt`.
- Số văn bản (`___/QĐ-BV`, `___/TB-BV`, `___/BV-TCCB`) để `___` — Văn thư cấp số.
- Không bịa chữ ký/số QĐ/dữ liệu cá nhân nếu người dùng chưa cung cấp.
- Sau khi điền: đọc `view ... text --json` **và** quét lại bảng bằng `get "/body/tbl[N]" --depth 3`, kiểm tra không còn `{{...}}` ở cả đoạn văn lẫn ô bảng; nếu có lỗi validate/content thì dừng, không giao file.

## Quản trị dữ liệu

- Dữ liệu cá nhân viên chức (họ tên, CCCD, sổ BHXH, tài khoản, ngày sinh, địa chỉ) chỉ dùng trong phiên làm việc/`fields.json` tạm — không lưu vào file sẽ commit, không dán vào Google Forms/Sheets, AppSheet, cloud storage, web API hay agent bên ngoài.
- Tách dữ liệu nguồn (hồ sơ viên chức) khỏi bản nháp; chỉ giao bản dự thảo tối thiểu cần thiết.
- Xác nhận người ký và người phê duyệt trước khi xuất bản; văn bản nghỉ hưu/xác nhận công tác đều là dự thảo chờ Giám đốc/Phó Giám đốc ký chính thức.

## Sau khi xong

1. Trả lời người dùng: đã tạo file gì, còn thiếu trường/dòng danh sách gì, phần Căn cứ đã xác nhận số hiệu chưa.
2. Đính kèm `.docx`.
