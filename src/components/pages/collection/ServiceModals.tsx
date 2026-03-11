import { X, AlertCircle, CheckCircle, Upload, Eye, EyeOff, Database, FileText, User, Plug, Settings, Plus } from 'lucide-react';
import { useState } from 'react';
import { DataCollectionConfigSection } from './DataCollectionConfigSection';
import { ConnectionConfigSection } from './ConnectionConfigSection';
import { ContactInfoSection } from './ContactInfoSection';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: any;
  onViewData?: (pageId?: string) => void;
}

type TabType = 'general' | 'contact' | 'connection' | 'collection';

// Modal Thêm mới phương thức
export function AddServiceModal({ isOpen, onClose }: ServiceModalProps) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [dataClassification, setDataClassification] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement add service logic
    alert('Thêm mới phương thức thu thập thành công!');
    onClose();
  };

  const tabs = [
    { id: 'general' as TabType, label: 'Thông tin chung', icon: <FileText className="w-4 h-4" /> },
    { id: 'contact' as TabType, label: 'Thông tin đơn vị cung cấp', icon: <User className="w-4 h-4" /> },
    { id: 'connection' as TabType, label: 'Cấu hình kết nối', icon: <Plug className="w-4 h-4" /> },
    { id: 'collection' as TabType, label: 'Cấu hình thu thập', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg text-slate-900">Thông tin kết nối</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="flex gap-1 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm transition-colors relative flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-4">
            {/* Tab 1: Thông tin chung */}
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    Tên service <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="VD: API dịch vụ dữ liệu quốc tịch"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">
                      Tên đơn vị <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập tên đơn vị"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">
                      Hệ thống <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập tên hệ thống"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">
                      Nguồn thu thập <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={dataClassification}
                      onChange={(e) => setDataClassification(e.target.value)}
                    >
                      <option value="">Chọn phân loại</option>
                      <option value="noi-nganh">Hệ thống nội ngành</option>
                      <option value="ngoai-nganh">Ngoài ngành</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">
                      Mức độ bảo mật dữ liệu <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Chọn mức độ</option>
                      <option value="mo">Dữ liệu mở</option>
                      <option value="noi-bo">Dữ liệu nội bộ</option>
                      <option value="han-che">Dữ liệu hạn chế</option>
                      <option value="nhay-cam">Dữ liệu nhạy cảm</option>
                      <option value="bao-mat">Dữ liệu bảo mật</option>
                      <option value="tuyet-mat">Dữ liệu tuyệt mật</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Mô tả chi tiết về service"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-2">
                    Đính kèm văn bản
                  </label>
                  <div className="border border-slate-300 rounded-lg p-3">
                    <div className="flex items-center justify-center flex-col gap-2 py-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Upload className="w-6 h-6 text-slate-400" />
                      </div>
                      <p className="text-sm text-slate-600">Kéo thả file hoặc click để chọn</p>
                      <p className="text-xs text-slate-500">Hỗ trợ: PDF, DOC, DOCX (tối đa 10MB)</p>
                      <button
                        type="button"
                        className="px-3 py-1.5 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        Chọn file
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Thông tin đơn vị cung cấp */}
            {activeTab === 'contact' && (
              <ContactInfoSection />
            )}

            {/* Tab 3: Cấu hình kết nối */}
            {activeTab === 'connection' && (
              <ConnectionConfigSection dataClassification={dataClassification} />
            )}

            {/* Tab 4: Cấu hình thu thập */}
            {activeTab === 'collection' && (
              <DataCollectionConfigSection />
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Lưu nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal Chi tiết kết nối API
export function ViewServiceModal({ isOpen, onClose, service, onViewData }: ServiceModalProps) {
  const [showClientSecret, setShowClientSecret] = useState(false);
  
  if (!isOpen || !service) return null;

  // Map service name to corresponding page ID
  const getPageIdFromService = (serviceName: string): string | null => {
    const servicePageMap: Record<string, string> = {
      // Trong ngành
      'CSDL Hộ tịch điện tử': 'data-info-civil-registry',
      'Hệ thống quản lý hồ sơ quản lý tài sản': 'data-info-case-management',
      'CSDL thi hành án dân sự': 'data-info-civil-judgment',
      'CSDL về biện pháp bắt buộc': 'data-info-security-measures',
      'CSDL quốc gia về Pháp luật': 'data-info-legal-national',
      'CSDL Trung tâm Tư Pháp dân sự': 'data-info-civil-legal-center',
      'Hệ thống thông tin tư pháp pháp lý dân sự': 'data-info-civil-legal-info',
      'Hệ thống thông tin tư pháp Pháp lý': 'data-info-legal-center',
      'CSDL Phổ biến, Giáo dục và Hòa giải ở cơ sở': 'data-info-family-base',
      'CSDL quản lý đấu giá tài sản': 'data-info-auction',
      'CSDL Hợp tác quốc tế': 'data-info-international',
      'CSDL Thống kê thu thập': 'collection-statistics',
      
      // Ngoài ngành
      'Thu thập Thông tin Bản án, quyết định từ TANDTC': 'external-court-judgment',
      'CSDL Thông tin Bản án, quyết định từ TAND tối cao': 'external-court-judgment',
      'Nhóm Danh mục': 'external-category-group',
      'Danh mục': 'external-category-group',
      'Nhóm BHXH và Giảm nghèo': 'external-social-security',
      'BHXH và Giảm nghèo': 'external-social-security',
      'Nhóm Người có công': 'external-meritorious-group',
      'Người có công': 'external-meritorious-group',
      'Nhóm Trẻ em': 'external-children-group',
      'Trẻ em': 'external-children-group',
    };
    
    return servicePageMap[serviceName] || null;
  };

  const handleViewData = () => {
    const pageId = getPageIdFromService(service.name);
    if (pageId && onViewData) {
      onViewData(pageId);
    } else if (onViewData) {
      // Fallback to default behavior
      onViewData();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg text-slate-900">Chi tiết kết nối API</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Thông tin chung */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Thông tin chung</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Tên service</label>
                <p className="text-sm text-slate-900">{service.name}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Đơn vị quản lý</label>
                <p className="text-sm text-slate-900">{service.managingUnit}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Trạng thái</label>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  service.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {service.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {service.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                </span>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Phân loại dữ liệu</label>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  service.dataClassification === 'Nội ngành'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {service.dataClassification}
                </span>
              </div>
            </div>
          </div>

          {/* Thông tin kết nối */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Thông tin kết nối</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Base URL</label>
                <p className="text-sm text-slate-900 font-mono bg-slate-50 px-3 py-2 rounded border border-slate-200">
                  {service.baseUrl || 'https://api.example.com'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Method</label>
                  <p className="text-sm text-slate-900">{service.method || 'GET'}</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Content Type</label>
                  <p className="text-sm text-slate-900">{service.contentType || 'application/json'}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Authentication</label>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-slate-900 font-mono bg-slate-50 px-3 py-2 rounded border border-slate-200 flex-1">
                    {showClientSecret ? 'Bearer eyJhbGc...' : '••••••••••••'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowClientSecret(!showClientSecret)}
                    className="p-2 hover:bg-slate-100 rounded transition-colors"
                  >
                    {showClientSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin đơn vị cung cấp */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Thông tin đơn vị cung cấp</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Tên đơn vị</label>
                <p className="text-sm text-slate-900">{service.contactUnit || 'Cục Hộ tịch, quốc tịch, chứng thực'}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Email</label>
                <p className="text-sm text-slate-900">{service.contactEmail || 'contact@moj.gov.vn'}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Số điện thoại</label>
                <p className="text-sm text-slate-900">{service.contactPhone || '024 3733 9999'}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Người đầu mối kỹ thuật</label>
                <p className="text-sm text-slate-900">{service.technicalContact || 'Nguyễn Văn A - 0987654321'}</p>
              </div>
            </div>
          </div>

          {/* Cấu hình thu thập */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Cấu hình thu thập</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Chu kỳ thu thập</label>
                <p className="text-sm text-slate-900">{service.collectionCycle || 'Hàng ngày'}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Thời gian bắt đầu</label>
                <p className="text-sm text-slate-900">{service.startTime || '00:00'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          {onViewData && (
            <button
              onClick={handleViewData}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Database className="w-4 h-4" />
              Xem dữ liệu đã thu thập
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal Cập nhật phương thức
export function EditServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!isOpen || !service) return null;

  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [dataClassification, setDataClassification] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement edit service logic
    alert('Cập nhật phương thức thu thập thành công!');
    onClose();
  };

  const tabs = [
    { id: 'general' as TabType, label: 'Thông tin chung', icon: <FileText className="w-4 h-4" /> },
    { id: 'contact' as TabType, label: 'Thông tin đơn vị cung cấp', icon: <User className="w-4 h-4" /> },
    { id: 'connection' as TabType, label: 'Cấu hình kết nối', icon: <Plug className="w-4 h-4" /> },
    { id: 'collection' as TabType, label: 'Cấu hình thu thập', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg text-slate-900">Chỉnh sửa kết nối API</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="flex gap-1 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm transition-colors relative flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-4">
            {/* Tab 1: Thông tin chung */}
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    Tên service <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="VD: API dịch vụ dữ liệu quốc tịch"
                    defaultValue={service.name}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">
                      Tên đơn vị <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập tên đơn vị"
                      defaultValue={service.managingUnit}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">
                      Hệ thống <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập tên hệ thống"
                      defaultValue={service.system}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">
                      Nguồn thu thập <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={dataClassification}
                      onChange={(e) => setDataClassification(e.target.value)}
                      defaultValue={service.dataClassification === 'Nội ngành' ? 'noi-nganh' : 'ngoai-nganh'}
                    >
                      <option value="">Chọn phân loại</option>
                      <option value="noi-nganh">Hệ thống nội ngành</option>
                      <option value="ngoai-nganh">Ngoài ngành</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">
                      Mức độ bảo mật dữ liệu <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Chọn mức độ</option>
                      <option value="mo">Dữ liệu mở</option>
                      <option value="noi-bo">Dữ liệu nội bộ</option>
                      <option value="han-che">Dữ liệu hạn chế</option>
                      <option value="nhay-cam">Dữ liệu nhạy cảm</option>
                      <option value="bao-mat">Dữ liệu bảo mật</option>
                      <option value="tuyet-mat">Dữ liệu tuyệt mật</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Mô tả chi tiết về service"
                    defaultValue={service.description}
                  />
                </div>
              </div>
            )}

            {/* Tab 2: Thông tin đơn vị cung cấp */}
            {activeTab === 'contact' && (
              <ContactInfoSection isEdit={true} defaultValues={service} />
            )}

            {/* Tab 3: Cấu hình kết nối */}
            {activeTab === 'connection' && (
              <ConnectionConfigSection dataClassification={dataClassification} />
            )}

            {/* Tab 4: Cấu hình thu thập */}
            {activeTab === 'collection' && (
              <DataCollectionConfigSection />
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal Xóa dịch vụ
export function DeleteServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!isOpen || !service) return null;

  const handleDelete = () => {
    // TODO: Implement delete service logic
    alert(`Đã xóa dịch vụ: ${service.name}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg text-slate-900">Xác nhận xóa</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-slate-900 mb-2">
                Bạn có chắc chắn muốn xóa dịch vụ <strong>{service.name}</strong>?
              </p>
              <p className="text-sm text-slate-600">
                Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan đến dịch vụ này sẽ bị xóa vĩnh viễn.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal Cài đặt dịch vụ
export function SettingsServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!isOpen || !service) return null;

  const [autoSync, setAutoSync] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [logging, setLogging] = useState(true);

  const handleSave = () => {
    // TODO: Implement save settings logic
    alert('Đã lưu cài đặt!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg text-slate-900">Cài đặt dịch vụ</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3">
              Dịch vụ: {service.name}
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <div className="text-sm text-slate-900">Tự động đồng bộ</div>
                <div className="text-xs text-slate-500">Tự động thu thập dữ liệu theo lịch</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSync}
                  onChange={(e) => setAutoSync(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <div className="text-sm text-slate-900">Thông báo</div>
                <div className="text-xs text-slate-500">Nhận thông báo khi có lỗi hoặc cảnh báo</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <div className="text-sm text-slate-900">Ghi nhật ký</div>
                <div className="text-xs text-slate-500">Lưu lại lịch sử hoạt động chi tiết</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={logging}
                  onChange={(e) => setLogging(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}