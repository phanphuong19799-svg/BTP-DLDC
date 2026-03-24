const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// ============================================================
// CAPTURE SCRIPT – Section 4.2.6 Đối soát hệ thống Trong ngành
// 4 tabs + 2 modals captured. Runs on localhost:3002
// ============================================================

const APP_URL = 'http://localhost:3002/';
const IMG_DIR = path.join(__dirname, 'tailieu', 'tailieuphantich', 'images', 'thuthap');

// Helper: click a tab button by its exact text label
async function clickTab(page, label) {
    await page.evaluate((text) => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const btn = buttons.find(b => b.textContent.trim() === text);
        if (btn) btn.click();
    }, label);
    await delay(page, 1500);
}

// Helper: close any open modal (look for X button)
async function closeModal(page) {
    await page.evaluate(() => {
        // Look for common modal close buttons (X icons, or "Đóng" buttons)
        const btnList = Array.from(document.querySelectorAll('button'));
        const closeBtn = btnList.find(b => 
            (b.querySelector('.lucide-x') || b.querySelector('[class*="lucide-x"]')) ||
            (b.textContent.trim() === 'Đóng') ||
            (b.textContent.trim() === 'Hủy')
        );
        if (closeBtn) closeBtn.click();
    });
    await delay(page, 800);
}

// Helper: delay with ms
async function delay(page, ms) {
    await new Promise(r => setTimeout(r, ms));
}

// Navigate and wait for page to load
async function navigateTo(page, pageId) {
    await page.evaluate((id) => {
        if (window.navigateToPage) window.navigateToPage(id);
    }, pageId);
    await delay(page, 2500);
    // Reset to list tab
    await clickTab(page, 'Danh sách đối soát');
}

// Save screenshot
async function screenshot(page, filename) {
    const savePath = path.join(IMG_DIR, filename);
    await page.screenshot({ path: savePath, fullPage: false });
    console.log(`✓ ${filename}`);
}

(async () => {
    console.log('--- Đối soát Trong ngành Capture Script ---');
    if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 900 });

    // Load app
    try {
        await page.goto(APP_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch (e) {
        console.error('Failed to load app:', e.message);
        await browser.close();
        return;
    }
    await delay(page, 3000);

    // Login
    const loginBtn = await page.$('button[type="submit"]');
    if (loginBtn) {
        await loginBtn.click();
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => {});
    }
    await delay(page, 2000);

    // Wait for navigateToPage
    console.log('Waiting for navigateToPage...');
    await page.waitForFunction(() => typeof window.navigateToPage === 'function', { timeout: 30000 });
    console.log('Ready.\n');

    // ============================================================
    // MH06.M01 – Danh sách đối soát Trong ngành (main list screen)
    // Navigate to CSDL Hộ tịch as representative
    // ============================================================
    console.log('=== MH06.M01 – Danh sách đối soát ===');
    await navigateTo(page, 'reconciliation-internal-civil-registry');
    await screenshot(page, 'MH06_M01_ds_doisoat_trongnganh.png');

    // ============================================================
    // MH06.M02 – Chi tiết dữ liệu đối soát (Eye button modal)
    // ============================================================
    console.log('=== MH06.M02 – Chi tiết dữ liệu đối soát ===');
    await page.evaluate(() => {
        const eyeBtn = document.querySelector('button[title="Xem chi tiết"]');
        if (eyeBtn) eyeBtn.click();
    });
    await delay(page, 1800);
    await screenshot(page, 'MH06_M02_chitiet_doisoat_trongnganh.png');
    await closeModal(page);

    // ============================================================
    // MH06.M03 – Chi tiết lỗi đối soát (AlertCircle button modal - on mismatched row)
    // ============================================================
    console.log('=== MH06.M03 – Chi tiết lỗi đối soát ===');
    await page.evaluate(() => {
        const alertBtn = document.querySelector('button[title="Xem chi tiết lỗi"]');
        if (alertBtn) alertBtn.click();
    });
    await delay(page, 1800);
    await screenshot(page, 'MH06_M03_loi_doisoat_trongnganh_new.png');
    await closeModal(page);

    // ============================================================
    // MH06.M04 – Thiết lập dịch vụ đối soát (tab: "Thiết lập dịch vụ")
    // ============================================================
    console.log('=== MH06.M04 – Thiết lập dịch vụ ===');
    await clickTab(page, 'Thiết lập dịch vụ');
    await screenshot(page, 'MH06_M04_setup_trongnganh.png');

    // ============================================================
    // MH06.M05 – Thêm cấu hình (click "Thêm cấu hình" button in setup tab)
    // ============================================================
    console.log('=== MH06.M05 – Thêm cấu hình đối soát ===');
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const addBtn = btns.find(b => b.textContent.includes('Thêm cấu hình') || b.textContent.includes('Thêm mới'));
        if (addBtn) addBtn.click();
    });
    await delay(page, 1800);
    await screenshot(page, 'MH06_M05_them_cauhinh.png');
    await closeModal(page);

    // ============================================================
    // MH06.M06 – Sửa cấu hình (click edit/pencil icon in setup tab)
    // ============================================================
    console.log('=== MH06.M06 – Sửa cấu hình đối soát ===');
    await page.evaluate(() => {
        // Try pencil/edit button
        const editButton = document.querySelector('button[title="Chỉnh sửa"]') ||
                           document.querySelector('button[title="Sửa"]') ||
                           document.querySelector('button[title="Edit"]');
        if (editButton) editButton.click();
        else {
            // Fallback: look for edit icon in first row
            const btns = Array.from(document.querySelectorAll('button'));
            const editBtn = btns.find(b => b.querySelector('.lucide-pencil') || b.querySelector('.lucide-edit'));
            if (editBtn) editBtn.click();
        }
    });
    await delay(page, 1800);
    await screenshot(page, 'MH06_M06_sua_cauhinh.png');
    await closeModal(page);

    // ============================================================
    // MH06.M07 – Xóa cấu hình (click delete/trash icon in setup tab)
    // ============================================================
    console.log('=== MH06.M07 – Xác nhận xóa cấu hình ===');
    await page.evaluate(() => {
        const trashBtn = document.querySelector('button[title="Xóa"]') ||
                         document.querySelector('button[title="Delete"]');
        if (trashBtn) trashBtn.click();
        else {
            const btns = Array.from(document.querySelectorAll('button'));
            const deleteBtn = btns.find(b => b.querySelector('.lucide-trash') || b.querySelector('.lucide-trash-2'));
            if (deleteBtn) deleteBtn.click();
        }
    });
    await delay(page, 1800);
    await screenshot(page, 'MH06_M07_xoa_cauhinh.png');
    await closeModal(page);

    // ============================================================
    // MH06.M08 – Lịch sử đối soát (tab: "Lịch sử đối soát")
    // ============================================================
    console.log('=== MH06.M08 – Lịch sử đối soát ===');
    await clickTab(page, 'Lịch sử đối soát');
    await screenshot(page, 'MH06_M08_history_trongnganh_new.png');

    // ============================================================
    // MH06.M09 – Nhật ký đối soát (tab: "Nhật ký đối soát")
    // ============================================================
    console.log('=== MH06.M09 – Nhật ký đối soát ===');
    await clickTab(page, 'Nhật ký đối soát');
    await screenshot(page, 'MH06_M09_log_trongnganh.png');

    // ============================================================
    // MH06.M10 – M23: Each CSDL sub-page (list tab only)
    // ============================================================
    const csdlList = [
        { id: 'reconciliation-internal-civil-registry',        file: 'MH06_M10_hotich.png' },
        { id: 'reconciliation-internal-registry',              file: 'MH06_M11_quoc_tich.png' },
        { id: 'reconciliation-internal-civil-judgment',        file: 'MH06_M12_thiahanhan.png' },
        { id: 'reconciliation-internal-security-measures',     file: 'MH06_M13_bienphapbd.png' },
        { id: 'reconciliation-internal-legal-national',        file: 'MH06_M14_quocgia_pl.png' },
        { id: 'reconciliation-internal-civil-legal-center',   file: 'MH06_M15_tt_tuphap.png' },
        { id: 'reconciliation-internal-civil-legal-info',     file: 'MH06_M16_tttg_phaply.png' },
        { id: 'reconciliation-internal-legal-center',         file: 'MH06_M17_tg_phaply.png' },
        { id: 'reconciliation-internal-family-base',          file: 'MH06_M18_pbgdhg.png' },
        { id: 'reconciliation-internal-auction',              file: 'MH06_M19_daugia.png' },
        { id: 'reconciliation-internal-international',        file: 'MH06_M20_htqt.png' },
        { id: 'reconciliation-internal-statistics',           file: 'MH06_M21_thongke.png' },
        { id: 'reconciliation-internal-notary',               file: 'MH06_M22_congchung.png' },
        { id: 'reconciliation-internal-authentication',       file: 'MH06_M23_chungthuc.png' },
    ];

    for (const csdl of csdlList) {
        console.log(`=== ${csdl.file} ===`);
        await navigateTo(page, csdl.id);
        await screenshot(page, csdl.file);
    }

    console.log('\n--- ALL DONE ---');
    await browser.close();
})().catch(err => {
    console.error('CRITICAL:', err);
    process.exit(1);
});
