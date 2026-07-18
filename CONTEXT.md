# CONTEXT.md — thêm skill phòng ban mới

Checklist cho agent khi thêm một skill `phong-*` mới vào repo này (hoặc đổi tên/xoá một skill). Mục tiêu: không để danh sách skill lệch nhau giữa plugin manifest, script, docs, eval.

Skill mới luôn có `skills/<slug>/SKILL.md` (+ `assets/`, `references/` nếu có template thật). Sau khi skill đó hoạt động, cập nhật **tất cả** các nơi dưới đây — bỏ sót một chỗ vẫn chạy được nhưng gây lệch dữ liệu (skill không hiện trong plugin, hoặc bị bỏ qua khi audit toàn bộ).

## 1. Plugin manifest — bắt buộc

`.claude-plugin/plugin.json`
- Thêm `<slug>` vào mảng `"skills"`.
- Cập nhật `"description"` (liệt kê tên phòng ban) nếu file này dùng để hiển thị danh sách phòng ban cho người dùng.

Thiếu bước này → skill mới **không được plugin nhận diện**, dù thư mục đã tồn tại.

## 2. Script audit — bắt buộc nếu skill có runtime `.docx`/`.xlsx`

Các script sau có mảng skill mặc định dùng khi chạy **không kèm** `--skills`:

| File | Biến | Dòng (tham khảo) |
|---|---|---|
| `scripts/validate-runtime-assets.js` | `DEFAULT_SKILLS` | ~22–29 |
| `scripts/normalize-runtime-assets.js` | fallback khi thiếu `--skills` | ~14–16 |

Thêm `<slug>` vào cả hai mảng — nếu không, `node scripts/validate-runtime-assets.js` (không tham số) và `node scripts/normalize-runtime-assets.js` (không tham số) sẽ **âm thầm bỏ qua** skill mới khi audit toàn repo.

`scripts/build-runtime-assets.js` (`defaultSkills`, dòng ~18) chỉ là ví dụ mặc định (hiện có 2 skill cũ) — **không bắt buộc** thêm slug mới vào đây, luôn gọi script này kèm `--skills <slug>` tường minh khi build.

Sau khi thêm asset thật:
```bash
node scripts/build-runtime-assets.js --source-root <nguồn> --skills <slug>
node scripts/normalize-runtime-assets.js --skills <slug>
node scripts/validate-runtime-assets.js --skills <slug>
```

## 3. Eval suite — bắt buộc

`evals/evals.json` — mảng phẳng `evals[]`, mỗi phần tử có `target_skill`. Theo quy ước hiện tại (xem `evals/README.md`): mỗi skill có tối thiểu **2 case dương (should_trigger: true) + 1 case biên/âm** (overlap với skill khác, hoặc should_trigger: false). Thêm case mới theo đúng format các case hiện có, không xoá case cũ.

## 4. Tài liệu người dùng — bắt buộc

`docs/huong-dan-su-dung-skill.md`
- Mục 1 (bảng lệnh `/phong-*`): thêm 1 dòng `| Tên phòng | /phong-<slug> |`.
- Mục 3: thêm 1 subsection mới theo đúng khuôn các phòng khác — **Từ khóa** (chép từ trường `description` trong `SKILL.md` của skill mới) + 2–3 **ví dụ câu gõ** + ghi chú đặc biệt nếu có (dữ liệu nhạy cảm, chưa có mẫu thật, quy trình nhiều bước...).

`docs/onboarding-cowork.md`
- Mục 1 ("Cách mời theo phòng ban"): thêm tên phòng vào danh sách.
- Mục 6 (bảng ví dụ câu gõ cho nhân viên không rành kỹ thuật): thêm 1 dòng cùng khuôn bảng hiện có.

`README.md` — thêm tên phòng vào dòng liệt kê một dòng ở đầu file.

## 5. Không cần đụng vào

- `REPORT.md` — báo cáo snapshot có ngày tháng của một lần review đã xong, không phải tài liệu sống; không cập nhật theo mỗi skill mới.
- `scripts/recover-runtime-assets.js` — script khôi phục sự cố asset cụ thể trong quá khứ, không phải registry skill.
- `assets/README.md` riêng của từng skill — nội bộ skill đó, không tham chiếu chéo.

## Thứ tự làm

1. Viết `SKILL.md` + `assets/`/`references/` cho skill mới, chạy build/normalize/validate (mục 2) tới khi sạch.
2. Đăng ký vào `plugin.json` (mục 1).
3. Thêm eval case (mục 3).
4. Cập nhật cả 3 file docs (mục 4).
5. Chạy lại `node scripts/validate-runtime-assets.js` (không tham số) — xác nhận skill mới xuất hiện trong log audit toàn repo.
