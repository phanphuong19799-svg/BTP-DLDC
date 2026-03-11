import { DataProcessingTemplate } from '../../processing/DataProcessingTemplate';

export function ProcessingJudgmentDbPage() {
  const sampleData = [
    { 
      id: 1, 
      recordId: 'THADS-2025-001234', 
      debtorName: 'Nguyễn Văn A', 
      creditorName: 'Công ty ABC', 
      debtAmount: '500.000.000', 
      executionDate: '15/03/2025', 
      status: 'Đang thi hành',
      originalData: {
        recordId: 'THADS-2025-1234',
        debtorName: 'nguyen van a',
        creditorName: 'cong ty abc',
        debtAmount: '500000000',
        executionDate: '15-03-2025',
        status: 'dang thi hanh'
      }
    },
    { 
      id: 2, 
      recordId: 'THADS-2025-001235', 
      debtorName: 'Trần Thị B', 
      creditorName: 'Ngân hàng XYZ', 
      debtAmount: '1.200.000.000', 
      executionDate: '20/03/2025', 
      status: 'Hoàn thành',
      originalData: {
        recordId: 'THADS-2025-1235',
        debtorName: 'tran thi b',
        creditorName: 'ngan hang xyz',
        debtAmount: '1200000000',
        executionDate: '20-03-2025',
        status: 'hoan thanh'
      }
    },
    { 
      id: 3, 
      recordId: 'THADS-2025-001236', 
      debtorName: 'Lê Văn C', 
      creditorName: 'Công ty DEF', 
      debtAmount: '300.000.000', 
      executionDate: '25/03/2025', 
      status: 'Đang thi hành' 
    },
  ];

  return (
    <DataProcessingTemplate
      title="Cơ sở dữ liệu thi hành án dân sự"
      description="Quản lý xử lý dữ liệu từ Cơ sở dữ liệu thi hành án dân sự thuộc Cục Thi hành án dân sự."
      columns={[
        { key: 'recordId', label: 'Mã hồ sơ', sortable: true },
        { key: 'debtorName', label: 'Người phải thi hành', sortable: true },
        { key: 'creditorName', label: 'Người được thi hành', sortable: true },
        { key: 'debtAmount', label: 'Số tiền (VNĐ)', sortable: true },
        { key: 'executionDate', label: 'Ngày thi hành', sortable: true },
        { key: 'status', label: 'Trạng thái', sortable: false }
      ]}
      sampleData={sampleData}
      searchFields={[
        { label: 'Mã hồ sơ', name: 'recordId', type: 'text' },
        { label: 'Người phải thi hành', name: 'debtorName', type: 'text' },
        { label: 'Người được thi hành', name: 'creditorName', type: 'text' }
      ]}
      detailFields={[
        { label: 'Mã hồ sơ', key: 'recordId' },
        { label: 'Người phải thi hành', key: 'debtorName' },
        { label: 'Người được thi hành', key: 'creditorName' },
        { label: 'Số tiền (VNĐ)', key: 'debtAmount' },
        { label: 'Ngày thi hành', key: 'executionDate' },
        { label: 'Trạng thái', key: 'status' }
      ]}
    />
  );
}