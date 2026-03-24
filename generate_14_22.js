const fs = require('fs');
const path = require('path');

const outputDir = 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/csdl_trong_nganh';
const header = "# 4.2.3. DC102.QLTT.TN  CSDL Trong ngành\n\n";

const modules = [
    { name: "Thi hành án dân sự", code: "THADS", idx: 14, imgPrefix: "thianhansu" },
    { name: "CSDL về biện pháp bảo đảm", code: "BPBD", idx: 15, imgPrefix: "bpbd" },
    { name: "CSDL quốc gia về PL", code: "QGVPL", idx: 16, imgPrefix: "qgvpl" },
    { name: "CSDL thông tin tư pháp dân sự", code: "TTTPDS", idx: 17, imgPrefix: "tttphs" }, // wait, my previous scripts used 'tttphs' for the image name
    { name: "HTTT thực hiện trợ giúp pháp lý dân sự", code: "TGPLDS", idx: 18, imgPrefix: "tgplds" },
    { name: "HTTT Trợ giúp pháp lý", code: "TGPL", idx: 19, imgPrefix: "tgpl" },
    { name: "CSDL PB, GĐ và HG cơ sở", code: "PBGDPL", idx: 20, imgPrefix: "pbgdpl" },
    { name: "CSDL quản lý đấu giá TS", code: "DGTS", idx: 21, imgPrefix: "dgts" },
    { name: "CSDL Hợp tác quốc tế", code: "HTQT", idx: 22, imgPrefix: "htqt" }
];

const filenames = [
    "14_Thi_hanh_an_dan_su.md",
    "15_Bien_phap_bao_dam.md",
    "16_Quoc_gia_ve_phap_luat.md",
    "17_Thong_tin_tu_phap_dan_su.md",
    "18_Tro_giup_phap_ly_dan_su.md",
    "19_Tro_giup_phap_ly.md",
    "20_Pho_bien_giao_duc_phap_luat.md",
    "21_Quan_ly_dau_gia_tai_san.md",
    "22_Hop_tac_quoc_te.md"
];

for (let i = 0; i < modules.length; i++) {
    const mod = modules[i];
    let content = header;
    content += `## 4.2.3.${mod.idx}. PM02.QLTT.TN.${mod.code} – ${mod.name}\n\n`;

    // Dashboard
    content += `### 4.2.3.${mod.idx}.1 Dashboard ${mod.name}\n\nMàn hình\n\n![](../images/mauthuthapCSDL_${mod.imgPrefix}_dashboard.png)\n\n*Hình ${86 + i * 5 + 1} – Màn hình Dashboard ${mod.name}*\n\n#### 4.2.3.${mod.idx}.1.1 Mô tả thông tin trên màn hình\n| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |\n| --- | --- | --- | --- | --- | --- |\n| 1 | Thống kê số liệu | Card | | | Các con số thống kê hồ sơ ${mod.name}. |\n| 2 | Biểu đồ thu thập | Chart | | | Biểu đồ trực quan hóa dữ liệu theo thời gian. |\n\n#### 4.2.3.${mod.idx}.1.2 Chức năng trên màn hình\n| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |\n| --- | --- | --- | --- |\n| 1 | Kết xuất | Button | Xuất dữ liệu dashboard ra file báo cáo. |\n---\n\n`;

    // List
    content += `### 4.2.3.${mod.idx}.2 Màn danh sách dữ liệu ${mod.name}\n\nMàn hình\n\n![](../images/mauthuthapCSDL_${mod.imgPrefix}_img_001.png)\n\n*Hình ${86 + i * 5 + 2} – Màn danh sách dữ liệu ${mod.name}*\n\n#### 4.2.3.${mod.idx}.2.1 Mô tả thông tin trên màn hình\n| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |\n| --- | --- | --- | --- | --- | --- |\n| 1 | Từ khóa tìm kiếm | Text | Không | | Nhập từ khóa để tìm kiếm bản ghi. |\n| 2 | Bảng danh sách | Table | Có | | Hiển thị danh sách hồ sơ: STT, Mã hồ sơ, Trạng thái... |\n\n#### 4.2.3.${mod.idx}.2.2 Chức năng trên màn hình\n| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |\n| --- | --- | --- | --- |\n| 1 | Tìm kiếm | Button | Thực hiện lọc dữ liệu theo điều kiện nhập. |\n| 2 | Xem chi tiết | Icon Eye | Mở popup xem chi tiết thông tin hồ sơ. |\n---\n\n`;

    // Detail
    content += `### 4.2.3.${mod.idx}.3 Màn hình thông tin chi tiết ${mod.name}\n\nMàn hình\n\n![](../images/mauthuthapCSDL_${mod.imgPrefix}_img_002.png)\n\n*Hình ${86 + i * 5 + 3} – Màn hình thông tin chi tiết ${mod.name}*\n\n#### 4.2.3.${mod.idx}.3.1 Mô tả thông tin trên màn hình\n| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |\n| --- | --- | --- | --- | --- | --- |\n| 1 | Thông tin hồ sơ | Section | Có | | Các trường thông tin chi tiết của bản ghi. |\n\n#### 4.2.3.${mod.idx}.3.2 Chức năng trên màn hình\n| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |\n| --- | --- | --- | --- |\n| 1 | Đóng | Button | Đóng popup chi tiết, quay lại danh sách. |\n---\n\n`;

    // Connection History
    content += `### 4.2.3.${mod.idx}.4 Tab Lịch sử chỉnh sửa kết nối ${mod.name}\n\nMàn hình\n\n![](../images/mauthuthapCSDL_${mod.imgPrefix}_img_003.png)\n\n*Hình ${86 + i * 5 + 4} – Tab Lịch sử chỉnh sửa kết nối ${mod.name}*\n\n#### 4.2.3.${mod.idx}.4.1 Mô tả thông tin trên màn hình\n| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |\n| --- | --- | --- | --- | --- | --- |\n| 1 | Bảng lịch sử | Table | Có | | Ghi lại các lần thay đổi thông tin kết nối. |\n\n#### 4.2.3.${mod.idx}.4.2 Chức năng trên màn hình\n| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |\n| --- | --- | --- | --- |\n| 1 | Xem log | Link | Nhấn để xem chi tiết nội dung thay đổi. |\n---\n\n`;

    // Sync History
    content += `### 4.2.3.${mod.idx}.5 Tab Lịch sử đồng bộ ${mod.name}\n\nMàn hình\n\n![](../images/mauthuthapCSDL_${mod.imgPrefix}_img_004.png)\n\n*Hình ${86 + i * 5 + 5} – Tab Lịch sử đồng bộ ${mod.name}*\n\n#### 4.2.3.${mod.idx}.5.1 Mô tả thông tin trên màn hình\n| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |\n| --- | --- | --- | --- | --- | --- |\n| 1 | Bảng lịch sử | Table | Có | | Ghi lại các lần thay đổi trạng thái đồng bộ. |\n\n#### 4.2.3.${mod.idx}.5.2 Chức năng trên màn hình\n| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |\n| --- | --- | --- | --- |\n| 1 | Xem log | Link | Nhấn để xem chi tiết nội dung thay đổi. |`;

    fs.writeFileSync(path.join(outputDir, filenames[i]), content, 'utf8');
    console.log('Saved ' + filenames[i]);
}
