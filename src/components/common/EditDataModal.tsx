import { X, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface EditDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  fields: { label: string; key: string }[];
  title: string;
  onSave: (updatedData: any) => void;
  fieldStatus?: Record<string, 'valid' | 'warning'>;
}

export function EditDataModal({ 
  isOpen, 
  onClose, 
  data, 
  fields, 
  title, 
  onSave,
  fieldStatus = {} 
}: EditDataModalProps) {
  const [activeTab, setActiveTab] = useState<'sources' | 'merged'>('merged');
  const [formData, setFormData] = useState(data);

  if (!isOpen || !data) return null;

  const handleInputChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleCancel = () => {
    setFormData(data); // Reset to original data
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header with back button */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-slate-600 rotate-180" />
            </button>
            <h3 className="text-slate-900">{title}</h3>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex gap-6 px-6">
            <button
              onClick={() => setActiveTab('sources')}
              className={`pb-3 pt-4 px-2 border-b-2 transition-colors ${
                activeTab === 'sources'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Nguồn dữ liệu
            </button>
            <button
              onClick={() => setActiveTab('merged')}
              className={`pb-3 pt-4 px-2 border-b-2 transition-colors ${
                activeTab === 'merged'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Dữ liệu đã gộp
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
          {activeTab === 'sources' ? (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm text-blue-900 mb-1">Thông tin nguồn dữ liệu</h4>
                    <p className="text-sm text-blue-700">
                      Xem dữ liệu từ các nguồn riêng biệt. Chuyển sang tab "Dữ liệu đã gộp" để chỉnh sửa.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center text-slate-600 py-8">
                Chức năng xem nguồn dữ liệu chi tiết sẽ được bổ sung sau.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Info notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm text-blue-900 mb-1">Dữ liệu sau khi gộp</h4>
                    <p className="text-sm text-blue-700">
                      Đây là kết quả sau khi gộp dữ liệu từ 3 nguồn
                    </p>
                  </div>
                </div>
              </div>

              {/* Editable fields */}
              <div className="space-y-3">
                {fields.map((field) => {
                  const value = formData[field.key] || '';
                  const status = fieldStatus[field.key];
                  const bgColor = status === 'valid' ? 'bg-green-50' : status === 'warning' ? 'bg-orange-50' : 'bg-white';
                  const borderColor = status === 'valid' ? 'border-green-200' : status === 'warning' ? 'border-orange-200' : 'border-slate-200';

                  return (
                    <div key={field.key} className={`p-3 rounded-lg border ${bgColor} ${borderColor}`}>
                      <label className="block text-sm text-slate-600 mb-2">
                        {field.label}:
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${bgColor} ${borderColor}`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 text-sm pt-3 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
                  <span className="text-slate-600">Dữ liệu hợp lệ</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded"></div>
                  <span className="text-slate-600">Cần kiểm tra</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
