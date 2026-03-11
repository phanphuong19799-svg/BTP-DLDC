const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    console.log('Script started...');
    const imgDir = path.join(__dirname, 'tailieu', 'tailieuphantich', 'images');
    console.log('Image directory:', imgDir);
    
    // 1. Clear existing images
    if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir, { recursive: true });
        console.log('Created image directory');
    } else {
        console.log('Clearing old images...');
        fs.rmSync(imgDir, { recursive: true, force: true });
        fs.mkdirSync(imgDir, { recursive: true });
    }

    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to app...');
    try {
        await page.goto('http://localhost:3002/', { waitUntil: 'networkidle2', timeout: 30000 });
    } catch (e) {
        console.error('FAILED to load app. Is npm run dev running on port 3002?');
        await browser.close();
        return;
    }

    console.log('Logging in...');
    const loginBtn = await page.$('button[type="submit"]');
    if (loginBtn) {
        await loginBtn.click();
        await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
    }

    await new Promise(r => setTimeout(r, 2000));

    // Helper: Find and click button by text (more robust)
    const clickByText = async (text, selector = 'button') => {
        const found = await page.evaluateHandle((txt, sel) => {
            const elements = Array.from(document.querySelectorAll(sel));
            return elements.find(el => el.textContent.trim() === txt || el.innerText.trim() === txt);
        }, text, selector);
        
        if (found.asElement()) {
            await found.asElement().click();
            return true;
        }
        return false;
    };

    const navigateByPath = async (...pathItems) => {
        console.log(`Navigating to: ${pathItems.join(' > ')}`);
        
        // Final item we want to click
        const targetText = pathItems[pathItems.length - 1];

        // 1. Try to find the target directly first
        const tryClickTarget = async () => {
            return await page.evaluate((tText) => {
                const spans = Array.from(document.querySelectorAll('aside span, aside button'));
                const found = spans.find(s => s.textContent.trim() === tText);
                if (found) {
                    const clickable = found.closest('button') || found.closest('div[role="button"]') || found;
                    clickable.click();
                    return true;
                }
                return false;
            }, targetText);
        };

        if (await tryClickTarget()) {
            await new Promise(r => setTimeout(r, 1500));
            return;
        }

        // 2. If not found, expand path items one by one
        for (let i = 0; i < pathItems.length; i++) {
            const item = pathItems[i];
            const clicked = await page.evaluate((iText) => {
                const elements = Array.from(document.querySelectorAll('aside span, aside button'));
                const found = elements.find(el => el.textContent.trim() === iText);
                if (found) {
                    const clickable = found.closest('button') || found.closest('div[role="button"]') || found;
                    
                    // Check if it's already expanded (contains a downward chevron or has aria-expanded)
                    const isExpanded = clickable.getAttribute('aria-expanded') === 'true' || 
                                       clickable.innerHTML.includes('lucide-chevron-down') ||
                                       clickable.classList.contains('rotate-180') ||
                                       clickable.classList.contains('rotate-90');
                    
                    // Only click if it's the target or if it's NOT expanded
                    if (iText === document.querySelector('label-of-target') || !isExpanded) {
                        clickable.click();
                        return true;
                    }
                    return 'already_expanded';
                }
                return false;
            }, item);

            if (clicked === true) {
                await new Promise(r => setTimeout(r, 1000));
            } else if (clicked === false) {
                console.error(`Could not find: ${item}`);
            }
        }
        await new Promise(r => setTimeout(r, 1000));
    };
    const takeScreenshot = async (filename, action = null) => {
        if (action) {
            await action(page);
            // Wait for modal to trigger and animate
            await new Promise(r => setTimeout(r, 2000)); 
        }
        
        const savePath = path.join(imgDir, filename);
        
        if (filename.includes('popup')) {
            // Wait for any likely modal to appear
            await page.waitForSelector('div.shadow-xl, div[role="dialog"]', { timeout: 3000 }).catch(() => {});
            
            // Try multiple common modal selectors, most specific first
            const modalSelectors = [
                'div[role="dialog"] div.bg-white',
                'div.bg-white.shadow-xl',
                'div[role="dialog"]',
                'div.bg-white.rounded-lg.max-w-md',
                'div.bg-white.rounded-lg' 
            ];
            
            let dialog = null;
            for (const selector of modalSelectors) {
                const elements = await page.$$(selector);
                for (const el of elements) {
                    const box = await el.boundingBox();
                    // Modals are usually large (at least 300px wide)
                    if (box && box.width > 300 && box.height > 150) {
                        dialog = el;
                        break;
                    }
                }
                if (dialog) break;
            }

            if (dialog) {
                await dialog.screenshot({ path: savePath });
                console.log(`[PHOTO] ${filename} (Cropped Popup)`);
            } else {
                await page.screenshot({ path: savePath });
                console.log(`[PHOTO] ${filename} (FALLBACK - No Dialog Found)`);
            }
        } else {
            await page.screenshot({ path: savePath });
            console.log(`[PHOTO] ${filename}`);
        }
    };

    const closeDialog = async () => {
        await page.keyboard.press('Escape');
        await new Promise(r => setTimeout(r, 800));
        // Try clicking 'Đóng' or 'Hủy' if still there
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const closeBtn = btns.find(b => ['Đóng', 'Hủy', 'Cancel', 'Close'].includes(b.textContent.trim()));
            if (closeBtn) closeBtn.click();
        });
        await new Promise(r => setTimeout(r, 800));
    };

    // --- EXECUTION STEPS ---
    // 1. Quản trị người dùng
    await navigateByPath('Quản trị & vận hành', 'Quản trị người dùng', 'Quản lý người dùng');
    await page.waitForSelector('table', { timeout: 5000 }).catch(() => {});
    await takeScreenshot('quanlynguoidung.png');
    
    await takeScreenshot('popup_chitiet_nguoidung.png', async (p) => {
        const btn = await p.$('td button[title="Xem chi tiết"], td svg.lucide-eye');
        if (btn) await btn.click();
    });
    await closeDialog();

    await takeScreenshot('popup_khoa_khoa.png', async (p) => {
        const btn = await p.$('td button[title="Khóa/Mở khóa"], td svg.lucide-lock');
        if (btn) await btn.click();
    });
    await closeDialog();

    await takeScreenshot('popup_dat_lai_mat_khau.png', async (p) => {
        // Use very specific selector to avoid matching the global 'Sync' button
        const btn = await p.$('td button[title="Đặt lại mật khẩu"], td svg.lucide-refresh-cw');
        if (btn) await btn.click();
    });
    await closeDialog();

    // 2. Nhóm người dùng
    await navigateByPath('Quản trị & vận hành', 'Quản trị người dùng', 'Quản lý nhóm người dùng');
    await page.waitForSelector('table', { timeout: 5000 }).catch(() => {});
    await takeScreenshot('nhomnguoidung.png');
    
    await takeScreenshot('popup_them_nhom.png', async (p) => {
        await clickByText('Thêm nhóm mới', 'button');
    });
    await closeDialog();

    await takeScreenshot('popup_sua_nhom.png', async (p) => {
        const btn = await p.$('td button[title="Chỉnh sửa"], td svg.lucide-edit');
        if (btn) await btn.click();
    });
    await closeDialog();

    await takeScreenshot('popup_chitiet_nhom.png', async (p) => {
        const btn = await p.$('td button[title="Chi tiết"], td svg.lucide-eye');
        if (btn) await btn.click();
    });
    await closeDialog();

    await takeScreenshot('popup_them_thanhvien.png', async (p) => {
        const btn = await p.$('td button[title="Thành viên"], td svg.lucide-users');
        if (btn) await btn.click();
    });
    await closeDialog();

    await takeScreenshot('popup_phanquyen_nhom.png', async (p) => {
        const btn = await p.$('td button[title="Phân quyền"], td svg.lucide-shield-check');
        if (btn) await btn.click();
    });
    await closeDialog();

    await takeScreenshot('popup_xoa_nhom.png', async (p) => {
        const btn = await p.$('td button[title="Xóa"], td svg.lucide-trash-2');
        if (btn) await btn.click();
    });
    await closeDialog();

    // 3. Danh sách chức năng
    await navigateByPath('Quản trị & vận hành', 'Quản trị người dùng', 'Danh sách chức năng');
    await page.waitForSelector('table', { timeout: 5000 }).catch(() => {});
    await takeScreenshot('danhsachchucnang.png');
    await takeScreenshot('popup_them_sua_chucnang.png', async (p) => {
        await clickByText('Thêm chức năng mới', 'button');
    });
    await closeDialog();

    // 4. Cấu hình hệ thống
    await navigateByPath('Quản trị & vận hành', 'Cấu hình hệ thống', 'Thiết lập cấu hình hệ thống');
    await takeScreenshot('thietlapcauhin.png');

    await navigateByPath('Quản trị & vận hành', 'Cấu hình hệ thống', 'Thiết lập quy tắc đặt mật khẩu');
    await takeScreenshot('quytacmatkhau.png');

    await navigateByPath('Quản trị & vận hành', 'Cấu hình hệ thống', 'Sao lưu dự phòng');
    await takeScreenshot('saoluuduphong.png');
    // REMOVED: popup_phuchoi_dulieu.png (Feature doesn't exist)

    // 4. Nhật ký hệ thống
    await navigateByPath('Quản trị & vận hành', 'Quản lý nhật ký', 'Nhật ký truy cập');
    await takeScreenshot('nhatky_truycap.png');
    await takeScreenshot('popup_chitiet_truycap.png', async (p) => {
        const btn = await p.$('button[title="Xem chi tiết"], button[title="Xem"], svg.lucide-eye');
        if (btn) await btn.click();
    });
    await closeDialog();

    await navigateByPath('Quản trị & vận hành', 'Quản lý nhật ký', 'Nhật ký các lỗi phát sinh');
    await takeScreenshot('nhatky_loi.png');
    await takeScreenshot('popup_chitiet_loi.png', async (p) => {
        const btn = await p.$('button[title="Xem chi tiết"], button[title="Xem"], svg.lucide-eye');
        if (btn) await btn.click();
    });
    await closeDialog();

    await navigateByPath('Quản trị & vận hành', 'Quản lý nhật ký', 'Nhật ký quản lý tài khoản');
    await takeScreenshot('nhatky_taikhoan.png');
    await takeScreenshot('popup_chitiet_nhatky_taikhoan.png', async (p) => {
        const btn = await p.$('button[title="Xem chi tiết"], button[title="Xem"], svg.lucide-eye');
        if (btn) await btn.click();
    });
    await closeDialog();

    await navigateByPath('Quản trị & vận hành', 'Quản lý nhật ký', 'Nhật ký thay đổi cấu hình');
    await takeScreenshot('nhatky_cauhin.png');
    
    // REMOVED: popup_khoiphuc_cauhin.png (Feature doesn't exist)

    // REMOVED: cauhinh_thoigian_luutru.png (Feature doesn't exist)

    // 6. Thống kê
    await navigateByPath('Quản trị & vận hành', 'Thống kê & báo cáo', 'Xem biểu đồ thống kê');
    // Wait longer for chart animations
    await new Promise(r => setTimeout(r, 5000));
    await takeScreenshot('bieudothongke.png');

    console.log('--- ALL DONE ---');
    await browser.close();
})();
