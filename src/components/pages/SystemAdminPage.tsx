import { Users, Shield, UsersRound, Settings as SettingsIcon } from 'lucide-react';
import { PageHeader } from '../common/PageHeader';
import { StatsCard } from '../common/StatsCard';
import { AdminFunctionsList } from '../admin/AdminFunctionsList';
import { FunctionPermissionConfig } from '../admin/FunctionPermissionConfig';
import { useState } from 'react';

const users = [
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@moj.gov.vn', role: 'Admin', status: 'active', lastLogin: '5 phút trước' },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@moj.gov.vn', role: 'Editor', status: 'active', lastLogin: '2 giờ trước' },
  { id: 3, name: 'Lê Văn C', email: 'levanc@moj.gov.vn', role: 'Viewer', status: 'inactive', lastLogin: '2 ngày trước' },
];

const roles = [
  { id: 1, name: 'Quản trị viên hệ thống', users: 5, permissions: 45 },
  { id: 2, name: 'Quản lý dữ liệu', users: 12, permissions: 28 },
  { id: 3, name: 'Người duyệt', users: 8, permissions: 15 },
  { id: 4, name: 'Người xem', users: 32, permissions: 8 },
];

const userGroups = [
  { id: 1, name: 'Vụ Pháp luật Dân sự', members: 12, description: 'Nhóm quản lý dữ liệu pháp luật dân sự' },
  { id: 2, name: 'Cục Đăng ký Quốc gia', members: 25, description: 'Nhóm quản lý đăng ký kinh doanh' },
  { id: 3, name: 'Cục Công chứng', members: 18, description: 'Nhóm quản lý dữ liệu công chứng' },
];

type TabType = 'users' | 'roles' | 'groups' | 'functions' | 'function-config' | 'config';

export function SystemAdminPage({ initialTab = 'users' }: { initialTab?: TabType }) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  return (
    <div className="space-y-6">
      <PageHeader title="Quản trị hệ thống" icon={SettingsIcon} />
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          icon={Users}
          iconColor="blue"
          title="Tổng người dùng"
          value="2,847"
        />
        <StatsCard
          icon={Shield}
          iconColor="green"
          title="Vai trò"
          value="12"
        />
        <StatsCard
          icon={UsersRound}
          iconColor="purple"
          title="Nhóm người dùng"
          value="45"
        />
        <StatsCard
          icon={SettingsIcon}
          iconColor="orange"
          title="Hoạt động (24h)"
          value="1,234"
        />
      </div>

      {/* Tabs */}
      <div className="bg-white border border-slate-200 rounded-lg p-1 grid grid-cols-6 gap-1">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-md text-sm transition-all ${
            activeTab === 'users'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Người dùng
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-2.5 rounded-md text-sm transition-all ${
            activeTab === 'roles'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Vai trò
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`px-4 py-2.5 rounded-md text-sm transition-all ${
            activeTab === 'groups'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Nhóm người dùng
        </button>
        <button
          onClick={() => setActiveTab('functions')}
          className={`px-4 py-2.5 rounded-md text-sm transition-all ${
            activeTab === 'functions'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Danh sách chức năng
        </button>
        <button
          onClick={() => setActiveTab('function-config')}
          className={`px-4 py-2.5 rounded-md text-sm transition-all ${
            activeTab === 'function-config'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Cấu hình chức năng
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`px-4 py-2.5 rounded-md text-sm transition-all ${
            activeTab === 'config'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Cấu hình
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-gray-900">Quản trị người dùng</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Thêm người dùng
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Họ tên</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Email</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Vai trò</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Đăng nhập gần nhất</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.lastLogin}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm">Chỉnh sửa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-gray-900">Quản trị quyền</h3>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              Thêm vai trò
            </button>
          </div>
          <div className="p-6 space-y-3">
            {roles.map((role) => (
              <div key={role.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-gray-900">{role.name}</h4>
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Sửa</button>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>{role.users} người dùng</span>
                  <span>•</span>
                  <span>{role.permissions} quyền</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'groups' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-gray-900">Quản trị nhóm người dùng</h3>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              Thêm nhóm
            </button>
          </div>
          <div className="p-6 space-y-3">
            {userGroups.map((group) => (
              <div key={group.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-gray-900">{group.name}</h4>
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Sửa</button>
                </div>
                <p className="text-gray-600 text-sm mb-2">{group.description}</p>
                <span className="text-sm text-gray-500">{group.members} thành viên</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'functions' && <AdminFunctionsList />}
      {activeTab === 'function-config' && <FunctionPermissionConfig />}
      {activeTab === 'config' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-gray-900">Cấu hình hệ thống</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Thời gian tự động đăng xuất</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>15 phút</option>
                  <option>30 phút</option>
                  <option>1 giờ</option>
                  <option>2 giờ</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Số lần đăng nhập sai tối đa</label>
                <input
                  type="number"
                  defaultValue="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Thời gian lưu log</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>30 ngày</option>
                  <option>90 ngày</option>
                  <option>180 ngày</option>
                  <option>1 năm</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Chế độ bảo mật</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Cơ bản</option>
                  <option>Nâng cao</option>
                  <option>Cao nhất</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Lưu cấu hình
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}