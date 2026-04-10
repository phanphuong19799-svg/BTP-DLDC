import { useState } from 'react';
import { 
  X, 
  FileText, 
  Filter,
  Calendar,
  Clock,
  User,
  Edit2,
  Trash2,
  Plus,
  RefreshCw,
  Download,
  Upload,
  Eye
} from 'lucide-react';

interface ActionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ActionRecord {
  id: string;
  date: string;
  time: string;
  user: string;
  module: string;
  action: string;
  description: string;
  target: string;
  status: 'success' | 'failed';
  type: 'create' | 'update' | 'delete' | 'view' | 'export' | 'import' | 'other';
}

const mockActionHistory: ActionRecord[] = [
  {
    id: '1',
    date: '2024-12-09',
    time: '14:30:22',
    user: 'Nguyễn Văn A',
    module: 'Quản lý người dùng',
    action: 'Cập nhật',
    description: 'Cập nhật thông tin người dùng "Trần Thị B"',
    target: 'User #125',
    status: 'success',
    type: 'update'
  },
  {
    id: '2',
    date: '2024-12-09',
    time: '13:15:45',
    user: 'Nguyễn Văn A',
    module: 'Thu thập dữ liệu',
    action: 'Thực hiện',
    description: 'Chạy job thu thập dữ liệu từ hệ thống đăng ký kinh doanh',
    target: 'Job #45',
    status: 'success',
    type: 'other'
  },
  {
    id: '3',
    date: '2024-12-09',
    time: '11:22:18',
    user: 'Nguyễn Văn A',
    module: 'Quản lý nhóm',
    action: 'Tạo mới',
    description: 'Tạo nhóm người dùng "Biên tập viên"',
    target: 'Group #12',
    status: 'success',
    type: 'create'
  },
  {
    id: '4',
    date: '2024-12-09',
    time: '10:45:33',
    user: 'Nguyễn Văn A',
    module: 'Xử lý dữ liệu',
    action: 'Xem',
    description: 'Xem chi tiết log xử lý dữ liệu',
    target: 'Log #892',
    status: 'success',
    type: 'view'
  },
  {
    id: '5',
    date: '2024-12-09',
    time: '09:30:15',
    user: 'Nguyễn Văn A',
    module: 'Sao lưu dữ liệu',
    action: 'Thực hiện',
    description: 'Sao lưu thủ công cơ sở dữ liệu',
    target: 'Backup',
    status: 'success',
    type: 'export'
  },
  {
    id: '6',
    date: '2024-12-08',
    time: '16:20:50',
    user: 'Nguyễn Văn A',
    module: 'Quản lý người dùng',
    action: 'Xóa',
    description: 'Xóa người dùng "Lê Văn C"',
    target: 'User #118',
    status: 'success',
    type: 'delete'
  },
  {
    id: '7',
    date: '2024-12-08',
    time: '15:10:25',
    user: 'Nguyễn Văn A',
    module: 'Quản lý danh mục',
    action: 'Cập nhật',
    description: 'Cập nhật danh mục văn bản pháp luật',
    target: 'Category #5',
    status: 'failed',
    type: 'update'
  },
  {
    id: '8',
    date: '2024-12-08',
    time: '14:05:12',
    user: 'Nguyễn Văn A',
    module: 'Báo cáo',
    action: 'Xuất',
    description: 'Xuất báo cáo thống kê tháng 11/2024',
    target: 'Report',
    status: 'success',
    type: 'export'
  },
  {
    id: '9',
    date: '2024-12-08',
    time: '11:30:40',
    user: 'Nguyễn Văn A',
    module: 'Cấu hình hệ thống',
    action: 'Cập nhật',
    description: 'Thay đổi cấu hình bảo mật mật khẩu',
    target: 'Config',
    status: 'success',
    type: 'update'
  },
  {
    id: '10',
    date: '2024-12-08',
    time: '09:15:30',
    user: 'Nguyễn Văn A',
    module: 'Quản lý chức năng',
    action: 'Tạo mới',
    description: 'Thêm chức năng "Quản lý báo cáo"',
    target: 'Function #23',
    status: 'success',
    type: 'create'
  }
];

const actionTypes = [
  { value: 'all', label: 'Tất cả loại' },
  { value: 'create', label: 'Tạo mới' },
  { value: 'update', label: 'Cập nhật' },
  { value: 'delete', label: 'Xóa' },
  { value: 'view', label: 'Xem' },
  { value: 'export', label: 'Xuất dữ liệu' },
  { value: 'import', label: 'Nhập dữ liệu' },
  { value: 'other', label: 'Khác' }
];

const modules = [
  'Tất cả module',
  'Quản lý người dùng',
  'Quản lý nhóm',
  'Thu thập dữ liệu',
  'Xử lý dữ liệu',
  'Quản lý danh mục',
  'Sao lưu dữ liệu',
  'Cấu hình hệ thống',
  'Quản lý chức năng',
  'Báo cáo'
];

export function ActionHistoryModal({ isOpen, onClose }: ActionHistoryModalProps) {
  const [filterType, setFilterType] = useState('all');
  const [filterModule, setFilterModule] = useState('Tất cả module');

  if (!isOpen) return null;

  const filteredHistory = mockActionHistory.filter(record => {
    const matchesType = filterType === 'all' || record.type === filterType;
    const matchesModule = filterModule === 'Tất cả module' || record.module === filterModule;
    return matchesType && matchesModule;
  });

  const getActionIcon = (type: ActionRecord['type']) => {
    switch (type) {
      case 'create':
        return <Plus className="w-4 h-4" />;
      case 'update':
        return <Edit2 className="w-4 h-4" />;
      case 'delete':
        return <Trash2 className="w-4 h-4" />;
      case 'view':
        return <Eye className="w-4 h-4" />;
      case 'export':
        return <Download className="w-4 h-4" />;
      case 'import':
        return <Upload className="w-4 h-4" />;
      default:
        return <RefreshCw className="w-4 h-4" />;
    }
  };

  const getActionColor = (type: ActionRecord['type']) => {
    switch (type) {
      case 'create':
        return 'bg-green-100 text-green-700';
      case 'update':
        return 'bg-blue-100 text-blue-700';
      case 'delete':
        return 'bg-red-100 text-red-700';
      case 'view':
        return 'bg-purple-100 text-purple-700';
      case 'export':
        return 'bg-orange-100 text-orange-700';
      case 'import':
        return 'bg-cyan-100 text-cyan-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getActionLabel = (type: ActionRecord['type']) => {
    const typeObj = actionTypes.find(t => t.value === type);
    return typeObj?.label || 'Khác';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-slate-900">Lịch sử thao tác</h3>
              <p className="text-sm text-slate-600 mt-0.5">
                Theo dõi các hành động thực hiện trên hệ thống
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Đóng" aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-slate-600" />
            <h4 className="text-sm text-slate-900">Bộ lọc</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-2">Loại hành động</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {actionTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-2">Module</label>
              <select
                value={filterModule}
                onChange={(e) => setFilterModule(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {modules.map(module => (
                  <option key={module} value={module}>
                    {module}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="p-6">
          <div className="mb-4 text-sm text-slate-600">
            Hiển thị {filteredHistory.length} bản ghi
          </div>
          
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              Không tìm thấy lịch sử thao tác phù hợp
            </div>
          ) : (
            <div className="space-y-3">
              {filteredHistory.map((record) => (
                <div
                  key={record.id}
                  className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getActionColor(record.type)}`}>
                      {getActionIcon(record.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${getActionColor(record.type)}`}>
                              {getActionLabel(record.type)}
                            </span>
                            <span className="text-sm text-slate-900">{record.action}</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                              record.status === 'success'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {record.status === 'success' ? 'Thành công' : 'Thất bại'}
                            </span>
                          </div>
                          <div className="text-sm text-slate-700">{record.description}</div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {record.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {record.time}
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-3 gap-4 text-xs mt-3">
                        <div>
                          <div className="text-slate-500 mb-1">Người thực hiện</div>
                          <div className="text-slate-900 flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {record.user}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-500 mb-1">Module</div>
                          <div className="text-slate-900">{record.module}</div>
                        </div>
                        <div>
                          <div className="text-slate-500 mb-1">Đối tượng</div>
                          <div className="text-slate-900 font-mono">{record.target}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-600">
              Dữ liệu được lưu trữ trong 90 ngày
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
