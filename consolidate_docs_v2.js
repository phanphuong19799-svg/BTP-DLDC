const fs = require('fs');
const path = require('path');

const IN_DIR = 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/csdl_trong_nganh';
const OUT_DIR = 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/csdl_tap_trung';
const IMG_REL = '../images';

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const GROUPS = [
    { title: 'CSDL Hộ tịch điện tử', slug: 'hotich', files: ['01_Khai_sinh.md', '02_Ket_hon.md', '03_Cap_GDKN_ket_hon.md', '04_Khai_tu.md', '05_Nhan_cha_me_con.md', '06_Nuoi_con_nuoi.md', '07_Giam_ho.md', '08_Cham_dut_giam_ho.md', '09_Thay_doi_TT_ho_tich.md', '10_Kiem_sat_giam_ho.md', '11_Giam_sat_giam_ho.md', '12_Ly_hon_nuoc_ngoai.md'] },
    { title: 'Hệ thống quản lý hồ sơ quốc tịch', slug: 'nationality', files: ['13_Quoc_tich.md'] },
    { title: 'CSDL thi hành án dân sự', slug: 'thianhansu', files: ['14_Thi_hanh_an_dan_su.md'] },
    { title: 'CSDL về biện pháp bảo đảm', slug: 'bpbd', files: ['15_Bien_phap_bao_dam.md'] },
    { title: 'CSDL quốc gia về pháp luật', slug: 'qgvpl', files: ['16_Quoc_gia_ve_phap_luat.md'] },
    { title: 'CSDL thông tin tư pháp dân sự', slug: 'tttphs', files: ['17_Thong_tin_tu_phap_dan_su.md'] },
    { title: 'HTTT thực hiện trợ giúp pháp lý dân sự', slug: 'tgplds', files: ['18_Tro_giup_phap_ly_dan_su.md'] },
    { title: 'HTTT Trợ giúp Pháp lý', slug: 'tgpl', files: ['19_Tro_giup_phap_ly.md'] },
    { title: 'CSDL PB, GĐ và HG cơ sở', slug: 'pbgdpl', files: ['20_Pho_bien_giao_duc_phap_luat.md'] },
    { title: 'CSDL quản lý đấu giá tài sản', slug: 'dgts', files: ['21_Quan_ly_dau_gia_tai_san.md'] },
    { title: 'CSDL Hợp tác quốc tế', slug: 'htqt', files: ['22_Hop_tac_quoc_te.md'] }
];

GROUPS.forEach((group, idx) => {
    const groupNum = idx + 1;
    const groupCode = `4.2.3.${groupNum}`;
    const filename = `${String(groupNum).padStart(2, '0')}_${group.title.replace(/ /g, '_').replace(/,/g, '')}.md`;
    
    let content = `# 4.2.3. DC102.QLTT.TN – CSDL Trong ngành\n\n`;
    content += `## ${groupCode}. ${group.title}\n\n`;
    
    // 1. Dashboard Section
    content += `### ${groupCode}.1 Dashboard ${group.title}\n\n`;
    content += `Màn hình\n\n`;
    content += `![](${IMG_REL}/mauthuthapCSDL_${group.slug}_dashboard.png)\n\n`;
    content += `*Hình ${groupNum} – Màn hình Dashboard ${group.title}*\n\n`;
    content += `#### ${groupCode}.1.1 Mô tả thông tin trên màn hình\n`;
    content += `| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |\n`;
    content += `| --- | --- | --- | --- | --- | --- |\n`;
    content += `| 1 | Thẻ thống kê | Card/Number | | | Hiển thị các chỉ số thống kê tổng hợp của CSDL. |\n`;
    content += `| 2 | Biểu đồ xu hướng | Chart | | | Biểu đồ trực quan hóa tình hình thu thập dữ liệu. |\n\n`;
    content += `#### ${groupCode}.1.2 Chức năng trên màn hình\n`;
    content += `| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |\n`;
    content += `| --- | --- | --- | --- |\n`;
    content += `| 1 | Kết xuất | Button | Xuất báo cáo tổng hợp dưới dạng file. |\n`;
    content += `| 2 | Đồng bộ | Button | Kích hoạt tiến trình đồng bộ dữ liệu tổng thể. |\n\n`;
    content += `---\n\n`;

    // 2. Modules Sections
    group.files.forEach((file, fIdx) => {
        const filePath = path.join(IN_DIR, file);
        if (fs.existsSync(filePath)) {
            let fileContent = fs.readFileSync(filePath, 'utf8');
            const moduleNum = fIdx + 2;
            const moduleCode = `${groupCode}.${moduleNum}`;

            // Skip the first # header
            const lines = fileContent.split('\n').filter(line => !line.startsWith('# '));
            
            let processedLines = lines.map(line => {
                // Increase header levels
                if (line.startsWith('#### ')) return line.replace('#### ', '##### ');
                if (line.startsWith('### ')) {
                    // Renumber sub-screens: 4.2.3.x.y.z
                    const titleMatch = line.match(/^### [\d.]+(.*)/);
                    if (titleMatch) {
                        // Extract z from 4.2.3.x.z
                        const parts = line.split(' ')[1].split('.');
                        const z = parts[parts.length - 1] || (fIdx + 1); // fallback
                        return `#### ${moduleCode}.${z}${titleMatch[1]}`;
                    }
                    return line.replace('### ', '#### ');
                }
                if (line.startsWith('## ')) {
                    // Renumber module header: 4.2.3.x.y
                    const titleMatch = line.match(/^## [\d.]+(.*)/);
                    if (titleMatch) {
                        return `### ${moduleCode}${titleMatch[1]}`;
                    }
                    return line.replace('## ', '### ');
                }
                return line;
            });

            content += processedLines.join('\n') + '\n\n';
        }
    });

    fs.writeFileSync(path.join(OUT_DIR, filename), content, 'utf8');
    console.log(`Generated: ${filename}`);
});
