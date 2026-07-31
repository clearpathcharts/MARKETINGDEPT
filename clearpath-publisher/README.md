# ClearPath Publisher — backend

Your own publishing engine. No Zapier. No Buffer.

- **Phase 2**: persistent queue (survives browser/PC restarts), scheduler that auto-sends approved posts at their scheduled time
- **Phase 3**: direct platform APIs — Telegram, Discord, Reddit, YouTube today; Facebook/Instagram/LinkedIn stay on the Cursor bridge until Meta/LinkedIn approve direct API access

## Start it

```powershell
cd "c:\Users\forex\Downloads\ALL EYES OS\clearpath-publisher"
npm install          # first time only
copy .env.example .env    # first time only — then fill in credentials
npm start
```

Server runs at `http://127.0.0.1:8787`. Open the glass console (`dashboard-glassmorphism/src/index.html`) — it detects the backend automatically and switches from copy-paste mode to live Dispatch buttons.

## How posting works

1. Compose in the console → Add to queue (saved on the server, not just the browser)
2. Click **Dispatch now** on a job — that click is your founder approval
3. Direct channels (Telegram/Discord/Reddit/YouTube) send immediately from this server
4. Bridge channels (Facebook/Instagram/LinkedIn) still produce a copy-package for Cursor until their APIs are approved
5. Scheduled posts: approve the job and the scheduler sends it at the scheduled time — even if the browser is closed (server must be running)

## Guardrails (enforced server-side)

- Calm / no-flash confirmation required
- Education-only confirmation required
- Nothing dispatches without explicit approval
- YouTube uploads default to **unlisted** for review before going public

## Credentials

See `.env.example` — each block has step-by-step instructions. Fill in only what you have; everything else shows "needs credentials" honestly in the console.
