import { X, Calendar, Activity } from 'lucide-react';

interface ActionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ActionHistoryModal({ isOpen, onClose }: ActionHistoryModalProps) {
  if (!isOpen) return null;

  const actionHistory = [
    {
      id: 1,
      time: '25/12/2024 09:30:45',
      action: 'Tra cứu dữ liệu chủ',
      module: 'Báo cáo tìm kiếm dữ liệu chủ',
      detail: 'Tìm kiếm với từ khóa: Nguyễn Văn A',
      status: 'success'
    },
    {
      id: 2,
      time: '25/12/2024 09:20:15',
      action: 'Xuất báo cáo',
      module: 'Báo cáo sử dụng dữ liệu chủ',
      detail: 'Xuất file Excel báo cáo tháng 12/2024',
      status: 'success'
    },
    {
      id: 3,
      time: '24/12/2024 14:15:00',
      action: 'Cập nhật dữ liệu',
      module: 'CSDL A',
      detail: 'Cập nhật 5 bản ghi dữ liệu',
      status: 'success'
    },
    {
      id: 4,
      time: '24/12/2024 11:30:20',
      action: 'Xem chi tiết',
      module: 'Quản lý quy mô dữ liệu chủ',
      detail: 'Xem chi tiết danh mục DM001',
      status: 'success'
    },
    {
      id: 5,
      time: '23/12/2024 16:45:10',
      action: 'Phê duyệt dữ liệu',
      module: 'Cập nhật dữ liệu chủ',
      detail: 'Phê duyệt yêu cầu #YC12345',
      status: 'failed'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-slate-900">Lịch sử thao tác</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600" title="Đóng" aria-label="Đóng">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-3">
            {actionHistory.map((item) => (
              <div key={item.id} className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                <div className={`w-2 h-2 rounded-full mt-2 ${item.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{item.time}</span>
                    <span className={`px-2 py-0.5 text-xs rounded ${
                      item.status === 'success' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status === 'success' ? 'Thành công' : 'Thất bại'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-slate-900">{item.action}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">{item.module}</span>
                  </div>
                  <p className="text-sm text-slate-500 ml-6">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end gap-2 p-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
