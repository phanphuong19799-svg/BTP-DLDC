import { Heart } from 'lucide-react';
import { GenericDataTable } from '../../common/GenericDataTable';

const mockData = [
  { id: 1, certificateNumber: 'GHN-001/2025', groomName: 'Nguyễn Văn T', brideName: 'Trần Thị U', marriageDate: '14/02/2025', registrar: 'UBND Quận 1', witnessName: 'Lê Văn V', status: 'Đã cấp', updatedAt: '09/12/2025' },
  { id: 2, certificateNumber: 'GHN-002/2025', groomName: 'Phạm Văn W', brideName: 'Hoàng Thị X', marriageDate: '08/03/2025', registrar: 'UBND Quận 3', witnessName: 'Vũ Văn Y', status: 'Đã cấp', updatedAt: '09/12/2025' },
];

export function MarriageCertificatePage() {
  return (
    <GenericDataTable
      title="Bản khai hôn nhân"
      description="Quản lý giấy đăng ký kết hôn"
      icon={Heart}
      iconColor="red"
      columns={[
        { key: 'certificateNumber', label: 'Số giấy', sortable: true },
        { key: 'groomName', label: 'Chú rể', sortable: true },
        { key: 'brideName', label: 'Cô dâu', sortable: true },
        { key: 'marriageDate', label: 'Ngày kết hôn' },
        { key: 'registrar', label: 'Cơ quan đăng ký' },
        { key: 'status', label: 'Trạng thái' },
      ]}
      data={mockData}
      searchFields={[
        { label: 'Số giấy', name: 'certificateNumber', type: 'text' },
        { label: 'Tên chú rể', name: 'groomName', type: 'text' },
        { label: 'Tên cô dâu', name: 'brideName', type: 'text' },
      ]}
      detailFields={[
        { label: 'Số giấy', key: 'certificateNumber' },
        { label: 'Chú rể', key: 'groomName' },
        { label: 'Cô dâu', key: 'brideName' },
        { label: 'Ngày kết hôn', key: 'marriageDate' },
        { label: 'Cơ quan đăng ký', key: 'registrar' },
        { label: 'Người làm chứng', key: 'witnessName' },
        { label: 'Trạng thái', key: 'status' },
        { label: 'Ngày cập nhật', key: 'updatedAt' },
      ]}
      apiEndpoint="https://api.btp.gov.vn/v1/civil-registry/marriage"
      lastSyncTime="09/12/2025 10:20:50"
      onSync={() => alert('Đang đồng bộ dữ liệu khai hôn nhân...')}
    />
  );
}
