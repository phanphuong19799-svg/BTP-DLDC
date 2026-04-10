import { useState } from 'react';
import { CheckCircle, Clock, AlertTriangle, Search, Filter, Download, RefreshCw, Eye, XCircle, Play } from 'lucide-react';

interface ProcessingRecord {
  id: string;
  sourceName: string;
  sourceType: string;
  startTime: string;
  endTime?: string;
  duration?: string;
  totalRecords: number;
  processedRecords: number;
  successRecords?: number;
  errorRecords?: number;
  status: 'completed' | 'running' | 'error';
  progress?: number;
  errorMessage?: string;
  rulesApplied?: number;
  user: string;
}

const mockCompletedData: ProcessingRecord[] = [
  {
    id: '1',
    sourceName: 'Cơ sở dữ liệu đấu giá viên',
    sourceType: 'Cục Đăng ký quốc gia giao dịch bảo đảm',
    startTime: '08/12/2024 08:30:00',
    endTime: '08/12/2024 08:45:23',
    duration: '15 phút 23 giây',
    totalRecords: 15420,
    processedRecords: 15420,
    successRecords: 15380,
    errorRecords: 40,
    status: 'completed',
    progress: 100,
    rulesApplied: 12,
    user: 'Nguyễn Văn A',
  },
  {
    id: '2',
    sourceName: 'Thông tin công chứng viên',
    sourceType: 'Cục Công chứng',
    startTime: '08/12/2024 07:15:00',
    endTime: '08/12/2024 07:28:45',
    duration: '13 phút 45 giây',
    totalRecords: 8750,
    processedRecords: 8750,
    successRecords: 8750,
    errorRecords: 0,
    status: 'completed',
    progress: 100,
    rulesApplied: 8,
    user: 'Trần Thị B',
  },
  {
    id: '3',
    sourceName: 'Hồ sơ trợ giúp pháp lý',
    sourceType: 'Cục Trợ giúp pháp lý',
    startTime: '08/12/2024 06:00:00',
    endTime: '08/12/2024 06:32:10',
    duration: '32 phút 10 giây',
    totalRecords: 23450,
    processedRecords: 23450,
    successRecords: 23120,
    errorRecords: 330,
    status: 'completed',
    progress: 100,
    rulesApplied: 15,
    user: 'Lê Văn C',
  },
  {
    id: '4',
    sourceName: 'Hợp đồng công chứng',
    sourceType: 'Cục Công chứng',
    startTime: '07/12/2024 14:20:00',
    endTime: '07/12/2024 15:05:33',
    duration: '45 phút 33 giây',
    totalRecords: 45200,
    processedRecords: 45200,
    successRecords: 44980,
    errorRecords: 220,
    status: 'completed',
    progress: 100,
    rulesApplied: 18,
    user: 'Phạm Thị D',
  },
];

const mockRunningData: ProcessingRecord[] = [
  {
    id: '5',
    sourceName: 'Văn bản quy phạm pháp luật',
    sourceType: 'Cục Kiểm soát TTHC',
    startTime: '08/12/2024 10:15:00',
    totalRecords: 125000,
    processedRecords: 78500,
    status: 'running',
    progress: 63,
    rulesApplied: 22,
    user: 'Hoàng Văn E',
  },
  {
    id: '6',
    sourceName: 'Thống kê ngành Tư pháp',
    sourceType: 'Vụ Kế hoạch - Tài chính',
    startTime: '08/12/2024 09:45:00',
    totalRecords: 53000,
    processedRecords: 21200,
    status: 'running',
    progress: 40,
    rulesApplied: 10,
    user: 'Đỗ Thị F',
  },
  {
    id: '7',
    sourceName: 'Đăng ký kinh doanh',
    sourceType: 'Cục Đăng ký quốc gia giao dịch bảo đảm',
    startTime: '08/12/2024 10:30:00',
    totalRecords: 98000,
    processedRecords: 9800,
    status: 'running',
    progress: 10,
    rulesApplied: 14,
    user: 'Vũ Văn G',
  },
];

const mockErrorData: ProcessingRecord[] = [
  {
    id: '8',
    sourceName: 'Dữ liệu hộ tịch',
    sourceType: 'Cục Hộ tịch, quốc tịch, chứng thực',
    startTime: '08/12/2024 08:00:00',
    endTime: '08/12/2024 08:05:12',
    duration: '5 phút 12 giây',
    totalRecords: 67000,
    processedRecords: 3200,
    status: 'error',
    errorMessage: 'Lỗi kết nối cơ sở dữ liệu nguồn - Timeout after 5 minutes',
    rulesApplied: 9,
    user: 'Bùi Thị H',
  },
  {
    id: '9',
    sourceName: 'Thông tin luật sư',
    sourceType: 'Liên đoàn Luật sư Việt Nam',
    startTime: '07/12/2024 16:30:00',
    endTime: '07/12/2024 16:31:45',
    duration: '1 phút 45 giây',
    totalRecords: 18500,
    processedRecords: 450,
    status: 'error',
    errorMessage: 'Dữ liệu không đúng định dạng - Thiếu trường bắt buộc: Số thẻ luật sư',
    rulesApplied: 7,
    user: 'Đinh Văn I',
  },
  {
    id: '10',
    sourceName: 'Tổ chức hành nghề công chứng',
    sourceType: 'Cục Công chứng',
    startTime: '07/12/2024 11:20:00',
    endTime: '07/12/2024 11:25:30',
    duration: '5 phút 30 giây',
    totalRecords: 2300,
    processedRecords: 1150,
    status: 'error',
    errorMessage: 'Vi phạm ràng buộc khóa ngoại - Mã tỉnh/thành không tồn tại trong danh mục',
    rulesApplied: 6,
    user: 'Ngô Thị K',
  },
];

type TabType = 'completed' | 'running' | 'error';

export function DataProcessingStatus() {
  const [activeTab, setActiveTab] = useState<TabType>('running');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<ProcessingRecord | null>(null);

  const getCurrentData = () => {
    switch (activeTab) {
      case 'completed': return mockCompletedData;
      case 'running': return mockRunningData;
      case 'error': return mockErrorData;
      default: return [];
    }
  };

  const filteredData = getCurrentData().filter(record =>
    record.sourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.sourceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> Hoàn thành
        </span>;
      case 'running':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 flex items-center gap-1">
          <Clock className="w-3 h-3" /> Đang chạy
        </span>;
      case 'error':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700 flex items-center gap-1">
          <XCircle className="w-3 h-3" /> Lỗi
        </span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex items-center justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <RefreshCw className="w-4 h-4" />
          Làm mới
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveTab('completed')}
          className={`bg-white rounded-lg border-2 p-4 text-left transition-all ${
            activeTab === 'completed' ? 'border-green-500 shadow-md' : 'border-slate-200 hover:border-green-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl text-slate-900">{mockCompletedData.length}</p>
              <p className="text-xs text-slate-600">Đã hoàn thành</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              {mockCompletedData.reduce((sum, r) => sum + (r.successRecords || 0), 0).toLocaleString()} bản ghi thành công
            </p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('running')}
          className={`bg-white rounded-lg border-2 p-4 text-left transition-all ${
            activeTab === 'running' ? 'border-blue-500 shadow-md' : 'border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600 animate-pulse" />
            </div>
            <div>
              <p className="text-2xl text-slate-900">{mockRunningData.length}</p>
              <p className="text-xs text-slate-600">Đang chạy</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              {mockRunningData.reduce((sum, r) => sum + r.processedRecords, 0).toLocaleString()} / {mockRunningData.reduce((sum, r) => sum + r.totalRecords, 0).toLocaleString()} bản ghi
            </p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('error')}
          className={`bg-white rounded-lg border-2 p-4 text-left transition-all ${
            activeTab === 'error' ? 'border-red-500 shadow-md' : 'border-slate-200 hover:border-red-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl text-slate-900">{mockErrorData.length}</p>
              <p className="text-xs text-slate-600">Lỗi xử lý</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500">Cần xem xét và xử lý</p>
          </div>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên nguồn, loại nguồn, người thực hiện..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4 text-slate-600" />
          Lọc
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4 text-slate-600" />
          Xuất báo cáo
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                  Nguồn dữ liệu
                </th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                  Tiến độ
                </th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                  Quy tắc
                </th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                  Người thực hiện
                </th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">Không tìm thấy dữ liệu</p>
                  </td>
                </tr>
              ) : (
                filteredData.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm text-slate-900">{record.sourceName}</p>
                        <p className="text-xs text-slate-500">{record.sourceType}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <p className="text-slate-900">Bắt đầu: {record.startTime}</p>
                        {record.endTime && (
                          <p className="text-slate-500 text-xs">Kết thúc: {record.endTime}</p>
                        )}
                        {record.duration && (
                          <p className="text-blue-600 text-xs">Thời gian: {record.duration}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm text-slate-900">
                            {record.processedRecords.toLocaleString()} / {record.totalRecords.toLocaleString()}
                          </p>
                          {record.progress !== undefined && (
                            <span className="text-xs text-blue-600">{record.progress}%</span>
                          )}
                        </div>
                        {record.progress !== undefined && (
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                record.status === 'completed' ? 'bg-green-600' :
                                record.status === 'running' ? 'bg-blue-600' :
                                'bg-red-600'
                              }`}
                              style={{ width: `${record.progress}%` }}
                            />
                          </div>
                        )}
                        {record.successRecords !== undefined && (
                          <div className="mt-1 flex gap-3 text-xs">
                            <span className="text-green-600">✓ {record.successRecords.toLocaleString()}</span>
                            {record.errorRecords !== undefined && record.errorRecords > 0 && (
                              <span className="text-red-600">✗ {record.errorRecords.toLocaleString()}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                        {record.rulesApplied} quy tắc
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-slate-900">{record.user}</p>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(record.status)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedRecord(record)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                      >
                        <Eye className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between bg-slate-50">
            <p className="text-sm text-slate-600">
              Hiển thị {filteredData.length} kết quả
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors text-sm">
                Trước
              </button>
              <button title="Hành động" aria-label="Hành động" className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
              <button title="Hành động" aria-label="Hành động" className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors text-sm">2</button>
              <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors text-sm">
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
              <div>
                <h3 className="text-slate-900">Chi tiết xử lý dữ liệu</h3>
                <p className="text-sm text-slate-600 mt-1">{selectedRecord.sourceName}</p>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Status */}
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-2">Trạng thái</label>
                  {getStatusBadge(selectedRecord.status)}
                </div>

                {/* Source Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-1">Nguồn dữ liệu</label>
                    <p className="text-sm text-slate-900">{selectedRecord.sourceName}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-1">Loại nguồn</label>
                    <p className="text-sm text-slate-900">{selectedRecord.sourceType}</p>
                  </div>
                </div>

                {/* Time Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-1">Thời gian bắt đầu</label>
                    <p className="text-sm text-slate-900">{selectedRecord.startTime}</p>
                  </div>
                  {selectedRecord.endTime && (
                    <div>
                      <label className="block text-xs text-slate-500 uppercase mb-1">Thời gian kết thúc</label>
                      <p className="text-sm text-slate-900">{selectedRecord.endTime}</p>
                    </div>
                  )}
                </div>

                {selectedRecord.duration && (
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-1">Thời gian xử lý</label>
                    <p className="text-sm text-blue-600">{selectedRecord.duration}</p>
                  </div>
                )}

                {/* Progress */}
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-2">Tiến độ xử lý</label>
                  <div className="space-y-2">
                    {selectedRecord.progress !== undefined && (
                      <div className="w-full bg-slate-100 rounded-full h-4">
                        <div
                          className={`h-4 rounded-full flex items-center justify-center text-xs text-white transition-all ${
                            selectedRecord.status === 'completed' ? 'bg-green-600' :
                            selectedRecord.status === 'running' ? 'bg-blue-600' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${selectedRecord.progress}%` }}
                        >
                          {selectedRecord.progress}%
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-4 mt-3">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600 mb-1">Tổng số bản ghi</p>
                        <p className="text-lg text-slate-900">{selectedRecord.totalRecords.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-xs text-blue-600 mb-1">Đã xử lý</p>
                        <p className="text-lg text-blue-900">{selectedRecord.processedRecords.toLocaleString()}</p>
                      </div>
                      {selectedRecord.successRecords !== undefined && (
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="text-xs text-green-600 mb-1">Thành công</p>
                          <p className="text-lg text-green-900">{selectedRecord.successRecords.toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rules Applied */}
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-1">Quy tắc áp dụng</label>
                  <p className="text-sm text-slate-900">{selectedRecord.rulesApplied} quy tắc xử lý dữ liệu</p>
                </div>

                {/* Error Message */}
                {selectedRecord.errorMessage && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-red-900 mb-1">Thông tin lỗi:</p>
                        <p className="text-sm text-red-700">{selectedRecord.errorMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Records */}
                {selectedRecord.errorRecords !== undefined && selectedRecord.errorRecords > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-orange-900 mb-1">Bản ghi lỗi</p>
                        <p className="text-sm text-orange-700">
                          {selectedRecord.errorRecords.toLocaleString()} bản ghi gặp lỗi trong quá trình xử lý
                        </p>
                      </div>
                      <button className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                )}

                {/* User */}
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-1">Người thực hiện</label>
                  <p className="text-sm text-slate-900">{selectedRecord.user}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex gap-3">
                {selectedRecord.status === 'error' && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Play className="w-4 h-4" />
                    Chạy lại
                  </button>
                )}
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
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