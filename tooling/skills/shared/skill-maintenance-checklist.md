# Skill Maintenance and Verification Checklist

> **Verified:** AgentOS Skill Maintenance Procedure v1.0

This shared skill defines the standard operating procedure (SOP) for re-verifying, updating, and maintaining skill wrappers when underlying packages or libraries are upgraded.

---

## 1. Trigger Conditions for Skill Audit
A skill wrapper review must be triggered when:
1. **Library Upgrade**: A dependency in `package.json`, `pyproject.toml`, or `requirements.txt` is updated (especially major or minor version bumps).
2. **Failure Reports**: An agent or user reports a runtime error, such as `AttributeError`, `TypeError`, or `ValueError` in a skill-documented API call.
3. **Periodic Cadence**: Regular quarterly audit of all registered skill wrappers.

---

## 2. Re-Verification Procedure

Follow these steps to audit and re-verify a skill:

### Step 1: Identify Target Package & Version
Run package query commands in the target workspace environment:
```powershell
# Python package check
pip show package-name

# Node.js package check
npm list package-name
```

### Step 2: Retrieve Upstream Source Documentation
Before modifying any skill wrapper, check the local upstream repository checkout under `tooling/sources/github/`. Compare the current installed version's features with:
- The library's `AGENTS.md` or `CLAUDE.md` in its root directory.
- Code examples under `examples/` or `tests/`.
- The official upstream repository releases/changelog page.

### Step 3: Run Smoke Tests
Write or run a minimal integration test script in `scripts/` to confirm the code execution.
- Ensure the test environment matches the target OS.
- Verify the script runs successfully and does not crash.
- Ensure the script outputs ASCII-only messages on Windows console.

### Step 4: Update Skill Wrapper Document
Update the wrapper markdown file:
1. **Update verified version metadata**:
   Change the `> **Verified:** package>=x.y.z` blockquote at the top of the file to reflect the audited version.
2. **Synchronize code examples**:
   Ensure all Python/JS code snippets in the wrapper match the verified signature exactly.
3. **Document constraints or warnings**:
   Add notes on any compatibility issues found during testing (e.g., vector dimension limits, environment variables).

---

## 3. Library Changelog Links & Reference Directory

| Library | Local Upstream Code Path | Registry Reference |
|---|---|---|
| **CocoIndex** | [tooling/sources/github/cocoindex](file:///c:/.USER FOLDER/Projects/Project-skill-setup/tooling/sources/github/cocoindex) | `cocoindex-rag-pipeline.md` |
| **Mem0** | [tooling/sources/github/mem0](file:///c:/.USER FOLDER/Projects/Project-skill-setup/tooling/sources/github/mem0) | `mem0-memory.md` |
| **Graphiti** | [tooling/sources/github/graphiti](file:///c:/.USER FOLDER/Projects/Project-skill-setup/tooling/sources/github/graphiti) | `graphiti-knowledge-graphs.md` |
