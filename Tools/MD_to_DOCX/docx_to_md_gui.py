import tkinter as tk
from tkinter import filedialog, messagebox
import os

from docx_to_md import convert_docx_to_md

def select_files():
    files = filedialog.askopenfilenames(
        title="Chọn các file DOCX",
        filetypes=[("Word Document", "*.docx"), ("All Files", "*.*")]
    )
    if files:
        listbox_files.delete(0, tk.END)
        for f in files:
            listbox_files.insert(tk.END, f)

def convert():
    files = listbox_files.get(0, tk.END)
    if not files:
        messagebox.showwarning("Cảnh báo", "Vui lòng chọn ít nhất 1 file DOCX!")
        return

    output_dir = filedialog.askdirectory(
        title="Chọn thư mục lưu file Markdown (Huỷ để lưu cùng thư mục DOCX)"
    )

    try:
        btn_convert.config(text="Đang xử lý...", state=tk.DISABLED)
        root.update()

        success_count = 0
        error_count = 0

        for f in files:
            if not os.path.exists(f):
                continue
            
            try:
                # Nếu không chọn thư mục output (bấm Cancel), sẽ lưu tại thư mục file gốc
                out_path = output_dir if output_dir else None
                convert_docx_to_md(f, out_path)
                success_count += 1
            except Exception as e:
                print(f"Lỗi khi chuyển đổi file {f}: {e}")
                error_count += 1

        if error_count == 0:
            messagebox.showinfo("Thành công", f"Đã chuyển đổi thành công {success_count} files!")
        else:
            messagebox.showwarning("Hoàn tất", f"Chuyển đổi xong.\nThành công: {success_count}\nLỗi: {error_count}")
        
    except Exception as e:
        messagebox.showerror("Lỗi", f"Có lỗi xảy ra: \n{str(e)}")
    finally:
        btn_convert.config(text="Chuyển đổi DOCX sang Markdown", state=tk.NORMAL)

# --- Khởi tạo Giao Diện ---
root = tk.Tk()
root.title("Công cụ chuyển đổi DOCX sang Markdown (Offline)")
root.geometry("650x400")

# Khung chứa nút trên cùng
frame_top = tk.Frame(root, pady=10)
frame_top.pack(fill=tk.X, padx=10)

lbl_title = tk.Label(frame_top, text="DANH SÁCH FILE DOCX:", font=("Arial", 10, "bold"))
lbl_title.pack(side=tk.LEFT)

btn_select = tk.Button(frame_top, text="Thêm files DOCX...", command=select_files, width=20, bg="#e0e0e0")
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
lbl_help = tk.Label(root, text="* Mẹo: Các file Markdown sẽ được lưu cùng thư mục với file gốc DOCX theo mặc định.", fg="gray", font=("Arial", 9, "italic"))
lbl_help.pack(anchor=tk.W, padx=10)

# Khung chứa nút dưới cùng
frame_bottom = tk.Frame(root, pady=15)
frame_bottom.pack(fill=tk.X, padx=10)

btn_convert = tk.Button(frame_bottom, text="Chuyển đổi DOCX sang Markdown", command=convert, width=35, height=2, bg="#4CAF50", fg="white", font=("Arial", 11, "bold"))
btn_convert.pack(pady=5)

root.mainloop()
