import { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Download, RefreshCw, Database } from 'lucide-react';

interface StatisticsData {
  id: string;
  period: string;
  totalDatasets: number;
  newDatasets: number;
  totalDownloads: number;
  totalViews: number;
  activeUsers: number;
}

const mockStatistics: StatisticsData[] = [
  {
    id: '1',
    period: 'Tháng 12/2024',
    totalDatasets: 45,
    newDatasets: 3,
    totalDownloads: 2613,
    totalViews: 13810,
    activeUsers: 1247
  },
  {
    id: '2',
    period: 'Tháng 11/2024',
    totalDatasets: 42,
    newDatasets: 5,
    totalDownloads: 2274,
    totalViews: 11956,
    activeUsers: 1089
  },
  {
    id: '3',
    period: 'Tháng 10/2024',
    totalDatasets: 37,
    newDatasets: 2,
    totalDownloads: 1989,
    totalViews: 10234,
    activeUsers: 956
  },
];

export function OpenDataStatisticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedYear, setSelectedYear] = useState('2024');

  const currentStats = mockStatistics[0];
  const previousStats = mockStatistics[1];

  const calculateGrowth = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return growth.toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Thu thập số liệu thống kê</h1>
          <p className="text-sm text-slate-600 mt-1">Theo dõi và phân tích số liệu thống kê về dữ liệu mở</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Làm mới dữ liệu
        </button>
      </div>

      {/* Period Filter */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-slate-600" />
          <label className="text-sm text-slate-700">Thời kỳ:</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="week">Theo tuần</option>
            <option value="month">Theo tháng</option>
            <option value="quarter">Theo quý</option>
            <option value="year">Theo năm</option>
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="2024">Năm 2024</option>
            <option value="2023">Năm 2023</option>
            <option value="2022">Năm 2022</option>
          </select>
          <button className="ml-auto px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-emerald-600" />
            </div>
            <div className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
              parseFloat(calculateGrowth(currentStats.totalDatasets, previousStats.totalDatasets)) >= 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              <TrendingUp className="w-3 h-3" />
              {calculateGrowth(currentStats.totalDatasets, previousStats.totalDatasets)}%
            </div>
          </div>
          <div className="text-xs text-slate-600 mb-1">Tổng bộ dữ liệu</div>
          <div className="text-3xl text-slate-900 mb-2">{currentStats.totalDatasets}</div>
          <div className="text-xs text-slate-500">
            +{currentStats.newDatasets} bộ dữ liệu mới trong tháng
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <div className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
              parseFloat(calculateGrowth(currentStats.totalDownloads, previousStats.totalDownloads)) >= 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              <TrendingUp className="w-3 h-3" />
              {calculateGrowth(currentStats.totalDownloads, previousStats.totalDownloads)}%
            </div>
          </div>
          <div className="text-xs text-slate-600 mb-1">Tổng lượt tải</div>
          <div className="text-3xl text-slate-900 mb-2">{currentStats.totalDownloads.toLocaleString()}</div>
          <div className="text-xs text-slate-500">
            Trung bình {Math.round(currentStats.totalDownloads / currentStats.totalDatasets)} lượt/bộ dữ liệu
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
              parseFloat(calculateGrowth(currentStats.activeUsers, previousStats.activeUsers)) >= 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              <TrendingUp className="w-3 h-3" />
              {calculateGrowth(currentStats.activeUsers, previousStats.activeUsers)}%
            </div>
          </div>
          <div className="text-xs text-slate-600 mb-1">Người dùng hoạt động</div>
          <div className="text-3xl text-slate-900 mb-2">{currentStats.activeUsers.toLocaleString()}</div>
          <div className="text-xs text-slate-500">
            {currentStats.totalViews.toLocaleString()} lượt xem
          </div>
        </div>
      </div>

      {/* Statistics Table */}
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
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Tổng bộ dữ liệu</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Bộ dữ liệu mới</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Tổng lượt tải</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Tổng lượt xem</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Người dùng</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Tăng trưởng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockStatistics.map((stat, index) => {
                const prevStat = mockStatistics[index + 1];
                const growth = prevStat ? calculateGrowth(stat.totalDownloads, prevStat.totalDownloads) : '0';
                return (
                  <tr key={stat.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-900">{stat.period}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{stat.totalDatasets}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        +{stat.newDatasets}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{stat.totalDownloads.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{stat.totalViews.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{stat.activeUsers.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs flex items-center gap-1 inline-flex ${
                        parseFloat(growth) >= 0
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
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

      {/* Additional Insights */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h4 className="text-sm text-slate-900 mb-4">Top 5 bộ dữ liệu được tải nhiều nhất</h4>
          <div className="space-y-3">
            {[
              { name: 'Bộ dữ liệu A', downloads: 1523, percentage: 58 },
              { name: 'Bộ dữ liệu B', downloads: 856, percentage: 33 },
              { name: 'Bộ dữ liệu C', downloads: 234, percentage: 9 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700">{index + 1}. {item.name}</span>
                  <span className="text-slate-900">{item.downloads.toLocaleString()} lượt</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h4 className="text-sm text-slate-900 mb-4">Xu hướng truy cập theo giờ</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">8h - 12h</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-slate-900 w-12 text-right">85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">13h - 17h</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className="text-slate-900 w-12 text-right">92%</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">18h - 22h</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <span className="text-slate-900 w-12 text-right">45%</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">23h - 7h</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '12%' }}></div>
                </div>
                <span className="text-slate-900 w-12 text-right">12%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
