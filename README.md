# BenhVienPhuTho-Skills
Claude plugin skills for BVĐK tỉnh Phú Thọ — HCQT, Điều dưỡng, QLCL, CNTT, KTDA, Vật tư, TCCB, Đào tạo, NCKH&HTQT, officecli, setup, grilling

## Setup (máy Windows)

Lần đầu chạy `setup.ps1` trên máy mới, PowerShell có thể chặn vì chính sách thực thi script hoặc OneDrive gắn Zone-Identifier:

```powershell
# Lệnh này chạy được ngay — bypass policy lần đầu, script tự gỡ chặn cho các lần sau
powershell -ExecutionPolicy Bypass -File .\setup.ps1 -CheckOnly
```

Sau lần chạy đầu, `.\setup.ps1` chạy trực tiếp. Xem thêm tại [`docs/huong-dan-su-dung-skill.md`](docs/huong-dan-su-dung-skill.md).
