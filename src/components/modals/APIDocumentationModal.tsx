import { X, BookOpen, Code, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface APIDocumentationModalProps {
  isOpen: boolean;
  service: any;
  onClose: () => void;
}

export function APIDocumentationModal({ isOpen, service, onClose }: APIDocumentationModalProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen || !service) return null;

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const curlExample = `curl -X ${service.method} '${service.apiEndpoint}' \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json'`;

  const responseExample = `{
  "status": "success",
  "data": {
    "id": "123456",
    "timestamp": "2024-12-09T15:30:00Z",
    "records": [
      {
        "recordId": "REC-001",
        "type": "birth_certificate",
        "citizenId": "001234567890",
        "fullName": "Nguyễn Văn A",
        "dateOfBirth": "1990-01-15",
        "placeOfBirth": "Hà Nội"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 150
  }
}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-slate-900">Tài liệu API</h2>
              <p className="text-sm text-slate-600">{service.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-slate-900 mb-3">Tổng quan</h3>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <p className="text-sm text-slate-700">{service.description}</p>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-300">
                <div>
                  <span className="text-xs text-slate-500">Base URL</span>
                  <div className="text-sm text-slate-900 font-mono mt-1">
                    https://api.dldc.moj.gov.vn
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Phiên bản</span>
                  <div className="text-sm text-slate-900 mt-1">v1.0</div>
                </div>
              </div>
            </div>
          </div>

          {/* Endpoint */}
          <div>
            <h3 className="text-slate-900 mb-3">Endpoint</h3>
            <div className="bg-slate-900 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded text-sm ${
                  service.method === 'GET' ? 'bg-green-600 text-white' :
                  service.method === 'POST' ? 'bg-blue-600 text-white' :
                  service.method === 'PUT' ? 'bg-yellow-600 text-white' :
                  'bg-red-600 text-white'
                }`}>
                  {service.method}
                </span>
                <code className="text-green-400 flex-1">{service.apiEndpoint}</code>
                <button
                  onClick={() => handleCopy(service.apiEndpoint, 'endpoint')}
                  className="p-1.5 hover:bg-slate-800 rounded transition-colors"
                >
                  {copiedSection === 'endpoint' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Authentication */}
          <div>
            <h3 className="text-slate-900 mb-3">Xác thực</h3>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Code className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-amber-900 mb-2">
                    API yêu cầu Bearer Token trong header Authorization
                  </p>
                  <div className="bg-white border border-amber-300 rounded p-3 font-mono text-xs text-slate-700">
                    Authorization: Bearer YOUR_API_KEY
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parameters */}
          <div>
            <h3 className="text-slate-900 mb-3">Tham số truy vấn</h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm text-slate-600">Tham số</th>
                    <th className="px-4 py-3 text-left text-sm text-slate-600">Kiểu</th>
                    <th className="px-4 py-3 text-left text-sm text-slate-600">Bắt buộc</th>
                    <th className="px-4 py-3 text-left text-sm text-slate-600">Mô tả</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-blue-700">page</td>
                    <td className="px-4 py-3 text-sm text-slate-600">integer</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
                        Không
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      Số trang (mặc định: 1)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-blue-700">perPage</td>
                    <td className="px-4 py-3 text-sm text-slate-600">integer</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
                        Không
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      Số bản ghi mỗi trang (mặc định: 20, max: 100)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-blue-700">citizenId</td>
                    <td className="px-4 py-3 text-sm text-slate-600">string</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                        Có
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      Số CMND/CCCD (12 số)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-blue-700">recordType</td>
                    <td className="px-4 py-3 text-sm text-slate-600">string</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
                        Không
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      Loại hồ sơ: birth, marriage, divorce, death
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Response */}
          <div>
            <h3 className="text-slate-900 mb-3">Định dạng phản hồi</h3>
            <div className="bg-slate-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400">JSON Response</span>
                <button
                  onClick={() => handleCopy(responseExample, 'response')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-300 transition-colors"
                >
                  {copiedSection === 'response' ? (
                    <>
                      <Check className="w-3 h-3" />
                      Đã copy
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="text-sm text-green-400 overflow-x-auto">
                <code>{responseExample}</code>
              </pre>
            </div>
          </div>

          {/* Example Request */}
          <div>
            <h3 className="text-slate-900 mb-3">Ví dụ request (cURL)</h3>
            <div className="bg-slate-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400">Command Line</span>
                <button
                  onClick={() => handleCopy(curlExample, 'curl')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-300 transition-colors"
                >
                  {copiedSection === 'curl' ? (
                    <>
                      <Check className="w-3 h-3" />
                      Đã copy
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="text-sm text-green-400 overflow-x-auto">
                <code>{curlExample}</code>
              </pre>
            </div>
          </div>

          {/* Status Codes */}
          <div>
            <h3 className="text-slate-900 mb-3">Mã trạng thái HTTP</h3>
            <div className="space-y-2">
              {[
                { code: 200, status: 'OK', desc: 'Yêu cầu thành công' },
                { code: 400, status: 'Bad Request', desc: 'Tham số không hợp lệ' },
                { code: 401, status: 'Unauthorized', desc: 'Token không hợp lệ hoặc hết hạn' },
                { code: 403, status: 'Forbidden', desc: 'Không có quyền truy cập' },
                { code: 404, status: 'Not Found', desc: 'Không tìm thấy dữ liệu' },
                { code: 429, status: 'Too Many Requests', desc: 'Vượt quá giới hạn rate limit' },
                { code: 500, status: 'Internal Server Error', desc: 'Lỗi hệ thống' }
              ].map((item) => (
                <div key={item.code} className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className={`px-3 py-1 rounded text-sm ${
                    item.code >= 200 && item.code < 300 ? 'bg-green-100 text-green-700' :
                    item.code >= 400 && item.code < 500 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.code}
                  </span>
                  <span className="text-sm text-slate-900">{item.status}</span>
                  <span className="text-sm text-slate-600 flex-1">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rate Limiting */}
          <div>
            <h3 className="text-slate-900 mb-3">Giới hạn tần suất (Rate Limiting)</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl text-blue-900">1,000</div>
                  <div className="text-xs text-blue-700 mt-1">requests/giờ</div>
                </div>
                <div>
                  <div className="text-2xl text-blue-900">10,000</div>
                  <div className="text-xs text-blue-700 mt-1">requests/ngày</div>
                </div>
                <div>
                  <div className="text-2xl text-blue-900">300,000</div>
                  <div className="text-xs text-blue-700 mt-1">requests/tháng</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
