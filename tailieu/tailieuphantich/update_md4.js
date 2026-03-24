const fs = require('fs');

const srcFile = 'danhsachmanhinh.md';
const tgtFile = 'phantichtong.md';

// Build maps from danhsachmanhinh.md
const lines = fs.readFileSync(srcFile, 'utf-8').split('\n');
const hashToFuncId = {};   // hashId -> { module -> funcId }
const hashToMaManHinh = {}; // hashId -> first maManHinh

lines.forEach(l => {
    const parts = l.split('|').map(s => s.trim());
    if (parts.length > 6 && parts[1] && parts[1] !== '**STT**' && parts[1] !== '---') {
        const funcId = parts[2];
        const maManHinh = parts[4];
        let hashId = parts[6];
        if (hashId && hashId.startsWith('#')) hashId = hashId.substring(1).trim();
        if (!hashId) return;

        // Extract module from funcId, e.g. DC1-TQ-DB-001 -> TQ-DB
        const modMatch = funcId.match(/^DC1-([A-Z]+-[A-Z]+)-\d+$/);
        const mod = modMatch ? modMatch[1] : null;

        if (!hashToFuncId[hashId]) hashToFuncId[hashId] = {};
        if (mod && !hashToFuncId[hashId][mod]) hashToFuncId[hashId][mod] = funcId;
        if (!hashToFuncId[hashId]['__first']) hashToFuncId[hashId]['__first'] = funcId;

        if (!hashToMaManHinh[hashId]) hashToMaManHinh[hashId] = maManHinh;
    }
});

function getFuncIdByModule(hashId, module) {
    if (!hashToFuncId[hashId]) return null;
    if (module && hashToFuncId[hashId][module]) return hashToFuncId[hashId][module];
    return hashToFuncId[hashId]['__first'];
}

// Parse phantichtong.md and update headings
let tgtLines = fs.readFileSync(tgtFile, 'utf-8').split('\n');
let newLines = [];
let sectionCount = 0;
let screenHeadCount = 0;

let i = 0;
while (i < tgtLines.length) {
    let line = tgtLines[i];
    const cr = line.endsWith('\r');
    const lineClean = cr ? line.slice(0, -1) : line;

    // --- Update ### heading: replace PM code with funcId ---
    // Pattern: ### [numbers.] PM01.TQ.DB.MH01 [– rest]
    // Use indexOf to find PM, then extract the PM code
    if (lineClean.startsWith('### ')) {
        const pmIdx = lineClean.indexOf(' PM');
        if (pmIdx !== -1) {
            // Find end of PM code (space, –, -, or end)
            const afterPM = lineClean.substring(pmIdx + 1); // 'PM01.TQ.DB.MH01 – ...'
            const pmMatch = afterPM.match(/^(PM\d+\.[A-Z0-9.]+?)(\s|$)/);
            if (pmMatch) {
                const pmCode = pmMatch[1]; // 'PM01.TQ.DB.MH01'
                // Extract hashId (last part like MH01)
                const hashParts = pmCode.split('.');
                const hashId = hashParts.slice(-1)[0]; // 'MH01'
                // Extract module (e.g. TQ.DB -> TQ-DB)
                let module = null;
                if (hashParts.length >= 3) {
                    module = hashParts[hashParts.length - 2] + '-' + hashParts[hashParts.length - 3];
                    // e.g. PM01.TQ.DB.MH01: parts = ['PM01','TQ','DB','MH01']
                    // module part: TQ-DB (index 1, 2)
                    if (hashParts.length >= 4) {
                        module = hashParts[1] + '-' + hashParts[2];
                    }
                }

                const funcId = getFuncIdByModule(hashId, module);
                if (funcId) {
                    const updated = lineClean.replace(pmCode, funcId) + (cr ? '\r' : '');
                    newLines.push(updated);
                    sectionCount++;
                    i++;
                    continue;
                }
            }
        }
    }

    // --- Update #### heading: replace MH code with Mã màn hình ---
    // Pattern: #### [x.x.x.x.] MHxx[.Pxx] title...
    if (lineClean.startsWith('#### ')) {
        const mhMatch = lineClean.match(/^(####\s+[\d.]+\s+)(MH[\w.]+)(\s.+)?$/);
        if (mhMatch) {
            const prefix = mhMatch[1];
            const mhCode = mhMatch[2];
            const suffix = mhMatch[3] || '';
            const maManHinh = hashToMaManHinh[mhCode];
            if (maManHinh) {
                const updated = prefix + maManHinh + suffix + (cr ? '\r' : '');
                newLines.push(updated);
                screenHeadCount++;
                i++;
                continue;
            }
        }
    }

    newLines.push(line);
    i++;
}

fs.writeFileSync(tgtFile, newLines.join('\n'));
console.log(`Done! Updated ${sectionCount} section headings (###) and ${screenHeadCount} screen headings (####).`);
