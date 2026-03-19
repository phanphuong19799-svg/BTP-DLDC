# 4.5. PM05.QLDLC_Dữ liệu chủ (Master Data)

## 4.5.1. PM05.QLDLC.QL – Quản lý thực thể dữ liệu chủ

### *4.5.1.1. Mục đích*
Quản lý các thực thể dữ liệu gốc dùng chung (ví dụ: Người dân, Tổ chức, Hộ gia đình...) nhằm đảm bảo tính duy nhất, chính xác và nhất quán trên toàn hệ thống. Chức năng này cho phép định nghĩa cấu trúc, các thuộc tính, và các quy tắc (định danh, hợp nhất, quan hệ) cho mỗi thực thể dữ liệu chủ.

*+ Phân quyền*
Cán bộ quản trị báo cáo và quản trị dữ liệu master.

*+ Điều kiện thực hiện*
Phải có thẩm quyền cấu hình từ ban quản trị hệ thống mức cao.

### 4.5.1.2. PM05.QLDLC.QL.MH01 – Danh sách thực thể dữ liệu chủ

#### 4.5.1.2.1. Mục đích
Cho phép cán bộ tạo mới, định nghĩa và xem danh sách các thực thể dữ liệu chủ cùng với các thuộc tính của chúng.

*+ Phân quyền*
Cán bộ quản trị hệ thống.

*+ Điều kiện thực hiện*
Được cấp quyền tạo mới, tra cứu dữ liệu cơ bản.

#### 4.5.1.2.2. MH01 Màn hình danh sách thực thể dữ liệu chủ
##### Màn hình
- Màn hình:

![Danh sách thực thể dữ liệu chủ](./images/dulieuchu/MH01_dashboard.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên thực thể | VARCHAR2(255) | - | - | Tên của thực thể dữ liệu chủ (VD: Người dân, Doanh nghiệp). |
| Mã thực thể | VARCHAR2(50) | - | - | Mã định danh dạng code (VD: C_CITIZEN). |
| Trạng thái | NUMBER(1) | - | - | 1: Đang hoạt động, 0: Ngừng hoạt động. |
| Cơ quan quản lý | VARCHAR2(255) | - | - | Đơn vị chịu trách nhiệm chính về tính toàn vẹn của dữ liệu này. |
| Nguồn cung cấp chính | VARCHAR2(255) | - | - | Hệ thống gốc cung cấp dữ liệu (VD: HT Thông tin Dân cư). |
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
| 7 | CN07 | Button text | Mở chức năng Import định nghĩa Schema thực thể từ file JSON. |
| 8 | CN08 | Button text | Xuất danh sách thực thể ra file Excel/PDF. |

#### 4.5.1.2.3. MH01.W01.S01 – Bước 1: Khởi tạo dữ liệu chủ
##### Màn hình
- Màn hình:
![Wizard Bước 1](./images/dulieuchu/MH01_wizard_s1.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên thực thể | VARCHAR2(255) | Có | - | Nhập Tên thực thể để phân biệt. |
| Mã thực thể | VARCHAR2(50) | Có | - | Sinh tự động hoặc nhập tay (viết hoa không dấu). |
| Cơ quan quản lý | DROPDOWN | Có | - | Phân vùng đơn vị chịu trách nhiệm. |
| Mô tả/Ghi chú | VARCHAR2(1000) | Không | - | Thuyết minh thêm về thực thể dữ liệu này. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Chuyển sang bước kế tiếp (Tiếp tục). Nếu có lỗi Validation sẽ báo đỏ. |
| 2 | CN02 | Button text | Hủy bỏ toàn bộ quá trình tạo mới. |

#### 4.5.1.2.4. MH01.W01.S02 – Bước 2: Tạo thuộc tính
##### Màn hình
- Màn hình:
![Wizard Bước 2](./images/dulieuchu/MH01_wizard_s2.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Danh sách Column | CLOB | - | - | Bảng danh sách các thuộc tính (Tên, Kiểu dữ liệu, Bắt buộc, Khóa). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Chuyển sang bước kế tiếp (Tiếp tục). |
| 2 | CN02 | Button text | Quay lại bước trước để sửa thông tin. |
| 3 | CN03 | Button text | Hủy bỏ toàn bộ quá trình tạo mới. |

#### 4.5.1.2.5. MH01.W01.S03 – Bước 3: Quy tắc hợp nhất
##### Màn hình
- Màn hình:
![Wizard Bước 3](./images/dulieuchu/MH01_wizard_s3.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Danh sách Rule match | CLOB | - | - | Bảng định nghĩa các quy luật so khớp tránh trùng lặp. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Chuyển sang bước kế tiếp (Tiếp tục). |
| 2 | CN02 | Button text | Quay lại bước trước để sửa thông tin. |
| 3 | CN03 | Button text | Hủy bỏ toàn bộ quá trình tạo mới. |

#### 4.5.1.2.6. MH01.W01.S04 – Bước 4: Thiết lập quan hệ
##### Màn hình
- Màn hình:
![Wizard Bước 4](./images/dulieuchu/MH01_wizard_s4.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Liên kết ngoài | CLOB | - | - | Bảng ghi nhận liên kết khóa ngoại 1-N, N-N. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Chuyển sang bước kế tiếp (Tiếp tục). |
| 2 | CN02 | Button text | Quay lại bước trước để sửa thông tin. |
| 3 | CN03 | Button text | Hủy bỏ toàn bộ quá trình tạo mới. |

#### 4.5.1.2.7. MH01.W01.S05 – Bước 5: Phê duyệt
##### Màn hình
- Màn hình:
![Wizard Bước 5](./images/dulieuchu/MH01_wizard_s5.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Người trình duyệt | VARCHAR2(255) | Có | Tên cán bộ | Ghi chú người đang xử lý. |
| Nội dung trình | CLOB | Không | - | Giải trình lý do tạo mới cấu trúc thực thể. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Chuyển sang bước kế tiếp (Tiếp tục). Nếu có lỗi Validation sẽ báo đỏ. |
| 2 | CN02 | Button text | Quay lại bước trước để sửa thông tin. |
| 3 | CN03 | Button text | Hủy bỏ toàn bộ quá trình tạo mới. |
| 4 | CN04 | Button text | Lưu cấu hình trình phê duyệt (Chỉ khả dụng tại Bước 5). |


#### 4.5.1.2.8. MH01.P01a – Thêm mới nhanh thực thể
##### Màn hình
- Màn hình:

![Thêm nhanh thực thể](./images/dulieuchu/MH01_P01a_them_nhanh.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Chọn từ Mẫu (Template) | DROPDOWN | Không | - | Chọn mẫu có sẵn (VD: Mẫu Công dân chuẩn) để auto-fill. |
| Tên thực thể | VARCHAR2(255) | Có | - | Nhập tên thực thể mới. |
| Mã định danh | VARCHAR2(50) | Có | - | Chuỗi Code quản lý hệ thống. |
| Cơ quan quản lý | DROPDOWN | Có | - | Chọn đơn vị chủ quản dữ liệu. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Ghi nhận tạo mới thực thể khung rỗng. |
| 2 | CN02 | Button text | Hủy thao tác, đóng cửa sổ. |

#### 4.5.1.2.9. MH01.P02 – Thêm thuộc tính mới (Popup trong Tab 2)
##### Màn hình
- Màn hình:

![Thêm thuộc tính](./images/dulieuchu/MH01_P02_them_thuoctinh.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên trường (Hiển thị) | VARCHAR2(255) | Có | - | Tên nhãn hiển thị trên Form (VD: Số CCCD). |
| Mã trường vật lý | VARCHAR2(100) | Có | - | Tên vật lý của trường trong DB (VD: CITIZEN_ID). |
| Kiểu dữ liệu | DROPDOWN | Có | String | Lựa chọn String, Number, Date, Boolean, JSON. |
| Độ dài tối đa | NUMBER | Có | 255 | Kích thước cấp phát độ rộng của biến. |
| Bắt buộc nhập (Not Null) | NUMBER(1) | Không | 0 | Đánh dấu nều trường này không được phép rỗng. |
| Là Khóa chính | NUMBER(1) | Không | 0 | Đánh dấu là Master ID của bảng. |
| Giá trị mặc định | VARCHAR2(100) | Không | - | Giá trị sẽ nhận nếu không có dữ liệu truyền vào. |
| Trích xuất từ Tự điển | DROPDOWN | Không | - | Trỏ sang Danh mục hệ thống để làm Combo-box (nếu có). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Áp dụng cấu hình thuộc tính mới. |
| 2 | CN02 | Button text | Đóng popup. |

#### 4.5.1.2.10. MH01.P03 – Thêm quy tắc hợp nhất mới (Popup trong Tab 3)
##### Màn hình
- Màn hình:

![Thêm quy tắc hợp nhất](./images/dulieuchu/MH01_P03_them_quytac_hopnhat.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên quy tắc | VARCHAR2(255) | Có | - | Tên gợi nhớ (VD: Quy tắc trùng số thẻ). |
| Loại so khớp | DROPDOWN | Có | Tuyệt đối | Exact Match (Khớp 100%), Fuzzy Match, Regex pattern. |
| Thuộc tính phân tích | DROPDOWN | Có | - | Chọn 1 hoặc nhiều trường dùng để so trùng (VD: Số CCCD). |
| Ngưỡng dung sai (%) | NUMBER | Không | 90% | Điểm tệp bao nhiêu % trở lên được coi là nghi ngờ trùng lặp. |
| Trọng số áp dụng | NUMBER | Có | 1 | Độ ưu tiên nếu có nhiều rule cùng lúc (1 là cao nhất). |
| Hành động hệ thống | DROPDOWN | Có | Cảnh báo | Tự động Merge / Cảnh báo và chờ phê duyệt thủ công. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Lưu quy tắc hợp nhất. |
| 2 | CN02 | Button text | Đóng thao tác. |

#### 4.5.1.2.11. MH01.P04 – Thêm quan hệ thực thể mới (Popup trong Tab 4)
##### Màn hình
- Màn hình:

![Thêm quan hệ](./images/dulieuchu/MH01_P04_them_quanhe.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên quan hệ | VARCHAR2(255) | Có | - | Mô tả quan hệ (VD: Cá nhân - Tổ chức). |
| Thực thể Nguồn | VARCHAR2(100) | Có | - | Bảng khởi phát kết nối. |
| Thực thể Liên kết | DROPDOWN | Có | - | Chọn thực thể Master Data cần nối vào (VD: Tổ chức). |
| Trường kết nối (Sources)| DROPDOWN | Có | - | Khóa bắt nguồn (VD: ORG_ID). |
| Trường kết nối (Targets)| DROPDOWN | Có | - | Khóa tiếp nhận của thực thể đích. |
| Loại quan hệ | DROPDOWN | Có | 1-N | Biểu diễn: 1-1, 1-N, N-1. |
| Ràng buộc tương tác | DROPDOWN | Có | Restrict | Tùy chọn (Cascade/Restrict) khi hệ thống xóa dữ liệu. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Khởi tạo liên kết khóa ngoại. |
| 2 | CN02 | Button text | Đóng cửa sổ. |

#### 4.5.1.2.12. MH01.P05 – Thêm quy tắc định danh duy nhất (Popup trong Tab 5)
##### Màn hình
- Màn hình:

![Thêm quy tắc định danh](./images/dulieuchu/MH01_P05_them_quytac_dinhdanh.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã tiền tố (Prefix) | VARCHAR2(20) | Có | - | Ký hiệu định dạng tĩnh phần đầu (VD: C_). |
| Mã hậu tố (Suffix) | VARCHAR2(20) | Không | - | Ký hiệu định dạng tĩnh phần cuối. |
| Độ dài tự tăng | NUMBER | Có | 6 | Số chữ số độ rộng của phần số (VD: 6 sinh ra 000001). |
| Giá trị bắt đầu | NUMBER | Có | 1 | Seed ban đầu của dãy tịnh tiến. |
| Preview hiển thị | VARCHAR2(255) | Tự động | - | Xem trước cách mã được tạo ra (VD: C_000001). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Cập nhật định dạng quy tắc sinh mã. |
| 2 | CN02 | Button text | Hủy lưu. |

#### 4.5.1.2.13. MH01.P06 – Chi tiết phê duyệt (Popup trong Tab 6)
##### Màn hình
- Màn hình:

![Chi tiết phê duyệt](./images/dulieuchu/MH01_P06_chitiet_pheduyet.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên bản mẫu thực thể | VARCHAR2(255) | - | - | Thể hiện tiêu đề của bản kê khai cấu trúc chờ duyệt. |
| Khối lượng thay đổi | VARCHAR2(100) | - | - | Hiển thị tóm tắt: Tạo mới n thuộc tính, tạo m quy tắc. |
| Nội dung yêu cầu | VARCHAR2(1000) | - | - | Tóm tắt các thay đổi cấu trúc dữ liệu chủ từ người soạn thảo. |
| Ý kiến phê duyệt | VARCHAR2(1000) | Có | - | Ghi chú phản hồi do Quản trị viên nhập, gửi lại cho người tạo. |
| Trạng thái trình | VARCHAR2(50) | - | - | Các bước: Chờ duyệt, Đã duyệt, Yêu cầu bổ sung, Từ chối. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Phê duyệt yêu cầu thay đổi hệ thống. |
| 2 | CN02 | Button text | Trả lại / Từ chối yêu cầu kèm theo lỗi cần sửa. |
| 3 | CN03 | Button text | Đóng cửa sổ nhận xét. |


## 4.5.2. PM05.QLDLC.CD – Cập nhật & Công khai dữ liệu chủ

### *4.5.2.1. Mục đích*
Quản lý vòng đời của các bản ghi dữ liệu chủ, bao gồm việc rà soát, phê duyệt các bản ghi mới hoặc được cập nhật, xử lý trùng lặp và cấu hình việc công khai dữ liệu ra bên ngoài thông qua API.

*+ Phân quyền*
Cán bộ quản trị và khai thác dữ liệu.

*+ Điều kiện thực hiện*
Phải có thông tin dữ liệu chủ từ các nguồn truyền về hệ thống để kiểm tra và hợp nhất.

### 4.5.2.2. PM05.QLDLC.CD.MH02 – Cập nhật dữ liệu chủ

#### 4.5.2.2.1. Mục đích
Rà soát, đối chiếu và cập nhật các bản ghi dữ liệu chủ, hỗ trợ xử lý việc trùng lặp theo quy tắc hợp nhất đã cấu hình.

*+ Phân quyền*
Cán bộ quản trị và khai thác dữ liệu.

*+ Điều kiện thực hiện*
Được quyền truy cập chức năng cập nhật dữ liệu.

#### 4.5.2.2.2. MH02 Màn hình Cập nhật dữ liệu chủ
##### Màn hình
- Màn hình:

![Cập nhật dữ liệu chủ](./images/dulieuchu/MH02_dashboard.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã bản ghi Master | VARCHAR2(50) | - | - | Mã golden ID của 1 hàng dữ liệu độc lập. |
| Tên thực thể liên quan | VARCHAR2(255) | - | - | Schema gốc tương ứng (Ví dụ: Công Dân, Pháp Nhân...). |
| Nhóm dữ liệu (Nguồn)| VARCHAR2(255) | - | - | Hệ thống gửi dữ liệu lên (API / Import Excel). |
| Điểm tin cậy (Score)| NUMBER | - | - | Độ chuẩn xác của dữ liệu được đánh giá tự động. |
| Trạng thái vòng đời | VARCHAR2(50) | - | - | Nháp, Chờ Phê Duyệt, Đã Phê Duyệt, Nghi Ngờ Trùng Lặp, Khóa. |
| Ngày cập nhật cuối | DATE | - | - | Thời điểm bản ghi được sửa đổi lần gần nhất. |
| Cán bộ phụ trách | VARCHAR2(100) | - | - | Tên tài khoản thực thi đối soát. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Lọc dữ liệu theo Từ khóa, Loại thực thể, Khoảng thời gian và Tình trạng. |
| 2 | CN02 | Button icon | Mở popup xem chi tiết và giải quyết xung đột hợp nhất bản ghi (MH02.P01). |
| 3 | CN03 | Button icon | Mở form cập nhật chỉnh sửa thủ công thông tin (MH02.P02). |
| 4 | CN04 | Button icon | Mở chức năng Phê duyệt hàng loạt các dữ liệu chuẩn (Golden Record). |
| 5 | CN05 | Button icon | Flag issue (Gắn cờ lỗi dữ liệu cần xử lý ngoại lệ). |

#### 4.5.2.2.3. MH02.P01 – Chi tiết và hợp nhất bản ghi
##### Màn hình
- Màn hình:

![Chi tiết dữ liệu chủ](./images/dulieuchu/MH02_P01_chitiet.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Bản ghi gốc (Master) | CLOB | - | - | Cột lưới hiển thị dữ liệu gốc đang có trên hệ thống lưu trữ. |
| Bản ghi nghi vấn | CLOB | - | - | Cột lưới dữ liệu mới truyền tới (chỉ số trùng lặp cao). |
| Điểm số tương đồng (%) | NUMBER | - | - | Tỷ lệ Match calculation đánh giá bởi thuật toán thông minh. |
| Các trường xung đột | VARCHAR2 | - | - | Các trường giá trị Data không khớp, được Highlight bôi đỏ để cảnh báo. |
| Form tích hợp (Golden) | CLOB | - | - | Form trung tâm hiển thị Data sau khi đã hợp nhất kết quả. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button icon | (Dành riêng từng trường) Nhấp để giữ lại giá trị của Cột Dữ liệu Nguồn (Bên Trái). |
| 2 | CN02 | Button icon | (Dành riêng từng trường) Nhấp để áp dụng đè giá trị của Cột Dữ liệu Mới (Bên Phải). |
| 3 | CN03 | Button text | Xác nhận hành động hợp nhất 2 bản ghi thành 1 Golden Record duy nhất. |
| 4 | CN04 | Button text | Đánh dấu rẽ nhánh không trùng (Tách thành 2 dữ liệu hoàn toàn riêng biệt). |
| 5 | CN05 | Button text | Đóng màn hình hiển thị quay về trang chủ hợp nhất. |

#### 4.5.2.2.4. MH02.P02 – Chỉnh sửa bản ghi dữ liệu chủ
##### Màn hình
- Màn hình:

![Chỉnh sửa dữ liệu chủ](./images/dulieuchu/MH02_P02_sua.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Dữ liệu nội dung động | CLOB | Theo cấu hình | - | Giao diện tự động render Dynamic Form Input theo đúng cấu trúc Thuộc tính đã định nghĩa từ MH01 (ví dụ Textbox, Calendar). |
| Ghi chú thay đổi | VARCHAR2(1000) | Không | - | Lý do cập nhật thủ công dòng Data từ quản trị để lưu vết Audit. |
| Nhãn dán phân loại | VARCHAR2(255) | Không | - | Thẻ Tag đánh giá chuyên sâu (Review note, Fixed tag...). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Lưu cập nhật giá trị mới của bản ghi trực tiếp vào Database. |
| 2 | CN02 | Button text | Tra cứu lịch sử phiên bản trước khi Edit hành động (Phục hồi). |
| 3 | CN03 | Button text | Đóng thao tác và thoát cửa sổ chỉnh sửa. |


### 4.5.2.3. PM05.QLDLC.CD.MH03 – Công khai dữ liệu chủ

#### 4.5.2.3.1. Mục đích
Báo cáo toàn diện về tình trạng sử dụng và vòng đời của dữ liệu chủ, phục vụ cho quá trình giám sát và chia sẻ thông qua các Dịch vụ mở, API.

*+ Phân quyền*
Lãnh đạo hoặc cán bộ cấp quản lý, cơ quan liên ngành.

*+ Điều kiện thực hiện*
Hệ thống đã phát sinh dữ liệu trong kho chủ và có các Endpoint API đang ở trạng thái Online.

#### 4.5.2.3.2. MH03 Màn hình Báo cáo & Tra cứu dữ liệu chủ
##### Màn hình
- Màn hình:

![Báo cáo dữ liệu chủ](./images/dulieuchu/MH03_dashboard.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tab Tra cứu dữ liệu | - | - | - | Tìm kiếm nhanh thông qua từ khóa và xem chi tiết bảo mật bản ghi. |
| Tab Báo cáo sử dụng | - | - | - | Thống kê tần suất Server API bị gọi, lưu lượng kết nối trao đổi. |
| Tab Báo cáo vòng đời | - | - | - | Thống kê biến động Master Data tĩnh (tạo mới, cập nhật). |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Thanh Menu Tab chuyển đổi qua lại nhanh các loại báo cáo phân tích. |
| 2 | CN02 | Button icon | Mở popup xem chi tiết 1 bản gốc Master Record trên danh sách tìm kiếm (MH03.P01). |

#### 4.5.2.3.3. MH03.P01 – Chi tiết bản ghi tra cứu
##### Màn hình
- Màn hình:

![Chi tiết bản ghi](./images/dulieuchu/MH03_P01_chitiet.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Hình ảnh / Avatar | VARCHAR2 | - | - | Nếu bản ghi có thuộc cấu trúc hỗ trợ File Media, sẽ hiển thị Thumbnail định danh. |
| Trường định danh Code| VARCHAR2(100) | - | - | Chuỗi giá trị Index mã quản trị (Golden Record ID). |
| Bảng thuộc tính Map | CLOB | - | - | Toàn bộ dữ liệu Master Data tĩnh được show ra chi tiết theo dạng 2 cột Name-Value. |
| Thông tin siêu dữ liệu| VARCHAR2 | - | - | Meta info log hệ thống: Người tạo file ban đầu, Thời gian cung cấp qua API. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Đóng màn hình hiển thị trực quan thông tin chi tiết. |
| 2 | CN02 | Button icon | Sao chép URL để tạo đường dẫn chia sẻ liên kết an toàn tới hệ thống ngoài. |

#### 4.5.2.3.4. MH03.T02 – Tab Báo cáo sử dụng dữ liệu chủ
##### Màn hình
- Màn hình:

![Báo cáo sử dụng](./images/dulieuchu/MH03_tab_baocao_sudung.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Đơn vị khai thác API | VARCHAR2(255) | - | - | Tên Hệ thống / Ứng dụng thuộc các chi nhánh kết nối vào Datacenter. |
| Lượt truy xuất Calling | NUMBER | - | - | Tổng số lượng Request Response thành công trong mốc thời gian Filter định mức. |
| Lần giao dịch cuối | DATE | - | - | Phiên lấy Data gần nhất (Ping session timestamp). |
| Trạng thái kết nối | VARCHAR2(20) | - | - | Trạng thái Live của cổng chia sẻ (Online, Timeout, Đang bảo trì). |
| Biểu đồ Heatmap | CLOB | - | - | Thể hiện mức độ khai thác theo dạng hình ảnh trực quan tương ứng biểu đồ mốc cột nến. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Box filter chọn lọc dữ liệu theo bộ tham số Thời gian / Từ khóa đơn vị cụ thể. |
| 2 | CN02 | Button text | Chấp nhận xuất khối báo cáo cấu trúc gốc dưới định dạng Excel/PDF chuẩn hóa biểu đồ. |

#### 4.5.2.3.5. MH03.T03 – Tab Báo cáo vòng đời dữ liệu
##### Màn hình
- Màn hình:

![Báo cáo vòng đời](./images/dulieuchu/MH03_tab_baocao_vongdoi.png)

##### Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Chỉ mục Tốc độ tăng | NUMBER | - | - | Biểu diễn tỷ lệ phần trăm tốc độ sinh ra bản ghi mới mỗi tuần/tháng theo chu kỳ động lực (Delta %). |
| Tỷ trọng gộp thành công| NUMBER | - | - | Tỷ lệ số bản ghi đã được phát hiện trùng lặp và xác nhận Merge tự động (Automated resolvement). |
| Biểu đồ đường Link | CLOB | - | - | Thể hiện Data flow trực tuyến, mô tả sơ đồ Sink-to-Source bằng biểu đồ phân bổ sinh thái (Sankey Flow) hoặc đường Path. |

##### Chức năng trên màn hình
| STT | Mã chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CN01 | Button text | Thay đổi kỳ đánh giá báo cáo Dashboard (Lọc theo Quý, Theo Tháng, Năm). |
| 2 | CN02 | Button text | Tải trích xuất báo cáo lưu dữ liệu dạng ảnh minh hoạ chụp màn hình PNG độ phân giải cao hoặc chèn Word. |
