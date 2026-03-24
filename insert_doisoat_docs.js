const fs = require('fs');
const path = require('path');

const trongNganhList = [
    { name: 'CSDL Hộ tịch điện tử', code: 'hotich' },
    { name: 'HT quản lý hồ sơ QT', code: 'quoc_tich' },
    { name: 'CSDL thi hành án dân sự', code: 'thiahanhan' },
    { name: 'CSDL về biện pháp BĐ', code: 'bienphapbd' },
    { name: 'CSDL quốc gia về PL', code: 'quocgia_pl' },
    { name: 'CSDL TT Tư Pháp dân sự', code: 'tt_tuphap' },
    { name: 'HTTT TTTG pháp lý dân sự', code: 'tttg_phaply' },
    { name: 'HTTT TG Pháp lý', code: 'tg_phaply' },
    { name: 'CSDL PB, GĐ và HG cơ sở', code: 'pbgdhg' },
    { name: 'CSDL quản lý đấu giá TS', code: 'daugia' },
    { name: 'CSDL Hợp tác quốc tế', code: 'htqt' },
    { name: 'Thu thập số liệu thống kê', code: 'thongke' },
    { name: 'HTTT các tổ chức hành nghề công chứng', code: 'congchung' },
    { name: 'CSDL chứng thực', code: 'chungthuc' }
];

const ngoaiNganhList = [
    { name: 'Đối soát tổng hợp các danh mục từ Bộ ngành ngoài', code: 'ngoainganh_danhmuc' },
    { name: 'Đối soát tổng hợp dữ liệu về Thông tin Bản án, quyết định', code: 'ngoainganh_banan' }
];

const docPath = path.join('d:\\tuphap\\khodldc\\dldc_1\\tailieu\\tailieuphantich\\phantichtong.md');
let content = fs.readFileSync(docPath, 'utf8');

// Replace new sections into Trong ngành (4.2.6.2)
let insertIndexTrongNganh = content.indexOf('## 4.2.7. DC102.QLTT.DSNN');
if (insertIndexTrongNganh === -1) {
    console.error("Could not find 4.2.7 marker.");
    process.exit(1);
}

let newTrongNganhDocs = '\n';
trongNganhList.forEach((item, index) => {
    let sectionNum = 10 + index; // Starts after 4.2.6.2.9
    let dsName = item.name;
    let code = item.code;
    
    newTrongNganhDocs += `#### 4.2.6.2.${sectionNum}. MH06.M${10+index} Danh sách đối soát dữ liệu ${dsName}

Màn hình

![Danh sách đối soát ${dsName} (MH06.M${10+index})](./images/thuthap/MH06_M${10+index}_${code}.png)

4.2.6.2.${sectionNum}.1 Mô tả thông tin trên màn hình
| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |
| --- | --- | --- | --- | --- | --- |
| Thống kê | NUMBER | - | - | Số lượng tổng, khớp, không khớp, lỗi. |
| Danh sách | TABLE | - | - | Thể hiện bảng dữ liệu đối soát ${dsName}. |

4.2.6.2.${sectionNum}.2 Chức năng trên màn hình
|  |  |  |  |
| --- | --- | --- | --- |
| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |
| 1 | CN01 | Select | Lọc theo trạng thái. |
| 2 | CN02 | Button | Xuất Excel kết quả. |

`;
});

content = content.slice(0, insertIndexTrongNganh) + newTrongNganhDocs + content.slice(insertIndexTrongNganh);


// Recalculate index for Ngoài ngành
let insertIndexNgoaiNganh = content.indexOf('*(Tài liệu đã được hoàn thiện đầy đủ cấu trúc');
if (insertIndexNgoaiNganh === -1) {
    console.error("Could not find end of Ngoài ngành marker.");
    process.exit(1);
}

let newNgoaiNganhDocs = '\n';
ngoaiNganhList.forEach((item, index) => {
    let sectionNum = 9 + index; // Starts after 4.2.7.2.8
    let dsName = item.name;
    let code = item.code;
    
    newNgoaiNganhDocs += `#### 4.2.7.2.${sectionNum}. MH07.M${10+index} Danh sách ${dsName}

Màn hình

![Danh sách đối soát ${dsName} (MH07.M${10+index})](./images/thuthap/MH07_M${10+index}_${code}.png)

4.2.7.2.${sectionNum}.1 Mô tả thông tin trên màn hình
| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |
| --- | --- | --- | --- | --- | --- |
| Thống kê | NUMBER | - | - | Số lượng tổng, khớp, không khớp, lỗi của ${dsName}. |
| Danh sách | TABLE | - | - | Thể hiện bảng dữ liệu đối soát. |

4.2.7.2.${sectionNum}.2 Chức năng trên màn hình
|  |  |  |  |
| --- | --- | --- | --- |
| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |
| 1 | CN01 | Select | Lọc theo trạng thái. |
| 2 | CN02 | Button | Xuất dữ liệu Excel. |

`;
});

content = content.slice(0, insertIndexNgoaiNganh) + newNgoaiNganhDocs + content.slice(insertIndexNgoaiNganh);

fs.writeFileSync(docPath, content, 'utf8');
console.log("Successfully inserted documentation for all Reconciliation datasets.");
