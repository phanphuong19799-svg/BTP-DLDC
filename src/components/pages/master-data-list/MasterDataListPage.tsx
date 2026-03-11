import { useState } from 'react';
import { Plus, Search, Settings, Eye, Edit, Trash2, CheckSquare, Share2, FileSearch, BarChart3, Filter, List, Send, CheckCircle } from 'lucide-react';

interface MasterData {
  id: string;
  code: string;
  name: string;
  description: string;
  dataType: 'standard' | 'reference' | 'system';
  parentCategory?: string;
  isActive: boolean;
  createdDate: string;
  updatedDate: string;
}

interface ApprovalRequest {
  id: string;
  categoryCode: string;
  categoryName: string;
  requestType: 'create' | 'update' | 'delete';
  requester: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  description?: string;
}

interface PublishedMasterData {
  id: string;
  code: string;
  name: string;
  description?: string;
  publishDate: string;
  downloads: number;
  views: number;
  status: 'public' | 'private';
}

const mockMasterData: MasterData[] = [
  {
    id: '1',
    code: 'MD001',
    name: 'Dữ liệu chủ A',
    description: 'Dữ liệu chủ quản lý thông tin A',
    dataType: 'standard',
    isActive: true,
    createdDate: '01/01/2024',
    updatedDate: '10/12/2024'
  },
  {
    id: '2',
    code: 'MD002',
    name: 'Dữ liệu chủ B',
    description: 'Dữ liệu chủ quản lý thông tin B',
    dataType: 'reference',
    isActive: true,
    createdDate: '15/02/2024',
    updatedDate: '08/12/2024'
  },
  {
    id: '3',
    code: 'MD003',
    name: 'Dữ liệu chủ C',
    description: 'Dữ liệu chủ quản lý thông tin C',
    dataType: 'system',
    isActive: false,
    createdDate: '20/03/2024',
    updatedDate: '05/12/2024'
  },
];

const mockApprovalRequests: ApprovalRequest[] = [
  {
    id: '1',
    categoryCode: 'MD004',
    categoryName: 'Dữ liệu chủ D',
    requestType: 'create',
    requester: 'Nguyễn Văn A',
    requestDate: '12/12/2024',
    status: 'pending',
    description: 'Yêu cầu tạo mới dữ liệu chủ D'
  },
  {
    id: '2',
    categoryCode: 'MD001',
    categoryName: 'Dữ liệu chủ A',
    requestType: 'update',
    requester: 'Trần Thị B',
    requestDate: '10/12/2024',
    status: 'approved',
    description: 'Cập nhật mô tả dữ liệu chủ A'
  },
  {
    id: '3',
    categoryCode: 'MD005',
    categoryName: 'Dữ liệu chủ E',
    requestType: 'create',
    requester: 'Lê Văn C',
    requestDate: '08/12/2024',
    status: 'rejected',
    description: 'Yêu cầu tạo dữ liệu chủ E không hợp lệ'
  },
];

const mockPublishedMasterData: PublishedMasterData[] = [
  {
    id: '1',
    code: 'MD001',
    name: 'Dữ liệu chủ A',
    description: 'Dữ liệu chủ quản lý thông tin A',
    publishDate: '01/11/2024',
    downloads: 2456,
    views: 8920,
    status: 'public'
  },
  {
    id: '2',
    code: 'MD002',
    name: 'Dữ liệu chủ B',
    description: 'Dữ liệu chủ quản lý thông tin B',
    publishDate: '15/10/2024',
    downloads: 1543,
    views: 5640,
    status: 'public'
  },
  {
    id: '3',
    code: 'MD006',
    name: 'Dữ liệu chủ F',
    description: 'Dữ liệu chủ quản lý thông tin F',
    publishDate: '20/09/2024',
    downloads: 456,
    views: 1987,
    status: 'private'
  },
];

export function MasterDataListPage() {
  const [activeTab, setActiveTab] = useState<'setup' | 'approval' | 'publish' | 'report' | 'statistics'>('setup');
  const [masterData, setMasterData] = useState<MasterData[]>(mockMasterData);
  const [approvalRequests] = useState<ApprovalRequest[]>(mockApprovalRequests);
  const [publishedMasterData] = useState<PublishedMasterData[]>(mockPublishedMasterData);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  
  // Approval tab filters
  const [approvalFilterStatus, setApprovalFilterStatus] = useState<string>('all');
  const [approvalFilterType, setApprovalFilterType] = useState<string>('all');
  
  // Publish tab filters
  const [publishFilterStatus, setPublishFilterStatus] = useState<string>('all');

  // Filter logic for Setup tab
  const filteredMasterData = masterData.filter(data => {
    const matchSearch = data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       data.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || (filterStatus === 'active' ? data.isActive : !data.isActive);
    const matchType = filterType === 'all' || data.dataType === filterType;
    return matchSearch && matchStatus && matchType;
  });

  // Filter logic for Approval tab
  const filteredApprovalRequests = approvalRequests.filter(req => {
    const matchStatus = approvalFilterStatus === 'all' || req.status === approvalFilterStatus;
    const matchType = approvalFilterType === 'all' || req.requestType === approvalFilterType;
    return matchStatus && matchType;
  });

  // Filter logic for Publish tab
  const filteredPublishedMasterData = publishedMasterData.filter(data => {
    const matchStatus = publishFilterStatus === 'all' || data.status === publishFilterStatus;
    return matchStatus;
  });

  // Handle stats card click for Setup tab
  const handleStatsClick = (type: string) => {
    if (type === 'all') {
      setFilterStatus('all');
      setFilterType('all');
    } else if (type === 'active' || type === 'inactive') {
      setFilterStatus(type);
      setFilterType('all');
    } else {
      setFilterType(type);
      setFilterStatus('all');
    }
  };

  // Handle stats card click for Approval tab
  const handleApprovalStatsClick = (status: string) => {
    setApprovalFilterStatus(status);
    setApprovalFilterType('all');
  };

  // Handle stats card click for Publish tab
  const handlePublishStatsClick = (status: string) => {
    setPublishFilterStatus(status);
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 border border-green-200 rounded-full">
        Hoạt động
      </span>
    ) : (
      <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 border border-slate-200 rounded-full">
        Ngừng hoạt động
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      standard: 'bg-blue-100 text-blue-700 border-blue-200',
      reference: 'bg-amber-100 text-amber-700 border-amber-200',
      system: 'bg-slate-100 text-slate-700 border-slate-200'
    };
    const labels = {
      standard: 'Chuẩn',
      reference: 'Tham chiếu',
      system: 'Hệ thống'
    };
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${styles[type as keyof typeof styles]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    );
  };

  const getApprovalStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
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

  const getRequestTypeBadge = (type: string) => {
    const styles = {
      create: 'bg-blue-100 text-blue-700 border-blue-200',
      update: 'bg-amber-100 text-amber-700 border-amber-200',
      delete: 'bg-red-100 text-red-700 border-red-200'
    };
    const labels = {
      create: 'Tạo mới',
      update: 'Cập nhật',
      delete: 'Xóa'
    };
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${styles[type as keyof typeof styles]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    );
  };

  const getPublishStatusBadge = (status: string) => {
    return status === 'public' ? (
      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 border border-green-200 rounded-full">
        Công khai
      </span>
    ) : (
      <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 border border-slate-200 rounded-full">
        Riêng tư
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('setup')}
            className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors ${
              activeTab === 'setup'
                ? 'bg-slate-50 text-slate-700 border-b-2 border-slate-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            Thiết lập
          </button>
          <button
            onClick={() => setActiveTab('approval')}
            className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors ${
              activeTab === 'approval'
                ? 'bg-slate-50 text-slate-700 border-b-2 border-slate-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            Phê duyệt
          </button>
          <button
            onClick={() => setActiveTab('publish')}
            className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors ${
              activeTab === 'publish'
                ? 'bg-slate-50 text-slate-700 border-b-2 border-slate-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Share2 className="w-4 h-4" />
            Công khai dữ liệu chủ
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors ${
              activeTab === 'report'
                ? 'bg-slate-50 text-slate-700 border-b-2 border-slate-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileSearch className="w-4 h-4" />
            Báo cáo và tìm kiếm
          </button>
          <button
            onClick={() => setActiveTab('statistics')}
            className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors ${
              activeTab === 'statistics'
                ? 'bg-slate-50 text-slate-700 border-b-2 border-slate-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Thu thập số liệu thống kê
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Tab 1: Thiết lập */}
          {activeTab === 'setup' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-slate-900">Thiết lập dữ liệu chủ</h2>
                  <p className="text-sm text-slate-600 mt-1">Quản lý cấu hình và thiết lập các dữ liệu chủ</p>
                </div>
                <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Thêm dữ liệu chủ mới
                </button>
              </div>

              {/* Stats - Clickable */}
              <div className="grid grid-cols-4 gap-4">
                <button
                  onClick={() => handleStatsClick('all')}
                  className={`bg-slate-50 border border-slate-200 rounded-lg p-4 text-left transition-all hover:shadow-md hover:border-slate-300 ${
                    filterStatus === 'all' && filterType === 'all' ? 'ring-2 ring-slate-700 bg-slate-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <List className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-600">Tổng dữ liệu chủ</div>
                      <div className="text-slate-900 mt-1">{masterData.length}</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleStatsClick('active')}
                  className={`bg-slate-50 border border-slate-200 rounded-lg p-4 text-left transition-all hover:shadow-md hover:border-green-300 ${
                    filterStatus === 'active' ? 'ring-2 ring-green-500 bg-green-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-600">Đang hoạt động</div>
                      <div className="text-slate-900 mt-1">{masterData.filter(c => c.isActive).length}</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleStatsClick('standard')}
                  className={`bg-slate-50 border border-slate-200 rounded-lg p-4 text-left transition-all hover:shadow-md hover:border-blue-300 ${
                    filterType === 'standard' ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-600">Dữ liệu chuẩn</div>
                      <div className="text-slate-900 mt-1">{masterData.filter(c => c.dataType === 'standard').length}</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleStatsClick('reference')}
                  className={`bg-slate-50 border border-slate-200 rounded-lg p-4 text-left transition-all hover:shadow-md hover:border-amber-300 ${
                    filterType === 'reference' ? 'ring-2 ring-amber-500 bg-amber-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-600">Dữ liệu tham chiếu</div>
                      <div className="text-slate-900 mt-1">{masterData.filter(c => c.dataType === 'reference').length}</div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Search & Filter */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, mã dữ liệu chủ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-700"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 appearance-none bg-white"
                      >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="active">Hoạt động</option>
                        <option value="inactive">Ngừng hoạt động</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 appearance-none bg-white"
                      >
                        <option value="all">Tất cả loại</option>
                        <option value="standard">Chuẩn</option>
                        <option value="reference">Tham chiếu</option>
                        <option value="system">Hệ thống</option>
                      </select>
                    </div>
                  </div>
                </div>
                {(filterStatus !== 'all' || filterType !== 'all' || searchTerm) && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <span>Đang lọc: {filteredMasterData.length} / {masterData.length} dữ liệu chủ</span>
                    <button
                      onClick={() => {
                        setFilterStatus('all');
                        setFilterType('all');
                        setSearchTerm('');
                      }}
                      className="text-slate-700 hover:text-slate-900 underline"
                    >
                      Xóa bộ lọc
                    </button>
                  </div>
                )}
              </div>

              {/* Master Data List */}
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">STT</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Mã dữ liệu chủ</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Tên dữ liệu chủ</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Loại</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Trạng thái</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Ngày cập nhật</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredMasterData.length > 0 ? (
                        filteredMasterData.map((data, index) => (
                          <tr key={data.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm text-slate-700">{index + 1}</td>
                            <td className="px-4 py-3 text-sm">
                              <code className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs">
                                {data.code}
                              </code>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm text-slate-900">{data.name}</div>
                              <div className="text-xs text-slate-500 mt-0.5">{data.description}</div>
                            </td>
                            <td className="px-4 py-3 text-sm">{getTypeBadge(data.dataType)}</td>
                            <td className="px-4 py-3 text-sm">{getStatusBadge(data.isActive)}</td>
                            <td className="px-4 py-3 text-sm text-slate-700">{data.updatedDate}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Xem chi tiết">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="Gửi phê duyệt">
                                  <Send className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors" title="Phê duyệt">
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 text-amber-600 hover:bg-amber-50 rounded transition-colors" title="Chỉnh sửa">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Xóa">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-500">
                            Không tìm thấy dữ liệu chủ phù hợp
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Phê duyệt */}
          {activeTab === 'approval' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-slate-900">Phê duyệt dữ liệu chủ</h2>
                <p className="text-sm text-slate-600 mt-1">Trình và phê duyệt các yêu cầu thay đổi dữ liệu chủ</p>
              </div>

              {/* Stats - Clickable */}
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => handleApprovalStatsClick('pending')}
                  className={`bg-slate-50 border border-slate-200 rounded-lg p-4 text-left transition-all hover:shadow-md hover:border-yellow-300 ${
                    approvalFilterStatus === 'pending' ? 'ring-2 ring-yellow-500 bg-yellow-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <CheckSquare className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-600">Chờ duyệt</div>
                      <div className="text-slate-900 mt-1">{approvalRequests.filter(r => r.status === 'pending').length}</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleApprovalStatsClick('approved')}
                  className={`bg-slate-50 border border-slate-200 rounded-lg p-4 text-left transition-all hover:shadow-md hover:border-green-300 ${
                    approvalFilterStatus === 'approved' ? 'ring-2 ring-green-500 bg-green-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckSquare className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-600">Đã duyệt</div>
                      <div className="text-slate-900 mt-1">{approvalRequests.filter(r => r.status === 'approved').length}</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleApprovalStatsClick('rejected')}
                  className={`bg-slate-50 border border-slate-200 rounded-lg p-4 text-left transition-all hover:shadow-md hover:border-red-300 ${
                    approvalFilterStatus === 'rejected' ? 'ring-2 ring-red-500 bg-red-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <CheckSquare className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-600">Từ chối</div>
                      <div className="text-slate-900 mt-1">{approvalRequests.filter(r => r.status === 'rejected').length}</div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Filter */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        value={approvalFilterStatus}
                        onChange={(e) => setApprovalFilterStatus(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 appearance-none bg-white"
                      >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="pending">Chờ duyệt</option>
                        <option value="approved">Đã duyệt</option>
                        <option value="rejected">Từ chối</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        value={approvalFilterType}
                        onChange={(e) => setApprovalFilterType(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 appearance-none bg-white"
                      >
                        <option value="all">Tất cả loại yêu cầu</option>
                        <option value="create">Tạo mới</option>
                        <option value="update">Cập nhật</option>
                        <option value="delete">Xóa</option>
                      </select>
                    </div>
                  </div>
                </div>
                {(approvalFilterStatus !== 'all' || approvalFilterType !== 'all') && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <span>Đang lọc: {filteredApprovalRequests.length} / {approvalRequests.length} yêu cầu</span>
                    <button
                      onClick={() => {
                        setApprovalFilterStatus('all');
                        setApprovalFilterType('all');
                      }}
                      className="text-slate-700 hover:text-slate-900 underline"
                    >
                      Xóa bộ lọc
                    </button>
                  </div>
                )}
              </div>

              {/* Approval List */}
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">STT</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Mã dữ liệu chủ</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Tên dữ liệu chủ</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Loại yêu cầu</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Người yêu cầu</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Ngày yêu cầu</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Trạng thái</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredApprovalRequests.length > 0 ? (
                        filteredApprovalRequests.map((request, index) => (
                          <tr key={request.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm text-slate-700">{index + 1}</td>
                            <td className="px-4 py-3 text-sm">
                              <code className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs">
                                {request.categoryCode}
                              </code>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm text-slate-900">{request.categoryName}</div>
                              {request.description && (
                                <div className="text-xs text-slate-500 mt-0.5">{request.description}</div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm">{getRequestTypeBadge(request.requestType)}</td>
                            <td className="px-4 py-3 text-sm text-slate-700">{request.requester}</td>
                            <td className="px-4 py-3 text-sm text-slate-700">{request.requestDate}</td>
                            <td className="px-4 py-3 text-sm">{getApprovalStatusBadge(request.status)}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Xem chi tiết">
                                  <Eye className="w-4 h-4" />
                                </button>
                                {request.status === 'pending' && (
                                  <>
                                    <button className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors" title="Phê duyệt">
                                      <CheckSquare className="w-4 h-4" />
                                    </button>
                                    <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Từ chối">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="px-4 py-8 text-center text-sm text-slate-500">
                            Không có yêu cầu phê duyệt nào
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Công khai */}
          {activeTab === 'publish' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-slate-900">Công khai dữ liệu chủ</h2>
                <p className="text-sm text-slate-600 mt-1">Quản lý việc công khai và chia sẻ dữ liệu chủ</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => handlePublishStatsClick('all')}
                  className={`bg-slate-50 border border-slate-200 rounded-lg p-4 text-left transition-all hover:shadow-md hover:border-slate-300 ${
                    publishFilterStatus === 'all' ? 'ring-2 ring-slate-700 bg-slate-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Share2 className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-600">Tổng dữ liệu đã công khai</div>
                      <div className="text-slate-900 mt-1">{publishedMasterData.length}</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handlePublishStatsClick('public')}
                  className={`bg-slate-50 border border-slate-200 rounded-lg p-4 text-left transition-all hover:shadow-md hover:border-green-300 ${
                    publishFilterStatus === 'public' ? 'ring-2 ring-green-500 bg-green-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Share2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-600">Công khai</div>
                      <div className="text-slate-900 mt-1">{publishedMasterData.filter(d => d.status === 'public').length}</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handlePublishStatsClick('private')}
                  className={`bg-slate-50 border border-slate-200 rounded-lg p-4 text-left transition-all hover:shadow-md hover:border-slate-300 ${
                    publishFilterStatus === 'private' ? 'ring-2 ring-slate-500 bg-slate-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Share2 className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-600">Riêng tư</div>
                      <div className="text-slate-900 mt-1">{publishedMasterData.filter(d => d.status === 'private').length}</div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Published List */}
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">STT</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Mã dữ liệu chủ</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Tên dữ liệu chủ</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Ngày công khai</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Lượt tải</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Lượt xem</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Trạng thái</th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPublishedMasterData.length > 0 ? (
                        filteredPublishedMasterData.map((data, index) => (
                          <tr key={data.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm text-slate-700">{index + 1}</td>
                            <td className="px-4 py-3 text-sm">
                              <code className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs">
                                {data.code}
                              </code>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm text-slate-900">{data.name}</div>
                              {data.description && (
                                <div className="text-xs text-slate-500 mt-0.5">{data.description}</div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">{data.publishDate}</td>
                            <td className="px-4 py-3 text-sm text-slate-700">{data.downloads.toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm text-slate-700">{data.views.toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm">{getPublishStatusBadge(data.status)}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Xem chi tiết">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 text-amber-600 hover:bg-amber-50 rounded transition-colors" title="Chỉnh sửa">
                                  <Edit className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="px-4 py-8 text-center text-sm text-slate-500">
                            Không có dữ liệu chủ nào được công khai
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Báo cáo và tìm kiếm */}
          {activeTab === 'report' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-slate-900">Báo cáo và tìm kiếm dữ liệu chủ</h2>
                <p className="text-sm text-slate-600 mt-1">Tìm kiếm và xuất báo cáo về dữ liệu chủ</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <FileSearch className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-600">Chức năng báo cáo và tìm kiếm đang được phát triển</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Thu thập số liệu thống kê */}
          {activeTab === 'statistics' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-slate-900">Thu thập số liệu thống kê</h2>
                <p className="text-sm text-slate-600 mt-1">Thống kê và phân tích dữ liệu chủ</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-600">Chức năng thống kê đang được phát triển</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}