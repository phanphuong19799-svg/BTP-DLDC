import { useState } from 'react';
import { CheckCircle, XCircle, Clock, History as HistoryIcon, Layers, Globe, Eye, Edit, MessageSquare, ChevronDown, ChevronUp, Calendar, User, FileText, AlertCircle, Tag, ClipboardCheck } from 'lucide-react';
import { MasterDataUpdateReviewTab } from './MasterDataUpdateReviewTab';

type SubTabType = 'review' | 'approval' | 'history' | 'version' | 'publish';
type ReviewStatus = 'pending' | 'approved' | 'rejected';
type PublishStatus = 'draft' | 'published' | 'unpublished';

interface ReviewRecord {
  id: string;
  entityCode: string;
  entityName: string;
  changeType: 'create' | 'update' | 'delete';
  submittedBy: string;
  submittedDate: string;
  status: ReviewStatus;
  changes: string;
  reviewedBy?: string;
  reviewedDate?: string;
  reviewComment?: string;
}

interface HistoryRecord {
  id: string;
  entityCode: string;
  entityName: string;
  changeType: 'create' | 'update' | 'delete' | 'publish' | 'unpublish';
  changedBy: string;
  changedDate: string;
  version: string;
  description: string;
  details: string;
}

interface VersionRecord {
  id: string;
  entityCode: string;
  entityName: string;
  version: string;
  status: 'current' | 'previous' | 'draft';
  createdBy: string;
  createdDate: string;
  description: string;
  attributesCount: number;
  recordsCount: number;
}

interface PublishRecord {
  id: string;
  entityCode: string;
  entityName: string;
  version: string;
  publishStatus: PublishStatus;
  visibility: 'public' | 'restricted';
  publishedBy?: string;
  publishedDate?: string;
  accessCount: number;
  lastAccessDate?: string;
}

const mockReviewRecords: ReviewRecord[] = [
  {
    id: 'r1',
    entityCode: 'MD-CITIZEN-001',
    entityName: 'Bộ dữ liệu chủ Công dân',
    changeType: 'update',
    submittedBy: 'Nguyễn Văn A',
    submittedDate: '22/12/2024 15:30',
    status: 'pending',
    changes: 'Cập nhật 3 thuộc tính: thêm trường "email_verified", sửa độ dài trường "phone_number", xóa trường "fax_number"'
  },
  {
    id: 'r2',
    entityCode: 'MD-ORG-001',
    entityName: 'Bộ dữ liệu chủ Tổ chức',
    changeType: 'update',
    submittedBy: 'Trần Thị B',
    submittedDate: '20/12/2024 10:15',
    status: 'approved',
    changes: 'Thêm quan hệ với "Bộ dữ liệu chủ Địa chỉ", cập nhật quy tắc hợp nhất',
    reviewedBy: 'Phó Cục trưởng Nguyễn Xuân D',
    reviewedDate: '21/12/2024 09:00',
    reviewComment: 'Các thay đổi hợp lý, phù hợp với yêu cầu nghiệp vụ. Phê duyệt.'
  },
  {
    id: 'r3',
    entityCode: 'MD-ADMIN-001',
    entityName: 'Bộ dữ liệu chủ Đơn vị hành chính',
    changeType: 'delete',
    submittedBy: 'Phạm Thị D',
    submittedDate: '18/12/2024 14:00',
    status: 'rejected',
    changes: 'Xóa thuộc tính "old_code" khỏi cấu trúc',
    reviewedBy: 'Phó Cục trưởng Nguyễn Xuân D',
    reviewedDate: '19/12/2024 11:30',
    reviewComment: 'Thuộc tính "old_code" vẫn được sử dụng trong hệ thống kế thừa. Không thể xóa. Vui lòng đánh dấu deprecated thay vì xóa.'
  }
];

const mockHistoryRecords: HistoryRecord[] = [
  {
    id: 'h1',
    entityCode: 'MD-CITIZEN-001',
    entityName: 'Bộ dữ liệu chủ Công dân',
    changeType: 'publish',
    changedBy: 'Nguyễn Văn A',
    changedDate: '21/12/2024 16:45',
    version: 'v2.1.0',
    description: 'Công khai phiên bản mới với cải tiến xác thực email',
    details: 'Thêm trường email_verified, cập nhật API endpoint'
  },
  {
    id: 'h2',
    entityCode: 'MD-ORG-001',
    entityName: 'Bộ dữ liệu chủ Tổ chức',
    changeType: 'update',
    changedBy: 'Trần Thị B',
    changedDate: '20/12/2024 14:20',
    version: 'v1.5.2',
    description: 'Cập nhật cấu trúc dữ liệu và quan hệ',
    details: 'Thêm quan hệ với MD-ADDR-001, cập nhật 2 quy tắc hợp nhất'
  },
  {
    id: 'h3',
    entityCode: 'MD-DOC-001',
    entityName: 'Bộ dữ liệu chủ Văn bản pháp luật',
    changeType: 'create',
    changedBy: 'Lê Văn C',
    changedDate: '15/12/2024 10:00',
    version: 'v1.0.0',
    description: 'Khởi tạo dữ liệu chủ văn bản pháp luật',
    details: 'Tạo mới với 20 thuộc tính, 4 quy tắc hợp nhất, 3 quan hệ'
  },
  {
    id: 'h4',
    entityCode: 'MD-CITIZEN-001',
    entityName: 'Bộ dữ liệu chủ Công dân',
    changeType: 'update',
    changedBy: 'Nguyễn Văn A',
    changedDate: '10/12/2024 09:15',
    version: 'v2.0.0',
    description: 'Nâng cấp lên phiên bản 2.0',
    details: 'Thêm 5 thuộc tính mới theo Luật CCCD 2023, cập nhật quy tắc định danh'
  }
];

const mockVersionRecords: VersionRecord[] = [
  {
    id: 'v1',
    entityCode: 'MD-CITIZEN-001',
    entityName: 'Bộ dữ liệu chủ Công dân',
    version: 'v2.1.0',
    status: 'current',
    createdBy: 'Nguyễn Văn A',
    createdDate: '21/12/2024',
    description: 'Bổ sung xác thực email và cải tiến bảo mật',
    attributesCount: 18,
    recordsCount: 15420
  },
  {
    id: 'v2',
    entityCode: 'MD-CITIZEN-001',
    entityName: 'Bộ dữ liệu chủ Công dân',
    version: 'v2.0.0',
    status: 'previous',
    createdBy: 'Nguyễn Văn A',
    createdDate: '10/12/2024',
    description: 'Nâng cấp theo Luật CCCD 2023',
    attributesCount: 17,
    recordsCount: 14850
  },
  {
    id: 'v3',
    entityCode: 'MD-ORG-001',
    entityName: 'Bộ dữ liệu chủ Tổ chức',
    version: 'v1.5.2',
    status: 'current',
    createdBy: 'Trần Thị B',
    createdDate: '20/12/2024',
    description: 'Thêm quan hệ địa chỉ và cập nhật quy tắc',
    attributesCount: 14,
    recordsCount: 8320
  },
  {
    id: 'v4',
    entityCode: 'MD-ORG-001',
    entityName: 'Bộ dữ liệu chủ Tổ chức',
    version: 'v1.6.0-draft',
    status: 'draft',
    createdBy: 'Trần Thị B',
    createdDate: '23/12/2024',
    description: 'Bản nháp: Thêm trường đại diện pháp lý',
    attributesCount: 15,
    recordsCount: 0
  }
];

const mockPublishRecords: PublishRecord[] = [
  {
    id: 'p1',
    entityCode: 'MD-CITIZEN-001',
    entityName: 'Bộ dữ liệu chủ Công dân',
    version: 'v2.1.0',
    publishStatus: 'published',
    visibility: 'public',
    publishedBy: 'Nguyễn Văn A',
    publishedDate: '21/12/2024 17:00',
    accessCount: 2847,
    lastAccessDate: '24/12/2024 14:35'
  },
  {
    id: 'p2',
    entityCode: 'MD-ORG-001',
    entityName: 'Bộ dữ liệu chủ Tổ chức',
    version: 'v1.5.2',
    publishStatus: 'published',
    visibility: 'restricted',
    publishedBy: 'Trần Thị B',
    publishedDate: '20/12/2024 16:30',
    accessCount: 1245,
    lastAccessDate: '24/12/2024 10:20'
  },
  {
    id: 'p3',
    entityCode: 'MD-DOC-001',
    entityName: 'Bộ dữ liệu chủ Văn bản pháp luật',
    version: 'v1.0.0',
    publishStatus: 'published',
    visibility: 'public',
    publishedBy: 'Lê Văn C',
    publishedDate: '16/12/2024 09:20',
    accessCount: 5632,
    lastAccessDate: '24/12/2024 15:10'
  },
  {
    id: 'p4',
    entityCode: 'MD-ADMIN-001',
    entityName: 'Bộ dữ liệu chủ Đơn vị hành chính',
    version: 'v1.2.0',
    publishStatus: 'draft',
    visibility: 'restricted',
    accessCount: 0
  }
];

const changeTypeLabels: Record<string, { label: string; color: string; icon: any }> = {
  create: { label: 'Tạo mới', color: 'bg-green-100 text-green-700', icon: FileText },
  update: { label: 'Cập nhật', color: 'bg-blue-100 text-blue-700', icon: Edit },
  delete: { label: 'Xóa', color: 'bg-red-100 text-red-700', icon: XCircle },
  publish: { label: 'Công khai', color: 'bg-purple-100 text-purple-700', icon: Globe },
  unpublish: { label: 'Gỡ công khai', color: 'bg-orange-100 text-orange-700', icon: Eye }
};

const reviewStatusLabels: Record<ReviewStatus, { label: string; color: string; icon: any }> = {
  pending: { label: 'Chờ rà soát', color: 'bg-amber-100 text-amber-700', icon: Clock },
  approved: { label: 'Đã phê duyệt', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  rejected: { label: 'Từ chối', color: 'bg-red-100 text-red-700', icon: XCircle }
};

const versionStatusLabels: Record<string, { label: string; color: string }> = {
  current: { label: 'Hiện tại', color: 'bg-green-100 text-green-700' },
  previous: { label: 'Phiên bản cũ', color: 'bg-slate-100 text-slate-700' },
  draft: { label: 'Bản nháp', color: 'bg-amber-100 text-amber-700' }
};

const publishStatusLabels: Record<PublishStatus, { label: string; color: string }> = {
  draft: { label: 'Bản nháp', color: 'bg-slate-100 text-slate-700' },
  published: { label: 'Đã công khai', color: 'bg-green-100 text-green-700' },
  unpublished: { label: 'Đã gỡ', color: 'bg-red-100 text-red-700' }
};

interface MasterDataUpdateTabProps {
  initialTab?: SubTabType;
}

export function MasterDataUpdateTab({ initialTab = 'review' }: MasterDataUpdateTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>(initialTab);
  const [reviewRecords, setReviewRecords] = useState<ReviewRecord[]>(mockReviewRecords);
  const [publishRecords, setPublishRecords] = useState<PublishRecord[]>(mockPublishRecords);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject'>('approve');
  const [reviewComment, setReviewComment] = useState('');
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);

  const handleReview = (record: ReviewRecord, action: 'approve' | 'reject') => {
    setSelectedRecord(record);
    setReviewAction(action);
    setReviewComment('');
    setShowReviewModal(true);
  };

  const handleSubmitReview = () => {
    if (!selectedRecord) return;

    if (reviewAction === 'reject' && !reviewComment.trim()) {
      alert('Vui lòng nhập lý do từ chối');
      return;
    }

    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const updatedRecords = reviewRecords.map(r =>
      r.id === selectedRecord.id
        ? {
            ...r,
            status: reviewAction === 'approve' ? 'approved' : 'rejected',
            reviewedBy: 'Phó Cục trưởng Nguyễn Xuân D',
            reviewedDate: dateStr,
            reviewComment: reviewComment
          }
        : r
    );

    setReviewRecords(updatedRecords);
    setShowReviewModal(false);
    setSelectedRecord(null);
    setReviewComment('');

    const actionText = reviewAction === 'approve' ? 'phê duyệt' : 'từ chối';
    alert(`✅ Đã ${actionText} thành công!\n\nThông báo đã được gửi đến "${selectedRecord.submittedBy}".`);
  };

  const handlePublish = (record: PublishRecord) => {
    if (record.publishStatus === 'published') {
      if (!confirm('Bạn có chắc chắn muốn gỡ công khai dữ liệu chủ này?')) return;
      
      const updatedRecords = publishRecords.map(r =>
        r.id === record.id ? { ...r, publishStatus: 'unpublished' as PublishStatus } : r
      );
      setPublishRecords(updatedRecords);
      alert('✅ Đã gỡ công khai thành công!');
    } else {
      if (!confirm(`Bạn có chắc chắn muốn công khai "${record.entityName}" phiên bản ${record.version}?`)) return;
      
      const now = new Date();
      const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const updatedRecords = publishRecords.map(r =>
        r.id === record.id 
          ? { 
              ...r, 
              publishStatus: 'published' as PublishStatus,
              publishedBy: 'Người dùng hiện tại',
              publishedDate: dateStr
            } 
          : r
      );
      setPublishRecords(updatedRecords);
      alert('✅ Đã công khai thành công!');
    }
  };

  const toggleVisibility = (record: PublishRecord) => {
    if (record.publishStatus !== 'published') {
      alert('Chỉ có thể thay đổi phạm vi truy cập của dữ liệu đã công khai');
      return;
    }

    const newVisibility = record.visibility === 'public' ? 'restricted' : 'public';
    const updatedRecords = publishRecords.map(r =>
      r.id === record.id ? { ...r, visibility: newVisibility } : r
    );
    setPublishRecords(updatedRecords);
    
    const visibilityText = newVisibility === 'public' ? 'Công khai' : 'Hạn chế';
    alert(`✅ Đã cập nhật phạm vi truy cập thành "${visibilityText}"!`);
  };

  return (
    <div className="space-y-4">
      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('review')}
          className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors whitespace-nowrap ${
            activeSubTab === 'review'
              ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Eye className="w-4 h-4" />
          Rà soát
        </button>
        <button
          onClick={() => setActiveSubTab('approval')}
          className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors whitespace-nowrap ${
            activeSubTab === 'approval'
              ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          Phê duyệt
        </button>
        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors whitespace-nowrap ${
            activeSubTab === 'history'
              ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <HistoryIcon className="w-4 h-4" />
          Theo dõi lịch sử thay đổi
        </button>
        <button
          onClick={() => setActiveSubTab('version')}
          className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors whitespace-nowrap ${
            activeSubTab === 'version'
              ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          Quản lý phiên bản
        </button>
        <button
          onClick={() => setActiveSubTab('publish')}
          className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors whitespace-nowrap ${
            activeSubTab === 'publish'
              ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Globe className="w-4 h-4" />
          Công khai
        </button>
      </div>

      {/* Sub Tab Content */}
      <div className="mt-4">
        {/* Review Tab (Rà soát - cho Cán bộ) */}
        {activeSubTab === 'review' && (
          <MasterDataUpdateReviewTab userRole="staff" />
        )}

        {/* Approval Tab (Phê duyệt - cho Lãnh đạo) */}
        {activeSubTab === 'approval' && (
          <MasterDataUpdateReviewTab userRole="manager" />
        )}

        {/* History Tab */}
        {activeSubTab === 'history' && (
          <div className="space-y-3">
            {mockHistoryRecords.map((record) => {
              const changeInfo = changeTypeLabels[record.changeType];
              const ChangeIcon = changeInfo.icon;
              const isExpanded = expandedHistory === record.id;

              return (
                <div key={record.id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${changeInfo.color}`}>
                            <ChangeIcon className="w-3 h-3" />
                            {changeInfo.label}
                          </span>
                          <h3 className="text-slate-900">{record.entityName}</h3>
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            <Tag className="w-3 h-3" />
                            {record.version}
                          </span>
                        </div>

                        <p className="text-sm text-slate-700 mb-2">{record.description}</p>

                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {record.changedBy}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {record.changedDate}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedHistory(isExpanded ? null : record.id)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-slate-200 bg-slate-50">
                      <h4 className="text-sm text-slate-900 mb-2">Chi tiết thay đổi:</h4>
                      <p className="text-sm text-slate-700">{record.details}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Version Management Tab */}
        {activeSubTab === 'version' && (
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm text-slate-700">Dữ liệu chủ</th>
                  <th className="text-left px-4 py-3 text-sm text-slate-700">Phiên bản</th>
                  <th className="text-left px-4 py-3 text-sm text-slate-700">Trạng thái</th>
                  <th className="text-left px-4 py-3 text-sm text-slate-700">Thuộc tính</th>
                  <th className="text-left px-4 py-3 text-sm text-slate-700">Bản ghi</th>
                  <th className="text-left px-4 py-3 text-sm text-slate-700">Người tạo</th>
                  <th className="text-left px-4 py-3 text-sm text-slate-700">Ngày tạo</th>
                  <th className="text-right px-4 py-3 text-sm text-slate-700">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {mockVersionRecords.map((record) => {
                  const statusInfo = versionStatusLabels[record.status];
                  return (
                    <tr key={record.id} className="border-t border-slate-200 hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm text-slate-900">{record.entityName}</td>
                      <td className="px-4 py-3">
                        <code className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {record.version}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900">{record.attributesCount}</td>
                      <td className="px-4 py-3 text-sm text-blue-600">
                        {record.recordsCount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{record.createdBy}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{record.createdDate}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {record.status === 'draft' && (
                            <button
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                              title="Kích hoạt"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Publish Tab */}
        {activeSubTab === 'publish' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700">Đã công khai</p>
                    <p className="text-2xl text-green-900 mt-1">
                      {publishRecords.filter(r => r.publishStatus === 'published').length}
                    </p>
                  </div>
                  <Globe className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-700">Bản nháp</p>
                    <p className="text-2xl text-slate-900 mt-1">
                      {publishRecords.filter(r => r.publishStatus === 'draft').length}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-slate-400" />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700">Tổng lượt truy cập</p>
                    <p className="text-2xl text-blue-900 mt-1">
                      {publishRecords.reduce((sum, r) => sum + r.accessCount, 0).toLocaleString()}
                    </p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm text-slate-700">Dữ liệu chủ</th>
                    <th className="text-left px-4 py-3 text-sm text-slate-700">Phiên bản</th>
                    <th className="text-left px-4 py-3 text-sm text-slate-700">Trạng thái</th>
                    <th className="text-left px-4 py-3 text-sm text-slate-700">Phạm vi</th>
                    <th className="text-left px-4 py-3 text-sm text-slate-700">Lượt truy cập</th>
                    <th className="text-left px-4 py-3 text-sm text-slate-700">Công khai lúc</th>
                    <th className="text-right px-4 py-3 text-sm text-slate-700">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {publishRecords.map((record) => {
                    const statusInfo = publishStatusLabels[record.publishStatus];
                    return (
                      <tr key={record.id} className="border-t border-slate-200 hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm text-slate-900">{record.entityName}</td>
                        <td className="px-4 py-3">
                          <code className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {record.version}
                          </code>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {record.publishStatus === 'published' ? (
                            <button
                              onClick={() => toggleVisibility(record)}
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                                record.visibility === 'public'
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                  : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                              }`}
                            >
                              {record.visibility === 'public' ? (
                                <>
                                  <Globe className="w-3 h-3" />
                                  Công khai
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3 h-3" />
                                  Hạn chế
                                </>
                              )}
                            </button>
                          ) : (
                            <span className="text-sm text-slate-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-blue-600">
                          {record.accessCount > 0 ? record.accessCount.toLocaleString() : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {record.publishedDate || '-'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            {record.publishStatus === 'published' ? (
                              <button
                                onClick={() => handlePublish(record)}
                                className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs"
                              >
                                <XCircle className="w-3 h-3" />
                                Gỡ công khai
                              </button>
                            ) : (
                              <button
                                onClick={() => handlePublish(record)}
                                className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-xs"
                              >
                                <Globe className="w-3 h-3" />
                                Công khai
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg text-slate-900">
                {reviewAction === 'approve' ? 'Phê duyệt thay đổi' : 'Từ chối thay đổi'}
              </h3>
              <button onClick={() => setShowReviewModal(false)} className="p-1 hover:bg-slate-100 rounded">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-700 mb-2">
                  <strong>Dữ liệu chủ:</strong> {selectedRecord.entityName}
                </p>
                <p className="text-sm text-slate-700 mb-2">
                  <strong>Thay đổi:</strong> {selectedRecord.changes}
                </p>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">
                  {reviewAction === 'approve' ? 'Nhận xét (tùy chọn)' : 'Lý do từ chối'}
                  {reviewAction === 'reject' && <span className="text-red-600"> *</span>}
                </label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder={
                    reviewAction === 'approve'
                      ? 'Nhập nhận xét của bạn...'
                      : 'Vui lòng nhập lý do từ chối để người gửi có thể chỉnh sửa...'
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {reviewAction === 'approve' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-green-900">
                        Sau khi phê duyệt, thay đổi sẽ được áp dụng vào dữ liệu chủ.
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                        Thông báo sẽ được gửi đến "{selectedRecord.submittedBy}".
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-900">
                        Sau khi từ chối, thay đổi sẽ được trả về để chỉnh sửa.
                      </p>
                      <p className="text-sm text-red-700 mt-1">
                        Thông báo kèm lý do từ chối sẽ được gửi đến "{selectedRecord.submittedBy}".
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitReview}
                className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${
                  reviewAction === 'approve'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {reviewAction === 'approve' ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Xác nhận phê duyệt
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    Xác nhận từ chối
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}