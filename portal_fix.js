const fs = require('fs');

function applyPortal(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes("import { createPortal }")) {
    content = content.replace(
      "import React,",
      "import { createPortal } from 'react-dom';\nimport React,"
    );
  }

  // Find the return statement and wrap the JSX inside createPortal
  if (!content.includes('createPortal(')) {
    const returnRegex = /(return \()([\s\S]+)(  \);\n})/m;
    const match = content.match(returnRegex);
    if (match) {
      content = content.replace(returnRegex, 
        `return createPortal(\n$2, \n    document.body\n  );\n}`
      );
    }
  }

  fs.writeFileSync(filePath, content);
}

applyPortal('d:/tuphap/khodldc/dldc_1/src/components/pages/category/components/modals/SimpleApproveModal.tsx');
applyPortal('d:/tuphap/khodldc/dldc_1/src/components/pages/category/components/modals/SimpleRejectModal.tsx');

console.log('Applied createPortal to Modals');
