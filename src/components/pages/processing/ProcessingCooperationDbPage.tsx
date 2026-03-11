import { DataProcessingTemplate } from '../../processing/DataProcessingTemplate';

export function ProcessingCooperationDbPage() {
  const sampleData = [
    { 
      id: 1, 
      recordId: 'HTQT-2025-001234', 
      partnerCountry: 'Pháp', 
      cooperationType: 'Tư pháp hợp tác', 
      agreementNumber: 'VN-FR-2025-001', 
      signDate: '15/01/2025', 
      status: 'Đang thực hiện',
      originalData: {
        recordId: 'htqt-2025-1234',
        partnerCountry: 'phap',
        cooperationType: 'tu phap hop tac',
        agreementNumber: 'vn-fr-2025-001',
        signDate: '15-01-2025',
        status: 'dang thuc hien'
      }
    },
    { 
      id: 2, 
      recordId: 'HTQT-2025-001235', 
      partnerCountry: 'Nhật Bản', 
      cooperationType: 'Đào tạo pháp lý', 
      agreementNumber: 'VN-JP-2025-002', 
      signDate: '20/02/2025', 
      status: 'Hoàn thành',
      originalData: {
        recordId: 'htqt-2025-1235',
        partnerCountry: 'nhat ban',
        cooperationType: 'dao tao phap ly',
        agreementNumber: 'vn-jp-2025-002',
        signDate: '20-02-2025',
        status: 'hoan thanh'
      }
    },
    { id: 3, recordId: 'HTQT-2025-001236', partnerCountry: 'Hàn Quốc', cooperationType: 'Tương trợ tư pháp', agreementNumber: 'VN-KR-2025-003', signDate: '10/03/2025', status: 'Đang thực hiện' },
    { id: 4, recordId: 'HTQT-2025-001237', partnerCountry: 'Đức', cooperationType: 'Hỗ trợ kỹ thuật', agreementNumber: 'VN-DE-2025-004', signDate: '25/03/2025', status: 'Đang thực hiện' },
  ];

  return (
    <DataProcessingTemplate
      title="CSDL Hợp tác quốc tế"
      description="Quản lý xử lý dữ liệu từ Cơ sở dữ liệu Hợp tác quốc tế thuộc Vụ Hợp tác quốc tế."
      columns={[
        { key: 'recordId', label: 'Mã hồ sơ', sortable: true },
        { key: 'partnerCountry', label: 'Quốc gia đối tác', sortable: true },
        { key: 'cooperationType', label: 'Loại hợp tác', sortable: true },
        { key: 'agreementNumber', label: 'Số hiệu thỏa thuận', sortable: true },
        { key: 'signDate', label: 'Ngày ký kết', sortable: true },
        { key: 'status', label: 'Trạng thái', sortable: false }
      ]}
      sampleData={sampleData}
      searchFields={[
        { label: 'Mã hồ sơ', name: 'recordId', type: 'text' },
        { label: 'Quốc gia đối tác', name: 'partnerCountry', type: 'text' },
        { label: 'Số hiệu thỏa thuận', name: 'agreementNumber', type: 'text' }
      ]}
      detailFields={[
        { label: 'Mã hồ sơ', key: 'recordId' },
        { label: 'Quốc gia đối tác', key: 'partnerCountry' },
        { label: 'Loại hợp tác', key: 'cooperationType' },
        { label: 'Số hiệu thỏa thuận', key: 'agreementNumber' },
        { label: 'Ngày ký kết', key: 'signDate' },
        { label: 'Trạng thái', key: 'status' }
      ]}
    />
  );
}