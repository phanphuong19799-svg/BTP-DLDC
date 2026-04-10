const fs = require('fs');
const path = 'd:/tuphap/khodldc/dldc_1/src/components/pages/master-data/MasterDataScaleManagementPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// replace <select with <select title="Lựa chọn" if it doesn't already have a title
content = content.replace(/<select\b(?![^>]*\btitle=)/g, '<select title="Lựa chọn"');

fs.writeFileSync(path, content);
console.log('Select titles added');
