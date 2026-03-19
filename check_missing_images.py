import re

def find_missing_images(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    missing_images = []
    
    # Simple check for sections with "Màn hình" but no image tag in the following lines
    for i, line in enumerate(lines):
        if "Màn hình" in line:
            # Check the next 10 lines for an image tag "!["
            image_found = False
            for j in range(i + 1, min(i + 11, len(lines))):
                if "![" in lines[j]:
                    image_found = True
                    break
            if not image_found:
                # Find the nearest header above this "Màn hình" line
                header = "Unknown section"
                for h in range(i, -1, -1):
                    if lines[h].startswith("#"):
                        header = lines[h].strip()
                        break
                missing_images.append(f"{header} (Line {i+1})")
    
    return missing_images

file_path = r'd:\Tư pháp\KhoDLDC\DLDC_1\tailieu\tailieuphantich\thietkephantich.md'
result = find_missing_images(file_path)
for m in result:
    print(m)
