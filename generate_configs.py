import os
import re

internal_dir = 'src/components/pages/internal'
external_dir = 'src/components/pages/external'

sys_names = {
    'CivilJudgmentPage': 'CSDL thi hành án dân sự',
    'SecurityMeasuresPage': 'CSDL về biện pháp bảo đảm',
    'LegalNationalPage': 'CSDL quốc gia về pháp luật',
    'CivilLegalCenterPage': 'CSDL TT Tư Pháp dân sự',
    'CivilLegalInfoPage': 'HT TTTG pháp lý dân sự',
    'LegalCenterPage': 'HTTT TG Pháp lý',
    'FamilyBasePage': 'CSDL PB, GĐ và HG cơ sở',
    'AuctionPage': 'CSDL quản lý đấu giá tài sản',
    'InternationalPage': 'CSDL Hợp tác quốc tế',
    'StatisticsCollectionPage': 'Thu thập số liệu thống kê',
    'CourtJudgmentPage': 'Thông tin Bản án, quyết định',
    'CategoryGroupPage': 'CSDL Nhóm danh mục',
    'SocialSecurityGroupPage': 'CSDL Nhóm bảo hiểm xã hội',
    'MeritoriousGroupPage': 'CSDL Nhóm người có công',
    'ChildrenGroupPage': 'CSDL Nhóm trẻ em',
}

ts_output = ''

def process_file(filepath, comp_name):
    global ts_output
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    items = []
    td_match = re.search(r'const tableData.*?=\s*\[(.*?)\];', content, re.DOTALL)
    if td_match:
        items = re.findall(r"name:\s*['\"]([^'\"]+)['\"]", td_match.group(1))
    else:
        items = re.findall(r"title:\s*['\"]([^'\"]+)['\"]", content)
    
    unique_items = []
    for item in items:
        if item.startswith('Dữ liệu') or item.startswith('Danh mục') or item.startswith('Thông tin') or item.startswith('Hồ sơ'):
            if item not in unique_items:
                unique_items.append(item)
    
    if not unique_items:
        unique_items = [f'Dữ liệu {comp_name} 1', f'Dữ liệu {comp_name} 2']

    var_name = comp_name[0].lower() + comp_name[1:] + 'Datasets'
    ts_output += f'export const {var_name} = [\n'
    for i, item in enumerate(unique_items, 1):
        ts_output += f'  {{ id: \"item_{i}\", name: \"{i}. {item}\" }},\n'
    ts_output += '];\n\n'

for comp in sys_names.keys():
    p1 = os.path.join(internal_dir, comp + '.tsx')
    p2 = os.path.join(external_dir, comp + '.tsx')
    if os.path.exists(p1): process_file(p1, comp)
    elif os.path.exists(p2): process_file(p2, comp)
    else:
        var_name = comp[0].lower() + comp[1:] + 'Datasets'
        ts_output += f'export const {var_name} = [\n'
        ts_output += f'  {{ id: \"item_1\", name: \"1. Dữ liệu mặc định 1\" }},\n'
        ts_output += '];\n\n'

with open('src/components/pages/processing/datasets_config.ts', 'w', encoding='utf-8') as f:
    f.write(ts_output)
print('Done!')
