const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tailieu', 'tailieuphantich', 'phantichtong.md');
let content = fs.readFileSync(filePath, 'utf8');

// Replace 4.2.6.2.3. DC1-UC005-MH1 Chi tiết lỗi đối soát
const target1 = `#### 4.2.6.2.3. DC1-UC005-MH1 Chi tiết lỗi đối soát
- **Mã chức năng:** DC1-TT-QT-005
- **Mã màn hình:** DC1-UC005-MH1

Màn hình

![Lỗi đối soát TN (HA19)](./images/thuthap/MH06_M03_loi_doisoat_trongnganh.png)

4.2.6.2.3.1 Mô tả thông tin trên màn hình
| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |
| --- | --- | --- | --- | --- | --- |
| Thống kê lỗi | NUMBER | - | - | Số lượng lỗi Nghiêm trọng, Trung bình, Nhẹ. |
| Danh sách lỗi | TABLE | - | - | Mã bản ghi, Trường dữ liệu, Giá trị nguồn, Giá trị đích, Mức độ. |

4.2.6.2.3.2 Chức năng trên màn hình
|  |  |  |  |
| --- | --- | --- | --- |
| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |
| 1 | CN01 | Button green | Xuất báo cáo lỗi (Excel). |
| 2 | CN02 | Button text | Quay lại. |`;

const replacement1 = `#### 4.2.6.2.3. DC1-UC005-MH1 Chi tiết lỗi đối soát
- **Mã chức năng:** DC1-TT-QT-005
- **Mã màn hình:** DC1-UC005-MH1

Màn hình

![Lỗi đối soát TN](./images/thuthap/MH06_M03_loi_doisoat_trongnganh_new.png)

4.2.6.2.3.1 Mô tả thông tin trên màn hình
| **STT** | **Tên trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |
| --- | --- | --- | --- | --- | --- |
| Thống kê lỗi | NUMBER | - | - | Thống kê số lượng theo loại lỗi. |
| Chi tiết lỗi (Mã bản ghi) | TEXT | - | - | Thông tin mã bản ghi và nguyên nhân chi tiết. |

4.2.6.2.3.2 Chức năng trên màn hình
|  |  |  |  |
| --- | --- | --- | --- |
| **STT** | **Tên chức năng** | **Định dạng** | **Mô tả** |
| 1 | CN01 | Button white | Đóng thông báo. |
| 2 | CN02 | Button red | Gửi lại danh sách. |`;

// Normalizing target1 and content for replace
const normalize = (str) => str.replace(/\r\n/g, '\n');
content = normalize(content);

if (content.includes(normalize(target1))) {
    content = content.replace(normalize(target1), replacement1);
    console.log("Replaced target1");
} else {
    console.log("Could not find target1");
}

const target2 = `#### 4.2.6.2.8. MH06.M08 Lịch sử đối soát
Màn hình

![Lịch sử đối soát TN (HA24)](./images/thuthap/MH06_M08_history_trongnganh.png)`;

const replacement2 = `#### 4.2.6.2.8. MH06.M08 Lịch sử đối soát
Màn hình

![Lịch sử đối soát TN](./images/thuthap/MH06_M08_history_trongnganh_new.png)`;

if (content.includes(normalize(target2))) {
    content = content.replace(normalize(target2), replacement2);
    console.log("Replaced target2");
} else {
    console.log("Could not find target2");
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Done.");
