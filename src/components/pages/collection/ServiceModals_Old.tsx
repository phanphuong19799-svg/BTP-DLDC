import { useState, type FormEvent } from 'react';
import { 
  X, AlertCircle, CheckCircle, Upload, Eye, EyeOff, 
  Database, FileText, User, Plug, Settings, Plus,
  Calendar, Clock
} from 'lucide-react';
import { DataCollectionConfigSection } from './DataCollectionConfigSection';
import { ConnectionConfigSection } from './ConnectionConfigSection';
import { ContactInfoSection } from './ContactInfoSection';
import { DataDetailModal } from '../../DataDetailModal';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: any;
  onViewData?: (pageId?: string) => void;
}

type TabType = 'general' | 'contact' | 'connection' | 'collection';

// Modal Th├¬m mß╗¢i ph╞░╞íng thß╗⌐c
export function AddServiceModal({ isOpen, onClose }: ServiceModalProps) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [dataClassification, setDataClassification] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Th├¬m mß╗¢i ph╞░╞íng thß╗⌐c thu thß║¡p th├ánh c├┤ng!');
    onClose();
  };

  const tabs = [
    { id: 'general' as TabType, label: 'Th├┤ng tin chung', icon: <FileText className="w-4 h-4" /> },
    { id: 'contact' as TabType, label: 'Th├┤ng tin ─æ╞ín vß╗ï cung cß║Ñp', icon: <User className="w-4 h-4" /> },
    { id: 'connection' as TabType, label: 'Cß║Ñu h├¼nh kß║┐t nß╗æi', icon: <Plug className="w-4 h-4" /> },
    { id: 'collection' as TabType, label: 'Cß║Ñu h├¼nh thu thß║¡p', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg text-slate-900 font-medium">Th├┤ng tin kß║┐t nß╗æi</h2>
          <button onClick={onClose} title="─É├│ng" className="p-1 hover:bg-slate-100 rounded transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="border-b border-slate-200 bg-slate-50">
          <div className="flex gap-1 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm transition-colors relative flex items-center gap-2 ${
                  activeTab === tab.id ? 'text-blue-600 bg-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-4">
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="add-name" className="block text-sm text-slate-600 mb-1">T├¬n service <span className="text-red-500">*</span></label>
                  <input id="add-name" title="T├¬n service" type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="VD: API dß╗ïch vß╗Ñ dß╗» liß╗çu quß╗æc tß╗ïch" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="add-unit" className="block text-sm text-slate-600 mb-1">T├¬n ─æ╞ín vß╗ï <span className="text-red-500">*</span></label>
                    <input id="add-unit" title="T├¬n ─æ╞ín vß╗ï" type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhß║¡p t├¬n ─æ╞ín vß╗ï" />
                  </div>
                  <div>
                    <label htmlFor="add-system" className="block text-sm text-slate-600 mb-1">Hß╗ç thß╗æng <span className="text-red-500">*</span></label>
                    <input id="add-system" title="Hß╗ç thß╗æng" type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhß║¡p t├¬n hß╗ç thß╗æng" />
                  </div>
                </div>
                <div>
                  <label htmlFor="desc" className="block text-sm text-slate-600 mb-1">M├┤ tß║ú</label>
                  <textarea id="desc" title="M├┤ tß║ú" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="M├┤ tß║ú chi tiß║┐t" />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">─É├¡nh k├¿m v─ân bß║ún</label>
                  <div className="border border-slate-300 rounded-lg p-3 text-center py-6">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Click ─æß╗â chß╗ìn file PDF, DOCX</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'contact' && <ContactInfoSection />}
            {activeTab === 'connection' && <ConnectionConfigSection dataClassification={dataClassification} />}
            {activeTab === 'collection' && <DataCollectionConfigSection />}
          </div>
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Hß╗ºy</button>
            <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">L╞░u lß║íi</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal Chi tiß║┐t kß║┐t nß╗æi API
export function ViewServiceModal({ isOpen, onClose, service, onViewData }: ServiceModalProps) {
  const [showClientSecret, setShowClientSecret] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  
  if (!isOpen || !service) return null;

  const handleViewData = () => {
    if (onViewData) onViewData();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg text-slate-900 font-medium">Chi tiß║┐t kß║┐t nß╗æi API</h2>
          <button onClick={onClose} title="─É├│ng" className="p-1 hover:bg-slate-100 rounded transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Th├┤ng tin chung</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm text-slate-500 mb-1">T├¬n service</label>
                <div className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-100">
                  <p className="text-sm text-slate-900 font-medium">{service.name}</p>
                  <button
                    onClick={() => setShowDocModal(true)}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Xem v─ân bß║ún ─æ├¡nh k├¿m
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">─É╞ín vß╗ï quß║ún l├╜</label>
                <p className="text-sm text-slate-900">{service.managingUnit}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Hß╗ç thß╗æng</label>
                <p className="text-sm text-slate-900">{service.system || 'Hß╗ç thß╗æng quß║ún l├╜ DLDC'}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Trß║íng th├íi</label>
                <span className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Hoß║ít ─æß╗Öng
                </span>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Mß╗⌐c ─æß╗Ö bß║úo mß║¡t</label>
                <span className="inline-flex px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px]">Nß╗Öi bß╗Ö</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 pb-2 border-b border-slate-200">Th├┤ng tin kß║┐t nß╗æi</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Base URL</label>
                <p className="text-xs font-mono bg-slate-50 p-2 rounded border border-slate-100 text-blue-700">{service.baseUrl || 'https://api.moj.gov.vn'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Method</label>
                  <span className="px-1.5 py-0.5 bg-blue-600 text-white rounded text-[10px] font-bold">GET</span>
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Authentication</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 font-mono">ΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇó</span>
                    <button onClick={() => setShowClientSecret(!showClientSecret)} className="p-1 hover:bg-slate-100 rounded" title={showClientSecret ? "ß║¿n mß║¡t khß║⌐u" : "Hiß╗çn mß║¡t khß║⌐u"}>
                      <Eye className="w-3 h-3 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          {onViewData && (
            <button onClick={handleViewData} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Database className="w-4 h-4" /> Xem dß╗» liß╗çu
            </button>
          )}
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">─É├│ng</button>
        </div>
      </div>

      <DataDetailModal
        isOpen={showDocModal}
        onClose={() => setShowDocModal(false)}
        title={`V─ân bß║ún: ${service.name}`}
        totalRecords={service.recordsReceived || 0}
        newRecords={service.recordsNew || 0}
        updatedRecords={service.recordsUpdated || 0}
        errorRecords={service.validationDetails?.invalidRecords || 0}
      />
    </div>
  );
}

// Cß║Ñu phß║ºn kh├íc ─æ╞░ß╗úc giß╗» nguy├¬n cß║Ñu tr├║c
export function EditServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!isOpen || !service) return null;
  return null; // Giß║ún l╞░ß╗úc cho mß╗Ñc ti├¬u demo PDF
}

export function DeleteServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!isOpen || !service) return null;
  return null;
}

export function SettingsServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!isOpen || !service) return null;
  return null;
}
