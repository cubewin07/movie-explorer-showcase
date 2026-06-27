# Skill Registry

> This is the master index of all available skills.
> Read this file before starting any task to identify which skills to load.

---

## Shared (Cross-Domain)

### Karpathy Coding Principles
- Path: `tooling/skills/shared/karpathy-coding-principles.md`
- Source: Root `CLAUDE.md` (original content)
- Use when: coding, debugging, planning, reviewing code — always loaded as baseline
- Load priority: **high** (load for every coding task)

### Defense-in-Depth Debugging
- Path: `tooling/skills/shared/superpowers-debugging.md`
- Source: `tooling/sources/github/superpowers/skills/debugging/defense-in-depth/`
- Use when: debugging complex issues, systematic troubleshooting
- Load priority: high

### Structured Diagnostics
- Path: `tooling/skills/shared/mattpocock-diagnose.md`
- Source: `tooling/sources/github/mattpocock-skills/skills/engineering/diagnose/`
- Use when: diagnosing bugs, understanding error patterns
- Load priority: medium

### Codebase Architecture Improvement
- Path: `tooling/skills/shared/mattpocock-architecture.md`
- Source: `tooling/sources/github/mattpocock-skills/skills/engineering/improve-codebase-architecture/`
- Use when: refactoring, architecture review, reducing tech debt
- Load priority: medium

### Personalized Teaching
- Path: `tooling/skills/shared/mattpocock-teach.md`
- Source: `tooling/sources/github/mattpocock-skills/skills/productivity/teach/`
- Use when: explaining concepts, creating learning sessions
- Load priority: low

### Windows Platform Compatibility Notes
- Path: `tooling/skills/shared/windows-platform-notes.md`
- Source: Custom Guide (internal templates)
- Use when: running scripts/tools on Windows, configuring encoding, resolving pathing, or Docker networking on Windows
- Load priority: high (when running on Windows host)

### Skill Maintenance and Verification Checklist
- Path: `tooling/skills/shared/skill-maintenance-checklist.md`
- Source: Custom Guide (internal templates)
- Use when: auditing, updating, or maintaining skill wrappers
- Load priority: medium (when modifying registry/skills)

---

## Frontend

### GSAP Core Animation
- Path: `tooling/skills/frontend/gsap-core.md`
- Source: `tooling/sources/github/gsap-skills/skills/gsap-core/`
- Use when: creating web animations with GSAP tweens, easing, staggers
- Load priority: high

### GSAP Timeline Sequencing
- Path: `tooling/skills/frontend/gsap-timeline.md`
- Source: `tooling/sources/github/gsap-skills/skills/gsap-timeline/`
- Use when: sequencing multiple animations, timeline control
- Load priority: high

### GSAP ScrollTrigger
- Path: `tooling/skills/frontend/gsap-scrolltrigger.md`
- Source: `tooling/sources/github/gsap-skills/skills/gsap-scrolltrigger/`
- Use when: scroll-based animations, pinning, scrubbing
- Load priority: high

### GSAP Plugins
- Path: `tooling/skills/frontend/gsap-plugins.md`
- Source: `tooling/sources/github/gsap-skills/skills/gsap-plugins/`
- Use when: ScrollTo, Flip, Draggable, SplitText, MorphSVG
- Load priority: medium

### GSAP + React Integration
- Path: `tooling/skills/frontend/gsap-react.md`
- Source: `tooling/sources/github/gsap-skills/skills/gsap-react/`
- Use when: GSAP animations in React applications
- Load priority: high (when using React)

### GSAP Performance Optimization
- Path: `tooling/skills/frontend/gsap-performance.md`
- Source: `tooling/sources/github/gsap-skills/skills/gsap-performance/`
- Use when: optimizing animation performance, 60fps
- Load priority: medium

### GSAP Framework Integration (Vue, Svelte)
- Path: `tooling/skills/frontend/gsap-frameworks.md`
- Source: `tooling/sources/github/gsap-skills/skills/gsap-frameworks/`
- Use when: GSAP in Vue or Svelte applications
- Load priority: medium (when using Vue/Svelte)

### GSAP Utility Functions
- Path: `tooling/skills/frontend/gsap-utils.md`
- Source: `tooling/sources/github/gsap-skills/skills/gsap-utils/`
- Use when: using GSAP helper functions (clamp, mapRange, random)
- Load priority: low

---

## Security

### Anthropic Cybersecurity Skills (Master Index)
- Path: `tooling/skills/security/anthropic-cybersecurity-index.md`
- Source: `tooling/sources/github/anthropic-cybersecurity-skills/`
- Use when: any cybersecurity task — start here to find specific skills
- Load priority: **high** (gateway to 754 security skills)
- Note: Use `tooling/sources/github/anthropic-cybersecurity-skills/index.json` for programmatic discovery

### Threat Modeling
- Path: `tooling/skills/security/threat-modeling.md`
- Source: `tooling/sources/github/anthropic-cybersecurity-skills/`
- Use when: threat modeling, attack surface analysis, security architecture review
- Load priority: high

### Web Application Security
- Path: `tooling/skills/security/web-security.md`
- Source: `tooling/sources/github/anthropic-cybersecurity-skills/`
- Use when: web security review, OWASP assessment, XSS/SQLi testing
- Load priority: high

### Cloud Security
- Path: `tooling/skills/security/cloud-security.md`
- Source: `tooling/sources/github/anthropic-cybersecurity-skills/` + `tooling/sources/github/google-skills/skills/well-architected/security/`
- Use when: cloud security review, AWS/Azure/GCP hardening
- Load priority: high

### Incident Response
- Path: `tooling/skills/security/incident-response.md`
- Source: `tooling/sources/github/anthropic-cybersecurity-skills/`
- Use when: security incident handling, digital forensics, containment
- Load priority: high

### Secrets Management
- Path: `tooling/skills/security/secrets-management.md`
- Source: `tooling/sources/github/anthropic-cybersecurity-skills/`
- Use when: API keys, passwords, certificates, secret rotation
- Load priority: high

---


## DevOps

### Google Cloud Run
- Path: `tooling/skills/devops/google-cloud-run.md`
- Source: `tooling/sources/github/google-skills/skills/cloud/cloud-run-basics/`
- Use when: deploying containerized apps to Cloud Run
- Load priority: high

### Google Kubernetes Engine (GKE)
- Path: `tooling/skills/devops/google-gke.md`
- Source: `tooling/sources/github/google-skills/skills/cloud/gke/`
- Use when: Kubernetes cluster management on GCP
- Load priority: high

### Google BigQuery
- Path: `tooling/skills/devops/google-bigquery.md`
- Source: `tooling/sources/github/google-skills/skills/cloud/bigquery/`
- Use when: data warehouse, SQL analytics, large-scale data processing
- Load priority: medium

### Google Cloud Well-Architected Framework
- Path: `tooling/skills/devops/google-well-architected.md`
- Source: `tooling/sources/github/google-skills/skills/well-architected/`
- Use when: cloud architecture design, infrastructure review
- Load priority: medium

### Google Cloud Operational Recipes
- Path: `tooling/skills/devops/google-cloud-recipes.md`
- Source: `tooling/sources/github/google-skills/skills/recipes/`
- Use when: cloud onboarding, authentication setup, network observability
- Load priority: low

---

## Backend

### Google Firebase
- Path: `tooling/skills/backend/google-firebase.md`
- Source: `tooling/sources/github/google-skills/skills/cloud/firebase/`
- Use when: Firestore, Firebase Auth, Cloud Functions, Hosting
- Load priority: high

### Google Cloud SQL
- Path: `tooling/skills/backend/google-cloud-sql.md`
- Source: `tooling/sources/github/google-skills/skills/cloud/cloud-sql/`
- Use when: managed relational databases on GCP
- Load priority: medium

### Google AlloyDB
- Path: `tooling/skills/backend/google-alloydb.md`
- Source: `tooling/sources/github/google-skills/skills/cloud/alloydb/`
- Use when: PostgreSQL-compatible database on GCP
- Load priority: low

---

## Workflow

### Interactive HTML Reporting
- Path: `tooling/skills/workflow/interactive-reporting.md`
- Source: Custom Script (`tooling/scripts/md_to_html.js`)
- Use when: converting markdown reports into interactive HTML for human readers
- Load priority: high (when user asks for an HTML report)
- Note: Requires Node.js (automatically installs `marked` via npm)

### Brainstorming & Requirements
- Path: `tooling/skills/workflow/superpowers-brainstorming.md`
- Source: `tooling/sources/github/superpowers/skills/brainstorming/`
- Use when: starting a new feature, clarifying requirements
- Load priority: high

### Writing Implementation Plans
- Path: `tooling/skills/workflow/superpowers-writing-plans.md`
- Source: `tooling/sources/github/superpowers/skills/writing-plans/`
- Use when: creating detailed implementation plans
- Load priority: high

### Executing Implementation Plans
- Path: `tooling/skills/workflow/superpowers-executing-plans.md`
- Source: `tooling/sources/github/superpowers/skills/executing-plans/`
- Use when: executing plans, dispatching subagents
- Load priority: high

### Code Review Process
- Path: `tooling/skills/workflow/superpowers-code-review.md`
- Source: `tooling/sources/github/superpowers/skills/requesting-code-review/` + `receiving-code-review/`
- Use when: submitting or receiving code reviews
- Load priority: high

### Test-Driven Development (TDD)
- Path: `tooling/skills/workflow/mattpocock-tdd.md`
- Source: `tooling/sources/github/mattpocock-skills/skills/engineering/tdd/`
- Use when: writing tests first, Red-Green-Refactor cycle
- Load priority: high

### Requirement Interview (Grill Me)
- Path: `tooling/skills/workflow/mattpocock-grill-me.md`
- Source: `tooling/sources/github/mattpocock-skills/skills/productivity/grill-me/`
- Use when: gathering requirements, resolving ambiguity
- Load priority: high

### Context Handoff
- Path: `tooling/skills/workflow/mattpocock-handoff.md`
- Source: `tooling/sources/github/mattpocock-skills/skills/productivity/handoff/`
- Use when: ending a session, preserving context for next session
- Load priority: medium

### PRD Generation
- Path: `tooling/skills/workflow/mattpocock-to-prd.md`
- Source: `tooling/sources/github/mattpocock-skills/skills/productivity/to-prd/`
- Use when: converting conversation into a Product Requirements Document
- Load priority: medium

### Issue Creation
- Path: `tooling/skills/workflow/mattpocock-to-issues.md`
- Source: `tooling/sources/github/mattpocock-skills/skills/productivity/to-issues/`
- Use when: converting requirements into trackable issues
- Load priority: medium

### Backlog Triage
- Path: `tooling/skills/workflow/mattpocock-triage.md`
- Source: `tooling/sources/github/mattpocock-skills/skills/productivity/triage/`
- Use when: organizing and prioritizing work
- Load priority: low

---

## AI Agents

### Manage Agent Skills
- Path: `tooling/skills/ai-agents/manage-skills.md`
- Source: Custom Guide (internal templates)
- Use when: User wants the agent to add, configure, classify, or remove skills in the system
- Load priority: **high** (whenever the task involves managing, adding, or removing skills)

### Writing New Agent Skills
- Path: `tooling/skills/ai-agents/superpowers-writing-skills.md`
- Source: `tooling/sources/github/superpowers/skills/writing-skills/`
- Use when: creating new skill files, extending the skill system
- Load priority: medium

### Using Agent Skills
- Path: `tooling/skills/ai-agents/superpowers-using-skills.md`
- Source: `tooling/sources/github/superpowers/skills/using-skills/`
- Use when: learning how to discover, load, and compose skills
- Load priority: high

### Google Gemini API
- Path: `tooling/skills/ai-agents/google-gemini-api.md`
- Source: `tooling/sources/github/google-skills/skills/cloud/gemini-api/`
- Use when: integrating Gemini AI models, LLM-powered features
- Load priority: high

### Google Agent Platform
- Path: `tooling/skills/ai-agents/google-agent-platform.md`
- Source: `tooling/sources/github/google-skills/skills/agent-platform/`
- Use when: building agents on Google's platform
- Load priority: medium

### CocoIndex RAG Pipeline
- Path: `tooling/skills/ai-agents/cocoindex-rag-pipeline.md`
- Source: `tooling/sources/github/cocoindex/skills/cocoindex/`
- Use when: building RAG pipelines, data indexing, semantic search
- Load priority: medium
- Verified version: `cocoindex>=1.0.10 (v1 API)`
- Note: Requires `pip install cocoindex` + PostgreSQL

### Graphiti Temporal Knowledge Graphs
- Path: `tooling/skills/ai-agents/graphiti-knowledge-graphs.md`
- Source: `tooling/sources/github/graphiti/`
- Use when: building agent memory systems, temporal knowledge graphs
- Load priority: medium
- Verified version: `graphiti-core>=0.29.2`
- Note: Requires `pip install graphiti-core` + Neo4j + OpenAI API key

### Ruflo Multi-Agent Orchestration
- Path: `tooling/skills/ai-agents/ruflo-orchestration.md`
- Source: `tooling/sources/github/ruflo/`
- Use when: swarm agent coordination, multi-agent parallel workflows, self-learning loops
- Load priority: high
- Note: Requires `npx ruflo init` or `/plugin install ruflo-core@ruflo` to run in Claude Code

### Mem0 Intelligent Memory Layer
- Path: `tooling/skills/ai-agents/mem0-memory.md`
- Source: `tooling/sources/github/mem0/`
- Use when: personalized agent memory, user preference tracking, self-improving long-term logs
- Load priority: high
- Verified version: `mem0ai>=2.0.6`
- Note: Requires MEM0_API_KEY for Platform cloud, or pip install mem0ai for self-hosted SDK

---

## Game Dev

*(No skills installed yet. Placeholder for future additions.)*
- Add Unity, terrain, shader, and optimization skills here.
- Consider contributing or finding community skill repos for game development.
