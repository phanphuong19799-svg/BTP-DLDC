import { useState } from 'react';
import { FileText, Copy, Download, Upload, Trash2, Edit, Plus, CheckCircle } from 'lucide-react';

interface RuleTemplate {
  id: string;
  name: string;
  description: string;
  type: 'internal' | 'external';
  rulesCount: number;
  rules: {
    ruleType: string;
    configuration: any;
  }[];
  createdDate: string;
  lastModified: string;
  usedBySourcesCount: number;
  createdBy: string;
}

const mockTemplates: RuleTemplate[] = [
  {
    id: 'TPL-001',
    name: 'Template đầy đủ - Dữ liệu trong ngành',
    description: 'Áp dụng đầy đủ 10 loại quy tắc cho dữ liệu các đơn vị trong nội bộ',
    type: 'internal',
    rulesCount: 10,
    rules: [
      { ruleType: 'Format', configuration: { dateFormat: 'dd/MM/yyyy' } },
      { ruleType: 'Validation', configuration: { required: true } },
      { ruleType: 'Missing-value', configuration: { action: 'fill' } },
      { ruleType: 'Outlier', configuration: { method: 'iqr' } },
      { ruleType: 'Key-matching', configuration: { keyField: 'id' } },
      { ruleType: 'Duplicate', configuration: { action: 'keep-newest' } },
      { ruleType: 'Reference', configuration: { refTable: 'dm_tinh_thanh' } },
      { ruleType: 'Transform', configuration: { toUpperCase: false } },
      { ruleType: 'Merge-split', configuration: { separator: '-' } },
      { ruleType: 'Classify', configuration: { categories: [] } },
    ],
    createdDate: '01/12/2024',
    lastModified: '05/12/2024',
    usedBySourcesCount: 4,
    createdBy: 'Nguyễn Văn A',
  },
  {
    id: 'TPL-002',
    name: 'Template cơ bản - Dữ liệu ngoài ngành',
    description: 'Áp dụng 3 quy tắc cơ bản cho dữ liệu từ các Bộ, ngành liên quan',
    type: 'external',
    rulesCount: 3,
    rules: [
      { ruleType: 'Format', configuration: { dateFormat: 'dd/MM/yyyy' } },
      { ruleType: 'Merge-split', configuration: { separator: '-' } },
      { ruleType: 'Classify', configuration: { categories: [] } },
    ],
    createdDate: '01/12/2024',
    lastModified: '03/12/2024',
    usedBySourcesCount: 3,
    createdBy: 'Trần Thị B',
  },
  {
    id: 'TPL-003',
    name: 'Template Đấu giá viên',
    description: 'Cấu hình chuyên biệt cho xử lý dữ liệu đấu giá viên',
    type: 'internal',
    rulesCount: 12,
    rules: [
      { ruleType: 'Format', configuration: { dateFormat: 'dd/MM/yyyy' } },
      { ruleType: 'Validation', configuration: { required: true } },
      { ruleType: 'Missing-value', configuration: { action: 'fill' } },
      { ruleType: 'Duplicate', configuration: { action: 'keep-newest' } },
    ],
    createdDate: '28/11/2024',
    lastModified: '08/12/2024',
    usedBySourcesCount: 1,
    createdBy: 'Lê Văn C',
  },
  {
    id: 'TPL-004',
    name: 'Template Công chứng',
    description: 'Quy tắc xử lý dữ liệu công chứng viên và hợp đồng công chứng',
    type: 'internal',
    rulesCount: 8,
    rules: [
      { ruleType: 'Format', configuration: { dateFormat: 'dd/MM/yyyy' } },
      { ruleType: 'Validation', configuration: { required: true } },
      { ruleType: 'Reference', configuration: { refTable: 'dm_tinh_thanh' } },
    ],
    createdDate: '25/11/2024',
    lastModified: '07/12/2024',
    usedBySourcesCount: 2,
    createdBy: 'Phạm Thị D',
  },
];

export function RuleTemplateManager() {
  const [activeTab, setActiveTab] = useState<'internal' | 'external'>('internal');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<RuleTemplate | null>(null);

  const filteredTemplates = mockTemplates.filter(t => t.type === activeTab);

  const handleCopyTemplate = (template: RuleTemplate) => {
    alert(`✅ Đã sao chép template "${template.name}"`);
  };

  const handleApplyTemplate = (template: RuleTemplate) => {
    alert(`✅ Đang áp dụng template "${template.name}" vào nguồn dữ liệu đã chọn`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-slate-900 mb-1">Quản lý Template quy tắc</h3>
          <p className="text-sm text-slate-600">
            Tạo, lưu trữ và áp dụng các template quy tắc xử lý cho nhiều nguồn dữ liệu
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tạo template mới
        </button>
      </div>

      {/* Type Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('internal')}
          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
            activeTab === 'internal'
              ? 'border-blue-500 bg-blue-50 text-blue-900'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span>Template TRONG NGÀNH</span>
            <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs">
              {mockTemplates.filter(t => t.type === 'internal').length}
            </span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('external')}
          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
            activeTab === 'external'
              ? 'border-green-500 bg-green-50 text-green-900'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span>Template NGOÀI NGÀNH</span>
            <span className="px-2 py-1 bg-green-600 text-white rounded text-xs">
              {mockTemplates.filter(t => t.type === 'external').length}
            </span>
          </div>
        </button>
      </div>

      {/* Import/Export Section */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-slate-900 mb-1">Import/Export Template</h4>
            <p className="text-sm text-slate-600">Chia sẻ template giữa các hệ thống hoặc sao lưu cấu hình</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Upload className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-700">Import từ file</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-700">Export tất cả</span>
            </button>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className="p-6">
              {/* Template Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-lg ${
                    template.type === 'internal' ? 'bg-blue-50' : 'bg-green-50'
                  }`}>
                    <FileText className={`w-6 h-6 ${
                      template.type === 'internal' ? 'text-blue-600' : 'text-green-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 mb-1">{template.name}</h4>
                    <p className="text-sm text-slate-600">{template.description}</p>
                  </div>
                </div>
              </div>

              {/* Template Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-600 mb-1">Số quy tắc</p>
                  <p className="text-lg text-slate-900">{template.rulesCount}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-600 mb-1">Đang áp dụng</p>
                  <p className="text-lg text-blue-900">{template.usedBySourcesCount}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-xs text-purple-600 mb-1">Loại</p>
                  <p className="text-sm text-purple-900">
                    {template.type === 'internal' ? 'Trong ngành' : 'Ngoài ngành'}
                  </p>
                </div>
              </div>

              {/* Rules Preview */}
              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-600 mb-2">Quy tắc bao gồm:</p>
                <div className="flex flex-wrap gap-1">
                  {template.rules.slice(0, 5).map((rule, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-white border border-slate-200 rounded text-slate-700">
                      {rule.ruleType}
                    </span>
                  ))}
                  {template.rules.length > 5 && (
                    <span className="text-xs px-2 py-1 text-slate-500">
                      +{template.rules.length - 5} quy tắc
                    </span>
                  )}
                </div>
              </div>

              {/* Meta Info */}
              <div className="mb-4 text-xs text-slate-500 space-y-1">
                <p>Tạo bởi: {template.createdBy} - {template.createdDate}</p>
                <p>Cập nhật: {template.lastModified}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleApplyTemplate(template)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    template.type === 'internal'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  Áp dụng
                </button>
                <button
                  onClick={() => handleCopyTemplate(template)}
                  className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  title="Sao chép template"
                >
                  <Copy className="w-4 h-4 text-slate-600" />
                </button>
                <button
                  onClick={() => setSelectedTemplate(template)}
                  className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  title="Chỉnh sửa"
                >
                  <Edit className="w-4 h-4 text-slate-600" />
                </button>
                <button
                  className="px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="bg-white rounded-lg border-2 border-dashed border-slate-300 p-12 text-center">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h4 className="text-slate-900 mb-2">Chưa có template nào</h4>
          <p className="text-slate-600 mb-4">
            Tạo template mới để lưu trữ cấu hình quy tắc xử lý
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tạo template đầu tiên
          </button>
        </div>
      )}

      {/* Usage Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-slate-900 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Hướng dẫn sử dụng Template
        </h4>
        <div className="grid grid-cols-2 gap-6 text-sm text-slate-700">
          <div>
            <h5 className="text-blue-900 mb-2">📋 Tạo và quản lý Template</h5>
            <ul className="space-y-1">
              <li>• Tạo template từ cấu hình quy tắc hiện có</li>
              <li>• Lưu template để tái sử dụng cho nhiều nguồn</li>
              <li>• Sao chép và chỉnh sửa template theo nhu cầu</li>
              <li>• Export/Import để chia sẻ giữa các hệ thống</li>
            </ul>
          </div>
          <div>
            <h5 className="text-purple-900 mb-2">🎯 Áp dụng Template</h5>
            <ul className="space-y-1">
              <li>• Chọn template phù hợp với loại nguồn dữ liệu</li>
              <li>• Áp dụng nhanh cho một hoặc nhiều nguồn</li>
              <li>• Tùy chỉnh sau khi áp dụng nếu cần</li>
              <li>• Theo dõi template đang được sử dụng ở đâu</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Create Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6">
            <h3 className="text-slate-900 mb-4">Tạo Template mới</h3>
            <p className="text-slate-600 mb-6">
              Chọn nguồn dữ liệu có cấu hình quy tắc để lưu thành template...
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  alert('✅ Đã tạo template mới');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Tạo template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="text-slate-900">Chỉnh sửa Template - {selectedTemplate.name}</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Tên template</label>
                  <input
                    type="text"
                    defaultValue={selectedTemplate.name}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Mô tả</label>
                  <textarea
                    defaultValue={selectedTemplate.description}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Các quy tắc ({selectedTemplate.rules.length})
                  </label>
                  <div className="space-y-2">
                    {selectedTemplate.rules.map((rule, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-900">{rule.ruleType}</span>
                        <button className="text-sm text-blue-600 hover:text-blue-700">Cấu hình</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3 justify-end">
              <button
                onClick={() => setSelectedTemplate(null)}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setSelectedTemplate(null);
                  alert('✅ Đã lưu thay đổi template');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}