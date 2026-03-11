import { X, Bell, Clock, Eye, EyeOff, User, Mail, CheckCircle } from 'lucide-react';

interface NotificationDetail {
  id: string;
  sentTo: string;
  sentToEmail: string;
  sentToRole: string;
  sentAt: string;
  viewed: boolean;
  viewedAt?: string;
  notificationType: 'email' | 'system' | 'sms';
  subject: string;
  message: string;
}

interface NotificationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: NotificationDetail | null;
  logInfo?: {
    service: string;
    endpoint: string;
    status: number;
    timestamp: string;
  };
}

export function NotificationDetailModal({ 
  isOpen, 
  onClose, 
  notification,
  logInfo 
}: NotificationDetailModalProps) {
  if (!isOpen || !notification) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-slate-900">Chi tiết thông báo</h2>
              <p className="text-sm text-slate-600">Thông tin gửi thông báo lỗi hệ thống</p>
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
          {/* Error Context */}
          {logInfo && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-5">
              <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Thông tin lỗi
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-red-700">Dịch vụ</label>
                  <div className="text-red-900 mt-1">{logInfo.service}</div>
                </div>
                <div>
                  <label className="text-red-700">Thời gian xảy ra</label>
                  <div className="text-red-900 mt-1">{logInfo.timestamp}</div>
                </div>
                <div className="col-span-2">
                  <label className="text-red-700">Endpoint</label>
                  <code className="block text-red-900 mt-1 bg-white px-3 py-2 rounded border border-red-300 font-mono text-xs">
                    {logInfo.endpoint}
                  </code>
                </div>
                <div>
                  <label className="text-red-700">Status Code</label>
                  <div className="text-red-900 mt-1">
                    <span className="px-2 py-1 bg-red-200 text-red-800 rounded text-xs">
                      {logInfo.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Status */}
          <div className={`border rounded-lg p-5 ${
            notification.viewed 
              ? 'bg-green-50 border-green-200' 
              : 'bg-amber-50 border-amber-200'
          }`}>
            <h3 className="text-slate-900 mb-3 flex items-center gap-2">
              {notification.viewed ? (
                <>
                  <Eye className="w-5 h-5 text-green-600" />
                  <span>Đã xem</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-5 h-5 text-amber-600" />
                  <span>Chưa xem</span>
                </>
              )}
            </h3>
            {notification.viewed && notification.viewedAt && (
              <p className={`text-sm ${notification.viewed ? 'text-green-700' : 'text-amber-700'}`}>
                Người quản trị đã xem thông báo lúc: {notification.viewedAt}
              </p>
            )}
            {!notification.viewed && (
              <p className="text-sm text-amber-700">
                Thông báo chưa được xem bởi người quản trị
              </p>
            )}
          </div>

          {/* Recipient Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h3 className="text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Thông tin người nhận
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-blue-700">Người nhận</label>
                <div className="text-blue-900 mt-1">{notification.sentTo}</div>
              </div>
              <div>
                <label className="text-sm text-blue-700">Vai trò</label>
                <div className="text-blue-900 mt-1">
                  <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs">
                    {notification.sentToRole}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm text-blue-700">Email</label>
                <div className="text-blue-900 mt-1 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  {notification.sentToEmail}
                </div>
              </div>
              <div>
                <label className="text-sm text-blue-700">Thời gian gửi</label>
                <div className="text-blue-900 mt-1 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  {notification.sentAt}
                </div>
              </div>
            </div>
          </div>

          {/* Notification Content */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <h3 className="text-slate-900 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-slate-600" />
              Nội dung thông báo
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-slate-600">Loại thông báo</label>
                <div className="mt-1">
                  <span className={`px-2 py-1 rounded text-xs ${
                    notification.notificationType === 'email' 
                      ? 'bg-purple-100 text-purple-700'
                      : notification.notificationType === 'sms'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {notification.notificationType === 'email' ? 'Email' : 
                     notification.notificationType === 'sms' ? 'SMS' : 'Hệ thống'}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-600">Tiêu đề</label>
                <div className="text-slate-900 mt-1 bg-white px-3 py-2 rounded border border-slate-300">
                  {notification.subject}
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-600">Nội dung</label>
                <div className="text-slate-900 mt-1 bg-white px-3 py-2 rounded border border-slate-300 text-sm leading-relaxed">
                  {notification.message}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h3 className="text-slate-900 mb-4">Lịch sử</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  {notification.viewed && <div className="w-0.5 h-full bg-slate-200 my-1"></div>}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-900">Đã gửi thông báo</span>
                    <span className="text-xs text-slate-500">{notification.sentAt}</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Gửi đến {notification.sentTo} qua {notification.notificationType === 'email' ? 'Email' : notification.notificationType === 'sms' ? 'SMS' : 'Hệ thống'}
                  </div>
                </div>
              </div>
              
              {notification.viewed && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-900">Đã xem thông báo</span>
                      <span className="text-xs text-slate-500">{notification.viewedAt}</span>
                    </div>
                    <div className="text-xs text-slate-600">
                      {notification.sentTo} đã xem thông báo
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Đóng
          </button>
          {!notification.viewed && (
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Gửi lại thông báo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
