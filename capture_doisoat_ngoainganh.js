const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// ============================================================
// CAPTURE SCRIPT – Section 4.2.7 Đối soát hệ thống Ngoài ngành
// ============================================================

const APP_URL = 'http://localhost:3002/';
const IMG_DIR = path.join(__dirname, 'tailieu', 'tailieuphantich', 'images', 'thuthap');

async function clickTab(page, label) {
    await page.evaluate((text) => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const btn = buttons.find(b => b.textContent.trim() === text);
        if (btn) btn.click();
    }, label);
    await delay(page, 1500);
}

async function closeModal(page) {
    await page.evaluate(() => {
        const btnList = Array.from(document.querySelectorAll('button'));
        const closeBtn = btnList.find(b =>
            (b.querySelector('.lucide-x') || b.querySelector('[class*="lucide-x"]')) ||
            b.textContent.trim() === 'Đóng' ||
            b.textContent.trim() === 'Hủy' ||
            b.textContent.trim() === 'Hủy bỏ'
        );
        if (closeBtn) closeBtn.click();
    });
    await delay(page, 800);
}

async function delay(page, ms) {
    await new Promise(r => setTimeout(r, ms));
}

async function navigateTo(page, pageId) {
    await page.evaluate((id) => {
        if (window.navigateToPage) window.navigateToPage(id);
    }, pageId);
    await delay(page, 2500);
    await clickTab(page, 'Danh sách đối soát');
}

async function screenshot(page, filename) {
    const savePath = path.join(IMG_DIR, filename);
    await page.screenshot({ path: savePath, fullPage: false });
    console.log(`✓ ${filename}`);
}

(async () => {
    console.log('--- Đối soát Ngoài ngành Capture Script ---');
    if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 900 });

    try {
        await page.goto(APP_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch (e) {
        console.error('Failed to load app:', e.message);
        await browser.close();
        return;
    }
    await delay(page, 3000);

    const loginBtn = await page.$('button[type="submit"]');
    if (loginBtn) {
        await loginBtn.click();
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => {});
    }
    await delay(page, 2000);

    console.log('Waiting for navigateToPage...');
    await page.waitForFunction(() => typeof window.navigateToPage === 'function', { timeout: 30000 });
    console.log('Ready.\n');

    // ============================================================
    // Use 'reconciliation-external-categories' as base (MH07 main page)
    // This is "Đối soát tổng hợp các danh mục" – represents the tab-based template
    // ============================================================

    // MH07.M01 – Danh sách đối soát Ngoài ngành (main list screen)
    console.log('=== MH07.M01 – Danh sách đối soát ===');
    await navigateTo(page, 'reconciliation-external-categories');
    await screenshot(page, 'MH07_M01_ds_doisoat_ngoainganh.png');

    // MH07.M02 – Chi tiết đối soát (Eye modal)
    console.log('=== MH07.M02 – Chi tiết đối soát Ngoài ngành ===');
    await page.evaluate(() => {
        const eyeBtn = document.querySelector('button[title="Xem chi tiết"]');
        if (eyeBtn) eyeBtn.click();
    });
    await delay(page, 1800);
    await screenshot(page, 'MH07_M02_chitiet_doisoat_ngoainganh.png');
    await closeModal(page);

    // MH07.M04 – Thiết lập dịch vụ tab
    console.log('=== MH07.M04 – Thiết lập dịch vụ Ngoài ngành ===');
    await clickTab(page, 'Thiết lập dịch vụ');
    await screenshot(page, 'MH07_M04_setup_ngoainganh.png');

    // MH07.M05 – Thêm cấu hình Ngoài ngành
    console.log('=== MH07.M05 – Thêm cấu hình Ngoài ngành ===');
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const addBtn = btns.find(b => b.textContent.includes('Thêm cấu hình') || b.textContent.includes('Thêm mới'));
        if (addBtn) addBtn.click();
    });
    await delay(page, 1800);
    await screenshot(page, 'MH07_M05_them_cauhinh_ngoainganh.png');
    await closeModal(page);

    // MH07.M06 – Sửa cấu hình Ngoài ngành
    console.log('=== MH07.M06 – Sửa cấu hình Ngoài ngành ===');
    await page.evaluate(() => {
        const editBtn = document.querySelector('button[title="Chỉnh sửa"]') ||
                        document.querySelector('button[title="Sửa"]') ||
                        document.querySelector('button[title="Edit"]');
        if (editBtn) {
            editBtn.click();
        } else {
            const btns = Array.from(document.querySelectorAll('button'));
            const eb = btns.find(b => b.querySelector('.lucide-pencil') || b.querySelector('.lucide-edit'));
            if (eb) eb.click();
        }
    });
    await delay(page, 1800);
    await screenshot(page, 'MH07_M06_sua_cauhinh_ngoainganh.png');
    await closeModal(page);

    // MH07.M07 – Xóa cấu hình Ngoài ngành (already OK from previous run, but redo for consistency)
    console.log('=== MH07.M07 – Xác nhận xóa Ngoài ngành ===');
    await page.evaluate(() => {
        const trashBtn = document.querySelector('button[title="Xóa"]') ||
                         document.querySelector('button[title="Delete"]');
        if (trashBtn) {
            trashBtn.click();
        } else {
            const btns = Array.from(document.querySelectorAll('button'));
            const db = btns.find(b => b.querySelector('.lucide-trash') || b.querySelector('.lucide-trash-2'));
            if (db) db.click();
        }
    });
    await delay(page, 1800);
    await screenshot(page, 'MH07_M07_xoa_cauhinh_ngoainganh.png');
    await closeModal(page);

    // MH07.M08 – Lịch sử đối soát Ngoài ngành
    console.log('=== MH07.M08 – Lịch sử đối soát Ngoài ngành ===');
    await clickTab(page, 'Lịch sử đối soát');
    await screenshot(page, 'MH07_M08_history_ngoainganh.png');

    // MH07.M09 – Nhật ký đối soát Ngoài ngành
    console.log('=== MH07.M09 – Nhật ký đối soát Ngoài ngành ===');
    await clickTab(page, 'Nhật ký đối soát');
    await screenshot(page, 'MH07_M09_log_ngoainganh.png');

    // ============================================================
    // M10 – Đối soát danh mục (ExternalCategories page)
    // M11 – Đối soát bản án (ExternalCourtJudgment page)
    // ============================================================
    const externalPages = [
        { id: 'reconciliation-external-categories',    file: 'MH07_M10_ngoainganh_danhmuc.png' },
        { id: 'reconciliation-external-court-judgment', file: 'MH07_M11_ngoainganh_banan.png' },
    ];

    for (const item of externalPages) {
        console.log(`=== ${item.file} ===`);
        await navigateTo(page, item.id);
        await screenshot(page, item.file);
    }

    console.log('\n--- ALL DONE ---');
    await browser.close();
})().catch(err => {
    console.error('CRITICAL:', err);
    process.exit(1);
});
