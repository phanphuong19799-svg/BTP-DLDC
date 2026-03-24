const fs = require('fs');

const srcFile = 'danhsachmanhinh.md';
const tgtFile = 'phantichtong.md';

// Build map: hashScreenId -> list of { funcId, maManHinh, maUC }
const lines = fs.readFileSync(srcFile, 'utf-8').split('\n');
const mapByHash = {};

lines.forEach(l => {
    const parts = l.split('|').map(s => s.trim());
    if (parts.length > 10 && parts[1] && parts[1] !== '**STT**' && parts[1] !== '---') {
        const funcId = parts[2];
        const maManHinh = parts[4];
        let hashScreenId = parts[6];
        const maUC = parts[10];

        if (hashScreenId && hashScreenId.startsWith('#')) {
            hashScreenId = hashScreenId.substring(1).trim();
        }
        if (hashScreenId) {
            if (!mapByHash[hashScreenId]) mapByHash[hashScreenId] = [];
            mapByHash[hashScreenId].push({ funcId, maManHinh, maUC });
        }
    }
});

// Extract module code from section heading
// ### 4.1.1.2. PM01.TQ.DB.MH01 => module = "TQ-DB"
function extractModuleFromSection(heading) {
    const m = heading.match(/PM\d+\.([A-Z]+)\.([A-Z]+)/);
    if (m) return `${m[1]}-${m[2]}`;
    return null;
}

// Parse phantichtong.md
let tgtLines = fs.readFileSync(tgtFile, 'utf-8').split('\n');
let newLines = [];
let modified = false;
let updatedCount = 0;
let currentModule = null;

let i = 0;
while (i < tgtLines.length) {
    let line = tgtLines[i];
    const lineClean = line.replace(/\r$/, '');

    // Skip previously-inserted lines
    if (lineClean.match(/^- \*\*Mã chức năng:\*\*/) || lineClean.match(/^- \*\*Mã màn hình:\*\*/)) {
        i++;
        // skip blank line after
        if (i < tgtLines.length && tgtLines[i].trim() === '') i++;
        modified = true;
        continue;
    }

    newLines.push(line);

    // Track current ### section heading for module context
    if (lineClean.match(/^###\s/)) {
        currentModule = extractModuleFromSection(lineClean);
    }

    // Look for #### screen heading
    const screenMatch = lineClean.match(/^####\s+(?:[0-9]+\.)+\s+(MH[A-Za-z0-9.]+)[\s–-]/);
    if (!screenMatch) {
        // Also try with no trailing char
        const screenMatch2 = lineClean.match(/^####\s+(?:[0-9]+\.)+\s+(MH[A-Za-z0-9.]+)$/);
        if (screenMatch2) {
            processScreen(screenMatch2[1]);
        }
    } else {
        processScreen(screenMatch[1]);
    }

    function processScreen(screenId) {
        if (!mapByHash[screenId]) return;

        const entries = mapByHash[screenId];
        let funcIds = new Set();
        let maManHinhs = new Set();

        // Filter by current module if available
        if (currentModule) {
            const filtered = entries.filter(e => {
                // funcId like DC1-TQ-DB-001, module = TQ-DB
                const mid = e.funcId.replace(/^DC1-/, '').replace(/-\d+$/, '');
                return mid === currentModule;
            });
            if (filtered.length > 0) {
                filtered.forEach(e => {
                    funcIds.add(e.funcId);
                    if (e.maManHinh) maManHinhs.add(e.maManHinh);
                });
            }
        }

        // Fallback: use all if no match
        if (funcIds.size === 0) {
            entries.forEach(e => {
                funcIds.add(e.funcId);
                if (e.maManHinh) maManHinhs.add(e.maManHinh);
            });
        }

        if (funcIds.size === 0 && maManHinhs.size === 0) return;

        updatedCount++;
        const funcIdStr = Array.from(funcIds).join(', ');
        const maManHinhStr = Array.from(maManHinhs).join(', ');

        // Check if already inserted in next few lines
        let alreadyHas = false;
        for (let j = i + 1; j < tgtLines.length && j < i + 5; j++) {
            if (tgtLines[j].includes('Mã chức năng:') || tgtLines[j].includes('Mã màn hình:')) {
                alreadyHas = true;
                break;
            }
            if (tgtLines[j].replace(/\r$/, '').startsWith('#')) break;
        }

        if (!alreadyHas) {
            newLines.push(`- **Mã chức năng:** ${funcIdStr}`);
            newLines.push(`- **Mã màn hình:** ${maManHinhStr}`);
            newLines.push('');
            modified = true;
        }
    }

    i++;
}

if (modified) {
    fs.writeFileSync(tgtFile, newLines.join('\n'));
    console.log(`Done! Updated ${updatedCount} screen sections.`);
} else {
    console.log('No changes made.');
}
