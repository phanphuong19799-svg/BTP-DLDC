import { X } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-slate-900">Thông tin cá nhân</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600" title="Đóng" aria-label="Đóng">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-2xl">NV</span>
              </div>
              <div>
                <h3 className="text-slate-900">Nguyễn Văn A</h3>
                <p className="text-slate-600 text-sm">Chuyên viên - Phòng Tin học</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">Mã nhân viên</label>
                <p className="text-slate-900">NV001</p>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Email</label>
                <p className="text-slate-900">nguyenvana@moj.gov.vn</p>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Số điện thoại</label>
                <p className="text-slate-900">024 3933 3333</p>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Phòng ban</label>
                <p className="text-slate-900">Phòng Tin học</p>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Chức vụ</label>
                <p className="text-slate-900">Chuyên viên</p>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Ngày tham gia</label>
                <p className="text-slate-900">01/01/2020</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 p-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
