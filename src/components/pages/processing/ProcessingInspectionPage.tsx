import { GenericProcessingPage } from './GenericProcessingPage';

export function ProcessingInspectionPage() {
  const datasets = [
    { id: '1', name: 'Dữ liệu CSDL quốc gia về xử lý vi phạm hành chính' },
  ];

  return (
    <GenericProcessingPage 
      systemName="Quản lý xử lý vi phạm hành chính" 
      datasets={datasets} 
    />
  );
}
