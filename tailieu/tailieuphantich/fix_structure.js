const fs = require('fs');

const tgtFile = 'phantichtong.md';
let lines = fs.readFileSync(tgtFile, 'utf-8').split('\n');
let newLines = [];
let counts = { htmlCaption: 0, bulletManhinh: 0, tableHeader: 0, cnHeader: 0 };

let i = 0;
while (i < lines.length) {
    let line = lines[i];
    const cr = line.endsWith('\r');
    const l = cr ? line.slice(0, -1) : line;
    const suffix = cr ? '\r' : '';

    // 1. Fix HTML caption → markdown italic
    // Pattern: <p align="center" ...>Hình X - ...</p>
    if (l.includes('<p align') && l.includes('</p>')) {
        const textMatch = l.match(/<p[^>]*>(.*?)<\/p>/);
        if (textMatch) {
            let caption = textMatch[1].trim();
            // Normalize dash: " - " or " – " → " – "
            caption = caption.replace(/\s+-\s+/, ' – ');
            newLines.push('*' + caption + '*' + suffix);
            counts.htmlCaption++;
            i++;
            continue;
        }
    }

    // 2. Remove "- Màn hình:" or "- Màn hình: (Popup)" bullet line
    // Keep the line "##### Màn hình" but remove the bullet below it
    if (l.trim() === '- Màn hình:' || l.trim() === '- Màn hình: (Popup)' || l.trim() === '- Màn hình: *(Popup)*') {
        counts.bulletManhinh++;
        i++;
        continue;
    }

    // 3. Fix table header for "Mô tả thông tin trên màn hình"
    // Old: | Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
    // New: | **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |
    if ((l.includes('| Trường thông tin |') || l.includes('| **Trường thông tin** |')) &&
        l.includes('Kiểu dữ liệu') && l.includes('Mô tả')) {
        // Replace old header with new one
        newLines.push('| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |' + suffix);
        // Check next line is separator - need to update it too
        if (i + 1 < lines.length) {
            const nextL = lines[i + 1].replace(/\r$/, '');
            if (nextL.match(/^\|[\s:-]+\|/)) {
                i++;
                newLines.push('| --- | --- | --- | --- | --- | --- |' + suffix);
            }
        }
        counts.tableHeader++;
        i++;
        continue;
    }

    // 4. Fix table header for "Chức năng trên màn hình"
    // Old: | STT | Mã chức năng | Định dạng | Mô tả |
    // New template structure:
    //   |  |  |  |  |
    //   | --- | --- | --- | --- |
    //   | **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |
    if ((l.includes('| STT | Mã chức năng |') || l.includes('| STT | **Mã chức năng**')) &&
        l.includes('Định dạng') && l.includes('Mô tả')) {
        newLines.push('|  |  |  |  |' + suffix);
        newLines.push('| --- | --- | --- | --- |' + suffix);
        newLines.push('| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |' + suffix);
        // Skip old separator line
        if (i + 1 < lines.length && lines[i + 1].replace(/\r$/, '').match(/^\|[\s:-]+\|/)) {
            i++;
        }
        counts.cnHeader++;
        i++;
        continue;
    }

    newLines.push(line);
    i++;
}

fs.writeFileSync(tgtFile, newLines.join('\n'));
console.log('Done!');
console.log(`Fixed ${counts.htmlCaption} HTML captions → *Hình X – ...*`);
console.log(`Removed ${counts.bulletManhinh} "- Màn hình:" bullets`);
console.log(`Fixed ${counts.tableHeader} table headers (Trường thông tin → STT + Tên trường)`);
console.log(`Fixed ${counts.cnHeader} function table headers (Mã chức năng → Tên chức năng)`);
