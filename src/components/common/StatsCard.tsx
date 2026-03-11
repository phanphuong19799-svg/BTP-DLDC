import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  iconColor: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'teal' | 'cyan' | 'amber' | 'yellow' | 'indigo';
  title: string;
  value: string | number;
  subtitle?: string;
  subtitleColor?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'teal' | 'cyan' | 'slate' | 'amber' | 'yellow' | 'indigo';
}

const colorMap = {
  blue: {
    iconBg: 'bg-blue-50',
    iconText: 'text-blue-600',
    subtitle: 'text-blue-600'
  },
  green: {
    iconBg: 'bg-green-50',
    iconText: 'text-green-600',
    subtitle: 'text-green-600'
  },
  orange: {
    iconBg: 'bg-orange-50',
    iconText: 'text-orange-600',
    subtitle: 'text-orange-600'
  },
  red: {
    iconBg: 'bg-red-50',
    iconText: 'text-red-600',
    subtitle: 'text-red-600'
  },
  purple: {
    iconBg: 'bg-purple-50',
    iconText: 'text-purple-600',
    subtitle: 'text-purple-600'
  },
  teal: {
    iconBg: 'bg-teal-50',
    iconText: 'text-teal-600',
    subtitle: 'text-teal-600'
  },
  cyan: {
    iconBg: 'bg-cyan-50',
    iconText: 'text-cyan-600',
    subtitle: 'text-cyan-600'
  },
  amber: {
    iconBg: 'bg-amber-50',
    iconText: 'text-amber-600',
    subtitle: 'text-amber-600'
  },
  yellow: {
    iconBg: 'bg-yellow-50',
    iconText: 'text-yellow-600',
    subtitle: 'text-yellow-600'
  },
  slate: {
    iconBg: 'bg-slate-50',
    iconText: 'text-slate-600',
    subtitle: 'text-slate-600'
  },
  indigo: {
    iconBg: 'bg-indigo-50',
    iconText: 'text-indigo-600',
    subtitle: 'text-indigo-600'
  }
};

export function StatsCard({ icon: Icon, iconColor, title, value, subtitle, subtitleColor }: StatsCardProps) {
  const colors = colorMap[iconColor];
  const subtitleColorClass = subtitleColor ? colorMap[subtitleColor].subtitle : colors.subtitle;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <div className="flex items-start gap-3">
        <div className={`${colors.iconBg} p-2.5 rounded-lg flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${colors.iconText}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-slate-600 text-sm mb-1">{title}</div>
          <div className="text-slate-900 text-2xl mb-1">{value}</div>
          {subtitle && (
            <div className={`text-xs ${subtitleColorClass}`}>{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );
}