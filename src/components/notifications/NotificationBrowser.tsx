import { Bell, Plus, Send, Clock, Users, Eye, Edit, Trash2, Search, Filter, Download } from 'lucide-react';
import { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  content: string;
  target: string;
  targetCount: number;
  status: 'draft' | 'sent' | 'scheduled';
  scheduledTime?: string;
  sentTime?: string;
  readCount: number;
  totalRecipients: number;
  icon: string;
  color: string;
  sender: string;
  senderRole: string;
  notes?: string;
}

const mockNotifications: Notification[] = [
  {
    id: 'NTF001',
    title: 'Cập nhật phiên bản hệ thống v2.1.0',
    content: 'Hệ thống sẽ được nâng cấp lên phiên bản 2.1.0 vào 22h tối nay. Vui lòng lưu công việc và đăng xuất trước thời điểm này để tránh mất dữ liệu.',
    target: 'Tất cả người dùng',
    targetCount: 200,
    status: 'sent',
    sentTime: '10/12/2024 09:00',
    readCount: 145,
    totalRecipients: 200,
    icon: '🔔',
    color: 'blue',
    sender: 'Nguyễn Văn A',
    senderRole: 'Quản trị viên hệ thống',
    notes: 'Nâng cấp bao gồm các tính năng mới về xử lý dữ liệu'
  },
  {
    id: 'NTF002',
    title: 'Bảo trì hệ thống định kỳ',
    content: 'Hệ thống sẽ tạm ngưng phục vụ từ 23h-01h để bảo trì và nâng cấp cơ sở dữ liệu.',
    target: 'Nhóm Quản trị viên',
    targetCount: 25,
    status: 'scheduled',
    scheduledTime: '15/12/2024 20:00',
    readCount: 0,
    totalRecipients: 25,
    icon: '⚙️',
    color: 'orange',
    sender: 'Nguyễn Văn A',
    senderRole: 'Quản trị viên hệ thống',
    notes: 'Cần chuẩn bị backup trước khi bảo trì'
  },
  {
    id: 'NTF003',
    title: 'Thông báo về quy trình mới',
    content: 'Áp dụng quy trình xử lý dữ liệu mới từ ngày 20/12/2024. Vui lòng xem tài liệu hướng dẫn đính kèm.',
    target: 'Nhóm Xử lý dữ liệu',
    targetCount: 50,
    status: 'draft',
    readCount: 0,
    totalRecipients: 50,
    icon: '📋',
    color: 'green',
    sender: 'Trần Thị B',
    senderRole: 'Trưởng phòng Xử lý dữ liệu',
    notes: 'Cần đào tạo cho nhân viên trước khi áp dụng'
  },
  {
    id: 'NTF004',
    title: 'Cảnh báo bảo mật',
    content: 'Phát hiện hoạt động đăng nhập bất thường từ IP lạ. Vui lòng kiểm tra và đổi mật khẩu ngay lập tức.',
    target: 'user.name@moj.gov.vn',
    targetCount: 1,
    status: 'sent',
    sentTime: '09/12/2024 15:30',
    readCount: 1,
    totalRecipients: 1,
    icon: '🔒',
    color: 'red',
    sender: 'Hệ thống',
    senderRole: 'Tự động',
    notes: 'Cảnh báo bảo mật mức cao'
  },
];

export function NotificationBrowser() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredNotifications = notifications.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterStatus === 'all' || n.status === filterStatus;
    return matchSearch && matchFilter;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: { label: 'Nháp', className: 'bg-slate-100 text-slate-700' },
      sent: { label: 'Đã gửi', className: 'bg-green-100 text-green-700' },
      scheduled: { label: 'Đã lên lịch', className: 'bg-blue-100 text-blue-700' }
    };
    const badge = badges[status as keyof typeof badges];
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${badge.className}`}>
        {badge.label}
      </span>
    );
  };

  const stats = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === 'sent').length,
    scheduled: notifications.filter(n => n.status === 'scheduled').length,
    draft: notifications.filter(n => n.status === 'draft').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Thông báo trình duyệt</h1>
          <p className="text-slate-600 mt-1">Quản lý gửi thông báo push đến trình duyệt của người dùng</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tạo thông báo mới
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-600 text-sm">Tổng số thông báo</div>
              <div className="text-slate-900 mt-1">{stats.total}</div>
            </div>
            <Bell className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-600 text-sm">Đã gửi</div>
              <div className="text-slate-900 mt-1">{stats.sent}</div>
            </div>
            <Send className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-600 text-sm">Đã lên lịch</div>
              <div className="text-slate-900 mt-1">{stats.scheduled}</div>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-600 text-sm">Nháp</div>
              <div className="text-slate-900 mt-1">{stats.draft}</div>
            </div>
            <Edit className="w-8 h-8 text-slate-600" />
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tiêu đề, nội dung..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="sent">Đã gửi</option>
            <option value="scheduled">Đã lên lịch</option>
            <option value="draft">Nháp</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-slate-700 text-sm w-[15%]">Tiêu đề</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm w-[20%]">Nội dung</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm w-[12%]">Người gửi</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm w-[12%]">Đối tượng nhận</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm w-[8%]">Trạng thái</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm w-[10%]">Thời gian</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm w-[8%]">Tỷ lệ đọc</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm w-[10%]">Ghi chú</th>
                <th className="px-4 py-3 text-left text-slate-700 text-sm w-[8%]">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredNotifications.map((notification) => {
                const readPercentage = Math.round((notification.readCount / notification.totalRecipients) * 100);
                const readColor = readPercentage >= 75 ? 'text-green-600' : readPercentage >= 50 ? 'text-blue-600' : readPercentage >= 25 ? 'text-orange-600' : 'text-red-600';

                return (
                  <tr key={notification.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl flex-shrink-0">{notification.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-slate-900 text-sm truncate">{notification.title}</div>
                          <div className="text-slate-500 text-xs mt-0.5">{notification.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-slate-600 text-sm line-clamp-2">
                        {notification.content}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="text-slate-900 text-sm">{notification.sender}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{notification.senderRole}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-slate-700 text-sm">
                        <div>{notification.target}</div>
                        <div className="text-xs text-slate-500 mt-0.5">({notification.targetCount} người)</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(notification.status)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-slate-700 text-sm">
                        {notification.status === 'sent' && notification.sentTime}
                        {notification.status === 'scheduled' && notification.scheduledTime}
                        {notification.status === 'draft' && <span className="text-slate-400">Chưa có</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <div className={readColor}>
                          {notification.readCount}/{notification.totalRecipients}
                        </div>
                        <div className={`text-xs mt-0.5 ${readColor}`}>
                          ({readPercentage}%)
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-slate-600 text-sm line-clamp-2">
                        {notification.notes || <span className="text-slate-400">-</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Xem chi tiết"
                          onClick={() => {
                            setSelectedNotification(notification);
                            setShowViewModal(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                          onClick={() => {
                            setSelectedNotification(notification);
                            setShowEditModal(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Notification Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-slate-900">Tạo thông báo mới</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-slate-700 mb-2">Tiêu đề thông báo *</label>
                <input
                  type="text"
                  placeholder="Nhập tiêu đề..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Nội dung thông báo *</label>
                <textarea
                  rows={4}
                  placeholder="Nhập nội dung..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Icon</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="🔔">🔔 Thông báo chung</option>
                    <option value="⚙️">⚙️ Bảo trì</option>
                    <option value="📋">📋 Tài liệu</option>
                    <option value="🔒">🔒 Bảo mật</option>
                    <option value="✅">✅ Thành công</option>
                    <option value="⚠️">⚠️ Cảnh báo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">Màu sắc</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="blue">Xanh dương</option>
                    <option value="green">Xanh lá</option>
                    <option value="orange">Cam</option>
                    <option value="red">Đỏ</option>
                    <option value="purple">Tím</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Đối tượng nhận *</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Tất cả người dùng (200 người)</option>
                  <option>Nhóm Quản trị viên (25 người)</option>
                  <option>Nhóm Xử lý dữ liệu (50 người)</option>
                  <option>Nhóm Thu thập dữ liệu (35 người)</option>
                  <option>Người dùng cụ thể...</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Ghi chú</label>
                <textarea
                  rows={2}
                  placeholder="Nhập ghi chú hoặc mô tả bổ sung (không bắt buộc)..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Thời gian gửi</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="sendTime" value="now" defaultChecked className="text-blue-600" />
                    <span className="text-slate-700">Gửi ngay</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="sendTime" value="schedule" className="text-blue-600" />
                    <span className="text-slate-700">Lên lịch</span>
                  </label>
                </div>
                <input
                  type="datetime-local"
                  className="w-full mt-2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white transition-colors"
              >
                Hủy
              </button>
              <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                Lưu
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Gửi thông báo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Notification Modal */}
      {showViewModal && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-slate-900">Xem thông báo</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-slate-700 mb-2">Tiêu đề thông báo *</label>
                <input
                  type="text"
                  placeholder="Nhập tiêu đề..."
                  value={selectedNotification.title}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Nội dung thông báo *</label>
                <textarea
                  rows={4}
                  placeholder="Nhập nội dung..."
                  value={selectedNotification.content}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Icon</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="🔔">🔔 Thông báo chung</option>
                    <option value="⚙️">⚙️ Bảo trì</option>
                    <option value="📋">📋 Tài liệu</option>
                    <option value="🔒">🔒 Bảo mật</option>
                    <option value="✅">✅ Thành công</option>
                    <option value="⚠️">⚠️ Cảnh báo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">Màu sắc</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="blue">Xanh dương</option>
                    <option value="green">Xanh lá</option>
                    <option value="orange">Cam</option>
                    <option value="red">Đỏ</option>
                    <option value="purple">Tím</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Đối tượng nhận *</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Tất cả người dùng (200 người)</option>
                  <option>Nhóm Quản trị viên (25 người)</option>
                  <option>Nhóm Xử lý dữ liệu (50 người)</option>
                  <option>Nhóm Thu thập dữ liệu (35 người)</option>
                  <option>Người dùng cụ thể...</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Ghi chú</label>
                <textarea
                  rows={2}
                  placeholder="Nhập ghi chú hoặc mô tả bổ sung (không bắt buộc)..."
                  value={selectedNotification.notes || ''}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Thời gian gửi</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="sendTime" value="now" defaultChecked className="text-blue-600" />
                    <span className="text-slate-700">Gửi ngay</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="sendTime" value="schedule" className="text-blue-600" />
                    <span className="text-slate-700">Lên lịch</span>
                  </label>
                </div>
                <input
                  type="datetime-local"
                  className="w-full mt-2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white transition-colors"
              >
                Hủy
              </button>
              <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                Lưu
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Gửi thông báo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Notification Modal */}
      {showEditModal && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-slate-900">Chỉnh sửa thông báo</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-slate-700 mb-2">Tiêu đề thông báo *</label>
                <input
                  type="text"
                  placeholder="Nhập tiêu đề..."
                  value={selectedNotification.title}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Nội dung thông báo *</label>
                <textarea
                  rows={4}
                  placeholder="Nhập nội dung..."
                  value={selectedNotification.content}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Icon</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="🔔">🔔 Thông báo chung</option>
                    <option value="⚙️">⚙️ Bảo trì</option>
                    <option value="📋">📋 Tài liệu</option>
                    <option value="🔒">🔒 Bảo mật</option>
                    <option value="✅">✅ Thành công</option>
                    <option value="⚠️">⚠️ Cảnh báo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">Màu sắc</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="blue">Xanh dương</option>
                    <option value="green">Xanh lá</option>
                    <option value="orange">Cam</option>
                    <option value="red">Đỏ</option>
                    <option value="purple">Tím</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Đối tượng nhận *</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Tất cả người dùng (200 người)</option>
                  <option>Nhóm Quản trị viên (25 người)</option>
                  <option>Nhóm Xử lý dữ liệu (50 người)</option>
                  <option>Nhóm Thu thập dữ liệu (35 người)</option>
                  <option>Người dùng cụ thể...</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Ghi chú</label>
                <textarea
                  rows={2}
                  placeholder="Nhập ghi chú hoặc mô tả bổ sung (không bắt buộc)..."
                  value={selectedNotification.notes || ''}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Thời gian gửi</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="sendTime" value="now" defaultChecked className="text-blue-600" />
                    <span className="text-slate-700">Gửi ngay</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="sendTime" value="schedule" className="text-blue-600" />
                    <span className="text-slate-700">Lên lịch</span>
                  </label>
                </div>
                <input
                  type="datetime-local"
                  className="w-full mt-2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white transition-colors"
              >
                Hủy
              </button>
              <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                Lưu
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Gửi thông báo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}