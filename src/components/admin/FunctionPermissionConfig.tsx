import { useState } from 'react';
import { Search, Save, Plus, Trash2, Edit2, Download, Upload, Eye, CheckSquare, Square, Filter } from 'lucide-react';

interface FunctionOption {
  id: string;
  code: string;
  name: string;
  enabled: boolean;
}

interface ModuleConfig {
  id: string;
  name: string;
  code: string;
  functions: FunctionOption[];
}

const initialModules: ModuleConfig[] = [
  {
    id: '1',
    name: 'Danh sách văn bản',
    code: 'DOC_LIST',
    functions: [
      { id: 'f1', code: 'VIEW', name: 'Xem', enabled: true },
      { id: 'f2', code: 'CREATE', name: 'Thêm', enabled: true },
      { id: 'f3', code: 'EDIT', name: 'Sửa', enabled: true },
      { id: 'f4', code: 'DELETE', name: 'Xóa', enabled: true },
      { id: 'f5', code: 'EXPORT', name: 'Xuất Excel', enabled: false },
      { id: 'f6', code: 'IMPORT', name: 'Import Excel', enabled: false },
    ]
  },
  {
    id: '2',
    name: 'Danh mục dữ liệu',
    code: 'DATA_CATALOG',
    functions: [
      { id: 'f1', code: 'VIEW', name: 'Xem', enabled: true },
      { id: 'f2', code: 'CREATE', name: 'Thêm mới', enabled: true },
      { id: 'f3', code: 'EDIT', name: 'Chỉnh sửa', enabled: true },
      { id: 'f4', code: 'DELETE', name: 'Xóa', enabled: false },
      { id: 'f5', code: 'APPROVE', name: 'Phê duyệt', enabled: true },
    ]
  },
  {
    id: '3',
    name: 'Quản lý người dùng',
    code: 'USER_MGMT',
    functions: [
      { id: 'f1', code: 'VIEW', name: 'Xem danh sách', enabled: true },
      { id: 'f2', code: 'CREATE', name: 'Thêm người dùng', enabled: true },
      { id: 'f3', code: 'EDIT', name: 'Sửa thông tin', enabled: true },
      { id: 'f4', code: 'DELETE', name: 'Xóa/Khóa', enabled: true },
      { id: 'f5', code: 'RESET_PASS', name: 'Đặt lại mật khẩu', enabled: true },
      { id: 'f6', code: 'ASSIGN_ROLE', name: 'Phân quyền', enabled: true },
    ]
  }
];

export function FunctionPermissionConfig() {
  const [modules, setModules] = useState<ModuleConfig[]>(initialModules);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFunctionToggle = (moduleId: string, functionId: string) => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          functions: module.functions.map(func => 
            func.id === functionId ? { ...func, enabled: !func.enabled } : func
          )
        };
      }
      return module;
    }));
  };

  const handleSelectAll = (moduleId: string, isSelected: boolean) => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          functions: module.functions.map(func => ({ ...func, enabled: isSelected }))
        };
      }
      return module;
    }));
  };

  const filteredModules = modules.filter(module => 
    module.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm màn hình chức năng..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <Save className="w-4 h-4" />
          Lưu cấu hình
        </button>
      </div>

      {/* Modules List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredModules.map(module => {
          const allSelected = module.functions.every(f => f.enabled);
          const someSelected = module.functions.some(f => f.enabled) && !allSelected;

          return (
            <div key={module.id} className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{module.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">Mã: {module.code}</p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div 
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      allSelected ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectAll(module.id, !allSelected);
                    }}
                  >
                    {allSelected && <CheckSquare className="w-3.5 h-3.5 text-white" />}
                    {someSelected && !allSelected && <div className="w-2.5 h-2.5 bg-blue-600 rounded-sm" />}
                  </div>
                  <span className="text-sm text-blue-600 font-medium">Chọn tất cả</span>
                </label>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {module.functions.map(func => (
                    <label 
                      key={func.id} 
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        func.enabled 
                          ? 'border-blue-200 bg-blue-50/50' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input 
                        type="checkbox"
                        checked={func.enabled}
                        onChange={() => handleFunctionToggle(module.id, func.id)}
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      />
                      <span className={`text-sm ${func.enabled ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                        {func.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {filteredModules.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Không tìm thấy màn hình chức năng nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
