import { Server, CheckCircle, XCircle, Clock, Key, Link, Eye, Edit, Trash2, Plus, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { APIConnectionModal } from './APIConnectionModal';

interface APIConnection {
  id: number;
  name: string;
  endpoint: string;
  method: string;
  authType: string;
  status: 'connected' | 'disconnected' | 'error';
  responseTime: string;
  lastSync?: string;
  description?: string;
  isActive: boolean;
}

interface APIConnectionInfoProps {
  connections?: APIConnection[];
  onAdd?: (data: any) => void;
  onEdit?: (id: number, data: any) => void;
  onDelete?: (id: number) => void;
  onTest?: (id: number) => void;
}

export function APIConnectionInfo({ 
  connections = [],
  onAdd,
  onEdit,
  onDelete,
  onTest
}: APIConnectionInfoProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedConnection, setSelectedConnection] = useState<APIConnection | undefined>();

  const statusConfig = {
    connected: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      label: 'Đang kết nối'
    },
    disconnected: {
      icon: XCircle,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      label: 'Ngắt kết nối'
    },
    error: {
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      label: 'Lỗi kết nối'
    }
  };

  const handleAdd = () => {
    setModalMode('add');
    setSelectedConnection(undefined);
    setShowModal(true);
  };

  const handleView = (connection: APIConnection) => {
    setModalMode('view');
    setSelectedConnection(connection);
    setShowModal(true);
  };

  const handleEdit = (connection: APIConnection) => {
    setModalMode('edit');
    setSelectedConnection(connection);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa kết nối API này?')) {
      onDelete?.(id);
    }
  };

  const handleSave = (data: any) => {
    if (modalMode === 'add') {
      onAdd?.(data);
    } else if (modalMode === 'edit' && selectedConnection) {
      onEdit?.(selectedConnection.id, data);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* Header with Add Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-slate-600" />
            <h3 className="text-slate-900">Danh sách kết nối API</h3>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs">
              {connections.length}
            </span>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Thêm kết nối
          </button>
        </div>

        {/* Connections List */}
        {connections.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
            <Server className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 mb-4">Chưa có kết nối API nào</p>
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Thêm kết nối đầu tiên
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {connections.map((connection) => {
              const config = statusConfig[connection.status];
              const StatusIcon = config.icon;

              return (
                <div
                  key={connection.id}
                  className={`bg-white rounded-lg border ${config.border} p-4 hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-slate-900">{connection.name}</h4>
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 ${config.bg} rounded-full`}>
                          <StatusIcon className={`w-3.5 h-3.5 ${config.color}`} />
                          <span className={`text-xs ${config.color}`}>{config.label}</span>
                        </div>
                        {!connection.isActive && (
                          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                            Tạm dừng
                          </span>
                        )}
                      </div>
                      {connection.description && (
                        <p className="text-sm text-slate-600">{connection.description}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onTest?.(connection.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Test kết nối"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleView(connection)}
                        className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(connection)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(connection.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Connection Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* Endpoint */}
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 bg-blue-50 rounded">
                        <Link className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-600">Endpoint</p>
                        <p className="text-sm text-slate-900 truncate" title={connection.endpoint}>
                          {connection.endpoint}
                        </p>
                      </div>
                    </div>

                    {/* Method & Auth */}
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 bg-purple-50 rounded">
                        <Key className="w-3.5 h-3.5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Method / Auth</p>
                        <p className="text-sm text-slate-900">
                          {connection.method} / {connection.authType}
                        </p>
                      </div>
                    </div>

                    {/* Response Time */}
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 bg-amber-50 rounded">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Response Time</p>
                        <p className="text-sm text-slate-900">{connection.responseTime}</p>
                      </div>
                    </div>

                    {/* Last Sync */}
                    {connection.lastSync && (
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 bg-green-50 rounded">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-600">Đồng bộ cuối</p>
                          <p className="text-sm text-slate-900">{connection.lastSync}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      <APIConnectionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        data={selectedConnection}
        mode={modalMode}
      />
    </>
  );
}
