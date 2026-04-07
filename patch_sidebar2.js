const fs = require('fs');

const tsFilePath = 'src/components/pages/processing/CivilRegistryProcessingPage.tsx';
let content = fs.readFileSync(tsFilePath, 'utf8');

const apiGroupsCode = fs.readFileSync('output_apis.ts', 'utf8');

// 1. the definitions
const exportInterfaceStart = content.indexOf('export interface ApiServiceItem {');
const activeServiceLogicStart = content.indexOf('const allServices = apiGroups.flatMap');

if (exportInterfaceStart !== -1 && activeServiceLogicStart !== -1) {
    // Re-inject the updated apiGroupsCode
    const oldDefs = content.substring(exportInterfaceStart, activeServiceLogicStart);
    
    let newDefs = `export interface ApiServiceItem {
  id: string;
  name: string;
  code: string;
}

export interface ApiGroup {
  groupName: string;
  items: ApiServiceItem[];
}

${apiGroupsCode}

  `;
    content = content.replace(oldDefs, newDefs);
}

// 2. Add expandedGroups state
if (!content.includes('expandedGroups')) {
    const isSendPopupOpenIndex = content.indexOf('const [isSendPopupOpen, setIsSendPopupOpen] = useState(false);');
    if (isSendPopupOpenIndex !== -1) {
       const injectState = `const [isSendPopupOpen, setIsSendPopupOpen] = useState(false);
  const [expandedSidebarGroups, setExpandedSidebarGroups] = useState<Record<string, boolean>>({'CSDL Hộ tịch điện tử': true});
  const toggleSidebarGroup = (groupName: string) => {
    setExpandedSidebarGroups(prev => ({...prev, [groupName]: !prev[groupName]}));
  };`;
       content = content.replace('const [isSendPopupOpen, setIsSendPopupOpen] = useState(false);', injectState);
    }
}

// 3. Replace the sidebar rendering
const sidebarStart = content.indexOf('<div className="flex-1 overflow-y-auto custom-scrollbar">');
const sidebarEnd = content.indexOf('</div>      </div>\n\n      {/* Main Content */}');

if (sidebarStart !== -1 && sidebarEnd !== -1) {
    const newSidebar = `<div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredGroups.map((group, gIdx) => {
            const isExpanded = !!expandedSidebarGroups[group.groupName];
            return (
            <div key={gIdx} className="border-b border-slate-100 last:border-b-0">
              <button 
                onClick={() => toggleSidebarGroup(group.groupName)}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between sticky top-0 z-10 transition-colors"
              >
                 <div className="flex items-center gap-2 text-left">
                     <h3 className="text-[13px] font-bold text-slate-700 uppercase leading-snug tracking-wide">{group.groupName}</h3>
                 </div>
                 <div className="flex items-center gap-2 shrink-0">
                     <span className="text-[11px] text-slate-500 font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-full">{group.items.length}</span>
                     {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                 </div>
              </button>
              {isExpanded && (
              <div className="bg-white max-h-[400px] overflow-y-auto custom-scrollbar">
                {group.items.map((service) => (
                  <button
                    key={service.id}
                    title={service.name}
                    onClick={() => setActiveServiceId(service.id)}
                    className={\`w-full text-left px-5 py-2.5 border-b border-slate-50 hover:bg-blue-50/30 transition-colors flex flex-col \${activeServiceId === service.id
                        ? 'bg-blue-50/60 border-l-4 border-l-blue-600 pl-[16px]'
                        : 'border-l-4 border-l-transparent'
                      }\`}
                  >
                    <div className={\`text-[13px] mb-1 leading-relaxed \${activeServiceId === service.id ? 'text-blue-700 font-semibold' : 'text-slate-600 font-medium'}\`}>
                      {service.name}
                    </div>
                  </button>
                ))}
              </div>
              )}
            </div>
            );
          })}
        `;
    content = content.substring(0, sidebarStart) + newSidebar + content.substring(sidebarEnd);
}

fs.writeFileSync(tsFilePath, content);
console.log("Successfully patched sidebar to Accordion!");
