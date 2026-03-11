import { TrendingUp, CheckCircle, AlertTriangle, XCircle, Maximize2 } from 'lucide-react';

interface DataQualityScoreProps {
  onDetailClick?: () => void;
}

export function DataQualityScore({ onDetailClick }: DataQualityScoreProps) {
  const qualityMetrics = [
    {
      category: 'Đăng ký kinh doanh',
      score: 98.5,
      total: 1250000,
      valid: 1231250,
      error: 18750,
      status: 'excellent'
    },
    {
      category: 'Công chứng',
      score: 96.2,
      total: 850000,
      valid: 817700,
      error: 32300,
      status: 'good'
    },
    {
      category: 'Trợ giúp pháp lý',
      score: 94.8,
      total: 620000,
      valid: 587760,
      error: 32240,
      status: 'good'
    },
    {
      category: 'Văn bản pháp luật',
      score: 99.1,
      total: 1500000,
      valid: 1486500,
      error: 13500,
      status: 'excellent'
    },
    {
      category: 'Hộ tịch',
      score: 91.5,
      total: 450000,
      valid: 411750,
      error: 38250,
      status: 'warning'
    }
  ];

  const averageScore = (
    qualityMetrics.reduce((sum, m) => sum + m.score, 0) / qualityMetrics.length
  ).toFixed(1);

  const getScoreColor = (score: number) => {
    if (score >= 98) return 'text-green-600';
    if (score >= 95) return 'text-blue-600';
    if (score >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 98) return 'bg-green-50';
    if (score >= 95) return 'bg-blue-50';
    if (score >= 90) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'good':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 relative group cursor-pointer hover:shadow-lg transition-shadow" onClick={onDetailClick}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-slate-900">Điểm chất lượng dữ liệu</h3>
            <p className="text-sm text-slate-500">Đánh giá tính chính xác và đầy đủ</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-3xl text-green-600">{averageScore}</div>
            <div className="text-xs text-slate-500">Điểm trung bình</div>
          </div>
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-blue-50 rounded-lg"
            title="Xem chi tiết"
          >
            <Maximize2 className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {qualityMetrics.map((metric) => (
          <div key={metric.category} className="border border-slate-100 rounded-lg p-4 hover:border-slate-200 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {getStatusIcon(metric.status)}
                <span className="text-sm text-slate-900">{metric.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm ${getScoreColor(metric.score)}`}>
                  {metric.score}%
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div
                className={`absolute top-0 left-0 h-full rounded-full transition-all ${
                  metric.score >= 98
                    ? 'bg-green-500'
                    : metric.score >= 95
                    ? 'bg-blue-500'
                    : metric.score >= 90
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${metric.score}%` }}
              />
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Tổng: {metric.total.toLocaleString()}</span>
              <div className="flex gap-3">
                <span className="text-green-600">
                  Hợp lệ: {metric.valid.toLocaleString()}
                </span>
                <span className="text-red-600">
                  Lỗi: {metric.error.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}