# TỔNG HỢP CÁC LUỒNG MÀN HÌNH (SCREEN FLOWS)

Tài liệu này tổng hợp toàn bộ các sơ đồ luồng màn hình của hệ thống Kho dữ liệu dùng chung (Kho DLDC), được trình bày dưới dạng sơ đồ chuyên nghiệp (Draw.io style) và mã nguồn Mermaid.

## 1. Luồng ứng dụng tổng quan

Sơ đồ thể hiện luồng điều hướng chính sau khi người dùng đăng nhập thành công:

![Sơ đồ tổng quan](file:///C:/Users/trinh/.gemini/antigravity/brain/ef5d8a70-ddc2-4901-b7ec-e8cc666d0868/overall_flow_visual_png_1773130097802.png)

### Mã Mermaid tham chiếu:
```mermaid
graph TD
    A[Màn hình Đăng nhập] --> B{Đăng nhập thành công?}
    B -- Có --> C[Tổng quan - Dashboard]
    B -- Không --> A
    
    C --> D[Quản lý thu thập]
    C --> E[Xử lý dữ liệu]
    C --> F[Quản lý danh mục]
    C --> G[Dữ liệu mở]
    C --> H[Quản lý dữ liệu chủ]
    C --> I[Điều phối dữ liệu]
    C --> J[Quản trị & vận hành]
```

---

## 2. Luồng theo từng chức năng (Menu)

### 2.1. Quản lý thu thập (Data Collection)
Sơ đồ quy trình thiết lập và thực hiện thu thập dữ liệu:

![Luồng Thu thập](file:///C:/Users/trinh/.gemini/antigravity/brain/ef5d8a70-ddc2-4901-b7ec-e8cc666d0868/collection_flow_visual_png_1773130119400.png)

#### Mã Mermaid tham chiếu:
```mermaid
graph TD
    Start([Bắt đầu]) --> Setup[Thiết lập dịch vụ thu thập]
    Setup --> Test[Kiểm tra kết nối]
    Test -- Thất bại --> Setup
    Test -- Thành công --> Config[Cấu hình tần suất đồng bộ]
    Config --> Collect[Thực hiện thu thập dữ liệu]
    Collect --> Check{Dữ liệu hợp lệ?}
    Check -- Không --> Error[Ghi nhật ký lỗi & Thông báo]
    Check -- Có --> Store[Lưu vào kho dữ liệu tạm]
    Store --> Reconcile[Đối soát dữ liệu]
    Reconcile --> End([Kết thúc])
```

### 2.2. Xử lý dữ liệu (Data Processing)
Sơ đồ quy trình làm sạch, chuẩn hóa và biến đổi dữ liệu:

![Luồng Xử lý](file:///C:/Users/trinh/.gemini/antigravity/brain/ef5d8a70-ddc2-4901-b7ec-e8cc666d0868/processing_flow_visual_png_1773130136419.png)

#### Mã Mermaid tham chiếu:
```mermaid
graph TD
    A[Tiếp nhận dữ liệu thô] --> B[Thiết lập quy tắc xử lý]
    B --> C[Giai đoạn 1: Làm sạch]
    C --> D[Giai đoạn 2: Chuẩn hóa]
    D --> E[Giai đoạn 3: Biến đổi]
    E --> F{Kiểm tra kết quả}
    F -- Có lỗi --> G[Danh sách bản ghi lỗi]
    G --> H[Sửa đổi/Phản hồi nguồn]
    H --> B
    F -- Thành công --> I[Lưu vào kho dữ liệu sạch]
    I --> J[Phân loại & Bảo mật]
    J --> End([Kết thúc])
```

### 2.3. Quản lý danh mục (Category Management)
Sơ đồ vòng đời của một danh mục:

![Luồng Danh mục](file:///C:/Users/trinh/.gemini/antigravity/brain/ef5d8a70-ddc2-4901-b7ec-e8cc666d0868/category_flow_visual_png_1773130158948.png)

#### Mã Mermaid tham chiếu:
```mermaid
graph TD
    Start([Bắt đầu]) --> Create[Tạo mới/Đồng bộ danh mục]
    Create --> Draft[Trạng thái: Nháp]
    Draft --> Edit[Chỉnh sửa thông tin/giá trị]
    Edit --> Submit[Gửi phê duyệt]
    Submit --> Review{Cấp quản lý duyệt?}
    Review -- Từ chối --> Draft
    Review -- Đồng ý --> Approved[Trạng thái: Đã phê duyệt]
    Approved --> Publish[Thiết lập công bố]
    Publish --> Public[Trạng thái: Đã công bố]
    Public --> End([Kết thúc])
```

### 2.4. Dữ liệu mở (Open Data)
Sơ đồ quy trình công bố tập dữ liệu mở:

![Luồng Dữ liệu mở](file:///C:/Users/trinh/.gemini/antigravity/brain/ef5d8a70-ddc2-4901-b7ec-e8cc666d0868/open_data_flow_visual_png_1773130172065.png)

#### Mã Mermaid tham chiếu:
```mermaid
graph TD
    A([Bắt đầu]) --> B[Thiết lập Dataset mới]
    B --> C[Cấu hình định dạng & Tần suất]
    C --> D[Gửi phê duyệt]
    D --> E{Lãnh đạo phê duyệt?}
    E -- Không --> B
    E -- Có --> F[Trạng thái: Đã phê duyệt]
    F --> G[Cấu hình phạm vi công bố]
    G --> H[Thực hiện Công bố]
    H --> I[Theo dõi & Thống kê lượt tải]
    I --> End([Kết thúc])
```

### 2.5. Quản lý dữ liệu chủ (Master Data)
Sơ đồ quy trình định danh và hợp nhất thực thể dữ liệu gốc:

![Luồng Dữ liệu chủ](file:///C:/Users/trinh/.gemini/antigravity/brain/ef5d8a70-ddc2-4901-b7ec-e8cc666d0868/master_data_flow_visual_png_1773130187704.png)

#### Mã Mermaid tham chiếu:
```mermaid
graph TD
    A([Bắt đầu]) --> B[Tiếp nhận dữ liệu từ Xử lý/Thu thập]
    B --> C[Phát hiện trùng lặp]
    C --> D{Có trùng lặp?}
    D -- Có --> E[Hợp nhất dữ liệu (Merge)]
    D -- Không --> F[Tạo thực thể mới]
    E --> G[Rà soát thay đổi thuộc tính]
    F --> G
    G --> H[Phê duyệt cập nhật]
    H --> I[Lưu vào kho Dữ liệu chủ chính thức]
    I --> J[Công khai qua API]
    J --> End([Kết thúc])
```

### 2.6. Điều phối dữ liệu (Data Orchestration/API)
Sơ đồ quy trình quản trị vận hành các API cung cấp dữ liệu:

![Luồng Điều phối](file:///C:/Users/trinh/.gemini/antigravity/brain/ef5d8a70-ddc2-4901-b7ec-e8cc666d0868/orchestration_flow_visual_png_1773130218010.png)

#### Mã Mermaid tham chiếu:
```mermaid
graph TD
    A([Bắt đầu]) --> B[Thiết lập API mới (Chủ động/Thụ động)]
    B --> C[Cấu hình Endpoint & Security]
    C --> D[Thiết lập Rate Limiting]
    D --> E[Kiểm tra API]
    E --> F{Kiểm tra đạt?}
    F -- Không --> C
    F -- Có --> G[Kích hoạt vận hành]
    G --> H[Giám sát & Nhật ký]
```

### 2.7. Quản trị & vận hành (Admin Operations)
Sơ đồ các hoạt động quản trị hệ thống:

![Luồng Quản trị](file:///C:/Users/trinh/.gemini/antigravity/brain/ef5d8a70-ddc2-4901-b7ec-e8cc666d0868/admin_flow_visual_png_1773130238469.png)

#### Mã Mermaid tham chiếu:
```mermaid
graph TD
    Start([Bắt đầu]) --> Login[Cán bộ Quản trị đăng nhập]
    Login --> Choice{Chọn tác vụ}
    
    Choice --> UserMgmt[Quản lý Người dùng/Phân quyền]
    Choice --> Config[Cấu hình hệ thống]
    Choice --> LogView[Theo dõi Nhật ký]
    Choice --> Stats[Xem Thống kê]
    
    UserMgmt --> Audit[Ghi nhật ký thao tác]
    Config --> Audit
```
