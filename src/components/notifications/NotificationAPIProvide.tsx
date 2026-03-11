import { AlertTriangle, XCircle, Clock, TrendingDown, Eye, Download, Search, Filter, CheckCircle2, Activity } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface APIError {
  id: string;
  apiName: string;
  endpoint: string;
  errorType: string;
  errorMessage: string;
  partner: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  occurredAt: string;
  status: 'new' | 'in-progress' | 'resolved';
  responseCode: string;
  requestInfo?: string;
  solution?: string;
  assignedTo?: string;
}

const mockErrors: APIError[] = [
  {
    id: 'ERR001',
    apiName: 'API Tra cứu Văn bản pháp luật',
    endpoint: '/api/v1/legal-documents',
    errorType: 'Database Connection Timeout',
    errorMessage: 'Connection to database timed out after 30 seconds. Unable to fetch legal documents.',
    partner: 'Cổng TTĐT Chính phủ',
    severity: 'critical',
    occurredAt: '10/12/2024 10:45',
    status: 'in-progress',
    responseCode: '500',
    requestInfo: 'GET /api/v1/legal-documents?type=decree&year=2024',
    solution: 'Kiểm tra kết nối database, tăng connection pool size',
    assignedTo: 'Nguyễn Văn A'
  },
  {
    id: 'ERR002',
    apiName: 'API Đăng ký Kinh doanh',
    endpoint: '/api/v1/business-registry',
    errorType: 'Invalid Authentication Token',
    errorMessage: 'The provided API key is invalid or has expired.',
    partner: 'Bộ Kế hoạch & Đầu tư',
    severity: 'high',
    occurredAt: '10/12/2024 09:30',
    status: 'new',
    responseCode: '401',
    requestInfo: 'POST /api/v1/business-registry/search',
    solution: 'Liên hệ đối tác để cấp lại API key mới'
  },
  {
    id: 'ERR003',
    apiName: 'API Thông tin Công chứng',
    endpoint: '/api/v1/notary',
    errorType: 'Rate Limit Exceeded',
    errorMessage: 'Request rate limit exceeded: 5000 requests per day limit reached.',
    partner: 'Phòng Công chứng TP.HCM',
    severity: 'medium',
    occurredAt: '10/12/2024 08:15',
    status: 'resolved',
    responseCode: '429',
    requestInfo: 'GET /api/v1/notary/certificates',
    solution: 'Đã tăng rate limit lên 10000 requests/ngày',
    assignedTo: 'Trần Thị B'
  },
  {
    id: 'ERR004',
    apiName: 'API Tra cứu Văn bản pháp luật',
    endpoint: '/api/v1/legal-documents',
    errorType: 'Data Validation Error',
    errorMessage: 'Missing required field: document_type in request body.',
    partner: 'VBPL Quốc hội',
    severity: 'low',
    occurredAt: '10/12/2024 07:00',
    status: 'resolved',
    responseCode: '400',
    requestInfo: 'POST /api/v1/legal-documents/create',
    solution: 'Đã gửi email hướng dẫn API documentation cho đối tác'
  },
  {
    id: 'ERR005',
    apiName: 'API Trợ giúp Pháp lý',
    endpoint: '/api/v1/legal-aid',
    errorType: 'Internal Server Error',
    errorMessage: 'Unexpected null pointer exception in service layer.',
    partner: 'Trung tâm TGPL Hà Nội',
    severity: 'high',
    occurredAt: '09/12/2024 23:45',
    status: 'in-progress',
    responseCode: '500',
    requestInfo: 'GET /api/v1/legal-aid/cases?status=active',
    solution: 'Đang debug và fix lỗi trong code, dự kiến hoàn thành trong 2h',
    assignedTo: 'Nguyễn Văn A'
  },
];

const errorTrendData = [
  { date: '05/12', critical: 2, high: 5, medium: 8, low: 3 },
  { date: '06/12', critical: 1, high: 4, medium: 6, low: 5 },
  { date: '07/12', critical: 3, high: 7, medium: 10, low: 4 },
  { date: '08/12', critical: 1, high: 3, medium: 7, low: 2 },
  { date: '09/12', critical: 2, high: 6, medium: 9, low: 6 },
  { date: '10/12', critical: 1, high: 2, medium: 1, low: 1 },
];

const errorTypeDistribution = [
  { name: 'Database Timeout', value: 25 },
  { name: 'Authentication', value: 18 },
  { name: 'Rate Limit', value: 15 },
  { name: 'Validation Error', value: 22 },
  { name: 'Server Error', value: 20 },
];

export function NotificationAPIProvide() {
  const [errors, setErrors] = useState(mockErrors);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [selectedError, setSelectedError] = useState<APIError | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredErrors = errors.filter(err => {
    const matchSearch = err.apiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       err.errorMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       err.partner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || err.status === filterStatus;
    const matchSeverity = filterSeverity === 'all' || err.severity === filterSeverity;
    return matchSearch && matchStatus && matchSeverity;
  });

  const stats = {
    totalErrors: errors.length,
    criticalErrors: errors.filter(e => e.severity === 'critical').length,
    newErrors: errors.filter(e => e.status === 'new').length,
    resolvedErrors: errors.filter(e => e.status === 'resolved').length,
  };

  const getSeverityBadge = (severity: string) => {
    const badges = {
      critical: { label: 'Nghiêm trọng', className: 'bg-red-100 text-red-700', icon: XCircle },
      high: { label: 'Cao', className: 'bg-orange-100 text-orange-700', icon: AlertTriangle },
      medium: { label: 'Trung bình', className: 'bg-yellow-100 text-yellow-700', icon: AlertTriangle },
      low: { label: 'Thấp', className: 'bg-blue-100 text-blue-700', icon: Activity }
    };
    const badge = badges[severity as keyof typeof badges];
    const Icon = badge.icon;
    return (
      <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${badge.className}`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      new: { label: 'Mới', className: 'bg-red-100 text-red-700' },
      'in-progress': { label: 'Đang xử lý', className: 'bg-blue-100 text-blue-700' },
      resolved: { label: 'Đã giải quyết', className: 'bg-green-100 text-green-700' }
    };
    const badge = badges[status as keyof typeof badges];
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${badge.className}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Thông báo lỗi API cung cấp</h1>
        <p className="text-slate-600 mt-1">Theo dõi và xử lý các lỗi xảy ra khi cung cấp API cho đối tác</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-600 text-sm">Tổng số lỗi</div>
              <div className="text-slate-900 mt-1">{stats.totalErrors}</div>
            </div>
            <AlertTriangle className="w-8 h-8 text-slate-600" />
          </div>
        </div>
        <div className="bg-white border border-red-200 rounded-lg p-4 bg-red-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-red-700 text-sm">Lỗi nghiêm trọng</div>
              <div className="text-red-900 mt-1">{stats.criticalErrors}</div>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white border border-orange-200 rounded-lg p-4 bg-orange-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-orange-700 text-sm">Lỗi mới</div>
              <div className="text-orange-900 mt-1">{stats.newErrors}</div>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white border border-green-200 rounded-lg p-4 bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-green-700 text-sm">Đã giải quyết</div>
              <div className="text-green-900 mt-1">{stats.resolvedErrors}</div>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-slate-900 mb-4">Xu hướng lỗi theo mức độ (7 ngày)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={errorTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} name="Nghiêm trọng" />
              <Line type="monotone" dataKey="high" stroke="#f97316" strokeWidth={2} name="Cao" />
              <Line type="monotone" dataKey="medium" stroke="#eab308" strokeWidth={2} name="Trung bình" />
              <Line type="monotone" dataKey="low" stroke="#3b82f6" strokeWidth={2} name="Thấp" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-slate-900 mb-4">Phân loại lỗi (30 ngày)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsBarChart data={errorTypeDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ef4444" name="Số lỗi" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo API, thông báo lỗi, đối tác..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Tất cả mức độ</option>
            <option value="critical">Nghiêm trọng</option>
            <option value="high">Cao</option>
            <option value="medium">Trung bình</option>
            <option value="low">Thấp</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="new">Mới</option>
            <option value="in-progress">Đang xử lý</option>
            <option value="resolved">Đã giải quyết</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Errors Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Mã lỗi</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">API / Endpoint</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Loại lỗi</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Đối tác</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Mức độ</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Thời gian</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Trạng thái</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Người xử lý</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredErrors.map((error) => (
                <tr key={error.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="text-slate-900">{error.id}</div>
                    <div className="text-slate-500 text-xs mt-1">{error.responseCode}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-900 text-sm">{error.apiName}</div>
                    <div className="text-slate-500 text-xs mt-1 font-mono">{error.endpoint}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700 text-sm">{error.errorType}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700 text-sm">{error.partner}</div>
                  </td>
                  <td className="px-4 py-3">
                    {getSeverityBadge(error.severity)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700 text-sm">{error.occurredAt}</div>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(error.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700 text-sm">
                      {error.assignedTo || <span className="text-slate-400">Chưa phân công</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setSelectedError(error);
                        setShowDetailModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-slate-900">Chi tiết lỗi - {selectedError.id}</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-slate-600 text-sm mb-1">API</div>
                  <div className="text-slate-900">{selectedError.apiName}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Đối tác</div>
                  <div className="text-slate-900">{selectedError.partner}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Mức độ nghiêm trọng</div>
                  <div>{getSeverityBadge(selectedError.severity)}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Trạng thái</div>
                  <div>{getStatusBadge(selectedError.status)}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Thời gian xảy ra</div>
                  <div className="text-slate-900">{selectedError.occurredAt}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Response Code</div>
                  <div className="text-slate-900">{selectedError.responseCode}</div>
                </div>
              </div>

              <div>
                <div className="text-slate-600 text-sm mb-1">Endpoint</div>
                <div className="p-3 bg-slate-50 rounded-lg text-slate-900 font-mono text-sm">
                  {selectedError.endpoint}
                </div>
              </div>

              {selectedError.requestInfo && (
                <div>
                  <div className="text-slate-600 text-sm mb-1">Thông tin Request</div>
                  <div className="p-3 bg-slate-50 rounded-lg text-slate-900 font-mono text-sm">
                    {selectedError.requestInfo}
                  </div>
                </div>
              )}

              <div>
                <div className="text-slate-600 text-sm mb-1">Loại lỗi</div>
                <div className="text-slate-900">{selectedError.errorType}</div>
              </div>

              <div>
                <div className="text-slate-600 text-sm mb-1">Thông báo lỗi</div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-900 text-sm">
                  {selectedError.errorMessage}
                </div>
              </div>

              {selectedError.solution && (
                <div>
                  <div className="text-slate-600 text-sm mb-1">Giải pháp / Hành động</div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-900 text-sm">
                    {selectedError.solution}
                  </div>
                </div>
              )}

              <div>
                <div className="text-slate-600 text-sm mb-2">Phân công xử lý</div>
                <select 
                  defaultValue={selectedError.assignedTo || ''}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Chưa phân công</option>
                  <option value="Nguyễn Văn A">Nguyễn Văn A</option>
                  <option value="Trần Thị B">Trần Thị B</option>
                  <option value="Lê Văn C">Lê Văn C</option>
                </select>
              </div>

              <div>
                <div className="text-slate-600 text-sm mb-2">Cập nhật trạng thái</div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="status" 
                      value="new" 
                      defaultChecked={selectedError.status === 'new'}
                      className="text-blue-600" 
                    />
                    <span className="text-slate-700">Mới</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="status" 
                      value="in-progress"
                      defaultChecked={selectedError.status === 'in-progress'}
                      className="text-blue-600" 
                    />
                    <span className="text-slate-700">Đang xử lý</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="status" 
                      value="resolved"
                      defaultChecked={selectedError.status === 'resolved'}
                      className="text-blue-600" 
                    />
                    <span className="text-slate-700">Đã giải quyết</span>
                  </label>
                </div>
              </div>

              <div>
                <div className="text-slate-600 text-sm mb-2">Ghi chú thêm</div>
                <textarea
                  rows={3}
                  placeholder="Nhập ghi chú về quá trình xử lý lỗi..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white transition-colors"
              >
                Đóng
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Lưu cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
