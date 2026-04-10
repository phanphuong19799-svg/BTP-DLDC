import { useState, type FormEvent } from 'react';
import { 
  X, FileText, Database, Plug, Shield, Upload, 
  AlertCircle, Server, Globe, Lock, Share2 
} from 'lucide-react';

interface AddProvisionServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'general' | 'data' | 'connection' | 'policy';

export function AddProvisionServiceModal({ isOpen, onClose }: AddProvisionServiceModalProps) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [sharingPlatform, setSharingPlatform] = useState('lgsp');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Thêm mới dịch vụ cung cấp API thành công!');
    onClose();
  };

  const tabs = [
    { id: 'general' as TabType, label: 'Thông tin chung', icon: <FileText className="w-4 h-4" /> },
    { id: 'data' as TabType, label: 'Cấu hình dữ liệu chia sẻ', icon: <Database className="w-4 h-4" /> },
    { id: 'connection' as TabType, label: 'Cấu hình kết nối API', icon: <Plug className="w-4 h-4" /> },
    { id: 'policy' as TabType, label: 'Chính sách & Phê duyệt', icon: <Shield className="w-4 h-4" /> },
  ];

  const tableFields: Record<string, Array<{id: string, label: string}>> = {
    congchung: [
      { id: 'soCongChung', label: 'Số công chứng' },
      { id: 'ngayCongChung', label: 'Ngày công chứng' },
      { id: 'loaiHopDong', label: 'Loại hợp đồng' },
      { id: 'noiDungHopDong', label: 'Nội dung hợp đồng' },
      { id: 'giaTriHopDong', label: 'Giá trị hợp đồng' }
    ],
    dkkd: [
      { id: 'maSoDKKD', label: 'Mã số ĐKKD' },
      { id: 'tenDoanhNghiep', label: 'Tên doanh nghiệp' },
      { id: 'loaiHinhDN', label: 'Loại hình doanh nghiệp' },
      { id: 'nguoiDaiDien', label: 'Người đại diện' },
      { id: 'diaChiTruSo', label: 'Địa chỉ trụ sở' }
    ],
  };

  const currentFields = tableFields[selectedTable] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg text-slate-900 font-medium">Thiết lập kết nối chia sẻ dữ liệu</h2>
            <p className="text-sm text-slate-500">Thông tin cấu hình API gửi lên LGSP/NDXP</p>
          </div>
          <button onClick={onClose} title="Đóng" className="p-1 hover:bg-slate-100 rounded transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="border-b border-slate-200 bg-slate-50">
          <div className="flex gap-1 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm transition-colors relative flex items-center gap-2 ${
                  activeTab === tab.id ? 'text-blue-600 bg-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-6">
            {activeTab === 'general' && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">Tên API/Dịch vụ <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="VD: API Tra cứu đăng ký kinh doanh" required />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">Mã dịch vụ <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="VD: API_DKKD_01" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Phạm vi nền tảng chia sẻ <span className="text-red-500">*</span></label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="sharingPlatform" 
                        value="lgsp" 
                        checked={sharingPlatform === 'lgsp'} 
                        onChange={(e) => setSharingPlatform(e.target.value)}
                        className="w-4 h-4 text-blue-600" 
                      />
                      <span className="text-sm text-slate-700">Trong ngành (qua nền tảng chia sẻ LGSP)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="sharingPlatform" 
                        value="ndxp" 
                        checked={sharingPlatform === 'ndxp'} 
                        onChange={(e) => setSharingPlatform(e.target.value)}
                        className="w-4 h-4 text-blue-600" 
                      />
                      <span className="text-sm text-slate-700">Ngoài ngành (qua nền tảng chia sẻ NDXP)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="sharingPlatform" 
                        value="both" 
                        checked={sharingPlatform === 'both'} 
                        onChange={(e) => setSharingPlatform(e.target.value)}
                        className="w-4 h-4 text-blue-600" 
                      />
                      <span className="text-sm text-slate-700">Cả LGSP và NDXP</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-1">Mô tả mục đích chia sẻ</label>
                  <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Mô tả cho tiết về mục đích sử dụng..." />
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Tài liệu đính kèm (Căn cứ pháp lý, tài liệu đặc tả)</label>
                  <div className="border border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-sm font-medium text-slate-700 mb-1">Click để tải lên tài liệu</p>
                    <p className="text-xs text-slate-500">Định dạng hỗ trợ: PDF, DOCX (Tối đa 10MB)</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">1. Chọn CSDL / Nguồn dữ liệu</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-md"
                    value={selectedTable}
                    onChange={(e) => {
                      setSelectedTable(e.target.value);
                      setSelectedFields([]);
                    }}
                  >
                    <option value="">-- Chọn danh mục chia sẻ --</option>
                    <option value="congchung">CSDL Công chứng</option>
                    <option value="dkkd">CSDL Đăng ký kinh doanh</option>
                  </select>
                </div>

                {selectedTable && currentFields.length > 0 && (
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-700">2. Cấu hình các trường dữ liệu hợp lệ (sẽ gọi ra ngoài)</label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input 
                          type="checkbox" 
                          checked={selectedFields.length === currentFields.length}
                          onChange={(e) => {
                            if(e.target.checked) setSelectedFields(currentFields.map(f => f.id));
                            else setSelectedFields([]);
                          }}
                          className="w-4 h-4 text-blue-600 rounded" 
                        />
                        Chọn tất cả trường
                      </label>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 grid grid-cols-2 md:grid-cols-3 gap-3">
                      {currentFields.map(field => (
                        <label key={field.id} className="flex items-center gap-2 cursor-pointer bg-white p-2 border border-slate-200 rounded text-sm hover:border-blue-300 transition-colors">
                          <input 
                            type="checkbox" 
                            checked={selectedFields.includes(field.id)}
                            onChange={(e) => {
                              const newFields = e.target.checked 
                                ? [...selectedFields, field.id]
                                : selectedFields.filter(f => f !== field.id);
                              setSelectedFields(newFields);
                            }}
                            className="w-4 h-4 text-blue-600 rounded" 
                          />
                          {field.label}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">Định dạng trả về</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                      <option value="json">JSON (Khuyên dùng)</option>
                      <option value="xml">XML</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">Phương thức chia sẻ</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                      <option value="passive">API thụ động (Passive - Client gọi)</option>
                      <option value="active">Chủ động gửi (Push API)</option>
                      <option value="file">Chia sẻ theo File (Batch)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'connection' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">Giao thức</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                      <option value="rest">REST API</option>
                      <option value="soap">SOAP</option>
                      <option value="graphql">GraphQL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">HTTP Method</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                      <option value="get">GET (Lấy dữ liệu)</option>
                      <option value="post">POST (Tạo/Lấy dữ liệu có tham số phức tạp)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-1">Endpoint Route chuẩn hóa</label>
                  <div className="flex bg-slate-50 border border-slate-300 rounded-lg overflow-hidden">
                    <span className="px-3 py-2 bg-slate-100 border-r border-slate-300 text-slate-500 text-sm whitespace-nowrap font-mono flex items-center">
                      <Server className="w-3.5 h-3.5 mr-1" />
                      https://lgsp.moj.gov.vn/dldc/v1/
                    </span>
                    <input type="text" className="w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-blue-700" placeholder="api-code-endpoint" defaultValue="API_DKKD_01" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3 border-b border-slate-200 pb-2">Cấu hình bảo mật & Giới hạn</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-700 mb-1 flex items-center gap-1"><Lock className="w-3.5 h-3.5"/> Xác thực (Authentication)</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                        <option value="api-key">API Key (Qua header: x-api-key)</option>
                        <option value="oauth2">OAuth2 (SSO Bộ Tư Pháp)</option>
                        <option value="jwt">JWT Bearer Token</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-slate-700 mb-1">Rate Limit (Giới hạn truy cập)</label>
                      <div className="flex items-center gap-2">
                        <input type="number" defaultValue="1000" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                        <span className="text-sm text-slate-500 whitespace-nowrap">Requests / Phút</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'policy' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Phạm vi truy cập API</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className="border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 relative flex flex-col gap-2 bg-white">
                      <input type="radio" name="accessScope" value="public" className="absolute top-4 right-4" />
                      <Globe className="w-5 h-5 text-green-500" />
                      <div className="font-medium text-slate-900 text-sm">Công khai (Public)</div>
                      <div className="text-xs text-slate-500">Bất kỳ đơn vị nào cũng có thể gọi API mà không cần tạo key riêng.</div>
                    </label>
                    <label className="border border-blue-500 ring-1 ring-blue-500 rounded-lg p-4 cursor-pointer relative flex flex-col gap-2 bg-blue-50/30">
                      <input type="radio" name="accessScope" value="approval" className="absolute top-4 right-4" defaultChecked />
                      <Lock className="w-5 h-5 text-blue-500" />
                      <div className="font-medium text-blue-900 text-sm">Yêu cầu phê duyệt</div>
                      <div className="text-xs text-slate-500">Đơn vị nhận phải request cấp quyền. Trạng thái mặc định: Pending.</div>
                    </label>
                    <label className="border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 relative flex flex-col gap-2 bg-white">
                      <input type="radio" name="accessScope" value="restricted" className="absolute top-4 right-4" />
                      <Share2 className="w-5 h-5 text-purple-500" />
                      <div className="font-medium text-slate-900 text-sm">Nội bộ / Giới hạn</div>
                      <div className="text-xs text-slate-500">Chỉ chia sẻ cho danh sách đơn vị cấu hình sẵn bên dưới. Không public.</div>
                    </label>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-slate-900 mb-2 flex items-center gap-1.5"><AlertCircle className="w-4 h-4 text-amber-500"/> Chú ý về quy trình</h4>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                    <li>Sau khi tạo, Service mới sẽ ở trạng thái <strong>Chưa hoạt động</strong>.</li>
                    <li>Nhiệm vụ này cần được lãnh đạo <strong>Phê duyệt xuất bản</strong> để kích hoạt cấu hình lên hệ thống LGSP/NDXP.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 sticky bottom-0">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Hủy</button>
            <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium">Lưu cấu hình</button>
          </div>
        </form>
      </div>
    </div>
  );
}
