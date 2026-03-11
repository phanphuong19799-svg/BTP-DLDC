export function ProcessingCooperationDeptPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xl text-slate-900 mb-4">Vụ Hợp tác quốc tế</h2>
        <p className="text-slate-600 mb-6">
          Quản lý xử lý dữ liệu từ Vụ Hợp tác quốc tế.
        </p>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm text-purple-900 mb-1">Thông tin</h3>
              <p className="text-sm text-purple-700">
                Trang xử lý dữ liệu Vụ Hợp tác quốc tế
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
