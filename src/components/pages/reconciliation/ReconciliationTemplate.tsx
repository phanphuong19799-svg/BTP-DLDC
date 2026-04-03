import * as React from 'react';
import { useState } from 'react';
import { Database, CheckCircle, AlertCircle, Clock, Search, Filter, Download, Eye, Send, Info, RefreshCw, Loader2 } from 'lucide-react';
import { ReconciliationServiceSetupTab } from './ReconciliationServiceSetupTab';
import { ReconciliationLogTab } from './ReconciliationLogTab';
import { ReconciliationHistoryTab } from './ReconciliationHistoryTab';
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
  isReportSent?: boolean;
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
  const [selectedRecordCode, setSelectedRecordCode] = useState('');
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ReconciliationRecord | null>(null);
  const [syncStatuses, setSyncStatuses] = useState<Record<string, 'idle' | 'sending' | 'sent' | 'received'>>({});
  const [filterSource, setFilterSource] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [historySearchTerm, setHistorySearchTerm] = useState('');

  const handleViewHistory = () => {
    if (selectedRecordCode) {
      setHistorySearchTerm(selectedRecordCode);
      setActiveTab('history');
      setDetailModalOpen(false);
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesSource = filterSource === 'all' || record.providerSystem.toLowerCase().includes(filterSource.toLowerCase());
    
    // date comparison logic
    let matchesDate = true;
    if (dateFrom || dateTo) {
      const receiveDate = new Date(record.receiveDate.split(' ')[0]);
      if (dateFrom && receiveDate < new Date(dateFrom)) matchesDate = false;
      if (dateTo && receiveDate > new Date(dateTo)) matchesDate = false;
    }

    const matchesSearch = searchTerm === '' || 
      record.datasetCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.datasetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.providerSystem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.dataType.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSource && matchesDate && matchesSearch;
  });

  const handleManualSync = () => {
    const initialStatuses: Record<string, 'sending'> = {};
    filteredRecords.forEach(r => { initialStatuses[r.id] = 'sending'; });
    setSyncStatuses(initialStatuses);

    filteredRecords.forEach((record, idx) => {
      setTimeout(() => {
        setSyncStatuses(prev => ({ ...prev, [record.id]: 'sent' }));
      }, 1000 + idx * 500);

      setTimeout(() => {
        setSyncStatuses(prev => ({ ...prev, [record.id]: 'received' }));
      }, 3000 + idx * 700);
    });
  };



  const matchedCount = records.filter(r => r.status === 'matched').length;
  const mismatchedCount = records.filter(r => r.status === 'mismatched').length;

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo mã hồ sơ đối soát, hệ thống cung cấp, loại đối soát..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleManualSync}
                    title="Kích hoạt đồng bộ dữ liệu thủ công"
                    disabled={Object.values(syncStatuses).some(s => s === 'sending' || s === 'sent')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    <RefreshCw className={`w-4 h-4 ${Object.values(syncStatuses).some(s => s === 'sending' || s === 'sent') ? 'animate-spin' : ''}`} />
                    Đồng bộ thủ công
                  </button>
                  <button title="Xuất dữ liệu ra file Excel" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Xuất Excel
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-slate-500">Hệ thống nguồn</label>
                  <select
                    title="Lọc theo hệ thống nguồn"
                    value={filterSource}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterSource(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="all">Tất cả hệ thống</option>
                    <option value="Trung tâm dữ liệu Quốc gia">Trung tâm dữ liệu Quốc gia</option>
                    <option value="Hệ thống Hộ tịch">Hệ thống Hộ tịch</option>
                    <option value="Hệ thống Dân cư">Hệ thống Dân cư</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-slate-500">Trạng thái</label>
                  <select
                    title="Lọc theo trạng thái"
                    value={filterStatus}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="matched">Khớp dữ liệu</option>
                    <option value="mismatched">Không khớp</option>
                    <option value="pending">Đang xử lý</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-slate-500">Từ ngày</label>
                  <input
                    type="date"
                    title="Từ ngày"
                    value={dateFrom}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateFrom(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-slate-500">Đến ngày</label>
                  <input
                    type="date"
                    title="Đến ngày"
                    value={dateTo}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateTo(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                    <th className="px-6 py-3 text-left text-sm text-slate-600">Báo cáo sai lệch</th>
                    <th className="px-6 py-3 text-left text-sm text-slate-600">Tiến trình đồng bộ</th>
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.status === 'matched' ? (
                          <span className="text-xs text-slate-400 italic">Không có sai lệch</span>
                        ) : record.isReportSent ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border bg-indigo-50 text-indigo-700 border-indigo-200">
                            <Send className="w-3 h-3 text-indigo-500" />
                            Đã gửi báo cáo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border bg-amber-50 text-amber-700 border-amber-200">
                            <Info className="w-3 h-3 text-amber-500" />
                            Chưa gửi báo cáo
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {(() => {
                          const status = syncStatuses[record.id];
                          if (!status || status === 'idle') return <span className="text-xs text-slate-400">Chưa bắt đầu</span>;
                          return (
                            <div className="w-40">
                              <div className="flex items-center gap-2 mb-1.5">
                                {status === 'sending' && (
                                  <span className="text-xs font-medium text-blue-600 flex items-center gap-1.5">
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang gửi yêu cầu
                                  </span>
                                )}
                                {status === 'sent' && (
                                  <span className="text-xs font-medium text-amber-600 flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 animate-pulse" /> Chờ phản hồi
                                  </span>
                                )}
                                {status === 'received' && (
                                  <span className="text-xs font-medium text-green-600 flex items-center gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5" /> Hoàn tất
                                  </span>
                                )}
                              </div>
                              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                                <div 
                                  className={`h-full transition-all duration-1000 ease-in-out rounded-full ${
                                    status === 'received' ? 'bg-green-500 w-full' : 
                                    status === 'sent' ? 'bg-amber-500 w-2/3' : 
                                    status === 'sending' ? 'bg-blue-500 w-1/3' : 'bg-transparent w-0'
                                  }`}
                                ></div>
                              </div>
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">

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

                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-6 py-8 text-center text-slate-500">
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
      {activeTab === 'history' && <ReconciliationHistoryTab initialSearchTerm={historySearchTerm} />}
      
      {/* Reconciliation Detail Modal */}
      <ReconciliationDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        recordCode={selectedRecordCode}
        record={selectedRecord}
        onViewHistory={handleViewHistory}
      />


    </div>
  );
}