import { Share2, TrendingUp, Users, Building2, CheckCircle, Clock } from 'lucide-react';
import { StatsCard } from '../common/StatsCard';

const sharingStats = [
  { id: 1, title: 'Chia sẻ trong ngành', count: 45, icon: Users, color: 'bg-blue-500' },
  { id: 2, title: 'Chia sẻ ngoài ngành', count: 23, icon: Building2, color: 'bg-green-500' },
  { id: 3, title: 'Tổng lượt truy cập', count: 12456, icon: TrendingUp, color: 'bg-purple-500' },
  { id: 4, title: 'API đang hoạt động', count: 18, icon: CheckCircle, color: 'bg-teal-500' },
];

const sharingRequests = [
  { id: 1, from: 'Bộ Công an', type: 'internal', data: 'CSDL Hộ tịch', status: 'approved', date: '05/12/2025' },
  { id: 2, from: 'Bộ Y tế', type: 'external', data: 'CSDL Quốc tịch', status: 'pending', date: '04/12/2025' },
  { id: 3, from: 'Bộ Tài chính', type: 'external', data: 'CSDL Doanh nghiệp', status: 'approved', date: '03/12/2025' },
  { id: 4, from: 'Cục Thi hành án TP.HCM', type: 'internal', data: 'CSDL Thi hành án', status: 'reviewing', date: '02/12/2025' },
];

export function DataSharingPage() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          icon={Users}
          iconColor="blue"
          title="Chia sẻ trong ngành"
          value="45"
        />
        <StatsCard
          icon={Building2}
          iconColor="green"
          title="Chia sẻ ngoài ngành"
          value="23"
        />
        <StatsCard
          icon={TrendingUp}
          iconColor="purple"
          title="Tổng lượt truy cập"
          value="12,456"
        />
        <StatsCard
          icon={CheckCircle}
          iconColor="teal"
          title="API đang hoạt động"
          value="18"
        />
      </div>

      {/* Sharing Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Internal Sharing */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
            <h3 className="text-gray-900">Chia sẻ trong ngành</h3>
            <p className="text-gray-500 text-sm mt-1">Các đơn vị trong nội bộ</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {sharingRequests.filter(r => r.type === 'internal').map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-gray-900">{request.from}</h4>
                      <p className="text-gray-500 text-sm mt-1">{request.data}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      request.status === 'approved' ? 'bg-green-100 text-green-700' :
                      request.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {request.status === 'approved' ? 'Đã duyệt' :
                       request.status === 'pending' ? 'Chờ duyệt' : 'Đang xem xét'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{request.date}</p>
                </div>
              ))}
              <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                Xem tất cả
              </button>
            </div>
          </div>
        </div>

        {/* External Sharing */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-green-50">
            <h3 className="text-gray-900">Chia sẻ ngoài ngành</h3>
            <p className="text-gray-500 text-sm mt-1">Các bộ, ngành khác</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {sharingRequests.filter(r => r.type === 'external').map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-gray-900">{request.from}</h4>
                      <p className="text-gray-500 text-sm mt-1">{request.data}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      request.status === 'approved' ? 'bg-green-100 text-green-700' :
                      request.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {request.status === 'approved' ? 'Đã duyệt' :
                       request.status === 'pending' ? 'Chờ duyệt' : 'Đang xem xét'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{request.date}</p>
                </div>
              ))}
              <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                Xem tất cả
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* API Management */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">Quản lý API chia sẻ dữ liệu</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-700 text-sm">Tên API</th>
                  <th className="px-4 py-3 text-left text-gray-700 text-sm">Endpoint</th>
                  <th className="px-4 py-3 text-left text-gray-700 text-sm">Đối tác</th>
                  <th className="px-4 py-3 text-left text-gray-700 text-sm">Lượt gọi/ngày</th>
                  <th className="px-4 py-3 text-left text-gray-700 text-sm">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-gray-900">API Tra cứu hộ tịch</td>
                  <td className="px-4 py-4 text-gray-600 text-sm">/api/v1/civil-registry</td>
                  <td className="px-4 py-4 text-gray-600">Bộ Công an</td>
                  <td className="px-4 py-4 text-gray-600">2,345</td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Hoạt động</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-gray-900">API Tra cứu quốc tịch</td>
                  <td className="px-4 py-4 text-gray-600 text-sm">/api/v1/nationality</td>
                  <td className="px-4 py-4 text-gray-600">Bộ Y tế</td>
                  <td className="px-4 py-4 text-gray-600">1,234</td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Hoạt động</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-gray-900">API Doanh nghiệp</td>
                  <td className="px-4 py-4 text-gray-600 text-sm">/api/v1/business</td>
                  <td className="px-4 py-4 text-gray-600">Bộ Tài chính</td>
                  <td className="px-4 py-4 text-gray-600">3,456</td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Hoạt động</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}