import React, { ChangeEvent } from 'react';
import { X, Send } from 'lucide-react';
import { MasterDataAttribute, FieldDataType } from '../../categoryTypes';

interface AttributeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingAttribute: MasterDataAttribute | null;
  formData: Partial<MasterDataAttribute>;
  setFormData: (data: Partial<MasterDataAttribute>) => void;
  onSave: () => void;
  onSaveAndSubmit: (data: { id: string; code: string; name: string; type: 'attribute' | 'category' }) => void;
}

export function AttributeFormModal({
  isOpen,
  onClose,
  editingAttribute,
  formData,
  setFormData,
  onSave,
  onSaveAndSubmit
}: AttributeFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" style={{ zIndex: 10005 }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white shadow-sm shrink-0">
          <h3 className="text-[18px] font-bold text-slate-800">
            {editingAttribute ? 'Cập nhật thuộc tính' : 'Thêm mới thuộc tính'}
          </h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors" title="Đóng">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar">
          <div>
            <label className="block text-[14px] font-semibold text-slate-700 mb-1.5">Tên trường <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={formData.fieldName || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, fieldName: e.target.value })}
              placeholder="VD: citizen_id"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-[14px] font-mono"
            />
            <p className="text-[12px] text-slate-500 mt-1">Tên trường trong database (không dấu, chữ thường)</p>
          </div>

          <div>
            <label className="block text-[14px] font-semibold text-slate-700 mb-1.5">Tên hiển thị <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={formData.displayName || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, displayName: e.target.value })}
              placeholder="VD: Số CCCD"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-[14px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-semibold text-slate-700 mb-1.5">Kiểu dữ liệu <span className="text-red-500">*</span></label>
              <select
                title="Kiểu dữ liệu"
                value={formData.dataType || 'string'}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, dataType: e.target.value as FieldDataType })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-[14px] h-[42px]"
              >
                <option value="string">Chuỗi (String)</option>
                <option value="number">Số (Number)</option>
                <option value="date">Ngày (Date)</option>
                <option value="datetime">Ngày giờ (DateTime)</option>
                <option value="boolean">Logic (Boolean)</option>
                <option value="text">Văn bản dài (Text)</option>
                <option value="email">Email</option>
                <option value="phone">Số điện thoại</option>
                <option value="url">URL</option>
              </select>
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-slate-700 mb-1.5">Độ dài</label>
              <input
                type="number"
                value={formData.length || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, length: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="VD: 255"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-[14px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-semibold text-slate-700 mb-2">Ràng buộc</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={formData.required || false} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, required: e.target.checked })} className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500" />
                <span className="text-[14px] text-slate-600 group-hover:text-slate-900 transition-colors">Bắt buộc (Required)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={formData.unique || false} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, unique: e.target.checked })} className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500" />
                <span className="text-[14px] text-slate-600 group-hover:text-slate-900 transition-colors">Duy nhất (Unique)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={formData.indexed || false} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, indexed: e.target.checked })} className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500" />
                <span className="text-[14px] text-slate-600 group-hover:text-slate-900 transition-colors">Đánh index (Indexed)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-semibold text-slate-700 mb-1.5">Giá trị mặc định</label>
            <input
              type="text"
              value={formData.defaultValue || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, defaultValue: e.target.value })}
              placeholder="Để trống nếu không có"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-[14px]"
            />
          </div>

          <div>
            <label className="block text-[14px] font-semibold text-slate-700 mb-1.5">Quy tắc xác thực</label>
            <input
              type="text"
              value={formData.validationRules || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, validationRules: e.target.value })}
              placeholder="VD: regex:^[0-9]{12}$ hoặc enum:Nam,Nữ,Khác"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-[14px]"
            />
            <p className="text-[11px] text-slate-400 mt-1">Sử dụng format: regex:pattern hoặc enum:value1,value2,value3</p>
          </div>

          <div>
            <label className="block text-[14px] font-semibold text-slate-700 mb-1.5">Mô tả</label>
            <textarea
              rows={2}
              value={formData.description || ''}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Mô tả chi tiết về thuộc tính này..."
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-[14px]"
            />
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
           <button onClick={onClose} className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-[14px]">Hủy</button>
           <button onClick={onSave} className="px-6 py-2 rounded-lg bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 font-medium text-[14px]">Lưu</button>
           <button 
             onClick={() => {
                onSave();
                onSaveAndSubmit({
                   id: formData.id || 'new',
                   code: formData.fieldName || 'ATTR-001',
                   name: formData.displayName || 'Thuộc tính mới',
                   type: 'attribute'
                });
             }}
             className="px-6 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700 font-bold flex items-center gap-2 shadow-lg shadow-orange-100 text-[14px]"
           >
              <Send className="w-4 h-4"/>
              Lưu và Trình duyệt
           </button>
        </div>
      </div>
    </div>
  );
}
