import { useState } from 'react';
import { CheckCircle, XCircle, Clock, FileText, History as HistoryIcon, AlertCircle, Eye, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

type ApprovalStatus = 'pending' | 'approved' | 'rejected';
type DataType = 'standard' | 'reference' | 'transactional';

interface ApprovalRecord {
  id: string;
  code: string;
  name: string;
  dataType: DataType;
  managingAgency: string;
  submittedBy: string;
  submittedDate: string;
  status: ApprovalStatus;
  description: string;
  attributesCount: number;
  mergeRulesCount: number;
  relationshipsCount: number;
  hasIdentifierRule: boolean;
  reviewedBy?: string;
  reviewedDate?: string;
  reviewComment?: string;
  history: ApprovalHistory[];
}

interface ApprovalHistory {
  id: string;
  action: 'submitted' | 'approved' | 'rejected' | 'updated';
  performedBy: string;
  performedDate: string;
  comment?: string;
}

const mockApprovalRecords: ApprovalRecord[] = [
  {
    id: '1',
    code: 'MD-CITIZEN-001',
    name: 'Bộ dữ liệu chủ Công dân',
    dataType: 'standard',
    managingAgency: 'Cục Hộ tịch - Quốc tịch - Chứng thực',
    submittedBy: 'Nguyễn Văn A',
    submittedDate: '20/12/2024 14:30',
    status: 'pending',
    description: 'Dữ liệu chuẩn về công dân Việt Nam bao gồm thông tin cá nhân như họ tên, ngày sinh, số CCCD, nơi cư trú theo quy định của Luật CCCD 2023',
    attributesCount: 15,
    mergeRulesCount: 3,
    relationshipsCount: 2,
    hasIdentifierRule: true,
    history: [
      {
        id: 'h1',
        action: 'submitted',
        performedBy: 'Nguyễn Văn A',
        performedDate: '20/12/2024 14:30',
        comment: 'Gửi phê duyệt bộ dữ liệu chủ Công dân'
      }
    ]
  },
  {
    id: '2',
    code: 'MD-ORG-001',
    name: 'Bộ dữ liệu chủ Tổ chức',
    dataType: 'standard',
    managingAgency: 'Cục Đăng ký kinh doanh',
    submittedBy: 'Trần Thị B',
    submittedDate: '18/12/2024 10:15',
    status: 'pending',
    description: 'Thông tin doanh nghiệp, tổ chức, cơ quan nhà nước bao gồm tên, mã số thuế, địa chỉ, người đại diện',
    attributesCount: 12,
    mergeRulesCount: 2,
    relationshipsCount: 1,
    hasIdentifierRule: true,
    history: [
      {
        id: 'h2',
        action: 'submitted',
        performedBy: 'Trần Thị B',
        performedDate: '18/12/2024 10:15',
        comment: 'Gửi phê duyệt bộ dữ liệu chủ Tổ chức'
      }
    ]
  },
  {
    id: '3',
    code: 'MD-DOC-001',
    name: 'Bộ dữ liệu chủ Văn bản pháp luật',
    dataType: 'reference',
    managingAgency: 'Bộ Tư pháp',
    submittedBy: 'Lê Văn C',
    submittedDate: '15/12/2024 16:45',
    status: 'approved',
    description: 'Danh mục văn bản pháp luật, nghị định, thông tư, quyết định',
    attributesCount: 20,
    mergeRulesCount: 4,
    relationshipsCount: 3,
    hasIdentifierRule: true,
    reviewedBy: 'Phó Cục trưởng Nguyễn Xuân D',
    reviewedDate: '16/12/2024 09:20',
    reviewComment: 'Đã xem xét kỹ lưỡng. Cấu trúc dữ liệu hợp lý, quy tắc hợp nhất và định danh đầy đủ. Phê duyệt.',
    history: [
      {
        id: 'h3-1',
        action: 'submitted',
        performedBy: 'Lê Văn C',
        performedDate: '15/12/2024 16:45',
        comment: 'Gửi phê duyệt bộ dữ liệu chủ Văn bản pháp luật'
      },
      {
        id: 'h3-2',
        action: 'approved',
        performedBy: 'Phó Cục trưởng Nguyễn Xuân D',
        performedDate: '16/12/2024 09:20',
        comment: 'Đã xem xét kỹ lưỡng. Cấu trúc dữ liệu hợp lý, quy tắc hợp nhất và định danh đầy đủ. Phê duyệt.'
      }
    ]
  },
  {
    id: '4',
    code: 'MD-ADMIN-001',
    name: 'Bộ dữ liệu chủ Đơn vị hành chính',
    dataType: 'reference',
    managingAgency: 'Bộ Nội vụ',
    submittedBy: 'Phạm Thị D',
    submittedDate: '10/12/2024 11:00',
    status: 'rejected',
    description: 'Danh mục 63 tỉnh/thành phố, quận/huyện, phường/xã của Việt Nam',
    attributesCount: 8,
    mergeRulesCount: 1,
    relationshipsCount: 0,
    hasIdentifierRule: false,
    reviewedBy: 'Phó Cục trưởng Nguyễn Xuân D',
    reviewedDate: '11/12/2024 14:30',
    reviewComment: 'Thiếu quy tắc định danh duy nhất. Cần bổ sung quy tắc hợp nhất từ các nguồn khác nhau. Vui lòng hoàn thiện và gửi lại.',
    history: [
      {
        id: 'h4-1',
        action: 'submitted',
        performedBy: 'Phạm Thị D',
        performedDate: '10/12/2024 11:00',
        comment: 'Gửi phê duyệt bộ dữ liệu chủ Đơn vị hành chính'
      },
      {
        id: 'h4-2',
        action: 'rejected',
        performedBy: 'Phó Cục trưởng Nguyễn Xuân D',
        performedDate: '11/12/2024 14:30',
        comment: 'Thiếu quy tắc định danh duy nhất. Cần bổ sung quy tắc hợp nhất từ các nguồn khác nhau. Vui lòng hoàn thiện và gửi lại.'
      }
    ]
  }
];

const dataTypeLabels: Record<DataType, string> = {
  standard: 'Dữ liệu chuẩn',
  reference: 'Dữ liệu tham chiếu',
  transactional: 'Dữ liệu giao dịch'
};

const statusLabels: Record<ApprovalStatus, { label: string; color: string; icon: any }> = {
  pending: { label: 'Chờ phê duyệt', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
  approved: { label: 'Đã phê duyệt', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
  rejected: { label: 'Từ chối', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle }
};

export function ApprovalTab() {
  const [records, setRecords] = useState<ApprovalRecord[]>(mockApprovalRecords);
  const [selectedRecord, setSelectedRecord] = useState<ApprovalRecord | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApprovalForm, setShowApprovalForm] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject'>('approve');
  const [comment, setComment] = useState('');
  const [filterStatus, setFilterStatus] = useState<ApprovalStatus | 'all'>('all');
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);

  const handleViewDetail = (record: ApprovalRecord) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  const handleApprove = (record: ApprovalRecord) => {
    setSelectedRecord(record);
    setApprovalAction('approve');
    setComment('');
    setShowApprovalForm(true);
  };

  const handleReject = (record: ApprovalRecord) => {
    setSelectedRecord(record);
    setApprovalAction('reject');
    setComment('');
    setShowApprovalForm(true);
  };

  const handleSubmitApproval = () => {
    if (!selectedRecord) return;

    if (approvalAction === 'reject' && !comment.trim()) {
      alert('Vui lòng nhập lý do từ chối');
      return;
    }

    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newHistory: ApprovalHistory = {
      id: `h-${Date.now()}`,
      action: approvalAction === 'approve' ? 'approved' : 'rejected',
      performedBy: 'Phó Cục trưởng Nguyễn Xuân D', // Current user
      performedDate: dateStr,
      comment: comment || undefined
    };

    const updatedRecords = records.map(r =>
      r.id === selectedRecord.id
        ? {
          ...r,
          status: approvalAction === 'approve' ? 'approved' : 'rejected',
          reviewedBy: 'Phó Cục trưởng Nguyễn Xuân D',
          reviewedDate: dateStr,
          reviewComment: comment,
          history: [...r.history, newHistory]
        }
        : r
    );

    setRecords(updatedRecords);
    setShowApprovalForm(false);
    setSelectedRecord(null);
    setComment('');

    // Show notification
    const actionText = approvalAction === 'approve' ? 'phê duyệt' : 'từ chối';
    alert(`✅ Đã ${actionText} thành công!\n\nThông báo đã được gửi đến người quản trị "${selectedRecord.submittedBy}".`);
  };

  const filteredRecords = records.filter(r => filterStatus === 'all' || r.status === filterStatus);

  const pendingCount = records.filter(r => r.status === 'pending').length;
  const approvedCount = records.filter(r => r.status === 'approved').length;
  const rejectedCount = records.filter(r => r.status === 'rejected').length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-slate-900">Phê duyệt danh mục</h2>
        <p className="text-sm text-slate-600 mt-1">
          Lãnh đạo nghiệp vụ xem xét và phê duyệt các bộ dữ liệu chủ chờ phê duyệt
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-700">Chờ phê duyệt</p>
              <p className="text-2xl text-amber-900 mt-1">{pendingCount}</p>
            </div>
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700">Đã phê duyệt</p>
              <p className="text-2xl text-green-900 mt-1">{approvedCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700">Từ chối</p>
              <p className="text-2xl text-red-900 mt-1">{rejectedCount}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-700">Trạng thái:</span>
        <div className="flex gap-2">
          <button title="Hành động"
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${filterStatus === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
          >
            Tất cả ({records.length})
          </button>
          <button title="Hành động"
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${filterStatus === 'pending'
                ? 'bg-amber-600 text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
          >
            Chờ phê duyệt ({pendingCount})
          </button>
          <button title="Hành động"
            onClick={() => setFilterStatus('approved')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${filterStatus === 'approved'
                ? 'bg-green-600 text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
          >
            Đã phê duyệt ({approvedCount})
          </button>
          <button title="Hành động"
            onClick={() => setFilterStatus('rejected')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${filterStatus === 'rejected'
                ? 'bg-red-600 text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
          >
            Từ chối ({rejectedCount})
          </button>
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-3">
        {filteredRecords.map((record) => {
          const statusInfo = statusLabels[record.status];
          const StatusIcon = statusInfo.icon;
          const isExpanded = expandedHistory === record.id;

          return (
            <div key={record.id} className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 bg-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-slate-900">{record.name}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs border ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Mã:</span>
                        <span className="text-slate-900">{record.code}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Loại dữ liệu:</span>
                        <span className="text-slate-900">{dataTypeLabels[record.dataType]}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Cơ quan quản lý:</span>
                        <span className="text-slate-900">{record.managingAgency}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Người gửi:</span>
                        <span className="text-slate-900">{record.submittedBy}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Ngày gửi:</span>
                        <span className="text-slate-900">{record.submittedDate}</span>
                      </div>
                    </div>

                    {/* Configuration Summary */}
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1 text-xs text-slate-600">
                        <FileText className="w-3 h-3" />
                        <span>{record.attributesCount} thuộc tính</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-600">
                        <span>•</span>
                        <span>{record.mergeRulesCount} quy tắc hợp nhất</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-600">
                        <span>•</span>
                        <span>{record.relationshipsCount} quan hệ</span>
                      </div>
                      {record.hasIdentifierRule ? (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle className="w-3 h-3" />
                          <span>Có định danh</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-red-600">
                          <XCircle className="w-3 h-3" />
                          <span>Chưa có định danh</span>
                        </div>
                      )}
                    </div>

                    {/* Review Comment */}
                    {record.reviewComment && (
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs text-slate-600 mb-1">
                              Nhận xét của <strong>{record.reviewedBy}</strong> - {record.reviewedDate}
                            </p>
                            <p className="text-sm text-slate-700">{record.reviewComment}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button title="Hành động"
                      onClick={() => handleViewDetail(record)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Xem chi tiết
                    </button>

                    {record.status === 'pending' && (
                      <>
                        <button title="Hành động"
                          onClick={() => handleApprove(record)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Phê duyệt
                        </button>
                        <button title="Hành động"
                          onClick={() => handleReject(record)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          <XCircle className="w-4 h-4" />
                          Từ chối
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* History Toggle */}
              <button title="Hành động"
                onClick={() => setExpandedHistory(isExpanded ? null : record.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border-t border-slate-200 text-sm text-slate-700 transition-colors"
              >
                <HistoryIcon className="w-4 h-4" />
                Lịch sử cập nhật ({record.history.length})
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {/* History Timeline */}
              {isExpanded && (
                <div className="p-4 bg-slate-50 border-t border-slate-200">
                  <div className="space-y-3">
                    {record.history.map((h, index) => (
                      <div key={h.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${h.action === 'approved' ? 'bg-green-100' :
                              h.action === 'rejected' ? 'bg-red-100' :
                                'bg-blue-100'
                            }`}>
                            {h.action === 'approved' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                              h.action === 'rejected' ? <XCircle className="w-4 h-4 text-red-600" /> :
                                <Clock className="w-4 h-4 text-blue-600" />}
                          </div>
                          {index < record.history.length - 1 && (
                            <div className="w-0.5 h-8 bg-slate-300" />
                          )}
                        </div>
                        <div className="flex-1 pb-3">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-sm text-slate-900">
                              {h.action === 'submitted' ? 'Gửi phê duyệt' :
                                h.action === 'approved' ? 'Đã phê duyệt' :
                                  h.action === 'rejected' ? 'Từ chối' : 'Cập nhật'}
                            </span>
                            <span className="text-xs text-slate-500">• {h.performedDate}</span>
                          </div>
                          <p className="text-sm text-slate-700 mb-1">Bởi: <strong>{h.performedBy}</strong></p>
                          {h.comment && (
                            <p className="text-sm text-slate-600 bg-white border border-slate-200 rounded p-2 mt-2">
                              {h.comment}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredRecords.length === 0 && (
          <div className="border border-slate-200 rounded-lg p-16 text-center">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Không có dữ liệu chủ nào trong trạng thái này</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
              <h3 className="text-lg text-slate-900">Chi tiết dữ liệu chủ</h3>
              <button title="Hành động" onClick={() => setShowDetailModal(false)} className="p-1 hover:bg-slate-100 rounded">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h4 className="text-sm text-slate-900 mb-3">Thông tin cơ bản</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Mã:</span>
                    <p className="text-slate-900 mt-1">{selectedRecord.code}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Tên dữ liệu chủ:</span>
                    <p className="text-slate-900 mt-1">{selectedRecord.name}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Loại dữ liệu:</span>
                    <p className="text-slate-900 mt-1">{dataTypeLabels[selectedRecord.dataType]}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Cơ quan quản lý:</span>
                    <p className="text-slate-900 mt-1">{selectedRecord.managingAgency}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500">Mô tả:</span>
                    <p className="text-slate-900 mt-1">{selectedRecord.description}</p>
                  </div>
                </div>
              </div>

              {/* Configuration Summary */}
              <div className="border-t border-slate-200 pt-6">
                <h4 className="text-sm text-slate-900 mb-3">Cấu trúc và quy tắc</h4>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-700 mb-1">Thuộc tính</p>
                    <p className="text-2xl text-blue-900">{selectedRecord.attributesCount}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-xs text-green-700 mb-1">Quy tắc hợp nhất</p>
                    <p className="text-2xl text-green-900">{selectedRecord.mergeRulesCount}</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <p className="text-xs text-purple-700 mb-1">Quan hệ</p>
                    <p className="text-2xl text-purple-900">{selectedRecord.relationshipsCount}</p>
                  </div>
                  <div className={`${selectedRecord.hasIdentifierRule ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'} border rounded-lg p-3`}>
                    <p className={`text-xs ${selectedRecord.hasIdentifierRule ? 'text-emerald-700' : 'text-red-700'} mb-1`}>Định danh</p>
                    <p className={`text-sm ${selectedRecord.hasIdentifierRule ? 'text-emerald-900' : 'text-red-900'}`}>
                      {selectedRecord.hasIdentifierRule ? 'Đã thiết lập' : 'Chưa có'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Submission Info */}
              <div className="border-t border-slate-200 pt-6">
                <h4 className="text-sm text-slate-900 mb-3">Thông tin gửi phê duyệt</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Người gửi:</span>
                    <p className="text-slate-900 mt-1">{selectedRecord.submittedBy}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Ngày gửi:</span>
                    <p className="text-slate-900 mt-1">{selectedRecord.submittedDate}</p>
                  </div>
                </div>
              </div>

              {/* Review Info */}
              {selectedRecord.reviewedBy && (
                <div className="border-t border-slate-200 pt-6">
                  <h4 className="text-sm text-slate-900 mb-3">Thông tin phê duyệt</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-slate-500">Người phê duyệt:</span>
                      <p className="text-slate-900 mt-1">{selectedRecord.reviewedBy}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Ngày phê duyệt:</span>
                      <p className="text-slate-900 mt-1">{selectedRecord.reviewedDate}</p>
                    </div>
                  </div>
                  {selectedRecord.reviewComment && (
                    <div>
                      <span className="text-slate-500">Nhận xét:</span>
                      <p className="text-slate-900 mt-1 bg-slate-50 border border-slate-200 rounded p-3">
                        {selectedRecord.reviewComment}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50 sticky bottom-0">
              <button title="Hành động"
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approval Form Modal */}
      {showApprovalForm && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg text-slate-900">
                {approvalAction === 'approve' ? 'Phê duyệt dữ liệu chủ' : 'Từ chối dữ liệu chủ'}
              </h3>
              <button title="Hành động" onClick={() => setShowApprovalForm(false)} className="p-1 hover:bg-slate-100 rounded">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-700 mb-2">
                  <strong>Dữ liệu chủ:</strong> {selectedRecord.name}
                </p>
                <p className="text-sm text-slate-700">
                  <strong>Mã:</strong> {selectedRecord.code}
                </p>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">
                  {approvalAction === 'approve' ? 'Nhận xét (tùy chọn)' : 'Lý do từ chối'}
                  {approvalAction === 'reject' && <span className="text-red-600"> *</span>}
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={
                    approvalAction === 'approve'
                      ? 'Nhập nhận xét của bạn...'
                      : 'Vui lòng nhập lý do từ chối để người quản trị có thể chỉnh sửa...'
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {approvalAction === 'approve' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-green-900">
                        Sau khi phê duyệt, dữ liệu chủ sẽ được kích hoạt và có thể sử dụng trong hệ thống.
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                        Thông báo sẽ được gửi đến người quản trị "{selectedRecord.submittedBy}".
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
                        Sau khi từ chối, dữ liệu chủ sẽ được trả về cho người quản trị để chỉnh sửa.
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
              <button title="Hành động"
                onClick={() => setShowApprovalForm(false)}
                className="px-4 py-2 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button title="Hành động"
                onClick={handleSubmitApproval}
                className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${approvalAction === 'approve'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                  }`}
              >
                {approvalAction === 'approve' ? (
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