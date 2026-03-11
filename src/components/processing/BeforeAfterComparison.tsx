import { useState } from 'react';
import { GitCompare, Search, Download, CheckCircle, XCircle, ArrowRight, Filter, TrendingUp } from 'lucide-react';

interface ComparisonRecord {
  id: string;
  recordId: string;
  sourceName: string;
  fields: {
    name: string;
    before: string;
    after: string;
    changed: boolean;
    status: 'improved' | 'fixed' | 'unchanged' | 'warning';
  }[];
  qualityScoreBefore: number;
  qualityScoreAfter: number;
  timestamp: string;
}

const mockComparisons: ComparisonRecord[] = [
  {
    id: '1',
    recordId: 'DGV-2024-001523',
    sourceName: 'Cơ sở dữ liệu đấu giá viên',
    timestamp: '08/12/2024 08:35:12',
    qualityScoreBefore: 65,
    qualityScoreAfter: 98,
    fields: [
      {
        name: 'CMND/CCCD',
        before: '001088012345',
        after: '001088012345',
        changed: false,
        status: 'unchanged',
      },
      {
        name: 'Họ và tên',
        before: 'NGUYEN VAN A',
        after: 'Nguyễn Văn A',
        changed: true,
        status: 'improved',
      },
      {
        name: 'Ngày sinh',
        before: '1985/03/15',
        after: '15/03/1985',
        changed: true,
        status: 'improved',
      },
      {
        name: 'Số điện thoại',
        before: '84912345678',
        after: '0912345678',
        changed: true,
        status: 'improved',
      },
      {
        name: 'Email',
        before: '',
        after: 'nguyen.a@email.com',
        changed: true,
        status: 'fixed',
      },
      {
        name: 'Địa chỉ',
        before: 'ha noi',
        after: 'Hà Nội',
        changed: true,
        status: 'improved',
      },
      {
        name: 'Mã tỉnh/thành',
        before: '01',
        after: 'TP-HN',
        changed: true,
        status: 'improved',
      },
      {
        name: 'Trạng thái',
        before: 'ACTIVE',
        after: 'Hoạt động',
        changed: true,
        status: 'improved',
      },
    ],
  },
  {
    id: '2',
    recordId: 'CCV-2024-002341',
    sourceName: 'Thông tin công chứng viên',
    timestamp: '08/12/2024 07:20:30',
    qualityScoreBefore: 72,
    qualityScoreAfter: 95,
    fields: [
      {
        name: 'Họ và tên',
        before: 'HOANG THI E',
        after: 'Hoàng Thị E',
        changed: true,
        status: 'improved',
      },
      {
        name: 'Số thẻ CC',
        before: 'CC 001234',
        after: 'CC-001234',
        changed: true,
        status: 'improved',
      },
      {
        name: 'Ngày cấp thẻ',
        before: '2020-01-15',
        after: '15/01/2020',
        changed: true,
        status: 'improved',
      },
      {
        name: 'Nơi công tác',
        before: 'Van phong cong chung Ha Noi',
        after: 'Văn phòng công chứng Hà Nội',
        changed: true,
        status: 'improved',
      },
      {
        name: 'Trạng thái',
        before: 'HOAT_DONG',
        after: 'Hoạt động',
        changed: true,
        status: 'improved',
      },
      {
        name: 'Số điện thoại',
        before: '',
        after: '0243.8456789',
        changed: true,
        status: 'fixed',
      },
    ],
  },
  {
    id: '3',
    recordId: 'TGPL-2024-015678',
    sourceName: 'Hồ sơ trợ giúp pháp lý',
    timestamp: '08/12/2024 06:15:45',
    qualityScoreBefore: 58,
    qualityScoreAfter: 75,
    fields: [
      {
        name: 'Mã hồ sơ',
        before: 'HS-15678',
        after: 'HS-15678',
        changed: false,
        status: 'unchanged',
      },
      {
        name: 'Đối tượng thụ hưởng',
        before: '',
        after: '',
        changed: false,
        status: 'warning',
      },
      {
        name: 'Loại vụ việc',
        before: 'Dan_su',
        after: 'Dân sự',
        changed: true,
        status: 'improved',
      },
      {
        name: 'Ngày tiếp nhận',
        before: '2024/11/15',
        after: '15/11/2024',
        changed: true,
        status: 'improved',
      },
      {
        name: 'Trạng thái',
        before: 'dang_xu_ly',
        after: 'Đang xử lý',
        changed: true,
        status: 'improved',
      },
      {
        name: 'Địa chỉ',
        before: 'phuong 5, quan 10, tp hcm',
        after: 'Phường 5, Quận 10, TP. Hồ Chí Minh',
        changed: true,
        status: 'improved',
      },
    ],
  },
  {
    id: '4',
    recordId: 'DGV-2024-001524',
    sourceName: 'Cơ sở dữ liệu đấu giá viên',
    timestamp: '08/12/2024 08:35:15',
    qualityScoreBefore: 45,
    qualityScoreAfter: 52,
    fields: [
      {
        name: 'Họ và tên',
        before: 'Trần Thị B',
        after: 'Trần Thị B',
        changed: false,
        status: 'unchanged',
      },
      {
        name: 'CMND/CCCD',
        before: '001088012346',
        after: '001088012346',
        changed: false,
        status: 'unchanged',
      },
      {
        name: 'Mã tỉnh/thành',
        before: 'TP99',
        after: '',
        changed: true,
        status: 'warning',
      },
      {
        name: 'Số điện thoại',
        before: '0987654321',
        after: '0987654321',
        changed: false,
        status: 'unchanged',
      },
    ],
  },
];

export function BeforeAfterComparison() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<ComparisonRecord | null>(null);
  const [filterChanged, setFilterChanged] = useState(false);

  const filteredRecords = mockComparisons.filter(record => {
    const matchSearch = 
      record.recordId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.sourceName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'improved':
        return 'bg-blue-50 border-blue-200';
      case 'fixed':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'improved':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Cải thiện</span>;
      case 'fixed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Sửa lỗi</span>;
      case 'warning':
        return <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">Cảnh báo</span>;
      default:
        return <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">Không đổi</span>;
    }
  };

  const getQualityImprovement = (before: number, after: number) => {
    const diff = after - before;
    const percent = ((diff / before) * 100).toFixed(1);
    
    if (diff > 0) {
      return (
        <div className="flex items-center gap-2 text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">+{percent}%</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-slate-900 mb-1">So sánh trước/sau xử lý</h3>
          <p className="text-sm text-slate-600">
            Xem chi tiết thay đổi dữ liệu trước và sau khi xử lý
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setFilterChanged(!filterChanged)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              filterChanged
                ? 'bg-blue-600 text-white'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            Chỉ hiện thay đổi
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Xuất so sánh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <GitCompare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Tổng bản ghi</p>
              <p className="text-xl text-slate-900">{mockComparisons.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Cải thiện</p>
              <p className="text-xl text-slate-900">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <XCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Còn vấn đề</p>
              <p className="text-xl text-slate-900">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Cải thiện TB</p>
              <p className="text-xl text-slate-900">+38%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Tìm kiếm theo mã bản ghi, nguồn dữ liệu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-lg border border-slate-200 hover:shadow-lg transition-all"
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-slate-900 mb-1">
                    Bản ghi: <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">{record.recordId}</span>
                  </h4>
                  <p className="text-sm text-slate-600">{record.sourceName}</p>
                  <p className="text-xs text-slate-500 mt-1">{record.timestamp}</p>
                </div>
                <button
                  onClick={() => setSelectedRecord(record)}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                >
                  Chi tiết
                </button>
              </div>

              {/* Quality Score Comparison */}
              <div className="mb-4 p-4 bg-gradient-to-r from-slate-50 to-purple-50 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-600 mb-2">Điểm chất lượng</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 mb-1">Trước</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-orange-400"
                          style={{ width: `${record.qualityScoreBefore}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-900 w-8">{record.qualityScoreBefore}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 mb-1">Sau</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-green-600"
                          style={{ width: `${record.qualityScoreAfter}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-900 w-8">{record.qualityScoreAfter}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-600">Cải thiện:</span>
                  {getQualityImprovement(record.qualityScoreBefore, record.qualityScoreAfter)}
                </div>
              </div>

              {/* Changed Fields Summary */}
              <div>
                <p className="text-xs text-slate-600 mb-2">
                  Thay đổi: {record.fields.filter(f => f.changed).length}/{record.fields.length} trường
                </p>
                <div className="flex flex-wrap gap-2">
                  {record.fields.filter(f => f.changed).slice(0, 4).map((field, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded"
                    >
                      {field.name}
                    </span>
                  ))}
                  {record.fields.filter(f => f.changed).length > 4 && (
                    <span className="text-xs text-slate-500">
                      +{record.fields.filter(f => f.changed).length - 4} trường
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-900 mb-1">So sánh chi tiết - {selectedRecord.recordId}</h3>
                  <p className="text-sm text-slate-600">{selectedRecord.sourceName}</p>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Quality Comparison */}
                <div className="bg-gradient-to-r from-slate-50 to-purple-50 rounded-lg p-6 border border-slate-200">
                  <h4 className="text-slate-900 mb-4">So sánh điểm chất lượng</h4>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-sm text-slate-600 mb-2">Trước xử lý</p>
                      <div className="p-4 bg-white rounded-lg">
                        <p className="text-3xl text-orange-600">{selectedRecord.qualityScoreBefore}</p>
                        <p className="text-xs text-slate-500 mt-1">điểm</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-600 mb-2">Sau xử lý</p>
                      <div className="p-4 bg-white rounded-lg">
                        <p className="text-3xl text-green-600">{selectedRecord.qualityScoreAfter}</p>
                        <p className="text-xs text-slate-500 mt-1">điểm</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    {getQualityImprovement(selectedRecord.qualityScoreBefore, selectedRecord.qualityScoreAfter)}
                  </div>
                </div>

                {/* Field by Field Comparison */}
                <div>
                  <h4 className="text-slate-900 mb-4">Chi tiết thay đổi từng trường</h4>
                  <div className="space-y-3">
                    {selectedRecord.fields.map((field, index) => (
                      <div
                        key={index}
                        className={`border rounded-lg p-4 ${getStatusColor(field.status)}`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-slate-900">{field.name}</h5>
                          {getStatusBadge(field.status)}
                        </div>
                        <div className="grid grid-cols-3 gap-4 items-center">
                          <div>
                            <p className="text-xs text-slate-500 mb-2">Trước xử lý</p>
                            <div className="p-3 bg-white rounded border border-slate-200">
                              <p className={`text-sm font-mono ${
                                field.before ? 'text-slate-900' : 'text-slate-400 italic'
                              }`}>
                                {field.before || '(Trống)'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            {field.changed ? (
                              <ArrowRight className="w-6 h-6 text-blue-600" />
                            ) : (
                              <span className="text-slate-400">=</span>
                            )}
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-2">Sau xử lý</p>
                            <div className={`p-3 rounded border ${
                              field.changed ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'
                            }`}>
                              <p className={`text-sm font-mono ${
                                field.after ? 'text-slate-900' : 'text-slate-400 italic'
                              }`}>
                                {field.after || '(Trống)'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-blue-900 mb-2">Tổng kết</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-blue-600">Tổng số trường:</p>
                      <p className="text-blue-900">{selectedRecord.fields.length}</p>
                    </div>
                    <div>
                      <p className="text-blue-600">Đã thay đổi:</p>
                      <p className="text-blue-900">{selectedRecord.fields.filter(f => f.changed).length}</p>
                    </div>
                    <div>
                      <p className="text-blue-600">Không đổi:</p>
                      <p className="text-blue-900">{selectedRecord.fields.filter(f => !f.changed).length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Tải so sánh
              </button>
              <button
                onClick={() => setSelectedRecord(null)}
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
