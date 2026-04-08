# Tài liệu Đặc tả: Màn hình Thêm mới Thông tin kết nối (Collection Setup)

Màn hình **Thêm mới Thông tin kết nối** được thiết kế dưới dạng 4 Tabs nhằm tăng tính trực quan và phân tách rõ ràng các nhóm cấu hình, phục vụ cho việc thu thập dữ liệu từ các đơn vị. Dưới đây là mô tả chi tiết các trường dữ liệu và logic (Business Rules / Validation) trên từng Tab.

---

## Tab 1: Thông tin chung
Quản lý các thông tin định danh và phân loại tiến trình kết nối.

| Tên trường | Loại trường UI | Bắt buộc | Lưu tại DB | Nguồn dữ liệu | Logic & Validation |
|---|---|---|---|---|---|
| **Tên service** | Text Input | Có | `COLLECTION_SERVICES.name` | N/A | - Định danh dịch vụ. Không được bỏ trống. Khi bỏ trống viền input chuyển đỏ. |
| **Tên đơn vị** | Text Input | Có | (Móc sang bảng phụ) | N/A | - Nhập text tự do. Kích hoạt *two-way binding* sang trường Tên đơn vị tại Tab 2. |
| **Hệ thống** | Text Input | Có | `COLLECTION_SERVICES.system_name` | N/A | - Chỉ định tên phần mềm. Không được bỏ trống. |
| **Nguồn thu thập** | Dropdown | Không | `COLLECTION_SERVICES.source_type` | Hardcode Enum | - Giá trị cố định: `Hệ thống trong ngành`, `Hệ thống ngoài ngành`. |
| **Mức độ bảo mật dữ liệu** | Dropdown | Không | `COLLECTION_SERVICES.security_level` | Hardcode Enum | - Giá trị: `mở`, `nội bộ`, `hạn chế`, `nhạy cảm`, `bảo mật`, `tuyệt mật`. |
| **Mô tả** | Text Area | Không | `COLLECTION_SERVICES.description` | N/A | - Ghi chú purpose thu thập. |
| **Đính kèm văn bản** | File Upload | Không | `COLLECTION_SERVICES.attachment_path`| Storage Local/S3 | - Chỉ định dạng PDF/DOCX. File được đẩy lên server lấy link lưu về DB. |

---

## Tab 2: Thông tin đơn vị cung cấp
Lưu trữ thông tin liên hệ và vị trí đơn vị nắm giữ dữ liệu nguồn.

| Tên trường | Loại trường UI | Bắt buộc | Lưu DB | Nguồn DL | Logic & Validation |
|---|---|---|---|---|---|
| **Tên đơn vị** | Text Input | Có | `SERVICE_CONTACTS.unit_name` | N/A | - Hiển thị giá trị đã nhập ở Tab 1. Có thể sửa và cập nhật chéo ngược lại. |
| **Địa chỉ** | Text Input | Không | `SERVICE_CONTACTS.address` | N/A | - Địa chỉ của trụ sở cơ quan. |
| **Số điện thoại** | Tel Input | Không | `SERVICE_CONTACTS.phone` | N/A | - Cho phép nhập chuỗi số, bắt buộc cấu trúc SĐT. |
| **Địa chỉ email** | Email Input | Không | `SERVICE_CONTACTS.email` | N/A | - Phải theo format chuẩn địa chỉ thư điện tử (có ký tự `@`). |
| **Người đầu mối kỹ thuật** | Text Input | Không | `SERVICE_CONTACTS.technical_contact`| N/A | - Nhập tên tự do. |
| **Ghi chú** | Text Area | Không | `SERVICE_CONTACTS.note` | N/A | - Nhập bất cứ thông tin kèm nào. |

---

## Tab 3: Cấu hình kết nối
Cấu hình giao thức kết nối nhằm giao tiếp Data Server của đơn vị cung cấp.

| Tên trường | Loại trường UI | Bắt buộc | Lưu tại DB | Nguồn DL | Logic & Validation |
|---|---|---|---|---|---|
| **Phương thức kết nối** | Dropdown | Có | `SERVICE_CONNECTIONS.connection_type` | Enum | - `REST`, `SOAP`, `Database`. Quyết định cụm Component hiển thị bên dưới. |

> **Quy tắc Lưu Trữ:** (Tất cả thông số Cấu hình động ở các Kịch bản 3.x bên dưới sẽ được Parse thành một chuỗi Object JSON và **lưu tập trung vào trường `SERVICE_CONNECTIONS.config_data`**)

### Kịch bản 3.1: Nếu chọn "API RESTful"
- **Base URL:** Gắn API Endpoint gốc (Bắt buộc format HTTPS/HTTP).
- **Headers & Methods:** Gồm Content Type, Method. Nguồn Data thả xuống của field này là danh sách Enum tĩnh (GET, POST...).
- **Xác thực (Authentication):** Chọn loại hình Auth (Token, Basic...). Mật khẩu/Token người dùng nhập sẽ bị Mask (ẩn dấu `*`) - *Sau khi form submit xuống API C#, chuỗi bí mật này phải được mã hóa chuẩn hóa mật mã AES-256 mới đẩy vô CSDL JSON để đảm bảo audit bảo mật.*
- **Settings khác:** Payload request/response sample, Query, Success status codes.

### Kịch bản 3.2: Nếu chọn "API SOAP"
- **WSDL URL:** Trỏ tới file wsdl lấy definition.
- **Tài khoản WS-Security:** Truyền vào Tag `UsernameToken` ở xml header (Mật khẩu được phép ẩn khi Render UI, mã hoá khi lưu DB).

### Kịch bản 3.3: Nếu chọn "Database (Oracle/Postgres)"
- **Tham số hạ tầng CSDL:** Host/IP (chuẩn format mạng), Database Port (chỉ cho phép Numeric dương), Tên DB (SID) và Schema bảo mật gốc.

### Bổ trợ thêm ở Tab 3 (Các Component Tính Năng Cao Cấp)
1. **Ánh xạ trường dữ liệu (Map Logic):** Grid Data lưu các record \{source_field, type, destination_field\}. Chức năng này tạo cơ sở cho phép BE đọc config gen tự động Bảng dữ liệu tạm để Migrate.
2. **Cấu hình Trục LGSP (Chỉ hiển thị với *Nguồn trong ngành*):** 
   - **Nguồn data Chứng thư số:** Có thể kết nối nội bộ lấy từ Endpoint phân quyền CTS tập trung hoặc Enum List nội ngành nếu Offline.
3. **Cấu hình Hệ sinh thái NDXP (Chỉ hiển thị với *Nguồn ngoài ngành*):** 
   - Tham số bảo vệ Token / Mã bí mật liên kết thẳng với Cổng kết nối dữ liệu Quốc Gia.

---

## Tab 4: Cấu hình thu thập
Định lý và tần suất lên lịch kéo dữ liệu định danh theo lô hoặc sự kiện.

| Tên trường | Loại UI | Bắt buộc | Lưu tại DB | Nguồn DL | Logic & Validation |
|---|---|---|---|---|---|
| **Phương án đồng bộ** | Dropdown | Có | `SERVICE_SCHEDULES.sync_strategy` | Hardcode | - Các option: `Real-time`, `Batch`, `Scheduled`. |
| **Khoảng Tần suất** | Dropdown | Có | `SERVICE_SCHEDULES.sync_frequency` | Hardcode | - `Thủ công`, `Mỗi giờ`, `Ngày`, `Tuần`, `Tháng`. |

---

## Phụ lục: Các Thao Tác Chức Năng UI

- **Kiểm tra Kết nối (Test Connection - Action Tab 3):** Truyền payload test gọi ping đến Data Provider. Trả về `200 OK` mới cho tick xanh, nếu Timeout quăng Toast đỏ lên màn hình người dùng góc phải.
- **Submit Form Đăng Ký (Nut Lưu Lại):**
  - **Validation:** Khi user bấm submit, React Form Hook sẽ duyệt qua tất thảy 4 views dù bị hide. Lỗi ở Tab nào `tabBorder` chỗ đó phát đỏ cảnh báo và focus chuột tự trỏ về.

---

## 🛠 Technical Notes (Developer Guidelines)
Để việc phát triển Code Backend / Database trơn tru và ko bị đứt gãy với UI, Developer cần chú ý:

1. **Từ điển Thông báo lỗi UI (Error Messages Spec):** 
   - *Rỗng bắt buộc:* `"Trường thông tin [Tên Trường] không được phép để trống."`
   - *Lỗi Format Regex:* `"Email không đúng chuẩn (@domain.com)"` hoặc `"Số điện thoại yêu cầu chứa 10-11 chữ số hợp lệ."`
   - *Ping API Lỗi (Test Connection fail):* `"Kết nối thất bại (Timeout). Vui lòng rà soát lại tham số Base URL hoặc IP Port đã cung cấp."`

2. **Cấu trúc JSON Hợp nhất (Data API Contract - Frontend to Backend Submit):**
Hệ thống React sẽ đóng gói toàn bộ state của cả Modal lớn thành 1 POST Request JSON mẫu gửi xuống `/api/v1/collections`:
```json
{
  "name": "Dịch vụ đồng bộ Công Dân Quốc Tịch",
  "system_name": "HT_TANDTC",
  "source_type": "ngoai_nganh",
  "contact": { "unit_name": "Tòa Án Nhân Dân Tối Cao", "phone": "0981...11" },
  "connection": {
    "type": "REST",
    "config_data": {
      "base_url": "https://quoctich.ndxp.gov.vn/api/get",
      "auth_type": "OAUTH2",
      "token_encrypted_client_side": "...", 
      "mapping_schema": [{"source":"cccd", "dest":"ma_dinh_danh", "type":"VARCHAR"}]
    }
  },
  "schedule": {
    "syncStrategy": "BATCH",
    "frequency": "DAILY"
  }
}
```

3. **Cơ chế hoạt động "Kiểm tra kết nối" (Ping Health Check Engine):**
   - Không nên call Frontend thẳng đến nhà cung cấp để test bị kẹt lỗi `CORS Block`.
   - Action ở đây là gởi lệnh POST gián tiếp qua server BE. Server Backend của mình sẽ đóng vai trò như một Proxy để thử gọi HTTP GET/TCP Socket tới nhà cung cấp (Trong logic Timeout = 10 giây). Trả KQ `Success`/ `Fail` kèm Http Code cho Frontend hiện Toast Msg.

4. **Kỹ thuật Ánh xạ dữ liệu (Data Schema Mapper Backend Worker):**
   - Sau khi user hoàn thiện bảng Grid "Ánh xạ", một mảng `mapping_schema` được lưu lại dưới DB JSON.
   - Khi Service Schedule chạy lập lịch để đồng bộ lô dữ liệu lớn, App lõi sẽ dùng mảng Array quy tắc map này sinh ra Script `CREATE TEMPORARY TABLE xyz...` rồi đẩy hàng triệu dòng Raw Data vào Bảng chuẩn bị theo đúng Type cấu hình `(VARCHAR, NUMERIC)`.  Tránh phải code cứng từng cấu trúc DB cho từng đối tác một.
