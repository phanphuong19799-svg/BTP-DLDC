import { useState } from 'react';
import { Settings, Database, Info, AlertTriangle } from 'lucide-react';
import { GenericDataTable } from '../../common/GenericDataTable';
import { ProcessingConfigManager } from '../../processing/ProcessingConfigManager';
import { WarningDataList } from '../../processing/WarningDataList';

export function ProcessingLegalEducationPage() {
  const [activeTab, setActiveTab] = useState<'data' | 'processing' | 'warnings' | 'logs'>('data');

  const sampleData = [
    { id: 1, recordId: 'PBGDPL-2025-001234', program: 'Chương trình PBPL cộng đồng', location: 'Hà Nội', date: '15/03/2024', status: 'Đã xử lý' },
    { id: 2, recordId: 'PBGDPL-2025-001235', program: 'Tập huấn GDPL cho cán bộ', location: 'TP.HCM', date: '20/05/2024', status: 'Đang xử lý' },
    { id: 3, recordId: 'PBGDPL-2025-001236', program: 'Tuyên truyền pháp luật học đường', location: 'Đà Nẵng', date: '10/08/2024', status: 'Đã xử lý' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xl text-slate-900 mb-2">CSDL Phổ biến GDPL</h2>
        <p className="text-slate-600">
          Quản lý xử lý dữ liệu từ CSDL Phổ biến, giáo dục pháp luật thuộc Cục Phổ biến GDPL.
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
              title="Dữ liệu Phổ biến GDPL"
              description="Danh sách dữ liệu từ CSDL Phổ biến, giáo dục pháp luật"
              icon={Database}
              iconColor="purple"
              columns={[
                { key: 'recordId', label: 'Mã bản ghi', sortable: true },
                { key: 'program', label: 'Chương trình', sortable: true },
                { key: 'location', label: 'Địa điểm', sortable: true },
                { key: 'date', label: 'Ngày thực hiện', sortable: true },
                { key: 'status', label: 'Trạng thái', sortable: false }
              ]}
              data={sampleData}
              searchFields={[
                { label: 'Mã bản ghi', name: 'recordId', type: 'text' },
                { label: 'Chương trình', name: 'program', type: 'text' },
                { label: 'Địa điểm', name: 'location', type: 'text' }
              ]}
              detailFields={[
                { label: 'Mã bản ghi', key: 'recordId' },
                { label: 'Chương trình', key: 'program' },
                { label: 'Địa điểm', key: 'location' },
                { label: 'Ngày thực hiện', key: 'date' },
                { label: 'Trạng thái', key: 'status' }
              ]}
            />
          )}

          {activeTab === 'processing' && (
            <ProcessingConfigManager 
              title="CSDL Phổ biến GDPL"
              description="Quản lý xử lý dữ liệu từ CSDL Phổ biến, giáo dục pháp luật thuộc Cục Phổ biến GDPL."
              dataSourceKey="legal-education"
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
                      { time: '09/12/2024 10:30', type: 'Trùng mã chương trình', total: 520, success: 500, error: 20, status: 'warning' },
                      { time: '09/12/2024 09:15', type: 'Chuẩn hóa địa điểm tổ chức', total: 480, success: 475, error: 5, status: 'success' },
                      { time: '09/12/2024 08:00', type: 'Trùng thời gian tổ chức', total: 350, success: 345, error: 5, status: 'success' },
                      { time: '08/12/2024 16:45', type: 'Chuẩn hóa ngày tháng', total: 620, success: 600, error: 20, status: 'warning' },
                      { time: '08/12/2024 14:20', type: 'Loại bỏ dữ liệu trùng lặp', total: 460, success: 450, error: 10, status: 'success' }
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
