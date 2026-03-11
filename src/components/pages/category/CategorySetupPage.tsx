import { useState } from 'react';
import { Settings, Sliders, Plus, Edit, Trash2, X, Search, Filter, Check, Circle, CheckSquare, Send, Clock, XCircle, Eye, ChevronDown, Link2, Save, BarChart3, Download, Globe, Share2, AlertCircle } from 'lucide-react';

type TabType = 'setup' | 'attributes' | 'relationships' | 'approval' | 'version-history' | 'publish';
type RelationshipType = '1-1' | '1-n' | 'n-1' | 'n-n';
type RelationshipStatus = 'active' | 'inactive';

type LifecycleStatus = 'active' | 'draft' | 'inactive' | 'archived' | 'pending_approval';
type DataType = 'standard' | 'reference' | 'transactional';
type ScopeType = 'national' | 'ministry' | 'provincial' | 'internal';
type DataSourceType = 'dldc' | 'lgsp' | 'ndxp' | 'manual';
type UpdateStrategyType = 'reference' | 'scheduled' | 'realtime';
type SyncFrequencyType = 'daily' | 'weekly' | 'monthly' | 'event';
type FieldDataType = 'string' | 'number' | 'date' | 'datetime' | 'boolean' | 'text' | 'email' | 'phone' | 'url';
type ApprovalType = 'category' | 'structure' | 'deactivation';
type ApprovalStatus = 'pending' | 'approved' | 'rejected';

interface ApprovalRequest {
  id: string;
  type: ApprovalType;
  entityId: string;
  entityCode: string;
  entityName: string;
  requestedBy: string;
  requestedDate: string;
  status: ApprovalStatus;
  reviewedBy?: string;
  reviewedDate?: string;
  comments?: string;
  changes?: any;
}

interface CustomField {
  id: string;
  name: string;
  dataType: FieldDataType;
  length?: number;
  defaultValue?: string;
  isPrimaryKey: boolean;
  foreignKey?: string;
}

interface MasterDataAttribute {
  id: string;
  fieldName: string;
  displayName: string;
  dataType: FieldDataType;
  length?: number;
  required: boolean;
  unique: boolean;
  indexed: boolean;
  defaultValue?: string;
  description?: string;
  validationRules?: string;
  createdDate: string;
  version: number;
}

interface EntityRelationship {
  id: string;
  sourceEntityId: string;
  sourceEntityName: string;
  targetEntityId: string;
  targetEntityName: string;
  relationshipType: RelationshipType;
  mappingTable?: string;
  sourceKey?: string;
  targetKey?: string;
  status: RelationshipStatus;
  createdDate: string;
  createdBy: string;
}

interface MasterDataEntity {
  id: string;
  code: string;
  name: string;
  dataType: DataType;
  managingAgency: string;
  scope: ScopeType;
  description: string;
  lifecycleStatus: LifecycleStatus;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  // Data source fields
  dataSource?: DataSourceType;
  dldcTable?: string;
  dldcColumns?: string[];
  apiSystem?: string;
  apiManagingUnit?: string;
  apiEndpoint?: string;
  apiMethod?: 'GET' | 'POST' | 'PUT';
  updateStrategy?: UpdateStrategyType;
  syncFrequency?: SyncFrequencyType;
  customFields?: CustomField[];
}

const defaultEntities: MasterDataEntity[] = [
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
  }
];

const dataTypeLabels: Record<DataType, string> = {
  standard: 'Dữ liệu chuẩn',
  reference: 'Dữ liệu tham chiếu',
  transactional: 'Dữ liệu giao dịch'
};

const scopeLabels: Record<ScopeType, string> = {
  national: 'Cấp quốc gia',
  ministry: 'Cấp bộ',
  provincial: 'Cấp tỉnh/thành',
  internal: 'Nội bộ'
};

const lifecycleLabels: Record<LifecycleStatus, { label: string; color: string }> = {
  active: { label: 'Hiệu lực', color: 'bg-green-100 text-green-700' },
  draft: { label: 'Đang soạn thảo', color: 'bg-yellow-100 text-yellow-700' },
  inactive: { label: 'Ngừng sử dụng', color: 'bg-red-100 text-red-700' },
  archived: { label: 'Đã lưu trữ', color: 'bg-slate-100 text-slate-700' },
  pending_approval: { label: 'Chờ phê duyệt', color: 'bg-orange-100 text-orange-700' }
};

const approvalTypeLabels: Record<ApprovalType, string> = {
  category: 'Phê duyệt danh mục',
  structure: 'Phê duyệt cấu trúc',
  deactivation: 'Phê duyệt hết hiệu lực'
};

const approvalStatusLabels: Record<ApprovalStatus, { label: string; color: string }> = {
  pending: { label: 'Chờ phê duyệt', color: 'bg-orange-100 text-orange-700' },
  approved: { label: 'Đã phê duyệt', color: 'bg-green-100 text-green-700' },
  rejected: { label: 'Đã từ chối', color: 'bg-red-100 text-red-700' }
};

interface CategorySetupPageProps {
  onNavigate?: (page: string) => void;
  userRole?: 'leader' | 'staff' | 'admin';
}

export function CategorySetupPage({ onNavigate, userRole = 'staff' }: CategorySetupPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('setup');
  const [entities, setEntities] = useState<MasterDataEntity[]>(defaultEntities);
  const [showForm, setShowForm] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [editingEntity, setEditingEntity] = useState<MasterDataEntity | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<LifecycleStatus | 'all'>('all');

  const [formData, setFormData] = useState<Partial<MasterDataEntity>>({
    name: '',
    dataType: 'standard',
    managingAgency: '',
    scope: 'national',
    description: '',
    lifecycleStatus: 'draft'
  });

  // Attributes tab state
  const [selectedEntityForAttributes, setSelectedEntityForAttributes] = useState<string>('1');
  const [attributes, setAttributes] = useState<MasterDataAttribute[]>([
    {
      id: '1',
      fieldName: 'citizen_id',
      displayName: 'Số CCCD',
      dataType: 'string',
      length: 12,
      required: true,
      unique: true,
      indexed: true,
      defaultValue: '',
      description: 'Số căn cước công dân 12 chữ số',
      validationRules: 'regex:^[0-9]{12}$',
      createdDate: '01/01/2024',
      version: 1
    },
    {
      id: '2',
      fieldName: 'full_name',
      displayName: 'Họ và tên',
      dataType: 'string',
      length: 255,
      required: true,
      unique: false,
      indexed: true,
      defaultValue: '',
      description: 'Họ và tên đầy đủ của công dân',
      validationRules: '',
      createdDate: '01/01/2024',
      version: 1
    },
    {
      id: '3',
      fieldName: 'date_of_birth',
      displayName: 'Ngày sinh',
      dataType: 'date',
      required: true,
      unique: false,
      indexed: false,
      defaultValue: '',
      description: 'Ngày tháng năm sinh',
      validationRules: '',
      createdDate: '01/01/2024',
      version: 1
    },
    {
      id: '4',
      fieldName: 'gender',
      displayName: 'Giới tính',
      dataType: 'string',
      length: 10,
      required: false,
      unique: false,
      indexed: false,
      defaultValue: '',
      description: 'Giới tính của công dân',
      validationRules: 'enum:Nam,Nữ,Khác',
      createdDate: '01/01/2024',
      version: 1
    },
    {
      id: '5',
      fieldName: 'address',
      displayName: 'Địa chỉ thường trú',
      dataType: 'text',
      required: false,
      unique: false,
      indexed: false,
      defaultValue: '',
      description: 'Địa chỉ nơi cư trú thường xuyên',
      validationRules: '',
      createdDate: '01/01/2024',
      version: 1
    },
    {
      id: '6',
      fieldName: 'email',
      displayName: 'Email',
      dataType: 'email',
      length: 255,
      required: false,
      unique: false,
      indexed: true,
      defaultValue: '',
      description: 'Địa chỉ email liên hệ',
      validationRules: '',
      createdDate: '01/01/2024',
      version: 1
    },
    {
      id: '7',
      fieldName: 'phone_number',
      displayName: 'Số điện thoại',
      dataType: 'phone',
      length: 15,
      required: false,
      unique: false,
      indexed: true,
      defaultValue: '',
      description: 'Số điện thoại liên hệ',
      validationRules: '',
      createdDate: '01/01/2024',
      version: 1
    }
  ]);
  const [showAttributeForm, setShowAttributeForm] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<MasterDataAttribute | null>(null);
  const [attributeFormData, setAttributeFormData] = useState<Partial<MasterDataAttribute>>({
    fieldName: '',
    displayName: '',
    dataType: 'string',
    required: false,
    unique: false,
    indexed: false,
    defaultValue: '',
    description: '',
    validationRules: ''
  });

  // Relationships state
  const [relationships, setRelationships] = useState<EntityRelationship[]>([
    {
      id: '1',
      sourceEntityId: '1',
      sourceEntityName: 'Bộ dữ liệu chủ Công dân',
      targetEntityId: '2',
      targetEntityName: 'Bộ dữ liệu chủ Tổ chức',
      relationshipType: 'n-n',
      mappingTable: 'citizen_organization_mapping',
      sourceKey: 'citizen_id',
      targetKey: 'organization_id',
      status: 'active',
      createdDate: '15/01/2024',
      createdBy: 'Nguyễn Văn A'
    },
    {
      id: '2',
      sourceEntityId: '3',
      sourceEntityName: 'Bộ dữ liệu chủ Văn bản pháp luật',
      targetEntityId: '5',
      targetEntityName: 'Bộ dữ liệu chủ Cơ quan ban hành',
      relationshipType: '1-n',
      sourceKey: 'issuing_authority_id',
      targetKey: 'authority_id',
      status: 'active',
      createdDate: '20/02/2024',
      createdBy: 'Lê Văn C'
    }
  ]);
  const [showRelationshipForm, setShowRelationshipForm] = useState(false);
  const [editingRelationship, setEditingRelationship] = useState<EntityRelationship | null>(null);

  // Approval state
  const [approvalTab, setApprovalTab] = useState<ApprovalType>('category');
  const [approvalStatusFilter, setApprovalStatusFilter] = useState<ApprovalStatus | 'all'>('all');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedApprovalRequest, setSelectedApprovalRequest] = useState<ApprovalRequest | null>(null);
  const [approvalComment, setApprovalComment] = useState('');
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([
    {
      id: '1',
      type: 'category',
      entityId: '5',
      entityCode: 'MD-AGENCY-001',
      entityName: 'Bộ dữ liệu chủ Cơ quan nhà nước',
      requestedBy: 'Hoàng Văn E',
      requestedDate: '18/12/2024',
      status: 'pending',
      changes: { action: 'create' }
    },
    {
      id: '2',
      type: 'category',
      entityId: '1',
      entityCode: 'MD-CITIZEN-001',
      entityName: 'Bộ dữ liệu chủ Công dân',
      requestedBy: 'Nguyễn Văn A',
      requestedDate: '29/12/2024 14:30',
      status: 'pending',
      changes: { action: 'create' }
    },
    {
      id: '3',
      type: 'category',
      entityId: '2',
      entityCode: 'MD-ORG-001',
      entityName: 'Bộ dữ liệu chủ Tổ chức',
      requestedBy: 'Trần Thị B',
      requestedDate: '27/12/2024 10:15',
      status: 'approved',
      reviewedBy: 'Nguyễn Văn Admin',
      reviewedDate: '28/12/2024 09:00',
      changes: { action: 'create' }
    },
    {
      id: '4',
      type: 'category',
      entityId: '3',
      entityCode: 'MD-DOC-001',
      entityName: 'Bộ dữ liệu chủ Văn bản pháp luật',
      requestedBy: 'Lê Văn C',
      requestedDate: '26/12/2024 16:45',
      status: 'rejected',
      reviewedBy: 'Nguyễn Văn Admin',
      reviewedDate: '27/12/2024 11:30',
      comments: 'Thiếu thông tin cơ quan quản lý',
      changes: { action: 'create' }
    }
  ]);
  const [showApprovalDetail, setShowApprovalDetail] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState<ApprovalRequest | null>(null);
  const [showSubmitApprovalModal, setShowSubmitApprovalModal] = useState(false);
  const [entityToSubmit, setEntityToSubmit] = useState<MasterDataEntity | null>(null);
  const [submitApprovalType, setSubmitApprovalType] = useState<ApprovalType>('category');
  const [selectedApprover, setSelectedApprover] = useState('');
  const [approvalNote, setApprovalNote] = useState('');

  // Version history state
  const [versionSearchTerm, setVersionSearchTerm] = useState('');
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [versionToRestore, setVersionToRestore] = useState<any>(null);
  const [versionStartDate, setVersionStartDate] = useState('');
  const [versionEndDate, setVersionEndDate] = useState('');
  const [versionChangeTypeFilter, setVersionChangeTypeFilter] = useState<string>('all');
  const [versionStatusFilter, setVersionStatusFilter] = useState<string>('all');

  // Publish state
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [entityToPublish, setEntityToPublish] = useState<MasterDataEntity | null>(null);
  const [publishNote, setPublishNote] = useState('');
  const [publishedEntities, setPublishedEntities] = useState<string[]>(['1', '2', '3']); // IDs of published entities
  
  // Unpublish state
  const [showUnpublishModal, setShowUnpublishModal] = useState(false);
  const [entityToUnpublish, setEntityToUnpublish] = useState<MasterDataEntity | null>(null);
  const [unpublishNote, setUnpublishNote] = useState('');

  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<MasterDataEntity | null>(null);

  const approvers = [
    { id: '1', name: 'Trần Thị B', position: 'Trưởng phòng Quản lý dữ liệu', department: 'Cục CNTT' },
    { id: '2', name: 'Nguyễn Văn D', position: 'Phó Cục trưởng', department: 'Cục CNTT' },
    { id: '3', name: 'Lê Thị E', position: 'Trưởng phòng Pháp chế', department: 'Vụ Pháp luật' },
    { id: '4', name: 'Phạm Văn F', position: 'Cục trưởng', department: 'Cục CNTT' },
  ];

  const generateCode = (type: string) => {
    const prefix = type === 'standard' ? 'MD-STD-' : type === 'reference' ? 'MD-REF-' : 'MD-TRX-';
    const maxNum = entities
      .filter(e => e.code.startsWith(prefix))
      .map(e => parseInt(e.code.split('-')[2]))
      .reduce((max, num) => Math.max(max, num), 0);
    return `${prefix}${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.managingAgency) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    if (editingEntity) {
      // Update existing
      setEntities(entities.map(e => 
        e.id === editingEntity.id 
          ? { 
              ...e, 
              ...formData as MasterDataEntity,
              updatedDate: dateStr 
            }
          : e
      ));
    } else {
      // Create new
      const newEntity: MasterDataEntity = {
        id: String(entities.length + 1),
        code: generateCode(formData.dataType || 'standard'),
        name: formData.name!,
        dataType: formData.dataType!,
        managingAgency: formData.managingAgency!,
        scope: formData.scope!,
        description: formData.description || '',
        lifecycleStatus: formData.lifecycleStatus!,
        createdDate: dateStr,
        updatedDate: dateStr,
        createdBy: 'Người dùng hiện tại'
      };
      setEntities([...entities, newEntity]);
    }

    handleCloseForm();
  };

  const handleSaveDraft = () => {
    if (!formData.name || !formData.managingAgency) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    if (editingEntity) {
      // Update existing as draft
      setEntities(entities.map(e => 
        e.id === editingEntity.id 
          ? { 
              ...e, 
              ...formData as MasterDataEntity,
              lifecycleStatus: 'draft',
              updatedDate: dateStr 
            }
          : e
      ));
    } else {
      // Create new as draft
      const newEntity: MasterDataEntity = {
        id: String(entities.length + 1),
        code: generateCode(formData.dataType || 'standard'),
        name: formData.name!,
        dataType: formData.dataType!,
        managingAgency: formData.managingAgency!,
        scope: formData.scope!,
        description: formData.description || '',
        lifecycleStatus: 'draft',
        createdDate: dateStr,
        updatedDate: dateStr,
        createdBy: 'Người dùng hiện tại'
      };
      setEntities([...entities, newEntity]);
    }

    alert('Đã lưu nháp thành công');
    handleCloseForm();
  };

  const handleEdit = (entity: MasterDataEntity) => {
    setEditingEntity(entity);
    setFormData(entity);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const entity = entities.find(e => e.id === id);
    if (entity) {
      setEntityToDelete(entity);
      setShowDeleteConfirm(true);
    }
  };

  const handleConfirmDelete = () => {
    if (entityToDelete) {
      setEntities(entities.filter(e => e.id !== entityToDelete.id));
      setShowDeleteConfirm(false);
      setEntityToDelete(null);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEntity(null);
    setFormData({
      name: '',
      dataType: 'standard',
      managingAgency: '',
      scope: 'national',
      description: '',
      lifecycleStatus: 'draft'
    });
  };

  // Attribute handlers
  const handleAddAttribute = () => {
    setEditingAttribute(null);
    setAttributeFormData({
      fieldName: '',
      displayName: '',
      dataType: 'string',
      required: false,
      unique: false,
      indexed: false,
      defaultValue: '',
      description: '',
      validationRules: ''
    });
    setShowAttributeForm(true);
  };

  const handleEditAttribute = (attr: MasterDataAttribute) => {
    setEditingAttribute(attr);
    setAttributeFormData(attr);
    setShowAttributeForm(true);
  };

  const handleDeleteAttribute = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa thuộc tính này?')) {
      setAttributes(attributes.filter(a => a.id !== id));
    }
  };

  const handleSubmitAttribute = () => {
    if (!attributeFormData.fieldName || !attributeFormData.displayName) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    if (editingAttribute) {
      // Update existing
      setAttributes(attributes.map(a =>
        a.id === editingAttribute.id
          ? {
              ...a,
              ...attributeFormData as MasterDataAttribute,
              version: a.version + 1
            }
          : a
      ));
    } else {
      // Create new
      const newAttribute: MasterDataAttribute = {
        id: String(attributes.length + 1),
        fieldName: attributeFormData.fieldName!,
        displayName: attributeFormData.displayName!,
        dataType: attributeFormData.dataType!,
        length: attributeFormData.length,
        required: attributeFormData.required!,
        unique: attributeFormData.unique!,
        indexed: attributeFormData.indexed!,
        defaultValue: attributeFormData.defaultValue,
        description: attributeFormData.description,
        validationRules: attributeFormData.validationRules,
        createdDate: dateStr,
        version: 1
      };
      setAttributes([...attributes, newAttribute]);
    }

    handleCloseAttributeForm();
  };

  const handleCloseAttributeForm = () => {
    setShowAttributeForm(false);
    setEditingAttribute(null);
    setAttributeFormData({
      fieldName: '',
      displayName: '',
      dataType: 'string',
      required: false,
      unique: false,
      indexed: false,
      defaultValue: '',
      description: '',
      validationRules: ''
    });
  };

  const getDataTypeLabel = (type: FieldDataType): string => {
    const labels: Record<FieldDataType, string> = {
      string: 'Chuỗi (String)',
      number: 'Số (Number)',
      date: 'Ngày (Date)',
      datetime: 'Ngày giờ (DateTime)',
      boolean: 'Logic (Boolean)',
      text: 'Văn bản dài (Text)',
      email: 'Email',
      phone: 'Số điện thoại',
      url: 'URL'
    };
    return labels[type];
  };

  // Approval handlers
  const handleViewApproval = (request: ApprovalRequest) => {
    setSelectedApproval(request);
    setShowApprovalDetail(true);
  };

  const handleOpenApprovalModal = (request: ApprovalRequest) => {
    setSelectedApprovalRequest(request);
    setApprovalComment('');
    setShowApprovalModal(true);
  };

  const handleApprove = (requestId: string, comments?: string) => {
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    
    setApprovalRequests(approvalRequests.map(req => 
      req.id === requestId 
        ? {
            ...req,
            status: 'approved',
            reviewedBy: 'Nguyễn Văn Admin',
            reviewedDate: dateStr,
            comments
          }
        : req
    ));

    // Update entity status if category approval
    const request = approvalRequests.find(r => r.id === requestId);
    if (request && request.type === 'category') {
      setEntities(entities.map(e =>
        e.id === request.entityId
          ? { ...e, lifecycleStatus: 'active' }
          : e
      ));
    }

    setShowApprovalModal(false);
    setSelectedApprovalRequest(null);
    setApprovalComment('');
    setShowApprovalDetail(false);
    setSelectedApproval(null);
  };

  const handleReject = (requestId: string, comments?: string) => {
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    
    setApprovalRequests(approvalRequests.map(req => 
      req.id === requestId 
        ? {
            ...req,
            status: 'rejected',
            reviewedBy: 'Nguyễn Văn Admin',
            reviewedDate: dateStr,
            comments
          }
        : req
    ));

    setShowApprovalModal(false);
    setSelectedApprovalRequest(null);
    setApprovalComment('');
    setShowApprovalDetail(false);
    setSelectedApproval(null);
  };

  const handleSubmitForApproval = (entityId: string, type: ApprovalType) => {
    const entity = entities.find(e => e.id === entityId);
    if (!entity) return;

    setEntityToSubmit(entity);
    setSubmitApprovalType(type);
    setShowSubmitApprovalModal(true);
  };

  const handleConfirmSubmitApproval = () => {
    if (!selectedApprover || !entityToSubmit) {
      alert('Vui lòng chọn người phê duyệt');
      return;
    }

    const approver = approvers.find(a => a.id === selectedApprover);
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    const newRequest: ApprovalRequest = {
      id: String(approvalRequests.length + 1),
      type: submitApprovalType,
      entityId: entityToSubmit.id,
      entityCode: entityToSubmit.code,
      entityName: entityToSubmit.name,
      requestedBy: 'Người dùng hiện tại',
      requestedDate: dateStr,
      status: 'pending',
      comments: approvalNote,
      changes: { action: submitApprovalType === 'deactivation' ? 'deactivate' : 'update' }
    };

    setApprovalRequests([...approvalRequests, newRequest]);
    
    // Update entity status to pending_approval
    setEntities(entities.map(e =>
      e.id === entityToSubmit.id
        ? { ...e, lifecycleStatus: 'pending_approval' }
        : e
    ));

    alert(`Đã gửi yêu cầu phê duyệt đến ${approver?.name} (${approver?.position})`);

    setShowSubmitApprovalModal(false);
    setEntityToSubmit(null);
    setSelectedApprover('');
    setApprovalNote('');
  };

  const filteredApprovalRequests = approvalRequests.filter(req => {
    const matchesType = req.type === approvalTab;
    const matchesStatus = approvalStatusFilter === 'all' || req.status === approvalStatusFilter;
    return matchesType && matchesStatus;
  });

  const filteredEntities = entities.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         e.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || e.lifecycleStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleRestoreVersion = (version: any) => {
    setVersionToRestore(version);
    setShowRestoreModal(true);
  };

  const handleConfirmRestore = () => {
    if (!versionToRestore || !selectedApprover) {
      alert('Vui lòng chọn người phê duyệt');
      return;
    }

    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    
    const approver = approvers.find(a => a.id === selectedApprover);

    const newRequest: ApprovalRequest = {
      id: String(approvalRequests.length + 1),
      type: 'category',
      entityId: '0',
      entityCode: versionToRestore.category,
      entityName: `Phục hồi phiên bản ${versionToRestore.version}`,
      requestedBy: 'Người dùng hiện tại',
      requestedDate: dateStr,
      status: 'pending',
      comments: approvalNote || `Yêu cầu phục hồi phiên bản ${versionToRestore.version} của ${versionToRestore.category}`,
      changes: versionToRestore
    };

    setApprovalRequests([newRequest, ...approvalRequests]);

    alert(`Đã gửi yêu cầu phê duyệt phục hồi phiên bản ${versionToRestore.version} đến ${approver?.name} (${approver?.position})`);

    setShowRestoreModal(false);
    setVersionToRestore(null);
    setSelectedApprover('');
    setApprovalNote('');
  };

  const handlePublish = (entity: MasterDataEntity) => {
    setEntityToPublish(entity);
    setPublishNote('');
    setShowPublishModal(true);
  };

  const handleConfirmPublish = () => {
    if (!entityToPublish) return;

    if (!publishNote.trim()) {
      alert('Vui lòng nhập ghi chú công khai');
      return;
    }

    // Add to published list
    setPublishedEntities([...publishedEntities, entityToPublish.id]);
    alert(`Đã công khai danh mục "${entityToPublish.name}" thành công`);

    setShowPublishModal(false);
    setEntityToPublish(null);
    setPublishNote('');
  };

  const handleUnpublish = (entity: MasterDataEntity) => {
    setEntityToUnpublish(entity);
    setUnpublishNote('');
    setShowUnpublishModal(true);
  };

  const handleConfirmUnpublish = () => {
    if (!entityToUnpublish) return;

    if (!unpublishNote.trim()) {
      alert('Vui lòng nhập lý do hủy công khai');
      return;
    }

    // Remove from published list
    setPublishedEntities(publishedEntities.filter(id => id !== entityToUnpublish.id));
    alert(`Đã hủy công khai danh mục "${entityToUnpublish.name}"`);

    setShowUnpublishModal(false);
    setEntityToUnpublish(null);
    setUnpublishNote('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('setup')}
            className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors whitespace-nowrap ${
              activeTab === 'setup'
                ? 'bg-white text-slate-900 border-b-2 border-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            Thiết lập danh sách
          </button>
          <button
            onClick={() => setActiveTab('attributes')}
            className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors whitespace-nowrap ${
              activeTab === 'attributes'
                ? 'bg-white text-slate-900 border-b-2 border-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Thiết lập quản lý thuộc tính
          </button>

          <button
            onClick={() => setActiveTab('relationships')}
            className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors whitespace-nowrap ${
              activeTab === 'relationships'
                ? 'bg-white text-slate-900 border-b-2 border-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Link2 className="w-4 h-4" />
            Thiết lập quan hệ
          </button>

          <button
            onClick={() => setActiveTab('approval')}
            className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors whitespace-nowrap ${
              activeTab === 'approval'
                ? 'bg-white text-slate-900 border-b-2 border-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            Phê duyệt
          </button>
          <button
            onClick={() => setActiveTab('version-history')}
            className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors whitespace-nowrap ${
              activeTab === 'version-history'
                ? 'bg-white text-slate-900 border-b-2 border-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-4 h-4" />
            Lịch sử phiên bản
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'setup' && (
            <div className="space-y-4">
              {/* Statistics Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-blue-700">Tổng số danh mục</div>
                      <div className="text-3xl text-blue-600 mt-1">{entities.length}</div>
                    </div>
                    <Settings className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-green-700">Đã hiệu lực</div>
                      <div className="text-3xl text-green-600 mt-1">{entities.filter(e => e.lifecycleStatus === 'active').length}</div>
                    </div>
                    <CheckSquare className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-700">Hết hiệu lực</div>
                      <div className="text-3xl text-slate-600 mt-1">{entities.filter(e => e.lifecycleStatus === 'inactive' || e.lifecycleStatus === 'archived').length}</div>
                    </div>
                    <XCircle className="w-8 h-8 text-slate-500" />
                  </div>
                </div>
              </div>

              {/* Search and Filter Row */}
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên hoặc mã..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-600" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as LifecycleStatus | 'all')}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="active">Đã hiệu lực</option>
                    <option value="draft">Đang soạn thảo</option>
                    <option value="inactive">Ngừng sử dụng</option>
                    <option value="archived">Đã lưu trữ</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Thêm mới
                </button>
              </div>

              {/* Entity List */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Mã</th>
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Tên dữ liệu chủ</th>
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Loại dữ liệu</th>
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Cơ quan quản lý</th>
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Trạng thái</th>
                      {userRole === 'leader' && (
                        <th className="text-left px-4 py-3 text-sm text-slate-700">Công khai</th>
                      )}
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Cập nhật</th>
                      <th className="text-right px-4 py-3 text-sm text-slate-700">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntities.map((entity) => {
                      const isPublished = publishedEntities.includes(entity.id);
                      return (
                        <tr key={entity.id} className="border-t border-slate-200 hover:bg-slate-50">
                          <td className="px-4 py-3 text-sm text-slate-900">{entity.code}</td>
                          <td className="px-4 py-3 text-sm text-slate-900">{entity.name}</td>
                          <td className="px-4 py-3 text-sm text-slate-600">{dataTypeLabels[entity.dataType]}</td>
                          <td className="px-4 py-3 text-sm text-slate-600">{entity.managingAgency}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${lifecycleLabels[entity.lifecycleStatus].color}`}>
                              {lifecycleLabels[entity.lifecycleStatus].label}
                            </span>
                          </td>
                          {userRole === 'leader' && (
                            <td className="px-4 py-3">
                              {entity.lifecycleStatus === 'active' ? (
                                isPublished ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                                    <Globe className="w-3 h-3 mr-1" />
                                    Đã công khai
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-slate-100 text-slate-700">
                                    Chưa công khai
                                  </span>
                                )
                              ) : (
                                <span className="text-xs text-slate-400">-</span>
                              )}
                            </td>
                          )}
                          <td className="px-4 py-3 text-sm text-slate-600">{entity.updatedDate}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-2">
                              {entity.lifecycleStatus === 'draft' && (
                                <button
                                  onClick={() => handleSubmitForApproval(entity.id, 'category')}
                                  className="p-1.5 text-blue-600 bg-blue-50 rounded hover:bg-blue-100"
                                  title="Trình phê duyệt"
                                >
                                  <Send className="w-4 h-4" />
                                </button>
                              )}
                              {entity.lifecycleStatus === 'active' && (
                                <>
                                  {userRole === 'leader' && (
                                    !isPublished ? (
                                      <button
                                        onClick={() => handlePublish(entity)}
                                        className="px-2 py-1 text-xs text-green-600 bg-green-50 rounded hover:bg-green-100 flex items-center gap-1"
                                        title="Công khai"
                                      >
                                        <Share2 className="w-3 h-3" />
                                        Công khai
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => handleUnpublish(entity)}
                                        className="px-2 py-1 text-xs text-red-600 bg-red-50 rounded hover:bg-red-100 flex items-center gap-1"
                                        title="Hủy công khai"
                                      >
                                        <XCircle className="w-3 h-3" />
                                        Hủy
                                      </button>
                                    )
                                  )}
                                  <button
                                    onClick={() => handleSubmitForApproval(entity.id, 'deactivation')}
                                    className="px-2 py-1 text-xs text-orange-600 bg-orange-50 rounded hover:bg-orange-100 flex items-center gap-1"
                                    title="Trình hết hiệu lực"
                                  >
                                    <Send className="w-3 h-3" />
                                    Hết hiệu lực
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => handleEdit(entity)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(entity.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Form Modal */}
              {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-6 border-b border-slate-200">
                      <h3 className="text-lg text-slate-900">
                        {editingEntity ? 'Chỉnh sửa danh sách' : 'Thêm mới danh sách'}
                      </h3>
                      <button onClick={handleCloseForm} className="p-1 hover:bg-slate-100 rounded">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Code (auto-generated) */}
                      {editingEntity && (
                        <div>
                          <label className="block text-sm text-slate-700 mb-1">
                            Mã danh sách
                          </label>
                          <input
                            type="text"
                            value={editingEntity.code}
                            disabled
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 text-sm"
                          />
                        </div>
                      )}

                      {/* Name */}
                      <div>
                        <label className="block text-sm text-slate-700 mb-1">
                          Tên danh sách <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="VD: Bộ dữ liệu chủ Công dân"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>

                      {/* Data Type */}
                      <div>
                        <label className="block text-sm text-slate-700 mb-1">
                          Loại dữ liệu <span className="text-red-600">*</span>
                        </label>
                        <select
                          value={formData.dataType}
                          onChange={(e) => setFormData({ ...formData, dataType: e.target.value as DataType })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="standard">Dữ liệu chuẩn</option>
                          <option value="reference">Dữ liệu tham chiếu</option>
                          <option value="transactional">Dữ liệu giao dịch</option>
                        </select>
                      </div>

                      {/* Managing Agency */}
                      <div>
                        <label className="block text-sm text-slate-700 mb-1">
                          Cơ quan quản lý <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.managingAgency}
                          onChange={(e) => setFormData({ ...formData, managingAgency: e.target.value })}
                          placeholder="VD: Cục Hộ tịch - Quốc tịch - Chứng thực"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>

                      {/* Scope */}
                      <div>
                        <label className="block text-sm text-slate-700 mb-1">
                          Phạm vi sử dụng <span className="text-red-600">*</span>
                        </label>
                        <select
                          value={formData.scope}
                          onChange={(e) => setFormData({ ...formData, scope: e.target.value as ScopeType })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="national">Cấp quốc gia</option>
                          <option value="ministry">Cấp bộ</option>
                          <option value="provincial">Cấp tỉnh/thành</option>
                          <option value="internal">Nội bộ</option>
                        </select>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm text-slate-700 mb-1">Mô tả</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Nhập mô tả chi tiết..."
                          rows={4}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>

                      {/* Lifecycle Status */}
                      <div>
                        <label className="block text-sm text-slate-700 mb-1">
                          Trạng thái vòng đời
                        </label>
                        <select
                          value={formData.lifecycleStatus}
                          onChange={(e) => setFormData({ ...formData, lifecycleStatus: e.target.value as LifecycleStatus })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="draft">Đang soạn thảo</option>
                          <option value="active">Đã hiệu lực</option>
                          <option value="inactive">Ngừng sử dụng</option>
                          <option value="archived">Đã lưu trữ</option>
                        </select>
                      </div>

                      {/* SECTION: Data Source Configuration */}
                      <div className="pt-4 border-t border-slate-200">
                        <h4 className="text-sm text-slate-900 mb-3">Cấu hình nguồn dữ liệu</h4>
                        
                        {/* Data Source Type */}
                        <div className="mb-4">
                          <label className="block text-sm text-slate-700 mb-1">
                            Nguồn dữ liệu <span className="text-red-600">*</span>
                          </label>
                          <select
                            value={formData.dataSource || 'dldc'}
                            onChange={(e) => setFormData({ ...formData, dataSource: e.target.value as DataSourceType })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            <option value="dldc">Từ Kho DLDC</option>
                            <option value="lgsp">API qua trục LGSP</option>
                            <option value="ndxp">API qua trục NDXP</option>
                            <option value="manual">Nhập thủ công</option>
                          </select>
                        </div>

                        {/* DLDC Configuration */}
                        {formData.dataSource === 'dldc' && (
                          <div className="space-y-3 bg-blue-50 p-4 rounded-lg">
                            <div>
                              <label className="block text-sm text-slate-700 mb-1">
                                Bảng dữ liệu <span className="text-red-600">*</span>
                              </label>
                              <select
                                value={formData.dldcTable || ''}
                                onChange={(e) => setFormData({ ...formData, dldcTable: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              >
                                <option value="">-- Chọn bảng --</option>
                                <option value="tbl_citizen">tbl_citizen - Thông tin công dân</option>
                                <option value="tbl_organization">tbl_organization - Thông tin tổ chức</option>
                                <option value="tbl_legal_document">tbl_legal_document - Văn bản pháp luật</option>
                                <option value="tbl_administrative_unit">tbl_administrative_unit - Đơn vị hành chính</option>
                                <option value="tbl_government_agency">tbl_government_agency - Cơ quan nhà nước</option>
                                <option value="tbl_business_registry">tbl_business_registry - Đăng ký kinh doanh</option>
                                <option value="tbl_notary_contract">tbl_notary_contract - Hợp đồng công chứng</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm text-slate-700 mb-1">
                                Cột/Trường dữ liệu <span className="text-slate-500">(chọn nhiều)</span>
                              </label>
                              <div className="border border-slate-300 rounded-lg p-3 bg-white space-y-2 max-h-40 overflow-y-auto">
                                {['id', 'full_name', 'citizen_id', 'date_of_birth', 'address', 'phone_number', 'email', 'created_date', 'updated_date'].map(col => (
                                  <label key={col} className="flex items-center gap-2 text-sm">
                                    <input 
                                      type="checkbox" 
                                      checked={formData.dldcColumns?.includes(col) || false}
                                      onChange={(e) => {
                                        const current = formData.dldcColumns || [];
                                        if (e.target.checked) {
                                          setFormData({ ...formData, dldcColumns: [...current, col] });
                                        } else {
                                          setFormData({ ...formData, dldcColumns: current.filter(c => c !== col) });
                                        }
                                      }}
                                      className="rounded"
                                    />
                                    <span className="text-slate-700">{col}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* LGSP Configuration */}
                        {formData.dataSource === 'lgsp' && (
                          <div className="space-y-3 bg-green-50 p-4 rounded-lg">
                            <div>
                              <label className="block text-sm text-slate-700 mb-1">
                                Hệ thống nguồn <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.apiSystem || ''}
                                onChange={(e) => setFormData({ ...formData, apiSystem: e.target.value })}
                                placeholder="VD: Hệ thống CCCD - Bộ Công an"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-slate-700 mb-1">
                                Đơn vị quản lý <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.apiManagingUnit || ''}
                                onChange={(e) => setFormData({ ...formData, apiManagingUnit: e.target.value })}
                                placeholder="VD: Cục Cảnh sát quản lý hành chính về trật tự xã hội"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-slate-700 mb-1">
                                API Endpoint <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.apiEndpoint || ''}
                                onChange={(e) => setFormData({ ...formData, apiEndpoint: e.target.value })}
                                placeholder="VD: https://lgsp.gov.vn/api/v1/citizen/info"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-slate-700 mb-1">
                                Phương thức <span className="text-red-600">*</span>
                              </label>
                              <select
                                value={formData.apiMethod || 'GET'}
                                onChange={(e) => setFormData({ ...formData, apiMethod: e.target.value as 'GET' | 'POST' | 'PUT' })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              >
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {/* NDXP Configuration */}
                        {formData.dataSource === 'ndxp' && (
                          <div className="space-y-3 bg-purple-50 p-4 rounded-lg">
                            <div>
                              <label className="block text-sm text-slate-700 mb-1">
                                Hệ thống nguồn <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.apiSystem || ''}
                                onChange={(e) => setFormData({ ...formData, apiSystem: e.target.value })}
                                placeholder="VD: Hệ thống Đăng ký kinh doanh - Bộ Kế hoạch và Đầu tư"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-slate-700 mb-1">
                                Đơn vị quản lý <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.apiManagingUnit || ''}
                                onChange={(e) => setFormData({ ...formData, apiManagingUnit: e.target.value })}
                                placeholder="VD: Cục Đăng ký kinh doanh"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-slate-700 mb-1">
                                API Endpoint <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.apiEndpoint || ''}
                                onChange={(e) => setFormData({ ...formData, apiEndpoint: e.target.value })}
                                placeholder="VD: https://ndxp.gov.vn/api/v1/business/registry"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-slate-700 mb-1">
                                Phương thức <span className="text-red-600">*</span>
                              </label>
                              <select
                                value={formData.apiMethod || 'GET'}
                                onChange={(e) => setFormData({ ...formData, apiMethod: e.target.value as 'GET' | 'POST' | 'PUT' })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              >
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {/* Manual Entry Note */}
                        {formData.dataSource === 'manual' && (
                          <div className="space-y-3 bg-amber-50 p-4 rounded-lg border border-amber-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-slate-900 mb-1">Định nghĩa cấu trúc dữ liệu tùy chỉnh</p>
                                <p className="text-xs text-slate-600">Thêm các trường thông tin cho danh mục nhập thủ công</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const newField: CustomField = {
                                    id: `field_${Date.now()}`,
                                    name: '',
                                    dataType: 'string',
                                    isPrimaryKey: false
                                  };
                                  setFormData({
                                    ...formData,
                                    customFields: [...(formData.customFields || []), newField]
                                  });
                                }}
                                className="flex items-center gap-1 px-3 py-1.5 bg-amber-600 text-white rounded text-xs hover:bg-amber-700 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                                Thêm trường
                              </button>
                            </div>

                            {/* Custom Fields Table */}
                            {formData.customFields && formData.customFields.length > 0 && (
                              <div className="bg-white rounded-lg border border-amber-300 overflow-hidden">
                                <div className="overflow-x-auto">
                                  <table className="w-full text-xs">
                                    <thead className="bg-amber-100">
                                      <tr>
                                        <th className="text-left px-2 py-2 text-slate-700">Tên trường <span className="text-red-600">*</span></th>
                                        <th className="text-left px-2 py-2 text-slate-700">Kiểu dữ liệu <span className="text-red-600">*</span></th>
                                        <th className="text-left px-2 py-2 text-slate-700">Độ dài</th>
                                        <th className="text-left px-2 py-2 text-slate-700">Giá trị mặc định</th>
                                        <th className="text-center px-2 py-2 text-slate-700">Khóa chính</th>
                                        <th className="text-left px-2 py-2 text-slate-700">Khóa ngoại</th>
                                        <th className="text-center px-2 py-2 text-slate-700">Xóa</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {formData.customFields.map((field, index) => (
                                        <tr key={field.id} className="border-t border-amber-200">
                                          <td className="px-2 py-2">
                                            <input
                                              type="text"
                                              value={field.name}
                                              onChange={(e) => {
                                                const updated = [...(formData.customFields || [])];
                                                updated[index] = { ...field, name: e.target.value };
                                                setFormData({ ...formData, customFields: updated });
                                              }}
                                              placeholder="Tên trường"
                                              className="w-full px-2 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            />
                                          </td>
                                          <td className="px-2 py-2">
                                            <select
                                              value={field.dataType}
                                              onChange={(e) => {
                                                const updated = [...(formData.customFields || [])];
                                                updated[index] = { ...field, dataType: e.target.value as FieldDataType };
                                                setFormData({ ...formData, customFields: updated });
                                              }}
                                              className="w-full px-2 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            >
                                              <option value="string">String</option>
                                              <option value="number">Number</option>
                                              <option value="date">Date</option>
                                              <option value="datetime">DateTime</option>
                                              <option value="boolean">Boolean</option>
                                              <option value="text">Text</option>
                                              <option value="email">Email</option>
                                              <option value="phone">Phone</option>
                                              <option value="url">URL</option>
                                            </select>
                                          </td>
                                          <td className="px-2 py-2">
                                            <input
                                              type="number"
                                              value={field.length || ''}
                                              onChange={(e) => {
                                                const updated = [...(formData.customFields || [])];
                                                updated[index] = { ...field, length: e.target.value ? parseInt(e.target.value) : undefined };
                                                setFormData({ ...formData, customFields: updated });
                                              }}
                                              placeholder="Độ dài"
                                              className="w-full px-2 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            />
                                          </td>
                                          <td className="px-2 py-2">
                                            <input
                                              type="text"
                                              value={field.defaultValue || ''}
                                              onChange={(e) => {
                                                const updated = [...(formData.customFields || [])];
                                                updated[index] = { ...field, defaultValue: e.target.value };
                                                setFormData({ ...formData, customFields: updated });
                                              }}
                                              placeholder="Giá trị mặc định"
                                              className="w-full px-2 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            />
                                          </td>
                                          <td className="px-2 py-2 text-center">
                                            <input
                                              type="checkbox"
                                              checked={field.isPrimaryKey}
                                              onChange={(e) => {
                                                const updated = [...(formData.customFields || [])];
                                                updated[index] = { ...field, isPrimaryKey: e.target.checked };
                                                setFormData({ ...formData, customFields: updated });
                                              }}
                                              className="rounded"
                                            />
                                          </td>
                                          <td className="px-2 py-2">
                                            <input
                                              type="text"
                                              value={field.foreignKey || ''}
                                              onChange={(e) => {
                                                const updated = [...(formData.customFields || [])];
                                                updated[index] = { ...field, foreignKey: e.target.value };
                                                setFormData({ ...formData, customFields: updated });
                                              }}
                                              placeholder="Bảng.Cột"
                                              className="w-full px-2 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            />
                                          </td>
                                          <td className="px-2 py-2 text-center">
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const updated = (formData.customFields || []).filter((_, i) => i !== index);
                                                setFormData({ ...formData, customFields: updated });
                                              }}
                                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                                            >
                                              <Trash2 className="w-3 h-3" />
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}

                            {(!formData.customFields || formData.customFields.length === 0) && (
                              <div className="text-center py-6 text-slate-500 text-sm">
                                Chưa có trường nào. Click "Thêm trường" để bắt đầu.
                              </div>
                            )}
                          </div>
                        )}

                        {/* Update Strategy */}
                        {formData.dataSource && formData.dataSource !== 'manual' && (
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <h5 className="text-sm text-slate-900 mb-3">Chiến lược cập nhật</h5>
                            
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm text-slate-700 mb-1">
                                  Loại cập nhật <span className="text-red-600">*</span>
                                </label>
                                <select
                                  value={formData.updateStrategy || 'reference'}
                                  onChange={(e) => setFormData({ ...formData, updateStrategy: e.target.value as UpdateStrategyType })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                >
                                  <option value="reference">Tham chiếu (Reference)</option>
                                  <option value="scheduled">Cập nhật định kỳ (Scheduled)</option>
                                  <option value="realtime">Thời gian thực (Realtime)</option>
                                </select>
                              </div>
                              
                              {formData.updateStrategy === 'scheduled' && (
                                <div>
                                  <label className="block text-sm text-slate-700 mb-1">
                                    Tần suất đồng bộ <span className="text-red-600">*</span>
                                  </label>
                                  <select
                                    value={formData.syncFrequency || 'daily'}
                                    onChange={(e) => setFormData({ ...formData, syncFrequency: e.target.value as SyncFrequencyType })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                  >
                                    <option value="daily">Hàng ngày</option>
                                    <option value="weekly">Hàng tuần</option>
                                    <option value="monthly">Hàng tháng</option>
                                    <option value="event">Theo sự kiện</option>
                                  </select>
                                </div>
                              )}
                            </div>

                            {/* Strategy Description */}
                            <div className="mt-3 text-xs text-slate-600 bg-slate-50 p-3 rounded">
                              {formData.updateStrategy === 'reference' && (
                                <p>🔗 <strong>Tham chiếu:</strong> Dữ liệu được truy vấn trực tiếp từ nguồn khi cần, không lưu bản sao cục bộ.</p>
                              )}
                              {formData.updateStrategy === 'scheduled' && (
                                <p>🕒 <strong>Cập nhật định kỳ:</strong> Dữ liệu được đồng bộ theo lịch trình cố định từ nguồn và lưu vào kho DLDC.</p>
                              )}
                              {formData.updateStrategy === 'realtime' && (
                                <p>⚡ <strong>Thời gian th��c:</strong> Dữ liệu được đồng bộ ngay lập tức khi có thay đổi từ hệ thống nguồn thông qua webhook hoặc event streaming.</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Metadata (if editing) */}
                      {editingEntity && (
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                          <div>
                            <label className="block text-sm text-slate-700 mb-1">
                              Ngày tạo <span className="text-slate-500">(tự động)</span>
                            </label>
                            <input
                              type="text"
                              value={editingEntity.createdDate}
                              disabled
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-slate-700 mb-1">
                              Cập nhật lần cuối <span className="text-slate-500">(tự động)</span>
                            </label>
                            <input
                              type="text"
                              value={editingEntity.updatedDate}
                              disabled
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 text-sm"
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-sm text-slate-700 mb-1">
                              Người tạo <span className="text-slate-500">(tự động)</span>
                            </label>
                            <input
                              type="text"
                              value={editingEntity.createdBy}
                              disabled
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 text-sm"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-2 p-6 border-t border-slate-200">
                      <button
                        onClick={handleCloseForm}
                        className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-sm"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleSaveDraft}
                        className="px-4 py-2 text-amber-700 bg-amber-50 border border-amber-300 rounded-lg hover:bg-amber-100 text-sm"
                      >
                        Lưu nháp
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        Lưu và gửi
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'attributes' && (
            <div className="space-y-4">
              {/* Entity Selector */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <label className="block text-sm text-slate-700 mb-2">
                  Chọn thực thể dữ liệu chủ <span className="text-red-600">*</span>
                </label>
                <select
                  value={selectedEntityForAttributes}
                  onChange={(e) => setSelectedEntityForAttributes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                >
                  {entities.map(entity => (
                    <option key={entity.id} value={entity.id}>
                      {entity.code} - {entity.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Summary and Add Button */}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-slate-600">Đang quản lý thuộc tính của: </span>
                  <span className="text-slate-900">
                    {entities.find(e => e.id === selectedEntityForAttributes)?.name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-slate-600">Tổng số thuộc tính: </span>
                    <span className="text-blue-600 text-lg">{attributes.length}</span>
                  </div>
                  <button
                    onClick={handleAddAttribute}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm thuộc tính
                  </button>
                </div>
              </div>

              {/* Attributes Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Tên trường</th>
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Tên hiển thị</th>
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Kiểu dữ liệu</th>
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Độ dài</th>
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Ràng buộc</th>
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Phiên bản</th>
                      <th className="text-right px-4 py-3 text-sm text-slate-700">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributes.map((attr) => (
                      <tr key={attr.id} className="border-t border-slate-200 hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm text-slate-900 font-mono">{attr.fieldName}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{attr.displayName}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{getDataTypeLabel(attr.dataType)}</td>
                        <td className="px-4 py-3 text-sm text-slate-600 text-center">
                          {attr.length || '-'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 flex-wrap">
                            {attr.required && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-red-100 text-red-700">
                                Bắt buộc
                              </span>
                            )}
                            {attr.unique && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-purple-100 text-purple-700">
                                Duy nhất
                              </span>
                            )}
                            {attr.indexed && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700">
                                Index
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-blue-600">
                          <div className="flex items-center gap-1">
                            <Circle className="w-3 h-3" />
                            v{attr.version}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditAttribute(attr)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteAttribute(attr.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Attribute Form Modal */}
              {showAttributeForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-6 border-b border-slate-200">
                      <h3 className="text-lg text-slate-900">
                        {editingAttribute ? 'Chỉnh sửa thuộc tính' : 'Thêm mới thuộc tính'}
                      </h3>
                      <button onClick={handleCloseAttributeForm} className="p-1 hover:bg-slate-100 rounded">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Field Name */}
                      <div>
                        <label className="block text-sm text-slate-700 mb-1">
                          Tên trường <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={attributeFormData.fieldName}
                          onChange={(e) => setAttributeFormData({ ...attributeFormData, fieldName: e.target.value })}
                          placeholder="VD: citizen_id"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                        />
                        <p className="text-xs text-slate-500 mt-1">Tên trường trong database (không dấu, chữ thường)</p>
                      </div>

                      {/* Display Name */}
                      <div>
                        <label className="block text-sm text-slate-700 mb-1">
                          Tên hiển thị <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={attributeFormData.displayName}
                          onChange={(e) => setAttributeFormData({ ...attributeFormData, displayName: e.target.value })}
                          placeholder="VD: Số CCCD"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>

                      {/* Data Type and Length */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-700 mb-1">
                            Kiểu dữ liệu <span className="text-red-600">*</span>
                          </label>
                          <select
                            value={attributeFormData.dataType}
                            onChange={(e) => setAttributeFormData({ ...attributeFormData, dataType: e.target.value as FieldDataType })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
                          <label className="block text-sm text-slate-700 mb-1">
                            Độ dài
                          </label>
                          <input
                            type="number"
                            value={attributeFormData.length || ''}
                            onChange={(e) => setAttributeFormData({ ...attributeFormData, length: e.target.value ? parseInt(e.target.value) : undefined })}
                            placeholder="VD: 255"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                      </div>

                      {/* Constraints */}
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">Ràng buộc</label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={attributeFormData.required}
                              onChange={(e) => setAttributeFormData({ ...attributeFormData, required: e.target.checked })}
                              className="rounded"
                            />
                            <span className="text-sm text-slate-700">Bắt buộc (Required)</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={attributeFormData.unique}
                              onChange={(e) => setAttributeFormData({ ...attributeFormData, unique: e.target.checked })}
                              className="rounded"
                            />
                            <span className="text-sm text-slate-700">Duy nhất (Unique)</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={attributeFormData.indexed}
                              onChange={(e) => setAttributeFormData({ ...attributeFormData, indexed: e.target.checked })}
                              className="rounded"
                            />
                            <span className="text-sm text-slate-700">Đánh index (Indexed)</span>
                          </label>
                        </div>
                      </div>

                      {/* Default Value */}
                      <div>
                        <label className="block text-sm text-slate-700 mb-1">
                          Giá trị mặc định
                        </label>
                        <input
                          type="text"
                          value={attributeFormData.defaultValue}
                          onChange={(e) => setAttributeFormData({ ...attributeFormData, defaultValue: e.target.value })}
                          placeholder="Để trống nếu không có"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>

                      {/* Validation Rules */}
                      <div>
                        <label className="block text-sm text-slate-700 mb-1">
                          Quy tắc xác thực
                        </label>
                        <input
                          type="text"
                          value={attributeFormData.validationRules}
                          onChange={(e) => setAttributeFormData({ ...attributeFormData, validationRules: e.target.value })}
                          placeholder="VD: regex:^[0-9]{12}$ hoặc enum:Nam,Nữ,Khác"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <p className="text-xs text-slate-500 mt-1">Sử dụng format: regex:pattern hoặc enum:value1,value2,value3</p>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm text-slate-700 mb-1">
                          Mô tả
                        </label>
                        <textarea
                          value={attributeFormData.description}
                          onChange={(e) => setAttributeFormData({ ...attributeFormData, description: e.target.value })}
                          placeholder="Mô tả chi tiết về thuộc tính này..."
                          rows={3}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 p-6 border-t border-slate-200">
                      <button
                        onClick={handleCloseAttributeForm}
                        className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-sm"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleSubmitAttribute}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        {editingAttribute ? 'Cập nhật' : 'Thêm mới'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'relationships' && (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-slate-900">Thiết lập quan hệ giữa thực thể</h3>
                  <p className="text-sm text-slate-600">Quản trị hệ thống chọn 2 thực thể và định nghĩa liên kết giữa chúng (1-n, n-n)</p>
                </div>
                <button
                  onClick={() => {
                    setEditingRelationship(null);
                    setShowRelationshipForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Thêm quan hệ mới
                </button>
              </div>

              {/* Relationships Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Thực thể nguồn</th>
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Loại quan hệ</th>
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Thực thể đích</th>
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Điều kiện liên kết</th>
                      <th className="text-left px-4 py-3 text-sm text-slate-700">Trạng thái</th>
                      <th className="text-right px-4 py-3 text-sm text-slate-700">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relationships.map((rel) => (
                      <tr key={rel.id} className="border-t border-slate-200 hover:bg-slate-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Circle className="w-2 h-2 text-blue-600 fill-blue-600" />
                            <span className="text-sm text-slate-900">{rel.sourceEntityName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-center">
                            <div className="text-purple-600 font-mono">{rel.relationshipType}</div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              {rel.relationshipType === 'n-n' ? `${rel.relationshipType} (N:Nối - N:Nối)` : `${rel.relationshipType} (Một - Nhiều)`}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Circle className="w-2 h-2 text-green-600 fill-green-600" />
                            <span className="text-sm text-slate-900">{rel.targetEntityName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm space-y-1">
                            {rel.mappingTable && (
                              <div className="text-purple-600">
                                <span className="text-slate-600">Bảng:</span> {rel.mappingTable}
                              </div>
                            )}
                            {rel.sourceKey && (
                              <div className="text-slate-600">
                                <span className="text-slate-500">Khóa PK:</span> {rel.sourceKey}
                              </div>
                            )}
                            {rel.targetKey && (
                              <div className="text-slate-600">
                                → {rel.targetKey}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                            rel.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {rel.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingRelationship(rel);
                                setShowRelationshipForm(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Bạn có chắc chắn muốn xóa quan hệ này?')) {
                                  setRelationships(relationships.filter(r => r.id !== rel.id));
                                }
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {relationships.length === 0 && (
                <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-lg">
                  <Link2 className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                  <p>Chưa có quan hệ nào được thiết lập</p>
                </div>
              )}
            </div>
          )}

          {/* Relationship Form Modal */}
          {showRelationshipForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                  <h3 className="text-slate-900">Thêm quan hệ thực thể mới</h3>
                  <button
                    onClick={() => setShowRelationshipForm(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form Content */}
                <div className="p-6 space-y-6">
                  {/* Chọn thực thể liên kết */}
                  <div className="space-y-4">
                    <h4 className="text-slate-900">Chọn thực thể liên kết</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-slate-700">
                          Thực thể nguồn <span className="text-red-500">*</span>
                        </label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                          <option>-- Chọn thực thể nguồn --</option>
                          <option>Bộ dữ liệu chủ Công dân</option>
                          <option>Bộ dữ liệu chủ Tổ chức</option>
                          <option>Bộ dữ liệu chủ Văn bản pháp luật</option>
                          <option>Bộ dữ liệu chủ Cơ quan ban hành</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-slate-700">
                          Thực thể đích <span className="text-red-500">*</span>
                        </label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                          <option>-- Chọn thực thể đích --</option>
                          <option>Bộ dữ liệu chủ Công dân</option>
                          <option>Bộ dữ liệu chủ Tổ chức</option>
                          <option>Bộ dữ liệu chủ Văn bản pháp luật</option>
                          <option>Bộ dữ liệu chủ Cơ quan ban hành</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Loại quan hệ */}
                  <div className="space-y-4">
                    <h4 className="text-slate-900">Loại quan hệ</h4>
                    <div className="space-y-2">
                      <label className="text-sm text-slate-700">
                        Chọn loại quan hệ <span className="text-red-500">*</span>
                      </label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <option value="1-n">1 - n (Một - Nhiều)</option>
                        <option value="n-1">n - 1 (Nhiều - Một)</option>
                        <option value="n-n">n - n (Nhiều - Nhiều)</option>
                        <option value="1-1">1 - 1 (Một - Một)</option>
                      </select>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                        <p className="text-blue-900">
                          <span className="font-medium">1 - n:</span> Một bản ghi trong thực thể nguồn có thể liên kết với nhiều bản ghi trong thực thể đích.
                        </p>
                        <p className="text-blue-600 italic mt-1">
                          VD: Một cơ quan ban hành nhiều văn bản
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Điều kiện liên kết */}
                  <div className="space-y-4">
                    <h4 className="text-slate-900">Điều kiện liên kết</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
                      <div className="flex items-center gap-2 text-blue-700">
                        <Link2 className="w-4 h-4" />
                        <span className="text-sm">Cấu hình khóa ngoại (Foreign Key)</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm text-slate-700">
                            Khóa ngoại (Foreign Key) <span className="text-red-500">*</span>
                          </label>
                          <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white">
                            <option>-- Chọn trường --</option>
                            <option>citizen_id</option>
                            <option>organization_id</option>
                            <option>document_id</option>
                          </select>
                          <p className="text-xs text-slate-500">Trường trong thực thể nguồn</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-slate-700">
                            Khóa tham chiếu (Referenced Key) <span className="text-red-500">*</span>
                          </label>
                          <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white">
                            <option>-- Chọn trường --</option>
                            <option>id</option>
                            <option>code</option>
                            <option>reference_id</option>
                          </select>
                          <p className="text-xs text-slate-500">Trường trong thực thể đích</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mô tả quan hệ */}
                  <div className="space-y-2">
                    <h4 className="text-slate-900">Mô tả quan hệ</h4>
                    <textarea
                      rows={4}
                      placeholder="VD: Quan hệ giữa văn bản pháp luật và cơ quan ban hành"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
                  <button
                    onClick={() => setShowRelationshipForm(false)}
                    className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-sm"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => {
                      // Handle save relationship
                      setShowRelationshipForm(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    <Save className="w-4 h-4" />
                    Lưu quan hệ
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'approval' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <h3 className="text-slate-900">Phê duyệt danh sách dữ liệu chủ</h3>
                <p className="text-sm text-slate-600">Lĩnh đạo nghiệp vụ xem xét và phê duyệt các bộ dữ liệu chủ chờ phê duyệt</p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-orange-700">Chờ phê duyệt</div>
                      <div className="text-3xl text-orange-600 mt-1">{approvalRequests.filter(r => r.type === 'category' && r.status === 'pending').length}</div>
                    </div>
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-green-700">Đã phê duyệt</div>
                      <div className="text-3xl text-green-600 mt-1">{approvalRequests.filter(r => r.type === 'category' && r.status === 'approved').length}</div>
                    </div>
                    <CheckSquare className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-red-700">Từ chối</div>
                      <div className="text-3xl text-red-600 mt-1">{approvalRequests.filter(r => r.type === 'category' && r.status === 'rejected').length}</div>
                    </div>
                    <XCircle className="w-8 h-8 text-red-500" />
                  </div>
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-700">Trạng thái:</span>
                <button
                  onClick={() => setApprovalStatusFilter('all')}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    approvalStatusFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Tất cả ({approvalRequests.filter(r => r.type === 'category').length})
                </button>
                <button
                  onClick={() => setApprovalStatusFilter('pending')}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    approvalStatusFilter === 'pending'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Chờ phê duyệt ({approvalRequests.filter(r => r.type === 'category' && r.status === 'pending').length})
                </button>
                <button
                  onClick={() => setApprovalStatusFilter('approved')}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    approvalStatusFilter === 'approved'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Đã phê duyệt ({approvalRequests.filter(r => r.type === 'category' && r.status === 'approved').length})
                </button>
                <button
                  onClick={() => setApprovalStatusFilter('rejected')}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    approvalStatusFilter === 'rejected'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Từ chối ({approvalRequests.filter(r => r.type === 'category' && r.status === 'rejected').length})
                </button>
              </div>

              {/* Approval Requests List */}
              {filteredApprovalRequests.length > 0 ? (
                <div className="space-y-4">
                  {filteredApprovalRequests.map((request) => {
                    const entity = entities.find(e => e.id === request.entityId);
                    return (
                      <div key={request.id} className="border border-slate-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-slate-900">{request.entityName}</h4>
                              <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${approvalStatusLabels[request.status].color}`}>
                                {approvalStatusLabels[request.status].label}
                              </span>
                            </div>
                            <div className="text-sm text-slate-600">Mã: <span className="font-mono">{request.entityCode}</span></div>
                          </div>
                          <button
                            onClick={() => handleViewApproval(request)}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 bg-blue-50 rounded hover:bg-blue-100"
                          >
                            <Eye className="w-4 h-4" />
                            Xem chi tiết
                          </button>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-3 text-sm">
                          <div>
                            <span className="text-slate-600">Cơ quan quản lý:</span>{' '}
                            <span className="text-slate-900">{entity?.managingAgency || 'Cục Hộ tịch - Quốc tịch - Chứng thực'}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Loại dữ liệu:</span>{' '}
                            <span className="text-slate-900">{entity ? dataTypeLabels[entity.dataType] : 'Dữ liệu chuẩn'}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Ngày gửi:</span>{' '}
                            <span className="text-slate-900">{request.requestedDate}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Người gửi:</span>{' '}
                            <span className="text-slate-900">{request.requestedBy}</span>
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center gap-4 mb-3 text-xs text-slate-600 border-t border-slate-100 pt-3">
                          <span className="flex items-center gap-1">
                            <Circle className="w-3 h-3" /> 15 Thuộc tính
                          </span>
                          <span className="flex items-center gap-1">
                            <Circle className="w-3 h-3" /> 3 quy tắc hợp nhất
                          </span>
                          <span className="flex items-center gap-1">
                            <Circle className="w-3 h-3" /> 2 quan hệ
                          </span>
                          <span className="flex items-center gap-1">
                            <Check className="w-3 h-3" /> Có định danh
                          </span>
                        </div>

                        {/* Actions - Only for pending requests */}
                        {request.status === 'pending' && (
                          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                            <button
                              onClick={() => handleOpenApprovalModal(request)}
                              className="flex items-center gap-1.5 px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                            >
                              <XCircle className="w-4 h-4" />
                              Từ chối
                            </button>
                            <button
                              onClick={() => handleOpenApprovalModal(request)}
                              className="flex items-center gap-1.5 px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700"
                            >
                              <CheckSquare className="w-4 h-4" />
                              Phê duyệt
                            </button>
                          </div>
                        )}

                        {/* Review History Link - for reviewed requests */}
                        {request.status !== 'pending' && (
                          <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                            <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                              <ChevronDown className="w-4 h-4" />
                              Lịch sử cập nhật (1)
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-lg">
                  <CheckSquare className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                  <p>Không có yêu cầu phê duyệt nào</p>
                </div>
              )}

              {/* Approval Detail Modal */}
              {showApprovalDetail && selectedApproval && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-6 border-b border-slate-200">
                      <h3 className="text-lg text-slate-900">Chi tiết yêu cầu phê duyệt</h3>
                      <button onClick={() => setShowApprovalDetail(false)} className="p-1 hover:bg-slate-100 rounded">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Request Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-700 mb-1">Mã danh mục</label>
                          <div className="text-sm text-slate-900 font-mono bg-slate-50 px-3 py-2 rounded">
                            {selectedApproval.entityCode}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-slate-700 mb-1">Tên danh mục</label>
                          <div className="text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded">
                            {selectedApproval.entityName}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-slate-700 mb-1">Loại yêu cầu</label>
                          <div className="text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded">
                            {approvalTypeLabels[selectedApproval.type]}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-slate-700 mb-1">Trạng thái</label>
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${approvalStatusLabels[selectedApproval.status].color}`}>
                            {approvalStatusLabels[selectedApproval.status].label}
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm text-slate-700 mb-1">Người yêu cầu</label>
                          <div className="text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded">
                            {selectedApproval.requestedBy}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-slate-700 mb-1">Ngày yêu cầu</label>
                          <div className="text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded">
                            {selectedApproval.requestedDate}
                          </div>
                        </div>
                      </div>

                      {/* Entity Details */}
                      {(() => {
                        const entity = entities.find(e => e.id === selectedApproval.entityId);
                        if (!entity) return null;
                        
                        return (
                          <div className="border-t border-slate-200 pt-4">
                            <h4 className="text-sm text-slate-900 mb-3">Thông tin danh mục</h4>
                            <div className="space-y-3 bg-slate-50 p-4 rounded-lg">
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <span className="text-slate-600">Loại dữ liệu:</span>{' '}
                                  <span className="text-slate-900">{dataTypeLabels[entity.dataType]}</span>
                                </div>
                                <div>
                                  <span className="text-slate-600">Phạm vi:</span>{' '}
                                  <span className="text-slate-900">{scopeLabels[entity.scope]}</span>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-slate-600">Cơ quan quản lý:</span>{' '}
                                  <span className="text-slate-900">{entity.managingAgency}</span>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-slate-600">Mô tả:</span>{' '}
                                  <span className="text-slate-900">{entity.description}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Comments field for review */}
                      {selectedApproval.status === 'pending' && (
                        <div className="border-t border-slate-200 pt-4">
                          <label className="block text-sm text-slate-700 mb-2">Ý kiến phê duyệt</label>
                          <textarea
                            id="approval-comments"
                            placeholder="Nhập ý kiến của bạn..."
                            rows={3}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                      )}

                      {/* Review Info (if already reviewed) */}
                      {selectedApproval.status !== 'pending' && selectedApproval.reviewedBy && (
                        <div className="border-t border-slate-200 pt-4">
                          <h4 className="text-sm text-slate-900 mb-3">Thông tin phê duyệt</h4>
                          <div className="space-y-2 bg-slate-50 p-4 rounded-lg text-sm">
                            <div>
                              <span className="text-slate-600">Người phê duyệt:</span>{' '}
                              <span className="text-slate-900">{selectedApproval.reviewedBy}</span>
                            </div>
                            <div>
                              <span className="text-slate-600">Ngày phê duyệt:</span>{' '}
                              <span className="text-slate-900">{selectedApproval.reviewedDate}</span>
                            </div>
                            {selectedApproval.comments && (
                              <div>
                                <span className="text-slate-600">Ý kiến:</span>{' '}
                                <span className="text-slate-900">{selectedApproval.comments}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    {selectedApproval.status === 'pending' && (
                      <div className="flex justify-end gap-2 p-6 border-t border-slate-200">
                        <button
                          onClick={() => {
                            const comments = (document.getElementById('approval-comments') as HTMLTextAreaElement)?.value;
                            handleReject(selectedApproval.id, comments);
                          }}
                          className="px-4 py-2 text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 text-sm"
                        >
                          Từ chối
                        </button>
                        <button
                          onClick={() => {
                            const comments = (document.getElementById('approval-comments') as HTMLTextAreaElement)?.value;
                            handleApprove(selectedApproval.id, comments);
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                        >
                          Phê duyệt
                        </button>
                      </div>
                    )}

                    {selectedApproval.status !== 'pending' && (
                      <div className="flex justify-end gap-2 p-6 border-t border-slate-200">
                        <button
                          onClick={() => setShowApprovalDetail(false)}
                          className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-sm"
                        >
                          Đóng
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Approval Modal */}
              {showApprovalModal && selectedApprovalRequest && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg w-full max-w-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                      <h3 className="text-slate-900">Phê duyệt yêu cầu</h3>
                      <button
                        onClick={() => {
                          setShowApprovalModal(false);
                          setSelectedApprovalRequest(null);
                          setApprovalComment('');
                        }}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                      {/* Thông tin yêu cầu */}
                      <div className="space-y-4">
                        <h4 className="text-slate-900">Thông tin yêu cầu</h4>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-slate-600">Loại yêu cầu:</span>{' '}
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 ml-2">
                                {selectedApprovalRequest.type === 'category' && 'Danh mục mới'}
                                {selectedApprovalRequest.type === 'structure' && 'Cấu trúc'}
                                {selectedApprovalRequest.type === 'deactivation' && 'Ngừng hoạt động'}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-600">Mã danh mục:</span>{' '}
                              <span className="text-slate-900">{selectedApprovalRequest.entityCode}</span>
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="text-slate-600">Tên danh mục:</span>{' '}
                            <span className="text-slate-900">{selectedApprovalRequest.entityName}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-slate-600">Người yêu cầu:</span>{' '}
                              <span className="text-slate-900">{selectedApprovalRequest.requestedBy}</span>
                            </div>
                            <div>
                              <span className="text-slate-600">Ngày yêu cầu:</span>{' '}
                              <span className="text-slate-900">{selectedApprovalRequest.requestedDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Nội dung phê duyệt */}
                      <div className="space-y-3">
                        <h4 className="text-slate-900">Nội dung phê duyệt</h4>
                        <div className="space-y-2">
                          <label className="text-sm text-slate-700">
                            Ý kiến phê duyệt <span className="text-slate-500">(không bắt buộc)</span>
                          </label>
                          <textarea
                            value={approvalComment}
                            onChange={(e) => setApprovalComment(e.target.value)}
                            rows={4}
                            placeholder="Nhập ý kiến phê duyệt của bạn..."
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                          />
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-900">
                            <span className="font-medium">Lưu ý:</span> Sau khi phê duyệt, danh mục sẽ được kích hoạt và có thể sử dụng trong hệ thống.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
                      <button
                        onClick={() => {
                          setShowApprovalModal(false);
                          setSelectedApprovalRequest(null);
                          setApprovalComment('');
                        }}
                        className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-sm"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={() => handleReject(selectedApprovalRequest.id, approvalComment)}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 text-sm"
                      >
                        <XCircle className="w-4 h-4" />
                        Từ chối
                      </button>
                      <button
                        onClick={() => handleApprove(selectedApprovalRequest.id, approvalComment)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                      >
                        <CheckSquare className="w-4 h-4" />
                        Phê duyệt
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Submit for Approval Modal */}
      {showSubmitApprovalModal && entityToSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Send className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg text-slate-900">Gửi yêu cầu phê duyệt</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Mã dữ liệu chủ</div>
                  <div className="text-slate-900 font-mono">{entityToSubmit.code}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Loại yêu cầu</div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
                    {submitApprovalType === 'category' ? 'Phê duyệt danh mục' : 
                     submitApprovalType === 'structure' ? 'Phê duyệt cấu trúc' : 
                     'Phê duyệt hết hiệu lực'}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-sm text-slate-500 mb-1">Tên dữ liệu chủ</div>
                <div className="text-slate-900">{entityToSubmit.name}</div>
              </div>

              <div>
                <div className="text-sm text-slate-500 mb-1">Mô tả</div>
                <div className="text-slate-900">{entityToSubmit.description}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Loại dữ liệu</div>
                  <div className="text-slate-900">{dataTypeLabels[entityToSubmit.dataType]}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Cơ quan quản lý</div>
                  <div className="text-slate-900">{entityToSubmit.managingAgency}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Phạm vi</div>
                  <div className="text-slate-900">{scopeLabels[entityToSubmit.scope]}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Trạng thái</div>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${lifecycleLabels[entityToSubmit.lifecycleStatus].color}`}>
                    {lifecycleLabels[entityToSubmit.lifecycleStatus].label}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <label className="block text-sm text-slate-700 mb-1.5">
                  Người phê duyệt <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedApprover}
                  onChange={(e) => setSelectedApprover(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">-- Chọn người phê duyệt --</option>
                  {approvers.map(approver => (
                    <option key={approver.id} value={approver.id}>
                      {approver.name} - {approver.position} ({approver.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1.5">
                  Ghi chú
                </label>
                <textarea
                  value={approvalNote}
                  onChange={(e) => setApprovalNote(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Nhập ghi chú (nếu có)"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleConfirmSubmitApproval}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Gửi yêu cầu phê duyệt
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSubmitApprovalModal(false);
                    setEntityToSubmit(null);
                    setSelectedApprover('');
                    setApprovalNote('');
                  }}
                  className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'version-history' && (
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo phiên bản, danh mục, người thay đổi..."
                  value={versionSearchTerm}
                  onChange={(e) => setVersionSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Từ ngày</label>
                  <input
                    type="date"
                    value={versionStartDate}
                    onChange={(e) => setVersionStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Đến ngày</label>
                  <input
                    type="date"
                    value={versionEndDate}
                    onChange={(e) => setVersionEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Loại thay đổi</label>
                  <select
                    value={versionChangeTypeFilter}
                    onChange={(e) => setVersionChangeTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tất cả</option>
                    <option value="Cấu trúc">Cấu trúc</option>
                    <option value="Dữ liệu">Dữ liệu</option>
                    <option value="Mối quan hệ">Mối quan hệ</option>
                    <option value="Quy tắc">Quy tắc</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Trạng thái</label>
                  <select
                    value={versionStatusFilter}
                    onChange={(e) => setVersionStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tất cả</option>
                    <option value="active">Đang dùng</option>
                    <option value="archived">Lưu trữ</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Version History Table */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-slate-600">Phiên bản</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600">Ngày thay đổi</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600">Người thay đổi</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600">Danh mục</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600">Loại thay đổi</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600">Nội dung thay đổi</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600">Trạng thái</th>
                    <th className="px-4 py-3 text-center text-xs text-slate-600">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    {
                      version: 'v4.1',
                      date: '05/01/2026',
                      user: 'Nguyễn Văn A',
                      category: 'Bộ dữ liệu chủ Công dân',
                      changeType: 'Cấu trúc',
                      changes: 'Thêm trường "Địa chỉ email"',
                      status: 'active'
                    },
                    {
                      version: 'v4.0',
                      date: '28/12/2025',
                      user: 'Trần Thị B',
                      category: 'Bộ dữ liệu chủ Tổ chức',
                      changeType: 'Dữ liệu',
                      changes: 'Cập nhật 120 doanh nghiệp mới',
                      status: 'archived'
                    },
                    {
                      version: 'v3.5',
                      date: '20/12/2025',
                      user: 'Lê Văn C',
                      category: 'Bộ dữ liệu chủ Văn bản pháp luật',
                      changeType: 'Cấu trúc',
                      changes: 'Điều chỉnh thuộc tính "Ngày hiệu lực"',
                      status: 'archived'
                    },
                    {
                      version: 'v3.2',
                      date: '15/12/2025',
                      user: 'Phạm Thị D',
                      category: 'Bộ dữ liệu chủ Đơn vị hành chính',
                      changeType: 'Mối quan hệ',
                      changes: 'Thêm quan hệ với Bộ dữ liệu Công dân',
                      status: 'archived'
                    },
                    {
                      version: 'v3.0',
                      date: '10/12/2025',
                      user: 'Hoàng Văn E',
                      category: 'Bộ dữ liệu chủ Cơ quan nhà nước',
                      changeType: 'Quy tắc',
                      changes: 'Thêm ràng buộc unique cho mã cơ quan',
                      status: 'archived'
                    },
                    {
                      version: 'v2.8',
                      date: '01/12/2025',
                      user: 'Nguyễn Văn A',
                      category: 'Bộ dữ liệu chủ Công dân',
                      changeType: 'Dữ liệu',
                      changes: 'Import 500,000 bản ghi từ CCCD',
                      status: 'archived'
                    },
                    {
                      version: 'v2.5',
                      date: '25/11/2025',
                      user: 'Trần Thị B',
                      category: 'Bộ dữ liệu chủ Tổ chức',
                      changeType: 'Cấu trúc',
                      changes: 'Thêm trường "Mã số thuế"',
                      status: 'archived'
                    }
                  ].filter(history => {
                    const searchLower = versionSearchTerm.toLowerCase();
                    const matchesSearch = versionSearchTerm === '' || 
                           history.version.toLowerCase().includes(searchLower) ||
                           history.category.toLowerCase().includes(searchLower) ||
                           history.user.toLowerCase().includes(searchLower) ||
                           history.changes.toLowerCase().includes(searchLower);
                    
                    // Filter by date range
                    let matchesDate = true;
                    if (versionStartDate || versionEndDate) {
                      // Convert date format from DD/MM/YYYY to YYYY-MM-DD for comparison
                      const [day, month, year] = history.date.split('/');
                      const historyDate = `${year}-${month}-${day}`;
                      
                      if (versionStartDate && historyDate < versionStartDate) {
                        matchesDate = false;
                      }
                      if (versionEndDate && historyDate > versionEndDate) {
                        matchesDate = false;
                      }
                    }
                    
                    // Filter by change type
                    const matchesChangeType = versionChangeTypeFilter === 'all' || history.changeType === versionChangeTypeFilter;
                    
                    // Filter by status
                    const matchesStatus = versionStatusFilter === 'all' || history.status === versionStatusFilter;
                    
                    return matchesSearch && matchesDate && matchesChangeType && matchesStatus;
                  }).map((history, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm text-slate-900">{history.version}</td>
                      <td className="px-4 py-3 text-sm text-slate-900">{history.date}</td>
                      <td className="px-4 py-3 text-sm text-slate-900">{history.user}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{history.category}</td>
                      <td className="px-4 py-3">
                        {history.changeType === 'Cấu trúc' && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            Cấu trúc
                          </span>
                        )}
                        {history.changeType === 'Dữ liệu' && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            Dữ liệu
                          </span>
                        )}
                        {history.changeType === 'Mối quan hệ' && (
                          <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
                            Mối quan hệ
                          </span>
                        )}
                        {history.changeType === 'Quy tắc' && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                            Quy tắc
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700">{history.changes}</td>
                      <td className="px-4 py-3">
                        {history.status === 'active' ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            Đang dùng
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                            Lưu trữ
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {history.status === 'archived' && (
                            <button
                              onClick={() => handleRestoreVersion(history)}
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                              title="Khôi phục phiên bản"
                            >
                              <Clock className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            className="p-1 text-slate-600 hover:bg-slate-50 rounded"
                            title="Tải xuống"
                          >
                            <Download className="w-4 h-4" />
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

      {/* Restore Version Modal */}
      {showRestoreModal && versionToRestore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg text-slate-900">Phục hồi phiên bản</h3>
              <button
                onClick={() => {
                  setShowRestoreModal(false);
                  setVersionToRestore(null);
                  setSelectedApprover('');
                  setApprovalNote('');
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm text-blue-900 mb-1">Thông tin phiên bản cần phục hồi</div>
                    <div className="text-sm text-blue-700">
                      <strong>Phiên bản:</strong> {versionToRestore.version} ({versionToRestore.date})<br/>
                      <strong>Danh mục:</strong> {versionToRestore.category}<br/>
                      <strong>Loại thay đổi:</strong> {versionToRestore.changeType}<br/>
                      <strong>Nội dung:</strong> {versionToRestore.changes}<br/>
                      <strong>Người tạo:</strong> {versionToRestore.user}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="text-sm text-slate-700 mb-1">Chọn người phê duyệt <span className="text-red-500">*</span></div>
                <select
                  value={selectedApprover}
                  onChange={(e) => setSelectedApprover(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">-- Chọn người phê duyệt --</option>
                  {approvers.map(approver => (
                    <option key={approver.id} value={approver.id}>
                      {approver.name} - {approver.position} ({approver.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="text-sm text-slate-700 mb-1">Ghi chú</div>
                <textarea
                  value={approvalNote}
                  onChange={(e) => setApprovalNote(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Nhập lý do phục hồi phiên bản này..."
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleConfirmRestore}
                  className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Gửi yêu cầu phục hồi
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRestoreModal(false);
                    setVersionToRestore(null);
                    setSelectedApprover('');
                    setApprovalNote('');
                  }}
                  className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Publish Modal */}
      {showPublishModal && entityToPublish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h3 className="text-lg text-slate-900">Công khai danh mục</h3>
                <p className="text-sm text-slate-500 mt-1">Xác nhận công khai danh mục ra ngoài</p>
              </div>
              <button
                onClick={() => {
                  setShowPublishModal(false);
                  setEntityToPublish(null);
                  setPublishNote('');
                }}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Entity Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm text-blue-900 mb-2">
                  <strong>Thông tin danh mục:</strong>
                </div>
                <div className="text-sm text-blue-700 space-y-1">
                  <div><strong>Mã:</strong> {entityToPublish.code}</div>
                  <div><strong>Tên:</strong> {entityToPublish.name}</div>
                  <div><strong>Loại:</strong> {dataTypeLabels[entityToPublish.dataType]}</div>
                  <div><strong>Cơ quan quản lý:</strong> {entityToPublish.managingAgency}</div>
                  <div><strong>Phạm vi:</strong> {scopeLabels[entityToPublish.scope]}</div>
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Ghi chú công khai <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={publishNote}
                  onChange={(e) => setPublishNote(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows={4}
                  placeholder="Nhập nội dung ghi chú, mục đích công khai danh mục này..."
                />
              </div>

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <strong>Lưu ý:</strong> Sau khi công khai, danh mục sẽ được chia sẻ và có thể được truy cập từ các hệ thống bên ngoài. Vui lòng kiểm tra kỹ thông tin trước khi công khai.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-6 border-t border-slate-200">
              <button
                onClick={() => {
                  setShowPublishModal(false);
                  setEntityToPublish(null);
                  setPublishNote('');
                }}
                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmPublish}
                className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Xác nhận công khai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unpublish Modal */}
      {showUnpublishModal && entityToUnpublish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h3 className="text-lg text-slate-900">Hủy công khai danh mục</h3>
                <p className="text-sm text-slate-500 mt-1">Xác nhận hủy công khai danh mục</p>
              </div>
              <button
                onClick={() => {
                  setShowUnpublishModal(false);
                  setEntityToUnpublish(null);
                  setUnpublishNote('');
                }}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Entity Info */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-sm text-red-900 mb-2">
                  <strong>Thông tin danh mục:</strong>
                </div>
                <div className="text-sm text-red-700 space-y-1">
                  <div><strong>Mã:</strong> {entityToUnpublish.code}</div>
                  <div><strong>Tên:</strong> {entityToUnpublish.name}</div>
                  <div><strong>Loại:</strong> {dataTypeLabels[entityToUnpublish.dataType]}</div>
                  <div><strong>Cơ quan quản lý:</strong> {entityToUnpublish.managingAgency}</div>
                  <div><strong>Phạm vi:</strong> {scopeLabels[entityToUnpublish.scope]}</div>
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Lý do hủy công khai <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={unpublishNote}
                  onChange={(e) => setUnpublishNote(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  rows={4}
                  placeholder="Nhập lý do hủy công khai danh mục này (vi phạm quy định, thông tin không chính xác, yêu cầu từ cấp trên...)..."
                />
              </div>

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <strong>Lưu ý:</strong> Sau khi hủy công khai, danh mục sẽ không còn được chia sẻ và truy cập từ các hệ thống bên ngoài. Các dịch vụ đang sử dụng danh mục này có thể bị ảnh hưởng.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-6 border-t border-slate-200">
              <button
                onClick={() => {
                  setShowUnpublishModal(false);
                  setEntityToUnpublish(null);
                  setUnpublishNote('');
                }}
                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmUnpublish}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Xác nhận hủy công khai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && entityToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            {/* Header - Red */}
            <div className="flex items-center gap-3 p-6 bg-red-600 text-white rounded-t-lg">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-medium">Xác nhận xóa</h3>
            </div>

            <div className="p-6 space-y-4">
              {/* Entity Info */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
                <div className="text-sm">
                  <span className="text-slate-600">Mã danh mục:</span>
                  <span className="ml-2 text-slate-900 font-medium">{entityToDelete.code}</span>
                </div>
                <div className="text-sm">
                  <span className="text-slate-600">Tên danh mục:</span>
                  <span className="ml-2 text-slate-900 font-medium">{entityToDelete.name}</span>
                </div>
                {entityToDelete.apiEndpoint && (
                  <div className="text-sm">
                    <span className="text-slate-600">Endpoint:</span>
                    <span className="ml-2 text-slate-900 font-medium">{entityToDelete.apiEndpoint}</span>
                  </div>
                )}
              </div>

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800 space-y-2">
                    <p className="font-medium">Cảnh báo: Hành động này không thể hoàn tác!</p>
                    <p>Sau khi xóa, danh mục và toàn bộ dữ liệu liên quan sẽ bị xóa vĩnh viễn khỏi hệ thống.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 p-6 border-t border-slate-200">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setEntityToDelete(null);
                }}
                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}