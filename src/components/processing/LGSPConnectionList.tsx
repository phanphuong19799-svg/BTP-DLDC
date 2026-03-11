import { useState } from 'react';
import { Link, Edit2, Trash2, CheckCircle, XCircle, PlayCircle } from 'lucide-react';
import { LGSPConnectionModal } from './LGSPConnectionModal';

interface Connection {
  id: string;
  name: string;
  endpoint: string;
  method: string;
  authType: string;
  isActive: boolean;
  lastTested: string;
  status: 'success' | 'error' | 'pending';
}

const mockConnections: Connection[] = [
  {
    id: '1',
    name: 'API Danh mục giới tính',
    endpoint: 'https://lgsp.gov.vn/api/v1/gender',
    method: 'GET',
    authType: 'API Key',
    isActive: true,
    lastTested: '2024-12-09 10:30',
    status: 'success'
  },
  {
    id: '2',
    name: 'API Danh mục dân tộc',
    endpoint: 'https://lgsp.gov.vn/api/v1/ethnicity',
    method: 'GET',
    authType: 'Client ID + Secret',
    isActive: true,
    lastTested: '2024-12-09 09:15',
    status: 'success'
  },
  {
    id: '3',
    name: 'API Thông tin hộ tịch',
    endpoint: 'https://lgsp.gov.vn/api/v1/civil-registry',
    method: 'POST',
    authType: 'OAuth2',
    isActive: true,
    lastTested: '2024-12-09 08:45',
    status: 'success'
  },
  {
    id: '4',
    name: 'API Giấy khai sinh',
    endpoint: 'https://lgsp.gov.vn/api/v1/birth-certificate',
    method: 'GET',
    authType: 'HMAC Signature',
    isActive: false,
    lastTested: '2024-12-08 16:20',
    status: 'error'
  }
];

export function LGSPConnectionList() {
  const [connections, setConnections] = useState<Connection[]>(mockConnections);
  const [showModal, setShowModal] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setSelectedConnection(id);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa kết nối này?')) {
      setConnections(connections.filter(c => c.id !== id));
    }
  };

  const handleTest = (id: string) => {
    alert(`Đang test kết nối ${id}...\n\nKết nối thành công!`);
  };

  const handleToggleActive = (id: string) => {
    setConnections(connections.map(c => 
      c.id === id ? { ...c, isActive: !c.isActive } : c
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base text-slate-900">Danh sách kết nối LGSP</h3>
          <p className="text-sm text-slate-600 mt-1">
            Quản lý các kết nối API đến nền tảng LGSP
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedConnection(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Link className="w-4 h-4" />
          Thêm kết nối
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase tracking-wider">
                Tên kết nối
              </th>
              <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase tracking-wider">
                Endpoint
              </th>
              <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase tracking-wider">
                Method
              </th>
              <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase tracking-wider">
                Xác thực
              </th>
              <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase tracking-wider">
                Test lần cuối
              </th>
              <th className="px-4 py-3 text-right text-xs text-slate-700 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {connections.map((connection) => (
              <tr key={connection.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-slate-900">{connection.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-slate-600 font-mono">{connection.endpoint}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 text-xs rounded ${
                    connection.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                    connection.method === 'POST' ? 'bg-green-100 text-green-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {connection.method}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-slate-600">{connection.authType}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {connection.isActive ? (
                      <>
                        {connection.status === 'success' && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                        {connection.status === 'error' && (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm ${
                          connection.status === 'success' ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {connection.status === 'success' ? 'Hoạt động' : 'Lỗi'}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-slate-400">Tắt</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-slate-600">{connection.lastTested}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleTest(connection.id)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Test kết nối"
                    >
                      <PlayCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleActive(connection.id)}
                      className={`px-2 py-1 text-xs rounded ${
                        connection.isActive 
                          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      } transition-colors`}
                    >
                      {connection.isActive ? 'Bật' : 'Tắt'}
                    </button>
                    <button
                      onClick={() => handleEdit(connection.id)}
                      className="p-1.5 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(connection.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LGSPConnectionModal 
        isOpen={showModal} 
        onClose={() => {
          setShowModal(false);
          setSelectedConnection(null);
        }} 
      />
    </div>
  );
}
