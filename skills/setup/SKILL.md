---
name: setup
description: "Setup môi trường BV: (1) đảm bảo skill grilling có sẵn (nếu cần), (2) kiểm tra/cài officecli binary (docx/xlsx/pptx CLI cho AI agent), kiểm tra node/npm. Dùng ngay khi user nói setup, /setup, lần đầu, thiếu officecli, hoặc trước phong-hcqt / phong-dieu-duong."
---

# Setup — tooling (officecli)

## Tổng quan

Hai việc trong một skill:

1. **Grilling tooling** — đảm bảo skill `grilling` có sẵn (cài qua `npx skills add ... --skill grilling` nếu thiếu). Chỉ cần khi user muốn grilling thủ công.
2. **officecli tooling** — đảm bảo binary `officecli` có sẵn trên PATH (cài nếu thiếu).

Upstream: [`iOfficeAI/OfficeCLI`](https://github.com/iOfficeAI/OfficeCLI) — single-binary CLI, đọc/sửa/tạo `.docx`/`.xlsx`/`.pptx`. `phong-hcqt`/`phong-dieu-duong` dùng lệnh `officecli merge <template>.docx <output>.docx --data <fields>.json` để điền `{{KEY}}` trong template.

## Grilling tooling

Skill `grilling` (hỏi từng field một, có gợi ý mặc định). Nếu agent **không tìm thấy** skill `grilling`:

```bash
npx skills add https://github.com/mattpocock/skills --skill grilling
```

Cài xong → thử gọi lại skill `grilling`. Nếu vẫn không thấy, báo user rõ ràng.

Cần Node/npm (`npx`) trên máy — nếu thiếu, dùng cùng lúc với bước cài `officecli`.

## officecli tooling

Không vendor, không git-clone — một binary duy nhất trên PATH.

```
officecli --version    # đã cài → in version, thoát code 0
officecli               # bare invocation cũng tự install nếu thiếu (theo upstream)
```

Cài khi thiếu (ưu tiên theo thứ tự có sẵn trên máy):

```bash
npm install -g @officecli/officecli   # có Node/npm
# hoặc: curl -fsSL https://raw.githubusercontent.com/iOfficeAI/OfficeCLI/main/install.sh | bash
# hoặc: brew install officecli
```

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
2. Thiếu skill `grilling` → cài (`npx skills add https://github.com/mattpocock/skills --skill grilling`) → xác nhận gọi được.
3. Thiếu officecli → cài (mục trên) → xác nhận lại `officecli --version`.
4. Báo user kết quả ngắn.

## Quy tắc quan trọng

- Không hardcode đường dẫn ổ đĩa.
- Thiếu skill `grilling` → cài đúng lệnh `npx skills add https://github.com/mattpocock/skills --skill grilling`.
- **Cấm** `officecli new <loại> --prompt "..."` cho giấy tờ hành chính BV. Chỉ dùng `officecli merge <template>.docx <output>.docx --data <fields>.json` trên template có sẵn trong `assets/`.

## Sau khi xong

Tóm tắt cho user: (1) skill grilling OK hay vừa cài, (2) officecli OK hay thiếu gì, (3) bước tiếp theo.
