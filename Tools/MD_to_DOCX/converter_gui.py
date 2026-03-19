import tkinter as tk
from tkinter import filedialog, messagebox
import os
from docx import Document
from docx.shared import Pt
from docx.oxml.ns import qn

# Import hàm chuyển đổi từ file convert_to_docx.py của bạn
from convert_to_docx import convert_md_to_docx

def select_files():
    files = filedialog.askopenfilenames(
        title="Chọn các file Markdown",
        filetypes=[("Markdown Files", "*.md"), ("All Files", "*.*")]
    )
    if files:
        listbox_files.delete(0, tk.END)
        for f in files:
            listbox_files.insert(tk.END, f)

def convert():
    files = listbox_files.get(0, tk.END)
    if not files:
        messagebox.showwarning("Cảnh báo", "Vui lòng chọn ít nhất 1 file Markdown!")
        return

    output_path = filedialog.asksaveasfilename(
        title="Lưu file Word tổng hợp",
        defaultextension=".docx",
        filetypes=[("Word Document", "*.docx")]
    )
    if not output_path:
        return

    try:
        # Thay đổi UI state
        btn_convert.config(text="Đang xử lý...", state=tk.DISABLED)
        root.update()

        merged_doc = Document()
        style = merged_doc.styles['Normal']
        style.font.name = 'Arial'
        style._element.rPr.rFonts.set(qn('w:eastAsia'), 'Arial')
        style.font.size = Pt(11)

        for i, md in enumerate(files):
            if not os.path.exists(md):
                continue
            # Gọi module cũ để xử lý
            convert_md_to_docx(md, doc=merged_doc)

            if i < len(files) - 1:
                merged_doc.add_page_break()

        merged_doc.save(output_path)
        messagebox.showinfo("Thành công", f"Đã chuyển đổi và gộp thành công vào:\n{output_path}")
        
    except Exception as e:
        messagebox.showerror("Lỗi", f"Có lỗi xảy ra trong quá trình xử lý:\n{str(e)}")
    finally:
        btn_convert.config(text="Chuyển đổi & Gộp (Export DOCX)", state=tk.NORMAL)

# --- Khởi tạo Giao Diện ---
root = tk.Tk()
root.title("Công cụ chuyển đổi Markdown sang Word (Offline)")
root.geometry("650x400")

# Khung chứa nút trên cùng
frame_top = tk.Frame(root, pady=10)
frame_top.pack(fill=tk.X, padx=10)

lbl_title = tk.Label(frame_top, text="DANH SÁCH FILE MARKDOWN:", font=("Arial", 10, "bold"))
lbl_title.pack(side=tk.LEFT)

btn_select = tk.Button(frame_top, text="Thêm files MD...", command=select_files, width=20, bg="#e0e0e0")
btn_select.pack(side=tk.RIGHT)

# Khung danh sách file
frame_mid = tk.Frame(root)
frame_mid.pack(fill=tk.BOTH, expand=True, padx=10)

scrollbar = tk.Scrollbar(frame_mid)
scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

listbox_files = tk.Listbox(frame_mid, selectmode=tk.MULTIPLE, yscrollcommand=scrollbar.set, font=("Arial", 10))
listbox_files.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
scrollbar.config(command=listbox_files.yview)

# Mẹo hướng dẫn nhỏ
lbl_help = tk.Label(root, text="* Mẹo: Các file sẽ được gộp theo thứ tự từ trên xuống dưới.", fg="gray", font=("Arial", 9, "italic"))
lbl_help.pack(anchor=tk.W, padx=10)

# Khung chứa nút dưới cùng
frame_bottom = tk.Frame(root, pady=15)
frame_bottom.pack(fill=tk.X, padx=10)

btn_convert = tk.Button(frame_bottom, text="Chuyển đổi & Gộp (Export DOCX)", command=convert, width=35, height=2, bg="#4CAF50", fg="white", font=("Arial", 11, "bold"))
btn_convert.pack(pady=5)

root.mainloop()
