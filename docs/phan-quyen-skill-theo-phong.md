# Phân quyền skill theo phòng ban (cài cục bộ theo máy)

## Vấn đề

OpenWork Cloud đẩy skill **theo org, tất-cả-hoặc-không**: mọi thành viên được mời — bất kể phòng ban — nhìn thấy **toàn bộ** danh sách skill đã đồng bộ. Tab **Teams/Roles** chỉ nhóm thành viên, chưa điều khiển skill/plugin nào hiện cho ai (xem cảnh báo trong [onboarding-cowork.md](./onboarding-cowork.md)).

Nguyên nhân cốt lõi: skill được đóng gói thành **một plugin gộp cả 12 skill**; cloud bật cả marketplace ở cấp org. Không thể phân quyền ở mức từng skill khi mọi skill nằm chung một plugin.

## Giải pháp: B1 — cài skill cục bộ theo máy

Bỏ việc dựa vào cloud để phát skill phòng ban. Thay vào đó **cài skill của đúng phòng lên từng máy**, tận dụng cơ chế có sẵn: OpenCode (nhúng trong OpenWork) **tự quét skill từ thư mục global trên máy**.

### Cơ chế (đã xác minh — opencode.ai/docs/skills)

OpenCode nạp skill từ các thư mục cục bộ trên máy, mỗi skill một thư mục chứa `SKILL.md`:

```
~/.config/opencode/skills/<name>/SKILL.md   ← mặc định script dùng
~/.claude/skills/<name>/SKILL.md
~/.agents/skills/<name>/SKILL.md
```

Trên Windows: `%USERPROFILE%\.config\opencode\skills\<name>\SKILL.md`.

`setup.ps1` đã chạy **trên từng máy** do IT Manager thực hiện, và IT **đã biết máy đó thuộc phòng nào** (mời theo đợt từng phòng). Vậy chỉ cần copy `common + <phòng>` vào thư mục trên, bỏ 8 phòng còn lại.

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

Cả hai cách: `setup.ps1` copy `officecli` (chung) + skill của phòng vào `%USERPROFILE%\.config\opencode\skills\`, xoá bản cũ nếu có.

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

Điểm chưa chắc duy nhất: **OpenWork nhúng OpenCode có đọc đúng `%USERPROFILE%\.config\opencode\skills` không**, hay app dùng thư mục config riêng (app Electron có thể đặt HOME/config khác). Chạy pilot 1 máy, mở OpenWork, kiểm tra skill của phòng có hiện trong bộ chọn skill không.

Nếu không hiện → tìm thư mục skill thật của OpenWork rồi override:

```powershell
.\setup.ps1 -Department phong-cntt -SkillsDir "<đường-dẫn-thật>"
```

## Cập nhật skill về sau

Khi skill trong repo đổi, chạy lại `setup.ps1 -Department <phòng>` trên máy — bước [7/8] xoá và copy đè. (Mất auto-update của cloud, đổi lấy phân quyền — chấp nhận được vì IT vốn chạy setup theo máy. Cần cập nhật hàng loạt thì viết script `-UpdateSkillsOnly` sau.)

## Vì sao không cần tách plugin

Phân quyền diễn ra ở **tầng thư mục trên máy**, không ở tầng plugin. Mỗi máy chỉ có thư mục skill của phòng mình. Không phải tái cấu trúc `marketplace.json` / `plugin.json`. Nếu sau này chuyển sang B2 (cloud phân quyền theo team) thì mới cần tách plugin.
