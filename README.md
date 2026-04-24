# Herd Group — Website

Static site for herd-group.com.

## Deploy to Vercel

### Option 1: Drag-and-drop (fastest)

1. Zip this folder (already packaged for you if downloaded via the download card)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Drag the folder in, or click "Upload" and select the zip
4. Framework preset: **Other** (it's plain static HTML)
5. Root directory: leave as `.`
6. Build command: leave empty
7. Output directory: leave empty
8. Click **Deploy**

You'll get a live URL like `herd-xyz.vercel.app` in ~30 seconds.

### Option 2: Via GitHub (recommended for ongoing edits)

1. Push this folder to a new GitHub repo (public or private)
2. On Vercel, click "Import Project" → select the repo
3. Same settings as above → Deploy

Now every `git push` auto-deploys.

## Point herd-group.com at it

1. In Vercel → Project → **Settings → Domains**
2. Add `herd-group.com` and `www.herd-group.com`
3. Vercel gives you DNS records. Two common setups:
   - **A record** `@ → 76.76.21.21`
   - **CNAME** `www → cname.vercel-dns.com`
4. Paste those in your registrar (GoDaddy, Namecheap, etc.)
5. Wait 5–30 min for DNS to propagate. SSL auto-provisions.

## Files

- `index.html` — the homepage
- `components.jsx` — Nav, Hero, Journey, Contact, Footer
- `demonstration.jsx` — the AI pipeline section
- `investor.jsx` — Traction chart, Founder section
- `assets/` — images
- `logos/` — partner/logo SVGs (currently unused on homepage but kept for future)
- `vercel.json` — caching headers + clean URLs
- `Herd Logos.html` — separate logo-directions canvas (not linked from homepage)

## Local preview

Any static server works:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Stack

Zero build step. Pure HTML + React (via CDN) + inline JSX transpiled by Babel standalone. Every dependency is pinned and has an integrity hash — no package manager required.
