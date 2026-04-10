import { X, Download, Filter, Calendar, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ChartDetailModalProps {
  chartType: 'collection' | 'processing' | 'access' | 'category';
  onClose: () => void;
}

export function ChartDetailModal({ chartType, onClose }: ChartDetailModalProps) {
  const chartConfigs = {
    collection: {
      title: 'Biểu đồ thu thập theo thời gian',
      description: 'Phân tích chi tiết xu hướng thu thập, xử lý và chia sẻ dữ liệu theo tháng',
      data: [
        { month: 'Tháng 1', thuThap: 345000, xuLy: 342000, chiaSet: 12000 },
        { month: 'Tháng 2', thuThap: 378000, xuLy: 375000, chiaSet: 13500 },
        { month: 'Tháng 3', thuThap: 392000, xuLy: 388000, chiaSet: 15200 },
        { month: 'Tháng 4', thuThap: 410000, xuLy: 405000, chiaSet: 16800 },
        { month: 'Tháng 5', thuThap: 425000, xuLy: 421000, chiaSet: 18500 },
        { month: 'Tháng 6', thuThap: 448000, xuLy: 443000, chiaSet: 20100 },
        { month: 'Tháng 7', thuThap: 465000, xuLy: 460000, chiaSet: 21800 },
        { month: 'Tháng 8', thuThap: 482000, xuLy: 477000, chiaSet: 23200 },
        { month: 'Tháng 9', thuThap: 498000, xuLy: 492000, chiaSet: 24500 },
        { month: 'Tháng 10', thuThap: 515000, xuLy: 509000, chiaSet: 26000 },
        { month: 'Tháng 11', thuThap: 532000, xuLy: 527000, chiaSet: 27800 },
        { month: 'Tháng 12', thuThap: 550000, xuLy: 545000, chiaSet: 29500 },
      ],
      stats: [
        { label: 'Tổng thu thập', value: '5.54 triệu', change: '+12.5%', trend: 'up' },
        { label: 'Tổng xử lý', value: '5.48 triệu', change: '+11.8%', trend: 'up' },
        { label: 'Tổng chia sẻ', value: '258.9 nghìn', change: '+24.3%', trend: 'up' },
        { label: 'Tỷ lệ xử lý', value: '98.9%', change: '+0.3%', trend: 'up' },
      ]
    },
    processing: {
      title: 'Tiến độ xử lý dữ liệu',
      description: 'Thống kê chi tiết các giai đoạn xử lý dữ liệu',
      data: [
        { name: 'Làm sạch', value: 450000, color: '#3b82f6' },
        { name: 'Chuẩn hóa', value: 420000, color: '#10b981' },
        { name: 'Biến đổi', value: 380000, color: '#8b5cf6' },
        { name: 'Đang xử lý', value: 85000, color: '#f59e0b' },
        { name: 'Lỗi', value: 15000, color: '#ef4444' },
      ],
      stats: [
        { label: 'Hoàn thành', value: '1.25 triệu', change: '+8.2%', trend: 'up' },
        { label: 'Đang xử lý', value: '85 nghìn', change: '-15.3%', trend: 'down' },
        { label: 'Lỗi phát hiện', value: '15 nghìn', change: '-22.1%', trend: 'down' },
        { label: 'Tỷ lệ thành công', value: '98.8%', change: '+1.2%', trend: 'up' },
      ]
    },
    access: {
      title: 'Lượt truy cập hệ thống',
      description: 'Phân tích chi tiết lưu lượng truy cập và sử dụng hệ thống',
      data: [
        { time: '00:00', users: 245, requests: 1250 },
        { time: '04:00', users: 189, requests: 980 },
        { time: '08:00', users: 1456, requests: 7820 },
        { time: '12:00', users: 2341, requests: 12450 },
        { time: '16:00', users: 1987, requests: 10230 },
        { time: '20:00', users: 876, requests: 4560 },
      ],
      stats: [
        { label: 'Người dùng online', value: '1,234', change: '+18.5%', trend: 'up' },
        { label: 'Tổng truy cập/ngày', value: '37,290', change: '+9.3%', trend: 'up' },
        { label: 'API Requests', value: '156K', change: '+15.7%', trend: 'up' },
        { label: 'Thời gian phản hồi', value: '245ms', change: '-12.3%', trend: 'down' },
      ]
    },
    category: {
      title: 'Phân bổ danh mục',
      description: 'Thống kê chi tiết các danh mục dữ liệu trong hệ thống',
      data: [
        { name: 'Hộ tịch', value: 125000, color: '#3b82f6' },
        { name: 'Công chứng', value: 98000, color: '#10b981' },
        { name: 'TGPL', value: 87000, color: '#8b5cf6' },
        { name: 'Đăng ký KD', value: 75000, color: '#f59e0b' },
        { name: 'Khác', value: 45000, color: '#6b7280' },
      ],
      stats: [
        { label: 'Tổng danh mục', value: '430K', change: '+7.8%', trend: 'up' },
        { label: 'Danh mục mới', value: '1,245', change: '+23.4%', trend: 'up' },
        { label: 'Đã xuất bản', value: '98.5%', change: '+1.1%', trend: 'up' },
        { label: 'Chờ duyệt', value: '342', change: '-5.2%', trend: 'down' },
      ]
    }
  };

  const config = chartConfigs[chartType];

  const renderChart = () => {
    switch (chartType) {
      case 'collection':
        return (
          <ResponsiveContainer width="100%" height={450}>
            <LineChart data={config.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b" 
                tick={{ fill: '#64748b', fontSize: 13 }}
              />
              <YAxis 
                stroke="#64748b" 
                tick={{ fill: '#64748b', fontSize: 13 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value: number) => value.toLocaleString()}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line
                type="monotone"
                dataKey="thuThap"
                name="Thu thập"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="xuLy"
                name="Xử lý"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="chiaSet"
                name="Chia sẻ"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{ fill: '#a855f7', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'processing':
        return (
          <ResponsiveContainer width="100%" height={450}>
            <PieChart>
              <Pie
                data={config.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {config.data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => value.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'access':
        return (
          <ResponsiveContainer width="100%" height={450}>
            <BarChart data={config.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b" 
                tick={{ fill: '#64748b', fontSize: 13 }}
              />
              <YAxis 
                stroke="#64748b" 
                tick={{ fill: '#64748b', fontSize: 13 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value: number) => value.toLocaleString()}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="users" name="Người dùng" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="requests" name="Requests" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'category':
        return (
          <ResponsiveContainer width="100%" height={450}>
            <BarChart data={config.data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 13 }} />
              <YAxis 
                type="category" 
                dataKey="name" 
                stroke="#64748b" 
                tick={{ fill: '#64748b', fontSize: 13 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value: number) => value.toLocaleString()}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {config.data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
          <div>
            <h3 className="text-slate-900">{config.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{config.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              <Calendar className="w-4 h-4" />
              Lọc thời gian
            </button>
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
            {config.stats.map((stat: any, index: number) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="text-xs text-slate-500 mb-1">{stat.label}</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl text-slate-900">{stat.value}</div>
                  <div className={`flex items-center gap-1 text-xs ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`w-3 h-3 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="p-6">
          {renderChart()}
        </div>

        {/* Data Table Preview */}
        <div className="px-6 pb-6">
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
            <h4 className="text-sm text-slate-900 mb-3">Dữ liệu chi tiết</h4>
            <div className="bg-white rounded border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    {chartType === 'collection' && (
                      <>
                        <th className="px-4 py-2 text-left text-xs text-slate-600">Tháng</th>
                        <th className="px-4 py-2 text-right text-xs text-slate-600">Thu thập</th>
                        <th className="px-4 py-2 text-right text-xs text-slate-600">Xử lý</th>
                        <th className="px-4 py-2 text-right text-xs text-slate-600">Chia sẻ</th>
                      </>
                    )}
                    {(chartType === 'processing' || chartType === 'category') && (
                      <>
                        <th className="px-4 py-2 text-left text-xs text-slate-600">Loại</th>
                        <th className="px-4 py-2 text-right text-xs text-slate-600">Số lượng</th>
                        <th className="px-4 py-2 text-right text-xs text-slate-600">Tỷ lệ</th>
                      </>
                    )}
                    {chartType === 'access' && (
                      <>
                        <th className="px-4 py-2 text-left text-xs text-slate-600">Thời gian</th>
                        <th className="px-4 py-2 text-right text-xs text-slate-600">Người dùng</th>
                        <th className="px-4 py-2 text-right text-xs text-slate-600">Requests</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {chartType === 'collection' && config.data.slice(0, 5).map((item: any, index: number) => (
                    <tr key={index} className="border-b border-slate-100">
                      <td className="px-4 py-2 text-slate-900">{item.month}</td>
                      <td className="px-4 py-2 text-right text-slate-700">{item.thuThap.toLocaleString()}</td>
                      <td className="px-4 py-2 text-right text-slate-700">{item.xuLy.toLocaleString()}</td>
                      <td className="px-4 py-2 text-right text-slate-700">{item.chiaSet.toLocaleString()}</td>
                    </tr>
                  ))}
                  {(chartType === 'processing' || chartType === 'category') && config.data.map((item: any, index: number) => {
                    const total = config.data.reduce((sum: number, d: any) => sum + d.value, 0);
                    const percentage = ((item.value / total) * 100).toFixed(1);
                    return (
                      <tr key={index} className="border-b border-slate-100">
                        <td className="px-4 py-2 text-slate-900">{item.name}</td>
                        <td className="px-4 py-2 text-right text-slate-700">{item.value.toLocaleString()}</td>
                        <td className="px-4 py-2 text-right text-slate-700">{percentage}%</td>
                      </tr>
                    );
                  })}
                  {chartType === 'access' && config.data.map((item: any, index: number) => (
                    <tr key={index} className="border-b border-slate-100">
                      <td className="px-4 py-2 text-slate-900">{item.time}</td>
                      <td className="px-4 py-2 text-right text-slate-700">{item.users.toLocaleString()}</td>
                      <td className="px-4 py-2 text-right text-slate-700">{item.requests.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-xs text-slate-500 mt-2 text-center">
              {chartType === 'collection' ? 'Hiển thị 5/12 bản ghi' : `Hiển thị ${config.data.length} bản ghi`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
