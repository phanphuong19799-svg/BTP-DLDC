import React, { useState, useEffect, ChangeEvent } from 'react';
import { 
  Settings, Sliders, Link2, CheckSquare, Clock 
} from 'lucide-react';

// Types & Constants
import { 
  MasterDataEntity, MasterDataAttribute, EntityRelationship, ApprovalRequest,
  TabType, LifecycleStatus, DataType, ScopeType, DataSourceType, FieldDataType, ApprovalType, ApprovalStatus 
} from './categoryTypes';
import { 
  defaultEntities, dataTypeLabels, lifecycleLabels, approvalTypeLabels, approvalStatusLabels, approvers 
} from './categoryConstants';

// Components - Tabs
import { SetupTab } from './components/tabs/SetupTab';
import { AttributesTab } from './components/tabs/AttributesTab';
import { RelationshipsTab } from './components/tabs/RelationshipsTab';
import { ApprovalTab } from './components/tabs/ApprovalTab';
import { VersionHistoryTab } from './components/tabs/VersionHistoryTab';

// Components - Modals
import { CategoryWizardModal } from './components/modals/CategoryWizardModal';
import { AttributeFormModal } from './components/modals/AttributeFormModal';
import { ApprovalRequestModal } from './components/modals/ApprovalRequestModal';
import { DeleteConfirmModal } from './components/modals/DeleteConfirmModal';
import { PublishModal } from './components/modals/PublishModal';
import { UnpublishModal } from './components/modals/UnpublishModal';
import { RestoreVersionModal } from './components/modals/RestoreVersionModal';
import { ReviewApprovalModal } from './components/modals/ReviewApprovalModal';

export const CategorySetupPage = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('setup');
  const [userRole] = useState<'leader' | 'staff'>('leader');

  // Entities & Attributes State
  const [entities, setEntities] = useState<MasterDataEntity[]>(defaultEntities);
  const [attributes, setAttributes] = useState<MasterDataAttribute[]>([
    { id: 'a1', fieldName: 'citizen_id', displayName: 'Số CCCD', dataType: 'string', required: true, unique: true, indexed: true, length: 12, description: 'Số căn cước công dân 12 số', version: 1, status: 'approved', createdDate: '01/01/2024' },
    { id: 'a2', fieldName: 'full_name', displayName: 'Họ và tên', dataType: 'string', required: true, unique: false, indexed: true, length: 100, description: 'Họ và tên đầy đủ', version: 1, status: 'approved', createdDate: '01/01/2024' },
    { id: 'a3', fieldName: 'date_of_birth', displayName: 'Ngày sinh', dataType: 'date', required: true, unique: false, indexed: false, description: 'Ngày tháng năm sinh', version: 1, status: 'approved', createdDate: '01/01/2024' },
    { id: 'a4', fieldName: 'gender', displayName: 'Giới tính', dataType: 'string', required: true, unique: false, indexed: false, length: 10, description: 'Nam/Nữ/Khác', version: 1, status: 'approved', createdDate: '01/01/2024' },
    { id: 'a5', fieldName: 'address', displayName: 'Địa chỉ thường trú', dataType: 'string', required: false, unique: false, indexed: false, length: 500, description: 'Địa chỉ thường trú theo hộ khẩu', version: 1, status: 'approved', createdDate: '01/01/2024' },
  ]);
  const [relationships, setRelationships] = useState<EntityRelationship[]>([
    { id: 'r1', sourceEntityId: '1', sourceEntityName: 'Bộ dữ liệu chủ Công dân', targetEntityId: '4', targetEntityName: 'Bộ dữ liệu chủ Đơn vị hành chính', relationshipType: 'n-1', sourceKey: 'province_id', targetKey: 'id', status: 'active', createdDate: '01/01/2024', createdBy: 'Admin' },
    { id: 'r2', sourceEntityId: '2', sourceEntityName: 'Bộ dữ liệu chủ Tổ chức', targetEntityId: '4', targetEntityName: 'Bộ dữ liệu chủ Đơn vị hành chính', relationshipType: 'n-1', sourceKey: 'province_id', targetKey: 'id', status: 'active', createdDate: '15/01/2024', createdBy: 'Admin' },
  ]);
  const [selectedEntityId, setSelectedEntityId] = useState<string>('1');

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<LifecycleStatus | 'all'>('all');

  // Form & Wizard State
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardEntityId, setWizardEntityId] = useState<string | null>(null);
  
  const [showForm, setShowForm] = useState(false);
  const [editingEntity, setEditingEntity] = useState<MasterDataEntity | null>(null);
  const [formData, setFormData] = useState<Partial<MasterDataEntity>>({
    name: '',
    dataType: 'standard',
    managingAgency: '',
    scope: 'national',
    description: '',
    lifecycleStatus: 'draft'
  });

  // Attribute Modal State
  const [showAttributeModal, setShowAttributeModal] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<MasterDataAttribute | null>(null);
  const [attributeFormData, setAttributeFormData] = useState<Partial<MasterDataAttribute>>({});
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

  // Approval State
  const [approvalTab, setApprovalTab] = useState<ApprovalType>('category');
  const [requests, setRequests] = useState<ApprovalRequest[]>([
    { id: '1', type: 'category', entityId: '3', entityCode: 'MD-DOC-001', entityName: 'Bộ dữ liệu chủ Văn bản pháp luật', requestedBy: 'Lê Văn C', requestedDate: '01/04/2024', status: 'pending', comments: 'Đề nghị phê duyệt danh mục mới' },
    { id: '2', type: 'structure', entityId: '3', entityCode: 'MD-DOC-001', entityName: 'Bộ dữ liệu chủ Văn bản pháp luật', requestedBy: 'Lê Văn C', requestedDate: '02/04/2024', status: 'pending', comments: 'Phê duyệt cấu trúc dữ liệu bổ sung' }
  ]);
  const [statusFilter, setStatusFilter] = useState<ApprovalStatus | 'all'>('all');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [pendingApprovalData, setPendingApprovalData] = useState<{id:string, code:string, name:string, type:'attribute' | 'category'} | null>(null);
  const [approvalRequestForm, setApprovalRequestForm] = useState({ reviewer: '', note: '' });
  
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<ApprovalRequest[]>([]);

  // Confirmation Modals State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<MasterDataEntity | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [entityToPublish, setEntityToPublish] = useState<MasterDataEntity | null>(null);
  const [publishNote, setPublishNote] = useState('');
  const [publishedEntities, setPublishedEntities] = useState<string[]>(['1', '2', '3', '4']);
  const [showUnpublishModal, setShowUnpublishModal] = useState(false);
  const [unpublishNote, setUnpublishNote] = useState('');
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [versionToRestore, setVersionToRestore] = useState<any>(null);
  const [restoreNote, setRestoreNote] = useState('');
  const [restoreApprover, setRestoreApprover] = useState('');

  // --------------------------------------------------------------------------------
  // Handlers - Entities
  // --------------------------------------------------------------------------------
  const handleEdit = (entity: MasterDataEntity) => {
    setEditingEntity(entity);
    setFormData(entity);
    setShowForm(true);
    // For simplicity in this demo, also show wizard step 1 if double clicked
  };

  const handleDelete = (id: string) => {
    const entity = entities.find(e => e.id === id);
    if (entity) {
      setEntityToDelete(entity);
      setShowDeleteModal(true);
    }
  };

  const confirmDelete = () => {
    setEntities(entities.filter(e => e.id !== entityToDelete?.id));
    setShowDeleteModal(false);
    setEntityToDelete(null);
  };

  const handleSaveStep1 = (action: 'draft' | 'submit' | 'next') => {
    if (!formData.name) {
      alert('Vui lòng nhập tên danh mục!');
      return;
    }

    const saveEntity = () => {
      let savedId = '';
      if (editingEntity) {
        const updated = entities.map(e => e.id === editingEntity.id ? { ...e, ...formData } : e);
        setEntities(updated);
        savedId = editingEntity.id;
      } else {
        const newId = (entities.length + 1).toString();
        const newEntity: MasterDataEntity = {
          ...(formData as MasterDataEntity),
          id: newId,
          code: `MD-NEW-${newId.padStart(3, '0')}`,
          createdDate: new Date().toLocaleDateString('vi-VN'),
          updatedDate: new Date().toLocaleDateString('vi-VN'),
          createdBy: 'Admin'
        };
        setEntities([...entities, newEntity]);
        setWizardEntityId(newId);
        savedId = newId;
      }
      return savedId;
    };

    const savedId = saveEntity();

    if (action === 'submit') {
      setShowWizard(false);
      handleSubmitForApproval(savedId, 'category');
    } else if (action === 'next') {
      setWizardStep(2);
    } else {
      setShowWizard(false);
    }
  };


  const handleSubmitForApproval = (id: string, type: 'category' | 'structure') => {
    const entity = entities.find(e => e.id === id);
    if (entity) {
      setPendingApprovalData({ id: entity.id, code: entity.code, name: entity.name, type: 'category' });
      setShowApprovalModal(true);
    }
  };

  const handlePublish = (entity: MasterDataEntity) => {
    setEntityToPublish(entity);
    setShowPublishModal(true);
  };

  const confirmPublish = () => {
    if (!publishNote) {
      alert('Vui lòng nhập ghi chú công khai!');
      return;
    }
    setPublishedEntities([...publishedEntities, entityToPublish!.id]);
    setShowPublishModal(false);
    setEntityToPublish(null);
    setPublishNote('');
  };

  const handleUnpublish = (entity: MasterDataEntity) => {
    setEntityToPublish(entity);
    setShowUnpublishModal(true);
  };

  const confirmUnpublish = () => {
    if (!unpublishNote) {
      alert('Vui lòng nhập lý do!');
      return;
    }
    setPublishedEntities(publishedEntities.filter(id => id !== entityToPublish!.id));
    setShowUnpublishModal(false);
    setEntityToPublish(null);
    setUnpublishNote('');
  };

  const submitApprovalRequest = () => {
    if (!approvalRequestForm.reviewer) {
      alert('Vui lòng chọn người phê duyệt!');
      return;
    }
    
    const newRequest: ApprovalRequest = {
      id: (requests.length + 1).toString(),
      type: pendingApprovalData?.type === 'category' ? 'category' : 'structure',
      entityId: pendingApprovalData!.id,
      entityCode: pendingApprovalData!.code,
      entityName: pendingApprovalData!.name,
      requestedBy: 'Nguyễn Văn Staff',
      requestedDate: new Date().toLocaleDateString('vi-VN'),
      status: 'pending',
      comments: approvalRequestForm.note
    };

    setRequests([newRequest, ...requests]);
    setShowApprovalModal(false);
    setPendingApprovalData(null);
    setApprovalRequestForm({ reviewer: '', note: '' });
    alert('Yêu cầu phê duyệt đã được gửi thành công!');
  };

  const handleReviewApprove = (ids: string[], note: string) => {
    setRequests(requests.map(req => ids.includes(req.id) ? { ...req, status: 'approved', comments: note || req.comments } : req));
    // Do not automatically close if we are just approving some. The modal will close itself if needed.
    // We update selectedRequests to reflect the new states so the modal UI updates immediately.
    setSelectedRequests(prev => prev.map(req => ids.includes(req.id) ? { ...req, status: 'approved', comments: note || req.comments } : req));
  };

  const handleReviewReject = (ids: string[], note: string) => {
    setRequests(requests.map(req => ids.includes(req.id) ? { ...req, status: 'rejected', comments: note || req.comments } : req));
    setSelectedRequests(prev => prev.map(req => ids.includes(req.id) ? { ...req, status: 'rejected', comments: note || req.comments } : req));
  };

  const handleApproveAll = (type: ApprovalType | 'all') => {
    const pendingOfThisType = type === 'all'
       ? requests.filter(req => req.status === 'pending')
       : requests.filter(req => req.type === type && req.status === 'pending');
    setSelectedRequests(pendingOfThisType);
    setShowReviewModal(true);
  };

  // --------------------------------------------------------------------------------
  // Handlers - Attributes
  // --------------------------------------------------------------------------------
  const handleAddAttribute = () => {
    setEditingAttribute(null);
    setAttributeFormData({
      dataType: 'string',
      required: false,
      unique: false,
      indexed: false
    });
    setShowAttributeModal(true);
  };

  const handleEditAttribute = (attr: MasterDataAttribute) => {
    setEditingAttribute(attr);
    setAttributeFormData(attr);
    setShowAttributeModal(true);
  };

  const handleSaveAttribute = () => {
    if (!attributeFormData.fieldName || !attributeFormData.displayName) {
      alert('Vui lòng nhập đầy đủ tên trường và tên hiển thị!');
      return;
    }

    if (editingAttribute) {
      setAttributes(attributes.map(a => a.id === editingAttribute.id ? { ...a, ...attributeFormData } as MasterDataAttribute : a));
    } else {
      const newAttr: MasterDataAttribute = {
        ...(attributeFormData as MasterDataAttribute),
        id: Math.random().toString(36).substr(2, 9),
        createdDate: new Date().toLocaleDateString('vi-VN'),
        version: 1,
        status: 'draft'
      };
      setAttributes([...attributes, newAttr]);
    }
    setShowAttributeModal(false);
  };

  const handleDeleteAttribute = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa thuộc tính này?')) {
      setAttributes(attributes.filter(a => a.id !== id));
      setSelectedAttributes(selectedAttributes.filter(sid => sid !== id));
    }
  };

  const getDataTypeLabel = (type: FieldDataType) => {
    const map: Record<string, string> = {
      string: 'Chuỗi', number: 'Số', date: 'Ngày', datetime: 'Ngày giờ', 
      boolean: 'Logic', text: 'Văn bản', email: 'Email', phone: 'SĐT', url: 'URL'
    };
    return map[type] || type;
  };

  // --------------------------------------------------------------------------------
  // Main Render
  // --------------------------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Modals Container */}
      <CategoryWizardModal 
        isOpen={showWizard} onClose={() => setShowWizard(false)}
        step={wizardStep} setStep={setWizardStep}
        entityId={wizardEntityId} formData={formData} setFormData={setFormData}
        onSaveStep1={handleSaveStep1}
        entities={entities} attributes={attributes}
        selectedAttributes={selectedAttributes}
        onSelectAttribute={(id) => setSelectedAttributes(prev => prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id])}
        onSelectAllAttributes={(checked) => setSelectedAttributes(checked ? attributes.map(a => a.id) : [])}
        onAddAttribute={handleAddAttribute}
        onEditAttribute={handleEditAttribute}
        onDeleteAttribute={handleDeleteAttribute}
        getDataTypeLabel={getDataTypeLabel}
      />

      <AttributeFormModal 
        isOpen={showAttributeModal} onClose={() => setShowAttributeModal(false)}
        editingAttribute={editingAttribute} formData={attributeFormData} setFormData={setAttributeFormData}
        onSave={handleSaveAttribute}
        onSaveAndSubmit={(data) => {
          setPendingApprovalData(data);
          setShowApprovalModal(true);
        }}
      />

      <ApprovalRequestModal 
        isOpen={showApprovalModal} onClose={() => setShowApprovalModal(false)}
        data={pendingApprovalData} approvers={approvers}
        form={approvalRequestForm} setForm={setApprovalRequestForm}
        onSubmit={submitApprovalRequest}
      />

      <DeleteConfirmModal 
        isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}
        entity={entityToDelete} onConfirm={confirmDelete}
      />

      <PublishModal 
        isOpen={showPublishModal} onClose={() => setShowPublishModal(false)}
        entity={entityToPublish} note={publishNote} setNote={setPublishNote}
        onConfirm={confirmPublish}
      />

      <UnpublishModal 
        isOpen={showUnpublishModal} onClose={() => setShowUnpublishModal(false)}
        entity={entityToPublish} note={unpublishNote} setNote={setUnpublishNote}
        onConfirm={confirmUnpublish}
      />

      <RestoreVersionModal 
        isOpen={showRestoreModal} onClose={() => setShowRestoreModal(false)}
        version={versionToRestore} approvers={approvers}
        selectedApprover={restoreApprover} setSelectedApprover={setRestoreApprover}
        note={restoreNote} setNote={setRestoreNote}
        onConfirm={() => {
           alert('Yêu cầu phục hồi đã được gửi!');
           setShowRestoreModal(false);
        }}
      />

      <ReviewApprovalModal 
        isOpen={showReviewModal} onClose={() => { setShowReviewModal(false); setSelectedRequests([]); }}
        requests={selectedRequests} attributes={attributes}
        onApprove={handleReviewApprove} onReject={handleReviewReject}
      />

      {/* Main UI Header & Tabs Navigation */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="flex border-b border-slate-200 overflow-x-auto">
          {[
            { id: 'setup', label: 'Thiết lập danh sách', icon: Settings },
            { id: 'attributes', label: 'Thiết lập quản lý thuộc tính', icon: Sliders },
            { id: 'relationships', label: 'Thiết lập quan hệ', icon: Link2 },
            { id: 'approval', label: 'Phê duyệt', icon: CheckSquare },
            { id: 'version-history', label: 'Lịch sử phiên bản', icon: Clock }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-6 py-4 text-[14px] font-bold transition-all whitespace-nowrap border-b-2 ${
                activeTab === tab.id ? 'bg-blue-50/50 text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Rendering Area */}
        <div className="p-6 bg-slate-50/20 min-h-[600px]">
          {activeTab === 'setup' && (
            <SetupTab 
              entities={entities} searchTerm={searchTerm} setSearchTerm={setSearchTerm}
              filterStatus={filterStatus} setFilterStatus={setFilterStatus}
              userRole={userRole} publishedEntities={publishedEntities}
              onAdd={() => {
                setFormData({ name: '', dataType: 'standard', managingAgency: '', scope: 'national', description: '', lifecycleStatus: 'draft' });
                setEditingEntity(null);
                setShowWizard(true);
                setWizardStep(1);
                setWizardEntityId(null);
              }}
              onEdit={handleEdit} onDelete={handleDelete}
              onSubmitApproval={handleSubmitForApproval}
              onPublish={handlePublish} onUnpublish={handleUnpublish}
            />
          )}

          {activeTab === 'attributes' && (
            <AttributesTab 
              entities={entities} attributes={attributes}
              selectedEntityId={selectedEntityId} setSelectedEntityId={setSelectedEntityId}
              selectedAttributes={selectedAttributes}
              onSelectAttribute={(id) => setSelectedAttributes(prev => prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id])}
              onSelectAll={(checked) => setSelectedAttributes(checked ? attributes.map(a => a.id) : [])}
              onAddAttribute={handleAddAttribute}
              onEditAttribute={handleEditAttribute}
              onDeleteAttribute={handleDeleteAttribute}
              getDataTypeLabel={getDataTypeLabel}
            />
          )}

          {activeTab === 'relationships' && (
            <RelationshipsTab 
              entities={entities}
              relationships={relationships} 
              setRelationships={setRelationships}
            />
          )}

          {activeTab === 'approval' && (
            <ApprovalTab 
              approvalTab={approvalTab} setApprovalTab={setApprovalTab}
              requests={requests} statusFilter={statusFilter} setStatusFilter={setStatusFilter}
              onViewDetail={(req) => {
                setSelectedRequests([req]);
                setShowReviewModal(true);
              }}
              onApproveAll={handleApproveAll}
              approvalTypeLabels={approvalTypeLabels} approvalStatusLabels={approvalStatusLabels}
            />
          )}

          {activeTab === 'version-history' && (
            <VersionHistoryTab 
              searchTerm={searchTerm} setSearchTerm={setSearchTerm}
              onViewDetail={(v) => {
                setVersionToRestore(v);
                setShowRestoreModal(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySetupPage;