import { useState } from 'react';
import { Database, Plus, Search, Download, Upload, RefreshCw, CheckCircle, XCircle, Clock, FileCheck, Settings } from 'lucide-react';
import { PageHeader } from '../common/PageHeader';
import { SendDataForm } from '../collection/SendDataForm';
import { ReceiveDataPanel } from '../collection/ReceiveDataPanel';
import { ConnectionConfig } from '../collection/ConnectionConfig';
import { APIMethodsList } from '../collection/APIMethodsList';
import { AddAPIMethodForm } from '../collection/AddAPIMethodForm';
import { CollectionActivityLog } from '../collection/CollectionActivityLog';
import { CollectionDashboard } from '../collection/CollectionDashboard';
import { DataCollectionList } from '../collection/DataCollectionList';
import { OverviewCombined } from '../collection/OverviewCombined';

const databases = [
  { id: 1, name: 'Hộ tịch điện tử', records: 2847392, status: 'active', lastSync: '5 phút trước', connection: 'API', format: 'JSON' },
  { id: 2, name: 'Hộ sơ quốc tịch', records: 456789, status: 'active', lastSync: '10 phút trước', connection: 'SFTP', format: 'XML' },
  { id: 3, name: 'Thi hành án dân sự', records: 892341, status: 'syncing', lastSync: 'Đang đồng bộ', connection: 'API', format: 'JSON' },
  { id: 4, name: 'Chuyên ngành khác', records: 234567, status: 'error', lastSync: '30 phút trước', connection: 'Database', format: 'CSV' },
];

export function DataCollectionPage() {
  const [selectedTab, setSelectedTab] = useState('overview-combined');
  const [selectedSource, setSelectedSource] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader title="Thu thập dữ liệu" icon={Database} />
      
      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-4">
          <button
            onClick={() => setSelectedTab('overview-combined')}
            className={`pb-3 px-2 border-b-2 text-sm transition-colors ${
              selectedTab === 'overview-combined'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Tổng quan
          </button>
          <button
            onClick={() => setSelectedTab('overview')}
            className={`pb-3 px-2 border-b-2 text-sm transition-colors ${
              selectedTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Danh sách thu thập
          </button>
          <button
            onClick={() => setSelectedTab('receive')}
            className={`pb-3 px-2 border-b-2 text-sm transition-colors ${
              selectedTab === 'receive'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Nhận dữ liệu
          </button>
          <button
            onClick={() => setSelectedTab('send')}
            className={`pb-3 px-2 border-b-2 text-sm transition-colors ${
              selectedTab === 'send'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Gửi dữ liệu
          </button>
          <button
            onClick={() => setSelectedTab('activity-log')}
            className={`pb-3 px-2 border-b-2 text-sm transition-colors ${
              selectedTab === 'activity-log'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Nhật ký
          </button>
          <button
            onClick={() => setSelectedTab('config')}
            className={`pb-3 px-2 border-b-2 text-sm transition-colors ${
              selectedTab === 'config'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Cấu hình
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview-combined' && <OverviewCombined />}

      {selectedTab === 'overview' && (
        <>
          {showAddForm ? (
            <AddAPIMethodForm onBack={() => setShowAddForm(false)} />
          ) : (
            <APIMethodsList onAddNew={() => setShowAddForm(true)} />
          )}
        </>
      )}

      {selectedTab === 'receive' && <ReceiveDataPanel />}
      {selectedTab === 'send' && <SendDataForm />}
      {selectedTab === 'activity-log' && <CollectionActivityLog />}
      {selectedTab === 'config' && <ConnectionConfig />}
    </div>
  );
}