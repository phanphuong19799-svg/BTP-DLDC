const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    console.log('🚀 Script started...');

    const imgDir = path.join(__dirname, 'tailieu', 'tailieuphantich', 'images', 'xuly');

    if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir, { recursive: true });
    }

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // ==============================
    // LOAD APP
    // ==============================
    console.log('🌐 Navigating to app...');
    try {
        await page.goto('http://localhost:3002/', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });
    } catch (e) {
        console.error('❌ Cannot load app. Run npm dev first.');
        await browser.close();
        return;
    }

    // ==============================
    // LOGIN
    // ==============================
    console.log('🔐 Logging in...');
    try {
        await page.waitForSelector('button[type="submit"]', { timeout: 5000 });
        await page.click('button[type="submit"]');
        await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => { });
    } catch (e) {
        console.log('⚠ Skip login (maybe already logged in)');
    }

    await page.waitForTimeout(2000);

    // ==============================
    // NAVIGATION (STABLE)
    // ==============================
    const navigateByPath = async (...items) => {
        for (const item of items) {
            console.log(`➡ Navigate: ${item}`);

            const found = await page.waitForFunction((text) => {
                const elements = Array.from(document.querySelectorAll('aside *'));
                return elements.find(el => el.innerText?.trim() === text);
            }, {}, item).catch(() => null);

            if (!found) {
                console.error(`❌ Not found: ${item}`);
                continue;
            }

            await page.evaluate((text) => {
                const elements = Array.from(document.querySelectorAll('aside *'));
                const el = elements.find(e => e.innerText?.trim() === text);
                if (el) {
                    const clickable = el.closest('button, div[role="button"]') || el;
                    clickable.click();
                }
            }, item);

            await page.waitForTimeout(1200);
        }
    };

    // ==============================
    // AUTO SCROLL
    // ==============================
    const autoScroll = async () => {
        await page.evaluate(async () => {
            window.scrollTo(0, 0);
            await new Promise(r => setTimeout(r, 300));
            window.scrollTo(0, document.body.scrollHeight);
            await new Promise(r => setTimeout(r, 300));
            window.scrollTo(0, 0);
        });
    };

    // ==============================
    // SCREENSHOT
    // ==============================
    const takeScreenshot = async (filename, action = null, isPopup = false) => {
        if (action) {
            await action(page);
            await page.waitForTimeout(1500);
        }

        const savePath = path.join(imgDir, filename);

        if (isPopup) {
            await page.waitForSelector('div[role="dialog"]', { timeout: 3000 }).catch(() => { });

            const dialog = await page.$('div[role="dialog"]');

            if (dialog) {
                await dialog.screenshot({ path: savePath });
                console.log(`📸 ${filename} (popup)`);
                return;
            }
        }

        await autoScroll();

        await page.screenshot({
            path: savePath,
            fullPage: true
        });

        console.log(`📸 ${filename}`);
    };

    // ==============================
    // CLOSE DIALOG
    // ==============================
    const closeDialog = async () => {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);

        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const btn = btns.find(b =>
                ['Đóng', 'Hủy', 'Cancel', 'Close'].includes(b.innerText.trim())
            );
            if (btn) btn.click();
        });

        await page.waitForTimeout(800);
    };

    // ==============================
    // CONFIG SCREEN (RẤT QUAN TRỌNG)
    // ==============================
    const SCREENS = [
        {
            path: ['Xử lý dữ liệu', 'Dashboard xử lý'],
            file: 'MH01_dashboard.png'
        },
        {
            path: ['Xử lý dữ liệu', 'Thiết lập & Quản lý quy tắc'],
            file: 'MH02_danhsach.png'
        },
        {
            path: ['Xử lý dữ liệu', 'Thiết lập & Quản lý quy tắc'],
            file: 'MH02_P01_quytac.png',
            action: async (p) => {
                const btn = await p.$('button[title="Quy tắc"]');
                if (btn) await btn.click();
            },
            isPopup: true
        },
        {
            path: ['Xử lý dữ liệu', 'Thiết lập & Quản lý quy tắc'],
            file: 'MH02_P02_baomat.png',
            action: async (p) => {
                const btn = await p.$('button[title="Phân loại"]');
                if (btn) await btn.click();
            },
            isPopup: true
        },
        {
            path: ['Xử lý dữ liệu', 'Thiết lập & Quản lý quy tắc'],
            file: 'MH02_P03_loi.png',
            action: async (p) => {
                const btn = await p.$('button[title="Bản ghi lỗi"]');
                if (btn) await btn.click();
            },
            isPopup: true
        },
        {
            path: ['Xử lý dữ liệu', 'Thiết lập & Quản lý quy tắc'],
            file: 'MH02_P04_lichsu.png',
            action: async (p) => {
                const btn = await p.$('button[title="Lịch sử"]');
                if (btn) await btn.click();
            },
            isPopup: true
        },
        {
            path: ['Xử lý dữ liệu', 'Thiết lập & Quản lý quy tắc'],
            file: 'MH02_P05_themmoi.png',
            action: async (p) => {
                const btn = await p.$('button[title="Thêm mới"], button[title="Tạo mới"]');
                if (btn) await btn.click();
            },
            isPopup: true
        },
        {
            path: ['Xử lý dữ liệu', 'Thiết lập & Quản lý quy tắc'],
            file: 'MH02_P06_xoa.png',
            action: async (p) => {
                const btn = await p.$('button[title="Xóa"], button[title="Xóa bỏ"]');
                if (btn) await btn.click();
            },
            isPopup: true
        },
        {
            path: ['Xử lý dữ liệu', 'Thiết lập & Quản lý quy tắc'],
            file: 'MH02_P07_laplich.png',
            action: async (p) => {
                const btn = await p.$('button[title="Lập lịch"], button[title="Scheduler"]');
                if (btn) await btn.click();
            },
            isPopup: true
        }
    ];

    // ==============================
    // RUN ALL
    // ==============================
    for (const screen of SCREENS) {
        await navigateByPath(...screen.path);
        await takeScreenshot(screen.file, screen.action, screen.isPopup);

        if (screen.isPopup) {
            await closeDialog();
        }
    }

    console.log('🎉 DONE ALL SCREENSHOTS');
    await browser.close();

})();