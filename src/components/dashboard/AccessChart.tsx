import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Maximize2 } from 'lucide-react';
import { FilterableChartWrapper, ChartFilters } from './FilterableChartWrapper';
import { useState } from 'react';

const data = [
  { name: 'Thứ 2', truyCapAPI: 4200, truyCapWeb: 2800 },
  { name: 'Thứ 3', truyCapAPI: 4500, truyCapWeb: 3100 },
  { name: 'Thứ 4', truyCapAPI: 4800, truyCapWeb: 3300 },
  { name: 'Thứ 5', truyCapAPI: 5200, truyCapWeb: 3600 },
  { name: 'Thứ 6', truyCapAPI: 5500, truyCapWeb: 3900 },
  { name: 'Thứ 7', truyCapAPI: 3800, truyCapWeb: 2400 },
  { name: 'CN', truyCapAPI: 3200, truyCapWeb: 2000 },
];

interface AccessChartProps {
  onChartClick?: () => void;
}

export function AccessChart({ onChartClick }: AccessChartProps) {
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
      title="Biểu đồ lượt truy cập"
      description="Số lượng truy cập giao diện web và API"
      onFilterChange={handleFilterChange}
      showDataTypeFilter={false}
    >
      <div className="relative group cursor-pointer" onClick={onChartClick}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: number) => value.toLocaleString()}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
            />
            <Bar dataKey="truyCapAPI" name="Truy cập API" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="truyCapWeb" name="Truy cập Web" fill="#10b981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
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