interface ContactInfoSectionProps {
  isEdit?: boolean;
  defaultValues?: any;
}

export function ContactInfoSection({ isEdit = false, defaultValues }: ContactInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-600 mb-2">
        Thông tin đơn vị cung cấp dữ liệu
      </div>
      
      <div>
        <label className="block text-sm text-slate-600 mb-1">
          Tên đơn vị
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="VD: Cục Hộ tịch, quốc tịch, chứng thực"
          defaultValue={defaultValues?.unitName}
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          Địa chỉ
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập địa chỉ đơn vị"
          defaultValue={defaultValues?.address}
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          Số điện thoại
        </label>
        <input
          type="tel"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="VD: 024 3733 9999"
          defaultValue={defaultValues?.phone}
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          Địa chỉ email
        </label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="example@moj.gov.vn"
          defaultValue={defaultValues?.email}
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          Người đầu mối ký thuật
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nguyễn Văn A SĐT: 0987654321"
          defaultValue={defaultValues?.technicalContact}
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          Ghi chú
        </label>
        <textarea
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Thông tin bổ sung về đơn vị"
          defaultValue={defaultValues?.note}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-700">
          <strong>Lưu ý:</strong> Email này sẽ nhận thông báo khi kết nối API thành công hoặc có vấn đề phát sinh.
        </p>
      </div>
    </div>
  );
}
