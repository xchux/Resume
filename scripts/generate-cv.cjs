/**
 * Generates the downloadable text resumes (public/cv/*.docx) from locales/*.json.
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
const CONTENT_WIDTH = 9972; // A4 (11906) minus 2 x 967 margins, in DXA
const FONT = { ascii: 'Calibri', hAnsi: 'Calibri', eastAsia: 'Microsoft JhengHei' };

// Skill names live in template/page.tsx (as icon chips); keep both lists in sync.
const SKILLS = {
  frontend: ['HTML', 'CSS', 'Tailwind CSS'],
  backend: ['Python', 'Java', 'Node.js', 'Bash', 'PowerShell'],
  data: ['SQL', 'MySQL', 'AWS Athena', 'Airflow'],
  devOps: ['Docker', 'AWS'],
};

const LOCALES = [
  { file: 'en.json', out: 'Simon_Chu_CV_en.docx', lang: 'en-US' },
  { file: 'zh_TW.json', out: 'Simon_Chu_CV_zh-TW.docx', lang: 'zh-TW' },
];

const run = (text, opts = {}) => new TextRun({ text, font: FONT, size: 21, ...opts });

const heading = (text) => new Paragraph({
  spacing: { before: 280, after: 120 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 2 } },
  keepNext: true,
  children: [run(text.toUpperCase(), { bold: true, color: ACCENT, size: 24 })],
});

const titleLine = (left, right) => new Paragraph({
  spacing: { before: 140, after: 20 },
  keepNext: true,
  tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
  children: [run(left, { bold: true }), run(`\t${right}`, { color: MUTED })],
});

const bullet = (text) => new Paragraph({
  numbering: { reference: 'bullets', level: 0 },
  spacing: { after: 40 },
  children: [run(text)],
});

const link = (label, url) => new ExternalHyperlink({
  link: url,
  children: [run(label, { color: ACCENT, underline: {} })],
});

const sep = () => run('  |  ', { color: MUTED });

function buildDocument(data, lang) {
  const { profile, about, workExperience, education, project, skills, awards } = data;
  const children = [
    new Paragraph({
      spacing: { after: 40 },
      children: [run(profile.name, { bold: true, size: 44 })],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [run(profile.profession, { color: ACCENT, size: 26 })],
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        link(about.email, `mailto:${about.email}`), sep(),
        link('GitHub', about.github), sep(),
        link('LinkedIn', about.linkedin),
      ],
    }),

    heading(about.title),
    ...about.autobiography.map((text) => new Paragraph({
      spacing: { after: 80 }, alignment: AlignmentType.LEFT, children: [run(text)],
    })),

    heading(workExperience.title),
  ];

  workExperience.companies.forEach((c) => {
    children.push(titleLine(`${c.position} — ${c.name}`, c.duration));
    c.descriptions.forEach((d) => children.push(bullet(d)));
  });

  children.push(heading(education.title));
  education.schools.forEach((s) => {
    children.push(titleLine(s.name, s.duration));
    children.push(new Paragraph({ spacing: { after: 40 }, children: [run(s.degree)] }));
  });

  children.push(heading(project.title));
  project.projects.forEach((p) => {
    children.push(titleLine(p.name, p.duration));
    children.push(new Paragraph({ spacing: { after: 40 }, children: [run(p.profile, { color: MUTED })] }));
    p.descriptions.forEach((d) => children.push(bullet(d)));
  });

  children.push(heading(skills.title));
  Object.entries(SKILLS).forEach(([key, names]) => {
    children.push(new Paragraph({
      spacing: { after: 40 },
      children: [run(`${skills[key].title}: `, { bold: true }), run(names.join(', '))],
    }));
  });

  children.push(heading(awards.title));
  awards.projects.forEach((p) => {
    children.push(new Paragraph({ spacing: { before: 100, after: 20 }, keepNext: true, children: [run(p.name, { bold: true })] }));
    p.competitions.forEach((c) => children.push(bullet(`${c.ranking} — ${c.name}`)));
  });

  return new Document({
    creator: profile.name,
    title: `${profile.name} - ${profile.profession}`,
    language: lang,
    styles: { default: { document: { run: { font: FONT, size: 21 } } } },
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
          margin: { top: 1000, bottom: 1000, left: 967, right: 967 },
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
    const buffer = await Packer.toBuffer(buildDocument(data, lang));
    fs.writeFileSync(path.join(OUT_DIR, out), buffer);
    console.log(`wrote public/cv/${out} (${buffer.length} bytes)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
