# 4.8. PM08.DLMO_Dữ liệu mở (Open Data)

## 4.8.1. PM08.DLMO.TL – Thiết lập danh mục dữ liệu mở

### 4.8.1.1. Mục đích
Cung cấp công cụ để cán bộ nghiệp vụ khởi tạo và cấu hình các tập dữ liệu dự kiến công bố ra cộng đồng.

### 4.8.1.2. PM08.DLMO.TL.MH01 – Màn hình thiết lập
*(Giao diện tham chiếu: [OpenDataCategoryPage.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/pages/OpenDataCategoryPage.tsx))*

#### 4.8.1.2.1. Màn hình
- Màn hình:

![Thiết lập danh mục dữ liệu mở](./images/thietlapdanhmuc_dlm.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Giao diện danh sách thiết lập dữ liệu mở</p>

#### 4.8.1.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã danh mục | Ký tự | - | - | Mã định danh kỹ thuật (VD: OPEN_A). |
| Tên danh mục | Ký tự | - | - | Tên hiển thị của bộ dữ liệu mở. |
| Loại dữ liệu | Ký tự | - | - | Phân loại theo tính chất dữ liệu. |
| Đơn vị quản lý | Ký tự | - | - | Đơn vị chủ quản bộ dữ liệu. |
| Trạng thái | Nhãn | - | - | Nháp, Chờ phê duyệt, Đã phê duyệt, Từ chối, Đã công bố. |

#### 4.8.1.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thêm danh mục mới | Nút | Tạo mới hồ sơ dữ liệu mở. |
| 2 | Sửa/Xóa | Icon | Cập nhật thông tin (chỉ áp dụng cho trạng thái Nháp). |
| 3 | Gửi phê duyệt | Icon | Trình lãnh đạo xem xét bộ dữ liệu. |

## 4.8.2. PM08.DLMO.PD – Phê duyệt và Công bố

### 4.8.2.1. PM08.DLMO.PD.MH01 – Giao diện Phê duyệt (Tab Approval)

#### 4.8.2.1.1. Màn hình
- Màn hình:

![Giao diện phê duyệt dữ liệu mở](./images/pheduyet_dlm.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình phê duyệt nội dung bộ dữ liệu mở</p>

#### 4.8.2.1.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thông tin trình duyệt | Bảng | - | - | Chi tiết mã, tên, mô tả và người tạo. |

#### 4.8.2.1.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Phê duyệt | Nút | Duyệt hồ sơ bộ dữ liệu. |
| 2 | Từ chối | Nút | Trả về hồ sơ kèm lý do. |

### 4.8.2.2. PM08.DLMO.PD.MH02 – Giao diện Công bố (Tab Publish)

#### 4.8.2.2.1. Màn hình
- Màn hình:

![Giao diện công bố dữ liệu mở](./images/congbo_dlm.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình thiết lập phạm vi công bố</p>

#### 4.8.2.2.2. Mô tả thông tin trên màn hình
Thiết lập phạm vi và thời điểm công khai:
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Phạm vi chia sẻ | Danh sách | Có | - | Nội bộ/Mở rộng/Toàn dân - Đối tượng được tiếp cận. |
| Tần suất cập nhật | Danh sách | Có | - | Hàng ngày/Tháng/Quý - Kế hoạch làm mới dữ liệu. |
| Định dạng công bố | Danh sách | Có | - | JSON/XML/CSV/Excel - Các loại tệp tin cung cấp. |

#### 4.8.2.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Công bố | Nút | Thực hiện xuất bản dữ liệu mở ra cộng đồng. |

## 4.8.3. PM08.DLMO.BC – Báo cáo và Thống kê

### 4.8.3.1. PM08.DLMO.BC.MH01 – Tra cứu nâng cao (Tab Report)

#### 4.8.3.1.1. Màn hình
- Màn hình:

![Tra cứu báo cáo dữ liệu mở](./images/tracuu_dlm.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình báo cáo và tra cứu dữ liệu mở</p>

#### 4.8.3.1.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Lĩnh vực | Danh sách | Không | - | Tìm kiếm theo nhóm ngành/lĩnh vực. |
| Đơn vị | Danh sách | Không | - | Đơn vị cung cấp. |
| Khoảng thời gian | Ngày | Không | - | Lọc theo thời gian ra mắt. |
| Trạng thái | Danh sách | Không | - | Tình trạng của bộ dữ liệu. |

#### 4.8.3.1.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lọc | Nút | Thực hiện truy vấn hệ thống. |

### 4.8.3.2. PM08.DLMO.BC.MH02 – Thống kê (Tab Statistics)

#### 4.8.3.2.1. Màn hình
- Màn hình:

![Thống kê dữ liệu mở](./images/thongke_dlm.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Biểu đồ thống kê dữ liệu mở</p>

#### 4.8.3.2.2. Mô tả thông tin trên màn hình
Hiển thị các chỉ số theo dõi:
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tổng dataset | Số | - | - | Số lượng đã công bố. |
| Lượt tải | Số | - | - | Theo dõi mức độ quan tâm của cộng đồng. |
| Biểu đồ phân bổ | Biểu đồ | - | - | Phân loại theo định dạng và lĩnh vực. |

#### 4.8.3.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xuất báo cáo | Nút | Kết xuất dữ liệu biểu đồ. |


