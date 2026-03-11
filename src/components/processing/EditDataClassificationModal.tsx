import { useState } from 'react';
import { X, Shield, Eye, Lock, Globe, AlertTriangle, ChevronDown } from 'lucide-react';

interface FieldClassification {
  name: string;
  publicLevel: string;
  sensitivityLevel: string;
}

interface EditDataClassificationModalProps {
  dataName: string;
  onClose: () => void;
  onSave: (fields: FieldClassification[]) => void;
}

const publicLevels = [
  { value: 'Công khai', label: 'Công khai', color: 'text-green-700', bg: 'bg-green-100', icon: Globe },
  { value: 'Công khai hạn chế', label: 'Công khai hạn chế', color: 'text-blue-700', bg: 'bg-blue-100', icon: Eye },
  { value: 'Nội bộ', label: 'Nội bộ', color: 'text-orange-700', bg: 'bg-orange-100', icon: Shield },
  { value: 'Mật', label: 'Mật', color: 'text-red-700', bg: 'bg-red-100', icon: Lock },
];

const sensitivityLevels = [
  { value: 'Thấp', label: 'Thấp', color: 'text-green-700', bg: 'bg-green-100', dotColor: 'bg-green-500' },
  { value: 'Trung bình', label: 'Trung bình', color: 'text-yellow-700', bg: 'bg-yellow-100', dotColor: 'bg-yellow-500' },
  { value: 'Cao', label: 'Cao', color: 'text-orange-700', bg: 'bg-orange-100', dotColor: 'bg-orange-500' },
  { value: 'Rất cao', label: 'Rất cao', color: 'text-red-700', bg: 'bg-red-100', dotColor: 'bg-red-500' },
];

const initialFields: FieldClassification[] = [
  { name: 'Mã bản ghi', publicLevel: 'Công khai hạn chế', sensitivityLevel: 'Thấp' },
  { name: 'Họ và tên', publicLevel: 'Nội bộ', sensitivityLevel: 'Cao' },
  { name: 'Ngày sinh', publicLevel: 'Nội bộ', sensitivityLevel: 'Cao' },
  { name: 'Số CCCD', publicLevel: 'Mật', sensitivityLevel: 'Rất cao' },
  { name: 'Địa chỉ', publicLevel: 'Nội bộ', sensitivityLevel: 'Trung bình' },
  { name: 'Giới tính', publicLevel: 'Nội bộ', sensitivityLevel: 'Thấp' },
  { name: 'Quốc tịch', publicLevel: 'Công khai hạn chế', sensitivityLevel: 'Thấp' },
  { name: 'Ngày đăng ký', publicLevel: 'Công khai hạn chế', sensitivityLevel: 'Thấp' },
  { name: 'Trạng thái', publicLevel: 'Công khai', sensitivityLevel: 'Thấp' },
];

export function EditDataClassificationModal({ dataName, onClose, onSave }: EditDataClassificationModalProps) {
  const [fields, setFields] = useState<FieldClassification[]>(initialFields);

  const handlePublicLevelChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index].publicLevel = value;
    setFields(newFields);
  };

  const handleSensitivityLevelChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index].sensitivityLevel = value;
    setFields(newFields);
  };

  const getPublicLevelStyle = (level: string) => {
    const found = publicLevels.find(l => l.value === level);
    return found || publicLevels[0];
  };

  const getSensitivityLevelStyle = (level: string) => {
    const found = sensitivityLevels.find(l => l.value === level);
    return found || sensitivityLevels[0];
  };

  const handleSave = () => {
    onSave(fields);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-slate-900">Phân loại Dữ liệu</h3>
              <p className="text-sm text-slate-500 mt-1">{dataName}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {fields.map((field, index) => {
              const publicStyle = getPublicLevelStyle(field.publicLevel);
              const sensitivityStyle = getSensitivityLevelStyle(field.sensitivityLevel);
              const PublicIcon = publicStyle.icon;

              return (
                <div key={index} className="bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-4">
                    {/* Status Dot */}
                    <div className={`w-2 h-2 rounded-full ${sensitivityStyle.dotColor} flex-shrink-0`}></div>

                    {/* Field Name */}
                    <div className="flex-1 min-w-0">
                      <div className="text-slate-900">{field.name}</div>
                    </div>

                    {/* Public Level Dropdown */}
                    <div className="flex-shrink-0">
                      <select
                        value={field.publicLevel}
                        onChange={(e) => handlePublicLevelChange(index, e.target.value)}
                        className="px-3 py-1.5 pr-8 border border-slate-300 rounded-lg text-sm appearance-none bg-white cursor-pointer hover:border-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ 
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.5rem center',
                          minWidth: '160px'
                        }}
                      >
                        {publicLevels.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Sensitivity Level Dropdown */}
                    <div className="flex-shrink-0">
                      <select
                        value={field.sensitivityLevel}
                        onChange={(e) => handleSensitivityLevelChange(index, e.target.value)}
                        className="px-3 py-1.5 pr-8 border border-slate-300 rounded-lg text-sm appearance-none bg-white cursor-pointer hover:border-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ 
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.5rem center',
                          minWidth: '140px'
                        }}
                      >
                        {sensitivityLevels.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-yellow-900 mb-1">Lưu ý quan trọng</h5>
                <p className="text-sm text-yellow-800">
                  Phân loại dữ liệu phải tuân thủ Nghị định 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân 
                  và các quy định hiện hành về quản lý, khai thác dữ liệu.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}