import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import os
import threading
import sys

# ──────────────────────────────────────────────
# Import hàm chuyển đổi từ docx_to_md.py
# ──────────────────────────────────────────────
try:
    # Thêm thư mục hiện tại vào sys.path để import được khi chạy từ nơi khác
    _this_dir = os.path.dirname(os.path.abspath(__file__))
    if _this_dir not in sys.path:
        sys.path.insert(0, _this_dir)
    from docx_to_md import convert_docx_to_md
except Exception as _err:
    import tkinter as _tk
    _root = _tk.Tk()
    _root.withdraw()
    messagebox.showerror(
        "Lỗi Cài Đặt",
        f"Không tìm thấy docx_to_md.py hoặc thiếu thư viện.\n"
        f"Hãy cài:\n  pip install mammoth markdownify\n\nChi tiết: {_err}"
    )
    sys.exit(1)

# ══════════════════════════════════════════════
#  MÀUSẮC & FONT
# ══════════════════════════════════════════════
BG_MAIN    = "#1e1e2e"
BG_CARD    = "#2a2a3d"
BG_INPUT   = "#313149"
BG_LOG     = "#12121c"
ACCENT     = "#f97316"        # cam đậm
ACCENT_HVR = "#fb923c"
BTN_ADD    = "#3b82f6"        # xanh dương
BTN_CLR    = "#6b7280"
SUCCESS    = "#22c55e"
ERROR_CLR  = "#ef4444"
WARNING    = "#eab308"
FG_MAIN    = "#e2e8f0"
FG_MUTED   = "#94a3b8"
FONT_MAIN  = ("Segoe UI", 10)
FONT_BOLD  = ("Segoe UI", 10, "bold")
FONT_TITLE = ("Segoe UI", 14, "bold")
FONT_LOG   = ("Consolas", 9)


class DocxToMdApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("DOCX → Markdown Converter")
        self.geometry("820x640")
        self.minsize(700, 540)
        self.configure(bg=BG_MAIN)
        self.resizable(True, True)

        self._file_list: list[str] = []   # danh sách file DOCX đã chọn
        self._running = False

        self._build_ui()

    # ─────────────────────────────────────────
    # XÂY DỰNG GIAO DIỆN
    # ─────────────────────────────────────────
    def _build_ui(self):
        # ── Tiêu đề ──
        hdr = tk.Frame(self, bg=BG_MAIN, pady=14)
        hdr.pack(fill=tk.X, padx=20)
        tk.Label(hdr, text="📄  DOCX  →  Markdown", font=FONT_TITLE,
                 bg=BG_MAIN, fg=ACCENT).pack(side=tk.LEFT)
        tk.Label(hdr, text="Chuyển đổi Word sang Markdown + trích xuất ảnh",
                 font=("Segoe UI", 9), bg=BG_MAIN, fg=FG_MUTED).pack(side=tk.LEFT, padx=12)

        separator = tk.Frame(self, bg=ACCENT, height=2)
        separator.pack(fill=tk.X, padx=20, pady=(0, 10))

        # ── Thân chính chia 2 cột ──
        body = tk.Frame(self, bg=BG_MAIN)
        body.pack(fill=tk.BOTH, expand=True, padx=20, pady=(0, 10))

        left  = tk.Frame(body, bg=BG_MAIN)
        right = tk.Frame(body, bg=BG_MAIN)
        left.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=(0, 8))
        right.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=(8, 0))

        # ── TRÁI: danh sách file ──
        self._build_file_panel(left)

        # ── PHẢI: cài đặt & log ──
        self._build_settings_panel(right)
        self._build_log_panel(right)

        # ── Thanh dưới ──
        self._build_bottom_bar()

    def _build_file_panel(self, parent):
        card = self._card(parent, "📁  Danh sách file DOCX")
        card.pack(fill=tk.BOTH, expand=True)

        # Nút thêm / xoá
        btn_row = tk.Frame(card, bg=BG_CARD)
        btn_row.pack(fill=tk.X, pady=(0, 6))

        self._btn(btn_row, "＋ Thêm file",   BTN_ADD,  self._add_files ).pack(side=tk.LEFT,  padx=(0,4))
        self._btn(btn_row, "＋ Thêm thư mục", BTN_ADD, self._add_folder).pack(side=tk.LEFT,  padx=4)
        self._btn(btn_row, "✕ Xoá chọn",     BTN_CLR,  self._remove_selected).pack(side=tk.RIGHT, padx=(4,0))
        self._btn(btn_row, "✕ Xoá tất cả",   BTN_CLR,  self._clear_all      ).pack(side=tk.RIGHT, padx=4)

        # Listbox
        list_frame = tk.Frame(card, bg=BG_INPUT, bd=0)
        list_frame.pack(fill=tk.BOTH, expand=True)

        sb = tk.Scrollbar(list_frame, bg=BG_CARD, troughcolor=BG_CARD)
        sb.pack(side=tk.RIGHT, fill=tk.Y)

        self._listbox = tk.Listbox(
            list_frame, yscrollcommand=sb.set,
            bg=BG_INPUT, fg=FG_MAIN, selectbackground=ACCENT,
            selectforeground="#fff", font=FONT_LOG,
            borderwidth=0, highlightthickness=0,
            activestyle="none"
        )
        self._listbox.pack(fill=tk.BOTH, expand=True, padx=4, pady=4)
        sb.config(command=self._listbox.yview)

        # Đếm
        self._lbl_count = tk.Label(card, text="0 file được chọn",
                                   bg=BG_CARD, fg=FG_MUTED, font=("Segoe UI", 9))
        self._lbl_count.pack(anchor=tk.E, pady=(4,0))

    def _build_settings_panel(self, parent):
        card = self._card(parent, "⚙️  Cài đặt xuất")
        card.pack(fill=tk.X)

        # Thư mục xuất
        row1 = tk.Frame(card, bg=BG_CARD)
        row1.pack(fill=tk.X, pady=(0, 8))
        tk.Label(row1, text="Thư mục xuất:", bg=BG_CARD, fg=FG_MUTED,
                 font=FONT_MAIN, width=14, anchor=tk.W).pack(side=tk.LEFT)
        self._var_outdir = tk.StringVar()
        entry = tk.Entry(row1, textvariable=self._var_outdir,
                         bg=BG_INPUT, fg=FG_MAIN, insertbackground=FG_MAIN,
                         font=FONT_MAIN, relief=tk.FLAT, bd=4)
        entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=4)
        self._btn(row1, "Duyệt", BTN_ADD, self._pick_outdir, w=8).pack(side=tk.RIGHT)

        # Tuỳ chọn
        self._var_same_dir = tk.BooleanVar(value=True)
        chk = tk.Checkbutton(card, text="Lưu cùng thư mục với file DOCX gốc",
                             variable=self._var_same_dir,
                             command=self._toggle_outdir,
                             bg=BG_CARD, fg=FG_MUTED, selectcolor=BG_INPUT,
                             activebackground=BG_CARD, activeforeground=FG_MAIN,
                             font=FONT_MAIN)
        chk.pack(anchor=tk.W, pady=(0, 4))
        self._toggle_outdir()   # set trạng thái ban đầu

    def _build_log_panel(self, parent):
        card = self._card(parent, "📋  Nhật ký")
        card.pack(fill=tk.BOTH, expand=True, pady=(8, 0))

        self._log_text = tk.Text(
            card, bg=BG_LOG, fg=FG_MAIN, font=FONT_LOG,
            relief=tk.FLAT, bd=0, state=tk.DISABLED,
            wrap=tk.WORD, height=12
        )
        self._log_text.pack(fill=tk.BOTH, expand=True)

        # Tags màu
        self._log_text.tag_config("ok",      foreground=SUCCESS)
        self._log_text.tag_config("err",     foreground=ERROR_CLR)
        self._log_text.tag_config("warn",    foreground=WARNING)
        self._log_text.tag_config("muted",   foreground=FG_MUTED)
        self._log_text.tag_config("heading", foreground=ACCENT, font=FONT_BOLD)

    def _build_bottom_bar(self):
        bar = tk.Frame(self, bg=BG_MAIN, pady=10)
        bar.pack(fill=tk.X, padx=20)

        # Progress bar
        style = ttk.Style()
        style.theme_use("clam")
        style.configure("Custom.Horizontal.TProgressbar",
                         troughcolor=BG_CARD, background=ACCENT,
                         thickness=8, bordercolor=BG_MAIN)
        self._progress = ttk.Progressbar(bar, style="Custom.Horizontal.TProgressbar",
                                          mode="determinate")
        self._progress.pack(fill=tk.X, pady=(0, 8))

        btn_row = tk.Frame(bar, bg=BG_MAIN)
        btn_row.pack(fill=tk.X)

        self._lbl_status = tk.Label(btn_row, text="Sẵn sàng",
                                    bg=BG_MAIN, fg=FG_MUTED, font=("Segoe UI", 9))
        self._lbl_status.pack(side=tk.LEFT)

        self._btn_clr_log = self._btn(btn_row, "Xoá log", BTN_CLR, self._clear_log, w=10)
        self._btn_clr_log.pack(side=tk.RIGHT, padx=(4, 0))

        self._btn_convert = self._btn(btn_row, "▶  BẮT ĐẦU CHUYỂN ĐỔI",
                                       ACCENT, self._start_conversion, w=26, h=2)
        self._btn_convert.pack(side=tk.RIGHT, padx=(4, 4))

    # ─────────────────────────────────────────
    # HELPER UI
    # ─────────────────────────────────────────
    def _card(self, parent, title: str) -> tk.Frame:
        outer = tk.Frame(parent, bg=BG_MAIN)
        outer.pack(fill=tk.BOTH, expand=True)
        tk.Label(outer, text=title, bg=BG_MAIN, fg=FG_MUTED,
                 font=("Segoe UI", 9, "bold")).pack(anchor=tk.W, pady=(6, 2))
        inner = tk.Frame(outer, bg=BG_CARD, padx=10, pady=8,
                         relief=tk.FLAT, bd=0)
        inner.pack(fill=tk.BOTH, expand=True)
        return inner

    def _btn(self, parent, text, color, cmd, w=None, h=1):
        kw = dict(bg=color, fg="#fff", font=FONT_BOLD,
                  relief=tk.FLAT, cursor="hand2",
                  activebackground=ACCENT_HVR, activeforeground="#fff",
                  padx=10, pady=4, command=cmd)
        if w: kw["width"] = w
        if h > 1: kw["height"] = h
        b = tk.Button(parent, text=text, **kw)
        return b

    # ─────────────────────────────────────────
    # SỰ KIỆN FILE
    # ─────────────────────────────────────────
    def _add_files(self):
        paths = filedialog.askopenfilenames(
            title="Chọn file DOCX",
            filetypes=[("Word Document", "*.docx")]
        )
        for p in paths:
            if p not in self._file_list:
                self._file_list.append(p)
        self._refresh_list()

    def _add_folder(self):
        folder = filedialog.askdirectory(title="Chọn thư mục chứa file DOCX")
        if not folder:
            return
        found = 0
        for root_dir, _, files in os.walk(folder):
            for f in files:
                if f.lower().endswith(".docx"):
                    full = os.path.join(root_dir, f)
                    if full not in self._file_list:
                        self._file_list.append(full)
                        found += 1
        if found == 0:
            messagebox.showinfo("Thông báo", "Không tìm thấy file .docx nào trong thư mục này.")
        self._refresh_list()

    def _remove_selected(self):
        sel = list(self._listbox.curselection())
        for i in reversed(sel):
            self._file_list.pop(i)
        self._refresh_list()

    def _clear_all(self):
        self._file_list.clear()
        self._refresh_list()

    def _refresh_list(self):
        self._listbox.delete(0, tk.END)
        for p in self._file_list:
            self._listbox.insert(tk.END, f"  {os.path.basename(p)}   {p}")
        self._lbl_count.config(text=f"{len(self._file_list)} file được chọn")

    # ─────────────────────────────────────────
    # SỰ KIỆN CÀI ĐẶT
    # ─────────────────────────────────────────
    def _pick_outdir(self):
        d = filedialog.askdirectory(title="Chọn thư mục xuất file Markdown")
        if d:
            self._var_outdir.set(d)
            self._var_same_dir.set(False)

    def _toggle_outdir(self):
        # Khi check "lưu cùng thư mục", disable entry thư mục xuất
        for child in self.winfo_children():
            pass  # không cần traverse toàn cây
        # Tìm entry qua biến
        state = tk.DISABLED if self._var_same_dir.get() else tk.NORMAL
        # Tìm entry qua trace của var
        # Thực hiện đơn giản: set placeholder text
        if self._var_same_dir.get():
            self._var_outdir.set("(Tự động – cùng nơi với file DOCX)")

    # ─────────────────────────────────────────
    # LOG
    # ─────────────────────────────────────────
    def _log(self, msg: str, tag: str = ""):
        self._log_text.config(state=tk.NORMAL)
        self._log_text.insert(tk.END, msg + "\n", tag if tag else ())
        self._log_text.see(tk.END)
        self._log_text.config(state=tk.DISABLED)

    def _clear_log(self):
        self._log_text.config(state=tk.NORMAL)
        self._log_text.delete("1.0", tk.END)
        self._log_text.config(state=tk.DISABLED)

    # ─────────────────────────────────────────
    # CHUYỂN ĐỔI
    # ─────────────────────────────────────────
    def _start_conversion(self):
        if self._running:
            return

        if not self._file_list:
            messagebox.showwarning("Chưa có file", "Vui lòng thêm ít nhất một file DOCX vào danh sách!")
            return

        self._running = True
        self._btn_convert.config(state=tk.DISABLED, text="⏳  Đang xử lý...")
        thread = threading.Thread(target=self._run_conversion, daemon=True)
        thread.start()

    def _run_conversion(self):
        files  = list(self._file_list)
        total  = len(files)
        ok_cnt = 0
        err_cnt = 0

        outdir_fixed = None if self._var_same_dir.get() else self._var_outdir.get().strip()
        if outdir_fixed == "(Tự động – cùng nơi với file DOCX)":
            outdir_fixed = None

        self._schedule(self._log, f"\n{'─'*55}", "muted")
        self._schedule(self._log, f"  Bắt đầu chuyển đổi {total} file  ▸  {self._timestamp()}", "heading")
        self._schedule(self._log, f"{'─'*55}", "muted")

        self._schedule(self._progress.config, maximum=total, value=0)

        for idx, docx_path in enumerate(files, start=1):
            name = os.path.basename(docx_path)
            self._schedule(self._lbl_status.config, text=f"[{idx}/{total}] {name}")
            self._schedule(self._log, f"\n[{idx}/{total}] {name}", "muted")

            try:
                out = outdir_fixed  # None hoặc thư mục cố định
                md_file = convert_docx_to_md(docx_path, out)
                self._schedule(self._log, f"    ✔  Thành công → {md_file}", "ok")
                ok_cnt += 1
            except Exception as exc:
                self._schedule(self._log, f"    ✘  Lỗi: {exc}", "err")
                err_cnt += 1

            self._schedule(self._progress.config, value=idx)

        # Tổng kết
        self._schedule(self._log, f"\n{'─'*55}", "muted")
        summary = f"  Hoàn tất: ✔ {ok_cnt} thành công"
        if err_cnt:
            summary += f"  |  ✘ {err_cnt} lỗi"
        self._schedule(self._log, summary, "ok" if err_cnt == 0 else "warn")
        self._schedule(self._log, f"{'─'*55}\n", "muted")

        self._schedule(self._lbl_status.config, text=f"Xong! {ok_cnt}/{total} file thành công.")
        self._schedule(self._btn_convert.config, state=tk.NORMAL, text="▶  BẮT ĐẦU CHUYỂN ĐỔI")
        self._running = False

        if err_cnt == 0:
            self._schedule(messagebox.showinfo, "Hoàn tất",
                           f"✅  Đã chuyển đổi xong {ok_cnt} file!\n\nKiểm tra thư mục chứa file DOCX gốc (hoặc thư mục xuất bạn chọn).")
        else:
            self._schedule(messagebox.showwarning, "Hoàn tất (có lỗi)",
                           f"Kết quả: {ok_cnt} thành công, {err_cnt} lỗi.\nXem nhật ký để biết chi tiết.")

    def _schedule(self, fn, *args, **kw):
        """Gọi hàm tkinter từ thread nền một cách an toàn."""
        self.after(0, lambda: fn(*args, **kw))

    def _timestamp(self):
        import datetime
        return datetime.datetime.now().strftime("%H:%M:%S  %d/%m/%Y")


# ══════════════════════════════════════════════
if __name__ == "__main__":
    app = DocxToMdApp()
    app.mainloop()
