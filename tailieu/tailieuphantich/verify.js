const fs = require('fs');
const text = fs.readFileSync('phantichtong.md', 'utf-8');
console.log('Length:', text.length);
console.log('Split count:', text.split('MH02.P01a Thêm mới thiết lập').length);
