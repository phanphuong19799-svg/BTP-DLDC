const fs = require('fs');
const path = require('path');

const phantichPath = path.join(__dirname, 'tailieu', 'tailieuphantich', 'phantichtong.md');
const mamanhinhPath = path.join(__dirname, 'tailieu', 'tailieuphantich', 'mamanhinh.md');

function appendMissingScreens() {
    console.log('--- ĐANG TÌM VÀ THÊM MÀN HÌNH THIẾU VÀO PHỤ LỤC ---');
    
    // 1. Get all screens from mamanhinh.md
    const mamanhinhContent = fs.readFileSync(mamanhinhPath, 'utf8');
    const allScreens = {};
    
    let inTable = false;
    for (const line of mamanhinhContent.split('\n')) {
        if (line.includes('| STT |')) {
            inTable = true;
            continue;
        }
        if (inTable && line.startsWith('|') && !line.includes('| ---')) {
            const parts = line.split('|').map(p => p.trim());
            if (parts.length >= 5) {
                const tenManHinh = parts[3].replace(/\*|\#/g, '').trim();
                const maManHinh = parts[4].replace(/\*|\#/g, '').trim();
                if (maManHinh && maManHinh !== '') {
                    allScreens[maManHinh] = tenManHinh;
                }
            }
        }
    }
    
    // 2. Get all screens used in Phụ lục + find last STT and table end
    const phantichContent = fs.readFileSync(phantichPath, 'utf8');
    const lines = phantichContent.split('\n');
    const usedScreens = new Set();
    
    let inAppendix = false;
    let tableEndedAt = -1;
    let lastSTT = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim() === '#5. PHỤ LỤC' || line.trim() === '# 5. PHỤ LỤC') {
            inAppendix = true;
            continue;
        }
        
        if (inAppendix && line.startsWith('|') && !line.includes('| STT |') && !line.includes('| ---')) {
            const parts = line.split('|').map(p => p.trim());
            if (parts.length >= 10) {
                let mappedCode = (parts.length >= 13) ? parts[6] : parts[4]; 
                const match = mappedCode.match(/(MH[0-9A-Za-z\.]+)/);
                if (match) {
                    usedScreens.add(match[1]);
                }
                
                const currentSTT = parseInt(parts[1], 10);
                if (!isNaN(currentSTT) && currentSTT > lastSTT) {
                    lastSTT = currentSTT;
                }
            }
            // Keep updating the end of table index as long as we see rows
            tableEndedAt = i;
        } else if (inAppendix && !line.startsWith('|') && tableEndedAt !== -1 && line.trim() !== '') {
            // End of table reached
            break;
        }
    }
    
    // 3. Find missing
    const missingScreens = [];
    for (const [code, name] of Object.entries(allScreens)) {
        let isUsed = false;
        if (usedScreens.has(code)) {
            isUsed = true;
        } else {
            for (const used of usedScreens) {
                if (used.startsWith(code) || code.startsWith(used)) {
                    isUsed = true;
                    break;
                }
            }
        }
        
        if (!isUsed) {
            missingScreens.push({ code, name });
        }
    }
    
    console.log(`Tìm thấy ${missingScreens.length} màn hình thiếu.`);
    
    if (missingScreens.length > 0 && tableEndedAt !== -1) {
        // Append to the markdown content
        const newLines = [];
        for (let i = 0; i < lines.length; i++) {
            newLines.push(lines[i]);
            
            // Insert missing screens right after the last table row
            if (i === tableEndedAt) {
                missingScreens.forEach((screen, idx) => {
                    lastSTT++;
                    // Try to guess Quy trình based on code
                    let quyTrinh = "Khác";
                    let funcId = "N/A";
                    let ucId = "N/A";
                    
                    if (screen.code.startsWith('MH13') || screen.code.startsWith('MH14') || 
                        screen.code.startsWith('MH15') || screen.code.startsWith('MH16') || 
                        screen.code.startsWith('MH17') || screen.code.startsWith('MH18') || 
                        screen.code.startsWith('MH19') || screen.code.startsWith('MH20') || 
                        screen.code.startsWith('MH21') || screen.code.startsWith('MH22') || 
                        screen.code.startsWith('MH23')) {
                        quyTrinh = "Quản trị hệ thống";
                    } else if (screen.code.startsWith('MH06') || screen.code.startsWith('MH07')) {
                        quyTrinh = "Đối soát";
                    } else if (screen.code.startsWith('MH04') || screen.code.startsWith('MH05')) {
                        quyTrinh = "Danh mục / Cung cấp";
                    }
                    
                    const newRow = `| ${lastSTT} | ${funcId} | Bổ sung màn hình: ${screen.name} | ${screen.code} | ${screen.name} | **# ${screen.code}** | **# ${screen.name}** | N/A | ${quyTrinh} | ${ucId} | DC1 |`;
                    newLines.push(newRow);
                });
            }
        }
        
        fs.writeFileSync(phantichPath, newLines.join('\n'));
        console.log(`Đã thêm ${missingScreens.length} dòng vào cuối bảng Phụ Lục.`);
    }
}

try {
    appendMissingScreens();
} catch (e) {
    console.error(e);
}
