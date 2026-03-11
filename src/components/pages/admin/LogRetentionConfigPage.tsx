import { useState } from 'react';
import { 
  Clock, 
  Search, 
  Download, 
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Database,
  Shield,
  AlertTriangle,
  UserCog,
  Settings,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { StatsCard } from '../../common/StatsCard';

interface LogRetentionConfig {
  id: number;
  logType: 'access' | 'error' | 'account' | 'config' | 'system' | 'security';
  logTypeName: string;
  retentionDays: number;
  description: string;
  isActive: boolean;
  lastUpdated: string;
  updatedBy: string;
}

const initialConfigs: LogRetentionConfig[] = [
  {
    id: 1,
    logType: 'access',
    logTypeName: 'Nhật ký truy cập',
    retentionDays: 90,
    description: 'Lưu trữ nhật ký đăng nhập và truy cập hệ thống',
    isActive: true,
    lastUpdated: '15/12/2024 10:30:00',
    updatedBy: 'Admin Hệ thống'
  },
  {
    id: 2,
    logType: 'error',
    logTypeName: 'Nhật ký lỗi phát sinh',
    retentionDays: 180,
    description: 'Lưu trữ các lỗi phát sinh trong quá trình hoạt động',
    isActive: true,
    lastUpdated: '15/12/2024 10:30:00',
    updatedBy: 'Admin Hệ thống'
  },
  {
    id: 3,
    logType: 'account',
    logTypeName: 'Nhật ký quản lý tài khoản',
    retentionDays: 365,
    description: 'Lưu trữ các thao tác quản lý tài khoản người dùng',
    isActive: true,
    lastUpdated: '15/12/2024 10:30:00',
    updatedBy: 'Admin Hệ thống'
  },
  {
    id: 4,
    logType: 'config',
    logTypeName: 'Nhật ký thay đổi cấu hình',
    retentionDays: 365,
    description: 'Lưu trữ các thay đổi cấu hình hệ thống',
    isActive: true,
    lastUpdated: '15/12/2024 10:30:00',
    updatedBy: 'Admin Hệ thống'
  },
  {
    id: 5,
    logType: 'system',
    logTypeName: 'Nhật ký hệ thống',
    retentionDays: 90,
    description: 'Lưu trữ các sự kiện hệ thống',
    isActive: true,
    lastUpdated: '15/12/2024 10:30:00',
    updatedBy: 'Admin Hệ thống'
  },
  {
    id: 6,
    logType: 'security',
    logTypeName: 'Nhật ký bảo mật',
    retentionDays: 730,
    description: 'Lưu trữ các sự kiện liên quan đến bảo mật',
    isActive: true,
    lastUpdated: '15/12/2024 10:30:00',
    updatedBy: 'Admin Hệ thống'
  }
];

export function LogRetentionConfigPage() {
  const [configs, setConfigs] = useState<LogRetentionConfig[]>(initialConfigs);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<LogRetentionConfig | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    logTypeName: '',
    retentionDays: 90,
    description: '',
    isActive: true
  });

  const filteredConfigs = configs.filter(config => 
    config.logTypeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    config.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setFormData({
      logTypeName: '',
      retentionDays: 90,
      description: '',
      isActive: true
    });
    setShowAddModal(true);
  };

  const handleEdit = (config: LogRetentionConfig) => {
    setSelectedConfig(config);
    setFormData({
      logTypeName: config.logTypeName,
      retentionDays: config.retentionDays,
      description: config.description,
      isActive: config.isActive
    });
    setShowEditModal(true);
  };

  const handleDelete = (config: LogRetentionConfig) => {
    setSelectedConfig(config);
    setShowDeleteConfirm(true);
  };

  const confirmAdd = () => {
    if (!formData.logTypeName || formData.retentionDays <= 0) {
      alert('Vui lòng nhập đầy đủ thông tin hợp lệ!');
      return;
    }

    const newConfig: LogRetentionConfig = {
      id: Math.max(...configs.map(c => c.id)) + 1,
      logType: 'system',
      logTypeName: formData.logTypeName,
      retentionDays: formData.retentionDays,
      description: formData.description,
      isActive: formData.isActive,
      lastUpdated: new Date().toLocaleString('vi-VN'),
      updatedBy: 'Admin Hệ thống'
    };

    setConfigs([...configs, newConfig]);
    setShowAddModal(false);
    alert('Thêm mới cấu hình thành công!');
  };

  const confirmEdit = () => {
    if (!selectedConfig || !formData.logTypeName || formData.retentionDays <= 0) {
      alert('Vui lòng nhập đầy đủ thông tin hợp lệ!');
      return;
    }

    const updatedConfigs = configs.map(config => 
      config.id === selectedConfig.id 
        ? {
            ...config,
            logTypeName: formData.logTypeName,
            retentionDays: formData.retentionDays,
            description: formData.description,
            isActive: formData.isActive,
            lastUpdated: new Date().toLocaleString('vi-VN'),
            updatedBy: 'Admin Hệ thống'
          }
        : config
    );

    setConfigs(updatedConfigs);
    setShowEditModal(false);
    setSelectedConfig(null);
    alert('Cập nhật cấu hình thành công!');
  };

  const confirmDelete = () => {
    if (!selectedConfig) return;

    setConfigs(configs.filter(config => config.id !== selectedConfig.id));
    setShowDeleteConfirm(false);
    setSelectedConfig(null);
    alert('Xóa cấu hình thành công!');
  };

  const handleExportExcel = () => {
    alert('Đang xuất file Excel...');
  };

  const getLogTypeIcon = (type: LogRetentionConfig['logType']) => {
    switch (type) {
      case 'access':
        return <UserCog className="w-4 h-4" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4" />;
      case 'account':
        return <UserCog className="w-4 h-4" />;
      case 'config':
        return <Settings className="w-4 h-4" />;
      case 'system':
        return <Database className="w-4 h-4" />;
      case 'security':
        return <Shield className="w-4 h-4" />;
    }
  };

  const getLogTypeColor = (type: LogRetentionConfig['logType']) => {
    switch (type) {
      case 'access':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'error':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'account':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'config':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'system':
        return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'security':
        return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  const averageRetention = Math.round(
    configs.reduce((sum, c) => sum + c.retentionDays, 0) / configs.length
  );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard 
          icon={Database} 
          iconColor="blue" 
          title="Tổng loại nhật ký" 
          value={configs.length.toString()} 
        />
        <StatsCard 
          icon={Clock} 
          iconColor="green" 
          title="Thời gian TB (ngày)" 
          value={averageRetention.toString()} 
        />
        <StatsCard 
          icon={CheckCircle2} 
          iconColor="green" 
          title="Đang hoạt động" 
          value={configs.filter(c => c.isActive).length.toString()} 
        />
        <StatsCard 
          icon={Shield} 
          iconColor="orange" 
          title="Lưu trữ lâu nhất (ngày)" 
          value={Math.max(...configs.map(c => c.retentionDays)).toString()} 
        />
      </div>

      {/* Search & Actions */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm loại nhật ký..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Thêm mới
            </button>
            <button 
              onClick={handleExportExcel}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Xuất Excel
            </button>
          </div>
        </div>
      </div>

      {/* Config Table */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-slate-900">Danh sách cấu hình thời gian lưu trữ ({filteredConfigs.length} bản ghi)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">STT</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Loại nhật ký</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Thời gian lưu trữ</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Mô tả</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Cập nhật lần cuối</th>
                <th className="px-6 py-3 text-right text-xs text-slate-600 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredConfigs.map((config, index) => (
                <tr key={config.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-700">{index + 1}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${getLogTypeColor(config.logType)}`}>
                      {getLogTypeIcon(config.logType)}
                      {config.logTypeName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-slate-900">{config.retentionDays} ngày</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 max-w-md">{config.description}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs ${
                      config.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {config.isActive ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {config.isActive ? 'Hoạt động' : 'Tạm dừng'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">{config.lastUpdated}</div>
                    <div className="text-xs text-slate-500">{config.updatedBy}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(config)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(config)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
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
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-slate-900">Thêm mới cấu hình</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Tên loại nhật ký <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.logTypeName}
                  onChange={(e) => setFormData({...formData, logTypeName: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên loại nhật ký..."
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Thời gian lưu trữ (ngày) <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.retentionDays}
                  onChange={(e) => setFormData({...formData, retentionDays: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập số ngày..."
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập mô tả..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="text-sm text-slate-700">Kích hoạt</label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={confirmAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-slate-900">Sửa cấu hình</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Tên loại nhật ký <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.logTypeName}
                  onChange={(e) => setFormData({...formData, logTypeName: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên loại nhật ký..."
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Thời gian lưu trữ (ngày) <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.retentionDays}
                  onChange={(e) => setFormData({...formData, retentionDays: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập số ngày..."
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập mô tả..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActiveEdit"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="isActiveEdit" className="text-sm text-slate-700">Kích hoạt</label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={confirmEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-center text-slate-900 mb-2">Xác nhận xóa</h3>
              <p className="text-center text-slate-600 text-sm mb-6">
                Bạn có chắc chắn muốn xóa cấu hình "{selectedConfig.logTypeName}"?
                <br />Hành động này không thể hoàn tác.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setSelectedConfig(null);
                  }}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
