import { Database, FileText, Activity, CheckCircle, Scale, Users, FolderOpen, AlertTriangle } from 'lucide-react';

const stats = [
  {
    title: 'Tổng số văn bản pháp luật',
    value: '487,234',
    change: '+234 văn bản mới',
    icon: FileText,
    color: 'bg-red-600',
  },
  {
    title: 'Hồ sơ đang xử lý',
    value: '3,456',
    change: '+128 hồ sơ',
    icon: Activity,
    color: 'bg-orange-500',
  },
  {
    title: 'Danh mục pháp lý',
    value: '89',
    change: '12 danh mục hoạt động',
    icon: Scale,
    color: 'bg-blue-600',
  },
  {
    title: 'Dịch vụ công trực tuyến',
    value: '156',
    change: '+18 dịch vụ mới',
    icon: CheckCircle,
    color: 'bg-green-600',
  },
  {
    title: 'Người dùng hệ thống',
    value: '2,847',
    change: '+92 người dùng',
    icon: Users,
    color: 'bg-purple-600',
  },
  {
    title: 'Dữ liệu mở',
    value: '1,234',
    change: '234 GB dữ liệu',
    icon: FolderOpen,
    color: 'bg-teal-600',
  },
  {
    title: 'Yêu cầu truy vấn (24h)',
    value: '45,678',
    change: '+12.5%',
    icon: Database,
    color: 'bg-indigo-600',
  },
  {
    title: 'Cảnh báo hệ thống',
    value: '3',
    change: 'Cần xử lý',
    icon: AlertTriangle,
    color: 'bg-amber-500',
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-gray-900 mt-2">{stat.value}</p>
              <p className="text-green-600 text-sm mt-1">{stat.change}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}