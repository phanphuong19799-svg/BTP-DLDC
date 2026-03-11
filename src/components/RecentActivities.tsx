import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const activities = [
  {
    id: 1,
    title: 'Cập nhật CSDL A',
    status: 'completed',
    time: '10 phút trước',
    user: 'Đơn vị A'
  },
  {
    id: 2,
    title: 'Thu thập dữ liệu từ Hệ thống B',
    status: 'processing',
    time: '45 phút trước',
    user: 'Đơn vị B'
  },
  {
    id: 3,
    title: 'Đồng bộ dữ liệu CSDL C',
    status: 'completed',
    time: '2 giờ trước',
    user: 'Đơn vị C',
  },
  {
    id: 4,
    title: 'Xử lý Danh mục D',
    status: 'pending',
    time: '3 giờ trước',
    user: 'Đơn vị D',
  },
  {
    id: 5,
    title: 'Backup dữ liệu Hệ thống E',
    status: 'failed',
    time: '5 giờ trước',
    user: 'Đơn vị E',
  },
  {
    id: 6,
    title: 'Kiểm tra chất lượng CSDL F',
    status: 'completed',
    time: '6 giờ trước',
    user: 'Đơn vị F',
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-50',
    label: 'Hoàn thành',
  },
  processing: {
    icon: Clock,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    label: 'Đang xử lý',
  },
  warning: {
    icon: AlertCircle,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    label: 'Cảnh báo',
  },
  failed: {
    icon: XCircle,
    color: 'text-red-500',
    bg: 'bg-red-50',
    label: 'Thất bại',
  },
};

export function RecentActivities() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-gray-800">Hoạt động gần đây</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => {
          const config = statusConfig[activity.status as keyof typeof statusConfig];
          const Icon = config.icon;
          
          return (
            <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`${config.bg} p-2 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900">{activity.title}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-gray-500 text-sm">{activity.user}</span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-gray-500 text-sm">{activity.time}</span>
                  </div>
                </div>
                <div className={`${config.bg} ${config.color} px-3 py-1 rounded-full text-sm`}>
                  {config.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <button className="text-blue-600 hover:text-blue-700 text-sm">
          Xem tất cả hoạt động →
        </button>
      </div>
    </div>
  );
}