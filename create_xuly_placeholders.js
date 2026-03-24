const fs = require('fs');
const path = require('path');

const thuthapDir = path.join(__dirname, 'tailieu', 'tailieuphantich', 'images', 'thuthap');
const xulyDir = path.join(__dirname, 'tailieu', 'tailieuphantich', 'images', 'xuly');

// Create xuly directory if it doesn't exist
if (!fs.existsSync(xulyDir)) {
    fs.mkdirSync(xulyDir, { recursive: true });
}

// Source image to copy (using an existing dashboard/placeholder image)
const sourceImage = path.join(thuthapDir, 'MH01_dashboard.png');

const missingImages = [
    'MH01_dashboard.png',
    'MH02_danhsach.png',
    'MH02_P01_quytac.png',
    'MH02_P02_baomat.png',
    'MH02_P03_loi.png',
    'MH02_P04_lichsu.png',
    'MH02_P05_themmoi.png',
    'MH02_P06_xoa.png',
    'MH02_P07_laplich.png'
];

missingImages.forEach((filename) => {
    const targetPath = path.join(xulyDir, filename);
    try {
        fs.copyFileSync(sourceImage, targetPath);
        console.log(`Copied placeholder to ${targetPath}`);
    } catch (e) {
        console.error(`Failed to copy ${filename}:`, e.message);
    }
});

console.log('Finished creating placeholder images for Xử lý dữ liệu.');
