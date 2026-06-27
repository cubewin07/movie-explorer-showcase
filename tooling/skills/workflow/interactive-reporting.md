# Interactive HTML Reporting

> **Use when**: A complex or long task requires a comprehensive report, and you need to provide an interactive, beautifully styled HTML document for human users to read.

## Workflow Rules

**CRITICAL: Agents must NEVER read HTML files!**
Reading HTML files wastes tokens and context. Agents must ONLY read Markdown files.
Human users read HTML; AI agents read Markdown.

1. **Write the Markdown Report**: 
   - First, create the complete report in standard Markdown format.
   - Use headings, tables, code blocks, and other standard markdown features.
   - Save the markdown file in `reports/md/` (e.g., `reports/md/security-audit.md`).

2. **Convert to HTML**:
   - Once the markdown report is complete and saved, run the converter script.
   - Run command: `node scripts/md_to_html.js reports/md/<filename>.md`
   - The script will automatically install the `marked` npm package if it's missing.
   - The script will generate a corresponding `.html` file inside `reports/html/`.

3. **Deliver**:
   - Inform the user that the interactive HTML report is ready in `reports/html/`.
   - Never attempt to read the generated HTML file yourself. If you need to reference the report's contents, read your original file in `reports/md/`.
