const fs = require('fs');

const lines = fs.readFileSync('raw_apis.txt', 'utf8').split('\n').map(l => l.trim()).filter(l => l);

const data = [];
let currentGroup = null;

for (let line of lines) {
  if (line.match(/^III\.\d\.\d\.\d/)) {
    const name = line.replace(/^III\.\d\.\d\.\d\s+/, '').trim();
    currentGroup = name;
  } else if (line.match(/^III\.\d(\.\d)*\s+/)) {
    if (line.startsWith('III.1') || line.startsWith('III.2.4')) { 
       const match = line.replace(/^III\.\d(\.\d)*\s+/, '').trim();
       if (!currentGroup && match) {
          // just let it fly
       }
    }
  } else if (line.match(/^\d+\s+/)) {
    // Keep EVERYTHING
    let name = line.trim();
    
    if (!currentGroup && (line.includes('Bảo trợ xã hội') || line.includes('Người có công') || line.includes('Trẻ em') || line.includes('Bản án'))) {
        currentGroup = 'Dữ liệu danh mục từ Bộ ngành ngoài';
    }

    if (currentGroup && name) {
      data.push({
        id: 'item_' + Math.random().toString(36).substr(2, 9),
        group: currentGroup,
        name: name,
        code: 'API_HT_' + Math.random().toString(36).substr(2, 5).toUpperCase()
      });
    }
  }
}

// Write React component tree format code
let output = 'export const apiGroups = [\n';

const grouped = data.reduce((acc, curr) => {
  if (!acc[curr.group]) acc[curr.group] = [];
  acc[curr.group].push(curr);
  return acc;
}, {});

for (const groupName in grouped) {
  output += `  {\n    groupName: "${groupName}",\n    items: [\n`;
  for (const item of grouped[groupName]) {
    output += `      { id: "${item.id}", name: "${item.name}", code: "API_${item.id.toUpperCase()}" },\n`;
  }
  output += `    ]\n  },\n`;
}
output += '];\n';

fs.writeFileSync('output_apis.ts', output);
