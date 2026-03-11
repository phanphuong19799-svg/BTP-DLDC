export function ProcessingInspectionPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xl text-slate-900 mb-4">Cục Kiểm tra văn bản và Quản lý xử lý vi phạm hành chính</h2>
        <p className="text-slate-600 mb-6">
          Quản lý xử lý dữ liệu từ Cục Kiểm tra văn bản và Quản lý xử lý vi phạm hành chính.
        </p>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm text-purple-900 mb-1">Thông tin</h3>
              <p className="text-sm text-purple-700">
                Trang xử lý dữ liệu Cục Kiểm tra văn bản và Quản lý xử lý vi phạm hành chính
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
