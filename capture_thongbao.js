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

    const takeScreenshot = async (filename, action = null) => {
        if (action) {
            await action(page);
            await new Promise(r => setTimeout(r, 2000)); 
        }
        
        const savePath = path.join(imgDir, filename);
        
        if (filename.includes('popup') || filename.includes('confirm')) {
            await page.waitForSelector('div.shadow-xl, div[role="dialog"]', { timeout: 3000 }).catch(() => {});
            
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

    // Try to open notification list
    // Could be a navigation item or a bell icon in header
    console.log('Opening Notifications...');
    let opened = false;
    opened = await page.evaluate(() => {
        // Try to click bell icon
        const bell = document.querySelector('header svg.lucide-bell');
        if (bell) {
            const btn = bell.closest('button');
            if (btn) {
                btn.click();
                return true;
            }
        }
        // Try sidebar
        const spans = Array.from(document.querySelectorAll('aside span, aside button'));
        const found = spans.find(s => s.textContent.trim().includes('Thông báo'));
        if (found) {
            const clickable = found.closest('button') || found.closest('div[role="button"]') || found;
            clickable.click();
            return true;
        }
        return false;
    });

    await new Promise(r => setTimeout(r, 2000));
    await takeScreenshot('quanly_thongbao.png');

    await takeScreenshot('chitiet_thongbao.png', async (p) => {
        const btn = await p.$('button[title="Xem chi tiết"], svg.lucide-eye, ul li.cursor-pointer');
        if (btn) await btn.click();
    });
    await closeDialog();

    await takeScreenshot('confirm_delete_notif.png', async (p) => {
        const btn = await p.$('button[title="Xóa"], svg.lucide-trash-2, svg.lucide-x');
        if (btn) await btn.click();
    });
    await closeDialog();

    console.log('--- ALL DONE ---');
    await browser.close();
})();
