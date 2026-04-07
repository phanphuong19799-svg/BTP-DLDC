import React, { ChangeEvent } from 'react';
import { X, FileText, Sliders } from 'lucide-react';
import { AttributesTab } from '../tabs/AttributesTab';
import { MasterDataEntity, MasterDataAttribute, DataType, ScopeType, FieldDataType } from '../../categoryTypes';

interface CategoryWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: number;
  setStep: (step: number) => void;
  entityId: string | null;
  formData: Partial<MasterDataEntity>;
  setFormData: (data: Partial<MasterDataEntity>) => void;
  onSaveStep1: (action: 'draft' | 'submit' | 'next') => void;
  // AttributesTab props
  entities: MasterDataEntity[];
  attributes: MasterDataAttribute[];
  selectedAttributes: string[];
  onSelectAttribute: (id: string) => void;
  onSelectAllAttributes: (checked: boolean) => void;
  onAddAttribute: () => void;
  onEditAttribute: (attr: MasterDataAttribute) => void;
  onDeleteAttribute: (id: string) => void;
  getDataTypeLabel: (type: FieldDataType) => string;
}

export function CategoryWizardModal({
  isOpen,
  onClose,
  step,
  setStep,
  entityId,
  formData,
  setFormData,
  onSaveStep1,
  entities,
  attributes,
  selectedAttributes,
  onSelectAttribute,
  onSelectAllAttributes,
  onAddAttribute,
  onEditAttribute,
  onDeleteAttribute,
  getDataTypeLabel
}: CategoryWizardModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Wizard Header */}
        <div className="flex flex-col border-b border-slate-200 bg-white shrink-0">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-[18px] font-bold text-slate-800">Cấu hình thông tin danh mục</h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors" title="Đóng">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex overflow-x-auto px-6 ">
            {[
              { step: 1, label: 'Thông tin chung', icon: FileText },
              { step: 2, label: 'Thiết lập thuộc tính', icon: Sliders }
            ].map((item) => {
              const isActive = step === item.step;
              const isLocked = !entityId && item.step > 1;
              return (
                <button
                  key={item.step}
                  disabled={isLocked}
                  onClick={() => setStep(item.step)}
                  className={`flex items-center gap-2 py-4 px-6 border-b-2 font-medium text-[15px] whitespace-nowrap transition-colors ${isActive ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-blue-600'} ${isLocked ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Wizard Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50/30 p-6 custom-scrollbar">
          {step === 1 && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-4xl mx-auto">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 text-[16px]">Thông tin cơ bản danh mục</h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-[14px] font-semibold text-slate-700 mb-2">Tên danh sách <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="VD: Danh mục quốc gia, Bộ dữ liệu cán bộ..."
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-[14px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[14px] font-semibold text-slate-700 mb-2">Loại dữ liệu <span className="text-red-500">*</span></label>
                      <select
                        title="Loại dữ liệu"
                        value={formData.dataType || 'standard'}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, dataType: e.target.value as DataType })}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-[14px]"
                      >
                        <option value="standard">Dữ liệu chuẩn</option>
                        <option value="reference">Dữ liệu tham chiếu</option>
                        <option value="transactional">Dữ liệu giao dịch</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[14px] font-semibold text-slate-700 mb-2">Cơ quan quản lý <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={formData.managingAgency || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, managingAgency: e.target.value })}
                        placeholder="VD: Bộ Tư Pháp"
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-[14px]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[14px] font-semibold text-slate-700 mb-2">Phạm vi <span className="text-red-500">*</span></label>
                      <select
                        title="Phạm vi"
                        value={formData.scope || 'national'}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, scope: e.target.value as ScopeType })}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-[14px]"
                      >
                        <option value="national">Cấp quốc gia</option>
                        <option value="ministry">Cấp bộ</option>
                        <option value="provincial">Cấp tỉnh</option>
                        <option value="internal">Nội bộ</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[14px] font-semibold text-slate-700 mb-2">Dữ liệu từ nguồn nào?</label>
                      <select title="Nguồn dữ liệu" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-[14px]">
                        <option>Tự tạo/Nhập tay</option>
                        <option>Lấy từ Kho DLDC</option>
                        <option>Lấy từ hệ thống khác (API/Đồng bộ)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-slate-700 mb-2">Mô tả chi tiết</label>
                  <textarea
                    rows={4}
                    value={formData.description || ''}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Nhập mô tả về mục đích và nội dung danh mục..."
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-[14px]"
                  />
                </div>
                <div className="pt-6 border-t border-slate-100 flex justify-center gap-3">
                  <button onClick={onClose} className="px-8 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-[14px]">Hủy</button>
                  <button onClick={() => onSaveStep1('draft')} className="px-8 py-2.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium text-[14px]">Lưu nháp</button>
                  <button onClick={() => onSaveStep1('submit')} className="px-8 py-2.5 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200 font-medium text-[14px]">Lưu và Trình duyệt</button>
                  <button onClick={() => onSaveStep1('next')} className="px-10 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold shadow-lg shadow-blue-200 text-[14px]">Lưu và Tiếp tục</button>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Thiết lập danh sách thuộc tính</h4>
                    <p className="text-sm text-slate-500">Định nghĩa cấu trúc chi tiết cho các trường dữ liệu.</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-6">
                <AttributesTab
                  wizardMode={true}
                  wizardEntityId={entityId}
                  entities={entities}
                  attributes={attributes}
                  selectedEntityId={entityId || ''}
                  setSelectedEntityId={() => { }}
                  selectedAttributes={selectedAttributes}
                  onSelectAttribute={onSelectAttribute}
                  onSelectAll={onSelectAllAttributes}
                  onAddAttribute={onAddAttribute}
                  onEditAttribute={onEditAttribute}
                  onDeleteAttribute={onDeleteAttribute}
                  getDataTypeLabel={getDataTypeLabel}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
