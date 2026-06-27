# Secrets Management

> **Source**: `tooling/sources/github/anthropic-cybersecurity-skills/`
> **License**: Apache 2.0
> **Use when**: Managing API keys, passwords, certificates, secret rotation, preventing credential leaks

## Overview
Guides the agent through secrets management best practices: secure storage, rotation, access control, and leak prevention.

## Relevant Skills
Load from `tooling/sources/github/anthropic-cybersecurity-skills/skills/`:
- Search `index.json` for: secret, credential, key-management, vault, certificate

## Secrets Management Principles
1. **Never hardcode secrets** in source code
2. **Use secret managers** (Vault, AWS Secrets Manager, GCP Secret Manager)
3. **Rotate regularly** - automate rotation where possible
4. **Least privilege** - grant minimum access to secrets
5. **Audit access** - log all secret access
6. **Encrypt at rest** - secrets must be encrypted in storage
7. **Scan for leaks** - use tools like git-secrets, truffleHog, gitleaks
8. **Environment variables** - use for runtime config, not checked into VCS
