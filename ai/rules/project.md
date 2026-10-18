# Resume — Project Rules

Part of the shared AI config in `ai/` (see `ai/README.md`). Applies to every AI tool.

## Project
Personal bilingual (en / zh-TW) resume site, statically exported to GitHub Pages.
Stack: Next.js 15 (Pages Router) · React 19 · TypeScript · Tailwind CSS 4 · Preline · next-intl · zod.

## Layout
- `pages/` — `index.tsx` (redirect), `en.tsx`, `zh-TW.tsx`; `_app.tsx` / `_document.tsx`
- `template/page.tsx` — shared page template rendered by both locale pages
- `components/` — `navbar.tsx`, `footer.tsx`
- `locales/en.json`, `locales/zh_TW.json` — all resume content (keys must stay identical)
- `types/page.ts` — content types / zod schema
- `out/`, `.next/` — build output; never edit

## Commands
Package manager: pnpm (a `package-lock.json` also exists; prefer `pnpm`).
- `pnpm dev` — dev server (turbopack) at http://localhost:3000
- `pnpm lint` — ESLint
- `pnpm build` — static export to `out/`
- `pnpm deploy` — build + publish `out/` to `gh-pages` (maintainer only; never run unprompted)
- CI: `.github/workflows/deploy.yml` lints, builds and publishes `out/` to `gh-pages` on every push to `main`

## Conventions
- Content changes go in `locales/*.json`, not in TSX. Update **both** locales together.
- Whenever web content changes (`locales/*.json`, or layout/section changes that affect what the resume shows),
  also regenerate the downloadable CVs: `node scripts/generate-cv.cjs` → `public/cv/*.docx`. The CV must stay
  one page; condense per the `CONDENSE` rules in the script instead of dropping the update. Commit the
  regenerated `.docx` files together with the content change.
- Keep components small, typed (no `any`), styled with Tailwind utilities; support dark mode.
- Mobile-first layouts; verify at narrow widths.
- Reply in Traditional Chinese; code, identifiers and commit messages in English.
- Commit style in this repo's history is gitmoji: `:sparkles: (Scope): Message`
  (e.g. `:sparkles: (Work Experience): Update Work Experience`). Follow it for commits here.
- Branch naming: `feature/<topic>`, `release/vX.Y`. Never commit directly to `main` or `gh-pages`.

## Definition of done
1. `pnpm lint` and `pnpm build` pass.
2. Both locale files have identical key structure.
3. If content changed, `public/cv/*.docx` was regenerated and is still one page.
4. No secrets or personal data beyond what is already published on the resume.

## Shared AI config
All AI settings live in `ai/`. Edit there, never in generated files; then run `node ai/sync.mjs`.
