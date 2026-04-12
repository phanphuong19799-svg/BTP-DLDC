# Thiết kế Cơ sở dữ liệu Tổng thể: Module Thu Thập Dữ Liệu (Data Collection Module)

Dựa trên scope của dự án DLDC tập trung chuyên biệt vào Core của "Module Thu Thập", CSDL được chuẩn hóa tách biệt rạch ròi giữa: **Quản lý Nguồn dữ liệu (Hệ thống/Đơn vị)**, **Thiết lập Luồng Thu thập (ETL)**, **Cấu hình Ánh xạ (Mapping)** và **Giám sát (Dashboard & Logs)**.

Thiết kế này đảm bảo Dev có thể dựng Table, tạo Relation Key trên bất kỳ RDBMS nào (PostgreSQL/MySQL/Oracle) chặn được lỗi trùng lặp dữ liệu và đạt chuẩn thiết kế phần mềm linh hoạt (Extensibility).

---

## 1. Sơ đồ Quan hệ Thực thể Phân hệ Thu thập (ERD)

```mermaid
erDiagram
    DATA_PROVINCES ||--o{ DATA_PROVIDERS : "Phân vùng"
    DON_VI ||--o{ COLLECTION_SERVICES : "Tạo kết nối"
    
    COLLECTION_SERVICES ||--o| SERVICE_CONNECTIONS : "Giao thức"
    COLLECTION_SERVICES ||--o| SERVICE_SCHEDULES : "Định tuyến"
    COLLECTION_SERVICES ||--o{ SERVICE_MAPPINGS : "Ánh xạ cột"
    
    COLLECTION_SERVICES ||--o| SERVICE_STATISTICS : "Thống kê"
    COLLECTION_SERVICES ||--o{ SERVICE_SYNC_LOGS : "Ghi nhận Lô"

    DATA_PROVINCES {
        uuid id PK
        varchar code "Mã Tỉnh/Bộ"
        varchar name "Tên tỉnh thành hoặc Bộ Ngành"
        varchar level "Cấp Trung ương / Địa phương"
    }

    DATA_PROVIDERS {
        uuid id PK
        uuid province_id FK "Thuộc tỉnh/bộ nào"
        varchar code "Mã CQ/Đơn vị"
        varchar name "Tên đơn vị báo cáo"
        varchar contact_phone "Hotline"
        varchar contact_email "Email nhận cảnh báo"
    }

    DON_VI {
        uuid id PK
        varchar name "Tên đơn vị"
        varchar classification "TRONG_NGANH | NGOAI_NGANH"
    }

    COLLECTION_SERVICES {
        uuid id PK
        uuid don_vi_id FK "Đơn vị liên kết"
        varchar code "Mã dịch vụ thu thập"
        varchar name "Tên dịch vụ/luồng"
        varchar version "Phiên bản thiết lập"
        varchar security_level "Độ tuyệt mật"
        varchar status "ACTIVE | INACTIVE"
        varchar connection_status "Tình trạng mạng Ping"
        varchar notification_status "Cờ SMS/Email"
        text description "Ghi chú mục đích"
        boolean is_deleted "Xóa mềm"
    }

    SERVICE_CONNECTIONS {
        uuid id PK
        uuid service_id FK
        varchar connection_type "REST, SOAP, ORACLE, KAFKA"
        jsonb config_data "JSON chứa BASE_URL, AUTH, TOKEN, IP"
    }

    SERVICE_SCHEDULES {
        uuid id PK
        uuid service_id FK
        varchar sync_frequency "Chuỗi Cron Regex"
        varchar sync_strategy "FULL | DELTA"
        varchar primary_key_field "Cột check Hash/Mốc thời gian"
        int batch_size "Chunk size"
        int retry_limit "Số lần chạy lại khi rớt"
    }

    SERVICE_MAPPINGS {
        uuid id PK
        uuid service_id FK
        varchar source_field "Cột ở CSDL Nguồn"
        varchar target_field "Cột ở Kho CSDL Đích"
        varchar data_type "NUMBER, VARCHAR, DATE"
        varchar rule_script "Script biến đổi: UPPER(), TO_DATE()"
    }

    SERVICE_STATISTICS {
        uuid id PK
        uuid service_id FK
        bigint total_success_records "Cộng dồn báo cáo Dashboard"
        bigint total_error_records "Cộng dồn rác format"
        timestamp last_sync_time "Thời điểm quét lô cuối"
        varchar last_sync_status "Tình trạng lô quét cuối"
        timestamp updated_at
    }

    SERVICE_SYNC_LOGS {
        uuid id PK
        uuid service_id FK
        varchar status "SUCCESS | FAILED"
        int total_records "Sản lượng 1 mẻ chạy"
        int error_records "Lượng đứt gãy"
        text error_message "Stack trace lỗi nếu có"
        timestamp started_at
        timestamp completed_at
    }
```

---

## 2. Giải nghĩa Thiết kế (Từ điển Database)

### Nhóm 1: Quản lý Danh mục & Môi trường Nguồn
Thay vì để User gõ tay tên Hệ Thống hay "Trong/Ngoài ngành" mỗi lần thêm mới Thiết lập (dễ sinh lỗi Typo rác CSDL), ta tách ra mảng **Danh mục (Master Data)** phân tầng:
1. **`DATA_PROVINCES` (Danh mục Vùng/Tỉnh/Bộ):** Quản lý Master địa giới hành chính hoặc Cấp Trung ương. VD: `Hà Nội`, `Bộ Công an`. Phục vụ tính năng thống kê xem Tỉnh/Bộ nào đang đóng góp nhiều Data nhất.
2. **`DON_VI` (Đơn vị cung cấp trực tiếp):** Lưu các Cơ quan, Sở, Ban, Ngành (Ví dụ: `Sở Thông tin TT Hà Nội`, `Cục Thống kê`). Bảng này có cột Enum `classification` giúp phân loại "Trong ngành" (Nội bộ BTP) hay "Ngoài ngành".

### Nhóm 2: Lõi Thiết lập Thu thập (Core ETL Setup)
1. **`COLLECTION_SERVICES`**: Đóng vai trò là TRỤC XOAY (Bảng cha). Quản lý thông tin định danh bề mặt của 1 luồng thu thập. Khóa ngoại `don_vi_id` xác định Dịch vụ/Kết nối này thuộc Đơn vị nào quản lý.
2. **`SERVICE_CONNECTIONS`**: Toàn bộ cấu hình phức tạp (User/Pass DB, Key OAUTH2, Base URL, IP/Port) được gói hết vào cột **JSONB `config_data`**. Dev BE không cần tạo thừa thãi 1 đống cột cứng, Database tự do linh hoạt scale khi xuất hiện chuẩn kết nối mới (KAFKA, MQTT).
3. **`SERVICE_SCHEDULES`**: Bảng giữ toàn bộ lệnh định tuyến lập lịch quét: Quét toàn thời gian (Full Sync) hoặc Quét cập nhật gia tăng (Delta Sync).

### Nhóm 3: Tiêu chuẩn hóa Dữ liệu (Schema Mapping)
1. **`SERVICE_MAPPINGS` (Bảng Ánh Xạ):** Chìa khóa vàng của hệ thống Dữ Liệu Đồng Bộ. Hệ thống thu thập không thể mang nguyên DB của đối tác đắp vào mình được. Bảng này lưu luật ánh xạ kiểu 1-1. Ví dụ cấu hình row 1: `source='CCCD' -> target='ma_dinh_danh' | rule='Bỏ mọi dấu cách thừa'`.

### Nhóm 4: Logs & Monitoring
1. **`SERVICE_SYNC_LOGS`**: Khi Worker / Hangfire quét theo Scheduled thì mọi lô (Batch Process) đều sinh ra 1 Row Audit ở đây để theo dõi Tiến trình, tính toán Runtime và phát hiện Exception thảm họa.
2. **`SERVICE_STATISTICS`**: Sinh ra để trả về Data cực lẹ cho màn hình **Báo cáo Thống kê Dashboard KPI (Hình ảnh cột/line chart)**. Dev không bao giờ được Select COUNT(*) bảng Logs. Thay vào đó, sau mỗi lô Sync Log thành công, Code Backend sẽ bắn lệnh Tăng dồn `total_success_records` tại bảng này lên. Tối ưu hoàn toàn tình trạng treo Data lock.
