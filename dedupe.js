const fs = require('fs');
const targetFile = 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/mauthuthapCSDL.md';
let lines = fs.readFileSync(targetFile, 'utf8').split('\n');
let newLines = [];
for (let i = 0; i < lines.length; i++) {
    if (i > 0 && lines[i].trim() !== '' && lines[i].trim() === lines[i-1].trim()) continue;
    newLines.push(lines[i]);
}
fs.writeFileSync(targetFile, newLines.join('\n'), 'utf8');
