const fs = require('fs');

const tsFilePath = 'src/components/pages/processing/CivilRegistryProcessingPage.tsx';
let content = fs.readFileSync(tsFilePath, 'utf8');

// 1. Read apiGroups from output_apis.ts and insert it.
const apiGroupsCode = fs.readFileSync('output_apis.ts', 'utf8');

// The original interface ApiService:
const importIndex = content.indexOf('interface ApiService {');
// The original apiServices array definition ends at export function
const apiServicesEnd = content.indexOf('export function CivilRegistryProcessingPage() {');

if (importIndex === -1 || apiServicesEnd === -1) {
  console.log("Could not find boundaries");
  process.exit(1);
}

const newDefs = `
export interface ApiServiceItem {
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

content = content.substring(0, importIndex) + newDefs + content.substring(apiServicesEnd);

// 2. Change activeServiceId to default to the first id
const initialId = 'item_8vf6yi71x'; // This is 'Bộ dữ liệu hồ sơ đăng ký khai sinh', I'll just hardcode it or dynamically extract.
const stateBefore = 'const [activeServiceId, setActiveServiceId] = useState(\'dk_khai_sinh\');';
let defaultId = 'item_dpcvv7pmz'; // Just pick one
const defaultMatch = apiGroupsCode.match(/id: "([^"]+)"/);
if (defaultMatch) defaultId = defaultMatch[1];

content = content.replace(stateBefore, `const [activeServiceId, setActiveServiceId] = useState('${defaultId}');`);

// 3. Find activeService logic
const activeServiceLogicStart = content.indexOf('const activeService = apiServices.find');
const mainContentStart = content.indexOf('return (');

if (activeServiceLogicStart === -1 || mainContentStart === -1) {
    console.log("Could not find active service logic");
    process.exit(1);
}

const newActiveServiceLogic = `
  const allServices = apiGroups.flatMap(g => g.items);
  const activeService = allServices.find(s => s.id === activeServiceId) || allServices[0];

  const filteredGroups = apiGroups.map(group => ({
    ...group,
    items: group.items.filter(service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.code.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

`;

content = content.substring(0, activeServiceLogicStart) + newActiveServiceLogic + content.substring(mainContentStart);

// 4. Find the sidebar rendering and replace it.
const sidebarStart = content.indexOf('<div className="flex-1 overflow-y-auto">');
const sidebarEnd = content.indexOf('      </div>\n\n      {/* Main Content */}');

if (sidebarStart === -1 || sidebarEnd === -1) {
    console.log("Could not find sidebar rendering");
    process.exit(1);
}

const newSidebar = `<div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredGroups.map((group, gIdx) => (
            <div key={gIdx} className="mb-4">
              <div className="px-4 py-2 bg-slate-100 flex items-center justify-between sticky top-0 z-10">
                 <h3 className="text-xs font-bold text-slate-700 uppercase">{group.groupName}</h3>
                 <span className="text-xs text-slate-500 font-medium bg-slate-200 px-1.5 py-0.5 rounded-full">{group.items.length}</span>
              </div>
              <div>
                {group.items.map((service) => (
                  <button
                    key={service.id}
                    title={service.name}
                    onClick={() => setActiveServiceId(service.id)}
                    className={\`w-full text-left px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors flex flex-col \${activeServiceId === service.id
                        ? 'bg-blue-50/60 border-l-4 border-l-blue-600 pl-[12px]'
                        : 'border-l-4 border-l-transparent'
                      }\`}
                  >
                    <div className={\`text-[13px] mb-1 line-clamp-2 leading-relaxed \${activeServiceId === service.id ? 'text-blue-700 font-semibold' : 'text-slate-700 font-medium'}\`}>
                      {service.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {service.code}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>`;

content = content.substring(0, sidebarStart) + newSidebar + content.substring(sidebarEnd);

// Save back
fs.writeFileSync(tsFilePath, content);
console.log("Successfully replaced sidebar logic");
