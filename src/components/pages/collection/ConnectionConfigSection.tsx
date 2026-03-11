import { Plus, X } from 'lucide-react';

interface ConnectionConfigSectionProps {
  dataClassification?: string;
}

export function ConnectionConfigSection({ dataClassification }: ConnectionConfigSectionProps) {
  return (
    <div className="space-y-5">
      {/* Endpoint */}
      <div>
        <h3 className="text-sm text-slate-700 mb-3">Cấu hình Endpoint</h3>
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Base URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://api.example.com"
          />
        </div>
      </div>

      {/* Headers */}
      <div>
        <h3 className="text-sm text-slate-700 mb-3">Thao tác Headers</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Content Type
              </label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Application/json</option>
                <option>application/xml</option>
                <option>text/plain</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Method
              </label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Loại API
              </label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>API KEY</option>
                <option>OAuth 2.0</option>
                <option>Basic Auth</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Authentication
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bearer token"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Endpoint Path
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="/api/v1/users"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Query Parameters
              </label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>fromDate</option>
                <option>toDate</option>
                <option>page</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Header Name (API Key)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="X-API-Key"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Timeout (ms)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1000"
                defaultValue="1000"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Page Size
              </label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>100</option>
                <option>50</option>
                <option>200</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                HTTP Success Codes
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="200"
                defaultValue="200"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                HTTP Error Codes
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="400,500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Số lần thử
              </label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>5</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                API Key
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="API key"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Khoảng cách
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5 phút"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              SSL Required
            </label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>true</option>
              <option>false</option>
            </select>
          </div>
        </div>
      </div>

      {/* Request/Response Sample */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Request Sample
          </label>
          <textarea
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder='{"key1": "value1"}'
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Response Sample
          </label>
          <textarea
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Chưa có query vào"
          />
        </div>
      </div>

      {/* Ánh xạ trường dữ liệu đầu thu thập */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-slate-700">Ánh xạ trường dữ liệu đầu thu thập</h3>
          <button
            type="button"
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Thêm trường
          </button>
        </div>
        <div className="border border-slate-300 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs text-slate-600">Trường nguồn</th>
                <th className="px-3 py-2 text-left text-xs text-slate-600">Kiểu dữ liệu</th>
                <th className="px-3 py-2 text-left text-xs text-slate-600">Trường đích</th>
                <th className="px-3 py-2 text-center text-xs text-slate-600">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-3 py-2">
                  <select className="w-full px-2 py-1 border-0 text-xs focus:outline-none focus:ring-0">
                    <option>id</option>
                    <option>name</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select className="w-full px-2 py-1 border-0 text-xs focus:outline-none focus:ring-0">
                    <option>string</option>
                    <option>number</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select className="w-full px-2 py-1 border-0 text-xs focus:outline-none focus:ring-0">
                    <option>id</option>
                    <option>userId</option>
                  </select>
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    type="button"
                    className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <select className="w-full px-2 py-1 border-0 text-xs focus:outline-none focus:ring-0">
                    <option>full_name</option>
                    <option>name</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select className="w-full px-2 py-1 border-0 text-xs focus:outline-none focus:ring-2 focus:ring-0">
                    <option>string</option>
                    <option>number</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select className="w-full px-2 py-1 border-0 text-xs focus:outline-none focus:ring-0">
                    <option>full_name</option>
                    <option>userName</option>
                  </select>
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    type="button"
                    className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Cấu hình LGSP - chỉ hiện khi chọn nội ngành */}
      {dataClassification === 'noi-nganh' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm text-slate-700 mb-3 flex items-center gap-2">
            <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">LGSP</span>
            Cấu hình kết nối LGSP (Nội ngành)
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Mã dịch vụ LGSP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: LGSP_SERVICE_001"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="DataCollectionService"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Phiên bản API
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="v1">v1</option>
                  <option value="v2">v2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Phương thức
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="REST">REST</option>
                  <option value="SOAP">SOAP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Timeout (giây)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="30"
                  min="5"
                  max="300"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Cơ chế xác thực
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="digital-signature">Chữ ký số</option>
                  <option value="oauth2">OAuth2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Chứng thư số
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">-- Chọn CTS --</option>
                  <option value="CTS_DLDC_2024">CTS DLDC 2024</option>
                  <option value="CTS_BTP_2024">CTS Bộ Tư pháp 2024</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cấu hình NDXP - chỉ hiện khi chọn ngoài ngành */}
      {dataClassification === 'ngoai-nganh' && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="text-sm text-slate-700 mb-3 flex items-center gap-2">
            <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">NDXP</span>
            Cấu hình kết nối NDXP (Ngoài ngành)
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Mã đơn vị NDXP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="VD: NDXP_ORG_001"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Mã định danh tổ chức
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="VD: 00.00.00.H00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Endpoint NDXP
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://ndxp.gov.vn/api/v1/data"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Token xác thực
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="••••••••••••"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Mã bí mật
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="••••••••••••"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
