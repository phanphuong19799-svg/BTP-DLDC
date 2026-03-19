import os
import mammoth
from markdownify import markdownify as md

def convert_docx_to_md(docx_path, output_dir=None):
    if output_dir is None:
        output_dir = os.path.dirname(docx_path)
        
    os.makedirs(output_dir, exist_ok=True)
    images_dir = os.path.join(output_dir, "images")
    
    basename = os.path.splitext(os.path.basename(docx_path))[0]
    md_output_path = os.path.join(output_dir, f"{basename}.md")
    
    image_counter = [1]
    
    def handle_image(image):
        # Tạo thư mục images nếu có ảnh thật sự tồn tại trong file DOCX
        os.makedirs(images_dir, exist_ok=True)
        
        with image.open() as image_bytes:
            content_type = image.content_type
            extension = content_type.split("/")[-1]
            if extension == "jpeg":
                extension = "jpg"
            elif extension == 'x-emf' or extension == 'x-wmf':
                extension = 'png' 
                
            image_name = f"{basename}_img_{image_counter[0]:03d}.{extension}"
            image_counter[0] += 1
            
            image_path = os.path.join(images_dir, image_name)
            
            with open(image_path, "wb") as f:
                f.write(image_bytes.read())
                
            # Cung cấp file path tương đối cho thẻ img (dành cho file Markdown)
            return {"src": f"images/{image_name}"}

    with open(docx_path, "rb") as docx_file:
        # Convert docx sang HTML, đồng thời tách ảnh ra vật lý
        result = mammoth.convert_to_html(
            docx_file, 
            convert_image=mammoth.images.img_element(handle_image)
        )
        html = result.value
        
    # Convert HTML thô sang Markdown chuẩn, sử dụng Heading chuẩn ATX (VD: # Heading)
    markdown_content = md(html, heading_style="ATX", default_title=True)
    
    with open(md_output_path, "w", encoding="utf-8") as file:
        file.write(markdown_content)
        
    return md_output_path

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Convert DOCX to Markdown & Extract Images")
    parser.add_argument("docx_file", help="Đường dẫn file DOCX cần chuyển đổi")
    parser.add_argument("--outdir", help="Thư mục xuất file MD", default=None)
    args = parser.parse_args()
    
    md_file = convert_docx_to_md(args.docx_file, args.outdir)
    print(f"✅ Hoàn tất! File md được lưu tại: {md_file}")
