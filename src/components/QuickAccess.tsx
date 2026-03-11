import { 
  FileText, 
  Scale, 
  Users, 
  Building2, 
  BookOpen, 
  ShieldCheck,
  FolderOpen,
  Settings
} from 'lucide-react';

const features = [
  {
    title: 'CSDL A',
    description: 'Dữ liệu A',
    icon: FileText,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    count: '1,234,567'
  },
  {
    title: 'Hệ thống B',
    description: 'Dữ liệu B',
    icon: Building2,
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    count: '987,654'
  },
  {
    title: 'CSDL C',
    description: 'Dữ liệu C',
    icon: ShieldCheck,
    color: 'bg-green-50 text-green-600 border-green-200',
    count: '543,210'
  },
  {
    title: 'Danh mục D',
    description: 'Dữ liệu D',
    icon: Scale,
    color: 'bg-orange-50 text-orange-600 border-orange-200',
    count: '345,678'
  }
];

export function QuickAccess() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-gray-800">Truy cập nhanh</h2>
        <p className="text-gray-500 text-sm mt-1">Các module chính của hệ thống</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((item, index) => (
            <button
              key={index}
              className={`${item.color} border-2 rounded-lg p-4 hover:shadow-md transition-all hover:scale-105 text-left`}
            >
              <item.icon className="w-8 h-8 mb-3" />
              <h3 className="text-gray-900 mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <p className="text-gray-600 text-sm mt-1">Số lượng: {item.count}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}