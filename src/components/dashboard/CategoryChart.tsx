import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Maximize2 } from 'lucide-react';
import { FilterableChartWrapper, ChartFilters } from './FilterableChartWrapper';
import { useState } from 'react';

const data = [
  { name: 'Danh mục', value: 2500000, color: '#3b82f6' },
  { name: 'Danh mục mở', value: 1800000, color: '#10b981' },
  { name: 'Danh mục chủ', value: 1200000, color: '#a855f7' },
];

interface CategoryChartProps {
  onChartClick?: () => void;
}

export function CategoryChart({ onChartClick }: CategoryChartProps) {
  const [filters, setFilters] = useState<ChartFilters>({
    startDate: '',
    endDate: '',
    dataType: 'all'
  });

  const handleFilterChange = (newFilters: ChartFilters) => {
    setFilters(newFilters);
    console.log('Filters changed:', newFilters);
  };

  return (
    <FilterableChartWrapper
      title="Phân loại danh mục dữ liệu"
      description="Thống kê danh mục, danh mục mở và danh mục chủ"
      onFilterChange={handleFilterChange}
    >
      <div className="relative group cursor-pointer" onClick={onChartClick}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: number) => value.toLocaleString()}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xs text-slate-600">{item.name}</span>
            </div>
          ))}
        </div>
        <button
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-blue-50 rounded-lg bg-white shadow-sm"
          title="Xem chi tiết"
          onClick={(e) => {
            e.stopPropagation();
            onChartClick?.();
          }}
        >
          <Maximize2 className="w-5 h-5 text-blue-600" />
        </button>
      </div>
    </FilterableChartWrapper>
  );
}