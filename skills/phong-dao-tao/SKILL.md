---
name: phong-dao-tao
description: "Skill Phòng Đào tạo / Trung tâm Đào tạo và Chỉ đạo tuyến (TT ĐT&CĐT, BVĐK tỉnh Phú Thọ): xác nhận thời gian thực hành khám bệnh chữa bệnh theo NĐ 96/2023 (hợp đồng thực hành, QĐ phân công người hướng dẫn, giấy xác nhận hoàn thành, báo cáo Sở Y tế), chuyển giao kỹ thuật tuyến dưới (phiếu khảo sát thực trạng, đề cương CGKT), đào tạo thực hành cho sinh viên (hợp đồng, QĐ tiếp nhận, bản cam kết), đào tạo kỹ thuật chuyên môn cho tuyến dưới (mở lớp, phân công giảng viên, cấp chứng chỉ), cử cán bộ đi học sau đại học, cử cán bộ tham dự chương trình/hội nghị/hội thảo tuyến trên (kể cả khóa AI Citizen), trực tuyến điều dưỡng/bác sĩ Việt Đức. Dùng ngay khi user nhắc Đào tạo, ĐT&CĐT, chỉ đạo tuyến, xác nhận thời gian thực hành, chuyển giao kỹ thuật, thực hành sinh viên, cử cán bộ đi học/đào tạo/hội nghị/hội thảo, hoặc soạn giấy tờ Phòng Đào tạo."
---

# Phòng Đào tạo — officecli templates

## Tổng quan

Skill theo phòng **Đào tạo**, thuộc **Trung tâm Đào tạo và Chỉ đạo tuyến (TT ĐT&CĐT)** — ký hiệu văn bản `BV-TTĐT&CĐT` hoặc `___/QĐ-BV` (Giám đốc BV ký "theo đề nghị của Giám đốc TT ĐT&CĐT"). TT ĐT&CĐT còn có phòng ngang cấp **NCKH&HTQT** (xem skill `phong-nckh-htqt`) — hai phòng khác nhiệm vụ, không dùng nhầm skill.

9 nhóm nghiệp vụ (xem "Nhánh chưa có mẫu" cho quy trình đầy đủ từng nhóm). **6 template `.docx` thật** trong `assets/` — tất cả thuộc Nhóm 1 (1), Nhóm 4 (1) và Nhóm 6 "Đào tạo xác nhận thời gian thực hành" (4/6, nhóm nghiệp vụ lớn nhất và có căn cứ pháp lý rõ nhất: NĐ 96/2023/NĐ-CP). 7 nhóm còn lại **chưa có mẫu trống thật** — dùng nhánh Markdown, có đầy đủ chuỗi quy trình + căn cứ pháp lý bên dưới.

**Trước khi merge:** đảm bảo đã chạy skill **`setup`** (kiểm tra `officecli`) và đọc `../officecli/references/output-safety.md`.

## Nguồn gốc template

Chi tiết nguồn, quy trình dựng (`textutil -convert docx` cho 4 file `.doc` cũ + `build-runtime-assets.js` + đặt tên field thủ công), và giới hạn kỹ thuật (khối Căn cứ pháp lý, phiếu khảo sát chỉ templatize khối định danh): `assets/README.md`. Danh mục field đầy đủ theo từng template: `references/dao-tao-truong-mau.md`. Văn bản pháp lý tham chiếu đầy đủ (số hiệu/ngày/áp dụng cho nhóm nào): `references/dao-tao-can-cu-phap-ly.md` — mỗi dòng "Căn cứ:" trong mục "Nhánh chưa có mẫu" bên dưới là bản rút gọn, tra cứu chi tiết ở file này trước khi trích dẫn.

## Cổng bắt buộc (áp dụng mọi nhánh — cả template thật lẫn Markdown)

Phòng Đào tạo là phòng **đầu tiên trong repo có cả 2 lớp dữ liệu nhạy cảm cùng lúc**: dữ liệu cá nhân người thực hành/học viên (như TCCB) VÀ dữ liệu hợp đồng/tài chính đối tác (như HCQT/KTDA) ở Nhóm 1 (Chuyển giao kỹ thuật) và Nhóm 4 (thực hành sinh viên).

- **Không bịa dữ liệu cá nhân**: `{{HO_TEN}}`, CCCD/hộ chiếu, ngày sinh, địa chỉ cư trú, văn bằng chuyên môn, số chứng chỉ hành nghề nếu người dùng chưa cung cấp.
- **Không bịa dữ liệu hợp đồng/tài chính đối tác** (Nhóm 1, 4): mã số thuế, số tài khoản, tên người đại diện của trường/TTYT tuyến dưới nếu chưa có trong hồ sơ thật.
- **`PHO_GIAM_DOC_KY`/`GIAM_DOC_KY` luôn hỏi**, không hardcode ai đang đương nhiệm.
- **`DIENTHOAI_BV` luôn hỏi**, không hardcode dù giá trị ít đổi (đồng nhất với `phong-cntt`/`phong-ktda`/`phong-vattu`).
- **Căn cứ pháp lý dùng số hiệu hiện hành**: nguồn hồ sơ TT ĐT&CĐT tự thân đã phát hiện có lệch số hiệu luật giữa các văn bản ký cách nhau vài tuần (xem `phong-nckh-htqt` — cùng trung tâm quản lý, cùng rủi ro). Với Nhóm 6 (NĐ 96/2023, Luật KCB 15/2023/QH15) và Nhóm 4 (NĐ 111/2017/NĐ-CP), xác nhận văn bản còn hiệu lực trước khi dùng số hiệu trong 4 template thật — không tự suy luận từ hồ sơ mẫu cũ.
- Merge khi còn trường bắt buộc chưa có giá trị thật — không tự chế số liệu để lấp chỗ trống.

## Tham chiếu nhanh — 6 template

| Nhiệm vụ | Nhóm | Template |
|---|---|---|
| Phiếu khảo sát thực trạng trước CGKT | 1. Chuyển giao kỹ thuật | `assets/phieu-khao-sat-thuc-trang-tuyen-duoi.docx` |
| Bản cam kết nội quy (sinh viên thực tập) | 4. Thực hành sinh viên | `assets/ban-cam-ket-thuc-tap-sinh-vien.docx` |
| Giấy xác nhận hoàn thành thời gian thực hành | 6. XN thời gian thực hành | `assets/giay-xac-nhan-thoi-gian-thuc-hanh.docx` |
| Hợp đồng thực hành KBCB (Mẫu 06 Phụ lục I NĐ96/2023) | 6. XN thời gian thực hành | `assets/hop-dong-thuc-hanh-kbcb.docx` |
| QĐ phân công người hướng dẫn thực hành | 6. XN thời gian thực hành | `assets/qd-phan-cong-nguoi-huong-dan-thuc-hanh.docx` |
| QĐ cử cán bộ đi thực hành tại đơn vị đối tác | 6. XN thời gian thực hành | `assets/qd-cu-can-bo-thuc-hanh-don-vi-doi-tac.docx` |

Trường đầy đủ: `references/dao-tao-truong-mau.md`. Chuỗi quy trình đầy đủ Nhóm 6: đơn xin thực hành → `qd-phan-cong-nguoi-huong-dan-thuc-hanh` → `hop-dong-thuc-hanh-kbcb` → [thực hành theo chương trình đào tạo chuyên khoa tương ứng — danh mục 10 đối tượng + 17 chuyên khoa đã có chương trình: `references/dao-tao-danh-muc-chuong-trinh.md`, không tự soạn nội dung chuyên môn chương trình] → `giay-xac-nhan-thoi-gian-thuc-hanh` → báo cáo quý gửi Sở Y tế (2 loại: đang thực hành / đã hoàn thành — chưa có mẫu, dùng Markdown).

## Nhánh chưa có mẫu

7/9 nhóm chưa có mẫu trống thật trong `assets/` — hồ sơ nguồn là **QĐ/CV đã ký hoàn chỉnh** (nội dung khác nhau mỗi lần, không phải form điền-chỗ-trống lặp lại). Trả lời bằng **Markdown có cấu trúc đúng thể thức văn bản hành chính** (quốc hiệu–tiêu ngữ, số/ký hiệu để `___` chờ Văn thư cấp, trích yếu, căn cứ pháp lý, nội dung, nơi nhận, thẩm quyền ký `BV-TTĐT&CĐT`/`QĐ-BV`) — không bịa layout. Khi có mẫu trống thật hoặc hồ sơ thật được duyệt để sanitize, seed vào `assets/_seed/` và chạy lại `build-runtime-assets.js` như mục "Nguồn gốc template".

### 2. Sau đại học

Chuỗi 6 bước tuyến tính: CV gửi Sở đi thi → QĐ của viện đi thi → (Sở duyệt) → CV gửi Sở đi học → QĐ đi học của viện → QĐ vừa làm vừa học (nếu viên chức xin, nhánh phụ) → QĐ trở về công tác (khi hoàn thành). Trường lặp lại mỗi QĐ: họ tên, ngày sinh, trình độ chuyên môn, đơn vị công tác, tên khóa/chuyên ngành/trường, thời gian. Điều 3 mỗi QĐ luôn liệt kê nơi nhận TCCB, TCKT, KHTH, TTĐT&CĐT.

Căn cứ: Luật Viên chức 2010; NĐ 115/2020/NĐ-CP + NĐ 85/2023/NĐ-CP; QĐ 466/QĐ-UBND (chức năng BV); Quy chế đào tạo bồi dưỡng viên chức BV (QĐ 3776/QĐ-BV); Quy chế chi tiêu nội bộ (QĐ 568/QĐ-BV).

### 3. Đào tạo kỹ thuật chuyên môn cho tuyến dưới

Chuỗi 6 bước: Kế hoạch mở lớp (`KH-BV`) → QĐ tiếp nhận mở lớp → QĐ tiếp nhận cá nhân đến đào tạo (nhánh song song, cá nhân xin học riêng lẻ) → QĐ phân công ban tổ chức lớp → QĐ phân công giảng viên → QĐ cấp chứng chỉ chứng nhận (kèm danh sách + chứng nhận in cho từng học viên).

Căn cứ: TT 22/2013/TT-BYT (đào tạo liên tục) + TT 26/2020/TT-BYT (sửa đổi); TT 32/2023/TT-BYT; QĐ 3262/BYT-K2ĐT (công nhận đủ điều kiện đào tạo liên tục); QĐ 466/QĐ-UBND.

### 1. Chuyển giao kỹ thuật (phần còn lại sau Phiếu khảo sát)

Chuỗi tiếp theo template đã có: Phiếu khảo sát thực trạng → **Đề cương CGKT** (mã biểu mẫu `ĐT&CĐT-QTQL-BM.02`, nội dung đặc thù theo từng kỹ thuật — bảng chỉ tiêu thực hành riêng, không phải key-value đơn giản, dùng Markdown theo thể thức đề cương) → **Hợp đồng CGKT** 2 bên (BV ↔ TTYT tuyến huyện, có MST + số tài khoản thật 2 đơn vị — Cổng bắt buộc áp dụng) → **QĐ cử cán bộ hỗ trợ tuyến dưới** (Đề án 1816).

Căn cứ: Luật KCB 15/2023/QH15; Luật Chuyển giao công nghệ 07/2017/QH14; NĐ 96/2023/NĐ-CP; TT 32/2023/TT-BYT; TT 43/2013/TT-BYT (phân tuyến kỹ thuật); QĐ 1816/QĐ-BYT (Đề án luân phiên tuyến trên–dưới); NĐ 60/2021 + NĐ 111/2025 (tự chủ tài chính).

### 4. Đào tạo thực hành cho sinh viên (phần còn lại sau Bản cam kết)

Chuỗi: **Hợp đồng nguyên tắc (HĐNT)** ký 1 lần dài hạn (BV ↔ trường ĐH) → mỗi đợt: **Hợp đồng chi tiết (HĐCT)** (viện dẫn ngược HĐNT) → **QĐ tiếp nhận sinh viên** (danh sách đính kèm riêng) → `ban-cam-ket-thuc-tap-sinh-vien` (sinh viên ký khi nhập) → Kế hoạch thực tập. HĐNT/HĐCT có MST + số tài khoản thật 2 bên — Cổng bắt buộc áp dụng.

Riêng nhóm "Bản công bố theo nghị định" (hồ sơ công bố cơ sở đủ điều kiện thực hành gửi Sở Y tế, kèm phụ lục khoa/phòng/giường bệnh/trang thiết bị — danh mục phụ lục: `references/dao-tao-danh-muc-chuong-trinh.md`) là hồ sơ hành chính định kỳ, không phải mẫu văn bản lặp lại theo từng đợt sinh viên — tham khảo cấu trúc phụ lục khi Sở yêu cầu cập nhật, không tự dựng lại từ đầu.

Căn cứ: Bộ luật Dân sự 91/2015/QH13; NĐ 111/2017/NĐ-CP (tổ chức đào tạo thực hành khối ngành sức khỏe); NĐ 96/2023/NĐ-CP; NĐ 60/2021 + NĐ 111/2025.

### 5. Trực tuyến điều dưỡng & 9. Trực tuyến Bác sĩ Việt Đức

Cùng một mô hình (đối tượng khác nhau — Điều dưỡng / Bác sĩ), 2 bước: CV mời khoa lâm sàng tham gia hội chẩn trực tuyến định kỳ với BV Việt Đức → QĐ cử cán bộ tham dự (danh sách đính kèm riêng theo từng buổi/tháng). Văn bản một-lần theo tháng, không phải form điền field cá nhân lặp lại — không cần mẫu trống riêng.

Căn cứ: NĐ 115/2020 + NĐ 85/2023 (viên chức); NĐ 106/2020/NĐ-CP (vị trí việc làm); NĐ 96/2023/NĐ-CP; TT 32/2023/TT-BYT; QĐ 466/QĐ-UBND.

### 7. QĐ cử cán bộ tham dự chương trình tuyến trên (kể cả khóa AI Citizen)

QĐ một-lần theo từng khóa do đơn vị tuyến trên/đối tác mời (căn cứ công văn mời cụ thể của bên tổ chức) + danh sách/phiếu đăng ký đính kèm riêng. Không cần mẫu trống — nội dung khóa học thay đổi mỗi lần.

Căn cứ: NĐ 115/2020 + NĐ 85/2023; QĐ 06/2025/QĐ-UBND (chức năng Sở YT); QĐ 3776/QĐ-BV; QĐ 568/QĐ-BV.

### 8. QĐ Hội nghị, hội thảo tại Bệnh viện

Chuỗi 3 bước cùng ngày/liền kề: QĐ Cử cán bộ tham dự → QĐ tiếp nhận cán bộ tham dự (dành cho cán bộ đơn vị khác đến BV dự) → QĐ cấp chứng nhận cho cán bộ tham dự (sau hội thảo, viện dẫn ngược 2 QĐ trên). Danh sách tham dự nằm ở phụ lục riêng, thân QĐ không chứa field cá nhân trực tiếp.

Căn cứ: Luật KCB 15/2023/QH15; NĐ 96/2023/NĐ-CP; QĐ 3262/BYT-K2ĐT; TT 32/2023/TT-BYT; QĐ 06/2025/QĐ-UBND.

## Thu thập trường qua hội thoại (grilling)

**Hỏi tất cả trường còn thiếu GỘP MỘT LẦN** — không hỏi từng câu.

1. **Trích xuất placeholder** từ runtime template bằng `officecli view <file>.docx text --json` — nguồn duy nhất.
2. **Trường suy luận được** từ ngữ cảnh hội thoại/workspace → ghi nhận, **xác nhận lại với người dùng** trước khi dùng.
3. **Gộp tất cả trường chưa có** → hỏi một lần, đánh số, mỗi câu 1–2 dòng, có gợi ý mặc định.
4. **Trường tự động** (`NGAY_KY`/`THANG_KY`/`NAM_KY` = hôm nay) → điền và thông báo.

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

### Trường thân bài (an toàn cho `officecli merge`)

```bash
officecli merge assets/giay-xac-nhan-thoi-gian-thuc-hanh.docx out.docx --data /tmp/fields.json
officecli validate out.docx
officecli view out.docx issues --type content --limit 100
officecli view out.docx text --json
```

Tạo `fields.json` bằng file tool an toàn trong thư mục tạm, quyền hạn chế; không in nội dung và xoá file sau khi kiểm tra.

### Bảng ký cam kết nhiều dòng — `ban-cam-ket-thuc-tap-sinh-vien.docx`

Còn 12 dòng mẫu (STT 1–12). Nhân/xoá dòng theo sĩ số lớp thật:

```bash
officecli add ban-cam-ket-thuc-tap-sinh-vien.docx "/body/tbl[3]" --type row --from "/body/tbl[3]/tr[2]" --after "/body/tbl[3]/tr[13]"
officecli set ban-cam-ket-thuc-tap-sinh-vien.docx "/body/tbl[3]/tr[2]/tc[2]" --prop text="Tên sinh viên"
```

Xác nhận đúng `tbl[N]`/`tr[R]` bằng `officecli get` trước khi sửa — đừng đoán theo ví dụ trên.

### Phiếu khảo sát thực trạng — điền trực tiếp, không `merge` toàn văn

Chỉ khối định danh đầu phiếu (4 field) dùng `merge`. Phần thân (mục A/B/C) điền bằng `officecli get`/`set` theo từng đoạn khi khảo sát thực tế — xem `assets/README.md` mục "Giới hạn kỹ thuật" về số thứ tự checkbox đã bị sanitize thành `{{SO_LIEU}}`.

### Quy tắc quan trọng

- Merge/set chỉ trên file trong `assets/` — không tạo bố cục mới, không `officecli new --prompt`.
- Số văn bản (`___/QĐ-BV`, `___/GXNTH`, `___/HĐTH-BVĐKTPT`) để `___`/để trống — Văn thư cấp số.
- Không bịa chữ ký/số QĐ/dữ liệu cá nhân/dữ liệu hợp đồng đối tác nếu người dùng chưa cung cấp.
- Sau khi điền: `view ... text --json` xác nhận không còn `{{...}}`; nếu có lỗi validate/content thì dừng, không giao file.

## Quản trị dữ liệu

- Dữ liệu cá nhân người thực hành/học viên/sinh viên (họ tên, CCCD, ngày sinh, địa chỉ, văn bằng, chứng chỉ hành nghề) và dữ liệu hợp đồng đối tác (MST, số tài khoản, người đại diện tuyến dưới) chỉ dùng trong phiên làm việc/`fields.json` tạm — không lưu vào file sẽ commit, không dán Google Forms/Sheets, AppSheet, cloud, API/agent bên ngoài.
- Tách dữ liệu nguồn khỏi bản nháp; chỉ giao bản dự thảo tối thiểu cần thiết.
- Xác nhận người ký/phê duyệt trước khi xuất bản — mọi văn bản là dự thảo chờ Phó Giám đốc/Giám đốc ký chính thức.

## Sau khi xong

1. Trả lời người dùng: đã tạo file gì, còn thiếu trường/dòng bảng gì, đã dùng nhánh template thật hay Markdown.
2. Đính kèm `.docx`.
