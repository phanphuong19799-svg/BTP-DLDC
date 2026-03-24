const fs = require('fs');
const path = require('path');

const phantichPath = path.join(__dirname, 'tailieu', 'tailieuphantich', 'phantichtong.md');

function processAppendix() {
    let content = fs.readFileSync(phantichPath, 'utf8');
    const lines = content.split('\n');
    let outLines = [];
    
    let inAppendix = false;
    let tableStarted = false;
    let count = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.trim() === '#5. PHỤ LỤC' || line.trim() === '# 5. PHỤ LỤC') {
            inAppendix = true;
            outLines.push(line);
            continue;
        }
        
        if (inAppendix) {
            if (line.includes('| **STT** |') || line.includes('| STT |')) {
                tableStarted = true;
                outLines.push("| **STT** | **Function ID (*)** | **Tên CN** | **Mã Màn hình** | **Tên màn hình/API** | **# Mã Màn hình (mamanhinh.md)** | **# Tên màn hình/API (mamanhinh.md)** | **Mã quy trình** | **Tên quy trình** | **Mã UC (*)** | **Phần mềm** |");
                outLines.push("| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |");
                i++; // skip original divider
                continue;
            }
            
            if (tableStarted && line.startsWith('|')) {
                const parts = line.split('|').map(p => p.trim());
                if (parts.length >= 10) {
                    const stt = parts[1];
                    const funcId = parts[2];
                    const tenCN = parts[3];
                    const orgMaMH = parts[4];
                    const orgTenMH = parts[5];
                    
                    // Check if the original table already has 11 columns (i.e. we previously partially modified it)
                    // Original has 9 columns of data (+ 2 empty pads) = 11 parts
                    // New one has 11 columns of data (+ 2 empty pads) = 13 parts
                    let newMaMH = "";
                    let newTenMH = "";
                    let maQT, tenQT, maUC, phanMem;
                    
                    if (parts.length >= 13 && parts[6].startsWith('#')) {
                        // Already has the custom columns appended, just read them
                        newMaMH = parts[6].replace(/#/g, '').trim();
                        newTenMH = parts[7].replace(/#/g, '').trim();
                        maQT = parts[8];
                        tenQT = parts[9];
                        maUC = parts[10];
                        phanMem = parts[11];
                    } else {
                        // Needs to map and append
                        maQT = parts[6];
                        tenQT = parts[7];
                        maUC = parts[8];
                        phanMem = parts[9];
                        
                        // Heuristics mapping (Fallback if the complex mapper fails)
                        if (orgTenMH.includes('Dashboard')) { newMaMH = 'MH01'; newTenMH = 'Dashboard Tổng quan'; }
                        else if (tenQT && tenQT.includes('Thu thập') && tenCN.includes('Thêm mới')) { newMaMH = 'MH02.P01a'; newTenMH = 'Thêm mới thiết lập'; }
                        else if (tenQT && tenQT.includes('Thu thập') && tenCN.includes('Cập nhật')) { newMaMH = 'MH02'; newTenMH = 'Quản lý thiết lập thu thập'; }
                        else if (tenQT && tenQT.includes('Thu thập') && tenCN.includes('Xóa bỏ')) { newMaMH = 'MH02.P03'; newTenMH = 'Xác nhận xóa thiết lập'; }
                        else if (tenQT && tenQT.includes('Thu thập') && tenCN.includes('Xem thông tin chi tiết')) { newMaMH = 'MH02.P02'; newTenMH = 'Xem chi tiết thiết lập'; }
                        else if (tenQT && tenQT.includes('Thu thập') && tenCN.includes('Tra cứu phương thức')) { newMaMH = 'MH02.P05'; newTenMH = 'Kiểm tra Endpoint'; }
                        else if (tenQT && tenQT.includes('Thu thập') && tenCN.includes('Tìm kiếm thông tin truy cập')) { newMaMH = 'MH03'; newTenMH = 'Nhật ký thu thập'; }
                        else if (tenQT && tenQT.includes('Thu thập') && tenCN.includes('Lịch sử thu thập')) { newMaMH = 'MH03'; newTenMH = 'Nhật ký thu thập'; }
                        else if (tenQT && tenQT.includes('Xử lý') && tenCN.includes('Cấu hình')) { newMaMH = 'MH02'; newTenMH = 'Danh sách cấu hình xử lý'; }
                        else if (tenQT && tenQT.includes('Cung cấp') && !tenCN.includes('Đối soát')) { newMaMH = 'API'; newTenMH = 'API Cung cấp dữ liệu'; }
                        else if (tenQT && tenQT.includes('Đối soát cung cấp')) { newMaMH = 'API'; newTenMH = 'Đồng bộ kết quả quản lý / đối soát'; }
                        else if (tenQT && tenQT.includes('Đối soát')) { newMaMH = 'MH06'; newTenMH = 'Danh sách đối soát dữ liệu'; }
                        else if (tenQT && tenQT.includes('Quản trị')) { newMaMH = 'MH09'; newTenMH = 'Quản trị hệ thống'; }
                        else if (tenQT && tenQT.includes('Hệ thống')) { newMaMH = 'MH09'; newTenMH = 'Quản trị hệ thống'; }
                        else if (tenQT && tenQT.includes('Danh mục')) { newMaMH = 'MH08'; newTenMH = 'Danh sách danh mục'; }
                        else if (tenQT && tenQT.includes('Tổng quan')) { newMaMH = 'MH01'; newTenMH = 'Dashboard Tổng quan'; }
                        else if (tenQT && tenQT.includes('Thông báo')) { newMaMH = 'MH01'; newTenMH = 'Quản lý thông báo'; }
                        
                        if (!newMaMH) newMaMH = "N/A";
                        if (!newTenMH) newTenMH = "N/A";
                    }
                    
                    const row = `| ${stt} | ${funcId} | ${tenCN} | ${orgMaMH} | ${orgTenMH} | **# ${newMaMH}** | **# ${newTenMH}** | ${maQT || ''} | ${tenQT || ''} | ${maUC || ''} | ${phanMem || ''} |`;
                    outLines.push(row);
                    count++;
                } else {
                    outLines.push(line);
                }
            } else {
                if (tableStarted && line.trim() === '') tableStarted = false;
                outLines.push(line);
            }
        } else {
            outLines.push(line);
        }
    }
    
    fs.writeFileSync(phantichPath, outLines.join('\n'));
    console.log(`Rewrote ${count} rows.`);
}

try {
    processAppendix();
} catch (e) { console.error('Error:', e); }
