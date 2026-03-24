const fs = require('fs');

const srcFile = 'danhsachmanhinh.md';
const tgtFile = 'phantichtong.md';

const lines = fs.readFileSync(srcFile, 'utf-8').split('\n');
const map = {};

lines.forEach(l => {
    const parts = l.split('|').map(s => s.trim());
    if (parts.length > 7 && parts[1] && parts[1] !== '**STT**' && parts[1] !== '---') {
        const funcId = parts[2];
        const screenId = parts[4];
        let hashScreenId = parts[6];
        if (hashScreenId.startsWith('#')) {
            hashScreenId = hashScreenId.substring(1).trim();
        }
        if (hashScreenId) {
            if (!map[hashScreenId]) {
                map[hashScreenId] = { funcIds: new Set(), screenIds: new Set() };
            }
            if (funcId) map[hashScreenId].funcIds.add(funcId);
            if (screenId) map[hashScreenId].screenIds.add(screenId);
        }
    }
});

let tgtLines = fs.readFileSync(tgtFile, 'utf-8').split('\n');
let modified = false;

let newLines = [];
let i = 0;
let matchCount = 0;
let mapFoundCount = 0;

while (i < tgtLines.length) {
    const line = tgtLines[i];
    newLines.push(line);
    
    // allow \r at the end or proper trailing space
    const match = line.match(/^####\s+(?:[0-9]+\.)+\s+(MH[A-Za-z0-9.]+)\s?/);
    if (match) {
        matchCount++;
        const screenId = match[1];
        if (map[screenId]) {
            mapFoundCount++;
            const funcIds = Array.from(map[screenId].funcIds).join(', ');
            const screenIds = Array.from(map[screenId].screenIds).join(', ');
            
            let alreadyHasFunc = false;
            let j = i + 1;
            while (j < tgtLines.length && j < i + 5) {
                if (tgtLines[j].includes('Mã chức năng:') || tgtLines[j].includes('Mã màn hình/API:')) {
                    alreadyHasFunc = true;
                    break;
                }
                if (tgtLines[j].startsWith('#')) break;
                j++;
            }
            
            if (!alreadyHasFunc) {
                newLines.push(`- **Mã chức năng:** ${funcIds}`);
                newLines.push(`- **Mã màn hình/API:** ${screenIds}`);
                newLines.push('');
                modified = true;
            }
        } else {
            console.log("No map for screenId:", screenId);
        }
    }
    i++;
}

console.log(`total matches: ${matchCount}, mapFound: ${mapFoundCount}`);
if (modified) {
    fs.writeFileSync(tgtFile, newLines.join('\n'));
    console.log('Successfully updated', tgtFile);
} else {
    console.log('No updates were made.');
}
