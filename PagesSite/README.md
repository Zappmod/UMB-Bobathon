# IBM Bob Premium for Z — Bobathon Lab Guide Site

A React + Vite lab guide site styled with IBM Carbon-inspired branding. Hosts six hands-on labs for IBM Bob Premium for Z, and deploys automatically to GitHub Pages from the `Zappmod/UMB-Bobathon` repo.

**Live site:** [https://zappmod.github.io/UMB-Bobathon/](https://zappmod.github.io/UMB-Bobathon/)

---

## Labs

| Lab | Topic | Duration | Difficulty |
|-----|-------|----------|------------|
| Lab 1 | Getting Started — workspace scan, Agent.md, Data Dictionary | 20 min | Beginner |
| Lab 2 | Technical Design Document generation | 10–15 min | Beginner |
| Lab 3 | Impact Analysis — field change ripple analysis | 30 min | Beginner |
| Lab 4 | Refactoring & Service Extraction | 60 min | Intermediate |
| Lab 5 | Spec-Driven Code Generation | 45 min | Intermediate |
| Lab 6 | UI Modernization — green screen to web UI | 45 min | Intermediate |

---

## Default Credentials

- **Username:** `Bobathon_UMB`
- **Password:** `Mainframe2026!`

---

## Changing Credentials

Credentials are stored as SHA-256 hashes — never as plaintext in the source.

### Option A: Change via GitHub Secrets (recommended — no code change needed)

1. Generate your new hashes:
   ```bash
   node -e "const c=require('crypto'); console.log(c.createHash('sha256').update('your-username').digest('hex')); console.log(c.createHash('sha256').update('your-password').digest('hex'));"
   ```
2. In your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**
   - Add `VITE_USERNAME_HASH` = first hash
   - Add `VITE_PASSWORD_HASH` = second hash
3. Push any change to `main` to trigger a redeploy — the new credentials take effect immediately.

### Option B: Edit the source directly

Edit [`src/auth.js`](src/auth.js) and replace the `USERNAME_HASH` and `PASSWORD_HASH` constants with your new SHA-256 hashes, then push to `main`.

---

## Deploy to GitHub Pages

The GitHub Actions workflow at [`../.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml) handles deployment automatically on every push to `main` that changes files in `PagesSite/`.

### First-time setup

1. Add `VITE_USERNAME_HASH` and `VITE_PASSWORD_HASH` as repository secrets (**Settings → Secrets and variables → Actions**).
2. Push to `main` — the workflow builds and pushes to the `gh-pages` branch.
3. Enable GitHub Pages: **Settings → Pages → Source → Deploy from a branch → `gh-pages`**.

Your site will be live at:
```
https://zappmod.github.io/UMB-Bobathon/
```

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173/UMB-Bobathon/](http://localhost:5173/UMB-Bobathon/)

> **Note:** This is the public version hosted at `Zappmod/UMB-Bobathon`. The original IBM-internal version lives at `CE4S/BOB-for-Z-Bobathon`.

---

## Adding or Updating Lab Content

Lab content is served as static markdown from `public/lab-instructions/`. To add or update labs:

1. Edit or add `.md` files in `public/lab-instructions/`
2. Update `public/lab-instructions/index.json` with the new lab entry
3. Add any new images to `public/lab-instructions/images/`
4. Push to `main` — the site redeploys automatically

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Routing | react-router-dom v6 |
| Markdown | react-markdown + remark-gfm + rehype-raw |
| Diagrams | mermaid.js |
| Styling | Tailwind CSS + IBM Plex Sans/Mono |
| Deploy | GitHub Actions → gh-pages |
