import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Save, X, FolderTree, Database, Settings, FileText, Clock, CheckCircle, AlertCircle, Code, Package } from 'lucide-react';
import { PageHeader } from '../../common/PageHeader';

interface PackageStructure {
  id: string;
  code: string;
  name: string;
  description: string;
  targetSystem: string;
  category: string;
  fields: number;
  status: 'active' | 'inactive' | 'draft';
  createdBy: string;
  createdDate: string;
  lastModified: string;
}

interface Field {
  id: string;
  fieldName: string;
  fieldCode: string;
  dataType: string;
  required: boolean;
  length?: number;
  description: string;
}

const mockPackages: PackageStructure[] = [
  {
    id: 'PKG001',
    code: 'NGUOI_NGHEO',
    name: 'Gói tin thông tin người nghèo, cận nghèo',
    description: 'Cấu trúc gói tin báo trợ và giảm nghèo - Thông tin người nghèo, cận nghèo cần cung cấp',
    targetSystem: 'Hệ thống Lao động - Thương binh và Xã hội',
    category: 'Giảm nghèo',
    fields: 25,
    status: 'active',
    createdBy: 'Nguyễn Văn A',
    createdDate: '10/01/2024',
    lastModified: '15/12/2024'
  },
  {
    id: 'PKG002',
    code: 'HO_KHAU',
    name: 'Gói tin thông tin hộ khẩu',
    description: 'Cấu trúc gói tin cung cấp thông tin hộ khẩu cho các đơn vị trong ngành',
    targetSystem: 'Hệ thống Công an',
    category: 'Dân cư',
    fields: 18,
    status: 'active',
    createdBy: 'Trần Thị B',
    createdDate: '05/02/2024',
    lastModified: '10/12/2024'
  },
  {
    id: 'PKG003',
    code: 'DANG_KY_KD',
    name: 'Gói tin đăng ký kinh doanh',
    description: 'Cấu trúc gói tin thông tin đăng ký kinh doanh hộ cá thể',
    targetSystem: 'Hệ thống Kế hoạch và Đầu tư',
    category: 'Kinh doanh',
    fields: 30,
    status: 'draft',
    createdBy: 'Lê Văn C',
    createdDate: '20/11/2024',
    lastModified: '16/12/2024'
  }
];

const mockFields: Field[] = [
  { id: 'F001', fieldName: 'Họ và tên', fieldCode: 'HO_TEN', dataType: 'String', required: true, length: 100, description: 'Họ và tên đầy đủ' },
  { id: 'F002', fieldName: 'Số CCCD', fieldCode: 'SO_CCCD', dataType: 'String', required: true, length: 12, description: 'Số căn cước công dân' },
  { id: 'F003', fieldName: 'Ngày sinh', fieldCode: 'NGAY_SINH', dataType: 'Date', required: true, description: 'Ngày tháng năm sinh' },
  { id: 'F004', fieldName: 'Giới tính', fieldCode: 'GIOI_TINH', dataType: 'String', required: true, length: 10, description: 'Nam/Nữ/Khác' },
  { id: 'F005', fieldName: 'Địa chỉ thường trú', fieldCode: 'DIA_CHI', dataType: 'String', required: true, length: 255, description: 'Địa chỉ nơi thường trú' },
];

export function InternalCatalogProvisionPage() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'metadata' | 'data-list' | 'config' | 'history'>('catalog');
  const [packages, setPackages] = useState<PackageStructure[]>(mockPackages);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFieldsModal, setShowFieldsModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageStructure | null>(null);

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.targetSystem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700 border-green-200',
      inactive: 'bg-slate-100 text-slate-600 border-slate-200',
      draft: 'bg-amber-100 text-amber-700 border-amber-200'
    };
    const labels = {
      active: 'Hoạt động',
      inactive: 'Ngừng',
      draft: 'Bản nháp'
    };
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const stats = {
    total: packages.length,
    active: packages.filter(p => p.status === 'active').length,
    draft: packages.filter(p => p.status === 'draft').length,
    systems: new Set(packages.map(p => p.targetSystem)).size
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader title="Cung cấp danh mục cho hệ thống nội ngành" />

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Dữ liệu danh mục
          </button>
          <button
            onClick={() => setActiveTab('metadata')}
            className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'metadata'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Metadata
          </button>
          <button
            onClick={() => setActiveTab('data-list')}
            className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'data-list'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Danh sách dữ liệu
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'config'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Cấu hình xử lý
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'history'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Lịch sử xử lý
          </button>
        </div>
      </div>

      {/* Tab: Dữ liệu danh mục */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          <div className="flex items-center justify-end">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Thêm gói tin mới
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-600">Tổng gói tin</div>
                  <div className="text-slate-900 mt-1">{stats.total}</div>
                </div>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-600">Đang hoạt động</div>
                  <div className="text-slate-900 mt-1">{stats.active}</div>
                </div>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-600">Bản nháp</div>
                  <div className="text-slate-900 mt-1">{stats.draft}</div>
                </div>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-600">Hệ thống</div>
                  <div className="text-slate-900 mt-1">{stats.systems}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm gói tin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Package List */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Mã gói</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Tên gói tin</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Hệ thống đích</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Danh mục</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Số trường</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Ngày cập nhật</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPackages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm">
                        <code className="px-2 py-0.5 bg-slate-100 text-teal-700 rounded text-xs">{pkg.code}</code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">{pkg.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{pkg.description}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{pkg.targetSystem}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{pkg.category}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{pkg.fields} trường</span>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(pkg.status)}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{pkg.lastModified}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedPackage(pkg);
                              setShowFieldsModal(true);
                            }}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="Xem cấu trúc"
                          >
                            <Code className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-amber-600 hover:bg-amber-50 rounded" title="Sửa">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-red-600 hover:bg-red-50 rounded" title="Xóa">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Metadata */}
      {activeTab === 'metadata' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-slate-900 mb-4">Thông tin Metadata</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-slate-600 mb-2">Tổng số gói tin</div>
              <div className="text-slate-900">{packages.length} gói</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-slate-600 mb-2">Tổng số trường dữ liệu</div>
              <div className="text-slate-900">{packages.reduce((sum, p) => sum + p.fields, 0)} trường</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-slate-600 mb-2">Phiên bản hiện tại</div>
              <div className="text-slate-900">v2.1.0</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-slate-600 mb-2">Cập nhật gần nhất</div>
              <div className="text-slate-900">17/12/2024</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Danh sách dữ liệu */}
      {activeTab === 'data-list' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-slate-900 mb-4">Danh sách dữ liệu đã cung cấp</h3>
          <div className="text-slate-600 text-sm">Hiển thị danh sách các bản ghi dữ liệu đã được cung cấp cho các hệ thống nội ngành...</div>
        </div>
      )}

      {/* Tab: Cấu hình xử lý */}
      {activeTab === 'config' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-slate-900 mb-4">Cấu hình xử lý</h3>
          <div className="space-y-4">
            <div className="p-4 border border-slate-200 rounded-lg">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" className="rounded" defaultChecked />
                Tự động kiểm tra tính hợp lệ dữ liệu
              </label>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" className="rounded" defaultChecked />
                Ghi log mỗi lần cung cấp dữ liệu
              </label>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" className="rounded" />
                Gửi thông báo khi có lỗi
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Lịch sử xử lý */}
      {activeTab === 'history' && (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Thời gian</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Gói tin</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Hành động</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Người thực hiện</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Kết quả</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-600">17/12/2024 14:30</td>
                  <td className="px-6 py-4 text-sm text-slate-900">Gói tin người nghèo</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Cập nhật cấu trúc</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Nguyễn Văn A</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 border border-green-200 rounded-full">
                      Thành công
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Xem cấu trúc trường */}
      {showFieldsModal && selectedPackage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-slate-900">Cấu trúc gói tin: {selectedPackage.name}</h2>
              <button title="Đóng" aria-label="Đóng" onClick={() => setShowFieldsModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs text-slate-600">Tên trường</th>
                    <th className="px-4 py-2 text-left text-xs text-slate-600">Mã trường</th>
                    <th className="px-4 py-2 text-left text-xs text-slate-600">Kiểu dữ liệu</th>
                    <th className="px-4 py-2 text-left text-xs text-slate-600">Độ dài</th>
                    <th className="px-4 py-2 text-left text-xs text-slate-600">Bắt buộc</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockFields.map((field) => (
                    <tr key={field.id}>
                      <td className="px-4 py-3 text-sm text-slate-900">{field.fieldName}</td>
                      <td className="px-4 py-3 text-sm">
                        <code className="text-xs bg-slate-100 px-2 py-1 rounded">{field.fieldCode}</code>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{field.dataType}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{field.length || '-'}</td>
                      <td className="px-4 py-3">
                        {field.required ? (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">Có</span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full">Không</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}