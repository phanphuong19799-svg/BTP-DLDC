import { useState } from 'react';
import { Activity, Server, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Zap, FileText, Search } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const performanceData = [
  { time: '00:00', requests: 1200, success: 1180, errors: 20, avgTime: 120 },
  { time: '04:00', requests: 800, success: 795, errors: 5, avgTime: 110 },
  { time: '08:00', requests: 3500, success: 3450, errors: 50, avgTime: 150 },
  { time: '12:00', requests: 4200, success: 4100, errors: 100, avgTime: 180 },
  { time: '16:00', requests: 3800, success: 3750, errors: 50, avgTime: 160 },
  { time: '20:00', requests: 2100, success: 2080, errors: 20, avgTime: 130 },
];

const serviceStatusData = [
  { name: 'Hộ tịch', uptime: 99.9, requests: 15234, errors: 15 },
  { name: 'Văn bản PL', uptime: 99.5, requests: 12456, errors: 62 },
  { name: 'Công chứng', uptime: 98.2, requests: 8234, errors: 148 },
  { name: 'Đăng ký KD', uptime: 99.7, requests: 9876, errors: 30 },
  { name: 'TGPL', uptime: 97.8, requests: 5432, errors: 120 },
];

interface Alert {
  id: string;
  time: string;
  service: string;
  type: 'error' | 'warning' | 'info';
  message: string;
}

interface LogEntry {
  id: string;
  apiCode: string;
  apiName: string;
  action: string;
  user: string;
  timestamp: string;
  ip: string;
  details: string;
  status: 'success' | 'failed';
}

const mockLogs: LogEntry[] = [
  {
    id: 'LOG001',
    apiCode: 'API001',
    apiName: 'API tra cứu thông tin công dân',
    action: 'Khởi tạo dịch vụ',
    user: 'admin@dldc.gov.vn',
    timestamp: '23/12/2024 09:15:30',
    ip: '10.0.0.50',
    details: 'Tạo mới dịch vụ với endpoint /api/v1/citizens/lookup',
    status: 'success'
  },
  {
    id: 'LOG002',
    apiCode: 'API002',
    apiName: 'API nhận dữ liệu đăng ký kinh doanh',
    action: 'Phê duyệt dịch vụ',
    user: 'manager@dldc.gov.vn',
    timestamp: '23/12/2024 08:45:12',
    ip: '10.0.0.55',
    details: 'Duyệt cho phép dịch vụ đi vào hoạt động - Đã kiểm tra đầy đủ',
    status: 'success'
  },
  {
    id: 'LOG003',
    apiCode: 'API003',
    apiName: 'API cập nhật thông tin văn bản pháp luật',
    action: 'Sửa đổi cấu hình',
    user: 'techuser@dldc.gov.vn',
    timestamp: '23/12/2024 08:30:45',
    ip: '10.0.0.62',
    details: 'Cập nhật timeout từ 30s lên 60s, thay đổi phân loại từ "Không công khai" sang "Công khai"',
    status: 'success'
  },
  {
    id: 'LOG004',
    apiCode: 'API005',
    apiName: 'API tra cứu thông tin trợ giúp pháp lý',
    action: 'Chuyển quyền quản trị',
    user: 'admin@dldc.gov.vn',
    timestamp: '23/12/2024 08:10:20',
    ip: '10.0.0.50',
    details: 'Chuyển quyền quản trị từ user@local.gov.vn sang newadmin@central.gov.vn',
    status: 'success'
  },
  {
    id: 'LOG005',
    apiCode: 'API007',
    apiName: 'API xuất dữ liệu báo cáo thống kê',
    action: 'Trình duyệt công khai',
    user: 'operator@dldc.gov.vn',
    timestamp: '22/12/2024 16:25:33',
    ip: '10.0.0.71',
    details: 'Gửi yêu cầu duyệt công khai dịch vụ - Chờ phê duyệt cấp 2',
    status: 'success'
  },
  {
    id: 'LOG006',
    apiCode: 'API008',
    apiName: 'API đồng bộ dữ liệu công chứng',
    action: 'Xóa dịch vụ',
    user: 'admin@dldc.gov.vn',
    timestamp: '22/12/2024 15:40:18',
    ip: '10.0.0.50',
    details: 'Yêu cầu xóa dịch vụ - Lý do: Dịch vụ đã lỗi thời, thay thế bằng API009',
    status: 'failed'
  },
  {
    id: 'LOG007',
    apiCode: 'API004',
    apiName: 'API tiếp nhận hồ sơ hộ tịch',
    action: 'Cập nhật phiên bản',
    user: 'techuser@dldc.gov.vn',
    timestamp: '22/12/2024 14:15:05',
    ip: '10.0.0.62',
    details: 'Nâng cấp từ v1.2 lên v2.0 - Thêm trường dữ liệu mới',
    status: 'success'
  },
  {
    id: 'LOG008',
    apiCode: 'API002',
    apiName: 'API nhận dữ liệu đăng ký kinh doanh',
    action: 'Phê duyệt công khai',
    user: 'director@dldc.gov.vn',
    timestamp: '22/12/2024 13:30:45',
    ip: '10.0.0.80',
    details: 'Duyệt công khai dịch vụ cho đơn vị ngoài ngành - Cấp 2',
    status: 'success'
  },
  {
    id: 'LOG009',
    apiCode: 'API006',
    apiName: 'API tra cứu thông tin chứng thực',
    action: 'Từ chối phê duyệt',
    user: 'manager@dldc.gov.vn',
    timestamp: '22/12/2024 11:20:30',
    ip: '10.0.0.55',
    details: 'Từ chối yêu cầu - Lý do: Thiếu tài liệu hướng dẫn sử dụng',
    status: 'failed'
  },
  {
    id: 'LOG010',
    apiCode: 'API003',
    apiName: 'API cập nhật thông tin văn bản pháp luật',
    action: 'Khôi phục dịch vụ',
    user: 'admin@dldc.gov.vn',
    timestamp: '22/12/2024 10:05:15',
    ip: '10.0.0.50',
    details: 'Khôi phục dịch vụ từ trạng thái "Tạm dừng" sang "Hoạt động"',
    status: 'success'
  }
];

const recentAlerts: Alert[] = [
  {
    id: '1',
    time: '14:30:25',
    service: 'API công chứng',
    type: 'error',
    message: 'Thời gian phản hồi vượt ngưỡng (450ms > 300ms)'
  },
  {
    id: '2',
    time: '14:28:10',
    service: 'API TGPL',
    type: 'warning',
    message: 'Tỷ lệ lỗi tăng cao (5.2% trong 10 phút qua)'
  },
  {
    id: '3',
    time: '14:25:45',
    service: 'API hộ tịch',
    type: 'info',
    message: 'Đã xử lý 1000 yêu cầu trong 5 phút'
  },
  {
    id: '4',
    time: '14:20:33',
    service: 'API văn bản PL',
    type: 'warning',
    message: 'Tải hệ thống đang ở mức cao (85%)'
  }
];

export function MonitoringPage() {
  const [timeRange, setTimeRange] = useState('24h');
  const [searchTerm, setSearchTerm] = useState('');
  const [logs] = useState<LogEntry[]>(mockLogs);

  const getAlertIcon = (type: string) => {
    if (type === 'error') return <AlertTriangle className="w-4 h-4 text-red-600" />;
    if (type === 'warning') return <AlertTriangle className="w-4 h-4 text-amber-600" />;
    return <CheckCircle className="w-4 h-4 text-blue-600" />;
  };

  const getAlertBadge = (type: string) => {
    const styles = {
      error: 'bg-red-100 text-red-700 border-red-200',
      warning: 'bg-amber-100 text-amber-700 border-amber-200',
      info: 'bg-blue-100 text-blue-700 border-blue-200'
    };
    const labels = {
      error: 'Lỗi',
      warning: 'Cảnh báo',
      info: 'Thông tin'
    };
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${styles[type as keyof typeof styles]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    );
  };

  const totalRequests = performanceData.reduce((sum, d) => sum + d.requests, 0);
  const totalSuccess = performanceData.reduce((sum, d) => sum + d.success, 0);
  const totalErrors = performanceData.reduce((sum, d) => sum + d.errors, 0);
  const successRate = ((totalSuccess / totalRequests) * 100).toFixed(2);
  const avgResponseTime = (performanceData.reduce((sum, d) => sum + d.avgTime, 0) / performanceData.length).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-end">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="1d">1 ngày</option>
          <option value="7d">7 ngày</option>
          <option value="1m">1 tháng</option>
          <option value="1q">1 quý</option>
          <option value="6m">6 tháng</option>
          <option value="1y">1 năm</option>
          <option value="custom">Từ ngày đến ngày</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-slate-600">Tổng số request</div>
              <div className="text-slate-900 mt-1">{totalRequests.toLocaleString()}</div>
              <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>+12.5%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-slate-600">Tỷ lệ thành công</div>
              <div className="text-slate-900 mt-1">{successRate}%</div>
              <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>+0.3%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-slate-600">Thời gian phản hồi TB</div>
              <div className="text-slate-900 mt-1">{avgResponseTime}ms</div>
              <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
                <TrendingDown className="w-3 h-3" />
                <span>+15ms</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-slate-600">Số lỗi</div>
              <div className="text-slate-900 mt-1">{totalErrors}</div>
              <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
                <TrendingUp className="w-3 h-3" />
                <span>+8 lỗi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Request Volume */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-sm text-slate-900 mb-4">Lượng request theo thời gian</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="requests" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorRequests)"
                name="Số request"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Success vs Errors */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-sm text-slate-900 mb-4">Thành công vs Lỗi</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="success" fill="#10b981" name="Thành công" />
              <Bar dataKey="errors" fill="#ef4444" name="Lỗi" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Response Time Trend */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm text-slate-900 mb-4">Xu hướng thời gian phản hồi</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '12px' }} />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="avgTime" 
              stroke="#f59e0b" 
              strokeWidth={2}
              name="Thời gian TB (ms)"
              dot={{ fill: '#f59e0b', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Service Status & Recent Alerts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Service Status */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-sm text-slate-900 mb-4">Trạng thái dịch vụ</h3>
          <div className="space-y-3">
            {serviceStatusData.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-slate-600" />
                    <span className="text-sm text-slate-900">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-600">
                    <span>{service.requests.toLocaleString()} requests</span>
                    <span>{service.errors} lỗi</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm ${service.uptime >= 99 ? 'text-green-700' : service.uptime >= 98 ? 'text-amber-700' : 'text-red-700'}`}>
                    {service.uptime}%
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Uptime</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-sm text-slate-900 mb-4">Cảnh báo gần đây</h3>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-slate-500">{alert.time}</span>
                    {getAlertBadge(alert.type)}
                  </div>
                  <div className="text-xs text-slate-900">{alert.service}</div>
                  <div className="text-xs text-slate-600 mt-1">{alert.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logs */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-slate-900">Nhật ký hoạt động</h3>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo tên API, người dùng..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Thời gian</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Mã API</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Tên API</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Hành động</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Người dùng</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">IP Address</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Chi tiết</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {logs
                .filter(log => 
                  log.apiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  log.apiCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  log.user.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((log) => (
                  <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{log.timestamp}</td>
                    <td className="px-4 py-3">
                      <code className="px-2 py-1 bg-slate-100 text-blue-700 rounded text-xs">{log.apiCode}</code>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-900">{log.apiName}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{log.action}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{log.user}</td>
                    <td className="px-4 py-3">
                      <code className="text-xs text-slate-600">{log.ip}</code>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate" title={log.details}>
                      {log.details}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full ${
                        log.status === 'success' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {log.status === 'success' ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <AlertTriangle className="w-3 h-3" />
                        )}
                        <span>{log.status === 'success' ? 'Thành công' : 'Thất bại'}</span>
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {logs.filter(log => 
          log.apiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.apiCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.user.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            Không tìm thấy kết quả phù hợp
          </div>
        )}
      </div>
    </div>
  );
}