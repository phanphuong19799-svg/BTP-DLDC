import sys
import re
import os


# ==============================
# CONFIG
# ==============================
REQUIRED_COMPONENTS = [
    "mục đích",
    "màn hình",
    "mô tả thông tin",
    "chức năng"
]


# ==============================
# CHECK SCREEN
# ==============================
def is_screen(name, components):
    name_lower = name.lower()

    # rule nhận diện screen
    if re.search(r'(pm\d+|màn hình|thêm mới|cập nhật|danh sách|chi tiết|thiết lập)', name_lower):
        return True

    if len(components) > 0:
        return True

    return False


# ==============================
# ANALYZE FILE
# ==============================
def analyze_markdown(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    in_section = False
    screens = []
    current = None

    for i, line in enumerate(lines):
        text = line.strip()

        # ==============================
        # SECTION FILTER
        # ==============================
        if text.startswith('# ĐẶC TẢ CHI TIẾT YÊU CẦU CHỨC NĂNG'):
            in_section = True
            continue

        if text.startswith('# PHỤ LỤC'):
            break

        if not in_section:
            continue

        # ==============================
        # HEADING
        # ==============================
        if text.startswith('#'):
            level = len(text.split(' ')[0])
            title = text[level:].strip()

            if current:
                screens.append(current)

            current = {
                "line": i + 1,
                "name": title,
                "level": level,
                "components": []
            }
            continue

        # ==============================
        # COMPONENT DETECT
        # ==============================
        if current:
            lower = text.lower()

            for comp in REQUIRED_COMPONENTS:
                if comp in lower:
                    current["components"].append(comp)

    # save last
    if current:
        screens.append(current)

    return screens


# ==============================
# ANALYZE RESULT
# ==============================
def analyze_result(screens):
    report = []
    total = 0
    missing_count = 0

    for s in screens:
        name = s["name"]

        if not is_screen(name, s["components"]):
            continue

        total += 1

        missing = []
        for comp in REQUIRED_COMPONENTS:
            if comp not in s["components"]:
                missing.append(comp)

        if missing:
            missing_count += 1
            report.append({
                "line": s["line"],
                "name": name,
                "missing": missing,
                "components": s["components"]
            })

    return report, total, missing_count


# ==============================
# OUTPUT
# ==============================
def export_report(report, total, missing_count, output_file):
    lines = []
    lines.append("=== BÁO CÁO KIỂM TRA ĐẶC TẢ ===\n")

    for r in report:
        lines.append(f"- Dòng {r['line']} | {r['name']}")
        lines.append(f"  -> Thiếu: {', '.join(r['missing'])}")

        if r['components']:
            lines.append(f"  -> Đã có: {', '.join(set(r['components']))}")

        lines.append("")

    percent = round((total - missing_count) / total * 100, 2) if total else 0

    lines.append("=== TỔNG KẾT ===")
    lines.append(f"Tổng số màn hình: {total}")
    lines.append(f"Số màn thiếu: {missing_count}")
    lines.append(f"Tỷ lệ hoàn chỉnh: {percent}%")

    result = "\n".join(lines)

    print(result)

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(result)

    print(f"\n✅ Saved: {output_file}")


# ==============================
# MAIN
# ==============================
if __name__ == "__main__":

    # 👉 Hỗ trợ nhiều file
    input_files = [
        r'd:\Tư pháp\KhoDLDC\DLDC_1\tailieu\tailieuphantich\thietkephantich.md'
    ]

    for file in input_files:
        print(f"\n🔍 Đang kiểm tra: {file}")

        screens = analyze_markdown(file)
        report, total, missing = analyze_result(screens)

        output_file = file.replace(".md", "_report.txt")

        export_report(report, total, missing, output_file)