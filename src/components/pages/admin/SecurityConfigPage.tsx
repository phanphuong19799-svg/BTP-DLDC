import { useState } from 'react';
import { Key, Shield, Clock, RotateCcw, Save, Database } from 'lucide-react';

interface SecurityConfig {
  // Cấu hình bảo mật mật khẩu
  requireChangePasswordOnFirstLogin: boolean;
  passwordValidityDays: number; // Thời gian mật khẩu hợp lệ (bắt buộc đổi sau X ngày)
  passwordExpiryReminderDays: number; // Nhắc nhở trước X ngày
  enableWorkingHoursRestriction: boolean; // Giới hạn thời gian làm việc
  workingHoursStart: string; // Giờ bắt đầu (HH:mm)
  workingHoursEnd: string; // Giờ kết thúc (HH:mm)
  
  // Cấu hình bảo mật đăng nhập
  maxLoginAttempts: number;
  loginAttemptTimeWindowMinutes: number;
  
  // Cấu hình phiên làm việc
  sessionTimeoutMinutes: number;
  
  // Cấu hình sao lưu dự phòng
  enableAutoBackup: boolean;
  backupFrequencyHours: number;
  backupRetentionDays: number;
  backupLocation: string;
}

const defaultConfig: SecurityConfig = {
  requireChangePasswordOnFirstLogin: true,
  passwordValidityDays: 90,
  passwordExpiryReminderDays: 10,
  enableWorkingHoursRestriction: true,
  workingHoursStart: '09:00',
  workingHoursEnd: '17:00',
  maxLoginAttempts: 5,
  loginAttemptTimeWindowMinutes: 15,
  sessionTimeoutMinutes: 30,
  enableAutoBackup: true,
  backupFrequencyHours: 24,
  backupRetentionDays: 30,
  backupLocation: 'S3 Bucket',
};

export function SecurityConfigPage() {
  const [config, setConfig] = useState<SecurityConfig>(defaultConfig);
  const [hasChanges, setHasChanges] = useState(false);

  const handleConfigChange = (key: keyof SecurityConfig, value: number | boolean | string) => {
    setConfig({ ...config, [key]: value });
    setHasChanges(true);
  };

  const handleResetToDefault = () => {
    if (confirm('Bạn có chắc chắn muốn đặt lại về cấu hình mặc định?')) {
      setConfig(defaultConfig);
      setHasChanges(true);
    }
  };

  const handleSaveConfig = () => {
    // Lưu cấu hình
    console.log('Saving config:', config);
    alert('Đã lưu cấu hình thành công!');
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-slate-900 mb-2">Thiết lập cấu hình hệ thống</h1>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleResetToDefault}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Đặt lại mặc định
            </button>
            <button
              onClick={handleSaveConfig}
              disabled={!hasChanges}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Lưu cấu hình
            </button>
          </div>
        </div>
      </div>

      {/* Cấu hình bảo mật mật khẩu */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Key className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-slate-900">Cấu hình bảo mật mật khẩu</h2>
        </div>

        <div className="space-y-6">
          {/* Yêu cầu đổi mật khẩu khi đăng nhập lần đầu */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <label className="text-sm text-slate-900 block mb-1">
                  Yêu cầu đổi mật khẩu khi đăng nhập lần đầu
                </label>
                <p className="text-xs text-slate-500">
                  Bắt buộc người dùng thay đổi mật khẩu mặc định ngay sau lần đăng nhập đầu tiên
                </p>
              </div>
              <button
                onClick={() => handleConfigChange('requireChangePasswordOnFirstLogin', !config.requireChangePasswordOnFirstLogin)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  config.requireChangePasswordOnFirstLogin ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.requireChangePasswordOnFirstLogin ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Thời gian yêu cầu thay đổi mật khẩu */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <label className="text-sm text-slate-900 block mb-1">
                  Thời gian yêu cầu thay đổi mật khẩu (ngày)
                </label>
                <p className="text-xs text-slate-500">
                  Số ngày tối đa trước khi yêu cầu người dùng đổi mật khẩu
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <input
                  type="number"
                  value={config.passwordValidityDays}
                  onChange={(e) => handleConfigChange('passwordValidityDays', parseInt(e.target.value) || 0)}
                  className="w-20 px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  min="1"
                  max="365"
                />
                <span className="text-sm text-slate-600">ngày</span>
              </div>
            </div>
            <input
              type="range"
              min="30"
              max="365"
              step="1"
              value={config.passwordValidityDays}
              onChange={(e) => handleConfigChange('passwordValidityDays', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb-blue"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>30 ngày</span>
              <span>365 ngày</span>
            </div>
          </div>

          {/* Nhắc nhở trước khi mật khẩu hết hạn */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <label className="text-sm text-slate-900 block mb-1">
                  Nhắc nhở trước khi mật khẩu hết hạn (ngày)
                </label>
                <p className="text-xs text-slate-500">
                  Số ngày trước khi mật khẩu hết hạn để nhắc nhở người dùng
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <input
                  type="number"
                  value={config.passwordExpiryReminderDays}
                  onChange={(e) => handleConfigChange('passwordExpiryReminderDays', parseInt(e.target.value) || 0)}
                  className="w-20 px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  min="1"
                  max="30"
                />
                <span className="text-sm text-slate-600">ngày</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={config.passwordExpiryReminderDays}
              onChange={(e) => handleConfigChange('passwordExpiryReminderDays', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb-blue"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1 ngày</span>
              <span>30 ngày</span>
            </div>
          </div>

          {/* Giới hạn thời gian làm việc */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <label className="text-sm text-slate-900 block mb-1">
                  Giới hạn thời gian làm việc
                </label>
                <p className="text-xs text-slate-500">
                  Giới hạn truy cập hệ thống trong khoảng thời gian làm việc
                </p>
              </div>
              <button
                onClick={() => handleConfigChange('enableWorkingHoursRestriction', !config.enableWorkingHoursRestriction)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  config.enableWorkingHoursRestriction ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.enableWorkingHoursRestriction ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Giờ bắt đầu làm việc */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <label className="text-sm text-slate-900 block mb-1">
                  Giờ bắt đầu làm việc
                </label>
                <p className="text-xs text-slate-500">
                  Giờ bắt đầu truy cập hệ thống
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <input
                  type="time"
                  value={config.workingHoursStart}
                  onChange={(e) => handleConfigChange('workingHoursStart', e.target.value)}
                  className="w-32 px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Giờ kết thúc làm việc */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <label className="text-sm text-slate-900 block mb-1">
                  Giờ kết thúc làm việc
                </label>
                <p className="text-xs text-slate-500">
                  Giờ kết thúc truy cập hệ thống
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <input
                  type="time"
                  value={config.workingHoursEnd}
                  onChange={(e) => handleConfigChange('workingHoursEnd', e.target.value)}
                  className="w-32 px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cấu hình bảo mật đăng nhập */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-slate-900">Cấu hình bảo mật đăng nhập</h2>
        </div>

        <div className="space-y-6">
          {/* Số lần sai mật khẩu tối đa */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <label className="text-sm text-slate-900 block mb-1">
                  Số lần sai mật khẩu tối đa
                </label>
                <p className="text-xs text-slate-500">
                  Số lần đăng nhập sai tối đa trước khi khóa tài khoản tạm thời
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <input
                  type="number"
                  value={config.maxLoginAttempts}
                  onChange={(e) => handleConfigChange('maxLoginAttempts', parseInt(e.target.value) || 0)}
                  className="w-20 px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  min="3"
                  max="10"
                />
                <span className="text-sm text-slate-600">lần</span>
              </div>
            </div>
            <input
              type="range"
              min="3"
              max="10"
              step="1"
              value={config.maxLoginAttempts}
              onChange={(e) => handleConfigChange('maxLoginAttempts', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb-blue"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>3 lần</span>
              <span>10 lần</span>
            </div>
          </div>

          {/* Giới hạn số lần đăng nhập sai trong khoảng thời gian */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <label className="text-sm text-slate-900 block mb-1">
                  Giới hạn số lần đăng nhập sai trong khoảng thời gian (phút)
                </label>
                <p className="text-xs text-slate-500">
                  Khoảng thời gian các lần đăng nhập sai liên tiếp
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <input
                  type="number"
                  value={config.loginAttemptTimeWindowMinutes}
                  onChange={(e) => handleConfigChange('loginAttemptTimeWindowMinutes', parseInt(e.target.value) || 0)}
                  className="w-20 px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  min="5"
                  max="60"
                />
                <span className="text-sm text-slate-600">phút</span>
              </div>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={config.loginAttemptTimeWindowMinutes}
              onChange={(e) => handleConfigChange('loginAttemptTimeWindowMinutes', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb-blue"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>5 phút</span>
              <span>60 phút</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cấu hình phiên làm việc */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-slate-900">Cấu hình phiên làm việc</h2>
        </div>

        <div className="space-y-6">
          {/* Thời gian timeout phiên làm việc */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <label className="text-sm text-slate-900 block mb-1">
                  Thời gian timeout phiên làm việc (phút)
                </label>
                <p className="text-xs text-slate-500">
                  Thời gian không hoạt động trước khi đăng xuất tự động người dùng
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <input
                  type="number"
                  value={config.sessionTimeoutMinutes}
                  onChange={(e) => handleConfigChange('sessionTimeoutMinutes', parseInt(e.target.value) || 0)}
                  className="w-20 px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  min="5"
                  max="120"
                />
                <span className="text-sm text-slate-600">phút</span>
              </div>
            </div>
            <input
              type="range"
              min="5"
              max="120"
              step="5"
              value={config.sessionTimeoutMinutes}
              onChange={(e) => handleConfigChange('sessionTimeoutMinutes', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb-blue"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>5 phút</span>
              <span>120 phút</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cấu hình sao lưu dự phòng */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
            <Save className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-slate-900">Cấu hình sao lưu dự phòng</h2>
        </div>

        <div className="space-y-6">
          {/* Bật tự động sao lưu */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <label className="text-sm text-slate-900 block mb-1">
                  Bật tự động sao lưu
                </label>
                <p className="text-xs text-slate-500">
                  Tự động sao lưu dữ liệu hệ thống theo lịch trình
                </p>
              </div>
              <button
                onClick={() => handleConfigChange('enableAutoBackup', !config.enableAutoBackup)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  config.enableAutoBackup ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.enableAutoBackup ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Tần suất sao lưu */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <label className="text-sm text-slate-900 block mb-1">
                  Tần suất sao lưu (giờ)
                </label>
                <p className="text-xs text-slate-500">
                  Số giờ giữa các lần sao lưu tự động
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <input
                  type="number"
                  value={config.backupFrequencyHours}
                  onChange={(e) => handleConfigChange('backupFrequencyHours', parseInt(e.target.value) || 0)}
                  className="w-20 px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  min="1"
                  max="24"
                />
                <span className="text-sm text-slate-600">giờ</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              step="1"
              value={config.backupFrequencyHours}
              onChange={(e) => handleConfigChange('backupFrequencyHours', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb-blue"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1 giờ</span>
              <span>24 giờ</span>
            </div>
          </div>

          {/* Thời gian giữ lại sao lưu */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <label className="text-sm text-slate-900 block mb-1">
                  Thời gian giữ lại sao lưu (ngày)
                </label>
                <p className="text-xs text-slate-500">
                  Số ngày giữ lại các bản sao lưu trước khi xóa
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <input
                  type="number"
                  value={config.backupRetentionDays}
                  onChange={(e) => handleConfigChange('backupRetentionDays', parseInt(e.target.value) || 0)}
                  className="w-20 px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  min="1"
                  max="365"
                />
                <span className="text-sm text-slate-600">ngày</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="365"
              step="1"
              value={config.backupRetentionDays}
              onChange={(e) => handleConfigChange('backupRetentionDays', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb-blue"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1 ngày</span>
              <span>365 ngày</span>
            </div>
          </div>

          {/* Vị trí lưu trữ sao lưu */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <label className="text-sm text-slate-900 block mb-1">
                  Vị trí lưu trữ sao lưu
                </label>
                <p className="text-xs text-slate-500">
                  Địa điểm lưu trữ các bản sao lưu
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <input
                  type="text"
                  value={config.backupLocation}
                  onChange={(e) => handleConfigChange('backupLocation', e.target.value)}
                  className="w-40 px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save reminder */}
      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-yellow-600">⚠</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-yellow-800">
                Bạn có thay đổi chưa được lưu. Nhấn <strong>"Lưu cấu hình"</strong> để áp dụng các thay đổi.
              </p>
            </div>
            <button
              onClick={handleSaveConfig}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2 flex-shrink-0"
            >
              <Save className="w-4 h-4" />
              Lưu ngay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}