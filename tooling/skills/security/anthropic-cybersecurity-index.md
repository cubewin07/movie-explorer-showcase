# Anthropic Cybersecurity Skills - Master Index

> **Source**: `tooling/sources/github/anthropic-cybersecurity-skills/`
> **License**: Apache 2.0
> **Use when**: Any cybersecurity task - threat hunting, incident response, vulnerability assessment, compliance, cloud security
> **Skills count**: 754 structured skills across 26 security domains

## Overview
Massive collection of AI agent cybersecurity skills following the agentskills.io standard. Each skill contains a `SKILL.md` with structured workflows mapped to MITRE ATT&CK, NIST CSF 2.0, MITRE ATLAS, D3FEND, and NIST AI RMF.

## How to Use
1. Browse `tooling/sources/github/anthropic-cybersecurity-skills/skills/` for available skills
2. Each skill directory contains a `SKILL.md` with complete workflow instructions
3. Use `tooling/sources/github/anthropic-cybersecurity-skills/index.json` for programmatic discovery
4. Skills are self-contained - load only the ones relevant to your task

## Domain Categories

### Threat Intelligence & Hunting
- APT group analysis, threat feed correlation, IoC analysis
- Example: `skills/analyzing-apt-group-with-mitre-navigator/SKILL.md`

### Vulnerability Management
- Scanning, patching, CVE analysis, attack surface management
- Example: `skills/analyzing-sbom-for-supply-chain-vulnerabilities/SKILL.md`

### Incident Response & Forensics
- DFIR workflows, disk imaging, memory forensics, containment
- Example: `skills/acquiring-disk-image-with-dd-and-dcfldd/SKILL.md`
- Example: `skills/performing-memory-forensics-with-volatility3/SKILL.md`

### Cloud Security
- AWS, Azure, GCP security monitoring and log analysis
- Example: `skills/analyzing-api-gateway-access-logs/SKILL.md`
- Example: `skills/analyzing-azure-activity-logs-for-threats/SKILL.md`

### Web Application Security
- OWASP Top 10, XSS, SQL injection, WAF configuration
- Example: `skills/detecting-ai-model-prompt-injection-attacks/SKILL.md`

### Network Security
- IDS/IPS, firewall rules, packet analysis, C2 detection
- Example: `skills/detecting-command-and-control-over-dns/SKILL.md`

### Malware Analysis
- Static/dynamic analysis, reverse engineering, Android malware
- Example: `skills/analyzing-android-malware-with-apktool/SKILL.md`

### Identity & Access Management
- Active Directory, SSO, MFA, RBAC, ACL analysis
- Example: `skills/analyzing-active-directory-acl-abuse/SKILL.md`

### Compliance & Governance
- PCI-DSS, HIPAA, SOC2, GDPR, privacy impact assessments
- Example: `skills/performing-soc2-type2-audit-preparation/SKILL.md`

### DevSecOps
- CI/CD security, SAST/DAST, container security, eBPF monitoring
- Example: `skills/implementing-ebpf-security-monitoring/SKILL.md`

### AI Security
- LLM guardrails, prompt injection detection, model security
- Example: `skills/implementing-llm-guardrails-for-security/SKILL.md`

## Full Source
Browse all 754 skills at: `tooling/sources/github/anthropic-cybersecurity-skills/skills/`
