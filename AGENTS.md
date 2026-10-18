# Agent Instructions

All AI configuration for this repo lives in `ai/`. Before working, read and follow:

- `ai/rules/*.md` — project rules (start with `ai/rules/project.md`)
- `ai/skills/*/SKILL.md` — task playbooks; use the one matching the task
- `ai/mcp/servers.json` — MCP servers (already wired into each tool's config)

Do not add rules here or edit generated files (`.mcp.json`, `.cursor/mcp.json`, `.vscode/mcp.json`,
`.codex/config.toml`, `.claude/skills/`, `.agents/skills/`). Edit `ai/`, then run `node ai/sync.mjs`.
