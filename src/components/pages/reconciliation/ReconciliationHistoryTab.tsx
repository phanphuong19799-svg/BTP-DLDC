import { useState } from 'react';
import { Search, Download } from 'lucide-react';

interface ReconciliationHistory {
  id: string;
  timestamp: string;
  packageName: string;
  packageCode: string;
  systemName: string;
  action: string;
  recordsSent: number;
  dataSizeSent: string;
  status: 'success' | 'failed';
  statusText: string;
  statusColor: string;
  details: string;
}

export function ReconciliationHistoryTab() {
  const [searchTerm, setSearchTerm] = useState('');

  const histories: ReconciliationHistory[] = [
    {
      id: 'HIST-001',
      timestamp: '2024-12-20 10:15:00',
      packageName: 'Gói tin đối soát CSDL Hộ tịch - Tháng 12/2024',
      packageCode: 'PKG003',
      systemName: 'Hệ thống Hộ tịch điện tử',
      action: 'Hoàn tất đối soát',
      recordsSent: 850000,
      dataSizeSent: '2.3 GB',
      status: 'success',
      statusText: 'Thành công',
      statusColor: 'bg-green-100 text-green-700 border-green-200',
      details: 'Đối soát hoàn tất - Hệ thống đích xác nhận đã nhận đủ 850,000 bản ghi'
    },
    {
      id: 'HIST-002',
      timestamp: '2024-12-19 15:30:00',
      packageName: 'Gói tin đối soát CSDL Doanh nghiệp - Quý 4/2024',
      packageCode: 'PKG002',
      systemName: 'Hệ thống Đăng ký kinh doanh',
      action: 'Gửi gói tin',
      recordsSent: 125000,
      dataSizeSent: '1.8 GB',
      status: 'success',
      statusText: 'Thành công',
      statusColor: 'bg-green-100 text-green-700 border-green-200',
      details: 'Gửi gói tin thành công - Đang chờ phản hồi từ hệ thống dịch'
    },
    {
      id: 'HIST-003',
      timestamp: '2024-12-20 08:30:00',
      packageName: 'Gói tin đối soát CSDL Hộ tịch - Tháng 12/2024',
      packageCode: 'PKG003',
      systemName: 'Hệ thống Hộ tịch điện tử',
      action: 'Tạo gói tin',
      recordsSent: 850000,
      dataSizeSent: '2.3 GB',
      status: 'success',
      statusText: 'Thành công',
      statusColor: 'bg-green-100 text-green-700 border-green-200',
      details: 'Tạo gói tin đối soát thành công'
    },
    {
      id: 'HIST-004',
      timestamp: '2024-12-18 14:20:00',
      packageName: 'Gói tin đối soát CSDL Công chứng - Tháng 11/2024',
      packageCode: 'PKG001',
      systemName: 'Hệ thống Công chứng',
      action: 'Nhận phản hồi',
      recordsSent: 45000,
      dataSizeSent: '850 MB',
      status: 'success',
      statusText: 'Thành công',
      statusColor: 'bg-green-100 text-green-700 border-green-200',
      details: 'Nhận phản hồi từ hệ thống - Đối soát thành công với độ chính xác 99.8%'
    },
    {
      id: 'HIST-005',
      timestamp: '2024-12-17 09:45:00',
      packageName: 'Gói tin đối soát CSDL Hộ tịch - Tháng 11/2024',
      packageCode: 'PKG000',
      systemName: 'Hệ thống Hộ tịch điện tử',
      action: 'Hoàn tất đối soát',
      recordsSent: 820000,
      dataSizeSent: '2.1 GB',
      status: 'success',
      statusText: 'Thành công',
      statusColor: 'bg-green-100 text-green-700 border-green-200',
      details: 'Đối soát hoàn tất với 100% độ chính xác'
    }
  ];

  const filteredHistories = histories.filter(history =>
    searchTerm === '' ||
    history.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    history.packageCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    history.systemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    history.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search and Export */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm lịch sử theo gói tin, hệ thống, hành động..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 whitespace-nowrap">
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm text-slate-600">Thời gian</th>
                <th className="px-6 py-3 text-left text-sm text-slate-600">Gói tin</th>
                <th className="px-6 py-3 text-left text-sm text-slate-600">Hệ thống dịch</th>
                <th className="px-6 py-3 text-left text-sm text-slate-600">Hành động</th>
                <th className="px-6 py-3 text-left text-sm text-slate-600">Số bản ghi đã gửi</th>
                <th className="px-6 py-3 text-left text-sm text-slate-600">Dung lượng đã gửi</th>
                <th className="px-6 py-3 text-left text-sm text-slate-600">Trạng thái</th>
                <th className="px-6 py-3 text-left text-sm text-slate-600">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistories.map((history) => (
                <tr key={history.id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">{history.timestamp.split(' ')[0]}</div>
                    <div className="text-xs text-slate-400">{history.timestamp.split(' ')[1]}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">{history.packageName}</div>
                    <div className="text-xs text-slate-500">{history.packageCode}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{history.systemName}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{history.action}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{history.recordsSent.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{history.dataSizeSent}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs rounded-full border ${history.statusColor}`}>
                      {history.statusText}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 max-w-xs">
                    {history.details}
                  </td>
                </tr>
              ))}
              {filteredHistories.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                    Không tìm thấy lịch sử đối soát
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}