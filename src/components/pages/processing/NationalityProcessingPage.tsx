import * as React from 'react';
import { GenericProcessingPage } from './GenericProcessingPage';

export const datasets = [
  { id: "item_nhap_qt", name: "1. Bộ dữ liệu hồ sơ xin nhập quốc tịch", code: "API_ITEM_QT_1" },
  { id: "item_thoi_qt", name: "2. Bộ dữ liệu hồ sơ xin thôi quốc tịch", code: "API_ITEM_QT_2" },
  { id: "item_trolai_qt", name: "3. Bộ dữ liệu hồ sơ xin trở lại quốc tịch", code: "API_ITEM_QT_3" }
];

export function NationalityProcessingPage() {
  return <GenericProcessingPage systemName="HT quản lý hồ sơ QT" datasets={datasets} />;
}
