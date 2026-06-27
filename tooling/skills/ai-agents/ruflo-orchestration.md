# Ruflo Multi-Agent Orchestration

> **Source**: `tooling/sources/github/ruflo/`
> **License**: MIT
> **Use when**: Deploying and coordinating intelligent, autonomous swarms of AI agents in parallel; implementing self-learning memory, PageRank graph reasoning, or background task loops in Claude Code.

## Overview
Ruflo (formerly Claude Flow) is a multi-agent AI harness and "nervous system" designed for Claude Code. It orchestrates specialized AI agents (e.g., architects, coders, testers, and reviewers) that collaborate in parallel, featuring persistent memory, self-learning loops, and a plugin registry.

---

## 🔌 Core Plugins & Ecosystem

Ruflo provides 33 modular plugins, including:

### 1. Orchestration & Core
- `ruflo-core`: Foundation daemon, health checks, and plugin discovery.
- `ruflo-swarm`: Coordinates parallel agent teams.
- `ruflo-autopilot`: Runs autonomous agent loops.
- `ruflo-loop-workers`: Schedules background tasks on a timer.

### 2. Memory & Knowledge
- `ruflo-agentdb`: Vector database for agent memories.
- `ruflo-rag-memory`: Smart retrieval with graph hops and diversity ranking.
- `ruflo-ruvector`: GPU-accelerated Search and Graph RAG.

### 3. Intelligence & Reasoning
- `ruflo-intelligence`: Self-learning loops that optimize future performance from successes.
- `ruflo-graph-intelligence`: PageRank and delta updates for graph reasoning.
- `ruflo-goals`: Decomposes large goals into plan milestones.

### 4. Specialized & Quality
- `ruflo-testgen`: Automatically generates missing unit tests.
- `ruflo-security-audit`: Vulnerability and CVE scanning.
- `ruflo-aidefence`: Prompts injection scanning, PII detection, and guardrails.
- `ruflo-neural-trader`: Swarm trading setup with backtesting tools.

---

## 🛠️ Setup & Initialization

You can set up Ruflo in your workspace using one of two methods:

### Method A: Claude Code Plugin (Lite)
For running custom slash commands and agent plugins directly inside Claude Code:
```bash
# Add the marketplace
/plugin marketplace add ruvnet/ruflo

# Install core and critical plugins
/plugin install ruflo-core@ruflo
/plugin install ruflo-swarm@ruflo
/plugin install ruflo-rag-memory@ruflo
```

### Method B: Full CLI Installation (Recommended for Swarms)
To install the full Ruflo daemon, auto-learning loop, workspace hooks, and register the Ruflo MCP Server:
```bash
npx ruflo init
```
This scaffolds:
- `.claude/` and `.claude-flow/` workspaces.
- Local helpers, settings, and daemon triggers.
- Active MCP server providing tool endpoints (`memory_store`, `swarm_init`, `agent_spawn`).
