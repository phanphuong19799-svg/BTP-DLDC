import { Plus, Download, RefreshCw, FileText } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      icon: Plus,
      label: 'Thu thập mới',
      color: 'bg-blue-600 hover:bg-blue-700',
      onClick: () => alert('Mở form thu thập dữ liệu mới')
    },
    {
      icon: Download,
      label: 'Xuất báo cáo',
      color: 'bg-green-600 hover:bg-green-700',
      onClick: () => alert('Xuất báo cáo tổng quan')
    },
    {
      icon: RefreshCw,
      label: 'Đồng bộ',
      color: 'bg-purple-600 hover:bg-purple-700',
      onClick: () => alert('Đồng bộ dữ liệu từ nguồn')
    }
  ];

  return (
    <div className="flex gap-2">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.label}
            onClick={action.onClick}
            className={`${action.color} text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm`}
            title={action.label}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden md:inline">{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}
