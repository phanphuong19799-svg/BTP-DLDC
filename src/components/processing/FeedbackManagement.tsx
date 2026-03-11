import { useState } from 'react';
import { Send, CheckCircle, Clock, XCircle, AlertTriangle, Eye, RefreshCw, Filter, Search } from 'lucide-react';

interface FeedbackRecord {
  id: string;
  sourceName: string;
  department: string;
  recordId: string;
  issueType: string;
  issueDescription: string;
  feedbackSent: string;
  status: 'sent' | 'waiting' | 'resolved' | 'rejected';
  responseDate?: string;
  responseNote?: string;
  dataBeforeFix?: any;
  dataAfterFix?: any;
  priority: 'high' | 'medium' | 'low';
}

const mockFeedbacks: FeedbackRecord[] = [
  {
    id: 'FB-001',
    sourceName: 'Dữ liệu dân cư quốc gia',
    department: 'Bộ Công an - Cục Cảnh sát QLHC',
    recordId: 'DC-2024-012345',
    issueType: 'Dữ liệu không hợp lệ',
    issueDescription: 'Mã tỉnh/thành "TP99" không tồn tại trong danh mục chuẩn. Cần kiểm tra và cập nhật.',
    feedbackSent: '07/12/2024 10:30:00',
    status: 'resolved',
    responseDate: '08/12/2024 08:15:00',
    responseNote: 'Đã cập nhật mã tỉnh/thành thành "01" (Hà Nội). Dữ liệu đã được đồng bộ lại.',
    dataBeforeFix: { provinceCode: 'TP99', provinceName: '' },
    dataAfterFix: { provinceCode: '01', provinceName: 'Hà Nội' },
    priority: 'high',
  },
  {
    id: 'FB-002',
    sourceName: 'Đăng ký doanh nghiệp',
    department: 'Bộ Kế hoạch và Đầu tư',
    recordId: 'DN-2024-067890',
    issueType: 'Thiếu thông tin bắt buộc',
    issueDescription: 'Trường "Mã số thuế" đang để trống trong khi đây là trường bắt buộc theo quy định.',
    feedbackSent: '07/12/2024 14:20:00',
    status: 'waiting',
    priority: 'high',
  },
  {
    id: 'FB-003',
    sourceName: 'Hệ thống thuế',
    department: 'Tổng cục Thuế - Bộ Tài chính',
    recordId: 'TAX-2024-098765',
    issueType: 'Định dạng không đúng',
    issueDescription: 'Số điện thoại "09123abc45" chứa ký tự không hợp lệ. Yêu cầu chỉ chứa số và dấu +.',
    feedbackSent: '07/12/2024 16:45:00',
    status: 'sent',
    priority: 'medium',
  },
  {
    id: 'FB-004',
    sourceName: 'Bảo hiểm xã hội',
    department: 'Bảo hiểm xã hội Việt Nam',
    recordId: 'BHXH-2024-054321',
    issueType: 'Dữ liệu trùng lặp',
    issueDescription: 'Phát hiện 2 bản ghi có cùng CMND/CCCD "001088012345" nhưng thông tin khác nhau.',
    feedbackSent: '06/12/2024 11:00:00',
    status: 'resolved',
    responseDate: '07/12/2024 09:30:00',
    responseNote: 'Đã xác minh và gộp 2 bản ghi. Giữ lại bản ghi mới nhất, cập nhật thông tin từ bản ghi cũ.',
    priority: 'high',
  },
  {
    id: 'FB-005',
    sourceName: 'Đăng ký doanh nghiệp',
    department: 'Bộ Kế hoạch và Đầu tư',
    recordId: 'DN-2024-045678',
    issueType: 'Vi phạm ràng buộc tham chiếu',
    issueDescription: 'Mã ngành nghề "VNACCS-999" không có trong danh mục ngành nghề kinh doanh.',
    feedbackSent: '06/12/2024 08:30:00',
    status: 'rejected',
    responseDate: '06/12/2024 15:20:00',
    responseNote: 'Mã ngành nghề này đã được ngừng sử dụng từ 2023. Vui lòng cập nhật sang mã mới trong hệ thống DLDC.',
    priority: 'medium',
  },
  {
    id: 'FB-006',
    sourceName: 'Dữ liệu dân cư quốc gia',
    department: 'Bộ Công an - Cục Cảnh sát QLHC',
    recordId: 'DC-2024-078901',
    issueType: 'Giá trị ngoại lệ',
    issueDescription: 'Ngày sinh "1885-03-15" có vẻ không hợp lý (139 tuổi). Cần kiểm tra lại.',
    feedbackSent: '08/12/2024 09:15:00',
    status: 'sent',
    priority: 'low',
  },
];

export function FeedbackManagement() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackRecord | null>(null);

  const filteredFeedbacks = mockFeedbacks.filter(fb => {
    const matchStatus = filterStatus === 'all' || fb.status === filterStatus;
    const matchSearch = 
      fb.sourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.recordId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.issueDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Đã xử lý
          </span>
        );
      case 'waiting':
        return (
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs flex items-center gap-1">
            <Clock className="w-3 h-3 animate-pulse" /> Đang chờ
          </span>
        );
      case 'sent':
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1">
            <Send className="w-3 h-3" /> Đã gửi
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1">
            <XCircle className="w-3 h-3" /> Từ chối
          </span>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs">Cao</span>;
      case 'medium':
        return <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded text-xs">Trung bình</span>;
      case 'low':
        return <span className="px-2 py-1 bg-yellow-50 text-yellow-600 rounded text-xs">Thấp</span>;
      default:
        return null;
    }
  };

  const statusCounts = {
    all: mockFeedbacks.length,
    sent: mockFeedbacks.filter(f => f.status === 'sent').length,
    waiting: mockFeedbacks.filter(f => f.status === 'waiting').length,
    resolved: mockFeedbacks.filter(f => f.status === 'resolved').length,
    rejected: mockFeedbacks.filter(f => f.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-slate-900 mb-1">Quản lý phản hồi hệ thống nguồn</h3>
          <p className="text-sm text-slate-600">
            Gửi phản hồi về dữ liệu không đạt yêu cầu và theo dõi xử lý
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <RefreshCw className="w-4 h-4" />
          Làm mới
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-600 mb-1">Tổng phản hồi</p>
          <p className="text-2xl text-slate-900">{statusCounts.all}</p>
        </div>
        <div className="bg-white rounded-lg border border-blue-200 p-4">
          <p className="text-sm text-blue-600 mb-1">Đã gửi</p>
          <p className="text-2xl text-blue-900">{statusCounts.sent}</p>
        </div>
        <div className="bg-white rounded-lg border border-orange-200 p-4">
          <p className="text-sm text-orange-600 mb-1">Đang chờ</p>
          <p className="text-2xl text-orange-900">{statusCounts.waiting}</p>
        </div>
        <div className="bg-white rounded-lg border border-green-200 p-4">
          <p className="text-sm text-green-600 mb-1">Đã xử lý</p>
          <p className="text-2xl text-green-900">{statusCounts.resolved}</p>
        </div>
        <div className="bg-white rounded-lg border border-red-200 p-4">
          <p className="text-sm text-red-600 mb-1">Từ chối</p>
          <p className="text-2xl text-red-900">{statusCounts.rejected}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm theo nguồn, mã bản ghi, mô tả vấn đề..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filterStatus === 'all'
                ? 'bg-slate-900 text-white'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Tất cả ({statusCounts.all})
          </button>
          <button
            onClick={() => setFilterStatus('sent')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filterStatus === 'sent'
                ? 'bg-blue-600 text-white'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đã gửi ({statusCounts.sent})
          </button>
          <button
            onClick={() => setFilterStatus('waiting')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filterStatus === 'waiting'
                ? 'bg-orange-600 text-white'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đang chờ ({statusCounts.waiting})
          </button>
          <button
            onClick={() => setFilterStatus('resolved')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filterStatus === 'resolved'
                ? 'bg-green-600 text-white'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đã xử lý ({statusCounts.resolved})
          </button>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Mã phản hồi</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Nguồn dữ liệu</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Mã bản ghi</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Loại vấn đề</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Độ ưu tiên</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Thời gian gửi</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Trạng thái</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFeedbacks.map((feedback) => (
                <tr key={feedback.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-blue-600">{feedback.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-900">{feedback.sourceName}</p>
                    <p className="text-xs text-slate-500">{feedback.department}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-slate-900">{feedback.recordId}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-900">{feedback.issueType}</span>
                  </td>
                  <td className="px-4 py-3">
                    {getPriorityBadge(feedback.priority)}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-600">{feedback.feedbackSent}</p>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(feedback.status)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedFeedback(feedback)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-900 mb-1">Chi tiết phản hồi - {selectedFeedback.id}</h3>
                  <p className="text-sm text-slate-600">{selectedFeedback.sourceName}</p>
                </div>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Status & Priority */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-2">Trạng thái</label>
                    {getStatusBadge(selectedFeedback.status)}
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-2">Độ ưu tiên</label>
                    {getPriorityBadge(selectedFeedback.priority)}
                  </div>
                </div>

                {/* Source Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-1">Nguồn dữ liệu</label>
                    <p className="text-sm text-slate-900">{selectedFeedback.sourceName}</p>
                    <p className="text-xs text-slate-600">{selectedFeedback.department}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-1">Mã bản ghi</label>
                    <p className="text-sm text-slate-900 font-mono">{selectedFeedback.recordId}</p>
                  </div>
                </div>

                {/* Issue Details */}
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-2">Loại vấn đề</label>
                  <p className="text-sm text-slate-900 mb-2">{selectedFeedback.issueType}</p>
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-700">{selectedFeedback.issueDescription}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-2">Thời gian</label>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4 text-blue-600" />
                      <span className="text-slate-600">Gửi phản hồi:</span>
                      <span className="text-slate-900">{selectedFeedback.feedbackSent}</span>
                    </div>
                    {selectedFeedback.responseDate && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-slate-600">Phản hồi từ nguồn:</span>
                        <span className="text-slate-900">{selectedFeedback.responseDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Response Note */}
                {selectedFeedback.responseNote && (
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-2">Ghi chú phản hồi</label>
                    <div className={`p-4 rounded-lg border ${
                      selectedFeedback.status === 'resolved'
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <p className="text-sm text-slate-700">{selectedFeedback.responseNote}</p>
                    </div>
                  </div>
                )}

                {/* Data Comparison */}
                {selectedFeedback.dataBeforeFix && selectedFeedback.dataAfterFix && (
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-3">So sánh dữ liệu</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-600 mb-2">Trước khi sửa:</p>
                        <div className="p-3 bg-red-50 border border-red-200 rounded font-mono text-xs">
                          <pre>{JSON.stringify(selectedFeedback.dataBeforeFix, null, 2)}</pre>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-2">Sau khi sửa:</p>
                        <div className="p-3 bg-green-50 border border-green-200 rounded font-mono text-xs">
                          <pre>{JSON.stringify(selectedFeedback.dataAfterFix, null, 2)}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex gap-2">
                {selectedFeedback.status === 'sent' && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    <Clock className="w-4 h-4" />
                    Nhắc nhở
                  </button>
                )}
              </div>
              <button
                onClick={() => setSelectedFeedback(null)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-slate-900 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-blue-600" />
          Quy trình phản hồi hệ thống nguồn
        </h4>
        <div className="grid grid-cols-4 gap-4 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">1</div>
            <p>Phát hiện dữ liệu không đạt yêu cầu</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">2</div>
            <p>Gửi phản hồi tới hệ thống nguồn</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">3</div>
            <p>Hệ thống nguồn xử lý và phản hồi</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">4</div>
            <p>Đồng bộ lại dữ liệu đã sửa</p>
          </div>
        </div>
      </div>
    </div>
  );
}
