const fs = require('fs');

const targetFile = 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/mauthuthapCSDL.md';
let data = fs.readFileSync(targetFile, 'utf8');

// Normalize headers: If it starts with #, ##, ###, #### or ######, we'll strip the old numbering and re-apply it.
let lines = data.split('\n');
let newLines = ['# 4.2.3. DC102.QLTT.TN  CSDL Trong ngành', ''];

const sectionTitles = [
    { match: 'khai sinh', code: 'KS', title: 'Hồ sơ đăng ký khai sinh' },
    { match: 'kết hôn', code: 'KH', title: 'Hồ sơ đăng ký kết hôn' },
    { match: 'GĐKN', code: 'GDKN', title: 'Hồ sơ cấp GĐKN kết hôn' },
    { match: 'khai tử', code: 'KT', title: 'Hồ sơ đăng ký khai tử' },
    { match: 'nhận cha', code: 'NC', title: 'Hồ sơ DK nhận cha, mẹ, con' },
    { match: 'nuôi con nuôi', code: 'NN', title: 'Hồ sơ đăng ký nuôi con nuôi' },
    { match: 'giám hộ', code: 'GH', title: 'Hồ sơ đăng ký giám hộ' },
    { match: 'chấm dứt giám hộ', code: 'CDGH', title: 'Hồ sơ DK chấm dứt giám hộ' },
    { match: 'thay đổi TT hộ tịch', code: 'TDHT', title: 'Hồ sơ DK thay đổi TT hộ tịch' },
    { match: 'kiểm sát việc giám hộ', code: 'KSGH', title: 'Hồ sơ đăng ký kiểm sát việc giám hộ' },
    { match: 'giám sát việc giám hộ', code: 'GSGH', title: 'Hồ sơ đăng ký giám sát việc giám hộ' },
    { match: 'nước ngoài', code: 'LH', title: 'Hồ sơ ly hôn/hủy kết hôn ở nước ngoài' },
    { match: 'quốc tịch', code: 'QT', title: 'Hệ thống quản lý hồ sơ quốc tịch' }
];

let currentSectIdx = 0;
let currentScreenIdx = 0;
let imgTotalCount = 23;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line.startsWith('# 4.2.3.')) continue;
    if (line === '') continue;

    // Is it a major section? (Hồ sơ...)
    let matchedSect = sectionTitles.find(s => line.toLowerCase().includes(s.match.toLowerCase()) && (line.startsWith('##') || line.startsWith('######')));
    if (matchedSect) {
        currentSectIdx = sectionTitles.indexOf(matchedSect) + 1;
        currentScreenIdx = 0;
        newLines.push('## 4.2.3.' + currentSectIdx + '. PM02.QLTT.TN.' + matchedSect.code + '  ' + matchedSect.title, '');
        continue;
    }

    if (currentSectIdx === 0) continue;

    // Is it a screen title?
    if (line.includes('Màn danh sách') || line.includes('Màn hình thông tin chi tiết') || line.includes('Tab Thông tin') || line.includes('Dashboard Thu thập') || line.includes('Tab Lịch sử')) {
        currentScreenIdx++;
        let sName = line.replace(/^[#\s.0-9a-zA-Z\-_]+/, '').trim();
        if (sName === '') sName = line;
        newLines.push('### 4.2.3.' + currentSectIdx + '.' + currentScreenIdx + ' ' + sName, '');
        continue;
    }

    // Sub-sections
    if (line.includes('Mô tả thông tin trên màn hình')) {
        newLines.push('#### 4.2.3.' + currentSectIdx + '.' + currentScreenIdx + '.1 Mô tả thông tin trên màn hình', '');
        continue;
    }
    if (line.includes('Chức năng trên màn hình')) {
        newLines.push('#### 4.2.3.' + currentSectIdx + '.' + currentScreenIdx + '.2 Chức năng trên màn hình', '');
        continue;
    }

    // Image Captions
    if (line.startsWith('Hình ') || (line.startsWith('*Hình ') && line.includes('  '))) {
        imgTotalCount++;
        let caption = line.replace(/^\*?Hình \d+\s*\s*/, '').replace(/\*$/, '').trim();
        newLines.push('*Hình ' + imgTotalCount + '  ' + caption + '*', '');
        continue;
    }

    // Table headers
    if (line.includes('| **Trường thông tin** |') || line.includes('| **Tên trường thông tin** |')) {
        newLines.push('| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |');
        newLines.push('| --- | --- | --- | --- | --- | --- |');
        i++; continue;
    }
    if (line.includes('| **TT** |') || line.includes('| **Tên chức năng** |')) {
        newLines.push('| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |');
        newLines.push('| --- | --- | --- | --- |');
        i++; continue;
    }

    // Standardize table rows (STT formatting)
    if (line.startsWith('|')) {
        // Fix table rows if possible or just pass
        newLines.push(line);
    } else {
        newLines.push(line);
    }
}

fs.writeFileSync(targetFile, newLines.join('\n'), 'utf8');
