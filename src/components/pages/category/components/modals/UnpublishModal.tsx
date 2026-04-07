import React, { ChangeEvent } from 'react';
import { XCircle, X } from 'lucide-react';
import { MasterDataEntity } from '../../categoryTypes';

interface UnpublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  entity: MasterDataEntity | null;
  note: string;
  setNote: (note: string) => void;
  onConfirm: () => void;
}

export function UnpublishModal({
  isOpen,
  onClose,
  entity,
  note,
  setNote,
  onConfirm
}: UnpublishModalProps) {
  if (!isOpen || !entity) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[300] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Hủy công khai danh mục</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
            <p className="text-sm text-red-600 mb-2 font-medium">Bạn sắp hủy công khai danh mục sau:</p>
            <div className="text-lg font-bold text-slate-800">{entity.name}</div>
            <div className="text-[13px] text-slate-500 font-mono mt-1">{entity.code}</div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Lý do hủy công khai <span className="text-red-500">*</span></label>
            <textarea
              rows={3}
              value={note}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
              placeholder="Vui lòng nhập lý do hủy công khai..."
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 text-sm"
            />
          </div>
          <button
            onClick={onConfirm}
            className="w-full py-3 bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-100"
          >
            <XCircle className="w-5 h-5" />
            Xác nhận hủy công khai
          </button>
        </div>
      </div>
    </div>
  );
}
