const fs = require('fs');

function processFile(path, processors) {
  if (!fs.existsSync(path)) return;
  let content = fs.readFileSync(path, 'utf8');
  for (const proc of processors) {
    content = proc(content);
  }
  fs.writeFileSync(path, content);
}

// 1. Fix CategoryPage.tsx
processFile('d:/tuphap/khodldc/dldc_1/src/components/pages/category/CategoryPage.tsx', [
  // Import PowerOff
  (c) => c.includes('PowerOff') ? c : c.replace('Upload\n} from \'lucide-react\';', 'Upload,\n  PowerOff\n} from \'lucide-react\';'),
  // Modals imports
  (c) => c.includes('ArchiveRecordModal') ? c : c.replace('import { CategoryPageProps }', 'import { ArchiveRecordModal } from \'./components/modals/ArchiveRecordModal\';\nimport { CreateVersionModal } from \'./components/modals/CreateVersionModal\';\nimport { CategoryPageProps }'),
  // if not found, put after the lucide imports
  (c) => c.includes('ArchiveRecordModal') ? c : c.replace('} from \'lucide-react\';', '} from \'lucide-react\';\nimport { ArchiveRecordModal } from \'./components/modals/ArchiveRecordModal\';\nimport { CreateVersionModal } from \'./components/modals/CreateVersionModal\';'),
  // Add `data: any` to onSave
  (c) => c.replace(/onSave={\(data\) =>/g, 'onSave={(data: any) =>')
]);

// 2. Fix ArchiveRecordModal.tsx
processFile('d:/tuphap/khodldc/dldc_1/src/components/pages/category/components/modals/ArchiveRecordModal.tsx', [
  // Remove inline style
  (c) => c.replace(/style={{ animation: "slideIn 0\.3s ease-out" }}/g, ''),
  // Add titles to buttons
  (c) => c.replace(/className="w-8 h-8 flex/g, 'title="Đóng" className="w-8 h-8 flex'),
  (c) => c.replace(/className="px-5 py-2\.5 rounded-xl border/g, 'title="Hủy bỏ" className="px-5 py-2.5 rounded-xl border'),
  (c) => c.replace(/className="px-5 py-2\.5 rounded-xl bg-red-600/g, 'title="Xác nhận" className="px-5 py-2.5 rounded-xl bg-red-600')
]);

// 3. Fix CreateVersionModal.tsx
processFile('d:/tuphap/khodldc/dldc_1/src/components/pages/category/components/modals/CreateVersionModal.tsx', [
  // Remove inline style
  (c) => c.replace(/style={{ animation: .* }}/g, ''),
  // Add titles to buttons
  (c) => c.replace(/className="w-8 h-8 flex/g, 'title="Đóng" className="w-8 h-8 flex'),
  (c) => c.replace(/className="px-5 py-2\.5 rounded-xl border/g, 'title="Hủy" className="px-5 py-2.5 rounded-xl border'),
  (c) => c.replace(/className="px-5 py-2\.5 rounded-xl bg-blue-600/g, 'title="Lưu" className="px-5 py-2.5 rounded-xl bg-blue-600')
]);

// 4. Fix PublishConfigModal.tsx
processFile('d:/tuphap/khodldc/dldc_1/src/components/pages/category/components/modals/PublishConfigModal.tsx', [
  // Remove inline style
  (c) => c.replace(/style={{ animation: .* }}/g, ''),
  // Add titles to buttons
  (c) => c.replace(/className="w-8 h-8 flex/g, 'title="Đóng" className="w-8 h-8 flex'),
  (c) => c.replace(/className="px-5 py-2\.5 rounded-xl border/g, 'title="Hủy" className="px-5 py-2.5 rounded-xl border'),
  (c) => c.replace(/className="px-5 py-2\.5 rounded-xl bg-blue-600/g, 'title="Gửi phê duyệt" className="px-5 py-2.5 rounded-xl bg-blue-600'),
  // add titles to inputs if any
  (c) => c.replace(/<input(?![^>]*\btitle=)/g, '<input title="Dữ liệu"'),
  (c) => c.replace(/<select(?![^>]*\btitle=)/g, '<select title="Lựa chọn"')
]);

// 5. Fix UnpublishModal.tsx
processFile('d:/tuphap/khodldc/dldc_1/src/components/pages/category/components/modals/UnpublishModal.tsx', [
  // Remove inline style
  (c) => c.replace(/style={{ animation: .* }}/g, ''),
  // Add titles to buttons
  (c) => c.replace(/className="w-8 h-8 flex/g, 'title="Đóng" className="w-8 h-8 flex'),
  (c) => c.replace(/className="px-5 py-2\.5 rounded-xl border/g, 'title="Thoát" className="px-5 py-2.5 rounded-xl border'),
  (c) => c.replace(/className="px-5 py-2\.5 rounded-xl bg-red-600/g, 'title="Hủy công khai" className="px-5 py-2.5 rounded-xl bg-red-600'),
  // add titles to textareas
  (c) => c.replace(/<textarea(?![^>]*\btitle=)/g, '<textarea title="Mô tả"')
]);

// 6. Generic loop for missing select/input titles in related pages
['d:/tuphap/khodldc/dldc_1/src/components/pages/category/CategorySetupPage.tsx',
 'd:/tuphap/khodldc/dldc_1/src/components/pages/category/CategoryPublishedListPage.tsx',
 'd:/tuphap/khodldc/dldc_1/src/components/pages/category/CategoryPage.tsx'].forEach(p => {
   processFile(p, [
     (c) => c.replace(/<select(?![^>]*\btitle=)/g, '<select title="Lựa chọn"'),
     (c) => c.replace(/<input(\s+type="(?:text|date)")(?![^>]*\btitle=)/g, '<input title="Dữ liệu"$1')
   ])
});

console.log('Fixed lints');
