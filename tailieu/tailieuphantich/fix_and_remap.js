const fs = require('fs');
const path = require('path');

const dir = 'd:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich';
const mamanhinhPath = path.join(dir, 'mamanhinh.md');
const danhsachPath = path.join(dir, 'danhsachmanhinh.md');

// 1. RESTORE ORIGINAL LINES
const originalTopLines = `| **STT** | **Function ID (\*)** | **Tên CN** | **Mã Màn hình** | **Tên màn hình/API** | **Mã quy trình** | **Tên quy trình** | **Mã UC (\*)** | **Phần mềm** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | DC1-TT-QT-001 | Thêm mới phương thức thu thập dữ liệu (qua API, qua file) đối với một Cơ sở dữ liệu của Bộ ban ngành | DC1-UC001-MH1 | Thêm mới phương thức thu thập | DC1-TT | Thu thập | DC1-UC001 | DC1 |
| 2 | DC1-TT-QT-001 | Cập nhật lại phương thức thu thập dữ liệu (qua API, qua file) đối với một Cơ sở dữ liệu của Bộ ban ngành | DC1-UC001-MH2 | Cập nhật phương thức thu thập | DC1-TT | Thu thập | DC1-UC001 | DC1 |
| 3 | DC1-TT-QT-001 | Xóa bỏ phương thức thu thập dữ liệu từ một Cơ sở dữ liệu của Bộ ban ngành | DC1-UC001-MH3 | Xác nhận xóa bỏ phương thức thu thâp | DC1-TT | Thu thập | DC1-UC001 | DC1 |
| 4 | DC1-TT-QT-001 | Xem thông tin chi tiết phương thức thu thập dữ liệu từ một Cơ sở dữ liệu của Bộ ban ngành | DC1-UC001-MH4 | Xem thông tin chi tiết | DC1-TT | Thu thập | DC1-UC001 | DC1 |
| 5 | DC1-TT-QT-001 | Tra cứu phương thức thu thập dữ liệu đối với các Cơ sở dữ liệu theo Bộ ban ngành | DC1-UC001-MH5 | Màn danh sách thông tin | DC1-TT | Thu thập | DC1-UC001 | DC1 |
| 6 | DC1-TT-QT-001 | Kết xuất kết quả tra cứu phương thức thu thập dữ liệu đối với các Cơ sở dữ liệu theo Bộ ban ngành ra excel, csv... | DC1-UC001-MH6 | Màn danh sách thông tin | DC1-TT | Thu thập | DC1-UC001 | DC1 |
| 7 | DC1-TT-QT-002 | Tìm kiếm thông tin truy cập của người dùng | DC1-UC002-MH1 | Màn danh sách thông tin | DC1-TT | Thu thập | DC1-UC002 | DC1 |
| 8 | DC1-TT-QT-002 | Xem chi tiết lịch sử truy cập của người dùng | DC1-UC002-MH2 | Xem chi tiết | DC1-TT | Thu thập | DC1-UC002 | DC1 |
| 9 | DC1-TT-QT-002 | Tìm kiếm thông tin hoạt động của người dùng theo các tiêu chí | DC1-UC002-MH3 | Màn danh sách thông tin | DC1-TT | Thu thập | DC1-UC002 | DC1 |
| 10 | DC1-TT-QT-002 | Xem chi tiết lịch sử hoạt động của người dùng | DC1-UC002-MH4 | Xem chi tiết | DC1-TT | Thu thập | DC1-UC002 | DC1 |
| 11 | DC1-TT-QT-002 | Xem các thông tin khác của người dùng (địa chỉ IP, thiết bị sử dụng truy nhập, trình duyệt…) | DC1-UC002-MH5 | Xem danh sách | DC1-TT | Thu thập | DC1-UC002 | DC1 |
| 12 | DC1-TT-QT-003 | Xem thông tin thu thập dữ liệu theo phương thức thu thập dữ liệu dưới dạng biểu đồ. | DC1-UC003-MH1 | Xem danh sách | DC1-TT | Thu thập | DC1-UC003 | DC1 |
| 13 | DC1-TT-QT-003 | Thu thập dữ liệu theo nguồn cung cấp dữ liệu dưới dạng biểu đồ | DC1-UC003-MH2 | Xem biểu đồ | DC1-TT | Thu thập | DC1-UC003 | DC1 |
| 14 | DC1-TT-QT-003 | Xem thông tin thu thập dữ liệu theo kết quả thu thập dữ liệu dưới dạng biểu đồ | DC1-UC003-MH3 | Xem danh sách | DC1-TT | Thu thập | DC1-UC003 | DC1 |
| 15 | DC1-TT-QT-003 | Xem thông tin thu thập dữ liệu theo thời gian dưới dạng biểu đồ. | DC1-UC003-MH4 | Xem danh sách | DC1-TT | Thu thập | DC1-UC003 | DC1 |
| 16 | DC1-TT-QT-004 | Kho dữ liệu dùng chung tiếp nhận dữ liệu Thông tin Bản án, quyết định từ hệ thống nguồn thông qua kênh tích hợp | DC1-UC004-MH1 | Màn xem chi tiết | DC1-TT | Thu thập | DC1-UC004 | DC1 |
| 17 | DC1-TT-QT-004 | hệ thống gửi thông báo lỗi kèm nguyên nhân. Nếu dữ liệu đạt yêu cầu, hệ thống tiếp nhận dữ liệu và thông báo thành công | DC1-UC004-MH1 | Màn xem chi tiết | DC1-TT | Thu thập | DC1-UC004 | DC1 |
| 18 | DC1-TT-QT-005 | Kho dữ liệu dùng chung tiếp nhận dữ liệu Danh mục giới tính từ hệ thống nguồn thông qua kênh tích hợp | DC1-UC005-MH1 | Màn xem chi tiết | DC1-TT | Thu thập | DC1-UC005 | DC1 |
| 19 | DC1-TT-QT-005 | Hệ thống gửi thông báo lỗi kèm nguyên nhân. Nếu dữ liệu đạt yêu cầu, hệ thống tiếp nhận dữ liệu và thông báo thành công | DC1-UC005-MH1 | Màn xem chi tiết | DC1-TT | Thu thập | DC1-UC005 | DC1 |`.split('\n');

const currentContent = fs.readFileSync(danhsachPath, 'utf8');
const currentLines = currentContent.split('\n');

// Replace top 21 lines with original ones
for (let i = 0; i < originalTopLines.length; i++) {
    currentLines[i] = originalTopLines[i];
}
fs.writeFileSync(danhsachPath, currentLines.join('\n'));
console.log('Restored danhsachmanhinh.md to original state using preserved top lines.');

// 2. PARSER AND MATCHER
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

const mapMaManHinh = {};
for (const row of doc1.rows) {
    const fnId = row['Function ID (*)'];
    if (!fnId) continue;
    if (!mapMaManHinh[fnId]) mapMaManHinh[fnId] = [];
    mapMaManHinh[fnId].push(row);
}

// Ensure headers exist
const T_MA_MAN_HINH_MAP = '**Mã Màn hình (mamanhinh.md)**';
const T_TEN_MAN_HINH_MAP = '**Tên màn hình/API (mamanhinh.md)**';

if (!doc2.headers.includes(T_MA_MAN_HINH_MAP)) {
    // Insert new headers right after Tên màn hình/API
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
        
        row[T_MA_MAN_HINH_MAP] = bestCandidate['Mã Màn hình'];
        row[T_TEN_MAN_HINH_MAP] = bestCandidate['Tên màn hình/API'];
        
        mappedCount++;
    }
}

console.log(`Successfully mapped ${mappedCount} rows into new columns.`);

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
        // Construct correct separator line based on new headers count
        const sep = doc2.headers.map(() => '---');
        outLines.push('| ' + sep.join(' | ') + ' |');
    } else {
        outLines.push(line);
    }
}

fs.writeFileSync(danhsachPath, outLines.join('\n'));
console.log('Wrote updated structure to ' + danhsachPath);
