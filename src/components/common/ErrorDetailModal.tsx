import { X, AlertCircle, FileText, Calendar, Info } from 'lucide-react';

interface ErrorRecord {
  id: number;
  recordId: string;
  fieldName: string;
  errorType: string;
  errorMessage: string;
  originalValue: string;
  expectedFormat?: string;
  timestamp: string;
}

interface SyncRecord {
  id: number;
  timestamp: string;
  status: 'success' | 'failed' | 'partial';
  recordsAdded: number;
  recordsUpdated: number;
  recordsFailed: number;
  totalRecords: number;
  duration: string;
  message?: string;
  errors?: ErrorRecord[];
}

interface ErrorDetailModalProps {
  isOpen?: boolean;
  onClose: () => void;
  record: SyncRecord;
}

export function ErrorDetailModal({ 
  isOpen = true, 
  onClose, 
  record
}: ErrorDetailModalProps) {
  if (!isOpen) return null;

  const errors = record.errors || [];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-red-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-slate-900">Danh sách lỗi đồng bộ</h3>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4 text-slate-600" />
                <p className="text-sm text-slate-600">Thời gian: {record.timestamp}</p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-100 rounded-lg transition-colors" title="Đóng" aria-label="Đóng"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Summary */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Tổng số lỗi:</span>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">
                {errors.length} bản ghi
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Loại lỗi:</span>
              <span className="text-sm text-slate-900">
                {new Set(errors.map(e => e.errorType)).size} loại
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-220px)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                    ID Bản ghi
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                    Trường dữ liệu
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                    Loại lỗi
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                    Mô tả lỗi
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                    Giá trị lỗi
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                    Định dạng mong đợi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {errors.map((error, index) => (
                  <tr key={error.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-900 font-mono">
                          {error.recordId}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-slate-900">
                        {error.fieldName}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                        <AlertCircle className="w-3 h-3" />
                        {error.errorType}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-slate-700">
                        {error.errorMessage}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <code className="px-2 py-1 bg-slate-100 text-red-600 rounded text-xs font-mono">
                        {error.originalValue}
                      </code>
                    </td>
                    <td className="px-4 py-4">
                      {error.expectedFormat ? (
                        <code className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-mono">
                          {error.expectedFormat}
                        </code>
                      ) : (
                        <span className="text-xs text-slate-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-900">
                <strong>Hướng dẫn xử lý:</strong>
              </p>
              <ul className="mt-2 space-y-1 text-sm text-blue-800">
                <li>• Kiểm tra và sửa lại dữ liệu tại hệ thống nguồn</li>
                <li>• Đảm bảo định dạng dữ liệu đúng theo quy định</li>
                <li>• Thực hiện đồng bộ lại sau khi sửa lỗi</li>
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                const csv = [
                  ['STT', 'ID Bản ghi', 'Trường dữ liệu', 'Loại lỗi', 'Mô tả lỗi', 'Giá trị lỗi', 'Định dạng mong đợi'],
                  ...errors.map((e, i) => [
                    i + 1,
                    e.recordId,
                    e.fieldName,
                    e.errorType,
                    e.errorMessage,
                    e.originalValue,
                    e.expectedFormat || '-'
                  ])
                ].map(row => row.join(',')).join('\n');
                
                const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `loi-dong-bo-${record.timestamp.replace(/[/:]/g, '-')}.csv`;
                link.click();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Xuất Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}