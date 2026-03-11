import { useState } from 'react';
import { Search, Eye, Edit, Check, X, AlertTriangle, FileText, Settings, Database, AlertCircle, History as HistoryIcon } from 'lucide-react';
import { PageHeader } from '../../common/PageHeader';

interface DataRecord {
  id: string;
  status: string;
  recordCode: string;
  fullName: string;
  birthDate: string;
  idNumber: string;
  statusLabel: string;
}

interface DataQuality {
  id: string;
  recordCode: string;
  field: string;
  originalValue: string;
  suggestedValue: string;
  errorType: string;
  errorDescription: string;
  suggestion: string;
  status: string;
}

const mockRecords: DataRecord[] = [
  {
    id: '1',
    status: 'Không xác',
    recordCode: 'VB-2025-001234',
    fullName: 'Luật Doanh nghiệp 2020',
    birthDate: '01/01/2021',
    idNumber: '68/2020/QH14',
    statusLabel: 'Đã xử lý'
  },
  {
    id: '2',
    status: 'Không xác',
    recordCode: 'VB-2025-001235',
    fullName: 'Nghị định 01/2021/NĐ-CP',
    birthDate: '15/01/2021',
    idNumber: '01/2021/NĐ-CP',
    statusLabel: 'Đang xử lý'
  },
  {
    id: '3',
    status: 'Không xác',
    recordCode: 'VB-2025-001236',
    fullName: 'Thông tư 15/2021/TT-BTP',
    birthDate: '20/03/2021',
    idNumber: '15/2021/TT-BTP',
    statusLabel: 'Đã xử lý'
  }
];

const mockQualityIssues: DataQuality[] = [
  {
    id: '1',
    recordCode: 'VB-2025-001234',
    field: 'Ngày ban hành',
    originalValue: '1/1/2021',
    suggestedValue: '',
    errorType: 'Sai định dạng',
    errorDescription: 'Ngày tháng không đúng định dạng DD/MM/YYYY',
    suggestion: '01/01/2021',
    status: 'Chờ xử lý'
  },
  {
    id: '2',
    recordCode: 'VB-2025-001235',
    field: 'Số hiệu',
    originalValue: '01/2021',
    suggestedValue: '',
    errorType: 'Thiếu dữ liệu',
    errorDescription: 'Thiếu thông tin cơ quan ban hành',
    suggestion: '01/2021/NĐ-CP',
    status: 'Chờ xử lý'
  },
  {
    id: '3',
    recordCode: 'VB-2025-001236',
    field: 'Trích yếu',
    originalValue: '<không có>',
    suggestedValue: '',
    errorType: 'Thiếu dữ liệu',
    errorDescription: 'Trường trích yếu không được để trống',
    suggestion: 'Quy định chi tiết...',
    status: 'Chờ xử lý'
  }
];

export function DataProvisionCatalogBPage() {
  const [activeTab, setActiveTab] = useState<'data' | 'history'>('data');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = mockRecords.filter(record =>
    record.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.recordCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const qualityStats = {
    total: 8,
    pending: 5,
    fixed: 2,
    ignored: 1
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Danh mục chủ - Loại B" icon={FileText} />
      
      {/* Tabs */}
      <div className="bg-white border border-slate-200 rounded-lg">
        <div className="border-b border-slate-200">
          <div className="flex items-center gap-1 px-2">
            <button
              onClick={() => setActiveTab('data')}
              className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors ${
                activeTab === 'data'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              Danh sách dữ liệu
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <HistoryIcon className="w-4 h-4" />
              Lịch sử cung cấp
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Tab 1: Danh sách dữ liệu */}
          {activeTab === 'data' && (
            <div className="space-y-4">
              {/* Header Card */}
              <div className="flex items-start gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-slate-900">Dữ liệu văn bản pháp luật</h3>
                  <p className="text-sm text-slate-600 mt-0.5">Danh sách văn bản từ CSDL Văn bản pháp luật quốc gia</p>
                </div>
              </div>

              {/* Search and Actions */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-2xl">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Tìm kiếm nâng cao
                </button>
                <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm flex items-center gap-2">
                  Nhập
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2">
                  Xuất
                </button>
              </div>

              {/* Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">STT</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Tình trạng</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Mã bản ghi</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Trích yếu</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Ngày ban hành</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Số hiệu</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Trạng thái</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRecords.map((record, index) => (
                      <tr key={record.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm text-slate-700">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-blue-600">{record.status}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{record.recordCode}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{record.fullName}</td>
                        <td className="px-4 py-3 text-sm text-slate-700">{record.birthDate}</td>
                        <td className="px-4 py-3 text-sm text-slate-700">{record.idNumber}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 text-xs rounded ${
                            record.statusLabel === 'Đã xử lý' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {record.statusLabel}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Xem chi tiết">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Lịch sử cung cấp */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="text-center py-12">
                <HistoryIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">Chưa có lịch sử cung cấp</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}