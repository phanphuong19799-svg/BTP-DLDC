# 4.5. PM05.QLDLC_Dữ liệu chủ (Master Data)

## 4.5.1. Mục đích
Quản lý các thực thể dữ liệu gốc dùng chung (Người dân, Tổ chức, Hộ gia đình...) đảm bảo tính duy nhất và chính xác trên toàn hệ thống.

## 4.5.2. PM05.QLDLC.MH01 – Quản lý thực thể dữ liệu chủ

### 4.5.2.1. Popup Quản lý thuộc tính (Attribute Management)
*(Giao diện tham chiếu: [AttributeManagementModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/masterdata/AttributeManagementModal.tsx))*

#### 4.5.2.1.1. Màn hình
- Màn hình:

![Popup Quản lý thuộc tính](./images/quanlythuoc_tinh.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình quản lý thuộc tính dữ liệu chủ</p>

#### 4.5.2.1.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên thuộc tính | Văn bản | Có | - | Tên hiển thị của trường thông tin (VD: CCCD, Họ tên). |
| Mã thuộc tính | Văn bản | Có | - | Mã định danh duy nhất của trường (viết hoa, không dấu). |
| Kiểu dữ liệu | Danh sách | Có | String | String, Integer, Date, Boolean, v.v. |
| Độ dài | Số | Không | - | Giới hạn ký tự tối đa. |
| Bắt buộc | Checkbox | Không | Trống | Đánh dấu nếu trường không được để trống. |

#### 4.5.2.1.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu thuộc tính | Nút | Thêm mới hoặc cập nhật thuộc tính. |
| 2 | Đóng | Nút | Đóng Popup. |

### 4.5.2.2. PM04.QLDLC.MH02 – Quy tắc định danh duy nhất (Popup)
*(Giao diện tham chiếu: [IdentifierRuleModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/masterdata/IdentifierRuleModal.tsx))*

#### 4.5.2.2.1. Màn hình
- Màn hình:

![Quy tắc định danh duy nhất](./images/quytacdinhdanh.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình thiết lập quy tắc định danh duy nhất</p>

#### 4.5.2.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiền tố (Prefix) | Văn bản | Có | - | Ký tự đứng đầu mã (VD: MD_, PERSON_). |
| Định dạng mã | Danh sách | Có | - | Các biến {PREFIX}, {YEAR}, {MONTH}, {SEQUENCE}. |
| Số bắt đầu | Số | Có | 1 | Giá trị khởi tạo cho bộ đếm. |
| Độ dài số thứ tự | Số | Có | 6 | Số chữ số của phần tự tăng. |
| Tự động tăng | Checkbox | Không | Có | Hệ thống tự tăng mã khi tạo mới bản ghi. |

#### 4.5.2.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu quy tắc | Nút | Ghi nhận cấu hình. |

### 4.5.2.3. PM04.QLDLC.MH03 – Quy tắc hợp nhất dữ liệu (Popup)
*(Giao diện tham chiếu: [MergeRuleModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/masterdata/MergeRuleModal.tsx))*

#### 4.5.2.3.1. Màn hình
- Màn hình:

![Quy tắc hợp nhất dữ liệu](./images/quytachopnhat.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình thiết lập quy tắc hợp nhất dữ liệu</p>

#### 4.5.2.3.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Chiến lược | Chọn 1 | Có | Mới nhất | Mới nhất, Độ ưu tiên, Dài nhất, Thủ công. |
| Trường dữ liệu | Danh sách | Có | - | CCCD, Họ tên, Ngày sinh, Địa chỉ... |
| Độ ưu tiên | Số | Có | 1 | 1 là cao nhất. |
| Trọng số (%) | Số | Có | 100 | Tỷ lệ tin cậy của nguồn dữ liệu (0-100). |

#### 4.5.2.3.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu quy tắc | Nút | Cập nhật cấu hình hợp nhất. |

### 4.5.2.4. PM04.QLDLC.MH04 – Thiết lập quan hệ thực thể (Popup)
*(Giao diện tham chiếu: [RelationshipModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/masterdata/RelationshipModal.tsx))*

#### 4.5.2.4.1. Màn hình
- Màn hình:

![Thiết lập quan hệ thực thể](./images/thietlapquanhe.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình thiết lập quan hệ thực thể</p>

#### 4.5.2.4.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thực thể nguồn | Danh sách | Có | - | Chọn bảng dữ liệu gốc. |
| Thực thể đích | Danh sách | Có | - | Chọn bảng dữ liệu liên kết. |
| Loại quan hệ | Chọn 1 | Có | 1:n | Một - Một (1:1), Một - Nhiều (1:n), Nhiều - Nhiều (n:n). |
| Khóa ngoại | Văn bản | Không | - | Tên trường liên kết (áp dụng cho 1:1, 1:n). |
| Bảng trung gian | Văn bản | Không | - | Tên bảng liên kết (áp dụng cho n:n). |

#### 4.5.2.4.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu quan hệ | Nút | Ghi nhận cấu hình quan hệ. |

### 4.5.2.5. PM04.QLDLC.MH05 – Cập nhật dữ liệu chủ (Popup)
*(Giao diện tham chiếu: [UpdateMasterDataModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/masterdata/UpdateMasterDataModal.tsx))*

#### 4.5.2.5.1. Màn hình
- Màn hình:

![Cập nhật dữ liệu chủ](./images/capnhatdulieuchu.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình quy trình cập nhật dữ liệu chủ</p>

#### 4.5.2.5.2. Mô tả thông tin trên màn hình
Màn hình quy trình cập nhật và phê duyệt các bản ghi dữ liệu chủ sau khi thu thập/xử lý.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Danh sách bản ghi | Bảng | - | - | Hiển thị tổng quan các bản ghi cần rà soát. |
| Phát hiện trùng lặp | Bảng | - | - | Cảnh báo các bản ghi có CCCD/Họ tên trùng nhau để hợp nhất. |
| Rà soát thay đổi | Bảng | - | - | So sánh giá trị cũ và giá trị mới (Highlight màu đỏ/xanh). |

#### 4.5.2.5.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Phê duyệt | Nút | Xác nhận cập nhật bản ghi vào kho Dữ liệu chủ chính thức. |
| 2 | Hủy | Nút | Bỏ qua cập nhật. |

### 4.5.2.6. PM04.QLDLC.MH06 – Công khai dữ liệu chủ (Popup)
*(Giao diện tham chiếu: [PublishMasterDataModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/masterdata/PublishMasterDataModal.tsx))*

#### 4.5.2.6.1. Màn hình
- Màn hình:

![Công khai dữ liệu chủ](./images/congkhaidulieuchu.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình thiết lập công khai dữ liệu chủ</p>

#### 4.5.2.6.2. Mô tả thông tin trên màn hình
Cung cấp dữ liệu chủ ra bên ngoài qua API sau khi đã được phê duyệt.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| API Endpoint | Văn bản | Có | - | Đường dẫn truy cập dữ liệu (VD: /api/v1/master-data/person). |
| Mức độ truy cập | Chọn 1 | Có | Công khai | Công khai (Public), Nội bộ (Internal), Hạn chế (Restricted). |
| Người duyệt | Văn bản | Có | - | Họ tên cán bộ duyệt công khai. |
| Rate limit | Số | Có | 100 | Giới hạn số lượng request/giây để bảo vệ hệ thống. |
| Bật cache | Checkbox | Không | Không | Tăng tốc độ truy cập dữ liệu thường xuyên. |

#### 4.5.2.6.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu công khai | Nút | Bật cung cấp dữ liệu qua API. |


