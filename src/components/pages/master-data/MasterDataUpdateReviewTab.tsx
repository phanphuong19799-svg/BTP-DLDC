import React, { useState } from 'react';
import { Search, Filter, Upload, Download, Eye, Send, Trash2, RotateCcw, Globe } from 'lucide-react';
import { DataDetailModal } from '../../common/DataDetailModal';

type TabType = 'list' | 'config' | 'warning' | 'history';

interface DataRecord {
  id: number;
  condition: string;
  recordCode: string;
  fullName: string;
  birthDate: string;
  cccdNumber: string;
  status: 'processed' | 'processing';
  approvalStatus: 'approved' | 'pending' | 'rejected';
  publicStatus: 'published' | 'unpublished';
  isDeleted: boolean;
}

const mockData: DataRecord[] = [
  {
    id: 1,
    condition: 'Không sửa',
    recordCode: 'HTD-2025-001234',
    fullName: 'Nguyễn Văn A',
    birthDate: '15/03/1990',
    cccdNumber: '001234567890',
    status: 'processed',
    approvalStatus: 'approved',
    publicStatus: 'published',
    isDeleted: false,
  },
  {
    id: 2,
    condition: 'Không sửa',
    recordCode: 'HTD-2025-001235',
    fullName: 'Trần Thị B',
    birthDate: '20/08/1985',
    cccdNumber: '001234567891',
    status: 'processing',
    approvalStatus: 'pending',
    publicStatus: 'unpublished',
    isDeleted: false,
  },
  {
    id: 3,
    condition: 'Không sửa',
    recordCode: 'HTD-2025-001236',
    fullName: 'Lê Văn C',
    birthDate: '10/12/1992',
    cccdNumber: '001234567892',
    status: 'processed',
    approvalStatus: 'pending',
    publicStatus: 'unpublished',
    isDeleted: false,
  },
];

export function MasterDataUpdateReviewTab() {
  const [activeTab, setActiveTab] = useState<TabType>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<DataRecord | null>(null);
  const [data, setData] = useState<DataRecord[]>(mockData);
  const [selectedRecords, setSelectedRecords] = useState<Set<number>>(new Set());

  // Statistics
  const totalRecords = data.filter(r => !r.isDeleted).length;
  const approvedRecords = data.filter(r => !r.isDeleted && r.approvalStatus === 'approved').length;
  const pendingRecords = data.filter(r => !r.isDeleted && r.approvalStatus === 'pending').length;
  const publishedRecords = data.filter(r => !r.isDeleted && r.publicStatus === 'published').length;
  const unpublishedRecords = data.filter(r => !r.isDeleted && r.publicStatus === 'unpublished').length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(data.filter(r => !r.isDeleted).map(r => r.id));
      setSelectedRecords(allIds);
    } else {
      setSelectedRecords(new Set());
    }
  };

  const handleSelectRecord = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedRecords);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRecords(newSelected);
  };

  const handleSendApproval = () => {
    if (selectedRecords.size === 0) {
      alert('Vui lòng chọn ít nhất một bản ghi');
      return;
    }
    const confirmed = window.confirm(`Bạn có chắc muốn gửi ${selectedRecords.size} bản ghi đi phê duyệt?`);
    if (confirmed) {
      const updatedData = data.map(record => {
        if (selectedRecords.has(record.id) && !record.isDeleted) {
          return { ...record, approvalStatus: 'pending' as const };
        }
        return record;
      });
      setData(updatedData);
      setSelectedRecords(new Set());
      alert('Đã gửi phê duyệt thành công');
    }
  };

  const handlePublish = () => {
    if (selectedRecords.size === 0) {
      alert('Vui lòng chọn ít nhất một bản ghi');
      return;
    }
    const confirmed = window.confirm(`Bạn có chắc muốn công khai ${selectedRecords.size} bản ghi?`);
    if (confirmed) {
      const updatedData = data.map(record => {
        if (selectedRecords.has(record.id) && !record.isDeleted && record.approvalStatus === 'approved') {
          return { ...record, publicStatus: 'published' as const };
        }
        return record;
      });
      setData(updatedData);
      setSelectedRecords(new Set());
      alert('Đã công khai thành công');
    }
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm('Bạn có chắc muốn xóa bản ghi này?');
    if (confirmed) {
      const updatedData = data.map(record => {
        if (record.id === id) {
          return { ...record, isDeleted: true };
        }
        return record;
      });
      setData(updatedData);
      alert('Đã xóa bản ghi thành công');
    }
  };

  const handleRestore = (id: number) => {
    const confirmed = window.confirm('Bạn có chắc muốn khôi phục bản ghi này?');
    if (confirmed) {
      const updatedData = data.map(record => {
        if (record.id === id) {
          return { ...record, isDeleted: false };
        }
        return record;
      });
      setData(updatedData);
      alert('Đã khôi phục bản ghi thành công');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'processing':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processed':
        return 'Đã xử lý';
      case 'processing':
        return 'Đang xử lý';
      default:
        return status;
    }
  };

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'pending':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'rejected':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getApprovalStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Đã duyệt';
      case 'pending':
        return 'Đang chờ duyệt';
      case 'rejected':
        return 'Đã từ chối';
      default:
        return status;
    }
  };

  const getPublicStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'unpublished':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getPublicStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Đã xuất bản';
      case 'unpublished':
        return 'Chưa xuất bản';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-sm text-slate-600">Tổng số bản ghi</div>
          <div className="text-2xl font-semibold text-slate-900 mt-1">{totalRecords}</div>
        </div>
        <div className="bg-white border border-green-200 rounded-lg p-4">
          <div className="text-sm text-green-600">Đã phê duyệt</div>
          <div className="text-2xl font-semibold text-green-700 mt-1">{approvedRecords}</div>
        </div>
        <div className="bg-white border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-600">Chưa phê duyệt</div>
          <div className="text-2xl font-semibold text-blue-700 mt-1">{pendingRecords}</div>
        </div>
        <div className="bg-white border border-green-200 rounded-lg p-4">
          <div className="text-sm text-green-600">Đã công khai</div>
          <div className="text-2xl font-semibold text-green-700 mt-1">{publishedRecords}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-sm text-slate-600">Chưa công khai</div>
          <div className="text-2xl font-semibold text-slate-700 mt-1">{unpublishedRecords}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-slate-200 rounded-lg">
        <div className="border-b border-slate-200">
          <div className="flex gap-6 px-6">
            <button
              onClick={() => setActiveTab('list')}
              className={`flex items-center gap-2 pb-3 pt-4 px-2 border-b-2 transition-colors ${
                activeTab === 'list'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Danh sách dữ liệu
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className={`flex items-center gap-2 pb-3 pt-4 px-2 border-b-2 transition-colors ${
                activeTab === 'config'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Cấu hình xử lý dữ liệu
            </button>
            <button
              onClick={() => setActiveTab('warning')}
              className={`flex items-center gap-2 pb-3 pt-4 px-2 border-b-2 transition-colors ${
                activeTab === 'warning'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Danh sách dữ liệu cảnh báo
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 pb-3 pt-4 px-2 border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Lịch sử xử lý
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'list' && (
          <div>
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-200 space-y-3">
              {/* Action buttons when records are selected */}
              {selectedRecords.size > 0 && (
                <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <span className="text-sm text-purple-900">
                    Đã chọn {selectedRecords.size} bản ghi
                  </span>
                  <button
                    onClick={handleSendApproval}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    Gửi phê duyệt
                  </button>
                  <button
                    onClick={handlePublish}
                    className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    <Globe className="w-4 h-4" />
                    Công khai
                  </button>
                  <button
                    onClick={() => setSelectedRecords(new Set())}
                    className="ml-auto text-sm text-purple-700 hover:text-purple-900 underline"
                  >
                    Bỏ chọn tất cả
                  </button>
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                  <Filter className="w-4 h-4" />
                  Tìm kiếm nâng cao
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                  <Upload className="w-4 h-4" />
                  Nhập
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <Download className="w-4 h-4" />
                  Xuất
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRecords.size === data.filter(r => !r.isDeleted).length && data.filter(r => !r.isDeleted).length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-2 focus:ring-purple-500"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">STT</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Tình trạng</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Mã bản ghi</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Họ và tên</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Ngày sinh</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Số CCCD</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Trạng thái XL</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Phê duyệt</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Công khai</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {data.filter(r => !r.isDeleted).map((record, index) => (
                    <tr key={record.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRecords.has(record.id)}
                          onChange={(e) => handleSelectRecord(record.id, e.target.checked)}
                          className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-2 focus:ring-purple-500"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900">{index + 1}</td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-slate-600">{record.condition}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900">{record.recordCode}</td>
                      <td className="px-4 py-3 text-sm text-slate-900">{record.fullName}</td>
                      <td className="px-4 py-3 text-sm text-slate-900">{record.birthDate}</td>
                      <td className="px-4 py-3 text-sm text-slate-900">{record.cccdNumber}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs rounded border ${getStatusColor(record.status)}`}>
                          {getStatusText(record.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs rounded border ${getApprovalStatusColor(record.approvalStatus)}`}>
                          {getApprovalStatusText(record.approvalStatus)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs rounded border ${getPublicStatusColor(record.publicStatus)}`}>
                          {getPublicStatusText(record.publicStatus)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            onClick={() => setSelectedRecord(record)}
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {record.isDeleted ? (
                            <button
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                              onClick={() => handleRestore(record.id)}
                              title="Khôi phục"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              onClick={() => handleDelete(record.id)}
                              title="Xóa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="p-6">
            <h3 className="text-slate-900 mb-4">Cấu hình xử lý dữ liệu</h3>
            <p className="text-slate-600">Nội dung cấu hình xử lý dữ liệu...</p>
          </div>
        )}

        {activeTab === 'warning' && (
          <div className="p-6">
            <h3 className="text-slate-900 mb-4">Danh sách dữ liệu cảnh báo</h3>
            <p className="text-slate-600">Nội dung danh sách cảnh báo...</p>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="p-6">
            <h3 className="text-slate-900 mb-4">Lịch sử xử lý</h3>
            <p className="text-slate-600">Nội dung lịch sử xử lý...</p>
          </div>
        )}
      </div>

      {/* Data Detail Modal */}
      {selectedRecord && (
        <DataDetailModal
          isOpen={!!selectedRecord}
          onClose={() => setSelectedRecord(null)}
          data={{
            recordCode: selectedRecord.recordCode,
            fullName: selectedRecord.fullName,
            birthDate: selectedRecord.birthDate,
            cccdNumber: selectedRecord.cccdNumber,
            status: getStatusText(selectedRecord.status),
          }}
          fields={[
            { label: 'Mã bản ghi', key: 'recordCode' },
            { label: 'Họ và tên', key: 'fullName' },
            { label: 'Ngày sinh', key: 'birthDate' },
            { label: 'Số CCCD', key: 'cccdNumber' },
            { label: 'Trạng thái', key: 'status' },
          ]}
          title={`Chi tiết Dữ liệu Hồ tích điện tử`}
          mode="merge"
        />
      )}
    </div>
  );
}