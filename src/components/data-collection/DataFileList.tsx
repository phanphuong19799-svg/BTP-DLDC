import { useState } from 'react';
import { FileText, Eye, CheckCircle, FileSpreadsheet, Table } from 'lucide-react';
import { DataTableViewer } from './DataTableViewer';

interface DataFile {
  id: string;
  title: string;
  sourceCode: string;
  documentCode: string;
  receiveTime: string;
  receiveDate: string;
  fileSize: string;
  dataType: string;
  nextStep: string;
  format: 'JSON' | 'XML';
  recordCount: number;
  status: 'received' | 'processing' | 'completed';
}

const mockFiles: DataFile[] = [
  {
    id: '1',
    title: 'Hộ tịch điện tử',
    sourceCode: 'SBC-HT-001',
    documentCode: 'TKN 22031207012344',
    receiveTime: '10:30:16',
    receiveDate: '07/12/2025',
    fileSize: '12.5 MB',
    dataType: 'Hộ tịch Đăng ký Khai sinh',
    nextStep: 'Đang chờ kiểm tra',
    format: 'JSON',
    recordCount: 2345,
    status: 'received',
  },
  {
    id: '2',
    title: 'Thi hành án dân sự',
    sourceCode: 'SBC-ThuCS-002',
    documentCode: 'TKN 22031207012313',
    receiveTime: '10:25:12',
    receiveDate: '07/12/2025',
    fileSize: '8.3 MB',
    dataType: 'Hồ sơ thi hành án',
    nextStep: 'Đang kiểm tra',
    format: 'XML',
    recordCount: 1892,
    status: 'received',
  },
  {
    id: '3',
    title: 'Hộ sơ quốc tịch',
    sourceCode: 'SBC-GĐ-003',
    documentCode: 'TKN 22031207012346',
    receiveTime: '10:20:06',
    receiveDate: '07/12/2025',
    fileSize: '2.1 MB',
    dataType: 'Hồ sơ cấp quốc tịch',
    nextStep: 'Đã hoàn tất',
    format: 'JSON',
    recordCount: 456,
    status: 'completed',
  },
  {
    id: '4',
    title: 'Công chứng',
    sourceCode: 'SBC-CC-004',
    documentCode: 'TKN 22031207012317',
    receiveTime: '10:15:45',
    receiveDate: '07/12/2025',
    fileSize: '5.7 MB',
    dataType: 'Hợp đồng công chứng',
    nextStep: 'Đang tiếp nhận',
    format: 'JSON',
    recordCount: 892,
    status: 'processing',
  },
];

export function DataFileList() {
  const [files] = useState<DataFile[]>(mockFiles);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<DataFile | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'received':
        return (
          <span className="px-3 py-1 bg-green-50 text-green-700 rounded text-xs border border-green-200">
            Đã tiếp nhận
          </span>
        );
      case 'processing':
        return (
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-xs border border-blue-200">
            Đang xử lý
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded text-xs border border-purple-200">
            Hoàn tất
          </span>
        );
      default:
        return null;
    }
  };

  const getFormatBadge = (format: string) => {
    return format === 'JSON' ? (
      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-mono">JSON</span>
    ) : (
      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-mono">XML</span>
    );
  };

  const handleViewTable = (file: DataFile) => {
    setSelectedFile(file);
    setViewerOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-white rounded-lg border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 mb-1">{file.title}</h3>
                    <div className="space-y-1">
                      <p className="text-sm text-slate-600">
                        Mã nguồn: <span className="text-slate-900">{file.sourceCode}</span>
                      </p>
                      <p className="text-sm text-slate-600">
                        Mã giấy dịch: <span className="text-slate-900">{file.documentCode}</span>
                      </p>
                    </div>
                  </div>
                </div>
                {getStatusBadge(file.status)}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-4 gap-6 mb-4">
                {/* Column 1 */}
                <div>
                  <p className="text-xs text-slate-500 mb-1">Thời gian tiếp nhận</p>
                  <p className="text-sm text-slate-900">
                    {file.receiveTime} - {file.receiveDate}
                  </p>
                  <p className="text-xs text-slate-500 mt-3 mb-1">Dung lượng</p>
                  <p className="text-sm text-slate-900">{file.fileSize}</p>
                </div>

                {/* Column 2 */}
                <div>
                  <p className="text-xs text-slate-500 mb-1">Loại dữ liệu</p>
                  <button className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                    {file.dataType}
                  </button>
                  <p className="text-xs text-slate-500 mt-3 mb-1">Bước tiếp theo</p>
                  <button className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                    {file.nextStep}
                  </button>
                </div>

                {/* Column 3 */}
                <div>
                  <p className="text-xs text-slate-500 mb-1">Định dạng</p>
                  <div>{getFormatBadge(file.format)}</div>
                </div>

                {/* Column 4 */}
                <div>
                  <p className="text-xs text-slate-500 mb-1">Số bản ghi</p>
                  <p className="text-sm text-slate-900">{file.recordCount.toLocaleString()}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                {/* Show "Xem bảng dữ liệu" button if status is received or completed */}
                {(file.status === 'received' || file.status === 'completed') && (
                  <button
                    onClick={() => handleViewTable(file)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Table className="w-4 h-4" />
                    Xem bảng dữ liệu
                  </button>
                )}
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Eye className="w-4 h-4" />
                  Xem chi tiết
                </button>
                <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                  Kiểm tra ngay
                </button>
                <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                  Xem log
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Data Table Viewer Modal */}
      {selectedFile && (
        <DataTableViewer
          isOpen={viewerOpen}
          onClose={() => {
            setViewerOpen(false);
            setSelectedFile(null);
          }}
          fileTitle={selectedFile.title}
          dataType={selectedFile.dataType}
        />
      )}
    </>
  );
}