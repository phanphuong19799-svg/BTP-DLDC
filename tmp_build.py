import codecs

try:
    with codecs.open('src/components/pages/processing/CivilRegistryProcessingPage.tsx', 'r', 'utf-8') as f:
        text = f.read()

    new_interfaces = '''
export interface ProcessingDatasetItem {
  id: string;
  name: string;
  code?: string;
}

export interface GenericProcessingPageProps {
  systemName: string;
  datasets: ProcessingDatasetItem[];
}
'''

    parts = text.split('export interface ApiServiceItem')
    if len(parts) > 1:
        rest = parts[1].split('export function CivilRegistryProcessingPage() {')
        text = parts[0] + new_interfaces + '\nexport function GenericProcessingPage({ systemName, datasets }: GenericProcessingPageProps) {' + rest[1]

    text = text.replace("const [activeServiceId, setActiveServiceId] = useState('item_khsn');", "const [activeServiceId, setActiveServiceId] = useState(datasets[0]?.id || '');")
    text = text.replace("const allServices = apiGroups.flatMap(g => g.items);", "const allServices = datasets;")
    text = text.replace("Nguồn dữ liệu: CSDL Hộ tịch Trung ương |", "Nguồn dữ liệu: {systemName} |")
    text = text.replace("{'CSDL Hộ tịch điện tử': true}", "{ [systemName]: true }")
    text = text.replace("CSDL Hộ tịch Trung ương", "{systemName}")

    with codecs.open('src/components/pages/processing/GenericProcessingPage.tsx', 'w', 'utf-8') as f:
        f.write(text)
    print('Successfully generated GenericProcessingPage.tsx')
except Exception as e:
    print(e)
