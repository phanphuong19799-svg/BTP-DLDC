const fs = require('fs');
const path = require('path');

const mdFile = path.join(__dirname, 'tailieu', 'tailieuphantich', 'phantichtong.md');
const content = fs.readFileSync(mdFile, 'utf8');
const imagesDir = path.join(__dirname, 'tailieu', 'tailieuphantich');

const lines = content.split('\n');
const results = [];

lines.forEach((line, idx) => {
    const match = line.match(/!\[.*?\]\((\.\/images\/thuthap\/MH07_[^)]+)\)/);
    if (match) {
        const relPath = match[1];
        const absPath = path.join(imagesDir, relPath.replace('./', ''));
        let status = 'OK';
        let sizeKB = 0;
        if (!fs.existsSync(absPath)) {
            status = 'MISSING';
        } else {
            const stat = fs.statSync(absPath);
            sizeKB = Math.round(stat.size / 1024);
            if (stat.size <= 42000) status = 'PLACEHOLDER (generic 40KB)';
        }
        results.push({ line: idx + 1, relPath, status, sizeKB });
    }
});

console.log("=== MH07 Image Audit ===\n");
results.forEach(r => console.log(`Line ${r.line}: ${r.relPath}\n  => ${r.status} [${r.sizeKB}KB]\n`));
console.log(`Total: ${results.length} images found`);
