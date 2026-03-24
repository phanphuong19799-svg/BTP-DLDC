const fs = require('fs');

const tgtFile = 'phantichtong.md';
let lines = fs.readFileSync(tgtFile, 'utf-8').split('\n');
let newLines = [];
let counts = { mota: 0, chuNang: 0 };

let currentSectionNum = null; // e.g. "4.1.1.2.1"

let i = 0;
while (i < lines.length) {
    let line = lines[i];
    const cr = line.endsWith('\r');
    const l = cr ? line.slice(0, -1) : line;
    const suffix = cr ? '\r' : '';

    // Track #### heading to get the section number
    // Pattern: #### 4.1.1.2.1. MH01 ... or #### 4.1.1.2.2. MH01.P01 ...
    if (l.startsWith('#### ')) {
        // Extract section number: first group of digits/dots
        const numMatch = l.match(/^####\s+([\d.]+)\./);
        if (numMatch) {
            // Remove trailing dot if any
            currentSectionNum = numMatch[1].replace(/\.$/, '');
        }
        newLines.push(line);
        i++;
        continue;
    }

    // Also reset on ### (parent section changes)
    if (l.startsWith('### ') || l.startsWith('## ') || l.startsWith('# ')) {
        currentSectionNum = null;
        newLines.push(line);
        i++;
        continue;
    }

    // Add number prefix to "Mô tả thông tin trên màn hình"
    if (l === 'Mô tả thông tin trên màn hình' && currentSectionNum) {
        newLines.push(`${currentSectionNum}.1 Mô tả thông tin trên màn hình` + suffix);
        counts.mota++;
        i++;
        continue;
    }

    // Add number prefix to "Chức năng trên màn hình"
    if (l === 'Chức năng trên màn hình' && currentSectionNum) {
        newLines.push(`${currentSectionNum}.2 Chức năng trên màn hình` + suffix);
        counts.chuNang++;
        i++;
        continue;
    }

    newLines.push(line);
    i++;
}

fs.writeFileSync(tgtFile, newLines.join('\n'));
console.log('Done!');
console.log(`Added section numbers to "Mô tả thông tin trên màn hình": ${counts.mota}`);
console.log(`Added section numbers to "Chức năng trên màn hình": ${counts.chuNang}`);

// Show a few examples
const result = fs.readFileSync(tgtFile, 'utf-8').split('\n');
let found = 0;
for (let j = 0; j < result.length && found < 6; j++) {
    const r = result[j].replace(/\r$/, '');
    if (r.match(/^\d+\.\d+.*Mô tả thông tin|^\d+\.\d+.*Chức năng trên/)) {
        console.log('  ' + r);
        found++;
    }
}
