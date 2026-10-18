# Simon Chu

Taiwan
* Web Resume (https://xchux.github.io/Resume/)
* LinkedIn (https://www.linkedin.com/in/simon-chu-tw)
* Medium (https://chu-chu.medium.com/)

---

# Simon Resume Web

This project is a personal resume website for Simon Chu, showcasing work experience, education, projects, skills, and awards. It supports both English and Traditional Chinese, with a clean, mobile-friendly design and dark mode support.


## Prerequisites
- [Node.js](https://nodejs.org/) (v22 recommended, same as CI)
- [pnpm](https://pnpm.io/) (v9; the lockfile is `pnpm-lock.yaml`)

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Run locally**
   ```bash
   pnpm dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

The site is a static export (`output: 'export'`, served under `/Resume`) hosted on GitHub Pages from the `gh-pages` branch.

### Automatic (CI/CD)

`.github/workflows/deploy.yml` runs on every push/merge to `main` (and manually via **Actions → Run workflow**):

1. `pnpm install --frozen-lockfile`
2. `pnpm lint`
3. `pnpm build` — static files are written to `out/`
4. Publish `out/` to the `gh-pages` branch (history is replaced by the latest build)

One-time repository setup:
- **Settings → Actions → General → Workflow permissions**: *Read and write permissions*
- **Settings → Pages → Source**: *Deploy from a branch* → `gh-pages` / `(root)`

### Manual (maintainer only)

```bash
pnpm build     # static export to out/
pnpm deploy    # build + publish out/ to gh-pages via the gh-pages package
```

Do not edit `out/` or `.next/` by hand; they are build output.

## Tech Stack
- [Next.js](https://nextjs.org/) (static export mode)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Preline UI](https://preline.co/) (stylesheet loaded from its CDN)
- [TypeScript](https://www.typescriptlang.org/)
- [next-intl](https://github.com/amannn/next-intl) (i18n)

## Directory Structure
- `pages/` — Next.js pages (including `/en` and `/zh-TW` for language support)
- `components/` — Navbar, Footer, and UI components
- `template/` — Main page template shared by both locales
- `types/` — Content types and zod schema (`page.ts`)
- `locales/` — Resume content (`en.json`, `zh_TW.json`; keys must stay identical)
- `public/` — Static assets (images, SVGs, downloadable CVs in `cv/`)
- `scripts/` — `generate-cv.cjs` builds `public/cv/*.docx` from `locales/*.json`
- `styles/` — Global CSS (Tailwind 4 theme tokens, Preline)
- `.github/workflows/` — CI/CD (deploy to GitHub Pages)
- `ai/` — Shared AI-assistant rules, skills and MCP config

## License

This project is for personal use. For other uses, please contact the author.
