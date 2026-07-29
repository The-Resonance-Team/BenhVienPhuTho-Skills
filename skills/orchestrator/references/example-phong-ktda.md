# Example: phong-ktda calling orchestrator

This shows how a domain skill would set up the orchestrator for a "chỉ định thầu dịch vụ 50–dưới 500 triệu" workflow.

## Directory structure

```
/tmp/skill-run/phong-ktda/chi-dinh-thau-dich-vu/
├── fields.json          # All extracted/confirmed data
├── manifest.json        # Orchestrator config
└── output/              # Generated files land here (copied to workspace)
```

## manifest.json

```json
{
  "skill": "phong-ktda",
  "package": "chi-dinh-thau-dich-vu",
  "outputDir": "./output/phong-ktda/chi-dinh-thau-dich-vu/",
  "concurrency": 3,
  "fields": {},
  "templates": [
    {
      "slug": "don-de-xuat-ktda",
      "output": "01-don-de-xuat.docx",
      "depends": []
    },
    {
      "slug": "thu-moi-bao-gia-dich-vu",
      "output": "02-thu-moi-bao-gia.docx",
      "depends": []
    },
    {
      "slug": "du-toan-ktda",
      "output": "03-du-toan.docx",
      "depends": []
    },
    {
      "slug": "to-trinh-du-toan-khlcnt",
      "output": "04-to-trinh-du-toan.docx",
      "depends": []
    },
    {
      "slug": "qd-phe-duyet-du-toan-khlcnt",
      "output": "05-qd-duyet-du-toan.docx",
      "depends": ["04-to-trinh-du-toan.docx"]
    },
    {
      "slug": "thu-moi-hoan-thien-hop-dong",
      "output": "06-thu-moi-hoan-thien-hd.docx",
      "depends": ["05-qd-duyet-du-toan.docx"]
    },
    {
      "slug": "du-thao-hop-dong",
      "output": "07-du-thao-hop-dong.docx",
      "depends": ["05-qd-duyet-du-toan.docx"]
    },
    {
      "slug": "bien-ban-hoan-thien-hop-dong",
      "output": "08-bb-hoan-thien-hd.docx",
      "depends": ["07-du-thao-hop-dong.docx"]
    },
    {
      "slug": "to-trinh-kqlcnt",
      "output": "09-to-trinh-kqlcnt.docx",
      "depends": ["08-bb-hoan-thien-hd.docx"]
    },
    {
      "slug": "qd-phe-duyet-kqlcnt",
      "output": "10-qd-duyet-kqlcnt.docx",
      "depends": ["09-to-trinh-kqlcnt.docx"]
    },
    {
      "slug": "hop-dong",
      "output": "11-hop-dong-kinh-te.docx",
      "depends": ["10-qd-duyet-kqlcnt.docx"]
    },
    {
      "slug": "bbnt-cong-viec",
      "output": "12-bbnt-cong-viec.docx",
      "depends": ["11-hop-dong-kinh-te.docx"]
    },
    {
      "slug": "bbnt-khoi-luong-hoan-thanh",
      "output": "13-bbnt-khoi-luong.docx",
      "depends": ["12-bbnt-cong-viec.docx"]
    },
    {
      "slug": "bien-ban-thanh-ly-hop-dong",
      "output": "14-bb-thanh-ly.docx",
      "depends": ["13-bbnt-khoi-luong.docx"]
    },
    {
      "slug": "giay-de-nghi-thanh-toan",
      "output": "15-giay-de-nghi-thanh-toan.docx",
      "depends": ["14-bb-thanh-ly.docx"]
    }
  ]
}
```

## fields.json (example)

```json
{
  "TEN_GOI_THAU": "Dịch vụ tư vấn giám sát thi công xây dựng repairs",
  "DU_TOAN": "462569000",
  "DU_TOAN_BANG_CHU": "Bốn trăm sáu mươi hai triệu năm trăm sáu mươi chín nghìn đồng",
  "THOI_GIAN": "90 ngày",
  "SO_LUONG_GOI_THAU": "1",
  "QUY_LCNT": "Q3",
  "NAM_LCNT": "2026",
  "TEN_NHA_THAU": "",
  "MA_SO_THUE": "",
  "SO_HOP_DONG": "",
  "GIA_TRI_HD": "462569000",
  "PHONG_BAN": "Kế toán dự án",
  "NGAY_KY": "29",
  "THANG_KY": "07",
  "NAM_KY": "2026"
}
```

## Execution batches (resolved by orchestrator)

```
Batch 1 (parallel): 01, 02, 03, 04
Batch 2 (parallel): 05
Batch 3 (parallel): 06, 07
Batch 4 (parallel): 08
Batch 5 (parallel): 09
Batch 6 (parallel): 10
Batch 7 (parallel): 11
Batch 8 (parallel): 12
Batch 9 (parallel): 13
Batch 10 (parallel): 14
Batch 11 (parallel): 15
```

With concurrency=3, Batch 1 runs 3 workers, waits, runs the 4th, then Batch 2, etc.

## Error recovery example

If template 08 (bien-ban-hoan-thien-hop-dong) fails:

```
Results for phong-ktda — chi-dinh-thau-dich-vu:

✅ 01-don-de-xuat.docx
✅ 02-thu-moi-bao-gia.docx
✅ 03-du-toan.docx
✅ 04-to-trinh-du-toan.docx
✅ 05-qd-duyet-du-toan.docx
✅ 06-thu-moi-hoan-thien-hd.docx
✅ 07-du-thao-hop-dong.docx
❌ 08-bb-hoan-thien-hd.docx — validate failed: missing field TEN_NHA_THAU_DIA_CHI
⏭️ 09-to-trinh-kqlcnt.docx — skipped: missing dependency
⏭️ 10-qd-duyet-kqlcnt.docx — skipped: missing dependency
⏭️ 11-hop-dong-kinh-te.docx — skipped: missing dependency
⏭️ 12-bbnt-cong-viec.docx — skipped: missing dependency
⏭️ 13-bbnt-khoi-luong.docx — skipped: missing dependency
⏭️ 14-bb-thanh-ly.docx — skipped: missing dependency
⏭️ 15-giay-de-nghi-thanh-toan.docx — skipped: missing dependency

Files generated: 7/15
Output directory: ./output/phong-ktda/chi-dinh-thau-dich-vu/

--- ERROR REPORT (copy this to report to dev) ---
Skill: phong-ktda
Template: bien-ban-hoan-thien-hop-dong.docx
Step failed: validate
Error: missing field TEN_NHA_THAU_DIA_CHI — not in fields.json
Manifest: /tmp/skill-run/phong-ktda/chi-dinh-thau-dich-vu/manifest.json
Fields: /tmp/skill-run/phong-ktda/chi-dinh-thau-dich-vu/fields.json
Timestamp: 2026-07-29T10:30:00Z
--- END REPORT ---
```
