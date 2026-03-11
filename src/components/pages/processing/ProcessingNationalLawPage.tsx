import { DataProcessingTemplate } from '../../processing/DataProcessingTemplate';

export function ProcessingNationalLawPage() {
  const sampleData = [
    { 
      id: 1, 
      recordId: 'PL-2025-001234', 
      documentType: 'Luật', 
      documentNumber: '25/2025/QH15', 
      documentName: 'Luật Đất đai (sửa đổi)', 
      effectiveDate: '01/07/2025', 
      status: 'Có hiệu lực',
      originalData: {
        recordId: 'PL-2025-1234',
        documentType: 'luat',
        documentNumber: '25/2025/qh15',
        documentName: 'luat dat dai (sua doi)',
        effectiveDate: '01-07-2025',
        status: 'co hieu luc'
      }
    },
    { 
      id: 2, 
      recordId: 'PL-2025-001235', 
      documentType: 'Nghị định', 
      documentNumber: '45/2025/NĐ-CP', 
      documentName: 'Nghị định hướng dẫn Luật Đất đai', 
      effectiveDate: '15/07/2025', 
      status: 'Có hiệu lực',
      originalData: {
        recordId: 'pl-2025-1235',
        documentType: 'nghi dinh',
        documentNumber: '45/2025/nd-cp',
        documentName: 'nghi dinh huong dan luat dat dai',
        effectiveDate: '15-07-2025',
        status: 'co hieu luc'
      }
    },
    { 
      id: 3, 
      recordId: 'PL-2025-001236', 
      documentType: 'Thông tư', 
      documentNumber: '12/2025/TT-BTP', 
      documentName: 'Thông tư về công chứng', 
      effectiveDate: '01/08/2025', 
      status: 'Dự thảo' 
    },
  ];

  return (
    <DataProcessingTemplate
      title="CSDL quốc gia về pháp luật"
      description="Quản lý xử lý dữ liệu từ Cơ sở dữ liệu quốc gia về pháp luật thuộc Cục Kiểm tra văn bản QPPL."
      columns={[
        { key: 'recordId', label: 'Mã văn bản', sortable: true },
        { key: 'documentType', label: 'Loại văn bản', sortable: true },
        { key: 'documentNumber', label: 'Số hiệu', sortable: true },
        { key: 'documentName', label: 'Tên văn bản', sortable: true },
        { key: 'effectiveDate', label: 'Ngày hiệu lực', sortable: true },
        { key: 'status', label: 'Trạng thái', sortable: false }
      ]}
      sampleData={sampleData}
      searchFields={[
        { label: 'Mã văn bản', name: 'recordId', type: 'text' },
        { label: 'Số hiệu', name: 'documentNumber', type: 'text' },
        { label: 'Tên văn bản', name: 'documentName', type: 'text' }
      ]}
      detailFields={[
        { label: 'Mã văn bản', key: 'recordId' },
        { label: 'Loại văn bản', key: 'documentType' },
        { label: 'Số hiệu', key: 'documentNumber' },
        { label: 'Tên văn bản', key: 'documentName' },
        { label: 'Ngày hiệu lực', key: 'effectiveDate' },
        { label: 'Trạng thái', key: 'status' }
      ]}
    />
  );
}