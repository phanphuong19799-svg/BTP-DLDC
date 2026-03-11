import { useState } from 'react';
import { X, Image, Check, Upload } from 'lucide-react';

interface ChangeBackgroundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const predefinedBackgrounds = [
  {
    id: '1',
    name: 'Xanh dương nhẹ',
    gradient: 'from-slate-50 to-blue-50'
  },
  {
    id: '2',
    name: 'Xám trắng',
    gradient: 'from-slate-50 to-slate-100'
  },
  {
    id: '3',
    name: 'Xanh lá nhẹ',
    gradient: 'from-slate-50 to-green-50'
  },
  {
    id: '4',
    name: 'Tím nhẹ',
    gradient: 'from-slate-50 to-purple-50'
  },
  {
    id: '5',
    name: 'Cam nhẹ',
    gradient: 'from-slate-50 to-orange-50'
  },
  {
    id: '6',
    name: 'Trắng tinh khiết',
    gradient: 'from-white to-white'
  },
  {
    id: '7',
    name: 'Xanh dương đậm',
    gradient: 'from-blue-50 to-blue-100'
  },
  {
    id: '8',
    name: 'Xám đậm',
    gradient: 'from-slate-100 to-slate-200'
  }
];

export function ChangeBackgroundModal({ isOpen, onClose }: ChangeBackgroundModalProps) {
  const [selectedBackground, setSelectedBackground] = useState('1');

  if (!isOpen) return null;

  const handleSave = () => {
    // Save background preference logic here
    console.log('Selected background:', selectedBackground);
    onClose();
  };

  const handleUpload = () => {
    // Upload custom image logic here
    console.log('Upload custom background');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Image className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-slate-900">Thay đổi hình nền</h3>
              <p className="text-sm text-slate-600 mt-0.5">Chọn màu nền cho giao diện hệ thống</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Predefined Backgrounds */}
          <div>
            <h4 className="text-sm text-slate-900 mb-4">Màu nền có sẵn</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {predefinedBackgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setSelectedBackground(bg.id)}
                  className={`relative aspect-video rounded-lg border-2 transition-all overflow-hidden group ${
                    selectedBackground === bg.id
                      ? 'border-blue-600 shadow-lg'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${bg.gradient}`} />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity ${
                    selectedBackground === bg.id 
                      ? 'bg-black bg-opacity-40 opacity-100' 
                      : 'bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-20 group-hover:opacity-100'
                  }`}>
                    {selectedBackground === bg.id && (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                    <p className="text-xs text-white text-center">{bg.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Upload Section */}
          <div className="pt-6 border-t border-slate-200">
            <h4 className="text-sm text-slate-900 mb-4">Tải lên hình nền tùy chỉnh</h4>
            <button
              onClick={handleUpload}
              className="w-full h-32 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-2 text-slate-600 hover:text-blue-600"
            >
              <Upload className="w-8 h-8" />
              <div className="text-sm">Click để tải lên hình ảnh</div>
              <div className="text-xs text-slate-500">PNG, JPG tối đa 2MB</div>
            </button>
          </div>

          {/* Preview */}
          <div className="pt-6 border-t border-slate-200">
            <h4 className="text-sm text-slate-900 mb-4">Xem trước</h4>
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <div className={`h-48 bg-gradient-to-br ${
                predefinedBackgrounds.find(bg => bg.id === selectedBackground)?.gradient || 'from-slate-50 to-blue-50'
              } flex items-center justify-center`}>
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg"></div>
                    <div>
                      <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-slate-100 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-100 rounded"></div>
                    <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Image className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="mb-2">
                  <strong>Lưu ý:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Màu nền chỉ áp dụng cho tài khoản của bạn</li>
                  <li>Khuyến nghị sử dụng màu nền nhẹ để dễ nhìn và chuyên nghiệp</li>
                  <li>Hình ảnh tùy chỉnh nên có kích thước tối thiểu 1920x1080px</li>
                  <li>Tránh sử dụng hình nền quá rối hoặc màu sắc quá đậm</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200">
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Áp dụng thay đổi
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
