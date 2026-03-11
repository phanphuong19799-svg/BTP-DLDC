# 4.8. PM08.QLCC_Quản lý cung cấp dữ liệu

## 4.8.1. PM08.QLCC.CC – Cung cấp dữ liệu dùng chung (Shared Data Provision)

### 4.8.1.1. Mục đích
Quản lý việc cấp quyền truy cập các gói dữ liệu dùng chung cho các tổ chức, đơn vị trong và ngoài ngành.

### 4.8.1.2. PM08.QLCC.CC.MH01 – Cung cấp dữ liệu dùng chung
*(Giao diện tham chiếu: [DataProvisionSharedPage.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/pages/provision/DataProvisionSharedPage.tsx))*

#### 4.8.1.2.1. Màn hình
- Màn hình:

![Cung cấp dữ liệu dùng chung](./images/provision_shared.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Giao diện cung cấp dữ liệu dùng chung</p>

#### 4.8.1.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Danh sách cung cấp | Bảng | - | - | Danh sách các cấu hình cấp quyền truy cập dữ liệu. |

#### 4.8.1.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thêm cấu hình | Nút | Mở popup thêm mới quyền truy cập. |
| 2 | Xem chi tiết | Icon | Mở popup chi tiết cấu hình quyền. |
| 3 | Duyệt | Icon | Mở popup phê duyệt yêu cầu (Trạng thái Chờ duyệt). |
| 4 | Thu hồi | Icon | Hủy bỏ quyền truy cập đang hoạt động. |

### 4.8.1.3. PM08.QLCC.CC.MH02 – Thêm cấu hình quyền truy cập (Popup)

#### 4.8.1.3.1. Màn hình
- Màn hình:

![Thêm cấu hình quyền truy cập](./images/themcauhinhtruycap.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình thêm cấu hình quyền truy cập</p>

#### 4.8.1.3.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tổ chức | Ký tự | Có | - | Tên đơn vị yêu cầu truy cập. |
| Loại tổ chức | Danh sách | Có | - | Bộ/Ngành, Địa phương, Bên ngoài. |
| Gói dữ liệu | Danh sách | Có | - | Chọn gói dữ liệu cần cấp quyền. |
| Mức độ truy cập | Danh sách | Có | - | Đọc, Ghi, Toàn quyền. |
| Giới hạn bản ghi | Số | Không | - | Số lượng bản ghi tối đa được phép truy cập. |
| Mục đích | Văn bản | Không | - | Lý do hoặc văn bản căn cứ cấp quyền. |
| Ngày hết hạn | Ngày | Không | - | Thời điểm quyền truy cập không còn hiệu lực. |

#### 4.8.1.3.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | Lưu cấu hình quyền truy cập. |
| 2 | Hủy | Nút | Đóng popup. |

### 4.8.1.4. PM08.QLCC.CC.MH03 – Chi tiết cấu hình quyền truy cập (Popup)

#### 4.8.1.4.1. Màn hình
- Màn hình:

![Chi tiết cấu hình quyền truy cập](./images/chitietcauhinhtruycap.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình chi tiết cấu hình quyền truy cập</p>

#### 4.8.1.4.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã quyền | Ký tự | - | - | Mã định danh duy nhất (VD: PERM_2024_001). |
| Tổ chức | Ký tự | - | - | Tên và phân loại tổ chức. |
| Gói dữ liệu | Ký tự | - | - | Tên gói dữ liệu đã cấp. |
| Trạng thái | Nhãn | - | - | Hoạt động, Chờ duyệt, Hết hạn, Thu hồi. |
| Lượt sử dụng | Số | - | - | Số bản ghi đã truy cập thực tế. |
| Tiến độ | Phần trăm | - | - | Tỷ lệ sử dụng so với giới hạn bản ghi. |

#### 4.8.1.4.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Nút | Đóng popup chi tiết. |

## 4.8.2. PM08.QLCC.DC – Cung cấp danh mục (Catalog Provision)

### 4.8.2.1. Mục đích
Thiết lập và quản lý các cấu trúc gói tin danh mục để cung cấp cho các hệ thống nội ngành.

### 4.8.2.2. PM08.QLCC.DC.MH01 – Danh sách gói tin danh mục
*(Giao diện tham chiếu: [InternalCatalogProvisionPage.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/pages/provision/InternalCatalogProvisionPage.tsx))*

#### 4.8.2.2.1. Màn hình
- Màn hình:

![Danh sách gói tin danh mục](./images/danhsachgoitindanhmuc.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình danh sách gói tin danh mục</p>

#### 4.8.2.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Danh sách gói tin | Bảng | - | - | Các cấu trúc gói tin danh mục. |

#### 4.8.2.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thêm gói tin | Nút | Mở form tạo cấu trúc gói tin mới. |
| 2 | Xem cấu trúc | Icon | Xem danh sách các trường dữ liệu trong gói tin (Popup). |
| 3 | Sửa/Xóa | Icon | Cập nhật hoặc loại bỏ gói tin. |

### 4.8.2.3. PM08.QLCC.DC.MH02 – Cấu trúc gói tin (Popup)

#### 4.8.2.3.1. Màn hình
- Màn hình:

![Cấu trúc gói tin](./images/cautrucgoitin.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình cấu trúc gói tin</p>

#### 4.8.2.3.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên trường | Ký tự | - | - | Tên hiển thị của Metadata. |
| Mã trường | Ký tự | - | - | Mã kỹ thuật dùng trong XML/JSON. |
| Kiểu dữ liệu | Danh sách | - | - | String, Number, Date, Boolean... |
| Độ dài | Số | - | - | Giới hạn ký tự (nếu có). |
| Bắt buộc | Nhãn | - | - | Có/Không. |

#### 4.8.2.3.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Nút | Đóng popup. |

## 4.8.3. PM08.QLCC.DL – Cung cấp CSDL DLDC (DLDC Data Provision)

### 4.8.3.1. Mục đích
Tra cứu và quản lý lịch sử cung cấp dữ liệu định danh công dân cho các hệ thống khác.

### 4.8.3.2. PM08.QLCC.DL.MH01 – Chi tiết bản ghi và lịch sử cung cấp (Popup)
*(Giao diện tham chiếu: [DataProvisionDldcAPage.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/pages/provision/DataProvisionDldcAPage.tsx))*

#### 4.8.3.2.1. Màn hình
- Màn hình:

![Chi tiết bản ghi và lịch sử cung cấp](./images/chitietbanghivalichsucungcap.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình chi tiết bản ghi và lịch sử cung cấp</p>

#### 4.8.3.2.2. Mô tả thông tin trên màn hình

**A. Thông tin chung bản ghi**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã bản ghi | Ký tự | - | - | Mã định danh hệ thống. |
| Họ và tên | Ký tự | - | - | Tên chủ thể dữ liệu. |
| Số CCCD | Ký tự | - | - | Số định danh cá nhân. |
| Tình trạng | Nhãn | - | - | Đã xác minh, Đang xử lý... |

**B. Bảng lịch sử cung cấp cho hệ thống**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên hệ thống | Ký tự | - | - | Hệ thống đã tiếp nhận dữ liệu. |
| Thời gian | Ngày giờ | - | - | Thời điểm thực hiện cung cấp. |
| Trạng thái | Nhãn | - | - | Thành công, Thất bại, Đang xử lý. |
| Ghi chú | Văn bản | - | - | Thông tin phản hồi từ hệ thống đích. |

#### 4.8.3.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Nút | Đóng popup. |
