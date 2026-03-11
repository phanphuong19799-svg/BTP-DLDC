import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Maximize2 } from 'lucide-react';
import { FilterableChartWrapper, ChartFilters } from './FilterableChartWrapper';
import { useState } from 'react';

const data = [
  { 
    name: 'Tuần 1',
    lamSach: 82000
  },
  { 
    name: 'Tuần 2',
    lamSach: 89000
  },
  { 
    name: 'Tuần 3',
    lamSach: 95000
  },
  { 
    name: 'Tuần 4',
    lamSach: 102000
  },
];

interface ProcessingChartProps {
  onChartClick?: () => void;
}

export function ProcessingChart({ onChartClick }: ProcessingChartProps) {
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
      title="Biểu đồ xử lý dữ liệu"
      description="Số lượng dữ liệu đã làm sạch theo tuần"
      onFilterChange={handleFilterChange}
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
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
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
            <Bar dataKey="lamSach" name="Dữ liệu đã làm sạch" fill="#10b981" radius={[6, 6, 0, 0]} />
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