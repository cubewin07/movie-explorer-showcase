# Agent Skill Usage

This document explains how different agent roles should use the skill system.

---

## General Rules (All Agents)

1. **Always start by reading `CLAUDE.md`** — it's the startup router.
2. **Then read `tooling/skills/REGISTRY.md`** — it's the skill index.
3. **Load only relevant skills** — don't load everything.
4. **Report which skills you loaded** in your plan or output.
5. **Skill wrappers point to source files** — follow the path to `tooling/sources/github/.../SKILL.md` for full instructions.
6. **Reporting Output**: When generating interactive reports, agents must use the Interactive HTML Reporting workflow. **Agents must NEVER read HTML files directly** to save tokens. Agents should only read internal Markdown (`.md`) files.

---

## Hermes / Orchestrator Agent

- Use `CLAUDE.md` as startup policy.
- Use `tooling/skills/REGISTRY.md` before routing tasks to sub-agents.
- When assigning work, specify which skills the sub-agent should load.
- Load `tooling/skills/workflow/` skills for planning and task decomposition.
- Load `tooling/skills/ai-agents/superpowers-using-skills.md` for skill composition strategy.
- Load `tooling/skills/ai-agents/manage-skills.md` when adding, configuring, or removing agent skills.

**Typical skill chain**: `tooling/skills/workflow/superpowers-brainstorming.md` → `tooling/skills/workflow/superpowers-writing-plans.md` → `tooling/skills/workflow/superpowers-executing-plans.md`

---

## Coder Agent

- Load `tooling/skills/shared/karpathy-coding-principles.md` as baseline (always).
- Load domain-specific skills based on the task:
  - Frontend work → `tooling/skills/frontend/`
  - Backend work → `tooling/skills/backend/`
  - DevOps work → `tooling/skills/devops/`
  - Game dev → `tooling/skills/game-dev/`
- Load `tooling/skills/workflow/mattpocock-tdd.md` when writing tests.
- Do NOT load security skills unless the task involves security.
- Do NOT load all skills in a domain — pick the relevant ones.

---

## Security Agent

- Load `tooling/skills/security/anthropic-cybersecurity-index.md` to discover available security skills.
- Use the `index.json` in `tooling/sources/github/anthropic-cybersecurity-skills/` for programmatic skill discovery.
- Load specific security sub-skills based on task:
  - Threat modeling → `tooling/skills/security/threat-modeling.md`
  - Web security → `tooling/skills/security/web-security.md`
  - Cloud security → `tooling/skills/security/cloud-security.md`
  - Incident response → `tooling/skills/security/incident-response.md`
  - Secrets management → `tooling/skills/security/secrets-management.md`
- Also load relevant `tooling/skills/backend/` or `tooling/skills/devops/` skills when reviewing implementation.

---

## Reviewer Agent

- Load `tooling/skills/shared/karpathy-coding-principles.md` (always).
- Load `tooling/skills/workflow/superpowers-code-review.md` for review process.
- Load `tooling/skills/shared/mattpocock-diagnose.md` for diagnostic methodology.
- Load `tooling/skills/shared/mattpocock-architecture.md` for architecture review.
- Load domain-specific skills relevant to the code being reviewed.

---

## Planner Agent

- Load `tooling/skills/workflow/superpowers-brainstorming.md` for requirements.
- Load `tooling/skills/workflow/superpowers-writing-plans.md` for plan creation.
- Load `tooling/skills/workflow/mattpocock-grill-me.md` to interview the user.
- Load `tooling/skills/workflow/mattpocock-to-prd.md` for PRD generation.
- Load `tooling/skills/workflow/mattpocock-to-issues.md` for issue creation.
- Load `tooling/skills/workflow/mattpocock-triage.md` for backlog organization.
- Load `tooling/skills/ai-agents/manage-skills.md` for planning skill setup changes.

---

## Teaching Agent

- Load `tooling/skills/shared/mattpocock-teach.md` for teaching methodology.
- Load domain-specific skills relevant to the topic being taught.

## Troubleshooting: Source Fallback Protocol

If a skill wrapper's code example or API documentation fails to run in your workspace:
1. **Double Check Versions**: Verify the installed package version against the `verified_version` in the wrapper or registry.
2. **Escalate to Source**: Do not attempt to patch wrapper code from memory or guess API signatures. Navigate directly to the library's local upstream clone in `tooling/sources/github/`.
3. **Locate Ground Truth**: Inspect `AGENTS.md`, `CLAUDE.md`, or the `examples/` and `tests/` directories in the upstream repo to find the correct, updated API usage.
4. **Update the Wrapper**: Once you find the correct pattern and verify it works, update the skill wrapper file with the new pattern and the newly verified package version so future agents do not repeat the failure.
