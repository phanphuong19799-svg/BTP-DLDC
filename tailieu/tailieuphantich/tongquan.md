# 4.1. PM01.TQ - TỔNG QUAN (DASHBOARD)

## 4.1.1. PM01.TQ.DB – Dashboard tổng quan

### *4.1.1.1. Mục đích*
Cung cấp một cái nhìn toàn cảnh, tập trung về hiệu năng và tình trạng hoạt động của toàn bộ hệ thống Kho DLDC. Màn hình này giúp lãnh đạo và cán bộ quản trị nhanh chóng nắm bắt các chỉ số KPI quan trọng, theo dõi xu hướng và phát hiện các vấn đề cần chú ý thông qua các biểu đồ trực quan.

### 4.1.1.2. PM01.TQ.DB.MH01 – Màn hình Tổng quan hệ thống

#### 4.1.1.2.1. MH01 Màn hình Tổng quan hệ thống
##### Màn hình
- Màn hình:

![Dashboard Tổng quan](./images/tongquan/dashboard_tongquan.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 1 - Màn hình Dashboard Tổng quan hệ thống</p>

##### Mô tả thông tin trên màn hình

**A. Nhóm chỉ số chính (KPI Cards)**
Hiển thị các con số quan trọng nhất của hệ thống. Người dùng có thể nhấn vào từng thẻ để xem chi tiết.
| Chỉ số | Mô tả | Chi tiết hiển thị |
| :--- | :--- | :--- |
| **Thu thập** | Tổng số bản ghi đã được thu về kho. | Số lượng bản ghi tăng thêm trong tháng. |
| **Xử lý** | Số lượng bản ghi đã qua quy trình làm sạch/chuẩn hóa. | Tỷ lệ hoàn thành xử lý (%). |
| **Chia sẻ** | Tổng lượt truy xuất và cung cấp dữ liệu. | Số lượt phát sinh trong tuần. |

**B. Hệ thống biểu đồ thống kê**
| Tên biểu đồ | Loại | Mô tả |
| :--- | :--- | :--- |
| **Xu hướng Thu thập** | Line Chart | Theo dõi lượng dữ liệu thu thập trong 7 ngày gần nhất. |
| **Quy trình Xử lý** | Bar Chart | Thống kê số lượng theo giai đoạn: Làm sạch -> Chuẩn hóa -> Biến đổi. |
| **Phương thức Chia sẻ** | Pie Chart | Tỷ lệ chia sẻ qua: API, Export file, Đồng bộ hệ thống. |
| **Top 5 Dịch vụ** | Mixed Bar | 5 dịch vụ có lượt chia sẻ cao nhất (Phân loại Trong/Ngoài ngành). |
| **Xu hướng Dữ liệu chủ**| Area Chart | Biểu đồ tăng trưởng của kho dữ liệu gốc trong 6 tháng. |
| **Danh mục dùng chung** | Horiz. Bar | Thống kê số lượng danh mục (Giới tính, Dân tộc, Đơn vị hành chính...). |
| **Dữ liệu mở** | Stacked Bar | Tỷ lệ dữ liệu đã công bố và đang chờ phê duyệt theo lĩnh vực. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Click | Nhấn vào một thẻ KPI để mở popup chi tiết (MH01.P01). |
| 2 | CN02 | Hover | Di chuột qua các cột/phần của biểu đồ để xem số liệu chi tiết. |
| 3 | CN03 | Dropdown | Lọc dữ liệu trên toàn bộ dashboard theo khoảng thời gian (7 ngày, 30 ngày...). |

#### 4.1.1.2.2. MH01.P01 – Chi tiết chỉ số Thu thập (Popup)
##### Màn hình
- Màn hình chi tiết các nguồn dữ liệu đã thu thập:

![Chi tiết Thu thập](./images/tongquan/popup_tongbanghi.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 2 - Màn hình Popup chi tiết các chỉ số Thu thập</p>

##### Mô tả thông tin trên màn hình
Hiển thị khi người dùng nhấn vào thẻ **Thu thập** ở màn hình Tổng quan.

**A. Các thẻ tổng hợp (Summary Cards)**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| **Tổng nguồn** | NUMBER | V | Hiển thị số lượng các hệ thống/đơn vị đang kết nối thu thập dữ liệu (Ví dụ: 10). |
| **Tổng đồng bộ** | NUMBER | V | Tổng số lượng bản ghi đã được tải về kho dữ liệu (Ví dụ: 4,432,981). |
| **Thành công** | NUMBER | V | Số lượng nguồn dữ liệu đang hoạt động ổn định (Ví dụ: 8). |
| **Cảnh báo/Lỗi** | NUMBER | V | Số lượng nguồn dữ liệu đang gặp sự cố kết nối hoặc đồng bộ (Ví dụ: 2). |

**B. Bảng danh sách chi tiết**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| **STT** | NUMBER | V | Số thứ tự dòng. |
| **Tên dữ liệu** | VARCHAR2(255) | V | Tên CSDL hoặc Danh mục được thu thập. |
| **Nguồn** | VARCHAR2(255) | V | Tên hệ thống hoặc đơn vị cung cấp dữ liệu. |
| **Số lượng đồng bộ** | NUMBER | V | Số lượng bản ghi thực tế thu thập từ nguồn cụ thể. |
| **Lần đồng bộ cuối** | DATE | V | Thời điểm gần nhất hệ thống thực hiện tác vụ thu thập. |
| **Trạng thái** | VARCHAR2(50) | V | Trạng thái đồng bộ (`Thành công`, `Cảnh báo`, `Lỗi`). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button | Nút **Đóng** để thoát màn hình chi tiết. |

#### 4.1.1.2.3. MH01.P02 – Chi tiết chỉ số Xử lý (Popup)
##### Màn hình
- Màn hình chi tiết tiến độ xử lý dữ liệu:

![Chi tiết Xử lý](./images/tongquan/popup_banghixuly.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 3 - Màn hình Popup chi tiết các chỉ số Xử lý</p>

##### Mô tả thông tin trên màn hình
Hiển thị khi người dùng nhấn vào thẻ **Xử lý** ở màn hình Tổng quan.

**A. Các thẻ tổng hợp (Summary Cards)**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| **Tổng nguồn** | NUMBER | V | Số lượng các luồng dữ liệu đang thực hiện quy trình xử lý (Ví dụ: 8). |
| **Tổng xử lý** | NUMBER | V | Tổng số bản ghi đã đi qua các bước làm sạch và chuẩn hóa (Ví dụ: 4,063,178). |
| **Thành công** | NUMBER | V | Số lượng luồng xử lý hoàn tất không có lỗi quy tắc (Ví dụ: 7). |
| **Cảnh báo/Lỗi** | NUMBER | V | Số lượng luồng đang gặp lỗi dữ liệu hoặc quy tắc (Ví dụ: 1). |

**B. Bảng danh sách chi tiết**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| **STT** | NUMBER | V | Số thứ tự dòng. |
| **Tên dữ liệu** | VARCHAR2(255) | V | Tên tập dữ liệu đang được xử lý. |
| **Nguồn** | VARCHAR2(255) | V | Quy trình hoặc đơn vị chịu trách nhiệm xử lý. |
| **Số lượng xử lý** | NUMBER | V | Số lượng bản ghi đã được chuẩn hóa thành công. |
| **Lần xử lý cuối** | DATE | V | Thời điểm cập nhật trạng thái xử lý gần nhất. |
| **Trạng thái** | VARCHAR2(50) | V | Tiến độ (`Thành công`, `Đang xử lý`, `Lỗi quy tắc`). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button | Nút **Đóng** để thoát màn hình chi tiết. |

#### 4.1.1.2.4. MH01.P03 – Chi tiết chỉ số Chia sẻ (Popup)
##### Màn hình
- Màn hình chi tiết các lượt truy xuất và cung cấp dữ liệu:

![Chi tiết Chia sẻ](./images/tongquan/popup_luotchiase.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 4 - Màn hình Popup chi tiết lượt Chia sẻ dữ liệu</p>

##### Mô tả thông tin trên màn hình
Hiển thị khi người dùng nhấn vào thẻ **Chia sẻ** ở màn hình Tổng quan.

**A. Các thẻ tổng hợp (Summary Cards)**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| **Tổng nguồn** | NUMBER | V | Số lượng các dịch vụ API hoặc tệp tin đang được chia sẻ (Ví dụ: 7). |
| **Tổng lượt chia sẻ**| NUMBER | V | Tổng số yêu cầu truy xuất dữ liệu thành công từ các đơn vị (Ví dụ: 156,892). |
| **Thành công** | NUMBER | V | Số lượng dịch vụ đang hoạt động sẵn sàng (Ví dụ: 7). |
| **Cảnh báo/Lỗi** | NUMBER | V | Số lượng dịch vụ đang tạm dừng hoặc gặp lỗi kết nối (Ví dụ: 0). |

**B. Bảng danh sách chi tiết**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| **STT** | NUMBER | V | Số thứ tự dòng. |
| **Tên dịch vụ** | VARCHAR2(255) | V | Tên API hoặc dịch vụ chia sẻ dữ liệu. |
| **Đối tượng** | VARCHAR2(255) | V | Tên đơn vị hoặc hệ thống bên ngoài khai thác dữ liệu. |
| **Số lượt chia sẻ** | NUMBER | V | Tổng số yêu cầu phát sinh từ dịch vụ/đối tượng đó. |
| **Lần truy cập cuối**| DATE | V | Thời điểm phát sinh lượt truy xuất gần nhất. |
| **Trạng thái** | VARCHAR2(50) | V | Trạng thái dịch vụ (`Hoạt động`, `Tạm dừng`). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button | Nút **Đóng** để thoát màn hình chi tiết. |

