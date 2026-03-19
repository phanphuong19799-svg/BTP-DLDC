# 4.4. PM04.QLXL_Quản lý xử lý dữ liệu

## 4.4.1. PM04.QLXL.DB – Dashboard xử lý dữ liệu

### *4.4.1.1. Mục đích*
Cung cấp một bảng điều khiển trung tâm để theo dõi trạng thái, tiến độ và kết quả của các tiến trình làm sạch, chuẩn hóa và biến đổi dữ liệu. Dashboard giúp người quản trị có cái nhìn trực quan, tổng thể về hiệu năng của các quy tắc xử lý tự động và chất lượng dữ liệu Master Data sau khi luồng xử lý hoàn tất.

*+ Phân quyền*
Tài khoản có vai trò Quản trị viên hệ thống / Trưởng ban điều hành Dữ liệu.

*+ Điều kiện thực hiện*
Tiêu thụ dữ liệu từ kho Log xử lý Pipeline ETL nội bộ để trực quan hóa.

### 4.4.1.2. PM04.QLXL.DB.MH01 – Dashboard xử lý

#### 4.4.1.2.1. Mục đích
Giao diện hiển thị các chỉ số cốt lõi và biểu đồ tracking, hỗ trợ Lãnh đạo nắm bắt kịp thời các "điểm nghẽn" (bottlenecks) khi hệ thống dọn dẹp hàng triệu bản ghi thô.

*+ Phân quyền*
Ban Lãnh đạo / Trung tâm vận hành phân tích dữ liệu.

*+ Điều kiện thực hiện*
Chức năng được truy cập qua thanh menu phân hệ Xử lý.

#### 4.4.1.2.2. MH01 Màn hình Dashboard xử lý
##### Màn hình
- Màn hình:

![Dashboard Xử lý](./images/xuly/MH01_dashboard.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 1 - Giao diện tổng quan xử lý dữ liệu</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Giai đoạn 1: Làm sạch | NUMBER | - | - | Thống kê số lượng/bản ghi rác (Null, Duplicates) đã được bộ làm sạch xử lý tự động. |
| Giai đoạn 2: Chuẩn hóa | NUMBER | - | - | Tổng số bản ghi đã được ép kiểu định dạng (Format Parsing) về chuẩn duy nhất. |
| Giai đoạn 3: Biến đổi | NUMBER | - | - | Thống kê số lượng record đã được Data Transformation biến đổi thành phần tử có ý nghĩa. |
| Quy tắc trong ngành | NUMBER | - | - | Thẻ Card chỉ báo số lượng rule đang active áp dụng cho nhóm CSDL Core nội sinh. |
| Quy tắc ngoài ngành | NUMBER | - | - | Các rule xử lý đối chiếu chéo với hệ thống của Bộ/Ban/Ngành cấp trên (API ngoài). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Icon | Điều hướng nhanh đến phân hệ thiết lập quy tắc chuyên sâu (MH02). |
| 2 | CN02 | Date Picker| Widget Calendar lọc toàn bộ dữ liệu trên dashboard theo thời gian tùy chọn. |

## 4.4.2. PM04.QLXL.QT – Thiết lập & Quản lý quy tắc

### *4.4.2.1. Mục đích*
Hạt nhân của quy trình MDM: Cho phép chuyên gia xử lý cấu hình chi tiết, kết nối chuỗi các quy tắc xử lý (Làm sạch cơ học, Chuẩn hóa Pattern, Biến đổi Dictionary) cho từng nguồn dữ liệu. Qua đây, admin khai hỏa tiến trình Batch Processing và rà soát lỗi cấu hình.

*+ Phân quyền*
Tài khoản Quản trị Data / Kỹ sư dữ liệu (Data Engineer).

*+ Điều kiện thực hiện*
CSDL Dữ liệu thô (Staging) đã có dữ liệu để chạy thử thuật toán.

### 4.4.2.2. PM04.QLXL.QT.MH02 – Danh sách cấu hình xử lý

#### 4.4.2.2.1. Mục đích
Giao diện quản lý danh sách các "Luồng Xử Lý" (Data Pipelines), nơi người dùng bật/tắt, khởi động, hoặc kiểm tra tỷ lệ hoành thành của từng luồng.

*+ Phân quyền*
Cán bộ kỹ thuật hệ thống.

*+ Điều kiện thực hiện*
Hệ thống cho phép truy vấn thẳng vào danh sách Pipeline Jobs.

#### 4.4.2.2.2. MH02 Màn hình Danh sách cấu hình xử lý
##### Màn hình
- Màn hình:

![Danh sách cấu hình](./images/xuly/MH02_danhsach.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 2 - Bảng hiển thị danh sách các cấu hình quy tắc xử lý dữ liệu</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên luồng dữ liệu | VARCHAR2(255) | - | - | Tên gợi nhớ tiến trình định kỳ (VD: Chuẩn hóa Hộ Tịch tháng 4). |
| Nguồn dữ liệu | VARCHAR2(255) | - | - | Tên CSDL gốc hoặc Dataset thô đầu vào. |
| Người cấu hình | VARCHAR2(255) | - | - | Account tạo nên bản ghi luồng xử lý. |
| Trạng thái | VARCHAR2(50) | - | - | Tag màu (Chạy ngầm, Hoàn thành, Chờ xử lý, Lỗi System). |
| Tiến độ (Progress) | NUMBER(3,2) | - | - | Thanh Bar hiển thị tỷ lệ % số bản ghi đi qua luồng ETL. |
| Tổng bản ghi (In) | NUMBER | - | - | Đầu vào nguyên liệu thô trước xử lý. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Mở màn hình tạo luồng xử lý Pipeline mới hoàn toàn (MH02.P05). |
| 2 | CN02 | Button text | Mở form quản lý & chêm các Rule quy tắc xử lý chi tiết (MH02.P01). |
| 3 | CN03 | Button text | Bật cấu hình phân loại lớp dữ liệu và dãn nhãn bảo mật kho (MH02.P02). |
| 4 | CN04 | Button icon | Button Execute kích hoạt tiến trình chuẩn hóa Batch (Chạy tay). |
| 5 | CN05 | Button icon | Lập lịch chạy tự động định kỳ Cron Job (MH02.P07). |
| 6 | CN06 | Button icon | Mở danh sách tra cứu các bản ghi gặp lỗi Format trong quá trình chạy (MH02.P03). |
| 7 | CN07 | Button icon | Mở lưới Lịch sử log ghi nhận cho các phiên chạy trước đó (MH02.P04). |
| 8 | CN08 | Button icon | Mở popup Xác nhận xóa cấu hình luồng xử lý (MH02.P06). |

#### 4.4.2.2.3. MH02.P01 – Quản lý Quy tắc Xử lý (Popup)
##### Màn hình
- Màn hình:

![Quản lý quy tắc](./images/xuly/MH02_P01_quytac.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 3 - Màn hình quản lý các quy tắc làm sạch, chuẩn hóa, biến đổi</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Chọn trường (Column)| VARCHAR2(255) | Có | - | Chọn cột Data thực tế của bảng cần áp dụng dao mổ (VD: Col CCCD). |
| Trạng thái Rule | DROPDOWN | Có | Đang tắt | Switch Bật/Tắt hiệu lực của luật thuật toán này lên chuỗi xử lý. |
| Format Matching | VARCHAR2(500) | Không | - | Regex hoặc Template ép kiểu dịnh dạng (VD: YYYY-MM-DD). |
| Rule Giá trị rỗng | DROPDOWN | Không | Bỏ qua | Hành vi rẽ nhánh khi gặp Null data (Ignore, Default Imputation, Error Throw). |
| Rule Trùng lặp | DROPDOWN | Không | Cảnh báo | Xử lý Duplicate: Gộp trường bản ghi (Merge), Giữ bản Record mới cực/Cũ nhất, Xóa, Cảnh báo. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Commit và Lưu toàn vẹn cấu hình bộ quy tắc gắn với nguồn. |
| 2 | CN02 | Button text | Hủy bỏ cấu hình, đóng cửa sổ lệnh. |

#### 4.4.2.2.4. MH02.P02 – Phân loại và Bảo mật dữ liệu (Popup)
##### Màn hình
- Màn hình:

![Bảo mật dữ liệu](./images/xuly/MH02_P02_baomat.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 4 - Cửa sổ phân loại và cấu hình bảo mật dữ liệu</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mức độ tiếp cận | DROPDOWN | Có | Công khai | Phân loại quyền truy cập dữ liệu ra ngoài: Công khai tự do, Hạn chế quyền hạn CQNN, Giao dịch nội bộ. |
| Cấp độ Nhạy cảm | DROPDOWN | Có | Thấp | Phân loại mức ảnh hưởng rò rỉ: Thấp, Trung Bình, Cao, Rất Cao (Ảnh hưởng an ninh). |
| Phương pháp Mã hóa | DROPDOWN | Không | Masking 50%| (Nâng cao) Tùy chọn làm mờ CCCD/SDT ở màn Preview. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Nhãn gán phân loại lên cấp độ bảng Data. |
| 2 | CN02 | Button text | Đóng màn hình Popup. |

#### 4.4.2.2.5. MH02.P03 – Danh sách Bản ghi Lỗi (Popup)
##### Màn hình
- Màn hình:

![Bản ghi lỗi](./images/xuly/MH02_P03_loi.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 5 - Màn hình danh sách bản ghi lỗi Data Quality</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| ID Phiên chạy | VARCHAR2(50) | - | - | Tra cứu lại lô Job đã sinh ra lỗi. |
| Mã bản ghi (ID) | VARCHAR2(50) | - | - | Khóa chính của dòng Record bị đẩy văng do không lọt qua màng lọc Validator. |
| Tên cột lỗi | VARCHAR2(50) | - | - | Trường cụ thể trực diện bị phát hiện lỗi (VD: Cột Ngày Sinh quá dải năm). |
| Raw Value | VARCHAR2(1000) | - | - | Giá trị nguyên thủy lấy từ Staging thô ban sơ. |
| Typology Lỗi | VARCHAR2(100) | - | - | Phân tách loại mã lỗi (Thiếu Required, Cấu trúc cú pháp sai, Không khớp Master List ID). |
| Resolution (Gợi ý) | VARCHAR2(1000) | - | - | Đề xuất giải pháp (Force update hoặc Ignore) được mô hình Gen tự động gợi ý. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Đánh dấu yêu cầu Override sửa đổi cưỡng bức hoặc Rollback hệ thống nguồn. |
| 2 | CN02 | Button icon | Trích xuất báo cáo rác (Error Export) dưới dạng tệp Excel Offline để đối tra với bên cung cấp. |
| 3 | CN03 | Button text | Đóng và Thoát hộp theo dõi lỗi. |

#### 4.4.2.2.6. MH02.P04 – Lịch sử Xử lý dữ liệu (Popup)
##### Màn hình
- Màn hình:

![Lịch sử xử lý](./images/xuly/MH02_P04_lichsu.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 6 - Giao diện Activity Log các phiên ETL chạy tay và chạy tự động định kỳ</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thời điểm khởi chạy| DATE | - | - | Timestamp đánh dấu mốc thời gian Job Queue nhận lệnh (Lệnh tay / Cronjob scheduler). |
| Profile Quy tắc | VARCHAR2(500) | - | - | Cụm danh xưng nhóm các Filter Rule được nhúng trong đợt quét xử lý xử lý. |
| Thống kê Volume | VARCHAR2(255) | - | - | Bảng Cân đối Output (Ví dụ: Dữ liệu thô tải vào 10.000 dòng, Xử lý thành công 9.050, Xóa trùng lập 400, Bị văng lỗi 550). |
| Tình trạng Job | VARCHAR2(50) | - | - | Nhãn Label màu bắt mắt hiển thị Tiến trình: Khởi tạo (Pending), Running, Success, Partially Failed. |
| Executor | VARCHAR2(100) | - | - | Nguồn ra lệnh vận hành hệ thống chạy (Scheduled Bot tự động hoặc Admin Account A đích thân bấm chạy). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Xem Deep Details Log truy vết kỹ thuật từng dòng Process Thread (Dành riêng cho SysAdmin). |
| 2 | CN02 | Button text | Gấp cửa sổ hiển thị lịch sử Log hệ thống. |

#### 4.4.2.2.7. MH02.P05 – Thêm mới/Chỉnh sửa cấu hình xử lý (Popup)
##### Màn hình
- Màn hình:

![Thêm mới](./images/xuly/MH02_P05_themmoi.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 7 - Giao diện khai báo và cấu hình luồng xử lý dữ liệu mới</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên luồng dữ liệu | VARCHAR2(255) | Có | - | Nhập tên định danh hiển thị của Job xử lý mới. |
| Chọn nguồn dữ liệu | DROPDOWN | Có | - | Truy vấn các CSDL, Bảng, hoặc Dataset Thô vừa được thu thập. |
| Người chịu trách nhiệm| VARCHAR2(255) | Tự động | Tài khoản hiện tại | Gắn ID của chuyên viên thực hiện thiết lập luồng làm sạch này. |
| Ghi chú / Diễn giải | CLOB | Không | - | Ghi chú tóm tắt nội dung quy tắc. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Lưu cấu hình, tạo mới Profile Job thành công trên danh sách. |
| 2 | CN02 | Button text | Hủy thao tác và quay về lưới quản lý. |

#### 4.4.2.2.8. MH02.P06 – Xác nhận xóa luồng xử lý (Popup)
##### Màn hình
- Màn hình:

![Xác nhận xóa](./images/xuly/MH02_P06_xoa.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 8 - Hộp thoại xác nhận yêu cầu xóa bỏ cấu hình quy tắc nguy hiểm</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thông điệp cảnh báo | VARCHAR2(2000) | Tự động | - | Yêu cầu xác nhận xóa: "Bạn có chắc chắn muốn gỡ luồng xử lý này? Thao tác này sẽ xóa mọi Rules bên trong." |
| Tên luồng xác nhận | VARCHAR2(255) | - | - | (Read Only) Hiển thị tên luồng đang chuẩn bị bị xóa. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Chấp nhận Soft-Delete luồng (Chuyển trạng thái sang Đã Xóa). |
| 2 | CN02 | Button text | Hủy bỏ, trở về an toàn. |

#### 4.4.2.2.9. MH02.P07 – Lập lịch chạy tự động Scheduler (Popup)
##### Màn hình
- Màn hình:

![Lập lịch](./images/xuly/MH02_P07_laplich.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình 9 - Giao diện thiết lập thời gian chạy Cron Job tự động cho luồng xử lý</p>

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tần suất chạy | DROPDOWN | Có | Hàng ngày | Chọn chu kỳ: Hàng giờ, Hàng ngày, Hàng tuần, Hàng tháng, Hoặc một lần. |
| Khung giờ bắt đầu | TIME | Có | 00:00 | Giờ và Phút bắt đầu kích hoạt máy chủ chạy Script xử lý. |
| Ngày bắt đầu hiệu lực | DATE | Có | Hôm nay | Ngày bắt đầu áp dụng chu kỳ tự động. |
| Ngày kết thúc | DATE | Không | - | Sau ngày này luồng sẽ không chạy ngầm nữa. |
| Cấu hình Cron nâng cao| VARCHAR2(100) | Không | - | Cho phép SysAdmin gõ Cron Expression (VD: 0 0 * * *). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Áp dụng cấu hình và đẩy Scheduler vào hàng đợi Hệ thống. |
| 2 | CN02 | Button text | Tạm dừng lập lịch hiện tại (Pause). |
| 3 | CN03 | Button text | Đóng màn hình hiển thị. |
