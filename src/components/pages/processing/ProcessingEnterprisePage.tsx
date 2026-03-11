import { useState } from 'react';
import { Settings, Database, Info } from 'lucide-react';
import { APIConnectionForm } from '../../processing/APIConnectionForm';

export function ProcessingEnterprisePage() {
  const [activeTab, setActiveTab] = useState<'connection' | 'processing' | 'logs'>('connection');

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xl text-slate-900 mb-2">CSDL Doanh nghiệp</h2>
        <p className="text-slate-600">
          Quản lý xử lý dữ liệu từ Cơ sở dữ liệu Doanh nghiệp thuộc Cục Quản lý đăng ký kinh doanh.
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
          {activeTab === 'processing' && <div className="text-slate-600">Nội dung cấu hình xử lý dữ liệu CSDL Doanh nghiệp...</div>}
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
                      { time: '09/12/2024 10:30', type: 'Trùng mã số doanh nghiệp', total: 2150, success: 2100, error: 50, status: 'warning' },
                      { time: '09/12/2024 09:15', type: 'Chuẩn hóa địa chỉ trụ sở', total: 1980, success: 1960, error: 20, status: 'success' },
                      { time: '09/12/2024 08:00', type: 'Trùng mã số thuế', total: 1850, success: 1820, error: 30, status: 'warning' },
                      { time: '08/12/2024 16:45', type: 'Chuẩn hóa vốn điều lệ', total: 2320, success: 2300, error: 20, status: 'success' },
                      { time: '08/12/2024 14:20', type: 'Loại bỏ doanh nghiệp giải thể', total: 1560, success: 1530, error: 30, status: 'warning' }
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