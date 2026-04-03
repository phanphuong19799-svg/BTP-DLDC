import { X, Download, CheckCircle, Send, Inbox, AlertTriangle, Calendar, Clock, History as HistoryIcon } from 'lucide-react';

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
    fromDate?: string;
    toDate?: string;
    sentCount?: number;
    receivedCount?: number;
    isReportSent?: boolean;
  } | null;
  onViewHistory?: () => void;
}

export function ReconciliationDetailModal({ isOpen, onClose, recordCode, record, onViewHistory }: ReconciliationDetailModalProps) {
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
            title="Đóng"
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

          {/* Thông tin đối soát - Redesigned */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Thông tin đối soát chi tiết</h3>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {record.receiveDate}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {lastReconciliation}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sent Card */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Send className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm text-slate-500 mb-1">Số lượng đã gửi</p>
                <p className="text-2xl font-bold text-blue-700">{(record.sentCount || 0).toLocaleString()}</p>
                <p className="text-xs text-blue-500 mt-1 italic">Dữ liệu từ hệ thống nguồn</p>
              </div>

              {/* Received Card */}
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                  <Inbox className="w-5 h-5 text-indigo-600" />
                </div>
                <p className="text-sm text-slate-500 mb-1">Số lượng đã nhận</p>
                <p className="text-2xl font-bold text-indigo-700">{(record.receivedCount || record.recordCount).toLocaleString()}</p>
                <p className="text-xs text-indigo-500 mt-1 italic">Dữ liệu tại hệ thống đích</p>
              </div>

              {/* Difference Card */}
              <div className={`rounded-xl p-4 flex flex-col items-center text-center border ${
                (record.sentCount || 0) - (record.receivedCount || record.recordCount) !== 0 
                  ? 'bg-rose-50/50 border-rose-100' 
                  : 'bg-emerald-50/50 border-emerald-100'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                  (record.sentCount || 0) - (record.receivedCount || record.recordCount) !== 0 
                    ? 'bg-rose-100' 
                    : 'bg-emerald-100'
                }`}>
                  <AlertTriangle className={`w-5 h-5 ${
                    (record.sentCount || 0) - (record.receivedCount || record.recordCount) !== 0 
                      ? 'text-rose-600' 
                      : 'text-emerald-600'
                  }`} />
                </div>
                <p className="text-sm text-slate-500 mb-1">Số lượng sai lệch</p>
                <p className={`text-2xl font-bold ${
                  (record.sentCount || 0) - (record.receivedCount || record.recordCount) !== 0 
                    ? 'text-rose-700' 
                    : 'text-emerald-700'
                }`}>
                  {Math.abs((record.sentCount || 0) - (record.receivedCount || record.recordCount)).toLocaleString()}
                </p>
                <p className={`text-xs mt-1 italic ${
                  (record.sentCount || 0) - (record.receivedCount || record.recordCount) !== 0 
                    ? 'text-rose-500' 
                    : 'text-emerald-500'
                }`}>
                  {(record.sentCount || 0) - (record.receivedCount || record.recordCount) !== 0 
                    ? 'Cần kiểm tra lại kết nối' 
                    : 'Dữ liệu trùng khớp hoàn toàn'}
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">Tỷ lệ khớp dữ liệu:</span>
                    <span className={`text-sm font-bold ${matchRate === 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {matchRate.toFixed(2)}%
                    </span>
                  </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner flex">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ease-out ${
                          matchRate === 100 ? 'bg-emerald-500' : 'bg-amber-500'
                        } w-[${matchRate}%]`}
                      />
                    </div>
                </div>

                <div className="flex flex-col gap-2 min-w-[180px]">
                  <span className="text-xs text-slate-500 font-medium px-1">Trạng thái xác thực:</span>
                  <div className="flex items-center">
                    {record.status === 'matched' && (
                      <span className="w-full px-4 py-2 text-sm font-semibold rounded-lg border bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Khớp dữ liệu
                      </span>
                    )}
                    {(record.status === 'mismatched' || record.status === 'error') && (
                      <div className="flex flex-col gap-2 w-full">
                        <span className="w-full px-4 py-2 text-sm font-semibold rounded-lg border bg-rose-50 text-rose-700 border-rose-200 flex items-center justify-center gap-2 text-center">
                          <AlertTriangle className="w-4 h-4" />
                          Có sai lệch dữ liệu
                        </span>
                        {record.isReportSent && (
                          <span className="w-full px-4 py-2 text-xs font-medium rounded-lg border bg-indigo-50 text-indigo-700 border-indigo-200 flex items-center justify-center gap-2">
                            <Send className="w-3.5 h-3.5" />
                            Đã gửi báo cáo về hệ thống nguồn
                          </span>
                        )}
                      </div>
                    )}
                    {record.status === 'pending' && (
                      <span className="w-full px-4 py-2 text-sm font-semibold rounded-lg border bg-amber-50 text-amber-700 border-amber-200 flex items-center justify-center gap-2">
                        Đang xử lý
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            title="Đóng bản ghi"
            className="px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
          >
            Đóng
          </button>
          
          <button 
            onClick={onViewHistory}
            title="Xem lịch sử đối soát của bộ dữ liệu này"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2"
          >
            <HistoryIcon className="w-4 h-4" />
            Xem lịch sử đối soát
          </button>

          <button 
            title="Tải báo cáo đối soát"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>
    </div>
  );
}