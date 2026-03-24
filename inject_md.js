const fs = require('fs');

const mdPath = 'd:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/phantichtong.md';
const generatedPath = 'd:/tuphap/khodldc/dldc_1/generated_md.txt';

let content = fs.readFileSync(mdPath, 'utf8');
let generatedContent = fs.readFileSync(generatedPath, 'utf8');

const startMarker = '#### 4.2.2.2.7';
const endMarker = '## 4.2.3. DC102.QLTT.NK';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find markers.", {startIndex, endIndex});
    process.exit(1);
}

const before = content.substring(0, startIndex);
const after = content.substring(endIndex);

const newContent = before + generatedContent + '\n' + after;

fs.writeFileSync(mdPath, newContent, 'utf8');
console.log("Successfully replaced the content.");
