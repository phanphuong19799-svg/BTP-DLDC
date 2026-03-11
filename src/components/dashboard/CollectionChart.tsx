import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Maximize2 } from 'lucide-react';
import { FilterableChartWrapper, ChartFilters } from './FilterableChartWrapper';
import { useState } from 'react';

const data = [
  {
    month: "Tháng 1",
    thuThap: 345000,
    xuLy: 342000,
    chiaSet: 12000,
  },
  {
    month: "Tháng 2",
    thuThap: 378000,
    xuLy: 375000,
    chiaSet: 13500,
  },
  {
    month: "Tháng 3",
    thuThap: 392000,
    xuLy: 388000,
    chiaSet: 15200,
  },
  {
    month: "Tháng 4",
    thuThap: 410000,
    xuLy: 405000,
    chiaSet: 16800,
  },
  {
    month: "Tháng 5",
    thuThap: 425000,
    xuLy: 421000,
    chiaSet: 18500,
  },
  {
    month: "Tháng 6",
    thuThap: 448000,
    xuLy: 443000,
    chiaSet: 20100,
  },
  {
    month: "Tháng 7",
    thuThap: 465000,
    xuLy: 460000,
    chiaSet: 21800,
  },
  {
    month: "Tháng 8",
    thuThap: 482000,
    xuLy: 477000,
    chiaSet: 23200,
  },
  {
    month: "Tháng 9",
    thuThap: 498000,
    xuLy: 492000,
    chiaSet: 24500,
  },
  {
    month: "Tháng 10",
    thuThap: 515000,
    xuLy: 509000,
    chiaSet: 26000,
  },
  {
    month: "Tháng 11",
    thuThap: 532000,
    xuLy: 527000,
    chiaSet: 27800,
  },
  {
    month: "Tháng 12",
    thuThap: 550000,
    xuLy: 545000,
    chiaSet: 29500,
  },
];

interface CollectionChartProps {
  onChartClick?: () => void;
}

export function CollectionChart({ onChartClick }: CollectionChartProps) {
  const [filters, setFilters] = useState<ChartFilters>({
    startDate: '',
    endDate: '',
    dataType: 'all'
  });

  const handleFilterChange = (newFilters: ChartFilters) => {
    setFilters(newFilters);
    // Here you would typically filter your data based on the filters
    console.log('Filters changed:', newFilters);
  };

  return (
    <FilterableChartWrapper
      title="Biểu đồ thu thập theo thời gian"
      description="Thống kê số lượng bản ghi thu thập"
      onFilterChange={handleFilterChange}
    >
      <div className="relative group cursor-pointer" onClick={onChartClick}>
        <ResponsiveContainer width="100%" height={425}>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={(value) =>
                `${(value / 1000).toFixed(0)}k`
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value: number) =>
                value.toLocaleString()
              }
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="rect"
            />
            <Bar
              dataKey="thuThap"
              name="Thu thập"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
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