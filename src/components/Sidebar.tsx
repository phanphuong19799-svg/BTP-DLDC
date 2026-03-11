import { 
  Home, 
  Database, 
  FileSearch, 
  Share2, 
  GitCompare, 
  Sparkles, 
  Settings,
  ChevronDown,
  ChevronRight,
  Users,
  User,
  UsersRound,
  List,
  ShieldCheck
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface MenuItem {
  id: string;
  title: string;
  icon?: any;
  page?: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'home',
    title: 'Trang chủ',
    icon: Home,
    page: 'home',
  },
  {
    id: 'collection',
    title: 'Quản lý thu thập',
    icon: Database,
    page: 'data-collection',
  },
  {
    id: 'processing',
    title: 'Xử lý dữ liệu',
    icon: Sparkles,
    page: 'data-processing',
  },
  {
    id: 'search',
    title: 'Tra cứu kho dữ liệu',
    icon: FileSearch,
    page: 'data-search',
  },
  {
    id: 'sharing',
    title: 'Quản lý dịch vụ chia sẻ',
    icon: Share2,
    page: 'data-sharing',
  },
  {
    id: 'reconciliation',
    title: 'Quản lý đối soát dữ liệu',
    icon: GitCompare,
    page: 'data-reconciliation',
  },
  {
    id: 'cleaning',
    title: 'Quản lý làm sạch dữ liệu',
    icon: Sparkles,
    page: 'data-cleaning-management',
  },
  {
    id: 'admin',
    title: 'Quản trị và vận hành',
    icon: Settings,
    // page: 'admin', // Allow clicking parent to expand
    subItems: [
      {
        id: 'admin-users-group',
        title: 'Quản trị người dùng',
        icon: Users,
        subItems: [
          {
            id: 'admin-users',
            title: 'Quản lý người dùng',
            icon: User,
            page: 'admin-users',
          },
          {
            id: 'admin-groups',
            title: 'Quản lý nhóm người dùng',
            icon: UsersRound,
            page: 'admin-groups',
          },
          {
            id: 'admin-functions',
            title: 'Danh sách chức năng',
            icon: List,
            page: 'admin-functions',
          },
          {
            id: 'admin-function-config',
            title: 'Cấu hình quyền thao tác',
            icon: ShieldCheck,
            page: 'admin-function-config',
          },
        ],
      },
    ],
  },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['admin', 'admin-users-group']));

  useEffect(() => {
    // Auto-expand parent menus based on current page
    const newExpanded = new Set(expandedItems);
    let changed = false;

    const expandParents = (items: MenuItem[], parentIds: string[] = []) => {
      for (const item of items) {
        if (item.page === currentPage) {
          parentIds.forEach(id => newExpanded.add(id));
          changed = true;
        }
        if (item.subItems) {
          expandParents(item.subItems, [...parentIds, item.id]);
        }
      }
    };

    expandParents(menuItems);

    if (changed) {
      setExpandedItems(newExpanded);
    }
  }, [currentPage]);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const isActive = item.page === currentPage;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const Icon = item.icon;

    // Indentation based on level
    const paddingLeft = level === 0 ? 'px-3' : level === 1 ? 'pl-8 pr-3' : 'pl-12 pr-3';

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasSubItems) {
              toggleExpand(item.id);
            } else if (item.page) {
              onNavigate(item.page);
            }
          }}
          className={`w-full flex items-center justify-between ${paddingLeft} py-2.5 rounded-lg transition-colors mb-1 ${
            isActive
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center gap-3">
            {Icon && <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />}
            <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>{item.title}</span>
          </div>
          {hasSubItems && (
            isExpanded ? (
              <ChevronDown className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
            ) : (
              <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
            )
          )}
        </button>

        {hasSubItems && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.subItems!.map((subItem) => renderMenuItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-200 h-[calc(100vh-73px)] overflow-y-auto sticky top-[73px]">
      <div className="p-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
          Chức năng chính
        </h3>

        <nav className="space-y-1">
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>
      </div>
    </aside>
  );
}
