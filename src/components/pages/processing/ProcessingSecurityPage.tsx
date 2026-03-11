export function ProcessingSecurityPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xl text-slate-900 mb-4">Cục Đăng ký giao dịch bảo đảm và BTNN</h2>
        <p className="text-slate-600 mb-6">
          Quản lý xử lý dữ liệu từ Cục Đăng ký giao dịch bảo đảm và Bồi thường Nhà nước.
        </p>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm text-purple-900 mb-1">Thông tin</h3>
              <p className="text-sm text-purple-700">
                Trang xử lý dữ liệu Cục Đăng ký giao dịch bảo đảm và BTNN
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
