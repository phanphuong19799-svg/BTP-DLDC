const fs = require('fs');

const files = [
    'C:/Users/trinh/AppData/Local/Temp/raw_data_part1.txt',
    'C:/Users/trinh/AppData/Local/Temp/raw_data_part2.txt',
    'C:/Users/trinh/AppData/Local/Temp/raw_data_part3.txt'
];

let lines = [];
try {
    for (const f of files) {
        const content = fs.readFileSync(f, 'utf8');
        lines = lines.concat(content.split('\n'));
    }
} catch (e) {
    console.error("Error reading temp files:", e.message);
}

const tq_content = `| STT | Function ID (*) | Tên CN | Mã Màn hình | Tên màn hình/API |
| :--- | :--- | :--- | :--- | :--- |
| 1 | DC1-TQ-DB-001 | 01. Dashboard Tổng quan | MH01 | Dashboard Tổng quan |
| 2 | DC1-TQ-DB-001 | 01. Dashboard Tổng quan | MH01.P01 | Popup chi tiết Thu thập |
| 3 | DC1-TQ-DB-001 | 01. Dashboard Tổng quan | MH01.P02 | Popup chi tiết Xử lý |
| 4 | DC1-TQ-DB-001 | 01. Dashboard Tổng quan | MH01.P03 | Popup chi tiết Chia sẻ |`;

const tb_content = `| STT | Function ID (*) | Tên CN | Mã Màn hình | Tên màn hình/API |
| :--- | :--- | :--- | :--- | :--- |
| 1 | DC1-TB-QT-001 | 01. Quản lý thông báo | MH01 | Quản lý thông báo |
| 2 | DC1-TB-QT-001 | 01. Quản lý thông báo | MH01.P01 | Chi tiết thông báo |
| 3 | DC1-TB-QT-001 | 01. Quản lý thông báo | MH01.P02 | Xác nhận xóa thông báo |`;

const modules = {
    'TT': [],
    'XL': [],
    'DM': [],
    'DLC': [],
    'DT': [],
    'CC': [],
    'QT': []
};

const clean = (x) => x.trim().replace(/^"|"$/g, '');

for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    
    const parts = line.split('\t');
    if (parts.length >= 2) {
        const fid = clean(parts[0]);
        const fname = clean(parts[1]);
        if (fid === 'Function_ID' || fid === '0' || !fid) continue;
        
        let mcode = '';
        let mname = '';
        
        // --- THU THẬP (TT) & ĐỐI SOÁT (DXTT) ---
        if (fid.startsWith('DC1-TT-QT')) {
            if (fname.toLowerCase().includes('phương thức')) {
                mcode = 'MH02'; mname = 'Quản lý thiết lập thu thập';
            } else if (fname.includes('Nhật ký')) {
                mcode = 'MH03'; mname = 'Nhật ký thu thập';
            } else if (fname.includes('Dashboard')) {
                mcode = 'MH01'; mname = 'Dashboard Thu thập';
            } else {
                mcode = 'MH02'; mname = 'Quản lý thiết lập thu thập';
            }
        } else if (fid.startsWith('DC1-TT-NN')) {
            mcode = 'MH05.M04'; mname = 'Xem chi tiết dữ liệu Ngoài ngành';
        } else if (fid.startsWith('DC1-TT-TN')) {
            mcode = 'MH04.M04'; mname = 'Xem chi tiết dữ liệu Trong ngành';
        } else if (fid.startsWith('DC1-DXTT-NN')) {
            mcode = 'MH07.M01'; mname = 'Đối soát Ngoài ngành';
        } else if (fid.startsWith('DC1-DXTT-TN')) {
            mcode = 'MH06.M01'; mname = 'Đối soát Trong ngành';
            
        // --- XỬ LÝ DỮ LIỆU (XL) ---
        } else if (fid.startsWith('DC1-XLDL-TLNN')) {
            mcode = 'MH02.P01'; mname = 'Quản lý Quy tắc Xử lý Ngoài ngành';
        } else if (fid.startsWith('DC1-XLDL-TTTN') || fid.startsWith('DC1-XLDL-TN')) {
            mcode = 'MH02.P01'; mname = 'Quản lý Quy tắc Xử lý Trong ngành';
            
        // --- DANH MỤC DÙNG CHUNG (DM) ---
        } else if (fid.startsWith('DC1-DMDC-QL')) {
            mcode = 'MH02'; mname = 'Danh sách thiết lập';
        } else if (fid.startsWith('DC1-DMDC-QĐ')) {
            mcode = 'MH03'; mname = 'Giao diện phê duyệt';
        } else if (fid.startsWith('DC1-DMDC-CB')) {
            mcode = 'MH04'; mname = 'Thiết lập công bố';
        } else if (fid.startsWith('DC1-DMDC-Tra cuu') || fid.startsWith('DC1-DMDC-API')) {
            mcode = 'MH01'; mname = 'Báo cáo & Tra cứu';
            
        // --- DỮ LIỆU CHỦ (DLC) ---
        } else if (fid.startsWith('DC1-DLC-TT-464')) {
             mcode = 'MH01.P03'; mname = 'Thêm quy tắc hợp nhất mới';
        } else if (fid.startsWith('DC1-DLC-TT-465')) {
             mcode = 'MH01.P05'; mname = 'Thêm quy tắc định danh';
        } else if (fid.startsWith('DC1-DLC-TT')) {
             mcode = 'MH01'; mname = 'Danh sách thực thể DLC';
        } else if (fid.startsWith('DC1-DLC-QĐ')) {
             mcode = 'MH01.P06'; mname = 'Chi tiết phê duyệt';
        } else if (fid.startsWith('DC1-DLC-GS')) {
             mcode = 'MH03'; mname = 'Báo cáo & Tra cứu DLC';
             
        // --- ĐIỀU PHỐI / API (DT) ---
        } else if (fid.startsWith('DC1-DPDL-QLAPI')) {
             mcode = 'MH01'; mname = 'Giao diện Quản lý API';
        } else if (fid.startsWith('DC1-DPDL-GSAPI')) {
             mcode = 'MH02'; mname = 'Dashboard Giám sát';
        } else if (fid.startsWith('DC1-DPDL-CBT')) {
             mcode = 'MH02'; mname = 'Dashboard Giám sát';
             
        // --- CUNG CẤP DỮ LIỆU (CC) ---
        } else if (fid.startsWith('DC1-CCDLDC-QL')) {
             mcode = 'MH01'; mname = 'Cung cấp dữ liệu dùng chung';
        } else if (fid.startsWith('DC1-CCDLDC-PD')) {
             mcode = 'MH01.P03'; mname = 'Phê duyệt yêu cầu';
        } else if (fid.startsWith('DC1-DVCCDL-KT-489')) {
             mcode = 'MH04'; mname = 'Danh sách gói tin danh mục';
        } else if (fid.startsWith('DC1-DVCCDL-KT-490')) {
             mcode = 'MH06'; mname = 'Dashboard CSDL Hộ tịch';
             
        // --- QUẢN TRỊ HỆ THỐNG (QT) ---
        } else if (fid.startsWith('DC1-QTHT-491') || fid.startsWith('DC1-QTHT-493')) {
             mcode = 'MH13'; mname = 'Quản lý người dùng';
        } else if (fid.startsWith('DC1-QTHT-492')) {
             mcode = 'MH13.P03'; mname = 'Xác nhận khóa tài khoản';
        } else if (fid.startsWith('DC1-QTHT-494')) {
             mcode = 'MH13.P04'; mname = 'Xác nhận đặt lại mật khẩu';
        } else if (fid.startsWith('DC1-QTHT-495')) {
             mcode = 'MH15'; mname = 'Danh sách chức năng';
        } else if (fid.startsWith('DC1-QTHT-496')) {
             mcode = 'MH14'; mname = 'Quản lý nhóm người dùng';
        } else if (fid.startsWith('DC1-QTHT-497') || fid.startsWith('DC1-QTHT-498')) {
             mcode = 'MH14.P05'; mname = 'Gán quyền cho nhóm';
        } else if (fid.startsWith('DC1-QTHT-499')) {
             mcode = 'MH16'; mname = 'Thiết lập cấu hình';
        } else if (fid.startsWith('DC1-QTHT-500')) {
             mcode = 'MH17'; mname = 'Thiết lập quy tắc mật khẩu';
        } else if (fid.startsWith('DC1-QTHT-501')) {
             mcode = 'MH19'; mname = 'Nhật ký truy cập';
        } else if (fid.startsWith('DC1-QTHT-502')) {
             mcode = 'MH20'; mname = 'Nhật ký các lỗi phát sinh';
        } else if (fid.startsWith('DC1-QTHT-503')) {
             mcode = 'MH22'; mname = 'Nhật ký thay đổi cấu hình';
        } else if (fid.startsWith('DC1-QTHT-675')) {
             mcode = 'MH23'; mname = 'Xem biểu đồ thống kê';
        } else if (fid.startsWith('DC1-QTHT-678')) {
             mcode = 'MH18'; mname = 'Sao lưu dự phòng';
        } else if (fid.startsWith('DC1-QTHT-50') || fid.startsWith('DC1-QTHT-67')) {
             mcode = 'MH16'; mname = 'Thiết lập cấu hình (Bổ sung)';
        } else if (fid.startsWith('DC1-QTHT')) {
             mcode = 'MH16'; mname = 'Thiết lập cấu hình (Bổ sung)';
        } else {
             mcode = ''; mname = '';
        }

        // Categorize into modules
        if (fid.includes('TT') || fid.includes('DXTT')) {
            if (fid.includes('XLDL') || fid.includes('QTHT')) {
                // Ignore nested strings like DC1-XLDL-TTTN or DC1-TT-...-QTHT if any
                if (fid.includes('XLDL')) modules['XL'].push([fid, fname, mcode || 'MH02.P01', mname || 'Quản lý Quy tắc Xử lý Trong ngành']);
                if (fid.includes('QTHT')) modules['QT'].push([fid, fname, mcode || 'MH16', mname || 'Thiết lập cấu hình']);
            } else {
                modules['TT'].push([fid, fname, mcode || 'MH04.M04', mname || 'Xem chi tiết dữ liệu Trong ngành']);
            }
        } else if (fid.includes('XLDL')) {
            modules['XL'].push([fid, fname, mcode || 'MH02.P01', mname || 'Quản lý Quy tắc Xử lý']);
        } else if (fid.includes('DMDC')) {
            modules['DM'].push([fid, fname, mcode || 'MH01', mname || 'Báo cáo & Tra cứu']);
        } else if (fid.includes('DLC')) {
            modules['DLC'].push([fid, fname, mcode || 'MH01', mname || 'Danh sách thực thể DLC']);
        } else if (fid.includes('DPDL')) {
            modules['DT'].push([fid, fname, mcode || 'MH01', mname || 'Giao diện Quản lý API']);
        } else if (fid.includes('CCDLDC') || fid.includes('DVCCDL')) {
            modules['CC'].push([fid, fname, mcode || 'MH01', mname || 'Cung cấp dữ liệu dùng chung']);
        } else if (fid.includes('QTHT')) {
            modules['QT'].push([fid, fname, mcode || 'MH16', mname || 'Thiết lập cấu hình']);
        }
    }
}

const titles = {
    'TT': '2. Phân hệ Quản lý thu thập (TT)',
    'XL': '3. Phân hệ Xử lý dữ liệu (XL)',
    'DM': '4. Phân hệ Quản lý danh mục (DM)',
    'DLC': '5. Phân hệ Dữ liệu chủ (Master Data - DLC)',
    'DT': '6. Phân hệ Điều tiết / API (DT)',
    'CC': '7. Phân hệ Quản lý cung cấp (CC)',
    'QT': '8. Phân hệ Quản trị & Vận hành (QT)'
};

let output = "# DANH SÁCH MÃ MÀN HÌNH VÀ CHỨC NĂNG HỆ THỐNG KHO DLDC\n\n";
output += "Tài liệu này tổng hợp danh sách các Function ID, Tên chức năng và Mã màn hình tương ứng cho từng phân hệ trong hệ thống Kho dữ liệu dùng chung (Kho DLDC).\n\n";
output += "---\n\n";
output += "## 1. Phân hệ Tổng quan (TQ)\n\n";
output += tq_content + "\n\n---\n\n";

for (const modKey of ['TT', 'XL', 'DM', 'DLC', 'DT', 'CC', 'QT']) {
    output += `## ${titles[modKey]}\n\n`;
    output += "| STT | Function ID (*) | Tên CN | Mã Màn hình | Tên màn hình/API |\n";
    output += "| :--- | :--- | :--- | :--- | :--- |\n";
    
    let i = 1;
    for (const item of modules[modKey]) {
        output += `| ${i++} | ${item[0]} | ${item[1]} | ${item[2]} | ${item[3]} |\n`;
    }
    output += "\n---\n\n";
}

output += "## 9. Phân hệ Quản lý thông báo (TB)\n\n";
output += tb_content + "\n";

fs.writeFileSync('d:/Tư pháp/KhoDLDC/DLDC_1/tailieu/tailieuphantich/mamanhinh.md', output, 'utf8');
console.log("Markdown generation complete!");
