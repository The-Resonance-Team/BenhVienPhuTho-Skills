---
name: setup
description: "Setup môi trường BV: kiểm tra skill grilling, officecli, Node và npm. Dùng khi user nói setup, /setup, lần đầu, hoặc một skill báo thiếu tooling. Không tự cài đặt; nếu thiếu dependency thì xin user phê duyệt trước."
---

# Setup — tooling (officecli)

## Tổng quan

Hai việc trong một skill:

1. **Grilling tooling** — đảm bảo skill `grilling` có sẵn (cài qua `npx skills add ... --skill grilling` nếu thiếu). Chỉ cần khi user muốn grilling thủ công.
2. **officecli tooling** — kiểm tra binary `officecli` có sẵn trên PATH (chỉ cài sau khi user phê duyệt).

Upstream: [`iOfficeAI/OfficeCLI`](https://github.com/iOfficeAI/OfficeCLI) — single-binary CLI, đọc/sửa/tạo `.docx`/`.xlsx`/`.pptx`. `phong-hcqt`/`phong-dieu-duong` dùng lệnh `officecli merge <template>.docx <output>.docx --data <fields>.json` để điền `{{KEY}}` trong template.

## Grilling tooling

Skill `grilling` (hỏi từng field một, có gợi ý mặc định). Nếu agent **không tìm thấy** skill `grilling`:

```bash
npx skills add https://github.com/mattpocock/skills --skill grilling
```

Cài xong → thử gọi lại skill `grilling`. Nếu vẫn không thấy, báo user rõ ràng.

Không tự cài skill trong lúc xử lý tài liệu. Việc tải/cài package là thay đổi máy và phải có xác nhận của user trước.

Cần Node/npm (`npx`) trên máy — nếu thiếu, dùng cùng lúc với bước cài `officecli`.

## officecli tooling

Không vendor, không git-clone — một binary duy nhất trên PATH.

```
officecli --version    # đã cài → in version, thoát code 0
officecli               # chỉ kiểm tra binary hiện có; không tự install
```

Cài khi thiếu, sau khi user phê duyệt (ưu tiên theo thứ tự có sẵn trên máy):

```bash
npm install -g @officecli/officecli   # có Node/npm
# hoặc: brew install officecli
```

Không dùng `curl | bash`, `wget | sh`, `irm | iex`, hoặc lệnh tự tải script từ URL.

## Đường dẫn nhanh (bắt buộc — chống chậm mỗi session)

**Trước khi** cài gì hay hỏi dài:

1. Skill `grilling` có trong danh sách skill khả dụng? → **không** cài lại.
2. `officecli --version` chạy được (exit 0)? → **không** cài lại.
3. Chỉ khi **thiếu** một trong hai → mới làm bước tương ứng.

Kiểm tra = đọc danh sách skill / chạy `--version` (vài giây). **Cấm** mỗi session: cài lại grilling/officecli nếu đã có.

## Tham chiếu nhanh

| Nhiệm vụ             | Cách thức                                                        |
| -------------------- | ----------------------------------------------------------------- |
| Lần đầu /setup       | Đảm bảo grilling → đảm bảo officecli                             |
| Session sau (đã sẵn) | Đường dẫn nhanh: chỉ kiểm tra 2 mục trên — bỏ qua cài lại       |
| Thiếu skill grilling | `npx skills add https://github.com/mattpocock/skills --skill grilling` |

## Các bước (thứ tự)

1. **Kiểm tra đường dẫn nhanh** (mục trên). Cả 2 mục OK → báo "đã sẵn" → dừng setup.
2. Kiểm tra `node --version` và `npm --version` nếu có bước cài package.
3. Thiếu skill `grilling` → xin phê duyệt rồi mới cài (`npx skills add https://github.com/mattpocock/skills --skill grilling`) → xác nhận gọi được.
4. Thiếu officecli → xin phê duyệt rồi mới cài (mục trên) → xác nhận lại `officecli --version`.
5. Báo user kết quả ngắn.

## Quy tắc quan trọng

- Không hardcode đường dẫn ổ đĩa.
- Thiếu skill `grilling` → xin phê duyệt trước khi chạy `npx skills add https://github.com/mattpocock/skills --skill grilling`.
- **Cấm** `officecli new <loại> --prompt "..."` cho giấy tờ hành chính BV. Chỉ dùng `officecli merge <template>.docx <output>.docx --data <fields>.json` trên runtime template có sẵn trong skill của phòng.
- Đọc `../officecli/references/output-safety.md` trước khi sinh file.

## Sau khi xong

Tóm tắt cho user: (1) skill grilling OK hay vừa cài, (2) officecli OK hay thiếu gì, (3) bước tiếp theo.
