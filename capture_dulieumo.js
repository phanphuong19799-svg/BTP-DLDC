const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    console.log('Script started...');
    const imgDir = path.join(__dirname, 'tailieu', 'tailieuphantich', 'images');
    
    if (!fs.existsSync(imgDir)) {
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

    const navigateByPath = async (...pathItems) => {
        console.log(`Navigating to: ${pathItems.join(' > ')}`);
        const targetText = pathItems[pathItems.length - 1];
        
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

        for (let i = 0; i < pathItems.length; i++) {
            const item = pathItems[i];
            const clicked = await page.evaluate((iText) => {
                const elements = Array.from(document.querySelectorAll('aside span, aside button'));
                const found = elements.find(el => el.textContent.trim() === iText);
                if (found) {
                    const clickable = found.closest('button') || found.closest('div[role="button"]') || found;
                    const isExpanded = clickable.getAttribute('aria-expanded') === 'true' || 
                                       clickable.innerHTML.includes('lucide-chevron-down') ||
                                       clickable.classList.contains('rotate-180') ||
                                       clickable.classList.contains('rotate-90');
                    
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
            await new Promise(r => setTimeout(r, 2000)); 
        }
        
        const savePath = path.join(imgDir, filename);
        
        if (filename.includes('popup') || filename.includes('confirm') || filename.includes('chitiet') || filename.includes('themsua') || filename.includes('reject') || filename.includes('pheduyet') || filename.includes('thietlap') || filename.includes('cauhin') || filename.includes('kiemtra')) {
            await page.waitForSelector('div.shadow-xl, div[role="dialog"]', { timeout: 3000 }).catch(() => {});
            const modalSelectors = ['div[role="dialog"] div.bg-white', 'div.bg-white.shadow-xl', 'div[role="dialog"]', 'div.bg-white.rounded-lg.max-w-md', 'div.bg-white.rounded-lg'];
            
            let dialog = null;
            for (const selector of modalSelectors) {
                const elements = await page.$$(selector);
                for (const el of elements) {
                    const box = await el.boundingBox();
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
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const closeBtn = btns.find(b => ['Đóng', 'Hủy', 'Cancel', 'Close'].includes(b.textContent.trim()));
            if (closeBtn) closeBtn.click();
        });
        await new Promise(r => setTimeout(r, 800));
    };

    // Dữ liệu mở
    await navigateByPath('Dữ liệu mở', 'Thiết lập danh mục');
    await takeScreenshot('thietlapdanhmuc_dlm.png', async (p) => {
        const btn = await p.$('button[title="Thiết lập"]');
        if (btn) await btn.click();
    });
    await closeDialog();

    await navigateByPath('Dữ liệu mở', 'Danh sách dữ liệu mở');
    await takeScreenshot('themsua_dlmo.png', async (p) => {
        const btn = await p.$('button[title="Thêm"], button[title="Sửa"]');
        if (btn) await btn.click();
    });
    await closeDialog();

    await takeScreenshot('confirm_delete_opendata.png', async (p) => {
        const btn = await p.$('button[title="Xóa"]');
        if (btn) await btn.click();
    });
    await closeDialog();

    await takeScreenshot('confirm_submit_opendata.png', async (p) => {
        const btn = await p.$('button[title="Gửi duyệt"]');
        if (btn) await btn.click();
    });
    await closeDialog();

    await navigateByPath('Dữ liệu mở', 'Phê duyệt dữ liệu mở');
    await takeScreenshot('pheduyet_opendata.png', async (p) => {
        const btn = await p.$('button[title="Phê duyệt"]');
        if (btn) await btn.click();
    });
    await closeDialog();

    await takeScreenshot('reject_opendata.png', async (p) => {
        const btn = await p.$('button[title="Từ chối"]');
        if (btn) await btn.click();
    });
    await closeDialog();
    
    await takeScreenshot('cauhin_api_opendata.png', async (p) => {
        const btn = await p.$('button[title="Cấu hình API"]');
        if (btn) await btn.click();
    });
    await closeDialog();

    await navigateByPath('Dữ liệu mở', 'Thống kê khai thác');
    await takeScreenshot('thongke_opendata.png');
    
    // Portal parts
    await navigateByPath('Dữ liệu mở', 'Portal Dữ liệu mở');
    await takeScreenshot('dashboard_portal_dlm.png');

    await navigateByPath('Dữ liệu mở', 'Danh sách Dataset');
    await takeScreenshot('danhsach_dataset_portal.png');

    await takeScreenshot('chitiet_dataset_portal.png', async (p) => {
        const btn = await p.$('button[title="Chi tiết"]');
        if (btn) await btn.click();
    });
    await closeDialog();


    console.log('--- ALL DONE ---');
    await browser.close();
})();
