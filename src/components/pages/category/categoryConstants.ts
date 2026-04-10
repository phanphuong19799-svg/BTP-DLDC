import { MasterDataEntity, DataType, ScopeType, LifecycleStatus, ApprovalType, ApprovalStatus } from './categoryTypes';

export const defaultEntities: MasterDataEntity[] = [
  {
    id: '1',
    code: 'MD-CITIZEN-001',
    name: 'Bộ dữ liệu chủ Công dân',
    dataType: 'standard',
    managingAgency: 'Cục Hộ tịch - Quốc tịch - Chứng thực',
    scope: 'national',
    description: 'Dữ liệu chuẩn về công dân Việt Nam bao gồm thông tin cá nhân như họ tên, ngày sinh, số CCCD, nơi cư trú theo quy định của Luật CCCD 2023',
    lifecycleStatus: 'active',
    createdDate: '01/01/2024',
    updatedDate: '10/12/2024',
    createdBy: 'Nguyễn Văn A'
  },
  {
    id: '2',
    code: 'MD-ORG-001',
    name: 'Bộ dữ liệu chủ Tổ chức',
    dataType: 'standard',
    managingAgency: 'Cục Đăng ký kinh doanh',
    scope: 'national',
    description: 'Thông tin doanh nghiệp, tổ chức, cơ quan nhà nước bao gồm tên, mã số thuế, địa chỉ, người đại diện',
    lifecycleStatus: 'active',
    createdDate: '15/01/2024',
    updatedDate: '20/11/2024',
    createdBy: 'Trần Thị B'
  },
  {
    id: '3',
    code: 'MD-DOC-001',
    name: 'Bộ dữ liệu chủ Văn bản pháp luật',
    dataType: 'reference',
    managingAgency: 'Bộ Tư pháp',
    scope: 'national',
    description: 'Danh mục văn bản pháp luật, nghị định, thông tư, quyết định',
    lifecycleStatus: 'active',
    createdDate: '10/02/2024',
    updatedDate: '05/12/2024',
    createdBy: 'Lê Văn C'
  },
  {
    id: '4',
    code: 'MD-ADMIN-001',
    name: 'Bộ dữ liệu chủ Đơn vị hành chính',
    dataType: 'reference',
    managingAgency: 'Bộ Nội vụ',
    scope: 'national',
    description: 'Danh mục 63 tỉnh/thành phố, quận/huyện, phường/xã của Việt Nam',
    lifecycleStatus: 'active',
    createdDate: '20/01/2024',
    updatedDate: '15/10/2024',
    createdBy: 'Phạm Thị D'
  },
  {
    id: '5',
    code: 'MD-AGENCY-001',
    name: 'Bộ dữ liệu chủ Cơ quan nhà nước',
    dataType: 'reference',
    managingAgency: 'Bộ Nội vụ',
    scope: 'national',
    description: 'Danh sách các cơ quan nhà nước, bộ, ngành, sở, ban',
    lifecycleStatus: 'draft',
    createdDate: '01/03/2024',
    updatedDate: '18/12/2024',
    createdBy: 'Hoàng Văn E'
  },
  {
    id: '6',
    code: 'MD-EMPLOYEE-001',
    name: 'Bộ dữ liệu chủ Cán bộ, Công chức',
    dataType: 'standard',
    managingAgency: 'Bộ Nội vụ',
    scope: 'national',
    description: 'Thông tin hồ sơ, chức vụ, ngạch bậc của cán bộ công chức viên chức',
    lifecycleStatus: 'active',
    createdDate: '22/02/2024',
    updatedDate: '05/01/2025',
    createdBy: 'Phạm Văn F'
  },
  {
    id: '7',
    code: 'MD-FINANCE-001',
    name: 'Bộ dữ liệu chủ Ngân sách nhà nước',
    dataType: 'transactional',
    managingAgency: 'Bộ Tài chính',
    scope: 'national',
    description: 'Dữ liệu thu - chi ngân sách theo các bộ ngành, địa phương',
    lifecycleStatus: 'pending_approval',
    createdDate: '10/05/2024',
    updatedDate: '12/12/2024',
    createdBy: 'Ngô Hữu G'
  },
  {
    id: '8',
    code: 'MD-LAND-001',
    name: 'Bộ dữ liệu chủ Đất đai',
    dataType: 'standard',
    managingAgency: 'Bộ TN&MT',
    scope: 'national',
    description: 'Thông tin quy hoạch, thửa đất, chủ sở hữu, biến động bất động sản',
    lifecycleStatus: 'active',
    createdDate: '05/04/2024',
    updatedDate: '15/11/2024',
    createdBy: 'Vũ Thị H'
  },
  {
    id: '9',
    code: 'MD-EDU-001',
    name: 'Bộ dữ liệu chủ Cơ sở giáo dục',
    dataType: 'reference',
    managingAgency: 'Bộ GD&ĐT',
    scope: 'national',
    description: 'Danh mục các trường mầm non, tiểu học, trung học, đại học trên toàn quốc',
    lifecycleStatus: 'inactive',
    createdDate: '18/06/2024',
    updatedDate: '20/10/2024',
    createdBy: 'Đặng Kim I'
  },
  {
    id: '10',
    code: 'MD-HEALTH-001',
    name: 'Bộ dữ liệu chủ Cơ sở y tế',
    dataType: 'reference',
    managingAgency: 'Bộ Y tế',
    scope: 'national',
    description: 'Danh sách các bệnh viện, trạm xá, trung tâm y tế dự phòng',
    lifecycleStatus: 'draft',
    createdDate: '12/07/2024',
    updatedDate: '02/09/2024',
    createdBy: 'Lý Quốc K'
  }
];

export const dataTypeLabels: Record<DataType, string> = {
  standard: 'Dữ liệu chuẩn',
  reference: 'Dữ liệu tham chiếu',
  transactional: 'Dữ liệu giao dịch'
};

export const scopeLabels: Record<ScopeType, string> = {
  national: 'Cấp quốc gia',
  ministry: 'Cấp bộ',
  provincial: 'Cấp tỉnh/thành',
  internal: 'Nội bộ'
};

export const lifecycleLabels: Record<LifecycleStatus, { label: string; color: string }> = {
  active: { label: 'Hiệu lực', color: 'bg-green-100 text-green-700' },
  draft: { label: 'Đang soạn thảo', color: 'bg-yellow-100 text-yellow-700' },
  inactive: { label: 'Ngừng sử dụng', color: 'bg-red-100 text-red-700' },
  archived: { label: 'Đã lưu trữ', color: 'bg-slate-100 text-slate-700' },
  pending_approval: { label: 'Chờ phê duyệt', color: 'bg-orange-100 text-orange-700' },
  pending_expiration: { label: 'Chờ hết hiệu lực', color: 'bg-purple-100 text-purple-700' }
};

export const approvalTypeLabels: Record<ApprovalType, string> = {
  category: 'Phê duyệt danh mục',
  structure: 'Phê duyệt cấu trúc',
  version: 'Phê duyệt phiên bản',
  relationship: 'Phê duyệt quan hệ'
};

export const approvalStatusLabels: Record<ApprovalStatus, { label: string; color: string }> = {
  pending: { label: 'Chờ phê duyệt', color: 'bg-orange-100 text-orange-700' },
  approved: { label: 'Đã phê duyệt', color: 'bg-green-100 text-green-700' },
  rejected: { label: 'Đã từ chối', color: 'bg-red-100 text-red-700' },
  partial: { label: 'Duyệt một phần', color: 'bg-blue-100 text-blue-700' }
};

export const approvers = [
  { id: '1', name: 'Trần Thị B', position: 'Trưởng phòng Quản lý dữ liệu', department: 'Cục CNTT' },
  { id: '2', name: 'Nguyễn Văn D', position: 'Phó Cục trưởng', department: 'Cục CNTT' },
  { id: '3', name: 'Lê Thị E', position: 'Trưởng phòng Pháp chế', department: 'Vụ Pháp luật' },
  { id: '4', name: 'Phạm Văn F', position: 'Cục trưởng', department: 'Cục CNTT' },
];
