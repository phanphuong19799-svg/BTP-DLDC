import { DataProcessingTemplate } from '../../processing/DataProcessingTemplate';

export function ProcessingLegalAidInfoPage() {
  const sampleData = [
    { 
      id: 1, 
      recordId: 'TGPL-2025-001234', 
      applicantName: 'Nguyễn Văn A', 
      caseType: 'Dân sự', 
      supportDate: '15/03/2025', 
      lawyerName: 'Luật sư Trần B', 
      status: 'Đang xử lý',
      originalData: {
        recordId: 'tgpl-2025-1234',
        applicantName: 'nguyen van a',
        caseType: 'dan su',
        supportDate: '15-03-2025',
        lawyerName: 'ls tran b',
        status: 'dang xu ly'
      }
    },
    { 
      id: 2, 
      recordId: 'TGPL-2025-001235', 
      applicantName: 'Trần Thị B', 
      caseType: 'Hình sự', 
      supportDate: '20/03/2025', 
      lawyerName: 'Luật sư Lê C', 
      status: 'Hoàn thành',
      originalData: {
        recordId: 'tgpl-2025-1235',
        applicantName: 'tran thi b',
        caseType: 'hinh su',
        supportDate: '20-03-2025',
        lawyerName: 'ls le c',
        status: 'hoan thanh'
      }
    },
    { 
      id: 3, 
      recordId: 'TGPL-2025-001236', 
      applicantName: 'Lê Văn C', 
      caseType: 'Hành chính', 
      supportDate: '25/03/2025', 
      lawyerName: 'Luật sư Nguyễn D', 
      status: 'Đang xử lý' 
    },
  ];

  return (
    <DataProcessingTemplate
      title="Hệ thống thông tin trợ giúp pháp lý"
      description="Quản lý xử lý dữ liệu từ Hệ thống thông tin trợ giúp pháp lý thuộc Cục Trợ giúp pháp lý."
      columns={[
        { key: 'recordId', label: 'Mã hồ sơ', sortable: true },
        { key: 'applicantName', label: 'Người được trợ giúp', sortable: true },
        { key: 'caseType', label: 'Loại vụ việc', sortable: true },
        { key: 'supportDate', label: 'Ngày tiếp nhận', sortable: true },
        { key: 'lawyerName', label: 'Luật sư phụ trách', sortable: true },
        { key: 'status', label: 'Trạng thái', sortable: false }
      ]}
      sampleData={sampleData}
      searchFields={[
        { label: 'Mã hồ sơ', name: 'recordId', type: 'text' },
        { label: 'Người được trợ giúp', name: 'applicantName', type: 'text' },
        { label: 'Luật sư', name: 'lawyerName', type: 'text' }
      ]}
      detailFields={[
        { label: 'Mã hồ sơ', key: 'recordId' },
        { label: 'Người được trợ giúp', key: 'applicantName' },
        { label: 'Loại vụ việc', key: 'caseType' },
        { label: 'Ngày tiếp nhận', key: 'supportDate' },
        { label: 'Luật sư phụ trách', key: 'lawyerName' },
        { label: 'Trạng thái', key: 'status' }
      ]}
    />
  );
}