import { useState, ChangeEvent } from 'react';
import { Search, Filter, Download, FileText } from 'lucide-react';

// Mock data for demonstration
const mockDatasets = [
  {
    id: 'DS001',
    name: 'Danh sách văn bản quy phạm pháp luật 2024',
    category: 'Văn bản pháp luật',
    agency: 'Bộ Tư pháp',
    format: 'JSON',
    license: 'CC BY 4.0',
    approval: 'approved',
    publicStatus: 'published',
    validity: 'valid',
    exploitationStatus: 'active',
    currentVersion: 'v2.1',
    publishedDate: '2024-01-15',
    views: 1250,
    downloads: 340,
  },
  {
    id: 'DS002',
    name: 'Dữ liệu đăng ký kinh doanh Q1/2024',
    category: 'Đăng ký kinh doanh',
    agency: 'Cục Đăng ký kinh doanh',
    format: 'Excel',
    license: 'ODC-BY',
    approval: 'pending',
    publicStatus: 'unpublished',
    validity: 'valid',
    exploitationStatus: 'paused',
    currentVersion: 'v1.5',
    publishedDate: '2024-02-10',
    views: 890,
    downloads: 220,
  },
  {
    id: 'DS003',
    name: 'Thống kê công chứng viên 2024',
    category: 'Công chứng',
    agency: 'Cục Công chứng',
    format: 'CSV',
    license: 'CC BY 4.0',
    approval: 'approved',
    publicStatus: 'published',
    validity: 'expired',
    exploitationStatus: 'stopped',
    currentVersion: 'v1.0',
    publishedDate: '2024-03-05',
    views: 670,
    downloads: 180,
  },
  {
    id: 'DS004',
    name: 'Danh sách trung tâm TGPL',
    category: 'Trợ giúp pháp lý',
    agency: 'Cục TGPL',
    format: 'JSON',
    license: 'ODbL',
    approval: 'pending',
    publicStatus: 'unpublished',
    validity: 'valid',
    exploitationStatus: 'active',
    currentVersion: 'v3.0',
    publishedDate: '2024-01-20',
    views: 550,
    downloads: 140,
  },
];

export function CategoryReportPage() {
  // Search & Filter States
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [validityFilter, setValidityFilter] = useState('all');
  const [publicStatusFilter, setPublicStatusFilter] = useState('all');
  const [approvalFilter, setApprovalFilter] = useState('all');

  const filteredDatasets = mockDatasets.filter(dataset => {
    if (searchKeyword && !dataset.name.toLowerCase().includes(searchKeyword.toLowerCase())) return false;
    if (filterCategory !== 'all' && dataset.category !== filterCategory) return false;
    if (validityFilter !== 'all' && dataset.validity !== validityFilter) return false;
    if (publicStatusFilter !== 'all' && dataset.publicStatus !== publicStatusFilter) return false;
    if (approvalFilter !== 'all' && dataset.approval !== approvalFilter) return false;
    return true;
  });

  const handleExportExcel = () => {
    alert('Xuất dữ liệu ra Excel');
  };

  const handleExportPDF = () => {
    alert('Xuất dữ liệu ra PDF');
  };

  return (
    <div className="space-y-6">
      {/* Main Container */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="space-y-6">
            {/* Filter Panel */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-emerald-600" />
                Bộ lọc tìm kiếm
              </h3>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Từ khóa</label>
                  <input
                    type="text"
                    title="Từ khóa"
                    placeholder="Nhập từ khóa..."
                    value={searchKeyword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Chủ đề</label>
                  <select
                    title="Chủ đề"
                    value={filterCategory}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">Tất cả</option>
                    <option value="Văn bản pháp luật">Văn bản pháp luật</option>
                    <option value="Đăng ký kinh doanh">Đăng ký kinh doanh</option>
                    <option value="Công chứng">Công chứng</option>
                    <option value="Trợ giúp pháp lý">Trợ giúp pháp lý</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Hiệu lực</label>
                  <select
                    title="Hiệu lực"
                    value={validityFilter}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setValidityFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">Tất cả</option>
                    <option value="valid">Hiệu lực</option>
                    <option value="expired">Hết hiệu lực</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Trạng thái công bố</label>
                  <select
                    title="Trạng thái công bố"
                    value={publicStatusFilter}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setPublicStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">Tất cả</option>
                    <option value="published">Đã công bố</option>
                    <option value="unpublished">Chưa công bố</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Trạng thái phê duyệt</label>
                  <select
                    title="Trạng thái phê duyệt"
                    value={approvalFilter}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setApprovalFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">Tất cả</option>
                    <option value="approved">Đã phê duyệt</option>
                    <option value="pending">Đang chờ</option>
                  </select>
                </div>

                <div className="flex items-end gap-2">
                  <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center justify-center gap-2">
                    <Search className="w-4 h-4" />
                    Tìm kiếm
                  </button>
                  <button 
                    onClick={() => {
                      setSearchKeyword('');
                      setFilterCategory('all');
                      setValidityFilter('all');
                      setPublicStatusFilter('all');
                      setApprovalFilter('all');
                    }}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                  >
                    Đặt lại
                  </button>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Tìm thấy <span className="text-emerald-600 font-semibold">{filteredDatasets.length}</span> kết quả
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleExportExcel}
                    className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Xuất Excel
                  </button>
                  <button 
                    onClick={handleExportPDF}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    Xuất PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs text-slate-600">Mã Dataset</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600">Tên Dataset</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600">Chủ đề</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600">Phiên bản</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600">Hiệu lực</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600">Tình trạng khai thác</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600">Trạng thái công bố</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600">Trạng thái phê duyệt</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600">Ngày công bố</th>
                      <th className="px-4 py-3 text-right text-xs text-slate-600">Lượt xem</th>
                      <th className="px-4 py-3 text-right text-xs text-slate-600">Lượt tải</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredDatasets.map((dataset) => (
                      <tr key={dataset.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm text-slate-900">{dataset.id}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{dataset.name}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
                            {dataset.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-50 text-purple-700">
                            {dataset.currentVersion}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            dataset.validity === 'valid' 
                              ? 'bg-green-50 text-green-700' 
                              : 'bg-red-50 text-red-700'
                          }`}>
                            {dataset.validity === 'valid' ? 'Hiệu lực' : 'Hết hiệu lực'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            dataset.exploitationStatus === 'active' 
                              ? 'bg-emerald-50 text-emerald-700' 
                              : dataset.exploitationStatus === 'paused'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-red-50 text-red-700'
                          }`}>
                            {dataset.exploitationStatus === 'active' ? 'Đang khai thác' : 
                             dataset.exploitationStatus === 'paused' ? 'Tạm dừng' : 'Ngừng khai thác'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            dataset.publicStatus === 'published' 
                              ? 'bg-cyan-50 text-cyan-700' 
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {dataset.publicStatus === 'published' ? 'Đã công bố' : 'Chưa công bố'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            dataset.approval === 'approved' 
                              ? 'bg-indigo-50 text-indigo-700' 
                              : 'bg-orange-50 text-orange-700'
                          }`}>
                            {dataset.approval === 'approved' ? 'Đã phê duyệt' : 'Đang chờ'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">{dataset.publishedDate}</td>
                        <td className="px-4 py-3 text-sm text-slate-900 text-right">{dataset.views.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-slate-900 text-right">{dataset.downloads.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}