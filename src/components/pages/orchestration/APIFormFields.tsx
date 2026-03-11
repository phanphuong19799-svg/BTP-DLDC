import { Plus } from 'lucide-react';
import { Trash2, Database, CheckCircle } from 'lucide-react';

interface APIFormFieldsProps {
  formData: any;
  setFormData: (data: any) => void;
  headers: { key: string; value: string }[];
  setHeaders: (headers: { key: string; value: string }[]) => void;
  queryParams: { key: string; value: string }[];
  setQueryParams: (params: { key: string; value: string }[]) => void;
}

// Mock data cho các dịch vụ đã thiết lập
const mockServices = [
  {
    id: '1',
    code: 'DV001',
    name: 'Dịch vụ tra cứu hộ tịch',
    endpoint: '/api/v1/services/civil-registry',
    dataFields: [
      { name: 'hoVaTen', label: 'Họ và tên', type: 'string', required: true },
      { name: 'ngaySinh', label: 'Ngày sinh', type: 'date', required: true },
      { name: 'gioiTinh', label: 'Giới tính', type: 'string', required: false },
      { name: 'soCMND', label: 'Số CMND/CCCD', type: 'string', required: true },
      { name: 'diaChiThuongTru', label: 'Địa chỉ thường trú', type: 'string', required: false }
    ]
  },
  {
    id: '2',
    code: 'DV002',
    name: 'Dịch vụ đăng ký kinh doanh',
    endpoint: '/api/v1/services/business-registration',
    dataFields: [
      { name: 'maSoDoanhNghiep', label: 'Mã số doanh nghiệp', type: 'string', required: true },
      { name: 'tenDoanhNghiep', label: 'Tên doanh nghiệp', type: 'string', required: true },
      { name: 'diaChi', label: 'Địa chỉ', type: 'string', required: true },
      { name: 'nguoiDaiDien', label: 'Người đại diện pháp luật', type: 'string', required: true },
      { name: 'vonDieuLe', label: 'Vốn điều lệ', type: 'number', required: false },
      { name: 'ngayCapPhep', label: 'Ngày cấp phép', type: 'date', required: true }
    ]
  },
  {
    id: '3',
    code: 'DV003',
    name: 'Dịch vụ văn bản pháp luật',
    endpoint: '/api/v1/services/legal-documents',
    dataFields: [
      { name: 'soKyHieu', label: 'Số ký hiệu', type: 'string', required: true },
      { name: 'trichYeu', label: 'Trích yếu', type: 'string', required: true },
      { name: 'ngayBanHanh', label: 'Ngày ban hành', type: 'date', required: true },
      { name: 'coQuanBanHanh', label: 'Cơ quan ban hành', type: 'string', required: true },
      { name: 'linhVuc', label: 'Lĩnh vực', type: 'string', required: false },
      { name: 'trangThai', label: 'Trạng thái hiệu lực', type: 'string', required: true }
    ]
  },
  {
    id: '4',
    code: 'DV004',
    name: 'Dịch vụ công chứng',
    endpoint: '/api/v1/services/notary',
    dataFields: [
      { name: 'soCongChung', label: 'Số công chứng', type: 'string', required: true },
      { name: 'ngayCongChung', label: 'Ngày công chứng', type: 'date', required: true },
      { name: 'loaiHopDong', label: 'Loại hợp đồng', type: 'string', required: true },
      { name: 'benA', label: 'Bên A', type: 'string', required: true },
      { name: 'benB', label: 'Bên B', type: 'string', required: true },
      { name: 'vanPhongCongChung', label: 'Văn phòng công chứng', type: 'string', required: true }
    ]
  }
];

export function APIFormFields({ 
  formData, 
  setFormData, 
  headers, 
  setHeaders, 
  queryParams, 
  setQueryParams 
}: APIFormFieldsProps) {
  const selectedService = mockServices.find(s => s.id === formData.serviceId);
  
  // Quản lý các trường dữ liệu đã chọn
  const selectedFields = formData.selectedFields || [];
  
  const handleFieldToggle = (fieldName: string) => {
    const newSelectedFields = selectedFields.includes(fieldName)
      ? selectedFields.filter((f: string) => f !== fieldName)
      : [...selectedFields, fieldName];
    setFormData({...formData, selectedFields: newSelectedFields});
  };
  
  const handleSelectAllFields = () => {
    if (!selectedService) return;
    
    if (selectedFields.length === selectedService.dataFields.length) {
      // Nếu đã chọn hết thì bỏ chọn tất cả
      setFormData({...formData, selectedFields: []});
    } else {
      // Chọn tất cả
      const allFieldNames = selectedService.dataFields.map(f => f.name);
      setFormData({...formData, selectedFields: allFieldNames});
    }
  };
  
  const isAllFieldsSelected = selectedService 
    ? selectedFields.length === selectedService.dataFields.length && selectedService.dataFields.length > 0
    : false;
  
  return (
    <div className="space-y-6">
      {/* Thông tin chung */}
      <div>
        <label className="block text-sm text-slate-700 mb-2">Tên API <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Vd: API Danh mục quốc tịch"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-700 mb-2">Mô tả</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Mô tả về API này..."
        />
      </div>

      {/* Cấu hình Endpoint */}
      <div className="space-y-4">
        <h3 className="text-sm text-slate-900">Cấu hình Endpoint</h3>
        
        {/* Base URL - Chỉ hiển thị với API chủ động */}
        {formData.type === 'active' && (
          <div>
            <label className="block text-sm text-slate-700 mb-2">Base URL <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={formData.baseUrl}
              onChange={(e) => setFormData({...formData, baseUrl: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://api.example.com"
            />
            <p className="text-xs text-slate-500 mt-1">URL gốc của hệ thống đích mà DLDC sẽ gọi đến</p>
          </div>
        )}

        <div>
          <label className="block text-sm text-slate-700 mb-2">Endpoint <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.endpoint}
            onChange={(e) => setFormData({...formData, endpoint: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="/v1/endpoint"
          />
          {formData.type === 'active' && (
            <p className="text-xs text-slate-500 mt-1">Đường dẫn cụ thể của API trên hệ thống đích</p>
          )}
          {formData.type === 'passive' && (
            <p className="text-xs text-slate-500 mt-1">Đường dẫn endpoint mà DLDC cung cấp cho hệ thống bên ngoài gọi vào</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-700 mb-2">HTTP Method <span className="text-red-500">*</span></label>
            <select
              value={formData.httpMethod}
              onChange={(e) => setFormData({...formData, httpMethod: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-2">Content Type <span className="text-red-500">*</span></label>
            <select
              value={formData.contentType}
              onChange={(e) => setFormData({...formData, contentType: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="JSON">JSON</option>
              <option value="XML">XML</option>
              <option value="FORM_DATA">Form Data</option>
            </select>
          </div>
        </div>
      </div>

      {/* Xác thực */}
      <div className="space-y-4">
        <h3 className="text-sm text-slate-900">Xác thực</h3>
        
        <div>
          <label className="block text-sm text-slate-700 mb-2">Loại xác thực</label>
          <select
            value={formData.authType}
            onChange={(e) => setFormData({...formData, authType: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="API Key">API Key</option>
            <option value="Bearer Token">Bearer Token</option>
            <option value="Basic Auth">Basic Auth</option>
            <option value="OAuth 2.0">OAuth 2.0</option>
            <option value="None">None</option>
          </select>
          {formData.type === 'active' && (
            <p className="text-xs text-slate-500 mt-1">Thông tin xác thực để gọi API hệ thống đích</p>
          )}
          {formData.type === 'passive' && (
            <p className="text-xs text-slate-500 mt-1">Phương thức xác thực yêu cầu từ hệ thống bên ngoài</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-slate-700 mb-2">API Key</label>
          <input
            type="password"
            value={formData.apiKey}
            onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••••••"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-700 mb-2">Header Name</label>
          <input
            type="text"
            value={formData.headerName}
            onChange={(e) => setFormData({...formData, headerName: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="x-api-key"
          />
        </div>
      </div>

      {/* Headers bổ sung - Chỉ hiển thị với API chủ động */}
      {formData.type === 'active' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-900">Headers bổ sung</h3>
            <button
              type="button"
              onClick={() => setHeaders([...headers, { key: '', value: '' }])}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add Header
            </button>
          </div>
          <p className="text-xs text-slate-500">Các header bổ sung khi gọi API hệ thống đích (ngoài header xác thực)</p>
          {headers.length > 0 && (
            <div className="space-y-2">
              {headers.map((header, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={header.key}
                    onChange={(e) => {
                      const newHeaders = [...headers];
                      newHeaders[index].key = e.target.value;
                      setHeaders(newHeaders);
                    }}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Key"
                  />
                  <input
                    type="text"
                    value={header.value}
                    onChange={(e) => {
                      const newHeaders = [...headers];
                      newHeaders[index].value = e.target.value;
                      setHeaders(newHeaders);
                    }}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Value"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newHeaders = headers.filter((_, i) => i !== index);
                      setHeaders(newHeaders);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Xóa header"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {headers.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-2">Chưa có header bổ sung nào</p>
          )}
        </div>
      )}

      {/* Query Params - Chỉ hiển thị với API chủ động */}
      {formData.type === 'active' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-900">Query Params</h3>
            <button
              type="button"
              onClick={() => setQueryParams([...queryParams, { key: '', value: '' }])}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add Query Param
            </button>
          </div>
          <p className="text-xs text-slate-500">Tham số URL khi gọi API hệ thống đích</p>
          {queryParams.length > 0 && (
            <div className="space-y-2">
              {queryParams.map((param, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={param.key}
                    onChange={(e) => {
                      const newParams = [...queryParams];
                      newParams[index].key = e.target.value;
                      setQueryParams(newParams);
                    }}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Key"
                  />
                  <input
                    type="text"
                    value={param.value}
                    onChange={(e) => {
                      const newParams = [...queryParams];
                      newParams[index].value = e.target.value;
                      setQueryParams(newParams);
                    }}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Value"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newParams = queryParams.filter((_, i) => i !== index);
                      setQueryParams(newParams);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Xóa query param"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {queryParams.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-2">Chưa có query param nào</p>
          )}
        </div>
      )}

      {/* Cấu hình đơn vị LSGP */}
      <div className="space-y-4">
        <h3 className="text-sm text-slate-900">Cấu hình đơn vị LSGP (Liên sở giữa phòng)</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-700 mb-2">Mã đơn vị</label>
            <input
              type="text"
              value={formData.unitCode}
              onChange={(e) => setFormData({...formData, unitCode: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: BTP"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-2">Mã hệ thống</label>
            <input
              type="text"
              value={formData.systemCode}
              onChange={(e) => setFormData({...formData, systemCode: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: DLDC"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is-active"
            checked={formData.isActive}
            onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="is-active" className="text-sm text-slate-700">Kích hoạt kết nối</label>
        </div>
      </div>
    </div>
  );
}