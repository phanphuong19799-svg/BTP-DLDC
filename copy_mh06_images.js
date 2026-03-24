const fs = require('fs');
const path = require('path');

const artifactsDir = 'C:\\Users\\trinh\\.gemini\\antigravity\\brain\\54bf9033-e002-4afc-b7bc-7253f3b69dc3';
const targetDir = path.join(__dirname, 'tailieu', 'tailieuphantich', 'images', 'thuthap');

const mappings = [
    { src: 'mh06_m07_xoa_cauhinh_1774253564687.png', dst: 'MH06_M07_xoa_cauhinh.png' },
    { src: 'mh06_m11_quoc_tich_1774253593827.png', dst: 'MH06_M11_quoc_tich.png' },
    { src: 'mh06_m12_thi_hanh_an_1774253619957.png', dst: 'MH06_M12_thiahanhan.png' },
    { src: 'mh06_m14_quocgia_pl_1774253666560.png', dst: 'MH06_M14_quocgia_pl.png' },
    { src: 'mh06_m15_tt_tuphap_1774253729446.png', dst: 'MH06_M15_tt_tuphap.png' },
    { src: 'mh06_m16_tttg_phaply_1774253757369.png', dst: 'MH06_M16_tttg_phaply.png' },
    { src: 'mh06_m17_tg_phaply_1774253861563.png', dst: 'MH06_M17_tg_phaply.png' },
    { src: 'mh06_m18_pbgdhg_1774253890683.png', dst: 'MH06_M18_pbgdhg.png' },
    { src: 'mh06_m20_htqt_1774253914624.png', dst: 'MH06_M20_htqt.png' },
    { src: 'mh06_m21_thongke_1774253944600.png', dst: 'MH06_M21_thongke.png' },
    { src: 'mh06_m22_congchung_1774253991833.png', dst: 'MH06_M22_congchung.png' },
    { src: 'mh06_m23_chungthuc_1774254016985.png', dst: 'MH06_M23_chungthuc.png' },
];

let success = 0;
for (const m of mappings) {
    const srcPath = path.join(artifactsDir, m.src);
    const dstPath = path.join(targetDir, m.dst);
    try {
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, dstPath);
            console.log(`✓ Copied ${m.dst}`);
            success++;
        } else {
            console.error(`✗ Source not found: ${m.src}`);
        }
    } catch (e) {
        console.error(`✗ Error copying ${m.dst}: ${e.message}`);
    }
}

console.log(`\nDone. ${success}/${mappings.length} images copied.`);
