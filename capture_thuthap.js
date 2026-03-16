const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

(async () => {
    console.log('Script started...');
    const imgDir = path.join(__dirname, 'tailieu', 'tailieuphantich', 'images', 'thuthap');
    
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

    await sleep(2000);

    const navigateByPath = async (...pathItems) => {
        console.log(`Navigating to: ${pathItems.join(' > ')}`);
        for (let i = 0; i < pathItems.length; i++) {
            const item = pathItems[i];
            const clicked = await page.evaluate((iText) => {
                const idMap = {
                    'Quản lý thu thập': 'collection',
                    'Dashboard': 'collection-dashboard',
                    'Thiết lập thu thập': 'collection-setup',
                    'CSDL Trong ngành': 'collection-external',
                    'CSDL Ngoài ngành': 'collection-internal',
                    'Đối soát dữ liệu': 'collection-reconciliation',
                    'Đối soát hệ thống trong ngành': 'processing-reconciliation-internal',
                    'Đối soát hệ thống ngoài ngành': 'processing-reconciliation-external',
                    'Quản trị & vận hành': 'admin',
                    'Quản lý nhật ký' : 'admin-logs-group',
                    'Nhật ký truy cập': 'admin-access-log'
                };
                const targetId = idMap[iText] || iText.toLowerCase().replace(/\s+/g, '-');
                let found = document.getElementById(targetId);
                if (!found) {
                    const elements = Array.from(document.querySelectorAll('aside span, aside button, aside a, aside div[id]'));
                    found = elements.find(el => el.textContent.trim() === iText || el.id === targetId);
                }
                if (found) {
                    const clickable = found.closest('button') || found.closest('div[role="button"]') || found;
                    clickable.click();
                    return true;
                }
                return false;
            }, item);

            if (clicked) {
                await sleep(1500);
            } else {
                console.warn(`Could not find: ${item}`);
            }
        }
    };

    const takeScreenshot = async (filename, options = {}) => {
        const { action, waitSelector, verifyText, delay = 1000 } = options;
        try {
            if (action) {
                await action(page);
                await sleep(delay); 
            }
            if (waitSelector) {
                await page.waitForSelector(waitSelector, { timeout: 5000 }).catch(() => {});
            }
            if (verifyText) {
                let found = false;
                for (let i = 0; i < 5; i++) {
                    const content = await page.content();
                    if (content.includes(verifyText)) { found = true; break; }
                    await sleep(500);
                }
            }
            const savePath = path.join(imgDir, filename);
            let clip = null;
            if (waitSelector && (waitSelector.includes('div[role="dialog"]') || waitSelector.includes('.ant-modal') || waitSelector.includes('modal'))) {
                const element = await page.$(waitSelector);
                if (element) {
                    const box = await element.boundingBox();
                    if (box && box.width > 200) clip = box;
                }
            }
            if (clip) {
                await page.screenshot({ path: savePath, clip });
                console.log(`[PHOTO] ${filename} (Cropped)`);
            } else {
                await page.screenshot({ path: savePath, fullPage: true });
                console.log(`[PHOTO] ${filename} (Full)`);
            }
        } catch (e) { console.error(`Error ${filename}:`, e.message); }
    };

    const closeDialog = async () => {
        try {
            await page.keyboard.press('Escape');
            await sleep(800);
            await page.evaluate(() => {
                const btns = Array.from(document.querySelectorAll('button'));
                const closeBtn = btns.find(b => ['Đóng', 'Hủy', 'Cancel', 'Close', 'Hủy bỏ'].includes(b.textContent.trim()));
                if (closeBtn) closeBtn.click();
            });
            await sleep(1000);
        } catch (e) {}
    };

    const clickTab = async (label) => {
        await page.evaluate((txt) => {
            const btns = Array.from(document.querySelectorAll('button'));
            const b = btns.find(el => el.textContent.trim() === txt);
            if (b) b.click();
        }, label);
        await sleep(1500);
    };

    // 1. MH01 Dashboard Thu thập
    await navigateByPath('Quản lý thu thập', 'Dashboard');
    await takeScreenshot('MH01_dashboard.png', { verifyText: 'Dashboard' });

    // 2. MH02 Thiết lập thu thập
    await navigateByPath('Quản lý thu thập', 'Thiết lập thu thập');
    await takeScreenshot('MH02_thietlap.png', { verifyText: 'Thiết lập thu thập' });

    // 3. MH02.P01a Thêm mới thiết lập
    await takeScreenshot('MH02_P01a_them.png', {
        action: async (p) => {
            await p.evaluate(() => { 
                const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Thêm dịch vụ mới'));
                if (b) b.click();
            });
        },
        waitSelector: 'div[role="dialog"]',
        verifyText: 'Thêm mới dịch vụ'
    });
    await closeDialog();

    // 4. MH02.P01b Chỉnh sửa thiết lập
    await takeScreenshot('MH02_P01b_sua.png', {
        action: async (p) => { 
            const btn = await p.$('button[title="Chỉnh sửa"]');
            if (btn) await btn.click();
        },
        waitSelector: 'div[role="dialog"]',
        verifyText: 'Chỉnh sửa dịch vụ'
    });
    await closeDialog();

    // 5. MH02.P02 Xem chi tiết thiết lập
    await takeScreenshot('MH02_P02_xemchitiet.png', {
        action: async (p) => { 
            const btn = await p.$('button[title="Xem chi tiết"]');
            if (btn) await btn.click();
        },
        waitSelector: 'div[role="dialog"]',
        verifyText: 'Thông tin dịch vụ'
    });
    await closeDialog();

    // 6. MH02.P03 Xóa thiết lập
    await takeScreenshot('MH02_P03_xoa.png', {
        action: async (p) => { 
            const btn = await p.$('button[title="Xóa"]');
            if (btn) await btn.click();
        },
        waitSelector: 'div[role="dialog"]',
        verifyText: 'Xác nhận xóa'
    });
    await closeDialog();

    // 7. MH02.P04 Cài đặt dịch vụ
    await takeScreenshot('MH02_P04_caidat.png', {
        action: async (p) => { 
            const btn = await p.$('button[title="Cài đặt dịch vụ"]');
            if (btn) await btn.click();
        },
        waitSelector: 'div[role="dialog"]',
        verifyText: 'Cài đặt dịch vụ'
    });
    // MH02.P05 Kiểm tra Endpoint
    await takeScreenshot('MH02_P05_test_endpoint.png', {
        action: async (p) => {
            await p.evaluate(() => {
                const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Kiểm tra Endpoint'));
                if (b) b.click();
            });
        }
    });
    await closeDialog();

    // 8. MH03 Quản lý nhật ký
    await navigateByPath('Quản trị & vận hành', 'Quản lý nhật ký', 'Nhật ký truy cập');
    await takeScreenshot('MH03_nhatky.png', { verifyText: 'Nhật ký truy cập' });

    // 9. MH03.P01 Chi tiết nhật ký
    await takeScreenshot('MH03_P01_chitiet_nhatky.png', {
        action: async (p) => { 
            const btn = await p.$('button[title="Xem chi tiết"]');
            if (btn) await btn.click();
        },
        waitSelector: 'div[role="dialog"]',
        verifyText: 'Chi tiết nhật ký'
    });
    await closeDialog();

    // 10. MH04.M01 Danh mục CSDL Trong ngành
    await takeScreenshot('MH04_M01_menu_trongnganh.png', {
        action: async () => await navigateByPath('Quản lý thu thập', 'CSDL Trong ngành')
    });

    // 11. MH04.M02 Tổng quan từng CSDL Trong ngành
    await navigateByPath('Quản lý thu thập', 'CSDL Trong ngành', 'CSDL Hộ tịch điện tử');
    await takeScreenshot('MH04_M02_tongquan_trongnganh.png', { verifyText: 'Danh sách dữ liệu' });

    // 12. MH04.M04 Xem chi tiết dữ liệu Trong ngành
    await takeScreenshot('MH04_M04_chitiet_trongnganh.png', {
        action: async (p) => { 
            const btn = await p.$('button[title="Xem chi tiết"]');
            if (btn) await btn.click();
        },
        waitSelector: 'div[role="dialog"]',
        verifyText: 'Chi tiết bản ghi'
    });
    await closeDialog();

    // 13. MH05.M01 Danh mục CSDL Ngoài ngành
    await takeScreenshot('MH05_M01_menu_ngoainganh.png', {
        action: async () => await navigateByPath('Quản lý thu thập', 'CSDL Ngoài ngành')
    });

    // 14. MH05.M02 Tổng quan từng CSDL Ngoài ngành
    await navigateByPath('Quản lý thu thập', 'CSDL Ngoài ngành', 'Hệ thống LGSP');
    await takeScreenshot('MH05_M02_tongquan_ngoainganh.png', { verifyText: 'Danh sách dữ liệu' });

    // 15. MH05.M04 Xem chi tiết dữ liệu Ngoài ngành
    await takeScreenshot('MH05_M04_chitiet_ngoainganh.png', {
        action: async (p) => { 
            const btn = await p.$('button[title="Xem chi tiết"]');
            if (btn) await btn.click();
        },
        waitSelector: 'div[role="dialog"]',
        verifyText: 'Chi tiết bản ghi'
    });
    await closeDialog();

    // 16. MH06.M01 Danh sách đối soát Trong ngành
    await navigateByPath('Quản lý thu thập', 'Đối soát dữ liệu', 'Đối soát hệ thống trong ngành');
    await takeScreenshot('MH06_M01_ds_doisoat_trongnganh.png');

    // 17. MH06.M02 Chi tiết đối soát Trong ngành
    await takeScreenshot('MH06_M02_chitiet_doisoat_trongnganh.png', {
        action: async (p) => { 
            const btn = await p.$('button[title="Xem chi tiết"]');
            if (btn) await btn.click();
        },
        waitSelector: 'div[role="dialog"]',
        verifyText: 'Chi tiết bản ghi'
    });
    await closeDialog();

    // 18. MH06.M03 Chi tiết lỗi đối soát Trong ngành
    await takeScreenshot('MH06_M03_loi_doisoat_trongnganh.png', {
        action: async (p) => { 
            const btn = await p.$('button[title="Xem lỗi chi tiết"]');
            if (btn) await btn.click();
        },
        waitSelector: 'div[role="dialog"]',
        verifyText: 'Thông báo lỗi chi tiết'
    });
    await closeDialog();

    // 19. MH06.M04 Thiết lập dịch vụ đối soát
    await clickTab('Thiết lập dịch vụ');
    await takeScreenshot('MH06_M04_setup_trongnganh.png');

    // 20. MH06.M05 Thêm cấu hình đối soát
    await takeScreenshot('MH06_M05_them_cauhinh.png', {
        action: async (p) => { 
            await p.evaluate(() => {
                const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Thêm cấu hình'));
                if (b) b.click();
            });
        },
        waitSelector: 'div[role="dialog"]',
        verifyText: 'Thêm cấu hình đối soát'
    });
    await closeDialog();

    // 21. MH06.M06 Sửa cấu hình đối soát
    await takeScreenshot('MH06_M06_sua_cauhinh.png', {
        action: async (p) => { 
            const btn = await p.$('button[title="Chỉnh sửa"]');
            if (btn) await btn.click();
        },
        waitSelector: 'div[role="dialog"]',
        verifyText: 'Chỉnh sửa cấu hình đối soát'
    });
    await closeDialog();

    // 22. MH06.M07 Xóa cấu hình đối soát
    await takeScreenshot('MH06_M07_xoa_cauhinh.png', {
        action: async (p) => { 
            const btn = await p.$('button[title="Xóa"]');
            if (btn) await btn.click();
        },
        waitSelector: 'div[role="dialog"]',
        verifyText: 'Xác nhận xóa'
    });
    await closeDialog();

    // 23. MH06.M08 Lịch sử đối soát
    await clickTab('Lịch sử đối soát');
    await takeScreenshot('MH06_M08_history_trongnganh.png');

    // 24. MH06.M09 Nhật ký đối soát
    await clickTab('Nhật ký đối soát');
    await takeScreenshot('MH06_M09_log_trongnganh.png');

    // 25. MH07.M01 Danh sách đối soát Ngoài ngành
    await navigateByPath('Quản lý thu thập', 'Đối soát dữ liệu', 'Đối soát hệ thống ngoài ngành');
    await takeScreenshot('MH07_M01_ds_doisoat_ngoainganh.png');

    // 26. MH07.M02 Chi tiết đối soát Ngoài ngành
    await takeScreenshot('MH07_M02_chitiet_doisoat_ngoainganh.png', {
        action: async (p) => { 
            const btn = await p.$('button[title="Xem chi tiết"]');
            if (btn) await btn.click();
        },
        waitSelector: 'div[role="dialog"]',
        verifyText: 'Chi tiết bản ghi'
    });
    await closeDialog();

    // 27. MH07.M04 Thiết lập đối soát Ngoài ngành
    await clickTab('Thiết lập dịch vụ');
    await takeScreenshot('MH07_M04_setup_ngoainganh.png');

    // 28. MH07.M05 Thêm cấu hình đối soát Ngoài ngành
    await takeScreenshot('MH07_M05_them_cauhinh_ngoainganh.png', {
        action: async (p) => { 
            await p.evaluate(() => {
                const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Thêm cấu hình'));
                if (b) b.click();
            });
        },
        waitSelector: 'div[role="dialog"]',
        verifyText: 'Thêm cấu hình đối soát'
    });
    await closeDialog();

    // (Add Sửa for Ngoài ngành if applicable, but user list didn't specify code for it, assuming MH07.M06)
    await takeScreenshot('MH07_M06_sua_cauhinh_ngoainganh.png', {
        action: async (p) => { 
            const btn = await p.$('button[title="Chỉnh sửa"]');
            if (btn) await btn.click();
        },
        waitSelector: 'div[role="dialog"]',
        verifyText: 'Chỉnh sửa cấu hình đối soát'
    });
    await closeDialog();

    // 29. MH07.M08 Lịch sử đối soát Ngoài ngành
    await clickTab('Lịch sử đối soát');
    await takeScreenshot('MH07_M08_history_ngoainganh.png');

    // 30. MH07.M09 Nhật ký đối soát Ngoài ngành
    await clickTab('Nhật ký đối soát');
    await takeScreenshot('MH07_M09_log_ngoainganh.png');

    console.log('--- ALL DONE ---');
    await browser.close();
})();
