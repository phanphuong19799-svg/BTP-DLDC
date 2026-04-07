import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Save, Network, ArrowRight, Key, Table } from 'lucide-react';
import { MasterDataEntity, EntityRelationship, RelationshipType, RelationshipStatus } from '../../categoryTypes';

interface RelationshipsTabProps {
  entities: MasterDataEntity[];
  relationships: EntityRelationship[];
  setRelationships: (relationships: EntityRelationship[]) => void;
}

const relationTypeLabels: Record<RelationshipType, string> = {
  '1-n': '1 - n (Một - Nhiều)',
  'n-1': 'n - 1 (Nhiều - Một)',
  'n-n': 'n - n (Nhiều - Nhiều)',
  '1-1': '1 - 1 (Một - Một)'
};

const relationTypeIcons: Record<RelationshipType, string> = {
  '1-n': '1 → n',
  'n-1': 'n ← 1',
  'n-n': 'n ↔ n',
  '1-1': '1 ↔ 1'
};

export function RelationshipsTab({
  entities,
  relationships,
  setRelationships
}: RelationshipsTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingRelationship, setEditingRelationship] = useState<EntityRelationship | null>(null);

  const [formData, setFormData] = useState<Partial<EntityRelationship>>({
    sourceEntityId: '',
    targetEntityId: '',
    relationshipType: '1-n',
    sourceKey: '',
    targetKey: '',
    mappingTable: '',
    status: 'active'
  });

  const handleSubmit = () => {
    if (!formData.sourceEntityId || !formData.targetEntityId) {
      alert('Vui lòng chọn đầy đủ thực thể nguồn và thực thể đích');
      return;
    }

    if (formData.sourceEntityId === formData.targetEntityId) {
      alert('Thực thể nguồn và thực thể đích phải khác nhau');
      return;
    }

    // Validate based on relation type
    if (formData.relationshipType === 'n-n') {
      if (!formData.mappingTable || !formData.sourceKey || !formData.targetKey) {
        alert('Quan hệ n-n cần có đầy đủ: Bảng liên kết, Khóa nguồn, Khóa đích');
        return;
      }
    } else {
      if (!formData.sourceKey || !formData.targetKey) {
        alert('Quan hệ 1-n, n-1 hoặc 1-1 cần có đầy đủ: Khóa ngoại, Khóa tham chiếu');
        return;
      }
    }

    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    const sourceEntity = entities.find(e => e.id === formData.sourceEntityId);
    const targetEntity = entities.find(e => e.id === formData.targetEntityId);

    if (editingRelationship) {
      const updatedRelationships = relationships.map(rel =>
        rel.id === editingRelationship.id
          ? {
              ...rel,
              ...formData,
              sourceEntityName: sourceEntity?.name || '',
              targetEntityName: targetEntity?.name || ''
            } as EntityRelationship
          : rel
      );
      setRelationships(updatedRelationships);
    } else {
      const newRelationship: EntityRelationship = {
        id: `rel-${Date.now()}`,
        sourceEntityId: formData.sourceEntityId!,
        sourceEntityName: sourceEntity?.name || '',
        targetEntityId: formData.targetEntityId!,
        targetEntityName: targetEntity?.name || '',
        relationshipType: formData.relationshipType!,
        sourceKey: formData.sourceKey,
        targetKey: formData.targetKey,
        mappingTable: formData.mappingTable,
        status: formData.status as RelationshipStatus,
        createdDate: dateStr,
        createdBy: 'Admin'
      };
      setRelationships([...relationships, newRelationship]);
    }

    handleCloseForm();
  };

  const handleEdit = (relationship: EntityRelationship) => {
    setEditingRelationship(relationship);
    setFormData(relationship);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa quan hệ này?')) {
      setRelationships(relationships.filter(rel => rel.id !== id));
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingRelationship(null);
    setFormData({
      sourceEntityId: '',
      targetEntityId: '',
      relationshipType: '1-n',
      sourceKey: '',
      targetKey: '',
      mappingTable: '',
      status: 'active'
    });
  };

  const getStatusBadge = (status: RelationshipStatus) => {
    return status === 'active'
      ? { label: 'Hoạt động', className: 'bg-green-100 text-green-700' }
      : { label: 'Không hoạt động', className: 'bg-slate-100 text-black' };
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black font-bold text-lg">Cấu hình quan hệ thực thể</h2>
          <p className="text-sm text-black mt-1">
            Định nghĩa liên kết (1-n, n-n) giữa các danh mục dữ liệu chủ
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm font-bold active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Thêm quan hệ mới
        </button>
      </div>

      {/* Relationships Table */}
      <div className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f8fafc] text-black border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-4 text-[14px] font-normal">Thực thể nguồn</th>
                <th className="text-center px-6 py-4 text-[14px] font-normal">Loại quan hệ</th>
                <th className="text-left px-6 py-4 text-[14px] font-normal">Thực thể đích</th>
                <th className="text-left px-6 py-4 text-[14px] font-normal">Điều kiện liên kết</th>
                <th className="text-left px-6 py-4 text-[14px] font-normal">Trạng thái</th>
                <th className="text-right px-6 py-4 text-[14px] font-normal">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {relationships.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <Network className="w-12 h-12 text-blue-200 mx-auto mb-3" />
                    <p className="text-slate-500 italic">
                      Chưa có quan hệ nào được thiết lập. Vui lòng thêm mới để bắt đầu.
                    </p>
                  </td>
                </tr>
              ) : (
                relationships.map((relationship) => {
                  const statusBadge = getStatusBadge(relationship.status);
                  return (
                    <tr key={relationship.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-black">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {relationship.sourceEntityName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center gap-1">
                          <span className="inline-flex items-center px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded">
                            {relationTypeIcons[relationship.relationshipType]}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-black">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          {relationship.targetEntityName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {relationship.relationshipType === 'n-n' ? (
                          <div className="text-xs">
                            <div className="flex items-center gap-1 text-purple-600 font-bold mb-1">
                              <Table className="w-3 h-3" />
                              <span>Bảng: <code className="bg-purple-100 px-1 py-0.5 rounded">{relationship.mappingTable}</code></span>
                            </div>
                            <div className="text-slate-500">
                              {relationship.sourceKey} ↔ {relationship.targetKey}
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs">
                            <div className="flex items-center gap-1 text-blue-600 font-bold mb-1">
                              <Key className="w-3 h-3" />
                              <span>FK: <code className="bg-blue-100 px-1 py-0.5 rounded">{relationship.sourceKey}</code></span>
                            </div>
                            <div className="text-slate-500">
                              → {relationship.targetKey}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-[11px] font-bold ${statusBadge.className}`}>
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(relationship)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(relationship.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white shadow-sm shrink-0">
              <h3 className="text-[18px] font-bold text-black">
                {editingRelationship ? 'Chỉnh sửa quan hệ thực thể' : 'Thêm quan hệ thực thể mới'}
              </h3>
              <button title="Đóng" onClick={handleCloseForm} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
              {/* Entity Selection */}
              <div className="space-y-4">
                <h4 className="text-[15px] font-bold text-black border-b border-slate-100 pb-2">1. Chọn thực thể liên kết</h4>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[14px] font-semibold text-black mb-2">
                      Thực thể nguồn <span className="text-red-600">*</span>
                    </label>
                    <select
                      title="Chọn thực thể nguồn"
                      value={formData.sourceEntityId}
                      onChange={(e: any) => setFormData({ ...formData, sourceEntityId: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]"
                    >
                      <option value="">-- Chọn danh mục nguồn --</option>
                      {entities.map(entity => (
                        <option key={entity.id} value={entity.id}>
                          {entity.code} - {entity.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[14px] font-semibold text-black mb-2">
                      Thực thể đích <span className="text-red-600">*</span>
                    </label>
                    <select
                      title="Chọn thực thể đích"
                      value={formData.targetEntityId}
                      onChange={(e: any) => setFormData({ ...formData, targetEntityId: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]"
                    >
                      <option value="">-- Chọn danh mục đích --</option>
                      {entities
                        .filter(entity => entity.id !== formData.sourceEntityId)
                        .map(entity => (
                          <option key={entity.id} value={entity.id}>
                            {entity.code} - {entity.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Visual Representation */}
                {formData.sourceEntityId && formData.targetEntityId && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-4 flex items-center justify-center gap-6">
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">A</div>
                      <span className="text-[14px] font-bold text-black text-center">
                        {entities.find(e => e.id === formData.sourceEntityId)?.name}
                      </span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-slate-400 shrink-0" />
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">B</div>
                      <span className="text-[14px] font-bold text-black text-center">
                        {entities.find(e => e.id === formData.targetEntityId)?.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Relation Type */}
              <div className="space-y-4 pt-2">
                <h4 className="text-[15px] font-bold text-black border-b border-slate-100 pb-2">2. Loại quan hệ</h4>
                
                <div>
                  <label className="block text-[14px] font-semibold text-black mb-2">
                    Chọn loại quan hệ <span className="text-red-600">*</span>
                  </label>
                  <select
                    title="Chọn loại quan hệ"
                    value={formData.relationshipType}
                    onChange={(e: any) => setFormData({ ...formData, relationshipType: e.target.value as RelationshipType })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]"
                  >
                    {Object.entries(relationTypeLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Link Conditions */}
              <div className="space-y-4 pt-2">
                <h4 className="text-[15px] font-bold text-black border-b border-slate-100 pb-2">3. Điều kiện liên kết</h4>

                {formData.relationshipType === 'n-n' ? (
                  // Many-to-Many: Mapping Table
                  <div className="bg-purple-50/50 border border-purple-200 rounded-xl p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <Table className="w-5 h-5 text-purple-600" />
                      <span className="text-[14px] font-bold text-purple-900">Bảng liên kết (Mapping Table)</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[13px] font-semibold text-black mb-1.5">
                          Tên bảng liên kết <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.mappingTable || ''}
                          onChange={(e: any) => setFormData({ ...formData, mappingTable: e.target.value })}
                          placeholder="VD: citizen_organization"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[13px] font-semibold text-black mb-1.5">
                            Khóa nguồn <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.sourceKey || ''}
                            onChange={(e: any) => setFormData({ ...formData, sourceKey: e.target.value })}
                            placeholder="VD: citizen_id"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[13px] font-semibold text-black mb-1.5">
                            Khóa đích <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.targetKey || ''}
                            onChange={(e: any) => setFormData({ ...formData, targetKey: e.target.value })}
                            placeholder="VD: organization_id"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // One-to-Many or One-to-One: Foreign Key
                  <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <Key className="w-5 h-5 text-blue-600" />
                      <span className="text-[14px] font-bold text-blue-900">Khóa ngoại (Foreign Key)</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[13px] font-semibold text-black mb-1.5">
                          Khóa nguồn (Source Key) <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.sourceKey || ''}
                          onChange={(e: any) => setFormData({ ...formData, sourceKey: e.target.value })}
                          placeholder="VD: issue_authority_id"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                        />
                        <p className="text-[11px] text-slate-500 mt-1">Trường nằm trong Danh mục Nguồn</p>
                      </div>

                      <div>
                        <label className="block text-[13px] font-semibold text-black mb-1.5">
                          Khóa đích (Target Key) <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.targetKey || ''}
                          onChange={(e: any) => setFormData({ ...formData, targetKey: e.target.value })}
                          placeholder="VD: authority_id"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                        />
                        <p className="text-[11px] text-slate-500 mt-1">Trường nằm trong Danh mục Đích</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100 bg-slate-50 shrink-0">
              <button
                onClick={handleCloseForm}
                className="px-6 py-2.5 text-black bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors font-semibold text-[14px]"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold shadow-lg shadow-blue-200 text-[14px]"
              >
                <Save className="w-4 h-4" />
                {editingRelationship ? 'Cập nhật' : 'Lưu quan hệ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

