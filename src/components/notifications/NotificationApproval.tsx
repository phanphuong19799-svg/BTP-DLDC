import { CheckCircle, XCircle, Clock, User, Calendar, AlertCircle, Eye, Filter, Search } from 'lucide-react';
import { useState } from 'react';

interface ApprovalRequest {
  id: string;
  type: string;
  requester: string;
  requestTime: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  approver?: string;
  approvalTime?: string;
  rejectReason?: string;
}

const mockRequests: ApprovalRequest[] = [
  {
    id: 'REQ001',
    type: 'Import dữ liệu',
    requester: 'Nguyễn Văn A',
    requestTime: '10/12/2024 09:30',
    priority: 'high',
    description: 'Import 5000 bản ghi dữ liệu hộ tịch từ file Excel',
    status: 'pending'
  },
  {
    id: 'REQ002',
    type: 'Xóa dữ liệu',
    requester: 'Trần Thị B',
    requestTime: '10/12/2024 08:15',
    priority: 'high',
    description: 'Xóa 150 bản ghi dữ liệu trùng lặp trong CSDL quốc tịch',
    status: 'pending'
  },
  {
    id: 'REQ003',
    type: 'Thay đổi cấu hình',
    requester: 'Lê Văn C',
    requestTime: '10/12/2024 07:45',
    priority: 'medium',
    description: 'Cập nhật quy tắc xử lý dữ liệu cho module công chứng',
    status: 'pending'
  },
  {
    id: 'REQ004',
    type: 'Cấp quyền truy cập',
    requester: 'Phạm Thị D',
    requestTime: '09/12/2024 16:20',
    priority: 'low',
    description: 'Cấp quyền xem báo cáo cho nhân viên mới',
    status: 'approved',
    approver: 'Admin',
    approvalTime: '09/12/2024 16:45'
  },
  {
    id: 'REQ005',
    type: 'Export dữ liệu',
    requester: 'Hoàng Văn E',
    requestTime: '09/12/2024 14:00',
    priority: 'medium',
    description: 'Export toàn bộ dữ liệu văn bản pháp luật năm 2024',
    status: 'rejected',
    approver: 'Admin',
    approvalTime: '09/12/2024 14:30',
    rejectReason: 'Cần bổ sung mục đích sử dụng dữ liệu'
  },
];

export function NotificationApproval() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [requests, setRequests] = useState(mockRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const filteredRequests = requests.filter(req => {
    const matchStatus = req.status === activeTab;
    const matchSearch = req.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       req.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       req.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPriority = filterPriority === 'all' || req.priority === filterPriority;
    return matchStatus && matchSearch && matchPriority;
  });

  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      high: { label: 'Cao', className: 'bg-red-100 text-red-700' },
      medium: { label: 'Trung bình', className: 'bg-yellow-100 text-yellow-700' },
      low: { label: 'Thấp', className: 'bg-green-100 text-green-700' }
    };
    const badge = badges[priority as keyof typeof badges];
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${badge.className}`}>
        {badge.label}
      </span>
    );
  };

  const handleApprove = (request: ApprovalRequest) => {
    setRequests(prev => prev.map(r => 
      r.id === request.id 
        ? { ...r, status: 'approved' as const, approver: 'Admin', approvalTime: new Date().toLocaleString('vi-VN') }
        : r
    ));
    setShowDetailModal(false);
    alert(`Đã duyệt yêu cầu ${request.id}`);
  };

  const handleReject = (request: ApprovalRequest) => {
    if (!rejectReason.trim()) {
      alert('Vui lòng nhập lý do từ chối');
      return;
    }
    setRequests(prev => prev.map(r => 
      r.id === request.id 
        ? { ...r, status: 'rejected' as const, approver: 'Admin', approvalTime: new Date().toLocaleString('vi-VN'), rejectReason }
        : r
    ));
    setShowDetailModal(false);
    setRejectReason('');
    alert(`Đã từ chối yêu cầu ${request.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Duyệt yêu cầu</h1>
        <p className="text-slate-600 mt-1">Quản lý workflow duyệt các yêu cầu trong hệ thống</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-600 text-sm">Chờ duyệt</div>
              <div className="text-slate-900 mt-1">{stats.pending}</div>
            </div>
            <div className="relative">
              <Clock className="w-8 h-8 text-orange-600" />
              {stats.pending > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {stats.pending}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-600 text-sm">Đã duyệt</div>
              <div className="text-slate-900 mt-1">{stats.approved}</div>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-600 text-sm">Từ chối</div>
              <div className="text-slate-900 mt-1">{stats.rejected}</div>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-slate-200 rounded-lg">
        <div className="border-b border-slate-200 px-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-3 border-b-2 transition-colors relative ${
                activeTab === 'pending'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Chờ duyệt
              {stats.pending > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {stats.pending}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`py-3 border-b-2 transition-colors ${
                activeTab === 'approved'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Đã duyệt
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`py-3 border-b-2 transition-colors ${
                activeTab === 'rejected'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Từ chối
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo loại, người yêu cầu, mô tả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tất cả mức độ</option>
              <option value="high">Cao</option>
              <option value="medium">Trung bình</option>
              <option value="low">Thấp</option>
            </select>
          </div>
        </div>

        {/* Requests List */}
        <div className="divide-y divide-slate-200">
          {filteredRequests.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              Không có yêu cầu nào
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-slate-900">{request.type}</span>
                      {getPriorityBadge(request.priority)}
                      <span className="text-slate-500 text-sm">#{request.id}</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{request.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {request.requester}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {request.requestTime}
                      </div>
                      {request.approver && (
                        <>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {request.approver}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {request.approvalTime}
                          </div>
                        </>
                      )}
                    </div>
                    {request.rejectReason && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                        <strong>Lý do từ chối:</strong> {request.rejectReason}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowDetailModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowDetailModal(true);
                          }}
                          className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          Duyệt
                        </button>
                        <button
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowDetailModal(true);
                          }}
                          className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          Từ chối
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-slate-900">Chi tiết yêu cầu #{selectedRequest.id}</h2>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setRejectReason('');
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-slate-600 text-sm mb-1">Loại yêu cầu</div>
                  <div className="text-slate-900">{selectedRequest.type}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Mức độ ưu tiên</div>
                  <div>{getPriorityBadge(selectedRequest.priority)}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Người yêu cầu</div>
                  <div className="text-slate-900">{selectedRequest.requester}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Thời gian yêu cầu</div>
                  <div className="text-slate-900">{selectedRequest.requestTime}</div>
                </div>
              </div>

              <div>
                <div className="text-slate-600 text-sm mb-1">Mô tả chi tiết</div>
                <div className="p-3 bg-slate-50 rounded-lg text-slate-900">
                  {selectedRequest.description}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="text-slate-700 mb-2">Lịch sử thay đổi</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
                    <div>
                      <div className="text-slate-900">{selectedRequest.requestTime}</div>
                      <div className="text-slate-600">Yêu cầu được tạo bởi {selectedRequest.requester}</div>
                    </div>
                  </div>
                  {selectedRequest.approvalTime && (
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${selectedRequest.status === 'approved' ? 'bg-green-600' : 'bg-red-600'}`}></div>
                      <div>
                        <div className="text-slate-900">{selectedRequest.approvalTime}</div>
                        <div className="text-slate-600">
                          {selectedRequest.status === 'approved' ? 'Đã duyệt' : 'Đã từ chối'} bởi {selectedRequest.approver}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedRequest.status === 'pending' && (
                <div className="border-t border-slate-200 pt-4">
                  <label className="block text-slate-700 mb-2">Lý do từ chối (nếu từ chối)</label>
                  <textarea
                    rows={3}
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Nhập lý do từ chối..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
            </div>

            {selectedRequest.status === 'pending' && (
              <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setRejectReason('');
                  }}
                  className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={() => handleReject(selectedRequest)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Từ chối
                </button>
                <button
                  onClick={() => handleApprove(selectedRequest)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Duyệt yêu cầu
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
