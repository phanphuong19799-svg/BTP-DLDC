import { X, Search, ChevronLeft, ChevronRight, Upload, FileDown, RefreshCw, Filter, Eye, Calendar, RotateCcw, Edit2, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface DataDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  totalRecords: number;
  newRecords: number;
  updatedRecords: number;
  errorRecords: number;
}

interface DetailRecord {
  id: string;
  code: string;
  name: string;
  gender: string;
  idNumber: string;
  birthDate: string;
  birthDateInWords: string;
  birthPlace: string;
  hometown: string;
  ethnicity: string;
  nationality: string;
  personalId: string;
  certificateNo: string;
  registrationDate: string;
  syncDate: string;
  type: string;
  status: string;
  approvalStatus: string;
  collectedAt: string;
  hasError?: boolean;
  errorMessage?: string;
  phone?: string;
  address?: string;
  fatherName?: string;
  fatherBirthDate?: string;
  fatherEthnicity?: string;
  fatherNationality?: string;
  fatherAddress?: string;
  fatherIdIssueDate?: string;
  fatherIdIssuePlace?: string;
  fatherIdNumber?: string;
  fatherPersonalId?: string;
  motherName?: string;
  motherBirthDate?: string;
  motherEthnicity?: string;
  motherNationality?: string;
  motherAddress?: string;
  motherIdIssueDate?: string;
  motherIdIssuePlace?: string;
  motherIdNumber?: string;
  motherPersonalId?: string;
  registrationPlace?: string;
  registrationType?: string;
  foreignCertificateNo?: string;
  foreignCertificateDate?: string;
  foreignOrganization?: string;
  foreignCountry?: string;
  declarantName?: string;
  declarantRelation?: string;
  declarantIdIssuePlace?: string;
  declarantIdIssueDate?: string;
  declarantIdNumber?: string;
  declarantPersonalId?: string;
  signDate?: string;
  signerPosition?: string;
  implementer?: string;
  notes?: string;
}

export function DataDetailModal({ 
  isOpen, 
  onClose, 
  title, 
  totalRecords,
  newRecords,
  updatedRecords,
  errorRecords
}: DataDetailModalProps) {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedRecord, setSelectedRecord] = useState<DetailRecord | null>(null);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [detailTab, setDetailTab] = useState('person');
  
  if (!isOpen) return null;

  // Mock data for the table
  const detailRecords: DetailRecord[] = [
    { 
      id: '1', 
      code: 'REC-2025-001', 
      name: 'Nguyễn Văn An', 
      gender: 'Nam',
      idNumber: '001234567890', 
      birthDate: '15/05/1985', 
      birthDateInWords: 'Ngày 15 tháng 5 năm 1985',
      birthPlace: 'Hà Nội',
      hometown: 'Hà Nội',
      ethnicity: 'Kinh',
      nationality: 'Việt Nam',
      personalId: '001234567890',
      certificateNo: '001234567890',
      registrationDate: '15/05/1985',
      syncDate: '19/12/2025 15:30:00',
      type: 'Mới', 
      status: 'Hợp lệ',
      approvalStatus: 'Đã phê duyệt',
      collectedAt: '19/12/2025 15:30:00',
      fatherName: 'Nguyễn Văn Bình',
      fatherBirthDate: '01/01/1950',
      fatherEthnicity: 'Kinh',
      fatherNationality: 'Việt Nam',
      fatherAddress: 'Hà Nội',
      fatherIdIssueDate: '01/01/2000',
      fatherIdIssuePlace: 'Hà Nội',
      fatherIdNumber: '001234567890',
      fatherPersonalId: '001234567890',
      motherName: 'Trần Thị Cúc',
      motherBirthDate: '01/01/1950',
      motherEthnicity: 'Kinh',
      motherNationality: 'Việt Nam',
      motherAddress: 'Hà Nội',
      motherIdIssueDate: '01/01/2000',
      motherIdIssuePlace: 'Hà Nội',
      motherIdNumber: '001234567890',
      motherPersonalId: '001234567890'
    },
    { 
      id: '2', 
      code: 'REC-2025-002', 
      name: 'Trần Thị Bình', 
      gender: 'Nữ',
      idNumber: '001234567891', 
      birthDate: '20/08/1990', 
      birthDateInWords: 'Ngày 20 tháng 8 năm 1990',
      birthPlace: 'Hà Nội',
      hometown: 'Hà Nội',
      ethnicity: 'Kinh',
      nationality: 'Việt Nam',
      personalId: '001234567891',
      certificateNo: '001234567891',
      registrationDate: '20/08/1990',
      syncDate: '19/12/2025 15:30:02',
      type: 'Mới', 
      status: 'Hợp lệ',
      approvalStatus: 'Đã phê duyệt',
      collectedAt: '19/12/2025 15:30:02',
      fatherName: 'Trần Văn Dũng',
      fatherBirthDate: '01/01/1950',
      fatherEthnicity: 'Kinh',
      fatherNationality: 'Việt Nam',
      fatherAddress: 'Hà Nội',
      fatherIdIssueDate: '01/01/2000',
      fatherIdIssuePlace: 'Hà Nội',
      fatherIdNumber: '001234567890',
      fatherPersonalId: '001234567890',
      motherName: 'Lê Thị Em',
      motherBirthDate: '01/01/1950',
      motherEthnicity: 'Kinh',
      motherNationality: 'Việt Nam',
      motherAddress: 'Hà Nội',
      motherIdIssueDate: '01/01/2000',
      motherIdIssuePlace: 'Hà Nội',
      motherIdNumber: '001234567890',
      motherPersonalId: '001234567890'
    },
    { 
      id: '3', 
      code: 'REC-2025-003', 
      name: 'Lê Văn Cường', 
      gender: 'Nam',
      idNumber: '001234567892', 
      birthDate: '31/13/2023', 
      birthDateInWords: 'Ngày 31 tháng 13 năm 2023',
      birthPlace: 'Hà Nội',
      hometown: 'Hà Nội',
      ethnicity: 'Kinh',
      nationality: 'Việt Nam',
      personalId: '001234567892',
      certificateNo: '001234567892',
      registrationDate: '31/13/2023',
      syncDate: '19/12/2025 15:30:05',
      type: 'Mới', 
      status: 'Lỗi định dạng',
      approvalStatus: 'Chưa phê duyệt',
      collectedAt: '19/12/2025 15:30:05',
      hasError: true,
      errorMessage: 'Sai định dạng ngày tháng',
      fatherName: 'Lê Văn Hùng',
      fatherBirthDate: '01/01/1950',
      fatherEthnicity: 'Kinh',
      fatherNationality: 'Việt Nam',
      fatherAddress: 'Hà Nội',
      fatherIdIssueDate: '01/01/2000',
      fatherIdIssuePlace: 'Hà Nội',
      fatherIdNumber: '001234567890',
      fatherPersonalId: '001234567890',
      motherName: 'Phạm Thị Lan',
      motherBirthDate: '01/01/1950',
      motherEthnicity: 'Kinh',
      motherNationality: 'Việt Nam',
      motherAddress: 'Hà Nội',
      motherIdIssueDate: '01/01/2000',
      motherIdIssuePlace: 'Hà Nội',
      motherIdNumber: '001234567890',
      motherPersonalId: '001234567890'
    },
    { 
      id: '4', 
      code: 'REC-2025-004', 
      name: 'Phạm Thị Dung', 
      gender: 'Nữ',
      idNumber: '001234567893', 
      birthDate: '10/03/1988', 
      birthDateInWords: 'Ngày 10 tháng 3 năm 1988',
      birthPlace: 'Hà Nội',
      hometown: 'Hà Nội',
      ethnicity: 'Kinh',
      nationality: 'Việt Nam',
      personalId: '001234567893',
      certificateNo: '001234567893',
      registrationDate: '10/03/1988',
      syncDate: '19/12/2025 15:30:07',
      type: 'Mới', 
      status: 'Lỗi định dạng',
      approvalStatus: 'Chưa phê duyệt',
      collectedAt: '19/12/2025 15:30:07',
      hasError: true,
      errorMessage: 'Sai định dạng điện thoại',
      fatherName: 'Phạm Văn Khoa',
      fatherBirthDate: '01/01/1950',
      fatherEthnicity: 'Kinh',
      fatherNationality: 'Việt Nam',
      fatherAddress: 'Hà Nội',
      fatherIdIssueDate: '01/01/2000',
      fatherIdIssuePlace: 'Hà Nội',
      fatherIdNumber: '001234567890',
      fatherPersonalId: '001234567890',
      motherName: 'Hoàng Thị Mai',
      motherBirthDate: '01/01/1950',
      motherEthnicity: 'Kinh',
      motherNationality: 'Việt Nam',
      motherAddress: 'Hà Nội',
      motherIdIssueDate: '01/01/2000',
      motherIdIssuePlace: 'Hà Nội',
      motherIdNumber: '001234567890',
      motherPersonalId: '001234567890'
    },
    { 
      id: '5', 
      code: 'REC-2025-005', 
      name: 'Hoàng Văn Em', 
      gender: 'Nam',
      idNumber: '001234567894', 
      birthDate: '25/11/1992', 
      birthDateInWords: 'Ngày 25 tháng 11 năm 1992',
      birthPlace: 'Hà Nội',
      hometown: 'Hà Nội',
      ethnicity: 'Kinh',
      nationality: 'Việt Nam',
      personalId: '001234567894',
      certificateNo: '001234567894',
      registrationDate: '25/11/1992',
      syncDate: '19/12/2025 15:30:10',
      type: 'Cập nhật', 
      status: 'Hợp lệ',
      approvalStatus: 'Đã phê duyệt',
      collectedAt: '19/12/2025 15:30:10',
      fatherName: 'Hoàng Văn Nam',
      fatherBirthDate: '01/01/1950',
      fatherEthnicity: 'Kinh',
      fatherNationality: 'Việt Nam',
      fatherAddress: 'Hà Nội',
      fatherIdIssueDate: '01/01/2000',
      fatherIdIssuePlace: 'Hà Nội',
      fatherIdNumber: '001234567890',
      fatherPersonalId: '001234567890',
      motherName: 'Vũ Thị Oanh',
      motherBirthDate: '01/01/1950',
      motherEthnicity: 'Kinh',
      motherNationality: 'Việt Nam',
      motherAddress: 'Hà Nội',
      motherIdIssueDate: '01/01/2000',
      motherIdIssuePlace: 'Hà Nội',
      motherIdNumber: '001234567890',
      motherPersonalId: '001234567890'
    },
    { 
      id: '6', 
      code: 'REC-2025-006', 
      name: 'Vũ Thị Hoa', 
      gender: 'Nữ',
      idNumber: '001234567895', 
      birthDate: '18/07/1995', 
      birthDateInWords: 'Ngày 18 tháng 7 năm 1995',
      birthPlace: 'Hà Nội',
      hometown: 'Hà Nội',
      ethnicity: 'Kinh',
      nationality: 'Việt Nam',
      personalId: '001234567895',
      certificateNo: '001234567895',
      registrationDate: '18/07/1995',
      syncDate: '19/12/2025 15:30:12',
      type: 'Mới', 
      status: 'Hợp lệ',
      approvalStatus: 'Đã phê duyệt',
      collectedAt: '19/12/2025 15:30:12',
      fatherName: 'Vũ Văn Phong',
      fatherBirthDate: '01/01/1950',
      fatherEthnicity: 'Kinh',
      fatherNationality: 'Việt Nam',
      fatherAddress: 'Hà Nội',
      fatherIdIssueDate: '01/01/2000',
      fatherIdIssuePlace: 'Hà Nội',
      fatherIdNumber: '001234567890',
      fatherPersonalId: '001234567890',
      motherName: 'Đỗ Thị Quỳnh',
      motherBirthDate: '01/01/1950',
      motherEthnicity: 'Kinh',
      motherNationality: 'Việt Nam',
      motherAddress: 'Hà Nội',
      motherIdIssueDate: '01/01/2000',
      motherIdIssuePlace: 'Hà Nội',
      motherIdNumber: '001234567890',
      motherPersonalId: '001234567890'
    },
    { 
      id: '7', 
      code: 'REC-2025-007', 
      name: 'Đỗ Văn Kiên', 
      gender: 'Nam',
      idNumber: 'abc12345', 
      birthDate: '05/02/1987', 
      birthDateInWords: 'Ngày 05 tháng 2 năm 1987',
      birthPlace: 'Hà Nội',
      hometown: 'Hà Nội',
      ethnicity: 'Kinh',
      nationality: 'Việt Nam',
      personalId: 'abc12345',
      certificateNo: 'abc12345',
      registrationDate: '05/02/1987',
      syncDate: '19/12/2025 15:30:15',
      type: 'Mới', 
      status: 'Lỗi định dạng',
      approvalStatus: 'Chưa phê duyệt',
      collectedAt: '19/12/2025 15:30:15',
      hasError: true,
      errorMessage: 'Sai định dạng',
      fatherName: 'Đỗ Văn Sơn',
      fatherBirthDate: '01/01/1950',
      fatherEthnicity: 'Kinh',
      fatherNationality: 'Việt Nam',
      fatherAddress: 'Hà Nội',
      fatherIdIssueDate: '01/01/2000',
      fatherIdIssuePlace: 'Hà Nội',
      fatherIdNumber: '001234567890',
      fatherPersonalId: '001234567890',
      motherName: 'Nguyễn Thị Tâm',
      motherBirthDate: '01/01/1950',
      motherEthnicity: 'Kinh',
      motherNationality: 'Việt Nam',
      motherAddress: 'Hà Nội',
      motherIdIssueDate: '01/01/2000',
      motherIdIssuePlace: 'Hà Nội',
      motherIdNumber: '001234567890',
      motherPersonalId: '001234567890'
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-4 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-[90vw] max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Chi tiết dữ liệu đã thu thập</h2>
              <p className="text-sm text-slate-600 mt-1">
                {title}
              </p>
              <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Đồng bộ cuối cùng: 25/02/2026 14:30:00
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Summary Cards */}
          <div className="px-6 py-4 flex-shrink-0 border-b border-slate-200">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">Tổng bản ghi</div>
                <div className="text-2xl font-bold text-slate-900">{totalRecords.toLocaleString()}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">Bản ghi mới hôm nay</div>
                <div className="text-2xl font-bold text-blue-600">{newRecords.toLocaleString()}</div>
                <div className="text-xs text-slate-500 mt-1">Đồng bộ trong ngày</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">Bản ghi cập nhật</div>
                <div className="text-2xl font-bold text-green-600">{updatedRecords.toLocaleString()}</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">Bản ghi lỗi</div>
                <div className="text-2xl font-bold text-orange-600">{errorRecords}</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 pt-4 flex-shrink-0">
            <div className="flex items-center gap-1 border-b border-slate-200">
              <button
                onClick={() => setActiveTab('list')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'list'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                📋 Danh sách đối tượng
              </button>
              <button
                onClick={() => setActiveTab('config')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'config'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                ⚙️ Lịch sử chỉnh sửa kết nối
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'history'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                🕐 Lịch sử đồng bộ
              </button>
            </div>
          </div>

          {/* Tab Content - LIST */}
          {activeTab === 'list' && (
            <>
              {/* Search and Filters */}
              <div className="px-6 py-4 flex-shrink-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm theo tên, mã dịch vụ, đơn vị..."
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                    className={`px-4 py-2 border border-slate-300 ${showAdvancedSearch ? 'bg-slate-100' : 'bg-white'} text-slate-700 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-sm whitespace-nowrap`}
                  >
                    <Filter className="w-4 h-4" />
                    Tìm kiếm nâng cao
                  </button>
                  
                  <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-sm">
                    <Upload className="w-4 h-4" />
                    Nhập
                  </button>
                  <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-sm">
                    <FileDown className="w-4 h-4" />
                    Xuất
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm">
                    <RefreshCw className="w-4 h-4" />
                    Đồng bộ
                  </button>
                </div>

                {/* Advanced Search Panel */}
                {showAdvancedSearch && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-3">
                    <div className="grid grid-cols-4 gap-3 mb-3">
                      <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                        <option>Tất cả nguồn dữ liệu</option>
                        <option>LGSP</option>
                        <option>NDXP</option>
                      </select>
                      <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                        <option>Tất cả Cục/Vụ</option>
                        <option>Cục CNTT</option>
                        <option>Vụ Pháp chế</option>
                      </select>
                      <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                        <option>Tất cả trạng thái</option>
                        <option>Hoạt động</option>
                        <option>Tạm dừng</option>
                      </select>
                      <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                        <option>Tất cả loại dịch vụ</option>
                        <option>Dịch vụ công</option>
                        <option>Thu thập dữ liệu</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-600" />
                        <span className="text-sm text-slate-600">Thời gian:</span>
                        <input type="date" defaultValue="2026-01-31" className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <span className="text-slate-400">—</span>
                        <input type="date" defaultValue="2026-02-27" className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div className="ml-auto flex gap-2">
                        <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm">
                          <Search className="w-4 h-4" />
                          Tìm kiếm
                        </button>
                        <button 
                          onClick={() => setShowAdvancedSearch(false)}
                          className="px-4 py-1.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 flex items-center gap-2 text-sm"
                        >
                          <X className="w-4 h-4" />
                          Bỏ lọc
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Table */}
              <div className="flex-1 overflow-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 sticky top-0">
                    <tr className="border-b border-slate-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">STT</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Tình trạng</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Họ tên</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Giới tính</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Ngày sinh</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Họ tên Cha</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Họ tên Mẹ</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Quốc tịch</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">SG giấy chứng nhận</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Ngày đăng ký</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Ngày đồng bộ</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Trạng thái</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailRecords.map((record, index) => (
                      <tr key={record.id} className="border-b border-slate-200 hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm text-slate-900">{index + 1}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-block px-2 py-1 rounded text-xs ${
                            record.type === 'Mới' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {record.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-900">{record.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{record.gender}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{record.birthDate}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{record.fatherName}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{record.motherName}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{record.nationality}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{record.certificateNo}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{record.registrationDate}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{record.syncDate}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                            record.approvalStatus === 'Đã phê duyệt' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              record.approvalStatus === 'Đã phê duyệt' ? 'bg-green-600' : 'bg-yellow-600'
                            }`}></span>
                            {record.approvalStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button 
                            onClick={() => setSelectedRecord(record)}
                            className="w-8 h-8 flex items-center justify-center rounded hover:bg-blue-50 text-blue-600"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Tab Content - CONNECTION HISTORY */}
          {activeTab === 'config' && (
            <div className="flex-1 overflow-auto p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-slate-900">Danh sách kết nối API</h3>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Đang hoạt động</span>
                  <span className="text-sm text-slate-600">Tổng: 3</span>
                </div>
              </div>

              {/* API Connection Cards */}
              <div className="space-y-4">
                {/* API 1 */}
                <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-slate-900">API Danh mục giới tính</h4>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Đang kết nối</span>
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">API-KEY</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-2">Kết nối API danh sách các giới tính cho hệ thống LGSP</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <span className="text-slate-600">🔗 Endpoint</span>
                          <code className="font-mono text-blue-600">/api/v1/categories/gender</code>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-600">📡 Method</span>
                          <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded font-mono">GET</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-blue-50 text-blue-600">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-blue-50 text-blue-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-green-50 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-50 text-red-600">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-200">
                    <div>
                      <span className="text-xs text-slate-600">⏱️ Response Time</span>
                      <p className="text-sm font-medium text-slate-900">120ms</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-600">🔄 Đang kết nối</span>
                      <p className="text-sm font-medium text-emerald-600">09/12/2025 14:30:25</p>
                    </div>
                  </div>
                </div>

                {/* API 2 */}
                <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-slate-900">API Danh mục quốc tịch</h4>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Đang kết nối</span>
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">CLIENT-SECRET</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-2">Kết nối API danh sách quốc tịch</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <span className="text-slate-600">🔗 Endpoint</span>
                          <code className="font-mono text-blue-600">/api/v1/categories/nationality</code>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-600">📡 Method</span>
                          <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded font-mono">GET</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-blue-50 text-blue-600">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-blue-50 text-blue-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-green-50 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-50 text-red-600">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-200">
                    <div>
                      <span className="text-xs text-slate-600">⏱️ Response Time</span>
                      <p className="text-sm font-medium text-slate-900">93ms</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-600">🔄 Đang kết nối</span>
                      <p className="text-sm font-medium text-emerald-600">09/12/2025 14:45:10</p>
                    </div>
                  </div>
                </div>

                {/* API 3 */}
                <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-slate-900">API Backup (Dự phòng)</h4>
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">Nghiệp vụ mở</span>
                        <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-xs rounded">OAuth2</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Tạm dừng</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-2">Kết nối dự phòng khi hệ thống chính gặp sự cố</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <span className="text-slate-600">🔗 Endpoint</span>
                          <code className="font-mono text-blue-600">/api/v1/backup</code>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-600">📡 Method</span>
                          <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded font-mono">GET</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-blue-50 text-blue-600">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-blue-50 text-blue-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-green-50 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-50 text-red-600">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-200">
                    <div>
                      <span className="text-xs text-slate-600">⏱️ Response Time</span>
                      <p className="text-sm font-medium text-slate-900">-</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-600">🔄 Đang kết nối</span>
                      <p className="text-sm font-medium text-slate-600">-</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content - SYNC HISTORY */}
          {activeTab === 'history' && (
            <div className="flex-1 overflow-auto p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-slate-900 mb-1">Tổng số lần đồng bộ đợt 3 lần</h3>
                  <p className="text-xs text-slate-600">
                    <a href="#" className="text-blue-600 hover:underline">Làm mới</a>
                  </p>
                </div>
              </div>

              {/* Sync History Table */}
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">THỜI GIAN</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">TRẠNG THÁI</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">THÊM MỚI</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">CẬP NHẬT</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">LỖI</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">TỔNG SỐ</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">THỜI LƯỢNG</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        09/12/2025 14:30:25
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Thành công
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-emerald-600 font-medium">↗ 150</td>
                    <td className="px-4 py-3 text-sm text-slate-900">45</td>
                    <td className="px-4 py-3 text-sm text-orange-600 font-medium">0</td>
                    <td className="px-4 py-3 text-sm text-slate-900">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                        195
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">2.5s</td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        09/12/2025 10:15:10
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Thành công
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-emerald-600 font-medium">↗ 98</td>
                    <td className="px-4 py-3 text-sm text-slate-900">32</td>
                    <td className="px-4 py-3 text-sm text-orange-600 font-medium">0</td>
                    <td className="px-4 py-3 text-sm text-slate-900">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                        130
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">1.8s</td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        08/12/2025 18:45:33
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                        <XCircle className="w-3 h-3" />
                        Mất phần
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-emerald-600 font-medium">↗ 120</td>
                    <td className="px-4 py-3 text-sm text-slate-900">28</td>
                    <td className="px-4 py-3 text-sm text-orange-600 font-medium">5</td>
                    <td className="px-4 py-3 text-sm text-slate-900">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                        153
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">3.2s</td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        08/12/2025 14:20:15
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Thành công
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-emerald-600 font-medium">↗ 210</td>
                    <td className="px-4 py-3 text-sm text-slate-900">67</td>
                    <td className="px-4 py-3 text-sm text-orange-600 font-medium">0</td>
                    <td className="px-4 py-3 text-sm text-slate-900">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                        277
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">4.1s</td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        08/12/2025 10:10:05
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Thành công
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-emerald-600 font-medium">↗ 88</td>
                    <td className="px-4 py-3 text-sm text-slate-900">19</td>
                    <td className="px-4 py-3 text-sm text-orange-600 font-medium">0</td>
                    <td className="px-4 py-3 text-sm text-slate-900">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                        107
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">1.5s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Footer with Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Hiển thị</span>
              <select className="px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span className="text-sm text-slate-600">bản ghi/trang</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">Hiển thị 1-10 / 12 bản ghi</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-slate-600">Trang 1 / 2</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="ml-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 text-sm"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Record Detail Popup */}
      {selectedRecord && (
        <>
          {/* Backdrop for record detail */}
          <div 
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={() => setSelectedRecord(null)}
          />
          
          {/* Record Detail Modal */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] flex flex-col">
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
                <h3 className="text-lg font-semibold text-slate-900">Chi tiết bản ghi</h3>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="px-6 pt-4 flex-shrink-0 border-b border-slate-200">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setDetailTab('person')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      detailTab === 'person'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    👤 Người được khai sinh
                  </button>
                  <button
                    onClick={() => setDetailTab('father')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      detailTab === 'father'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    👨 Người cha
                  </button>
                  <button
                    onClick={() => setDetailTab('mother')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      detailTab === 'mother'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    👩 Người mẹ
                  </button>
                  <button
                    onClick={() => setDetailTab('other')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      detailTab === 'other'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📋 Thông tin khác
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 overflow-auto">
                {/* Tab: Thông tin về người được khai sinh */}
                {detailTab === 'person' && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-slate-900 bg-slate-100 px-3 py-2 mb-3 border-l-4 border-blue-600">Thông tin về người được khai sinh</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Họ, chữ đệm, tên</div>
                      <div className="text-sm text-slate-900">{selectedRecord.name}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Giới tính</div>
                      <div className="text-sm text-slate-900">{selectedRecord.gender}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Ngày, tháng, năm sinh</div>
                      <div className="text-sm text-slate-900">{selectedRecord.birthDate}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Ngày sinh bằng chữ</div>
                      <div className="text-sm text-slate-900">{selectedRecord.birthDateInWords}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Nơi sinh</div>
                      <div className="text-sm text-slate-900">{selectedRecord.birthPlace}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Quê quán</div>
                      <div className="text-sm text-slate-900">{selectedRecord.hometown}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Dân tộc</div>
                      <div className="text-sm text-slate-900">{selectedRecord.ethnicity}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Quốc tịch</div>
                      <div className="text-sm text-slate-900">{selectedRecord.nationality}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded col-span-2">
                      <div className="text-xs text-slate-600 mb-1">Số định danh cá nhân</div>
                      <div className="text-sm text-slate-900">{selectedRecord.personalId}</div>
                    </div>
                  </div>
                </div>
                )}

                {/* Tab: Thông tin về người cha */}
                {detailTab === 'father' && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-slate-900 bg-slate-100 px-3 py-2 mb-3 border-l-4 border-blue-600">Thông tin về người cha</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Họ, chữ đệm, tên</div>
                      <div className="text-sm text-slate-900">{selectedRecord.fatherName || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Ngày, tháng, năm sinh</div>
                      <div className="text-sm text-slate-900">{selectedRecord.fatherBirthDate || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Dân tộc</div>
                      <div className="text-sm text-slate-900">{selectedRecord.fatherEthnicity || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Quốc tịch</div>
                      <div className="text-sm text-slate-900">{selectedRecord.fatherNationality || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded col-span-2">
                      <div className="text-xs text-slate-600 mb-1">Nơi cư trú</div>
                      <div className="text-sm text-slate-900">{selectedRecord.fatherAddress || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Ngày cấp giấy tờ tùy thân</div>
                      <div className="text-sm text-slate-900">{selectedRecord.fatherIdIssueDate || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Nơi cấp giấy tờ tùy thân</div>
                      <div className="text-sm text-slate-900">{selectedRecord.fatherIdIssuePlace || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Số giấy tờ tùy thân</div>
                      <div className="text-sm text-slate-900">{selectedRecord.fatherIdNumber || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Số định danh cá nhân</div>
                      <div className="text-sm text-slate-900">{selectedRecord.fatherPersonalId || '-'}</div>
                    </div>
                  </div>
                </div>
                )}

                {/* Tab: Thông tin về người mẹ */}
                {detailTab === 'mother' && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-slate-900 bg-slate-100 px-3 py-2 mb-3 border-l-4 border-blue-600">Thông tin về người mẹ</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Họ, chữ đệm, tên</div>
                      <div className="text-sm text-slate-900">{selectedRecord.motherName || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Ngày, tháng, năm sinh</div>
                      <div className="text-sm text-slate-900">{selectedRecord.motherBirthDate || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Dân tộc</div>
                      <div className="text-sm text-slate-900">{selectedRecord.motherEthnicity || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Quốc tịch</div>
                      <div className="text-sm text-slate-900">{selectedRecord.motherNationality || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded col-span-2">
                      <div className="text-xs text-slate-600 mb-1">Nơi cư trú</div>
                      <div className="text-sm text-slate-900">{selectedRecord.motherAddress || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Ngày cấp giấy tờ tùy thân</div>
                      <div className="text-sm text-slate-900">{selectedRecord.motherIdIssueDate || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Nơi cấp giấy tờ tùy thân</div>
                      <div className="text-sm text-slate-900">{selectedRecord.motherIdIssuePlace || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Số giấy tờ tùy thân</div>
                      <div className="text-sm text-slate-900">{selectedRecord.motherIdNumber || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Số định danh cá nhân</div>
                      <div className="text-sm text-slate-900">{selectedRecord.motherPersonalId || '-'}</div>
                    </div>
                  </div>
                </div>
                )}

                {/* Tab: Thông tin khác */}
                {detailTab === 'other' && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-slate-900 bg-slate-100 px-3 py-2 mb-3 border-l-4 border-blue-600">Thông tin khác</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Nơi đăng ký</div>
                      <div className="text-sm text-slate-900">{selectedRecord.registrationPlace || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Ngày đăng ký</div>
                      <div className="text-sm text-slate-900">{selectedRecord.registrationDate}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Loại đăng ký</div>
                      <div className="text-sm text-slate-900">{selectedRecord.registrationType || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Số giấy khai sinh do cơ quan nước ngoài cấp</div>
                      <div className="text-sm text-slate-900">{selectedRecord.foreignCertificateNo || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Ngày cấp giấy khai sinh do cơ quan nước ngoài cấp</div>
                      <div className="text-sm text-slate-900">{selectedRecord.foreignCertificateDate || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Tên cơ quan nước ngoài cấp giấy khai sinh</div>
                      <div className="text-sm text-slate-900">{selectedRecord.foreignOrganization || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Quốc gia đã cấp giấy khai sinh</div>
                      <div className="text-sm text-slate-900">{selectedRecord.foreignCountry || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Họ, chữ đệm, tên người đi khai sinh</div>
                      <div className="text-sm text-slate-900">{selectedRecord.declarantName || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Quan hệ với người được khai sinh</div>
                      <div className="text-sm text-slate-900">{selectedRecord.declarantRelation || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Nơi cấp giấy tờ tùy thân</div>
                      <div className="text-sm text-slate-900">{selectedRecord.declarantIdIssuePlace || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Ngày cấp giấy tờ tùy thân</div>
                      <div className="text-sm text-slate-900">{selectedRecord.declarantIdIssueDate || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Số giấy tờ tùy thân</div>
                      <div className="text-sm text-slate-900">{selectedRecord.declarantIdNumber || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Số định danh cá nhân</div>
                      <div className="text-sm text-slate-900">{selectedRecord.declarantPersonalId || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Ngày ký</div>
                      <div className="text-sm text-slate-900">{selectedRecord.signDate || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Chức vụ người ký</div>
                      <div className="text-sm text-slate-900">{selectedRecord.signerPosition || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded">
                      <div className="text-xs text-slate-600 mb-1">Người thực hiện</div>
                      <div className="text-sm text-slate-900">{selectedRecord.implementer || '-'}</div>
                    </div>
                    <div className="border border-slate-200 p-2 rounded col-span-2">
                      <div className="text-xs text-slate-600 mb-1">Ghi chú ghi những nội dung thay đổi sau này</div>
                      <div className="text-sm text-slate-900">{selectedRecord.notes || '-'}</div>
                    </div>
                  </div>
                </div>
                )}

                {/* Trạng thái lỗi - hiển thị ở tất cả các tab */}
                {selectedRecord.hasError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-red-900 mb-1">Lỗi dữ liệu</div>
                        <div className="text-sm text-red-700">{selectedRecord.errorMessage}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3 flex-shrink-0 bg-white">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-sm"
                >
                  <X className="w-4 h-4" />
                  Đóng
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
                >
                  <FileDown className="w-4 h-4" />
                  Xuất file
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}