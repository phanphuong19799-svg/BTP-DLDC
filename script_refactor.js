const fs = require('fs');
const path = 'd:/tuphap/khodldc/dldc_1/src/components/pages/category/CategoryPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add imports
if (!content.includes('ArchiveRecordModal')) {
    content = content.replace(
        "import { RecordFormModal } from './components/modals/RecordFormModal';",
        "import { RecordFormModal } from './components/modals/RecordFormModal';\nimport { ArchiveRecordModal } from './components/modals/ArchiveRecordModal';"
    );
}

// 2. Add state
if (!content.includes('showArchiveModal')) {
    content = content.replace(
        "const [showAddFieldModal, setShowAddFieldModal] = useState(false);",
        "const [showAddFieldModal, setShowAddFieldModal] = useState(false);\n  const [showArchiveModal, setShowArchiveModal] = useState(false);"
    );
}

// 3. Modals Replacement
const renderModalCode = `{/* Modals for Record Form */}
      <RecordFormModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Thêm mới bản ghi dữ liệu"
        onSave={(data) => {
          setCategories([{
            id: Date.now().toString(),
            code: data.code,
            name: data.name,
            description: data.description,
            status: data.status,
            type: 'standard', // kept for mock compatibility
            createdDate: new Date().toLocaleDateString('vi-VN'),
            fields: []
          }, ...categories]);
          setShowAddModal(false);
          setSuccessNotificationMessage('Đã gửi yêu cầu thêm bản ghi thành công!');
          setShowSuccessNotification(true);
          setTimeout(() => setShowSuccessNotification(false), 3000);
        }}
      />
      
      {showEditModal && selectedCategory && (
        <RecordFormModal 
          isOpen={showEditModal} 
          onClose={() => {
            setShowEditModal(false);
            setSelectedCategory(null);
          }}
          title="Cập nhật giá trị bản ghi"
          initialData={selectedCategory}
          onSave={(data) => {
            setCategories(categories.map(c => 
              c.id === selectedCategory.id 
                ? { ...c, code: data.code, name: data.name, description: data.description, status: data.status } 
                : c
            ));
            setShowEditModal(false);
            setSelectedCategory(null);
            setSuccessNotificationMessage('Đã lưu thay đổi thông tin bản ghi thành công!');
            setShowSuccessNotification(true);
            setTimeout(() => setShowSuccessNotification(false), 3000);
          }}
        />
      )}

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

const regex = /{showAddModal && \([\s\S]*?\n      \)}\n\n      {\/\* Edit Modal \*\/}\n      {showEditModal && selectedCategory && \([\s\S]*?\n      \)}/;
if (regex.test(content)) {
    content = content.replace(regex, renderModalCode);
    console.log('Modals replaced via regex!');
} else {
    // try removing them if they are differently formatted
    console.log('Regex did not match modals');
}

// 4. Grid button
const addColButton = `                              <button
                                onClick={() => {
                                  setSelectedCategory(category);
                                  setShowAddFieldModal(true);
                                }}
                                className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                                title="Thêm cột mới"
                              >
                                <Columns className="w-4 h-4" />
                              </button>`;

const powerOffButton = `                              <button
                                onClick={() => {
                                  setSelectedCategory(category);
                                  setShowArchiveModal(true);
                                }}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Ngừng áp dụng bản ghi"
                              >
                                <PowerOff className="w-4 h-4" />
                              </button>`;

if (content.includes(addColButton)) {
    content = content.replace(addColButton, powerOffButton);
} else {
    console.log('Could not find Add Col button');
}

// 5. Change "Thêm cột mới" to "Thêm bản ghi mới"
content = content.replace(
    'title="Thêm danh mục mới"\n                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"',
    'title="Thêm bản ghi mới"\n                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"'
);
content = content.replace('Thêm danh mục mới\n                  </button>', 'Thêm bản ghi mới\n                  </button>');

fs.writeFileSync(path, content);
console.log('Refactor complete.');
