import { useState } from 'react';
import { Bell, Search, Filter, Trash2, Check, X, Eye, Mail, Clock, AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';
import { PageHeader } from '../common/PageHeader';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  source: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

export function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Thu thập dữ liệu thành công',
      message: 'Hệ thống đã tiếp nhận thành công 2,345 bản ghi từ CSDL Hộ tịch điện tử. Mã giao dịch: TXN-2025120701234.',
      type: 'success',
      source: 'Thu thập dữ liệu',
      timestamp: '10:30 - 07/12/2024',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '2',
      title: 'Phát hiện lỗi dữ liệu',
      message: 'Phát hiện 34 lỗi trong dữ liệu từ hệ thống Thi hành án dân sự. Vui lòng kiểm tra và xử lý.',
      type: 'error',
      source: 'Kiểm tra chất lượng',
      timestamp: '10:25 - 07/12/2024',
      isRead: false,
      priority: 'high'
    },
    {
      id: '3',
      title: 'Yêu cầu phê duyệt danh mục mới',
      message: 'Có yêu cầu phê duyệt danh mục "CSDL Công chứng viên" từ Nguyễn Văn A - Vụ Bổ trợ tư pháp',
      type: 'warning',
      source: 'Quản lý danh mục',
      timestamp: '09:15 - 07/12/2024',
      isRead: true,
      priority: 'high'
    },
    {
      id: '4',
      title: 'Hoàn tất đồng bộ dữ liệu',
      message: 'Quy trình đồng bộ dữ liệu với hệ thống DLDC-A đã hoàn tất. 1,567 bản ghi đã được cập nhật.',
      type: 'success',
      source: 'Đồng bộ dữ liệu',
      timestamp: '08:45 - 07/12/2024',
      isRead: true,
      priority: 'low'
    },
    {
      id: '5',
      title: 'Cập nhật hệ thống',
      message: 'Hệ thống sẽ được bảo trì vào 22:00 - 23:00 ngày 10/12/2024. Vui lòng lưu công việc trước thời gian này.',
      type: 'info',
      source: 'Hệ thống',
      timestamp: '07:00 - 07/12/2024',
      isRead: true,
      priority: 'medium'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Cao</span>;
      case 'medium':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">Trung bình</span>;
      default:
        return <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">Thấp</span>;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (selectedNotification?.id === id) {
      setSelectedNotification(null);
    }
  };

  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         n.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' ||
                         (filterType === 'unread' && !n.isRead) ||
                         (filterType === 'read' && n.isRead);
    return matchesSearch && matchesFilter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      <PageHeader title="Quản lý thông báo" icon={Bell} />
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Tổng thông báo</p>
              <p className="text-2xl text-slate-900 mt-1">{notifications.length}</p>
            </div>
            <Bell className="w-8 h-8 text-slate-400" />
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Chưa đọc</p>
              <p className="text-2xl text-blue-600 mt-1">{unreadCount}</p>
            </div>
            <Mail className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Ưu tiên cao</p>
              <p className="text-2xl text-red-600 mt-1">
                {notifications.filter(n => n.priority === 'high').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Hôm nay</p>
              <p className="text-2xl text-green-600 mt-1">{notifications.length}</p>
            </div>
            <Clock className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm thông báo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilterType('unread')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'unread'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Chưa đọc ({unreadCount})
            </button>
            <button
              onClick={() => setFilterType('read')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'read'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Đã đọc
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="divide-y divide-slate-200">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Không có thông báo nào</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-slate-50 transition-colors ${
                  !notification.isRead ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`text-slate-900 ${!notification.isRead ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {notification.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(notification.priority)}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notification.timestamp}
                      </span>
                      <span>Nguồn: {notification.source}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedNotification(notification)}
                      className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Đánh dấu đã đọc"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getTypeIcon(selectedNotification.type)}
                <div>
                  <h2 className="text-slate-900">{selectedNotification.title}</h2>
                  <p className="text-sm text-slate-600 mt-1">
                    {selectedNotification.timestamp} • {selectedNotification.source}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              <div className={`border-2 rounded-lg p-4 mb-4 ${getTypeColor(selectedNotification.type)}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">Mức độ ưu tiên:</span>
                  {getPriorityBadge(selectedNotification.priority)}
                </div>
              </div>
              <div className="prose max-w-none">
                <p className="text-slate-700 whitespace-pre-line">{selectedNotification.message}</p>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              {!selectedNotification.isRead && (
                <button
                  onClick={() => {
                    markAsRead(selectedNotification.id);
                    setSelectedNotification(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Đánh dấu đã đọc
                </button>
              )}
              <button
                onClick={() => setSelectedNotification(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}