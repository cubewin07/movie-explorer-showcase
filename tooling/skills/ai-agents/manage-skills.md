# Manage Agent Skills

> **Source**: Custom Guide
> **License**: MIT
> **Use when**: User wants to add a new skill to the workspace, configure it, or remove an existing skill.
> **Load Priority**: High (whenever the task involves managing/adding/removing skills)

---

## 🏛️ Core Architectural Principles

When modifying the skill system, you MUST strictly adhere to the following architectural rules:

1. **Two-Tiered Structure**: Keep category wrappers (under `tooling/skills/`) thin and lightweight. They should document use cases, path, load priority, and then point directly to the full instructions located in `tooling/sources/github/` (cloned repositories) or `tooling/sources/notes/` (custom markdown guides) using standard `file:///` scheme.
2. **Zero Root Workspace Clutter**: All environment variables, credentials, and package dependencies must reside in the `tooling/config/` directory (e.g., `tooling/config/.env`, `tooling/config/package.json`). NEVER create configuration files, install `node_modules`, or create Python virtual environments directly at the root.
3. **Agent-Human Report Separation**: 
   - Humans read HTML reports compiled under `work/reports/html/`.
   - Agents read only Markdown reports under `work/reports/md/` to conserve token usage.
   - NEVER read compiled HTML reports. If a report is requested, write a Markdown file, then use the converter script:
     ```bash
     node tooling/scripts/md_to_html.js work/reports/md/your-report.md
     ```

---

## ⚡ How to Add and Configure a Skill

Follow these steps to add a new skill to the system:

### Step 1: Classify the Skill
Determine which domain category the skill belongs to:
* `shared/`: Generic, cross-domain coding, architecture, teaching, and debugging guidelines.
* `frontend/`: UI styling, animation (GSAP), React/Vue/Svelte components, web layout.
* `backend/`: API design, server frameworks, cloud databases (Firebase, Cloud SQL, AlloyDB).
* `devops/`: Deployment recipes, Kubernetes, Docker, CI/CD pipelines, cloud orchestration.
* `security/`: Threat modeling, incident response, vulnerability assessment (OWASP), cloud security hardening.
* `workflow/`: Agile processes, TDD, requirements interviews, PRD templates, triage, handoff.
* `ai-agents/`: Agent frameworks, swarm orchestration, memory databases (Mem0, CocoIndex, Graphiti).
* `game-dev/`: Game engines, shaders, physics, game assets.

### Step 2: Install the Source Code
* **If it is a community or git repository**: Run a shallow clone into `tooling/sources/github/` to keep it lightweight:
   ```bash
   git clone --depth 1 https://github.com/username/repo.git "tooling/sources/github/repo-name"
   ```
* **If it is a custom guide**: Create a structured Markdown file under `tooling/sources/notes/<guide-name>.md`.

### Step 3: Create the Category Wrapper
Create a markdown file under `tooling/skills/<domain>/<skill-basename>.md`. It must follow this template:
```markdown
# [Skill Title]

> **Source**: `tooling/sources/github/repo-name/path/to/SKILL.md` (or `tooling/sources/notes/guide-name.md`)
> **License**: [License type, e.g. MIT]
> **Use when**: [Clear description of when this skill should be loaded by an agent]

## Overview
[Concise summary of the skill's purpose and capabilities]

## Key Topics
- [Topic 1]
- [Topic 2]

## Full Instructions
Read the complete instruction file at: [link name](file:///absolute/path/to/tooling/sources/github/repo-name/path/to/SKILL.md)
```

### Step 4: Configure Dependencies and Environment
* **Node.js dependencies**: If the skill requires npm libraries, add them to `tooling/config/package.json` and install them inside `tooling/config/` via running `npm install` inside that directory.
* **Python dependencies**: If the skill requires python packages, run pip install inside the project's virtual environment `.venv`:
  ```bash
  .\.venv\Scripts\pip install packages   # On Windows
  ./.venv/bin/pip install packages       # On macOS/Linux
  ```
* **Database / Backend services**: If the skill needs services (e.g., PostgreSQL, Neo4j), set up Docker run instructions and document how to start them.
* **Environment variables**: Write credentials or URIs to `tooling/config/.env` using the following keys:
  ```env
  YOUR_NEW_SKILL_API_KEY=your_key_here
  ```

### Step 5: Register the Skill in the Catalog
Open [tooling/skills/REGISTRY.md](file:///c:/.USER%20FOLDER/Projects/Project-skill-setup/tooling/skills/REGISTRY.md), locate the matching domain section, and append a registry entry:
```markdown
### [Skill Title]
- Path: `tooling/skills/<domain>/<skill-basename>.md`
- Source: `tooling/sources/github/repo-name/` (or `tooling/sources/notes/guide-name.md`)
- Use when: [Brief statement on when to load]
- Load priority: [high / medium / low]
- Note: [Optional - mention dependencies like Postgres, API keys, etc.]
```

### Step 6: Update Agent Routing Policies
* **AGENTS.md**: Open [AGENTS.md](file:///c:/.USER%20FOLDER/Projects/Project-skill-setup/AGENTS.md) and assign the skill to the appropriate agent roles (Hermes, Coder, Security, Reviewer, Planner, etc.) by listing the path under their domain/role section.
* **CLAUDE.md**: If the skill contains core coding guidelines that should be active for *all* agents at startup, append them to [CLAUDE.md](file:///c:/.USER%20FOLDER/Projects/Project-skill-setup/CLAUDE.md) under the "Skill Loading Rules" or "Quick Domain Routing".

---

## 🗑️ How to Remove a Skill

Follow these steps to safely remove a skill:

1. **Delete Wrapper**: Delete the wrapper markdown file at `tooling/skills/<domain>/<skill-basename>.md`.
2. **Unregister**: Open `tooling/skills/REGISTRY.md` and delete the skill entry.
3. **Clean Up Routing**: 
   - Remove references to the skill in `AGENTS.md`.
   - Remove references to the skill in `CLAUDE.md` if any exist.
4. **Prune Source Code**: If the cloned repository or custom guide under `tooling/sources/github/` or `tooling/sources/notes/` is no longer used by any other skills, delete its directory to free up disk space and keep the workspace lean.

---

## 🔬 Verification Checklist

After adding or removing a skill, run the following verification checks:
1. **File Existence Check**: Ensure wrapper paths point to valid existing files.
2. **Registry Sync Check**: Ensure every wrapper under `tooling/skills/` has an active entry in `tooling/skills/REGISTRY.md`.
3. **Syntax Validation**: Ensure any updated `.json` or `.md` files contain valid formats.
4. **Environment Check**: Ensure `.env.example` is updated to include placeholders for any new variables.
