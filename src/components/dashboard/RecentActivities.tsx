import { CheckCircle, AlertCircle, Upload, Download, Clock, Eye } from 'lucide-react';
import { useState } from 'react';
import { DataTableViewer } from '../data-collection/DataTableViewer';

const activities = [
  {
    id: 1,
    type: 'success',
    icon: CheckCircle,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-50',
    title: 'Thu thập thành công',
    description: 'CSDL Hộ tịch điện tử - 2,345 bản ghi',
    time: '5 phút trước',
    status: 'completed'
  },
  {
    id: 2,
    type: 'processing',
    icon: Clock,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    title: 'Đang xử lý dữ liệu',
    description: 'Chuẩn hóa CSDL Thi hành án',
    time: '12 phút trước',
    status: 'processing'
  },
  {
    id: 3,
    type: 'share',
    icon: Download,
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    title: 'Chia sẻ dữ liệu',
    description: 'API truy cập danh mục quốc gia',
    time: '28 phút trước',
    status: 'completed'
  },
  {
    id: 4,
    type: 'error',
    icon: AlertCircle,
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    title: 'Cảnh báo lỗi',
    description: 'Phát hiện 34 bản ghi lỗi cần xử lý',
    time: '1 giờ trước',
    status: 'warning'
  },
  {
    id: 5,
    type: 'upload',
    icon: Upload,
    iconColor: 'text-teal-600',
    bgColor: 'bg-teal-50',
    title: 'Upload dữ liệu',
    description: 'CSDL Công chứng - 892 bản ghi',
    time: '2 giờ trước',
    status: 'completed'
  },
];

const getStatusBadge = (status: string) => {
  const statusConfig = {
    completed: { label: 'Hoàn thành', class: 'bg-green-100 text-green-700 border-green-200' },
    processing: { label: 'Đang xử lý', class: 'bg-blue-100 text-blue-700 border-blue-200' },
    warning: { label: 'Cảnh báo', class: 'bg-orange-100 text-orange-700 border-orange-200' },
    failed: { label: 'Thất bại', class: 'bg-red-100 text-red-700 border-red-200' },
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.completed;
  return config;
};

export function RecentActivities() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const handleViewData = (activity: any) => {
    setSelectedActivity(activity);
    setViewerOpen(true);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="mb-6">
        <h3 className="text-slate-900 mb-1">Hoạt động gần đây</h3>
        <p className="text-sm text-slate-500">Nhật ký hệ thống</p>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 text-xs text-slate-600 bg-slate-50">Loại</th>
              <th className="text-left py-3 px-4 text-xs text-slate-600 bg-slate-50">Hoạt động</th>
              <th className="text-left py-3 px-4 text-xs text-slate-600 bg-slate-50">Mô tả</th>
              <th className="text-left py-3 px-4 text-xs text-slate-600 bg-slate-50">Thời gian</th>
              <th className="text-left py-3 px-4 text-xs text-slate-600 bg-slate-50">Tình trạng</th>
              <th className="text-left py-3 px-4 text-xs text-slate-600 bg-slate-50">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => {
              const Icon = activity.icon;
              const statusBadge = getStatusBadge(activity.status);
              
              return (
                <tr key={activity.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className={`${activity.bgColor} p-2 rounded-lg inline-flex`}>
                      <Icon className={`w-4 h-4 ${activity.iconColor}`} />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-slate-900">{activity.title}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-slate-600">{activity.description}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs border ${statusBadge.class}`}>
                      {statusBadge.label}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {activity.status === 'completed' && (activity.type === 'success' || activity.type === 'upload') && (
                      <button
                        onClick={() => handleViewData(activity)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Xem dữ liệu
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <button className="w-full mt-6 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
        Xem tất cả hoạt động
      </button>

      {/* Data Table Viewer Modal */}
      {selectedActivity && (
        <DataTableViewer
          isOpen={viewerOpen}
          onClose={() => {
            setViewerOpen(false);
            setSelectedActivity(null);
          }}
          fileTitle={selectedActivity.title}
          dataType={selectedActivity.description}
        />
      )}
    </div>
  );
}