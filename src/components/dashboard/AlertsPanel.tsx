import { AlertCircle, AlertTriangle, Info, CheckCircle2, Clock } from 'lucide-react';

export function AlertsPanel() {
  const alerts = [
    {
      id: 1,
      type: 'error',
      title: 'Lỗi kết nối nguồn',
      message: 'Nguồn "Hộ tịch - Thanh Hóa" không thể kết nối',
      time: '5 phút trước',
      priority: 'high'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Tỷ lệ lỗi cao',
      message: 'Dữ liệu công chứng có tỷ lệ lỗi 8.5%',
      time: '15 phút trước',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'Đồng bộ hoàn tất',
      message: 'Đã đồng bộ 125,000 bản ghi từ nguồn ĐĐKKD',
      time: '1 giờ trước',
      priority: 'low'
    },
    {
      id: 4,
      type: 'success',
      title: 'Xử lý thành công',
      message: 'Hoàn thành xử lý batch #1234',
      time: '2 giờ trước',
      priority: 'low'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">Cao</span>;
      case 'medium':
        return <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">Trung bình</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-slate-900">Thông báo & Cảnh báo</h3>
            <p className="text-sm text-slate-500">Cập nhật mới nhất</p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
          {alerts.filter(a => a.priority === 'high' || a.priority === 'medium').length} mới
        </span>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-4 ${getAlertColor(alert.type)} hover:shadow-sm transition-shadow`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm text-slate-900">{alert.title}</h4>
                  {getPriorityBadge(alert.priority)}
                </div>
                <p className="text-xs text-slate-600 mb-2">{alert.message}</p>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{alert.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
        Xem tất cả thông báo
      </button>
    </div>
  );
}
