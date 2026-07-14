---
name: phong-hcqt
description: >
  Skill Phòng Hành chính quản trị (BVĐK tỉnh Phú Thọ): tờ trình/QĐ mua sắm & LCNT,
  chỉ định thầu 50–dưới 500 triệu, VPP/TSCĐ theo QT HCQT, điều xe, văn thư QT-02,
  dự trù vật tư, đánh giá NCC, phiếu điều động xe, phiếu VPP, bảng kê chứng từ.
  Dùng ngay khi user nhắc HCQT, hành chính quản trị, tờ trình dự toán, KHLCNT, KQLCNT,
  quyết định phê duyệt nhà thầu, hợp đồng hành chính, BBNT, yêu cầu báo giá, dự toán,
  điều xe, VPP, NCC, hoặc cần xuất .docx/.xlsx đúng thể thức từ template.
  Xuất file bằng `officecli merge` trên template có sẵn trong `assets/` —
  KHÔNG soạn Markdown rồi "xuất Word", KHÔNG `officecli new --prompt`.
  Không dùng cho chuyên môn Điều dưỡng (phong-dieu-duong).
---

# Phòng Hành chính quản trị — officecli templates

## Tổng quan

Skill theo phòng **HCQT**. Đầu ra giấy tờ hành chính là file `.docx` sinh bằng **`officecli merge`** trên template có sẵn trong `assets/` (mỗi template = một file `.docx` duy nhất, đã gắn `{{KEY}}` tại các trường cần điền).

**Trước khi merge:** đảm bảo đã chạy skill **`setup`** (kiểm tra/cài `officecli`).

Nguồn dữ liệu gốc: mã gói `thau-50-500`, `thau-duoi-50`, `hcqt-quy-trinh`, `phan-cong-hcqt` dưới `{TAI_LIEU_BV}` — xem [`../../DATA-MAP.md`](../../DATA-MAP.md). Không hardcode đường dẫn máy.

## Điều kiện tiên quyết / setup

Chỉ cần một binary: `officecli` (cài bằng skill `setup`, xem `officecli --version`). Không còn phụ thuộc Python/unpack/pack/validate hay LibreOffice cho bước sinh file.

## Thu thập trường qua hội thoại (grilling)

**Hỏi tất cả trường còn thiếu GỘP MỘT LẦN** — không hỏi từng câu. Trình tự:

1. **Trích xuất placeholder** từ template bằng grep `{{KEY}}` — đây là nguồn duy nhất, không dựa vào bảng cứng.
2. **Trường suy luận được** từ ngữ cảnh (lời nhắn trước đó, dữ liệu workspace) → ghi nhận, **xác nhận lại với người dùng** trước khi dùng.
3. **Gộp tất cả trường chưa có** → hỏi một lần với danh sách đánh số, mỗi câu 1–2 dòng, có gợi ý mặc định.
4. **Trường tự động** (ngày ký hôm nay, chức danh mặc định, tên phòng) → điền và thông báo.

### Bảng trường đầy đủ theo template

Mỗi template có tập placeholder riêng. Dưới đây là bảng tra cứu nhanh — `officecli merge` chỉ thay khóa nào có mặt, bỏ qua khóa thừa.

#### TỜ TRÌNH DUYỆT DỰ TOÁN & KHLCNT (`to-trinh-du-toan-khlcnt`)

| Placeholder     | Ý nghĩa                                 | Ghi chú                  |
|-----------------|-----------------------------------------|-------------------------|
| `TEN_GOI_THAU`  | Tên gói thầu / dự toán mua sắm          | hỏi                     |
| `DU_TOAN`       | Giá trị dự toán (số)                    | hỏi                     |
| `DU_TOAN_BANG_CHU` | Giá trị bằng chữ                     | tự chuyển đổi từ `DU_TOAN` |
| `THOI_GIAN`     | Thời gian thực hiện dự toán             | hỏi                     |
| `SO_LUONG_GOI_THAU` | Số lượng gói thầu chia ra           | hỏi                     |
| `QUY_LCNT`      | Quý LCNT                                | hỏi                     |
| `NAM_LCNT`      | Năm LCNT                                | hỏi                     |
| `THOI_GIAN_GOI_THAU` | Thời gian thực hiện gói thầu (ngày) | hỏi                     |
| `PHONG_BAN`     | Tên phòng đề xuất                       | tự động: HCQT           |
| `NGAY_KY`/`THANG_KY`/`NAM_KY` | Ngày ký văn bản            | tự động: hôm nay        |
| `HO_TEN_KY`     | Họ tên người ký                         | hỏi                     |
| `CHUC_DANH_KY`  | Chức danh người ký                      | tự động: Trưởng phòng   |

#### QĐ DUYỆT DỰ TOÁN & KHLCNT (`qd-phe-duyet-du-toan-khlcnt`)

| Placeholder     | Ý nghĩa           | Ghi chú |
|-----------------|-------------------|---------|
| `TEN_GOI_THAU`  | Tên gói thầu      | hỏi     |
| `DU_TOAN`       | Giá trị dự toán   | hỏi     |
| `DU_TOAN_BANG_CHU` | Giá trị bằng chữ | tự chuyển đổi |
| `THOI_GIAN`     | Thời gian thực hiện | hỏi   |
| `PHONG_BAN`     | Tên phòng         | tự động |
| `NGAY_KY`/`THANG_KY`/`NAM_KY` | Ngày ký | tự động |
| `HO_TEN_KY`     | Người ký          | hỏi     |
| `CHUC_DANH_KY`  | Chức danh ký      | tự động |

#### TỜ TRÌNH DUYỆT KQLCNT (`to-trinh-kqlcnt`)

| Placeholder     | Ý nghĩa              | Ghi chú |
|-----------------|----------------------|---------|
| `TEN_GOI_THAU`  | Tên gói thầu         | hỏi     |
| `TEN_NHA_THAU`  | Tên nhà thầu         | hỏi     |
| `DU_TOAN`       | Giá trị dự toán      | hỏi     |
| `THOI_GIAN_GOI_THAU` | Thời gian thực hiện gói thầu | hỏi |
| `QUY_LCNT`/`NAM_LCNT` | Quý/Năm LCNT    | hỏi     |
| `PHONG_BAN`     | Tên phòng            | tự động |
| `NGAY_KY`/`THANG_KY`/`NAM_KY` | Ngày ký | tự động |
| `HO_TEN_KY`     | Người ký             | hỏi     |
| `CHUC_DANH_KY`  | Chức danh ký         | tự động |

#### QĐ DUYỆT KQLCNT (`qd-phe-duyet-kqlcnt`)

| Placeholder     | Ý nghĩa              | Ghi chú |
|-----------------|----------------------|---------|
| `TEN_GOI_THAU`  | Tên gói thầu         | hỏi     |
| `TEN_NHA_THAU`  | Tên nhà thầu         | hỏi     |
| `MA_SO_THUE`    | Mã số thuế nhà thầu  | hỏi     |
| `DU_TOAN`       | Giá trị dự toán      | hỏi     |
| `THOI_GIAN_GOI_THAU` | Thời gian thực hiện gói thầu | hỏi |
| `THOI_GIAN_HOP_DONG` | Thời gian thực hiện hợp đồng | hỏi |
| `QUY_LCNT`/`NAM_LCNT` | Quý/Năm LCNT  | hỏi     |
| `PHONG_BAN`     | Tên phòng            | tự động |
| `NGAY_KY`/`THANG_KY`/`NAM_KY` | Ngày ký | tự động |

#### ĐƠN ĐỀ XUẤT (`don-de-xuat`)

| Placeholder       | Ý nghĩa         | Ghi chú |
|-------------------|-----------------|---------|
| `TEN_GOI_THAU`    | Tên gói thầu    | hỏi     |
| `NOI_DUNG_MUA_SAM`| Nội dung mua sắm| hỏi     |
| `HANG_HOA`        | Hạng hàng hóa   | hỏi     |
| `PHONG_DE_XUAT`   | Phòng đề xuất   | tự động |
| `PHONG`           | Phòng           | tự động |
| `TRUONG_PHONG`    | Trưởng phòng    | hỏi     |

#### YÊU CẦU BÁO GIÁ (`yeu-cau-bao-gia`)

| Placeholder  | Ý nghĩa          | Ghi chú |
|--------------|------------------|---------|
| `TEN_NHA_THAU`| Tên nhà thầu    | hỏi      |
| `PHONG`      | Phòng             | tự động  |
| `TRUONG_PHONG`| Trưởng phòng     | hỏi       |
| `DONG_KY`    | Dòng ký           | tự động  |
| `LIEN_HE`    | Liên hệ           | hỏi      |
| `DIA_CHI`    | Địa chỉ nhà thầu  | hỏi      |
| `DIENTHOAI`  | Điện thoại        | hỏi      |
| `NGAY`/`THANG`/`NAM` | Ngày lập  | tự động |

#### DỰ TOÁN MUA SẮN (`du-toan`)

| Placeholder    | Ý nghĩa        | Ghi chú |
|----------------|----------------|---------|
| `TEN_NHA_THAU` | Tên nhà thầu   | hỏi      |
| `GOI_THAU`     | Gói thầu       | hỏi      |
| `PHONG`        | Phòng          | tự động  |
| `TRUONG_PHONG` | Trưởng phòng   | hỏi      |
| `NGAY`/`THANG`/`NAM` | Ngày lập | tự động |

#### DỰ THẢO HỢP ĐỒNG (`du-thao-hop-dong`)

| Placeholder    | Ý nghĩa         | Ghi chú |
|----------------|-----------------|---------|
| `GIA_TRI_HD`   | Giá trị hợp đồng| hỏi      |
| `GIA_TRI_CHU`  | Giá trị bằng chữ| tự chuyển đổi |
| `SO_NGAY`      | Số ngày thực hiện | hỏi    |
| `NGAY`/`THANG`/`NAM` | Ngày ký | tự động |

#### HỢP ĐỒNG KINH TẾ (`hop-dong`)

| Placeholder   | Ý nghĩa          | Ghi chú |
|---------------|------------------|---------|
| `SO_HOP_DONG` | Số hợp đồng      | hỏi      |
| `GIA_TRI_HD`  | Giá trị hợp đồng | hỏi      |
| `TEN_NHA_THAU`| Tên nhà thầu     | hỏi      |
| `SO_QD`       | Số QD phê duyệt  | hỏi      |
| `CHUC_VU_B`   | Chức vụ bên B    | hỏi      |
| `NGAY`/`THANG`/`NAM` | Ngày ký   | tự động  |

#### BIÊN BẢN HOÀN THIỆN HỢP ĐỒNG (`bien-ban-hoan-thien-hop-dong`)

| Placeholder     | Ý nghĩa         | Ghi chú |
|-----------------|-----------------|---------|
| `TEN_NHA_THAU`  | Tên nhà thầu    | hỏi      |
| `DIA_CHI_NHA_THAU` | Địa chỉ nhà thầu | hỏi |
| `DIENTHOAI_NHA_THAU` | Điện thoại nhà thầu | hỏi |
| `SO_QD`       | Số QD            | hỏi      |
| `GIA_TRI_HD`  | Giá trị hợp đồng | hỏi      |
| `GIA_TRI_CHU` | Giá trị bằng chữ | tự chuyển đổi |
| `NGAY`/`THANG`/`NAM` | Ngày lập | tự động |

#### BIÊN BẢN THANH LÝ HỢP ĐỒNG (`bien-ban-thanh-ly-hop-dong`)

| Placeholder   | Ý nghĩa       | Ghi chú    |
|---------------|---------------|------------|
| `GIA_TRI`     | Giá trị        | hỏi        |
| `NGAY`/`THANG`/`NAM` | Ngày lập | tự động    |

#### BIÊN BẢN NGHIỆM THU KHỐI LƯỢNG (`bbnt-khoi-luong-hoan-thanh`)

| Placeholder     | Ý nghĩa         | Ghi chú    |
|-----------------|-----------------|------------|
| `SO_BIEN_BAN`   | Số biên bản      | hỏi        |
| `GIA_TRI`       | Giá trị          | hỏi        |
| `GIA_TRI_CHU`   | Giá trị bằng chữ | tự chuyển đổi |
| `TRUONG_PHONG`  | Trưởng phòng     | hỏi        |
| `NGAY`/`THANG`/`NAM` | Ngày lập  | tự động    |

#### GIẤY ĐỀ NGHỊ THANH TOÁN (`giay-de-nghi-thanh-toan`)

| Placeholder   | Ý nghĩa       | Ghi chú    |
|---------------|---------------|------------|
| `SO_TIEN`     | Số tiền        | hỏi        |
| `NGAN_HANG`   | Ngân hàng      | hỏi        |
| `TRUONG_PHONG`| Trưởng phòng    | hỏi        |
| `NGAY`/`THANG`/`NAM` | Ngày lập | tự động  |

#### THƯ MỜI KÝ KẾT HỢP ĐỒNG (`thu-moi-ky-hop-dong`)

| Placeholder  | Ý nghĩa        | Ghi chú    |
|--------------|----------------|------------|
| `TEN_NHA_THAU`| Tên nhà thầu  | hỏi        |
| `GOI_THAU`   | Gói thầu       | hỏi        |
| `DIA_CHI`    | Địa chỉ        | hỏi        |
| `NGAY`/`THANG`/`NAM` | Ngày lập | tự động |

#### THƯ MỜI HOÀN THIỆN HỢP ĐỒNG (`thu-moi-hoan-thien-hop-dong`)

| Placeholder  | Ý nghĩa         | Ghi chú    |
|--------------|-----------------|------------|
| `TEN_NHA_THAU`| Tên nhà thầu   | hỏi        |
| `GOI_THAU`   | Gói thầu        | hỏi        |
| `SO_QD`      | Số QD           | hỏi        |
| `NGAY_QD`/`THANG_QD`/`NAM_QD` | Ngày QD | hỏi |
| `DIA_CHI`    | Địa chỉ         | hỏi        |
| `DONG_KY`    | Dòng ký         | tự động    |
| `NGAY`/`THANG`/`NAM` | Ngày lập | tự động |

**Số văn bản** (`01/TTr-___`, `___/QĐ-BV`, …) và **các ngày tham chiếu tới văn bản khác** (đơn đề xuất, yêu cầu báo giá, biên bản hoàn thiện hợp đồng…) **luôn để trống** (`___`) — Văn thư cấp số, không phải mẫu điền.

## Tham chiếu nhanh — trạng thái template

### Đã convert sang `{{KEY}}` + `officecli merge` (24)

**Lưu ý:** mỗi template có tập placeholder riêng — không có bộ key chung. Luôn trich xuat dong tu template, khong dung cung bang field.

#### Giấy tờ mua sắm & LCNT (15)

| Nhiệm vụ                       | Template                                  |
| ------------------------------- | ----------------------------------------- |
| Tờ trình duyệt dự toán & KHLCNT | `assets/to-trinh-du-toan-khlcnt.docx`     |
| QĐ duyệt dự toán & KHLCNT      | `assets/qd-phe-duyet-du-toan-khlcnt.docx` |
| Tờ trình duyệt KQLCNT           | `assets/to-trinh-kqlcnt.docx`             |
| QĐ duyệt KQLCNT                 | `assets/qd-phe-duyet-kqlcnt.docx`         |
| Đơn đề xuất mua sắm             | `assets/don-de-xuat.docx`                 |
| Yêu cầu báo giá                 | `assets/yeu-cau-bao-gia.docx`             |
| Dự toán mua sắm                 | `assets/du-toan.docx`                     |
| Dự thảo hợp đồng kinh tế       | `assets/du-thao-hop-dong.docx`            |
| Hợp đồng kinh tế                | `assets/hop-dong.docx`                    |
| Biên bản hoàn thiện hợp đồng   | `assets/bien-ban-hoan-thien-hop-dong.docx`|
| Biên bản thanh lý hợp đồng     | `assets/bien-ban-thanh-ly-hop-dong.docx`  |
| Biên bản nghiệm thu khối lượng | `assets/bbnt-khoi-luong-hoan-thanh.docx`  |
| Giấy đề nghị thanh toán         | `assets/giay-de-nghi-thanh-toan.docx`     |
| Thư mời ký kết hợp đồng        | `assets/thu-moi-ky-hop-dong.docx`         |
| Thư mời hoàn thiện hợp đồng    | `assets/thu-moi-hoan-thien-hop-dong.docx` |

#### Quản trị văn phòng & điều xe (8)

| Nhiệm vụ                       | Template                                  |
| ------------------------------- | ----------------------------------------- |
| Dự trù vật tư                  | `assets/du-tru-vat-tu.docx`               |
| Danh sách nhà cung ứng         | `assets/danh-sach-ncc.docx`               |
| Đánh giá nhà cung ứng mới     | `assets/danh-gia-ncc-moi.docx`            |
| Đánh giá nhà cung ứng cũ      | `assets/danh-gia-ncc-cu.docx`             |
| Phiếu điều động xe ô tô       | `assets/dieu-dong-xe.docx`               |
| Sổ lịch trình xe               | `assets/slich-trinh-xe.docx`             |
| Phiếu yêu cầu lãnh VPP        | `assets/phieu-yeu-cau-linh-vpp.docx`     |
| Phiếu dự trù VPP              | `assets/phieu-du-tru-vpp.docx`           |

#### Biểu mẫu Excel (1)

| Nhiệm vụ                       | Template                                  |
| ------------------------------- | ----------------------------------------- |
| Bảng kê chứng từ thanh toán   | `assets/bang-ke-chung-tu-thanh-toan.xlsx` |

Mỗi template: các trường thân bài đã gắn `{{KEY}}`. Bảng phụ lục (danh sách hàng hoá, kế hoạch LCNT dạng dòng biến đổi) **chưa** kết nối — xem "Bảng phụ lục" bên dưới.

## Đọc nghiệp vụ / biểu mẫu / phân công

| Nhu cầu                            | File                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------ |
| QT mua sắm / VPP / TSCĐ             | `references/hcqt-mua-sam.md`                                                   |
| Index biểu mẫu + bộ thầu 01/03      | `references/bieu-mau-index.md`                                                 |
| Ngưỡng chỉ định thầu                | `references/dau-thau-chi-dinh.md`                                              |
| Phân công HCQT 2026                 | `references/phan-cong-hcqt-2026.md`                                            |
| Văn thư QT-02                       | `references/hcqt-quy-trinh-van-ban.md`                                         |
| Khung tờ trình (markdown tham khảo) | `references/mau-to-trinh-mua-sam.md` — **xuất file vẫn qua `officecli merge`** |

## Cổng bắt buộc (bắt buộc — không oneshot)

**Cấm sinh / giao file** cho đến khi:

1. Đã thu thập đủ trường tối thiểu qua hội thoại và người dùng xác nhận.
2. File được tạo **chỉ** bằng `officecli merge assets/<slug>.docx <output>.docx --data <fields>.json` có sẵn.

**Cấm tuyệt đối:**

- `officecli new <loại> --prompt "..."` hoặc Markdown → Word — sinh tự do, không đảm bảo đúng thể thức/số liệu thật.
- Bịa `TEN_NHA_THAU`, `MA_SO_THUE`, số QĐ, ngày tham chiếu văn bản khác nếu người dùng chưa cung cấp.
- Merge khi còn trường bắt buộc chưa có giá trị thật (không tự chế số liệu để lấp chỗ trống).

Nếu người dùng oneshot ("cứ gen đi"): vẫn **hỏi tối thiểu 1–3 trường thiếu** trước khi merge; ghi rõ trường nào đang để trống chờ.

## Giao thức hỏi đáp

### Bước 1: Xác định loại giấy tờ

Câu mở đầu:

> "Bạn cần soạn giấy tờ HCQT loại nào?"
> _Gợi ý mặc định: tờ trình phê duyệt dự toán & KHLCNT. Khác: QĐ dự toán / tờ trình KQLCNT / QĐ KQLCNT._

### Bước 2: Trích xuất placeholder từ template

Lấy tất cả `{{KEY}}` từ template đã chọn — đây là nguồn duy nhất, **không dựa vào bảng cứng**:

```bash
unzip -p assets/<template>.docx word/document.xml | grep -o '{{[^}]*}}' | sort -u
```

### Bước 3: Lọc trường cần hỏi

1. Trường đã có trong ngữ hội thoại → ghi nhận.
2. Trường tự động (ngày, chức danh, tên phòng) → điền sẵn.
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

### Trường thân bài (vô hướng) — `officecli merge`

```bash
# 1) Viết trường đã thu thập vào JSON (KHÔNG truyền JSON qua shell string — dấu Tiếng Việt/quote dễ vỡ)
cat > /tmp/fields.json <<'JSON'
{"TEN_GOI_THAU": "...", "DU_TOAN": "...", "PHONG_BAN": "...", "NGAY_KY": "20", "THANG_KY": "07", "NAM_KY": "2026", ...}
JSON

# 2) Merge — một lệnh, không unpack/pack/validate thủ công
officecli merge assets/to-trinh-du-toan-khlcnt.docx out.docx --data /tmp/fields.json

# 3) Kiểm tra không còn {{...}} sót lại trước khi giao người dùng
unzip -p out.docx word/document.xml | grep -o '{{[^}]*}}' && echo "CÒN SÓT PLACEHOLDER — dừng lại"
```

### Bảng phụ lục (dòng biến đổi: danh sách hàng hoá, dịch vụ) — `officecli set`

`officecli merge` chỉ thay khóa vô hướng — không tự nhân dòng bảng. Với các dòng phụ lục (PHỤ LỤC 01/02), sau khi merge xong phần thân, hỏi từng dòng rồi set trực tiếp vào ô:

```bash
# Xác định đúng ô bằng get trước khi set (KHÔNG dùng officecli dump trên các file này —
# dump lỗi "text value is not a valid enumeration value" trên định dạng LibreOffice-convert;
# get/set vẫn hoạt động bình thường)
officecli get out.docx "/body/tbl[6]/tr[2]"          # xem đường dẫn ô/nội dung hiện tại
officecli set out.docx "/body/tbl[6]/tr[2]/tc[2]" --prop text="Tên hàng hoá"
officecli set out.docx "/body/tbl[6]/tr[2]/tc[9]" --prop text="Cái"
```

Đường dẫn bảng/dòng/ô: `/body/tbl[N]/tr[R]/tc[C]` (xem `officecli help docx table-cell`). Chỉ số N/R/C khác nhau theo từng template — `get` trước để xác nhận, đừng đoán.

### Quy tắc quan trọng

- Merge chỉ trên file trong `assets/` — không tạo bố cục mới.
- Không dùng Markdown / `officecli new --prompt` làm nguồn bố cục.
- Số văn bản để `___` — Văn thư cấp số.
- Không bịa chữ ký / số QĐ / tên NCC nếu người dùng chưa cung cấp.
- Sau merge: kiểm tra không còn `{{...}}` sót (xem trên); nếu còn → trường đó chưa có trong dữ liệu, hỏi lại người dùng.
- Sau khi xong: trả lời người dùng trước khi tuyên bố "xong với NVBV".

## Sau khi xong

1. Trả lời người dùng: đã tạo file gì, còn thiếu trường gì.
2. Đính kèm `.docx`.

## Danh mục tài nguyên

Xem `assets/README.md`.
