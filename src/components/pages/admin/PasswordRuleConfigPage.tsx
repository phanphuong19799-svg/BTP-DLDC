import { useState } from 'react';
import { Key, CheckCircle2, XCircle, Save, RotateCcw } from 'lucide-react';

interface PasswordRule {
  minLength: number;
  maxLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  specialCharsAllowed: string;
  minUppercase: number;
  minLowercase: number;
  minNumbers: number;
  minSpecialChars: number;
}

const defaultRule: PasswordRule = {
  minLength: 8,
  maxLength: 32,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  specialCharsAllowed: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  minUppercase: 1,
  minLowercase: 1,
  minNumbers: 1,
  minSpecialChars: 1,
};

export function PasswordRuleConfigPage() {
  const [rule, setRule] = useState<PasswordRule>(defaultRule);
  const [hasChanges, setHasChanges] = useState(false);
  const [testPassword, setTestPassword] = useState('');

  const handleRuleChange = (key: keyof PasswordRule, value: number | boolean | string) => {
    setRule({ ...rule, [key]: value });
    setHasChanges(true);
  };

  const handleResetToDefault = () => {
    if (confirm('Bạn có chắc chắn muốn đặt lại về quy tắc mặc định?')) {
      setRule(defaultRule);
      setHasChanges(true);
    }
  };

  const handleSaveRule = () => {
    console.log('Saving rule:', rule);
    alert('Đã lưu quy tắc mật khẩu thành công!');
    setHasChanges(false);
  };

  // Validate test password
  const validatePassword = (password: string) => {
    const results = {
      length: password.length >= rule.minLength && password.length <= rule.maxLength,
      uppercase: !rule.requireUppercase || (password.match(/[A-Z]/g) || []).length >= rule.minUppercase,
      lowercase: !rule.requireLowercase || (password.match(/[a-z]/g) || []).length >= rule.minLowercase,
      numbers: !rule.requireNumbers || (password.match(/[0-9]/g) || []).length >= rule.minNumbers,
      specialChars: !rule.requireSpecialChars || 
        (password.split('').filter(char => rule.specialCharsAllowed.includes(char)).length >= rule.minSpecialChars),
    };
    
    return results;
  };

  const validationResults = testPassword ? validatePassword(testPassword) : null;
  const isPasswordValid = validationResults && Object.values(validationResults).every(v => v);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Key className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-slate-900 mb-2">Thiết lập quy tắc đặt mật khẩu</h1>
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
              onClick={handleSaveRule}
              disabled={!hasChanges}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Lưu quy tắc
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột trái: Cấu hình quy tắc */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quy tắc về độ dài mật khẩu */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-slate-900">Quy tắc về độ dài mật khẩu</h2>
            </div>

            <div className="space-y-6">
              {/* Số ký tự tối thiểu */}
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <label className="text-sm text-slate-900 block mb-1">
                      Số ký tự tối thiểu
                    </label>
                    <p className="text-xs text-slate-500">
                      Độ dài tối thiểu của mật khẩu
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <input
                      type="number"
                      value={rule.minLength}
                      onChange={(e) => handleRuleChange('minLength', parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                      min="4"
                      max="32"
                    />
                    <span className="text-sm text-slate-600">ký tự</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="4"
                  max="32"
                  step="1"
                  value={rule.minLength}
                  onChange={(e) => handleRuleChange('minLength', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb-blue"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>4 ký tự</span>
                  <span>32 ký tự</span>
                </div>
              </div>

              {/* Số ký tự tối đa */}
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <label className="text-sm text-slate-900 block mb-1">
                      Số ký tự tối đa
                    </label>
                    <p className="text-xs text-slate-500">
                      Độ dài tối đa của mật khẩu
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <input
                      type="number"
                      value={rule.maxLength}
                      onChange={(e) => handleRuleChange('maxLength', parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                      min="8"
                      max="128"
                    />
                    <span className="text-sm text-slate-600">ký tự</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="8"
                  max="128"
                  step="1"
                  value={rule.maxLength}
                  onChange={(e) => handleRuleChange('maxLength', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb-blue"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>8 ký tự</span>
                  <span>128 ký tự</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quy tắc về loại ký tự */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-slate-900">Quy tắc về loại ký tự</h2>
            </div>

            <div className="space-y-6">
              {/* Yêu cầu chữ hoa */}
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <label className="text-sm text-slate-900 block mb-1">
                      Yêu cầu chữ hoa (A-Z)
                    </label>
                    <p className="text-xs text-slate-500">
                      Mật khẩu phải chứa ít nhất một chữ cái viết hoa
                    </p>
                  </div>
                  <button
                    onClick={() => handleRuleChange('requireUppercase', !rule.requireUppercase)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      rule.requireUppercase ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        rule.requireUppercase ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {rule.requireUppercase && (
                  <div className="ml-4 pl-4 border-l-2 border-blue-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <label className="text-xs text-slate-700 block">
                          Số lượng chữ hoa tối thiểu
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={rule.minUppercase}
                          onChange={(e) => handleRuleChange('minUppercase', parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                          min="1"
                          max="10"
                        />
                        <span className="text-xs text-slate-600">ký tự</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Yêu cầu chữ thường */}
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <label className="text-sm text-slate-900 block mb-1">
                      Yêu cầu chữ thường (a-z)
                    </label>
                    <p className="text-xs text-slate-500">
                      Mật khẩu phải chứa ít nhất một chữ cái viết thường
                    </p>
                  </div>
                  <button
                    onClick={() => handleRuleChange('requireLowercase', !rule.requireLowercase)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      rule.requireLowercase ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        rule.requireLowercase ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {rule.requireLowercase && (
                  <div className="ml-4 pl-4 border-l-2 border-blue-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <label className="text-xs text-slate-700 block">
                          Số lượng chữ thường tối thiểu
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={rule.minLowercase}
                          onChange={(e) => handleRuleChange('minLowercase', parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                          min="1"
                          max="10"
                        />
                        <span className="text-xs text-slate-600">ký tự</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Yêu cầu số */}
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <label className="text-sm text-slate-900 block mb-1">
                      Yêu cầu số (0-9)
                    </label>
                    <p className="text-xs text-slate-500">
                      Mật khẩu phải chứa ít nhất một chữ số
                    </p>
                  </div>
                  <button
                    onClick={() => handleRuleChange('requireNumbers', !rule.requireNumbers)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      rule.requireNumbers ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        rule.requireNumbers ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {rule.requireNumbers && (
                  <div className="ml-4 pl-4 border-l-2 border-blue-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <label className="text-xs text-slate-700 block">
                          Số lượng chữ số tối thiểu
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={rule.minNumbers}
                          onChange={(e) => handleRuleChange('minNumbers', parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                          min="1"
                          max="10"
                        />
                        <span className="text-xs text-slate-600">ký tự</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Yêu cầu ký tự đặc biệt */}
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <label className="text-sm text-slate-900 block mb-1">
                      Yêu cầu ký tự đặc biệt
                    </label>
                    <p className="text-xs text-slate-500">
                      Mật khẩu phải chứa ít nhất một ký tự đặc biệt
                    </p>
                  </div>
                  <button
                    onClick={() => handleRuleChange('requireSpecialChars', !rule.requireSpecialChars)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      rule.requireSpecialChars ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        rule.requireSpecialChars ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {rule.requireSpecialChars && (
                  <div className="ml-4 pl-4 border-l-2 border-blue-200 space-y-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <label className="text-xs text-slate-700 block">
                          Số lượng ký tự đặc biệt tối thiểu
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={rule.minSpecialChars}
                          onChange={(e) => handleRuleChange('minSpecialChars', parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                          min="1"
                          max="10"
                        />
                        <span className="text-xs text-slate-600">ký tự</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs text-slate-700 block mb-1">
                        Danh sách ký tự đặc biệt cho phép
                      </label>
                      <input
                        type="text"
                        value={rule.specialCharsAllowed}
                        onChange={(e) => handleRuleChange('specialCharsAllowed', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="!@#$%^&*()_+-=[]{}|;:,.<>?"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Nhập các ký tự đặc biệt được phép sử dụng
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải: Kiểm tra mật khẩu */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-slate-900">Kiểm tra mật khẩu</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-900 block mb-2">
                  Nhập mật khẩu thử nghiệm
                </label>
                <input
                  type="text"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập mật khẩu để kiểm tra..."
                />
              </div>

              {testPassword && validationResults && (
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Kết quả kiểm tra:</span>
                    {isPasswordValid ? (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                        Hợp lệ
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                        Không hợp lệ
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      {validationResults.length ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`text-xs ${validationResults.length ? 'text-green-700' : 'text-red-700'}`}>
                        Độ dài: {testPassword.length} ký tự ({rule.minLength}-{rule.maxLength})
                      </span>
                    </div>

                    {rule.requireUppercase && (
                      <div className="flex items-start gap-2">
                        {validationResults.uppercase ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-xs ${validationResults.uppercase ? 'text-green-700' : 'text-red-700'}`}>
                          Chữ hoa: {(testPassword.match(/[A-Z]/g) || []).length} / {rule.minUppercase}
                        </span>
                      </div>
                    )}

                    {rule.requireLowercase && (
                      <div className="flex items-start gap-2">
                        {validationResults.lowercase ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-xs ${validationResults.lowercase ? 'text-green-700' : 'text-red-700'}`}>
                          Chữ thường: {(testPassword.match(/[a-z]/g) || []).length} / {rule.minLowercase}
                        </span>
                      </div>
                    )}

                    {rule.requireNumbers && (
                      <div className="flex items-start gap-2">
                        {validationResults.numbers ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-xs ${validationResults.numbers ? 'text-green-700' : 'text-red-700'}`}>
                          Chữ số: {(testPassword.match(/[0-9]/g) || []).length} / {rule.minNumbers}
                        </span>
                      </div>
                    )}

                    {rule.requireSpecialChars && (
                      <div className="flex items-start gap-2">
                        {validationResults.specialChars ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-xs ${validationResults.specialChars ? 'text-green-700' : 'text-red-700'}`}>
                          Ký tự đặc biệt: {testPassword.split('').filter(char => rule.specialCharsAllowed.includes(char)).length} / {rule.minSpecialChars}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!testPassword && (
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500 italic">
                    Nhập mật khẩu vào ô bên trên để kiểm tra xem mật khẩu có đáp ứng các quy tắc đã thiết lập hay không.
                  </p>
                </div>
              )}
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
                Bạn có thay đổi chưa được lưu. Nhấn <strong>"Lưu quy tắc"</strong> để áp dụng các thay đổi.
              </p>
            </div>
            <button
              onClick={handleSaveRule}
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