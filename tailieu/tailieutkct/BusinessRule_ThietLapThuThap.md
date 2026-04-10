# Tài liệu Đặc tả: Module Thiết lập Dịch vụ Thu thập (Collection Setup)

Tài liệu này đặc tả các quy tắc nghiệp vụ (Business Rules), cách tính toán dữ liệu và mô tả ánh xạ cơ sở dữ liệu cho toàn bộ quy trình thiết lập dịch vụ thu thập, bao gồm **Màn hình Danh sách** và **Màn hình Thêm mới/Chỉnh sửa**.

---

## Mảng A: Màn hình Danh sách Thiết lập Dịch vụ

Màn hình Danh sách cung cấp cái nhìn tổng quan về trạng thái của các hệ thống đã kết nối, cho phép quản trị viên theo dõi số liệu tổng hợp (qua Thẻ Header) và quản lý chi tiết (qua Grid Data).

### 1. Dữ liệu tổng hợp (Các Thẻ Header Dashboard)
Các thẻ Header (KPI Cards) trên cùng màn hình sẽ tính toán và hiển thị theo thời gian thực (Real-time).

| Tên thẻ KPI (Header) | Ý nghĩa Nghiệp vụ (Business Rules) | Cách tính / Công thức (Backend/SQL Query) | Table/Column Mapping |
| --- | --- | --- | --- |
| **Tổng số dữ liệu đã thiết lập** | Hiển thị tổng số lượng tất cả các dịch vụ kết nối (bản ghi thông số) đã được thiết lập trên hệ thống. | Hàm `COUNT(id)` với điều kiện không bị xóa logic (`is_deleted = false`). | Cột `id` của bảng `COLLECTION_SERVICES`. |
| **Đang hoạt động** | Số lượng các thiết lập thu thập đang được bật và chạy định kỳ bình thường (Active). | Hàm `COUNT(id)` với điều kiện trạng thái hoạt động. `WHERE status = 'ACTIVE'`. | Cột `status` của bảng `COLLECTION_SERVICES`. |
| **Đang bảo trì** | Số lượng các hệ thống đang bị đánh dấu tạm ngưng kết nối để bảo trì/nâng cấp, chưa thể thu thập dữ liệu (Maintenance). | Hàm `COUNT(id)` với điều kiện trạng thái bảo trì. `WHERE status = 'MAINTENANCE'`. | Cột `status` của bảng `COLLECTION_SERVICES`. |
| **Ngưng hoạt động** | Số lượng các hệ thống/thiết lập đã bị dừng thu thập vĩnh viễn hoặc vô hiệu hóa toàn trình (Inactive). | Hàm `COUNT(id)` với trạng thái ngưng hoạt động. `WHERE status = 'INACTIVE'`. | Cột `status` của bảng `COLLECTION_SERVICES`. |

### 2. Tiêu chí Bộ lọc & Tìm kiếm (Filter & Search)
- **Text Search (Global Type):** Người dùng nhập từ khóa cơ bản. Backend thực hiện Like Search (`%Keyword%`) áp dụng OR trên 3 trường: `COLLECTION_SERVICES.name`, `COLLECTION_SERVICES.system_name`, và `SERVICE_CONTACTS.unit_name`.
- **Bộ Lọc Trạng thái (Trạng thái Status):** `All`, `Active`, `Inactive`. Ánh xạ cột `COLLECTION_SERVICES.status`.
- **Bộ Lọc Cấp độ bảo mật (Security Level):** Lọc theo các Enums tương ứng ở Tab 1. Ánh xạ cột `COLLECTION_SERVICES.security_level`.

### 3. Danh sách phân trang (Data Grid Columns)
Quy định hiển thị của các bảng dữ liệu (Data Grid).

| Cột hiển thị (Column) | Logic & Validation | Lấy từ trường/bảng (DB Mapping) |
| --- | --- | --- |
| **STT** | Đánh số thứ tự tăng dần tự động (tính toán dựa trên `page_size` và `current_page`). | (Tính toán ở Frontend) |
| **Mã dịch vụ** | Mã định danh duy nhất của dịch vụ thu thập. | `COLLECTION_SERVICES.code` |
| **Tên dịch vụ** | Tên mô tả của dịch vụ kết nối. Có thể hiển thị dạng Text Bold. | `COLLECTION_SERVICES.name` |
| **Loại hình cung cấp** | Cột phân loại tập nguồn cung cấp (Hệ thống trong ngành / Hệ thống ngoài ngành). | `COLLECTION_SERVICES.source_type` |
| **Phiên bản** | Lưu trữ version của tài liệu/dịch vụ API đang cấu hình theo dõi. | `COLLECTION_SERVICES.version` |
| **Đơn vị quản lý** | Tổ chức sở hữu hệ thống dữ liệu gốc. Backend tự động Join để trả về Client. | `SERVICE_CONTACTS.unit_name` (thông qua `service_id`) |
| **Ngày tạo** | Ngày thêm mới thông tin kết nối lên hệ thống. Format thời gian: `DD/MM/YYYY`. | `COLLECTION_SERVICES.created_at` |
| **Ngày sửa** | Thời gian chỉnh sửa cấu hình gần nhất. Format: `DD/MM/YYYY`. | `COLLECTION_SERVICES.updated_at` |
| **Trạng thái kết nối** | Trạng thái bắt tay với bên đối tác (Ví dụ: Đang kết nối, Mất kết nối, Bảo trì). Thường dùng Badge Icon có màu để tạo sự chú ý. | `COLLECTION_SERVICES.connection_status` |
| **Gửi thông báo** | Cờ trạng thái đã gửi cảnh báo hay chưa. (Hiển thị *Chưa gửi* / *Đã gửi*). Áp dụng chủ yếu cho trường hợp kết nối/đồng bộ Gửi không thành công thì cần có Alert cho người phụ trách. | `COLLECTION_SERVICES.notification_status` |
| **Thao tác** | Nhóm chức năng (Icon Buttons): **Xem chi tiết** (Hiển thị dạng pop-up chỉ Đọc), **Sửa** (Mở màn hình 4 Tabs để Edit), **Xóa** (Soft Delete - Đổi cờ `is_deleted` = true). | N/A |

---

## Mảng B: Màn hình Thêm mới/Chỉnh sửa Thông tin kết nối

Màn hình **Thêm mới/Chỉnh sửa Thông tin kết nối** được thiết kế dưới dạng 4 Tabs nhằm tăng tính trực quan và phân tách rõ ràng các nhóm cấu hình, phục vụ cho việc thu thập dữ liệu từ các đơn vị. Dưới đây là mô tả chi tiết các trường dữ liệu và logic (Business Rules / Validation) trên từng Tab.

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
| **Phương thức kết nối** | Dropdown | Có | `SERVICE_CONNECTIONS.connection_type` | Enum | - `API RESTful`, `SOAP`, `FTP/SFTP`, `Upload file`, `Database`. Quyết định cụm Component hiển thị bên dưới. |

> **Quy tắc Lưu Trữ:** (Tất cả thông số Cấu hình động ở các Kịch bản 3.x bên dưới sẽ được Parse thành một chuỗi Object JSON và **lưu tập trung vào trường `SERVICE_CONNECTIONS.config_data`**)

### Kịch bản 3.1: Nếu chọn "API RESTful"
Dựa vào layout chuẩn của màn hình hiện tại, hiển thị các nhóm trường cấu hình như sau:

**1. Cấu hình Endpoint:**
- **Base URL:** Text Input. Phục vụ khởi tạo kết nối (VD: `https://api.example.com`). Validate: Chuẩn định dạng `http://` hoặc `https://`. (Bắt buộc)
- **Endpoint Path:** Text Input. Ghép nối với Base URL để gọi hướng tài nguyên gốc (VD: `/api/v1/users`).
- **Timeout (ms):** Number Input. Thời gian tối đa chờ phản hồi của API. Yêu cầu nhập số nguyên dương (VD: `1000`). (Bắt buộc)
- **Số lần thử:** Number Input/Dropdown. Vòng lặp tự động kết nối lại khi Request bị fail (VD: `1`). (Bắt buộc)
- **Khoảng cách:** Dropdown. Khoảng thời gian giãn cách chờ đợi giữa các lần thử lại (VD: `5 phút`).

**2. Thao tác Headers & HTTP Properties:**
- **Method:** Dropdown. Enum cho Method gọi dịch vụ (`GET`, `POST`, `PUT`, `DELETE`...). Theo mockup là `GET`. (Bắt buộc)
- **Content Type:** Dropdown. Định dạng truyền dữ liệu (VD: `Application/json`, `application/xml`...). (Bắt buộc)
- **Query Parameters:** Dropdown/Tags Input. Các bộ tham số truyền lên URL query string phụ trợ filter data (VD: `fromDate`).
- **HTTP Success Codes:** Text Input/Tags. Dùng định nghĩa mã phản hồi khi hệ thống phía đối tác trả về gọi là thành công nghiệp vụ (VD: `200`, `201`).
- **HTTP Error Codes:** Text Input/Tags. Nhóm mã quy định là thất bại (VD: `400, 500`).
- **Page Size:** Number/Dropdown. Số bản ghi tối đa lấy về mỗi Page để tránh quá tải RAM (VD: `100`, `500`). (Bắt buộc)

**3. Xác thực (Authentication) & Loại API:**
*(Quy tắc chung: Mọi mã khóa bảo vệ, token ở tất cả các phương thức đều phải được Frontend hiển thị Mask (chuyển dấu `***`) và Backend phải thực hiện mã hóa chuẩn AES-256 trước khi lưu vào Data JSON để phục vụ vấn đề Security)*
- **Loại API:** Dropdown phân loại lớp Header (VD: `API KEY`, `Basic`, `OAuth2`...). (Bắt buộc)
- **Authentication:** Text Input/Dropdown tuỳ hệ thống. Dành cho Scheme Prefix (VD: `Bearer token`).
- **Header Name (API Key):** Text Input (VD: `X-API-Key`). Validate theo định dạng key-name hợp lệ. (Bắt buộc khi Loại API là API Key)
- **API Key:** Password Input (`***`). Chuỗi secret cấp quyền truy cập để gửi lên Header. (Bắt buộc)


### Kịch bản 3.2: Nếu chọn "SOAP"
- **WSDL URL:** Text Input. Định dạng đường dẫn endpoint `http://`/`https://` trỏ tới file mô tả WSDL. (Bắt buộc)
- **SOAP Action:** Text Input. Phương thức operation SOAP trong body áo. (Bắt buộc)
- **Xác thực (Authentication):** 
  - **Loại Auth:** Dropdown (`WS-Security / Username Token`, `Basic Auth`). Nhóm thông tin bảo mật mặc định để tương tác XML Request.
  - **Username:** Nhập chuẩn text (Bắt buộc).
  - **Password:** Password Input (`***`). Yêu cầu mask nội dung và bắt buộc mã hoá. (Bắt buộc)
- **Timeout / Retry / Protocol Headers:** Kế thừa các logic validate tương tự của RESTful API.


### Kịch bản 3.3: Nếu chọn "FTP / SFTP"
Dành cho việc thu thập dữ liệu tự động cập nhật dưới dạng Flat File (`.csv`, `.xml`) được đối tác thả vào máy chủ File Server.
- **Protocol Type:** Dropdown (`FTP` cổng mặc định thường 21, `SFTP` bảo mật qua SSL cổng số 22). (Bắt buộc)
- **Remote Host / IP:** Text Input. Địa chỉ máy chủ (Domain / IPv4 chuẩn IP: `x.x.x.x`). (Bắt buộc)
- **Port:** Number. Định dạng bắt buộc ký tự số nguyên dương.
- **Thư mục (Directory Path):** Text Input (VD: `/exports/data/`). Con trỏ thư mục quét trên hệ thống từ xa.
- **Xác thực (Authentication):**
  - **Loại Auth:** Dropdown (`Password Login` hoặc `Private Key / SSH Key` dành cho SFTP).
  - **Username / Client ID:** Tên tài khoản truy cập không gian FTP. (Bắt buộc)
  - **Password / Certificate Key File:** Cung cấp string hoặc nút Upload chứng thư số (`.pem`). Mã hoá password file trên Database. (Bắt buộc)


### Kịch bản 3.4: Nếu chọn "Upload file"
Dành cho việc user hoặc Cán bộ nghiệp vụ chủ động upload mẫu file tĩnh cập nhật vào kho để nhập liệu (Data Ingestion không có API định kỳ).
- **Định dạng file mục tiêu (Whitelist Files):** Dropdown Multi-select (`CSV`, `XLSX`, `JSON`). Phục vụ validate cấm người dùng nhúng file virus độc hại. (Bắt buộc)
- **Dung lượng tối đa (Max Size MB):** Number Input. Hạn chế dung lượng tải lên mỗi batch (VD: `min_size = 1, max_size = 50 MB`). (Bắt buộc)
- **Cấu hình đọc mapping Row:** Input cấu hình lấy Header từ dòng số mấy cho File Excel.
- **Xác thực (Authentication):** 
  - Hệ thống áp dụng **Xác thực bằng Session người dùng (User Identifier Auth)** ở cấp Back-end. Tức là chỉ người đang có quyền (JWT hợp lệ) và đủ Roles quy định mới được gọi Action tải tập tin này. Mọi log sẽ trace bằng tài khoản người dùng đăng tải. 
  - Hoặc nếu bắt buộc phải có thông số ngoài: Dùng **Mã Pin tải liệu (Upload Secret Pin)** hiển thị Input nhập password `***`.


### Kịch bản 3.5: Nếu chọn "Database"
Kết nối chạy truy vấn (JDBC/ODBC) thẳng vào kho CSDL của đối tác.
- **Database Engine / Driver:** Dropdown (`Oracle`, `PostgreSQL`, `MySQL`, `MS SQL Server`...). Khai báo Engine để build driver kết nối chuẩn. (Bắt buộc)
- **Host / Address (IP):** Text Input (Validate Address mạng). (Bắt buộc)
- **Port:** Number. Validate default theo từng DB (VD: Oracle `1521`, Postgres `5432`). (Bắt buộc)
- **Tên CSDL (Database Name / SID / Service):** Text Input. Khoanh vùng schema và Table. (Bắt buộc)
- **Xác thực (Authentication):**
  - **DB Username:** Bắt buộc nhập. Tài khoản truy xuất database, yêu cầu bên cấp dữ liệu chỉ gán quyền `READ-ONLY`.
  - **DB Password:** Bắt buộc nhập. Mask dữ liệu chống nhìn lén UI và mã hóa chiều sâu tại Backend để bảo mật Cluster DB.

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

### 1. Cơ chế hoạt động Form Đăng Ký (Thêm mới)
- **Kiểm tra Kết nối (Test Connection - Action Tab 3):** Truyền payload tĩnh gọi ping đến Server Data Provider. Trả về `200 OK` mới cho hiển thị tick xanh; nếu Timeout hoặc Auth Failed, quăng Toast đỏ lên màn hình người dùng góc phải với mã lỗi cụ thể.
- **Submit Form Đăng Ký (Nút Lưu Lại):**
  - **Validation Xuyên suốt:** Khi user bấm submit, hệ thống (Form State) sẽ duyệt qua toàn bộ 4 Tabs. Nếu lỗi ở Tab nào (ví dụ Tab 2 thiếu SĐT, Tab 3 nhập sai IP), `tabBorder` chỗ đó phát đỏ cảnh báo và focus tự động chuyển hướng màn hình về khu vực lỗi đó.

### 2. Logic Thao tác Chỉnh sửa (Edit Mode Logic)
Khi người dùng bấm nút **Sửa** từ Màn hình Danh sách, hệ thống Load lại UI 4 Tabs cùng data cũ, nhưng cần thiết lập các quy tắc **KHÓA BẢO VỆ** để tránh hỏng hóc CSDL:

- **A. Nhóm trường BỊ KHÓA HOÀN TOÀN (Read-only / Disabed):**
  - **Mã dịch vụ / Entity Code:** Không cho phép thay đổi. Mã này liên kết chằng chịt dưới DB (`Foreign Key`), nếu sửa sẽ đứt luồng lịch sử đồng bộ (`Sys_Logs`).

- **B. Nhóm trường CẢNH BÁO / KHÓA ĐIỀU KIỆN (Conditional Lock):**
  - **Hệ thống & Nguồn thu thập:** *Nếu* dịch vụ chưa từng chạy đồng bộ lần nào -> Cho sửa tự do. *Nếu* đã từng đồng bộ sinh ra Data -> Chuyển sang Read-only, vì việc đổi Nguồn cấp đột ngột sẽ khiến báo cáo BI bị lai tạp dữ liệu.
  - **Giao thức & Danh sách Ánh xạ Field:** Cho phép sửa. Tuy nhiên, nếu user thực hiện thao tác *Đổi Giao thức (REST -> SOAP)* hoặc *Xóa/Sửa tên các cột ở bảng Mapping Schema*, hệ thống bắt buộc bật **Popup Hard-Confirm** (VD: Bắt gõ lại chữ `DONG Y` để xác nhận) với cảnh báo: *"Thay đổi cấu trúc Map sẽ làm ảnh hưởng tới các biểu mẫu dữ liệu đã thu thập. Bạn chắc chắn chứ?"*.
  - **Tài khoản / Mật khẩu kết nối:** Mật khẩu/Token CŨ không bao giờ được trả về dưới dạng Text (Chưa qua mã hóa) ở API Get Detail. UI chỉ nên hiển thị Placeholder `********`. Nếu user có gõ chuỗi mới vào ô Textbox thì hệ thống mới update.

- **C. Nhóm trường SỬA TỰ DO (Fully Editable):**
  - **Thông tin liên lạc Tab 2 (Đơn vị, Người đầu mối, Số điện thoại):** Cập nhật thoải mái do nhân sự đối tác thường xuyên biến động.
  - **Thông tin chung Tab 1 (Tên dịch vụ, Mức độ bảo mật, Mô tả, File đính kèm):** Không can thiệp kỹ thuật hệ thống nên cho phép sửa.
  - **Cấu hình Đồng bộ Tab 4 (Lịch đồng bộ, Tần suất Cron, Dừng hoạt động):** Hoàn toàn tự do để Quản trị viên dễ cài đặt giảm tải Server theo giờ.

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

---

## Mảng C: Màn hình Nhật ký Hệ thống (System Logs/Audit Trail)

Giao diện Nhật ký giám sát cho phép Quản trị viên theo dõi toàn bộ các hoạt động đăng nhập và tương tác của người dùng trên hệ thống, phục vụ thiết yếu cho công tác truy vết bảo mật (Security Traceability).

### 1. Phân loại Tabs (Phân hệ Nhật ký)
- **Lịch sử truy cập (Active Tab):** Ghi nhận quá trình xác thực (Đăng nhập, Đăng xuất, Hết hạn Token).
- **Lịch sử hoạt động:** Ghi dấu vết các hành động thao tác dữ liệu như Thêm/Sửa/Xóa cấu hình dịch vụ, tải file quyết định...
- **Thông tin khác:** Dành cho hệ thống log lỗi kỹ thuật nội bộ hoặc API request log.

### 2. Logic Bộ lọc Tìm kiếm (Filters)
- **Ô Tìm kiếm đa năng (Search Box):** TextField tìm kiếm chuỗi (Search LIKE) bao phủ trên các trường: Tên đăng nhập (Username), Tên đầy đủ, và Địa chỉ IP.
- **Lọc Người dùng (User Select):** Dropdown để khoanh vùng tra cứu log của một tài khoản (`user_id`) cụ thể.
- **Lọc Hành động (Action Select):** Dropdown khoanh vùng loại hình tương tác: `Đăng nhập`, `Đăng xuất`, `Truy cập dashboard`.
- **Khoảng thời gian (Date Range):** Bộ chọn `Từ ngày` - `Đến ngày`. Validation: Ngày kết thúc không được phép nhỏ hơn Ngày bắt đầu.
- **Nút Kết xuất (Export Data):** Gọi API báo cáo trả về file `.xlsx` hoặc `.csv`. Data xuất ra dựa hoàn toàn vào các điều kiện đã chọn ở thanh Filter, không giới hạn page.
- **Label Tổng số X bản ghi:** Text realtime đếm số lượng hits khớp với bộ lọc.

### 3. Danh sách Lịch sử Truy cập (Data Grid)
Được sắp xếp Mặc định ưu tiên (ORDER BY) theo Thời gian giảm dần (Log mới nhất nằm trên cùng).

| Cột hiển thị | Giải thích Nghiệp vụ & Dữ liệu | Cơ sở Dữ liệu (DB Mapping) |
| --- | --- | --- |
| **STT** | Đánh số thứ tự tăng dần theo số trang đang xem. | (Tự tính bởi Frontend) |
| **Người dùng** | Khung chứa 2 dòng trực quan: Dòng 1 là Tên đăng nhập (`Username` Text xanh), Dòng 2 chứa Họ tên thực tế của user. | Bảng User ( username, full_name) |
| **Hành động** | Loại tương tác xác thực (Ví dụ: Đăng nhập, Đăng xuất, truy cập dashboard). | `SYSTEM_LOGS.action_type` |
| **Thời gian** | Timestamp hệ thống ghi nhận lúc Server xử lý xong request. Định dạng hiển thị chuẩn `YYYY-MM-DD HH:mm:ss`. | `SYSTEM_LOGS.created_at` |
| **IP** | Địa chỉ IP (Public hoặc Local) bóc tách từ TCP Connection. | `SYSTEM_LOGS.ip_address` |
| **Trình duyệt** | Tên và phiên bản Browser bóc tách từ thông số Header `User-Agent` (VD: Chrome 120.0, Safari 17.0). | `SYSTEM_LOGS.user_agent_parsed` |
| **Trạng thái** | Badge có màu sắc: *Thành công* (Thẻ nền Xanh lục), *Thất bại* (Thẻ nền Đỏ nhạt - ví dụ nhập sai password). | `SYSTEM_LOGS.status` |
| **Thao tác** | Nút Hành động. Chủ yếu là Icon Mắt (View Detail) để mở Modal xem chi tiết file Raw JSON Request hoặc Metadata đầy đủ. | N/A |

---

## Mảng D: Màn hình Tổng quan (Dashboard Báo cáo Thống kê)

Màn hình Tổng quan cung cấp các biểu đồ trực quan (Data Visualization) giúp Ban Quản trị theo dõi lưu lượng và đánh giá hiệu suất của toàn bộ tiến trình thu thập (Data Ingestion Metrics). Điểm khác biệt lớn nhất là các số liệu này thiên về đếm **Khối lượng Bản ghi (Records)** thay vì đếm Số lượng Hệ thống.

### 1. Dữ liệu tổng hợp (Các Thẻ KPI Header)
| Tên thẻ KPI | Giải thích Nghiệp vụ & Logic UI | Cách tính / Truy xuất DB |
| --- | --- | --- |
| **Tổng số bản ghi đã thu thập** | Thống kê siêu tổng số dòng dữ liệu thực tế đã được kéo về thành công từ mọi đối tác tính tới thời điểm xem báo cáo. | Hàm `SUM(total_records)` từ bảng Log Đồng Bộ có cờ trạng thái `status = 'SUCCESS'`. |
| **...thu thập ngoài ngành** | Lọc và đếm giới hạn lượng bản ghi kéo từ các hệ thống không trực thuộc Bộ/Ngành quản lý trực tiếp. | Hàm `SUM` kết hợp Join bảng Cấu hình để bẫy điều kiện `WHERE source_type = 'Ngoài ngành'`. |
| **...thu thập trong ngành** | Lọc và đếm lưu lượng bản ghi luân chuyển nội bộ từ các hệ thống trực thuộc thẩm quyền. | Tương tự trên với điều kiện định danh `WHERE source_type = 'Trong ngành'`. |

### 2. Biểu đồ Xu hướng (Line Chart)
- **Tiêu đề:** Xu hướng Thu thập (Hiển thị cố định tham số: 12 tháng).
- **Mô tả:** Biểu đồ đường liên tục (Line chart) thể hiện đà tăng trưởng của tổng lượng bản ghi thu thập được quy gom theo từng tháng.
- **Cấu trúc Trục:** 
  - **Trục Y (Tung):** Khối lượng bản ghi định dạng số (10000, 20000...).
  - **Trục X (Hoành):** Chuỗi thời gian 12 tháng gần nhất (T1, T2... T12).
- **Logic Thực thi Backend:** Chạy vòng lặp tính Toán hạng (Sum) với SQL `GROUP BY MONTH(created_at)` trên bảng thống kê đồng bộ để xuất mảng 12 tọa độ [Tháng_Index, Total_Data]. Nếu có 1 tháng trong quá khứ không có data, FE phải tự điền số `0` để đường bị gãy xuống chứ code không được giật mất tháng đó.

### 3. Nhóm Biểu đồ Phân tích chi tiết (Bar Charts)
Mỗi biểu đồ Cột độc lập bên dưới đều có sẵn chức năng bộ lọc Thời gian (VD: *Tháng này, Tuần này, Năm nay*) ở góc trái và hiển thị Label `Tổng Số: X` cập nhật realtime theo Filter tại góc phải Header.

| Tên biểu đồ | Ý nghĩa Nghiệp vụ / Phân tích Trục (X/Y) | Nguồn cấp liệu (DB & SQL Logic) |
| --- | --- | --- |
| **Biểu đồ thu thập dl theo Phương thức** | Đo lường xem giao thức kiến trúc nào đang gánh vác việc nạp dữ liệu nhiều nhất. Giúp SA ra quyết định nếu muốn khai tử hạ tầng cũ. <br> **Trục X:** Danh sách Enums (`REST API`, `SOAP API`, `File Upload`, `FTP`). **Trục Y:** Lưu lượng record. | Tính tổng kết hợp `GROUP BY connection_type` (Phải Map bảng Sync_Log với bảng `SERVICE_CONNECTIONS` để đọc). |
| **Biểu đồ thu thập dl theo Nguồn cung cấp** | Triển khai Bảng xếp hạng (Leaderboard) các Đối Tác / Hệ thống đang rót về nhiều lưu lượng data nhất. Giúp vinh danh hoặc siết chặt quota. <br>**Trục X:** Tên định danh Nguồn (VD: `CSDL A`, `CSDL B`...). | Lấy tổng Record rồi `GROUP BY system_name`. Frontend có thể cài đặt `LIMIT Top 5` hiển thị hoặc sinh thanh cuộn ngang (Scrollbar). |
| **Biểu đồ thu thập dl theo Kết quả (Status)** | Phân tích tỉ lệ chất lượng Pipeline (Thành công so với Thất bại) để Admin biết Engine Backend đang mượt mà hay đang chết hàng loạt. <br>**Trục X:** Cột danh định (`Thành công`, `Thất bại`, `Đang xử lý`). | Aggregate dữ liệu `GROUP BY status` trong bảng Log Tiến trình. Giao diện nên ép màu cứng (Xanh cho thành công, Đỏ cho cột thất bại). |
| **Biểu đồ thu thập dl theo Thời gian (Khung giờ)** | Phân tích thói quen đồng bộ của các hệ thống tự động, tìm ra "Điểm cao điểm" (Bottleneck) căng thẳng nhất trong ngày để Scale phần cứng máy chủ. <br>**Trục X:** Bucket thời gian Histogram (VD: Cắt đều mỗi 4 tiếng `00:00`, `04:00`, `08:00`...). | Database bóc tách theo hàm `HOUR(created_at)`, sau đó Code Backend phải tự cài thuật toán gộp nhóm/Bucket (Binning) để ra đúng các khung giờ phân bổ cách nhau 4 tiếng như thiết kế hiển thị. |
