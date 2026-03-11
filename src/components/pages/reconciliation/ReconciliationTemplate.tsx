import { useState } from 'react';
import { Database, CheckCircle, AlertCircle, XCircle, Clock, Search, Filter, Download, Eye, RefreshCw } from 'lucide-react';
import { ReconciliationServiceSetupTab } from './ReconciliationServiceSetupTab';
import { ReconciliationLogTab } from './ReconciliationLogTab';
import { ReconciliationHistoryTab } from './ReconciliationHistoryTab';
import { ErrorDetailsModal } from './ErrorDetailsModal';
import { ReconciliationDetailModal } from './ReconciliationDetailModal';

interface ReconciliationRecord {
  id: string;
  datasetCode: string;
  datasetName: string;
  providerSystem: string;
  dataType: string;
  recordCount: number;
  receiveDate: string;
  status: 'matched' | 'mismatched' | 'pending' | 'error';
  statusText: string;
  statusColor: string;
  errorCount?: number;
  matchRate?: number;
  lastReconcileDate?: string;
}

type TabType = 'list' | 'setup' | 'log' | 'history';

interface ReconciliationTemplateProps {
  title: string;
  records: ReconciliationRecord[];
}

export function ReconciliationTemplate({ title, records }: ReconciliationTemplateProps) {
  const [activeTab, setActiveTab] = useState<TabType>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [selectedRecordCode, setSelectedRecordCode] = useState('');
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ReconciliationRecord | null>(null);

  const filteredRecords = records.filter(record =>
    (filterStatus === 'all' || record.status === filterStatus) &&
    (searchTerm === '' || 
     record.datasetCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
     record.datasetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     record.providerSystem.toLowerCase().includes(searchTerm.toLowerCase()) ||
     record.dataType.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const matchedCount = records.filter(r => r.status === 'matched').length;
  const mismatchedCount = records.filter(r => r.status === 'mismatched').length;
  const errorCount = records.filter(r => r.status === 'error').length;
  const pendingCount = records.filter(r => r.status === 'pending').length;

  const tabs = [
    { id: 'list' as TabType, label: 'Danh sách đối soát' },
    { id: 'setup' as TabType, label: 'Thiết lập dịch vụ' },
    { id: 'history' as TabType, label: 'Lịch sử đối soát' },
    { id: 'log' as TabType, label: 'Nhật ký đối soát' }
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-pink-50 text-pink-600 border-b-2 border-pink-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'list' && (
        <div className="space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm border border-blue-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Tổng bộ dữ liệu</p>
                  <p className="text-2xl text-blue-900 mt-1">{records.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-blue-700" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-sm border border-green-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Khớp dữ liệu</p>
                  <p className="text-2xl text-green-900 mt-1">{matchedCount}</p>
                </div>
                <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-700" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-sm border border-orange-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-700">Không khớp</p>
                  <p className="text-2xl text-orange-900 mt-1">{mismatchedCount}</p>
                </div>
                <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-orange-700" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-sm border border-red-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-700">Lỗi</p>
                  <p className="text-2xl text-red-900 mt-1">{errorCount}</p>
                </div>
                <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo mã hồ sơ đối soát, hệ thống cung cấp, loại đối soát..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="matched">Khớp dữ liệu</option>
                  <option value="mismatched">Không khớp</option>
                  <option value="pending">Đang xử lý</option>
                  <option value="error">Lỗi nghiêm trọng</option>
                </select>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Xuất Excel
                </button>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm text-slate-600">STT</th>
                    <th className="px-6 py-3 text-left text-sm text-slate-600">Mã hồ sơ đối soát</th>
                    <th className="px-6 py-3 text-left text-sm text-slate-600">Hồ sơ dữ liệu cung cấp</th>
                    <th className="px-6 py-3 text-left text-sm text-slate-600">Loại đối soát</th>
                    <th className="px-6 py-3 text-left text-sm text-slate-600">Số bản ghi đối soát</th>
                    <th className="px-6 py-3 text-left text-sm text-slate-600">Ngày nhận</th>
                    <th className="px-6 py-3 text-left text-sm text-slate-600">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-sm text-slate-600">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr key={record.id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-900">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900 font-medium">{record.datasetCode}</div>
                        <div className="text-xs text-slate-500">{record.providerSystem}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">{record.datasetName}</div>
                        <div className="text-xs text-slate-500">{record.providerSystem}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{record.dataType}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">{record.recordCount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <div className="text-sm">{record.receiveDate.split(' ')[0]}</div>
                        <div className="text-xs text-slate-400">{record.receiveDate.split(' ')[1]}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs rounded-full border ${record.statusColor}`}>
                          {record.statusText}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {(record.status === 'mismatched' || record.status === 'error') && (
                            <button 
                              onClick={() => {
                                setSelectedRecordCode(record.datasetCode);
                                setErrorModalOpen(true);
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                              title="Xem chi tiết lỗi"
                            >
                              <AlertCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedRecordCode(record.datasetCode);
                              setDetailModalOpen(true);
                              setSelectedRecord(record);
                            }}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded" title="Làm mới">
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                        Không tìm thấy dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'setup' && <ReconciliationServiceSetupTab />}
      {activeTab === 'log' && <ReconciliationLogTab />}
      {activeTab === 'history' && <ReconciliationHistoryTab />}
      
      {/* Error Details Modal */}
      <ErrorDetailsModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        recordCode={selectedRecordCode}
      />

      {/* Reconciliation Detail Modal */}
      <ReconciliationDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        recordCode={selectedRecordCode}
        record={selectedRecord}
      />
    </div>
  );
}