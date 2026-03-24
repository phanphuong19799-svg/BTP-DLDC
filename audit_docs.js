const fs = require('fs');
const data = fs.readFileSync('D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/mauthuthapCSDL.md', 'utf8');
const screens = data.split('### 4.2.3.');
let incomplete = [];

screens.forEach((s, idx) => {
    if (idx === 0) return;
    const lines = s.split('\n');
    const title = lines[0].trim();
    const hasImg = s.includes('![](images/');
    const hasInfo = s.toLowerCase().includes('mô tả thông tin');
    const hasFunc = s.toLowerCase().includes('chức năng');
    const tableCount = (s.match(/\| --- \|/g) || []).length;
    
    if (!hasImg || !hasInfo || !hasFunc || tableCount < 2) {
        incomplete.push({ title: '4.2.3.' + title, hasImg, hasInfo, hasFunc, tableCount });
    }
});

fs.writeFileSync('D:/tuphap/khodldc/dldc_1/incomplete_audit.json', JSON.stringify(incomplete, null, 2), 'utf8');
console.log('Found ' + incomplete.length + ' incomplete screens.');
