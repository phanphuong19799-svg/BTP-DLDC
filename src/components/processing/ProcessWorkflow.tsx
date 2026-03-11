import { useState } from 'react';
import { Droplet, CheckSquare, Shuffle, ArrowRight, CheckCircle, Clock, XCircle, ChevronDown } from 'lucide-react';

interface WorkflowStep {
  id: number;
  name: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  rules: string[];
  status: 'completed' | 'running' | 'pending' | 'error';
  progress?: number;
  duration?: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    name: 'cleaning',
    title: 'Bước 1: LÀM SẠCH DỮ LIỆU',
    description: 'Loại bỏ dữ liệu không hợp lệ, xử lý giá trị thiếu và ngoại lệ',
    icon: Droplet,
    color: 'blue',
    rules: [
      'Format - Chuẩn hóa định dạng ngày tháng, số, văn bản',
      'Validation - Kiểm tra tính hợp lệ của dữ liệu',
      'Missing-value - Xử lý giá trị thiếu (điền, loại bỏ)',
      'Outlier - Phát hiện và xử lý giá trị ngoại lệ',
    ],
    status: 'completed',
    progress: 100,
    duration: '8 phút 23 giây',
  },
  {
    id: 2,
    name: 'standardization',
    title: 'Bước 2: CHUẨN HÓA DỮ LIỆU',
    description: 'Đảm bảo tính nhất quán, loại bỏ trùng lặp và kiểm tra tham chiếu',
    icon: CheckSquare,
    color: 'green',
    rules: [
      'Key-matching - Đối sánh dựa trên khóa chính và khóa ngoại',
      'Duplicate - Phát hiện và xử lý dữ liệu trùng lặp',
      'Reference - Kiểm tra và xử lý vi phạm ràng buộc tham chiếu',
    ],
    status: 'running',
    progress: 65,
    duration: '5 phút 12 giây',
  },
  {
    id: 3,
    name: 'transformation',
    title: 'Bước 3: BIẾN ĐỔI DỮ LIỆU',
    description: 'Chuyển đổi cấu trúc và định dạng phù hợp với yêu cầu phân tích',
    icon: Shuffle,
    color: 'purple',
    rules: [
      'Transform - Biến đổi định dạng và cấu trúc dữ liệu',
      'Merge-split - Gộp hoặc tách các cột dữ liệu',
      'Classify - Phân loại và gán nhãn dữ liệu',
    ],
    status: 'pending',
  },
];

interface ProcessingRecord {
  id: string;
  sourceName: string;
  currentStep: number;
  totalRecords: number;
  processedRecords: number;
  startTime: string;
  estimatedTime: string;
  steps: {
    stepId: number;
    status: 'completed' | 'running' | 'pending' | 'error';
    startTime?: string;
    endTime?: string;
    recordsProcessed?: number;
    errors?: number;
  }[];
}

const mockProcessingRecords: ProcessingRecord[] = [
  {
    id: '1',
    sourceName: 'Cơ sở dữ liệu đấu giá viên',
    currentStep: 2,
    totalRecords: 15420,
    processedRecords: 10023,
    startTime: '08/12/2024 08:30:00',
    estimatedTime: '08/12/2024 08:48:00',
    steps: [
      {
        stepId: 1,
        status: 'completed',
        startTime: '08:30:00',
        endTime: '08:38:23',
        recordsProcessed: 15420,
        errors: 40,
      },
      {
        stepId: 2,
        status: 'running',
        startTime: '08:38:23',
        recordsProcessed: 10023,
        errors: 12,
      },
      {
        stepId: 3,
        status: 'pending',
      },
    ],
  },
  {
    id: '2',
    sourceName: 'Thông tin công chứng viên',
    currentStep: 3,
    totalRecords: 8750,
    processedRecords: 3200,
    startTime: '08/12/2024 07:15:00',
    estimatedTime: '08/12/2024 07:32:00',
    steps: [
      {
        stepId: 1,
        status: 'completed',
        startTime: '07:15:00',
        endTime: '07:21:45',
        recordsProcessed: 8750,
        errors: 0,
      },
      {
        stepId: 2,
        status: 'completed',
        startTime: '07:21:45',
        endTime: '07:26:30',
        recordsProcessed: 8750,
        errors: 0,
      },
      {
        stepId: 3,
        status: 'running',
        startTime: '07:26:30',
        recordsProcessed: 3200,
        errors: 0,
      },
    ],
  },
];

export function ProcessWorkflow() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<ProcessingRecord | null>(null);

  const getStepColor = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-900', icon: 'text-blue-600' },
      green: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-900', icon: 'text-green-600' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-900', icon: 'text-purple-600' },
    };
    return colors[color] || colors.blue;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Hoàn thành
          </span>
        );
      case 'running':
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1">
            <Clock className="w-3 h-3 animate-pulse" /> Đang xử lý
          </span>
        );
      case 'error':
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1">
            <XCircle className="w-3 h-3" /> Lỗi
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
            Chờ xử lý
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-slate-900 mb-1">Quy trình xử lý dữ liệu 3 bước</h3>
        <p className="text-sm text-slate-600">
          Visualization quy trình làm sạch, chuẩn hóa và biến đổi dữ liệu
        </p>
      </div>

      {/* Workflow Diagram */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-8 border-2 border-slate-200">
        <div className="flex items-center justify-center gap-6">
          {workflowSteps.map((step, index) => {
            const colors = getStepColor(step.color);
            const Icon = step.icon;
            const isExpanded = expandedStep === step.id;

            return (
              <div key={step.id} className="flex items-center gap-6">
                {/* Step Card */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                    className={`relative p-6 rounded-2xl border-4 ${colors.border} ${colors.bg} 
                      hover:shadow-2xl transition-all duration-300 w-64
                      ${isExpanded ? 'scale-105 shadow-2xl' : ''}`}
                  >
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-white border-4 border-current rounded-full flex items-center justify-center shadow-lg">
                      <span className={`text-lg ${colors.icon}`}>{step.id}</span>
                    </div>

                    {/* Icon */}
                    <div className={`mx-auto mb-4 p-4 bg-white rounded-xl shadow-md w-fit`}>
                      <Icon className={`w-10 h-10 ${colors.icon}`} />
                    </div>

                    {/* Title */}
                    <h4 className={`text-center mb-2 ${colors.text}`}>{step.title}</h4>
                    <p className="text-xs text-slate-600 text-center mb-4">{step.description}</p>

                    {/* Status */}
                    <div className="flex justify-center mb-3">
                      {getStatusBadge(step.status)}
                    </div>

                    {/* Progress */}
                    {step.progress !== undefined && (
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                          <span>Tiến độ</span>
                          <span>{step.progress}%</span>
                        </div>
                        <div className="w-full bg-white rounded-full h-2 shadow-inner">
                          <div
                            className={`h-2 rounded-full ${
                              step.status === 'completed' ? 'bg-green-600' :
                              step.status === 'running' ? 'bg-blue-600' : 'bg-slate-300'
                            }`}
                            style={{ width: `${step.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Duration */}
                    {step.duration && (
                      <p className="text-xs text-slate-500 text-center">⏱ {step.duration}</p>
                    )}

                    {/* Expand Indicator */}
                    <div className="flex justify-center mt-3">
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </button>

                  {/* Expanded Rules List */}
                  {isExpanded && (
                    <div className="mt-4 w-64 bg-white rounded-lg border-2 border-slate-200 p-4 shadow-xl">
                      <h5 className="text-sm text-slate-900 mb-3">Quy tắc áp dụng:</h5>
                      <ul className="space-y-2">
                        {step.rules.map((rule, idx) => (
                          <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Arrow between steps */}
                {index < workflowSteps.length - 1 && (
                  <ArrowRight className="w-8 h-8 text-slate-400 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Processing Records */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <h4 className="text-slate-900">Các tác vụ đang xử lý</h4>
          <p className="text-sm text-slate-600 mt-1">
            Theo dõi chi tiết tiến trình từng bước
          </p>
        </div>

        <div className="p-6 space-y-4">
          {mockProcessingRecords.map((record) => (
            <div
              key={record.id}
              className="border-2 border-slate-200 rounded-lg p-5 hover:shadow-lg transition-all"
            >
              {/* Record Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h5 className="text-slate-900 mb-2">{record.sourceName}</h5>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>Bắt đầu: {record.startTime}</span>
                    <span>•</span>
                    <span>Dự kiến: {record.estimatedTime}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600 mb-1">Đang ở bước {record.currentStep}/3</p>
                  <p className="text-lg text-slate-900">
                    {record.processedRecords.toLocaleString()} / {record.totalRecords.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Overall Progress */}
              <div className="mb-4">
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div
                    className="h-3 bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 rounded-full"
                    style={{ width: `${(record.processedRecords / record.totalRecords) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Status Timeline */}
              <div className="grid grid-cols-3 gap-4">
                {record.steps.map((stepStatus) => {
                  const step = workflowSteps.find(s => s.id === stepStatus.stepId);
                  if (!step) return null;
                  
                  const colors = getStepColor(step.color);
                  const Icon = step.icon;

                  return (
                    <div
                      key={stepStatus.stepId}
                      className={`p-4 rounded-lg border-2 ${
                        stepStatus.status === 'completed' ? 'border-green-200 bg-green-50' :
                        stepStatus.status === 'running' ? 'border-blue-200 bg-blue-50' :
                        stepStatus.status === 'error' ? 'border-red-200 bg-red-50' :
                        'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className={`w-4 h-4 ${colors.icon}`} />
                        <span className="text-sm text-slate-900">Bước {stepStatus.stepId}</span>
                      </div>
                      
                      {getStatusBadge(stepStatus.status)}

                      {stepStatus.recordsProcessed !== undefined && (
                        <div className="mt-3 text-xs text-slate-600">
                          <p>Đã xử lý: {stepStatus.recordsProcessed.toLocaleString()}</p>
                          {stepStatus.errors !== undefined && stepStatus.errors > 0 && (
                            <p className="text-red-600">Lỗi: {stepStatus.errors}</p>
                          )}
                        </div>
                      )}

                      {stepStatus.startTime && (
                        <p className="text-xs text-slate-500 mt-2">
                          {stepStatus.endTime 
                            ? `${stepStatus.startTime} - ${stepStatus.endTime}`
                            : `Bắt đầu: ${stepStatus.startTime}`
                          }
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setSelectedRecord(record)}
                className="mt-4 w-full py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm text-slate-600"
              >
                Xem chi tiết từng bước
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-blue-900 mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Về quy trình xử lý 3 bước
        </h4>
        <div className="grid grid-cols-3 gap-6 text-sm text-slate-700">
          <div>
            <h5 className="text-blue-800 mb-2">🧹 Bước 1: Làm sạch</h5>
            <p>Loại bỏ dữ liệu không hợp lệ, giá trị thiếu, ngoại lệ. Chuẩn hóa định dạng cơ bản.</p>
          </div>
          <div>
            <h5 className="text-green-800 mb-2">✅ Bước 2: Chuẩn hóa</h5>
            <p>Đảm bảo tính nhất quán, loại bỏ trùng lặp, kiểm tra ràng buộc tham chiếu.</p>
          </div>
          <div>
            <h5 className="text-purple-800 mb-2">🔄 Bước 3: Biến đổi</h5>
            <p>Chuyển đổi cấu trúc, gộp/tách cột, phân loại dữ liệu theo yêu cầu.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
