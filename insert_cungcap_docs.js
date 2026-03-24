const fs = require('fs');
const path = require('path');

const cungCapList = [
    // Trong ngành
    { name: 'CSDL Hộ tịch điện tử', category: 'Trong ngành', code: 'hotich' },
    { name: 'HT quản lý hồ sơ QT', category: 'Trong ngành', code: 'quoc_tich' },
    { name: 'CSDL thi hành án dân sự', category: 'Trong ngành', code: 'thi_hanhan' },
    { name: 'CSDL về biện pháp BĐ', category: 'Trong ngành', code: 'bien_phap' },
    { name: 'CSDL quốc gia về PL', category: 'Trong ngành', code: 'quocgia_pl' },
    { name: 'CSDL TT Tư Pháp dân sự', category: 'Trong ngành', code: 'tuphap_ds' },
    { name: 'HTTT TTTG pháp lý dân sự', category: 'Trong ngành', code: 'tt_phaply_ds' },
    { name: 'HTTT TG Pháp lý', category: 'Trong ngành', code: 'tg_phaply' },
    { name: 'CSDL PB, GĐ và HG cơ sở', category: 'Trong ngành', code: 'pb_gd_hg' },
    { name: 'CSDL quản lý đấu giá TS', category: 'Trong ngành', code: 'dau_gia' },
    { name: 'CSDL Hợp tác quốc tế', category: 'Trong ngành', code: 'htqt' },
    { name: 'Thu thập số liệu thống kê', category: 'Trong ngành', code: 'thongke' },
    { name: 'HTTT các tổ chức hành nghề công chứng', category: 'Trong ngành', code: 'cong_chung' },
    { name: 'CSDL chứng thực', category: 'Trong ngành', code: 'chung_thuc' },
    // Ngoài ngành
    { name: 'CSDL Thông tin Bản án', category: 'Ngoài ngành', code: 'ban_an' },
    { name: 'Danh mục', category: 'Ngoài ngành', code: 'danh_muc' },
    { name: 'BHXH và Giảm nghèo', category: 'Ngoài ngành', code: 'bhxh_giamngheo' },
    { name: 'Người có công', category: 'Ngoài ngành', code: 'nguoi_cocong' },
    { name: 'Trẻ em', category: 'Ngoài ngành', code: 'tre_em' }
];

const docPath = path.join('d:\\tuphap\\khodldc\\dldc_1\\tailieu\\tailieuphantich\\phantichcungcap.md');
let content = fs.readFileSync(docPath, 'utf8');

// Insert the new detailed sections before "## 4.8.2. PM08.QLCC.DC"
let insertIndex = content.indexOf('## 4.8.2. PM08.QLCC.DC');
if (insertIndex === -1) {
    console.error("Could not find marker '## 4.8.2. PM08.QLCC.DC'.");
    process.exit(1);
}

let detailedDocs = '\n--- \n\n### *Các phân hệ Dịch vụ Cung cấp Chi tiết*\n\n';

cungCapList.forEach((item, idx) => {
    let sectionId = 3 + idx; // Starts from 4.8.1.3
    let mhId = String(idx + 2).padStart(2, '0'); // MH02 to MH20
    let title = `PM08.QLCC.CC.MH${mhId} – Cung cấp dữ liệu ${item.name} (${item.category})`;
    
    detailedDocs += `### 4.8.1.${sectionId}. ${title}

#### 4.8.1.${sectionId}.1. Chi tiết dịch vụ Cung cấp dữ liệu ${item.name}
##### Màn hình
- Màn hình: (Dashboard dịch vụ Cung cấp ${item.name})

![Cung cấp dữ liệu ${item.name}](./images/cungcap/MH${mhId}_${item.code}_cungcap.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình ${mhId}-A - Màn hình cung cấp dữ liệu ${item.name}</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thống kê tổng quan | NUMBER | - | - | Thể hiện tổng số gói dữ liệu, tổng lượt truy xuất đã cung cấp của ${item.name}. |
| Danh sách gói cung cấp | TABLE | - | - | Liệt kê các bộ dữ liệu con trực thuộc dịch vụ cung cấp này đang được lưu chuyển. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Lọc / Tìm kiếm | Cho phép lọc các bản ghi cung cấp theo cơ quan yêu cầu và thời gian. |
| 2 | CN02 | Button Chi tiết | Mở xem chi tiết dữ liệu (Metadata, Headers, Status) đã được chia sẻ của ${item.name}. |
| 3 | CN03 | Export | Xuất file báo cáo lịch sử truyền nhận dữ liệu. |

`;
});

content = content.slice(0, insertIndex) + detailedDocs + '\n' + content.slice(insertIndex);

fs.writeFileSync(docPath, content, 'utf8');
console.log("Successfully appended 19 specific provision (cung cấp) datasets to the documentation.");
