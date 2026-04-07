import React from 'react';
import { Clock, Filter, Eye } from 'lucide-react';

interface VersionHistoryTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onViewDetail: (version: any) => void;
}

export function VersionHistoryTab({
  searchTerm,
  setSearchTerm,
  onViewDetail
}: VersionHistoryTabProps) {
  // Mock data for history (can be passed as props later if needed)
  const historyData = [
    { id: 3, version: '4.1', author: 'Nguyễn Văn A', category: 'Bộ dữ liệu chủ Công dân', date: '05/01/2026 09:30', content: 'Thêm trường "Địa chỉ email"', type: 'Cấu trúc', status: 'Success' },
    { id: 2, version: '4.0', author: 'Trần Thị B', category: 'Bộ dữ liệu chủ Tổ chức', date: '28/12/2025 14:15', content: 'Cập nhật 120 doanh nghiệp mới', type: 'Dữ liệu', status: 'Success' },
    { id: 1, version: '3.9', author: 'Lê Văn C', category: 'Bộ dữ liệu chủ Công dân', date: '15/12/2025 10:00', content: 'Khởi tạo cấu trúc ban đầu', type: 'Cấu trúc', status: 'Success' },
  ];

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
          <div>
             <h3 className="text-lg font-bold text-slate-900">Lịch sử thay đổi phiên bản</h3>
             <p className="text-sm text-slate-500">Xem lại các thay đổi cấu trúc và dữ liệu qua từng thời kỳ.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors">
             <Filter className="w-4 h-4" />
             Lọc lịch sử
          </button>
       </div>
       
       <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
             <thead className="bg-[#f8fafc] text-slate-600 font-bold border-b border-slate-100">
                <tr>
                   <th className="px-6 py-4">Phiên bản</th>
                   <th className="px-6 py-4">Người thực hiện</th>
                   <th className="px-6 py-4">Danh mục</th>
                   <th className="px-6 py-4">Thời gian</th>
                   <th className="px-6 py-4">Nội dung thay đổi</th>
                   <th className="px-6 py-4">Trạng thái</th>
                   <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-50 font-medium">
                {historyData.map(v => (
                   <tr key={v.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg font-bold text-[12px] border border-blue-100">
                          v{v.version}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-900">{v.author}</td>
                      <td className="px-6 py-4 text-slate-600">{v.category}</td>
                      <td className="px-6 py-4 text-slate-500 text-[13px]">{v.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-slate-800">{v.content}</span>
                          <span className={`text-[10px] font-bold uppercase ${v.type === 'Cấu trúc' ? 'text-purple-500' : 'text-blue-500'}`}>
                            Loại: {v.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[11px] font-bold border border-green-200">
                           {v.status === 'Success' ? 'Đang dùng' : 'Lưu trữ'}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button 
                           onClick={() => onViewDetail(v)}
                           className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                           title="Xem chi tiết"
                         >
                           <Eye className="w-4 h-4"/>
                         </button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
}
