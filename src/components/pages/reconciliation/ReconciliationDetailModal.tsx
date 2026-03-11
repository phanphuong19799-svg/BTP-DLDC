import { X, Download, CheckCircle } from 'lucide-react';

interface ReconciliationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordCode: string;
  record: {
    datasetCode: string;
    datasetName: string;
    providerSystem: string;
    dataType: string;
    recordCount: number;
    receiveDate: string;
    status: string;
    statusText: string;
    matchRate?: number;
    lastReconcileDate?: string;
  } | null;
}

export function ReconciliationDetailModal({ isOpen, onClose, recordCode, record }: ReconciliationDetailModalProps) {
  if (!isOpen || !record) return null;

  // Default values
  const providerCode = 'SYS_HOTICH';
  const lastReconciliation = record.lastReconcileDate || '2024-12-20 10:30:00';
  const matchRate = record.matchRate !== undefined ? record.matchRate : 100.0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between">
          <div>
            <h2 className="text-lg text-slate-900">Chi tiết bản ghi đối soát</h2>
            <p className="text-sm text-slate-500 mt-1">{record.datasetCode}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mã bộ dữ liệu */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1">Mã bộ dữ liệu</p>
              <p className="text-lg text-blue-900">{record.datasetCode}</p>
            </div>

            {/* Tên bộ dữ liệu */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-purple-600 mb-1">Tên bộ dữ liệu</p>
              <p className="text-lg text-purple-900">{record.datasetName}</p>
            </div>

            {/* Hệ thống cung cấp */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-600 mb-1">Hệ thống cung cấp</p>
              <p className="text-lg text-green-900 mb-1">{record.providerSystem}</p>
              <p className="text-xs text-green-600">{providerCode}</p>
            </div>

            {/* Loại dữ liệu */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-orange-600 mb-1">Loại dữ liệu</p>
              <p className="text-lg text-orange-900">{record.dataType}</p>
            </div>
          </div>

          {/* Thông tin đối soát */}
          <div className="space-y-3">
            <h3 className="text-sm text-slate-900">Thông tin đối soát</h3>
            
            <div className="bg-slate-50 rounded-lg p-4 space-y-3">
              {/* Số bản ghi */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Số bản ghi:</span>
                <span className="text-sm text-slate-900">{record.recordCount.toLocaleString()}</span>
              </div>

              {/* Ngày nhận */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Ngày nhận:</span>
                <span className="text-sm text-slate-900">{record.receiveDate}</span>
              </div>

              {/* Lần đối soát cuối */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Lần đối soát cuối:</span>
                <span className="text-sm text-slate-900">{lastReconciliation}</span>
              </div>

              {/* Trạng thái */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Trạng thái:</span>
                <div className="flex items-center">
                  {record.status === 'matched' && (
                    <span className="px-3 py-1.5 text-xs rounded-full border bg-green-100 text-green-700 border-green-200 flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3" />
                      Khớp dữ liệu
                    </span>
                  )}
                  {record.status === 'mismatched' && (
                    <span className="px-3 py-1.5 text-xs rounded-full border bg-red-100 text-red-700 border-red-200">
                      Không khớp
                    </span>
                  )}
                  {record.status === 'pending' && (
                    <span className="px-3 py-1.5 text-xs rounded-full border bg-yellow-100 text-yellow-700 border-yellow-200">
                      Đang xử lý
                    </span>
                  )}
                  {record.status === 'error' && (
                    <span className="px-3 py-1.5 text-xs rounded-full border bg-red-100 text-red-700 border-red-200">
                      Lỗi nghiêm trọng
                    </span>
                  )}
                </div>
              </div>

              {/* Tỷ lệ khớp */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Tỷ lệ khớp:</span>
                <div className="flex items-center gap-2 flex-1 max-w-[250px]">
                  <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-green-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${matchRate}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-900 min-w-[50px] text-right">
                    {matchRate.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
          >
            Đóng
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>
    </div>
  );
}