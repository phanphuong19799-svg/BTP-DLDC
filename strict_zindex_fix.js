const fs = require('fs');
const path = require('path');

const dir = 'd:/tuphap/khodldc/dldc_1/src/components/pages/category/components/modals';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    const orig = content;
    // Replace className="... z-[99999] ..." or z-50 etc.
    // Also inject style={{ zIndex: 99999 }} to guarantee it regardless of Tailwind.
    
    // Find the fixed wrapper div
    content = content.replace(/(<div\s+className="[^"]*fixed\s+inset-0[^"]*")([^>]*>)/g, (match, prefix, suffix) => {
        if (!match.includes('style={{')) {
             return prefix + ' style={{ zIndex: 99999 }}' + suffix;
        }
        return match;
    });

    if (content !== orig) {
        fs.writeFileSync(fullPath, content);
        console.log(`Injected strict inline zIndex into ${file}`);
    }
  }
});

// Also fix Portal.tsx to use inline styles if any
// But Portal.tsx just delegates, so we don't need to touch Portal.tsx

console.log('Done mapping strict zIndex');
