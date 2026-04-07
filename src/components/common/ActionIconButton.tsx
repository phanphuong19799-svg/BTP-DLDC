import React from 'react';
import { 
  Eye, 
  SquarePen, 
  Trash2, 
  Settings, 
  Check, 
  Ban, 
  Send,
  Plus,
  LucideIcon 
} from 'lucide-react';

export type ActionType = 'view' | 'edit' | 'delete' | 'setup' | 'approve' | 'reject' | 'submit' | 'add';

interface ActionIconButtonProps {
  action: ActionType;
  onClick?: (e: any) => void;
  title?: string;
  className?: string;
  iconSize?: number;
  disabled?: boolean;
}

const actionConfig: Record<ActionType, { icon: LucideIcon; colorClass: string; hoverClass: string; defaultTitle: string; iconClass?: string }> = {
  view: { icon: Eye, colorClass: 'text-blue-500', hoverClass: 'hover:bg-blue-50', defaultTitle: 'Xem chi tiết' },
  add: { icon: Plus, colorClass: 'text-blue-500', hoverClass: 'hover:bg-blue-50', defaultTitle: 'Thêm mới' },
  edit: { icon: SquarePen, colorClass: 'text-orange-500', hoverClass: 'hover:bg-orange-50', defaultTitle: 'Chỉnh sửa' },
  delete: { icon: Trash2, colorClass: 'text-red-500', hoverClass: 'hover:bg-red-50', defaultTitle: 'Xóa' },
  setup: { icon: Settings, colorClass: 'text-slate-700', hoverClass: 'hover:bg-slate-100', defaultTitle: 'Thiết lập' },
  approve: { icon: Check, colorClass: 'text-blue-500', hoverClass: 'hover:bg-blue-50', defaultTitle: 'Phê duyệt' },
  reject: { icon: Ban, colorClass: 'text-red-600', hoverClass: 'hover:bg-red-50', defaultTitle: 'Từ chối' },
  submit: { icon: Send, colorClass: 'text-blue-500', hoverClass: 'hover:bg-blue-50', defaultTitle: 'Trình duyệt', iconClass: 'rotate-[-20deg]' },
};

export function ActionIconButton(props: ActionIconButtonProps) {
  const { action, onClick, title, className = '', iconSize = 4, disabled = false } = props;
  const config = actionConfig[action];
  if (!config) return null;
  
  const { icon: Icon, colorClass, hoverClass, defaultTitle, iconClass = '' } = config;

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${
        disabled 
          ? 'opacity-30 cursor-not-allowed grayscale' 
          : `${colorClass} ${hoverClass} active:scale-95`
      } ${className}`}
      title={disabled ? (title || defaultTitle) + " (Không khả dụng)" : (title || defaultTitle)}
    >
      <Icon className={`w-${iconSize} h-${iconSize} ${iconClass}`} />
    </button>
  );
}
