import React, { useState, ChangeEvent } from 'react';
import { Search, Filter, Upload, Download, RefreshCw, Database, Server, History as HistoryIcon } from 'lucide-react';
import { ActionIconButton } from './ActionIconButton';
import { AdvancedSearchModal } from './AdvancedSearchModal';
import { ImportDataModal } from './ImportDataModal';
import { DataDetailModal } from './DataDetailModal';
import { APIConnectionManager } from './APIConnectionManager';
import { SyncHistoryTable } from './SyncHistoryTable';
import { TabView } from './TabView';

// Note: History is imported as HistoryIcon to avoid conflict with browser's History API
interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface GenericDataTableProps {
  title: string;
  description: string;
  icon: any;
  iconColor: string;
  columns: Column[];
  data: any[];
  searchFields: { label: string; name: string; type: 'text' | 'select' | 'date'; options?: string[] }[];
  detailFields: { label: string; key: string }[];
  apiEndpoint?: string;
  lastSyncTime?: string;
  onAdd?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (id: number) => void;
  onSync?: () => void;
}

export function GenericDataTable({
  title,
  description,
  icon: Icon,
  iconColor,
  columns,
  data,
  searchFields,
  detailFields,
  apiEndpoint,
  lastSyncTime,
  onAdd,
  onEdit,
  onDelete,
  onSync
}: GenericDataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [filters, setFilters] = useState<any>({});
  const [detailMode, setDetailMode] = useState<'simple' | 'compare' | 'merge'>('simple');

  const itemsPerPage = 10;

  // Filter data based on search term and advanced filters
  const filteredData = data.filter(item => {
    // Basic search
    const matchesSearch = Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Advanced filters
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return String(item[key]).toLowerCase().includes(String(value).toLowerCase());
    });

    return matchesSearch && matchesFilters;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleAdvancedSearch = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleImport = (file: File) => {
    console.log('Importing file:', file.name);
    alert(`Đã nhập file: ${file.name}`);
  };

  const handleExport = () => {
    console.log('Exporting data...');
    alert('Đang xuất dữ liệu...');
  };

  const handleViewDetail = (item: any) => {
    setSelectedItem(item);
    setDetailMode('merge'); // Changed to merge mode to show tabs with data sources
    setShowDetail(true);
  };

  const handleViewDetailSimple = (item: any) => {
    setSelectedItem(item);
    setDetailMode('simple'); // Simple mode for "Xem chi tiết" button
    setShowDetail(true);
  };

  // Data List Tab Content
  const dataListContent = (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Advanced Search */}
        <button
          onClick={() => setShowAdvancedSearch(true)}
          className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Filter className="w-4 h-4" />
          Tìm kiếm nâng cao
        </button>

        {/* Import */}
        <button
          onClick={() => setShowImport(true)}
          className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Upload className="w-4 h-4" />
          Nhập
        </button>

        {/* Export */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Xuất
        </button>

        {/* Sync */}
        {onSync && (
          <button
            onClick={onSync}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Đồng bộ
          </button>
        )}
      </div>

      {/* Active Filters */}
      {Object.keys(filters).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => (
            <span
              key={key}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
            >
              {key}: {String(value)}
              <button
                onClick={() => {
                  const newFilters = { ...filters };
                  delete newFilters[key];
                  setFilters(newFilters);
                }}
                className="hover:text-blue-900"
              >
                ×
              </button>
            </span>
          ))}
          <button
            onClick={() => setFilters({})}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Xóa tất cả
          </button>
        </div>
      )}

      {/* Table */}
      <div className="border border-slate-200 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                  STT
                </th>
                <th className="px-4 py-3 text-center text-xs text-slate-600 uppercase tracking-wider w-24">
                  Tình trạng
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-xs text-slate-600 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {item.originalData && Object.keys(item.originalData).length > 0 ? (
                        <button
                          onClick={() => handleViewDetail(item)}
                          className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                          title="Click để xem thông tin đã sửa"
                        >
                          Đã sửa
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500">Không sửa</span>
                      )}
                    </td>
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4 text-sm text-slate-900">
                        {item[col.key]}
                      </td>
                    ))}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <ActionIconButton action="view" onClick={() => handleViewDetailSimple(item)} title="Xem chi tiết" />
                        {onEdit && (
                          <ActionIconButton action="edit" onClick={() => onEdit(item)} title="Sửa" />
                        )}
                        {onDelete && (
                          <ActionIconButton action="delete" onClick={() => onDelete(item.id)} title="Xóa" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 3}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    Không tìm thấy dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-white">
            <div className="text-sm text-slate-600">
              Hiển thị {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredData.length)} trong tổng số {filteredData.length}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded text-sm ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'border border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Main Tabs */}
      {apiEndpoint ? (
        <TabView
          tabs={[
            { id: 'data', label: 'Danh sách dữ liệu', icon: Database },
            { id: 'api', label: 'Cấu hình kết nối nguồn', icon: Server },
            { id: 'history', label: 'Lịch sử đồng bộ', icon: HistoryIcon }
          ]}
        >
          {/* Tab 1: Data List */}
          {dataListContent}

          {/* Tab 2: API Connection Form */}
          <APIConnectionManager />

          {/* Tab 3: Sync History */}
          <SyncHistoryTable
            records={[
              { 
                id: 1, 
                timestamp: '09/12/2025 14:30:25', 
                status: 'success', 
                recordsAdded: 150, 
                recordsUpdated: 45, 
                recordsFailed: 0, 
                totalRecords: 195, 
                duration: '2.5s' 
              },
              { 
                id: 2, 
                timestamp: '09/12/2025 10:15:10', 
                status: 'success', 
                recordsAdded: 98, 
                recordsUpdated: 32, 
                recordsFailed: 0, 
                totalRecords: 130, 
                duration: '1.8s' 
              },
              { 
                id: 3, 
                timestamp: '08/12/2025 18:45:33', 
                status: 'partial', 
                recordsAdded: 120, 
                recordsUpdated: 28, 
                recordsFailed: 5, 
                totalRecords: 153, 
                duration: '3.2s', 
                message: '5 bản ghi lỗi định dạng',
                errors: [
                  {
                    id: 1,
                    recordId: 'GEN-2025-001234',
                    fieldName: 'Số CCCD',
                    errorType: 'Sai định dạng',
                    errorMessage: 'Số CCCD phải có đúng 12 chữ số',
                    originalValue: '001234567',
                    expectedFormat: '001234567890',
                    timestamp: '08/12/2025 18:45:33'
                  },
                  {
                    id: 2,
                    recordId: 'GEN-2025-001235',
                    fieldName: 'Ngày sinh',
                    errorType: 'Sai định dạng',
                    errorMessage: 'Định dạng ngày không hợp lệ',
                    originalValue: '15/13/1990',
                    expectedFormat: 'DD/MM/YYYY',
                    timestamp: '08/12/2025 18:45:33'
                  },
                  {
                    id: 3,
                    recordId: 'GEN-2025-001236',
                    fieldName: 'Email',
                    errorType: 'Sai định dạng',
                    errorMessage: 'Địa chỉ email không hợp lệ',
                    originalValue: 'user@invalid',
                    expectedFormat: 'user@domain.com',
                    timestamp: '08/12/2025 18:45:33'
                  },
                  {
                    id: 4,
                    recordId: 'GEN-2025-001237',
                    fieldName: 'Số điện thoại',
                    errorType: 'Thiếu dữ liệu',
                    errorMessage: 'Trường bắt buộc không được để trống',
                    originalValue: '',
                    expectedFormat: '0xxxxxxxxx (10 chữ số)',
                    timestamp: '08/12/2025 18:45:33'
                  },
                  {
                    id: 5,
                    recordId: 'GEN-2025-001238',
                    fieldName: 'Mã danh mục',
                    errorType: 'D liệu không tồn tại',
                    errorMessage: 'Mã danh mục không tồn tại trong hệ thống',
                    originalValue: 'DM999',
                    expectedFormat: 'DM001-DM050',
                    timestamp: '08/12/2025 18:45:33'
                  }
                ]
              },
              { 
                id: 4, 
                timestamp: '08/12/2025 14:20:15', 
                status: 'success', 
                recordsAdded: 210, 
                recordsUpdated: 67, 
                recordsFailed: 0, 
                totalRecords: 277, 
                duration: '4.1s' 
              },
              { 
                id: 5, 
                timestamp: '08/12/2025 10:10:05', 
                status: 'success', 
                recordsAdded: 88, 
                recordsUpdated: 19, 
                recordsFailed: 0, 
                totalRecords: 107, 
                duration: '1.5s' 
              },
            ]}
          />
        </TabView>
      ) : (
        // If no API endpoint, just show data list without tabs
        dataListContent
      )}

      {/* Modals */}
      <AdvancedSearchModal
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        onSearch={handleAdvancedSearch}
        fields={searchFields}
      />

      <ImportDataModal
        isOpen={showImport}
        onClose={() => setShowImport(false)}
        onImport={handleImport}
      />

      <DataDetailModal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        data={selectedItem}
        fields={detailFields}
        title={`Chi tiết ${title}`}
        mode={detailMode}
      />
    </div>
  );
}