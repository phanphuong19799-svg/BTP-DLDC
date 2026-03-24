const fs = require('fs');
const path = require('path');

const dir = 'd:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich';
const mamanhinhPath = path.join(dir, 'mamanhinh.md');
const danhsachPath = path.join(dir, 'danhsachmanhinh.md');

function parseMarkdownTable(content) {
    const lines = content.split('\n');
    const tableLines = lines.filter(line => line.trim().startsWith('|'));
    
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
    for (let w of words1) if (words2.includes(w)) matches++;
    return matches / Math.max(words1.length, words2.length, 1);
}

const maManHinhContent = fs.readFileSync(mamanhinhPath, 'utf8');
const danhSachContentRestored = fs.readFileSync(danhsachPath, 'utf8');

const doc1 = parseMarkdownTable(maManHinhContent);
const doc2 = parseMarkdownTable(danhSachContentRestored);

// REMOVE OLD ADDED HEADERS:
doc2.headers = doc2.headers.filter(h => !h.includes('(mamanhinh.md)'));

const mapMaManHinh = {};
for (const row of doc1.rows) {
    const fnId = row['Function ID (*)'];
    if (!fnId) continue;
    if (!mapMaManHinh[fnId]) mapMaManHinh[fnId] = [];
    mapMaManHinh[fnId].push(row);
}

const T_MA_MAN_HINH_MAP = '**# Mã Màn hình (mamanhinh.md)**';
const T_TEN_MAN_HINH_MAP = '**# Tên màn hình/API (mamanhinh.md)**';

// Add new headers with #
if (!doc2.headers.includes(T_MA_MAN_HINH_MAP)) {
    const pIdx = doc2.headers.findIndex(h => h.includes('Tên màn hình/API'));
    if (pIdx !== -1) {
        doc2.headers.splice(pIdx + 1, 0, T_MA_MAN_HINH_MAP, T_TEN_MAN_HINH_MAP);
    } else {
        doc2.headers.push(T_MA_MAN_HINH_MAP, T_TEN_MAN_HINH_MAP);
    }
}

let mappedCount = 0;
for (const row of doc2.rows) {
    let fnIdHeader = Object.keys(row).find(k => k.includes('Function ID'));
    const fnId = row[fnIdHeader];
    
    row[T_MA_MAN_HINH_MAP] = '';
    row[T_TEN_MAN_HINH_MAP] = '';
    
    if (!fnId) continue;
    
    const candidates = mapMaManHinh[fnId];
    if (candidates && candidates.length > 0) {
        let bestCandidate = candidates[0];
        let bestScore = -1;
        
        let nameHeader = Object.keys(row).find(k => k.includes('Tên màn hình/API') && !k.includes('mamanhinh.md'));
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
        
        // Populate mapped cells with #
        row[T_MA_MAN_HINH_MAP] = '# ' + bestCandidate['Mã Màn hình'];
        row[T_TEN_MAN_HINH_MAP] = '# ' + bestCandidate['Tên màn hình/API'];
        
        mappedCount++;
    }
}

console.log(`Successfully mapped ${mappedCount} rows into clean columns.`);

let outLines = [];
let rowIndex = 0;
for (const line of doc2.rawLines) {
    if (line.trim().startsWith('|') && !line.match(/^\|[\s\-\:]+\|/)) {
        if (rowIndex === 0) {
            outLines.push('| ' + doc2.headers.join(' | ') + ' |');
        } else {
            const r = doc2.rows[rowIndex - 1];
            const cells = doc2.headers.map(h => r[h] || '');
            outLines.push('| ' + cells.join(' | ') + ' |');
        }
        rowIndex++;
    } else if (line.match(/^\|[\s\-\:]+\|/)) {
        const sep = doc2.headers.map(() => '---');
        outLines.push('| ' + sep.join(' | ') + ' |');
    } else {
        outLines.push(line);
    }
}

fs.writeFileSync(danhsachPath, outLines.join('\n'));
console.log('Wrote updated structure to ' + danhsachPath);
