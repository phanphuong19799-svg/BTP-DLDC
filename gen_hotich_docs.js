const fs = require('fs');
const path = require('path');

const OUT_FILE = path.join(__dirname, 'tailieu', 'tailieuphantich', 'mauthuthapCSDL.md');

// Danh sách 10 loại hồ sơ cần tạo tài liệu
const hoSoList = [
  {
    stt: '03',
    ten: 'Hồ sơ cấp GĐKN kết hôn',
    slug: 'gdknkethon',
    maManHinh: 'QLTT.QL.03',
    hinhThu: 'Hình – Quản lý, khai thác dữ liệu cấp giấy xác nhận tình trạng hôn nhân',
    cot: [
      ['STT', 'Number', 'Có', 'Tự tăng', 'Số thứ tự bản ghi.'],
      ['Họ tên người yêu cầu', 'Text', 'Có', '', 'Họ và tên người đề nghị cấp GĐKN.'],
      ['Ngày sinh', 'Date', 'Có', '', 'Ngày sinh của người yêu cầu (DD/MM/YYYY).'],
      ['Quốc tịch', 'Text', 'Có', 'Việt Nam', 'Quốc tịch người yêu cầu.'],
      ['Số giấy chứng nhận', 'Text', 'Có', '', 'Số giấy xác nhận tình trạng hôn nhân.'],
      ['Ngày cấp', 'Date', 'Có', '', 'Ngày cấp giấy xác nhận.'],
      ['Trạng thái', 'Status', 'Có', '', 'Trạng thái: Đã phê duyệt / Lỗi.'],
      ['Thao tác', 'Icon/Button', 'Không', '', 'Xem chi tiết bản ghi.'],
    ],
    tabChiTiet: 'Thông tin người yêu cầu',
    truongChiTiet: [
      ['Họ, chữ đệm, tên', 'Text', 'Có', '', 'Họ tên đầy đủ người yêu cầu cấp GĐKN.'],
      ['Ngày, tháng, năm sinh', 'Date', 'Có', '', 'Ngày sinh (DD/MM/YYYY).'],
      ['Dân tộc', 'Text', 'Có', '', 'Dân tộc người yêu cầu.'],
      ['Quốc tịch', 'Text', 'Có', 'Việt Nam', 'Quốc tịch.'],
      ['Nơi cư trú', 'Text', 'Có', '', 'Địa chỉ thường trú đầy đủ.'],
      ['Số giấy tờ tùy thân', 'Text', 'Có', '', 'Số CMND/CCCD.'],
      ['Số định danh cá nhân', 'Text', 'Có', '', 'Số định danh cá nhân 12 chữ số.'],
      ['Mục đích cấp', 'Text', 'Không', '', 'Mục đích xin cấp giấy xác nhận.'],
    ],
  },
  {
    stt: '04',
    ten: 'Hồ sơ đăng ký khai tử',
    slug: 'khaitu',
    maManHinh: 'QLTT.QL.04',
    hinhThu: 'Hình – Quản lý, khai thác dữ liệu đăng ký khai tử',
    cot: [
      ['STT', 'Number', 'Có', 'Tự tăng', 'Số thứ tự bản ghi.'],
      ['Họ tên người chết', 'Text', 'Có', '', 'Họ và tên người đã mất.'],
      ['Ngày sinh', 'Date', 'Có', '', 'Ngày sinh người đã mất (DD/MM/YYYY).'],
      ['Ngày chết', 'Date', 'Có', '', 'Ngày tử vong (DD/MM/YYYY).'],
      ['Nơi chết', 'Text', 'Có', '', 'Địa điểm xảy ra tử vong.'],
      ['Số giấy chứng nhận', 'Text', 'Có', '', 'Số giấy đăng ký khai tử.'],
      ['Ngày đăng ký', 'Date', 'Có', '', 'Ngày đăng ký khai tử.'],
      ['Trạng thái', 'Status', 'Có', '', 'Trạng thái: Đã phê duyệt / Lỗi.'],
      ['Thao tác', 'Icon/Button', 'Không', '', 'Xem chi tiết bản ghi.'],
    ],
    tabChiTiet: 'Thông tin người chết',
    truongChiTiet: [
      ['Họ, chữ đệm, tên người chết', 'Text', 'Có', '', 'Họ tên đầy đủ người đã mất.'],
      ['Ngày, tháng, năm sinh', 'Date', 'Có', '', 'Ngày sinh (DD/MM/YYYY).'],
      ['Giới tính', 'Text', 'Có', '', 'Giới tính người đã mất.'],
      ['Dân tộc', 'Text', 'Có', '', 'Dân tộc.'],
      ['Quốc tịch', 'Text', 'Có', 'Việt Nam', 'Quốc tịch.'],
      ['Nơi cư trú', 'Text', 'Có', '', 'Địa chỉ thường trú trước khi mất.'],
      ['Ngày chết', 'Date', 'Có', '', 'Ngày tử vong xác nhận.'],
      ['Nguyên nhân chết', 'Text', 'Không', '', 'Nguyên nhân tử vong.'],
      ['Nơi chết', 'Text', 'Có', '', 'Địa điểm xảy ra tử vong.'],
      ['Số giấy tờ tùy thân', 'Text', 'Không', '', 'CMND/CCCD người đã mất (nếu có).'],
    ],
  },
  {
    stt: '05',
    ten: 'Hồ sơ DK nhận cha, mẹ, con',
    slug: 'nhancha',
    maManHinh: 'QLTT.QL.05',
    hinhThu: 'Hình – Quản lý, khai thác dữ liệu đăng ký nhận cha, mẹ, con',
    cot: [
      ['STT', 'Number', 'Có', 'Tự tăng', 'Số thứ tự bản ghi.'],
      ['Họ tên người con', 'Text', 'Có', '', 'Họ và tên người con được nhận.'],
      ['Ngày sinh người con', 'Date', 'Có', '', 'Ngày sinh của người con (DD/MM/YYYY).'],
      ['Họ tên cha/mẹ', 'Text', 'Có', '', 'Họ và tên người cha hoặc mẹ thực hiện nhận.'],
      ['Số giấy chứng nhận', 'Text', 'Có', '', 'Số giấy đăng ký nhận cha, mẹ, con.'],
      ['Ngày đăng ký', 'Date', 'Có', '', 'Ngày đăng ký nhận cha, mẹ, con.'],
      ['Trạng thái', 'Status', 'Có', '', 'Trạng thái: Đã phê duyệt / Lỗi.'],
      ['Thao tác', 'Icon/Button', 'Không', '', 'Xem chi tiết bản ghi.'],
    ],
    tabChiTiet: 'Thông tin người con',
    truongChiTiet: [
      ['Họ, chữ đệm, tên người con', 'Text', 'Có', '', 'Họ tên đầy đủ người con.'],
      ['Ngày, tháng, năm sinh', 'Date', 'Có', '', 'Ngày sinh người con (DD/MM/YYYY).'],
      ['Giới tính', 'Text', 'Có', '', 'Giới tính người con.'],
      ['Dân tộc', 'Text', 'Có', '', 'Dân tộc người con.'],
      ['Quốc tịch', 'Text', 'Có', 'Việt Nam', 'Quốc tịch người con.'],
      ['Nơi cư trú', 'Text', 'Có', '', 'Địa chỉ cư trú của người con.'],
      ['Họ tên cha', 'Text', 'Không', '', 'Họ và tên người cha (nếu nhận cha).'],
      ['Họ tên mẹ', 'Text', 'Không', '', 'Họ và tên người mẹ (nếu nhận mẹ).'],
      ['Số định danh cá nhân', 'Text', 'Có', '', 'Số định danh cá nhân 12 chữ số của người con.'],
    ],
  },
  {
    stt: '06',
    ten: 'Hồ sơ đăng ký nuôi con nuôi',
    slug: 'nuoicnuoi',
    maManHinh: 'QLTT.QL.06',
    hinhThu: 'Hình – Quản lý, khai thác dữ liệu đăng ký nuôi con nuôi',
    cot: [
      ['STT', 'Number', 'Có', 'Tự tăng', 'Số thứ tự bản ghi.'],
      ['Họ tên con nuôi', 'Text', 'Có', '', 'Họ và tên người con nuôi.'],
      ['Ngày sinh con nuôi', 'Date', 'Có', '', 'Ngày sinh của con nuôi (DD/MM/YYYY).'],
      ['Họ tên cha/mẹ nuôi', 'Text', 'Có', '', 'Họ và tên cha hoặc mẹ nuôi.'],
      ['Số giấy chứng nhận', 'Text', 'Có', '', 'Số giấy đăng ký nuôi con nuôi.'],
      ['Ngày đăng ký', 'Date', 'Có', '', 'Ngày đăng ký nuôi con nuôi.'],
      ['Trạng thái', 'Status', 'Có', '', 'Trạng thái: Đã phê duyệt / Lỗi.'],
      ['Thao tác', 'Icon/Button', 'Không', '', 'Xem chi tiết bản ghi.'],
    ],
    tabChiTiet: 'Thông tin con nuôi',
    truongChiTiet: [
      ['Họ, chữ đệm, tên con nuôi', 'Text', 'Có', '', 'Họ tên đầy đủ của con nuôi.'],
      ['Ngày, tháng, năm sinh', 'Date', 'Có', '', 'Ngày sinh con nuôi (DD/MM/YYYY).'],
      ['Giới tính', 'Text', 'Có', '', 'Giới tính con nuôi.'],
      ['Dân tộc', 'Text', 'Có', '', 'Dân tộc con nuôi.'],
      ['Quốc tịch', 'Text', 'Có', 'Việt Nam', 'Quốc tịch con nuôi.'],
      ['Nơi cư trú trước khi nhận nuôi', 'Text', 'Có', '', 'Địa chỉ cư trú con nuôi trước khi được nhận.'],
      ['Họ tên cha nuôi', 'Text', 'Không', '', 'Họ và tên cha nuôi.'],
      ['Họ tên mẹ nuôi', 'Text', 'Không', '', 'Họ và tên mẹ nuôi.'],
      ['Số định danh cá nhân', 'Text', 'Không', '', 'Số định danh cá nhân của con nuôi (nếu có).'],
    ],
  },
  {
    stt: '07',
    ten: 'Hồ sơ đăng ký giám hộ',
    slug: 'giamho',
    maManHinh: 'QLTT.QL.07',
    hinhThu: 'Hình – Quản lý, khai thác dữ liệu đăng ký giám hộ',
    cot: [
      ['STT', 'Number', 'Có', 'Tự tăng', 'Số thứ tự bản ghi.'],
      ['Họ tên người được giám hộ', 'Text', 'Có', '', 'Họ và tên người được giám hộ.'],
      ['Ngày sinh', 'Date', 'Có', '', 'Ngày sinh người được giám hộ (DD/MM/YYYY).'],
      ['Họ tên người giám hộ', 'Text', 'Có', '', 'Họ và tên người thực hiện giám hộ.'],
      ['Số giấy chứng nhận', 'Text', 'Có', '', 'Số giấy đăng ký giám hộ.'],
      ['Ngày đăng ký', 'Date', 'Có', '', 'Ngày đăng ký giám hộ.'],
      ['Trạng thái', 'Status', 'Có', '', 'Trạng thái: Đã phê duyệt / Lỗi.'],
      ['Thao tác', 'Icon/Button', 'Không', '', 'Xem chi tiết bản ghi.'],
    ],
    tabChiTiet: 'Thông tin người được giám hộ',
    truongChiTiet: [
      ['Họ, chữ đệm, tên người được giám hộ', 'Text', 'Có', '', 'Họ tên đầy đủ người được giám hộ.'],
      ['Ngày, tháng, năm sinh', 'Date', 'Có', '', 'Ngày sinh (DD/MM/YYYY).'],
      ['Giới tính', 'Text', 'Có', '', 'Giới tính người được giám hộ.'],
      ['Dân tộc', 'Text', 'Có', '', 'Dân tộc.'],
      ['Quốc tịch', 'Text', 'Có', 'Việt Nam', 'Quốc tịch.'],
      ['Nơi cư trú', 'Text', 'Có', '', 'Địa chỉ cư trú người được giám hộ.'],
      ['Lý do giám hộ', 'Text', 'Có', '', 'Căn cứ pháp lý xác định việc giám hộ.'],
      ['Họ tên người giám hộ', 'Text', 'Có', '', 'Họ tên người thực hiện giám hộ.'],
      ['Số định danh người giám hộ', 'Text', 'Có', '', 'CCCD/CMND người giám hộ.'],
    ],
  },
  {
    stt: '08',
    ten: 'Hồ sơ DK chấm dứt giám hộ',
    slug: 'chamdutgiamho',
    maManHinh: 'QLTT.QL.08',
    hinhThu: 'Hình – Quản lý, khai thác dữ liệu đăng ký chấm dứt giám hộ',
    cot: [
      ['STT', 'Number', 'Có', 'Tự tăng', 'Số thứ tự bản ghi.'],
      ['Họ tên người được giám hộ', 'Text', 'Có', '', 'Họ và tên người được giám hộ.'],
      ['Họ tên người giám hộ', 'Text', 'Có', '', 'Họ và tên người giám hộ.'],
      ['Lý do chấm dứt', 'Text', 'Có', '', 'Căn cứ chấm dứt quan hệ giám hộ.'],
      ['Số giấy chứng nhận', 'Text', 'Có', '', 'Số giấy đăng ký chấm dứt giám hộ.'],
      ['Ngày đăng ký', 'Date', 'Có', '', 'Ngày đăng ký chấm dứt giám hộ.'],
      ['Trạng thái', 'Status', 'Có', '', 'Trạng thái: Đã phê duyệt / Lỗi.'],
      ['Thao tác', 'Icon/Button', 'Không', '', 'Xem chi tiết bản ghi.'],
    ],
    tabChiTiet: 'Thông tin chấm dứt giám hộ',
    truongChiTiet: [
      ['Họ tên người được giám hộ', 'Text', 'Có', '', 'Họ tên đầy đủ người được giám hộ.'],
      ['Ngày, tháng, năm sinh', 'Date', 'Có', '', 'Ngày sinh người được giám hộ.'],
      ['Số giấy đăng ký giám hộ gốc', 'Text', 'Có', '', 'Số giấy đăng ký giám hộ ban đầu.'],
      ['Họ tên người giám hộ', 'Text', 'Có', '', 'Họ tên người giám hộ.'],
      ['Lý do chấm dứt', 'Text', 'Có', '', 'Lý do chấm dứt quan hệ giám hộ (VD: người được giám hộ đã trưởng thành, người giám hộ qua đời...).'],
      ['Ngày chấm dứt', 'Date', 'Có', '', 'Ngày chính thức chấm dứt quan hệ giám hộ.'],
    ],
  },
  {
    stt: '09',
    ten: 'Hồ sơ DK thay đổi, cải chính, bổ sung TT hộ tịch, xác định lại dân tộc',
    slug: 'thaydoihotich',
    maManHinh: 'QLTT.QL.09',
    hinhThu: 'Hình – Quản lý, khai thác dữ liệu đăng ký thay đổi thông tin hộ tịch',
    cot: [
      ['STT', 'Number', 'Có', 'Tự tăng', 'Số thứ tự bản ghi.'],
      ['Họ tên người yêu cầu', 'Text', 'Có', '', 'Họ và tên người yêu cầu thay đổi.'],
      ['Nội dung thay đổi', 'Text', 'Có', '', 'Loại thông tin cần thay đổi/cải chính/bổ sung.'],
      ['Số giấy chứng nhận', 'Text', 'Có', '', 'Số giấy đăng ký thay đổi hộ tịch.'],
      ['Ngày đăng ký', 'Date', 'Có', '', 'Ngày đăng ký thay đổi.'],
      ['Trạng thái', 'Status', 'Có', '', 'Trạng thái: Đã phê duyệt / Lỗi.'],
      ['Thao tác', 'Icon/Button', 'Không', '', 'Xem chi tiết bản ghi.'],
    ],
    tabChiTiet: 'Thông tin thay đổi hộ tịch',
    truongChiTiet: [
      ['Họ tên người yêu cầu', 'Text', 'Có', '', 'Họ tên đầy đủ người yêu cầu thay đổi.'],
      ['Ngày, tháng, năm sinh', 'Date', 'Có', '', 'Ngày sinh người yêu cầu.'],
      ['Số giấy tờ tùy thân', 'Text', 'Có', '', 'CMND/CCCD người yêu cầu.'],
      ['Loại thay đổi', 'Text', 'Có', '', 'Thay đổi / Cải chính / Bổ sung / Xác định lại dân tộc.'],
      ['Nội dung cũ', 'Text', 'Có', '', 'Thông tin hộ tịch trước khi thay đổi.'],
      ['Nội dung mới', 'Text', 'Có', '', 'Thông tin hộ tịch sau khi thay đổi.'],
      ['Căn cứ pháp lý', 'Text', 'Có', '', 'Văn bản pháp lý làm căn cứ thay đổi.'],
    ],
  },
  {
    stt: '10',
    ten: 'Hồ sơ đăng ký kiểm sát việc giám hộ',
    slug: 'kiemsatgiamho',
    maManHinh: 'QLTT.QL.10',
    hinhThu: 'Hình – Quản lý, khai thác dữ liệu đăng ký kiểm sát việc giám hộ',
    cot: [
      ['STT', 'Number', 'Có', 'Tự tăng', 'Số thứ tự bản ghi.'],
      ['Họ tên người giám hộ', 'Text', 'Có', '', 'Họ và tên người giám hộ được kiểm sát.'],
      ['Họ tên người được giám hộ', 'Text', 'Có', '', 'Họ và tên người được giám hộ.'],
      ['Cơ quan kiểm sát', 'Text', 'Có', '', 'Tên cơ quan/cá nhân thực hiện kiểm sát.'],
      ['Ngày kiểm sát', 'Date', 'Có', '', 'Ngày thực hiện kiểm sát (DD/MM/YYYY).'],
      ['Số biên bản', 'Text', 'Có', '', 'Số biên bản kiểm sát giám hộ.'],
      ['Trạng thái', 'Status', 'Có', '', 'Trạng thái: Đã phê duyệt / Lỗi.'],
      ['Thao tác', 'Icon/Button', 'Không', '', 'Xem chi tiết bản ghi.'],
    ],
    tabChiTiet: 'Thông tin kiểm sát giám hộ',
    truongChiTiet: [
      ['Họ tên người giám hộ', 'Text', 'Có', '', 'Họ tên đầy đủ người giám hộ.'],
      ['Họ tên người được giám hộ', 'Text', 'Có', '', 'Họ tên đầy đủ người được giám hộ.'],
      ['Ngày, tháng, năm sinh người được giám hộ', 'Date', 'Có', '', 'Ngày sinh người được giám hộ.'],
      ['Nội dung kiểm sát', 'Text', 'Có', '', 'Chi tiết nội dung kiểm sát việc thực hiện nghĩa vụ giám hộ.'],
      ['Kết quả kiểm sát', 'Text', 'Có', '', 'Đánh giá kết quả: Đạt / Không đạt / Cần cải thiện.'],
      ['Cơ quan thực hiện kiểm sát', 'Text', 'Có', '', 'Tên cơ quan/cá nhân thực hiện kiểm sát.'],
      ['Ngày kiểm sát', 'Date', 'Có', '', 'Ngày thực hiện kiểm sát.'],
    ],
  },
  {
    stt: '11',
    ten: 'Hồ sơ đăng ký giám sát việc giám hộ',
    slug: 'giamsatgiamho',
    maManHinh: 'QLTT.QL.11',
    hinhThu: 'Hình – Quản lý, khai thác dữ liệu đăng ký giám sát việc giám hộ',
    cot: [
      ['STT', 'Number', 'Có', 'Tự tăng', 'Số thứ tự bản ghi.'],
      ['Họ tên người giám sát', 'Text', 'Có', '', 'Họ và tên người thực hiện giám sát.'],
      ['Họ tên người giám hộ', 'Text', 'Có', '', 'Họ và tên người giám hộ được giám sát.'],
      ['Họ tên người được giám hộ', 'Text', 'Có', '', 'Họ và tên người được giám hộ.'],
      ['Số biên bản giám sát', 'Text', 'Có', '', 'Số biên bản giám sát.'],
      ['Ngày giám sát', 'Date', 'Có', '', 'Ngày thực hiện giám sát (DD/MM/YYYY).'],
      ['Trạng thái', 'Status', 'Có', '', 'Trạng thái: Đã phê duyệt / Lỗi.'],
      ['Thao tác', 'Icon/Button', 'Không', '', 'Xem chi tiết bản ghi.'],
    ],
    tabChiTiet: 'Thông tin giám sát giám hộ',
    truongChiTiet: [
      ['Họ tên người giám sát', 'Text', 'Có', '', 'Họ tên đầy đủ người thực hiện giám sát.'],
      ['Quan hệ với người được giám hộ', 'Text', 'Có', '', 'Mối quan hệ của người giám sát với người được giám hộ.'],
      ['Họ tên người giám hộ', 'Text', 'Có', '', 'Họ tên người đang thực hiện giám hộ.'],
      ['Họ tên người được giám hộ', 'Text', 'Có', '', 'Họ tên người được giám hộ.'],
      ['Nội dung giám sát', 'Text', 'Có', '', 'Nội dung cụ thể được giám sát (tài sản, điều kiện sống...).'],
      ['Kết quả giám sát', 'Text', 'Có', '', 'Nhận xét, đánh giá sau khi giám sát.'],
      ['Ngày giám sát', 'Date', 'Có', '', 'Ngày thực hiện giám sát.'],
    ],
  },
  {
    stt: '12',
    ten: 'Hồ sơ ly hôn/hủy kết hôn ở nước ngoài',
    slug: 'lyhon',
    maManHinh: 'QLTT.QL.12',
    hinhThu: 'Hình – Quản lý, khai thác dữ liệu ghi vào sổ việc ly hôn/hủy kết hôn ở nước ngoài',
    cot: [
      ['STT', 'Number', 'Có', 'Tự tăng', 'Số thứ tự bản ghi.'],
      ['Họ tên bên yêu cầu', 'Text', 'Có', '', 'Họ và tên bên đề nghị ghi vào sổ.'],
      ['Họ tên bên còn lại', 'Text', 'Có', '', 'Họ và tên bên kia trong hôn nhân.'],
      ['Loại sự kiện', 'Text', 'Có', '', 'Ly hôn / Hủy kết hôn tại nước ngoài.'],
      ['Nước ngoài thực hiện', 'Text', 'Có', '', 'Tên quốc gia thực hiện ly hôn/hủy kết hôn.'],
      ['Số quyết định/bản án', 'Text', 'Có', '', 'Số quyết định ly hôn/hủy kết hôn của cơ quan nước ngoài.'],
      ['Ngày đăng ký ghi sổ', 'Date', 'Có', '', 'Ngày ghi vào sổ hộ tịch tại Việt Nam.'],
      ['Trạng thái', 'Status', 'Có', '', 'Trạng thái: Đã phê duyệt / Lỗi.'],
      ['Thao tác', 'Icon/Button', 'Không', '', 'Xem chi tiết bản ghi.'],
    ],
    tabChiTiet: 'Thông tin hồ sơ',
    truongChiTiet: [
      ['Họ tên bên yêu cầu', 'Text', 'Có', '', 'Họ tên đầy đủ người đề nghị ghi sổ.'],
      ['Ngày, tháng, năm sinh', 'Date', 'Có', '', 'Ngày sinh người yêu cầu.'],
      ['Số giấy tờ tùy thân', 'Text', 'Có', '', 'CMND/CCCD/Hộ chiếu người yêu cầu.'],
      ['Họ tên bên còn lại', 'Text', 'Có', '', 'Họ tên người kia trong hôn nhân.'],
      ['Loại sự kiện', 'Text', 'Có', '', 'Ly hôn / Hủy kết hôn.'],
      ['Tên quốc gia thực hiện', 'Text', 'Có', '', 'Quốc gia nơi thực hiện ly hôn/hủy kết hôn.'],
      ['Cơ quan có thẩm quyền nước ngoài', 'Text', 'Có', '', 'Tên tòa án hoặc cơ quan có thẩm quyền ở nước ngoài.'],
      ['Số quyết định/bản án', 'Text', 'Có', '', 'Số quyết định của cơ quan nước ngoài.'],
      ['Ngày quyết định có hiệu lực', 'Date', 'Có', '', 'Ngày quyết định ly hôn có hiệu lực pháp luật.'],
    ],
  },
];

// ============================================================
// Template chung cho Lịch sử kết nối API
// ============================================================
const TAB_LICHSU_KETNOI = (ma) => `
${ma}\\_02. Tab Lịch sử chỉnh sửa kết nối

Màn hình thông tin chung

![](images/mauthuthapCSDL_${ma.toLowerCase().replace(/[^a-z0-9]/g, '')}_img_003.png)

Hình – Thông tin lịch sử chỉnh sửa kết nối API

Mô tả thông tin trên màn hình

| **Trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |
| --- | --- | --- | --- | --- |
| Danh sách kết nối API | Label | Có |  | Nhãn tổng số kết nối API (VD: Đang hoạt động – Tổng: 3). |
| Tên API | Text | Có |  | Tên định danh kết nối API. |
| Trạng thái kết nối | Badge | Có |  | Đang kết nối (xanh) / Mất kết nối (đỏ). |
| Loại xác thực | Badge | Có |  | API-KEY / CLIENT-SECRET. |
| Mô tả | Text | Không |  | Mô tả ngắn mục đích kết nối. |
| Endpoint | Text | Có |  | Đường dẫn API endpoint. |
| Method | Text | Có | GET | HTTP Method (GET/POST). |
| Response Time | Text | Có |  | Thời gian phản hồi (VD: 120ms). |
| Lần kết nối cuối | DateTime | Có |  | Thời gian kết nối gần nhất (VD: 09/12/2025 14:30:25). |
| Số bản ghi/trang | Dropdown | Không | 10 | Số kết nối hiển thị mỗi trang. |

Chức năng trên màn hình

| **TT** | **Tên chức năng** | **Định dạng** | **Mô tả** |
| --- | --- | --- | --- |
| 1 | Làm mới kết nối | Icon Button | NSD bấm icon ↺ – Hệ thống kiểm tra lại trạng thái và cập nhật Response Time. |
| 2 | Chỉnh sửa cấu hình | Icon Button | NSD bấm icon ✏ – Hệ thống mở form chỉnh sửa thông tin cấu hình API. |
| 3 | Xác nhận kết nối | Icon Button | NSD bấm icon ✓ – Hệ thống xác nhận và lưu trạng thái kết nối. |
| 4 | Xóa kết nối | Icon Button | NSD bấm icon 🗑 – Hệ thống hiển thị xác nhận trước khi xóa. |
| 5 | Phân trang | Dropdown/Button | Thay đổi số bản ghi/trang hoặc chuyển trang. |
| 6 | Đóng | Button | Đóng popup, quay về danh sách chính. |
`;

const TAB_LICHSU_DONGBO = (ma) => `
${ma}\\_03. Tab Lịch sử đồng bộ

Màn hình thông tin chung

![](images/mauthuthapCSDL_${ma.toLowerCase().replace(/[^a-z0-9]/g, '')}_img_004.png)

Hình – Thông tin lịch sử đồng bộ

Mô tả thông tin trên màn hình

| **Trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |
| --- | --- | --- | --- | --- |
| Tổng số lần đồng bộ | Number | Có | Tự tăng | Tổng số lần đã thực hiện đồng bộ. |
| Thời gian | DateTime | Có |  | Thời điểm thực hiện đồng bộ (DD/MM/YYYY HH:MM:SS). |
| Trạng thái | Status | Có |  | Thành công (xanh ✓) / Mất phần (đỏ ✗). |
| Thêm mới | Number | Có |  | Số bản ghi mới được thêm trong lần đồng bộ. |
| Cập nhật | Number | Có |  | Số bản ghi được cập nhật. |
| Lỗi | Number | Có |  | Số bản ghi gặp lỗi. |
| Tổng số | Number | Có |  | Tổng bản ghi được xử lý. |
| Thời lượng | Text | Có |  | Thời gian xử lý (VD: 2.5s). |
| Số bản ghi/trang | Dropdown | Không | 10 | Số bản ghi hiển thị mỗi trang. |

Chức năng trên màn hình

| **TT** | **Tên chức năng** | **Định dạng** | **Mô tả** |
| --- | --- | --- | --- |
| 1 | Làm mới | Icon Button | NSD bấm ↺ – Hệ thống tải lại danh sách lịch sử đồng bộ mới nhất. |
| 2 | Phân trang | Dropdown/Button | Thay đổi số bản ghi/trang hoặc chuyển trang. |
| 3 | Đóng | Button | Đóng popup, quay về danh sách chính [${ma}\\_01]. |
`;

// ============================================================
// Tạo nội dung markdown cho một loại hồ sơ
// ============================================================
function genHoSo(hs) {
  const ma = hs.maManHinh;
  const slug = hs.slug;

  const cotRows = hs.cot.map(([ten, kieu, bb, md, mo]) =>
    `| ${ten} | ${kieu} | ${bb} | ${md} | ${mo} |`
  ).join('\n');

  const truongChiTietRows = hs.truongChiTiet.map(([ten, kieu, bb, md, mo]) =>
    `| ${ten} | ${kieu} | ${bb} | ${md} | ${mo} |`
  ).join('\n');

  return `
---

###### Thông tin chi tiết dữ liệu ${hs.ten}

${ma}\\_01.Màn danh sách dữ liệu ${hs.ten}

Màn hình thông tin chung

![](images/mauthuthapCSDL_${slug}_img_001.png)

${hs.hinhThu}

Mô tả thông tin trên màn hình

| **Trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |
| --- | --- | --- | --- | --- |
| **Thông tin thống kê tổng hợp** | | | | |
| Tổng số | Number | Có | Tự tăng | Tổng số hồ sơ ${hs.ten} trong hệ thống. |
| Mới | Number | Có | Tự tăng | Số hồ sơ mới được thêm vào. |
| Cập nhật | Number | Có | Tự tăng | Số hồ sơ đã được cập nhật. |
| Lỗi | Number | Có | Tự tăng | Số hồ sơ gặp lỗi trong quá trình đồng bộ. |
| **1. Khu vực tìm kiếm** | | | | |
| Từ khóa tìm kiếm | Text | Không | Trống | Nhập từ khóa để tìm kiếm nhanh hồ sơ. |
| Lọc nâng cao | Button | Không |  | Mở popup tìm kiếm nâng cao theo nhiều tiêu chí. |
| **2. Khu vực chức năng** | | | | |
| Xuất Excel | Button | Không |  | Xuất danh sách dữ liệu ra file Excel. |
| **3. Bảng danh sách dữ liệu** | | | | |
${cotRows}
| **4. Phân trang** | | | | |
| Số bản ghi hiển thị | Number | Không | 10 | Hiển thị số lượng bản ghi trên mỗi trang. |
| Trang hiện tại | Number | Không | 1 | Trang đang được xem. |
| Trước / Sau | Button | Không |  | Di chuyển giữa các trang dữ liệu. |

Chức năng trên màn hình

| **TT** | **Tên chức năng** | **Định dạng** | **Mô tả** |
| --- | --- | --- | --- |
| 1 | Tìm kiếm nhanh | Search Box | NSD nhập từ khóa. – Hệ thống lọc và hiển thị danh sách phù hợp. |
| 2 | Lọc nâng cao | Button | NSD bấm "Lọc nâng cao". – Hệ thống hiển thị popup tìm kiếm theo nhiều tiêu chí. |
| 3 | Xuất Excel | Button | NSD bấm "Xuất Excel". – Hệ thống xuất danh sách theo điều kiện lọc ra file Excel. |
| 4 | Xem chi tiết | Icon Button | NSD bấm icon xem ở cột Thao tác. – Hệ thống hiển thị popup chi tiết [${ma}\\_01\\_02]. |
| 5 | Chuyển tab | Tab | NSD bấm tab "Lịch sử chỉnh sửa kết nối" hoặc "Lịch sử đồng bộ". |
| 6 | Phân trang | Button | NSD bấm Trước/Sau hoặc chọn số trang. – Hệ thống hiển thị dữ liệu tương ứng. |

${ma}\\_01\\_02.Màn hình thông tin chi tiết

Màn hình thông tin chung

![](images/mauthuthapCSDL_${slug}_img_002.png)

Hình – Màn hình chi tiết bản ghi ${hs.ten}

Mô tả thông tin trên màn hình

| **Trường thông tin** | **Kiểu dữ liệu** | **Bắt buộc** | **Mặc định** | **Mô tả** |
| --- | --- | --- | --- | --- |
| **Tab: Thông tin hồ sơ** | | | | |
| Mã hồ sơ | Text | Có |  | Mã định danh hồ sơ trong hệ thống. |
| Ngày đăng ký | Date | Có |  | Ngày thực hiện đăng ký. |
| Nơi đăng ký | Text | Có |  | Cơ quan tiếp nhận đăng ký. |
| Trạng thái | Status | Có |  | Đã phê duyệt / Chờ duyệt. |
| **Tab: ${hs.tabChiTiet}** | | | | |
${truongChiTietRows}

Chức năng trên màn hình

| **TT** | **Tên chức năng** | **Định dạng** | **Mô tả** |
| --- | --- | --- | --- |
| 1 | Chuyển đổi tab | Tab | NSD bấm vào các tab thông tin. – Hệ thống hiển thị thông tin tương ứng. |
| 2 | Xuất file | Button | NSD bấm "Xuất file". – Hệ thống xuất thông tin chi tiết bản ghi ra file. |
| 3 | Đóng | Button | NSD bấm "Đóng". – Hệ thống đóng popup, quay về danh sách [${ma}\\_01]. |
${TAB_LICHSU_KETNOI(ma)}
${TAB_LICHSU_DONGBO(ma)}`;
}

// ============================================================
// Ghi vào file
// ============================================================
let content = '\n';
for (const hs of hoSoList) {
  content += genHoSo(hs);
}

fs.appendFileSync(OUT_FILE, content, 'utf8');
console.log(`✅ Đã append ${hoSoList.length} loại hồ sơ vào: ${OUT_FILE}`);
