import { useState } from 'react';
import { Search, Download, FileText, Printer, TrendingUp, AlertCircle, Calendar, Filter, X } from 'lucide-react';
import { DataDetailModal } from '../../common/DataDetailModal';

type TabType = 'search' | 'usage' | 'lifecycle';

interface SearchFilter {
  recordCode: string;
  fullName: string;
  dataType: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

interface UsageReport {
  id: string;
  dataType: string;
  totalAccess: number;
  totalUsage: number;
  avgResponseTime: number;
  lastAccess: string;
}

interface LifecycleData {
  id: string;
  recordCode: string;
  fullName: string;
  dataType: string;
  createdDate: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'active' | 'warning' | 'expired';
}

// Mock data
const mockSearchResults = [
  {
    id: '1',
    recordCode: 'DLDC-2024-001',
    fullName: 'Nguyễn Văn An',
    dataType: 'Công chứng',
    birthDate: '15/01/1990',
    cccdNumber: '001234567890',
    birthPlace: 'Hà Nội',
    status: 'Đã công khai',
    updateDate: '20/12/2024',
  },
  {
    id: '2',
    recordCode: 'DLDC-2024-002',
    fullName: 'Trần Thị Bình',
    dataType: 'Đăng ký kinh doanh',
    birthDate: '22/05/1985',
    cccdNumber: '001234567891',
    birthPlace: 'TP.HCM',
    status: 'Đã công khai',
    updateDate: '19/12/2024',
  },
  {
    id: '3',
    recordCode: 'DLDC-2024-003',
    fullName: 'Lê Văn Cường',
    dataType: 'Trợ giúp pháp lý',
    birthDate: '10/08/1992',
    cccdNumber: '001234567892',
    birthPlace: 'Đà Nẵng',
    status: 'Chờ duyệt',
    updateDate: '18/12/2024',
  },
];

const mockUsageReports: UsageReport[] = [
  {
    id: '1',
    dataType: 'Công chứng',
    totalAccess: 1250,
    totalUsage: 980,
    avgResponseTime: 1.2,
    lastAccess: '25/12/2024 14:30',
  },
  {
    id: '2',
    dataType: 'Đăng ký kinh doanh',
    totalAccess: 2340,
    totalUsage: 2100,
    avgResponseTime: 0.8,
    lastAccess: '25/12/2024 14:25',
  },
  {
    id: '3',
    dataType: 'Trợ giúp pháp lý',
    totalAccess: 560,
    totalUsage: 450,
    avgResponseTime: 1.5,
    lastAccess: '25/12/2024 13:45',
  },
  {
    id: '4',
    dataType: 'Hộ tịch',
    totalAccess: 890,
    totalUsage: 720,
    avgResponseTime: 1.1,
    lastAccess: '25/12/2024 12:00',
  },
];

const mockLifecycleData: LifecycleData[] = [
  {
    id: '1',
    recordCode: 'DLDC-2024-101',
    fullName: 'Phạm Thị Dung',
    dataType: 'Công chứng',
    createdDate: '15/06/2024',
    expiryDate: '15/01/2025',
    daysRemaining: 21,
    status: 'warning',
  },
  {
    id: '2',
    recordCode: 'DLDC-2024-102',
    fullName: 'Hoàng Văn Em',
    dataType: 'Đăng ký kinh doanh',
    createdDate: '10/05/2024',
    expiryDate: '10/12/2024',
    daysRemaining: -15,
    status: 'expired',
  },
  {
    id: '3',
    recordCode: 'DLDC-2024-103',
    fullName: 'Võ Thị Phương',
    dataType: 'Hộ tịch',
    createdDate: '20/07/2024',
    expiryDate: '20/02/2025',
    daysRemaining: 57,
    status: 'active',
  },
  {
    id: '4',
    recordCode: 'DLDC-2024-104',
    fullName: 'Đỗ Văn Giang',
    dataType: 'Trợ giúp pháp lý',
    createdDate: '05/08/2024',
    expiryDate: '05/01/2025',
    daysRemaining: 11,
    status: 'warning',
  },
];

export default function MasterDataReportsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('search');
  const [showFilters, setShowFilters] = useState(true);
  const [searchFilters, setSearchFilters] = useState<SearchFilter>({
    recordCode: '',
    fullName: '',
    dataType: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  });
  const [searchResults, setSearchResults] = useState(mockSearchResults);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleSearch = () => {
    // Mock search logic
    console.log('Searching with filters:', searchFilters);
    // In real app, call API with filters
  };

  const handleResetFilters = () => {
    setSearchFilters({
      recordCode: '',
      fullName: '',
      dataType: '',
      status: '',
      dateFrom: '',
      dateTo: '',
    });
  };

  const handleViewDetail = (record: any) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  const handleExportExcel = () => {
    alert('Đang xuất file Excel...');
  };

  const handleExportPDF = () => {
    alert('Đang xuất file PDF...');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 overflow-auto bg-slate-50">
      <div className="p-6">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6">
          <div className="border-b border-slate-200">
            <div className="flex gap-6 px-6">
              <button
                onClick={() => setActiveTab('search')}
                className={`pb-3 pt-4 px-2 border-b-2 transition-colors ${
                  activeTab === 'search'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <span>Tra cứu dữ liệu chủ</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('usage')}
                className={`pb-3 pt-4 px-2 border-b-2 transition-colors ${
                  activeTab === 'usage'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Báo cáo sử dụng dữ liệu chủ</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('lifecycle')}
                className={`pb-3 pt-4 px-2 border-b-2 transition-colors ${
                  activeTab === 'lifecycle'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Báo cáo vòng đời dữ liệu</span>
                </div>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Search Tab */}
            {activeTab === 'search' && (
              <div className="space-y-6">
                {/* Filter Section */}
                {showFilters && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-blue-600" />
                        <h3 className="text-blue-900">Bộ lọc tìm kiếm</h3>
                      </div>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="p-1 hover:bg-blue-100 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          Mã dữ liệu chủ
                        </label>
                        <input
                          type="text"
                          value={searchFilters.recordCode}
                          onChange={(e) =>
                            setSearchFilters({ ...searchFilters, recordCode: e.target.value })
                          }
                          placeholder="Nhập mã dữ liệu..."
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          Tên dữ liệu chủ
                        </label>
                        <input
                          type="text"
                          value={searchFilters.fullName}
                          onChange={(e) =>
                            setSearchFilters({ ...searchFilters, fullName: e.target.value })
                          }
                          placeholder="Nhập tên..."
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          Loại dữ liệu
                        </label>
                        <select
                          value={searchFilters.dataType}
                          onChange={(e) =>
                            setSearchFilters({ ...searchFilters, dataType: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Tất cả</option>
                          <option value="congchung">Công chứng</option>
                          <option value="dangkykinhdoanh">Đăng ký kinh doanh</option>
                          <option value="tgpl">Trợ giúp pháp lý</option>
                          <option value="hotich">Hộ tịch</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          Trạng thái
                        </label>
                        <select
                          value={searchFilters.status}
                          onChange={(e) =>
                            setSearchFilters({ ...searchFilters, status: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Tất cả</option>
                          <option value="congkhai">Đã công khai</option>
                          <option value="choduyet">Chờ duyệt</option>
                          <option value="tuchoibocongkhai">Từ chối/Bỏ công khai</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          Từ ngày
                        </label>
                        <input
                          type="date"
                          value={searchFilters.dateFrom}
                          onChange={(e) =>
                            setSearchFilters({ ...searchFilters, dateFrom: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          Đến ngày
                        </label>
                        <input
                          type="date"
                          value={searchFilters.dateTo}
                          onChange={(e) =>
                            setSearchFilters({ ...searchFilters, dateTo: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={handleResetFilters}
                        className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Xóa bộ lọc
                      </button>
                      <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Search className="w-4 h-4" />
                        Tìm kiếm
                      </button>
                    </div>
                  </div>
                )}

                {!showFilters && (
                  <button
                    onClick={() => setShowFilters(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Hiển thị bộ lọc
                  </button>
                )}

                {/* Results Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-slate-600" />
                      <h3 className="text-slate-900">
                        Kết quả tìm kiếm ({searchResults.length} bản ghi)
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrint}
                        className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
                      >
                        <Printer className="w-4 h-4" />
                        In
                      </button>
                      <button
                        onClick={handleExportExcel}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Excel
                      </button>
                      <button
                        onClick={handleExportPDF}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </button>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            STT
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Mã dữ liệu
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Tên dữ liệu chủ
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Loại dữ liệu
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Ngày cập nhật
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Trạng thái
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {searchResults.map((record, index) => (
                          <tr key={record.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm text-slate-900">{index + 1}</td>
                            <td className="px-4 py-3 text-sm text-blue-600">
                              {record.recordCode}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-900">
                              {record.fullName}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {record.dataType}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {record.updateDate}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs ${
                                  record.status === 'Đã công khai'
                                    ? 'bg-green-100 text-green-800'
                                    : record.status === 'Chờ duyệt'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {record.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleViewDetail(record)}
                                className="text-sm text-blue-600 hover:text-blue-800"
                              >
                                Xem chi tiết
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Usage Report Tab */}
            {activeTab === 'usage' && (
              <div className="space-y-6">
                {/* Report Type Selector */}
                <div className="flex items-center gap-4">
                  <label className="text-sm text-slate-700">Loại báo cáo:</label>
                  <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Báo cáo truy cập</option>
                    <option>Báo cáo tiêu thụ</option>
                    <option>Thống kê tổng hợp</option>
                  </select>
                  <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>7 ngày qua</option>
                    <option>30 ngày qua</option>
                    <option>Tháng này</option>
                    <option>Quý này</option>
                    <option>Năm này</option>
                  </select>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                    <div className="text-sm opacity-90 mb-1">Tổng truy cập</div>
                    <div className="text-2xl mb-1">5,040</div>
                    <div className="text-xs opacity-75">+12.5% so với tuần trước</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
                    <div className="text-sm opacity-90 mb-1">Tổng sử dụng</div>
                    <div className="text-2xl mb-1">4,250</div>
                    <div className="text-xs opacity-75">+8.3% so với tuần trước</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                    <div className="text-sm opacity-90 mb-1">Thời gian phản hồi TB</div>
                    <div className="text-2xl mb-1">1.15s</div>
                    <div className="text-xs opacity-75">-5.2% so với tuần trước</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
                    <div className="text-sm opacity-90 mb-1">Loại dữ liệu hoạt động</div>
                    <div className="text-2xl mb-1">12</div>
                    <div className="text-xs opacity-75">Trong tổng số 15 loại</div>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-slate-900 mb-4">Biểu đồ sử dụng theo thời gian</h3>
                  <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200">
                    <div className="text-center text-slate-500">
                      <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Biểu đồ sẽ hiển thị ở đây</p>
                      <p className="text-xs">
                        (Sử dụng thư viện recharts để vẽ biểu đồ thực tế)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Usage Table */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-900">Chi tiết sử dụng theo loại dữ liệu</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleExportExcel}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Xuất Excel
                      </button>
                      <button
                        onClick={handleExportPDF}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Xuất PDF
                      </button>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            STT
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Loại dữ liệu
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Tổng truy cập
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Tổng sử dụng
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            TG phản hồi TB (s)
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Truy cập gần nhất
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {mockUsageReports.map((report, index) => (
                          <tr key={report.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm text-slate-900">{index + 1}</td>
                            <td className="px-4 py-3 text-sm text-slate-900">
                              {report.dataType}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-900">
                              {report.totalAccess.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-900">
                              {report.totalUsage.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-900">
                              {report.avgResponseTime}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {report.lastAccess}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Lifecycle Report Tab */}
            {activeTab === 'lifecycle' && (
              <div className="space-y-6">
                {/* Data Type Selector */}
                <div className="flex items-center gap-4">
                  <label className="text-sm text-slate-700">Danh mục dữ liệu:</label>
                  <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Tất cả</option>
                    <option>Công chứng</option>
                    <option>Đăng ký kinh doanh</option>
                    <option>Trợ giúp pháp lý</option>
                    <option>Hộ tịch</option>
                  </select>
                  <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Tất cả trạng thái</option>
                    <option>Hoạt động bình thường</option>
                    <option>Sắp hết hiệu lực</option>
                    <option>Đã hết hiệu lực</option>
                  </select>
                </div>

                {/* Warning Alert */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm text-orange-900 mb-1">
                        Cảnh báo dữ liệu sắp hết hiệu lực
                      </h4>
                      <p className="text-sm text-orange-700">
                        Có <strong>2 bản ghi</strong> sắp hết hiệu lực trong 30 ngày tới và{' '}
                        <strong>1 bản ghi</strong> đã hết hiệu lực cần xử lý.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lifecycle Status Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-slate-700">Hoạt động bình thường</div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-2xl text-slate-900 mb-1">1</div>
                    <div className="text-xs text-slate-600">Còn hơn 30 ngày</div>
                  </div>
                  <div className="bg-white border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-slate-700">Sắp hết hiệu lực</div>
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    </div>
                    <div className="text-2xl text-slate-900 mb-1">2</div>
                    <div className="text-xs text-slate-600">Còn dưới 30 ngày</div>
                  </div>
                  <div className="bg-white border border-red-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-slate-700">Đã hết hiệu lực</div>
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="text-2xl text-slate-900 mb-1">1</div>
                    <div className="text-xs text-slate-600">Cần xử lý ngay</div>
                  </div>
                </div>

                {/* Lifecycle Table */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-900">Chi tiết vòng đời dữ liệu</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleExportExcel}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Xuất Excel
                      </button>
                      <button
                        onClick={handleExportPDF}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Xuất PDF
                      </button>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            STT
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Mã dữ liệu
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Tên dữ liệu chủ
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Loại dữ liệu
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Ngày tạo
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Ngày hết hạn
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Số ngày còn lại
                          </th>
                          <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase">
                            Trạng thái
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {mockLifecycleData.map((data, index) => (
                          <tr key={data.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm text-slate-900">{index + 1}</td>
                            <td className="px-4 py-3 text-sm text-blue-600">
                              {data.recordCode}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-900">
                              {data.fullName}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {data.dataType}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {data.createdDate}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {data.expiryDate}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <span
                                className={
                                  data.daysRemaining < 0
                                    ? 'text-red-700'
                                    : data.daysRemaining < 30
                                    ? 'text-orange-700'
                                    : 'text-green-700'
                                }
                              >
                                {data.daysRemaining < 0
                                  ? `Quá hạn ${Math.abs(data.daysRemaining)} ngày`
                                  : `${data.daysRemaining} ngày`}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs ${
                                  data.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : data.status === 'warning'
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {data.status === 'active'
                                  ? 'Hoạt động'
                                  : data.status === 'warning'
                                  ? 'Sắp hết hạn'
                                  : 'Đã hết hạn'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedRecord && (
        <DataDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          data={selectedRecord}
          fields={[
            { label: 'Mã dữ liệu', key: 'recordCode' },
            { label: 'Họ và tên', key: 'fullName' },
            { label: 'Ngày sinh', key: 'birthDate' },
            { label: 'Số CCCD', key: 'cccdNumber' },
            { label: 'Nơi sinh', key: 'birthPlace' },
            { label: 'Loại dữ liệu', key: 'dataType' },
            { label: 'Trạng thái', key: 'status' },
            { label: 'Ngày cập nhật', key: 'updateDate' },
          ]}
          title="Chi tiết dữ liệu chủ"
          mode="merge"
        />
      )}
    </div>
  );
}