const fs = require('fs');
const path = 'd:/tuphap/khodldc/dldc_1/src/components/pages/category/CategoryPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// The line we want to replace
const deleteButtonStart = `<Trash2 className="w-4 h-4" />`;
const deleteButtonNew = `<PowerOff className="w-4 h-4" />
                              </button>
                              `;
// Oh wait, I want to replace the whole button block. Let's just replace the icon and add the onClick handler inside? No, the standard way in JS is to replace strings.

// Let's use a simpler replace block
const oldBtn = `className="p-1 text-red-600 hover:bg-red-50 rounded"
                                title="Xóa"
                              >
                                <Trash2 className="w-4 h-4" />`;
const newBtn = `onClick={() => {
                                  setSelectedCategory(category);
                                  setShowArchiveModal(true);
                                }}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                title="Ngừng áp dụng bản ghi"
                              >
                                <PowerOff className="w-4 h-4" />`;

content = content.replace(oldBtn.replace(/\r?\n/g, '\n'), newBtn);
content = content.replace(oldBtn.replace(/\n/g, '\r\n'), newBtn);

const oldEditBtn = `className="p-1 text-orange-600 hover:bg-orange-50 rounded"
                                title="Chỉnh sửa"`;
const newEditBtn = `className="p-1 text-orange-600 hover:bg-orange-50 rounded"
                                title="Chỉnh sửa cấu trúc"`;

content = content.replace(oldEditBtn.replace(/\r?\n/g, '\n'), newEditBtn);
content = content.replace(oldEditBtn.replace(/\n/g, '\r\n'), newEditBtn);

const oldAdd = `Thêm danh mục mới`;
const newAdd = `Thêm bản ghi mới`;
// Replace all button titles related
content = content.replace(/Thêm danh mục mới/g, 'Thêm bản ghi mới');

// Inject Archive Record Modal and imports
if (!content.includes('ArchiveRecordModal')) {
    content = content.replace(`import { RecordFormModal } from './components/modals/RecordFormModal';`,
      `import { RecordFormModal } from './components/modals/RecordFormModal';\nimport { ArchiveRecordModal } from './components/modals/ArchiveRecordModal';`);
}

if (!content.includes('showArchiveModal')) {
    content = content.replace(`  const [showEditModal, setShowEditModal] = useState(false);`,
      `  const [showEditModal, setShowEditModal] = useState(false);\n  const [showArchiveModal, setShowArchiveModal] = useState(false);`);
}

if (!content.includes('<ArchiveRecordModal')) {
    const modalStr = `
      {/* Archive Modal */}
      {showArchiveModal && selectedCategory && (
        <ArchiveRecordModal
          isOpen={showArchiveModal}
          onClose={() => {
            setShowArchiveModal(false);
            setSelectedCategory(null);
          }}
          recordName={selectedCategory.name}
          onConfirm={() => {
            setCategories(categories.map(c => 
              c.id === selectedCategory.id 
                ? { ...c, status: 'inactive' } 
                : c
            ));
            setShowArchiveModal(false);
            setSelectedCategory(null);
            setSuccessNotificationMessage('Đã ngừng áp dụng bản ghi thành công!');
            setShowSuccessNotification(true);
            setTimeout(() => setShowSuccessNotification(false), 3000);
          }}
        />
      )}`;
    content = content.replace(`{/* Add/Edit Modal */}`, `{/* Add/Edit Modal */}` + modalStr);
}

fs.writeFileSync(path, content);
console.log('done replacing');
