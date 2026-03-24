const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
    // We will use powershell to extract text from docx if possible, or just unzip it and read word/document.xml
    const docxPath = 'D:\\tuphap\\khodldc\\dldc_1\\tailieu\\tailieuphantich\\filedoc\\mautailieu.docx';
    
    // Quick and dirty docx to text (by unzipping and regexing xml)
    const yauzl = require('yauzl'); // we might not have it. Let's write a python script instead.
} catch(e) {}
