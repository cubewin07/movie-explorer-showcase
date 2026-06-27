# Threat Modeling

> **Source**: `tooling/sources/github/anthropic-cybersecurity-skills/`
> **License**: Apache 2.0
> **Use when**: Performing threat modeling, attack surface analysis, security architecture review

## Overview
Guides the agent through structured threat modeling workflows. References specific skills from the Anthropic Cybersecurity Skills collection for threat analysis, attack surface mapping, and security architecture review.

## Relevant Skills
Load these from `tooling/sources/github/anthropic-cybersecurity-skills/skills/`:
- `analyzing-apt-group-with-mitre-navigator/SKILL.md` - APT analysis
- `analyzing-active-directory-acl-abuse/SKILL.md` - AD threat vectors
- `analyzing-sbom-for-supply-chain-vulnerabilities/SKILL.md` - Supply chain threats
- Search for additional skills using `index.json` with keywords: threat, attack, vulnerability

## Threat Modeling Process
1. Identify assets and trust boundaries
2. Map data flows and entry points
3. Identify threats using STRIDE/MITRE ATT&CK
4. Assess risk (likelihood x impact)
5. Define mitigations and controls
6. Document and review
