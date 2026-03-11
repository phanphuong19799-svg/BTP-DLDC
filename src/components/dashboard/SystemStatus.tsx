import { CheckCircle2, AlertCircle, Clock, Server } from 'lucide-react';

export function SystemStatus() {
  const now = new Date();
  const lastUpdate = new Date(now.getTime() - 5 * 60000); // 5 minutes ago
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  const statusItems = [
    {
      label: 'Trạng thái hệ thống',
      value: 'Hoạt động bình thường',
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Nguồn kết nối',
      value: '12/12 nguồn',
      icon: Server,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Cập nhật cuối',
      value: formatTime(lastUpdate),
      icon: Clock,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50'
    },
    {
      label: 'Cảnh báo',
      value: '2 thông báo',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-6 border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statusItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`${item.bgColor} p-2 rounded-lg`}>
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <div className="text-xs text-slate-500">{item.label}</div>
                <div className="text-sm text-slate-900">{item.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}