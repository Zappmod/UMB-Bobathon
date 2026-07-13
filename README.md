# UMB-Bobathon

This repo contains the sample application and interactive lab guide site for the IBM Bob Premium for Z Bobathon.

## Contents

| Folder | Description |
|--------|-------------|
| `PagesSite/` | React + Vite lab guide website — deploys automatically to GitHub Pages |
| `Labs/` | Lab content and supporting materials |
| `Sample Code/` | GenApp COBOL sample application used in the labs |
| `CleanUpBob4z/` | Cleanup utilities for Bob for Z |

---

## Live Lab Guide Site

The interactive lab guide is hosted on GitHub Pages and deploys automatically on every push to `main`.

**Live site:** [https://zappmod.github.io/UMB-Bobathon/](https://zappmod.github.io/UMB-Bobathon/)

> **Note:** After the first push to this repo, you must enable GitHub Pages in the repo settings — see the setup steps below.

---

## First-Time GitHub Pages Setup

### 1. Add GitHub Secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret name | Description |
|---|---|
| `VITE_USERNAME_HASH` | SHA-256 hash of your chosen login username |
| `VITE_PASSWORD_HASH` | SHA-256 hash of your chosen login password |

Generate a hash:
```bash
node -e "const c=require('crypto'); console.log(c.createHash('sha256').update('yourvalue').digest('hex'));"
```

Default credentials (change these!):
- Username: `bobathon`
- Password: `BobPremiumZ2025!`

### 2. Push to `main`

The GitHub Actions workflow at [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) runs automatically on every push to `main` that touches `PagesSite/`. It builds the site and pushes the output to the `gh-pages` branch.

### 3. Enable GitHub Pages

In the repo: **Settings → Pages → Source → Deploy from a branch → select `gh-pages`**.

---

## Local Development (PagesSite)

```bash
cd PagesSite
npm install
npm run dev
```

Open [http://localhost:5173/UMB-Bobathon/](http://localhost:5173/UMB-Bobathon/)

---

## Important Notes

- There is also an improved prompt for use case 4 which you can copy the path.
- Please ensure that your copybook and z/OS folder contain the associated extensions prior to scanning the application.
- Your results will not always exactly match the images within the guide as technology advances.
