const fs = require('fs');
const path = require('path');

const sourceFile = 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/mauthuthapCSDL.md';
const outputDir = 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/csdl_trong_nganh';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

let data = fs.readFileSync(sourceFile, 'utf8');

// Robust major section regex: Starts with ## 4.2.3.X. (where X is 1-2 digits)
let lines = data.split('\n');
let sectionIndices = [];
for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('## 4.2.3.') && lines[i].match(/^## 4\.2\.3\.\d+\.\s+PM02/)) {
        sectionIndices.push(i);
    }
}

const filenames = [
    '01_Khai_sinh.md', '02_Ket_hon.md', '03_Cap_GDKN_ket_hon.md',
    '04_Khai_tu.md', '05_Nhan_cha_me_con.md', '06_Nuoi_con_nuoi.md',
    '07_Giam_ho.md', '08_Cham_dut_giam_ho.md', '09_Thay_doi_TT_ho_tich.md',
    '10_Kiem_sat_giam_ho.md', '11_Giam_sat_giam_ho.md', '12_Ly_hon_nuoc_ngoai.md',
    '13_Quoc_tich.md'
];

let headerLines = lines.slice(0, sectionIndices[0]);
let header = headerLines.join('\n');

for (let i = 0; i < sectionIndices.length; i++) {
    let startLine = sectionIndices[i];
    let endLine = (i + 1 < sectionIndices.length) ? sectionIndices[i+1] : lines.length;
    let sectionContent = lines.slice(startLine, endLine).join('\n');
    
    if (i < filenames.length) {
        let fullFileContent = header + '\n\n' + sectionContent;
        // Fix image paths
        fullFileContent = fullFileContent.replace(/\]\(images\//g, '](../images/');
        
        fs.writeFileSync(path.join(outputDir, filenames[i]), fullFileContent, 'utf8');
        console.log('Final saved ' + (i+1) + ': ' + filenames[i] + ' (' + sectionContent.length + ' chars)');
    }
}
