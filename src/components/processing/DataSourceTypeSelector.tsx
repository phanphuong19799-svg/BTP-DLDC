import { useState } from 'react';
import { Building2, Globe, CheckCircle, Settings, Play } from 'lucide-react';
import { ConfigureRuleModal } from './ConfigureRuleModal';

interface DataSource {
  id: string;
  name: string;
  department: string;
  type: 'internal' | 'external';
  rulesConfigured: number;
  totalRules: number;
  status: 'active' | 'inactive';
  lastRun?: string;
}

const mockInternalSources: DataSource[] = [
  {
    id: '1',
    name: 'Cơ sở dữ liệu đấu giá viên',
    department: 'Cục Đăng ký quốc gia giao dịch bảo đảm',
    type: 'internal',
    rulesConfigured: 12,
    totalRules: 10,
    status: 'active',
    lastRun: '08/12/2024 08:45:23',
  },
  {
    id: '2',
    name: 'Thông tin công chứng viên',
    department: 'Cục Công chứng',
    type: 'internal',
    rulesConfigured: 8,
    totalRules: 10,
    status: 'active',
    lastRun: '08/12/2024 07:28:45',
  },
  {
    id: '3',
    name: 'Hồ sơ trợ giúp pháp lý',
    department: 'Cục Trợ giúp pháp lý',
    type: 'internal',
    rulesConfigured: 15,
    totalRules: 10,
    status: 'active',
    lastRun: '08/12/2024 06:32:10',
  },
  {
    id: '4',
    name: 'Hồ sơ hộ tịch',
    department: 'Cục Hộ tịch, quốc tịch, chứng thực',
    type: 'internal',
    rulesConfigured: 6,
    totalRules: 10,
    status: 'inactive',
  },
];

const mockExternalSources: DataSource[] = [
  {
    id: '5',
    name: 'Dữ liệu dân cư quốc gia',
    department: 'Bộ Công an - Cục Cảnh sát QLHC về TTXH',
    type: 'external',
    rulesConfigured: 3,
    totalRules: 3,
    status: 'active',
    lastRun: '07/12/2024 22:15:30',
  },
  {
    id: '6',
    name: 'Đăng ký doanh nghiệp',
    department: 'Bộ Kế hoạch và Đầu tư',
    type: 'external',
    rulesConfigured: 3,
    totalRules: 3,
    status: 'active',
    lastRun: '07/12/2024 23:45:12',
  },
  {
    id: '7',
    name: 'Hệ thống thuế',
    department: 'Tổng cục Thuế - Bộ Tài chính',
    type: 'external',
    rulesConfigured: 2,
    totalRules: 3,
    status: 'inactive',
  },
  {
    id: '8',
    name: 'Bảo hiểm xã hội',
    department: 'Bảo hiểm xã hội Việt Nam',
    type: 'external',
    rulesConfigured: 3,
    totalRules: 3,
    status: 'active',
    lastRun: '08/12/2024 01:20:45',
  },
];

// Internal rules: All 10 types
const internalRuleTypes = [
  'Format - Chuẩn hóa định dạng',
  'Validation - Kiểm tra tính hợp lệ',
  'Missing-value - Xử lý giá trị thiếu',
  'Outlier - Xử lý ngoại lệ',
  'Key-matching - Đối sánh khóa',
  'Duplicate - Xử lý trùng lặp',
  'Reference - Tham chiếu',
  'Transform - Biến đổi',
  'Merge-split - Gộp/Tách',
  'Classify - Phân loại',
];

// External rules: Only 3 types
const externalRuleTypes = [
  'Format - Chuẩn hóa định dạng',
  'Merge-split - Gộp/Tách cột',
  'Classify - Phân loại gán nhãn',
];

export function DataSourceTypeSelector() {
  const [activeTab, setActiveTab] = useState<'internal' | 'external'>('internal');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);

  const currentSources = activeTab === 'internal' ? mockInternalSources : mockExternalSources;
  const currentRuleTypes = activeTab === 'internal' ? internalRuleTypes : externalRuleTypes;

  const handleConfigureRules = (source: DataSource) => {
    setSelectedSource(source);
    setShowConfigModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-slate-900 mb-1">Cấu hình theo loại nguồn dữ liệu</h3>
        <p className="text-sm text-slate-600">
          Phân biệt quy tắc xử lý cho dữ liệu trong ngành và ngoài ngành
        </p>
      </div>

      {/* Type Selector Tabs */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setActiveTab('internal')}
          className={`p-6 rounded-xl border-2 transition-all ${
            activeTab === 'internal'
              ? 'border-blue-500 bg-blue-50 shadow-lg'
              : 'border-slate-200 bg-white hover:border-blue-300'
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-lg ${
              activeTab === 'internal' ? 'bg-blue-600' : 'bg-slate-100'
            }`}>
              <Building2 className={`w-8 h-8 ${
                activeTab === 'internal' ? 'text-white' : 'text-slate-400'
              }`} />
            </div>
            <div className="text-left">
              <h4 className={`text-lg ${
                activeTab === 'internal' ? 'text-blue-900' : 'text-slate-900'
              }`}>
                Dữ liệu TRONG NGÀNH
              </h4>
              <p className="text-sm text-slate-600 mt-1">Các đơn vị trong nội bộ</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <p className="text-xs text-slate-600 mb-1">Số nguồn</p>
              <p className="text-xl text-slate-900">{mockInternalSources.length}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <p className="text-xs text-slate-600 mb-1">Quy tắc</p>
              <p className="text-xl text-blue-600">10 loại</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-600 mb-2">Áp dụng đầy đủ:</p>
            <div className="flex flex-wrap gap-1">
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">Làm sạch</span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Chuẩn hóa</span>
              <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">Biến đổi</span>
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('external')}
          className={`p-6 rounded-xl border-2 transition-all ${
            activeTab === 'external'
              ? 'border-green-500 bg-green-50 shadow-lg'
              : 'border-slate-200 bg-white hover:border-green-300'
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-lg ${
              activeTab === 'external' ? 'bg-green-600' : 'bg-slate-100'
            }`}>
              <Globe className={`w-8 h-8 ${
                activeTab === 'external' ? 'text-white' : 'text-slate-400'
              }`} />
            </div>
            <div className="text-left">
              <h4 className={`text-lg ${
                activeTab === 'external' ? 'text-green-900' : 'text-slate-900'
              }`}>
                Dữ liệu NGOÀI NGÀNH
              </h4>
              <p className="text-sm text-slate-600 mt-1">Các Bộ, ngành liên quan</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <p className="text-xs text-slate-600 mb-1">Số nguồn</p>
              <p className="text-xl text-slate-900">{mockExternalSources.length}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <p className="text-xs text-slate-600 mb-1">Quy tắc</p>
              <p className="text-xl text-green-600">3 loại</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-600 mb-2">Áp dụng cơ bản:</p>
            <div className="flex flex-wrap gap-1">
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Format</span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Merge-split</span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Classify</span>
            </div>
          </div>
        </button>
      </div>

      {/* Rule Types Info */}
      <div className={`p-4 rounded-lg border-2 ${
        activeTab === 'internal' 
          ? 'border-blue-200 bg-blue-50'
          : 'border-green-200 bg-green-50'
      }`}>
        <h4 className={`mb-3 flex items-center gap-2 ${
          activeTab === 'internal' ? 'text-blue-900' : 'text-green-900'
        }`}>
          <Settings className="w-4 h-4" />
          Các loại quy tắc áp dụng ({currentRuleTypes.length} loại)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {currentRuleTypes.map((rule, idx) => (
            <div
              key={idx}
              className="text-xs px-3 py-2 bg-white rounded-lg border border-slate-200 text-slate-700"
            >
              {rule}
            </div>
          ))}
        </div>
      </div>

      {/* Data Sources List */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-slate-900">
                Danh sách nguồn dữ liệu {activeTab === 'internal' ? 'TRONG NGÀNH' : 'NGOÀI NGÀNH'}
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                {currentSources.length} nguồn dữ liệu - {currentSources.filter(s => s.status === 'active').length} đang hoạt động
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {currentSources.map((source) => (
              <div
                key={source.id}
                className={`border-2 rounded-lg p-5 transition-all ${
                  source.status === 'active'
                    ? 'border-slate-200 hover:border-blue-300 hover:shadow-md'
                    : 'border-slate-100 bg-slate-50'
                }`}
              >
                {/* Source Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="text-slate-900">{source.name}</h5>
                      {source.status === 'active' && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{source.department}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    source.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {source.status === 'active' ? 'Hoạt động' : 'Chưa kích hoạt'}
                  </span>
                </div>

                {/* Rules Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-600">Quy tắc đã cấu hình</span>
                    <span className={`${
                      source.rulesConfigured === source.totalRules
                        ? 'text-green-600'
                        : 'text-orange-600'
                    }`}>
                      {source.rulesConfigured}/{source.totalRules}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        source.rulesConfigured === source.totalRules
                          ? 'bg-green-600'
                          : 'bg-orange-600'
                      }`}
                      style={{ width: `${(source.rulesConfigured / source.totalRules) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Last Run */}
                {source.lastRun && (
                  <div className="mb-4 text-xs text-slate-500">
                    Lần chạy cuối: {source.lastRun}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleConfigureRules(source)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'internal'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    Cấu hình quy tắc
                  </button>
                  {source.status === 'active' && (
                    <button title="Hành động" aria-label="Hành động" className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <Play className="w-4 h-4 text-slate-600" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-lg p-6">
        <h4 className="text-slate-900 mb-3">💡 Lưu ý về phân loại nguồn dữ liệu</h4>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <h5 className="text-blue-900 mb-2">📋 Dữ liệu TRONG NGÀNH (10 quy tắc)</h5>
            <ul className="space-y-1 text-slate-700">
              <li>• Áp dụng đầy đủ các quy tắc làm sạch, chuẩn hóa, biến đổi</li>
              <li>• Kiểm tra chất lượng chi tiết theo tiêu chuẩn ngành</li>
              <li>• Có thể tùy chỉnh và mở rộng quy tắc</li>
            </ul>
          </div>
          <div>
            <h5 className="text-green-900 mb-2">🌐 Dữ liệu NGOÀI NGÀNH (3 quy tắc)</h5>
            <ul className="space-y-1 text-slate-700">
              <li>• Chỉ áp dụng quy tắc cơ bản: Format, Merge-split, Classify</li>
              <li>• Tập trung vào chuẩn hóa định dạng và phân loại</li>
              <li>• Đảm bảo tương thích với hệ thống nguồn</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Configure Rule Modal */}
      {showConfigModal && selectedSource && (
        <ConfigureRuleModal
          isOpen={showConfigModal}
          onClose={() => {
            setShowConfigModal(false);
            setSelectedSource(null);
          }}
          availableRuleTypes={activeTab === 'internal' ? internalRuleTypes : externalRuleTypes}
          sourceType={activeTab}
          sourceName={selectedSource.name}
        />
      )}
    </div>
  );
}