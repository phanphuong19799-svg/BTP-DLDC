const fs = require('fs');
const filePath = 'd:/tuphap/khodldc/dldc_1/src/components/pages/orchestration/ServiceSetupPageUpdated.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Insert import
content = content.replace(
  "import { MonitoringPage } from './MonitoringPage';",
  "import { MonitoringPage } from './MonitoringPage';\nimport { AddServiceModal } from '../collection/ServiceModals';"
);

// Replace Add Service modal block
const startMarker = "      {/* Add Service Form Modal */}";
const endMarker = "      {/* Modal Xem chi tiết */}";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `      {/* Add Service Form Modal */}
      <AddServiceModal isOpen={showAddModal} onClose={handleCloseServiceForm} />

`;
  content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated ServiceSetupPageUpdated.tsx!');
} else {
  console.log('Could not find markers', startIndex, endIndex);
}
