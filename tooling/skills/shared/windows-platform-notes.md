# Windows Platform Compatibility Notes

> **Verified:** Windows OS (Powershell, CMD, Bash on Windows)

This shared skill provides guidelines for running AgentOS tools and scripts on Windows platforms. It addresses common pitfalls related to character encoding, directory path formatting, shell-specific syntax, and Docker networking.

---

## 1. Character Encoding in Console Output

Windows Command Prompt (`cmd.exe`) and PowerShell default to system-specific active code pages (e.g., `cp1252`), which do not support Unicode characters like checkmarks (`✓`), emojis, or non-ASCII symbols. Attempting to print these will raise a `UnicodeEncodeError`.

### Best Practices
- **ASCII-only output**: In test scripts and CLI outputs, use ASCII symbols like `[OK]`, `[PASS]`, `[FAIL]`, `[ERROR]` instead of `✓` or `✗`.
- **Force UTF-8 Environment**: Instruct Python to use UTF-8 for standard input/output by setting the `PYTHONIOENCODING` environment variable:
  ```powershell
  # PowerShell
  $env:PYTHONIOENCODING="utf-8"
  ```
  ```cmd
  :: CMD
  set PYTHONIOENCODING=utf-8
  ```
- **UTF-8 in Python Code**: When opening files, always specify the encoding explicitly:
  ```python
  with open("file.txt", "r", encoding="utf-8") as f:
      content = f.read()
  ```

---

## 2. Directory Paths and File Linking

Windows uses backslashes (`\`) for file paths, whereas URL schemes (e.g., `file:///`) and POSIX systems use forward slashes (`/`).

### Best Practices
- **Use Raw Strings**: When defining Windows paths in Python code, prefix the string with `r` to prevent backslash escapes:
  ```python
  path = r"C:\path\to\project"
  ```
- **Forward Slashes in Python**: Python's `pathlib` and most file functions natively accept forward slashes even on Windows:
  ```python
  from pathlib import Path
  path = Path("C:/.USER FOLDER/Projects/Project-skill-setup")
  ```
- **Markdown File Links**: Ensure all `file:///` links use absolute paths with forward slashes:
  - Correct: `[link](file:///C:/.USER%20FOLDER/Projects/Project-skill-setup/README.md)`
  - Incorrect: `[link](file:///C:\.USER FOLDER\Projects\Project-skill-setup\README.md)`
- **Handle Spaces in Paths**: Path directories like `.USER FOLDER` contain spaces. Always wrap paths in double quotes in terminal commands:
  ```powershell
  node "C:\.USER FOLDER\Projects\Project-skill-setup\bin\cli.js"
  ```

---

## 3. Docker Networking on Windows

When running services (like PostgreSQL, Neo4j, or Redis) inside Docker containers on Windows, `localhost` or `127.0.0.1` inside the container does not point to the host machine.

### Best Practices
- **Host Resolution**: To connect from a container to a database running on the Windows host, use:
  ```
  host.docker.internal
  ```
- **Docker Compose Extra Hosts**: Ensure `host.docker.internal` is mapped in your `docker-compose.yml` if needed:
  ```yaml
  extra_hosts:
    - "host.docker.internal:host-gateway"
  ```

---

## 4. Environment Variables

Setting environment variables differs significantly between CMD, PowerShell, and bash.

| Platform / Shell | Command |
|---|---|
| **PowerShell** | `$env:VARIABLE_NAME="value"` |
| **CMD** | `set VARIABLE_NAME=value` |
| **Bash / Git Bash** | `export VARIABLE_NAME="value"` |

---

## 5. Line Endings (CRLF vs LF)

Windows uses carriage return and line feed (`\r\n`), whereas Unix systems use line feed (`\n`).
- **Git Config**: Set `git config --global core.autocrlf true` to automatically convert LF to CRLF on checkout, and CRLF to LF on commit.
- **Python File Reading**: Python's built-in `open()` uses "universal newlines" by default, which translates both `\r\n` and `\n` to `\n` in memory. Do not hardcode split operations on `\r\n`; use `.splitlines()` instead of `.split('\n')`.
