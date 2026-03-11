import { AlertTriangle, AlertCircle, Info, TrendingDown, TrendingUp, Search, Filter, Download, Eye, CheckCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SystemError {
  id: string;
  errorCode: string;
  message: string;
  module: string;
  severity: 'critical' | 'error' | 'warning';
  timestamp: string;
  status: 'new' | 'processing' | 'resolved';
  assignee?: string;
  assigneeGroup?: string;
  stackTrace: string;
  environment: string;
}

const mockErrors: SystemError[] = [
  {
    id: 'ERR001',
    errorCode: 'DB_CONNECTION_FAILED',
    message: 'Không thể kết nối đến cơ sở dữ liệu',
    module: 'Database Connection',
    severity: 'critical',
    timestamp: '10/12/2024 10:30:15',
    status: 'processing',
    assignee: 'Nguyễn Văn A',
    stackTrace: 'at DatabaseService.connect()\nat Application.initialize()\n...',
    environment: 'Production'
  },
  {
    id: 'ERR002',
    errorCode: 'API_TIMEOUT',
    message: 'API request timeout sau 30 giây',
    module: 'API Gateway',
    severity: 'error',
    timestamp: '10/12/2024 10:15:42',
    status: 'new',
    stackTrace: 'at ApiClient.request()\nat DataService.fetchData()\n...',
    environment: 'Production'
  },
  {
    id: 'ERR003',
    errorCode: 'MEMORY_LEAK',
    message: 'Phát hiện memory leak ở module xử lý dữ liệu',
    module: 'Data Processing',
    severity: 'warning',
    timestamp: '10/12/2024 09:45:20',
    status: 'resolved',
    assignee: 'Trần Thị B',
    stackTrace: 'at ProcessingEngine.execute()\nat Worker.process()\n...',
    environment: 'Production'
  },
  {
    id: 'ERR004',
    errorCode: 'FILE_NOT_FOUND',
    message: 'Không tìm thấy file cấu hình',
    module: 'Configuration',
    severity: 'warning',
    timestamp: '10/12/2024 09:20:10',
    status: 'resolved',
    assignee: 'Lê Văn C',
    stackTrace: 'at ConfigLoader.load()\nat Application.startup()\n...',
    environment: 'Staging'
  },
  {
    id: 'ERR005',
    errorCode: 'NULL_POINTER_EXCEPTION',
    message: 'Lỗi null pointer khi xử lý dữ liệu',
    module: 'Data Validation',
    severity: 'error',
    timestamp: '10/12/2024 08:55:33',
    status: 'processing',
    assignee: 'Phạm Thị D',
    stackTrace: 'at Validator.validate()\nat DataProcessor.process()\n...',
    environment: 'Production'
  },
];

const trendData = [
  { date: '05/12', critical: 2, error: 5, warning: 8 },
  { date: '06/12', critical: 1, error: 7, warning: 12 },
  { date: '07/12', critical: 3, error: 6, warning: 10 },
  { date: '08/12', critical: 0, error: 4, warning: 9 },
  { date: '09/12', critical: 1, error: 8, warning: 15 },
  { date: '10/12', critical: 2, error: 5, warning: 7 },
];

const topErrors = [
  { name: 'DB_CONNECTION_FAILED', count: 15 },
  { name: 'API_TIMEOUT', count: 12 },
  { name: 'MEMORY_LEAK', count: 8 },
  { name: 'NULL_POINTER_EXCEPTION', count: 6 },
  { name: 'FILE_NOT_FOUND', count: 4 },
];

export function NotificationSystemError() {
  const [errors, setErrors] = useState(mockErrors);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedError, setSelectedError] = useState<SystemError | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredErrors = errors.filter(err => {
    const matchSearch = err.errorCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       err.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       err.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSeverity = filterSeverity === 'all' || err.severity === filterSeverity;
    const matchStatus = filterStatus === 'all' || err.status === filterStatus;
    return matchSearch && matchSeverity && matchStatus;
  });

  const stats = {
    critical: errors.filter(e => e.severity === 'critical').length,
    error: errors.filter(e => e.severity === 'error').length,
    warning: errors.filter(e => e.severity === 'warning').length,
    total: errors.length,
  };

  const getSeverityBadge = (severity: string) => {
    const badges = {
      critical: { label: 'Critical', className: 'bg-red-100 text-red-700', icon: AlertTriangle },
      error: { label: 'Error', className: 'bg-orange-100 text-orange-700', icon: AlertCircle },
      warning: { label: 'Warning', className: 'bg-yellow-100 text-yellow-700', icon: Info }
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
      new: { label: 'Mới', className: 'bg-blue-100 text-blue-700' },
      processing: { label: 'Đang xử lý', className: 'bg-purple-100 text-purple-700' },
      resolved: { label: 'Đã khắc phục', className: 'bg-green-100 text-green-700' }
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
        <h1 className="text-slate-900">Thông báo lỗi hệ thống</h1>
        <p className="text-slate-600 mt-1">Giám sát và xử lý các lỗi hệ thống</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-600 text-sm">Tổng số lỗi</div>
              <div className="text-slate-900 mt-1">{stats.total}</div>
            </div>
            <AlertCircle className="w-8 h-8 text-slate-600" />
          </div>
        </div>
        <div className="bg-white border border-red-200 rounded-lg p-4 bg-red-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-red-700 text-sm">Critical</div>
              <div className="text-red-900 mt-1">{stats.critical}</div>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white border border-orange-200 rounded-lg p-4 bg-orange-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-orange-700 text-sm">Error</div>
              <div className="text-orange-900 mt-1">{stats.error}</div>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white border border-yellow-200 rounded-lg p-4 bg-yellow-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-yellow-700 text-sm">Warning</div>
              <div className="text-yellow-900 mt-1">{stats.warning}</div>
            </div>
            <Info className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-slate-900 mb-4">Xu hướng lỗi theo thời gian</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="critical" stroke="#dc2626" name="Critical" />
              <Line type="monotone" dataKey="error" stroke="#f97316" name="Error" />
              <Line type="monotone" dataKey="warning" stroke="#eab308" name="Warning" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-slate-900 mb-4">Top 5 lỗi phổ biến</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topErrors} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" name="Số lần" />
            </BarChart>
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
              placeholder="Tìm kiếm theo mã lỗi, thông điệp, module..."
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
            <option value="critical">Critical</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="new">Mới</option>
            <option value="processing">Đang xử lý</option>
            <option value="resolved">Đã khắc phục</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Xuất Excel
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
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Thông điệp</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Module</th>
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
                    <div className="text-slate-900">{error.errorCode}</div>
                    <div className="text-slate-500 text-xs mt-1">{error.id}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700 text-sm max-w-xs truncate">
                      {error.message}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700 text-sm">{error.module}</div>
                  </td>
                  <td className="px-4 py-3">
                    {getSeverityBadge(error.severity)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700 text-sm">{error.timestamp}</div>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(error.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700 text-sm">
                      {error.assignee || <span className="text-slate-400">Chưa gán</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
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
                      {error.status !== 'resolved' && (
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Đánh dấu đã khắc phục"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
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
              <h2 className="text-slate-900">Chi tiết lỗi #{selectedError.id}</h2>
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
              {/* Error Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-slate-600 text-sm mb-1">Mã lỗi</div>
                  <div className="text-slate-900">{selectedError.errorCode}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Mức độ nghiêm trọng</div>
                  <div>{getSeverityBadge(selectedError.severity)}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Module/Chức năng</div>
                  <div className="text-slate-900">{selectedError.module}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Môi trường</div>
                  <div className="text-slate-900">{selectedError.environment}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Thời gian xảy ra</div>
                  <div className="text-slate-900">{selectedError.timestamp}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Trạng thái</div>
                  <div>{getStatusBadge(selectedError.status)}</div>
                </div>
              </div>

              {/* Error Message */}
              <div>
                <div className="text-slate-600 text-sm mb-2">Thông điệp lỗi</div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-900">
                  {selectedError.message}
                </div>
              </div>

              {/* Stack Trace */}
              <div>
                <div className="text-slate-600 text-sm mb-2">Stack Trace</div>
                <div className="p-4 bg-slate-900 text-green-400 rounded-lg font-mono text-xs overflow-x-auto">
                  <pre>{selectedError.stackTrace}</pre>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <div className="text-slate-700 mb-3">Timeline xử lý</div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="text-slate-900">{selectedError.timestamp}</div>
                      <div className="text-slate-600 text-sm">Lỗi được phát hiện</div>
                    </div>
                  </div>
                  {selectedError.assignee && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="text-slate-900">Đã gán cho {selectedError.assignee}</div>
                        <div className="text-slate-600 text-sm">Đang xử lý</div>
                      </div>
                    </div>
                  )}
                  {selectedError.status === 'resolved' && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="text-slate-900">Đã khắc phục</div>
                        <div className="text-slate-600 text-sm">Xử lý bởi {selectedError.assignee}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Assignment Section */}
              <div className="border-t border-slate-200 pt-6">
                <div className="text-slate-700 mb-4">Phân công xử lý</div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-600 text-sm mb-2">Nhóm xử lý</label>
                    <select 
                      defaultValue={selectedError.assigneeGroup || 'admin'}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="admin">Nhóm Quản trị</option>
                      <option value="dev">Nhóm Phát triển</option>
                      <option value="support">Nhóm Hỗ trợ kỹ thuật</option>
                      <option value="data">Nhóm Xử lý dữ liệu</option>
                      <option value="security">Nhóm Bảo mật</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 text-sm mb-2">Gán cho cá nhân (tùy chọn)</label>
                    <select 
                      defaultValue={selectedError.assignee || ''}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Chưa gán</option>
                      <option value="Nguyễn Văn A">Nguyễn Văn A</option>
                      <option value="Trần Thị B">Trần Thị B</option>
                      <option value="Lê Văn C">Lê Văn C</option>
                      <option value="Phạm Thị D">Phạm Thị D</option>
                      <option value="Hoàng Văn E">Hoàng Văn E</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 text-sm mb-2">Ghi chú xử lý</label>
                    <textarea
                      rows={3}
                      placeholder="Nhập ghi chú về cách xử lý hoặc nguyên nhân lỗi..."
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
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
                Lưu phân công
              </button>
              {selectedError.status !== 'resolved' && (
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Đánh dấu đã khắc phục
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}