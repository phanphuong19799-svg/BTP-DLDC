const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'tailieu', 'tailieuphantich', 'images', 'thuthap');
const sourceImage = path.join(imagesDir, 'MH06_M10_hotich_new.png');

const datasets = [
    { id: 'hotich', name: 'CSDL Hộ tịch điện tử' },
    { id: 'quoctich', name: 'HT quản lý hồ sơ QT' },
    { id: 'thihanhan', name: 'CSDL thi hành án dân sự' },
    { id: 'bienphapBD', name: 'CSDL về biện pháp BĐ' },
    { id: 'phapluat', name: 'CSDL quốc gia về PL' },
    { id: 'tutuphap', name: 'CSDL TT Tư Pháp dân sự' },
    { id: 'tttgphaply', name: 'HTTT TTTG pháp lý dân sự' },
    { id: 'trogiupphaply', name: 'HTTT TG Pháp lý' },
    { id: 'hoagiai', name: 'CSDL PB, GĐ và HG cơ sở' },
    { id: 'daugia', name: 'CSDL về TG tài sản' },
    { id: 'trongtai', name: 'CSDL về TT thương mại' },
    { id: 'luatsu', name: 'CSDL về tổ chức h/đ luật sư' },
    { id: 'tuvanphapluat', name: 'CSDL về TV pháp luật' },
    { id: 'giamdinh', name: 'CSDL về GĐ tư pháp' },
    { id: 'congchung', name: 'HTTT các tổ chức công chứng' },
    { id: 'chungthuc', name: 'CSDL chứng thực' }
];

datasets.forEach((dataset, index) => {
    const filename = `MH06_M${10 + index}_${dataset.id}.png`;
    const targetPath = path.join(imagesDir, filename);
    try {
        fs.copyFileSync(sourceImage, targetPath);
        console.log(`Copied placeholder for ${filename}`);
    } catch (e) {
        console.error(`Failed to copy ${filename}`, e);
    }
});

// For ngoai nganh
const ngoaiNganhFiles = [
    'MH07_M10_ngoainganh_danhmuc.png',
    'MH07_M11_ngoainganh_banan.png'
];

const sourceNgoaiNganh = path.join(imagesDir, 'MH07_M01_ds_doisoat_ngoainganh.png');
ngoaiNganhFiles.forEach((file) => {
    const targetPath = path.join(imagesDir, file);
    try {
        fs.copyFileSync(sourceNgoaiNganh, targetPath);
        console.log(`Copied placeholder for ${file}`);
    } catch (e) {
        console.error(`Failed to copy ${file}`, e);
    }
});

console.log("All missing images filled with placeholders.");
