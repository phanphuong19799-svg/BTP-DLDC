import { Sparkles, TrendingUp, Activity } from 'lucide-react';
import { StatsCard } from '../common/StatsCard';

export function DataCleaningManagementPage() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          icon={Sparkles}
          iconColor="blue"
          title="Trong ngành"
          value="45 tác vụ"
        />
        <StatsCard
          icon={Activity}
          iconColor="green"
          title="Ngoài ngành"
          value="23 tác vụ"
        />
        <StatsCard
          icon={TrendingUp}
          iconColor="purple"
          title="Tổng bản ghi đã làm sạch"
          value="2.8M"
        />
      </div>

      {/* Cleaning Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
            <h3 className="text-gray-900">Quản lý làm sạch dữ liệu trong ngành</h3>
            <p className="text-gray-500 text-sm mt-1">Làm sạch dữ liệu từ các đơn vị trong nội bộ</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-gray-900 mb-2">CSDL Hộ tịch điện tử</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tiến độ</span>
                    <span className="text-gray-900">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-3">
                    <span className="text-gray-600">Bản ghi đã xử lý</span>
                    <span className="text-gray-900">425,678 / 500,234</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-gray-900 mb-2">CSDL Thi hành án dân sự</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tiến độ</span>
                    <span className="text-gray-900">62%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-3">
                    <span className="text-gray-600">Bản ghi đã xử lý</span>
                    <span className="text-gray-900">276,543 / 446,002</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                Xem tất cả tác vụ trong ngành
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-green-50">
            <h3 className="text-gray-900">Quản lý làm sạch dữ liệu ngoài ngành</h3>
            <p className="text-gray-500 text-sm mt-1">Làm sạch dữ liệu nhận từ các bộ, ngành khác</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-gray-900 mb-2">Dữ liệu từ Bộ Công an</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tiến độ</span>
                    <span className="text-gray-900">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-3">
                    <span className="text-gray-600">Bản ghi đã xử lý</span>
                    <span className="text-gray-900">855,300 / 900,316</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-gray-900 mb-2">Dữ liệu từ Bộ Y tế</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tiến độ</span>
                    <span className="text-gray-900">48%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '48%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-3">
                    <span className="text-gray-600">Bản ghi đã xử lý</span>
                    <span className="text-gray-900">192,456 / 400,950</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                Xem tất cả tác vụ ngoài ngành
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}