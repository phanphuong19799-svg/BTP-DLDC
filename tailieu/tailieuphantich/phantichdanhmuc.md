# 4.3. PM03.QLDM_Quản lý danh mục

## 4.3.1. PM03.QLDM.BC – Báo cáo & Tra cứu danh mục

### *4.3.1.1. Mục đích*
Chức năng này cung cấp cho cán bộ nghiệp vụ, cán bộ quản lý và quản trị viên một cái nhìn tổng quan về tình trạng các danh mục trong hệ thống. Nó cho phép người dùng tra cứu, theo dõi tiến độ phê duyệt và tình trạng công bố của các danh mục, với điều kiện là hệ thống đã có dữ liệu danh mục được tạo hoặc đồng bộ.

### 4.3.1.2. PM03.QLDM.BC.MH01 – Báo cáo & Tra cứu

#### 4.3.1.2.1. MH01 Màn hình báo cáo và tra cứu
##### Màn hình
- Màn hình:

![Báo cáo Danh mục](./images/danhmuc/MH01_dashboard.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 1 - Giao diện báo cáo và tra cứu danh mục</p>

##### Mô tả thông tin trên màn hình

**A. Khung chỉ số thống kê (Stats Cards)**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tổng danh mục | NUMBER | - | - | Tổng số lượng danh mục hiện có trong hệ thống (tất cả trạng thái). |
| Đã công bố | NUMBER | - | - | Số danh mục đang ở trạng thái "Đã công bố" và có hiệu lực. |
| Chờ phê duyệt | NUMBER | - | - | Số danh mục đang chờ người có thẩm quyền xem xét phê duyệt. |
| Nháp | NUMBER | - | - | Số danh mục đang được soạn thảo, chưa gửi phê duyệt. |

**B. Bộ lọc & Tìm kiếm nâng cao**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Từ khóa | VARCHAR2(255) | Không | - | Tìm kiếm nhanh theo tên hoặc mã danh mục. |
| Trạng thái | DROPDOWN | Không | Tất cả | Lọc theo trạng thái: Nháp, Chờ duyệt, Đã phê duyệt, Đã công bố. |
| Loại danh mục | DROPDOWN | Không | Tất cả | Lọc theo loại: Danh mục hành chính, Chuyên ngành, Dùng chung. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Mở popup tìm kiếm nâng cao (MH01.P01). |
| 2 | CN02 | Button text | Kết xuất danh sách danh mục (theo bộ lọc hiện tại) ra file Excel. |
| 3 | CN03 | Button icon | Mở popup hiển thị các giá trị chi tiết (bản ghi) của một danh mục cụ thể (MH01.P02). |

#### 4.3.1.2.2. MH01.P01 – Tìm kiếm nâng cao
##### Màn hình
- Màn hình:

![Tìm kiếm nâng cao](./images/danhmuc/MH01_P01_timkiem.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 4 - Popup tìm kiếm nâng cao danh mục</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên danh mục | VARCHAR2(255) | Không | - | Tìm kiếm theo tên danh mục. |
| Mã danh mục | VARCHAR2(50) | Không | - | Tìm kiếm chính xác theo mã. |
| Loại danh mục | VARCHAR2(50) | Không | - | Lọc theo loại (Chuyên ngành, Dùng chung). |
| Trạng thái | VARCHAR2(50) | Không | - | Lọc theo trạng thái (Đã công bố, Chờ duyệt...). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Áp dụng bộ lọc tìm kiếm. |
| 2 | CN02 | Button text | Đặt lại các trường lọc về mặc định. |
| 3 | CN03 | Button text | Đóng popup. |

#### 4.3.1.2.3. MH01.P02 – Chi tiết giá trị danh mục
##### Màn hình
- Màn hình:

![Chi tiết giá trị danh mục](./images/danhmuc/MH01_P02_chitiet.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 5 - Popup hiển thị các bản ghi trong danh mục</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã giá trị | VARCHAR2(50) | - | - | Mã định danh giá trị (VD: HN, HCM). |
| Tên giá trị | VARCHAR2(255) | - | - | Tên hiển thị (VD: Hà Nội, TP. Hồ Chí Minh). |
| Mô tả | VARCHAR2(1000) | - | - | Ghi chú thêm về giá trị. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Đóng popup. |
| 2 | CN02 | Button text | Xuất danh sách giá trị ra Excel. |

## 4.3.2. PM03.QLDM.TL – Thiết lập danh mục

### *4.3.2.1. Mục đích*
Chức năng này cho phép cán bộ có thẩm quyền tạo mới, chỉnh sửa và quản lý vòng đời của các loại danh mục trong kho DLDC, từ lúc khởi tạo (Nháp) đến khi sẵn sàng để phê duyệt.

### 4.3.2.2. PM03.QLDM.TL.MH02 – Danh sách thiết lập

#### 4.3.2.2.1. MH02 Màn hình danh sách thiết lập
##### Màn hình
- Màn hình:

![Thiết lập Danh mục](./images/danhmuc/MH02_dashboard.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 2 - Giao diện quản lý thiết lập danh mục</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Danh sách danh mục | Table | - | - | Hiển thị danh sách các danh mục với các cột: Mã danh mục, Tên danh mục, Loại dữ liệu, Trạng thái, Phiên bản, Ngày tạo. |
| Trạng thái | VARCHAR2(50) | - | - | Trạng thái hiện tại của danh mục: Nháp, Chờ duyệt, Đã phê duyệt, Đã công bố. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Mở popup để cấu hình một danh mục mới (MH02.P01). |
| 2 | CN02 | Button icon | Mở popup cập nhật thông tin danh mục (MH02.P01). |
| 3 | CN03 | Button icon | Mở popup xác nhận loại bỏ danh mục (MH02.P02). |
| 4 | CN04 | Button icon | Mở popup xác nhận gửi phê duyệt (MH02.P03). |

#### 4.3.2.2.2. MH02.P01a – Thêm mới thiết lập danh mục
##### Màn hình
- Màn hình:

![Thêm mới danh mục](./images/danhmuc/MH02_P01a_them.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 6a - Popup khởi tạo cấu trúc danh mục mới</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã danh mục | VARCHAR2(50) | Có | - | Mã định danh kỹ thuật duy nhất. |
| Tên danh mục | VARCHAR2(255) | Có | - | Tên hiển thị của danh mục. |
| Loại dữ liệu | VARCHAR2(50) | Có | - | Phân loại: Danh mục hành chính, chuyên ngành... |
| Ghi chú | VARCHAR2(1000) | Không | - | Thông tin diễn giải. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Lưu thông tin danh mục và đóng popup. |
| 2 | CN02 | Button text | Hủy thao tác. |

#### 4.3.2.2.3. MH02.P01b – Chỉnh sửa thiết lập danh mục
##### Màn hình
- Màn hình:

![Sửa danh mục](./images/danhmuc/MH02_P01b_sua.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 6b - Popup cập nhật cấu trúc danh mục hiện có</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã danh mục | VARCHAR2(50) | Có | (Giá trị cũ) | Không được phép thay đổi mã sau khi tạo. |
| Tên danh mục | VARCHAR2(255) | Có | (Giá trị cũ) | Thay đổi tên hiển thị. |
| Loại dữ liệu | VARCHAR2(50) | Có | (Giá trị cũ) | Cập nhật phân loại. |
| Ghi chú | VARCHAR2(1000) | Không | (Giá trị cũ) | Cập nhật thông tin diễn giải. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Lưu các thay đổi và đóng popup. |
| 2 | CN02 | Button text | Hủy bỏ thay đổi. |

#### 4.3.2.2.4. MH02.P02 – Xác nhận xóa danh mục
##### Màn hình
- Màn hình:

![Xác nhận xóa danh mục](./images/danhmuc/MH02_P02_xoa.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 7 - Popup xác nhận xóa danh mục</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Cảnh báo | VARCHAR2(500) | - | - | "Bạn có chắc chắn muốn xóa danh mục này? Mọi dữ liệu bản ghi liên quan sẽ bị mất." |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Xác nhận xóa vĩnh viễn danh mục. |
| 2 | CN02 | Button text | Hủy bỏ và đóng popup. |

#### 4.3.2.2.5. MH02.P03 – Xác nhận gửi phê duyệt
##### Màn hình
- Màn hình:

![Xác nhận gửi phê duyệt](./images/danhmuc/MH02_P03_submit.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 8 - Popup xác nhận chuyển trạng thái danh mục sang chờ duyệt</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Cảnh báo | VARCHAR2(500) | - | - | "Bạn có chắc chắn muốn gửi phê duyệt danh mục này? Sau khi gửi, bạn sẽ không thể chỉnh sửa cho đến khi có phản hồi." |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Gửi phê duyệt chính thức. |
| 2 | CN02 | Button text | Hủy bỏ. |

#### 4.3.2.3. PM03.QLDM.TL.MH02.T01 – Tab Thiết lập cấu trúc thuộc tính
##### Màn hình
- Màn hình:

![Thuộc tính danh mục](./images/danhmuc/MH02_T01_thuoctinh.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên thuộc tính | VARCHAR2(100) | Có | - | Tên trường dữ liệu (VD: HỌ TÊN). |
| Kiểu dữ liệu | VARCHAR2(50) | Có | - | String, Number, Date, List... |
| Độ dài | NUMBER | Không | - | Giới hạn ký tự. |
| Bắt buộc | CHECKBOX | Không | FALSE | Đánh dấu nếu trường không được để trống. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Thêm một thuộc tính mới vào cấu trúc danh mục. |
| 2 | CN02 | Button icon | Chỉnh sửa thuộc tính hiện có. |
| 3 | CN03 | Button icon | Xóa thuộc tính khỏi cấu trúc. |

#### 4.3.2.4. PM03.QLDM.TL.MH02.T02 – Tab Thiết lập quan hệ
##### Màn hình
- Màn hình:

![Quan hệ danh mục](./images/danhmuc/MH02_T02_quanhe.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Danh mục đích | DROPDOWN | Có | - | Chọn danh mục để thiết lập liên kết. |
| Trường liên kết | DROPDOWN | Có | - | Chọn trường (FK) để nối giữa 2 danh mục. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Lưu thiết lập quan hệ. |

#### 4.3.2.5. PM03.QLDM.TL.MH02.T04 – Tab Lịch sử phiên bản
##### Màn hình
- Màn hình:

![Lịch sử phiên bản](./images/danhmuc/MH02_T04_history.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Phiên bản | VARCHAR2(20) | - | - | Số hiệu phiên bản (VD: 1.0.1). |
| Người cập nhật | VARCHAR2(100) | - | - | Tên định danh người thực hiện thay đổi. |
| Ngày cập nhật | DATE | - | - | Thời điểm lưu phiên bản. |
| Nội dung thay đổi | VARCHAR2(500) | - | - | Tóm tắt các nội dung đã thay đổi. |

## 4.3.3. PM03.QLDM.PD – Phê duyệt danh mục

### *4.3.3.1. Mục đích*
Chức năng này phục vụ cán bộ có thẩm quyền phê duyệt xem xét, chấp thuận hoặc từ chối các danh mục đã được gửi lên từ quá trình thiết lập. Sau khi phê duyệt, danh mục mới được phép chuyển sang bước công bố và đưa vào sử dụng chính thức trong hệ thống.

### 4.3.3.2. PM03.QLDM.PD.MH03 – Giao diện phê duyệt

#### 4.3.3.2.1. MH03 Màn hình giao diện phê duyệt
##### Màn hình
- Màn hình:

![Giao diện phê duyệt danh mục](./images/danhmuc/MH03_dashboard.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 3 - Màn hình giao diện phê duyệt danh mục</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Danh sách danh mục chờ duyệt | Table | - | - | Hiển thị các danh mục đang ở trạng thái "Chờ phê duyệt" với thông tin: Mã, Tên, Người tạo, Ngày gửi. |
| Nội dung danh mục | CLOB | - | - | Hiển thị chi tiết cấu trúc thuộc tính và quan hệ của danh mục được chọn để phê duyệt. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Xác nhận danh mục hợp lệ, chuyển trạng thái của danh mục sang "Đã phê duyệt". |
| 2 | CN02 | Button text | Mở popup từ chối phê duyệt (MH03.P01). |

#### 4.3.3.2.2. MH03.P01 – Từ chối phê duyệt
##### Màn hình
- Màn hình:

![Từ chối phê duyệt](./images/danhmuc/MH03_P01_reject.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 9 - Popup nhập lý do từ chối phê duyệt danh mục</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Lý do từ chối | CLOB | Có | - | Nhập chi tiết lý do không phê duyệt danh mục này. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Gửi lý do từ chối và thông báo cho người khởi tạo. |
| 2 | CN02 | Button text | Hủy bỏ và đóng popup. |

### *4.3.4.1. Mục đích*
Chức năng này cho phép cán bộ quản lý công bố chính thức các danh mục đã được phê duyệt lên cổng thông tin, xác định phạm vi chia sẻ (nội bộ, toàn ngành, công khai) và ngày hiệu lực. Chức năng cũng hỗ trợ thu hồi công bố khi cần thiết.

### 4.3.4.2. PM03.QLDM.CB.MH04 – Thiết lập công bố
#### 4.3.4.2.1. MH04 Màn hình thiết lập công bố danh mục
##### Màn hình
- Màn hình:

![Công bố danh mục](./images/danhmuc/MH04_dashboard.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên danh mục | VARCHAR2(255) | - | - | Hiển thị tên danh mục được chọn để công bố. |
| Phạm vi công bố | DROPDOWN | Có | Nội bộ | Toàn ngành, Liên ngành, Công khai. |
| Ngày hiệu lực | DATE | Có | Ngày hiện tại | Thời điểm danh mục bắt đầu có hiệu lực công bố. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Xác nhận thực hiện công bố danh mục lên cổng thông tin. |
| 2 | CN02 | Button text | Thu hồi công bố (nếu đang ở trạng thái đã công bố). |
