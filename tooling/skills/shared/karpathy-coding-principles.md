# Karpathy Coding Principles

> **Source**: Root `CLAUDE.md` (original content preserved here)
> **License**: MIT (multica-ai/andrej-karpathy-skills)
> **Use when**: Coding, debugging, planning, reviewing code — always loaded as baseline

## Overview
Core behavioral guidelines derived from Andrej Karpathy's observations about common LLM coding mistakes. These four principles form the baseline discipline for all coding tasks.

## The Four Principles

### 1. Think Before Coding
- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First
- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

### 3. Surgical Changes
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.
- Remove only imports/variables/functions that YOUR changes made unused.

### 4. Goal-Driven Execution
- Transform tasks into verifiable goals with clear success criteria.
- State a brief plan with verification steps.
- Loop independently with strong criteria; ask for clarification with weak criteria.

## Validation
These guidelines are working if: fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
