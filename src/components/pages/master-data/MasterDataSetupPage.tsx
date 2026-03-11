import { useState } from 'react';
import { Plus, Search, Settings, Eye, Edit, Trash2, CheckCircle, XCircle, Save, X } from 'lucide-react';

interface MasterDataConfig {
  id: string;
  code: string;
  name: string;
  description: string;
  dataType: 'text' | 'number' | 'date' | 'select';
  isRequired: boolean;
  status: 'active' | 'inactive';
  createdDate: string;
  updatedDate: string;
}

const mockConfigs: MasterDataConfig[] = [
  {
    id: '1',
    code: 'MDC001',
    name: 'Cấu hình A',
    description: 'Thiết lập cấu hình cho danh mục A',
    dataType: 'text',
    isRequired: true,
    status: 'active',
    createdDate: '01/01/2024',
    updatedDate: '10/12/2024'
  },
  {
    id: '2',
    code: 'MDC002',
    name: 'Cấu hình B',
    description: 'Thiết lập cấu hình cho danh mục B',
    dataType: 'select',
    isRequired: false,
    status: 'active',
    createdDate: '15/02/2024',
    updatedDate: '08/12/2024'
  },
  {
    id: '3',
    code: 'MDC003',
    name: 'Cấu hình C',
    description: 'Thiết lập cấu hình cho danh mục C',
    dataType: 'number',
    isRequired: true,
    status: 'inactive',
    createdDate: '20/03/2024',
    updatedDate: '05/12/2024'
  },
];

export function MasterDataSetupPage() {
  const [configs, setConfigs] = useState<MasterDataConfig[]>(mockConfigs);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<MasterDataConfig | null>(null);
  const [formData, setFormData] = useState<Partial<MasterDataConfig>>({
    code: '',
    name: '',
    description: '',
    dataType: 'text',
    isRequired: false,
    status: 'active'
  });

  const filteredConfigs = configs.filter(config => 
    config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    config.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 border border-green-200 rounded-full">
        Hoạt động
      </span>
    ) : (
      <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 border border-slate-200 rounded-full">
        Ngừng hoạt động
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Thiết lập dữ liệu chủ</h1>
          <p className="text-sm text-slate-600 mt-1">Quản lý cấu hình và thiết lập cho các dữ liệu chủ</p>
        </div>
        <button 
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-4 h-4" />
          Thêm cấu hình mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="text-xs text-slate-600">Tổng cấu hình</div>
              <div className="text-slate-900 mt-1">{configs.length}</div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-xs text-slate-600">Đang hoạt động</div>
              <div className="text-slate-900 mt-1">{configs.filter(c => c.status === 'active').length}</div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <div className="text-xs text-slate-600">Ngừng hoạt động</div>
              <div className="text-slate-900 mt-1">{configs.filter(c => c.status === 'inactive').length}</div>
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
            placeholder="Tìm kiếm theo tên, mã cấu hình..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Config List */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">STT</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Mã cấu hình</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Tên cấu hình</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Kiểu dữ liệu</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Bắt buộc</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Trạng thái</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredConfigs.map((config, index) => (
                <tr key={config.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-700">{index + 1}</td>
                  <td className="px-4 py-3 text-sm">
                    <code className="px-2 py-0.5 bg-slate-100 text-teal-700 rounded text-xs">
                      {config.code}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-slate-900">{config.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{config.description}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700 capitalize">{config.dataType}</td>
                  <td className="px-4 py-3 text-sm">
                    {config.isRequired ? (
                      <span className="text-red-600">Có</span>
                    ) : (
                      <span className="text-slate-500">Không</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">{getStatusBadge(config.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded"
                        title="Chỉnh sửa"
                        onClick={() => {
                          setSelectedConfig(config);
                          setFormData(config);
                          setShowEditModal(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        title="Xóa"
                        onClick={() => {
                          setSelectedConfig(config);
                          setShowDeleteModal(true);
                        }}
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-slate-900">Thêm cấu hình mới</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Mã cấu hình <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Nhập mã cấu hình"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Kiểu dữ liệu <span className="text-red-500">*</span></label>
                  <select
                    value={formData.dataType}
                    onChange={(e) => setFormData({...formData, dataType: e.target.value as any})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    <option value="select">Select</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Tên cấu hình <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Nhập tên cấu hình"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows={3}
                  placeholder="Nhập mô tả"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isRequired"
                    checked={formData.isRequired}
                    onChange={(e) => setFormData({...formData, isRequired: e.target.checked})}
                    className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-2 focus:ring-teal-500"
                  />
                  <label htmlFor="isRequired" className="text-sm text-slate-700">Bắt buộc</label>
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Trạng thái</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Ngừng hoạt động</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-slate-900">Chỉnh sửa cấu hình</h2>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Mã cấu hình <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Kiểu dữ liệu <span className="text-red-500">*</span></label>
                  <select
                    value={formData.dataType}
                    onChange={(e) => setFormData({...formData, dataType: e.target.value as any})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    <option value="select">Select</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Tên cấu hình <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isRequiredEdit"
                    checked={formData.isRequired}
                    onChange={(e) => setFormData({...formData, isRequired: e.target.checked})}
                    className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-2 focus:ring-teal-500"
                  />
                  <label htmlFor="isRequiredEdit" className="text-sm text-slate-700">Bắt buộc</label>
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Trạng thái</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Ngừng hoạt động</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedConfig && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-slate-900">Xác nhận xóa</h2>
              <button onClick={() => setShowDeleteModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-700">
                Bạn có chắc chắn muốn xóa cấu hình <strong>{selectedConfig.name}</strong>?
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Hành động này không thể hoàn tác.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
