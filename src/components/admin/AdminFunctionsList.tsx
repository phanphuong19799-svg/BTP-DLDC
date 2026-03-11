import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface FunctionItem {
  id: string;
  description: string;
}

interface FunctionGroup {
  id: string;
  name: string;
  functions: FunctionItem[];
  expanded?: boolean;
}

const adminFunctionsData: FunctionGroup[] = [
  {
    id: 'user-mgmt',
    name: 'Quản lý người dùng',
    functions: [
      { id: '1.1', description: 'Quản trị hệ thống có thể thêm mới người dùng, cập nhớng tin của người dùng. Hệ thống lưu thông tin về người dùng' },
      { id: '1.2', description: 'Quản trị hệ thống có thể chọn trạng thái là khóa người dùng (user_Inactive) Hệ thống ghi lại trạng thái tài khoản người dùng' },
      { id: '1.3', description: 'Quản trị hệ thống có thể chỉnh sửa người dùng. Hệ thống cập nhật thông tin người dùng' },
      { id: '1.4', description: 'Quản trị hệ thống có thể xóa người dùng. Hệ thống đánh dấu xoá người dùng' },
    ],
  },
  {
    id: 'user-group-mgmt',
    name: 'Quản lý nhóm người dùng',
    functions: [
      { id: '2.1', description: 'Quản trị hệ thống có thể thêm mới nhóm người dùng, cập nhớng tin của nhóm người dùng. Hệ thống lưu thông tin về nhóm người dùng' },
      { id: '2.2', description: 'Quản trị hệ thống có thể chọn trạng thái nhóm. Hệ thống ghi lại trạng thái nhóm người dùng' },
      { id: '2.3', description: 'Quản trị hệ thống có thể chỉnh sửa nhóm người dùng. Hệ thống cập nhật thông tin nhóm người dùng' },
      { id: '2.4', description: 'Quản trị hệ thống có thể xóa nhóm người dùng. Hệ thống xoá các thí nhận nhóm người dùng' },
    ],
  },
  {
    id: 'office-resources',
    name: 'Các nguồn dùng văn phòng',
    functions: [
      { id: '3.1', description: 'Quản trị hệ thống có thể chọn nguồn dùng các gói. Hệ thống hiển thị danh sách nguồn dùng đề chọn' },
      { id: '3.2', description: 'Quản trị hệ thống có thể chọn nhóm loại các nhóm trượng trội. Hệ thống kiểm tra trùng lặp và thông báo nếu nhóm đã thuộc nhóm. Ghi thước nhóm. Lưu cầu hành vi cập nhật quyền theo nhóm.' },
    ],
  },
  {
    id: 'function-permission-group',
    name: 'Phân quyền chức năng cho nhóm người dùng',
    functions: [
      { id: '4.1', description: 'Quản trị hệ thống có thể chọn nhóm người dùng các phân quyền. Hệ thống hiển thị danh sách nhóm người dùng để chọn' },
      { id: '4.2', description: 'Quản trị hệ thống có thể chọn danh sách chức năng hoặc module để thống dược phép truy cập vé Lưu cấu hình. Hệ thống sử dụng quyền theo tất cả ở thành viên nhóm' },
    ],
  },
  {
    id: 'data-permission-group',
    name: 'Phân quyền dữ liệu cho nhóm người dùng',
    functions: [
      { id: '5.1', description: 'Quản trị hệ thống có thể chọn nhóm người dùng các phần quyền dữ liệu. Hệ thống hiển thị danh sách nhóm người dùng đề chọn' },
      { id: '5.2', description: 'Quản trị hệ thống có thể chọn các nhóm dữ liệu và nhóm đoạn trái, thời gian sử dụng dữ liệu. Hệ thống ghi thông tin thị thống và vi phạm (7 đổi liệu' },
      { id: '5.3', description: 'Quản trị hệ thống có thể xác định hoạt quyền: đọc, ghi, cập nhật, xoá và Lưu cấu hình. Hệ thống áp dụng quyền cho tất cả ở thành viên nhóm' },
    ],
  },
  {
    id: 'function-list-mgmt',
    name: 'Quản lý danh sách chức năng',
    functions: [
      { id: '6.1', description: 'Quản trị hệ thống có thể thêm chức năng mới. Hệ thống lưu thống tin về chức năng thêm mới.' },
      { id: '6.2', description: 'Quản trị hệ thống có thể chỉnh sửa chức năng. Hệ thống lưu thống tin cập nhật về chức năng' },
      { id: '6.3', description: 'Quản trị hệ thống có thể xóa chức năng khi cần. Hệ thống lưu xổ số nhận xoá chức năng' },
    ],
  },
  {
    id: 'function-assign-group',
    name: 'Gắn chức năng cho nhóm người dùng',
    functions: [
      { id: '7.1', description: 'Quản trị hệ thống có thể chọn nhóm người dùng các gắn chức năng. Hệ thống cho phép chọn người dùng từ danh sách' },
      { id: '7.2', description: 'Quản trị hệ thống có thể danh sách chọn chức năng làm quyên. Hệ thống cho phép chọn các chức năng hoặc đề ghi.' },
      { id: '7.3', description: 'Quản trị hệ thống Lưu cấu hành và xác định. Hệ thống từ động áp dụng các quyền truy cập cho tất cả ở thành viên nhóm' },
    ],
  },
  {
    id: 'role-mgmt',
    name: 'Quản lý vai trò',
    functions: [
      { id: '8.1', description: 'Quản trị hệ thống có thể tạo vai trò mới, tên, mô tả, danh sách quyền chức năng quyền dữ liệu. Hệ thống kiểm tra tính hợp lệ và ghi nhận vai trò mới' },
      { id: '8.2', description: 'Quản trị hệ thống có thể chỉnh sửa vai trò. Hệ thống kiểm tra tính hợp lệ và cập nhật vai trò và ghi nhận phê duyệt bản chính sửa' },
      { id: '8.3', description: 'Quản trị hệ thống có thể phép xoá vai trò. Hệ thống kiểm tra canh bảo xác nhận: Sau khi dồng ý, hệ thống xoá vai trò và ghi nhận kệ trách đổng. chủ ép dùng với vai trò chưa được gắn cho người dùng, kiểm trị, danh sách gắn vào thành công.' },
      { id: '8.4', description: 'Quản trị hệ thống có thể xem chi tiết vai trò: Tên vai trò, danh sách nhóm người dùng, danh sách người dùng người, kiểm trị danh sách gắn phản bỉng bản chính sửa' },
    ],
  },
  {
    id: 'anomaly-detection',
    name: 'Thiết lập cảm binh bất thường',
    functions: [
      { id: '9.1', description: 'Quản trị hệ thống thực hiện cấu hình viêu cầu thay đổi mật khẩu tại dăng nhập lần đầu. Hệ thống ghi nhận thống tin cấu hành' },
      { id: '9.2', description: 'Quản trị hệ thống thực hiện cấu hành thời gian văn cấu thay đổi mật khẩu. Hệ thống ghi nhận thống tin cấu hành' },
      { id: '9.3', description: 'Quản trị hệ thống thực hiện cầu hành Giới han số lấn đang nhập sai trong khỏang thời gian nhất định (timeout). Hệ thống ghi nhận thông tin cẩu hành. Hệ thống ghi nhận thông tin cẩu hành' },
      { id: '9.4', description: 'Quản trị hệ thống thực hiện cấu hình thông tin khóa tài khoản và thông báo qua email: tài khoản đã bị khóa, liên hệ với quản trị viêu để mở khóa. Hệ thống ghi nhận thống tin cấu hành' },
    ],
  },
  {
    id: 'password-rules',
    name: 'Thiết lập quy tắc đối mật khẩu',
    functions: [
      { id: '10.1', description: 'Quản trị hệ thống thực hiện tự ấp danh lập quy tắc đối mật khẩu và lưu trạng kỳ lưu, tổai lẻy từ đổi thiết lập mật khẩu. Hệ thống kiểm tra tính hợp thiết lập năng cũng' },
    ],
  },
  {
    id: 'access-log',
    name: 'Quản lý nhật ký truy cập',
    functions: [
      { id: '11.1', description: 'Cần bó xem danh sách nhật ký truy cập hệ thống. Hệ thống hiển thị danh sách nhật ký truy cập, Phần màn' },
    ],
  },
  {
    id: 'login-log',
    name: 'Quản lý nhật ký đăng nhập',
    functions: [
      { id: '12.1', description: 'Cần bó xem danh sách nhật ký đăng nhập hệ thống. Hệ thống hiển thị kết quả về file màu tính cũ nhận của các tờ' },
      { id: '12.2', description: 'Cần bó kết xuất nhật ký đăng nhập hệ thống. Hệ thống kết xuất về file màu tính cấu nhận của các tờ' },
      { id: '12.3', description: 'Cần bó xem danh sách nhật ký đăng nhập kia dành kia thay đổi. Hệ thống kết xuất về file màu tính theo áp định đổi nhận trong khi định sử thông, đăng nhập làm việc của người dùng, nơi trang Đăng nhập hộ thống' },
    ],
  },
  {
    id: 'sync-process-log',
    name: 'Quản lý nhật ký các lưu phân trinh trong quá trình đồng bộ',
    functions: [
      { id: '13.1', description: 'Cần bó kếm kiếm nhật ký các lưu. Để phát tính trường sữa thất kết quả lọc hai khoản. Hệ thống truy vấn dữ liệu từ khỉ thất kết quả lại màu tính của người trường quá tính hệ dong bộ' },
      { id: '13.2', description: 'Cần bó kết xuất nhật ký các lưu. Để phát tính trường sữa thất kết quả vổ file màu tính của nhân của cặn bó' },
    ],
  },
  {
    id: 'account-mgmt-log',
    name: 'Quản lý nhật ký quan lý tài khoản',
    functions: [
      { id: '14.1', description: 'Cần bó xem danh sách nhật ký quan lý tài khoản. Hệ thống hiển thị danh sách nhật ký quan lý tài khoản tính màu tính' },
      { id: '14.2', description: 'Cần bó kết kiếm nhật ký các lưu. Để phát tính trường sữa thất đổng ký quan lý tài khoản. Hệ thống truy vấn dữ thống hiển thị kết quả lọc tài màu tính của người trường quá tính hệ thống' },
      { id: '14.3', description: 'Cần bó kết xuất nhật ký các lưu. Để phát tính trường sữa nhập lọc và kết xuất ký quan lý tài khoản. Hệ thống kết xuất về File màu tính cần nhận của cặn bó' },
    ],
  },
  {
    id: 'config-change-log',
    name: 'Quản lý Nhật ký thay đổi cấu hình',
    functions: [
      { id: '15.1', description: 'Cần bó xem danh sách nhật ký thay đổi cấu hình. Hệ thống hiển thị danh sách Nhật ký thay đổi cấu hình. Phần màn màu tính' },
      { id: '15.2', description: 'Cần bó kết kiếm nhật ký các lưu. Để phát tính trường sữa thất kết quả lọc Nhật ký thay đổi cấu hình. Hệ thống truy vấn dữ thống hiển thị kết quả lọc tài màu tính của người trường' },
      { id: '15.3', description: 'Cần bó kết xuất Nhật ký thì thay đổi cấu hình. Phần màn màn. Hệ thống kết xuất về file màu tính cần nhận của cặn bó' },
    ],
  },
  {
    id: 'session-timeout',
    name: 'Quản lý cấu hình không thời gian tồn tại của gói giao diễm Quản lý nhật ký',
    functions: [
      { id: '16.1', description: 'Quản trị hệ thống xem danh sách cấu hình không thời gian tồn trù hỏi ký quá giao điểm. Hệ thống hiển thị màu hình dược, trình bào cao nhật ký quá giao điểm Quản lý nhật ký' },
      { id: '16.2', description: 'Quản trị hệ thống xem và thực hiện cấu hình không thời gian tồn trù hỏi ký quá giao điểm lỏi trù hỏi ký giả giao điểm. Hệ thống kiểm tra tính hợp lệ va lưu thông báo' },
      { id: '16.3', description: 'Quản trị hệ thống xem và thực hiện cấu hình không thời gian tồn trù hỏi ký quá giao điểm lỏi trù vải ký dề bảng hạng hệ thống thực hiện việc xóa các Quản lý nhật ký ngoải thời gian quy định với' },
      { id: '16.4', description: 'Quản trị hệ thống thực hiện cấu hình thống báo thường xuyên (thống kể hạng ngày/thống, hạng tuần) về số lượng bản ghi đã bị xoá. Hệ thống kín lại thống kế theo hạng mục lọc Quản lý nhật ký' },
    ],
  },
  {
    id: 'backup',
    name: 'Xem lưu lại phòng',
    functions: [
      { id: '17.1', description: 'Quản trị hệ thống thực hiện lập tắc thực hiện sao lưu dự phòng có và đổi liệu. Hệ thống lưu thống tin màu hào dự phòng' },
    ],
  },
  {
    id: 'statistics',
    name: 'Xem biến đổ thống kê',
    functions: [
      { id: '18.1', description: 'Cần bó có thể xem dữ liệu biếu đổ thống kẽ CSĐL, tích hợp danh đang hình' },
      { id: '18.2', description: 'Cần bó có bỏ xác các biếu đồ thống tên hiện kiểu đổ thống kẽ CSĐL, tích hợp danh đang hình. Hệ thống hiển thị biếu đổ tương đổi hiện kiểu đổ thống kẽ CSĐL, tích hợp theo tiêu chí chọn' },
      { id: '18.3', description: 'Cần bó có thể lạc biếu đổ thống kẽ CSĐL, tích hợp theo tiêu chí khả hạc. Hệ thống hiển thị biếu đổ thống kế CSĐL, tích hợp theo tiêu chí khóa hạc' },
      { id: '18.4', description: 'Cần bó có thể in biếu đổ thống kẽ CSĐL, tích hợp danh đang hình. Hệ thống hiển thị dữ liệu theo theo đổi định chọn thống biếu đổ thống kẽ CSĐL, tích hợp' },
      { id: '18.5', description: 'Cần bó có thể xem dữ liệu cũ thất cấu cũ bêu tiêu tăng tiến lưu dữ thống kẽ CSĐL, tích hợp: Hệ thống hiển thị dữ liệu cho cũ thất câu cũ bêu tiêu tính' },
      { id: '18.6', description: 'Cần bó có thể lạc các dữ liệu theo kiểu đổ định chọn thống dữ liệu dữ thống kẽ CSĐL tích hợp danh đang hình: Hệ thống hiển thị dữ liệu theo kiểu đổ định chọn thống dữ thống kẽ CSĐL: tích hợp' },
      { id: '18.7', description: 'Cần bó có thể in dữ liệu theo biếu đổ định chọn thống dữ thống kẽ CSĐL tích hợp theo tiêu chí hạc: Hệ thống hiển thị dữ liệu cũ thất câu cũ biếu đổ định chọn thống dữ thống kẽ CSĐL: tích hợp' },
  ],
  },
  {
    id: 'login',
    name: 'Đăng nhập hệ thống',
    functions: [
      { id: '19.1', description: 'Người dùng tiền hành nhập tình thống tin đế thống kẽ khoản dùng màn ten thống. Hệ thống ghi nhận và kiểm tra tình hợp lệ thống người dùng màu hên' },
      { id: '19.2', description: 'Người dùng có thể xác chọn khẩu cấu khoản của mình theo dõi nhật sau thống đổ thống tin lưu hết đúng nhất ngại dùng. Hệ thống ghi duyệt đế thông báo thụng cho người dùng đã thực nhả đế thông báo thên kiện thống tin trong màn hần vào tính chương tính hỏi phạm quyền tin khoản' },
    ],
  },
  {
    id: 'logout',
    name: 'Đăng xuất hệ thống',
    functions: [
      { id: '20.1', description: 'Người dùng tiền hành đăng xuất hệ thống. Hệ thống huỷ phiên làm việc của người dùng, nơi trang Đăng nhập hộ thống' },
    ],
  },
];

export function AdminFunctionsList() {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const expandAll = () => {
    setExpandedGroups(new Set(adminFunctionsData.map(g => g.id)));
  };

  const collapseAll = () => {
    setExpandedGroups(new Set());
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-slate-900">Danh mục chức năng Quản trị và Vận hành</h3>
          <p className="text-sm text-slate-600 mt-1">
            Tổng số {adminFunctionsData.length} nhóm chức năng với {adminFunctionsData.reduce((sum, g) => sum + g.functions.length, 0)} chức năng
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 text-sm border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Mở rộng tất cả
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 text-sm border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Thu gọn tất cả
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider w-1/4">
                Nhóm chức năng
              </th>
              <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                Mô tả chức năng
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {adminFunctionsData.map((group, groupIndex) => {
              const isExpanded = expandedGroups.has(group.id);
              return (
                <tr key={group.id}>
                  <td className="px-6 py-4 align-top bg-slate-50/50">
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className="flex items-start gap-2 text-left w-full group hover:bg-slate-100 p-2 rounded-lg transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                          {groupIndex + 1}. {group.name}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {group.functions.length} chức năng
                        </div>
                      </div>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {isExpanded ? (
                      <ol className="space-y-3">
                        {group.functions.map((func, funcIndex) => (
                          <li key={func.id} className="flex gap-3">
                            <span className="text-sm text-slate-500 flex-shrink-0 mt-0.5">
                              {groupIndex + 1}.{funcIndex + 1}
                            </span>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {func.description}
                            </p>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <div className="text-sm text-slate-400 italic">
                        Click vào nhóm chức năng để xem chi tiết
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
