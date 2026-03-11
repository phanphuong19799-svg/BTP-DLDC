export function ProcessingJudicialSupportPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xl text-slate-900 mb-4">Cục Bổ trợ tư pháp</h2>
        <p className="text-slate-600 mb-6">
          Quản lý xử lý dữ liệu từ Cục Bổ trợ tư pháp.
        </p>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm text-purple-900 mb-1">Thông tin</h3>
              <p className="text-sm text-purple-700">
                Trang xử lý dữ liệu Cục Bổ trợ tư pháp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
