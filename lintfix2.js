const fs = require('fs');

function processFile(path, processors) {
  if (!fs.existsSync(path)) return;
  let content = fs.readFileSync(path, 'utf8');
  let original = content;
  for (const proc of processors) {
    content = proc(content);
  }
  if (content !== original) {
    fs.writeFileSync(path, content);
  }
}

// 1. EditCategoryModal.tsx
processFile('d:/tuphap/khodldc/dldc_1/src/components/pages/category/components/modals/EditCategoryModal.tsx', [
  // Add title to buttons
  c => c.replace(/<button\b(?![^>]*\btitle=)/g, '<button title="Nút bấm"'),
  // Inputs/textareas need title
  c => c.replace(/<(input|textarea|select)\b(?![^>]*\btitle=)/g, '<$1 title="Dữ liệu"')
]);

// 2. MasterDataScaleManagementPage.tsx
processFile('d:/tuphap/khodldc/dldc_1/src/components/pages/master-data/MasterDataScaleManagementPage.tsx', [
  c => c.replace(/<button\b(?![^>]*\btitle=)(?=.*className="(?:[^"]*w-8 h-8|[^"]*p-2|[^"]*icon|[^"]*p-1\.[50]|[^"]*bg-blue-50)")/g, '<button title="Thao tác"'),
  c => c.replace(/<button\b(?![^>]*\btitle=)(?![^>]*>[^<]*<\/button>)/g, '<button title="Nút bấm"'),
  c => c.replace(/<(input|textarea|select)\b(?![^>]*\btitle=)/g, '<$1 title="Dữ liệu"')
]);

// 3. ApprovalTab.tsx
processFile('d:/tuphap/khodldc/dldc_1/src/components/pages/master-data/ApprovalTab.tsx', [
  c => c.replace(/<button\b(?![^>]*\btitle=)(?=.*className="(?:[^"]*w-8 h-8|[^"]*p-2|[^"]*icon)")/g, '<button title="Thao tác"'),
  // Just blanket fix any missing button titles where inner text might be icons 
  c => c.replace(/<button\b(?![^>]*\btitle=)(?![^>]*>[A-Za-z0-9_À-ỹ ]+<\/button>)/g, '<button title="Hành động"')
]);

// 4. index.html
processFile('d:/tuphap/khodldc/dldc_1/index.html', [
  c => c.replace(/style="[^"]*"/g, '')
]);

// 5. ConfirmModal.tsx
processFile('d:/tuphap/khodldc/dldc_1/src/components/common/ConfirmModal.tsx', [
  c => c.replace(/style=\{\{.*\}\}/g, '')
]);

// 6. ScreenFlowDiagram.tsx
processFile('d:/tuphap/khodldc/dldc_1/src/components/pages/ScreenFlowDiagram.tsx', [
  c => c.replace(/style=\{\{[^}]*\}\}/g, '')
]);

// 7. ProcessingConfigManager.tsx
processFile('d:/tuphap/khodldc/dldc_1/src/components/processing/ProcessingConfigManager.tsx', [
  c => c.replace(/style=\{\{[^}]*\}\}/g, '')
]);

// 8. Re-apply fixes to CategoryPage & Modals just in case they were reverted
const catchAllProcessors = [
  c => c.replace(/style=\{\{ *(?:animation|maxHeight)[^}]*\}\}/g, ''),
  c => c.replace(/<button\s+onClick=\{onClose\}\s+className="w-8 h-8/g, '<button onClick={onClose} title="Đóng" className="w-8 h-8'),
  c => c.replace(/<(input|textarea|select)\b(?![^>]*\btitle=)/g, '<$1 title="Trường dữ liệu"')
];

[
  'd:/tuphap/khodldc/dldc_1/src/components/pages/category/CategoryPage.tsx',
  'd:/tuphap/khodldc/dldc_1/src/components/pages/category/components/modals/ArchiveRecordModal.tsx',
  'd:/tuphap/khodldc/dldc_1/src/components/pages/category/components/modals/CreateVersionModal.tsx',
  'd:/tuphap/khodldc/dldc_1/src/components/pages/category/components/modals/PublishConfigModal.tsx',
  'd:/tuphap/khodldc/dldc_1/src/components/pages/category/components/modals/UnpublishModal.tsx'
].forEach(p => processFile(p, catchAllProcessors));

console.log('lintfix2 applied');
