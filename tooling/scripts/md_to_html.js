const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// HTML Boilerplate with Tailwind CSS, typography plugin, and basic interactive JS
const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>__TITLE__</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.tailwindcss.com?plugins=typography"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        /* Custom styles can go here */
        body { background-color: #f8fafc; }
    </style>
</head>
<body class="antialiased text-gray-900 min-h-screen">
    <div class="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div class="px-6 py-8 sm:p-10">
                <article class="prose prose-slate prose-lg max-w-none prose-headings:text-indigo-900 prose-a:text-indigo-600 hover:prose-a:text-indigo-500">
                    __CONTENT__
                </article>
            </div>
        </div>
    </div>
    
    <script>
        // Optional: Add interactivity, e.g., finding tables and turning them into charts
        // This is a placeholder for custom JS logic to enhance the report
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Report loaded successfully.');
            // Add copy buttons to code blocks, etc.
        });
    </script>
</body>
</html>
`;

function convertMdToHtml(mdPath) {
    const absoluteMdPath = path.resolve(mdPath);
    
    if (!fs.existsSync(absoluteMdPath)) {
        console.error(`Error: Markdown file not found at ${absoluteMdPath}`);
        process.exit(1);
    }
    
    const repoRoot = path.join(__dirname, '..', '..');
    const configDir = path.join(repoRoot, 'tooling', 'config');
    let marked;
    try {
        const markedPath = require.resolve('marked', { paths: [configDir] });
        marked = require(markedPath).marked;
    } catch (e) {
        console.log("The 'marked' package is required. Installing in tooling/config/ via npm...");
        try {
            execSync('npm install --prefix tooling/config marked', { stdio: 'inherit', cwd: repoRoot });
            const markedPath = require.resolve('marked', { paths: [configDir] });
            marked = require(markedPath).marked;
        } catch (installError) {
            console.error("Failed to install 'marked' package.", installError);
            process.exit(1);
        }
    }

    const mdContent = fs.readFileSync(absoluteMdPath, 'utf8');
    const htmlContent = marked.parse(mdContent);
    
    const filename = path.basename(absoluteMdPath);
    const title = path.parse(filename).name.replace(/-/g, ' ');
    const titleCapitalized = title.charAt(0).toUpperCase() + title.slice(1);
    
    const finalHtml = HTML_TEMPLATE.replace('__TITLE__', titleCapitalized).replace('__CONTENT__', htmlContent);
    
    const htmlDir = path.join(repoRoot, 'work', 'reports', 'html');
    if (!fs.existsSync(htmlDir)) {
        fs.mkdirSync(htmlDir, { recursive: true });
    }
    
    const htmlFilename = path.parse(filename).name + '.html';
    const htmlPath = path.join(htmlDir, htmlFilename);
    
    fs.writeFileSync(htmlPath, finalHtml, 'utf8');
    console.log(`Successfully converted ${absoluteMdPath} to ${htmlPath}`);
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: node md_to_html.js <path_to_markdown_file>");
    process.exit(1);
}

convertMdToHtml(args[0]);
