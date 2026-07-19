# Phân quyền skill theo phòng ban (cài cục bộ theo máy)

## Vấn đề

OpenWork Cloud đẩy skill **theo org, tất-cả-hoặc-không**: mọi thành viên được mời — bất kể phòng ban — nhìn thấy **toàn bộ** danh sách skill đã đồng bộ. Tab **Teams/Roles** chỉ nhóm thành viên, chưa điều khiển skill/plugin nào hiện cho ai (xem cảnh báo trong [onboarding-cowork.md](./onboarding-cowork.md)).

Nguyên nhân cốt lõi: skill được đóng gói thành **một plugin gộp cả 12 skill**; cloud bật cả marketplace ở cấp org. Không thể phân quyền ở mức từng skill khi mọi skill nằm chung một plugin.

## Giải pháp: B1 — cài skill cục bộ theo máy

Bỏ việc dựa vào cloud để phát skill phòng ban. Thay vào đó **cài skill của đúng phòng lên từng máy** bằng công cụ chuẩn của hệ sinh thái Agent Skills.

### Cơ chế — skills CLI (`npx skills`, skills.sh)

`npx skills` hỗ trợ OpenCode; nó kéo skill **từ GitHub** và cài vào đúng thư mục global mà OpenCode (nhúng trong OpenWork) tự quét:

- `--agent opencode --global` → CLI **tự** ghi vào thư mục skill global của OpenCode (không phải tự đoán đường dẫn).
- `--skill officecli --skill <phòng>` → chỉ cài skill chung + skill của phòng, **bỏ 8 phòng còn lại**.
- `--copy` → copy độc lập (không symlink), bền qua dọn cache; `--yes` chạy không hỏi.
- Node/npx đã được `setup.ps1` cài ở bước [2/8].

`setup.ps1` chạy **trên từng máy** do IT thực hiện, IT **biết máy thuộc phòng nào** (mời theo đợt). Vậy chỉ cần chọn phòng khi cài.

## Hai việc cần làm

### 1. Một lần, cấp org — thu hẹp thứ cloud đẩy

Cloud đẩy **thêm chồng** lên máy; bản cài cục bộ **không xoá được** thứ cloud force-sync. Nên phải gỡ/thu hẹp marketplace org-wide để cloud **không đẩy toàn bộ dept skill** nữa:

- Bỏ đăng ký marketplace "tất cả skill" ở cấp org, **hoặc**
- Chỉ để marketplace org chứa skill **chung** (ví dụ `officecli`); dept skill để cục bộ.

Model nội bộ vẫn đẩy qua cloud như cũ — không đụng tới.

> ⚠️ Nếu bỏ qua bước này, cloud vẫn nhồi lại đủ 9 dept skill → phân quyền cục bộ vô hiệu.

### 2. Mỗi máy — chạy setup, chọn phòng ban

**Cách 1 — menu tương tác (khuyến nghị, không cần nhớ mã phòng):**

```powershell
.\setup.ps1
```

Sau khi cài công cụ, bước [7/8] hiện menu chọn phòng:

```
  =====================================================
    Select the department for THIS machine
  =====================================================
    1. Hanh chinh quan tri (HCQT)      [phong-hcqt]
    2. Dieu duong                      [phong-dieu-duong]
    3. Quan ly chat luong (QLCL)       [phong-qlcl]
    4. Cong nghe thong tin (CNTT)      [phong-cntt]
    5. Ke toan du an (KTDA)            [phong-ktda]
    6. Vat tu - TBYT                   [phong-vattu]
    7. To chuc can bo (TCCB)           [phong-tccb]
    8. Dao tao                         [phong-dao-tao]
    9. NCKH & HTQT                     [phong-nckh-htqt]
    0. Skip - install tooling only, no skills
  -----------------------------------------------------
  Enter a number (0-9):
```

Gõ số phòng rồi Enter. Nhập sai → hỏi lại. Chọn `0` = chỉ cài công cụ, không cài skill. (Menu dùng chữ không dấu để hiển thị đúng trên mọi console Windows / phiên RDP.)

**Cách 2 — chỉ định thẳng (bỏ qua menu, hợp khi cài hàng loạt bằng script):**

```powershell
.\setup.ps1 -Department phong-cntt
```

Cả hai cách: `setup.ps1` gọi `npx skills add <repo> --agent opencode --global --copy --skill officecli --skill <phòng>` — kéo bản **mới nhất từ GitHub**, cài đúng officecli + skill của phòng.

Bảng phòng → mã (`-Department`):

| Phòng | `-Department` |
|---|---|
| Hành chính quản trị | `phong-hcqt` |
| Điều dưỡng | `phong-dieu-duong` |
| Quản lý chất lượng | `phong-qlcl` |
| Công nghệ thông tin | `phong-cntt` |
| Kế toán dự án | `phong-ktda` |
| Vật tư – TBYT | `phong-vattu` |
| Tổ chức cán bộ | `phong-tccb` |
| Đào tạo | `phong-dao-tao` |
| NCKH & HTQT | `phong-nckh-htqt` |

## Cần xác minh trên 1 máy pilot

Điểm chưa chắc duy nhất: **OpenWork nhúng OpenCode có đọc đúng thư mục skill global mà `npx skills --agent opencode --global` ghi vào không** (app Electron có thể đặt HOME/config riêng). Chạy pilot 1 máy, mở OpenWork, kiểm tra skill của phòng có hiện trong bộ chọn skill.

Nếu không hiện → xem CLI cài vào đâu bằng `npx skills list --agent opencode --global`, rồi symlink/copy sang thư mục skill thật của OpenWork.

## Cập nhật skill khi có bản mới

Skill đổi trên GitHub → cập nhật máy bằng **một lệnh**, không cần chạy lại toàn bộ setup:

```powershell
npx -y skills@latest update --agent opencode --global
```

Lệnh kéo bản mới nhất cho các skill đã cài trên máy (chỉ officecli + skill của phòng). Chạy lại `setup.ps1` cũng cập nhật — bước [7/8] `npx skills add` luôn lấy bản mới. Đẩy hàng loạt → đặt lệnh `update` vào scheduled task / login script.

## Dọn skill phòng khác (máy đã đồng bộ cloud trước đó)

Máy từng đồng bộ cloud (trước khi thu hẹp marketplace) vẫn còn **đủ 9 phòng** trong thư mục skill. Thu hẹp marketplace chỉ chặn đẩy **mới** — không xoá bản đã có. Cài dept qua npx chỉ **thêm cạnh** → user vẫn thấy hết.

Dùng `-CleanSkillsDir` để xoá skill phòng khác, giữ lại phòng của máy + skill chung. Tìm thư mục ở bước pilot:

```powershell
npx -y skills@latest list --agent opencode --global   # xem CLI cài vào đâu; đối chiếu nơi skill cloud cũ nằm
```

**Chạy thử trước (không xoá gì) — bắt buộc trên máy thật:**

```powershell
.\setup.ps1 -Department phong-cntt -CleanSkillsDir "<đường-dẫn>" -DryRun
```

Xem danh sách `[DRY] would remove: phong-...` đúng ý → bỏ `-DryRun` để xoá thật.

An toàn: chỉ xoá thư mục tên `phong-*` **có `SKILL.md`**, không đụng phòng đang chọn, không đụng skill chung (officecli/setup/grilling) hay thư mục lạ.

## Vì sao không cần tách plugin

Phân quyền diễn ra ở **tầng thư mục trên máy**, không ở tầng plugin. Mỗi máy chỉ có thư mục skill của phòng mình. Không phải tái cấu trúc `marketplace.json` / `plugin.json`. Nếu sau này chuyển sang B2 (cloud phân quyền theo team) thì mới cần tách plugin.
