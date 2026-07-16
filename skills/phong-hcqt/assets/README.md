# Runtime templates — `phong-hcqt`

`assets/` contains the only templates that a skill may use at runtime. The 23
`.docx` files below are sanitized copies; private source documents are not
stored in this repository.

## Available runtime assets

- `bbnt-khoi-luong-hoan-thanh.docx`
- `bien-ban-hoan-thien-hop-dong.docx`
- `bien-ban-thanh-ly-hop-dong.docx`
- `don-de-xuat.docx`
- `du-thao-hop-dong.docx`
- `du-toan.docx`
- `giay-de-nghi-thanh-toan.docx`
- `hop-dong.docx`
- `qd-phe-duyet-du-toan-khlcnt.docx`
- `qd-phe-duyet-kqlcnt.docx`
- `qtvh-01-bm01-du-tru-vat-tu.docx`
- `qtvh-01-bm02-danh-sach-ncc.docx`
- `qtvh-01-bm03-danh-gia-ncc-moi.docx`
- `qtvh-01-bm04-danh-gia-ncc-cu.docx`
- `qtvh-04-bm01-dieu-dong-xe.docx`
- `qtvh-04-bm02-dieu-dong-xe.docx`
- `qtvh-05-bm01-van-phong-pham.docx`
- `qtvh-05-bm02-van-phong-pham.docx`
- `thu-moi-hoan-thien-hop-dong.docx`
- `thu-moi-ky-hop-dong.docx`
- `to-trinh-du-toan-khlcnt.docx`
- `to-trinh-kqlcnt.docx`
- `yeu-cau-bao-gia.docx`

## Rebuilding from private source

If the hospital supplies an updated source bundle, keep it outside the repo
and build only sanitized runtime copies:

```bash
node scripts/build-runtime-assets.js \
  --source-root /approved/private/source-root \
  --skills phong-hcqt
```

Review the generated files, run the Office validation checklist in
`../../officecli/references/output-safety.md`, and remove any temporary source
copy after the review. Do not add `_seed`, unpacked XML, or original source
documents to git.
