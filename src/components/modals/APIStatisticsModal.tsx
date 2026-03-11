import { X, BarChart3, Activity, TrendingUp, TrendingDown, Clock, CheckCircle } from 'lucide-react';

interface APIStatisticsModalProps {
  isOpen: boolean;
  service: any;
  onClose: () => void;
}

export function APIStatisticsModal({ isOpen, service, onClose }: APIStatisticsModalProps) {
  if (!isOpen || !service) return null;

  // Mock data for charts
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    calls: Math.floor(Math.random() * 500) + 100
  }));

  const dailyData = Array.from({ length: 7 }, (_, i) => ({
    day: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][i],
    calls: Math.floor(Math.random() * 3000) + 1000,
    errors: Math.floor(Math.random() * 50)
  }));

  const topConsumers = [
    { name: 'Bộ Công an', calls: 5420, percentage: 35 },
    { name: 'Bộ Tài chính', calls: 3850, percentage: 25 },
    { name: 'TAND TP.HCM', calls: 2310, percentage: 15 },
    { name: 'Ngân hàng ACB', calls: 1925, percentage: 12 },
    { name: 'Sở Tư pháp HN', calls: 1235, percentage: 8 }
  ];

  const errorTypes = [
    { type: '401 Unauthorized', count: 45, percentage: 42 },
    { type: '404 Not Found', count: 28, percentage: 26 },
    { type: '500 Internal Error', count: 18, percentage: 17 },
    { type: '429 Rate Limit', count: 16, percentage: 15 }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-slate-900">Thống kê API</h2>
              <p className="text-sm text-slate-600">{service.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <Activity className="w-5 h-5 opacity-80" />
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-2xl mb-1">{service.requestCount.toLocaleString()}</div>
              <div className="text-xs opacity-90">Tổng lượt gọi</div>
              <div className="text-xs mt-2 opacity-75">+12.5% so với tháng trước</div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-5 h-5 opacity-80" />
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-2xl mb-1">{service.successRate}%</div>
              <div className="text-xs opacity-90">Tỷ lệ thành công</div>
              <div className="text-xs mt-2 opacity-75">+0.3% so với tháng trước</div>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-5 h-5 opacity-80" />
                <TrendingDown className="w-4 h-4" />
              </div>
              <div className="text-2xl mb-1">{service.avgResponseTime}ms</div>
              <div className="text-xs opacity-90">Thời gian TB</div>
              <div className="text-xs mt-2 opacity-75">-15ms so với tháng trước</div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <X className="w-5 h-5 opacity-80" />
                <TrendingDown className="w-4 h-4" />
              </div>
              <div className="text-2xl mb-1">{Math.floor(service.requestCount * (1 - service.successRate / 100))}</div>
              <div className="text-xs opacity-90">Lỗi 7 ngày</div>
              <div className="text-xs mt-2 opacity-75">-8.2% so với tuần trước</div>
            </div>
          </div>

          {/* Hourly Chart */}
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h3 className="text-slate-900 mb-4">Lượt gọi theo giờ (24h qua)</h3>
            <div className="h-64 flex items-end gap-1">
              {hourlyData.map((item, idx) => {
                const maxCalls = Math.max(...hourlyData.map(d => d.calls));
                const height = (item.calls / maxCalls) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 hover:bg-blue-600 rounded-t transition-all cursor-pointer relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.calls} calls
                      </div>
                    </div>
                    {idx % 4 === 0 && (
                      <div className="text-xs text-slate-500 mt-2">{item.hour}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Chart */}
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h3 className="text-slate-900 mb-4">Thống kê 7 ngày qua</h3>
            <div className="h-64 flex items-end gap-4">
              {dailyData.map((item, idx) => {
                const maxCalls = Math.max(...dailyData.map(d => d.calls));
                const callHeight = (item.calls / maxCalls) * 100;
                const errorHeight = (item.errors / maxCalls) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex gap-1">
                      <div 
                        className="flex-1 bg-green-500 hover:bg-green-600 rounded-t transition-all cursor-pointer relative group"
                        style={{ height: `${callHeight * 2}px` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.calls} success
                        </div>
                      </div>
                      <div 
                        className="flex-1 bg-red-500 hover:bg-red-600 rounded-t transition-all cursor-pointer relative group"
                        style={{ height: `${errorHeight * 2}px` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.errors} errors
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-900 mt-2">{item.day}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm text-slate-600">Thành công</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-sm text-slate-600">Lỗi</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Top Consumers */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="text-slate-900 mb-4">Top đơn vị sử dụng nhiều nhất</h3>
              <div className="space-y-3">
                {topConsumers.map((consumer, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-slate-900">{consumer.name}</span>
                      <span className="text-sm text-slate-600">{consumer.calls.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                        style={{ width: `${consumer.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Distribution */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="text-slate-900 mb-4">Phân bổ lỗi theo loại</h3>
              <div className="space-y-3">
                {errorTypes.map((error, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-slate-900">{error.type}</span>
                      <span className="text-sm text-slate-600">{error.count}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all"
                        style={{ width: `${error.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Response Time Distribution */}
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h3 className="text-slate-900 mb-4">Phân bổ thời gian phản hồi</h3>
            <div className="grid grid-cols-5 gap-3">
              {[
                { range: '< 100ms', count: 8450, percentage: 55, color: 'green' },
                { range: '100-200ms', count: 4520, percentage: 29, color: 'blue' },
                { range: '200-500ms', count: 1850, percentage: 12, color: 'yellow' },
                { range: '500ms-1s', count: 420, percentage: 3, color: 'orange' },
                { range: '> 1s', count: 180, percentage: 1, color: 'red' }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl text-slate-900 mb-1">{item.count.toLocaleString()}</div>
                  <div className="text-xs text-slate-600 mb-2" dangerouslySetInnerHTML={{ __html: item.range }}></div>
                  <div className={`h-2 bg-${item.color}-500 rounded-full`}></div>
                  <div className="text-xs text-slate-500 mt-1">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
