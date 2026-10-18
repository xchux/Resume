---
name: update-resume-content
description: Update resume content (work experience, projects, skills, education, awards) in both locales/en.json and locales/zh_TW.json. Use when the user asks to add, edit, reorder or translate resume entries.
---

# Update resume content

1. Read `locales/en.json` and `locales/zh_TW.json`, and `types/page.ts` for the expected shape.
2. Locate the section to change (e.g. `about`, work experience, projects) in **both** files.
3. Apply the edit to both files with identical key structure and array order. Translate faithfully:
   English is the source unless the user supplies zh-TW text.
4. Do not touch TSX unless a new field needs rendering; if so, update `types/page.ts` and `template/page.tsx` too.
5. Verify: `pnpm lint && pnpm build`; check key parity, e.g.
   `node -e "const f=o=>Object.keys(o).sort().join();const a=require('./locales/en.json'),b=require('./locales/zh_TW.json');console.log(f(a)===f(b))"`
6. Commit message style: `:sparkles: (Work Experience): Update Work Experience`.
