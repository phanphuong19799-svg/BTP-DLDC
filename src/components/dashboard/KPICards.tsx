import { useState } from 'react';
import { Database, CheckCircle, Share2, AlertTriangle, TrendingUp, TrendingDown, Users, Activity, HardDrive, FileCheck, X, Calendar, Hash, CheckCircle2, FileText } from 'lucide-react';

interface KPICardsProps {
  timeRange?: string;
  sourceUnit?: string;
}

interface DataRecord {
  id: string;
  name: string;
  source: string;
  syncedCount: number;
  lastSync: string;
  status: 'success' | 'warning' | 'error';
}

const detailedData: { [key: string]: DataRecord[] } = {
  'Tổng bản ghi thu thập': [
    { id: '1', name: 'CSDL A', source: 'Hệ thống A', syncedCount: 1245832, lastSync: '11/12/2024 14:30', status: 'success' },
    { id: '2', name: 'CSDL B', source: 'Hệ thống B', syncedCount: 892456, lastSync: '11/12/2024 14:25', status: 'success' },
    { id: '3', name: 'CSDL C', source: 'Hệ thống C', syncedCount: 567234, lastSync: '11/12/2024 14:20', status: 'warning' },
    { id: '4', name: 'Biên tập danh mục A', source: 'Đơn vị A', syncedCount: 423189, lastSync: '11/12/2024 14:15', status: 'success' },
    { id: '5', name: 'Danh mục B', source: 'Đơn vị B', syncedCount: 356890, lastSync: '11/12/2024 14:10', status: 'success' },
    { id: '6', name: 'Danh mục C', source: 'Đơn vị C', syncedCount: 289345, lastSync: '11/12/2024 14:05', status: 'error' },
    { id: '7', name: 'Dịch vụ A', source: 'Hệ thống A', syncedCount: 234567, lastSync: '11/12/2024 14:00', status: 'success' },
    { id: '8', name: 'Dịch vụ B', source: 'Hệ thống B', syncedCount: 198734, lastSync: '11/12/2024 13:55', status: 'success' },
    { id: '9', name: 'Dịch vụ C', source: 'Hệ thống C', syncedCount: 156892, lastSync: '11/12/2024 13:50', status: 'success' },
    { id: '10', name: 'TGPL A', source: 'Đơn vị A', syncedCount: 67842, lastSync: '11/12/2024 13:45', status: 'success' },
  ],
  'Bản ghi đã xử lý': [
    { id: '1', name: 'CSDL A - Đã làm sạch', source: 'Quy trình xử lý', syncedCount: 1208945, lastSync: '11/12/2024 15:00', status: 'success' },
    { id: '2', name: 'CSDL B - Đã chuẩn hóa', source: 'Quy trình xử lý', syncedCount: 865234, lastSync: '11/12/2024 14:55', status: 'success' },
    { id: '3', name: 'CSDL C - Đã biến đổi', source: 'Quy trình xử lý', syncedCount: 534567, lastSync: '11/12/2024 14:50', status: 'success' },
    { id: '4', name: 'Biên tập danh mục A - Đã xử lý', source: 'Quy trình xử lý', syncedCount: 415678, lastSync: '11/12/2024 14:45', status: 'success' },
    { id: '5', name: 'Danh mục B - Đã xử lý', source: 'Quy trình xử lý', syncedCount: 348921, lastSync: '11/12/2024 14:40', status: 'success' },
    { id: '6', name: 'Danh mục C - Chờ xử lý', source: 'Quy trình xử lý', syncedCount: 267890, lastSync: '11/12/2024 14:35', status: 'warning' },
    { id: '7', name: 'Dịch vụ A - Đã xử lý', source: 'Quy trình xử lý', syncedCount: 228456, lastSync: '11/12/2024 14:30', status: 'success' },
    { id: '8', name: 'Dịch vụ B - Đã xử lý', source: 'Quy trình xử lý', syncedCount: 193487, lastSync: '11/12/2024 14:25', status: 'success' },
  ],
  'Số lần chia sẻ dữ liệu': [
    { id: '1', name: 'API CSDL A', source: 'Dịch vụ chia sẻ', syncedCount: 45632, lastSync: '11/12/2024 15:30', status: 'success' },
    { id: '2', name: 'API CSDL B', source: 'Dịch vụ chia sẻ', syncedCount: 38945, lastSync: '11/12/2024 15:25', status: 'success' },
    { id: '3', name: 'API CSDL C', source: 'Dịch vụ chia sẻ', syncedCount: 27834, lastSync: '11/12/2024 15:20', status: 'success' },
    { id: '4', name: 'Export Biên tập danh mục A', source: 'Xuất dữ liệu', syncedCount: 15678, lastSync: '11/12/2024 15:15', status: 'success' },
    { id: '5', name: 'Export Danh mục B', source: 'Xuất dữ liệu', syncedCount: 12456, lastSync: '11/12/2024 15:10', status: 'success' },
    { id: '6', name: 'Đồng bộ Hệ thống A', source: 'Tích hợp', syncedCount: 9347, lastSync: '11/12/2024 15:05', status: 'success' },
    { id: '7', name: 'Đồng bộ Hệ thống B', source: 'Tích hợp', syncedCount: 7000, lastSync: '11/12/2024 15:00', status: 'success' },
  ],
  'Tỷ lệ lỗi': [
    { id: '1', name: 'CSDL A - Lỗi dữ liệu', source: 'Kiểm tra chất lượng', syncedCount: 36887, lastSync: '11/12/2024 14:30', status: 'error' },
    { id: '2', name: 'CSDL B - Lỗi format', source: 'Kiểm tra chất lượng', syncedCount: 27222, lastSync: '11/12/2024 14:25', status: 'error' },
    { id: '3', name: 'CSDL C - Lỗi đồng bộ', source: 'Kiểm tra chất lượng', syncedCount: 32667, lastSync: '11/12/2024 14:20', status: 'error' },
    { id: '4', name: 'Biên tập danh mục A - Lỗi nhỏ', source: 'Kiểm tra chất lượng', syncedCount: 7511, lastSync: '11/12/2024 14:15', status: 'warning' },
    { id: '5', name: 'Danh mục B - Lỗi nhỏ', source: 'Kiểm tra chất lượng', syncedCount: 7969, lastSync: '11/12/2024 14:10', status: 'warning' },
    { id: '6', name: 'Danh mục C - Lỗi nghiêm trọng', source: 'Kiểm tra chất lượng', syncedCount: 21455, lastSync: '11/12/2024 14:05', status: 'error' },
  ],
  'Người dùng hoạt động': [
    { id: '1', name: 'Nhóm Quản trị', source: 'Hệ thống', syncedCount: 247, lastSync: '11/12/2024 16:00', status: 'success' },
    { id: '2', name: 'Nhóm Xử lý dữ liệu', source: 'Hệ thống', syncedCount: 189, lastSync: '11/12/2024 16:00', status: 'success' },
    { id: '3', name: 'Nhóm Phân tích', source: 'Hệ thống', syncedCount: 156, lastSync: '11/12/2024 16:00', status: 'success' },
    { id: '4', name: 'Nhóm Giám sát', source: 'Hệ thống', syncedCount: 123, lastSync: '11/12/2024 16:00', status: 'success' },
    { id: '5', name: 'Nhóm Kỹ thuật', source: 'Hệ thống', syncedCount: 132, lastSync: '11/12/2024 16:00', status: 'success' },
  ],
  'Nguồn dữ liệu': [
    { id: '1', name: 'Hệ thống A', source: 'Bộ ngành ngoài', syncedCount: 3, lastSync: '11/12/2024 15:30', status: 'success' },
    { id: '2', name: 'Hệ thống B', source: 'Bộ ngành ngoài', syncedCount: 2, lastSync: '11/12/2024 15:25', status: 'success' },
    { id: '3', name: 'Hệ thống C', source: 'Nội bộ', syncedCount: 4, lastSync: '11/12/2024 15:20', status: 'success' },
    { id: '4', name: 'Đơn vị A', source: 'Nội bộ', syncedCount: 1, lastSync: '11/12/2024 15:15', status: 'success' },
    { id: '5', name: 'Đơn vị B', source: 'Nội bộ', syncedCount: 2, lastSync: '11/12/2024 15:10', status: 'success' },
  ],
  'Tác vụ đang xử lý': [
    { id: '1', name: 'Làm sạch CSDL A', source: 'Xử lý dữ liệu', syncedCount: 5, lastSync: '11/12/2024 16:05', status: 'success' },
    { id: '2', name: 'Chuẩn hóa CSDL B', source: 'Xử lý dữ liệu', syncedCount: 7, lastSync: '11/12/2024 16:03', status: 'success' },
    { id: '3', name: 'Biến đổi CSDL C', source: 'Xử lý dữ liệu', syncedCount: 4, lastSync: '11/12/2024 16:02', status: 'success' },
    { id: '4', name: 'Đồng bộ Biên tập danh mục A', source: 'Thu thập', syncedCount: 3, lastSync: '11/12/2024 16:01', status: 'success' },
    { id: '5', name: 'Xuất dữ liệu Dịch vụ A', source: 'Chia sẻ', syncedCount: 4, lastSync: '11/12/2024 16:00', status: 'success' },
  ],
  'Tỷ lệ chính xác': [
    { id: '1', name: 'CSDL A - Kiểm tra', source: 'QA', syncedCount: 1219945, lastSync: '11/12/2024 15:00', status: 'success' },
    { id: '2', name: 'CSDL B - Kiểm tra', source: 'QA', syncedCount: 873011, lastSync: '11/12/2024 14:55', status: 'success' },
    { id: '3', name: 'CSDL C - Kiểm tra', source: 'QA', syncedCount: 555567, lastSync: '11/12/2024 14:50', status: 'success' },
    { id: '4', name: 'Biên tập danh mục A - Xác thực', source: 'QA', syncedCount: 413789, lastSync: '11/12/2024 14:45', status: 'success' },
    { id: '5', name: 'Danh mục B - Xác thực', source: 'QA', syncedCount: 349145, lastSync: '11/12/2024 14:40', status: 'success' },
  ],
};

const kpis = [
  {
    label: 'Tổng bản ghi thu thập',
    value: '4,432,981',
    change: '+12.5%',
    trend: 'up',
    icon: Database,
    color: 'blue',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    trendColor: 'text-green-600',
    detail: 'Tháng này: +487,234'
  },
  {
    label: 'Bản ghi đã xử lý',
    value: '4,298,745',
    change: '+8.3%',
    trend: 'up',
    icon: CheckCircle,
    color: 'green',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    trendColor: 'text-green-600',
    detail: 'Tỷ lệ: 96.97%'
  },
  {
    label: 'Số lần chia sẻ dữ liệu',
    value: '156,892',
    change: '+24.1%',
    trend: 'up',
    icon: Share2,
    color: 'purple',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    trendColor: 'text-green-600',
    detail: 'Tuần này: +12,458'
  },
  {
    label: 'Tỷ lệ lỗi',
    value: '3.03%',
    change: '-1.2%',
    trend: 'down',
    icon: AlertTriangle,
    color: 'orange',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    trendColor: 'text-green-600',
    detail: 'Đã giảm từ 4.23%'
  },
  {
    label: 'Người dùng hoạt động',
    value: '847',
    change: '+5.6%',
    trend: 'up',
    icon: Users,
    color: 'indigo',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    trendColor: 'text-green-600',
    detail: 'Online: 124 người'
  },
  {
    label: 'Nguồn dữ liệu',
    value: '12/12',
    change: '0%',
    trend: 'up',
    icon: HardDrive,
    color: 'cyan',
    bgColor: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    trendColor: 'text-slate-600',
    detail: 'Tất cả hoạt động'
  },
  {
    label: 'Tác vụ đang xử lý',
    value: '23',
    change: '+15.0%',
    trend: 'up',
    icon: Activity,
    color: 'rose',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-600',
    trendColor: 'text-green-600',
    detail: 'Queue: 145 tác vụ'
  },
  {
    label: 'Tỷ lệ chính xác',
    value: '97.8%',
    change: '+2.1%',
    trend: 'up',
    icon: FileCheck,
    color: 'emerald',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    trendColor: 'text-green-600',
    detail: 'Cao hơn KPI: 95%'
  },
];

export function KPICards({ timeRange = '30days', sourceUnit = 'all' }: KPICardsProps) {
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);

  const currentData = selectedKPI ? detailedData[selectedKPI] || [] : [];
  const totalSynced = currentData.reduce((sum, record) => sum + record.syncedCount, 0);

  const getStatusBadge = (status: 'success' | 'warning' | 'error') => {
    const styles = {
      success: 'bg-green-100 text-green-700 border-green-200',
      warning: 'bg-amber-100 text-amber-700 border-amber-200',
      error: 'bg-red-100 text-red-700 border-red-200'
    };
    const labels = {
      success: 'Thành công',
      warning: 'Cảnh báo',
      error: 'Lỗi'
    };
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;

          return (
            <div
              key={kpi.label}
              onClick={() => setSelectedKPI(kpi.label)}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${kpi.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${kpi.iconColor}`} />
                </div>
                <div className="flex items-center gap-1">
                  <TrendIcon className={`w-4 h-4 ${kpi.trendColor}`} />
                  <span className={`text-sm ${kpi.trendColor}`}>{kpi.change}</span>
                </div>
              </div>
              <div className="text-2xl text-slate-900 mb-1">{kpi.value}</div>
              <div className="text-sm text-slate-600 mb-2">{kpi.label}</div>
              <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">{kpi.detail}</div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedKPI && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h2 className="text-slate-900">{selectedKPI}</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Chi tiết dữ liệu đã thu thập và đồng bộ
                </p>
              </div>
              <button
                title="Đóng"
                onClick={() => setSelectedKPI(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4 p-6 bg-slate-50 border-b border-slate-200">
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-slate-600">Tổng nguồn</span>
                </div>
                <div className="text-2xl text-slate-900">{currentData.length}</div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-slate-600">Tổng đồng bộ</span>
                </div>
                <div className="text-2xl text-slate-900">{totalSynced.toLocaleString()}</div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs text-slate-600">Thành công</span>
                </div>
                <div className="text-2xl text-slate-900">
                  {currentData.filter(r => r.status === 'success').length}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-xs text-slate-600">Cảnh báo/Lỗi</span>
                </div>
                <div className="text-2xl text-slate-900">
                  {currentData.filter(r => r.status !== 'success').length}
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="flex-1 overflow-y-auto p-6">
              <table className="w-full">
                <thead className="sticky top-0 bg-white z-10 border-b-2 border-slate-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-slate-900 font-semibold">STT</th>
                    <th className="text-left py-3 px-4 text-slate-900 font-semibold">Tên dữ liệu</th>
                    <th className="text-left py-3 px-4 text-slate-900 font-semibold">Nguồn</th>
                    <th className="text-right py-3 px-4 text-slate-900 font-semibold">Số lượng đồng bộ</th>
                    <th className="text-left py-3 px-4 text-slate-900 font-semibold">Lần đồng bộ cuối</th>
                    <th className="text-center py-3 px-4 text-slate-900 font-semibold">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((record, index) => (
                    <tr
                      key={record.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-slate-600">{index + 1}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-900">{record.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600">{record.source}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-sm text-slate-900">
                          {record.syncedCount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-xs text-slate-600">{record.lastSync}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {getStatusBadge(record.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {currentData.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  Không có dữ liệu chi tiết
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => setSelectedKPI(null)}
                className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}