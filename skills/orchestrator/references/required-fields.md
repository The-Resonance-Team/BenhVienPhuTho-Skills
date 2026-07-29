# Required Fields by Template Type

Minimum fields each template type needs. The orchestrator validates these before spawning workers.

## phong-ktda (Chỉ định thầu dịch vụ 50–dưới 500 triệu)

### All templates

| Field | Description | Source |
|---|---|---|
| `TEN_GOI_THAU` | Tên gói thầu | User input |
| `PHONG_BAN` | Tên phòng | Auto: "Kế toán dự án" |
| `NGAY_KY` | Ngày ký | Auto: today |
| `THANG_KY` | Tháng ký | Auto: current month |
| `NAM_KY` | Năm ký | Auto: current year |

### Per-template required

#### don-de-xuat-ktda

| Field | Description |
|---|---|
| `TEN_GOI_THAU` | Tên gói thầu |
| `NOI_DUNG_MUA_SAM` | Nội dung mua sắm |
| `HANG_HOA` | Hạng hàng hóa |
| `TRUONG_PHONG` | Trưởng phòng đề xuất |

#### thu-moi-bao-gia-dich-vu

| Field | Description |
|---|---|
| `TEN_NHA_THAU` | Tên nhà thầu |
| `DIA_CHI_NHA_THAU` | Địa chỉ nhà thầu |
| `LIEN_HE` | Người liên hệ |

#### du-toan-ktda

| Field | Description |
|---|---|
| `TEN_NHA_THAU` | Tên nhà thầu |
| `GOI_THAU` | Gói thầu |

#### to-trinh-du-toan-khlcnt

| Field | Description |
|---|---|
| `TEN_GOI_THAU` | Tên gói thầu |
| `DU_TOAN` | Giá trị dự toán |
| `THOI_GIAN` | Thời gian thực hiện |
| `SO_LUONG_GOI_THAU` | Số lượng gói thầu |
| `QUY_LCNT` | Quý LCNT |
| `NAM_LCNT` | Năm LCNT |

#### qd-phe-duyet-du-toan-khlcnt

| Field | Description |
|---|---|
| `TEN_GOI_THAU` | Tên gói thầu |
| `DU_TOAN` | Giá trị dự toán |

#### to-trinh-kqlcnt

| Field | Description |
|---|---|
| `TEN_GOI_THAU` | Tên gói thầu |
| `TEN_NHA_THAU` | Tên nhà thầu |
| `DU_TOAN` | Giá trị dự toán |
| `QUY_LCNT` | Quý LCNT |
| `NAM_LCNT` | Năm LCNT |

#### qd-phe-duyet-kqlcnt

| Field | Description |
|---|---|
| `TEN_GOI_THAU` | Tên gói thầu |
| `TEN_NHA_THAU` | Tên nhà thầu |
| `MA_SO_THUE` | Mã số thuế nhà thầu |
| `DU_TOAN` | Giá trị dự toán |
| `THOI_GIAN_HOP_DONG` | Thời gian thực hiện HĐ |

#### hop-dong

| Field | Description |
|---|---|
| `SO_HOP_DONG` | Số hợp đồng |
| `GIA_TRI_HD` | Giá trị hợp đồng |
| `TEN_NHA_THAU` | Tên nhà thầu |
| `SO_QD` | Số QD phê duyệt |

#### bbnt-cong-viec

| Field | Description |
|---|---|
| `GIA_TRI` | Giá trị nghiệm thu |

#### bbnt-khoi-luong-hoan-thanh

| Field | Description |
|---|---|
| `GIA_TRI_HD` | Giá trị hợp đồng |
| `GIA_TRI_NGHIEM_THU` | Giá trị nghiệm thu |
| `GIA_TRI_TAM_UNG` | Giá trị tạm ứng (nếu có) |

#### bien-ban-thanh-ly-hop-dong

| Field | Description |
|---|---|
| `GIA_TRI` | Giá trị thanh lý |

#### giay-de-nghi-thanh-toan

| Field | Description |
|---|---|
| `SO_TIEN` | Số tiền đề nghị |
| `NGAN_HANG` | Ngân hàng |
| `SO_TK` | Số tài khoản |

## phong-vattu (Mua sắm hàng hoá trên ngưỡng)

### Common fields

| Field | Description |
|---|---|
| `TEN_GOI_THAU` | Tên gói thầu |
| `TEN_DU_TOAN` | Tên dự toán |
| `TONG_MUC_DU_TOAN` | Tổng mục dự toán (số) |
| `TONG_MUC_DU_TOAN_CHU` | Tổng mục dự toán (chữ) |
| `PHONG_BAN` | Auto: "Phòng Vật tư – TBYT" |

### Per-template required

#### bb-hop-hdkh-danh-muc-tckt

| Field | Description |
|---|---|
| `TEN_GOI_THAU` | Tên gói thầu |
| `DANH_MUC_HANG_HOA` | Array of items: [{TEN, TCKT, SO_LUONG, DON_VI, DON_GIA}] |

#### bb-hop-tcg-du-toan-khlcnt

| Field | Description |
|---|---|
| `TEN_GOI_THAU` | Tên gói thầu |
| `TONG_MUC_DU_TOAN` | Tổng mục dự toán |
| `DANH_MUC_HANG_HOA` | Array of items |

#### to-trinh-khlcnt-vattu

| Field | Description |
|---|---|
| `TEN_GOI_THAU` | Tên gói thầu |
| `TEN_DU_TOAN` | Tên dự toán |
| `TONG_MUC_DU_TOAN` | Tổng mục dự toán |
| `DANH_MUC_HANG_HOA` | Array of items |

#### hop-dong-vattu

| Field | Description |
|---|---|
| `TEN_NHA_THAU` | Tên nhà thầu |
| `MA_SO_THUE_NCC` | MST nhà cung cấp |
| `TONG_MUC_DU_TOAN` | Tổng mục dự toán |
| `DANH_MUC_HANG_HOA` | Array of items |

## phong-hcqt (Chỉ định thầu 50–dưới 500 triệu)

### Common fields

| Field | Description |
|---|---|
| `TEN_GOI_THAU` | Tên gói thầu |
| `DU_TOAN` | Giá trị dự toán |
| `DU_TOAN_BANG_CHU` | Giá trị bằng chữ |
| `PHONG_BAN` | Auto: "Hành chính quản trị" |

### Per-template required

#### to-trinh-du-toan-khlcnt

| Field | Description |
|---|---|
| `TEN_GOI_THAU` | Tên gói thầu |
| `DU_TOAN` | Giá trị dự toán |
| `THOI_GIAN` | Thời gian thực hiện |
| `QUY_LCNT` | Quý LCNT |
| `NAM_LCNT` | Năm LCNT |

#### don-de-xuat

| Field | Description |
|---|---|
| `TEN_GOI_THAU` | Tên gói thầu |
| `NOI_DUNG_MUA_SAM` | Nội dung mua sắm |
| `HANG_HOA` | Hạng hàng hóa |

#### yeu-cau-bao-gia

| Field | Description |
|---|---|
| `TEN_NHA_THAU` | Tên nhà thầu |
| `DIA_CHI` | Địa chỉ |
| `LIEN_HE` | Người liên hệ |

#### hop-dong

| Field | Description |
|---|---|
| `SO_HOP_DONG` | Số hợp đồng |
| `GIA_TRI_HD` | Giá trị hợp đồng |
| `TEN_NHA_THAU` | Tên nhà thầu |

## Dependency rules

Templates with `depends` require that all dependency templates must have:
1. A corresponding entry in `templates[]` array
2. All required fields for the dependency template exist in `fields.json`

If dependency validation fails → mark template as `skipped` with reason "missing dependency: <slug>".
