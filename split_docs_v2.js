const fs = require('fs');
const path = require('path');

const sourceFile = 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/mauthuthapCSDL.md';
const outputDir = 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/csdl_trong_nganh';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

let data = fs.readFileSync(sourceFile, 'utf8');

// Find all indices of '## 4.2.3.'
let regex = /## 4\.2\.3\.\d+\./g;
let matches = [];
let match;
while ((match = regex.exec(data)) !== null) {
    matches.push({ index: match.index, text: match[0] });
}

const filenames = [
    '01_Khai_sinh.md',
    '02_Ket_hon.md',
    '03_Cap_GDKN_ket_hon.md',
    '04_Khai_tu.md',
    '05_Nhan_cha_me_con.md',
    '06_Nuoi_con_nuoi.md',
    '07_Giam_ho.md',
    '08_Cham_dut_giam_ho.md',
    '09_Thay_doi_TT_ho_tich.md',
    '10_Kiem_sat_giam_ho.md',
    '11_Giam_sat_giam_ho.md',
    '12_Ly_hon_nuoc_ngoai.md',
    '13_Quoc_tich.md'
];

let header = data.substring(0, matches[0].index);

for (let i = 0; i < matches.length; i++) {
    let start = matches[i].index;
    let end = (i + 1 < matches.length) ? matches[i+1].index : data.length;
    let content = data.substring(start, end);
    
    if (i < filenames.length) {
        let fullFileContent = header + '\n' + content;
        fs.writeFileSync(path.join(outputDir, filenames[i]), fullFileContent, 'utf8');
        console.log('Successfully saved ' + (i+1) + ': ' + filenames[i]);
    }
}
