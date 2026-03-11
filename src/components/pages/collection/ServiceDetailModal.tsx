import { X, AlertCircle, CheckCircle, Upload } from 'lucide-react';

interface Service ModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: any;
}

// Modal Xem chi tiết đầy đủ
export function DetailServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg text-slate-900">Chi tiết kết nối API</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Tab 1 - Thông tin chung */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Thông tin chung</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-500 mb-1">CSDL</label>
                <p className="text-sm text-slate-900">{service.csdl || 'CSDL A'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Tên đơn vị</label>
                  <p className="text-sm text-slate-900">{service.tenDonVi || service.managingUnit}</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Hệ thống</label>
                  <p className="text-sm text-slate-900">{service.heThong || 'Chọn hệ thống'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Phân loại dữ liệu thu thập</label>
                  <p className="text-sm text-slate-900">{service.dataClassification || 'Chọn phân loại'}</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Mức độ bảo mật dữ liệu</label>
                  <p className="text-sm text-slate-900">{service.securityLevel || 'Chọn mức độ'}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Mô tả</label>
                <p className="text-sm text-slate-900">{service.description || 'API cung cấp dịch vụ A'}</p>
              </div>
              {service.attachedFile && (
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Chức năng đính kèm văn bản</label>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200">
                    <Upload className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-900">{service.attachedFile}</span>
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm text-slate-500 mb-1">Trạng thái</label>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  service.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {service.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {service.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                </span>
              </div>
            </div>
          </div>

          {/* Tab 2 - Thông tin đơn vị cung cấp */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Thông tin đơn vị cung cấp</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Tên đơn vị</label>
                <p className="text-sm text-slate-900">{service.providerName || 'Đơn vị A'}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Địa chỉ</label>
                <p className="text-sm text-slate-900">{service.providerAddress || '96 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Số điện thoại</label>
                  <p className="text-sm text-slate-900">{service.providerPhone || '024 3733 9999'}</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Địa chỉ email</label>
                  <p className="text-sm text-slate-900">{service.providerEmail || 'contact@moj.gov.vn'}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Nội dung</label>
                <p className="text-sm text-slate-900">{service.providerNote || 'Thông tin bổ sung về đơn vị'}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <strong>Lưu ý:</strong> Email này sẽ nhận thông báo khi kết nối API thành công hoặc có vấn đề phát sinh.
                </p>
              </div>
            </div>
          </div>

          {/* Tab 3 - Cấu hình kết nối */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Cấu hình Endpoint</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Base URL</label>
                <p className="text-sm text-slate-900 font-mono bg-slate-50 px-3 py-2 rounded border border-slate-200">
                  {service.baseUrl || 'https://api.example.com'}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Content Type</label>
                  <p className="text-sm text-slate-900">{service.contentType || 'application/json'}</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Method</label>
                  <p className="text-sm text-slate-900">{service.method || 'GET'}</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Loại API</label>
                  <p className="text-sm text-slate-900">{service.apiType || 'API KEY'}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Authentication</label>
                <p className="text-sm text-slate-900">{service.authentication || 'Bearer token'}</p>
              </div>
            </div>
          </div>

          {/* Cấu hình Retry */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Cấu hình Retry</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Số lần thử</label>
                <p className="text-sm text-slate-900">{service.retryCount || '1'}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">API Key</label>
                <p className="text-sm text-slate-900 font-mono">API Key</p>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Khoảng cách</label>
                <p className="text-sm text-slate-900">{service.retryInterval || '5 phút'}</p>
              </div>
            </div>
          </div>

          {/* Request & Response Sample */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Request & Response Sample</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-500 mb-2">Request Sample</label>
                <pre className="text-xs text-slate-900 bg-slate-50 p-3 rounded border border-slate-200 overflow-x-auto font-mono">
{service.requestSample || `{ "key1": "value1" }`}
                </pre>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">Response Sample</label>
                <pre className="text-xs text-slate-900 bg-slate-50 p-3 rounded border border-slate-200 overflow-x-auto font-mono">
{service.responseSample || 'Chưa có query nào'}
                </pre>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={service.isActivated || false}
                  disabled
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded"
                />
                <label className="text-sm text-slate-700">Kích hoạt kết nối</label>
              </div>
            </div>
          </div>

          {/* Cấu hình đơn vị LGSP */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Cấu hình đơn vị LGSP</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Mã đơn vị</label>
                <p className="text-sm text-slate-900">{service.maDonVi || '—'}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Mã hệ thống</label>
                <p className="text-sm text-slate-900">{service.maHeThong || '—'}</p>
              </div>
            </div>
          </div>

          {/* Tab 4 - Cấu hình thu thập */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Cấu hình thu thập dữ liệu</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Phương thức đồng bộ</label>
                  <p className="text-sm text-slate-900">{service.syncMethod || 'Chọn phương thức'}</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Tần suất thu thập</label>
                  <p className="text-sm text-slate-900">{service.collectFrequency || 'Chọn tần suất'}</p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <strong>Lưu ý:</strong> Lịch thu thập sẽ tự động chạy theo cấu hình. Hệ thống sẽ gửi thông báo khi có lỗi xảy ra trong quá trình thu thập.
                </p>
              </div>
            </div>
          </div>

          {/* Thông tin thời gian */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Thông tin thời gian</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Ngày tạo</label>
                <p className="text-sm text-slate-900">{service.createdAt || '—'}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Cập nhật lần cuối</label>
                <p className="text-sm text-slate-900">{service.updatedAt || '—'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
