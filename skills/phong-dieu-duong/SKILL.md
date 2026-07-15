---
name: phong-dieu-duong
description: "Skill Phòng Điều dưỡng (BVĐK tỉnh Phú Thọ): kế hoạch/QĐ tổ chức thi tay nghề ĐD-KTV, thông báo sinh hoạt khoa học, công văn điều dưỡng, phân công ban chỉ đạo/ban đề thi/giám khảo. Dùng ngay khi user nhắc điều dưỡng, thi tay nghề, KTV, Hội đồng người bệnh, SHKH điều dưỡng, hoặc soạn giấy tờ Phòng Điều dưỡng."
---

# Phòng Điều dưỡng — officecli templates

## Tổng quan

Skill theo phòng **Điều dưỡng**. Giấy tờ chính thức = `.docx` sinh bằng **`officecli merge`** trên template có sẵn trong `assets/` (mỗi template = một file `.docx` duy nhất, gắn `{{KEY}}`).

**Trước khi merge:** đảm bảo đã chạy skill **`setup`** (kiểm tra/cài `officecli`).

Nguồn: gói `dieu-duong` dưới `{TAI_LIEU_BV}` — xem `references/dieu-duong-index.md`.

## Điều kiện tiên quyết / setup

Giống `phong-hcqt`: chỉ cần `officecli` trên PATH (skill `setup`). Không còn Python/giải nén/nén/xác thực.
**UX:** trả lời người dùng trước khi gửi file.

## Thu thập trường qua hội thoại (grilling)

**Hỏi tất cả trường còn thiếu GỘP MỘT LẦN** — không hỏi từng câu. Trình tự:

1. **Trích xuất placeholder** từ template bằng grep `{{KEY}}` — đây là nguồn duy nhất, không dựa vào bảng cứng.
2. **Trường suy luận được** từ ngữ cảnh (lời nhắn trước đó, dữ liệu workspace) → ghi nhận, **xác nhận lại với người dùng** trước khi dùng.
3. **Gộp tất cả trường chưa có** → hỏi một lần với danh sách đánh số, mỗi câu 1–2 dòng, có gợi ý mặc định.
4. **Trường tự động** (năm nay) → điền và thông báo.

| Khóa                   | Ý nghĩa                                  | Ghi chú |
| ---------------------- | ---------------------------------------- | ------- |
| `NAM`                  | Năm                                      | tự động: năm nay |
| `DOI_TUONG`            | Đối tượng thi (ĐD/KTV/đồng thời)        | hỏi     |
| `MUC_DICH`             | Mục đích thi                            | hỏi     |
| `THOI_GIAN_DIA_DIEM`   | Thời gian & địa điểm thi                | hỏi     |
| `BAN_CHI_DAO`          | Ban chỉ đạo (nếu có QĐ)                 | hỏi     |
| `CAC_BAN`              | Các ban (đề thi, giám khảo…)            | hỏi     |
| `KINH_PHI`             | Kinh phí                                 | hỏi     |
| `HO_TEN_KY`            | Họ tên người ký                          | hỏi     |

## Tham chiếu nhanh

### Đã convert sang `{{KEY}}` + `officecli merge` (14)

| Nhiệm vụ                      | Template                            |
| ----------------------------- | ----------------------------------- |
| Kế hoạch thi tay nghề ĐD/KTV | `assets/ke-hoach-thi-tay-nghe.docx` |
| Nghị quyết (ND30)             | `assets/nd30-mau-1.1-nghi-quyet.docx` |
| Quyết định trực tiếp (ND30)    | `assets/nd30-mau-1.2-quyet-dinh-truc-tiep.docx` |
| Quyết định gián tiếp (ND30)   | `assets/nd30-mau-1.3-quyet-dinh-gian-tiep.docx` |
| Văn bản có tên loại (ND30)    | `assets/nd30-mau-1.4-van-ban-co-ten-loai.docx` |
| Công văn (ND30)               | `assets/nd30-mau-1.5-cong-van.docx` |
| Công điện (ND30)               | `assets/nd30-mau-1.6-cong-dien.docx` |
| Giấy mời (ND30)                | `assets/nd30-mau-1.7-giay-moi.docx` |
| Giấy giới thiệu (ND30)         | `assets/nd30-mau-1.8-giay-gioi-thieu.docx` |
| Biên bản (ND30)                | `assets/nd30-mau-1.9-bien-ban.docx` |
| Giấy nghỉ phép (ND30)          | `assets/nd30-mau-1.10-giay-nghi-phep.docx` |
| Quy trình kỹ thuật             | `assets/mau-quy-trinh-ky-thuat.docx` |
| Quy trình chăm sóc             | `assets/mau-quy-trinh-cham-soc.docx` |
| Truyền thông GDSK              | `assets/mau-truyen-thong-gdsk.docx`  |

#### Biểu mẫu Excel (1)

| Nhiệm vụ                      | Template                            |
| ----------------------------- | ----------------------------------- |
| Điểm kiểm tra tay nghề ĐD/KTV | `assets/diem-kiem-tra-tay-nghe.xlsx` |

| Việc khác                           | File                                            |
| ----------------------------------- | ----------------------------------------------- |
| Đọc nhóm tài liệu có trong gói ĐD  | `references/dieu-duong-index.md`                |
| Các vị trí điền                     | `references/placeholders.md`                    |
| Sửa `.docx` người dùng gửi         | `officecli set <file> <path> --prop text=...`   |

## Cổng bắt buộc (bắt buộc — không oneshot)

**Cấm merge** cho đến khi đã thu thập đủ trường tối thiểu qua hội thoại.

**Cấm** `officecli new --prompt`, Markdown → Word, hay sinh bố cục ngoài `assets/`.

Pipeline duy nhất: `officecli merge assets/<slug>.docx <output>.docx --data <fields>.json` → grep kiểm tra hết `{{...}}` → trả người dùng.

Trường tối thiểu KH thi tay nghề: `{{NAM}}`, `{{DOI_TUONG}}`, `{{THOI_GIAN_DIA_DIEM}}`; `{{BAN_CHI_DAO}}` để trống nếu chưa có QĐ.

## Giao thức hỏi đáp

### Bước 1: Xác định loại giấy tờ

Câu mở đầu:

> "Bạn cần soạn giấy tờ Điều dưỡng loại nào?"
> _Gợi ý mặc định: kế hoạch thi tay nghề. Khác: thông báo SHKH / công văn / danh sách ban chỉ đạo._

### Bước 2: Trích xuất placeholder từ template

Lấy tất cả `{{KEY}}` từ template đã chọn — đây là nguồn duy nhất, **không dựa vào bảng cứng**:

```bash
unzip -p assets/<template>.docx word/document.xml | grep -o '{{[^}]*}}' | sort -u
```

### Bước 3: Lọc trường cần hỏi

1. Trường đã có trong ngữ hội thoại → ghi nhận.
2. Trường tự động (năm nay) → điền sẵn.
3. **Còn lại → hỏi gộp một lần** — đánh số, mỗi trường 1 dòng, kèm gợi ý.

### Bước 4: Hỏi gộp một lần (BẮT BUỘC)

Định dạng yêu cầu:

```
Bạn cung cấp các thông tin sau:

1. [TRƯỜNG_1] — [mô tả] (gợi ý: ...)
2. [TRƯỜNG_2] — [mô tả] (gợi ý: ...)
3. [TRƯỜNG_3] — [mô tả] (gợi ý: ...)
...

Trả lời theo định dạng: 1=giá trị, 2=giá trị, ...
```

**Không hỏi từng câu.** Nếu người dùng trả lời từng câu → nhắc lại: "Vui lòng trả lời tất cả các trường còn thiếu trong một phản hồi."

### Bước 5: Xác nhận và merge

Sau khi đủ trường → tóm tắt toàn bộ giá trị → xin xác nhận → merge.

## Sinh file

```bash
cat > /tmp/fields.json <<'JSON'
{"NAM": "2026", "DOI_TUONG": "...", "MUC_DICH": "...", "THOI_GIAN_DIA_DIEM": "...", "BAN_CHI_DAO": "...", "CAC_BAN": "...", "KINH_PHI": "...", "HO_TEN_KY": "..."}
JSON

officecli merge assets/ke-hoach-thi-tay-nghe.docx out.docx --data /tmp/fields.json

unzip -p out.docx word/document.xml | grep -o '{{[^}]*}}' && echo "CÒN SÓT PLACEHOLDER — dừng lại"
```

### Quy tắc quan trọng

- Merge chỉ trên file trong `assets/` — không gen bố cục ngoài template.
- Không dùng Markdown / `officecli new --prompt` làm bố cục.
- Số VB `___/KH-ĐD` để Văn thư cấp.
- Không bịa tên Ban chỉ đạo / điểm thi nếu người dùng chưa cung cấp.
- Sau merge: grep kiểm tra không còn `{{...}}` sót.

## Sau khi xong

1. Trả lời người dùng (file gì, thiếu trường gì).
2. Đính kèm `.docx`.
