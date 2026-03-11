# 4.2. PM02.QLTT_Quản lý thu thập

## 4.2.1. PM02.QLTT.DB. Dashboard

### 4.2.1.1. Mục đích
Cung cấp cái nhìn tổng quan về tình hình thu thập dữ liệu từ các nguồn trong và ngoài ngành.

### 4.2.1.2. PM02.QLTT.DB.MH01 – Dashboard
#### 4.2.1.2.1. Màn hình
- Màn hình: `./images/dashboard_qltt.png` (Đã đính kèm)

#### 4.2.1.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Thẻ thống kê (Cards)** | | | | |
| Tổng số bản ghi đã thu thập | Số | - | 2,548,750 | Tổng cộng từ tất cả các nguồn |
| Bản ghi ngoài ngành | Số | - | 1,345,280 | Thu thập từ các Bộ/Ngành khác |
| Bản ghi trong ngành | Số | - | 1,203,470 | Thu thập từ các đơn vị trực thuộc Bộ |
| **Biểu đồ (Charts)** | | | | |
Cho phép người dùng thiết lập các tham số, cấu hình cho quá trình thu thập dữ liệu (thời gian, tần suất, nguồn kết nối).

**a. Phân quyền**
- NSD là: Quản trị viên hệ thống.

**b. Điều kiện thực hiện**
- Tài khoản có quyền quản trị.

### 4.2.2.2. PM02.QLTT.TL.MH01 – Thiết lập dịch vụ

#### 4.2.2.2.1. Màn hình
- Màn hình:

![Thiết lập thu thập](./images/thietlapthuthap.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 12 - Màn hình thiết lập thu thập</p>

#### 4.2.2.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã cấu hình | Ký tự (50) | Có | Tự sinh | Mã code định danh duy nhất cho cấu hình. |
| Tên cấu hình | Ký tự (200) | Có | Để trống | Tên mô tả cho thiết lập. |
| API Endpoint | URL | Có | Để trống | Đường dẫn kết nối thu thập dữ liệu. |
| Phương thức kết nối | Danh sách | Có | GET | Lựa chọn GET, POST, SOAP, v.v. |
| Tần suất (Cron) | Ký tự (50) | Có | 0 0 * * * | Thiết lập thời gian chạy tự động. |
| Trạng thái | Radio | Có | Hoạt động | Trạng thái Hoạt động / Tạm dừng. |

#### 4.2.2.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thêm mới | Nút | Mở form nhập liệu tạo cấu hình mới. |
| 2 | Kiểm tra (Test Connection) | Nút | Gửi yêu cầu thử nghiệm đến Endpoint để kiểm tra phản hồi. |
| 3 | Lưu / Cập nhật | Nút | Lưu thông tin cấu hình vào CSDL. |
| 4 | Xóa | Nút | Loại bỏ cấu hình (yêu cầu xác nhận). |

#### 4.2.2.2.4. PM02.QLTT.TL.MH01 – Thêm dịch vụ mới

##### 4.2.2.2.4.1. Màn hình
- Màn hình:

![Thêm dịch vụ mới](./images/thietlapthuthap_themdichvu.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 13 - Màn hình thêm dịch vụ mới</p>

##### 4.2.2.2.4.2. Mô tả thông tin trên màn hình

**Tab 1: Thông tin chung**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên service | Ký tự | Có | Để trống | Tên gợi nhớ cho dịch vụ dữ liệu. |
| Tên đơn vị | Ký tự | Có | Để trống | Đơn vị sở hữu/quản lý dữ liệu. |
| Hệ thống | Ký tự | Có | Để trống | Tên hệ thống nguồn cấp dữ liệu. |
| Nguồn thu thập | Danh sách | Có | Để trống | Hệ thống nội ngành, Ngoài ngành. |
| Mức độ bảo mật | Danh sách | Có | Dữ liệu mở | Mức độ nhạy cảm của dữ liệu. |
| Mô tả | Văn bản | Không | Để trống | Mô tả chi tiết về phạm vi của service. |
| Đính kèm văn bản | File | Không | Để trống | Đính kèm tài liệu liên quan. |

**Tab 2: Thông tin đơn vị cung cấp**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên đơn vị | Ký tự | Có | Để trống | Tên đầy đủ đơn vị cung cấp. |
| Địa chỉ | Ký tự | Không | Để trống | Địa chỉ trụ sở của đơn vị. |
| Số điện thoại | Số | Có | Để trống | SĐT liên hệ của đơn vị/cán bộ. |
| Email | Email | Có | Để trống | Email nhận thông báo hệ thống. |
| Người đầu mối kỹ thuật| Ký tự | Có | Để trống | Họ tên và SĐT cán bộ kỹ thuật. |

**Tab 3: Cấu hình kết nối**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Base URL | URL | Có | Để trống | Địa chỉ máy chủ API. |
| Endpoint Path | Ký tự | Không | Để trống | Đường dẫn cụ thể của tài nguyên. |
| Method | Danh sách | Có | GET | GET, POST, PUT... |
| Content Type | Danh sách | Có | JSON | application/json, text/xml... |
| Authentication | Ký tự | Không | Để trống | Mã xác thực (Token, key...). |

**Tab 4: Cấu hình thu thập**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Phương thức đồng bộ| Danh sách | Có | Real-time | Real-time, Batch, Scheduled. |
| Tần suất thu thập | Danh sách | Có | Mỗi giờ | Thủ công, Mỗi giờ, Hàng ngày... |

##### 4.2.1.3. PM02.QLTT.MH03 – Tìm kiếm nâng cao (Popup)
*(Giao diện tham chiếu: [AdvancedSearchModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/collection/AdvancedSearchModal.tsx))*

| Trường thông tin | Kiểu dữ liệu | Mô tả |
| :--- | :--- | :--- |
| Cơ quan | Danh sách | Lọc theo đơn vị chủ quản (Bộ Ngoại giao, Bộ Công an...). |
| Loại dữ liệu | Danh sách | Tòa án, Danh mục, Bảo trợ XH, Hộ tịch, Quốc tịch... |
| Tần suất | Danh sách | Hằng ngày, Hằng tuần, Hằng tháng, Hằng quý, Hằng năm. |
| Định dạng | Danh sách | JSON, XML, CSV, Excel. |
| Trạng thái | Danh sách | Đã thu thập, Đang xử lý, Chưa bắt đầu. |
| Mức độ ưu tiên | Danh sách | Cao, Trung bình, Thấp. |
| Thời gian cập nhật | Khoảng ngày | Từ ngày - Đến ngày. |

### 4.2.1.4. PM02.QLTT.MH04 – Chi tiết Lỗi/Cảnh báo/Thông báo (Popup)
*(Giao diện tham chiếu: [ValidationDetailsModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/collection/ValidationDetailsModal.tsx))*

Màn hình hiển thị danh sách chi tiết các bản ghi vi phạm quy tắc thu thập hoặc thông tin quản trị.

#### 4.2.1.4.1. Thông tin chung
- **Mã giao dịch**: Mã định danh phiên thu thập.
- **Tổng số mục**: Số lượng bản ghi trong danh sách.

#### 4.2.1.4.2. Cấu trúc bảng dữ liệu (Tùy biến theo loại)
| Loại dữ liệu | Các cột hiển thị chính |
| :--- | :--- |
| **Lỗi (Errors)** | Mã bản ghi, Trường lỗi, Loại lỗi, Mô tả chi tiết. |
| **Cảnh báo (Warnings)** | Mã bản ghi, Trường, Loại cảnh báo, Mô tả. |
| **Thông báo (Notifications)** | Ngày gửi, Người nhận, Tiêu đề, Trạng thái. |

### 4.2.1.5. PM02.QLTT.MH05 – Tạo báo cáo thống kê (Popup)
*(Giao diện tham chiếu: [ReportModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/modals/ReportModal.tsx))*

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| Loại báo cáo | Chọn 1 | Có | Sử dụng dịch vụ, Hiệu suất API, Truy cập & Bảo mật. |
| Dịch vụ | Danh sách | Có | Chọn 1 hoặc tất cả dịch vụ đang hoạt động. |
| Khoảng thời gian | Ngày | Có | Từ ngày - Đến ngày. |
| Định dạng xuất | Chọn 1 | Có | PDF, Excel, Word, CSV. |
| Tùy chọn | Checkbox | - | Bao gồm biểu đồ, Bao gồm dữ liệu chi tiết. |

### 4.2.1.6. PM02.QLTT.MH06 – Chi tiết thông báo lỗi (Popup)
*(Giao diện tham chiếu: [NotificationDetailModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/modals/NotificationDetailModal.tsx))*

Hiển thị nội dung chi tiết của một thông báo được gửi đến hệ thống hoặc người quản trị.

| Nhóm thông tin | Trường dữ liệu | Mô tả |
| :--- | :--- | :--- |
| **Thông tin lỗi** | Dịch vụ, Endpoint, Status Code | Bối cảnh kỹ thuật phát sinh lỗi cần thông báo. |
| **Bên nhận** | Người nhận, Vai trò, Email | Thông tin cán bộ/đơn vị tiếp nhận. |
| **Nội dung** | Tiêu đề, Loại (Email/SMS/Hệ thống), Nội dung | Thông điệp thông báo chi tiết. |
| **Trạng thái** | Đã xem/Chưa xem | Thời gian người nhận đã đọc thông báo. |
| **Lịch sử** | Dòng thời gian | Nhật ký gửi và xem thông báo. |

##### 4.2.2.2.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng modal và thoát không lưu. |
| 2 | Lưu nháp | Nút | Ghi nhận thông tin tạm thời vào hệ thống. |
| 3 | Chuyển Tab | Nút | Điều hướng giữa các phần cấu hình. |
| 4 | Chọn file | Nút | Đính kèm tài liệu hỗ trợ. |

#### 4.2.2.2.5. PM02.QLTT.TL.MH01 – Sửa dịch vụ

##### 4.2.2.2.5.1. Màn hình
- Màn hình:

![Sửa dịch vụ](./images/thietlapthuthap_suadichvu.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 14 - Màn hình sửa dịch vụ</p>

##### 4.2.2.2.5.2. Mô tả thông tin trên màn hình

Tương tự màn hình Thêm mới, giao diện bao gồm 4 tab cho phép chỉnh sửa các thông tin đã cấu hình:

**Tab 1: Thông tin chung**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên service | Ký tự | Có | Dữ liệu cũ | Tên gợi nhớ cho dịch vụ dữ liệu. |
| Tên đơn vị | Ký tự | Có | Dữ liệu cũ | Đơn vị sở hữu/quản lý dữ liệu. |
| Hệ thống | Ký tự | Có | Dữ liệu cũ | Tên hệ thống nguồn cấp dữ liệu. |
| Nguồn thu thập | Danh sách | Có | Dữ liệu cũ | Hệ thống nội ngành, Ngoài ngành. |
| Mức độ bảo mật | Danh sách | Có | Dữ liệu cũ | Mức độ nhạy cảm của dữ liệu. |
| Mô tả | Văn bản | Không | Dữ liệu cũ | Mô tả chi tiết về phạm vi của service. |
| Đính kèm văn bản | File | Không | Dữ liệu cũ | Đính kèm tài liệu liên quan. |

**Tab 2: Thông tin đơn vị cung cấp**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên đơn vị | Ký tự | Có | Dữ liệu cũ | Tên đầy đủ đơn vị cung cấp. |
| Địa chỉ | Ký tự | Không | Dữ liệu cũ | Địa chỉ trụ sở của đơn vị. |
| Số điện thoại | Số | Có | Dữ liệu cũ | SĐT liên hệ của đơn vị/cán bộ. |
| Email | Email | Có | Dữ liệu cũ | Email nhận thông báo hệ thống. |
| Người đầu mối kỹ thuật| Ký tự | Có | Dữ liệu cũ | Họ tên và SĐT cán bộ kỹ thuật. |

**Tab 3: Cấu hình kết nối**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Base URL | URL | Có | Dữ liệu cũ | Địa chỉ máy chủ API. |
| Endpoint Path | Ký tự | Không | Dữ liệu cũ | Đường dẫn cụ thể của tài nguyên. |
| Method | Danh sách | Có | Dữ liệu cũ | GET, POST, PUT... |
| Content Type | Danh sách | Có | Dữ liệu cũ | application/json, text/xml... |
| Authentication | Ký tự | Không | Dữ liệu cũ | Mã xác thực (Token, key...). |

**Tab 4: Cấu hình thu thập**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Phương thức đồng bộ| Danh sách | Có | Dữ liệu cũ | Real-time, Batch, Scheduled. |
| Tần suất thu thập | Danh sách | Có | Dữ liệu cũ | Thủ công, Mỗi giờ, Hàng ngày... |

##### 4.2.2.2.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Quay lại danh sách, không lưu thay đổi. |
| 2 | Cập nhật | Nút | Kiểm tra tính hợp lệ và ghi đè thông tin mới. |
| 3 | Chuyển Tab | Nút | Duyệt qua các phần thông tin để chỉnh sửa. |

#### 4.2.2.2.6. PM02.QLTT.TL.MH01 – Xem chi tiết

##### 4.2.2.2.6.1. Màn hình
- Màn hình:

![Xem chi tiết](./images/thietlapthuthap_xemchitiet.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 15 - Màn hình xem chi tiết</p>

##### 4.2.2.2.6.2. Mô tả thông tin trên màn hình

Hiển thị toàn bộ thông tin cấu hình dưới dạng xem chi tiết:

**1. Thông tin chung**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên service | Ký tự | Có | Dữ liệu cũ | Tên hiển thị của dịch vụ. |
| Đơn vị quản lý | Ký tự | Có | Dữ liệu cũ | Đơn vị sở hữu dịch vụ. |
| Trạng thái | Nhãn | Có | Dữ liệu cũ | Hoạt động / Không hoạt động. |
| Phân loại dữ liệu | Nhãn | Có | Dữ liệu cũ | Nội ngành / Ngoài ngành. |

**2. Thông tin kết nối**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| URL Endpoint | URL | Có | Dữ liệu cũ | Đường dẫn API đầy đủ. |
| Method | Ký tự | Có | Dữ liệu cũ | Phương thức gọi API. |
| Client ID | Ký tự | Không | Dữ liệu cũ | Định danh ứng dụng khách. |
| Client Secret | Password | Không | ********* | Mã bí mật (mặc định ẩn). |

##### 4.2.2.2.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Phê duyệt | Nút | Quản trị viên xử lý yêu cầu mới (Pending). |
| 2 | Công khai | Nút | Thay đổi trạng thái vận hành của dịch vụ. |
| 3 | Xem dữ liệu | Nút | Điều hướng đến trang dữ liệu thu thập được. |
| 4 | Đóng | Nút | Đóng modal xem chi tiết. |

#### 4.2.2.2.7. Màn hình xóa dịch vụ
- Màn hình:

![Xóa dịch vụ](./images/thietlapthuthap_xoadichvu.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 16 - Màn hình xóa dịch vụ</p>

- **Mô tả thông tin trên màn hình**: 
    - Thông báo cảnh báo về việc xóa cấu hình dịch vụ.
    - Tên và Mã dịch vụ mục tiêu.

- **Chức năng trên màn hình**:

| STT | Tên chức năng | Mô tả |
| :--- | :--- | :--- |
| 1 | Xác nhận xóa | Loại bỏ hoàn toàn dịch vụ khỏi hệ thống quản lý. |
| 2 | Hủy / Đóng | Hủy bỏ thao tác xóa. |

#### 4.2.2.2.8. Màn hình cài đặt dịch vụ
- Màn hình:

![Cài đặt dịch vụ](./images/thietlapthuthap_caitatdichvu.png)

- **Mô tả thông tin trên màn hình**: Cấu hình các tham số vận hành nâng cao:
    - Tham số xác thực (Header, Token).
    - Giới hạn tần suất gọi (Rate limit).
    - Cấu hình cảnh báo khi có sự cố.

- **Chức năng trên màn hình**:

| STT | Tên chức năng | Mô tả |
| :--- | :--- | :--- |
| 1 | Lưu cấu hình | Áp dụng các thiết lập nâng cao. |
| 2 | Kiểm tra (Test) | Thử nghiệm các tham số cài đặt mới. |

### 4.2.2.3. PM02.QLTT.TL.MH02 – Quản lý nhật ký

#### 4.2.2.3.1. Mục đích
Theo dõi và truy vết toàn bộ các hoạt động truy cập, thao tác và các sự kiện hệ thống để phục vụ công tác quản lý, giám sát và bảo mật.

**a. Phân quyền**
- NSD là: Quản trị viên hệ thống, Cán bộ quản lý.

**b. Điều kiện thực hiện**
- Hệ thống đã kích hoạt tính năng ghi nhật ký (Logging).

#### 4.2.2.3.2. PM02.QLTT.TL.MH02.MH01 – Quản lý nhật ký

##### 4.2.2.3.2.1. Màn hình
- Màn hình:

![Quản lý nhật ký](./images/thietlapthuthap_quanlynhatky.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 17 - Màn hình quản lý nhật ký</p>

##### 4.2.2.3.2.2. Mô tả thông tin trên màn hình

**Tab 1: Lịch sử truy cập**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Người dùng | Ký tự | - | - | Tên đăng nhập và Họ tên. |
| Hành động | Ký tự | - | - | Đăng nhập, Đăng xuất... |
| Thời gian | Giờ | - | - | Thời điểm thực hiện. |
| IP | Ký tự | - | - | Địa chỉ IP máy khách. |
| Trạng thái | Nhãn | - | - | Thành công, Thất bại. |

**Tab 2: Lịch sử hoạt động**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Người dùng | Ký tự | - | - | Người thực hiện thao tác. |
| Hành động | Ký tự | - | - | Thêm, Sửa, Xóa... |
| Module | Ký tự | - | - | Phần hành tương ứng. |
| Chi tiết | Văn bản | - | - | Nội dung chi tiết thao tác. |

**Bộ lọc tìm kiếm**
| Trường lọc | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Từ khóa search | Ký tự | Không | Để trống | Tìm theo người dùng, hành động... |
| Khoảng thời gian | DateRange | Không | 7 ngày qua | Lọc từ ngày - đến ngày. |

##### 4.2.2.3.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Kết xuất | Nút | Xuất nhật ký ra file Excel. |
| 2 | Xem chi tiết | Icon | Mở màn hình Chi tiết nhật ký. |
| 3 | Chuyển Tab | Button | Xem các loại nhật ký khác nhau. |

#### 4.2.2.3.3. PM02.QLTT.TL.MH02.MH02 – Chi tiết nhật ký

##### 4.2.2.3.3.1. Màn hình
- Màn hình: *(Chèn hình ảnh giao diện chi tiết nhật ký tại đây)*

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 18 - Màn hình chi tiết nhật ký</p>

##### 4.2.2.3.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thời gian | Giờ | - | - | Thời điểm ghi nhận log. |
| Thiết bị | Ký tự | - | - | OS, Trình duyệt người dùng. |
| Nội dung chi tiết | Văn bản | - | - | Mô tả đầy đủ về hành động/sự kiện. |
| Trạng thái | Nhãn | - | - | Thành công / Thất bại. |

### 4.2.3. PM02.QLTT.TN. CSDL Trong ngành

#### 4.2.3.1. Mục đích
Module này cho phép quản trị viên và người quản lý dữ liệu theo dõi tình hình thu thập, xử lý và thống kê dữ liệu từ các hệ thống nghiệp vụ nội bộ của Bộ Tư pháp. Hệ thống cung cấp cái nhìn tổng quan theo thời gian thực về lưu lượng dữ liệu và tính chính xác của dữ liệu được đồng bộ về kho DLDC.

#### 4.2.3.2. Cấu trúc danh mục hệ thống (Sidebar)
Trong menu "CSDL Trong ngành", người dùng có thể truy cập vào các phân hệ dữ liệu cụ thể:
1.  **CSDL Hộ tịch điện tử**: Dữ liệu về khai sinh, kết hôn, khai tử...
2.  **HT quản lý hồ sơ QT**: Hệ thống quản lý hồ sơ Quốc tịch.
3.  **CSDL thi hành án dân sự**: Theo dõi tiến độ và kết quả thi hành án.
4.  **CSDL về biện pháp BD**: Đăng ký biện pháp bảo đảm.
5.  **CSDL quốc gia về PL**: Văn bản quy phạm pháp luật.
6.  **CSDL TT Tư Pháp dân sự**: Thông tin lý lịch tư pháp.
7.  **HTTT TTTG pháp lý dân sự**: Trợ giúp pháp lý trong lĩnh vực dân sự.
8.  **HTTT TG Pháp lý**: Dữ liệu trợ giúp pháp lý nói chung.
9.  **CSDL PB, GĐ và HG cơ sở**: Phổ biến, giáo dục pháp luật và hòa giải.
10. **CSDL quản lý đấu giá TS**: Thông tin về đấu giá tài sản.
11. **CSDL Hợp tác quốc tế**: Các thỏa thuận và hoạt động quốc tế.

#### 4.2.3.3. PM02.QLTT.TN.MH01 – Giao diện Dashboard phân hệ (Ví dụ: CSDL Hộ tịch điện tử)

##### 4.2.3.3.1. Màn hình
- Màn hình:

*(Chèn hình ảnh giao diện Dashboard Hộ tịch điện tử tại đây)*

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 19 - Dashboard chi tiết CSDL Hộ tịch điện tử</p>

##### 4.2.3.3.2. Mô tả thông tin trên màn hình
*(Giao diện tham chiếu: [CivilRegistryDatabasePage.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/pages/external/CivilRegistryDatabasePage.tsx))*

**A. Khung chỉ số thống kê (Stats Cards)**
Hiển thị 12 nhóm dữ liệu nghiệp vụ Hộ tịch chính yếu:

| STT | Loại hồ sơ | Mô tả nghiệp vụ |
| :--- | :--- | :--- |
| 1 | Hồ sơ khai sinh | Dữ liệu đăng ký khai sinh. |
| 2 | Hồ sơ đăng ký kết hôn | Dữ liệu đăng ký kết hôn. |
| 3 | Hồ sơ cấp GĐKN kết hôn | Cấp giấy xác nhận tình trạng hôn nhân. |
| 4 | Hồ sơ đăng ký khai tử | Dữ liệu đăng ký khai tử. |
| 5 | Hồ sơ DK nhận cha, mẹ, con | Đăng ký nhận diện quan hệ gia đình. |
| 6 | Hồ sơ đăng ký nuôi con nuôi | Dữ liệu về con nuôi và cha mẹ nuôi. |
| 7 | Hồ sơ đăng ký giám hộ | Đăng ký các trường hợp giám hộ. |
| 8 | Hồ sơ DK chấm dứt giám hộ | Kết thúc quyền giám hộ. |
| 9 | Hồ sơ DK thay đổi TT hộ tịch... | Thay đổi, cải chính, bổ sung hộ tịch, xác định dân tộc. |
| 10 | Hồ sơ đăng ký ghi chú việc giám hộ | Ghi chú các quyết định giám hộ. |
| 11 | Hồ sơ đăng ký giám sát việc giám hộ | Theo dõi quá trình giám sát giám hộ. |
| 12 | Hồ sơ ly hôn/hủy kết hôn nước ngoài | Ghi chú bản án ly hôn nước ngoài. |

**Bảng mô tả thông tin thẻ (Stats Cards)**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên nhóm | Ký tự | - | - | Gồm Icon và Tên loại hồ sơ nghiệp vụ. |
| Số lượng bản ghi | Số | - | - | Tổng số dữ liệu thực tế đã thu thập. |
| Tỷ lệ tăng trưởng | Nhãn/Số % | - | - | Biến động so với kỳ trước (Xanh: Tăng, Đỏ: Giảm). |

**B. Biểu đồ thu thập dữ liệu (Stacked Bar Chart)**

| Thành phần | Mô tả chi tiết |
| :--- | :--- |
| Tiêu đề | Biểu đồ thu thập dữ liệu. |
| Trục tung (Y) | Số lượng bản ghi (Thang đo từ 0 đến 3.5M). |
| Trục hoành (X) | Danh sách các loại hồ sơ (Khai sinh, Kết hôn...). |
| Màu sắc | Xanh dương (Tháng trước), Cam (Tháng này). |
| Chú thích | Tổng số bản ghi hiển thị (VD: Tổng số: 100). |
| Ý nghĩa | So sánh biến động dữ liệu giữa hai tháng gần nhất. |

**C. Danh sách CSDL thu thập (Table)**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên cơ liệu | Ký tự | - | - | Ví dụ: Hồ sơ khai sinh. |
| Thuộc | Ký tự | - | - | Nhóm CSDL lớn (Hộ tịch điện tử). |
| Số lượng đăng ký hôm nay | Số | - | 20,000 | Số bản ghi mới phát sinh. |
| Số lượng bản ghi lỗi | Số | - | 30 | Số bản ghi cần xử lý lại. |

##### 4.2.3.3.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lọc khoảng thời gian | Date Range | Ví dụ: 01/01/2024 - 30/04/2024. |
| 2 | Kết xuất | Nút | Xuất dữ liệu biểu đồ. |
| 3 | Lọc biểu đồ | Dropdown | Chọn: Tháng này, Tháng trước, v.v. |
| 4 | Xem chi tiết | Click (Card/Row) | Điều hướng đến màn hình Danh sách bản ghi chi tiết. |

#### 4.2.3.4. PM02.QLTT.TN.MH02 – Chi tiết dữ liệu đã thu thập (Ví dụ: Hồ sơ khai sinh)

##### 4.2.3.4.1. Màn hình
- Màn hình:

*(Chèn hình ảnh giao diện Danh sách hồ sơ khai sinh tại đây)*

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 20 - Màn hình chi tiết dữ liệu thu thập (Hồ sơ khai sinh)</p>

##### 4.2.3.4.2. Mô tả thông tin trên màn hình

**A. Thông tin chung & Thống kê**
| Chỉ số thống kê | Giá trị ví dụ | Ý nghĩa |
| :--- | :--- | :--- |
| Tiêu đề | Chi tiết dữ liệu - Hồ sơ khai sinh | Tên nghiệp vụ dữ liệu đang xem. |
| Đồng bộ cuối cùng | 25/02/2026 14:30:00 | Thời điểm gần nhất hệ thống lấy dữ liệu. |
| Tổng bản ghi | 3,424 | Tổng số bản ghi tích lũy. |
| Bản ghi mới hôm nay | 2,179 | Số lượng bản ghi mới trong ngày. |
| Bản ghi cập nhật | 435 | Số lượng bản ghi thay đổi thông tin. |
| Bản ghi lỗi | 108 | Số lượng bản ghi thất bại khi đồng bộ. |

**B. Hệ thống Tab dữ liệu**
| STT | Tên Tab | Mô tả nội dung |
| :--- | :--- | :--- |
| 1 | Danh sách đối tượng | Bảng dữ liệu chi tiết các bản ghi. |
| 2 | LS chỉnh sửa kết nối | Truy vết thay đổi cấu hình API. |
| 3 | Lịch sử đồng bộ | Nhật ký các phiên chạy đồng bộ. |

**C. Danh sách bản ghi (Tab: Danh sách đối tượng)**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| STT | Số | - | - | Thứ tự bản ghi. |
| Tình trạng | Nhãn | - | - | Mới (Xanh) / Cập nhật (Tím). |
| Họ tên | Ký tự | - | - | Tên chủ thể dữ liệu. |
| Giới tính | Ký tự | - | - | Nam / Nữ. |
| Ngày sinh | Ngày | - | - | dd/mm/yyyy. |
| Họ tên Cha | Ký tự | - | - | Tên người cha. |
| Họ tên Mẹ | Ký tự | - | - | Tên người mẹ. |
| Quốc tịch | Ký tự | - | - | Quốc tịch bản ghi. |
| Số giấy chứng nhận | Ký tự | - | - | Mã số trên giấy khai sinh. |
| Ngày đăng ký | Ngày | - | - | Ngày thực hiện đăng ký Hộ tịch. |
| Ngày đồng bộ | Giờ | - | - | dd/mm/yyyy hh:mm:ss. |
| Trạng thái | Nhãn | - | - | Đã phê duyệt / Chưa phê duyệt. |

##### 4.2.3.4.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Ô nhập | Tìm theo tên, mã dịch vụ, đơn vị... |
| 2 | Tìm kiếm nâng cao | Nút | Lọc chi tiết theo thời gian, trạng thái... |
| 3 | Nhập/Xuất | Nút | Thao tác dữ liệu file (Excel). |
| 4 | Đồng bộ | Nút | Kích hoạt phiên đồng bộ tức thời. |
| 5 | Xem chi tiết | Icon | Mở Popup Chi tiết bản ghi. |

#### 4.2.3.5. PM02.QLTT.TN.MH03 – Chi tiết bản ghi (Ví dụ: Hồ sơ khai sinh)

##### 4.2.3.5.1. Màn hình
- Màn hình: Popup modal nổi trên nền màn hình danh sách.

*(Chèn hình ảnh giao diện Popup Chi tiết bản ghi khai sinh tại đây)*

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 21 - Màn hình chi tiết bản ghi (Hồ sơ khai sinh)</p>

##### 4.2.3.5.2. Mô tả thông tin trên màn hình

**A. Thông tin về người được khai sinh (Tab 1)**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Họ, chữ đệm, tên | Ký tự | - | - | Tên đầy đủ người khai sinh. |
| Giới tính | Ký tự | - | - | Nam / Nữ. |
| Ngày, tháng, năm sinh | Ngày | - | - | dd/mm/yyyy. |
| Ngày sinh bằng chữ | Ký tự | - | - | Ví dụ: Ngày 15 tháng 5 năm 1985. |
| Nơi sinh | Ký tự | - | - | Địa danh nơi sinh. |
| Quê quán | Ký tự | - | - | Địa danh quê quán. |
| Dân tộc | Ký tự | - | - | Kinh, Tày, v.v. |
| Quốc tịch | Ký tự | - | - | Việt Nam, v.v. |
| Số định danh cá nhân | Ký tự | - | - | Mã số định danh 12 số. |

**B. Tab Người cha / Người mẹ (Tab 2 & 3)**
| Trường thông tin | Mô tả |
| :--- | :--- |
| Thông tin định danh | Họ tên, Ngày sinh, Dân tộc, Quốc tịch. |
| Thông tin cư trú | Nơi thường trú, nơi ở hiện tại. |
| Giấy tờ tùy thân | Loại giấy tờ, Số, Ngày cấp, Nơi cấp. |

**C. Tab Thông tin khác (Tab 4)**
| Trường thông tin | Mô tả |
| :--- | :--- |
| Thông tin đăng ký | Nơi đăng ký, Ngày đăng ký. |
| Thông tin người đi KH | Họ tên, quan hệ với người được KH. |
| Thông tin ký duyệt | Người ký, chức vụ, ngày ký. |

##### 4.2.3.5.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chuyển Tab | Button | Điều hướng giữa 4 nhóm thông tin. |
| 2 | Xuất file | Nút | Kết xuất chi tiết bản ghi ra tệp tin. |
| 3 | Đóng | Nút / Icon X | Thoát khỏi màn hình chi tiết. |

#### 4.2.3.6. PM02.QLTT.TN.MH04 – Chi tiết nhật ký lỗi

##### 4.2.3.6.1. Màn hình
- Màn hình:

*(Chèn hình ảnh giao diện Chi tiết lỗi tại đây)*

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 22 - Màn hình chi tiết nhật ký lỗi</p>

##### 4.2.3.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã lỗi | Ký tự | - | - | Mã định danh lỗi (VD: DB_TIMEOUT). |
| Thông báo lỗi | Văn bản | - | - | Chi tiết nội dung lỗi phát sinh. |
| Stack Trace | Văn bản | - | - | Vết mã nguồn gây lỗi (Technical). |
| Thời gian | Giờ | - | - | Thời điểm xảy ra lỗi. |

##### 4.2.3.6.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đánh dấu đã xử lý | Nút | Cập nhật trạng thái lỗi. |
| 2 | Copy Stack Trace | Nút | Sao chép vết lỗi để gửi kỹ thuật. |

### 4.2.4. PM02.QLTT.NN. CSDL Ngoài ngành

#### 4.2.4.1. Mục đích
Module này quản lý và theo dõi việc thu thập dữ liệu từ các đối tác, cơ quan ngoài ngành (BHXH, Thuế, Dân cư...). Hệ thống cung cấp các dashboard chi tiết cho từng nhóm dữ liệu đặc thù từ bên ngoài.
        
#### 4.2.4.2. Cấu trúc danh mục hệ thống (Sidebar)
Trong menu "CSDL Ngoài ngành", người dùng có thể truy cập:
1.  **CSDL Thông tin Bản án (1)**: Dữ liệu về các bản án, quyết định từ tòa án.
2.  **Danh mục (8)**: Các danh mục dùng chung (Giới tính, Dân tộc, Quốc gia...).
3.  **BHXH và Giảm nghèo (7)**: Thông tin bảo hiểm xã hội và hộ nghèo.
4.  **Người có công (3)**: Dữ liệu về chính sách người có công.
5.  **Trẻ em (1)**: Dữ liệu về bảo vệ và chăm sóc trẻ em.

#### 4.2.4.3. PM02.QLTT.NN.MH01 – Giao diện Dashboard phân hệ (Ví dụ: Danh mục)

##### 4.2.4.3.1. Màn hình
- Màn hình:

![Dashboard Danh mục Ngoài ngành](./images/dashboard_danhmuc_ngoai.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 23 - Dashboard chi tiết nhóm Danh mục (Ngoài ngành)</p>

##### 4.2.4.3.2. Mô tả thông tin trên màn hình
*(Giao diện tham chiếu: [ExternalDataPage.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/pages/collection/ExternalDataPage.tsx))*

**A. Khung chỉ số thống kê (Stats Cards)**
Hiển thị tổng quan về các nguồn dữ liệu ngoài ngành:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tổng nguồn | Số | - | 12 | Tổng số nguồn dữ liệu đã kết nối. |
| Đang hoạt động | Số | - | 8 | Số lượng nguồn đang trong trạng thái active. |
| Ngừng hoạt động | Số | - | 2 | Số lượng nguồn đang tạm dừng. |
| Tổng bản ghi | Số | - | 8.15M | Tổng số lượng bản ghi đã thu thập từ ngoài ngành. |

**B. Bộ lọc tìm kiếm (Filters)**

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tìm kiếm | Ký tự | Không | Để trống | Tìm theo tên nguồn, Bộ ngành... |
| Trạng thái | Danh sách | Không | Tất cả | Tất cả, Hoạt động, Ngừng, Chờ xử lý. |

**C. Danh sách nguồn dữ liệu (Table)**

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Nguồn dữ liệu | Ký tự | - | - | Tên CSDL ngoài ngành (VD: CSDL Đăng ký doanh nghiệp). |
| Bộ/Ngành | Ký tự | - | - | Cơ quan chủ quản (VD: Bộ Kế hoạch và Đầu tư). |
| Loại kết nối | Nhãn | - | - | API, Database, File Transfer. |
| Số bản ghi | Số | - | - | Số lượng dữ liệu thực tế đã thu thập. |
| Tần suất | Ký tự | - | - | Hàng ngày, Hàng tuần, Hàng tháng... |
| Đồng bộ cuối | Ngày giờ | - | - | dd/mm/yyyy hh:mm. |
| Trạng thái | Nhãn | - | - | Hoạt động (Xanh), Ngừng (Đỏ), Chờ xử lý (Vàng). |

##### 4.2.4.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thêm nguồn mới | Nút | Mở form cấu hình kết nối nguồn dữ liệu ngoài ngành mới. |
| 2 | Lọc | Nút | Thực hiện lọc dữ liệu theo tiêu chí đã chọn. |
| 3 | Xem chi tiết | Icon | Điều hướng đến màn hình chi tiết cấu hình và dữ liệu nguồn. |
| 4 | Đồng bộ ngay | Icon | Kích hoạt tiến trình thu thập dữ liệu tức thời. |

#### 4.2.4.4. PM02.QLTT.NN.MH04 – Popup Thêm/Sửa nguồn dữ liệu
*(Giao diện tham chiếu: [AddServiceModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/modals/AddServiceModal.tsx))*

**A. Bước 1: Thông tin cơ bản**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| Mã dịch vụ | Ký tự | Có | Mã định danh duy nhất cho dịch vụ. |
| Tên dịch vụ | Ký tự | Có | Tên hiển thị của dịch vụ. |
| Đơn vị quản lý | Dropdown | Có | Chọn từ danh sách đơn vị (Cục HCTP, Cục THADS...). |
| Mô tả dịch vụ | Văn bản | Có | Mô tả chi tiết mục đích dịch vụ. |

**B. Bước 2: Chọn bảng & trường**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| Chọn CSDL | Card | Có | Chọn DB_HOTICH, DB_BPBD, DB_THADS... |
| Chọn bảng | Card | Có | Chọn bảng trong CSDL đã chọn (VD: tbl_khai_sinh). |
| Chọn trường | Checkbox | Có | Chọn các cột dữ liệu cần thu thập. |

**C. Bước 3: Cấu hình API**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| API Endpoint | Ký tự | Có | Đường dẫn API (VD: /civil-registry/records). |
| Phương thức | Dropdown | Có | GET, POST, PUT, DELETE. |
| Cấp độ truy cập | Dropdown | Có | Public, Internal, Restricted. |

#### 4.2.4.5. PM02.QLTT.NN.MH05 – Popup Chi tiết nguồn dữ liệu
*(Giao diện tham chiếu: [ServiceDetailModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/modals/ServiceDetailModal.tsx))*

Hiển thị toàn bộ thông tin cấu hình và thống kê vận hành của dịch vụ:
- **Thống kê sử dụng**: Tổng lượt gọi, Tỷ lệ thành công, Thời gian xử lý trung bình.
- **Thông tin quản lý**: Người tạo, Ngày tạo, Người phê duyệt, Ngày phê duyệt.
- **Hành động**: Phê duyệt, Từ chối, Đình chỉ, Công khai dịch vụ.

#### 4.2.4.6. PM02.QLTT.NN.MH06 – Chi tiết dữ liệu đã thu thập

##### 4.2.4.4.1. Màn hình
- Màn hình:

![Chi tiết dữ liệu Ngoài ngành](./images/chitiet_ngoai.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 24 - Màn hình chi tiết dữ liệu (Ngoài ngành)</p>

##### 4.2.4.4.2. Mô tả thông tin trên màn hình
*(Giao diện tương tự CSDL Trong ngành, tham chiếu: [ServiceDataDetailPage.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/pages/collection/ServiceDataDetailPage.tsx))*

#### 4.2.4.5. PM02.QLTT.NN.MH03 – Chi tiết nhật ký lỗi

##### 4.2.4.5.1. Màn hình
- Màn hình:

![Chi tiết lỗi Ngoài ngành](./images/chitiet_loi_ngoai.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 25 - Màn hình chi tiết nhật ký lỗi (Ngoài ngành)</p>

##### 4.2.4.5.2. Mô tả thông tin trên màn hình
Tương tự mục 4.2.3.6 (Chi tiết nhật ký lỗi trong ngành).

### 4.2.5. PM02.QLTT.DS. Đối soát dữ liệu

#### 4.2.5.1. Mục đích
Thực hiện so sánh, đối chiếu dữ liệu đã thu thập với dữ liệu gốc hoặc giữa các nguồn khác nhau để đảm bảo tính chính xác và nhất quán.

**a. Phân quyền**
- NSD là: Cán bộ nghiệp vụ, Quản trị viên.

**b. Điều kiện thực hiện**
- Dữ liệu đã được thu thập và lưu trữ vào kho tạm.

#### 4.2.5.2. PM02.QLTT.DS.MH01 – Đối soát dữ liệu

##### 4.2.5.2.1. Màn hình
- Màn hình:

![Đối soát dữ liệu](./images/doisoat.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 26 - Màn hình danh sách đối soát dữ liệu</p>

##### 4.2.5.2.2. Mô tả thông tin trên màn hình
*(Giao diện tham chiếu: [DataReconciliationPage.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/pages/DataReconciliationPage.tsx))*

**A. Bộ lọc & Tìm kiếm**

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Bộ lọc bất thường | Dropdown | Không | Tất cả | Tất cả, Có bất thường, Không có bất thường. |
| Tìm kiếm | Ký tự | Không | Để trống | Tìm theo tên nguồn, mô tả, mã cấu hình... |

**B. Danh sách quy trình đối soát (Table)**

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Quy trình đối soát | Ký tự | - | - | Tên CSDL và mô tả quy trình (VD: CSDL A - Đối soát tổng hợp). |
| Trạng thái | Nhãn | - | - | Hoàn thành, Đang xử lý, Chờ xử lý, Có lỗi. |
| Lần đối soát cuối | Ngày giờ | - | - | Thời điểm thực hiện gần nhất. |
| Bản ghi nguồn | Số | - | - | Số lượng tại hệ thống cung cấp. |
| Bản ghi kho DLDC | Số | - | - | Số lượng đã thu thập về kho. |
| Bản ghi đích | Số | - | - | Số lượng đã cung cấp cho bên thụ hưởng. |
| Tỷ lệ chính xác | % | - | - | Tỷ lệ khớp lệnh giữa các nguồn. |

##### 4.2.5.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xuất báo cáo | Nút | Kết xuất kết quả đối soát ra file Excel/PDF. |
| 2 | Đối soát ngay | Icon | Khởi chạy tiến trình so khớp dữ liệu thủ công. |
| 3 | Xem chi tiết | Icon | Mở màn hình danh sách bản ghi bất thường. |
| 4 | Gửi thông báo | Nút | Gửi cảnh báo lỗi đối soát cho quản trị viên/đơn vị liên quan. |

#### 4.2.5.3. PM02.QLTT.DS.MH04 – Popup Thiết lập gói tin đối soát LGSP
*(Giao diện tham chiếu: [CreateLGSPReconciliationModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/modals/CreateLGSPReconciliationModal.tsx))*

| Nhóm thông tin | Trường thông tin | Mô tả |
| :--- | :--- | :--- |
| Thông tin chung | Tên cấu hình, Hệ thống gửi/nhận, Mã dịch vụ LGSP. | Định danh luồng đối soát. |
| Phạm vi | Từ ngày, Đến ngày, Loại dữ liệu (Chi tiết/Tổng hợp). | Giới hạn dữ liệu so khớp. |
| Kỹ thuật LGSP | Endpoint, Service Name, Version, Method (REST/SOAP). | Tham số kết nối trục LGSP. |
| Bảo mật | Cơ chế xác thực, Chứng thư số. | Cấu hình chữ ký số và OAuth2. |
| Lập lịch | Tần suất, Giờ gửi. | Cấu hình chạy tự động. |

#### 4.2.5.4. PM02.QLTT.DS.MH05 – Popup Gửi thông báo đối soát
*(Giao diện tham chiếu: [SendNotificationModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/modals/SendNotificationModal.tsx))*

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| Loại thông báo | Radio | Có | Thông báo điện tử (Email) / Thông báo giấy. |
| Đầu mối nhận | Nhóm | Có | Tên, Chức vụ, Email/Đơn vị, Số điện thoại. |
| Nội dung | Nhóm | Có | Tiêu đề và Nội dung chi tiết thông báo. |
| Thời gian gửi | Radio | Có | Gửi ngay / Đặt lịch gửi. |
| Văn bản đính kèm | File | Không | Đính kèm file PDF/DOCX (đối với thông báo giấy). |

#### 4.2.5.5. PM02.QLTT.DS.MH02 – Thiết lập gói tin đối soát (LGSP)

##### 4.2.5.3.1. Màn hình
- Màn hình:

![Thiết lập đối soát](./images/thietlap_doisoat.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 27 - Màn hình thiết lập gói tin đối soát LGSP</p>

##### 4.2.5.3.2. Mô tả thông tin trên màn hình
*(Giao diện tham chiếu: [ReconciliationSetupPage.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/pages/ReconciliationSetupPage.tsx))*

**Tab: Thiết lập**

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Hệ thống gửi | Ký tự | Có | - | Hệ thống khởi tạo yêu cầu. |
| Hệ thống nhận | Ký tự | Có | - | Hệ thống đích tiếp nhận yêu cầu đối soát. |
| Mã dịch vụ LGSP | Ký tự | Có | - | Mã định danh dịch vụ trên trục LGSP. |
| Loại đối soát | Radio | Có | Ngày | Theo Ngày, Theo Tháng, Theo Quý. |
| Trạng thái cấu hình | Radio | Có | Hoạt động | Hoạt động / Tạm dừng. |

##### 4.2.5.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tạo mới gói tin | Nút | Mở form thiết lập cấu hình đối soát mới. |
| 2 | Lưu cấu hình | Nút | Ghi nhận các tham số vào hệ thống. |
| 3 | Kiểm tra kết nối | Nút | Thử nghiệm gọi API đến hệ thống đích. |

#### 4.2.5.4. PM02.QLTT.DS.MH03 – Chi tiết bản ghi bất thường

##### 4.2.5.4.1. Màn hình
- Màn hình:

![Chi tiết bất thường](./images/chitiet_batthuong.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 28 - Màn hình chi tiết kết quả đối soát bản ghi</p>

##### 4.2.5.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã bản ghi | Ký tự | - | - | Mã định danh hồ sơ/bản ghi. |
| Trường dữ liệu | Ký tự | - | - | Tên trường phát hiện sai lệch (VD: Ngày sinh, CMND). |
| Giá trị nguồn | Văn bản | - | - | Dữ liệu tại hệ thống cung cấp. |
| Giá trị kho DLDC | Văn bản | - | - | Dữ liệu tại Kho dùng chung. |
| Giá trị đích | Văn bản | - | - | Dữ liệu tại hệ thống thụ hưởng. |
| Loại bất thường | Nhãn | - | - | Thiếu dữ liệu, Không khớp, Lỗi định dạng... |
| Mức độ | Nhãn | - | - | Cao, Trung bình, Thấp. |
| Vị trí | Nhãn | - | - | Nguồn ↔ Thu thập, Biên tập ↔ Cung cấp. |


