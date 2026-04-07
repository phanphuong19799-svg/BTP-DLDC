import * as React from 'react';
import { GenericProcessingPage } from './GenericProcessingPage';

export const datasets = [
  { id: "item_khsn", name: "1. Bộ dữ liệu hồ sơ đăng ký khai sinh", code: "API_ITEM_DS_1" },
  { id: "item_khth", name: "2. Bộ dữ liệu hồ sơ đăng ký kết hôn", code: "API_ITEM_DS_2" },
  { id: "item_kt", name: "3. Bộ dữ liệu hồ sơ đăng ký khai tử", code: "API_ITEM_DS_3" },
  { id: "item_gchn", name: "4. Bộ dữ liệu hồ sơ cấp giấy XNTNHN", code: "API_ITEM_DS_4" },
  { id: "item_giamho", name: "5. Bộ dữ liệu hồ sơ đăng ký giám hộ", code: "API_ITEM_DS_5" },
  { id: "item_nhan_cme", name: "6. Bộ dữ liệu hồ sơ nhận cha, mẹ, con", code: "API_ITEM_DS_6" },
  { id: "item_tdht", name: "7. Bộ dữ liệu hồ sơ thay đổi, cải chính hộ tịch", code: "API_ITEM_DS_7" },
  { id: "item_xddln", name: "8. Bộ dữ liệu hồ sơ xác định lại dân tộc", code: "API_ITEM_DS_8" },
  { id: "item_ks_ll", name: "9. Bộ dữ liệu hồ sơ khai sinh lưu động", code: "API_ITEM_DS_9" },
  { id: "item_kh_ll", name: "10. Bộ dữ liệu hồ sơ kết hôn lưu động", code: "API_ITEM_DS_10" },
  { id: "item_kt_ll", name: "11. Bộ dữ liệu hồ sơ khai tử lưu động", code: "API_ITEM_DS_11" },
  { id: "item_bks", name: "12. Bộ dữ liệu hồ sơ ghi chú ly hôn", code: "API_ITEM_DS_12" }
];

export function CivilRegistryProcessingPage() {
  return <GenericProcessingPage systemName="CSDL Hộ tịch điện tử" datasets={datasets} />;
}
