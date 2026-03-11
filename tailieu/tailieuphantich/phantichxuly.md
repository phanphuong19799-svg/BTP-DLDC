# 4.4. PM04.QLXL_Quản lý xử lý dữ liệu

## 4.4.1. PM04.QLXL.TC – Tổng quan xử lý dữ liệu

### 4.4.1.1. Mục đích
Cung cấp bảng điều khiển trung tâm để theo dõi trạng thái các tiến trình làm sạch và chuẩn hóa dữ liệu từ các nguồn khác nhau.

### 4.4.1.2. PM04.QLXL.TC.MH01 – Dashboard xử lý
*(Giao diện tham chiếu: [DataProcessingPage.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/pages/DataProcessingPage.tsx))*

#### 4.4.1.2.1. Màn hình
- Màn hình:

![Dashboard Xử lý](./images/dashboard_xuly.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Giao diện tổng quan xử lý dữ liệu</p>

#### 4.4.1.2.2. Mô tả thông tin trên màn hình

**A. Các bước xử lý chính**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Giai đoạn 1 | Tiến trình | - | - | Làm sạch. |
| Giai đoạn 2 | Tiến trình | - | - | Chuẩn hóa. |
| Giai đoạn 3 | Tiến trình | - | - | Biến đổi. |

**B. Chỉ số thống kê**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Quy tắc trong ngành | Số | - | - | Số lượng quy tắc áp dụng cho bộ dữ liệu nội bộ Bộ Tư pháp. |
| Quy tắc ngoài ngành | Số | - | - | Số lượng quy tắc áp dụng cho dữ liệu từ các Bộ/Ngành khác. |

#### 4.4.1.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem chi tiết quy tắc | Icon | Chuyển đến trang thiết lập quy tắc. |

## 4.4.2. PM04.QLXL.QT – Thiết lập & Quản lý quy tắc

### 4.4.2.1. Mục đích
Cho phép người dùng cấu hình chi tiết các quy tắc xử lý cho từng nguồn dữ liệu cụ thể, khởi chạy tiến trình và theo dõi kết quả thực hiện.

### 4.4.2.2. PM04.QLXL.QT.MH01 – Danh sách cấu hình xử lý
*(Giao diện tham chiếu: [ProcessingRuleSetupPage.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/pages/processing/ProcessingRuleSetupPage.tsx))*

#### 4.4.2.2.1. Màn hình
- Màn hình:

![Danh sách cấu hình xử lý](./images/danhsach_cauhin_xuly.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Bảng cấu hình quy tắc xử lý dữ liệu</p>

#### 4.4.2.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên dữ liệu xử lý | Ký tự | - | - | Tên gợi nhớ (VD: Dữ liệu CSDL hộ tịch). |
| Nguồn dữ liệu | Ký tự | - | - | CSDL gốc (VD: CSDL Hộ tịch Trung ương). |
| Người xử lý | Ký tự | - | - | Cán bộ chịu trách nhiệm cấu hình. |
| Trạng thái | Nhãn | - | - | Đang xử lý, Hoàn thành, Chờ xử lý, Lỗi. |
| Tiến độ | %/Thanh | - | - | Tỷ lệ bản ghi đã xử lý trên tổng số. |

#### 4.4.2.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thêm mới | Nút | Tạo một luồng xử lý mới cho nguồn dữ liệu. |
| 2 | Quản lý quy tắc | Nút | Mở popup cấu hình các bộ lọc làm sạch, chuẩn hóa, biến đổi. |
| 3 | Phân loại dữ liệu | Nút | Mở popup xác định mức độ bảo mật cho từng trường dữ liệu. |
| 4 | Chạy quy tắc | Nút | Kích hoạt tiến trình xử lý hàng loạt. |
| 5 | Lịch sử xử lý | Icon | Xem lại nhật ký các phiên xử lý (Popup). |
| 6 | Danh sách lỗi | Icon | Xem chi tiết các bản ghi bị lỗi trong quá trình xử lý (Popup). |

### 4.4.2.3. PM04.QLXL.QT.MH02 – Quản lý Quy tắc Xử lý (Popup)
*(Giao diện tham chiếu: [RuleManagementModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/processing/RuleManagementModal.tsx))*

#### 4.4.2.3.1. Màn hình
- Màn hình:

![Quản lý Quy tắc Xử lý](./images/quanly_quytac_xuly.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình quản lý các quy tắc làm sạch, chuẩn hóa, biến đổi</p>

#### 4.4.2.3.2. Mô tả thông tin trên màn hình

**A. Cấu hình chung cho mọi quy tắc**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Chọn trường áp dụng | Checkbox | Có | - | Danh sách các cột dữ liệu trong bảng nguồn tác động. |
| Trạng thái áp dụng | Toggle | Có | Mở | Bật/Tắt việc sử dụng quy tắc này cho luồng xử lý. |

**B. Cấu hình chi tiết các quy tắc**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Định dạng ngày tháng, Regex Pattern | Cấu hình | - | - | Thiết lập quy tắc khớp chuỗi cho dữ liệu ngày/số. |
| Kiểu dữ liệu, Min/Max | Cấu hình | - | - | Ràng buộc giá trị số hoặc định dạng email/phone. |
| Xử lý giá trị thiếu | Action | - | - | Cách hệ thống xử lý khi gặp trường rỗng. |
| Xử lý trùng lặp | Cấu hình | - | - | Tiêu chí để xác định và gộp bản ghi trùng. |

#### 4.4.2.3.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu tùy chỉnh | Nút | Cập nhật bộ quy tắc xử lý. |

### 4.4.2.4. PM04.QLXL.QT.MH03 – Phân loại và Bảo mật dữ liệu (Popup)
*(Giao diện tham chiếu: [DataClassificationModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/processing/DataClassificationModal.tsx))*

#### 4.4.2.4.1. Màn hình
- Màn hình:

![Phân loại và Bảo mật dữ liệu](./images/phanloai_baomat_dulieu.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Cửa sổ phân loại và cấu hình bảo mật dữ liệu</p>

#### 4.4.2.4.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mức độ công khai | Danh sách | - | - | Công khai, Hạn chế, Nội bộ, Mật. |
| Mức độ nhạy cảm | Danh sách | - | - | Thấp, Trung bình, Cao, Rất cao. |

#### 4.4.2.4.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu thiết lập | Nút | Ghi nhận cấu hình phân loại. |

### 4.4.2.5. PM04.QLXL.QT.MH04 – Danh sách Bản ghi Lỗi (Popup)
*(Giao diện tham chiếu: [ErrorListModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/processing/ErrorListModal.tsx))*

#### 4.4.2.5.1. Màn hình
- Màn hình:

![Danh sách Bản ghi Lỗi](./images/danhsach_banghi_loi.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Màn hình danh sách bản ghi lỗi trong quá trình xử lý</p>

#### 4.4.2.5.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã bản ghi | Ký tự | - | - | Mã định danh hồ sơ bị lỗi kỹ thuật. |
| Trường dữ liệu | Ký tự | - | - | Tên cột phát sinh lỗi (VD: Email, CCCD). |
| Giá trị gốc | Văn bản | - | - | Dữ liệu sai lệch lấy từ hệ thống nguồn. |
| Loại lỗi | Nhãn | - | - | Sai định dạng, Thiếu dữ liệu, Giá trị không hợp lệ. |
| Mô tả & Gợi ý | Văn bản | - | - | Giải thích chi tiết lỗi và giá trị đề xuất sửa đổi. |

#### 4.4.2.5.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Sửa đổi | Nút | Yêu cầu sửa đổi/Gửi lại hệ thống nguồn. |

### 4.4.2.6. PM04.QLXL.QT.MH05 – Lịch sử Xử lý dữ liệu (Popup)
*(Giao diện tham chiếu: [ProcessingHistoryModal.tsx](file:///d:/Tư%20pháp/KhoDLDC/DLDC_1/src/components/processing/ProcessingHistoryModal.tsx))*

#### 4.4.2.6.1. Màn hình
- Màn hình:

![Lịch sử Xử lý dữ liệu](./images/lichsu_xuly_dulieu.png)

<p align="center" style="background-color: #E0E0E0; padding: 5px; display: inline-block; margin: 0 auto;">Hình - Giao diện lịch sử các phiên xử lý dữ liệu</p>

#### 4.4.2.6.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thời gian | Ngày giờ | - | - | Thời điểm bắt đầu phiên xử lý. |
| Loại xử lý | Ký tự | - | - | Tên quy tắc hoặc nhóm quy tắc đã chạy. |
| Thống kê | Văn bản | - | - | Số bản ghi đã xử lý thành công/thất bại. |
| Trạng thái | Nhãn | - | - | Hoạt động, Hoàn thành, Có lỗi. |

#### 4.4.2.6.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Nút | Thoát cửa sổ. |



