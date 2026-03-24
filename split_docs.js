const fs = require('fs');
const path = require('path');

const sourceFile = 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/mauthuthapCSDL.md';
const outputDir = 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/csdl_trong_nganh';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

let data = fs.readFileSync(sourceFile, 'utf8');
let sections = data.split('## 4.2.3.');
let header = sections[0];

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

sections.slice(1).forEach((content, idx) => {
    if (idx < filenames.length) {
        let fullContent = header + '\\n' + '## 4.2.3.' + content;
        fs.writeFileSync(path.join(outputDir, filenames[idx]), fullContent, 'utf8');
        console.log('Saved: ' + filenames[idx]);
    }
});
