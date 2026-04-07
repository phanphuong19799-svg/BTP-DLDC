import React, { ChangeEvent } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { MasterDataEntity, MasterDataAttribute, FieldDataType } from '../../categoryTypes';

interface AttributesTabProps {
  entities: MasterDataEntity[];
  attributes: MasterDataAttribute[];
  selectedEntityId: string;
  setSelectedEntityId: (id: string) => void;
  wizardMode?: boolean;
  wizardEntityId?: string | null;
  selectedAttributes: string[];
  onSelectAttribute: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
  onAddAttribute: () => void;
  onEditAttribute: (attr: MasterDataAttribute) => void;
  onDeleteAttribute: (id: string) => void;
  getDataTypeLabel: (type: FieldDataType) => string;
}

export function AttributesTab({
  entities,
  attributes,
  selectedEntityId,
  setSelectedEntityId,
  wizardMode = false,
  wizardEntityId,
  selectedAttributes,
  onSelectAttribute,
  onSelectAll,
  onAddAttribute,
  onEditAttribute,
  onDeleteAttribute,
  getDataTypeLabel
}: AttributesTabProps) {
  const currentEntityId = wizardMode ? wizardEntityId : selectedEntityId;
  const currentEntity = entities.find(e => e.id === currentEntityId);

  return (
    <div className="space-y-4">
      {/* Entity Selector (Only if not in wizard) */}
      {!wizardMode && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <label className="block text-sm text-black mb-2">
            Chọn thực thể dữ liệu chủ <span className="text-red-600">*</span>
          </label>
          <select
            title="Chọn thực thể"
            value={selectedEntityId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedEntityId(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          >
            {entities.map(entity => (
              <option key={entity.id} value={entity.id}>
                {entity.code} - {entity.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Summary and Add Button */}
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-black">Đang quản lý thuộc tính của: </span>
          <span className="text-black font-semibold">
            {currentEntity?.name || 'Chưa chọn thực thể'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onAddAttribute}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold shadow-md"
          >
            <Plus className="w-4 h-4" />
            Thêm thuộc tính
          </button>
        </div>
      </div>

      {/* Attributes Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="w-12 px-4 py-3">
                <input 
                  type="checkbox" 
                  onChange={(e: any) => onSelectAll(e.target.checked)} 
                  checked={attributes.length > 0 && selectedAttributes.length === attributes.length} 
                  className="rounded" 
                  title="Chọn tất cả"
                />
              </th>
              <th className="text-left px-4 py-3 text-[14px] font-normal text-black">Tên trường</th>
              <th className="text-left px-4 py-3 text-[14px] font-normal text-black">Tên hiển thị</th>
              <th className="text-left px-4 py-3 text-[14px] font-normal text-black">Kiểu dữ liệu</th>
              <th className="text-left px-4 py-3 text-[14px] font-normal text-black">Ràng buộc</th>
              <th className="text-left px-4 py-3 text-[14px] font-normal text-black">Trạng thái</th>
              <th className="text-right px-4 py-3 text-[14px] font-normal text-black">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {attributes.map((attr) => (
              <tr key={attr.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedAttributes.includes(attr.id)} 
                    onChange={() => onSelectAttribute(attr.id)} 
                    className="rounded" 
                    title={`Chọn ${attr.fieldName}`}
                  />
                </td>
                <td className="px-4 py-3 text-sm text-black font-mono">{attr.fieldName}</td>
                <td className="px-4 py-3 text-sm text-black">{attr.displayName}</td>
                <td className="px-4 py-3 text-sm text-black">{getDataTypeLabel(attr.dataType)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap">
                    {attr.required && <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-50 text-red-600 font-bold border border-red-100">REQ</span>}
                    {attr.unique && <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-50 text-purple-600 font-bold border border-purple-100">UNI</span>}
                    {attr.indexed && <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-blue-600 font-bold border border-blue-100">IDX</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                    attr.status === 'approved' ? 'bg-green-100 text-green-700' : 
                    attr.status === 'pending' ? 'bg-orange-100 text-orange-700' : 
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {attr.status === 'approved' ? 'Đã duyệt' : attr.status === 'pending' ? 'Chờ duyệt' : 'Bản nháp'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => onEditAttribute(attr)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Sửa"><Edit className="w-4 h-4"/></button>
                    <button onClick={() => onDeleteAttribute(attr.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa"><Trash2 className="w-4 h-4"/></button>
                  </div>
                </td>
              </tr>
            ))}
            {attributes.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-500 italic">
                  Chưa có thuộc tính nào được định nghĩa cho thực thể này.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
