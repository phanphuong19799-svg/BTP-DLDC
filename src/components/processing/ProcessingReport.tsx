import { useState } from 'react';
import { FileText, Download, Filter, Calendar, TrendingUp, TrendingDown, CheckCircle, XCircle, AlertTriangle, BarChart3 } from 'lucide-react';

interface ReportData {
  id: string;
  reportName: string;
  executionDate: string;
  sourceName: string;
  sourceType: string;
  totalRecords: number;
  successRecords: number;
  errorRecords: number;
  warningRecords: number;
  successRate: number;
  processingTime: string;
  rulesApplied: number;
  dataQualityScore: number;
  issues: {
    type: string;
    count: number;
    severity: 'high' | 'medium' | 'low';
  }[];
}

const mockReports: ReportData[] = [
  {
    id: '1',
    reportName: 'Báo cáo xử lý dữ liệu Đấu giá viên - T12/2024',
    executionDate: '08/12/2024 08:45:23',
    sourceName: 'Cơ sở dữ liệu đấu giá viên',
    sourceType: 'Cục Đăng ký quốc gia giao dịch bảo đảm',
    totalRecords: 15420,
    successRecords: 15380,
    errorRecords: 40,
    warningRecords: 125,
    successRate: 99.74,
    processingTime: '15 phút 23 giây',
    rulesApplied: 12,
    dataQualityScore: 96.5,
    issues: [
      { type: 'Trùng lặp CMND/CCCD', count: 18, severity: 'high' },
      { type: 'Định dạng số điện thoại', count: 45, severity: 'medium' },
      { type: 'Thiếu mã tỉnh/thành', count: 22, severity: 'high' },
      { type: 'Ký tự đặc biệt trong tên', count: 40, severity: 'low' },
    ],
  },
  {
    id: '2',
    reportName: 'Báo cáo xử lý dữ liệu Công chứng viên - T12/2024',
    executionDate: '08/12/2024 07:28:45',
    sourceName: 'Thông tin công chứng viên',
    sourceType: 'Cục Công chứng',
    totalRecords: 8750,
    successRecords: 8750,
    errorRecords: 0,
    warningRecords: 35,
    successRate: 100,
    processingTime: '13 phút 45 giây',
    rulesApplied: 8,
    dataQualityScore: 98.8,
    issues: [
      { type: 'Định dạng ngày cấp thẻ', count: 12, severity: 'medium' },
      { type: 'Thiếu email liên hệ', count: 23, severity: 'low' },
    ],
  },
  {
    id: '3',
    reportName: 'Báo cáo xử lý Hồ sơ trợ giúp pháp lý - T12/2024',
    executionDate: '08/12/2024 06:32:10',
    sourceName: 'Hồ sơ trợ giúp pháp lý',
    sourceType: 'Cục Trợ giúp pháp lý',
    totalRecords: 23450,
    successRecords: 23120,
    errorRecords: 330,
    warningRecords: 580,
    successRate: 98.59,
    processingTime: '32 phút 10 giây',
    rulesApplied: 15,
    dataQualityScore: 92.3,
    issues: [
      { type: 'Thiếu thông tin đối tượng', count: 145, severity: 'high' },
      { type: 'Sai định dạng địa chỉ', count: 185, severity: 'medium' },
      { type: 'Trùng mã hồ sơ', count: 95, severity: 'high' },
      { type: 'Thiếu ngày tiếp nhận', count: 155, severity: 'medium' },
    ],
  },
];

export function ProcessingReport() {
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [dateFilter, setDateFilter] = useState('all');

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Cao</span>;
      case 'medium':
        return <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">Trung bình</span>;
      case 'low':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Thấp</span>;
      default:
        return null;
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-blue-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-slate-900 mb-1">Báo cáo chi tiết kết quả xử lý</h3>
          <p className="text-sm text-slate-600">
            Xem báo cáo tổng hợp và phân tích chất lượng dữ liệu sau xử lý
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4 text-slate-600" />
            Lọc
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Tổng báo cáo</p>
              <p className="text-xl text-slate-900">{mockReports.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Tỷ lệ thành công TB</p>
              <p className="text-xl text-slate-900">99.4%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Điểm chất lượng TB</p>
              <p className="text-xl text-slate-900">95.9</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Tổng vấn đề</p>
              <p className="text-xl text-slate-900">740</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg border border-slate-200 hover:shadow-lg transition-all">
            <div className="p-5">
              {/* Report Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-slate-900 mb-2">{report.reportName}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" />
                    {report.executionDate}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReport(report)}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                >
                  Xem chi tiết
                </button>
              </div>

              {/* Source Info */}
              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-900 mb-1">{report.sourceName}</p>
                <p className="text-xs text-slate-600">{report.sourceType}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg">
                  <p className="text-xs text-blue-600 mb-1">Tổng bản ghi</p>
                  <p className="text-lg text-blue-900">{report.totalRecords.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg">
                  <p className="text-xs text-green-600 mb-1">Thành công</p>
                  <p className="text-lg text-green-900">{report.successRecords.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-red-50 to-red-100/50 rounded-lg">
                  <p className="text-xs text-red-600 mb-1">Lỗi</p>
                  <p className="text-lg text-red-900">{report.errorRecords.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-lg">
                  <p className="text-xs text-orange-600 mb-1">Cảnh báo</p>
                  <p className="text-lg text-orange-900">{report.warningRecords.toLocaleString()}</p>
                </div>
              </div>

              {/* Success Rate */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Tỷ lệ thành công</span>
                  <span className="text-sm text-slate-900">{report.successRate}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      report.successRate >= 99 ? 'bg-green-600' :
                      report.successRate >= 95 ? 'bg-blue-600' : 'bg-orange-600'
                    }`}
                    style={{ width: `${report.successRate}%` }}
                  />
                </div>
              </div>

              {/* Quality Score & Processing Time */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-slate-600">Điểm chất lượng:</span>
                  <span className={`text-sm ${getQualityColor(report.dataQualityScore)}`}>
                    {report.dataQualityScore}/100
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  ⏱ {report.processingTime}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-900 mb-1">{selectedReport.reportName}</h3>
                  <p className="text-sm text-slate-600">Chi tiết báo cáo xử lý dữ liệu</p>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-1">Nguồn dữ liệu</label>
                    <p className="text-sm text-slate-900">{selectedReport.sourceName}</p>
                    <p className="text-xs text-slate-600">{selectedReport.sourceType}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 uppercase mb-1">Thời gian thực hiện</label>
                    <p className="text-sm text-slate-900">{selectedReport.executionDate}</p>
                    <p className="text-xs text-blue-600">Thời lượng: {selectedReport.processingTime}</p>
                  </div>
                </div>

                {/* Processing Summary */}
                <div>
                  <h4 className="text-slate-900 mb-3">Tổng quan xử lý</h4>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                      <p className="text-xs text-blue-600 mb-1">Tổng bản ghi</p>
                      <p className="text-2xl text-blue-900">{selectedReport.totalRecords.toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                      <div className="flex items-center gap-1 mb-1">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <p className="text-xs text-green-600">Thành công</p>
                      </div>
                      <p className="text-2xl text-green-900">{selectedReport.successRecords.toLocaleString()}</p>
                      <p className="text-xs text-green-600 mt-1">{selectedReport.successRate}%</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
                      <div className="flex items-center gap-1 mb-1">
                        <XCircle className="w-3 h-3 text-red-600" />
                        <p className="text-xs text-red-600">Lỗi</p>
                      </div>
                      <p className="text-2xl text-red-900">{selectedReport.errorRecords.toLocaleString()}</p>
                      <p className="text-xs text-red-600 mt-1">{((selectedReport.errorRecords / selectedReport.totalRecords) * 100).toFixed(2)}%</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
                      <div className="flex items-center gap-1 mb-1">
                        <AlertTriangle className="w-3 h-3 text-orange-600" />
                        <p className="text-xs text-orange-600">Cảnh báo</p>
                      </div>
                      <p className="text-2xl text-orange-900">{selectedReport.warningRecords.toLocaleString()}</p>
                      <p className="text-xs text-orange-600 mt-1">{((selectedReport.warningRecords / selectedReport.totalRecords) * 100).toFixed(2)}%</p>
                    </div>
                  </div>
                </div>

                {/* Quality Metrics */}
                <div>
                  <h4 className="text-slate-900 mb-3">Chỉ số chất lượng</h4>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <BarChart3 className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-purple-600">Điểm chất lượng dữ liệu</p>
                          <p className={`text-3xl ${getQualityColor(selectedReport.dataQualityScore)}`}>
                            {selectedReport.dataQualityScore}/100
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-purple-600">Quy tắc áp dụng</p>
                        <p className="text-2xl text-purple-900">{selectedReport.rulesApplied}</p>
                      </div>
                    </div>
                    <div className="w-full bg-white/50 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          selectedReport.dataQualityScore >= 95 ? 'bg-green-600' :
                          selectedReport.dataQualityScore >= 85 ? 'bg-blue-600' :
                          selectedReport.dataQualityScore >= 70 ? 'bg-orange-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${selectedReport.dataQualityScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Issues Breakdown */}
                <div>
                  <h4 className="text-slate-900 mb-3">Phân tích vấn đề phát hiện</h4>
                  <div className="space-y-2">
                    {selectedReport.issues.map((issue, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className={`w-4 h-4 ${
                            issue.severity === 'high' ? 'text-red-600' :
                            issue.severity === 'medium' ? 'text-orange-600' : 'text-yellow-600'
                          }`} />
                          <span className="text-sm text-slate-900">{issue.type}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-slate-600">{issue.count} bản ghi</span>
                          {getSeverityBadge(issue.severity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-blue-900 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Khuyến nghị cải thiện
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1 ml-6">
                    <li className="list-disc">Thiết lập quy tắc kiểm tra định dạng CMND/CCCD trước khi nhập</li>
                    <li className="list-disc">Cập nhật danh mục mã tỉnh/thành để giảm lỗi tham chiếu</li>
                    <li className="list-disc">Áp dụng chuẩn hóa tự động cho trường số điện thoại</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Tải báo cáo PDF
              </button>
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
