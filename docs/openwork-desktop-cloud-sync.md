# OpenWork Desktop — Cloud Sync Diagnosis & Fix

## Problem

OpenWork Desktop (v0.17.30) on macOS and Windows fails to sync plugins and models from the self-hosted OpenWork Cloud on `bvpt` (100.75.4.88).

### Symptoms

- Health check phase: `registration_failed` → `engine_needs_auth`
- MCP URL shows `https://api.openworklabs.com/mcp/agent` (default) instead of `https://openwork-bvpt.resonance.io.vn/api/den/mcp/agent`
- Engine delivery stuck at `pending / engine_reload`
- Plugin canaries missing: `openwork_docs_search`, `openwork_extension_list_actions`
- Plugin file hashes show ENOENT for `server/dist/opencode-plugins/*.js`

## Root Causes

### Bug 1: MCP URL defaults to hosted instead of deriving from bootstrap

The desktop's MCP config starts with `url: http://127.0.0.1:8788/mcp/agent` or the hosted default `https://api.openworklabs.com/mcp/agent`. The correct URL should derive from the bootstrap file `~/.config/openwork/desktop-bootstrap.json`:

```json
{
  "baseUrl": "https://openwork-bvpt.resonance.io.vn"
}
```

The app derives the MCP URL as `{baseUrl}/api/den/mcp/agent`. If the bootstrap file is missing or the app hasn't restarted after it's written, the default URL is used.

### Bug 2: Plugin health check looks in wrong path

`apps/server/src/cloud-mcp-health.ts:pluginFileHashes()` looks for plugins at:
```
server/dist/opencode-plugins/openwork-extensions-preview.js  (inside app.asar)
```

But plugins are packaged as `extraResources` at:
```
Contents/Resources/opencode-plugins/openwork-extensions-preview.js  (outside asar)
```

The actual plugin loading works fine — only the diagnostic hash check is broken.

### Bug 3: Cloudflare tunnel routing (resolved)

The tunnel at `openwork-bvpt.resonance.io.vn` routes to `ai-stack-den-web-1:3005`. The MCP endpoint is accessible via the Den Web proxy at `/api/den/mcp/agent`. The `api-bvpt.resonance.io.vn` hostname routes directly to `ai-stack-den-api-1:8788` but the `/mcp/agent` path returns 404 — MCP must go through Den Web proxy.

## Fix

### Step 1: Ensure bootstrap file exists

```bash
# macOS/Linux
mkdir -p ~/.config/openwork
cat > ~/.config/openwork/desktop-bootstrap.json << 'EOF'
{
  "baseUrl": "https://openwork-bvpt.resonance.io.vn",
  "requireSignin": false
}
EOF

# Windows (PowerShell)
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.config\openwork"
@"
{
  "baseUrl": "https://openwork-bvpt.resonance.io.vn",
  "requireSignin": false
}
"@ | Out-File -FilePath "$env:USERPROFILE\.config\openwork\desktop-bootstrap.json" -Encoding utf8
```

### Step 2: Restart OpenWork Desktop

The app reads the bootstrap file on startup. After restart, the MCP URL will derive correctly.

### Step 3: Verify

Open **Settings → Advanced** and check:

| Field | Expected Value |
|-------|---------------|
| Organization Server | `https://openwork-bvpt.resonance.io.vn` |
| API Endpoint | `https://openwork-bvpt.resonance.io.vn/api/den` |
| Cloud Agent (MCP) | `https://openwork-bvpt.resonance.io.vn/api/den/mcp/agent` |
| Delivery | `ready / startup` |
| Engine Status | `connected` |
| Cloud Tools | `search_capabilities, execute_capability` present |
| Plugin Canaries | `openwork_docs_search, openwork_extension_list_actions` present |

## Architecture

```
┌─────────────┐     ┌──────────────────┐     ─────────────────┐
│  Desktop    │────▶│  Cloudflare      │────▶│  bvpt Server    │
│  OpenWork   │     │  Tunnel          │     │  100.75.4.88    │
│  v0.17.30   │     │                  │     │                 │
│             │     │  openwork-bvpt   │     │  den-web:3005   │
│  bootstrap  │     │  .resonance.io.vn│     │    ↓ proxy      │
│  → baseUrl  │     │                  │     │  den-api:8788   │
└─────────────┘     ──────────────────┘     └─────────────────┘
       │                                              │
       │  MCP URL: {baseUrl}/api/den/mcp/agent        │
       ──────────────────────────────────────────────┘
```

### Key files

| File | Purpose |
|------|---------|
| `~/.config/openwork/desktop-bootstrap.json` | Bootstrap config — sets baseUrl for all endpoints |
| `~/Library/Application Support/com.differentai.openwork/openwork-workspaces.json` | Workspace state |
| `~/Library/Application Support/com.differentai.openwork/openwork-server-state.json` | Server port mapping |
| `~/Library/Application Support/com.differentai.openwork/openwork-server-tokens.json` | Auth tokens |
| `/Applications/OpenWork.app/Contents/Resources/opencode-plugins/` | Plugin JS files (macOS) |
| `/home/bvpt/ai-stack/openwork-cloud.env` | Server env config |
| `/home/bvpt/ai-stack/openwork-cloud-compose.yml` | Docker Compose |

### Server endpoints

| Service | URL |
|---------|-----|
| Den Web UI | `https://openwork-bvpt.resonance.io.vn` |
| API (via Den Web proxy) | `https://openwork-bvpt.resonance.io.vn/api/den` |
| MCP (via Den Web proxy) | `https://openwork-bvpt.resonance.io.vn/api/den/mcp/agent` |
| Inference | `https://api-bvpt.resonance.io.vn` (port 8791) |
| Docker Provisioner | `https://api-bvpt.resonance.io.vn` (port 8792) |

## Known Issues

### Plugin hash diagnostic (cosmetic)

The PLUGIN HASHES row in Advanced settings shows ENOENT even though plugins load correctly. This is because `cloud-mcp-health.ts` looks inside `app.asar` instead of `Contents/Resources/opencode-plugins/`. The fix requires patching the source and rebuilding the desktop app with code signing.

**Impact**: None — plugins work. Only the diagnostic display is wrong.

**Fix (source)**: In `apps/server/src/cloud-mcp-health.ts`, change `pluginFileHashes()` to use `openworkPluginPath()` from `openwork-extensions-plugin-path.ts` which correctly resolves `process.resourcesPath`.

### Windows devices

Same bootstrap file approach. Ensure the file exists at `%USERPROFILE%\.config\openwork\desktop-bootstrap.json` and restart the app.

## Troubleshooting

### MCP URL still shows default after restart

1. Check bootstrap file exists: `cat ~/.config/openwork/desktop-bootstrap.json`
2. Verify `baseUrl` is set correctly
3. Check the app reads it: Settings → Advanced → "Bootstrap file: ~/.config/openwork/desktop-bootstrap.json"
4. If still wrong, click "Clear server configuration" then restart

### Engine status shows "failed"

1. Check server is reachable: `curl https://openwork-bvpt.resonance.io.vn/api/health`
2. Check MCP endpoint: `curl -H "Authorization: Bearer <token>" https://openwork-bvpt.resonance.io.vn/api/den/mcp/agent`
3. Restart the app — it will re-authenticate

### Plugin canaries missing

1. Verify plugin files exist: `ls /Applications/OpenWork.app/Contents/Resources/opencode-plugins/`
2. Check the app version matches the server (both v0.17.30)
3. Restart the app to reload plugins
