const fs = require('fs');
const path = 'd:/tuphap/khodldc/dldc_1/src/components/pages/category/CategoryPublishedListPage.tsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('PublishConfigModal')) {
    content = content.replace(
        "import { Search, FileText, Calendar, User, Download, Eye, Filter, ChevronDown, Globe, CheckCircle, AlertCircle, RefreshCw, XCircle } from 'lucide-react';",
        "import { Search, FileText, Calendar, User, Download, Eye, Filter, ChevronDown, Globe, CheckCircle, AlertCircle, RefreshCw, XCircle, Share2, Clock } from 'lucide-react';\nimport { PublishConfigModal } from './components/modals/PublishConfigModal';\nimport { UnpublishModal } from './components/modals/UnpublishModal';\n"
    );
}

if (!content.includes('showPublishModal')) {
    content = content.replace(
        "const [showDetailModal, setShowDetailModal] = useState(false);",
        "const [showDetailModal, setShowDetailModal] = useState(false);\n  const [activeTab, setActiveTab] = useState<'published' | 'pending'>('published');\n  const [showPublishModal, setShowPublishModal] = useState(false);\n  const [showUnpublishModal, setShowUnpublishModal] = useState(false);"
    );
}

// Add the tabs UI right above the filter section
const searchDivStart = `      <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6">`;
const tabsUI = `
      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab('published')}
          className={\`pb-3 px-1 text-sm font-medium transition-colors border-b-2 \${
            activeTab === 'published'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
          }\`}
        >
          Đang xuất bản
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={\`pb-3 px-1 text-sm font-medium transition-colors border-b-2 \${
            activeTab === 'pending'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
          }\`}
        >
          Chờ xuất bản (Có thể công khai)
        </button>
      </div>

`;

if (!content.includes('Đang xuất bản') && content.includes(searchDivStart)) {
    content = content.replace(searchDivStart, tabsUI + searchDivStart);
}

// Add modals at the bottom
const modalsUI = `
      {/* Publish Config Modal */}
      {showPublishModal && selectedData && (
        <PublishConfigModal
          isOpen={showPublishModal}
          onClose={() => {
            setShowPublishModal(false);
            setSelectedData(null);
          }}
          recordName={selectedData.name}
          onConfirm={(config) => {
            setShowPublishModal(false);
            setSelectedData(null);
            alert('Quá trình công khai đã được gửi duyệt. Phạm vi: ' + config.scope);
          }}
        />
      )}

      {/* Unpublish Modal */}
      {showUnpublishModal && selectedData && (
        <UnpublishModal
          isOpen={showUnpublishModal}
          onClose={() => {
            setShowUnpublishModal(false);
            setSelectedData(null);
          }}
          recordName={selectedData.name}
          onConfirm={(reason) => {
            setShowUnpublishModal(false);
            setSelectedData(null);
            alert('Danh mục đã được hủy công khai. Lý do: ' + reason);
          }}
        />
      )}
`;

if (!content.includes('Publish Config Modal')) {
    content = content.replace("    </div>\n  );\n}\n", modalsUI + "    </div>\n  );\n}\n");
}

// Update Action Grid based on Active Tab
// Search for `<div className="flex items-center gap-2">` which is in table cell for Actions
const oldActions = `<div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedData(item);
                          setShowDetailModal(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                        title="Tải xuống dữ liệu"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>`;

const newActions = `<div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedData(item);
                          setShowDetailModal(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {activeTab === 'published' ? (
                        <>
                          <button
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                            title="Tải xuống dữ liệu"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedData(item);
                              setShowUnpublishModal(true);
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="Hủy công khai"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedData(item);
                            setShowPublishModal(true);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                          title="Cấu hình xuất bản"
                        >
                          <Globe className="w-4 h-4" />
                        </button>
                      )}
                    </div>`;

if (content.includes(oldActions)) {
    content = content.replace(oldActions, newActions);
}

fs.writeFileSync(path, content);
console.log('done patching CategoryPublishedListPage.tsx');
