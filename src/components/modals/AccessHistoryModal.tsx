import { X, Calendar, Monitor } from 'lucide-react';

interface AccessHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessHistoryModal({ isOpen, onClose }: AccessHistoryModalProps) {
  if (!isOpen) return null;

  const accessHistory = [
    {
      id: 1,
      time: '25/12/2024 09:15:30',
      ip: '192.168.1.100',
      device: 'Chrome - Windows 10',
      status: 'success'
    },
    {
      id: 2,
      time: '24/12/2024 14:22:15',
      ip: '192.168.1.100',
      device: 'Chrome - Windows 10',
      status: 'success'
    },
    {
      id: 3,
      time: '23/12/2024 08:45:00',
      ip: '192.168.1.100',
      device: 'Chrome - Windows 10',
      status: 'success'
    },
    {
      id: 4,
      time: '22/12/2024 16:30:20',
      ip: '192.168.1.105',
      device: 'Firefox - Windows 10',
      status: 'failed'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-slate-900">Lịch sử truy cập</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-3">
            {accessHistory.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                <div className={`w-2 h-2 rounded-full ${item.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-900">{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{item.device}</span>
                  </div>
                  <div className="text-slate-600">IP: {item.ip}</div>
                </div>
                <div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    item.status === 'success' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status === 'success' ? 'Thành công' : 'Thất bại'}
                  </span>
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
