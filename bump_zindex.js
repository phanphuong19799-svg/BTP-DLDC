const fs = require('fs');
const path = require('path');

const dir = 'd:/tuphap/khodldc/dldc_1/src/components/pages/category/components/modals';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    const orig = content;
    // Specifically target the fixed backdrop overlay div
    content = content.replace(/(className="[^"]*fixed\s+inset-0[^"]*)z-(?:\[?\d+\]?|\d+)([^"]*")/g, '$1z-[99999]$2');
    
    if (content !== orig) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated z-index in ${file}`);
    }
  }
});
console.log('Done mapping z-index');
