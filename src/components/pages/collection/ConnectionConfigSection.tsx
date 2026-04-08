import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface ConnectionConfigSectionProps {
  dataClassification?: string;
}

export function ConnectionConfigSection({ dataClassification }: ConnectionConfigSectionProps) {
  const [connectionType, setConnectionType] = useState('REST');

  return (
    <div className="space-y-5">
      {/* Phương thức kết nối */}
      <div>
        <label htmlFor="conn-type" className="block text-sm text-slate-700 font-medium mb-2">
          Phương thức kết nối <span className="text-red-500">*</span>
        </label>
        <select
          id="conn-type"
          title="Phương thức kết nối"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={connectionType}
          onChange={(e) => setConnectionType(e.target.value)}
        >
          <option value="REST">API RESTful</option>
          <option value="SOAP">API SOAP</option>
          <option value="DB">Database (Oracle/Postgres)</option>
        </select>
      </div>

      {connectionType === 'REST' && (
        <div className="space-y-5">
      {/* Endpoint */}
      <div>
        <h3 className="text-sm text-slate-700 mb-3">Cấu hình Endpoint</h3>
        <div>
          <label htmlFor="conn-base-url" className="block text-sm text-slate-600 mb-1">
            Base URL <span className="text-red-500">*</span>
          </label>
          <input
            id="conn-base-url"
            title="Base URL"
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
              <label htmlFor="conn-content-type" className="block text-sm text-slate-600 mb-1">
                Content Type
              </label>
              <select 
                id="conn-content-type"
                title="Content Type"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Application/json</option>
                <option>application/xml</option>
                <option>text/plain</option>
              </select>
            </div>
            <div>
              <label htmlFor="conn-method" className="block text-sm text-slate-600 mb-1">
                Method
              </label>
              <select 
                id="conn-method"
                title="Method"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="conn-api-type" className="block text-sm text-slate-600 mb-1">
                Loại API
              </label>
              <select 
                id="conn-api-type"
                title="Loại API"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>API KEY</option>
                <option>OAuth 2.0</option>
                <option>Basic Auth</option>
              </select>
            </div>
            <div>
              <label htmlFor="conn-auth" className="block text-sm text-slate-600 mb-1">
                Authentication <span className="text-red-500">*</span>
              </label>
              <input
                id="conn-auth"
                title="Authentication"
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bearer token"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="conn-endpoint-path" className="block text-sm text-slate-600 mb-1">
                Endpoint Path
              </label>
              <input
                id="conn-endpoint-path"
                title="Endpoint Path"
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="/api/v1/users"
              />
            </div>
            <div>
              <label htmlFor="conn-query-params" className="block text-sm text-slate-600 mb-1">
                Query Parameters
              </label>
              <select 
                id="conn-query-params"
                title="Query Parameters"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>fromDate</option>
                <option>toDate</option>
                <option>page</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="conn-header-name" className="block text-sm text-slate-600 mb-1">
                Header Name (API Key)
              </label>
              <input
                id="conn-header-name"
                title="Header Name (API Key)"
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="X-API-Key"
              />
            </div>
            <div>
              <label htmlFor="conn-timeout" className="block text-sm text-slate-600 mb-1">
                Timeout (ms)
              </label>
              <input
                id="conn-timeout"
                title="Timeout (ms)"
                type="number"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1000"
                defaultValue="1000"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="conn-page-size" className="block text-sm text-slate-600 mb-1">
                Page Size
              </label>
              <select 
                id="conn-page-size"
                title="Page Size"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>100</option>
                <option>50</option>
                <option>200</option>
              </select>
            </div>
            <div>
              <label htmlFor="conn-success-codes" className="block text-sm text-slate-600 mb-1">
                HTTP Success Codes
              </label>
              <input
                id="conn-success-codes"
                title="HTTP Success Codes"
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="200"
                defaultValue="200"
              />
            </div>
            <div>
              <label htmlFor="conn-error-codes" className="block text-sm text-slate-600 mb-1">
                HTTP Error Codes
              </label>
              <input
                id="conn-error-codes"
                title="HTTP Error Codes"
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="400,500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="conn-retries" className="block text-sm text-slate-600 mb-1">
                Số lần thử
              </label>
              <select 
                id="conn-retries"
                title="Số lần thử"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>5</option>
              </select>
            </div>
            <div>
              <label htmlFor="conn-api-key" className="block text-sm text-slate-600 mb-1">
                API Key
              </label>
              <input
                id="conn-api-key"
                title="API Key"
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="API key"
              />
            </div>
            <div>
              <label htmlFor="conn-interval" className="block text-sm text-slate-600 mb-1">
                Khoảng cách
              </label>
              <input
                id="conn-interval"
                title="Khoảng cách"
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5 phút"
              />
            </div>
          </div>

          <div>
            <label htmlFor="conn-ssl-required" className="block text-sm text-slate-600 mb-1">
              SSL Required
            </label>
            <select 
              id="conn-ssl-required"
              title="SSL Required"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>true</option>
              <option>false</option>
            </select>
          </div>
        </div>
      </div>

      {/* Request/Response Sample */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="conn-request-sample" className="block text-sm text-slate-600 mb-1">
            Request Sample
          </label>
          <textarea
            id="conn-request-sample"
            title="Request Sample"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder='{"key1": "value1"}'
          />
        </div>
        <div>
          <label htmlFor="conn-response-sample" className="block text-sm text-slate-600 mb-1">
            Response Sample
          </label>
          <textarea
            id="conn-response-sample"
            title="Response Sample"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Chưa có query vào"
          />
        </div>
      </div>
      </div>
      )}

      {connectionType === 'SOAP' && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Cấu hình API SOAP</h3>
          <div>
            <label className="block text-sm text-slate-600 mb-1">WSDL URL <span className="text-red-500">*</span></label>
            <input type="url" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://api.example.com/service?wsdl" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">SOAP Action</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="http://tempuri.org/Action" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Loại Auth <span className="text-red-500">*</span></label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="ws-security">WS-Security</option>
                <option value="basic">Basic Auth</option>
                <option value="bearer">Bearer Token</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Username <span className="text-red-500">*</span></label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập username" required />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Password <span className="text-red-500">*</span></label>
              <input type="password" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập password" required />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">XML Payload</label>
            <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} placeholder="<soapenv:Envelope>..." />
          </div>
        </div>
      )}

      {connectionType === 'DB' && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Cấu hình Database</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Loại Cơ sở dữ liệu <span className="text-red-500">*</span></label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="oracle">Oracle</option>
                <option value="postgres">PostgreSql</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Host/IP <span className="text-red-500">*</span></label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="192.168.1.100" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Port <span className="text-red-500">*</span></label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="1521 / 5432" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Database Name / SID <span className="text-red-500">*</span></label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="ORCL / db_name" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Username <span className="text-red-500">*</span></label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập DB Username" required />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Password <span className="text-red-500">*</span></label>
              <input type="password" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập DB Password" required />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Schema (Optional)</label>
            <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="public / schema_name" />
          </div>
        </div>
      )}

      {/* Ánh xạ trường dữ liệu đầu thu thập */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-slate-700">Ánh xạ trường dữ liệu đầu thu thập</h3>
          <button
            type="button"
            title="Thêm trường"
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
                  <select title="Trường nguồn" className="w-full px-2 py-1 border-0 text-xs focus:outline-none focus:ring-0">
                    <option>id</option>
                    <option>name</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select title="Kiểu dữ liệu" className="w-full px-2 py-1 border-0 text-xs focus:outline-none focus:ring-0">
                    <option>string</option>
                    <option>number</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select title="Trường đích" className="w-full px-2 py-1 border-0 text-xs focus:outline-none focus:ring-0">
                    <option>id</option>
                    <option>userId</option>
                  </select>
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    type="button"
                    title="Xóa dòng"
                    className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <select title="Trường nguồn" className="w-full px-2 py-1 border-0 text-xs focus:outline-none focus:ring-0">
                    <option>full_name</option>
                    <option>name</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select title="Kiểu dữ liệu" className="w-full px-2 py-1 border-0 text-xs focus:outline-none focus:ring-2 focus:ring-0">
                    <option>string</option>
                    <option>number</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select title="Trường đích" className="w-full px-2 py-1 border-0 text-xs focus:outline-none focus:ring-0">
                    <option>full_name</option>
                    <option>userName</option>
                  </select>
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    type="button"
                    title="Xóa dòng"
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
                <label htmlFor="conn-lgsp-code" className="block text-sm text-slate-600 mb-1">
                  Mã dịch vụ LGSP <span className="text-red-500">*</span>
                </label>
                <input
                  id="conn-lgsp-code"
                  title="Mã dịch vụ LGSP"
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: LGSP_SERVICE_001"
                />
              </div>
              <div>
                <label htmlFor="conn-service-name" className="block text-sm text-slate-600 mb-1">
                  Service Name
                </label>
                <input
                  id="conn-service-name"
                  title="Service Name"
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="DataCollectionService"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="conn-lgsp-version" className="block text-sm text-slate-600 mb-1">
                  Phiên bản API
                </label>
                <select 
                  id="conn-lgsp-version"
                  title="Phiên bản API"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="v1">v1</option>
                  <option value="v2">v2</option>
                </select>
              </div>
              <div>
                <label htmlFor="conn-lgsp-method" className="block text-sm text-slate-600 mb-1">
                  Phương thức
                </label>
                <select 
                  id="conn-lgsp-method"
                  title="Phương thức"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="REST">REST</option>
                  <option value="SOAP">SOAP</option>
                </select>
              </div>
              <div>
                <label htmlFor="conn-lgsp-timeout" className="block text-sm text-slate-600 mb-1">
                  Timeout (giây)
                </label>
                <input
                  id="conn-lgsp-timeout"
                  title="Timeout"
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
                <label htmlFor="conn-lgsp-auth" className="block text-sm text-slate-600 mb-1">
                  Cơ chế xác thực
                </label>
                <select 
                  id="conn-lgsp-auth"
                  title="Cơ chế xác thực"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="digital-signature">Chữ ký số</option>
                  <option value="oauth2">OAuth2</option>
                </select>
              </div>
              <div>
                <label htmlFor="conn-lgsp-cts" className="block text-sm text-slate-600 mb-1">
                  Chứng thư số
                </label>
                <select 
                   id="conn-lgsp-cts"
                   title="Chứng thư số"
                   className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
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
                <label htmlFor="conn-ndxp-code" className="block text-sm text-slate-600 mb-1">
                  Mã đơn vị NDXP <span className="text-red-500">*</span>
                </label>
                <input
                  id="conn-ndxp-code"
                  title="Mã đơn vị NDXP"
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="VD: NDXP_ORG_001"
                />
              </div>
              <div>
                <label htmlFor="conn-org-id" className="block text-sm text-slate-600 mb-1">
                  Mã định danh tổ chức
                </label>
                <input
                  id="conn-org-id"
                  title="Mã định danh tổ chức"
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="VD: 00.00.00.H00"
                />
              </div>
            </div>
            <div>
              <label htmlFor="conn-ndxp-endpoint" className="block text-sm text-slate-600 mb-1">
                Endpoint NDXP
              </label>
              <input
                id="conn-ndxp-endpoint"
                title="Endpoint NDXP"
                type="url"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://ndxp.gov.vn/api/v1/data"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="conn-ndxp-token" className="block text-sm text-slate-600 mb-1">
                  Token xác thực
                </label>
                <input
                  id="conn-ndxp-token"
                  title="Token xác thực"
                  type="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="••••••••••••"
                />
              </div>
              <div>
                <label htmlFor="conn-ndxp-secret" className="block text-sm text-slate-600 mb-1">
                  Mã bí mật
                </label>
                <input
                  id="conn-ndxp-secret"
                  title="Mã bí mật"
                  type="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="••••••••••••"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Nút kiểm tra kết nối */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={() => alert('Đang kiểm tra kết nối tới Server...\n\n(Mockup: Kết nối thành công 200 OK)')}
          className="px-4 py-2 bg-slate-100 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
        >
          Kiểm tra kết nối
        </button>
      </div>
    </div>
  );
}
