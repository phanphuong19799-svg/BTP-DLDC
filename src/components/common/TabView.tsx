import { useState, ReactNode } from 'react';
import { Settings } from 'lucide-react';
import { APIConnectionForm } from '../processing/APIConnectionForm';

interface Tab {
  id: string;
  label: string;
  icon?: any;
  count?: number;
}

interface TabViewProps {
  tabs: Tab[];
  children: ReactNode[];
  showConnectionTab?: boolean; // Tùy chọn hiển thị tab kết nối API
}

export function TabView({ tabs, children, showConnectionTab = false }: TabViewProps) {
  // Nếu showConnectionTab = true, thêm tab "Thông tin kết nối API" vào đầu
  const allTabs = showConnectionTab 
    ? [{ id: 'api-connection', label: 'Thông tin kết nối API', icon: Settings }, ...tabs]
    : tabs;
  
  const [activeTab, setActiveTab] = useState(allTabs[0].id);

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      {/* Tab Headers */}
      <div className="border-b border-slate-200">
        <div className="flex overflow-x-auto">
          {allTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-blue-600 text-blue-700 bg-blue-50'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span className="text-sm">{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    isActive 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Tab Thông tin kết nối API */}
        {showConnectionTab && (
          <div className={activeTab === 'api-connection' ? 'block' : 'hidden'}>
            <h3 className="text-base text-slate-900 mb-4">Form Kết Nối LGSP</h3>
            <APIConnectionForm />
          </div>
        )}
        
        {/* Các tab còn lại */}
        {children.map((child, index) => (
          <div
            key={tabs[index].id}
            className={activeTab === tabs[index].id ? 'block' : 'hidden'}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}