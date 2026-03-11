import { useState } from 'react';
import { Settings, Database, Info, AlertTriangle } from 'lucide-react';
import { GenericDataTable } from '../../common/GenericDataTable';
import { ProcessingConfigManager } from '../../processing/ProcessingConfigManager';
import { WarningDataList } from '../../processing/WarningDataList';

export function ProcessingJudicialAssistancePage() {
  const [activeTab, setActiveTab] = useState<'data' | 'processing' | 'warnings' | 'logs'>('data');

  const sampleData = [
    { id: 1, recordId: 'TTTFDS-2025-001234', requestType: 'Tống đạt văn bản', country: 'Pháp', requestDate: '15/03/2024', status: 'Đã xử lý' },
    { id: 2, recordId: 'TTTFDS-2025-001235', requestType: 'Thu thập chứng cứ', country: 'Đức', requestDate: '20/05/2024', status: 'Đang xử lý' },
    { id: 3, recordId: 'TTTFDS-2025-001236', requestType: 'Công nhận và cho thi hành', country: 'Úc', requestDate: '10/08/2024', status: 'Đã xử lý' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xl text-slate-900 mb-2">CSDL tương trợ tư pháp về dân sự</h2>
        <p className="text-slate-600">
          Quản lý xử lý dữ liệu từ CSDL tương trợ tư pháp về dân sự.
        </p>
      </div>
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button onClick={() => setActiveTab('data')} className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors ${activeTab === 'data' ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
            <Database className="w-4 h-4" />
            Danh sách dữ liệu
          </button>
          <button onClick={() => setActiveTab('processing')} className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors ${activeTab === 'processing' ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
            <Settings className="w-4 h-4" />
            Cấu hình xử lý dữ liệu
          </button>
          <button onClick={() => setActiveTab('warnings')} className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors ${activeTab === 'warnings' ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
            <AlertTriangle className="w-4 h-4" />
            Danh sách dữ liệu cảnh báo
          </button>
          <button onClick={() => setActiveTab('logs')} className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors ${activeTab === 'logs' ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
            <Info className="w-4 h-4" />
            Lịch sử xử lý
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'data' && (
            <GenericDataTable
              title="Dữ liệu tương trợ tư pháp về dân sự"
              description="Danh sách dữ liệu từ CSDL tương trợ tư pháp về dân sự"
              icon={Database}
              iconColor="purple"
              columns={[
                { key: 'recordId', label: 'Mã bản ghi', sortable: true },
                { key: 'requestType', label: 'Loại yêu cầu', sortable: true },
                { key: 'country', label: 'Quốc gia', sortable: true },
                { key: 'requestDate', label: 'Ngày yêu cầu', sortable: true },
                { key: 'status', label: 'Trạng thái', sortable: false }
              ]}
              data={sampleData}
              searchFields={[
                { label: 'Mã bản ghi', name: 'recordId', type: 'text' },
                { label: 'Loại yêu cầu', name: 'requestType', type: 'text' },
                { label: 'Quốc gia', name: 'country', type: 'text' }
              ]}
              detailFields={[
                { label: 'Mã bản ghi', key: 'recordId' },
                { label: 'Loại yêu cầu', key: 'requestType' },
                { label: 'Quốc gia', key: 'country' },
                { label: 'Ngày yêu cầu', key: 'requestDate' },
                { label: 'Trạng thái', key: 'status' }
              ]}
            />
          )}

          {activeTab === 'processing' && (
            <ProcessingConfigManager 
              title="CSDL tương trợ tư pháp về dân sự"
              description="Quản lý xử lý dữ liệu từ CSDL tương trợ tư pháp về dân sự."
              dataSourceKey="judicial-assistance"
            />
          )}

          {activeTab === 'warnings' && (
            <WarningDataList />
          )}

          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-base text-blue-900 mb-2">Lịch sử xử lý dữ liệu</h4>
                    <p className="text-sm text-blue-700">
                      Theo dõi các lần xử lý dữ liệu với log đầy đủ và khả năng sửa lỗi từng bản ghi
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">Thời gian</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">Loại xử lý</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {[
                      { time: '09/12/2024 10:30', type: 'Trùng mã yêu cầu', total: 420, success: 410, error: 10, status: 'success' },
                      { time: '09/12/2024 09:15', type: 'Chuẩn hóa quốc gia', total: 380, success: 375, error: 5, status: 'success' },
                      { time: '09/12/2024 08:00', type: 'Trùng nội dung yêu cầu', total: 350, success: 340, error: 10, status: 'success' },
                      { time: '08/12/2024 16:45', type: 'Chuẩn hóa ngày tháng', total: 520, success: 500, error: 20, status: 'warning' },
                      { time: '08/12/2024 14:20', type: 'Loại bỏ dữ liệu không hợp lệ', total: 460, success: 445, error: 15, status: 'success' }
                    ].map((log, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm text-slate-700">{log.time}</td>
                        <td className="px-4 py-3">
                          <div>
                            <div className="text-sm text-slate-900 mb-1">{log.type}</div>
                            <div className="text-xs text-slate-500">
                              {log.total.toLocaleString()} bản ghi • {' '}
                              <span className="text-green-600">{log.success.toLocaleString()} thành công</span> • {' '}
                              <span className="text-red-600">{log.error} lỗi</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 text-xs rounded ${
                            log.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {log.status === 'success' ? 'Hoàn thành' : 'Có cảnh báo'}
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
