import { useState } from 'react';
import { Share2, Globe, Eye, EyeOff, Download, RefreshCw, Clock, CheckCircle } from 'lucide-react';

interface PublishedData {
  id: string;
  code: string;
  name: string;
  category: string;
  publishStatus: 'published' | 'unpublished' | 'pending';
  visibility: 'public' | 'internal' | 'restricted';
  publishDate: string;
  lastSync: string;
  downloadCount: number;
  viewCount: number;
}

const mockPublishedData: PublishedData[] = [
  {
    id: '1',
    code: 'PUB001',
    name: 'Dữ liệu A',
    category: 'Danh mục A',
    publishStatus: 'published',
    visibility: 'public',
    publishDate: '01/12/2024',
    lastSync: '10/12/2024 14:30',
    downloadCount: 245,
    viewCount: 1523
  },
  {
    id: '2',
    code: 'PUB002',
    name: 'Dữ liệu B',
    category: 'Danh mục B',
    publishStatus: 'published',
    visibility: 'internal',
    publishDate: '05/12/2024',
    lastSync: '10/12/2024 10:15',
    downloadCount: 87,
    viewCount: 456
  },
  {
    id: '3',
    code: 'PUB003',
    name: 'Dữ liệu C',
    category: 'Danh mục C',
    publishStatus: 'pending',
    visibility: 'restricted',
    publishDate: '08/12/2024',
    lastSync: '09/12/2024 16:20',
    downloadCount: 12,
    viewCount: 89
  },
];

export function MasterDataPublishPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterVisibility, setFilterVisibility] = useState('all');
  const [selectedData, setSelectedData] = useState<PublishedData | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showUnpublishModal, setShowUnpublishModal] = useState(false);

  const filteredData = mockPublishedData.filter(data => {
    const matchesStatus = filterStatus === 'all' || data.publishStatus === filterStatus;
    const matchesVisibility = filterVisibility === 'all' || data.visibility === filterVisibility;
    return matchesStatus && matchesVisibility;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      published: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: CheckCircle },
      unpublished: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', icon: EyeOff },
      pending: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', icon: Clock }
    };
    const labels = {
      published: 'Đã công khai',
      unpublished: 'Chưa công khai',
      pending: 'Chờ xử lý'
    };
    const style = styles[status as keyof typeof styles];
    const Icon = style.icon;
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${style.bg} ${style.text} ${style.border} flex items-center gap-1 inline-flex`}>
        <Icon className="w-3 h-3" />
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getVisibilityBadge = (visibility: string) => {
    const styles = {
      public: 'bg-blue-100 text-blue-700 border-blue-200',
      internal: 'bg-purple-100 text-purple-700 border-purple-200',
      restricted: 'bg-orange-100 text-orange-700 border-orange-200'
    };
    const labels = {
      public: 'Công khai',
      internal: 'Nội bộ',
      restricted: 'Hạn chế'
    };
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${styles[visibility as keyof typeof styles]}`}>
        {labels[visibility as keyof typeof labels]}
      </span>
    );
  };

  const stats = {
    total: mockPublishedData.length,
    published: mockPublishedData.filter(d => d.publishStatus === 'published').length,
    totalViews: mockPublishedData.reduce((sum, d) => sum + d.viewCount, 0),
    totalDownloads: mockPublishedData.reduce((sum, d) => sum + d.downloadCount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Công khai dữ liệu chủ</h1>
        <p className="text-sm text-slate-600 mt-1">Quản lý việc công khai và chia sẻ dữ liệu chủ</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <Share2 className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="text-xs text-slate-600">Tổng dữ liệu</div>
              <div className="text-slate-900 mt-1">{stats.total}</div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-green-600" />
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
              <div className="text-xs text-slate-600">Lượt xem</div>
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
              <div className="text-xs text-slate-600">Lượt tải</div>
              <div className="text-slate-900 mt-1">{stats.totalDownloads.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="published">Đã công khai</option>
            <option value="unpublished">Chưa công khai</option>
            <option value="pending">Chờ xử lý</option>
          </select>
          <select
            value={filterVisibility}
            onChange={(e) => setFilterVisibility(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">Tất cả phạm vi</option>
            <option value="public">Công khai</option>
            <option value="internal">Nội bộ</option>
            <option value="restricted">Hạn chế</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">STT</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Mã dữ liệu</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Tên dữ liệu</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Danh mục</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Phạm vi</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Trạng thái</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Lượt xem</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Lượt tải</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((data, index) => (
                <tr key={data.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-700">{index + 1}</td>
                  <td className="px-4 py-3 text-sm">
                    <code className="px-2 py-0.5 bg-slate-100 text-teal-700 rounded text-xs">
                      {data.code}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-900">{data.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{data.category}</td>
                  <td className="px-4 py-3 text-sm">{getVisibilityBadge(data.visibility)}</td>
                  <td className="px-4 py-3 text-sm">{getStatusBadge(data.publishStatus)}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{data.viewCount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{data.downloadCount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {data.publishStatus === 'published' ? (
                        <>
                          <button
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            title="Xem"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 text-amber-600 hover:bg-amber-50 rounded"
                            title="Đồng bộ"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="Gỡ công khai"
                            onClick={() => {
                              setSelectedData(data);
                              setShowUnpublishModal(true);
                            }}
                          >
                            <EyeOff className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                          title="Công khai"
                          onClick={() => {
                            setSelectedData(data);
                            setShowPublishModal(true);
                          }}
                        >
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

      {/* Publish Modal */}
      {showPublishModal && selectedData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-slate-900">Công khai dữ liệu</h2>
              <button onClick={() => setShowPublishModal(false)} className="text-slate-400 hover:text-slate-600">
                <Globe className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-900">
                  Bạn có chắc chắn muốn công khai dữ liệu <strong>{selectedData.name}</strong>?
                </p>
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Phạm vi công khai</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option value="public">Công khai (Mọi người có thể truy cập)</option>
                  <option value="internal">Nội bộ (Chỉ nhân viên nội bộ)</option>
                  <option value="restricted">Hạn chế (Cần phê duyệt)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Ghi chú</label>
                <textarea
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows={3}
                  placeholder="Nhập ghi chú (tùy chọn)"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Công khai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unpublish Modal */}
      {showUnpublishModal && selectedData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-slate-900">Gỡ công khai dữ liệu</h2>
              <button onClick={() => setShowUnpublishModal(false)} className="text-slate-400 hover:text-slate-600">
                <EyeOff className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-900">
                  Bạn có chắc chắn muốn gỡ công khai dữ liệu <strong>{selectedData.name}</strong>?
                </p>
                <p className="text-sm text-red-700 mt-2">
                  Dữ liệu sẽ không còn được truy cập công khai sau khi gỡ.
                </p>
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Lý do gỡ công khai <span className="text-red-500">*</span></label>
                <textarea
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows={3}
                  placeholder="Nhập lý do gỡ công khai"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
              <button
                onClick={() => setShowUnpublishModal(false)}
                className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={() => setShowUnpublishModal(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
              >
                <EyeOff className="w-4 h-4" />
                Gỡ công khai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
