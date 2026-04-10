const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let filepath = path.join(dir, file);
    let stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, callback);
    } else if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
      callback(filepath);
    }
  });
}

const report = {};

walk('src', (filepath) => {
  const content = fs.readFileSync(filepath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (/Thêm|Sửa|Xóa|Từ chối|Duyệt|Trình duyệt/i.test(line)) {
      // Find nearby lines within window of 10 to see what icon component is used
      const start = Math.max(0, index - 5);
      const end = Math.min(lines.length - 1, index + 5);
      const windowLines = lines.slice(start, end).join('\n');
      
      const iconMatches = windowLines.match(/<([A-Z][A-Za-z0-9]+)/g) || [];
      const icons = iconMatches.map(i => i.substring(1)).filter(i => !['div', 'span', 'Button', 'button', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'th', 'td', 'tr', 'table', 'thead', 'tbody', 'label'].includes(i.toLowerCase()));
      
      if (icons.length > 0) {
        if (!report[filepath]) report[filepath] = [];
        report[filepath].push({
          line: index + 1,
          text: line.trim(),
          icons: [...new Set(icons)]
        });
      }
    }
  });
});

fs.writeFileSync('icon_analysis.json', JSON.stringify(report, null, 2));
