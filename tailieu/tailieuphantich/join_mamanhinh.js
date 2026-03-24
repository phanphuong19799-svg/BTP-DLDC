const fs = require('fs');

const mamanhinhFile = 'mamanhinh.md';
const danhsachFile = 'danhsachmanhinh.md';

// Parse mamanhinh.md -> build map: funcId -> [ {maMH, tenMH}, ... ]
const maLines = fs.readFileSync(mamanhinhFile, 'utf-8').split('\n');

// Map by funcId: funcId -> array of {maMH, tenMH}
const funcMap = {}; // funcId -> [{maMH, tenMH}]

maLines.forEach(l => {
    const row = l.replace(/\r$/, '');
    if (!row.startsWith('|')) return;
    const parts = row.split('|').map(s => s.trim());
    // | STT | Function ID (*) | Tên CN | Mã Màn hình | Tên màn hình/API |
    if (parts.length < 6) return;
    const funcId = parts[2];
    const maMH = parts[4];
    const tenMH = parts[5];
    if (!funcId || funcId === 'Function ID (*)' || funcId === '---' || funcId === ':---') return;
    if (!funcMap[funcId]) funcMap[funcId] = [];
    funcMap[funcId].push({ maMH, tenMH });
});

console.log(`Loaded ${Object.keys(funcMap).length} function IDs from mamanhinh.md`);
console.log('Sample:', Object.entries(funcMap).slice(0, 3).map(([k, v]) => `${k} → ${v.map(x=>x.maMH).join(', ')}`));

// Parse and update danhsachmanhinh.md
// columns (0-indexed by split |):
// [0]='' [1]=STT [2]=FuncID [3]=TenCN [4]=MaMH [5]=TenMHAPI [6]=HashMaMH [7]=HashTenMH [8]=MaQT [9]=TenQT [10]=MaUC [11]=Phan_mem [12]=''
const dsLines = fs.readFileSync(danhsachFile, 'utf-8').split('\n');
let newLines = [];
let filled = 0;
let kept = 0;
let notFound = 0;

dsLines.forEach(origLine => {
    const cr = origLine.endsWith('\r');
    const l = cr ? origLine.slice(0, -1) : origLine;
    const suffix = cr ? '\r' : '';

    if (!l.startsWith('|')) {
        newLines.push(origLine);
        return;
    }

    const parts = l.split('|');
    // parts[0]='', parts[1]=STT, parts[2]=FuncID, parts[3]=TenCN, parts[4]=MaMH, parts[5]=TenMHAPI, parts[6]=HashMaMH, parts[7]=HashTenMH, ...

    if (parts.length < 9) {
        newLines.push(origLine);
        return;
    }

    const funcId = parts[2].trim();
    const maMH = parts[4].trim(); // e.g. DC1-UC001-MH1
    const hashMaMH = parts[6].trim();
    const hashTenMH = parts[7].trim();

    // Skip header/separator rows
    if (funcId === 'Function ID (*)' || funcId === '---' || funcId === ':---' || funcId === '**Function ID (**') {
        newLines.push(origLine);
        return;
    }

    // If already has value, keep it
    if (hashMaMH !== '') {
        kept++;
        newLines.push(origLine);
        return;
    }

    // Look up funcId in mamanhinh map
    const matches = funcMap[funcId];
    if (!matches || matches.length === 0) {
        notFound++;
        newLines.push(origLine);
        return;
    }

    // Strategy: 
    // danhsachmanhinh has column "Mã Màn hình" (DC1-UC001-MH1, DC1-UC001-MH2, etc.)
    // mamanhinh has same funcId but different MH codes (MH02.P01a, MH02, etc.)
    // We need to pick the right mamanhinh row for this danhsachmanhinh row
    // 
    // Use a simple approach: 
    // - Extract suffix from danhsachmanhinh MaManHinh: DC1-UC001-MH1 -> "MH1"
    // - For each mamanhinh entry for this funcId, try to match by position/index
    //
    // Better approach: extract row number from maMH and pick the Nth mamanhinh entry
    // DC1-UC001-MH1 = entry 1 -> matches[0]
    // DC1-UC001-MH2 = entry 2 -> matches[1]
    // DC1-UC001-MH3 = entry 3 -> matches[2]

    let targetIdx = -1;
    const mhMatch = maMH.match(/MH(\d+)$/);
    if (mhMatch) {
        targetIdx = parseInt(mhMatch[1]) - 1; // 0-indexed
    }

    let chosen = null;
    if (targetIdx >= 0 && targetIdx < matches.length) {
        chosen = matches[targetIdx];
    } else if (matches.length > 0) {
        // Fallback: use first match
        chosen = matches[0];
    }

    if (!chosen) {
        notFound++;
        newLines.push(origLine);
        return;
    }

    // Build new row with filled # Mã Màn hình and # Tên màn hình
    parts[6] = ` # ${chosen.maMH} `;
    parts[7] = ` # ${chosen.tenMH} `;
    filled++;
    newLines.push(parts.join('|') + suffix);
});

fs.writeFileSync(danhsachFile, newLines.join('\n'));
console.log(`\nDone!`);
console.log(`Filled: ${filled} rows`);
console.log(`Already had value (kept): ${kept} rows`);
console.log(`No match found (kept empty): ${notFound} rows`);
