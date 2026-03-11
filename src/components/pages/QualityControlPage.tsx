import { DataValidationPanel } from '../collection/DataValidationPanel';
import { NotificationManagement } from '../collection/NotificationManagement';
import { ResponseTracking } from '../collection/ResponseTracking';
import { useState } from 'react';
import { CheckCircle, Bell, MessageSquare } from 'lucide-react';
import { PageHeader } from '../common/PageHeader';

export function QualityControlPage() {
  const [selectedTab, setSelectedTab] = useState('validation');

  return (
    <div className="space-y-6">
      <PageHeader title="Kiểm tra chất lượng" icon={CheckCircle} />
      
      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-4">
          <button
            onClick={() => setSelectedTab('validation')}
            className={`pb-3 px-2 border-b-2 text-sm transition-colors flex items-center gap-2 ${
              selectedTab === 'validation'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            Kiểm tra dữ liệu
          </button>
          <button
            onClick={() => setSelectedTab('notification')}
            className={`pb-3 px-2 border-b-2 text-sm transition-colors flex items-center gap-2 ${
              selectedTab === 'notification'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bell className="w-4 h-4" />
            Thông báo
          </button>
          <button
            onClick={() => setSelectedTab('tracking')}
            className={`pb-3 px-2 border-b-2 text-sm transition-colors flex items-center gap-2 ${
              selectedTab === 'tracking'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Phản hồi
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {selectedTab === 'validation' && <DataValidationPanel />}
      {selectedTab === 'notification' && <NotificationManagement />}
      {selectedTab === 'tracking' && <ResponseTracking />}
    </div>
  );
}