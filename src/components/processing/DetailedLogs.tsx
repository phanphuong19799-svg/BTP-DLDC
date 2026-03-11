import { useState } from 'react';
import { FileText, Search, Filter, Download, ChevronRight, AlertCircle, CheckCircle, Info, XCircle, Clock } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  recordId: string;
  recordData: {
    field: string;
    oldValue: string;
    newValue: string;
    status: 'success' | 'error' | 'warning' | 'info';
  }[];
  action: string;
  rule: string;
  status: 'success' | 'error' | 'warning' | 'info';
  message: string;
  details?: string;
  user: string;
  sourceName: string;
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '08/12/2024 08:35:12',
    recordId: 'DGV-2024-001523',
    recordData: [
      { field: 'CMND/CCCD', oldValue: '001088012345', newValue: '001088012345', status: 'success' },
      { field: 'Họ và tên', oldValue: 'NGUYEN VAN A', newValue: 'Nguyễn Văn A', status: 'success' },
      { field: 'Số điện thoại', oldValue: '84912345678', newValue: '0912345678', status: 'success' },
      { field: 'Email', oldValue: '', newValue: 'nguyen.a@email.com', status: 'warning' },
    ],
    action: 'Chuẩn hóa dữ liệu',
    rule: 'Format - Chuẩn hóa họ tên và số điện thoại',
    status: 'success',
    message: 'Xử lý thành công - 4 trường được chuẩn hóa',
    details: 'Áp dụng quy tắc: Chuyển đổi chữ hoa thành chữ thường có dấu, chuẩn hóa định dạng số điện thoại Việt Nam',
    user: 'Nguyễn Văn A',
    sourceName: 'Cơ sở dữ liệu đấu giá viên',
  },
  {
    id: '2',
    timestamp: '08/12/2024 08:35:15',
    recordId: 'DGV-2024-001524',
    recordData: [
      { field: 'CMND/CCCD', oldValue: '001088012346', newValue: '001088012346', status: 'error' },
      { field: 'Họ và tên', oldValue: 'Trần Thị B', newValue: 'Trần Thị B', status: 'success' },
      { field: 'Mã tỉnh/thành', oldValue: 'TP99', newValue: '', status: 'error' },
    ],
    action: 'Kiểm tra tham chiếu',
    rule: 'Reference - Đối sánh danh mục tỉnh/thành',
    status: 'error',
    message: 'Lỗi: Mã tỉnh/thành không tồn tại trong danh mục',
    details: 'Mã "TP99" không có trong bảng tham chiếu dm_tinh_thanh. Bản ghi cần được kiểm tra và cập nhật thủ công.',
    user: 'Nguyễn Văn A',
    sourceName: 'Cơ sở dữ liệu đấu giá viên',
  },
  {
    id: '3',
    timestamp: '08/12/2024 08:35:18',
    recordId: 'DGV-2024-001525',
    recordData: [
      { field: 'CMND/CCCD', oldValue: '001088012345', newValue: '001088012345', status: 'warning' },
      { field: 'Họ và tên', oldValue: 'Nguyễn Văn A', newValue: 'Nguyễn Văn A', status: 'success' },
    ],
    action: 'Kiểm tra trùng lặp',
    rule: 'Duplicate - Phát hiện CMND/CCCD trùng',
    status: 'warning',
    message: 'Cảnh báo: Phát hiện CMND/CCCD trùng với bản ghi DGV-2024-001523',
    details: 'Tìm thấy 2 bản ghi có cùng CMND/CCCD 001088012345. Cần xác minh và gộp bản ghi.',
    user: 'Nguyễn Văn A',
    sourceName: 'Cơ sở dữ liệu đấu giá viên',
  },
  {
    id: '4',
    timestamp: '08/12/2024 08:35:20',
    recordId: 'DGV-2024-001526',
    recordData: [
      { field: 'Họ và tên', oldValue: 'Lê Văn C', newValue: 'Lê Văn C', status: 'success' },
      { field: 'Ngày sinh', oldValue: '1985-13-45', newValue: '', status: 'error' },
      { field: 'Số điện thoại', oldValue: '09123abc45', newValue: '', status: 'error' },
    ],
    action: 'Validation',
    rule: 'Validation - Kiểm tra định dạng dữ liệu',
    status: 'error',
    message: 'Lỗi: Dữ liệu không hợp lệ ở 2 trường',
    details: 'Ngày sinh không đúng định dạng (tháng 13 không tồn tại), số điện thoại chứa ký tự không hợp lệ.',
    user: 'Nguyễn Văn A',
    sourceName: 'Cơ sở dữ liệu đấu giá viên',
  },
  {
    id: '5',
    timestamp: '08/12/2024 08:35:23',
    recordId: 'DGV-2024-001527',
    recordData: [
      { field: 'Họ và tên', oldValue: 'Phạm Thị D', newValue: 'Phạm Thị D', status: 'success' },
      { field: 'Số thẻ đấu giá viên', oldValue: '', newValue: 'DGV-001527', status: 'info' },
      { field: 'Ngày cấp thẻ', oldValue: '', newValue: '08/12/2024', status: 'info' },
    ],
    action: 'Bổ sung dữ liệu',
    rule: 'Transform - Tự động sinh số thẻ',
    status: 'info',
    message: 'Đã tự động sinh số thẻ đấu giá viên',
    details: 'Áp dụng quy tắc tự động: Sinh mã thẻ theo format DGV-XXXXXX dựa trên ID bản ghi.',
    user: 'Nguyễn Văn A',
    sourceName: 'Cơ sở dữ liệu đấu giá viên',
  },
  {
    id: '6',
    timestamp: '08/12/2024 07:20:30',
    recordId: 'CCV-2024-002341',
    recordData: [
      { field: 'Họ và tên', oldValue: 'HOANG THI E', newValue: 'Hoàng Thị E', status: 'success' },
      { field: 'Số thẻ CC', oldValue: 'CC 001234', newValue: 'CC-001234', status: 'success' },
      { field: 'Trạng thái', oldValue: 'HOAT_DONG', newValue: 'Hoạt động', status: 'success' },
    ],
    action: 'Chuẩn hóa dữ liệu',
    rule: 'Format - Chuẩn hóa thông tin công chứng viên',
    status: 'success',
    message: 'Xử lý thành công - 3 trường được chuẩn hóa',
    details: 'Chuẩn hóa tên, số thẻ và trạng thái theo định dạng chuẩn.',
    user: 'Trần Thị B',
    sourceName: 'Thông tin công chứng viên',
  },
  {
    id: '7',
    timestamp: '08/12/2024 06:15:45',
    recordId: 'TGPL-2024-015678',
    recordData: [
      { field: 'Mã hồ sơ', oldValue: 'HS-15678', newValue: 'HS-15678', status: 'success' },
      { field: 'Đối tượng thụ hưởng', oldValue: '', newValue: '', status: 'error' },
      { field: 'Loại vụ việc', oldValue: 'Dan_su', newValue: 'Dân sự', status: 'success' },
    ],
    action: 'Kiểm tra dữ liệu bắt buộc',
    rule: 'Validation - Kiểm tra trường bắt buộc',
    status: 'error',
    message: 'Lỗi: Thiếu thông tin đối tượng thụ hưởng',
    details: 'Trường "Đối tượng thụ hưởng" là bắt buộc nhưng đang để trống. Cần bổ sung thông tin.',
    user: 'Lê Văn C',
    sourceName: 'Hồ sơ trợ giúp pháp lý',
  },
];

export function DetailedLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  const filteredLogs = mockLogs.filter(log => {
    const matchSearch = 
      log.recordId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.sourceName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = filterStatus === 'all' || log.status === filterStatus;
    
    return matchSearch && matchStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> Thành công
        </span>;
      case 'error':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs flex items-center gap-1">
          <XCircle className="w-3 h-3" /> Lỗi
        </span>;
      case 'warning':
        return <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> Cảnh báo
        </span>;
      case 'info':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs flex items-center gap-1">
          <Info className="w-3 h-3" /> Thông tin
        </span>;
      default:
        return null;
    }
  };

  const statusCounts = {
    all: mockLogs.length,
    success: mockLogs.filter(l => l.status === 'success').length,
    error: mockLogs.filter(l => l.status === 'error').length,
    warning: mockLogs.filter(l => l.status === 'warning').length,
    info: mockLogs.filter(l => l.status === 'info').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-slate-900 mb-1">Log chi tiết từng bản ghi</h3>
          <p className="text-sm text-slate-600">
            Theo dõi chi tiết quá trình xử lý từng bản ghi dữ liệu
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          Xuất log
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
            filterStatus === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Tất cả ({statusCounts.all})
        </button>
        <button
          onClick={() => setFilterStatus('success')}
          className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
            filterStatus === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Thành công ({statusCounts.success})
        </button>
        <button
          onClick={() => setFilterStatus('error')}
          className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
            filterStatus === 'error'
              ? 'bg-red-600 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Lỗi ({statusCounts.error})
        </button>
        <button
          onClick={() => setFilterStatus('warning')}
          className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
            filterStatus === 'warning'
              ? 'bg-orange-600 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Cảnh báo ({statusCounts.warning})
        </button>
        <button
          onClick={() => setFilterStatus('info')}
          className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
            filterStatus === 'info'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Thông tin ({statusCounts.info})
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Tìm kiếm theo mã bản ghi, thông báo, nguồn dữ liệu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Logs Timeline */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-600">
            Hiển thị <span className="text-slate-900">{filteredLogs.length}</span> bản ghi
          </p>
        </div>
        
        <div className="divide-y divide-slate-100">
          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Không tìm thấy log</p>
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                onClick={() => setSelectedLog(log)}
                className="p-4 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    {getStatusIcon(log.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-slate-900">
                          Bản ghi: <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">{log.recordId}</span>
                        </span>
                        {getStatusBadge(log.status)}
                      </div>
                      <p className="text-sm text-slate-600 mb-1">{log.message}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {log.timestamp}
                        </span>
                        <span>{log.sourceName}</span>
                        <span>{log.user}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 ml-2" />
                </div>
                
                <div className="ml-7 pl-3 border-l-2 border-slate-200">
                  <p className="text-xs text-slate-600 mb-2">
                    <span className="text-blue-600">Quy tắc:</span> {log.rule}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {log.recordData.slice(0, 3).map((field, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded ${
                          field.status === 'success' ? 'bg-green-50 text-green-700' :
                          field.status === 'error' ? 'bg-red-50 text-red-700' :
                          field.status === 'warning' ? 'bg-orange-50 text-orange-700' :
                          'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {field.field}
                      </span>
                    ))}
                    {log.recordData.length > 3 && (
                      <span className="text-xs text-slate-500">
                        +{log.recordData.length - 3} trường khác
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-900 mb-1">Chi tiết log xử lý</h3>
                  <p className="text-sm text-slate-600">Mã bản ghi: {selectedLog.recordId}</p>
                </div>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Status & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-2">Trạng thái</label>
                    {getStatusBadge(selectedLog.status)}
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-1">Thời gian</label>
                    <p className="text-sm text-slate-900">{selectedLog.timestamp}</p>
                  </div>
                </div>

                {/* Source & User */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-1">Nguồn dữ liệu</label>
                    <p className="text-sm text-slate-900">{selectedLog.sourceName}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-1">Người thực hiện</label>
                    <p className="text-sm text-slate-900">{selectedLog.user}</p>
                  </div>
                </div>

                {/* Action & Rule */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-1">Hành động</label>
                    <p className="text-sm text-slate-900">{selectedLog.action}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-1">Quy tắc áp dụng</label>
                    <p className="text-sm text-blue-600">{selectedLog.rule}</p>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-2">Thông báo</label>
                  <div className={`p-4 rounded-lg border ${
                    selectedLog.status === 'success' ? 'bg-green-50 border-green-200' :
                    selectedLog.status === 'error' ? 'bg-red-50 border-red-200' :
                    selectedLog.status === 'warning' ? 'bg-orange-50 border-orange-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    <p className="text-sm text-slate-900">{selectedLog.message}</p>
                  </div>
                </div>

                {/* Details */}
                {selectedLog.details && (
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-2">Chi tiết</label>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-700">{selectedLog.details}</p>
                    </div>
                  </div>
                )}

                {/* Field Changes */}
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-3">Thay đổi dữ liệu ({selectedLog.recordData.length} trường)</label>
                  <div className="space-y-3">
                    {selectedLog.recordData.map((field, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          field.status === 'success' ? 'bg-green-50 border-green-200' :
                          field.status === 'error' ? 'bg-red-50 border-red-200' :
                          field.status === 'warning' ? 'bg-orange-50 border-orange-200' :
                          'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-900">{field.field}</span>
                          {getStatusBadge(field.status)}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Giá trị cũ:</p>
                            <p className={`font-mono p-2 rounded ${
                              field.oldValue ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-400 italic'
                            }`}>
                              {field.oldValue || '(Trống)'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Giá trị mới:</p>
                            <p className={`font-mono p-2 rounded ${
                              field.newValue ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-400 italic'
                            }`}>
                              {field.newValue || '(Trống)'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
