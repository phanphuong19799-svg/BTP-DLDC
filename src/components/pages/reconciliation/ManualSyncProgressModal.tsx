import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Clock, Loader2, Database } from 'lucide-react';

interface SyncTask {
  id: string;
  systemName: string;
  status: 'pending' | 'sending' | 'sent' | 'received';
}

interface ManualSyncProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManualSyncProgressModal({ isOpen, onClose }: ManualSyncProgressModalProps) {
  const [tasks, setTasks] = useState<SyncTask[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsComplete(false);
      // Initialize tasks
      const initialTasks: SyncTask[] = [
        { id: '1', systemName: 'Hệ thống Hộ tịch điện tử', status: 'pending' },
        { id: '2', systemName: 'Hệ thống Đăng ký kinh doanh', status: 'pending' },
        { id: '3', systemName: 'Hệ thống Công chứng', status: 'pending' },
      ];
      setTasks(initialTasks);

      // Simulation logic
      let timer1: any, timer2: any, timer3: any, timer4: any, timer5: any, timer6: any;

      // Start all tasks
      timer1 = setTimeout(() => {
        setTasks(prev => prev.map(t => ({ ...t, status: 'sending' })));
      }, 500);

      // Task 1 progress
      timer2 = setTimeout(() => setTasks(prev => prev.map(t => t.id === '1' ? { ...t, status: 'sent' } : t)), 1500);
      timer3 = setTimeout(() => setTasks(prev => prev.map(t => t.id === '1' ? { ...t, status: 'received' } : t)), 3000);

      // Task 2 progress
      timer4 = setTimeout(() => setTasks(prev => prev.map(t => t.id === '2' ? { ...t, status: 'sent' } : t)), 2000);
      timer5 = setTimeout(() => setTasks(prev => prev.map(t => t.id === '2' ? { ...t, status: 'received' } : t)), 4000);

      // Task 3 progress
      timer6 = setTimeout(() => setTasks(prev => prev.map(t => t.id === '3' ? { ...t, status: 'sent' } : t)), 2500);
      
      const timer7 = setTimeout(() => {
        setTasks(prev => prev.map(t => t.id === '3' ? { ...t, status: 'received' } : t));
        setIsComplete(true);
      }, 5000);

      return () => {
        clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3);
        clearTimeout(timer4); clearTimeout(timer5); clearTimeout(timer6);
        clearTimeout(timer7);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-slate-900">Đồng bộ dữ liệu đối soát</h2>
            <p className="text-sm text-slate-500 mt-1">Hệ thống đang tiến hành đồng bộ dữ liệu từ các bộ ngành</p>
          </div>
          <button onClick={onClose} title="Đóng" className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm flex items-center justify-between transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${task.status === 'received' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-900">{task.systemName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {task.status === 'pending' && <span className="text-xs font-medium text-slate-500">Đang chờ xử lý...</span>}
                    {task.status === 'sending' && (
                      <span className="text-xs font-medium text-blue-600 flex items-center gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang gửi yêu cầu...
                      </span>
                    )}
                    {task.status === 'sent' && (
                      <span className="text-xs font-medium text-amber-600 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 animate-pulse" /> Đã gửi yêu cầu, chờ phản hồi...
                      </span>
                    )}
                    {task.status === 'received' && (
                      <span className="text-xs font-medium text-green-600 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" /> Đã nhận gói tin đối soát
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="w-1/3 max-w-[150px]">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ease-in-out rounded-full ${
                      task.status === 'received' ? 'bg-green-500 w-full' : 
                      task.status === 'sent' ? 'bg-amber-500 w-2/3' : 
                      task.status === 'sending' ? 'bg-blue-500 w-1/3' : 'bg-transparent w-0'
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="text-sm font-medium text-slate-600">
            {isComplete ? (
              <span className="text-green-600 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Đã đồng bộ hoàn tất</span>
            ) : (
              <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin text-blue-600" /> Đang tiến hành đồng bộ ({tasks.filter(t => t.status === 'received').length}/{tasks.length})</span>
            )}
          </div>
          <button 
            onClick={onClose}
            className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
              isComplete 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'
            }`}
          >
            {isComplete ? 'Đóng' : 'Chạy ngầm'}
          </button>
        </div>
      </div>
    </div>
  );
}
