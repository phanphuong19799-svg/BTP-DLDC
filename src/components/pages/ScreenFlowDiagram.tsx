import { useState } from 'react';
import { 
  LayoutDashboard, Database, Settings, Share2, GitCompare, Shield, 
  FileText, FolderTree, HardDrive, Network, Globe, Building2, Building,
  Users, List, BarChart3, FileSearch, RefreshCw, Package, Bell, HelpCircle,
  FolderCog, ChevronRight, ZoomIn, ZoomOut, Maximize2
} from 'lucide-react';

export function ScreenFlowDiagram() {
  const [zoom, setZoom] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const menuStructure = [
    {
      id: 'dashboard',
      label: 'Tổng quan',
      icon: LayoutDashboard,
      color: 'bg-blue-100 text-blue-700 border-blue-300',
      description: 'Màn hình dashboard chính',
      children: []
    },
    {
      id: 'collection',
      label: 'Quản lý thu thập',
      icon: Database,
      color: 'bg-green-100 text-green-700 border-green-300',
      description: 'Thu thập dữ liệu từ các nguồn',
      children: [
        {
          id: 'collection-setup',
          label: 'Thiết lập thu thập',
          icon: Settings,
          description: 'Cấu hình kết nối và thiết lập dịch vụ thu thập'
        },
        {
          id: 'collection-external',
          label: 'CSDL Trong ngành',
          icon: Building2,
          description: 'Thu thập dữ liệu từ các cơ sở dữ liệu bên ngoài',
          subChildren: [
            { id: 'data-info', label: 'Dữ liệu thông tin' },
            { id: 'category-management', label: 'Quản lý danh mục' }
          ]
        },
        {
          id: 'collection-internal',
          label: 'CSDL hệ thống trong nội bộ',
          icon: Building,
          description: 'Thu thập dữ liệu từ các hệ thống nội bộ'
        },
        {
          id: 'collection-reconciliation',
          label: 'Đối soát dữ liệu thu thập',
          icon: GitCompare,
          description: 'Đối soát và kiểm tra tính nhất quán của dữ liệu'
        }
      ]
    },
    {
      id: 'processing',
      label: 'Xử lý dữ liệu',
      icon: Settings,
      color: 'bg-purple-100 text-purple-700 border-purple-300',
      description: 'Xử lý và chuẩn hóa dữ liệu',
      children: [
        {
          id: 'processing-internal-data',
          label: 'Dữ liệu trong ngành',
          icon: Building,
          description: 'Xử lý dữ liệu nội bộ (LGSP)'
        },
        {
          id: 'processing-external-data',
          label: 'Dữ liệu ngoài ngành',
          icon: Building2,
          description: 'Xử lý dữ liệu bên ngoài (NDXP)'
        }
      ]
    },
    {
      id: 'category',
      label: 'Quản lý danh mục dùng chung',
      icon: FolderTree,
      color: 'bg-indigo-100 text-indigo-700 border-indigo-300',
      description: 'Quản lý các danh mục dùng chung',
      children: [
        {
          id: 'category-setup',
          label: 'Thiết lập danh mục',
          icon: Settings,
          description: 'Tạo mới và cấu hình danh mục'
        },
        {
          id: 'category-list',
          label: 'Danh sách danh mục',
          icon: List,
          description: 'Xem và quản lý các danh mục'
        },
        {
          id: 'category-published-list',
          label: 'Công khai danh mục',
          icon: FileText,
          description: 'Danh sách danh mục đã công khai'
        },
        {
          id: 'category-report',
          label: 'Báo cáo thống kê',
          icon: BarChart3,
          description: 'Báo cáo và thống kê danh mục'
        }
      ]
    },
    {
      id: 'open-data',
      label: 'Danh mục dữ liệu mở',
      icon: Globe,
      color: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      description: 'Quản lý dữ liệu mở theo NĐ 47/2020',
      children: [
        {
          id: 'open-data-setup',
          label: 'Quản lý danh mục',
          icon: Settings,
          description: 'Thiết lập danh mục dữ liệu mở'
        },
        {
          id: 'open-data-category-list',
          label: 'Danh sách danh mục',
          icon: List,
          description: 'Danh sách các danh mục dữ liệu mở'
        },
        {
          id: 'open-data-published-list',
          label: 'Danh sách công bố',
          icon: FileText,
          description: 'Dữ liệu mở đã công bố'
        },
        {
          id: 'open-data-report',
          label: 'Báo cáo thống kê',
          icon: BarChart3,
          description: 'Thống kê dữ liệu mở'
        }
      ]
    },
    {
      id: 'master-data',
      label: 'Quản lý dữ liệu chủ',
      icon: HardDrive,
      color: 'bg-teal-100 text-teal-700 border-teal-300',
      description: 'Quản lý dữ liệu chủ của hệ thống',
      children: [
        {
          id: 'master-data-scale-management',
          label: 'Quản lý quy mô',
          icon: BarChart3,
          description: 'Quản lý quy mô dữ liệu chủ'
        },
        {
          id: 'master-data-update',
          label: 'Cập nhật dữ liệu chủ',
          icon: RefreshCw,
          description: 'Cập nhật và đồng bộ dữ liệu chủ'
        },
        {
          id: 'master-data-reports',
          label: 'Báo cáo tìm kiếm',
          icon: FileSearch,
          description: 'Tìm kiếm và báo cáo dữ liệu chủ'
        }
      ]
    },
    {
      id: 'orchestration',
      label: 'Điều phối dữ liệu',
      icon: Network,
      color: 'bg-amber-100 text-amber-700 border-amber-300',
      description: 'Điều phối và quản lý luồng dữ liệu',
      children: [
        {
          id: 'orchestration-service-setup',
          label: 'Thiết lập dịch vụ',
          icon: Settings,
          description: 'Cấu hình dịch vụ điều phối'
        },
        {
          id: 'orchestration-api-management',
          label: 'API cung cấp dữ liệu',
          icon: Database,
          description: 'Quản lý API cung cấp dữ liệu'
        },
        {
          id: 'orchestration-reconciliation-api',
          label: 'API đối soát',
          icon: GitCompare,
          description: 'API đối soát dữ liệu'
        }
      ]
    },
    {
      id: 'data-provision',
      label: 'Dịch vụ cung cấp dữ liệu',
      icon: Package,
      color: 'bg-cyan-100 text-cyan-700 border-cyan-300',
      description: 'Cung cấp dữ liệu cho các hệ thống',
      children: [
        {
          id: 'data-provision-internal',
          label: 'Cung cấp danh mục',
          icon: FolderCog,
          description: 'Cung cấp danh mục cho các đơn vị',
          subChildren: [
            { id: 'data-provision-catalog-a', label: 'Danh mục A' },
            { id: 'data-provision-catalog-b', label: 'Danh mục B' },
            { id: 'data-provision-catalog-c', label: 'Danh mục C' }
          ]
        },
        {
          id: 'data-provision-shared',
          label: 'Cung cấp DLDC',
          icon: Share2,
          description: 'Cung cấp dữ liệu dùng chung',
          subChildren: [
            { id: 'data-provision-dldc-a', label: 'Dữ liệu A' },
            { id: 'data-provision-dldc-b', label: 'Dữ liệu B' },
            { id: 'data-provision-dldc-c', label: 'Dữ liệu C' }
          ]
        },
        {
          id: 'data-provision-reconciliation',
          label: 'Đối soát dữ liệu',
          icon: GitCompare,
          description: 'Đối soát dữ liệu cung cấp'
        }
      ]
    },
    {
      id: 'admin',
      label: 'Quản trị & vận hành',
      icon: Shield,
      color: 'bg-red-100 text-red-700 border-red-300',
      description: 'Quản trị hệ thống',
      children: [
        {
          id: 'admin-users',
          label: 'Quản lý người dùng',
          icon: Users,
          description: 'Quản lý tài khoản người dùng'
        },
        {
          id: 'admin-groups',
          label: 'Quản lý nhóm',
          icon: Users,
          description: 'Quản lý nhóm người dùng'
        },
        {
          id: 'admin-config',
          label: 'Cấu hình hệ thống',
          icon: Settings,
          description: 'Cấu hình tham số hệ thống'
        },
        {
          id: 'admin-logs',
          label: 'Quản lý nhật ký',
          icon: FileText,
          description: 'Xem và quản lý nhật ký'
        },
        {
          id: 'admin-statistics',
          label: 'Thống kê',
          icon: BarChart3,
          description: 'Xem thống kê hệ thống'
        }
      ]
    },
    {
      id: 'notifications',
      label: 'Quản lý thông báo',
      icon: Bell,
      color: 'bg-orange-100 text-orange-700 border-orange-300',
      description: 'Quản lý thông báo hệ thống',
      children: []
    },
    {
      id: 'user-guide',
      label: 'Hướng dẫn sử dụng',
      icon: HelpCircle,
      color: 'bg-violet-100 text-violet-700 border-violet-300',
      description: 'Tài liệu hướng dẫn sử dụng',
      children: []
    }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl text-slate-900">Sơ đồ luồng màn hình hệ thống</h1>
            <p className="text-sm text-slate-500 mt-1">
              Tổng quan cấu trúc menu và các màn hình trong hệ thống DLDC
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
              className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-4 h-4 text-slate-600" />
            </button>
            <span className="text-sm text-slate-600 min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(Math.min(2, zoom + 0.1))}
              className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              title="Phóng to"
            >
              <ZoomIn className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              title="Kích thước gốc"
            >
              <Maximize2 className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="flex-1 overflow-auto p-8">
        <div 
          className="min-w-max transition-transform duration-200"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
        >
          <div className="space-y-6">
            {/* Process Flow Overview */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200 p-6 mb-8">
              <h2 className="text-lg text-slate-900 mb-4">Luồng xử lý dữ liệu chính</h2>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-white rounded-lg border-2 border-green-300 p-4 text-center">
                  <Database className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-sm text-slate-900">Thu thập</div>
                  <div className="text-xs text-slate-500 mt-1">Quản lý thu thập</div>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-400" />
                <div className="flex-1 bg-white rounded-lg border-2 border-purple-300 p-4 text-center">
                  <Settings className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm text-slate-900">Xử lý</div>
                  <div className="text-xs text-slate-500 mt-1">Xử lý dữ liệu</div>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-400" />
                <div className="flex-1 bg-white rounded-lg border-2 border-indigo-300 p-4 text-center">
                  <FolderTree className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <div className="text-sm text-slate-900">Danh mục</div>
                  <div className="text-xs text-slate-500 mt-1">Quản lý danh mục</div>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-400" />
                <div className="flex-1 bg-white rounded-lg border-2 border-teal-300 p-4 text-center">
                  <HardDrive className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-sm text-slate-900">Dữ liệu chủ</div>
                  <div className="text-xs text-slate-500 mt-1">Quản lý dữ liệu chủ</div>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-400" />
                <div className="flex-1 bg-white rounded-lg border-2 border-cyan-300 p-4 text-center">
                  <Package className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                  <div className="text-sm text-slate-900">Cung cấp</div>
                  <div className="text-xs text-slate-500 mt-1">Dịch vụ cung cấp</div>
                </div>
              </div>
            </div>

            {/* Menu Structure */}
            <div className="grid grid-cols-2 gap-6">
              {menuStructure.map((menu, index) => (
                <div
                  key={menu.id}
                  className={`bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-all ${
                    selectedMenu === menu.id ? 'ring-4 ring-blue-200' : ''
                  } ${menu.color}`}
                  onClick={() => setSelectedMenu(menu.id)}
                >
                  {/* Menu Header */}
                  <div className="p-4 border-b border-slate-200">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${menu.color}`}>
                        <menu.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">{menu.label}</div>
                        <div className="text-xs text-slate-500 mt-1">{menu.description}</div>
                      </div>
                      <div className="text-xs text-slate-400 bg-white rounded px-2 py-1 border border-slate-200">
                        #{index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Children */}
                  {menu.children.length > 0 && (
                    <div className="p-4 space-y-2">
                      {menu.children.map((child: any) => (
                        <div key={child.id}>
                          <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                            {child.icon && <child.icon className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />}
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-slate-900">{child.label}</div>
                              {child.description && (
                                <div className="text-xs text-slate-500 mt-0.5">{child.description}</div>
                              )}
                              
                              {/* Sub-children */}
                              {child.subChildren && child.subChildren.length > 0 && (
                                <div className="mt-2 space-y-1 pl-4 border-l-2 border-slate-300">
                                  {child.subChildren.map((subChild: any) => (
                                    <div
                                      key={subChild.id}
                                      className="text-xs text-slate-600 py-1 flex items-center gap-2"
                                    >
                                      <ChevronRight className="w-3 h-3 text-slate-400" />
                                      {subChild.label}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {menu.children.length === 0 && (
                    <div className="p-4">
                      <div className="text-xs text-slate-400 text-center py-2">
                        Không có menu con
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 mt-8">
              <h3 className="text-sm text-slate-900 mb-4">Chú thích</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-slate-50 border-2 border-slate-300 rounded"></div>
                  <span className="text-xs text-slate-600">Menu chính</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-slate-100 border border-slate-200 rounded"></div>
                  <span className="text-xs text-slate-600">Menu con cấp 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-600">Menu con cấp 2</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  <strong>Quy trình xử lý dữ liệu 3 bước:</strong>
                  <ol className="list-decimal list-inside mt-2 space-y-1 ml-2">
                    <li><strong>Làm sạch (Cleaning):</strong> Loại bỏ dữ liệu lỗi, trùng lặp, không hợp lệ</li>
                    <li><strong>Chuẩn hóa (Standardization):</strong> Chuyển đổi dữ liệu về định dạng chuẩn</li>
                    <li><strong>Biến đổi (Transformation):</strong> Biến đổi dữ liệu theo quy tắc nghiệp vụ</li>
                  </ol>
                </div>
                
                <div className="text-xs text-slate-500 mt-3">
                  <strong>Phân biệt nguồn dữ liệu:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                    <li><strong>Dữ liệu trong ngành:</strong> Sử dụng LGSP (Local Government Service Platform)</li>
                    <li><strong>Dữ liệu ngoài ngành:</strong> Sử dụng NDXP (National Data Exchange Platform)</li>
                  </ul>
                </div>

                <div className="text-xs text-slate-500 mt-3">
                  <strong>Cơ chế phê duyệt:</strong> Tất cả thay đổi dữ liệu đều cần phê duyệt trước khi áp dụng
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}