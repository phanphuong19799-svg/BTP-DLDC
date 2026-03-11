import { Flag } from 'lucide-react';
import { GenericDataTable } from '../../common/GenericDataTable';

const mockData = [
  { id: 1, code: 'VN', fullName: 'Nguyễn Văn A', birthDate: '15/03/1985', nationality: 'Việt Nam', registrationDate: '20/05/2020', certificateNumber: 'QT-001/2020', status: 'Còn hiệu lực', updatedAt: '09/12/2025' },
  { id: 2, code: 'VN', fullName: 'Trần Thị B', birthDate: '22/07/1990', nationality: 'Việt Nam', registrationDate: '15/08/2021', certificateNumber: 'QT-002/2021', status: 'Còn hiệu lực', updatedAt: '09/12/2025' },
  { id: 3, code: 'FR', fullName: 'Lê Văn C', birthDate: '10/11/1988', nationality: 'Pháp', registrationDate: '30/03/2022', certificateNumber: 'QT-003/2022', status: 'Còn hiệu lực', updatedAt: '09/12/2025' },
];

export function NationalitySystemPage() {
  return (
    <GenericDataTable
      title="Hệ thống đăng ký quốc tịch"
      description="Quản lý hồ sơ đăng ký quốc tịch Việt Nam"
      icon={Flag}
      iconColor="red"
      columns={[
        { key: 'fullName', label: 'Họ tên', sortable: true },
        { key: 'birthDate', label: 'Ngày sinh' },
        { key: 'nationality', label: 'Quốc tịch', sortable: true },
        { key: 'certificateNumber', label: 'Số giấy chứng nhận' },
        { key: 'registrationDate', label: 'Ngày đăng ký' },
        { key: 'status', label: 'Trạng thái' },
      ]}
      data={mockData}
      searchFields={[
        { label: 'Họ tên', name: 'fullName', type: 'text' },
        { label: 'Số giấy chứng nhận', name: 'certificateNumber', type: 'text' },
        { label: 'Quốc tịch', name: 'nationality', type: 'select', options: ['Việt Nam', 'Pháp', 'Mỹ'] },
        { label: 'Trạng thái', name: 'status', type: 'select', options: ['Còn hiệu lực', 'Hết hiệu lực'] },
      ]}
      detailFields={[
        { label: 'Họ tên', key: 'fullName' },
        { label: 'Ngày sinh', key: 'birthDate' },
        { label: 'Quốc tịch', key: 'nationality' },
        { label: 'Số giấy chứng nhận', key: 'certificateNumber' },
        { label: 'Ngày đăng ký', key: 'registrationDate' },
        { label: 'Trạng thái', key: 'status' },
        { label: 'Ngày cập nhật', key: 'updatedAt' },
      ]}
      apiEndpoint="https://api.btp.gov.vn/v1/nationality/registry"
      lastSyncTime="09/12/2025 14:20:30"
      onSync={() => alert('Đang đồng bộ dữ liệu đăng ký quốc tịch...')}
    />
  );
}
