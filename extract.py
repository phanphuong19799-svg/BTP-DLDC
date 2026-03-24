import zipfile
import xml.etree.ElementTree as ET

z = zipfile.ZipFile(r'D:\tuphap\khodldc\dldc_1\tailieu\tailieuphantich\filedoc\mautailieu.docx')
xml_content = z.read('word/document.xml')
tree = ET.fromstring(xml_content)
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

for p in tree.findall('.//w:p', ns):
    text = ''.join(t.text for t in p.findall('.//w:t', ns) if t.text is not None)
    if '4.' in text or 'PM0' in text or 'CSDL' in text or 'DC1' in text:
        print(text)
