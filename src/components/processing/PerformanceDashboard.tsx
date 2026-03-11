import { useState } from 'react';
import { BarChart3, TrendingUp, Clock, Database, Zap, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

interface PerformanceMetric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: any;
  color: string;
}

const performanceMetrics: PerformanceMetric[] = [
  {
    label: 'Tốc độ xử lý TB',
    value: '2,450',
    change: 12.5,
    trend: 'up',
    icon: Zap,
    color: 'blue',
  },
  {
    label: 'Thời gian TB/bản ghi',
    value: '0.8s',
    change: -8.3,
    trend: 'down',
    icon: Clock,
    color: 'green',
  },
  {
    label: 'Tỷ lệ thành công',
    value: '99.4%',
    change: 2.1,
    trend: 'up',
    icon: CheckCircle,
    color: 'purple',
  },
  {
    label: 'Số lỗi TB/ngày',
    value: '124',
    change: -15.2,
    trend: 'down',
    icon: AlertTriangle,
    color: 'orange',
  },
];

const processingHistory = [
  { date: '01/12', records: 45200, time: 36.5, success: 99.2 },
  { date: '02/12', records: 38900, time: 31.2, success: 99.5 },
  { date: '03/12', records: 52100, time: 41.8, success: 98.8 },
  { date: '04/12', records: 48300, time: 38.6, success: 99.3 },
  { date: '05/12', records: 55800, time: 44.2, success: 99.1 },
  { date: '06/12', records: 61200, time: 48.5, success: 99.6 },
  { date: '07/12', records: 58700, time: 46.3, success: 99.4 },
  { date: '08/12', records: 47600, time: 37.8, success: 99.7 },
];

const sourcePerformance = [
  {
    source: 'Cơ sở dữ liệu đấu giá viên',
    department: 'Cục Đăng ký quốc gia giao dịch bảo đảm',
    totalRecords: 15420,
    avgTime: '15 phút',
    successRate: 99.74,
    rulesApplied: 12,
    lastRun: '08/12/2024',
  },
  {
    source: 'Thông tin công chứng viên',
    department: 'Cục Công chứng',
    totalRecords: 8750,
    avgTime: '13 phút',
    successRate: 100,
    rulesApplied: 8,
    lastRun: '08/12/2024',
  },
  {
    source: 'Hồ sơ trợ giúp pháp lý',
    department: 'Cục Trợ giúp pháp lý',
    totalRecords: 23450,
    avgTime: '32 phút',
    successRate: 98.59,
    rulesApplied: 15,
    lastRun: '08/12/2024',
  },
  {
    source: 'Hợp đồng công chứng',
    department: 'Cục Công chứng',
    totalRecords: 45200,
    avgTime: '45 phút',
    successRate: 99.51,
    rulesApplied: 18,
    lastRun: '07/12/2024',
  },
  {
    source: 'Văn bản quy phạm pháp luật',
    department: 'Cục Kiểm soát TTHC',
    totalRecords: 125000,
    avgTime: '2 giờ 15 phút',
    successRate: 97.8,
    rulesApplied: 22,
    lastRun: '08/12/2024',
  },
];

const ruleEfficiency = [
  { rule: 'Format - Chuẩn hóa họ tên', applied: 45230, avgTime: '0.3s', successRate: 99.8 },
  { rule: 'Validation - Kiểm tra CMND/CCCD', applied: 38920, avgTime: '0.5s', successRate: 98.5 },
  { rule: 'Reference - Đối sánh tỉnh/thành', applied: 52100, avgTime: '0.8s', successRate: 97.2 },
  { rule: 'Duplicate - Phát hiện trùng lặp', applied: 15420, avgTime: '1.2s', successRate: 99.1 },
  { rule: 'Transform - Chuẩn hóa địa chỉ', applied: 43680, avgTime: '0.6s', successRate: 98.9 },
];

export function PerformanceDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');

  const getMetricColor = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
      green: { bg: 'bg-green-50', text: 'text-green-600' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-slate-900 mb-1">Dashboard hiệu suất xử lý</h3>
          <p className="text-sm text-slate-600">
            Thống kê và phân tích hiệu suất xử lý dữ liệu
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPeriod('7days')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              selectedPeriod === '7days'
                ? 'bg-blue-600 text-white'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            7 ngày
          </button>
          <button
            onClick={() => setSelectedPeriod('30days')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              selectedPeriod === '30days'
                ? 'bg-blue-600 text-white'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            30 ngày
          </button>
          <button
            onClick={() => setSelectedPeriod('90days')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              selectedPeriod === '90days'
                ? 'bg-blue-600 text-white'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            90 ngày
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => {
          const colors = getMetricColor(metric.color);
          const Icon = metric.icon;
          
          return (
            <div key={index} className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${colors.bg} rounded-lg`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-1">{metric.label}</p>
              <p className="text-2xl text-slate-900">{metric.value}</p>
              <p className="text-xs text-slate-500 mt-2">
                {metric.trend === 'up' ? 'Tăng' : 'Giảm'} so với kỳ trước
              </p>
            </div>
          );
        })}
      </div>

      {/* Processing History Chart */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-slate-900 mb-1">Lịch sử xử lý 7 ngày gần nhất</h4>
            <p className="text-sm text-slate-600">Số lượng bản ghi và thời gian xử lý theo ngày</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span className="text-slate-600">Số bản ghi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span className="text-slate-600">Thời gian (phút)</span>
            </div>
          </div>
        </div>
        
        {/* Simple Bar Chart */}
        <div className="flex items-end justify-between gap-2 h-64">
          {processingHistory.map((day, index) => {
            const maxRecords = Math.max(...processingHistory.map(d => d.records));
            const maxTime = Math.max(...processingHistory.map(d => d.time));
            const recordHeight = (day.records / maxRecords) * 100;
            const timeHeight = (day.time / maxTime) * 100;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex gap-1 items-end" style={{ height: '200px' }}>
                  <div
                    className="flex-1 bg-blue-600 rounded-t hover:bg-blue-700 transition-colors relative group"
                    style={{ height: `${recordHeight}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {day.records.toLocaleString()}
                    </div>
                  </div>
                  <div
                    className="flex-1 bg-green-600 rounded-t hover:bg-green-700 transition-colors relative group"
                    style={{ height: `${timeHeight}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {day.time} phút
                    </div>
                  </div>
                </div>
                <span className="text-xs text-slate-600">{day.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Source Performance */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <h4 className="text-slate-900">Hiệu suất theo nguồn dữ liệu</h4>
          <p className="text-sm text-slate-600 mt-1">Phân tích chi tiết từng nguồn dữ liệu</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Nguồn dữ liệu</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Tổng bản ghi</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Thời gian TB</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Tỷ lệ thành công</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Quy tắc</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Lần chạy cuối</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sourcePerformance.map((source, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-900">{source.source}</p>
                    <p className="text-xs text-slate-500">{source.department}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-900">{source.totalRecords.toLocaleString()}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-900">{source.avgTime}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-[100px] bg-slate-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            source.successRate >= 99 ? 'bg-green-600' :
                            source.successRate >= 95 ? 'bg-blue-600' : 'bg-orange-600'
                          }`}
                          style={{ width: `${source.successRate}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-900">{source.successRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                      {source.rulesApplied} quy tắc
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-600">{source.lastRun}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rule Efficiency */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <h4 className="text-slate-900">Hiệu suất quy tắc xử lý</h4>
          <p className="text-sm text-slate-600 mt-1">Top 5 quy tắc được sử dụng nhiều nhất</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {ruleEfficiency.map((rule, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-slate-900">{rule.rule}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-600">
                        <span className="text-blue-600">{rule.applied.toLocaleString()}</span> lần
                      </span>
                      <span className="text-slate-600">
                        TB: <span className="text-green-600">{rule.avgTime}</span>
                      </span>
                      <span className="text-slate-600">
                        <span className="text-purple-600">{rule.successRate}%</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                      style={{ width: `${rule.successRate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-slate-900">Dung lượng xử lý</h4>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600">Đã sử dụng</span>
                <span className="text-slate-900">2.8 TB / 5 TB</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: '56%' }}></div>
              </div>
            </div>
            <p className="text-xs text-slate-500">56% dung lượng đã sử dụng</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="text-slate-900">CPU sử dụng</h4>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600">Trung bình</span>
                <span className="text-slate-900">42%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="h-2 bg-green-600 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <p className="text-xs text-slate-500">Mức sử dụng ổn định</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="text-slate-900">RAM sử dụng</h4>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600">Hiện tại</span>
                <span className="text-slate-900">12.5 GB / 32 GB</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="h-2 bg-purple-600 rounded-full" style={{ width: '39%' }}></div>
              </div>
            </div>
            <p className="text-xs text-slate-500">39% bộ nhớ đã sử dụng</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-slate-900 mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Khuyến nghị tối ưu hiệu suất
        </h4>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Tăng số luồng xử lý song song cho nguồn "Văn bản quy phạm pháp luật" để giảm thời gian xử lý</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Tối ưu quy tắc "Reference - Đối sánh tỉnh/thành" bằng cách cache danh mục tham chiếu</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Lên lịch xử lý các nguồn dữ liệu lớn vào giờ thấp điểm (22:00 - 06:00)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
