import { useState } from 'react';
import { Database, Search, FileText, BarChart3, History as HistoryIcon, Plus, Eye, Edit, Trash2, Download, Filter } from 'lucide-react';

interface MasterDataRecord {
  id: string;
  code: string;
  name: string;
  category: string;
  value: string;
  status: 'active' | 'inactive' | 'pending';
  createdBy: string;
  createdDate: string;
  updatedDate: string;
}

const mockRecords: MasterDataRecord[] = [
  {
    id: '1',
    code: 'MD001',
    name: 'Dữ liệu A',
    category: 'Danh mục A',
    value: 'Giá trị A',
    status: 'active',
    createdBy: 'Nguyễn Văn A',
    createdDate: '01/01/2024',
    updatedDate: '10/12/2024'
  },
  {
    id: '2',
    code: 'MD002',
    name: 'Dữ liệu B',
    category: 'Danh mục B',
    value: 'Giá trị B',
    status: 'active',
    createdBy: 'Trần Thị B',
    createdDate: '15/02/2024',
    updatedDate: '08/12/2024'
  },
  {
    id: '3',
    code: 'MD003',
    name: 'Dữ liệu C',
    category: 'Danh mục C',
    value: 'Giá trị C',
    status: 'pending',
    createdBy: 'Lê Văn C',
    createdDate: '20/03/2024',
    updatedDate: '05/12/2024'
  },
];

export function MasterDataManagementPage() {
  const [activeTab, setActiveTab] = useState<'management' | 'search' | 'report' | 'history'>('management');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || record.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700 border-green-200',
      inactive: 'bg-slate-100 text-slate-600 border-slate-200',
      pending: 'bg-amber-100 text-amber-700 border-amber-200'
    };
    const labels = {
      active: 'Hoạt động',
      inactive: 'Ngừng hoạt động',
      pending: 'Chờ duyệt'
    };
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Quản lý dữ liệu chủ</h1>
        <p className="text-sm text-slate-600 mt-1">Quản lý và tra cứu dữ liệu chủ của hệ thống</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('management')}
            className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors ${
              activeTab === 'management'
                ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Database className="w-4 h-4" />
            Quản lý dữ liệu
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors ${
              activeTab === 'search'
                ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Search className="w-4 h-4" />
            Tra cứu
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors ${
              activeTab === 'report'
                ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Báo cáo
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors ${
              activeTab === 'history'
                ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <HistoryIcon className="w-4 h-4" />
            Lịch sử
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Quản lý dữ liệu */}
          {activeTab === 'management' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-slate-900">Danh sách dữ liệu chủ</h3>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Thêm dữ liệu mới
                </button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">Tất cả danh mục</option>
                  <option value="Danh mục A">Danh mục A</option>
                  <option value="Danh mục B">Danh mục B</option>
                  <option value="Danh mục C">Danh mục C</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Ngừng hoạt động</option>
                  <option value="pending">Chờ duyệt</option>
                </select>
              </div>

              {/* Data Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">STT</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Mã dữ liệu</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Tên dữ liệu</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Danh mục</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Giá trị</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Trạng thái</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRecords.map((record, index) => (
                      <tr key={record.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm text-slate-700">{index + 1}</td>
                        <td className="px-4 py-3 text-sm">
                          <code className="px-2 py-0.5 bg-slate-100 text-teal-700 rounded text-xs">
                            {record.code}
                          </code>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-900">{record.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-700">{record.category}</td>
                        <td className="px-4 py-3 text-sm text-slate-700">{record.value}</td>
                        <td className="px-4 py-3 text-sm">{getStatusBadge(record.status)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Xem">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-amber-600 hover:bg-amber-50 rounded" title="Sửa">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Xóa">
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
          )}

          {/* Tra cứu */}
          {activeTab === 'search' && (
            <div className="space-y-4">
              <h3 className="text-slate-900">Tra cứu dữ liệu chủ</h3>
              
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">Mã dữ liệu</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Nhập mã dữ liệu"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">Tên dữ liệu</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Nhập tên dữ liệu"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">Danh mục</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <option>Tất cả danh mục</option>
                        <option>Danh mục A</option>
                        <option>Danh mục B</option>
                        <option>Danh mục C</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">Trạng thái</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <option>Tất cả trạng thái</option>
                        <option>Hoạt động</option>
                        <option>Ngừng hoạt động</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
                      Đặt lại
                    </button>
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Tìm kiếm
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  Nhập thông tin tìm kiếm và nhấn "Tìm kiếm" để xem kết quả
                </p>
              </div>
            </div>
          )}

          {/* Báo cáo */}
          {activeTab === 'report' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-slate-900">Báo cáo dữ liệu chủ</h3>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Xuất báo cáo
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="text-xs text-slate-600 mb-1">Tổng số bản ghi</div>
                  <div className="text-2xl text-slate-900">{mockRecords.length}</div>
                  <div className="text-xs text-green-600 mt-1">+12% so với tháng trước</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="text-xs text-slate-600 mb-1">Đang hoạt động</div>
                  <div className="text-2xl text-green-700">{mockRecords.filter(r => r.status === 'active').length}</div>
                  <div className="text-xs text-slate-500 mt-1">66.7% tổng số</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="text-xs text-slate-600 mb-1">Chờ duyệt</div>
                  <div className="text-2xl text-amber-700">{mockRecords.filter(r => r.status === 'pending').length}</div>
                  <div className="text-xs text-slate-500 mt-1">33.3% tổng số</div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg p-6">
                <h4 className="text-sm text-slate-900 mb-4">Thống kê theo danh mục</h4>
                <div className="space-y-3">
                  {['Danh mục A', 'Danh mục B', 'Danh mục C'].map((category, index) => {
                    const count = mockRecords.filter(r => r.category === category).length;
                    const percentage = (count / mockRecords.length) * 100;
                    return (
                      <div key={category}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-700">{category}</span>
                          <span className="text-slate-900">{count} ({percentage.toFixed(0)}%)</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-teal-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Lịch sử */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-slate-900">Lịch sử thao tác</h3>
              
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Thời gian</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Người thực hiện</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Hành động</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Đối tượng</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Kết quả</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm text-slate-700">{record.updatedDate} 14:30</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{record.createdBy}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                            Cập nhật
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700">{record.name}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 border border-green-200 rounded-full">
                            Thành công
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
