const fs = require('fs');

const targetFile = 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/mauthuthapCSDL.md';

const modules = [
    { name: 'Hồ sơ đăng ký khai sinh', code: 'KS', slug: 'khaisinh', img: 'mauthuthapCSDL_img_' },
    { name: 'Hồ sơ đăng ký kết hôn', code: 'KH', slug: 'kethon', img: 'mauthuthapCSDL_kethon_img_' },
    { name: 'Hồ sơ cấp GĐKN kết hôn', code: 'GDKN', slug: 'gdknkethon', img: 'mauthuthapCSDL_gdknkethon_img_' },
    { name: 'Hồ sơ đăng ký khai tử', code: 'KT', slug: 'khaitu', img: 'mauthuthapCSDL_khaitu_img_' },
    { name: 'Hồ sơ DK nhận cha, mẹ, con', code: 'NC', slug: 'nhancha', img: 'mauthuthapCSDL_nhancha_img_' },
    { name: 'Hồ sơ đăng ký nuôi con nuôi', code: 'NN', slug: 'nuoicnuoi', img: 'mauthuthapCSDL_nuoicnuoi_img_' },
    { name: 'Hồ sơ đăng ký giám hộ', code: 'GH', slug: 'giamho', img: 'mauthuthapCSDL_giamho_img_' },
    { name: 'Hồ sơ DK chấm dứt giám hộ', code: 'CDGH', slug: 'chamdutgiamho', img: 'mauthuthapCSDL_chamdutgiamho_img_' },
    { name: 'Hồ sơ DK thay đổi TT hộ tịch...', code: 'TDHT', slug: 'thaydoihotich', img: 'mauthuthapCSDL_thaydoihotich_img_' },
    { name: 'Hồ sơ đăng ký kiểm sát việc giám hộ', code: 'KSGH', slug: 'kiemsatgiamho', img: 'mauthuthapCSDL_kiemsatgiamho_img_' },
    { name: 'Hồ sơ đăng ký giám sát việc giám hộ', code: 'GSGH', slug: 'giamsatgiamho', img: 'mauthuthapCSDL_giamsatgiamho_img_' },
    { name: 'Hồ sơ ly hôn/hủy kết hôn ở nước ngoài', code: 'LH', slug: 'lyhon', img: 'mauthuthapCSDL_lyhon_img_' },
    { name: 'Hệ thống quản lý hồ sơ quốc tịch', code: 'QT', slug: 'quictich', is_special: true }
];

function getTables(type, moduleName) {
    if (type === 'list') {
        return {
            info: \
| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |
| --- | --- | --- | --- | --- | --- |
| 1 | Từ khóa tìm kiếm | Text | Không | | Nhập họ tên hoặc số hồ sơ để tìm kiếm. |
| 2 | Bảng danh sách | Table | Có | | Hiển thị danh sách hồ sơ: STT, Họ tên, Ngày sinh, Trạng thái... |
\,
            func: \
| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |
| --- | --- | --- | --- |
| 1 | Tìm kiếm | Button | Thực hiện lọc dữ liệu theo điều kiện nhập. |
| 2 | Xem chi tiết | Icon Eye | Mở popup xem chi tiết thông tin hồ sơ. |
| 3 | Đồng bộ | Button | Kích hoạt tiến trình đồng bộ dữ liệu. |
\
        };
    } else if (type === 'detail') {
        return {
            info: \
| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |
| --- | --- | --- | --- | --- | --- |
| 1 | Thông tin cá nhân | Section | Có | | Các trường: Họ tên, Ngày sinh, Giới tính... |
| 2 | Thông tin đăng ký | Section | Có | | Các trường: Số quyết định, Ngày đăng ký, Nơi đăng ký. |
\,
            func: \
| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |
| --- | --- | --- | --- |
| 1 | Đóng | Button | Đóng popup chi tiết, quay lại danh sách. |
| 2 | Xuất file | Button | Tải file chi tiết hồ sơ về máy. |
\
        };
    } else if (type === 'history') {
        return {
            info: \
| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |
| --- | --- | --- | --- | --- | --- |
| 1 | Bảng lịch sử | Table | Có | | Ghi lại các lần thay đổi thông tin hoặc trạng thái đồng bộ. |
\,
            func: \
| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |
| --- | --- | --- | --- |
| 1 | Xem log | Link | Nhấn để xem chi tiết nội dung thay đổi. |
\
        };
    }
}

let output = '# 4.2.3. DC102.QLTT.TN  CSDL Trong ngành\\n\\n';
let figureCount = 23;

modules.forEach((mod, modIdx) => {
    if (mod.is_special) return; // Skip Nationality for now, add later
    
    output += \## 4.2.3.\. PM02.QLTT.TN.\  \\\n\\n\;
    
    const screens = [
        { name: 'Màn danh sách dữ liệu ' + mod.name, type: 'list', img: mod.img + '001.png' },
        { name: 'Màn hình thông tin chi tiết ' + mod.name, type: 'detail', img: mod.img + '002.png' },
        { name: 'Tab Lịch sử chỉnh sửa kết nối ' + mod.name, type: 'history', img: mod.img + '003.png' },
        { name: 'Tab Lịch sử đồng bộ ' + mod.name, type: 'history', img: mod.img + '004.png' }
    ];
    
    // Override common img for KS
    if (mod.code === 'KS') {
        screens[0].img = 'mauthuthapCSDL_img_002.png';
        screens[1].img = 'mauthuthapCSDL_img_003.png';
        screens[2].img = 'mauthuthapCSDL_img_004.png';
        screens[3].img = 'mauthuthapCSDL_img_005.png';
    }

    screens.forEach((scr, scrIdx) => {
        output += \### 4.2.3.\.\ \\\n\\nMàn hình\\n\\n![](images/\)\\n\\n*Hình \  \*\\n\\n#### 4.2.3.\.\.1 Mô tả thông tin trên màn hình\\n\;
        output += getTables(scr.type, mod.name).info + '\\n';
        output += \#### 4.2.3.\.\.2 Chức năng trên màn hình\\n\;
        output += getTables(scr.type, mod.name).func + '\\n---\\n\\n';
    });
});

// Adding Nationality Section explicitly to be perfect
const natIdx = 13;
output += \## 4.2.3.\. PM02.QLTT.TN.QT  Hệ thống quản lý hồ sơ quốc tịch\\n\\n\;

// Dashboard
output += \### 4.2.3.\.1 DC1-QT-DB-01 Dashboard Thu thập quốc tịch\\n\\nMàn hình\\n\\n![](images/mauthuthapCSDL_nationality_dashboard.png)\\n\\n*Hình \  Màn hình Dashboard Thu thập quốc tịch*\\n\\n#### 4.2.3.\.1.1 Mô tả thông tin trên màn hình\\n\\n| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |\\n| --- | --- | --- | --- | --- | --- |\\n| 1 | Thống kê số liệu | Card | | | Các con số thống kê hồ sơ Nhập, Thôi, Trở lại QT. |\\n| 2 | Biểu đồ thu thập | Chart | | | Biểu đồ trực quan hóa dữ liệu theo thời gian. |\\n\\n#### 4.2.3.\.1.2 Chức năng trên màn hình\\n\\n| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |\\n| --- | --- | --- | --- |\\n| 1 | Kết xuất | Button | Xuất dữ liệu dashboard ra file báo cáo. |\\n---\\n\\n\;

const natSubModules = [
    { name: 'Nhập Quốc tịch', slug: 'nhapqt' },
    { name: 'Thôi Quốc tịch', slug: 'thoiqt' },
    { name: 'Trở lại Quốc tịch', slug: 'trolaiqt' }
];

natSubModules.forEach((ns, nsIdx) => {
    const baseOffset = 2 + (nsIdx * 4);
    const screens = [
        { name: 'Màn danh sách hồ sơ ' + ns.name, type: 'list', img: 'mauthuthapCSDL_' + ns.slug + '_img_001.png' },
        { name: 'Màn hình chi tiết hồ sơ ' + ns.name, type: 'detail', img: 'mauthuthapCSDL_' + ns.slug + '_img_002.png' },
        { name: 'Tab Lịch sử kết nối ' + ns.name, type: 'history', img: 'mauthuthapCSDL_' + ns.slug + '_img_003.png' },
        { name: 'Tab Lịch sử đồng bộ ' + ns.name, type: 'history', img: 'mauthuthapCSDL_' + ns.slug + '_img_004.png' }
    ];
    
    screens.forEach((scr, scrIdx) => {
        output += \### 4.2.3.\.\ \\\n\\nMàn hình\\n\\n![](images/\)\\n\\n*Hình \  \*\\n\\n#### 4.2.3.\.\.1 Mô tả thông tin trên màn hình\\n\;
        output += getTables(scr.type, ns.name).info + '\\n';
        output += \#### 4.2.3.\.\.2 Chức năng trên màn hình\\n\;
        output += getTables(scr.type, ns.name).func + '\\n---\\n\\n';
    });
});

fs.writeFileSync(targetFile, output, 'utf8');
