import { useState, ChangeEvent } from 'react';
import { Globe, Share2, Eye, Download, RefreshCw, CheckCircle } from 'lucide-react';

const mockPublished = [
  { id: '1', code: 'CAT001', name: 'Danh mục A', publishDate: '01/11/2024', viewCount: 3456, downloadCount: 892, status: 'published' },
  { id: '2', code: 'CAT002', name: 'Danh mục B', publishDate: '15/11/2024', viewCount: 2134, downloadCount: 567, status: 'published' },
  { id: '3', code: 'CAT003', name: 'Danh mục C', publishDate: '01/12/2024', viewCount: 892, downloadCount: 234, status: 'draft' },
];

export function CategoryPublishPage() {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredData = filterStatus === 'all' ? mockPublished : mockPublished.filter(d => d.status === filterStatus);

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-700 border-green-200',
      draft: 'bg-slate-100 text-slate-600 border-slate-200'
    };
    const labels = { published: 'Đã công khai', draft: 'Bản nháp' };
    return <span className={`px-2 py-1 text-xs border rounded-full ${styles[status as keyof typeof styles]}`}>{labels[status as keyof typeof labels]}</span>;
  };

  const stats = {
    total: mockPublished.length,
    published: mockPublished.filter(d => d.status === 'published').length,
    totalViews: mockPublished.reduce((sum, d) => sum + d.viewCount, 0),
    totalDownloads: mockPublished.reduce((sum, d) => sum + d.downloadCount, 0)
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-slate-900">Công khai danh mục</h1>
        <p className="text-sm text-slate-600 mt-1">Quản lý công khai và chia sẻ các danh mục dữ liệu</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <div className="text-xs text-slate-600">Tổng danh mục</div>
              <div className="text-slate-900 mt-1">{stats.total}</div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-xs text-slate-600">Đã công khai</div>
              <div className="text-slate-900 mt-1">{stats.published}</div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-slate-600">Tổng lượt xem</div>
              <div className="text-slate-900 mt-1">{stats.totalViews.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-xs text-slate-600">Tổng lượt tải</div>
              <div className="text-slate-900 mt-1">{stats.totalDownloads.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <select
          title="Trạng thái"
          value={filterStatus}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="published">Đã công khai</option>
          <option value="draft">Bản nháp</option>
        </select>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">STT</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Mã danh mục</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Tên danh mục</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Ngày công khai</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Lượt xem</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Lượt tải</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Trạng thái</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-700">{index + 1}</td>
                  <td className="px-4 py-3 text-sm">
                    <code className="px-2 py-0.5 bg-slate-100 text-indigo-700 rounded text-xs">{item.code}</code>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-900">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{item.publishDate}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{item.viewCount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{item.downloadCount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{getStatusBadge(item.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Xem">
                        <Eye className="w-4 h-4" />
                      </button>
                      {item.status === 'published' ? (
                        <button className="p-1.5 text-amber-600 hover:bg-amber-50 rounded" title="Cập nhật">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Công khai">
                          <Share2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
