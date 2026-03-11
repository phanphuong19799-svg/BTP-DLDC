import { X, AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface ErrorDetail {
  recordId: string;
  field: string;
  errorType: string;
  sourceValue: string;
  targetValue: string;
  severity: 'high' | 'medium' | 'low';
  severityText: string;
  severityColor: string;
}

interface ErrorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordCode: string;
}

export function ErrorDetailsModal({ isOpen, onClose, recordCode }: ErrorDetailsModalProps) {
  if (!isOpen) return null;

  const errors: ErrorDetail[] = [
    {
      recordId: 'DN-125478',
      field: 'Mã số thuế',
      errorType: 'Không khớp giá trị',
      sourceValue: '0123456789',
      targetValue: '0123456788',
      severity: 'high',
      severityText: 'Cao',
      severityColor: 'bg-red-100 text-red-700 border-red-200'
    },
    {
      recordId: 'DN-125479',
      field: 'Địa chỉ',
      errorType: 'Thiếu dữ liệu',
      sourceValue: 'Trống',
      targetValue: '123 Nguyễn Văn A, Quận 1, TP.HCM',
      severity: 'medium',
      severityText: 'Trung bình',
      severityColor: 'bg-orange-100 text-orange-700 border-orange-200'
    },
    {
      recordId: 'DN-125480',
      field: 'Ngày cấp',
      errorType: 'Định dạng không hợp lệ',
      sourceValue: '20/12/2024',
      targetValue: '2024-12-20',
      severity: 'low',
      severityText: 'Thấp',
      severityColor: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    },
    {
      recordId: 'DN-125481',
      field: 'Vốn điều lệ',
      errorType: 'Không khớp giá trị',
      sourceValue: '1000000000',
      targetValue: '1500000000',
      severity: 'high',
      severityText: 'Cao',
      severityColor: 'bg-red-100 text-red-700 border-red-200'
    },
    {
      recordId: 'DN-125482',
      field: 'Email',
      errorType: 'Thiếu dữ liệu',
      sourceValue: 'Trống',
      targetValue: 'contact@company.vn',
      severity: 'medium',
      severityText: 'Trung bình',
      severityColor: 'bg-orange-100 text-orange-700 border-orange-200'
    }
  ];

  const highErrors = errors.filter(e => e.severity === 'high').length;
  const mediumErrors = errors.filter(e => e.severity === 'medium').length;
  const lowErrors = errors.filter(e => e.severity === 'low').length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg text-slate-900">Thông báo lỗi chi tiết</h2>
            <p className="text-sm text-slate-600 mt-1">Mã bản ghi: {recordCode}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 rounded-lg border border-red-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-red-900">Lỗi nghiêm trọng</p>
                  <p className="text-2xl text-red-900 mt-1">{highErrors}</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg border border-orange-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-orange-900">Lỗi trung bình</p>
                  <p className="text-2xl text-orange-900 mt-1">{mediumErrors}</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-yellow-900">Lỗi nhẹ</p>
                  <p className="text-2xl text-yellow-900 mt-1">{lowErrors}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Error List Title */}
          <h3 className="text-sm text-slate-900 mb-4">Danh sách lỗi chi tiết</h3>

          {/* Error Table */}
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm text-slate-600">Mã bản ghi</th>
                    <th className="px-6 py-3 text-left text-sm text-slate-600">Trường dữ liệu</th>
                    <th className="px-6 py-3 text-left text-sm text-slate-600">Loại lỗi</th>
                    <th className="px-6 py-3 text-left text-sm text-slate-600">Giá trị nguồn</th>
                    <th className="px-6 py-3 text-left text-sm text-slate-600">Giá trị đích</th>
                    <th className="px-6 py-3 text-left text-sm text-slate-600">Mức độ</th>
                  </tr>
                </thead>
                <tbody>
                  {errors.map((error, index) => (
                    <tr key={index} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-900">{error.recordId}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{error.field}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{error.errorType}</td>
                      <td className="px-6 py-4 text-sm text-slate-400 italic">{error.sourceValue}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">{error.targetValue}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs rounded-full border ${error.severityColor}`}>
                          {error.severityText}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Error Details */}
          <div className="mt-6 space-y-3">
            <h3 className="text-sm text-slate-900 mb-3">Chi tiết lỗi</h3>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-900">
                    <span className="font-medium">DN-125478 - Mã số thuế</span>
                  </p>
                  <p className="text-sm text-red-700 mt-1">
                    Giá trị mã số thuế trong hệ thống nguồn và hệ thống đích không khớp
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-orange-900">
                    <span className="font-medium">DN-125479 - Địa chỉ</span>
                  </p>
                  <p className="text-sm text-orange-700 mt-1">
                    Trường địa chỉ không có giá trị trong hệ thống nguồn
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-900">
                    <span className="font-medium">DN-125480 - Ngày cấp</span>
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Định dạng ngày tháng không đúng chuẩn ISO 8601
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-900">
                    <span className="font-medium">DN-125481 - Vốn điều lệ</span>
                  </p>
                  <p className="text-sm text-red-700 mt-1">
                    Giá trị vốn điều lệ có sự chênh lệch giữa hai hệ thống
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-orange-900">
                    <span className="font-medium">DN-125482 - Email</span>
                  </p>
                  <p className="text-sm text-orange-700 mt-1">
                    Trường email không có giá trị trong hệ thống nguồn
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            Đóng
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Gửi lại danh sách
          </button>
        </div>
      </div>
    </div>
  );
}
