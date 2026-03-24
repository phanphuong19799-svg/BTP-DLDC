const fs = require('fs');

// Phân tích cấu trúc phantichtong.md và so sánh với template mautailieu.md
// Mục tiêu: tìm các vấn đề cấu trúc để sửa

const tgtFile = 'phantichtong.md';
const lines = fs.readFileSync(tgtFile, 'utf-8').split('\n');

let issues = [];
let stats = {
    htmlCaptions: 0,       // <p align...> thay vì *Hình X – ...*
    bulletManhinh: 0,      // "- Màn hình:" dư thừa
    oldTableTtl: 0,        // Table header: Trường thông tin (cần STT + Tên trường)
    maCNField: 0,          // "Mã chức năng" trong table chức năng (cần "Tên chức năng")
    inlineImg: 0,          // ![...](path) - ok
    sectionMucdich: 0,     // ### *Mục đích* - có trong file, không trong template
};

for (let i = 0; i < lines.length; i++) {
    const l = lines[i].replace(/\r$/, '');

    // HTML caption
    if (l.includes('<p align') && l.includes('Hình')) {
        stats.htmlCaptions++;
        if (stats.htmlCaptions <= 5) issues.push(`Line ${i+1}: HTML caption → should be *Hình X – ...*`);
    }

    // - Màn hình:
    if (l.trim() === '- Màn hình:' || l.trim() === '- Màn hình: (Popup)') {
        stats.bulletManhinh++;
    }

    // Table header: "Trường thông tin"
    if (l.includes('| Trường thông tin |') || l.includes('| **Trường thông tin** |')) {
        stats.oldTableTtl++;
        if (stats.oldTableTtl <= 3) issues.push(`Line ${i+1}: Table header "Trường thông tin" → should be "STT | Tên trường thông tin"`);
    }

    // Table chức năng dùng "Mã chức năng" thay vì "Tên chức năng"
    if (l.includes('| Mã chức năng |') || l.includes('| **Mã chức năng** |')) {
        stats.maCNField++;
    }

    // Mục đích section
    if (l.includes('### *') && l.includes('Mục đích')) {
        stats.sectionMucdich++;
    }
}

console.log('\n=== PHÂN TÍCH CẤU TRÚC phantichtong.md ===\n');
console.log('Vấn đề cần sửa theo mautailieu.md:');
console.log(`1. HTML captions (<p align...>): ${stats.htmlCaptions} chỗ → cần đổi thành *Hình X – ...*`);
console.log(`2. "- Màn hình:" bullet dư thừa: ${stats.bulletManhinh} chỗ → xóa đi`);
console.log(`3. Table header "Trường thông tin": ${stats.oldTableTtl} chỗ → đổi thành "STT | Tên trường thông tin"`);
console.log(`4. Table chức năng "Mã chức năng": ${stats.maCNField} chỗ → đổi thành "Tên chức năng"`);
console.log(`5. Section mục đích (###*): ${stats.sectionMucdich} chỗ → không có trong template\n`);

console.log('Mẫu thay đổi:');
console.log('TRƯỚC: <p align="center" ...>Hình 1 - Màn hình...</p>');
console.log('SAU:   *Hình 1 – Màn hình...*\n');
console.log('TRƯỚC: | Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |');
console.log('SAU:   | **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |\n');
console.log('TRƯỚC: | STT | Mã chức năng | Định dạng | Mô tả |');
console.log('SAU:   |  |  |  |  | (header row ở TRÊN)');
console.log('       | **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |\n');

console.log('Mẫu issues đầu tiên:');
issues.forEach(i => console.log(' ', i));
