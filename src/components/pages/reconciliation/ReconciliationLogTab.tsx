import * as React from 'react';
import { useState } from 'react';
import { Search, Download } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  packageName: string;
  packageCode: string;
  action: string;
  executor: string;
  ipAddress: string;
  details: string;
  status: 'success' | 'warning' | 'error' | 'info';
  statusText: string;
  statusColor: string;
}

export function ReconciliationLogTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'success' | 'warning' | 'error'>('all');

  const logs: LogEntry[] = [
    {
      id: 'LOG-001',
      timestamp: '2024-12-20 09:00:00',
      packageName: 'Gói tin đối soát CSDL Hộ tịch - Tháng 12/2024',
      packageCode: 'PKG003',
      action: 'Gọi gói tin',
      executor: 'admin@dldc.gov.vn',
      ipAddress: '10.0.0.50',
      details: 'Gửi gói tin thành công đến Hệ thống Hộ tịch điện tử - 850,000 bản ghi',
      status: 'success',
      statusText: 'Thành công',
      statusColor: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      id: 'LOG-002',
      timestamp: '2024-12-20 10:15:00',
      packageName: 'Gói tin đối soát CSDL Hộ tịch - Tháng 12/2024',
      packageCode: 'PKG003',
      action: 'Nhận phản hồi',
      executor: 'system@dldc.gov.vn',
      ipAddress: '203.162.10.25',
      details: 'Nhận phản hồi từ Hệ thống Hộ tịch điện tử - Xác nhận 850,000/850,000 bản ghi',
      status: 'success',
      statusText: 'Thành công',
      statusColor: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      id: 'LOG-003',
      timestamp: '2024-12-19 15:30:00',
      packageName: 'Gói tin đối soát CSDL Doanh nghiệp - Quý 4/2024',
      packageCode: 'PKG002',
      action: 'Gọi gói tin',
      executor: 'admin@dldc.gov.vn',
      ipAddress: '10.0.0.50',
      details: 'Gửi gói tin thành công đến Hệ thống Đăng ký kinh doanh - 125,000 bản ghi',
      status: 'success',
      statusText: 'Thành công',
      statusColor: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      id: 'LOG-004',
      timestamp: '2024-12-20 08:45:00',
      packageName: 'Gói tin đối soát CSDL Công chứng - Tháng 12/2024',
      packageCode: 'PKG004',
      action: 'Gọi gói tin',
      executor: 'system@dldc.gov.vn',
      ipAddress: '10.0.0.50',
      details: 'Timeout kết nối đến Hệ thống Công chứng sau 30 giây',
      status: 'error',
      statusText: 'Lỗi',
      statusColor: 'bg-red-100 text-red-700 border-red-200'
    },
    {
      id: 'LOG-005',
      timestamp: '2024-12-18 14:20:00',
      packageName: 'Gói tin đối soát CSDL Công chứng - Tháng 11/2024',
      packageCode: 'PKG001',
      action: 'Nhận phản hồi',
      executor: 'system@dldc.gov.vn',
      ipAddress: '203.162.10.30',
      details: 'Nhận phản hồi từ Hệ thống Công chứng - Xác nhận 44,910/45,000 bản ghi',
      status: 'warning',
      statusText: 'Cảnh báo',
      statusColor: 'bg-orange-100 text-orange-700 border-orange-200'
    }
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchTerm === '' ||
      log.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.packageCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.executor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm log theo gói tin, hành động, người dùng..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Tìm kiếm nhật ký"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={filterStatus}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[160px]"
              title="Lọc hồ sơ theo trạng thái"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="success">Thành công</option>
              <option value="error">Lỗi</option>
              <option value="warning">Cảnh báo</option>
            </select>

            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 whitespace-nowrap"
              title="Xuất nhật ký ra file"
            >
              <Download className="w-4 h-4" />
              Xuất log
            </button>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm text-slate-600">Thời gian</th>
                <th className="px-6 py-3 text-left text-sm text-slate-600">Gói tin</th>
                <th className="px-6 py-3 text-left text-sm text-slate-600">Hành động</th>
                <th className="px-6 py-3 text-left text-sm text-slate-600">Người thực hiện</th>
                <th className="px-6 py-3 text-left text-sm text-slate-600">IP</th>
                <th className="px-6 py-3 text-left text-sm text-slate-600">Chi tiết</th>
                <th className="px-6 py-3 text-left text-sm text-slate-600">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">{log.timestamp.split(' ')[0]}</div>
                    <div className="text-xs text-slate-400">{log.timestamp.split(' ')[1]}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">{log.packageName}</div>
                    <div className="text-xs text-slate-500">{log.packageCode}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">{log.action}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{log.executor}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-mono">{log.ipAddress}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 max-w-md">{log.details}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs rounded-full border ${log.statusColor}`}>
                      {log.statusText}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    Không tìm thấy log nào
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