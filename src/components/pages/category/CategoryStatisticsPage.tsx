import { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Download, RefreshCw, Database } from 'lucide-react';

const mockStatistics = [
  { id: '1', period: 'Tháng 12/2024', totalCategories: 24, newCategories: 2, totalRecords: 15234, updates: 45 },
  { id: '2', period: 'Tháng 11/2024', totalCategories: 22, newCategories: 3, totalRecords: 14567, updates: 38 },
  { id: '3', period: 'Tháng 10/2024', totalCategories: 19, newCategories: 1, totalRecords: 13892, updates: 29 },
];

export function CategoryStatisticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedYear, setSelectedYear] = useState('2024');

  const currentStats = mockStatistics[0];
  const previousStats = mockStatistics[1];

  const calculateGrowth = (current: number, previous: number) => {
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Thu thập số liệu thống kê danh mục</h1>
          <p className="text-sm text-slate-600 mt-1">Theo dõi và phân tích số liệu thống kê về các danh mục</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Làm mới dữ liệu
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-slate-600" />
          <label className="text-sm text-slate-700">Thời kỳ:</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="week">Theo tuần</option>
            <option value="month">Theo tháng</option>
            <option value="quarter">Theo quý</option>
            <option value="year">Theo năm</option>
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="2024">Năm 2024</option>
            <option value="2023">Năm 2023</option>
          </select>
          <button className="ml-auto px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-indigo-600" />
            </div>
            <div className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
              parseFloat(calculateGrowth(currentStats.totalCategories, previousStats.totalCategories)) >= 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              <TrendingUp className="w-3 h-3" />
              {calculateGrowth(currentStats.totalCategories, previousStats.totalCategories)}%
            </div>
          </div>
          <div className="text-xs text-slate-600 mb-1">Tổng danh mục</div>
          <div className="text-3xl text-slate-900 mb-2">{currentStats.totalCategories}</div>
          <div className="text-xs text-slate-500">+{currentStats.newCategories} danh mục mới trong tháng</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
              parseFloat(calculateGrowth(currentStats.totalRecords, previousStats.totalRecords)) >= 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              <TrendingUp className="w-3 h-3" />
              {calculateGrowth(currentStats.totalRecords, previousStats.totalRecords)}%
            </div>
          </div>
          <div className="text-xs text-slate-600 mb-1">Tổng bản ghi</div>
          <div className="text-3xl text-slate-900 mb-2">{currentStats.totalRecords.toLocaleString()}</div>
          <div className="text-xs text-slate-500">Trung bình {Math.round(currentStats.totalRecords / currentStats.totalCategories)} bản ghi/danh mục</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-purple-600" />
            </div>
            <div className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
              parseFloat(calculateGrowth(currentStats.updates, previousStats.updates)) >= 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              <TrendingUp className="w-3 h-3" />
              {calculateGrowth(currentStats.updates, previousStats.updates)}%
            </div>
          </div>
          <div className="text-xs text-slate-600 mb-1">Số lần cập nhật</div>
          <div className="text-3xl text-slate-900 mb-2">{currentStats.updates}</div>
          <div className="text-xs text-slate-500">{Math.round(currentStats.updates / currentStats.totalCategories)} lần/danh mục</div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Bảng số liệu theo thời kỳ
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Thời kỳ</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Tổng danh mục</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Danh mục mới</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Tổng bản ghi</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Số lần cập nhật</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Tăng trưởng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockStatistics.map((stat, index) => {
                const prevStat = mockStatistics[index + 1];
                const growth = prevStat ? calculateGrowth(stat.totalRecords, prevStat.totalRecords) : '0';
                return (
                  <tr key={stat.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-900">{stat.period}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{stat.totalCategories}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">+{stat.newCategories}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{stat.totalRecords.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{stat.updates}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs flex items-center gap-1 inline-flex ${
                        parseFloat(growth) >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        <TrendingUp className="w-3 h-3" />
                        {growth}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h4 className="text-sm text-slate-900 mb-4">Top 5 danh mục có nhiều bản ghi nhất</h4>
          <div className="space-y-3">
            {[
              { name: 'Danh mục A', records: 5234, percentage: 65 },
              { name: 'Danh mục B', records: 3892, percentage: 48 },
              { name: 'Danh mục C', records: 2567, percentage: 32 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700">{index + 1}. {item.name}</span>
                  <span className="text-slate-900">{item.records.toLocaleString()} bản ghi</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h4 className="text-sm text-slate-900 mb-4">Thống kê cập nhật theo thời gian</h4>
          <div className="space-y-2">
            {['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'].map((week, index) => {
              const percentage = [75, 92, 58, 83][index];
              return (
                <div key={week} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{week}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-slate-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="text-slate-900 w-12 text-right">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
