/**
 * Generates the downloadable one-page resumes (public/cv/*.docx) from locales/*.json.
 * The web page shows everything; the CV keeps the highlights (see CONDENSE below).
 * Run after editing resume content:  node scripts/generate-cv.cjs
 * Requires the `docx` package (NODE_PATH="$(npm root -g)" works if it is installed globally).
 */
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, AlignmentType,
  LevelFormat, TabStopType, BorderStyle,
} = require('docx');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'cv');
const ACCENT = '0369A1';
const MUTED = '52667A';
const CONTENT_WIDTH = 10206; // A4 (11906) minus 2 x 850 margins, in DXA
const BODY_SIZE = 19; // half-points (9.5pt)
const PAGE_HEIGHT_PT = 842 - 2 * 36; // A4 minus top/bottom margins
const FONT = { ascii: 'Calibri', hAnsi: 'Calibri', eastAsia: 'Microsoft JhengHei' };

// Skill names live in template/page.tsx (as icon chips); keep both lists in sync.
const SKILLS = {
  frontend: ['HTML', 'CSS', 'Tailwind CSS'],
  backend: ['Python', 'Java', 'Node.js', 'Bash', 'PowerShell'],
  data: ['SQL', 'MySQL', 'AWS Athena', 'Airflow'],
  devOps: ['Docker', 'AWS'],
};

// What the one-page CV keeps from locales/*.json (indexes refer to the arrays there).
// Older / less relevant entries are omitted or reduced to a single line.
const CONDENSE = {
  autobiography: [0],
  companyBullets: [[0, 1, 2], [0, 2], [0, 2], [0], []], // per company, in locale order
  projects: [0, 1, 2], // recent learning projects; older ones are covered by Awards
  schools: [0], // university only
};

const LOCALES = [
  { file: 'en.json', out: 'Simon_Chu_CV_en.docx', lang: 'en-US' },
  { file: 'zh_TW.json', out: 'Simon_Chu_CV_zh-TW.docx', lang: 'zh-TW' },
];

const run = (text, opts = {}) => new TextRun({ text, font: FONT, size: BODY_SIZE, ...opts });

const heading = (text) => new Paragraph({
  spacing: { before: 160, after: 60 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 1 } },
  keepNext: true,
  children: [run(text.toUpperCase(), { bold: true, color: ACCENT, size: 22 })],
});

const titleLine = (left, right) => new Paragraph({
  spacing: { before: 80, after: 10 },
  keepNext: true,
  tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
  children: [run(left, { bold: true }), run(`\t${right}`, { color: MUTED })],
});

const bullet = (text) => new Paragraph({
  numbering: { reference: 'bullets', level: 0 },
  spacing: { after: 20 },
  children: [run(text)],
});

const link = (label, url) => new ExternalHyperlink({
  link: url,
  children: [run(label, { color: ACCENT, underline: {} })],
});

const sep = () => run('  |  ', { color: MUTED });

// "Honorable Mention x3, Silver medal" instead of listing every competition.
function summarizeRankings(competitions) {
  const counts = new Map();
  competitions.forEach((c) => counts.set(c.ranking, (counts.get(c.ranking) || 0) + 1));
  return [...counts].map(([ranking, n]) => (n > 1 ? `${ranking} ×${n}` : ranking)).join(', ');
}

// Rough layout estimate (no renderer available here): CJK glyphs count double.
function estimateHeightPt(data) {
  const { profile, about, workExperience, education, project, skills, awards } = data;
  const texts = [
    profile.name, profile.profession, about.email,
    ...CONDENSE.autobiography.map((i) => about.autobiography[i]),
    ...workExperience.companies.flatMap((c, i) => [
      `${c.position} — ${c.name} ${c.duration}`,
      ...CONDENSE.companyBullets[i].map((d) => `• ${c.descriptions[d]}`),
    ]),
    ...CONDENSE.schools.map((i) => `${education.schools[i].name} ${education.schools[i].degree}`),
    ...CONDENSE.projects.map((i) => project.projects[i].name),
    ...Object.keys(SKILLS).map((k) => `${skills[k].title}: ${SKILLS[k].join(', ')}`),
    ...awards.projects.map((p) => `${p.name}: ${summarizeRankings(p.competitions)}`),
  ];
  const LINE_UNITS = 118;
  const LINE_PT = 12;
  const headings = 6 * 22;
  return headings + texts.reduce((sum, text) => {
    const units = [...text].reduce((u, ch) => u + (ch.charCodeAt(0) > 0x2e80 ? 2 : 1), 0);
    return sum + Math.max(1, Math.ceil(units / LINE_UNITS)) * LINE_PT + 3;
  }, 0);
}

function buildDocument(data, lang) {
  const { profile, about, workExperience, education, project, skills, awards } = data;
  const children = [
    new Paragraph({
      spacing: { after: 40 },
      children: [run(profile.name, { bold: true, size: 40 })],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [run(profile.profession, { color: ACCENT, size: 24 })],
    }),
    new Paragraph({
      spacing: { after: 20 },
      children: [
        link(about.email, `mailto:${about.email}`), sep(),
        link('GitHub', about.github), sep(),
        link('LinkedIn', about.linkedin),
      ],
    }),

    heading(about.title),
    ...CONDENSE.autobiography.map((i) => new Paragraph({
      spacing: { after: 40 }, alignment: AlignmentType.LEFT, children: [run(about.autobiography[i])],
    })),

    heading(workExperience.title),
  ];

  workExperience.companies.forEach((c, i) => {
    children.push(titleLine(`${c.position} — ${c.name}`, c.duration));
    CONDENSE.companyBullets[i].forEach((d) => children.push(bullet(c.descriptions[d])));
  });

  children.push(heading(education.title));
  CONDENSE.schools.forEach((i) => {
    const s = education.schools[i];
    children.push(titleLine(`${s.name} — ${s.degree}`, s.duration));
  });

  children.push(heading(project.title));
  CONDENSE.projects.forEach((i) => {
    const p = project.projects[i];
    children.push(titleLine(`${p.name} (${p.profile})`, p.duration));
  });

  children.push(heading(skills.title));
  Object.entries(SKILLS).forEach(([key, names]) => {
    children.push(new Paragraph({
      spacing: { after: 10 },
      children: [run(`${skills[key].title}: `, { bold: true }), run(names.join(', '))],
    }));
  });

  children.push(heading(awards.title));
  awards.projects.forEach((p) => {
    children.push(new Paragraph({
      spacing: { after: 10 },
      children: [run(`${p.name}: `, { bold: true }), run(summarizeRankings(p.competitions))],
    }));
  });

  return new Document({
    creator: profile.name,
    title: `${profile.name} - ${profile.profession}`,
    language: lang,
    styles: { default: { document: { run: { font: FONT, size: BODY_SIZE } } } },
    numbering: {
      config: [{
        reference: 'bullets',
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 240 } } },
        }],
      }],
    },
    sections: [{
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 720, bottom: 720, left: 850, right: 850 },
        },
      },
      children,
    }],
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const { file, out, lang } of LOCALES) {
    const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'locales', file), 'utf8'));
    const height = Math.round(estimateHeightPt(data));
    console.log(`${file}: ~${height}pt of ${PAGE_HEIGHT_PT}pt`);
    if (height > PAGE_HEIGHT_PT) throw new Error(`${file} likely exceeds one page; trim CONDENSE`);
    const buffer = await Packer.toBuffer(buildDocument(data, lang));
    fs.writeFileSync(path.join(OUT_DIR, out), buffer);
    console.log(`wrote public/cv/${out} (${buffer.length} bytes)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
