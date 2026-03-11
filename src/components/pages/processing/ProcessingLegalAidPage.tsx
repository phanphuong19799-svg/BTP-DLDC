import { useState } from 'react';
import { Settings, Database, Info } from 'lucide-react';
import { APIConnectionForm } from '../../processing/APIConnectionForm';

export function ProcessingLegalAidPage() {
  const [activeTab, setActiveTab] = useState<'connection' | 'processing' | 'logs'>('connection');

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xl text-slate-900 mb-2">CSDL Trợ giúp pháp lý</h2>
        <p className="text-slate-600">
          Quản lý xử lý dữ liệu từ Cơ sở dữ liệu Trợ giúp pháp lý thuộc Cục Bổ trợ tư pháp.
        </p>
      </div>
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button onClick={() => setActiveTab('connection')} className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors ${activeTab === 'connection' ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
            <Settings className="w-4 h-4" />
            Thông tin kết nối API
          </button>
          <button onClick={() => setActiveTab('processing')} className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors ${activeTab === 'processing' ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
            <Database className="w-4 h-4" />
            Cấu hình xử lý dữ liệu
          </button>
          <button onClick={() => setActiveTab('logs')} className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors ${activeTab === 'logs' ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
            <Info className="w-4 h-4" />
            Lịch sử xử lý
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'connection' && (
            <div>
              <h3 className="text-base text-slate-900 mb-4">Form Kết Nối LGSP</h3>
              <APIConnectionForm />
            </div>
          )}
          {activeTab === 'processing' && <div className="text-slate-600">Nội dung cấu hình xử lý dữ liệu CSDL Trợ giúp pháp lý...</div>}
          {activeTab === 'logs' && <div className="text-slate-600">Nội dung lịch sử xử lý CSDL Trợ giúp pháp lý...</div>}
        </div>
      </div>
    </div>
  );
}
