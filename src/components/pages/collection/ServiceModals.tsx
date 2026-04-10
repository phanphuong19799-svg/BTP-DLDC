import { useState, type FormEvent } from 'react';
import { 
  X, AlertCircle, CheckCircle, Upload, Eye, EyeOff, 
  Database, FileText, User, Plug, Settings, Plus,
  Calendar, Clock
} from 'lucide-react';
import { DataCollectionConfigSection } from './DataCollectionConfigSection';
import { ConnectionConfigSection } from './ConnectionConfigSection';
import { ContactInfoSection } from './ContactInfoSection';
import { DataDetailModal } from '../../DataDetailModal';
import { ConfirmModal } from '../../common/ConfirmModal';
import { BaseModal } from '../../common/BaseModal';

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg text-slate-900 font-medium">Thông tin kết nối</h2>
          <button onClick={onClose} title="Đóng" className="p-1 hover:bg-slate-100 rounded transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="border-b border-slate-200 bg-slate-50">
          <div className="flex gap-1 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm transition-colors relative flex items-center gap-2 ${
                  activeTab === tab.id ? 'text-blue-600 bg-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-4">
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="add-name" className="block text-sm text-slate-600 mb-1">Tên service <span className="text-red-500">*</span></label>
                  <input id="add-name" title="Tên service" type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="VD: API dịch vụ dữ liệu quốc tịch" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="add-unit" className="block text-sm text-slate-600 mb-1">Tên đơn vị <span className="text-red-500">*</span></label>
                    <input id="add-unit" title="Tên đơn vị" type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập tên đơn vị" />
                  </div>
                  <div>
                    <label htmlFor="add-system" className="block text-sm text-slate-600 mb-1">Hệ thống <span className="text-red-500">*</span></label>
                    <input id="add-system" title="Hệ thống" type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập tên hệ thống" />
                  </div>
                </div>
                <div>
                  <label htmlFor="desc" className="block text-sm text-slate-600 mb-1">Mô tả</label>
                  <textarea id="desc" title="Mô tả" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Mô tả chi tiết" />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Đính kèm văn bản</label>
                  <div className="border border-slate-300 rounded-lg p-3 text-center py-6">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Click để chọn file PDF, DOCX</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'contact' && <ContactInfoSection />}
            {activeTab === 'connection' && <ConnectionConfigSection dataClassification={dataClassification} />}
            {activeTab === 'collection' && <DataCollectionConfigSection />}
          </div>
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Hủy</button>
            <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">Lưu lại</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal Chi tiết kết nối API
export function ViewServiceModal({ isOpen, onClose, service, onViewData }: ServiceModalProps) {
  const [showClientSecret, setShowClientSecret] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  
  if (!isOpen || !service) return null;

  const handleViewData = () => {
    if (onViewData) onViewData();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg text-slate-900 font-medium">Chi tiết kết nối API</h2>
          <button onClick={onClose} title="Đóng" className="p-1 hover:bg-slate-100 rounded transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Thông tin chung</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm text-slate-500 mb-1">Tên service</label>
                <div className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-100">
                  <p className="text-sm text-slate-900 font-medium">{service.name}</p>
                  <button
                    onClick={() => setShowDocModal(true)}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Xem văn bản đính kèm
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Đơn vị quản lý</label>
                <p className="text-sm text-slate-900">{service.managingUnit}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Hệ thống</label>
                <p className="text-sm text-slate-900">{service.system || 'Hệ thống quản lý DLDC'}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Trạng thái</label>
                <span className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Hoạt động
                </span>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Mức độ bảo mật</label>
                <span className="inline-flex px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px]">Nội bộ</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Thông tin kết nối</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Base URL</label>
                <p className="text-xs font-mono bg-slate-50 p-2 rounded border border-slate-100 text-blue-700">{service.baseUrl || 'https://api.moj.gov.vn'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Method</label>
                  <span className="px-1.5 py-0.5 bg-blue-600 text-white rounded text-[10px] font-bold">GET</span>
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Authentication</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 font-mono">••••••••••••••••</span>
                    <button onClick={() => setShowClientSecret(!showClientSecret)} className="p-1 hover:bg-slate-100 rounded" title={showClientSecret ? "Ẩn mật khẩu" : "Hiện mật khẩu"}>
                      <Eye className="w-3 h-3 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          {onViewData && (
            <button onClick={handleViewData} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Database className="w-4 h-4" /> Xem dữ liệu
            </button>
          )}
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Đóng</button>
        </div>
      </div>

      <DataDetailModal
        isOpen={showDocModal}
        onClose={() => setShowDocModal(false)}
        title={`Văn bản: ${service.name}`}
        totalRecords={service.recordsReceived || 0}
        newRecords={service.recordsNew || 0}
        updatedRecords={service.recordsUpdated || 0}
        errorRecords={service.validationDetails?.invalidRecords || 0}
      />
    </div>
  );
}

// Cấu phần khác được giữ nguyên cấu trúc
export function EditServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!isOpen || !service) return null;

  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [dataClassification, setDataClassification] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg text-slate-900 font-medium">Chỉnh sửa kết nối API - {service.name}</h2>
          <button onClick={onClose} title="Đóng" className="p-1 hover:bg-slate-100 rounded transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="border-b border-slate-200 bg-slate-50">
          <div className="flex gap-1 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm transition-colors relative flex items-center gap-2 ${
                  activeTab === tab.id ? 'text-blue-600 bg-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-4">
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-name" className="block text-sm text-slate-600 mb-1">Tên service <span className="text-red-500">*</span></label>
                  <input id="edit-name" title="Tên service" type="text" defaultValue={service.name} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="edit-unit" className="block text-sm text-slate-600 mb-1">Tên đơn vị <span className="text-red-500">*</span></label>
                    <input id="edit-unit" title="Tên đơn vị" type="text" defaultValue={service.managingUnit} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="edit-system" className="block text-sm text-slate-600 mb-1">Hệ thống <span className="text-red-500">*</span></label>
                    <input id="edit-system" title="Hệ thống" type="text" defaultValue={service.system || 'Hệ thống DLDC'} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label htmlFor="edit-desc" className="block text-sm text-slate-600 mb-1">Mô tả</label>
                  <textarea id="edit-desc" title="Mô tả" defaultValue={service.description} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} />
                </div>
              </div>
            )}
            {activeTab === 'contact' && <ContactInfoSection />}
            {activeTab === 'connection' && <ConnectionConfigSection dataClassification={dataClassification} />}
            {activeTab === 'collection' && <DataCollectionConfigSection />}
          </div>
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Hủy</button>
            <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">Cập nhật nội dung</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function DeleteServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!isOpen || !service) return null;
  return (
    <ConfirmModal 
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {
        alert('Đã xóa dịch vụ thành công!');
      }}
      title="Xác nhận xóa thiết lập"
      subtitle="Hành động này không thể hoàn tác"
      message={
        <>Bạn có chắc chắn muốn xóa dịch vụ <strong>{service.name}</strong> không?</>
      }
      confirmText="Xóa dịch vụ"
      type="delete"
    />
  );
}

export function SettingsServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!isOpen || !service) return null;
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Cài đặt hệ thống dịch vụ"
      subtitle={`Cấu hình nâng cao cho: ${service.name}`}
      maxWidth="max-w-md"
      footer={
        <div className="flex justify-end gap-3 w-full">
           <button onClick={onClose} className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg text-sm">Đóng</button>
           <button onClick={() => { alert('Lưu cài đặt thành công'); onClose(); }} className="px-4 py-2 bg-slate-900 text-white flex items-center gap-2 rounded-lg text-sm">
             <CheckCircle className="w-4 h-4"/> 
             Lưu cài đặt
           </button>
        </div>
      }
    >
      <div className="space-y-4 pt-2">
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="mt-0.5">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" defaultChecked />
            </div>
            <div>
              <span className="text-sm font-medium text-slate-900">Tự động khởi động lại</span>
              <p className="text-xs text-slate-500 mt-0.5">Tự động thực hiện lại tiến trình thu thập nếu gặp lỗi Network</p>
            </div>
          </label>
        </div>
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="mt-0.5">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" defaultChecked />
            </div>
            <div>
              <span className="text-sm font-medium text-slate-900">Ghi Log chi tiết (Debug Mode)</span>
              <p className="text-xs text-slate-500 mt-0.5">Lưu trữ toàn bộ payload request/response để phục vụ kiểm tra lỗi</p>
            </div>
          </label>
        </div>
        <div className="pt-3 border-t border-slate-100">
          <label className="block text-sm font-medium text-slate-700 mb-1">Cảnh báo khi số bản ghi lỗi vượt quá (%)</label>
          <input type="number" defaultValue="10" title="Tỉ lệ lỗi (%)" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50" />
        </div>
      </div>
    </BaseModal>
  );
}