import os
import mammoth
from markdownify import markdownify as md


def convert_docx_to_md(docx_path, output_dir=None):
    if not os.path.exists(docx_path):
        raise FileNotFoundError(f"❌ Không tìm thấy file: {docx_path}")

    if output_dir is None:
        output_dir = os.path.dirname(docx_path)

    os.makedirs(output_dir, exist_ok=True)
    images_dir = os.path.join(output_dir, "images")

    basename = os.path.splitext(os.path.basename(docx_path))[0]
    md_output_path = os.path.join(output_dir, f"{basename}.md")

    image_counter = [1]

    def handle_image(image):
        os.makedirs(images_dir, exist_ok=True)

        with image.open() as image_bytes:
            content_type = image.content_type or "image/png"
            extension = content_type.split("/")[-1]

            if extension == "jpeg":
                extension = "jpg"

            # ⚠️ Không fake convert emf/wmf
            if extension in ["x-emf", "x-wmf"]:
                extension = "bin"

            image_name = f"{basename}_img_{image_counter[0]:03d}.{extension}"
            image_counter[0] += 1

            image_path = os.path.join(images_dir, image_name)

            with open(image_path, "wb") as f:
                f.write(image_bytes.read())

            return {"src": f"images/{image_name}"}

    # Convert DOCX → HTML
    with open(docx_path, "rb") as docx_file:
        result = mammoth.convert_to_html(
            docx_file,
            convert_image=mammoth.images.img_element(handle_image)
        )

        html = result.value

        # 🔥 log warning
        if result.messages:
            print("⚠️ Warning từ Mammoth:")
            for msg in result.messages:
                print("-", msg)

    # 🔥 Clean HTML cơ bản
    html = html.replace("<p></p>", "")

    # Convert HTML → Markdown
    markdown_content = md(
        html,
        heading_style="ATX",
        bullets="-",
        strip=["span"]
    )

    # 🔥 Clean markdown
    markdown_content = "\n".join(
        line.rstrip() for line in markdown_content.splitlines()
    )

    with open(md_output_path, "w", encoding="utf-8") as file:
        file.write(markdown_content)

    return md_output_path


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Convert DOCX to Markdown & Extract Images"
    )
    parser.add_argument("docx_file", help="Đường dẫn file DOCX")
    parser.add_argument("--outdir", help="Thư mục output", default=None)

    args = parser.parse_args()

    md_file = convert_docx_to_md(args.docx_file, args.outdir)

    print(f"✅ Hoàn tất: {md_file}")