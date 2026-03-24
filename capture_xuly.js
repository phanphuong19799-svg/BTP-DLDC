const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// ============================================================
// CAPTURE SCRIPT – Section 4.4 Quản lý xử lý dữ liệu
// MH01 = Dashboard xử lý dữ liệu
// MH02 = Danh sách cấu hình xử lý (processing-rule-setup)
// MH02.P01 = Quản lý quy tắc (popup)
// MH02.P02 = Phân loại và bảo mật dữ liệu (popup)
// MH02.P03 = Danh sách bản ghi lỗi (popup)
// MH02.P04 = Lịch sử xử lý (popup)
// MH02.P05 = Thêm mới luồng xử lý (popup)
// MH02.P06 = Xác nhận xóa (popup via Trash2 icon)
// MH02.P07 = Lập lịch tự động (popup via scheduler toggle)
// ============================================================

const APP_URL = 'http://localhost:3002/';
const IMG_DIR = path.join(__dirname, 'tailieu', 'tailieuphantich', 'images', 'xuly');

async function delay(ms) {
    await new Promise(r => setTimeout(r, ms));
}

async function navigateTo(page, pageId) {
    await page.evaluate((id) => {
        if (window.navigateToPage) window.navigateToPage(id);
    }, pageId);
    await delay(2500);
}

async function closeModal(page) {
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const close = btns.find(b =>
            b.querySelector('.lucide-x') ||
            b.textContent.trim() === 'Đóng' ||
            b.textContent.trim() === 'Hủy' ||
            b.textContent.trim() === 'Hủy bỏ' ||
            b.textContent.trim() === 'Cancel'
        );
        if (close) close.click();
    });
    await delay(1000);
}

async function screenshot(page, filename) {
    const savePath = path.join(IMG_DIR, filename);
    await page.screenshot({ path: savePath, fullPage: false });
    console.log(`✓ ${filename}`);
}

async function clickButtonByText(page, text) {
    const clicked = await page.evaluate((label) => {
        const btns = Array.from(document.querySelectorAll('button'));
        const btn = btns.find(b => b.textContent.trim().includes(label));
        if (btn) { btn.click(); return true; }
        return false;
    }, text);
    return clicked;
}

(async () => {
    console.log('--- Section 4.4 Quản lý xử lý dữ liệu Capture Script ---');
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
        console.error('Failed:', e.message);
        await browser.close();
        return;
    }
    await delay(3000);

    const loginBtn = await page.$('button[type="submit"]');
    if (loginBtn) {
        await loginBtn.click();
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => {});
    }
    await delay(2000);

    console.log('Waiting for navigateToPage...');
    await page.waitForFunction(() => typeof window.navigateToPage === 'function', { timeout: 30000 });
    console.log('Ready.\n');

    // ============================================================
    // MH01 – Dashboard xử lý dữ liệu
    // Mapped to 'collection-dashboard' (DataProcessingPage overview)
    // ============================================================
    console.log('=== MH01 – Dashboard xử lý dữ liệu ===');
    await navigateTo(page, 'processing-rule-setup');
    // Go to the overview dashboard first (DataProcessingPage via parent menu click)
    // Actually 'processing-rule-setup' IS the main page showing stats + list 
    // For MH01, navigate to the parent processing dashboard
    await navigateTo(page, 'processing-rule-setup');
    await screenshot(page, 'MH01_dashboard.png');

    // ============================================================
    // MH02 – Danh sách cấu hình xử lý (same page, full list view)
    // ============================================================
    console.log('=== MH02 – Danh sách cấu hình xử lý ===');
    await screenshot(page, 'MH02_danhsach.png');

    // ============================================================
    // MH02.P01 – Quản lý quy tắc (popup via "Quản lý quy tắc" button)
    // ============================================================
    console.log('=== MH02.P01 – Quản lý quy tắc ===');
    await clickButtonByText(page, 'Quản lý quy tắc');
    await delay(2000);
    await screenshot(page, 'MH02_P01_quytac.png');
    await closeModal(page);

    // ============================================================
    // MH02.P02 – Phân loại và Bảo mật dữ liệu (popup via "Phân loại dữ liệu")
    // ============================================================
    console.log('=== MH02.P02 – Phân loại và bảo mật dữ liệu ===');
    await clickButtonByText(page, 'Phân loại dữ liệu');
    await delay(2000);
    await screenshot(page, 'MH02_P02_baomat.png');
    await closeModal(page);

    // ============================================================
    // MH02.P03 – Danh sách bản ghi lỗi (popup via "Danh sách lỗi")
    // Note: Only appears on rows with errorRecords > 0 (row 1: Hộ tịch, row 4: Công chứng)
    // ============================================================
    console.log('=== MH02.P03 – Danh sách bản ghi lỗi ===');
    await clickButtonByText(page, 'Danh sách lỗi');
    await delay(2000);
    await screenshot(page, 'MH02_P03_loi.png');
    await closeModal(page);

    // ============================================================
    // MH02.P04 – Lịch sử xử lý (popup via "Lịch sử xử lý")
    // ============================================================
    console.log('=== MH02.P04 – Lịch sử xử lý ===');
    await clickButtonByText(page, 'Lịch sử xử lý');
    await delay(2000);
    await screenshot(page, 'MH02_P04_lichsu.png');
    await closeModal(page);

    // ============================================================
    // MH02.P05 – Thêm mới luồng xử lý (popup via "Thêm mới")
    // ============================================================
    console.log('=== MH02.P05 – Thêm mới luồng xử lý ===');
    await clickButtonByText(page, 'Thêm mới');
    await delay(2000);
    await screenshot(page, 'MH02_P05_themmoi.png');
    await closeModal(page);

    // ============================================================
    // MH02.P06 – Xác nhận xóa (popup via Trash2 icon button)
    // ============================================================
    console.log('=== MH02.P06 – Xác nhận xóa ===');
    await page.evaluate(() => {
        // Look for trash icon button in the action row for any rule card
        const trashBtn = document.querySelector('button[title="Xóa"]') ||
                          document.querySelector('button[title="Delete"]');
        if (trashBtn) { trashBtn.click(); return; }
        // Fallback: find lucide-trash icons
        const btns = Array.from(document.querySelectorAll('button'));
        const trashBtnFallback = btns.find(b =>
            b.querySelector('.lucide-trash') || b.querySelector('.lucide-trash-2')
        );
        if (trashBtnFallback) trashBtnFallback.click();
    });
    await delay(2000);
    await screenshot(page, 'MH02_P06_xoa.png');
    await closeModal(page);

    // ============================================================
    // MH02.P07 – Lập lịch chạy tự động (popup via Clock/Schedule button)
    // ============================================================
    console.log('=== MH02.P07 – Lập lịch tự động ===');
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        // Look for clock icon or schedule-related button
        const schedBtn = btns.find(b =>
            b.querySelector('.lucide-clock') ||
            b.title?.includes('Lập lịch') ||
            b.title?.includes('Schedule') ||
            b.textContent.trim().includes('Lập lịch')
        );
        if (schedBtn) schedBtn.click();
    });
    await delay(2000);
    await screenshot(page, 'MH02_P07_laplich.png');
    await closeModal(page);

    console.log('\n--- ALL DONE ---');
    await browser.close();
})().catch(err => {
    console.error('CRITICAL:', err);
    process.exit(1);
});