import { X, History as HistoryIcon, Monitor, MapPin, Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface AccessHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AccessRecord {
  id: string;
  date: string;
  time: string;
  ip: string;
  device: string;
  browser: string;
  location: string;
  status: 'success' | 'failed';
  action: string;
}

const mockAccessHistory: AccessRecord[] = [
  {
    id: '1',
    date: '2024-12-09',
    time: '08:30:15',
    ip: '192.168.1.100',
    device: 'Windows 11',
    browser: 'Chrome 120.0.0',
    location: 'Hà Nội, Việt Nam',
    status: 'success',
    action: 'Đăng nhập thành công'
  },
  {
    id: '2',
    date: '2024-12-08',
    time: '14:22:45',
    ip: '192.168.1.100',
    device: 'Windows 11',
    browser: 'Chrome 120.0.0',
    location: 'Hà Nội, Việt Nam',
    status: 'success',
    action: 'Đăng nhập thành công'
  },
  {
    id: '3',
    date: '2024-12-08',
    time: '08:15:30',
    ip: '192.168.1.100',
    device: 'Windows 11',
    browser: 'Chrome 120.0.0',
    location: 'Hà Nội, Việt Nam',
    status: 'success',
    action: 'Đăng nhập thành công'
  },
  {
    id: '4',
    date: '2024-12-07',
    time: '23:45:12',
    ip: '192.168.1.102',
    device: 'Android 14',
    browser: 'Chrome Mobile 119.0.0',
    location: 'Hà Nội, Việt Nam',
    status: 'failed',
    action: 'Đăng nhập thất bại - Sai mật khẩu'
  },
  {
    id: '5',
    date: '2024-12-07',
    time: '09:10:20',
    ip: '192.168.1.100',
    device: 'Windows 11',
    browser: 'Chrome 120.0.0',
    location: 'Hà Nội, Việt Nam',
    status: 'success',
    action: 'Đăng nhập thành công'
  },
  {
    id: '6',
    date: '2024-12-06',
    time: '15:30:05',
    ip: '192.168.1.100',
    device: 'Windows 11',
    browser: 'Chrome 119.0.0',
    location: 'Hà Nội, Việt Nam',
    status: 'success',
    action: 'Đăng nhập thành công'
  },
  {
    id: '7',
    date: '2024-12-06',
    time: '08:25:18',
    ip: '192.168.1.100',
    device: 'Windows 11',
    browser: 'Chrome 119.0.0',
    location: 'Hà Nội, Việt Nam',
    status: 'success',
    action: 'Đăng nhập thành công'
  },
  {
    id: '8',
    date: '2024-12-05',
    time: '13:55:42',
    ip: '192.168.1.100',
    device: 'Windows 11',
    browser: 'Chrome 119.0.0',
    location: 'Hà Nội, Việt Nam',
    status: 'success',
    action: 'Đăng nhập thành công'
  }
];

export function AccessHistoryModal({ isOpen, onClose }: AccessHistoryModalProps) {
  if (!isOpen) return null;

  const successCount = mockAccessHistory.filter(r => r.status === 'success').length;
  const failedCount = mockAccessHistory.filter(r => r.status === 'failed').length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <HistoryIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-slate-900">Lịch sử truy cập</h3>
              <p className="text-sm text-slate-600 mt-0.5">
                Theo dõi các lần đăng nhập vào hệ thống
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Statistics */}
        <div className="p-6 border-b border-slate-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <HistoryIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Tổng số lần</div>
                  <div className="text-2xl text-slate-900">{mockAccessHistory.length}</div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Thành công</div>
                  <div className="text-2xl text-green-600">{successCount}</div>
                </div>
              </div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Thất bại</div>
                  <div className="text-2xl text-red-600">{failedCount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="p-6">
          <div className="space-y-3">
            {mockAccessHistory.map((record) => (
              <div
                key={record.id}
                className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left Side - Main Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        record.status === 'success'
                          ? 'bg-green-100'
                          : 'bg-red-100'
                      }`}>
                        {record.status === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className={`text-sm ${
                          record.status === 'success'
                            ? 'text-slate-900'
                            : 'text-red-700'
                        }`}>
                          {record.action}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
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
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs pl-11">
                      <div>
                        <div className="text-slate-500 mb-1">Địa chỉ IP</div>
                        <div className="text-slate-900 font-mono">{record.ip}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-1">Thiết bị</div>
                        <div className="text-slate-900 flex items-center gap-1">
                          <Monitor className="w-3 h-3" />
                          {record.device}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-1">Trình duyệt</div>
                        <div className="text-slate-900">{record.browser}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-1">Vị trí</div>
                        <div className="text-slate-900 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {record.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-600">
              Hiển thị {mockAccessHistory.length} bản ghi gần nhất
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