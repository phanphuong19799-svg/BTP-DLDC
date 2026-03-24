const fs = require('fs');
const path = require('path');

const phantichPath = path.join(__dirname, 'tailieu', 'tailieuphantich', 'phantichtong.md');
const mamanhinhPath = path.join(__dirname, 'tailieu', 'tailieuphantich', 'mamanhinh.md');

function findMissingScreens() {
    console.log('--- ĐANG KIỂM TRA MÀN HÌNH THIẾU TRONG PHỤ LỤC ---');
    
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
    
    console.log(`[+] Tìm thấy ${Object.keys(allScreens).length} màn hình được định nghĩa trong mamanhinh.md`);
    
    // 2. Get all screens used in Phụ lục
    const phantichContent = fs.readFileSync(phantichPath, 'utf8');
    const usedScreens = new Set();
    
    let inAppendix = false;
    for (const line of phantichContent.split('\n')) {
        if (line.trim() === '#5. PHỤ LỤC' || line.trim() === '# 5. PHỤ LỤC') {
            inAppendix = true;
            continue;
        }
        
        if (inAppendix && line.startsWith('|') && !line.includes('| STT |') && !line.includes('| --- |')) {
            const parts = line.split('|').map(p => p.trim());
            if (parts.length >= 10) {
                // Mapped Screen Code is usually in column 6: | STT | ID | Tên CN | Mã MH | Tên MH/API | # Mã Màn hình
                let mappedCode = (parts.length >= 13) ? parts[6] : parts[4]; // depending on format
                
                // Extract "MHxxx" from string like "**# MH02.P01a**"
                const match = mappedCode.match(/(MH[0-9A-Za-z\.]+)/);
                if (match) {
                    usedScreens.add(match[1]);
                }
            }
        }
    }
    
    console.log(`[+] Đã tìm thấy ${usedScreens.size} mã màn hình duy nhất được sử dụng trong bảng Phụ Lục (phantichtong.md)`);
    
    // 3. Find missing
    console.log('\n--- KẾT QUẢ: CÁC MÀN HÌNH CHƯA CÓ TRONG PHỤ LỤC ---');
    let missingCount = 0;
    for (const [code, name] of Object.entries(allScreens)) {
        // Handle cases where a sub-screen like MH02.P01a might exact match or start with MH02
        let isUsed = false;
        
        // Exact check
        if (usedScreens.has(code)) {
            isUsed = true;
        } else {
            // Partial check (e.g. mamanhinh.md has MH01, but appendix only mapped MH01.P01)
            // Or vice versa
            for (const used of usedScreens) {
                if (used.startsWith(code) || code.startsWith(used)) {
                    isUsed = true;
                    break;
                }
            }
        }
        
        if (!isUsed) {
            console.log(`- Mã: ${code.padEnd(12)} - Tên: ${name}`);
            missingCount++;
        }
    }
    
    if (missingCount === 0) {
        console.log('=> Tuyệt vời! Tất cả màn hình trong mamanhinh.md đều đã có mặt trong phần Phụ Lục.');
    } else {
        console.log(`\n=> Còn thiếu ${missingCount} màn hình chưa được link vào các Function ID trong Phụ Lục.`);
    }
}

try {
    findMissingScreens();
} catch (e) {
    console.error(e);
}
