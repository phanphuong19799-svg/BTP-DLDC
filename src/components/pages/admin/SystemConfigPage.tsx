import { useState } from 'react';
import { Sliders, Save, RotateCcw, Key, Clock, ShieldAlert, LogOut, Database, AlertCircle } from 'lucide-react';

interface SystemConfig {
  forcePasswordChangeOnFirstLogin: boolean;
  passwordExpiryDays: number;
  maxLoginAttempts: number;
  loginAttemptWindowMinutes: number;
  sessionTimeoutMinutes: number;
  backupSchedule: 'daily' | 'weekly' | 'monthly';
  backupRetentionDays: number;
  backupTime: string;
}

const defaultConfig: SystemConfig = {
  forcePasswordChangeOnFirstLogin: true,
  passwordExpiryDays: 90,
  maxLoginAttempts: 5,
  loginAttemptWindowMinutes: 15,
  sessionTimeoutMinutes: 30,
  backupSchedule: 'daily',
  backupRetentionDays: 30,
  backupTime: '02:00'
};

export function SystemConfigPage() {
  const [config, setConfig] = useState<SystemConfig>(defaultConfig);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = <K extends keyof SystemConfig>(
    key: K,
    value: SystemConfig[K]
  ) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Save configuration logic here
    console.log('Saving configuration:', config);
    setHasChanges(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sliders className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-slate-900">Thiết lập cấu hình hệ thống</h2>
              <p className="text-sm text-slate-600 mt-1">Cấu hình các tham số bảo mật và vận hành hệ thống</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              disabled={!hasChanges}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4" />
              Đặt lại mặc định
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Lưu cấu hình
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-800">
            <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span className="text-sm">Cấu hình đã được lưu thành công!</span>
          </div>
        </div>
      )}

      {/* Password Security Settings */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Key className="w-5 h-5 text-blue-600" />
            <h3 className="text-slate-900">Cấu hình bảo mật mật khẩu</h3>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* Force Password Change on First Login */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <label className="text-sm text-slate-900">
                Yêu cầu đổi mật khẩu khi đăng nhập lần đầu
              </label>
              <p className="text-xs text-slate-600 mt-1">
                Bắt buộc người dùng thay đổi mật khẩu mặc định ngay sau lần đăng nhập đầu tiên
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input
                type="checkbox"
                checked={config.forcePasswordChangeOnFirstLogin}
                onChange={(e) => handleChange('forcePasswordChangeOnFirstLogin', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Password Expiry */}
          <div>
            <label className="block text-sm text-slate-900 mb-2">
              Thời gian yêu cầu thay đổi mật khẩu (ngày)
            </label>
            <p className="text-xs text-slate-600 mb-3">
              Số ngày tối đa trước khi yêu cầu người dùng đổi mật khẩu
            </p>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="30"
                max="365"
                step="30"
                value={config.passwordExpiryDays}
                onChange={(e) => handleChange('passwordExpiryDays', parseInt(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="30"
                  max="365"
                  value={config.passwordExpiryDays}
                  onChange={(e) => handleChange('passwordExpiryDays', parseInt(e.target.value))}
                  className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-600">ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Security Settings */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            <h3 className="text-slate-900">Cấu hình bảo mật đăng nhập</h3>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* Max Login Attempts */}
          <div>
            <label className="block text-sm text-slate-900 mb-2">
              Số lần sai mật khẩu tối đa
            </label>
            <p className="text-xs text-slate-600 mb-3">
              Số lần đăng nhập sai tối đa trước khi khóa tài khoản tạm thời
            </p>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="3"
                max="10"
                value={config.maxLoginAttempts}
                onChange={(e) => handleChange('maxLoginAttempts', parseInt(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="3"
                  max="10"
                  value={config.maxLoginAttempts}
                  onChange={(e) => handleChange('maxLoginAttempts', parseInt(e.target.value))}
                  className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-600">lần</span>
              </div>
            </div>
          </div>

          {/* Login Attempt Window */}
          <div>
            <label className="block text-sm text-slate-900 mb-2">
              Giới hạn số lần đăng nhập sai trong khoảng thời gian (phút)
            </label>
            <p className="text-xs text-slate-600 mb-3">
              Khoảng thời gian tính các lần đăng nhập sai liên tiếp
            </p>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={config.loginAttemptWindowMinutes}
                onChange={(e) => handleChange('loginAttemptWindowMinutes', parseInt(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="5"
                  max="60"
                  step="5"
                  value={config.loginAttemptWindowMinutes}
                  onChange={(e) => handleChange('loginAttemptWindowMinutes', parseInt(e.target.value))}
                  className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-600">phút</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Session Settings */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-blue-600" />
            <h3 className="text-slate-900">Cấu hình phiên làm việc</h3>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* Session Timeout */}
          <div>
            <label className="block text-sm text-slate-900 mb-2">
              Thời gian timeout phiên làm việc (phút)
            </label>
            <p className="text-xs text-slate-600 mb-3">
              Thời gian không hoạt động trước khi tự động đăng xuất người dùng
            </p>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={config.sessionTimeoutMinutes}
                onChange={(e) => handleChange('sessionTimeoutMinutes', parseInt(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="5"
                  max="120"
                  step="5"
                  value={config.sessionTimeoutMinutes}
                  onChange={(e) => handleChange('sessionTimeoutMinutes', parseInt(e.target.value))}
                  className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-600">phút</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backup Settings */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-blue-600" />
            <h3 className="text-slate-900">Cấu hình chính sách sao lưu dự phòng</h3>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* Backup Schedule */}
          <div>
            <label className="block text-sm text-slate-900 mb-2">
              Tần suất sao lưu tự động
            </label>
            <p className="text-xs text-slate-600 mb-3">
              Lịch trình sao lưu dữ liệu định kỳ
            </p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleChange('backupSchedule', 'daily')}
                className={`px-4 py-3 rounded-lg border-2 transition-all ${
                  config.backupSchedule === 'daily'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-sm">Hàng ngày</div>
              </button>
              <button
                onClick={() => handleChange('backupSchedule', 'weekly')}
                className={`px-4 py-3 rounded-lg border-2 transition-all ${
                  config.backupSchedule === 'weekly'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-sm">Hàng tuần</div>
              </button>
              <button
                onClick={() => handleChange('backupSchedule', 'monthly')}
                className={`px-4 py-3 rounded-lg border-2 transition-all ${
                  config.backupSchedule === 'monthly'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-sm">Hàng tháng</div>
              </button>
            </div>
          </div>

          {/* Backup Time */}
          <div>
            <label className="block text-sm text-slate-900 mb-2">
              Thời gian sao lưu
            </label>
            <p className="text-xs text-slate-600 mb-3">
              Thời điểm trong ngày để thực hiện sao lưu tự động
            </p>
            <input
              type="time"
              value={config.backupTime}
              onChange={(e) => handleChange('backupTime', e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Backup Retention */}
          <div>
            <label className="block text-sm text-slate-900 mb-2">
              Thời gian lưu trữ bản sao lưu (ngày)
            </label>
            <p className="text-xs text-slate-600 mb-3">
              Số ngày giữ lại các bản sao lưu trước khi tự động xóa
            </p>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="7"
                max="365"
                step="7"
                value={config.backupRetentionDays}
                onChange={(e) => handleChange('backupRetentionDays', parseInt(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="7"
                  max="365"
                  value={config.backupRetentionDays}
                  onChange={(e) => handleChange('backupRetentionDays', parseInt(e.target.value))}
                  className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-600">ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="mb-2">
              <strong>Lưu ý quan trọng:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Thay đổi cấu hình có thể ảnh hưởng đến tất cả người dùng trong hệ thống</li>
              <li>Các thiết lập bảo mật nên được cân nhắc kỹ để đảm bảo cân bằng giữa an toàn và trải nghiệm người dùng</li>
              <li>Khuyến nghị thực hiện sao lưu trước khi thay đổi cấu hình quan trọng</li>
              <li>Tất cả các thay đổi sẽ được ghi lại trong nhật ký hệ thống</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-slate-900 mb-4">Tóm tắt cấu hình hiện tại</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Đổi mật khẩu lần đầu:</span>
            <span className="text-slate-900">
              {config.forcePasswordChangeOnFirstLogin ? 'Bắt buộc' : 'Không bắt buộc'}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Hết hạn mật khẩu:</span>
            <span className="text-slate-900">{config.passwordExpiryDays} ngày</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Số lần đăng nhập sai:</span>
            <span className="text-slate-900">{config.maxLoginAttempts} lần</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Khoảng thời gian giới hạn:</span>
            <span className="text-slate-900">{config.loginAttemptWindowMinutes} phút</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Timeout phiên:</span>
            <span className="text-slate-900">{config.sessionTimeoutMinutes} phút</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Lịch sao lưu:</span>
            <span className="text-slate-900">
              {config.backupSchedule === 'daily' ? 'Hàng ngày' : 
               config.backupSchedule === 'weekly' ? 'Hàng tuần' : 'Hàng tháng'}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Thời gian sao lưu:</span>
            <span className="text-slate-900">{config.backupTime}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Lưu trữ sao lưu:</span>
            <span className="text-slate-900">{config.backupRetentionDays} ngày</span>
          </div>
        </div>
      </div>
    </div>
  );
}