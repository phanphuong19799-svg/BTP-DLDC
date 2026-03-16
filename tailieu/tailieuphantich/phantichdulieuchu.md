# 4.5. PM05.QLDLC_Dữ liệu chủ (Master Data)

## 4.5.1. PM05.QLDLC.QL – Quản lý thực thể dữ liệu chủ

### *4.5.1.1. Mục đích*
Quản lý các thực thể dữ liệu gốc dùng chung (ví dụ: Người dân, Tổ chức, Hộ gia đình...) nhằm đảm bảo tính duy nhất, chính xác và nhất quán trên toàn hệ thống. Chức năng này cho phép định nghĩa cấu trúc, các thuộc tính, và các quy tắc (định danh, hợp nhất, quan hệ) cho mỗi thực thể dữ liệu chủ.

### 4.5.1.2. PM05.QLDLC.QL.MH01 – Danh sách thực thể dữ liệu chủ

#### 4.5.1.2.1. MH01 Màn hình danh sách thực thể dữ liệu chủ
##### Màn hình
- Màn hình:

![Danh sách thực thể dữ liệu chủ](./images/dulieuchu/MH01_dashboard.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên thực thể | VARCHAR2(255) | - | - | Tên của thực thể dữ liệu chủ (VD: Người dân, Doanh nghiệp). |
| Mô tả | VARCHAR2(1000)| - | - | Mô tả ngắn về mục đích của thực thể. |
| Số thuộc tính | NUMBER | - | - | Số lượng trường thông tin đã được định nghĩa cho thực thể. |
| Ngày tạo | DATE | - | - | Ngày thực thể được tạo ra trong hệ thống. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Mở Wizard 5 bước để tạo mới thực thể (MH01.W01). |
| 2 | CN02 | Button text | Mở popup thêm mới nhanh thực thể (MH01.P01a). |
| 3 | CN03 | Button icon | Mở Tab quản lý thuộc tính (MH01.T02). |
| 4 | CN04 | Button icon | Mở Tab quản lý quy tắc hợp nhất (MH01.T03). |
| 5 | CN05 | Button icon | Mở Tab thiết lập quan hệ (MH01.T04). |
| 6 | CN06 | Button icon | Mở Tab quy tắc định danh (MH01.T05). |

#### 4.5.1.3. PM05.QLDLC.QL.MH01.W01 – Wizard tạo mới thực thể (5 bước)
##### Các bước thực hiện:
- **Bước 1: Khởi tạo dữ liệu chủ**
![Wizard Bước 1](./images/dulieuchu/MH01_wizard_s1.png)
- **Bước 2: Tạo thuộc tính**
![Wizard Bước 2](./images/dulieuchu/MH01_wizard_s2.png)
- **Bước 3: Quy tắc hợp nhất**
![Wizard Bước 3](./images/dulieuchu/MH01_wizard_s3.png)
- **Bước 4: Thiết lập quan hệ**
![Wizard Bước 4](./images/dulieuchu/MH01_wizard_s4.png)
- **Bước 5: Phê duyệt**
![Wizard Bước 5](./images/dulieuchu/MH01_wizard_s5.png)

#### 4.5.1.4. PM05.QLDLC.QL.MH01.P01a – Thêm mới nhanh thực thể
##### Màn hình
- Màn hình:
![Thêm nhanh thực thể](./images/dulieuchu/MH01_P01a_them_nhanh.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên thực thể | VARCHAR2(255) | Có | - | Nhập tên thực thể mới. |
| Cơ quan quản lý | DROPDOWN | Có | - | Chọn đơn vị chủ quản dữ liệu. |

#### 4.5.1.5. PM05.QLDLC.QL.MH01.P02 – Thêm thuộc tính mới (Popup trong Tab 2)
##### Màn hình
- Màn hình:
![Thêm thuộc tính](./images/dulieuchu/MH01_P02_them_thuoctinh.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên trường | VARCHAR2(100) | Có | - | Tên vật lý của trường trong DB. |
| Tên hiển thị | VARCHAR2(255) | Có | - | Tên nhãn hiển thị trên Form. |
| Kiểu dữ liệu | DROPDOWN | Có | String | String, Number, Date... |

#### 4.5.1.6. PM05.QLDLC.QL.MH01.P03 – Thêm quy tắc hợp nhất mới (Popup trong Tab 3)
##### Màn hình
- Màn hình:
![Thêm quy tắc hợp nhất](./images/dulieuchu/MH01_P03_them_quytac_hopnhat.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên quy tắc | VARCHAR2(255) | Có | - | Tên gợi nhớ cho quy tắc hợp nhất. |
| Thuộc tính so sánh | DROPDOWN | Có | - | Chọn trường dùng để so trùng (VD: Số CCCD). |
| Trọng số | NUMBER | Có | 100 | Độ ưu tiên của quy tắc. |

#### 4.5.1.7. PM05.QLDLC.QL.MH01.P04 – Thêm quan hệ thực thể mới (Popup trong Tab 4)
##### Màn hình
- Màn hình:
![Thêm quan hệ](./images/dulieuchu/MH01_P04_them_quanhe.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thực thể liên kết | DROPDOWN | Có | - | Chọn thực thể đích (VD: Tổ chức). |
| Loại quan hệ | DROPDOWN | Có | 1-1 | 1-1, 1-N, N-N. |

#### 4.5.1.8. PM05.QLDLC.QL.MH01.P05 – Thêm quy tắc định danh duy nhất (Popup trong Tab 5)
##### Màn hình
- Màn hình:
![Thêm quy tắc định danh](./images/dulieuchu/MH01_P05_them_quytac_dinhdanh.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã định danh | VARCHAR2(50) | Có | - | VD: GLOBAL_ID, CITIZEN_ID. |
| Quy tắc tạo | VARCHAR2(500) | Có | - | Định dạng logic tạo mã. |

#### 4.5.1.9. PM05.QLDLC.QL.MH01.P06 – Chi tiết phê duyệt (Popup trong Tab 6)
##### Màn hình
- Màn hình:
![Chi tiết phê duyệt](./images/dulieuchu/MH01_P06_chitiet_pheduyet.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Nội dung yêu cầu | VARCHAR2(1000) | - | - | Tóm tắt các thay đổi cấu trúc dữ liệu chủ. |
| Trạng thái | VARCHAR2(50) | - | - | Chờ duyệt, Đã duyệt, Từ chối. |


## 4.5.2. PM05.QLDLC.CD – Cập nhật & Công khai dữ liệu chủ

### *4.5.2.1. Mục đích*
Quản lý vòng đời của các bản ghi dữ liệu chủ, bao gồm việc rà soát, phê duyệt các bản ghi mới hoặc được cập nhật, xử lý trùng lặp và cấu hình việc công khai dữ liệu ra bên ngoài thông qua API.

### 4.5.2.2. PM05.QLDLC.CD.MH02 – Cập nhật dữ liệu chủ
#### 4.5.2.2.1. MH02 Màn hình Cập nhật dữ liệu chủ
##### Màn hình
- Màn hình:

![Cập nhật dữ liệu chủ](./images/dulieuchu/MH02_dashboard.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Danh sách bản ghi | CLOB | - | - | Hiển thị tổng quan các bản ghi đang chờ rà soát, phê duyệt. |
| Phát hiện trùng lặp | CLOB | - | - | Hệ thống đưa ra cảnh báo về các bản ghi có khả năng trùng lặp. |
| Rà soát thay đổi | CLOB | - | - | Giao diện so sánh giá trị cũ và giá trị mới của từng trường thông tin. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Mở popup xem chi tiết và hợp nhất bản ghi (MH02.P01). |

#### 4.5.2.2.2. MH02.P01 – Chi tiết và hợp nhất bản ghi
##### Màn hình
- Màn hình:

![Chi tiết dữ liệu chủ](./images/dulieuchu/MH02_P01_chitiet.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tab Nguồn dữ liệu | - | - | - | Hiển thị các nguồn dữ liệu gốc cấu thành bản ghi. |
| Tab Dữ liệu đã gộp | - | - | - | Hiển thị kết quả sau khi hợp nhất theo quy tắc. |

#### 4.5.2.2.3. MH02.P02 – Chỉnh sửa bản ghi dữ liệu chủ
##### Màn hình
- Màn hình:

![Chỉnh sửa dữ liệu chủ](./images/dulieuchu/MH02_P02_sua.png)

### 4.5.2.3. PM05.QLDLC.CD.MH03 – Công khai dữ liệu chủ
#### 4.5.2.3.1. MH03 Màn hình Báo cáo & Tra cứu dữ liệu chủ
##### Màn hình
- Màn hình:

![Báo cáo dữ liệu chủ](./images/dulieuchu/MH03_dashboard.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tab Tra cứu | - | - | - | Tìm kiếm và xem chi tiết từng bản ghi dữ liệu chủ. |
| Tab Báo cáo sử dụng | - | - | - | Thống kê tần suất truy cập và sử dụng dữ liệu chủ theo ứng dụng/đơn vị. |
| Tab Báo cáo vòng đời | - | - | - | Thống kê về biến động dữ liệu chủ (tạo mới, cập nhật, hợp nhất). |

#### 4.5.2.3.2. MH03.P01 – Chi tiết bản ghi tra cứu
##### Màn hình
- Màn hình:
![Chi tiết bản ghi](./images/dulieuchu/MH03_P01_chitiet.png)

#### 4.5.2.3.3. MH03.T02 – Tab Báo cáo sử dụng dữ liệu chủ
##### Màn hình
- Màn hình:
![Báo cáo sử dụng](./images/dulieuchu/MH03_tab_baocao_sudung.png)

#### 4.5.2.3.4. MH03.T03 – Tab Báo cáo vòng đời dữ liệu
##### Màn hình
- Màn hình:
![Báo cáo vòng đời](./images/dulieuchu/MH03_tab_baocao_vongdoi.png)
