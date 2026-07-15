#Requires -Version 5.1
<#
.SYNOPSIS
    Dev environment setup script for Windows.
.DESCRIPTION
    Checks and installs: Node.js, Python 3.12, OfficeCLI, OpenCode, OpenWork.
    Uses winget -> choco -> direct download fallback chain.
.NOTES
    Run: .\scripts\setup.ps1
#>

$ErrorActionPreference = "Continue"

# --- Auto-elevate to admin ---
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "[*] Requesting admin privileges..." -ForegroundColor Yellow
    Start-Process powershell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
    exit
}

# --- Set Execution Policy for current user ---
Write-Host "`n[1/7] Setting Execution Policy (CurrentUser)..." -ForegroundColor Cyan
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
# [2/7] Node.js (npm comes bundled)
# ==========================================
Write-Host "`n[2/7] Checking Node.js..." -ForegroundColor Cyan
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
# [3/7] Python 3.12
# ==========================================
Write-Host "`n[3/7] Checking Python 3.12..." -ForegroundColor Cyan
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
# [4/7] OfficeCLI
# ==========================================
Write-Host "`n[4/7] Checking OfficeCLI..." -ForegroundColor Cyan
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
# [5/7] OpenCode
# ==========================================
Write-Host "`n[5/7] Checking OpenCode..." -ForegroundColor Cyan
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
# [6/7] OpenWork (Desktop App)
# ==========================================
Write-Host "`n[6/7] Checking OpenWork..." -ForegroundColor Cyan
$openworkInstalled = Get-ItemProperty "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*" -ErrorAction SilentlyContinue |
    Where-Object { $_.DisplayName -like "*OpenWork*" }
if ($openworkInstalled) {
    Write-Host "  [SKIP] OpenWork already installed" -ForegroundColor DarkGray
} else {
    $owUrl = "https://openworklabs.com/download"
    $owPath = "$env:TEMP\OpenWork-Setup.exe"
    Write-Host "  [*] Downloading OpenWork installer..." -ForegroundColor Yellow
    try {
        # Follow redirects to get actual download URL
        $response = Invoke-WebRequest -Uri $owUrl -MaximumRedirection 5 -UseBasicParsing
        $downloadUrl = $response.Content
        # Try to extract direct download link from page
        if ($downloadUrl -match '(https?://[^\s"]+\.exe[^\s"]*)') {
            $downloadUrl = $Matches[1]
        }
        if (Get-File -Url $downloadUrl -Out $owPath) {
            Write-Host "  [*] Installing OpenWork..." -ForegroundColor Yellow
            Start-Process $owPath -Wait -NoNewWindow
            Remove-Item $owPath -ErrorAction SilentlyContinue
            Write-Host "  [OK] OpenWork installed" -ForegroundColor Green
        }
    } catch {
        Write-Host "  [!] OpenWork install failed. Download manually from: https://openworklabs.com/download" -ForegroundColor Red
    }
}

# ==========================================
# [7/7] Summary
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
