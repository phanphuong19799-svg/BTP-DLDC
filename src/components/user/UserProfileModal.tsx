import { X, User, Mail, Phone, MapPin, Calendar, Shield, Building2 } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-slate-900">Thông tin tài khoản</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Avatar & Basic Info */}
          <div className="flex items-center gap-6 pb-6 border-b border-slate-200">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
              <User className="w-12 h-12" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl text-slate-900">Nguyễn Văn A</h3>
              <p className="text-sm text-slate-600 mt-1">Quản trị viên hệ thống</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Đang hoạt động
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  Quản trị viên
                </span>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h4 className="text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              Thông tin cá nhân
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Họ và tên</label>
                <div className="text-sm text-slate-900">Nguyễn Văn A</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Email</label>
                <div className="flex items-center gap-2 text-sm text-slate-900">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  admin@moj.gov.vn
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Số điện thoại</label>
                <div className="flex items-center gap-2 text-sm text-slate-900">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  024 3826 8866
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Ngày sinh</label>
                <div className="flex items-center gap-2 text-sm text-slate-900">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  15/03/1985
                </div>
              </div>
            </div>
          </div>

          {/* Organization Information */}
          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-slate-900 mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              Thông tin đơn vị
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Đơn vị công tác</label>
                <div className="text-sm text-slate-900">Đơn vị A</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Phòng ban</label>
                <div className="text-sm text-slate-900">Vụ Công nghệ thông tin</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Chức vụ</label>
                <div className="text-sm text-slate-900">Chuyên viên</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Địa chỉ</label>
                <div className="flex items-start gap-2 text-sm text-slate-900">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span>60 Trần Phú, Ba Đình, Hà Nội</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-slate-900 mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              Thông tin tài khoản
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Tên đăng nhập</label>
                <div className="text-sm text-slate-900 font-mono">admin</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Nhóm người dùng</label>
                <div className="text-sm text-slate-900">Quản trị viên hệ thống</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Ngày tạo tài khoản</label>
                <div className="text-sm text-slate-900">01/01/2024</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Lần đăng nhập cuối</label>
                <div className="text-sm text-slate-900">09/12/2024 - 08:30:15</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Địa chỉ IP</label>
                <div className="text-sm text-slate-900 font-mono">192.168.1.100</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Trình duyệt</label>
                <div className="text-sm text-slate-900">Chrome 120.0.0</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}