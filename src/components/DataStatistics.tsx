import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Database, FileCheck, Share2 } from 'lucide-react';

const monthlyData = [
  { month: 'T1', thuThap: 4200, xuLy: 3800, cungCap: 3500 },
  { month: 'T2', thuThap: 3800, xuLy: 3600, cungCap: 3400 },
  { month: 'T3', thuThap: 4500, xuLy: 4200, cungCap: 3900 },
  { month: 'T4', thuThap: 5200, xuLy: 4800, cungCap: 4500 },
  { month: 'T5', thuThap: 4800, xuLy: 4600, cungCap: 4300 },
  { month: 'T6', thuThap: 5500, xuLy: 5200, cungCap: 4800 },
  { month: 'T7', thuThap: 6200, xuLy: 5800, cungCap: 5400 },
  { month: 'T8', thuThap: 5800, xuLy: 5600, cungCap: 5200 },
  { month: 'T9', thuThap: 6500, xuLy: 6200, cungCap: 5800 },
  { month: 'T10', thuThap: 7200, xuLy: 6800, cungCap: 6400 },
  { month: 'T11', thuThap: 6800, xuLy: 6500, cungCap: 6100 },
  { month: 'T12', thuThap: 7500, xuLy: 7200, cungCap: 6800 },
];

const summaryStats = [
  {
    title: 'Thu thập dữ liệu',
    value: '68,200',
    unit: 'bản ghi/tháng',
    trend: '+12.5%',
    icon: Database,
    color: 'bg-blue-500',
  },
  {
    title: 'Xử lý dữ liệu',
    value: '64,500',
    unit: 'bản ghi/tháng',
    trend: '+10.8%',
    icon: FileCheck,
    color: 'bg-green-500',
  },
  {
    title: 'Cung cấp dịch vụ',
    value: '60,800',
    unit: 'yêu cầu/tháng',
    trend: '+15.2%',
    icon: Share2,
    color: 'bg-purple-500',
  },
];

export function DataStatistics() {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryStats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`${stat.color} p-2 rounded-lg`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-600">{stat.title}</p>
                </div>
                <p className="text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.unit}</p>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-gray-900 mb-1">Biểu đồ xu hướng theo thời gian</h3>
          <p className="text-gray-500 text-sm">Thống kê 12 tháng gần nhất (năm 2025)</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              style={{ fontSize: '14px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '14px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="thuThap" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="Thu thập dữ liệu"
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="xuLy" 
              stroke="#10b981" 
              strokeWidth={3}
              name="Xử lý dữ liệu"
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="cungCap" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              name="Cung cấp dịch vụ"
              dot={{ fill: '#8b5cf6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-gray-900 mb-1">Biểu đồ cột so sánh</h3>
          <p className="text-gray-500 text-sm">So sánh khối lượng công việc theo tháng</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              style={{ fontSize: '14px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '14px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
            />
            <Bar 
              dataKey="thuThap" 
              fill="#3b82f6" 
              name="Thu thập dữ liệu"
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="xuLy" 
              fill="#10b981" 
              name="Xử lý dữ liệu"
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="cungCap" 
              fill="#8b5cf6" 
              name="Cung cấp dịch vụ"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
