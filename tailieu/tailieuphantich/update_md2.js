const fs = require('fs');

const srcFile = 'danhsachmanhinh.md';
const tgtFile = 'phantichtong.md';

// Build map: hashScreenId -> { maManHinh (col4), maUC (col10) }
const lines = fs.readFileSync(srcFile, 'utf-8').split('\n');
const map = {};

lines.forEach(l => {
    const parts = l.split('|').map(s => s.trim());
    if (parts.length > 10 && parts[1] && parts[1] !== '**STT**' && parts[1] !== '---') {
        const maManHinh = parts[4];  // Mã Màn hình (DC1-UC001-MH1)
        let hashScreenId = parts[6]; // # Mã Màn hình (mamanhinh.md)
        const maUC = parts[10];       // Mã UC (*) (DC1-UC001)

        if (hashScreenId && hashScreenId.startsWith('#')) {
            hashScreenId = hashScreenId.substring(1).trim();
        }
        if (hashScreenId) {
            if (!map[hashScreenId]) {
                map[hashScreenId] = { maManHinhs: new Set(), maUCs: new Set() };
            }
            if (maManHinh) map[hashScreenId].maManHinhs.add(maManHinh);
            if (maUC) map[hashScreenId].maUCs.add(maUC);
        }
    }
});

// Update phantichtong.md
let tgtLines = fs.readFileSync(tgtFile, 'utf-8').split('\n');
let newLines = [];
let modified = false;
let updatedCount = 0;

let i = 0;
while (i < tgtLines.length) {
    const line = tgtLines[i];

    // Skip old lines added by previous run
    if (line.trimEnd().match(/^- \*\*Mã chức năng:\*\*/) || line.trimEnd().match(/^- \*\*Mã màn hình\/API:\*\*/)) {
        i++;
        // also skip the blank line after if there is one
        if (i < tgtLines.length && tgtLines[i].trim() === '') {
            i++;
        }
        modified = true;
        continue;
    }

    newLines.push(line);

    // Look for heading like #### ... MH... entry
    const match = line.match(/^####\s+(?:[0-9]+\.)+\s+(MH[A-Za-z0-9.]+)\s?/);
    if (match) {
        const screenId = match[1];
        if (map[screenId]) {
            updatedCount++;
            const maManHinh = Array.from(map[screenId].maManHinhs).join(', ');
            const maUC = Array.from(map[screenId].maUCs).join(', ');

            // Check next few lines to see if already inserted
            let alreadyHas = false;
            for (let j = i + 1; j < tgtLines.length && j < i + 5; j++) {
                if (tgtLines[j].includes('Mã màn hình:') || tgtLines[j].includes('Mã UC:')) {
                    alreadyHas = true;
                    break;
                }
                if (tgtLines[j].startsWith('#')) break;
            }

            if (!alreadyHas) {
                newLines.push(`- **Mã UC:** ${maUC}`);
                newLines.push(`- **Mã màn hình:** ${maManHinh}`);
                newLines.push('');
                modified = true;
            }
        }
    }
    i++;
}

if (modified) {
    fs.writeFileSync(tgtFile, newLines.join('\n'));
    console.log(`Done! Processed ${updatedCount} screen sections.`);
} else {
    console.log('No updates were made.');
}
