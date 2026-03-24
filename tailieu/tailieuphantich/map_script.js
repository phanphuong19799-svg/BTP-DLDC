const fs = require('fs');
const path = require('path');

const dir = 'd:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich';
const mamanhinhPath = path.join(dir, 'mamanhinh.md');
const danhsachPath = path.join(dir, 'danhsachmanhinh.md');

function parseMarkdownTable(content) {
    const lines = content.split('\n');
    const tableLines = lines.filter(line => line.trim().startsWith('|'));
    
    // exclude the separator lines (e.g. |---|---|)
    const dataLines = tableLines.filter(line => !line.match(/^\|[\s\-\:]+\|/));
    
    if (dataLines.length === 0) return { headers: [], rows: [], rawLines: lines };
    
    const headers = dataLines[0].split('|').map(x => x.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
    const rows = [];
    
    for (let i = 1; i < dataLines.length; i++) {
        const cells = dataLines[i].split('|').map(x => x.trim()).filter((_, j, arr) => j > 0 && j < arr.length - 1);
        const rowObj = {};
        for(let j=0; j<headers.length; j++) {
            rowObj[headers[j]] = cells[j] || '';
        }
        rowObj._raw = dataLines[i];
        rows.push(rowObj);
    }
    
    return { headers, rows, rawLines: lines };
}

function stringSimilarity(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    
    const words1 = s1.split(/[\s,.\-\+\/\\()]+/g).filter(x => x);
    const words2 = s2.split(/[\s,.\-\+\/\\()]+/g).filter(x => x);
    
    let matches = 0;
    for (let w of words1) {
        if (words2.includes(w)) matches++;
    }
    return matches / Math.max(words1.length, words2.length, 1);
}

const maManHinhContent = fs.readFileSync(mamanhinhPath, 'utf8');
const danhSachContent = fs.readFileSync(danhsachPath, 'utf8');

const doc1 = parseMarkdownTable(maManHinhContent);
const doc2 = parseMarkdownTable(danhSachContent);

console.log(`Found ${doc1.rows.length} rows in mamanhinh.md`);
console.log(`Found ${doc2.rows.length} rows in danhsachmanhinh.md`);

const mapMaManHinh = {};
for (const row of doc1.rows) {
    const fnId = row['Function ID (*)'];
    if (!fnId) continue;
    if (!mapMaManHinh[fnId]) mapMaManHinh[fnId] = [];
    mapMaManHinh[fnId].push(row);
}

let mappedCount = 0;
for (const row of doc2.rows) {
    let fnIdHeader = Object.keys(row).find(k => k.includes('Function ID'));
    const fnId = row[fnIdHeader];
    
    if (!fnId) continue;
    
    const candidates = mapMaManHinh[fnId];
    if (candidates && candidates.length > 0) {
        let bestCandidate = candidates[0];
        let bestScore = -1;
        
        let nameHeader = Object.keys(row).find(k => k.includes('Tên màn hình/API'));
        let cnHeader = Object.keys(row).find(k => k.includes('Tên CN'));
        
        const currentName = row[nameHeader] || '';
        const currentCN = row[cnHeader] || '';
        const textToMatch = currentName + " " + currentCN;
        
        for (const cand of candidates) {
            const candName = (cand['Tên màn hình/API'] || '') + " " + (cand['Tên CN'] || '');
            const score = stringSimilarity(textToMatch, candName);
            if (score > bestScore) {
                bestScore = score;
                bestCandidate = cand;
            }
        }
        
        let codeHeader = Object.keys(row).find(k => k.includes('Mã Màn hình'));
        
        if (codeHeader) row[codeHeader] = bestCandidate['Mã Màn hình'];
        if (nameHeader) row[nameHeader] = bestCandidate['Tên màn hình/API'];
        
        mappedCount++;
    }
}

console.log(`Successfully mapped ${mappedCount} rows.`);

let outLines = [];
let rowIndex = 0;
for (const line of doc2.rawLines) {
    if (line.trim().startsWith('|') && !line.match(/^\|[\s\-\:]+\|/)) {
        if (rowIndex === 0) {
            outLines.push(line);
        } else {
            const r = doc2.rows[rowIndex - 1];
            const cells = doc2.headers.map(h => r[h] || '');
            outLines.push('| ' + cells.join(' | ') + ' |');
        }
        rowIndex++;
    } else {
        outLines.push(line);
    }
}

fs.writeFileSync(danhsachPath, outLines.join('\n'));
console.log('Wrote to ' + danhsachPath);
