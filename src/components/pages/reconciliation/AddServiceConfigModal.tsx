import { X, CheckCircle, Send, Calendar, HelpCircle } from 'lucide-react';

interface AddServiceConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddServiceConfigModal({ isOpen, onClose }: AddServiceConfigModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between">
          <div>
            <h2 className="text-lg text-slate-900">Tạo gói tin đối soát qua LGSP</h2>
            <p className="text-sm text-slate-500 mt-1">Cấu hình gói tin gửi tin đối soát qua Cổng LGSP</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Thông tin chung */}
          <div className="space-y-4">
            <h3 className="text-sm text-slate-900">Thông tin chung</h3>
            
            {/* Tên cấu hình đối soát */}
            <div>
              <label className="block text-sm text-slate-600 mb-2">Tên cấu hình đối soát</label>
              <input
                type="text"
                placeholder="VD: Đối soát ngày hệ thống B"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Hệ thống gửi & nhận */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-2">Hệ thống gửi (A)</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>-- Chọn hệ thống --</option>
                  <option>Hệ thống Hộ tịch</option>
                  <option>Hệ thống CSDL Quốc gia về dân cư</option>
                  <option>Hệ thống CSDL Quốc gia về TTXD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-2">Hệ thống nhận (B)</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>-- Chọn hệ thống --</option>
                  <option>Kho dữ liệu DLDC</option>
                  <option>Hệ thống LGSP</option>
                </select>
              </div>
            </div>

            {/* Mã dịch vụ & Loại đối soát */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-2">Mã dịch vụ LGSP</label>
                <input
                  type="text"
                  placeholder="VD: LGSP_RECONCILE_001"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-2">Loại đối soát</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Ngày</option>
                  <option>Tuần</option>
                  <option>Tháng</option>
                  <option>Năm</option>
                </select>
              </div>
            </div>
          </div>

          {/* Phạm vi & nội dung đối soát */}
          <div className="space-y-4">
            <h3 className="text-sm text-slate-900">Phạm vi & nội dung đối soát</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-2">Từ ngày</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-2">Đến ngày</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-2">Loại dữ liệu</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Chi tiết</option>
                  <option>Tổng hợp</option>
                  <option>Danh mục</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">Số bản ghi dự kiến</label>
              <input
                type="text"
                placeholder="VD: 850000"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Thông tin kỹ thuật LGSP */}
          <div className="space-y-4">
            <h3 className="text-sm text-slate-900">Thông tin kỹ thuật LGSP</h3>
            
            <div>
              <label className="block text-sm text-slate-600 mb-2">Endpoint LGSP</label>
              <input
                type="text"
                placeholder="https://lgsp.gov.vn/api/reconciliation"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-2">Service Name</label>
                <input
                  type="text"
                  placeholder="ReconciliationService"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-2">Phiên bản API</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>V2</option>
                  <option>V1</option>
                  <option>V3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-2">Phương thức</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>REST</option>
                  <option>SOAP</option>
                  <option>GraphQL</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bảo mật & xác thực */}
          <div className="space-y-4">
            <h3 className="text-sm text-slate-900">Bảo mật & xác thực</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-2">Cơ chế xác thực</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Chữ ký số</option>
                  <option>OAuth 2.0</option>
                  <option>JWT Token</option>
                  <option>API Key</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-2">Chứng thư số</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>-- Chọn CTS --</option>
                  <option>CTS Bộ Tư pháp</option>
                  <option>CTS LGSP</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lặp lịch & tự động hóa */}
          <div className="space-y-4">
            <h3 className="text-sm text-slate-900">Lặp lịch & tự động hóa</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-2">Tần suất gửi</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Hằng ngày</option>
                  <option>Hằng tuần</option>
                  <option>Hằng tháng</option>
                  <option>Tùy chỉnh</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-2">
                  Giờ gửi
                  <HelpCircle className="w-3.5 h-3.5 inline-block ml-1 text-slate-400" />
                </label>
                <input
                  type="text"
                  placeholder="--:-- --"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Ghi chú */}
          <div className="space-y-4">
            <h3 className="text-sm text-slate-900">Ghi chú</h3>
            
            <div>
              <label className="block text-sm text-slate-600 mb-2">Thông tin bổ sung</label>
              <textarea
                rows={3}
                placeholder="Nhập ghi chú hoặc thông tin bổ sung..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4" />
              Kiểm tra kết nối
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm">
              <Send className="w-4 h-4" />
              Gửi thử
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              Xem lịch
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 text-sm"
            >
              Hủy
            </button>
            <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 text-sm">
              Lưu cấu hình
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
