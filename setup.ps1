#Requires -Version 5.1
<#
.SYNOPSIS
    Dev environment setup script for Windows.
.DESCRIPTION
    Checks and installs: Node.js, Python 3.12, OfficeCLI, OpenCode, OpenWork.
    Uses winget -> choco -> direct download fallback chain.
.NOTES
    Run: .\setup.ps1 -Department phong-cntt
#>

param(
    # Which department's skills to install. Omit for an interactive picker; tooling installs regardless.
    [string]$Department,
    # Dir where a previous cloud-sync left ALL skills. When set, removes other departments' phong-* there. Find it in the pilot: npx skills list --agent opencode --global
    [string]$CleanSkillsDir,
    # Preview cleanup deletions without removing anything.
    [switch]$DryRun
)

$ErrorActionPreference = "Continue"

# --- Auto-elevate to admin ---
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "[*] Requesting admin privileges..." -ForegroundColor Yellow
    $fwd = "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
    if ($Department)     { $fwd += " -Department `"$Department`"" }
    if ($CleanSkillsDir) { $fwd += " -CleanSkillsDir `"$CleanSkillsDir`"" }
    if ($DryRun)         { $fwd += " -DryRun" }
    Start-Process powershell -Verb RunAs -ArgumentList $fwd
    exit
}

# --- Set Execution Policy for current user ---
Write-Host "`n[1/8] Setting Execution Policy (CurrentUser)..." -ForegroundColor Cyan
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
Write-Host "  [OK] Execution Policy set to RemoteSigned" -ForegroundColor Green

# --- Helper: Check command exists ---
function Test-CommandExists {
    param([string]$Command)
    $null -ne (Get-Command $Command -ErrorAction SilentlyContinue)
}

# --- Helper: Try winget install ---
function Install-Winget {
    param([string]$Id, [string]$Name)
    if (-not (Test-CommandExists "winget")) { return $false }
    Write-Host "  [*] Trying winget install $Name..." -ForegroundColor Yellow
    $result = winget install --id $Id --silent --accept-package-agreements --accept-source-agreements 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  [OK] $Name installed via winget" -ForegroundColor Green
        return $true
    }
    Write-Host "  [!] winget failed for $Name" -ForegroundColor DarkYellow
    return $false
}

# --- Helper: Try choco install (bootstrap if needed) ---
function Install-Choco {
    param([string]$Package, [string]$Name)
    if (-not (Test-CommandExists "choco")) {
        Write-Host "  [*] Chocolatey not found, installing..." -ForegroundColor Yellow
        Set-ExecutionPolicy Bypass -Scope Process -Force
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1')) 2>&1
        if (-not (Test-CommandExists "choco")) {
            Write-Host "  [!] Failed to install Chocolatey" -ForegroundColor Red
            return $false
        }
        Write-Host "  [OK] Chocolatey installed" -ForegroundColor Green
    }
    Write-Host "  [*] Trying choco install $Name..." -ForegroundColor Yellow
    choco install $Package -y --no-progress 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  [OK] $Name installed via choco" -ForegroundColor Green
        return $true
    }
    Write-Host "  [!] choco failed for $Name" -ForegroundColor DarkYellow
    return $false
}

# --- Helper: Download file ---
function Get-File {
    param([string]$Url, [string]$Out)
    Write-Host "  [*] Downloading $Url ..." -ForegroundColor Yellow
    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        (New-Object System.Net.WebClient).DownloadFile($Url, $Out)
        return $true
    } catch {
        Write-Host "  [!] Download failed: $_" -ForegroundColor Red
        return $false
    }
}

# ==========================================
# [2/8] Node.js (npm comes bundled)
# ==========================================
Write-Host "`n[2/8] Checking Node.js..." -ForegroundColor Cyan
if (Test-CommandExists "node") {
    $nodeVer = node --version
    Write-Host "  [SKIP] Node.js $nodeVer already installed" -ForegroundColor DarkGray
} else {
    $installed = (Install-Winget -Id "OpenJS.NodeJS.LTS" -Name "Node.js")
    if (-not $installed) { $installed = (Install-Choco -Package "nodejs-lts" -Name "Node.js") }
    if (-not $installed) {
        $msiUrl = "https://nodejs.org/dist/v24.18.0/node-v24.18.0-x64.msi"
        $msiPath = "$env:TEMP\node-install.msi"
        if (Get-File -Url $msiUrl -Out $msiPath) {
            Write-Host "  [*] Installing Node.js via MSI..." -ForegroundColor Yellow
            Start-Process msiexec.exe -ArgumentList "/i `"$msiPath`" /qn /norestart" -Wait -NoNewWindow
            Remove-Item $msiPath -ErrorAction SilentlyContinue
            Write-Host "  [OK] Node.js installed via MSI" -ForegroundColor Green
        }
    }
}

# Refresh PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

# ==========================================
# [3/8] Python 3.12
# ==========================================
Write-Host "`n[3/8] Checking Python 3.12..." -ForegroundColor Cyan
$pythonOk = $false
if (Test-CommandExists "python") {
    $pyVer = python --version 2>&1
    if ($pyVer -match "3\.12") {
        Write-Host "  [SKIP] Python $pyVer already installed" -ForegroundColor DarkGray
        $pythonOk = $true
    }
}
if (-not $pythonOk) {
    $installed = (Install-Winget -Id "Python.Python.3.12" -Name "Python 3.12")
    if (-not $installed) { $installed = (Install-Choco -Package "python312" -Name "Python 3.12") }
    if (-not $installed) {
        $pyUrl = "https://www.python.org/ftp/python/3.12.7/python-3.12.7-amd64.exe"
        $pyPath = "$env:TEMP\python-install.exe"
        if (Get-File -Url $pyUrl -Out $pyPath) {
            Write-Host "  [*] Installing Python 3.12..." -ForegroundColor Yellow
            Start-Process $pyPath -ArgumentList "/quiet InstallAllUsers=0 PrependPath=1 Include_pip=1" -Wait -NoNewWindow
            Remove-Item $pyPath -ErrorAction SilentlyContinue
            Write-Host "  [OK] Python 3.12 installed" -ForegroundColor Green
        }
    }
}

# Refresh PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

# ==========================================
# [4/8] OfficeCLI
# ==========================================
Write-Host "`n[4/8] Checking OfficeCLI..." -ForegroundColor Cyan
if (Test-CommandExists "officecli") {
    Write-Host "  [SKIP] OfficeCLI already installed" -ForegroundColor DarkGray
} else {
    $installed = $false
    # Try npm first (if node is available)
    if (Test-CommandExists "npm") {
        Write-Host "  [*] Trying npm install @officecli/officecli..." -ForegroundColor Yellow
        npm install -g @officecli/officecli 2>&1 | Out-Null
        if (Test-CommandExists "officecli") {
            Write-Host "  [OK] OfficeCLI installed via npm" -ForegroundColor Green
            $installed = $true
        }
    }
    if (-not $installed) { $installed = (Install-Winget -Id "IOfficeAI.OfficeCLI" -Name "OfficeCLI") }
    if (-not $installed) { $installed = (Install-Choco -Package "officecli" -Name "OfficeCLI") }
    if (-not $installed) {
        $ocliScript = "$env:TEMP\install-officecli.ps1"
        if (Get-File -Url "https://raw.githubusercontent.com/iOfficeAI/OfficeCLI/main/install.ps1" -Out $ocliScript) {
            Write-Host "  [*] Running OfficeCLI installer..." -ForegroundColor Yellow
            powershell -NoProfile -ExecutionPolicy Bypass -File $ocliScript 2>&1 | Out-Null
            Remove-Item $ocliScript -ErrorAction SilentlyContinue
            if (Test-CommandExists "officecli") {
                Write-Host "  [OK] OfficeCLI installed" -ForegroundColor Green
            }
        }
    }
}

# ==========================================
# [5/8] OpenCode
# ==========================================
Write-Host "`n[5/8] Checking OpenCode..." -ForegroundColor Cyan
if (Test-CommandExists "opencode") {
    Write-Host "  [SKIP] OpenCode already installed" -ForegroundColor DarkGray
} else {
    $installed = $false
    if (Test-CommandExists "npm") {
        Write-Host "  [*] Trying npm install opencode..." -ForegroundColor Yellow
        npm install -g opencode 2>&1 | Out-Null
        if (Test-CommandExists "opencode") {
            Write-Host "  [OK] OpenCode installed via npm" -ForegroundColor Green
            $installed = $true
        }
    }
    if (-not $installed) { $installed = (Install-Winget -Id "Anomaly.OpenCode" -Name "OpenCode") }
    if (-not $installed) { $installed = (Install-Choco -Package "opencode" -Name "OpenCode") }
    if (-not $installed) {
        $ocScript = "$env:TEMP\install-opencode.sh"
        if (Get-File -Url "https://opencode.ai/install" -Out $ocScript) {
            Write-Host "  [*] Running OpenCode installer..." -ForegroundColor Yellow
            bash $ocScript 2>&1 | Out-Null
            Remove-Item $ocScript -ErrorAction SilentlyContinue
            if (Test-CommandExists "opencode") {
                Write-Host "  [OK] OpenCode installed" -ForegroundColor Green
            }
        }
    }
}

# ==========================================
# [6/8] OpenWork (Desktop App)
# ==========================================
Write-Host "`n[6/8] Checking OpenWork..." -ForegroundColor Cyan
$openworkInstalled = Get-ItemProperty "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*" -ErrorAction SilentlyContinue |
    Where-Object { $_.DisplayName -like "*OpenWork*" }
if ($openworkInstalled) {
    Write-Host "  [SKIP] OpenWork already installed" -ForegroundColor DarkGray
} else {
    try {
        Write-Host "  [*] Fetching latest OpenWork release info..." -ForegroundColor Yellow
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        $release = Invoke-RestMethod -Uri "https://api.github.com/repos/different-ai/openwork/releases/latest" -Headers @{ "User-Agent" = "BVPT-Setup-Script" }
        $asset = $release.assets | Where-Object { $_.name -like "openwork-win-x64-*.exe" } | Select-Object -First 1
        if (-not $asset) {
            throw "No win-x64 .exe asset found in latest release ($($release.tag_name))"
        }
        $owPath = "$env:TEMP\$($asset.name)"
        Write-Host "  [*] Latest version: $($release.tag_name)" -ForegroundColor Yellow
        if (Get-File -Url $asset.browser_download_url -Out $owPath) {
            Write-Host "  [*] Installing OpenWork $($release.tag_name)..." -ForegroundColor Yellow
            Start-Process $owPath -Wait -NoNewWindow
            Remove-Item $owPath -ErrorAction SilentlyContinue
            Write-Host "  [OK] OpenWork $($release.tag_name) installed" -ForegroundColor Green
        }
    } catch {
        Write-Host "  [!] OpenWork install failed: $_. Download manually from: https://github.com/different-ai/openwork/releases/latest" -ForegroundColor Red
    }
}

# ==========================================
# [7/8] Department skills (local, per-machine)
# ==========================================
Write-Host "`n[7/8] Installing department skills..." -ForegroundColor Cyan

# slug -> display name shown in the picker (ASCII so it renders on any Windows console / RDP)
$Departments = [ordered]@{
    "phong-hcqt"       = "Hanh chinh quan tri (HCQT)"
    "phong-dieu-duong" = "Dieu duong"
    "phong-qlcl"       = "Quan ly chat luong (QLCL)"
    "phong-cntt"       = "Cong nghe thong tin (CNTT)"
    "phong-ktda"       = "Ke toan du an (KTDA)"
    "phong-vattu"      = "Vat tu - TBYT"
    "phong-tccb"       = "To chuc can bo (TCCB)"
    "phong-dao-tao"    = "Dao tao"
    "phong-nckh-htqt"  = "NCKH & HTQT"
}

# Repo the skills CLI pulls from (public GitHub).
$SkillsRepo = "The-Resonance-Team/BenhVienPhuTho-Skills"

# Reject an invalid -Department, then fall through to the picker.
if ($Department -and -not $Departments.Contains($Department)) {
    Write-Host "  [!] Unknown department '$Department' — pick from the menu below." -ForegroundColor DarkYellow
    $Department = $null
}

# No department yet: show an interactive numbered menu.
if (-not $Department) {
    if (-not [Environment]::UserInteractive) {
        Write-Host "  [SKIP] Non-interactive and no -Department. Re-run: .\setup.ps1 -Department phong-cntt" -ForegroundColor DarkYellow
    } else {
        $slugs = @($Departments.Keys)
        Write-Host ""
        Write-Host "  =====================================================" -ForegroundColor Cyan
        Write-Host "    Select the department for THIS machine" -ForegroundColor White
        Write-Host "  =====================================================" -ForegroundColor Cyan
        for ($i = 0; $i -lt $slugs.Count; $i++) {
            Write-Host ("   {0,2}. {1,-26} [{2}]" -f ($i + 1), $Departments[$slugs[$i]], $slugs[$i]) -ForegroundColor White
        }
        Write-Host "    0. Skip - install tooling only, no skills" -ForegroundColor DarkGray
        Write-Host "  -----------------------------------------------------" -ForegroundColor Cyan
        do {
            $choice = Read-Host "  Enter a number (0-$($slugs.Count))"
            $n = 0
            $valid = [int]::TryParse($choice, [ref]$n) -and $n -ge 0 -and $n -le $slugs.Count
            if (-not $valid) { Write-Host "  [!] Please enter a number between 0 and $($slugs.Count)." -ForegroundColor Red }
        } until ($valid)
        if ($n -ge 1) { $Department = $slugs[$n - 1] }
    }
}

# Install/update the chosen department's skills (+ common officecli) via the skills CLI.
# Pulls the latest from GitHub into OpenCode's global skills dir. Re-run any time to update.
if (-not $Department) {
    Write-Host "  [SKIP] No department skills installed." -ForegroundColor DarkYellow
} elseif (-not (Test-CommandExists "npx")) {
    Write-Host "  [!] npx not found (Node.js step failed?). Cannot install skills." -ForegroundColor Red
} else {
    $skillArgs = @(
        "-y", "skills@latest", "add", $SkillsRepo,
        "--agent", "opencode", "--global", "--copy", "--yes",
        "--skill", "officecli", "--skill", $Department
    )
    Write-Host "  [*] npx skills add $SkillsRepo --skill officecli --skill $Department" -ForegroundColor Yellow
    & npx @skillArgs
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  [OK] Installed: officecli + $Department ($($Departments[$Department]))" -ForegroundColor Green
        Write-Host "  [i] This machine has ONLY this department + officecli." -ForegroundColor Cyan
        Write-Host "  [i] Update later:  npx -y skills@latest update --agent opencode --global" -ForegroundColor DarkGray
    } else {
        Write-Host "  [!] skills install failed (exit $LASTEXITCODE). Check network / repo access." -ForegroundColor Red
    }
}

# Optional cleanup: a previous org-wide cloud-sync may have left ALL departments'
# skills on this machine. When -CleanSkillsDir is given, remove the other phong-*
# skills there, keeping only this machine's department. Opt-in and whitelisted:
# only phong-* dirs that contain a SKILL.md, never the chosen department, never
# common skills (officecli/setup/grilling). -DryRun previews without deleting.
if ($Department -and $CleanSkillsDir) {
    if (-not (Test-Path $CleanSkillsDir)) {
        Write-Host "  [!] -CleanSkillsDir not found: $CleanSkillsDir" -ForegroundColor Red
    } else {
        $removed = 0
        Get-ChildItem -Path $CleanSkillsDir -Directory -Filter "phong-*" -ErrorAction SilentlyContinue | ForEach-Object {
            if ($_.Name -ne $Department -and (Test-Path (Join-Path $_.FullName "SKILL.md"))) {
                if ($DryRun) {
                    Write-Host "  [DRY] would remove other-dept skill: $($_.Name)" -ForegroundColor DarkYellow
                } else {
                    Remove-Item $_.FullName -Recurse -Force
                    Write-Host "  [OK] removed other-dept skill: $($_.Name)" -ForegroundColor Green
                }
                $removed++
            }
        }
        $verb = if ($DryRun) { "would remove" } else { "removed" }
        Write-Host "  [i] Cleanup: $verb $removed other-department skill(s) from $CleanSkillsDir; kept $Department." -ForegroundColor Cyan
    }
}

# ==========================================
# [8/8] Summary
# ==========================================
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host " Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nInstalled tools:" -ForegroundColor White
$snapshots = @(
    @{ Name = "Node.js"; Cmd = "node"; Arg = "--version" },
    @{ Name = "npm"; Cmd = "npm"; Arg = "--version" },
    @{ Name = "Python"; Cmd = "python"; Arg = "--version" },
    @{ Name = "OfficeCLI"; Cmd = "officecli"; Arg = "--version" },
    @{ Name = "OpenCode"; Cmd = "opencode"; Arg = "--version" }
)

foreach ($tool in $snapshots) {
    if (Test-CommandExists $tool.Cmd) {
        $ver = & $tool.Cmd $tool.Arg 2>&1 | Select-Object -First 1
        Write-Host "  [OK] $($tool.Name): $ver" -ForegroundColor Green
    } else {
        Write-Host "  [--] $($tool.Name): not found" -ForegroundColor DarkYellow
    }
}

Write-Host "`nOpenWork: Check Start Menu or Desktop shortcut" -ForegroundColor Green
Write-Host "`nDone. You may need to restart your terminal for PATH changes." -ForegroundColor Cyan
