# ai/ — shared AI config

Single place for rules, skills and MCP servers. Every AI tool is pointed here.

```
ai/
├── rules/*.md            # project rules (add more files freely)
├── skills/<name>/SKILL.md# task playbooks (Agent Skills format)
├── mcp/servers.json      # canonical MCP list; no secrets, use env vars
└── sync.mjs              # generates per-tool files below
```

| Tool | Entry point | Generated / pointer |
|---|---|---|
| Claude Code | `CLAUDE.md` (`@AGENTS.md`, `@ai/rules/project.md`) | `.mcp.json`, `.claude/skills/` |
| Codex | `AGENTS.md` | `.codex/config.toml`, `.agents/skills/` |
| Cursor | `AGENTS.md`, `.cursor/rules/project.mdc` | `.cursor/mcp.json` |
| VS Code Copilot | `AGENTS.md` | `.vscode/mcp.json` |

## Workflow
- Add a rule: new file in `ai/rules/`, mention it in `AGENTS.md` only if it needs special ordering.
- Add a skill: `ai/skills/<name>/SKILL.md`, then `node ai/sync.mjs`.
- Add an MCP server: edit `ai/mcp/servers.json`, then `node ai/sync.mjs`.
- CI / pre-commit: `node ai/sync.mjs --check`.
