import { GitCompare, AlertTriangle, XCircle, TrendingDown, Eye, Download, Search, CheckCircle2, Activity } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ReconciliationError {
  id: string;
  sourceSystem: string;
  targetSystem: string;
  dataType: string;
  errorType: string;
  errorMessage: string;
  mismatchedRecords: number;
  totalRecords: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  occurredAt: string;
  status: 'new' | 'in-progress' | 'resolved';
  accuracyRate: number;
  sampleMismatches?: Array<{field: string, sourceValue: string, targetValue: string}>;
  solution?: string;
  assignedTo?: string;
}

const mockErrors: ReconciliationError[] = [
  {
    id: 'REC-ERR001',
    sourceSystem: 'Hệ thống Đăng ký Kinh doanh',
    targetSystem: 'CSDL Quốc gia về Đăng ký doanh nghiệp',
    dataType: 'Thông tin doanh nghiệp',
    errorType: 'Data Mismatch - High Volume',
    errorMessage: '350 bản ghi không khớp giữa 2 hệ thống. Phát hiện sai lệch về mã số doanh nghiệp và địa chỉ.',
    mismatchedRecords: 350,
    totalRecords: 5000,
    severity: 'critical',
    occurredAt: '10/12/2024 09:30',
    status: 'in-progress',
    accuracyRate: 93.0,
    sampleMismatches: [
      { field: 'Mã số doanh nghiệp', sourceValue: '0123456789', targetValue: '0123456788' },
      { field: 'Địa chỉ', sourceValue: 'Hà Nội', targetValue: 'TP.HCM' },
    ],
    solution: 'Đang phân tích nguyên nhân sai lệch, chuẩn bị đồng bộ dữ liệu',
    assignedTo: 'Nguyễn Văn A'
  },
  {
    id: 'REC-ERR002',
    sourceSystem: 'CSDL Văn bản pháp luật',
    targetSystem: 'Cổng TTĐT Quốc gia',
    dataType: 'Văn bản quy phạm pháp luật',
    errorType: 'Data Mismatch - Critical Volume',
    errorMessage: '1500 văn bản không khớp. Phát hiện sai lệch về trạng thái hiệu lực và ngày ban hành.',
    mismatchedRecords: 1500,
    totalRecords: 15000,
    severity: 'critical',
    occurredAt: '09/12/2024 20:00',
    status: 'new',
    accuracyRate: 90.0,
    sampleMismatches: [
      { field: 'Trạng thái hiệu lực', sourceValue: 'Còn hiệu lực', targetValue: 'Hết hiệu lực' },
      { field: 'Ngày ban hành', sourceValue: '01/01/2024', targetValue: '01/01/2023' },
    ],
    solution: 'Cần xác minh nguồn dữ liệu chính xác'
  },
  {
    id: 'REC-ERR003',
    sourceSystem: 'Hệ thống Công chứng',
    targetSystem: 'CSDL Trung ương',
    dataType: 'Hợp đồng công chứng',
    errorType: 'Data Mismatch - Medium Volume',
    errorMessage: '120 hợp đồng không khớp. Phát hiện sai lệch về số hợp đồng và ngày công chứng.',
    mismatchedRecords: 120,
    totalRecords: 8000,
    severity: 'high',
    occurredAt: '10/12/2024 08:00',
    status: 'in-progress',
    accuracyRate: 98.5,
    sampleMismatches: [
      { field: 'Số hợp đồng', sourceValue: 'HD-2024-001', targetValue: 'HD-2024-002' },
      { field: 'Ngày công chứng', sourceValue: '15/11/2024', targetValue: '16/11/2024' },
    ],
    solution: 'Đang đối chiếu với bản gốc',
    assignedTo: 'Trần Thị B'
  },
  {
    id: 'REC-ERR004',
    sourceSystem: 'CSDL Hộ tịch điện tử',
    targetSystem: 'Hệ thống Bộ Công an',
    dataType: 'Thông tin công dân',
    errorType: 'Data Mismatch - Low Volume',
    errorMessage: '50 bản ghi công dân không khớp. Phát hiện sai lệch về số CMND/CCCD và ngày sinh.',
    mismatchedRecords: 50,
    totalRecords: 10000,
    severity: 'medium',
    occurredAt: '10/12/2024 08:00',
    status: 'resolved',
    accuracyRate: 99.5,
    sampleMismatches: [
      { field: 'Số CMND/CCCD', sourceValue: '001234567890', targetValue: '001234567891' },
      { field: 'Ngày sinh', sourceValue: '01/01/1990', targetValue: '01/01/1991' },
    ],
    solution: 'Đã đồng bộ lại dữ liệu thành công',
    assignedTo: 'Lê Văn C'
  },
  {
    id: 'REC-ERR005',
    sourceSystem: 'Hệ thống TGPL',
    targetSystem: 'CSDL Quốc gia',
    dataType: 'Vụ việc TGPL',
    errorType: 'Data Mismatch - Low Volume',
    errorMessage: '20 vụ việc không khớp. Phát hiện sai lệch về trạng thái xử lý.',
    mismatchedRecords: 20,
    totalRecords: 3200,
    severity: 'low',
    occurredAt: '09/12/2024 22:00',
    status: 'resolved',
    accuracyRate: 99.375,
    sampleMismatches: [
      { field: 'Trạng thái', sourceValue: 'Đang xử lý', targetValue: 'Hoàn thành' },
    ],
    solution: 'Đã cập nhật trạng thái đồng bộ',
    assignedTo: 'Nguyễn Văn A'
  },
];

const errorTrendData = [
  { date: '05/12', critical: 1, high: 2, medium: 3, low: 1 },
  { date: '06/12', critical: 2, high: 1, medium: 2, low: 2 },
  { date: '07/12', critical: 1, high: 3, medium: 4, low: 1 },
  { date: '08/12', critical: 0, high: 2, medium: 3, low: 2 },
  { date: '09/12', critical: 2, high: 1, medium: 1, low: 1 },
  { date: '10/12', critical: 2, high: 1, medium: 1, low: 0 },
];

const systemErrorDistribution = [
  { name: 'Hệ thống ĐK KD', value: 350 },
  { name: 'CSDL Văn bản PL', value: 1500 },
  { name: 'Hệ thống Công chứng', value: 120 },
  { name: 'CSDL Hộ tịch', value: 50 },
  { name: 'Hệ thống TGPL', value: 20 },
];

export function NotificationAPIReconcile() {
  const [errors, setErrors] = useState(mockErrors);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [selectedError, setSelectedError] = useState<ReconciliationError | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredErrors = errors.filter(err => {
    const matchSearch = err.sourceSystem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       err.targetSystem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       err.dataType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       err.errorMessage.toLowerCase().includes(searchTerm.toLowerCase());
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
        <h1 className="text-slate-900">Thông báo lỗi API đối soát</h1>
        <p className="text-slate-600 mt-1">Theo dõi và xử lý các lỗi sai lệch khi đối soát dữ liệu giữa các hệ thống</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-600 text-sm">Tổng số lỗi</div>
              <div className="text-slate-900 mt-1">{stats.totalErrors}</div>
            </div>
            <GitCompare className="w-8 h-8 text-slate-600" />
          </div>
        </div>
        <div className="bg-white border border-red-200 rounded-lg p-4 bg-red-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-red-700 text-sm">Sai lệch nghiêm trọng</div>
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
            <AlertTriangle className="w-8 h-8 text-orange-600" />
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
          <h3 className="text-slate-900 mb-4">Xu hướng lỗi đối soát (7 ngày)</h3>
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
          <h3 className="text-slate-900 mb-4">Hệ thống có nhiều sai lệch nhất</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsBarChart data={systemErrorDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ef4444" name="Số bản ghi sai lệch" />
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
              placeholder="Tìm kiếm theo hệ thống, loại dữ liệu, thông báo lỗi..."
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
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Hệ thống</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Loại dữ liệu</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Loại lỗi</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Sai lệch</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Độ chính xác</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Mức độ</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Thời gian</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Trạng thái</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredErrors.map((error) => (
                <tr key={error.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="text-slate-900">{error.id}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-900 text-sm">{error.sourceSystem}</div>
                    <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                      <GitCompare className="w-3 h-3" />
                      {error.targetSystem}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700 text-sm">{error.dataType}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700 text-sm">{error.errorType}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <div className="text-red-600">{error.mismatchedRecords.toLocaleString()}</div>
                      <div className="text-slate-500 text-xs">/{error.totalRecords.toLocaleString()}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`text-sm ${error.accuracyRate >= 95 ? 'text-green-600' : error.accuracyRate >= 90 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {error.accuracyRate}%
                      </div>
                      <div className="w-16 bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${error.accuracyRate >= 95 ? 'bg-green-600' : error.accuracyRate >= 90 ? 'bg-yellow-600' : 'bg-red-600'}`}
                          style={{ width: `${error.accuracyRate}%` }}
                        />
                      </div>
                    </div>
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
          <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-slate-900">Chi tiết lỗi đối soát - {selectedError.id}</h2>
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
                  <div className="text-slate-600 text-sm mb-1">Hệ thống nguồn</div>
                  <div className="text-slate-900">{selectedError.sourceSystem}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Hệ thống đích</div>
                  <div className="text-slate-900">{selectedError.targetSystem}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Loại dữ liệu</div>
                  <div className="text-slate-900">{selectedError.dataType}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Thời gian phát hiện</div>
                  <div className="text-slate-900">{selectedError.occurredAt}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Mức độ nghiêm trọng</div>
                  <div>{getSeverityBadge(selectedError.severity)}</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm mb-1">Trạng thái</div>
                  <div>{getStatusBadge(selectedError.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="text-slate-600 text-sm mb-1">Tổng số bản ghi</div>
                  <div className="text-slate-900">{selectedError.totalRecords.toLocaleString()}</div>
                </div>
                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="text-red-700 text-sm mb-1">Bản ghi sai lệch</div>
                  <div className="text-red-900">{selectedError.mismatchedRecords.toLocaleString()}</div>
                </div>
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="text-green-700 text-sm mb-1">Độ chính xác</div>
                  <div className="text-green-900">{selectedError.accuracyRate}%</div>
                </div>
              </div>

              <div>
                <div className="text-slate-600 text-sm mb-1">Loại lỗi</div>
                <div className="text-slate-900">{selectedError.errorType}</div>
              </div>

              <div>
                <div className="text-slate-600 text-sm mb-1">Mô tả lỗi</div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-900 text-sm">
                  {selectedError.errorMessage}
                </div>
              </div>

              {selectedError.sampleMismatches && selectedError.sampleMismatches.length > 0 && (
                <div>
                  <div className="text-slate-600 text-sm mb-2">Mẫu dữ liệu sai lệch</div>
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-slate-700 text-sm">Trường dữ liệu</th>
                          <th className="px-4 py-3 text-left text-slate-700 text-sm">Giá trị (Nguồn)</th>
                          <th className="px-4 py-3 text-left text-slate-700 text-sm">Giá trị (Đích)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {selectedError.sampleMismatches.map((mismatch, idx) => (
                          <tr key={idx} className="hover:bg-yellow-50">
                            <td className="px-4 py-3 text-slate-900 text-sm">{mismatch.field}</td>
                            <td className="px-4 py-3 text-slate-700 text-sm bg-yellow-50">{mismatch.sourceValue}</td>
                            <td className="px-4 py-3 text-slate-700 text-sm bg-yellow-50">{mismatch.targetValue}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

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
                  placeholder="Nhập ghi chú về quá trình xử lý sai lệch..."
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
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                Xuất danh sách sai lệch
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Đồng bộ hóa
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
