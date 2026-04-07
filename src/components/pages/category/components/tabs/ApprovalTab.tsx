import React from 'react';
import { ApprovalRequest, ApprovalType, ApprovalStatus } from '../../categoryTypes';

interface ApprovalTabProps {
  approvalTab: ApprovalType;
  setApprovalTab: (tab: ApprovalType) => void;
  requests: ApprovalRequest[];
  statusFilter: ApprovalStatus | 'all';
  setStatusFilter: (status: ApprovalStatus | 'all') => void;
  onViewDetail: (req: ApprovalRequest) => void;
  onApproveAll: (type: ApprovalType | 'all') => void;
  approvalTypeLabels: Record<ApprovalType, string>;
  approvalStatusLabels: Record<ApprovalStatus, { label: string; color: string }>;
}

export function ApprovalTab({
  approvalTab,
  setApprovalTab,
  requests,
  statusFilter,
  setStatusFilter,
  onViewDetail,
  onApproveAll,
  approvalTypeLabels,
  approvalStatusLabels
}: ApprovalTabProps) {
  const filteredRequests = requests.filter(req => {
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    return matchesStatus;
  });

  return (
    <div className="space-y-6">
       {/* Statistics Cards */}
       <div className="grid grid-cols-4 gap-4">
          <div 
            onClick={() => setStatusFilter('all')}
            className={`bg-white border p-4 rounded-xl shadow-sm cursor-pointer transition-all ${statusFilter === 'all' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-300'}`}
          >
             <div className="text-sm font-medium text-slate-500">Tất cả</div>
             <div className="text-2xl font-bold text-slate-800 mt-1">{requests.length}</div>
          </div>
          <div 
            onClick={() => setStatusFilter('pending')}
            className={`bg-white border p-4 rounded-xl shadow-sm cursor-pointer transition-all border-l-4 border-l-orange-400 ${statusFilter === 'pending' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-300'}`}
          >
             <div className="text-sm font-medium text-slate-500">Chờ phê duyệt</div>
             <div className="text-2xl font-bold text-orange-600 mt-1">
               {requests.filter(r => r.status === 'pending').length}
             </div>
          </div>
          <div 
            onClick={() => setStatusFilter('approved')}
            className={`bg-white border p-4 rounded-xl shadow-sm cursor-pointer transition-all border-l-4 border-l-green-400 ${statusFilter === 'approved' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-300'}`}
          >
             <div className="text-sm font-medium text-slate-500">Đã phê duyệt</div>
             <div className="text-2xl font-bold text-green-600 mt-1">
               {requests.filter(r => r.status === 'approved').length}
             </div>
          </div>
          <div 
            onClick={() => setStatusFilter('rejected')}
            className={`bg-white border p-4 rounded-xl shadow-sm cursor-pointer transition-all border-l-4 border-l-red-400 ${statusFilter === 'rejected' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-300'}`}
          >
             <div className="text-sm font-medium text-slate-500">Đã từ chối</div>
             <div className="text-2xl font-bold text-red-600 mt-1">
               {requests.filter(r => r.status === 'rejected').length}
             </div>
          </div>
       </div>

       {/* Unified Results Table */}
       <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-[#f8fafc] border-b border-slate-200 p-4 flex items-center justify-between">
               <h3 className="font-bold text-slate-800 text-base">Danh sách yêu cầu chờ duyệt</h3>
               {filteredRequests.filter(r => r.status === 'pending').length > 0 && (
                 <button
                   onClick={() => onApproveAll('all')}
                   className="px-4 py-2 bg-[#2563eb] text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                 >
                   Duyệt tất cả ({filteredRequests.filter(r => r.status === 'pending').length})
                 </button>
               )}
            </div>
            
            {filteredRequests.length > 0 ? (
              <table className="w-full text-sm text-left">
                 <thead className="bg-[#f8fafc] text-slate-600 font-bold border-b border-slate-100">
                    <tr>
                       <th className="px-6 py-4">Mã yêu cầu</th>
                       <th className="px-6 py-4">Loại phê duyệt</th>
                       <th className="px-6 py-4 w-[35%]">Thực thể</th>
                       <th className="px-6 py-4">Người yêu cầu</th>
                       <th className="px-6 py-4">Ngày yêu cầu</th>
                       <th className="px-6 py-4">Trạng thái</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {filteredRequests.map(req => (
                       <tr key={req.id} className="hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => onViewDetail(req)}>
                          <td className="px-6 py-4 font-mono font-bold text-blue-600">REQ-{req.id.padStart(3, '0')}</td>
                          <td className="px-6 py-4 font-medium text-slate-700">{approvalTypeLabels[req.type]}</td>
                          <td className="px-6 py-4">
                             <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{req.entityName}</div>
                             <div className="text-[11px] text-slate-400">{req.entityCode}</div>
                          </td>
                          <td className="px-6 py-4 text-slate-600">{req.requestedBy}</td>
                          <td className="px-6 py-4 text-slate-600">{req.requestedDate}</td>
                          <td className="px-6 py-4">
                             <span className={`px-2 py-1 rounded-full text-[11px] font-bold ${approvalStatusLabels[req.status].color}`}>
                                {approvalStatusLabels[req.status].label}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
            ) : (
              <div className="px-6 py-10 text-center text-slate-500 italic bg-white">
                Không có yêu cầu phê duyệt nào phù hợp.
              </div>
            )}
          </div>
       </div>
    </div>
  );
}
