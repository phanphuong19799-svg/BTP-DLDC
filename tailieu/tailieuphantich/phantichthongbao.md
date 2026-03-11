# 4.9. PM09.QLTB_Quản lý thông báo (Notifications)

## 4.9.1. PM09.QLTB.DS – Quản lý danh sách thông báo

### 4.9.1.1. Mục đích
Cung cấp trung tâm kiểm soát và theo dõi toàn bộ các sự kiện, cảnh báo, thông báo lỗi hoặc tiến độ công việc phát sinh từ các phân hệ khác trong hệ thống Kho DLDC.

### 4.9.1.2. PM09.QLTB.DS.MH01 – Giao diện Quản lý thông báo
*(Giao diện tham chiếu: [NotificationPage.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/pages/NotificationPage.tsx))*

#### 4.9.1.2.1. Màn hình
- Màn hình:

![Giao diện Quản lý thông báo](./images/quanly_thongbao.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Giao diện danh sách và quản lý thông báo</p>

#### 4.9.1.2.2. Mô tả thông tin trên màn hình

**A. Thống kê tổng quan (Stats)**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tổng thông báo | Số | - | - | Tổng số lượng thông báo hiện có trong hộp thư. |
| Chưa đọc | Số | - | - | Số lượng thông báo chưa được xem. |
| Ưu tiên cao | Số | - | - | Số lượng thông báo mang tính chất cảnh báo khẩn cấp hoặc lỗi nghiêm trọng. |
| Hôm nay | Số | - | - | Số lượng thông báo mới phát sinh trong ngày. |

**B. Bộ lọc và Tìm kiếm**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tìm kiếm | Ký tự | - | - | Tìm kiếm từ khóa theo tiêu đề (Title) hoặc nội dung. |
| Lọc theo trạng thái | Danh sách | - | Tất cả | Tất cả / Chưa đọc / Đã đọc. |

**C. Danh sách thông báo**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Trạng thái đọc | Icon | - | - | Hiển thị chấm xanh `(•)` nếu chưa đọc. |
| Loại thông báo | Nhãn | - | - | Thành công (Xanh lá), Lỗi (Đỏ), Cảnh báo (Vàng), Thông tin (Xanh dương). |
| Tiêu đề | Ký tự | - | - | Tiêu đề tóm tắt nội dung thông báo. |
| Nội dung | Văn bản | - | - | Đoạn trích lược của thông báo (Line-clamp). |
| Mức độ ưu tiên | Nhãn | - | - | Cao (High), Trung bình (Medium), Thấp (Low). |
| Nguồn phát sinh | Ký tự | - | - | Phân hệ / Module gửi thông báo. |
| Thời gian | Ngày giờ | - | - | Thời điểm hệ thống phát đi thông báo. |

#### 4.9.1.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem chi tiết | Icon | Mở Popup chi tiết hiển thị toàn bộ nội dung thông báo. |
| 2 | Đánh dấu đã đọc | Icon | Chuyển trạng thái thông báo từ "Chưa đọc" sang "Đã đọc". |
| 3 | Xóa thông báo | Icon | Xóa thông báo khỏi hộp thư của người dùng. |

### 4.9.1.3. PM09.QLTB.DS.MH02 – Popup Chi tiết thông báo
*(Giao diện tham chiếu: [NotificationPage.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/pages/NotificationPage.tsx) - Detail Modal)*

#### 4.9.1.3.1. Màn hình
- Màn hình:

![Popup chi tiết thông báo](./images/chitiet_thongbao.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Cửa sổ chi tiết nội dung thông báo</p>

#### 4.9.1.3.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thông tin chung | Header | - | - | Hiển thị loại thông báo (Icon), Tiêu đề, Thời gian và Nguồn phát sinh. |
| Mức độ ưu tiên | Nhãn | - | - | Hiển thị nhãn cảnh báo (Cao/Trung bình/Thấp). |
| Nội dung đầy đủ | Văn bản | - | - | Hiển thị toàn văn thông điệp chi tiết từ hệ thống. |

#### 4.9.1.3.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đánh dấu đã đọc | Nút | (Chỉ với thông báo chưa đọc). |
| 2 | Đóng | Nút | Đóng Popup. |
