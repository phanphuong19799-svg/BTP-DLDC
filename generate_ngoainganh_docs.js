const fs = require('fs');
const path = require('path');

const artDir = 'C:/Users/trinh/.gemini/antigravity/brain/03e0616c-8ad7-49da-9fd0-d630dac9f718';
const imgDir = 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/images';
const docDir = 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/csdl_ngoai_nganh';

// Move and rename images
const files = fs.readdirSync(artDir);
files.forEach(file => {
    if (file.toLowerCase().startsWith('mauthuthapcsdl_ngoainganh_') && file.endsWith('.png')) {
        let cleanName = file.replace(/_png_\d{13}\.png$/, '.png').replace(/_\d{13}\.png$/, '.png');
        // also fix the case to match convention if needed
        cleanName = cleanName.replace('mauthuthapcsdl_', 'mauthuthapCSDL_');
        fs.copyFileSync(path.join(artDir, file), path.join(imgDir, cleanName));
        console.log(`Copied ${file} -> ${cleanName}`);
    }
});

// Generate Markdown docs
const header = "# 4.2.4. DC102.QLTT.NN CSDL Ngoài ngành\n\n";

const modules = [
    { name: "CSDL Thông tin Bản án", code: "BANAN", idx: 1, imgPrefix: "banan" },
    { name: "Danh mục", code: "DANHMUC", idx: 2, imgPrefix: "danhmuc" },
    { name: "BHXH và Giảm nghèo", code: "BHXH", idx: 3, imgPrefix: "bhxh" },
    { name: "Người có công", code: "NCC", idx: 4, imgPrefix: "ncc" },
    { name: "Trẻ em", code: "TREEM", idx: 5, imgPrefix: "treem" }
];

const filenames = [
    "01_Thong_tin_ban_an.md",
    "02_Danh_muc.md",
    "03_BHXH_va_Giam_ngheo.md",
    "04_Nguoi_co_cong.md",
    "05_Tre_em.md"
];

for (let i = 0; i < modules.length; i++) {
    const mod = modules[i];
    let content = header;
    content += `## 4.2.4.${mod.idx}. PM02.QLTT.NN.${mod.code} – ${mod.name}\n\n`;

    // Dashboard
    content += `### 4.2.4.${mod.idx}.1 Dashboard ${mod.name}\n\nMàn hình\n\n![](../images/mauthuthapCSDL_ngoainganh_${mod.imgPrefix}_dashboard.png)\n\n*Hình 1${mod.idx}1 – Màn hình Dashboard ${mod.name}*\n\n#### 4.2.4.${mod.idx}.1.1 Mô tả thông tin trên màn hình\n| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |\n| --- | --- | --- | --- | --- | --- |\n| 1 | Thống kê số liệu | Card | | | Các con số thống kê hồ sơ ${mod.name}. |\n| 2 | Biểu đồ thu thập | Chart | | | Biểu đồ trực quan hóa dữ liệu theo thời gian. |\n\n#### 4.2.4.${mod.idx}.1.2 Chức năng trên màn hình\n| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |\n| --- | --- | --- | --- |\n| 1 | Kết xuất | Button | Xuất dữ liệu dashboard ra file báo cáo. |\n---\n\n`;

    // List
    content += `### 4.2.4.${mod.idx}.2 Màn danh sách dữ liệu ${mod.name}\n\nMàn hình\n\n![](../images/mauthuthapCSDL_ngoainganh_${mod.imgPrefix}_img_001.png)\n\n*Hình 1${mod.idx}2 – Màn danh sách dữ liệu ${mod.name}*\n\n#### 4.2.4.${mod.idx}.2.1 Mô tả thông tin trên màn hình\n| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |\n| --- | --- | --- | --- | --- | --- |\n| 1 | Từ khóa tìm kiếm | Text | Không | | Nhập từ khóa để tìm kiếm bản ghi. |\n| 2 | Bảng danh sách | Table | Có | | Hiển thị danh sách hồ sơ: STT, Mã hồ sơ, Trạng thái... |\n\n#### 4.2.4.${mod.idx}.2.2 Chức năng trên màn hình\n| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |\n| --- | --- | --- | --- |\n| 1 | Tìm kiếm | Button | Thực hiện lọc dữ liệu theo điều kiện nhập. |\n| 2 | Xem chi tiết | Icon Eye | Mở popup xem chi tiết thông tin hồ sơ. |\n---\n\n`;

    // Detail
    content += `### 4.2.4.${mod.idx}.3 Màn hình thông tin chi tiết ${mod.name}\n\nMàn hình\n\n![](../images/mauthuthapCSDL_ngoainganh_${mod.imgPrefix}_img_002.png)\n\n*Hình 1${mod.idx}3 – Màn hình thông tin chi tiết ${mod.name}*\n\n#### 4.2.4.${mod.idx}.3.1 Mô tả thông tin trên màn hình\n| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |\n| --- | --- | --- | --- | --- | --- |\n| 1 | Thông tin hồ sơ | Section | Có | | Các trường thông tin chi tiết của bản ghi. |\n\n#### 4.2.4.${mod.idx}.3.2 Chức năng trên màn hình\n| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |\n| --- | --- | --- | --- |\n| 1 | Đóng | Button | Đóng popup chi tiết, quay lại danh sách. |\n---\n\n`;

    // Connection History
    content += `### 4.2.4.${mod.idx}.4 Tab Lịch sử chỉnh sửa kết nối ${mod.name}\n\nMàn hình\n\n![](../images/mauthuthapCSDL_ngoainganh_${mod.imgPrefix}_img_003.png)\n\n*Hình 1${mod.idx}4 – Tab Lịch sử chỉnh sửa kết nối ${mod.name}*\n\n#### 4.2.4.${mod.idx}.4.1 Mô tả thông tin trên màn hình\n| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |\n| --- | --- | --- | --- | --- | --- |\n| 1 | Bảng lịch sử | Table | Có | | Ghi lại các lần thay đổi thông tin kết nối. |\n\n#### 4.2.4.${mod.idx}.4.2 Chức năng trên màn hình\n| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |\n| --- | --- | --- | --- |\n| 1 | Xem log | Link | Nhấn để xem chi tiết nội dung thay đổi. |\n---\n\n`;

    // Sync History
    content += `### 4.2.4.${mod.idx}.5 Tab Lịch sử đồng bộ ${mod.name}\n\nMàn hình\n\n![](../images/mauthuthapCSDL_ngoainganh_${mod.imgPrefix}_img_004.png)\n\n*Hình 1${mod.idx}5 – Tab Lịch sử đồng bộ ${mod.name}*\n\n#### 4.2.4.${mod.idx}.5.1 Mô tả thông tin trên màn hình\n| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |\n| --- | --- | --- | --- | --- | --- |\n| 1 | Bảng lịch sử | Table | Có | | Ghi lại các lần thay đổi trạng thái đồng bộ. |\n\n#### 4.2.4.${mod.idx}.5.2 Chức năng trên màn hình\n| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |\n| --- | --- | --- | --- |\n| 1 | Xem log | Link | Nhấn để xem chi tiết nội dung thay đổi. |`;

    fs.writeFileSync(path.join(docDir, filenames[i]), content, 'utf8');
    console.log('Saved ' + filenames[i]);
}
