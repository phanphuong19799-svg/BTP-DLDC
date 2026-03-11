import { X, Server, Database, Code, Calendar, User, CheckCircle, XCircle, Clock, Shield, Activity, TrendingUp } from 'lucide-react';

interface ServiceDetailModalProps {
  isOpen: boolean;
  service: any;
  onClose: () => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onSuspend?: (id: string) => void;
  onPublish?: (id: string) => void;
}

export function ServiceDetailModal({ 
  isOpen, 
  service, 
  onClose, 
  onApprove, 
  onReject, 
  onSuspend,
  onPublish 
}: ServiceDetailModalProps) {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Server className="w-6 h-6 text-amber-600" />
            <h2 className="text-slate-900">Chi tiết dịch vụ dữ liệu</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-slate-900 mb-2">{service.name}</h3>
                <p className="text-sm text-slate-600">{service.description}</p>
              </div>
              {service.status === 'active' && (
                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Hoạt động
                </span>
              )}
              {service.status === 'pending' && (
                <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Chờ duyệt
                </span>
              )}
              {service.status === 'rejected' && (
                <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Từ chối
                </span>
              )}
              {service.status === 'inactive' && (
                <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Đình chỉ
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">Mã:</span>
                <code className="text-slate-900 font-mono">{service.code}</code>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">Database:</span>
                <span className="text-slate-900">{service.database}</span>
              </div>
            </div>
          </div>

          {/* Thông tin API */}
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h4 className="text-slate-900 mb-4">Thông tin API</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                  <div className="text-sm text-slate-600 mb-1">Endpoint</div>
                  <code className="text-sm text-blue-700 bg-blue-50 px-3 py-2 rounded block">
                    {service.apiEndpoint}
                  </code>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">Method</div>
                  <span className={`inline-block px-3 py-2 rounded text-sm ${
                    service.method === 'GET' ? 'bg-green-100 text-green-700' :
                    service.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                    service.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {service.method}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Mức độ truy cập</div>
                <div className="flex items-center gap-2">
                  <Shield className={`w-4 h-4 ${
                    service.accessLevel === 'public' ? 'text-green-600' :
                    service.accessLevel === 'internal' ? 'text-blue-600' :
                    'text-red-600'
                  }`} />
                  <span className="text-slate-900 capitalize">
                    {service.accessLevel === 'public' ? 'Công khai' : 
                     service.accessLevel === 'internal' ? 'Nội bộ' : 'Hạn chế'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Thống kê sử dụng */}
          {service.status === 'active' && (
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h4 className="text-slate-900 mb-4">Thống kê sử dụng</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-700">Tổng lượt gọi</span>
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl text-blue-900">{service.requestCount.toLocaleString()}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-green-700">Tỷ lệ thành công</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-2xl text-green-900">{service.successRate.toFixed(1)}%</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-amber-700">Thời gian TB</span>
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl text-amber-900">{service.avgResponseTime}ms</div>
                </div>
              </div>
            </div>
          )}

          {/* Thông tin quản lý */}
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h4 className="text-slate-900 mb-4">Thông tin quản lý</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-slate-600 mb-1">Đơn vị cung cấp</div>
                <div className="text-slate-900">{service.department}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Người tạo</div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-900">{service.createdBy}</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Ngày tạo</div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-900">{service.createdDate}</span>
                </div>
              </div>
              {service.approvedBy && (
                <>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Người phê duyệt</div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-900">{service.approvedBy}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Ngày phê duyệt</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-900">{service.approvedDate}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            {service.status === 'pending' && (
              <>
                <button
                  onClick={() => {
                    if (onApprove) onApprove(service.id);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Phê duyệt
                </button>
                <button
                  onClick={() => {
                    if (onReject) onReject(service.id);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Từ chối
                </button>
              </>
            )}
            {service.status === 'active' && (
              <>
                <button
                  onClick={() => {
                    if (onPublish) onPublish(service.id);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Công khai dịch vụ
                </button>
                <button
                  onClick={() => {
                    if (onSuspend) onSuspend(service.id);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Đình chỉ dịch vụ
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
