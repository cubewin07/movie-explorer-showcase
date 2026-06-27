# Incident Response

> **Source**: `tooling/sources/github/anthropic-cybersecurity-skills/`
> **License**: Apache 2.0
> **Use when**: Security incident handling, digital forensics, containment, root cause analysis

## Overview
Guides the agent through incident response workflows including detection, containment, eradication, recovery, and post-incident activities. References DFIR skills from the cybersecurity collection.

## Relevant Skills
Load these from `tooling/sources/github/anthropic-cybersecurity-skills/skills/`:
- `acquiring-disk-image-with-dd-and-dcfldd/SKILL.md` - Disk forensics
- `performing-memory-forensics-with-volatility3/SKILL.md` - Memory analysis
- `building-incident-response-playbook/SKILL.md` - Playbook creation
- `detecting-command-and-control-over-dns/SKILL.md` - C2 detection
- Search `index.json` for: incident, forensic, response, containment, recovery

## IR Process (NIST SP 800-61)
1. **Preparation** - Tools, contacts, playbooks ready
2. **Detection & Analysis** - Identify and confirm the incident
3. **Containment** - Isolate affected systems
4. **Eradication** - Remove threat actors and artifacts
5. **Recovery** - Restore systems and verify integrity
6. **Post-Incident** - Lessons learned, report, improve
