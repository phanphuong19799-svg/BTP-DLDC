const fs = require('fs');

const tgtFile = 'phantichtong.md';
let lines = fs.readFileSync(tgtFile, 'utf-8').split('\n');
let newLines = [];
let counts = { manhinh: 0, motaInfo: 0, chucNang: 0, other5hash: 0 };

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const cr = line.endsWith('\r');
    const l = cr ? line.slice(0, -1) : line;
    const suffix = cr ? '\r' : '';

    // Remove ##### from sub-section headings per new template
    if (l === '##### Màn hình') {
        newLines.push('Màn hình' + suffix);
        counts.manhinh++;
    } else if (l === '##### Mô tả thông tin trên màn hình') {
        newLines.push('Mô tả thông tin trên màn hình' + suffix);
        counts.motaInfo++;
    } else if (l === '##### Chức năng trên màn hình') {
        newLines.push('Chức năng trên màn hình' + suffix);
        counts.chucNang++;
    } else if (l.startsWith('#####')) {
        // Any other ##### headings - keep track but don't modify
        counts.other5hash++;
        newLines.push(line);
    } else {
        newLines.push(line);
    }
}

fs.writeFileSync(tgtFile, newLines.join('\n'));
console.log('Done!');
console.log(`Converted "##### Màn hình": ${counts.manhinh} chỗ`);
console.log(`Converted "##### Mô tả thông tin trên màn hình": ${counts.motaInfo} chỗ`);
console.log(`Converted "##### Chức năng trên màn hình": ${counts.chucNang} chỗ`);
console.log(`Other ##### headings (kept): ${counts.other5hash} chỗ`);
