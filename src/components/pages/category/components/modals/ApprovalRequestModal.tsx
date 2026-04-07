import React, { ChangeEvent } from 'react';
import { Send } from 'lucide-react';

interface ApprovalRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    id: string;
    code: string;
    name: string;
    type: 'attribute' | 'category';
  } | null;
  approvers: { id: string; name: string; position: string; department: string }[];
  form: { reviewer: string; note: string };
  setForm: (form: { reviewer: string; note: string }) => void;
  onSubmit: () => void;
}

export function ApprovalRequestModal({
  isOpen,
  onClose,
  data,
  approvers,
  form,
  setForm,
  onSubmit
}: ApprovalRequestModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
               <Send className="w-8 h-8"/>
            </div>
            <h3 className="text-[20px] font-bold text-slate-800 mb-2">Gửi yêu cầu phê duyệt</h3>
            <p className="text-slate-500 text-[14px] text-center mb-8">Bạn đang thực hiện trình duyệt nội dung cấu hình này.</p>
            
            <div className="w-full bg-slate-50 rounded-xl p-5 mb-6 space-y-4">
               <div className="grid grid-cols-2 gap-y-3 text-[14px]">
                  <span className="text-slate-500">Mã dữ liệu chủ</span>
                  <span className="font-bold text-slate-800 text-right">{data?.code || 'MD-AGENCY-001'}</span>
                  <span className="text-slate-500">Loại yêu cầu</span>
                  <span className="text-right">
                     <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[12px] font-medium">
                        {data?.type === 'category' ? 'Phê duyệt danh mục' : 'Phê duyệt cấu trúc'}
                     </span>
                  </span>
                  <span className="text-slate-500">Tên dữ liệu chủ</span>
                  <span className="font-medium text-slate-800 text-right">{data?.name}</span>
                  <span className="text-slate-500">Trạng thái</span>
                  <span className="text-right">
                     <span className="px-2 py-0.5 bg-yellow-50 text-yellow-600 rounded text-[12px] font-medium">Đang soạn thảo</span>
                  </span>
               </div>
            </div>

            <div className="w-full space-y-4">
               <div>
                  <label className="block text-[14px] font-semibold text-slate-700 mb-1.5">Người phê duyệt <span className="text-red-500">*</span></label>
                  <select 
                    title="Người phê duyệt"
                    value={form.reviewer}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setForm({...form, reviewer: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-[14px] focus:ring-2 focus:ring-blue-500"
                  >
                     <option value="">-- Chọn người phê duyệt --</option>
                     {approvers.map(a => <option key={a.id} value={a.id}>{a.name} - {a.position}</option>)}
                  </select>
               </div>
               <div>
                  <label className="block text-[14px] font-semibold text-slate-700 mb-1.5">Ghi chú</label>
                  <textarea 
                    rows={3}
                    value={form.note}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setForm({...form, note: e.target.value})}
                    placeholder="Nhập ghi chú (nếu có)"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-[14px] focus:ring-2 focus:ring-blue-500"
                  />
               </div>
            </div>
        </div>
        <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex gap-3">
           <button 
             onClick={onSubmit}
             className="flex-1 py-3 bg-[#2563eb] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
           >
              <Send className="w-4 h-4"/>
              Gửi yêu cầu phê duyệt
           </button>
           <button onClick={onClose} className="px-8 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors">Hủy</button>
        </div>
      </div>
    </div>
  );
}
