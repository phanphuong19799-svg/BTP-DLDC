const fs = require('fs');

const tgtFile = 'phantichtong.md';
let tgtLines = fs.readFileSync(tgtFile, 'utf-8').split('\n');

for(let j=0; j<5; j++) {
    console.log(`Line ${j}:`, tgtLines[j]);
}

let found = false;
for(let i=0; i<tgtLines.length; i++){
    const line = tgtLines[i];
    const match = line.match(/^####\s+(?:[0-9]+\.)+\s+(MH[A-Za-z0-9.]+)\s?/);
    if (match && match[1] === 'MH02.P01a') {
        console.log('Found MH02.P01a at line', i);
        let j = i + 1;
        while (j < tgtLines.length && j < i + 5) {
            console.log('  lookahead', j, ':', JSON.stringify(tgtLines[j]));
            if (tgtLines[j].includes('Mã chức năng:') || tgtLines[j].includes('Mã màn hình/API:')) {
                console.log('  -> MATCHED alreadyHasFunc');
            }
            if (tgtLines[j].startsWith('#')) break;
            j++;
        }
        found = true;
        break;
    }
}
