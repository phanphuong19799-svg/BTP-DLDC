import { useState } from 'react';
import { AlertTriangle, Edit, Save, X, Undo, History as HistoryIcon, CheckCircle, XCircle } from 'lucide-react';

interface ErrorRecord {
  id: string;
  recordId: string;
  sourceName: string;
  ruleType: string;
  ruleName: string;
  errorField: string;
  errorType: string;
  errorMessage: string;
  originalValue: any;
  currentValue: any;
  suggestedValue?: any;
  timestamp: string;
  status: 'pending' | 'fixed' | 'ignored';
  editHistory: EditHistoryItem[];
}

interface EditHistoryItem {
  id: string;
  timestamp: string;
  user: string;
  action: 'edit' | 'auto-fix' | 'revert';
  fieldName: string;
  oldValue: any;
  newValue: any;
  reason?: string;
}

const mockErrorRecords: ErrorRecord[] = [
  {
    id: 'ERR-001',
    recordId: 'DC-2024-012345',
    sourceName: 'Dữ liệu dân cư quốc gia',
    ruleType: 'Validation',
    ruleName: 'Kiểm tra mã tỉnh/thành',
    errorField: 'provinceCode',
    errorType: 'invalid_value',
    errorMessage: 'Mã tỉnh/thành "TP99" không tồn tại trong danh mục chuẩn',
    originalValue: 'TP99',
    currentValue: 'TP99',
    suggestedValue: '01',
    timestamp: '08/12/2024 08:30:15',
    status: 'pending',
    editHistory: [],
  },
  {
    id: 'ERR-002',
    recordId: 'DN-2024-067890',
    sourceName: 'Đăng ký doanh nghiệp',
    ruleType: 'Missing-value',
    ruleName: 'Kiểm tra trường bắt buộc',
    errorField: 'taxCode',
    errorType: 'missing',
    errorMessage: 'Trường "Mã số thuế" đang để trống',
    originalValue: null,
    currentValue: null,
    suggestedValue: '0123456789',
    timestamp: '08/12/2024 08:31:22',
    status: 'pending',
    editHistory: [],
  },
  {
    id: 'ERR-003',
    recordId: 'TAX-2024-098765',
    sourceName: 'Hệ thống thuế',
    ruleType: 'Format',
    ruleName: 'Chuẩn hóa số điện thoại',
    errorField: 'phoneNumber',
    errorType: 'invalid_format',
    errorMessage: 'Số điện thoại chứa ký tự không hợp lệ',
    originalValue: '09123abc45',
    currentValue: '0912345678',
    suggestedValue: '0912345678',
    timestamp: '08/12/2024 08:25:40',
    status: 'fixed',
    editHistory: [
      {
        id: 'EDIT-001',
        timestamp: '08/12/2024 08:32:10',
        user: 'Nguyễn Văn A',
        action: 'edit',
        fieldName: 'phoneNumber',
        oldValue: '09123abc45',
        newValue: '0912345678',
        reason: 'Loại bỏ ký tự không hợp lệ',
      },
    ],
  },
  {
    id: 'ERR-004',
    recordId: 'BHXH-2024-054321',
    sourceName: 'Bảo hiểm xã hội',
    ruleType: 'Duplicate',
    ruleName: 'Kiểm tra trùng lặp CMND/CCCD',
    errorField: 'citizenId',
    errorType: 'duplicate',
    errorMessage: 'CMND/CCCD "001088012345" đã tồn tại trong hệ thống',
    originalValue: '001088012345',
    currentValue: '001088012345',
    timestamp: '08/12/2024 08:28:33',
    status: 'ignored',
    editHistory: [],
  },
  {
    id: 'ERR-005',
    recordId: 'DC-2024-078901',
    sourceName: 'Dữ liệu dân cư quốc gia',
    ruleType: 'Outlier',
    ruleName: 'Kiểm tra giá trị ngoại lệ - Ngày sinh',
    errorField: 'dateOfBirth',
    errorType: 'outlier',
    errorMessage: 'Ngày sinh "1885-03-15" có vẻ không hợp lý (139 tuổi)',
    originalValue: '1885-03-15',
    currentValue: '1985-03-15',
    suggestedValue: '1985-03-15',
    timestamp: '08/12/2024 08:27:50',
    status: 'fixed',
    editHistory: [
      {
        id: 'EDIT-002',
        timestamp: '08/12/2024 08:33:25',
        user: 'Trần Thị B',
        action: 'edit',
        fieldName: 'dateOfBirth',
        oldValue: '1885-03-15',
        newValue: '1985-03-15',
        reason: 'Sửa lỗi nhập liệu năm sinh',
      },
    ],
  },
];

export function ErrorRecordEditor() {
  const [errorRecords, setErrorRecords] = useState<ErrorRecord[]>(mockErrorRecords);
  const [selectedRecord, setSelectedRecord] = useState<ErrorRecord | null>(null);
  const [editValue, setEditValue] = useState<any>('');
  const [editReason, setEditReason] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showHistory, setShowHistory] = useState(false);

  const filteredRecords = errorRecords.filter(rec => 
    filterStatus === 'all' || rec.status === filterStatus
  );

  const handleEdit = (record: ErrorRecord) => {
    setSelectedRecord(record);
    setEditValue(record.currentValue || '');
    setEditReason('');
  };

  const handleSave = () => {
    if (!selectedRecord) return;

    const newHistory: EditHistoryItem = {
      id: `EDIT-${Date.now()}`,
      timestamp: new Date().toLocaleString('vi-VN'),
      user: 'Người dùng hiện tại',
      action: 'edit',
      fieldName: selectedRecord.errorField,
      oldValue: selectedRecord.currentValue,
      newValue: editValue,
      reason: editReason || 'Chỉnh sửa thủ công',
    };

    setErrorRecords(prev => prev.map(rec => 
      rec.id === selectedRecord.id
        ? {
            ...rec,
            currentValue: editValue,
            status: 'fixed',
            editHistory: [...rec.editHistory, newHistory],
          }
        : rec
    ));

    setSelectedRecord(null);
    setEditValue('');
    setEditReason('');
  };

  const handleRevert = (record: ErrorRecord, historyItem: EditHistoryItem) => {
    const revertHistory: EditHistoryItem = {
      id: `EDIT-${Date.now()}`,
      timestamp: new Date().toLocaleString('vi-VN'),
      user: 'Người dùng hiện tại',
      action: 'revert',
      fieldName: record.errorField,
      oldValue: record.currentValue,
      newValue: historyItem.oldValue,
      reason: `Hoàn tác chỉnh sửa từ ${historyItem.timestamp}`,
    };

    setErrorRecords(prev => prev.map(rec =>
      rec.id === record.id
        ? {
            ...rec,
            currentValue: historyItem.oldValue,
            status: 'pending',
            editHistory: [...rec.editHistory, revertHistory],
          }
        : rec
    ));
  };

  const handleApplySuggestion = (record: ErrorRecord) => {
    if (!record.suggestedValue) return;

    const suggestionHistory: EditHistoryItem = {
      id: `EDIT-${Date.now()}`,
      timestamp: new Date().toLocaleString('vi-VN'),
      user: 'Hệ thống',
      action: 'auto-fix',
      fieldName: record.errorField,
      oldValue: record.currentValue,
      newValue: record.suggestedValue,
      reason: 'Áp dụng giá trị đề xuất từ hệ thống',
    };

    setErrorRecords(prev => prev.map(rec =>
      rec.id === record.id
        ? {
            ...rec,
            currentValue: record.suggestedValue,
            status: 'fixed',
            editHistory: [...rec.editHistory, suggestionHistory],
          }
        : rec
    ));
  };

  const handleIgnore = (record: ErrorRecord) => {
    setErrorRecords(prev => prev.map(rec =>
      rec.id === record.id
        ? { ...rec, status: 'ignored' }
        : rec
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'fixed':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Đã sửa
          </span>
        );
      case 'ignored':
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs flex items-center gap-1">
            <XCircle className="w-3 h-3" /> Bỏ qua
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Chưa xử lý
          </span>
        );
    }
  };

  const statusCounts = {
    all: errorRecords.length,
    pending: errorRecords.filter(r => r.status === 'pending').length,
    fixed: errorRecords.filter(r => r.status === 'fixed').length,
    ignored: errorRecords.filter(r => r.status === 'ignored').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-slate-900 mb-1">Chỉnh sửa bản ghi lỗi</h3>
        <p className="text-sm text-slate-600">
          Xem chi tiết lỗi, chỉnh sửa dữ liệu và theo dõi lịch sử thay đổi
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-600 mb-1">Tổng lỗi</p>
          <p className="text-2xl text-slate-900">{statusCounts.all}</p>
        </div>
        <div className="bg-white rounded-lg border border-red-200 p-4">
          <p className="text-sm text-red-600 mb-1">Chưa xử lý</p>
          <p className="text-2xl text-red-900">{statusCounts.pending}</p>
        </div>
        <div className="bg-white rounded-lg border border-green-200 p-4">
          <p className="text-sm text-green-600 mb-1">Đã sửa</p>
          <p className="text-2xl text-green-900">{statusCounts.fixed}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Bỏ qua</p>
          <p className="text-2xl text-gray-900">{statusCounts.ignored}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            filterStatus === 'all'
              ? 'bg-slate-900 text-white'
              : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Tất cả ({statusCounts.all})
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            filterStatus === 'pending'
              ? 'bg-red-600 text-white'
              : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Chưa xử lý ({statusCounts.pending})
        </button>
        <button
          onClick={() => setFilterStatus('fixed')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            filterStatus === 'fixed'
              ? 'bg-green-600 text-white'
              : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Đã sửa ({statusCounts.fixed})
        </button>
        <button
          onClick={() => setFilterStatus('ignored')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            filterStatus === 'ignored'
              ? 'bg-gray-600 text-white'
              : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Bỏ qua ({statusCounts.ignored})
        </button>
      </div>

      {/* Error Records List */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Mã lỗi</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Nguồn dữ liệu</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Mã bản ghi</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Quy tắc</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Trường lỗi</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Giá trị hiện tại</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Trạng thái</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-blue-600">{record.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-900">{record.sourceName}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-slate-900">{record.recordId}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-900">{record.ruleName}</p>
                    <p className="text-xs text-slate-500">{record.ruleType}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-slate-900">{record.errorField}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="max-w-xs">
                      <p className={`text-sm font-mono ${
                        record.status === 'fixed' ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {record.currentValue !== null ? String(record.currentValue) : '(trống)'}
                      </p>
                      {record.originalValue !== record.currentValue && (
                        <p className="text-xs text-slate-500 line-through">
                          Trước: {record.originalValue !== null ? String(record.originalValue) : '(trống)'}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(record.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(record)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      {record.editHistory.length > 0 && (
                        <button
                          onClick={() => {
                            setSelectedRecord(record);
                            setShowHistory(true);
                          }}
                          className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Lịch sử"
                        >
                          <HistoryIcon className="w-4 h-4 text-purple-600" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {selectedRecord && !showHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-900 mb-1">Chỉnh sửa bản ghi - {selectedRecord.id}</h3>
                  <p className="text-sm text-slate-600">{selectedRecord.sourceName}</p>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Error Info */}
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-900 mb-1">{selectedRecord.errorMessage}</p>
                    <p className="text-xs text-red-700">
                      Loại lỗi: {selectedRecord.errorType} | Thời gian: {selectedRecord.timestamp}
                    </p>
                  </div>
                </div>
              </div>

              {/* Field Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-1">Trường dữ liệu</label>
                  <p className="text-sm text-slate-900 font-mono">{selectedRecord.errorField}</p>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-1">Mã bản ghi</label>
                  <p className="text-sm text-slate-900 font-mono">{selectedRecord.recordId}</p>
                </div>
              </div>

              {/* Values Comparison */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-2">Giá trị gốc</label>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-900 font-mono">
                      {selectedRecord.originalValue !== null ? String(selectedRecord.originalValue) : '(trống)'}
                    </p>
                  </div>
                </div>
                {selectedRecord.suggestedValue !== undefined && (
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-2">Giá trị đề xuất</label>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-900 font-mono">
                        {selectedRecord.suggestedValue !== null ? String(selectedRecord.suggestedValue) : '(trống)'}
                      </p>
                      <button
                        onClick={() => handleApplySuggestion(selectedRecord)}
                        className="mt-2 text-xs text-green-700 hover:text-green-800 underline"
                      >
                        Áp dụng giá trị này
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Edit Value */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">Giá trị mới *</label>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập giá trị mới..."
                />
              </div>

              {/* Edit Reason */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">Lý do chỉnh sửa</label>
                <textarea
                  value={editReason}
                  onChange={(e) => setEditReason(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập lý do (tùy chọn)..."
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => handleIgnore(selectedRecord)}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                Bỏ qua lỗi này
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {selectedRecord && showHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-900 mb-1">Lịch sử chỉnh sửa - {selectedRecord.id}</h3>
                  <p className="text-sm text-slate-600">{selectedRecord.recordId}</p>
                </div>
                <button
                  onClick={() => {
                    setShowHistory(false);
                    setSelectedRecord(null);
                  }}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {selectedRecord.editHistory.length === 0 ? (
                <div className="text-center py-12">
                  <HistoryIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">Chưa có lịch sử chỉnh sửa</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedRecord.editHistory.map((history, idx) => (
                    <div
                      key={history.id}
                      className={`border-2 rounded-lg p-5 ${
                        history.action === 'edit' ? 'border-blue-200 bg-blue-50' :
                        history.action === 'auto-fix' ? 'border-green-200 bg-green-50' :
                        'border-orange-200 bg-orange-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 rounded text-xs ${
                              history.action === 'edit' ? 'bg-blue-600 text-white' :
                              history.action === 'auto-fix' ? 'bg-green-600 text-white' :
                              'bg-orange-600 text-white'
                            }`}>
                              {history.action === 'edit' ? '✏️ Chỉnh sửa thủ công' :
                               history.action === 'auto-fix' ? '🤖 Tự động sửa' :
                               '↩️ Hoàn tác'}
                            </span>
                            <span className="text-xs text-slate-600">#{idx + 1}</span>
                          </div>
                          <p className="text-sm text-slate-900">
                            Bởi: <span className="font-medium">{history.user}</span>
                          </p>
                          <p className="text-xs text-slate-600">{history.timestamp}</p>
                        </div>
                        {idx === selectedRecord.editHistory.length - 1 && history.action !== 'revert' && (
                          <button
                            onClick={() => handleRevert(selectedRecord, history)}
                            className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm"
                          >
                            <Undo className="w-3 h-3" />
                            Hoàn tác
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-slate-600 mb-1">Giá trị cũ:</p>
                          <div className="p-2 bg-white border border-red-200 rounded">
                            <p className="text-sm text-red-900 font-mono">
                              {history.oldValue !== null ? String(history.oldValue) : '(trống)'}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 mb-1">Giá trị mới:</p>
                          <div className="p-2 bg-white border border-green-200 rounded">
                            <p className="text-sm text-green-900 font-mono">
                              {history.newValue !== null ? String(history.newValue) : '(trống)'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {history.reason && (
                        <div className="pt-3 border-t border-slate-200">
                          <p className="text-xs text-slate-600 mb-1">Lý do:</p>
                          <p className="text-sm text-slate-900">{history.reason}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => {
                  setShowHistory(false);
                  setSelectedRecord(null);
                }}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}