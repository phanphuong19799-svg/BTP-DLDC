# 4.8. PM08.DLMO_Dữ liệu mở (Open Data)

## 4.8.1. PM08.DLMO.TL – Thiết lập danh mục dữ liệu mở

### *4.8.1.1. Mục đích*
Quản lý vòng đời của các bộ dữ liệu mở, từ khâu tạo mới hồ sơ, cập nhật thông tin, cho đến khi trình lãnh đạo xem xét, phê duyệt. Chức năng này là bước đầu tiên để chuẩn bị cho việc công bố dữ liệu ra bên ngoài cổng thông tin công cộng.

*+ Phân quyền*
Cán bộ phụ trách dữ liệu / Cán bộ chuyên môn các sở ban ngành.

*+ Điều kiện thực hiện*
Được giao nhiệm vụ cung cấp và cập nhật danh mục dữ liệu mở của đơn vị.

### 4.8.1.2. PM08.DLMO.TL.MH01 – Danh sách thiết lập dữ liệu mở

#### 4.8.1.2.1. Mục đích
Tra cứu, quản lý các danh mục dữ liệu mở đang được xây dựng hoặc biên soạn bởi đơn vị, thực hiện các thao tác quản lý vòng đời hồ sơ trước khi trình.

*+ Phân quyền*
Cán bộ phụ trách dữ liệu.

*+ Điều kiện thực hiện*
Tài khoản có quyền thao tác trên module thiết lập.

#### 4.8.1.2.2. MH01 Màn hình danh sách thiết lập dữ liệu mở
##### Màn hình
- Màn hình:

![Thiết lập danh mục dữ liệu mở](./images/dulieumo/MH01_dashboard.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên danh mục | VARCHAR2(255) | - | - | Tên của bộ dữ liệu mở. |
| Lĩnh vực | VARCHAR2(100) | - | - | Phân loại chuyên mục dữ liệu (VD: Y tế, Giáo dục). |
| Đơn vị chủ quản | VARCHAR2(255) | - | - | Cơ quan chịu trách nhiệm xuất bản danh mục. |
| Người tạo | VARCHAR2(100) | - | - | Tài khoản soạn thảo hồ sơ mở. |
| Trạng thái | VARCHAR2(50) | - | - | Mới tạo, Chờ duyệt, Yêu cầu chỉnh sửa, Đã duyệt, Đã công bố. |
| Ngày cập nhật | DATE | - | - | Thời điểm lưu bản nháp cuối. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Mở popup để tạo mới một hồ sơ dữ liệu mở (MH01.P01a). |
| 2 | CN02 | Button icon | Mở popup cập nhật thông tin hồ sơ nháp (MH01.P01b). |
| 3 | CN03 | Button icon | Mở màn hình Tab Thiết lập cấu hình / Thuộc tính chờ phê duyệt (MH01.T02). |
| 4 | CN04 | Button icon | Xem lịch sử thay đổi phiên bản của bộ dữ liệu này (MH01.T03). |
| 5 | CN05 | Button icon | Mở popup xác nhận để loại bỏ, xóa hồ sơ (MH01.P02). |
| 6 | CN06 | Button icon | Mở popup xác nhận gửi phê duyệt lên cấp trên (MH01.P03). |

#### 4.8.1.2.3. MH01.T02 – Tab Phê duyệt danh mục (Trình duyệt)
##### Màn hình
- Màn hình:
![Phê duyệt dữ liệu mở](./images/dulieumo/MH01_T02_pheduyet.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Danh sách trình duyệt| CLOB | - | - | Các luồng và cá nhân/thẩm quyền sẽ xét duyệt theo quy trình cấu hình. |
| Ghi chú trình duyệt | VARCHAR2(1000)| Không | - | Lý do xin phê duyệt hồ sơ Open Data. |
| Tài liệu đính kèm | BLOB | Không | - | Văn bản quyết định mở dữ liệu của cơ quan chuyên trách (Nếu có). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Chấp nhận trình phê duyệt. |
| 2 | CN02 | Button text | Thêm tài liệu tham chiếu trình ký. |

#### 4.8.1.2.4. MH01.T03 – Tab Lịch sử thay đổi
##### Màn hình
- Màn hình:
![Lịch sử thay đổi](./images/dulieumo/MH01_T03_history.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thời gian | DATE | - | - | Cột mốc diễn ra hành động tác động tới hồ sơ. |
| Người thực hiện | VARCHAR2(255) | - | - | Tài khoản lưu vết thao tác. |
| Hành động | VARCHAR2(100) | - | - | Gửi duyệt, Hủy duyệt, Thay đổi cấu trúc, Cập nhật Data. |
| Chi tiết nội dung | VARCHAR2(1000)| - | - | Giải trình log công việc và khác biệt phiên bản. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Đóng màn hình Tab thống kê. |

#### 4.8.1.2.5. MH01.P01a – Thêm mới hồ sơ dữ liệu mở
##### Màn hình
- Màn hình:
![Thêm mới dữ liệu mở](./images/dulieumo/MH01_P01a_them.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã danh mục | VARCHAR2(50) | Có | - | Mã định danh duy nhất của bộ Data. |
| Tên danh mục | VARCHAR2(255) | Có | - | Tên hiển thị công khai trên Portal. |
| Phạm vi chia sẻ | DROPDOWN | Có | Kho dữ liệu mở | Công khai hoàn toàn, Cần đăng ký, Chỉ nội bộ. |
| Lĩnh vực | DROPDOWN | Có | - | Chọn từ hộp từ điển danh mục quy chuẩn quốc gia. |
| Tần suất cập nhật | DROPDOWN | Có | Hàng tháng | Dữ liệu Real-time, Hàng ngày, Tuần, Tháng, Quý, Năm, Tĩnh. |
| Nguồn kết nối | DROPDOWN | Có | - | Lựa chọn từ Bảng dữ liệu chủ, CSDL dùng chung hoặc kho riêng. |
| Định dạng hỗ trợ | VARCHAR2(200) | Có | JSON, CSV | Cấp quyền loại file cho phép tải về. |
| Mô tả phân tích | VARCHAR2(2000)| Không | - | Thuyết minh dữ liệu mở cho trang giới thiệu Public. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Lưu tạo mới hồ sơ khởi tạo gốc. |
| 2 | CN02 | Button text | Đóng form thiết lập, quay ra ngoài. |

#### 4.8.1.2.6. MH01.P01b – Cập nhật hồ sơ dữ liệu mở
##### Màn hình
- Màn hình:
![Sửa dữ liệu mở](./images/dulieumo/MH01_P01b_sua.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã danh mục (ID) | VARCHAR2(50) | Có | Đã có | Khóa không cho phép sửa mã định danh gốc. |
| Thông tin chung | CLOB | Có | Đã có | Toàn bộ các TextBox, Dropdown điền sẵn Data giống màn hình tạo mới. |
| Bảng Cấu hình Metadata| CLOB | Không | - | Danh sách cấu hình trường/Properties sẽ được xuất bản vào URL API nội dung. |
| Thẻ thông tin chia sẻ | VARCHAR2(500) | Không | - | Các tag chuyên đề Data (ví dụ: Địa chính, COVID, Dịch tễ). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Cập nhật hồ sơ để lưu đè thông tin mới. |
| 2 | CN02 | Button text | Hủy bỏ thay đổi của phiên bản nháp hiện hành. |

#### 4.8.1.2.7. MH01.P02 – Xác nhận xóa hồ sơ
##### Màn hình
- Màn hình:

![Xác nhận xóa hồ sơ](./images/dulieumo/MH01_P02_xoa.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Câu hỏi Cảnh báo | VARCHAR2(500) | - | - | "Bạn có chắc chắn muốn xóa hồ sơ này? Hành động này sẽ gỡ bỏ các thiết lập chưa phê duyệt của bạn." |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Xác thực quy trình gỡ bỏ hồ sơ ra khỏi máy chủ. |
| 2 | CN02 | Button text | Hủy thao tác xóa. |

#### 4.8.1.2.8. MH01.P03 – Xác nhận gửi phê duyệt
##### Màn hình
- Màn hình:

![Xác nhận gửi phê duyệt mở](./images/dulieumo/MH01_P03_submit.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thông báo chuyển luồng| VARCHAR2(500) | - | - | "Hồ sơ đã hoàn tất thiết lập chuẩn xác chưa? Nếu bạn đồng ý gửi, hệ thống sẽ tạm khóa quyền sửa đổi tới khi có kết quả duyệt." |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Chuyển tiếp hồ sơ lên cấp ban bệ lãnh đạo. |
| 2 | CN02 | Button text | Suy nghĩ lại, Hủy bỏ quy trình. |


## 4.8.2. PM08.DLMO.PD – Phê duyệt và Công bố

### *4.8.2.1. Mục đích*
Chức năng này cho phép lãnh đạo có thẩm quyền xem xét và phê duyệt các hồ sơ dữ liệu mở đã được gửi lên, sau đó kiểm soát và công bố chính thức ra cổng thông tin Data Portal chuyên biệt phục vụ đại chúng.

*+ Phân quyền*
Lãnh đạo đơn vị có thẩm quyền Quản trị Dữ liệu / Cấp Cục, Vụ.

*+ Điều kiện thực hiện*
Có trạng thái hồ sơ gửi yêu cầu Trình từ phía chuyên viên lập danh mục Open Data.

### 4.8.2.2. PM08.DLMO.PD.MH02 – Giao diện Phê duyệt

#### 4.8.2.2.1. Mục đích
Cung cấp khu vực trang trung tâm (Dashboard) dành cho Ban Lãnh đạo thẩm định cấu trúc, nội dung và các tiêu chuẩn bảo mật trước khi cho phép dữ liệu nội bộ trở thành công khai Data Mở.

*+ Phân quyền*
Người dùng có Role Quyền quản lý hoặc Phê duyệt cấp trưởng đơn vị.

*+ Điều kiện thực hiện*
Truy cập vào ứng dụng Phê Duyệt trên thanh điều hướng.

#### 4.8.2.2.2. MH02 Màn hình giao diện Phê duyệt tổng quan
##### Màn hình
- Màn hình:

![Giao diện phê duyệt dữ liệu mở](./images/dulieumo/MH02_dashboard.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Bảng hồ sơ chờ duyệt | Table | - | - | Hiển thị các hồ sơ dữ liệu mở trạng thái "Chờ phê duyệt" (Tên biểu, Lĩnh vực, Chuyên viên cấp trình, Thời điểm nhận trình). |
| Data Quality Report | CLOB | - | - | Thang điểm chuẩn xác của Dữ liệu / Cảnh báo về tỷ lệ trường thông tin nhạy cảm. |
| Preview Schema Info | CLOB | - | - | Xem định dạng Layout hoặc Json Schema cấu trúc File xuất bản. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button icon | Giải quyết từng hồ sơ (Xem thông tin đầy đủ). |
| 2 | CN02 | Button text | Duyệt nhanh hồ sơ (Hành động gán cờ `Approve`). |
| 3 | CN03 | Button text | Gọi chức năng Từ chối phê duyệt hồ sơ (Và gửi feedback qua MH02.P01). |
| 4 | CN04 | Button icon | Triển khai công bố API Data thực tế ra Portal ngoài (MH02.P02). |

#### 4.8.2.2.3. MH02.P01 – Chi tiết hồ sơ phê duyệt
##### Màn hình
- Màn hình:

![Chi tiết hồ sơ dữ liệu mở](./images/dulieumo/MH02_P01_chitiet.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thông tin chung | CLOB | - | - | Tên bộ hồ sơ, lĩnh vực, tần suất xuất bản, trạng thái duyệt. |
| Bảng Cấu hình Metadata| CLOB | - | - | Chi tiết các trường dữ liệu được cấp phép xuất bản ra ngoài. |
| Lịch sử cập nhật | CLOB | - | - | Quá trình biên soạn và trình ký của chuyên viên. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Chuyển trạng thái sang Phê Duyệt thành công. |
| 2 | CN02 | Button text | Mở form Từ chối phê duyệt (MH02.P02). |
| 3 | CN03 | Button text | Đóng màn hình chi tiết. |

#### 4.8.2.2.4. MH02.P02 – Từ chối phê duyệt
##### Màn hình
- Màn hình:

*(Hình ảnh đang được cập nhật)*

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên bộ hồ sơ trích yếu| VARCHAR2(255) | Tự động | - | (Read Only) Tên mô tả của Open Data. |
| Khung góp ý chỉnh sửa | CLOB | Có | - | Textarea nhập lý do vì sao chưa đạt chuẩn (Vướng nhạy cảm, Lộ bảo mật thông tin). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Gửi Phiếu Trả (Rollback về người dùng nhập) kèm theo Text hướng dẫn. |
| 2 | CN02 | Button text | Bỏ qua thao tác và Thoát. |

#### 4.8.2.2.5. MH02.P03 – Công bố dữ liệu mở (Publishing)
##### Màn hình danh sách
- Màn hình: *(Popup cấu hình Publish Endpoint)*

![Công bố dữ liệu mở](./images/dulieumo/MH02_P02_congbo.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Dataset Name (Tên bản)| VARCHAR2(255) | Tự động | - | Đang công bố bộ dữ liệu đã phê duyệt hợp lệ. |
| Endpoint Platform | DROPDOWN | Có | Portal Tỉnh | Nơi nhận Request Data chia sẻ. |
| Thời điểm Live | DATE | Có | Thời gian thực| Cho phép Schedule lịch chia sẻ trên Portal Public tương lai. |
| Option API/Download | RADIO | Có | Hỗ trợ 2 kiểu| Cho phép User download Offline file CSV hoặc Link cấp JSON Developer. |
| Auto-generated URL | VARCHAR2(500) | Tự động | - | Đường dẫn Link Path sẽ được tạo (VD: /api/v1/opendata/health). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Commit Phát Hành trực tiếp Open Data. |
| 2 | CN02 | Button text | Action Thu Hồi/Tạm dừng phát (Pause Integration). |
| 3 | CN03 | Button text | Đóng màn hình cấu hình. |

##### Màn hình chi tiết
- Màn hình: *(Popup Chi tiết dữ liệu mở công bố)*

![Chi tiết dữ liệu mở công bố](./images/dulieumo/MH02_P02_congbo_chitiet.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã dữ liệu | VARCHAR2(50) | - | - | Mã định danh của bộ dữ liệu đã công bố. |
| Trạng thái | VARCHAR2(50) | - | Đã công bố | Tag trạng thái hiển thị hiện tại của dữ liệu. |
| Tên dữ liệu | VARCHAR2(255) | - | - | Tên hiển thị đầy đủ của bộ dữ liệu (VD: Danh mục văn bản pháp luật). |
| Mô tả | VARCHAR2(1000) | - | - | Thuyết minh ngắn gọn nội dung và mục đích của bộ dữ liệu. |
| Lĩnh vực | VARCHAR2(100) | - | - | Nhóm chuyên ngành phân loại dữ liệu (VD: Văn bản pháp luật). |
| Đơn vị công bố | VARCHAR2(255) | - | - | Cơ quan chịu trách nhiệm cung cấp và duy trì bộ dữ liệu. |
| Ngày công bố | DATE | - | - | Thời điểm dữ liệu chính thức được public lần đầu. |
| Cập nhật mới nhất| DATE | - | - | Thời điểm bản ghi được thiết lập hoặc làm mới gần đây nhất. |
| Định dạng hỗ trợ | VARCHAR2(200) | - | JSON, XML, CSV | Các định dạng file khả dụng cho phép hệ thống bên ngoài tải về. |
| Lượt tải xuống | NUMBER | - | - | Bộ đếm tổng số lần dữ liệu này được người dùng tải về. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Tải xuống toàn bộ dữ liệu dưới cấu trúc JSON. |
| 2 | CN02 | Button text | Tải xuống định dạng XML. |
| 3 | CN03 | Button text | Tải file trích xuất Excel CSV. |
| 4 | CN04 | Button text | Đóng màn hình chi tiết, quay lại lưới danh sách. |



## 4.8.3. PM08.DLMO.BC – Báo cáo và Thống kê

### *4.8.3.1. Mục đích*
Trực quan hóa và đo lường cường độ khai thác thị trường, hiệu suất sử dụng của các kênh Dữ liệu mở, giúp Lãnh đạo đánh giá giá trị và nhu cầu thực tiễn của công chúng/doanh nghiệp đối với CSDL từ đó tái định ra các bộ open data tiếp theo.

*+ Phân quyền*
Tất cả quyền Lãnh đạo cấp ban điều phối dự án / Quản trị hệ thống.

*+ Điều kiện thực hiện*
Log Audit và Api Gateway Open Data đã vận hành và có ghi nhận kết quả lưu lượng (Requests/sec, Downloader count).

### 4.8.3.2. PM08.DLMO.BC.MH03 – Giao diện Thống kê báo cáo Open Data

#### 4.8.3.2.1. Mục đích
Giao diện trung tâm phân bổ các loại phân tích biểu đồ liên quan tới sự phát triển và chia sẻ dữ liệu phục vụ báo cáo Chính Phủ Điện Tử và Đô thị thông minh.

*+ Phân quyền*
Ban Lãnh đạo, Trung tâm IT.

*+ Điều kiện thực hiện*
Truy cập qua Module Report Data.

#### 4.8.3.2.2. MH03 Màn hình Dashboard Báo cáo chính
##### Màn hình
- Màn hình:
![Thống kê dữ liệu mở](./images/dulieumo/MH03_dashboard.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Chỉ mục tĩnh (Card) | NUMERIC | - | - | Hiển thị: Tổng số Danh mục, Tổng lượt API Consume. |
| Trend (Hot List) | CLOB | - | - | Bảng danh mục top Dataset đang được người dân tải/dùng nhiều nhất. |
| Switch Tab Controller | - | - | - | Thanh nút chuyển qua các góc nhìn sâu sắc nghiệp vụ (T01, T02, T03). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Nav Tab | Chuyển View xem Thống kê mức tăng trưởng nguồn dữ liệu tải lên (T01). |
| 2 | CN02 | Nav Tab | Chuyển cấu hình báo cáo phân loại theo Sở ngành Cung Cấp (T02). |
| 3 | CN03 | Nav Tab | Chuyển xem Traffic Tracking thời gian thực (T03). |
| 4 | CN04 | Button text | Print nguyên trang Dashboard Overview ra PDF / HTML. |

#### 4.8.3.2.3. MH03.T01 – Tab Báo cáo tăng trưởng
##### Màn hình
- Màn hình:
![Báo cáo thống kê](./images/dulieumo/MH03_T01_stat.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Line Chart Tăng Trưởng | CLOB | - | - | Đồ thị đường Line mô tả sự bổ sung dữ liệu mới mỗi tháng (Tính lũy kế Data size). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Custom Filter | Lọc khoảng thời gian (Từ lúc khởi tạo Hệ thống .. đến Nay). |
| 2 | CN02 | Tải Data Raw | Export các mốc Data Raw Line Chart thành định dạng CSV (phục vụ PowerBI). |

#### 4.8.3.2.4. MH03.T02 – Tab Báo cáo phân loại đơn vị
##### Màn hình
- Màn hình:
![Báo cáo phân loại](./images/dulieumo/MH03_T02_classify.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Đồ thị phân mảnh (Pie)| CLOB | - | - | Chia phần bánh Tỷ trọng Lĩnh vực Data (Y tế, Kinh tế, Văn hóa). |
| Đồ thị ngang (Bar) | CLOB | - | - | Bảng xếp hạng nỗ lực của các Đơn Vị đóng góp Open Data. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Lọc hạng mục | Có quyền tra Top 10 hoặc đánh trọng số ngành. |
| 2 | CN02 | Tải hình ảnh | Tải ảnh Pie/Bar chất lượng cao dùng trong file Thuyết minh/Báo cáo tháng. |

#### 4.8.3.2.5. MH03.T03 – Tab Thống kê lượt truy cập
##### Màn hình
- Màn hình:
![Thống kê lượt truy cập](./images/dulieumo/MH03_T03_traffic.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Biểu đồ truy cập kép | CLOB | - | - | So sánh tương quan Hits (Lượt xem) v.s Downloads (Lượt xuất file thực tế) theo Ngày/Giờ. |
| Log Table Clients | CLOB | - | - | Lưới danh sách IP truy vấn và thông số User Agent / Vùng địa chỉ chọc vào Request Gateway. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Focus View | Filter sâu chỉ lọc duy nhất 1 Bộ Open Data nổi bật thay vì xem theo Tổng Đài. |
| 2 | CN02 | Trích Audit Log| Sao lưu nhật ký API Hit-rate làm bằng chứng thanh tra (Compliance Auditing). |
