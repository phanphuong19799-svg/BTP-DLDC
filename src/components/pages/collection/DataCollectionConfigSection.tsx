// Component tái sử dụng cho phần "Cấu hình thu thập dữ liệu"
export function DataCollectionConfigSection() {
  return (
    <div>
      <h3 className="text-sm text-slate-700 mb-3">Cấu hình thu thập dữ liệu</h3>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Phương thức đồng bộ <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Chọn phương thức</option>
              <option value="realtime">Real-time (Thời gian thực)</option>
              <option value="batch">Batch (Theo lô)</option>
              <option value="scheduled">Scheduled (Theo lịch)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Tần suất thu thập
            </label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Chọn tần suất</option>
              <option value="manual">Theo yêu cầu (Thủ công)</option>
              <option value="hourly">Mỗi giờ</option>
              <option value="daily">Hàng ngày</option>
              <option value="weekly">Hàng tuần</option>
              <option value="monthly">Hàng tháng</option>
            </select>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-700">
            <strong>Lưu ý:</strong> Lịch thu thập sẽ tự động chạy theo cấu hình. Hệ thống sẽ gửi thông báo khi có lỗi xảy ra trong quá trình thu thập.
          </p>
        </div>
      </div>
    </div>
  );
}
