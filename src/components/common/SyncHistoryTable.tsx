import { History as HistoryIcon, CheckCircle, XCircle, AlertCircle, Calendar, Database, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { ErrorDetailModal } from './ErrorDetailModal';

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

interface SyncHistoryTableProps {
  records: SyncRecord[];
  isCollapsed?: boolean;
}

export function SyncHistoryTable({ records, isCollapsed = false }: SyncHistoryTableProps) {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedSyncRecord, setSelectedSyncRecord] = useState<SyncRecord | null>(null);

  const statusConfig = {
    success: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
      label: 'Thành công'
    },
    failed: {
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      label: 'Thất bại'
    },
    partial: {
      icon: AlertCircle,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      label: 'Một phần'
    }
  };

  const handleErrorClick = (record: SyncRecord) => {
    if (record.recordsFailed > 0 && record.errors) {
      setSelectedSyncRecord(record);
      setShowErrorModal(true);
    }
  };

  if (isCollapsed) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HistoryIcon className="w-5 h-5 text-slate-600" />
            <h3 className="text-slate-900">Lịch sử đồng bộ</h3>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs">
              {records.length} lần
            </span>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Xem tất cả
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-slate-600">Tổng số lần đồng bộ:</span>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full text-sm">
            {records.length} lần
          </span>
        </div>
        <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          Làm mới
        </button>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                Thời gian
              </th>
              <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-right text-xs text-slate-600 uppercase tracking-wider">
                Thêm mới
              </th>
              <th className="px-6 py-3 text-right text-xs text-slate-600 uppercase tracking-wider">
                Cập nhật
              </th>
              <th className="px-6 py-3 text-right text-xs text-slate-600 uppercase tracking-wider">
                Lỗi
              </th>
              <th className="px-6 py-3 text-right text-xs text-slate-600 uppercase tracking-wider">
                Tổng số
              </th>
              <th className="px-6 py-3 text-right text-xs text-slate-600 uppercase tracking-wider">
                Thời lượng
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {records.map((record) => {
              const config = statusConfig[record.status];
              const StatusIcon = config.icon;
              
              return (
                <tr key={record.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-900">{record.timestamp}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 ${config.bg} rounded-full`}>
                      <StatusIcon className={`w-4 h-4 ${config.color}`} />
                      <span className={`text-sm ${config.color}`}>{config.label}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-sm text-slate-900">{record.recordsAdded}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm text-slate-900">{record.recordsUpdated}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {record.recordsFailed > 0 ? (
                      <button
                        onClick={() => handleErrorClick(record)}
                        className="text-sm text-red-600 hover:text-red-800 hover:underline cursor-pointer transition-colors"
                      >
                        {record.recordsFailed}
                      </button>
                    ) : (
                      <span className="text-sm text-slate-400">0</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Database className="w-3 h-3 text-slate-400" />
                      <span className="text-sm text-slate-900">{record.totalRecords}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm text-slate-600">{record.duration}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-slate-600 mb-1">Tổng số lần đồng bộ</p>
            <p className="text-slate-900">{records.length}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 mb-1">Thành công</p>
            <p className="text-green-600">
              {records.filter(r => r.status === 'success').length}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-600 mb-1">Một phần</p>
            <p className="text-amber-600">
              {records.filter(r => r.status === 'partial').length}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-600 mb-1">Thất bại</p>
            <p className="text-red-600">
              {records.filter(r => r.status === 'failed').length}
            </p>
          </div>
        </div>
      </div>

      {/* Error Detail Modal */}
      {showErrorModal && selectedSyncRecord && (
        <ErrorDetailModal
          record={selectedSyncRecord}
          onClose={() => setShowErrorModal(false)}
        />
      )}
    </div>
  );
}