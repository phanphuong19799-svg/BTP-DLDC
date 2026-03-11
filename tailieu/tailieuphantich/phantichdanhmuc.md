# 4.3. PM03.QLDM_Quản lý danh mục

## 4.3.1. PM03.QLDM.BC – Báo cáo & Tra cứu danh mục

### 4.3.1.1. Mục đích
Cung cấp cái nhìn tổng quan về tình trạng các danh mục trong hệ thống, cho phép người dùng tra cứu và theo dõi tiến độ phê duyệt, công bố danh mục.

**a. Phân quyền**
- NSD là: Cán bộ nghiệp vụ, Cán bộ quản lý, Quản trị viên hệ thống.

**b. Điều kiện thực hiện**
- Hệ thống đã có các danh mục được tạo hoặc đồng bộ.

### 4.3.1.2. PM03.QLDM.BC.MH01 – Báo cáo & Tra cứu
*(Giao diện tham chiếu: [CategoryManagementPage.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/pages/CategoryManagementPage.tsx))*

#### 4.3.1.2.1. Màn hình
- Màn hình:

![Báo cáo Danh mục](./images/baocao_danhmuc.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Giao diện báo cáo và tra cứu danh mục</p>

#### 4.3.1.2.2. Mô tả thông tin trên màn hình

**A. Khung chỉ số thống kê (Stats Cards)**

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tổng số danh mục | Số | - | - | Khối lượng danh mục hiện có. |
| Đã phê duyệt | Số | - | - | Danh mục đã qua kiểm duyệt. |
| Chờ phê duyệt | Số | - | - | Danh mục đang đợi xử lý. |
| Đã công bố | Số | - | - | Danh mục đã xuất bản cho các đơn vị khai thác. |

**B. Bộ lọc & Tìm kiếm nâng cao**

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tìm kiếm | Ký tự | Không | Để trống | Tìm theo mã, tên hoặc mô tả danh mục. |
| Loại dữ liệu | Danh sách | Không | Tất cả | Chuẩn, Tham chiếu, Nội bộ. |
| Đơn vị quản lý | Danh sách | Không | Tất cả | Đơn vị chủ quản danh mục. |
| Khoảng thời gian tạo | Date Range | Không | - | Lọc từ ngày - đến ngày. |

#### 4.3.1.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tra cứu nâng cao | Nút | Mở form lọc dữ liệu chi tiết. |
| 2 | Xuất báo cáo | Nút | Kết xuất danh sách danh mục ra file Excel. |
| 3 | Xem dữ liệu | Icon | Mở popup hiển thị các giá trị chi tiết của danh mục. |

## 4.3.2. PM03.QLDM.TL – Thiết lập danh mục

### 4.3.2.1. Mục đích
Cho phép cán bộ tạo mới, chỉnh sửa và quản lý vòng đời của các loại danh mục trong kho DLDC.

### 4.3.2.2. PM03.QLDM.TL.MH01 – Danh sách thiết lập

#### 4.3.2.2.1. Màn hình
- Màn hình:

![Thiết lập Danh mục](./images/thietlap_danhmuc.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Giao diện quản lý thiết lập danh mục</p>

#### 4.3.2.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã danh mục | Ký tự | - | - | Mã định danh duy nhất (VD: DM_GIOI_TINH). |
| Tên danh mục | Ký tự | - | - | Tên hiển thị đầy đủ. |
| Loại dữ liệu | Ký tự | - | - | Chuẩn / Tham chiếu / Nội bộ. |
| Trạng thái | Nhãn | - | - | Nháp, Chờ phê duyệt, Đã phê duyệt, Từ chối. |

#### 4.3.2.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tạo danh mục mới | Nút | Mở form nhập liệu cấu hình danh mục. |
| 2 | Sửa | Icon | Cập nhật thông tin danh mục (chỉ khi ở trạng thái Nháp). |
| 3 | Xóa | Icon | Loại bỏ danh mục khỏi hệ thống. |
| 4 | Gửi phê duyệt | Icon | Chuyển trạng thái từ Nháp sang Chờ phê duyệt. |

## 4.3.3. PM03.QLDM.PD – Phê duyệt danh mục

### 4.3.3.1. Mục đích
Dành cho cán bộ quản lý thực hiện kiểm soát nội dung và tính hợp lệ của danh mục trước khi cho phép công bố.

### 4.3.3.2. PM03.QLDM.PD.MH01 – Giao diện phê duyệt
*(Tham chiếu logic xử lý tại Tab Approval trong code)*

#### 4.3.3.2.1. Màn hình
- Màn hình:

![Giao diện phê duyệt danh mục](./images/pheduyet_danhmuc.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình giao diện phê duyệt danh mục</p>

#### 4.3.3.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Danh sách chờ duyệt | Bảng | - | - | Danh sách các danh mục đang chờ được phê duyệt. |

#### 4.3.3.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Phê duyệt | Nút | Xác nhận danh mục hợp lệ, chuyển trạng thái sang "Đã phê duyệt". |
| 2 | Từ chối | Nút | Trả lại danh mục kèm theo lý do, yêu cầu cán bộ thiết lập chỉnh sửa lại. |

## 4.3.4. PM03.QLDM.CB – Công bố danh mục

### 4.3.4.1. Mục đích
Quản lý phạm vi chia sẻ và thời điểm bắt đầu cho phép các hệ thống khác khai thác dữ liệu danh mục.

### 4.3.4.2. PM03.QLDM.CB.MH01 – Thiết lập công bố

#### 4.3.4.2.1. Màn hình
- Màn hình:

![Thiết lập công bố danh mục](./images/congbodanhmuc.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình thiết lập công bố danh mục</p>

#### 4.3.4.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Phạm vi chia sẻ | Radio | Có | Mở rộng | Nội bộ / Mở rộng / Toàn dân. |
| Ngày công bố | Ngày | Có | - | Thời điểm danh mục có hiệu lực khai thác. |
| Người thực hiện | Ký tự | Có | - | Tên lãnh đạo thực hiện phê duyệt công bố. |

#### 4.3.4.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu công bố | Nút | Ghi nhận cấu hình chia sẻ. |


