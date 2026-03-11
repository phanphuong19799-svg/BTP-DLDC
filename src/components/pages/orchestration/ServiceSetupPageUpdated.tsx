import { useState } from 'react';
import { Plus, Search, Server, Eye, Edit, Trash2, CheckCircle, XCircle, Settings as SettingsIcon, Database, Globe, X, Save, EyeOff, Eye as EyeIcon, FileCheck, FileText, Shield, GitBranch, Clock, AlertCircle, User, Lock, Share, Wifi, FolderOpen, Mail, MessageSquare, BarChart3, TrendingUp } from 'lucide-react';
import { MonitoringPage } from './MonitoringPage';
import { GrantPermissionModal } from '../../GrantPermissionModal';

interface Service {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'REST' | 'SOAP' | 'GraphQL';
  status: 'active' | 'inactive' | 'maintenance' | 'pending';
  endpoint: string;
  version: string;
  department: string;
  createdDate: string;
  lastModified: string;
  visibility?: 'public' | 'private'; // Phân loại: Công khai / Không công khai
  maxRequestsPerDay?: number;
  baseUrl?: string;
  httpMethod?: string;
  contentType?: string;
  authType?: string;
  username?: string;
  password?: string;
  apiKey?: string;
  headerName?: string;
  unitCode?: string;
  systemCode?: string;
  isActive?: boolean;
  assignedUnits?: string[]; // Danh sách đơn vị được cấp quyền
  accessStartDate?: string; // Ngày bắt đầu truy cập
}

interface ApprovalRequest {
  id: string;
  apiCode: string;
  apiName: string;
  requestType: 'publish' | 'update' | 'delete';
  submitter: string;
  submitDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewer?: string;
  reviewDate?: string;
  note?: string;
}

interface LogEntry {
  id: string;
  apiCode: string;
  apiName: string;
  action: string;
  user: string;
  timestamp: string;
  ip: string;
  details: string;
  status: 'success' | 'failed';
}

interface Permission {
  id: string;
  apiCode: string;
  apiName: string;
  user: string;
  organization: string;
  accessType: 'read' | 'write' | 'admin';
  grantDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'revoked';
}

interface ApiVersion {
  id: string;
  apiCode: string;
  apiName: string;
  version: string;
  status: 'current' | 'deprecated' | 'retired';
  releaseDate: string;
  endOfLife?: string;
  changelog: string;
  breakingChanges: boolean;
}

interface ApprovalHistory {
  id: string;
  serviceCode: string;
  approvalType: 'service' | 'public'; // Duyệt dịch vụ hoặc Duyệt công khai
  action: 'approved' | 'rejected' | 'pending';
  approver: string;
  approverRole: string;
  timestamp: string;
  note?: string;
  decision?: 'approve' | 'reject' | 'request-change';
}

interface Header {
  key: string;
  value: string;
}

interface QueryParam {
  key: string;
  value: string;
}

interface ServiceForm {
  serviceName: string;
  serviceCode: string;
  dataType: string;
  frequency: string;
  protocol: string;
  accessScope: string;
  sharingPolicy: string;
  description: string;
  category: string;
  selectedTable: string;
  selectedFields: string[];
  visibility?: string; // Phân loại: Công khai / Không công khai
}

const mockServices: Service[] = [
  {
    id: '1',
    code: 'SVC001',
    name: 'Dịch vụ A',
    description: 'API cung cấp dịch vụ A',
    type: 'REST',
    status: 'active',
    endpoint: 'https://api.moj.gov.vn/service-a/v1',
    version: 'v1.2.3',
    department: 'Đơn vị A',
    createdDate: '15/01/2024',
    lastModified: '05/12/2024',
    visibility: 'public',
    maxRequestsPerDay: 10000,
    assignedUnits: ['Đơn vị a', 'Đơn vị b'],
    accessStartDate: '01/01/2024'
  },
  {
    id: '2',
    code: 'SVC002',
    name: 'Dịch vụ B',
    description: 'API cung cấp dịch vụ B',
    type: 'REST',
    status: 'pending',
    endpoint: 'https://api.moj.gov.vn/service-b/v2',
    version: 'v2.1.8',
    department: 'Đơn vị B',
    createdDate: '20/02/2024',
    lastModified: '10/12/2024',
    visibility: 'private',
    maxRequestsPerDay: 50000,
    assignedUnits: ['Đơn vị c'],
    accessStartDate: '15/02/2024'
  },
  {
    id: '3',
    code: 'SVC003',
    name: 'Dịch vụ C',
    description: 'API cung cấp dịch vụ C',
    type: 'SOAP',
    status: 'maintenance',
    endpoint: 'https://api.moj.gov.vn/service-c/v1',
    version: 'v1.0.5',
    department: 'Đơn vị C',
    createdDate: '10/03/2024',
    lastModified: '08/12/2024',
    visibility: 'private',
    maxRequestsPerDay: 5000,
    assignedUnits: [],
    accessStartDate: '01/03/2024'
  },
];

const mockApprovals: ApprovalRequest[] = [
  {
    id: 'APR001',
    apiCode: 'API001',
    apiName: 'API tra cứu thông tin công dân',
    requestType: 'publish',
    submitter: 'Nguyễn Văn A',
    submitDate: '15/12/2024 10:30',
    status: 'pending',
    note: 'Yêu cầu công bố API mới để cung cấp cho các đơn vị địa phương'
  },
  {
    id: 'APR002',
    apiCode: 'API002',
    apiName: 'API nhận dữ liệu đăng ký kinh doanh',
    requestType: 'update',
    submitter: 'Trần Thị B',
    submitDate: '14/12/2024 14:20',
    status: 'approved',
    reviewer: 'Lê Văn C',
    reviewDate: '15/12/2024 09:15',
    note: 'Cập nhật endpoint và thêm trường mới'
  },
  {
    id: 'APR003',
    apiCode: 'API005',
    apiName: 'API nhận yêu cầu trợ giúp pháp lý',
    requestType: 'delete',
    submitter: 'Phạm Văn D',
    submitDate: '13/12/2024 16:45',
    status: 'rejected',
    reviewer: 'Hoàng Thị E',
    reviewDate: '14/12/2024 10:00',
    note: 'API đang được sử dụng bởi nhiều đơn vị, không thể xóa'
  }
];

const mockLogs: LogEntry[] = [
  {
    id: 'LOG001',
    apiCode: 'API001',
    apiName: 'API tra cứu thông tin công dân',
    action: 'API Call',
    user: 'system@dldc.gov.vn',
    timestamp: '17/12/2024 14:35:22',
    ip: '192.168.1.105',
    details: 'Truy vấn thành công - 1 bản ghi',
    status: 'success'
  },
  {
    id: 'LOG002',
    apiCode: 'API002',
    apiName: 'API nhận dữ liệu đăng ký kinh doanh',
    action: 'Configuration Update',
    user: 'admin@dldc.gov.vn',
    timestamp: '17/12/2024 14:30:15',
    ip: '10.0.0.50',
    details: 'Cập nhật endpoint từ /v1 sang /v2',
    status: 'success'
  },
  {
    id: 'LOG003',
    apiCode: 'API003',
    apiName: 'API cập nhật thông tin văn bản pháp luật',
    action: 'API Call',
    user: 'external@partner.vn',
    timestamp: '17/12/2024 14:25:48',
    ip: '203.162.10.25',
    details: 'Xác thực thất bại - API Key không hợp lệ',
    status: 'failed'
  },
  {
    id: 'LOG004',
    apiCode: 'API001',
    apiName: 'API tra cứu thông tin công dân',
    action: 'Permission Grant',
    user: 'admin@dldc.gov.vn',
    timestamp: '17/12/2024 14:20:10',
    ip: '10.0.0.50',
    details: 'Cấp quyền đọc cho user@local.gov.vn',
    status: 'success'
  },
  {
    id: 'LOG005',
    apiCode: 'API006',
    apiName: 'API xuất dữ liệu báo cáo thống kê',
    action: 'API Call',
    user: 'report@ministry.gov.vn',
    timestamp: '17/12/2024 14:15:33',
    ip: '172.16.0.100',
    details: 'Xuất báo cáo - 15,234 bản ghi',
    status: 'success'
  }
];

const mockPermissions: Permission[] = [
  {
    id: 'PERM001',
    apiCode: 'API001',
    apiName: 'API tra cứu thông tin công dân',
    user: 'user1@local.gov.vn',
    organization: 'Sở Tư pháp Hà Nội',
    accessType: 'read',
    grantDate: '01/01/2024',
    expiryDate: '31/12/2024',
    status: 'active'
  },
  {
    id: 'PERM002',
    apiCode: 'API001',
    apiName: 'API tra cứu thông tin công dân',
    user: 'admin@central.gov.vn',
    organization: 'Bộ Tư pháp',
    accessType: 'admin',
    grantDate: '01/01/2024',
    expiryDate: '31/12/2025',
    status: 'active'
  },
  {
    id: 'PERM003',
    apiCode: 'API002',
    apiName: 'API nhận dữ liệu đăng ký kinh doanh',
    user: 'partner@external.vn',
    organization: 'Đối tác bên ngoài',
    accessType: 'write',
    grantDate: '01/06/2024',
    expiryDate: '30/11/2024',
    status: 'expired'
  },
  {
    id: 'PERM004',
    apiCode: 'API003',
    apiName: 'API cập nhật thông tin văn bản pháp luật',
    user: 'legal@department.gov.vn',
    organization: 'Vụ Pháp luật',
    accessType: 'write',
    grantDate: '15/03/2024',
    expiryDate: '15/03/2025',
    status: 'active'
  },
  {
    id: 'PERM005',
    apiCode: 'API005',
    apiName: 'API nhận yêu cầu trợ giúp pháp lý',
    user: 'aid@center.gov.vn',
    organization: 'Trung tâm TGPL',
    accessType: 'read',
    grantDate: '10/02/2024',
    expiryDate: '10/02/2025',
    status: 'revoked'
  }
];

const mockVersions: ApiVersion[] = [
  {
    id: 'VER001',
    apiCode: 'API001',
    apiName: 'API tra cứu thông tin công dân',
    version: 'v2.1.0',
    status: 'current',
    releaseDate: '01/12/2024',
    changelog: 'Thêm trường số CCCD, tối ưu performance',
    breakingChanges: false
  },
  {
    id: 'VER002',
    apiCode: 'API001',
    apiName: 'API tra cứu thông tin công dân',
    version: 'v2.0.0',
    status: 'deprecated',
    releaseDate: '01/06/2024',
    endOfLife: '01/06/2025',
    changelog: 'Thay đổi cấu trúc response, thêm pagination',
    breakingChanges: true
  },
  {
    id: 'VER003',
    apiCode: 'API001',
    apiName: 'API tra cứu thông tin công dân',
    version: 'v1.0.0',
    status: 'retired',
    releaseDate: '01/01/2024',
    endOfLife: '01/12/2024',
    changelog: 'Phiên bản đầu tiên',
    breakingChanges: false
  },
  {
    id: 'VER004',
    apiCode: 'API002',
    apiName: 'API nhận dữ liệu đăng ký kinh doanh',
    version: 'v1.5.2',
    status: 'current',
    releaseDate: '15/11/2024',
    changelog: 'Sửa lỗi validation, cải thiện error handling',
    breakingChanges: false
  },
  {
    id: 'VER005',
    apiCode: 'API003',
    apiName: 'API cập nhật thông tin văn bản pháp luật',
    version: 'v3.0.0',
    status: 'current',
    releaseDate: '20/11/2024',
    changelog: 'Hỗ trợ batch update, thêm webhook notification',
    breakingChanges: true
  },
  {
    id: 'VER006',
    apiCode: 'API002',
    apiName: 'API nhận dữ liệu đăng ký kinh doanh',
    version: 'v1.4.0',
    status: 'deprecated',
    releaseDate: '10/08/2024',
    endOfLife: '10/02/2025',
    changelog: 'Thêm tính năng tìm kiếm nâng cao, sửa lỗi encoding',
    breakingChanges: false
  },
  {
    id: 'VER007',
    apiCode: 'API004',
    apiName: 'API đồng bộ dữ liệu công chứng',
    version: 'v2.1.3',
    status: 'current',
    releaseDate: '05/12/2024',
    changelog: 'Cập nhật xử lý chữ ký số, tối ưu hiệu năng đồng bộ',
    breakingChanges: false
  },
  {
    id: 'VER008',
    apiCode: 'API005',
    apiName: 'API tra cứu dữ liệu trợ giúp pháp lý',
    version: 'v1.2.0',
    status: 'current',
    releaseDate: '22/11/2024',
    changelog: 'Thêm API endpoint mới cho thống kê, cải thiện bảo mật',
    breakingChanges: false
  },
  {
    id: 'VER009',
    apiCode: 'API003',
    apiName: 'API cập nhật thông tin văn bản pháp luật',
    version: 'v2.5.1',
    status: 'deprecated',
    releaseDate: '15/09/2024',
    endOfLife: '15/03/2025',
    changelog: 'Cải tiến search, thêm filters mới',
    breakingChanges: false
  }
];

export function ServiceSetupPage() {
  const [activeTab, setActiveTab] = useState<'setup' | 'passive-data' | 'monitoring' | 'permissions' | 'versions'>('setup');
  const [services, setServices] = useState<Service[]>(mockServices);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(mockApprovals);
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [versions, setVersions] = useState<ApiVersion[]>(mockVersions);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPublicType, setFilterPublicType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSubmitApprovalModal, setShowSubmitApprovalModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [showGrantPermissionModal, setShowGrantPermissionModal] = useState(false);
  
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedApproval, setSelectedApproval] = useState<ApprovalRequest | null>(null);
  
  // Grant Permission Wizard State
  const [grantStep, setGrantStep] = useState(1);
  const [selectedApiForGrant, setSelectedApiForGrant] = useState<Service | null>(null);
  const [selectedOrganization, setSelectedOrganization] = useState<string>('');
  const [grantPermissions, setGrantPermissions] = useState({
    read: true,
    write: false,
    update: false,
    delete: false
  });
  const [maxCallsPerDay, setMaxCallsPerDay] = useState('1000');
  const [allowedIPs, setAllowedIPs] = useState<string[]>(['']);
  const [contactPerson, setContactPerson] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [validUntil, setValidUntil] = useState('');
  
  // Version Management State
  const [selectedVersion, setSelectedVersion] = useState<ApiVersion | null>(null);
  const [showVersionDetailModal, setShowVersionDetailModal] = useState(false);
  const [versionForm, setVersionForm] = useState({
    apiCode: '',
    version: '',
    releaseDate: '',
    endOfLife: '',
    changelog: '',
    breakingChanges: false,
    status: 'current' as 'current' | 'deprecated' | 'retired'
  });
  
  const [headers, setHeaders] = useState<Header[]>([]);
  const [queryParams, setQueryParams] = useState<QueryParam[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  
  // Lịch sử phê duyệt (mock data)
  const [approvalHistories] = useState<ApprovalHistory[]>([
    {
      id: 'AH001',
      serviceCode: 'SRV001',
      approvalType: 'service',
      action: 'approved',
      approver: 'Nguyễn Văn A',
      approverRole: 'Trưởng phòng CNTT',
      timestamp: '20/12/2024 10:30',
      note: 'Dịch vụ đã được kiểm tra kỹ thuật và phê duyệt',
      decision: 'approve'
    },
    {
      id: 'AH002',
      serviceCode: 'SRV001',
      approvalType: 'public',
      action: 'approved',
      approver: 'Trần Thị B',
      approverRole: 'Phó Giám đốc',
      timestamp: '21/12/2024 14:15',
      note: 'Đồng ý công khai dịch vụ',
      decision: 'approve'
    },
    {
      id: 'AH003',
      serviceCode: 'SRV002',
      approvalType: 'service',
      action: 'approved',
      approver: 'Nguyễn Văn A',
      approverRole: 'Trưởng phòng CNTT',
      timestamp: '18/12/2024 09:20',
      note: 'Phê duyệt dịch vụ',
      decision: 'approve'
    },
    {
      id: 'AH004',
      serviceCode: 'SRV003',
      approvalType: 'service',
      action: 'pending',
      approver: '',
      approverRole: '',
      timestamp: '22/12/2024 08:00',
      note: 'Đang chờ phê duyệt'
    }
  ]);
  
  const [formData, setFormData] = useState<Partial<Service>>({
    code: '',
    name: '',
    description: '',
    type: 'REST',
    status: 'active',
    endpoint: '',
    version: '',
    department: '',
    maxRequestsPerDay: undefined,
    baseUrl: '',
    httpMethod: 'GET',
    contentType: 'JSON',
    authType: 'none',
    username: '',
    password: '',
    apiKey: '',
    headerName: 'x-api-key',
    unitCode: '',
    systemCode: '',
    isActive: false
  });

  const [serviceForm, setServiceForm] = useState<ServiceForm>({
    serviceName: '',
    serviceCode: '',
    dataType: '',
    frequency: '',
    protocol: '',
    accessScope: '',
    sharingPolicy: '',
    description: '',
    category: '',
    selectedTable: '',
    selectedFields: []
  });

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    const matchesType = filterType === 'all' || service.type === filterType;
    const matchesPublicType = filterPublicType === 'all' || service.visibility === filterPublicType;
    return matchesSearch && matchesStatus && matchesType && matchesPublicType;
  });

  const filteredApprovals = approvals.filter(approval =>
    approval.apiCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    approval.apiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    approval.submitter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLogs = logs.filter(log =>
    log.apiCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.apiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPermissions = permissions.filter(perm =>
    perm.apiCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    perm.apiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    perm.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    perm.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVersions = versions.filter(ver =>
    ver.apiCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ver.apiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ver.version.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseServiceForm = () => {
    setShowAddModal(false);
    setServiceForm({
      serviceName: '',
      serviceCode: '',
      dataType: '',
      frequency: '',
      protocol: '',
      accessScope: '',
      sharingPolicy: '',
      description: '',
      category: ''
    });
  };

  const handleServiceFormChange = (field: keyof ServiceForm, value: string) => {
    setServiceForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitService = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Tạo dịch vụ mới với status = 'active' vì đã được phê duyệt ngay
    const newService: Service = {
      id: Date.now().toString(),
      code: serviceForm.serviceCode,
      name: serviceForm.serviceName,
      description: serviceForm.description,
      type: serviceForm.protocol.toUpperCase() as any,
      endpoint: `https://api.dldc.moj.gov.vn/v1/${serviceForm.serviceCode}`,
      version: '1.0.0',
      department: 'Đơn vị mới',
      status: 'active', // Hoạt động ngay vì thêm trực tiếp
      visibility: serviceForm.visibility as 'public' | 'private' || 'public',
      createdDate: new Date().toLocaleDateString('vi-VN'),
      lastModified: new Date().toLocaleDateString('vi-VN')
    };
    
    setServices([...services, newService]);
    console.log('Service added directly:', newService);
    handleCloseServiceForm();
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700 border-green-200',
      inactive: 'bg-slate-100 text-slate-600 border-slate-200',
      maintenance: 'bg-amber-100 text-amber-700 border-amber-200',
      pending: 'bg-orange-100 text-orange-700 border-orange-200'
    };
    const labels = {
      active: 'Hoạt động',
      inactive: 'Chưa hoạt động',
      maintenance: 'Bảo trì',
      pending: 'Đang phê duyệt'
    };
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      REST: 'bg-blue-100 text-blue-700 border-blue-200',
      SOAP: 'bg-purple-100 text-purple-700 border-purple-200',
      GraphQL: 'bg-pink-100 text-pink-700 border-pink-200'
    };
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${styles[type as keyof typeof styles]}`}>
        {type}
      </span>
    );
  };

  const getVisibilityBadge = (visibility?: string) => {
    const styles = {
      public: 'bg-blue-100 text-blue-700 border-blue-200',
      private: 'bg-slate-100 text-slate-600 border-slate-200'
    };
    const labels = {
      public: 'Công khai',
      private: 'Không công khai'
    };
    const vis = visibility || 'private';
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${styles[vis as keyof typeof styles]}`}>
        {labels[vis as keyof typeof labels]}
      </span>
    );
  };

  const getRequestTypeBadge = (type: string) => {
    const styles = {
      publish: 'bg-green-100 text-green-700 border-green-200',
      update: 'bg-blue-100 text-blue-700 border-blue-200',
      delete: 'bg-red-100 text-red-700 border-red-200'
    };
    const labels = {
      publish: 'Công bố',
      update: 'Cập nhật',
      delete: 'Xóa'
    };
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${styles[type as keyof typeof styles]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    );
  };

  const getApprovalStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      approved: 'bg-green-100 text-green-700 border-green-200',
      rejected: 'bg-red-100 text-red-700 border-red-200'
    };
    const labels = {
      pending: 'Chờ duyệt',
      approved: 'Đã duyệt',
      rejected: 'Từ chối'
    };
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getLogStatusBadge = (status: string) => {
    return status === 'success' ? (
      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 border border-green-200 rounded-full">
        Thành công
      </span>
    ) : (
      <span className="px-2 py-1 text-xs bg-red-100 text-red-700 border border-red-200 rounded-full">
        Thất bại
      </span>
    );
  };

  const getAccessTypeBadge = (type: string) => {
    const styles = {
      read: 'bg-blue-100 text-blue-700 border-blue-200',
      write: 'bg-amber-100 text-amber-700 border-amber-200',
      admin: 'bg-purple-100 text-purple-700 border-purple-200'
    };
    const labels = {
      read: 'Đọc',
      write: 'Ghi',
      admin: 'Quản trị'
    };
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${styles[type as keyof typeof styles]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    );
  };

  const getPermissionStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700 border-green-200',
      expired: 'bg-slate-100 text-slate-600 border-slate-200',
      revoked: 'bg-red-100 text-red-700 border-red-200'
    };
    const labels = {
      active: 'Hoạt động',
      expired: 'Hết hạn',
      revoked: 'Thu hồi'
    };
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getVersionStatusBadge = (status: string) => {
    const styles = {
      current: 'bg-green-100 text-green-700 border-green-200',
      deprecated: 'bg-amber-100 text-amber-700 border-amber-200',
      retired: 'bg-slate-100 text-slate-600 border-slate-200'
    };
    const labels = {
      current: 'Hiện tại',
      deprecated: 'Sắp ngừng',
      retired: 'Đã ngừng'
    };
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const formatNumber = (num?: number) => {
    if (!num) return 'Không giới hạn';
    return num.toLocaleString('vi-VN');
  };

  const handleApprove = (id: string) => {
    setApprovals(approvals.map(a =>
      a.id === id ? { 
        ...a, 
        status: 'approved', 
        reviewer: 'Admin User',
        reviewDate: new Date().toLocaleString('vi-VN')
      } : a
    ));
    
    // Cập nhật service status thành 'active' khi được phê duyệt
    // Nhưng vẫn giữ visibility = 'private' cho đến khi admin chủ động đổi
    setServices(services.map(s =>
      s.id === id ? { ...s, status: 'active' } : s
    ));
    
    setShowApprovalModal(false);
    setSelectedApproval(null);
  };

  const handleReject = (id: string, note: string) => {
    setApprovals(approvals.map(a =>
      a.id === id ? { 
        ...a, 
        status: 'rejected', 
        reviewer: 'Admin User',
        reviewDate: new Date().toLocaleString('vi-VN'),
        note
      } : a
    ));
    
    // Cập nhật service status thành 'inactive' và visibility = 'private' khi bị từ chối
    setServices(services.map(s =>
      s.id === id ? { ...s, status: 'inactive', visibility: 'private' } : s
    ));
    
    setShowApprovalModal(false);
    setSelectedApproval(null);
  };

  const stats = {
    total: services.length,
    active: services.filter(s => s.status === 'active').length,
    inactive: services.filter(s => s.status === 'inactive').length,
    maintenance: services.filter(s => s.status === 'maintenance').length,
    pending: services.filter(s => s.status === 'pending').length
  };

  const approvalStats = {
    total: approvals.length,
    pending: approvals.filter(a => a.status === 'pending').length,
    approved: approvals.filter(a => a.status === 'approved').length,
    rejected: approvals.filter(a => a.status === 'rejected').length
  };

  const logStats = {
    total: logs.length,
    success: logs.filter(l => l.status === 'success').length,
    failed: logs.filter(l => l.status === 'failed').length,
    today: logs.filter(l => l.timestamp.startsWith('17/12/2024')).length
  };

  const permissionStats = {
    total: permissions.length,
    active: permissions.filter(p => p.status === 'active').length,
    expired: permissions.filter(p => p.status === 'expired').length,
    revoked: permissions.filter(p => p.status === 'revoked').length
  };

  const versionStats = {
    total: versions.length,
    current: versions.filter(v => v.status === 'current').length,
    deprecated: versions.filter(v => v.status === 'deprecated').length,
    retired: versions.filter(v => v.status === 'retired').length
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('setup')}
            className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'setup'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Thiết lập dịch vụ
          </button>
          <button
            onClick={() => setActiveTab('passive-data')}
            className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'passive-data'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Dữ liệu thụ động/Theo yêu cầu
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'permissions'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Cấp quyền truy cập API
          </button>
          <button
            onClick={() => setActiveTab('versions')}
            className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'versions'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Quản lý phiên bản API
          </button>
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'monitoring'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Giám sát & Log
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'monitoring' && <MonitoringPage />}
      
      {activeTab === 'setup' && (
        <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-lg p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Database className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-slate-600">Tổng số dịch vụ</div>
              <div className="text-sm text-slate-900 mt-0.5">{stats.total}</div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="text-xs text-slate-600">Đang hoạt động</div>
              <div className="text-sm text-slate-900 mt-0.5">{stats.active}</div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-slate-600">Công khai</div>
              <div className="text-sm text-slate-900 mt-0.5">{services.filter(s => s.visibility === 'public').length}</div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <div className="text-xs text-slate-600">Chưa hoạt động</div>
              <div className="text-sm text-slate-900 mt-0.5">{stats.inactive}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-lg p-3">
        <div className="grid grid-cols-5 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, mã dịch vụ, đơn vị..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Chưa hoạt động</option>
            <option value="maintenance">Đang bảo trì</option>
            <option value="pending">Đang phê duyệt</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả loại dịch vụ</option>
            <option value="REST">REST API</option>
            <option value="SOAP">SOAP</option>
            <option value="GraphQL">GraphQL</option>
          </select>
          <select
            value={filterPublicType}
            onChange={(e) => setFilterPublicType(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả phân loại</option>
            <option value="public">Công khai</option>
            <option value="private">Không công khai</option>
          </select>
        </div>
      </div>

      {/* Add Service Button */}
      <div className="flex items-center justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2" onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4" />
          Thêm dịch vụ mới
        </button>
      </div>

      {/* Service List */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">STT</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Mã dịch vụ</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Tên dịch vụ</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Loại</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Phiên bản</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Đơn vị quản lý</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Trạng thái</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Phân loại</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-slate-500 text-sm">
                    Không tìm thấy dịch vụ phù hợp
                  </td>
                </tr>
              ) : (
                filteredServices.map((service, index) => (
                  <tr key={service.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-700">{index + 1}</td>
                    <td className="px-4 py-3 text-sm">
                      <code className="px-2 py-0.5 bg-slate-100 text-blue-700 rounded text-xs">
                        {service.code}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-slate-900">{service.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{service.description}</div>
                    </td>
                    <td className="px-4 py-3 text-sm">{getTypeBadge(service.type)}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      <code className="text-xs">{service.version}</code>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{service.department}</td>
                    <td className="px-4 py-3 text-sm">{getStatusBadge(service.status)}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        service.visibility === 'public' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {service.visibility === 'public' ? 'Công khai' : 'Không công khai'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" 
                          title="Xem chi tiết"
                          onClick={() => {
                            setSelectedService(service);
                            setShowViewModal(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded" 
                          title="Chỉnh sửa"
                          onClick={() => {
                            setSelectedService(service);
                            setFormData(service);
                            setShowEditModal(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1.5 text-slate-600 hover:bg-slate-50 rounded" 
                          title="Cấu hình"
                          onClick={() => {
                            setSelectedService(service);
                            setShowConfigModal(true);
                          }}
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1.5 text-purple-600 hover:bg-purple-50 rounded" 
                          title="Trình duyệt"
                          onClick={() => {
                            setSelectedService(service);
                            setShowSubmitApprovalModal(true);
                          }}
                        >
                          <FileCheck className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded" 
                          title="Duyệt"
                          onClick={() => {
                            setSelectedService(service);
                            setShowApprovalModal(true);
                          }}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded" 
                          title="Xóa"
                          onClick={() => {
                            setSelectedService(service);
                            setShowDeleteModal(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
      )}



      {/* Removed: Tab Quản lý Log - Now merged with Giám sát */}
      {false && activeTab === 'logs' && (
        <div className="space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Tổng log</p>
                  <p className="text-2xl text-slate-900 mt-1">{logStats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Thành công</p>
                  <p className="text-2xl text-slate-900 mt-1">{logStats.success}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Thất bại</p>
                  <p className="text-2xl text-slate-900 mt-1">{logStats.failed}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Hôm nay</p>
                  <p className="text-2xl text-slate-900 mt-1">{logStats.today}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
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
                placeholder="Tìm kiếm log..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Log List */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Mã API</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Tên API</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Hành động</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Người dùng</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Thời gian</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">IP Address</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Chi tiết</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-900">
                        <code className="px-2 py-0.5 bg-slate-100 text-blue-700 rounded text-xs">{log.apiCode}</code>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900">{log.apiName}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{log.action}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{log.user}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{log.timestamp}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <code className="text-xs">{log.ip}</code>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{log.details}</td>
                      <td className="px-6 py-4">{getLogStatusBadge(log.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Dữ liệu thụ động/Theo yêu cầu */}
      {activeTab === 'passive-data' && (
        <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-lg p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Database className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-slate-600">Tổng số dịch vụ</div>
              <div className="text-sm text-slate-900 mt-0.5">{stats.total}</div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="text-xs text-slate-600">Đang hoạt động</div>
              <div className="text-sm text-slate-900 mt-0.5">{stats.active}</div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-slate-600">Công khai</div>
              <div className="text-sm text-slate-900 mt-0.5">{services.filter(s => s.visibility === 'public').length}</div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <div className="text-xs text-slate-600">Chưa hoạt động</div>
              <div className="text-sm text-slate-900 mt-0.5">{stats.inactive}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-lg p-3">
        <div className="grid grid-cols-5 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, mã dịch vụ, đơn vị..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Chưa hoạt động</option>
            <option value="maintenance">Đang bảo trì</option>
            <option value="pending">Đang phê duyệt</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả loại dịch vụ</option>
            <option value="REST">REST API</option>
            <option value="SOAP">SOAP</option>
            <option value="GraphQL">GraphQL</option>
          </select>
          <select
            value={filterPublicType}
            onChange={(e) => setFilterPublicType(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả phân loại</option>
            <option value="public">Công khai</option>
            <option value="private">Không công khai</option>
          </select>
        </div>
      </div>

      {/* Add Service Button */}
      <div className="flex items-center justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2" onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4" />
          Thêm dịch vụ mới
        </button>
      </div>

      {/* Service List */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">STT</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Mã dịch vụ</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Tên dịch vụ</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Loại</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Phiên bản</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Đơn vị quản lý</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Trạng thái</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Phân loại</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-slate-500 text-sm">
                    Không tìm thấy dịch vụ phù hợp
                  </td>
                </tr>
              ) : (
                filteredServices.map((service, index) => (
                  <tr key={service.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-700">{index + 1}</td>
                    <td className="px-4 py-3 text-sm">
                      <code className="px-2 py-0.5 bg-slate-100 text-blue-700 rounded text-xs">
                        {service.code}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-slate-900">{service.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{service.description}</div>
                    </td>
                    <td className="px-4 py-3 text-sm">{getTypeBadge(service.type)}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      <code className="text-xs">{service.version}</code>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{service.department}</td>
                    <td className="px-4 py-3 text-sm">{getStatusBadge(service.status)}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        service.visibility === 'public' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {service.visibility === 'public' ? 'Công khai' : 'Không công khai'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" 
                          title="Xem chi tiết"
                          onClick={() => {
                            setSelectedService(service);
                            setShowViewModal(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded" 
                          title="Chỉnh sửa"
                          onClick={() => {
                            setSelectedService(service);
                            setFormData(service);
                            setShowEditModal(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1.5 text-slate-600 hover:bg-slate-50 rounded" 
                          title="Cấu hình"
                          onClick={() => {
                            setSelectedService(service);
                            setShowConfigModal(true);
                          }}
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1.5 text-purple-600 hover:bg-purple-50 rounded" 
                          title="Trình duyệt"
                          onClick={() => {
                            setSelectedService(service);
                            setShowSubmitApprovalModal(true);
                          }}
                        >
                          <FileCheck className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded" 
                          title="Duyệt"
                          onClick={() => {
                            setSelectedService(service);
                            setShowApprovalModal(true);
                          }}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded" 
                          title="Xóa"
                          onClick={() => {
                            setSelectedService(service);
                            setShowDeleteModal(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
      )}

      {/* Tab Cấp quyền truy cập API */}
      {activeTab === 'permissions' && (
        <div className="space-y-4">
          {/* Header */}
          <h3 className="text-lg text-slate-900">Quản lý cấp quyền truy cập API</h3>

          {/* Stats - Only 2 cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Tổng số API</div>
                  <div className="text-xl text-slate-900 mt-0.5">{stats.total}</div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Số API đã cấp quyền</div>
                  <div className="text-xl text-slate-900 mt-0.5">{services.filter(s => s.status === 'active').length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-slate-200 rounded-lg p-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên, mã dịch vụ, đơn vị..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả</option>
                <option value="granted">Đã cấp quyền</option>
                <option value="notGranted">Chưa cấp quyền</option>
              </select>
            </div>
          </div>

          {/* Add Permission Button - Moved here below search */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                setShowGrantPermissionModal(true);
                setGrantStep(1);
                setSelectedApiForGrant(null);
                setSelectedOrganization('');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Cấp quyền mới
            </button>
          </div>

          {/* Services Table */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">STT</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Mã dịch vụ</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Tên dịch vụ</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Loại</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Phiên bản</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Đơn vị nhận api</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Ngày tạo</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredServices.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-slate-500 text-sm">
                        Không tìm thấy dịch vụ phù hợp
                      </td>
                    </tr>
                  ) : (
                    filteredServices.map((service, index) => (
                      <tr key={service.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm text-slate-700">{index + 1}</td>
                        <td className="px-4 py-3 text-sm">
                          <code className="px-2 py-0.5 bg-slate-100 text-blue-700 rounded text-xs">
                            {service.code}
                          </code>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-slate-900">{service.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{service.description}</div>
                        </td>
                        <td className="px-4 py-3">{getTypeBadge(service.type)}</td>
                        <td className="px-4 py-3">
                          <code className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                            {service.version}
                          </code>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-2">
                            {service.assignedUnits && service.assignedUnits.length > 0 ? (
                              <>
                                {service.assignedUnits.map((unit: string, idx: number) => (
                                  <div key={idx} className="flex items-center gap-2 group">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg flex-1 min-w-0">
                                      <User className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                                      <span className="text-sm text-slate-900 truncate">{unit}</span>
                                    </div>
                                    <button 
                                      className="p-1.5 text-amber-600 hover:bg-amber-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                                      title="Thay thế"
                                      onClick={() => {
                                        alert('Thay thế đơn vị: ' + unit);
                                      }}
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button 
                                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                                      title="Xóa"
                                      onClick={() => {
                                        alert('Xóa đơn vị: ' + unit);
                                      }}
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                                <button 
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm border border-dashed border-blue-300"
                                  onClick={() => {
                                    setSelectedApiForGrant(service);
                                    setShowGrantPermissionModal(true);
                                    setGrantStep(2);
                                  }}
                                >
                                  <Plus className="w-4 h-4" />
                                  Thêm đơn vị
                                </button>
                              </>
                            ) : (
                              <button 
                                className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm border border-dashed border-blue-300"
                                onClick={() => {
                                  setSelectedApiForGrant(service);
                                  setShowGrantPermissionModal(true);
                                  setGrantStep(2);
                                }}
                              >
                                <Plus className="w-4 h-4" />
                                Thêm đơn vị
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span>{service.accessStartDate || '-'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Xem chi tiết"
                              onClick={() => {
                                setSelectedService(service);
                                setShowViewModal(true);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Quản lý phiên bản API */}
      {activeTab === 'versions' && (
        <div className="space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Tổng phiên bản</p>
                  <p className="text-2xl text-slate-900 mt-1">{versionStats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Hiện tại</p>
                  <p className="text-2xl text-slate-900 mt-1">{versionStats.current}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Sắp ngừng</p>
                  <p className="text-2xl text-slate-900 mt-1">{versionStats.deprecated}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Đã ngừng</p>
                  <p className="text-2xl text-slate-900 mt-1">{versionStats.retired}</p>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-slate-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo mã API, tên API hoặc phiên bản..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="text-sm text-slate-600">
                Tìm thấy <span className="font-semibold text-slate-900">{filteredVersions.length}</span> phiên bản
              </div>
            </div>
          </div>

          {/* Add Version Button */}
          <div className="flex items-center justify-end">
            <button
              onClick={() => setShowVersionModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Thêm phiên bản</span>
            </button>
          </div>

          {/* Version List */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Mã API</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Tên API</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Phiên bản</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Ngày phát hành</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Ngày kết thúc</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Thay đổi không tương thích</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVersions.map((version) => (
                    <tr key={version.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-900">
                        <code className="px-2 py-0.5 bg-slate-100 text-blue-700 rounded text-xs">{version.apiCode}</code>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900">{version.apiName}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">
                        <code className="text-xs font-mono">{version.version}</code>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{version.releaseDate}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{version.endOfLife || '-'}</td>
                      <td className="px-6 py-4">
                        {version.breakingChanges ? (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-700 border border-red-200 rounded-full">Có</span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 border border-green-200 rounded-full">Không</span>
                        )}
                      </td>
                      <td className="px-6 py-4">{getVersionStatusBadge(version.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                            title="Xem chi tiết"
                            onClick={() => {
                              setSelectedVersion(version);
                              setShowVersionDetailModal(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
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

      {/* Add Service Form Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleCloseServiceForm}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <div>
                <h3 className="text-lg text-slate-900">Thêm dịch vụ mới</h3>
                <p className="text-sm text-slate-600 mt-1">Điền thông tin dịch vụ điều phối dữ liệu</p>
              </div>
              <button
                onClick={handleCloseServiceForm}
                className="p-2 hover:bg-white/60 rounded-lg transition-colors"
                title="Đóng"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitService} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* Thông tin cơ bản */}
                <div>
                  <h4 className="text-sm text-slate-900 mb-4 flex items-center gap-2">
                    <Server className="w-4 h-4 text-purple-600" />
                    Thông tin dịch vụ
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-700 mb-1.5">
                        Tên dịch vụ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={serviceForm.serviceName}
                        onChange={(e) => handleServiceFormChange('serviceName', e.target.value)}
                        placeholder="Nhập tên dịch vụ"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-1.5">
                        Mã dịch vụ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={serviceForm.serviceCode}
                        onChange={(e) => handleServiceFormChange('serviceCode', e.target.value)}
                        placeholder="VD: SRV001"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-1.5">
                        <Database className="w-3 h-3 inline mr-1" />
                        Loại dữ liệu <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={serviceForm.dataType}
                        onChange={(e) => handleServiceFormChange('dataType', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Chọn loại dữ liệu</option>
                        <option value="json">JSON</option>
                        <option value="xml">XML</option>
                        <option value="csv">CSV</option>
                        <option value="database">Database</option>
                        <option value="file">File</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-1.5">
                        <Clock className="w-3 h-3 inline mr-1" />
                        Tần suất cung cấp <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={serviceForm.frequency}
                        onChange={(e) => handleServiceFormChange('frequency', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Chọn tần suất</option>
                        <option value="realtime">Thời gian thực</option>
                        <option value="hourly">Mỗi giờ</option>
                        <option value="daily">Hàng ngày</option>
                        <option value="weekly">Hàng tuần</option>
                        <option value="monthly">Hàng tháng</option>
                        <option value="ondemand">Theo yêu cầu</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-1.5">
                        <Database className="w-3 h-3 inline mr-1" />
                        Phương thức cung cấp <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={serviceForm.provisionMethod}
                        onChange={(e) => handleServiceFormChange('provisionMethod', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Chọn phương thức</option>
                        <option value="active">Chủ động</option>
                        <option value="passive">Thụ động</option>
                        <option value="onrequest">Theo yêu cầu</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-1.5">
                        <Wifi className="w-3 h-3 inline mr-1" />
                        Giao thức kết nối <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={serviceForm.protocol}
                        onChange={(e) => handleServiceFormChange('protocol', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Chọn giao thức</option>
                        <option value="rest">REST API</option>
                        <option value="soap">SOAP</option>
                        <option value="graphql">GraphQL</option>
                        <option value="grpc">gRPC</option>
                        <option value="websocket">WebSocket</option>
                        <option value="ftp">FTP/SFTP</option>
                        <option value="kafka">Kafka</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-1.5">
                        <Lock className="w-3 h-3 inline mr-1" />
                        Phạm vi truy cập <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={serviceForm.accessScope}
                        onChange={(e) => handleServiceFormChange('accessScope', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Chọn phạm vi</option>
                        <option value="public">Công khai</option>
                        <option value="internal">Nội bộ</option>
                        <option value="restricted">Hạn chế</option>
                        <option value="private">Riêng tư</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-1.5">
                        <Share className="w-3 h-3 inline mr-1" />
                        Chính sách chia sẻ <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={serviceForm.sharingPolicy}
                        onChange={(e) => handleServiceFormChange('sharingPolicy', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Chọn chính sách</option>
                        <option value="open">Mở - Chia sẻ tự do</option>
                        <option value="approval">Yêu cầu phê duyệt</option>
                        <option value="restricted">Hạn chế theo đối tượng</option>
                        <option value="paid">Có phí</option>
                        <option value="private">Không chia sẻ</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-1.5">
                        <Globe className="w-3 h-3 inline mr-1" />
                        Phân loại <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="visibility"
                            value="private"
                            checked={serviceForm.visibility === 'private' || !serviceForm.visibility}
                            onChange={(e) => handleServiceFormChange('visibility', e.target.value)}
                            className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-2 focus:ring-purple-500"
                          />
                          <span className="text-sm text-slate-700">Không công khai</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="visibility"
                            value="public"
                            checked={serviceForm.visibility === 'public'}
                            onChange={(e) => handleServiceFormChange('visibility', e.target.value)}
                            className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-2 focus:ring-purple-500"
                          />
                          <span className="text-sm text-slate-700">Công khai</span>
                        </label>
                      </div>
                      <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Lãnh đạo sẽ phê duyệt 2 cấp: Duyệt dịch vụ và Duyệt công khai
                      </p>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm text-slate-700 mb-1.5">
                        <FolderOpen className="w-3 h-3 inline mr-1" />
                        Danh mục - Dữ liệu <span className="text-red-500">*</span>
                      </label>
                      
                      {/* Dropdown chọn bảng */}
                      <select
                        required
                        value={serviceForm.selectedTable}
                        onChange={(e) => {
                          handleServiceFormChange('selectedTable', e.target.value);
                          handleServiceFormChange('selectedFields', []); // Reset fields khi đổi bảng
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3"
                      >
                        <option value="">Chọn bảng dữ liệu</option>
                        <option value="congchung">Bảng Công chứng</option>
                        <option value="tgpl">Bảng Trợ giúp pháp lý</option>
                        <option value="dkkd">Bảng Đăng ký kinh doanh</option>
                        <option value="vbpl">Bảng Văn bản pháp luật</option>
                        <option value="hotinh">Bảng Hộ tịch</option>
                        <option value="tuyentruyenphapluat">Bảng Tuyên truyền pháp luật</option>
                      </select>

                      {/* Danh sách trường theo bảng được chọn */}
                      {serviceForm.selectedTable && (() => {
                        const tableFields: Record<string, Array<{id: string, label: string}>> = {
                          congchung: [
                            { id: 'soCongChung', label: 'Số công chứng' },
                            { id: 'ngayCongChung', label: 'Ngày công chứng' },
                            { id: 'loaiHopDong', label: 'Loại hợp đồng' },
                            { id: 'benA', label: 'Bên A (họ tên)' },
                            { id: 'benB', label: 'Bên B (họ tên)' },
                            { id: 'noiDungHopDong', label: 'Nội dung hợp đồng' },
                            { id: 'giaTriHopDong', label: 'Giá trị hợp đồng' },
                            { id: 'phiCongChung', label: 'Phí công chứng' },
                            { id: 'vanPhongCongChung', label: 'Văn phòng công chứng' },
                            { id: 'nguoiCongChung', label: 'Người công chứng' }
                          ],
                          tgpl: [
                            { id: 'soHoSo', label: 'Số hồ sơ' },
                            { id: 'hoTenNguoiYeuCau', label: 'Họ tên người yêu cầu' },
                            { id: 'cmnd', label: 'CMND/CCCD' },
                            { id: 'diaChi', label: 'Địa chỉ' },
                            { id: 'soDienThoai', label: 'Số điện thoại' },
                            { id: 'loaiVuViec', label: 'Loại vụ việc' },
                            { id: 'noiDungYeuCau', label: 'Nội dung yêu cầu' },
                            { id: 'ngayTiepNhan', label: 'Ngày tiếp nhận' },
                            { id: 'trangThai', label: 'Trạng thái xử lý' },
                            { id: 'luatSuPhuTrach', label: 'Luật sư phụ trách' },
                            { id: 'donViTGPL', label: 'Đơn vị TGPL' }
                          ],
                          dkkd: [
                            { id: 'maSoDKKD', label: 'Mã số ĐKKD' },
                            { id: 'tenDoanhNghiep', label: 'Tên doanh nghiệp' },
                            { id: 'loaiHinhDN', label: 'Loại hình doanh nghiệp' },
                            { id: 'nguoiDaiDien', label: 'Người đại diện' },
                            { id: 'diaChiTruSo', label: 'Địa chỉ trụ sở' },
                            { id: 'vonDieuLe', label: 'Vốn điều lệ' },
                            { id: 'nganhNghe', label: 'Ngành nghề kinh doanh' },
                            { id: 'ngayCapPhep', label: 'Ngày cấp phép' },
                            { id: 'trangThaiHoatDong', label: 'Trạng thái hoạt động' },
                            { id: 'maSoThue', label: 'Mã số thuế' }
                          ],
                          vbpl: [
                            { id: 'soKyHieu', label: 'Số ký hiệu' },
                            { id: 'trichYeu', label: 'Trích yếu' },
                            { id: 'loaiVanBan', label: 'Loại văn bản' },
                            { id: 'linhVuc', label: 'Lĩnh vực' },
                            { id: 'coQuanBanHanh', label: 'Cơ quan ban hành' },
                            { id: 'nguoiKy', label: 'Người ký' },
                            { id: 'ngayBanHanh', label: 'Ngày ban hành' },
                            { id: 'ngayHieuLuc', label: 'Ngày hiệu lực' },
                            { id: 'trangThaiHieuLuc', label: 'Trạng thái hiệu lực' },
                            { id: 'fileDinhKem', label: 'File đính kèm' }
                          ],
                          hotinh: [
                            { id: 'soGiayKhaiSinh', label: 'Số giấy khai sinh' },
                            { id: 'hoTen', label: 'Họ và tên' },
                            { id: 'gioiTinh', label: 'Giới tính' },
                            { id: 'ngaySinh', label: 'Ngày sinh' },
                            { id: 'noiSinh', label: 'Nơi sinh' },
                            { id: 'queQuan', label: 'Quê quán' },
                            { id: 'danToc', label: 'Dân tộc' },
                            { id: 'quocTich', label: 'Quốc tịch' },
                            { id: 'hoTenCha', label: 'Họ tên cha' },
                            { id: 'hoTenMe', label: 'Họ tên mẹ' },
                            { id: 'nguoiKhaiSinh', label: 'Người khai sinh' },
                            { id: 'ngayDangKy', label: 'Ngày đăng ký' }
                          ],
                          tuyentruyenphapluat: [
                            { id: 'tenChuongTrinh', label: 'Tên chương trình' },
                            { id: 'chuDe', label: 'Chủ đề' },
                            { id: 'doiTuong', label: 'Đối tượng tham gia' },
                            { id: 'diaDiem', label: 'Địa điểm' },
                            { id: 'thoiGian', label: 'Thời gian tổ chức' },
                            { id: 'soLuongNguoiThamGia', label: 'Số lượng người tham gia' },
                            { id: 'donViToChuc', label: 'Đơn vị tổ chức' },
                            { id: 'noiDungTuyenTruyen', label: 'Nội dung tuyên truyền' },
                            { id: 'hinhThuc', label: 'Hình thức' },
                            { id: 'ketQua', label: 'Kết quả đạt được' }
                          ]
                        };

                        const currentFields = tableFields[serviceForm.selectedTable] || [];
                        const allFieldIds = currentFields.map(f => f.id);

                        return (
                          <>
                            <div className="border border-slate-300 rounded-lg p-3 max-h-[240px] overflow-y-auto bg-white">
                              {/* Chọn tất cả */}
                              <label className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200 cursor-pointer hover:bg-slate-50 p-1.5 rounded">
                                <input
                                  type="checkbox"
                                  checked={currentFields.length > 0 && serviceForm.selectedFields.length === currentFields.length}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      handleServiceFormChange('selectedFields', allFieldIds);
                                    } else {
                                      handleServiceFormChange('selectedFields', []);
                                    }
                                  }}
                                  className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-2 focus:ring-purple-500"
                                />
                                <span className="text-sm font-medium text-slate-900">Chọn tất cả</span>
                              </label>
                              
                              {/* Danh sách trường */}
                              <div className="space-y-1">
                                {currentFields.map((field) => (
                                  <label key={field.id} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1.5 rounded">
                                    <input
                                      type="checkbox"
                                      checked={serviceForm.selectedFields.includes(field.id)}
                                      onChange={(e) => {
                                        const newFields = e.target.checked
                                          ? [...serviceForm.selectedFields, field.id]
                                          : serviceForm.selectedFields.filter(f => f !== field.id);
                                        handleServiceFormChange('selectedFields', newFields);
                                      }}
                                      className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-2 focus:ring-purple-500"
                                    />
                                    <span className="text-sm text-slate-700">{field.label}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1.5">
                              {serviceForm.selectedFields.length > 0 
                                ? `Đã chọn ${serviceForm.selectedFields.length}/${currentFields.length} trường` 
                                : 'Chưa chọn trường nào'}
                            </p>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* Mô tả */}
                <div>
                  <label className="block text-sm text-slate-700 mb-1.5">
                    <FileText className="w-3 h-3 inline mr-1" />
                    Mô tả dịch vụ
                  </label>
                  <textarea
                    value={serviceForm.description}
                    onChange={(e) => handleServiceFormChange('description', e.target.value)}
                    placeholder="Mô tả chi tiết về dịch vụ, mục đích sử dụng..."
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={handleCloseServiceForm}
                className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Hủy
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    // Tạo dịch vụ với status = 'pending' vì đang chờ phê duyệt
                    const tempService: Service = {
                      id: Date.now().toString(),
                      code: serviceForm.serviceCode,
                      name: serviceForm.serviceName,
                      description: serviceForm.description,
                      type: serviceForm.protocol.toUpperCase() as any,
                      endpoint: `https://api.dldc.moj.gov.vn/v1/${serviceForm.serviceCode}`,
                      version: '1.0.0',
                      department: 'Đơn vị mới',
                      status: 'pending', // Đang phê duyệt
                      visibility: serviceForm.visibility as 'public' | 'private' || 'public',
                      createdDate: new Date().toLocaleDateString('vi-VN'),
                      lastModified: new Date().toLocaleDateString('vi-VN')
                    };
                    
                    // Thêm dịch vụ vào danh sách với trạng thái đang phê duyệt
                    setServices([...services, tempService]);
                    setSelectedService(tempService);
                    setShowSubmitApprovalModal(true);
                    handleCloseServiceForm();
                  }}
                  className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  Trình duyệt
                </button>
                <button
                  type="submit"
                  onClick={handleSubmitService}
                  className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Thêm trực tiếp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xem chi tiết */}
      {showViewModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-white">Chi tiết cấp quyền API</h3>
                  <p className="text-sm text-blue-100 mt-0.5">{selectedService.code}</p>
                </div>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
              <div className="space-y-6">
                {/* Thông tin API */}
                <div>
                  <h4 className="text-sm text-slate-500 mb-3 flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    Thông tin API
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Tên dịch vụ</p>
                      <p className="text-sm text-slate-900">{selectedService.name}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Mã dịch vụ</p>
                      <p className="text-sm text-slate-900 font-mono">{selectedService.code}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Loại</p>
                      <p className="text-sm text-slate-900">{selectedService.type}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Phiên bản</p>
                      <p className="text-sm text-slate-900">{selectedService.version}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg col-span-2">
                      <p className="text-xs text-slate-500 mb-1">Endpoint</p>
                      <p className="text-sm text-slate-900 font-mono break-all">{selectedService.endpoint}</p>
                    </div>
                  </div>
                </div>

                {/* Đơn vị nhận API */}
                <div>
                  <h4 className="text-sm text-slate-500 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Đơn vị nhận API
                  </h4>
                  <div className="space-y-4">
                    {selectedService.assignedUnits && selectedService.assignedUnits.length > 0 ? (
                      selectedService.assignedUnits.map((unit, idx) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Tên đơn vị nhận</p>
                              <p className="text-sm text-slate-900">{unit}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Thuộc đơn vị</p>
                              <p className="text-sm text-slate-900">Bộ Tư pháp</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Thông tin đầu mối</p>
                              <p className="text-sm text-slate-900">Nguyễn Văn A</p>
                              <p className="text-xs text-slate-600 mt-0.5">Email: nguyen.van.a@moj.gov.vn</p>
                              <p className="text-xs text-slate-600">SĐT: 0123456789</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Khóa key</p>
                              <div className="flex items-center gap-2">
                                <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">
                                  {`${unit.substring(0, 3).toUpperCase()}_${Math.random().toString(36).substring(2, 15)}`}
                                </code>
                                <button className="text-blue-600 hover:text-blue-700" title="Copy">
                                  <FileText className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Quyền call/ngày</p>
                              <p className="text-sm text-slate-900">1,000 requests/ngày</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Ngày cấp quyền</p>
                              <p className="text-sm text-slate-900">15/12/2024</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-xs text-slate-500 mb-1">Quyền truy cập</p>
                              <div className="flex gap-2 flex-wrap">
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Đọc</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Ghi</span>
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Cập nhật</span>
                              </div>
                            </div>
                            <div className="col-span-2">
                              <p className="text-xs text-slate-500 mb-1">IP được phép truy cập</p>
                              <div className="flex gap-2 flex-wrap">
                                <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">192.168.1.100</code>
                                <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">192.168.1.101</code>
                                <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">10.0.0.50</code>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-slate-50 p-4 rounded-lg text-center text-sm text-slate-500">
                        Chưa có đơn vị được cấp quyền
                      </div>
                    )}
                  </div>
                </div>

                {/* Giới hạn và bảo mật */}
                <div>
                  <h4 className="text-sm text-slate-500 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Giới hạn và bảo mật
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-600 mb-1">Số lượng request tối đa/ngày</p>
                      <p className="text-sm text-slate-900">{selectedService.maxRequestsPerDay?.toLocaleString() || '10,000'}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-600 mb-1">Loại xác thực</p>
                      <p className="text-sm text-slate-900">{selectedService.authType || 'API Key'}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-600 mb-1">HTTP Method</p>
                      <p className="text-sm text-slate-900 font-mono">{selectedService.httpMethod || 'GET'}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-600 mb-1">Content Type</p>
                      <p className="text-sm text-slate-900 font-mono">{selectedService.contentType || 'application/json'}</p>
                    </div>
                  </div>
                </div>

                {/* Mô tả */}
                <div>
                  <h4 className="text-sm text-slate-500 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Mô tả
                  </h4>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedService.description}
                    </p>
                  </div>
                </div>

                {/* Thông tin khác */}
                <div>
                  <h4 className="text-sm text-slate-500 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Thông tin khác
                  </h4>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Ngày tạo: {selectedService.createdDate}</span>
                      <span>Cập nhật: {selectedService.lastModified}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Thêm phiên bản mới */}
      {showVersionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-white">Thêm phiên bản API mới</h3>
                  <p className="text-sm text-purple-100 mt-0.5">Tạo phiên bản mới cho API</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowVersionModal(false);
                  setVersionForm({
                    apiCode: '',
                    version: '',
                    releaseDate: '',
                    endOfLife: '',
                    changelog: '',
                    breakingChanges: false,
                    status: 'current'
                  });
                }}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="space-y-4">
                {/* Select API */}
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Chọn API <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={versionForm.apiCode}
                    onChange={(e) => setVersionForm({ ...versionForm, apiCode: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">-- Chọn API --</option>
                    {services.map(service => (
                      <option key={service.id} value={service.code}>
                        {service.code} - {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Version Number */}
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Số phiên bản <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={versionForm.version}
                    onChange={(e) => setVersionForm({ ...versionForm, version: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                    placeholder="v2.0.0"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">Ví dụ: v1.0.0, v2.1.5</p>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Trạng thái <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={versionForm.status}
                    onChange={(e) => setVersionForm({ ...versionForm, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="current">Hiện tại</option>
                    <option value="deprecated">Sắp ngừng</option>
                    <option value="retired">Đã ngừng</option>
                  </select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Ngày phát hành <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={versionForm.releaseDate}
                      onChange={(e) => setVersionForm({ ...versionForm, releaseDate: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Ngày kết thúc
                    </label>
                    <input
                      type="date"
                      value={versionForm.endOfLife}
                      onChange={(e) => setVersionForm({ ...versionForm, endOfLife: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Breaking Changes */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={versionForm.breakingChanges}
                      onChange={(e) => setVersionForm({ ...versionForm, breakingChanges: e.target.checked })}
                      className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-sm text-slate-700">
                      Có Breaking Changes (thay đổi không tương thích ngược)
                    </span>
                  </label>
                </div>

                {/* Changelog */}
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Changelog <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={versionForm.changelog}
                    onChange={(e) => setVersionForm({ ...versionForm, changelog: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Mô tả các thay đổi trong phiên bản này..."
                    rows={4}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowVersionModal(false);
                  setVersionForm({
                    apiCode: '',
                    version: '',
                    releaseDate: '',
                    endOfLife: '',
                    changelog: '',
                    breakingChanges: false,
                    status: 'current'
                  });
                }}
                className="px-5 py-2.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (!versionForm.apiCode || !versionForm.version || !versionForm.releaseDate || !versionForm.changelog) {
                    alert('Vui lòng điền đầy đủ các trường bắt buộc!');
                    return;
                  }

                  const selectedApiService = services.find(s => s.code === versionForm.apiCode);
                  const newVersion: ApiVersion = {
                    id: `VER${(versions.length + 1).toString().padStart(3, '0')}`,
                    apiCode: versionForm.apiCode,
                    apiName: selectedApiService?.name || '',
                    version: versionForm.version,
                    status: versionForm.status,
                    releaseDate: new Date(versionForm.releaseDate).toLocaleDateString('vi-VN'),
                    endOfLife: versionForm.endOfLife ? new Date(versionForm.endOfLife).toLocaleDateString('vi-VN') : undefined,
                    changelog: versionForm.changelog,
                    breakingChanges: versionForm.breakingChanges
                  };

                  setVersions([...versions, newVersion]);
                  setShowVersionModal(false);
                  setVersionForm({
                    apiCode: '',
                    version: '',
                    releaseDate: '',
                    endOfLife: '',
                    changelog: '',
                    breakingChanges: false,
                    status: 'current'
                  });

                  alert(`Đã tạo phiên bản ${newVersion.version} cho API ${newVersion.apiCode} thành công!`);
                }}
                className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Tạo phiên bản
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xem chi tiết phiên bản */}
      {showVersionDetailModal && selectedVersion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-white">Chi tiết phiên bản</h3>
                  <p className="text-sm text-indigo-100 mt-0.5 font-mono">{selectedVersion.version}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowVersionDetailModal(false);
                  setSelectedVersion(null);
                }}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="space-y-6">
                {/* API Info */}
                <div>
                  <h4 className="text-sm text-slate-500 mb-3 flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    Thông tin API
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Mã API</p>
                      <code className="text-sm text-blue-700">{selectedVersion.apiCode}</code>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Tên API</p>
                      <p className="text-sm text-slate-900">{selectedVersion.apiName}</p>
                    </div>
                  </div>
                </div>

                {/* Version Info */}
                <div>
                  <h4 className="text-sm text-slate-500 mb-3 flex items-center gap-2">
                    <GitBranch className="w-4 h-4" />
                    Thông tin phiên bản
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Số phiên bản</p>
                      <code className="text-base font-mono text-slate-900">{selectedVersion.version}</code>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Trạng thái</p>
                      <div className="mt-2">{getVersionStatusBadge(selectedVersion.status)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">Ngày phát hành</p>
                        <p className="text-sm text-slate-900">{selectedVersion.releaseDate}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">Ngày kết thúc</p>
                        <p className="text-sm text-slate-900">{selectedVersion.endOfLife || 'Chưa xác định'}</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Breaking Changes</p>
                      {selectedVersion.breakingChanges ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-red-100 text-red-700 border border-red-200 rounded-full">
                          <AlertCircle className="w-3 h-3" />
                          Có thay đổi không tương thích
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-green-700 border border-green-200 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Tương thích ngược
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Changelog */}
                <div>
                  <h4 className="text-sm text-slate-500 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Changelog
                  </h4>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {selectedVersion.changelog}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => {
                  setShowVersionDetailModal(false);
                  setSelectedVersion(null);
                }}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grant Permission Modal */}
      <GrantPermissionModal
        isOpen={showGrantPermissionModal}
        onClose={() => setShowGrantPermissionModal(false)}
        services={services}
        currentStep={grantStep}
        setCurrentStep={setGrantStep}
        selectedApi={selectedApiForGrant}
        setSelectedApi={setSelectedApiForGrant}
        selectedOrganization={selectedOrganization}
        setSelectedOrganization={setSelectedOrganization}
        permissions={grantPermissions}
        setPermissions={setGrantPermissions}
        maxCallsPerDay={maxCallsPerDay}
        setMaxCallsPerDay={setMaxCallsPerDay}
        allowedIPs={allowedIPs}
        setAllowedIPs={setAllowedIPs}
        contactPerson={contactPerson}
        setContactPerson={setContactPerson}
        validUntil={validUntil}
        setValidUntil={setValidUntil}
      />

      {/* Modal Chỉnh sửa */}
      {showEditModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Edit className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-white">Chỉnh sửa Dịch vụ</h3>
                  <p className="text-sm text-orange-100 mt-0.5">{selectedService.code}</p>
                </div>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-5">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-1.5">Tên dịch vụ *</label>
                    <input
                      type="text"
                      defaultValue={selectedService.name}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-1.5">Mã dịch vụ *</label>
                    <input
                      type="text"
                      defaultValue={selectedService.code}
                      disabled
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-100 cursor-not-allowed font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-1.5">Loại *</label>
                    <select
                      defaultValue={selectedService.type}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="REST">REST API</option>
                      <option value="SOAP">SOAP</option>
                      <option value="GraphQL">GraphQL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-1.5">Version *</label>
                    <input
                      type="text"
                      defaultValue={selectedService.version}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-1.5">Trạng thái *</label>
                    <select
                      id="edit-service-status"
                      defaultValue={selectedService.status}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      onChange={(e) => {
                        const visibilitySelect = document.getElementById('edit-service-visibility') as HTMLSelectElement;
                        if (e.target.value !== 'active') {
                          visibilitySelect.value = 'private';
                          visibilitySelect.disabled = true;
                          visibilitySelect.className = 'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-100 text-slate-500 cursor-not-allowed';
                        } else {
                          visibilitySelect.disabled = false;
                          visibilitySelect.className = 'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500';
                        }
                      }}
                    >
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Chưa hoạt động</option>
                      <option value="pending">Đang phê duyệt</option>
                      <option value="maintenance">Bảo trì</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-1.5">
                      <Globe className="w-3 h-3 inline mr-1" />
                      Phân loại *
                    </label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="edit-visibility"
                          value="private"
                          defaultChecked={selectedService.visibility !== 'public'}
                          className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-2 focus:ring-amber-500"
                        />
                        <span className="text-sm text-slate-700">Không công khai</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="edit-visibility"
                          value="public"
                          defaultChecked={selectedService.visibility === 'public'}
                          className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-2 focus:ring-amber-500"
                        />
                        <span className="text-sm text-slate-700">Công khai</span>
                      </label>
                    </div>
                    <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Phân loại có thể thay đổi sau khi được phê duyệt
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-1.5">Endpoint URL *</label>
                  <input
                    type="text"
                    defaultValue={selectedService.endpoint}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    placeholder="https://api.example.com/v1/service"
                  />
                </div>

                {/* Technical Config */}
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-sm text-slate-700 mb-3 flex items-center gap-2">
                    <SettingsIcon className="w-4 h-4" />
                    Cấu hình kỹ thuật
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-700 mb-1.5">HTTP Method</label>
                      <select
                        defaultValue={selectedService.httpMethod || 'GET'}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="PATCH">PATCH</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-1.5">Content Type</label>
                      <select
                        defaultValue={selectedService.contentType || 'application/json'}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="application/json">application/json</option>
                        <option value="application/xml">application/xml</option>
                        <option value="text/plain">text/plain</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-1.5">Authentication</label>
                      <select
                        defaultValue={selectedService.authType || 'apikey'}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="none">None</option>
                        <option value="apikey">API Key</option>
                        <option value="basic">Basic Auth</option>
                        <option value="bearer">Bearer Token</option>
                        <option value="oauth2">OAuth 2.0</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-1.5">Max Requests/Day</label>
                      <input
                        type="number"
                        defaultValue={selectedService.maxRequestsPerDay || 10000}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-1.5">Mô tả</label>
                  <textarea
                    defaultValue={selectedService.description}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Thay đổi có thể yêu cầu phê duyệt
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2.5 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                  }}
                  className="px-5 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cấu hình */}
      {showConfigModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <SettingsIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-white">Cấu hình Nâng cao</h3>
                  <p className="text-sm text-slate-300 mt-0.5">{selectedService.code}</p>
                </div>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-6">
                {/* Retry Policy */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <h4 className="text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-purple-600" />
                    Retry Policy
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1.5">Max Retries</label>
                      <input
                        type="number"
                        defaultValue={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1.5">Initial Delay (ms)</label>
                      <input
                        type="number"
                        defaultValue={1000}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1.5">Max Delay (ms)</label>
                      <input
                        type="number"
                        defaultValue={10000}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Timeout Settings */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <h4 className="text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Timeout Settings
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1.5">Connection Timeout (s)</label>
                      <input
                        type="number"
                        defaultValue={30}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1.5">Read Timeout (s)</label>
                      <input
                        type="number"
                        defaultValue={60}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Rate Limiting */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <h4 className="text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    Rate Limiting
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1.5">Requests per Second</label>
                      <input
                        type="number"
                        defaultValue={100}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1.5">Burst Size</label>
                      <input
                        type="number"
                        defaultValue={200}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Circuit Breaker */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <h4 className="text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-orange-600" />
                    Circuit Breaker
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1.5">Failure Threshold</label>
                      <input
                        type="number"
                        defaultValue={5}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1.5">Reset Timeout (s)</label>
                      <input
                        type="number"
                        defaultValue={60}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1.5">Half-Open Requests</label>
                      <input
                        type="number"
                        defaultValue={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Monitoring & Logging */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <h4 className="text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-indigo-600" />
                    Monitoring & Logging
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-700">Enable request logging</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-700">Enable performance metrics</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-700">Enable error alerting</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                Yêu cầu quyền Admin
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2.5 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    setShowConfigModal(false);
                  }}
                  className="px-5 py-2.5 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Lưu cấu hình
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xóa */}
      {showDeleteModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-rose-600 px-6 py-5 flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl text-white">Xác nhận Xóa</h3>
                <p className="text-sm text-red-100 mt-0.5">Hành động không thể hoàn tác</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-4">
                <p className="text-sm text-slate-700">
                  Bạn có chắc chắn muốn xóa dịch vụ sau không?
                </p>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-red-600 mb-0.5">Mã dịch vụ</p>
                      <p className="text-sm text-slate-900 font-mono">{selectedService.code}</p>
                    </div>
                    <div>
                      <p className="text-xs text-red-600 mb-0.5">Tên dịch vụ</p>
                      <p className="text-sm text-slate-900">{selectedService.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-red-600 mb-0.5">Endpoint</p>
                      <p className="text-sm text-slate-900 font-mono break-all">{selectedService.endpoint}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-800">
                      <p className="font-medium mb-1">Lưu ý:</p>
                      <ul className="space-y-0.5 list-disc list-inside">
                        <li>Dữ liệu sẽ bị xóa vĩnh viễn</li>
                        <li>Các ứng dụng đang dùng sẽ bị ảnh hưởng</li>
                        <li>Lịch sử truy cập sẽ được lưu giữ</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                }}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Xóa dịch vụ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Trình duyệt */}
      {showSubmitApprovalModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-white">Trình duyệt Dịch vụ</h3>
                  <p className="text-sm text-purple-100 mt-0.5">Gửi yêu cầu phê duyệt</p>
                </div>
              </div>
              <button
                onClick={() => setShowSubmitApprovalModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-5">
                {/* Thông tin dịch vụ */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="text-sm text-purple-900 mb-3 flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    Thông tin dịch vụ cần duyệt
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-purple-600 mb-1">Mã dịch vụ</p>
                      <p className="text-sm text-slate-900 font-mono">{selectedService.code}</p>
                    </div>
                    <div>
                      <p className="text-xs text-purple-600 mb-1">Tên dịch vụ</p>
                      <p className="text-sm text-slate-900">{selectedService.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-purple-600 mb-1">Loại</p>
                      <p className="text-sm text-slate-900">{selectedService.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-purple-600 mb-1">Đơn vị</p>
                      <p className="text-sm text-slate-900">{selectedService.department}</p>
                    </div>
                  </div>
                </div>

                {/* Loại yêu cầu */}
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Loại yêu cầu phê duyệt *
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="publish">Xuất bản dịch vụ mới</option>
                    <option value="update">Cập nhật dịch vụ</option>
                    <option value="delete">Xóa dịch vụ</option>
                    <option value="config">Thay đổi cấu hình</option>
                  </select>
                </div>

                {/* Người duyệt */}
                <div>
                  <label className="block text-sm text-slate-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Chọn người duyệt *
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="">-- Chọn người duyệt --</option>
                    <option value="user1">Nguyễn Văn A - Trưởng phòng Kỹ thuật</option>
                    <option value="user2">Trần Thị B - Phó Giám đốc CNTT</option>
                    <option value="user3">Lê Văn C - Trưởng phòng Nghiệp vụ</option>
                    <option value="user4">Phạm Thị D - Giám đốc Trung tâm</option>
                  </select>
                </div>

                {/* Độ ưu tiên */}
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Độ ưu tiên
                  </label>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priority"
                        value="normal"
                        defaultChecked
                        className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-2 focus:ring-purple-500"
                      />
                      <span className="text-sm text-slate-700">Bình thường</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priority"
                        value="high"
                        className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-2 focus:ring-purple-500"
                      />
                      <span className="text-sm text-slate-700">Cao</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priority"
                        value="urgent"
                        className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-2 focus:ring-purple-500"
                      />
                      <span className="text-sm text-orange-700">Khẩn cấp</span>
                    </label>
                  </div>
                </div>

                {/* Phân loại công khai */}
                <div>
                  <label className="block text-sm text-slate-700 mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Phân loại công khai *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="visibility"
                        value="private"
                        defaultChecked
                        className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-2 focus:ring-purple-500"
                      />
                      <span className="text-sm text-slate-700">Không công khai</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="visibility"
                        value="public"
                        className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-2 focus:ring-purple-500"
                      />
                      <span className="text-sm text-slate-700">Công khai</span>
                    </label>
                  </div>
                  <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Lưu ý: Chỉ dịch vụ được phê duyệt mới có thể chuyển sang công khai
                  </p>
                </div>

                {/* Lý do trình duyệt */}
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Lý do trình duyệt *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Nhập lý do và mục đích cần phê duyệt dịch vụ này..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>

                {/* Tệp đính kèm */}
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Tệp đính kèm (nếu có)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors cursor-pointer">
                    <FolderOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Kéo thả tệp hoặc click để chọn</p>
                    <p className="text-xs text-slate-500 mt-1">PDF, Word, Excel (Max 10MB)</p>
                  </div>
                </div>

                {/* Thông báo */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-blue-800">
                      <p className="font-medium mb-1">Lưu ý:</p>
                      <ul className="space-y-0.5 list-disc list-inside">
                        <li>Người duyệt sẽ nhận được email thông báo</li>
                        <li>Thời gian xử lý tùy thuộc vào độ ưu tiên</li>
                        <li>Bạn có thể theo d��i trạng thái tại mục "Phê duyệt"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setShowSubmitApprovalModal(false)}
                className="px-4 py-2.5 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setShowSubmitApprovalModal(false);
                }}
                className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <FileCheck className="w-4 h-4" />
                Gửi yêu cầu duyệt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Duyệt */}
      {showApprovalModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-white">Phê duyệt Yêu cầu</h3>
                  <p className="text-sm text-green-100 mt-0.5">Xem xét và ra quyết định</p>
                </div>
              </div>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-5">
                {/* Thông tin yêu cầu */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm text-slate-900 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-green-600" />
                      Thông tin yêu cầu
                    </h4>
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                      Chờ duyệt
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Mã yêu cầu</p>
                      <p className="text-slate-900 font-mono">REQ-2024-001</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Loại yêu cầu</p>
                      <p className="text-slate-900">Xuất bản dịch vụ mới</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Người gửi</p>
                      <p className="text-slate-900">Nguyễn Văn X - Chuyên viên CNTT</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Ngày gửi</p>
                      <p className="text-slate-900">22/12/2024 14:30</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-slate-500 mb-1">Độ ưu tiên</p>
                      <span className="inline-flex px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                        Cao
                      </span>
                    </div>
                  </div>
                </div>

                {/* Thông tin dịch vụ */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="text-sm text-green-900 mb-3 flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    Thông tin dịch vụ
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-green-700 mb-1">Mã dịch vụ</p>
                      <p className="text-slate-900 font-mono">{selectedService.code}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-700 mb-1">Tên dịch vụ</p>
                      <p className="text-slate-900">{selectedService.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-700 mb-1">Loại dịch vụ</p>
                      <p className="text-slate-900">{selectedService.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-700 mb-1">Phiên bản</p>
                      <p className="text-slate-900">{selectedService.version}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-green-700 mb-1">Endpoint</p>
                      <p className="text-slate-900 font-mono text-xs break-all">{selectedService.endpoint}</p>
                    </div>
                  </div>
                </div>

                {/* Lý do trình duyệt */}
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Lý do trình duyệt</label>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Dịch vụ này được phát triển để phục vụ việc tra cứu thông tin hồ sơ công chứng cho các đơn vị thuộc Bộ Tư pháp. 
                      Dịch vụ đã được kiểm thử đầy đủ và cần được đưa vào vận hành để phục vụ công tác nghiệp vụ.
                    </p>
                  </div>
                </div>

                {/* Tệp đính kèm */}
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Tệp đính kèm</label>
                  <div className="border border-slate-200 rounded-lg p-3">
                    <div className="flex items-center gap-3 text-sm">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-slate-900">De_xuat_dich_vu_cong_chung.pdf</p>
                        <p className="text-xs text-slate-500">1.2 MB</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">Tải xuống</button>
                    </div>
                  </div>
                </div>

                {/* Ý kiến phê duyệt */}
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Ý kiến phê duyệt *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Nhập ý kiến, nhận xét về yêu cầu này..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>

                {/* Phê duyệt 2 cấp */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <label className="block text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Phê duyệt 2 cấp *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        id="approve-service"
                        name="approveService"
                        defaultChecked
                        className="w-5 h-5 text-green-600 border-slate-300 rounded focus:ring-2 focus:ring-green-500 mt-0.5"
                      />
                      <div>
                        <span className="text-sm text-slate-900 font-medium group-hover:text-green-700">
                          Duyệt dịch vụ
                        </span>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Cho phép dịch vụ hoạt động và cung cấp dữ liệu
                        </p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        id="approve-public"
                        name="approvePublic"
                        className="w-5 h-5 text-green-600 border-slate-300 rounded focus:ring-2 focus:ring-green-500 mt-0.5"
                      />
                      <div>
                        <span className="text-sm text-slate-900 font-medium group-hover:text-green-700">
                          Duyệt công khai
                        </span>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Cho phép dịch vụ được công khai cho người dùng bên ngoài
                        </p>
                      </div>
                    </label>
                  </div>
                  <p className="text-xs text-green-700 mt-3 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Bạn có thể duyệt riêng từng cấp hoặc duyệt cả 2 cùng lúc
                  </p>
                </div>

                {/* Quyết định */}
                <div className="pt-3 border-t border-slate-200">
                  <label className="block text-sm text-slate-700 mb-3">
                    Quyết định *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="decision"
                        value="approve"
                        defaultChecked
                        className="w-4 h-4 text-green-600 border-slate-300 focus:ring-2 focus:ring-green-500"
                      />
                      <span className="text-sm text-green-700 font-medium">Phê duyệt</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="decision"
                        value="reject"
                        className="w-4 h-4 text-red-600 border-slate-300 focus:ring-2 focus:ring-red-500"
                      />
                      <span className="text-sm text-red-700 font-medium">Từ chối</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="decision"
                        value="request-change"
                        className="w-4 h-4 text-orange-600 border-slate-300 focus:ring-2 focus:ring-orange-500"
                      />
                      <span className="text-sm text-orange-700 font-medium">Yêu cầu chỉnh sửa</span>
                    </label>
                  </div>
                </div>

                {/* Thông báo quyết định */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <label className="block text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    Thông báo quyết định
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        id="notify-email"
                        name="notifyEmail"
                        defaultChecked
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500 mt-0.5"
                      />
                      <div>
                        <span className="text-sm text-slate-900 font-medium group-hover:text-blue-700">
                          Gửi Email
                        </span>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Gửi thông báo quyết định phê duyệt tới email người gửi yêu cầu
                        </p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        id="notify-sms"
                        name="notifySms"
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500 mt-0.5"
                      />
                      <div>
                        <span className="text-sm text-slate-900 font-medium group-hover:text-blue-700">
                          Gửi SMS
                        </span>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Gửi tin nhắn SMS thông báo kết quả phê duyệt
                        </p>
                      </div>
                    </label>
                  </div>
                  <p className="text-xs text-blue-700 mt-3 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    Thông báo sẽ được gửi ngay sau khi xác nhận quyết định
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                Quyết định sẽ được ghi nhận vào lịch sử
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="px-4 py-2.5 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    // Lấy giá trị quyết định từ radio button
                    const decisionElement = document.querySelector('input[name="decision"]:checked') as HTMLInputElement;
                    const decision = decisionElement?.value || 'approve';
                    
                    // Lấy giá trị checkbox phê duyệt 2 cấp
                    const approveServiceCheckbox = document.getElementById('approve-service') as HTMLInputElement;
                    const approvePublicCheckbox = document.getElementById('approve-public') as HTMLInputElement;
                    
                    // Lấy giá trị checkbox thông báo
                    const notifyEmailCheckbox = document.getElementById('notify-email') as HTMLInputElement;
                    const notifySmsCheckbox = document.getElementById('notify-sms') as HTMLInputElement;
                    
                    // Cập nhật trạng thái dịch vụ dựa trên quyết định
                    if (decision === 'approve') {
                      // Phê duyệt → Cập nhật theo checkbox
                      const newStatus = approveServiceCheckbox?.checked ? 'active' : selectedService.status;
                      const newVisibility = approvePublicCheckbox?.checked ? 'public' : 'private';
                      
                      setServices(services.map(s =>
                        s.id === selectedService.id 
                          ? { ...s, status: newStatus as any, visibility: newVisibility as any } 
                          : s
                      ));
                    } else {
                      // Từ chối hoặc yêu cầu chỉnh sửa → status = 'inactive', visibility = 'private'
                      setServices(services.map(s =>
                        s.id === selectedService.id 
                          ? { ...s, status: 'inactive' as any, visibility: 'private' as any } 
                          : s
                      ));
                    }
                    
                    // Hiển thị thông báo gửi email/SMS
                    const notifications = [];
                    if (notifyEmailCheckbox?.checked) notifications.push('Email');
                    if (notifySmsCheckbox?.checked) notifications.push('SMS');
                    
                    if (notifications.length > 0) {
                      alert(`✓ Quyết định đã được xác nhận!\n\n📧 Thông báo sẽ được gửi qua: ${notifications.join(' và ')}\n\nNgười nhận: Nguyễn Văn X (chuyenvien@botuphap.gov.vn | 0912345678)`);
                    }
                    
                    setShowApprovalModal(false);
                  }}
                  className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Xác nhận quyết định
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
