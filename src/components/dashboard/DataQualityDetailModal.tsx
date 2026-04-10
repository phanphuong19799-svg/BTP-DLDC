import { X, Download, Filter, AlertTriangle, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface DataQualityDetailModalProps {
  onClose: () => void;
}

export function DataQualityDetailModal({ onClose }: DataQualityDetailModalProps) {
  // Dữ liệu xu hướng chất lượng theo thời gian
  const trendData = [
    { month: 'T1', score: 94.2, errors: 45200 },
    { month: 'T2', score: 94.8, errors: 42800 },
    { month: 'T3', score: 95.1, errors: 40500 },
    { month: 'T4', score: 95.8, errors: 38200 },
    { month: 'T5', score: 96.2, errors: 35600 },
    { month: 'T6', score: 96.0, errors: 37100 },
  ];

  // Dữ liệu chi tiết từng danh mục
  const categoryDetailData = [
    {
      category: 'Đăng ký kinh doanh',
      score: 98.5,
      total: 1250000,
      valid: 1231250,
      error: 18750,
      trend: '+1.2%',
      trendDirection: 'up',
      topErrors: [
        { type: 'Thiếu mã số thuế', count: 8500 },
        { type: 'Địa chỉ không hợp lệ', count: 5200 },
        { type: 'Số điện thoại sai format', count: 3100 },
        { type: 'Ngày cấp không đúng', count: 1950 },
      ]
    },
    {
      category: 'Công chứng',
      score: 96.2,
      total: 850000,
      valid: 817700,
      error: 32300,
      trend: '-0.5%',
      trendDirection: 'down',
      topErrors: [
        { type: 'Thiếu chữ ký số', count: 12800 },
        { type: 'CMND/CCCD không hợp lệ', count: 9500 },
        { type: 'Thông tin không khớp', count: 6700 },
        { type: 'Thiếu trường bắt buộc', count: 3300 },
      ]
    },
    {
      category: 'Trợ giúp pháp lý',
      score: 94.8,
      total: 620000,
      valid: 587760,
      error: 32240,
      trend: '+2.3%',
      trendDirection: 'up',
      topErrors: [
        { type: 'Thông tin người thụ hưởng thiếu', count: 15200 },
        { type: 'Loại vụ việc không đúng', count: 8900 },
        { type: 'Thời gian xử lý sai', count: 5100 },
        { type: 'Kết quả chưa cập nhật', count: 3040 },
      ]
    },
    {
      category: 'Văn bản pháp luật',
      score: 99.1,
      total: 1500000,
      valid: 1486500,
      error: 13500,
      trend: '+0.8%',
      trendDirection: 'up',
      topErrors: [
        { type: 'Link văn bản bị lỗi', count: 6200 },
        { type: 'Metadata không đầy đủ', count: 4100 },
        { type: 'Ngày hiệu lực không đúng', count: 2100 },
        { type: 'Trùng lặp dữ liệu', count: 1100 },
      ]
    },
    {
      category: 'Hộ tịch',
      score: 91.5,
      total: 450000,
      valid: 411750,
      error: 38250,
      trend: '+3.1%',
      trendDirection: 'up',
      topErrors: [
        { type: 'Họ tên không chuẩn Unicode', count: 18500 },
        { type: 'Ngày sinh không hợp lệ', count: 10200 },
        { type: 'Nơi sinh thiếu thông tin', count: 6300 },
        { type: 'Giấy tờ tùy thân sai', count: 3250 },
      ]
    }
  ];

  // Dữ liệu phân bổ lỗi
  const errorDistribution = [
    { name: 'Thiếu trường dữ liệu', value: 45200, color: '#ef4444' },
    { name: 'Format không đúng', value: 32800, color: '#f59e0b' },
    { name: 'Dữ liệu trùng lặp', value: 18900, color: '#eab308' },
    { name: 'Giá trị ngoài range', value: 12500, color: '#f97316' },
    { name: 'Lỗi khác', value: 25640, color: '#6b7280' },
  ];

  const stats = [
    { label: 'Điểm TB hiện tại', value: '96.0', change: '+1.2%', trend: 'up' },
    { label: 'Tổng bản ghi', value: '4.67M', change: '+8.5%', trend: 'up' },
    { label: 'Bản ghi hợp lệ', value: '4.53M', change: '+9.2%', trend: 'up' },
    { label: 'Tổng lỗi', value: '135K', change: '-15.3%', trend: 'down' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
          <div>
            <h3 className="text-slate-900">Phân tích chi tiết chất lượng dữ liệu</h3>
            <p className="text-sm text-slate-500 mt-1">Đánh giá toàn diện về độ chính xác và đầy đủ của dữ liệu trong hệ thống</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              Bộ lọc
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Xuất báo cáo
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="Đóng" aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="text-xs text-slate-500 mb-1">{stat.label}</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl text-slate-900">{stat.value}</div>
                  <div className={`flex items-center gap-1 text-xs ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="p-6 space-y-6">
          {/* Xu hướng chất lượng theo thời gian */}
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-6">
            <h4 className="text-slate-900 mb-4">Xu hướng chất lượng dữ liệu 6 tháng gần nhất</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis 
                  yAxisId="left"
                  stroke="#64748b" 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  domain={[90, 100]}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#64748b" 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="score"
                  name="Điểm chất lượng (%)"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="errors"
                  name="Số lỗi"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Phân bố lỗi và So sánh danh mục */}
          <div className="grid grid-cols-2 gap-6">
            {/* Phân bố loại lỗi */}
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-6">
              <h4 className="text-slate-900 mb-4">Phân bố loại lỗi</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={errorDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {errorDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => value.toLocaleString()} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* So sánh điểm theo danh mục */}
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-6">
              <h4 className="text-slate-900 mb-4">So sánh điểm chất lượng theo danh mục</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryDetailData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 100]} stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis type="category" dataKey="category" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="score" fill="#10b981" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chi tiết từng danh mục */}
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-6">
            <h4 className="text-slate-900 mb-4">Chi tiết lỗi theo từng danh mục</h4>
            <div className="space-y-4">
              {categoryDetailData.map((category, index) => (
                <div key={index} className="bg-white rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        category.score >= 98 ? 'bg-green-100' :
                        category.score >= 95 ? 'bg-blue-100' :
                        category.score >= 90 ? 'bg-yellow-100' : 'bg-red-100'
                      }`}>
                        {category.score >= 95 ? (
                          <CheckCircle className={`w-6 h-6 ${
                            category.score >= 98 ? 'text-green-600' : 'text-blue-600'
                          }`} />
                        ) : (
                          <AlertTriangle className={`w-6 h-6 ${
                            category.score >= 90 ? 'text-yellow-600' : 'text-red-600'
                          }`} />
                        )}
                      </div>
                      <div>
                        <h5 className="text-slate-900">{category.category}</h5>
                        <p className="text-sm text-slate-500">
                          {category.valid.toLocaleString()} hợp lệ / {category.total.toLocaleString()} tổng
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl mb-1 ${
                        category.score >= 98 ? 'text-green-600' :
                        category.score >= 95 ? 'text-blue-600' :
                        category.score >= 90 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {category.score}%
                      </div>
                      <div className={`flex items-center gap-1 text-xs ${
                        category.trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {category.trendDirection === 'up' ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {category.trend}
                      </div>
                    </div>
                  </div>

                  {/* Top Errors */}
                  <div className="mt-4 bg-slate-50 rounded-lg p-3">
                    <div className="text-xs text-slate-600 mb-2">Top 4 lỗi phổ biến:</div>
                    <div className="space-y-2">
                      {category.topErrors.map((error, errorIndex) => (
                        <div key={errorIndex} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-4 bg-red-500 rounded"></div>
                            <span className="text-xs text-slate-700">{error.type}</span>
                          </div>
                          <span className="text-xs text-red-600">{error.count.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
