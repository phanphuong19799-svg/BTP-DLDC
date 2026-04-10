const fs = require('fs');
const path = 'd:/tuphap/khodldc/dldc_1/src/components/pages/category/CategoryPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. imports
if (!content.includes('Lock,')) {
    content = content.replace("import {\n  Lock,\n  Unlock", "xyz placeholder"); // checking if it exists
    content = content.replace("import {\n  Eye,", "import {\n  Lock,\n  Unlock,\n  Shield,\n  Eye,");
}
if (!content.includes('CreateVersionModal')) {
    content = content.replace(
      "import { ArchiveRecordModal } from './components/modals/ArchiveRecordModal';",
      "import { ArchiveRecordModal } from './components/modals/ArchiveRecordModal';\nimport { CreateVersionModal } from './components/modals/CreateVersionModal';"
    );
}

// 2. Add state
if (!content.includes('showCreateVersionModal')) {
    content = content.replace(
      "const [showArchiveModal, setShowArchiveModal] = useState(false);",
      "const [showArchiveModal, setShowArchiveModal] = useState(false);\n  const [showCreateVersionModal, setShowCreateVersionModal] = useState(false);"
    );
}

// 3. Modals Replacement - add at bottom
if (!content.includes('<CreateVersionModal')) {
    const modalStr = `
      {/* Create Version Modal */}
      <CreateVersionModal
        isOpen={showCreateVersionModal}
        onClose={() => setShowCreateVersionModal(false)}
        currentVersion="v3.2"
        onSave={(data) => {
          setShowCreateVersionModal(false);
          setSuccessNotificationMessage('Đã tạo phiên bản mới ' + data.name + ' thành công!');
          setShowSuccessNotification(true);
          setTimeout(() => setShowSuccessNotification(false), 3000);
        }}
      />
      `;
    content = content.replace(`{/* Archive Modal */}`, modalStr + `\n      {/* Archive Modal */}`);
}

// 4. In Version tab, add "Tạo phiên bản mới" button at the top
const versionHistoryTableStart = `<div className="space-y-4">
          {/* Version History Table */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">`;
const newVersionHistoryTableStart = `<div className="space-y-4">
          {/* Version Actions */}
          <div className="flex justify-end mb-4">
            <button
               onClick={() => setShowCreateVersionModal(true)}
               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
               <Copy className="w-4 h-4" />
               Tạo phiên bản mới (Bản sao độc lập)
            </button>
          </div>
          {/* Version History Table */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">`;

if (content.includes(versionHistoryTableStart) && !content.includes('Tạo phiên bản mới (Bản sao độc lập)')) {
    content = content.replace(versionHistoryTableStart, newVersionHistoryTableStart);
}

// 5. In Version tab, add Lock/Unlock button
const oldActions = `<div className="flex items-center justify-center gap-2">
                          <button
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {history.status === 'archived' && (
                            <button
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                              title="Khôi phục phiên bản"
                            >
                              <Clock className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            className="p-1 text-slate-600 hover:bg-slate-50 rounded"
                            title="Tải xuống"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>`;

const newActions = `<div className="flex items-center justify-center gap-2">
                          <button
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {history.status === 'active' && (
                            <button
                              className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                              title="Khóa cấu trúc phiên bản"
                            >
                              <Lock className="w-4 h-4" />
                            </button>
                          )}
                          {history.status === 'archived' && (
                            <button
                              className="p-1 text-amber-600 hover:bg-amber-50 rounded"
                              title="Mở khóa (Xem xét lại)"
                            >
                              <Unlock className="w-4 h-4" />
                            </button>
                          )}
                          {history.status === 'archived' && (
                            <button
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                              title="Khôi phục thành phiên bản hiện tại"
                            >
                              <Clock className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            className="p-1 text-slate-600 hover:bg-slate-50 rounded"
                            title="Tải xuống"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>`;

if (content.includes(oldActions)) {
    content = content.replace(new RegExp(oldActions.replace(/[.*+?^$\{\}\(\)\|\[\]\\]/g, '\\$&'), 'g'), newActions);
}

fs.writeFileSync(path, content);
console.log('done updating version tab');
