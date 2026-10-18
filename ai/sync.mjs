#!/usr/bin/env node
// Generates every tool's config from the canonical sources in ai/.
//   node ai/sync.mjs          write generated files
//   node ai/sync.mjs --check  exit 1 if anything is out of date
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const { mcpServers } = JSON.parse(readFileSync(join(root, "ai/mcp/servers.json"), "utf8"));
const SKILL_TARGETS = [".claude/skills", ".agents/skills"]; // Claude / Codex & others

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
const tomlStr = (s) => JSON.stringify(s);
const toml =
  "# Generated from ai/mcp/servers.json — do not edit. Run: node ai/sync.mjs\n" +
  Object.entries(mcpServers)
    .map(([name, s]) => {
      const lines = [`[mcp_servers.${name}]`, `command = ${tomlStr(s.command)}`];
      if (s.args) lines.push(`args = [${s.args.map(tomlStr).join(", ")}]`);
      return lines.join("\n");
    })
    .join("\n\n") +
  "\n";

const outputs = {
  ".mcp.json": json({ mcpServers }), // Claude Code
  ".cursor/mcp.json": json({ mcpServers }), // Cursor
  ".vscode/mcp.json": json({ servers: mcpServers }), // VS Code Copilot
  ".codex/config.toml": toml, // Codex
};

const listFiles = (dir, base = dir) =>
  existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? listFiles(join(dir, e.name), base) : [join(dir, e.name).slice(base.length)],
      )
    : [];

let stale = false;

for (const [rel, content] of Object.entries(outputs)) {
  const path = join(root, rel);
  if (read(path) === content) continue;
  stale = true;
  if (check) continue;
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

const src = join(root, "ai/skills");
const srcFiles = listFiles(src);
for (const target of SKILL_TARGETS) {
  const dst = join(root, target);
  const same =
    JSON.stringify(srcFiles) === JSON.stringify(listFiles(dst)) &&
    srcFiles.every((f) => read(join(src, f)) === read(join(dst, f)));
  if (same) continue;
  stale = true;
  if (check) continue;
  rmSync(dst, { recursive: true, force: true });
  cpSync(src, dst, { recursive: true });
}

if (check && stale) {
  console.error("AI config out of date. Run: node ai/sync.mjs");
  process.exit(1);
}
console.log(check ? "AI config up to date." : stale ? "AI config synced." : "Already up to date.");
