# Simon Chu

Taiwan
* Web Resume (https://xchux.github.io/Resume/)
* LinkedIn (https://www.linkedin.com/in/simon-chu-tw)
* Medium (https://chu-chu.medium.com/)

---

# Simon Resume Web

This project is a personal resume website for Simon Chu, showcasing work experience, education, projects, skills, and awards. It supports both English and Traditional Chinese, with a clean, mobile-friendly design and dark mode support.


## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/) or [yarn]

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Run locally**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

This project is configured for static export and easy deployment to GitHub Pages:

1. **Build the static site**
   ```bash
   pnpm build
   # or
   npm run build
   ```

2. **Export static files** (Next.js will output to the `out/` directory)

3. **Deploy to GitHub Pages**
   - The script `npm run deploy` will build and publish the `out/` directory to the `gh-pages` branch using `gh-pages`.
   - Ensure your repository is set up for GitHub Pages to serve from the `/Resume` subdirectory.

## Tech Stack
- [Next.js](https://nextjs.org/) (static export mode)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Preline UI](https://preline.co/)
- [TypeScript](https://www.typescriptlang.org/)
- [next-intl](https://github.com/amannn/next-intl) (i18n)

## Directory Structure
- `pages/` — Next.js pages (including `/en` and `/zh-TW` for language support)
- `components/` — Navbar, Footer, and UI components
- `locales/` — Translation files (`en.json`, `zh_TW.json`)
- `public/` — Static assets (images, SVGs)
- `styles/` — Global CSS (Tailwind, Preline)
- `template/` — Main page template

## License

This project is for personal use. For other uses, please contact the author.
