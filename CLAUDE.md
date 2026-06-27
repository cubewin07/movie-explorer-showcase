# CLAUDE.md — Startup Router

> This file is the **entry point** for all AI coding agents.
> It is NOT the full knowledge base. Use it as the router and `tooling/skills/REGISTRY.md` as the index.

---

## Critical Startup Procedure

Before starting ANY task:

1. Read `tooling/skills/REGISTRY.md`.
2. Identify the task domain.
3. Load only the relevant skills.
4. Follow the loaded skills.
5. Mention loaded skills in the plan or final report.

Do not load the entire `tooling/skills/` folder blindly.
Do not treat `CLAUDE.md` as the full knowledge base.
Use `CLAUDE.md` as the router and `tooling/skills/REGISTRY.md` as the index.

---

## Baseline Principles (Always Active)

These four principles are always in effect. For the full version, see `tooling/skills/shared/karpathy-coding-principles.md`.

### 1. Think Before Coding
State assumptions explicitly. If uncertain, ask. If multiple interpretations exist, present them — don't pick silently.

### 2. Simplicity First
Minimum code that solves the problem. No features beyond what was asked. No speculative abstractions.

### 3. Surgical Changes
Touch only what you must. Don't "improve" adjacent code. Match existing style. Remove only what YOUR changes made unused.

### 4. Goal-Driven Execution
Transform tasks into verifiable goals. State a brief plan with verification steps. Loop independently with strong criteria.

---

## Project Structure

```
project-skill-setup/
├── CLAUDE.md              ← You are here (startup router)
├── AGENTS.md              ← Agent role-specific guidance
│
├── tooling/
│   ├── skills/
│   │   ├── REGISTRY.md    ← SKILL INDEX — read this first
│   │   ├── frontend/      ← React, UI, CSS, GSAP animations
│   │   ├── backend/       ← APIs, databases, Firebase, Cloud SQL
│   │   ├── security/      ← Cybersecurity, pentesting, OWASP
│   │   ├── devops/        ← Cloud Run, GKE, BigQuery, CI/CD
│   │   ├── game-dev/      ← Unity, terrain, shaders (placeholder)
│   │   ├── ai-agents/     ← Agent orchestration, RAG, knowledge graphs
│   │   ├── workflow/      ← Planning, TDD, code review, PRDs
│   │   └── shared/        ← Cross-domain: coding principles, debugging
│   │
│   ├── sources/
│   │   ├── github/        ← Raw cloned community repos
│   │   └── notes/         ← Manual notes and references
│   │
│   ├── config/            ← Configuration files (.env, package.json)
│   └── scripts/           ← Helper scripts (setup, compiler)
│
└── work/                  ← Working artifacts
    ├── plans/             ← Project implementation plans
    └── reports/
        ├── md/            ← Source Markdown reports
        └── html/          ← Compiled interactive HTML reports
```

---

## Skill Loading Rules

1. **Always read `tooling/skills/REGISTRY.md`** before starting work.
2. **Load `tooling/skills/shared/karpathy-coding-principles.md`** as baseline for all coding tasks.
3. **Match task to domain** — load only relevant domain skills.
4. **Skill wrappers point to source** — when a wrapper says "read full skill at `tooling/sources/github/.../SKILL.md`", load that file.
5. **Do not load security skills** unless the task involves security.
6. **Do not load all 754 cybersecurity skills** — use the index file to find relevant ones.
7. **Report which skills you loaded** in your plan or final output.
8. **Source Fallback** — if a skill wrapper pattern fails twice, fall back to the library's own `AGENTS.md`, `CLAUDE.md`, or `examples/` directory in `tooling/sources/github/`.
9. **Version Check** — if a skill has a `verified_version` field, verify the installed version in the workspace (using `pip show`, `npm list`, etc.) before following the documented patterns.

---

## Quick Domain Routing

| If the task involves... | Load skills from... |
|---|---|
| Web animations, GSAP, UI effects | `tooling/skills/frontend/` |
| APIs, databases, Firebase | `tooling/skills/backend/` |
| Security review, pentesting, threats | `tooling/skills/security/` |
| Cloud deployment, Kubernetes, CI/CD | `tooling/skills/devops/` |
| Unity, game development | `tooling/skills/game-dev/` |
| Agent orchestration, RAG, knowledge graphs | `tooling/skills/ai-agents/` |
| Planning, TDD, code review, PRDs | `tooling/skills/workflow/` |
| Debugging, architecture, general principles | `tooling/skills/shared/` |
