const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    console.log('--- Automated Documentation Capture Started ---');
    const imgDir = path.join(__dirname, 'tailieu', 'tailieuphantich', 'images', 'thuthap');
    console.log('Output directory:', imgDir);
    
    if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir, { recursive: true });
    }

    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1000 });

    console.log('Navigating to http://localhost:3002/ ...');
    try {
        await page.goto('http://localhost:3002/', { waitUntil: 'domcontentloaded', timeout: 30000 });
        console.log('Page loaded (domcontentloaded)');
    } catch (e) {
        console.error('FAILED to load app:', e.message);
        await browser.close();
        return;
    }

    // Wait a bit for the login button to appear
    await new Promise(r => setTimeout(r, 3000));

    // Login if necessary
    const loginBtn = await page.$('button[type="submit"]');
    if (loginBtn) {
        console.log('Executing Login (clicking submit)...');
        await loginBtn.click();
        console.log('Waiting for post-login navigation...');
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => {
            console.log('Navigation timeout (normal if no redirect)');
        });
    }
    await new Promise(r => setTimeout(r, 2000));

    // WAIT for navigateToPage to be exposed
    console.log('Waiting for window.navigateToPage to be available...');
    await page.waitForFunction(() => typeof window.navigateToPage === 'function', { timeout: 30000 });
    console.log('window.navigateToPage is READY.');

    // List of page IDs and their desired filenames
    const captureList = [
        // Overall
        { id: 'dashboard', filename: '../../TongQuan/dashboard_tongquan.png' },
        { id: 'collection-dashboard', filename: 'csdlhotich_dashboard.png' },
        
        // --- 4.2.4.2 CSDL Hộ tịch điện tử (Specialized Details) ---
        { id: 'data-info-civil-registry', filename: 'csdlhotich_overview.png' }, // MH04.M02
        { id: 'data-info-civil-registry', action: 'click-card', index: 5, filename: 'nuoiconnuoi_chitiet.png' }, // MH04.M09
        { id: 'data-info-civil-registry', action: 'click-card', index: 6, filename: 'giamho_chitiet.png' },    // MH04.M10
        { id: 'data-info-civil-registry', action: 'click-card', index: 7, filename: 'chamdutgiamho_chitiet.png' }, // MH04.M11
        { id: 'data-info-civil-registry', action: 'click-card', index: 8, filename: 'thaydoihotich_chitiet.png' }, // MH04.M12
        { id: 'data-info-civil-registry', action: 'click-card', index: 9, filename: 'cunguoigiamho_chitiet.png' }, // MH04.M13
        { id: 'data-info-civil-registry', action: 'click-card', index: 10, filename: 'giamsatgiamho_chitiet.png' }, // MH04.M14
        { id: 'data-info-civil-registry', action: 'click-card', index: 11, filename: 'lyhon_nuocngoai_chitiet.png' }, // MH04.M15

        // --- Other Databases (Table + Detail) ---
        { id: 'data-info-case-management', filename: 'quoc_tich_dashboard.png' },
        { id: 'data-info-case-management', action: 'click-card', index: 0, filename: 'quoc_tich_chitiet.png' },
        
        { id: 'data-info-civil-judgment', filename: 'tha_dashboard.png' },
        { id: 'data-info-civil-judgment', action: 'click-card', index: 0, filename: 'tha_chitiet.png' },
        
        { id: 'data-info-security-measures', filename: 'bpbd_dashboard.png' },
        { id: 'data-info-security-measures', action: 'click-card', index: 0, filename: 'bpbd_chitiet.png' },
        
        { id: 'data-info-legal-national', filename: 'pl_dashboard.png' },
        { id: 'data-info-legal-national', action: 'click-card', index: 0, filename: 'pl_chitiet.png' },
        
        { id: 'data-info-civil-legal-center', filename: 'tpds_dashboard.png' },
        { id: 'data-info-civil-legal-center', action: 'click-card', index: 0, filename: 'tpds_chitiet.png' },
        
        { id: 'data-info-civil-legal-info', filename: 'tttg_dashboard.png' },
        { id: 'data-info-civil-legal-info', action: 'click-card', index: 0, filename: 'tttg_chitiet.png' },
        
        { id: 'data-info-legal-center', filename: 'tgpl_dashboard.png' },
        { id: 'data-info-legal-center', action: 'click-card', index: 0, filename: 'tgpl_chitiet.png' },
        
        { id: 'data-info-family-base', filename: 'hgcs_dashboard.png' },
        { id: 'data-info-family-base', action: 'click-card', index: 0, filename: 'hgcs_chitiet.png' },
        
        { id: 'data-info-auction', filename: 'dgts_dashboard.png' },
        { id: 'data-info-auction', action: 'click-card', index: 0, filename: 'dgts_chitiet.png' },
        
        { id: 'data-info-international', filename: 'htqt_dashboard.png' },
        { id: 'data-info-international', action: 'click-card', index: 0, filename: 'htqt_chitiet.png' },

        // --- External Databases ---
        { id: 'external-court-judgment', filename: 'toicao_dashboard.png' },
        { id: 'external-court-judgment', action: 'click-card', index: 0, filename: 'toicao_chitiet.png' },
        { id: 'external-category-group', filename: 'MH05_M02b_danhmuc.png' },
        { id: 'external-social-security', filename: 'MH05_M02c_bhxh.png' },
        { id: 'external-social-security', action: 'click-card', index: 0, filename: 'chitiet_bhxh.png' },
        { id: 'external-meritorious-group', filename: 'MH05_M02d_nocong.png' },
        { id: 'external-meritorious-group', action: 'click-card', index: 0, filename: 'chitiet_nocong.png' },
        { id: 'external-children-group', filename: 'MH05_M02e_treem.png' },
        { id: 'external-children-group', action: 'click-card', index: 0, filename: 'chitiet_treem.png' },
    ];

    for (const item of captureList) {
        console.log(`[CAPTURE] Page ID: ${item.id} | Action: ${item.action || 'none'} -> ${item.filename}`);
        
        try {
            // Navigate
            await page.evaluate((id) => window.navigateToPage && window.navigateToPage(id), item.id);
            await new Promise(r => setTimeout(r, 2000));

            // Perform Action if any
            if (item.action === 'click-card') {
                // Click the card in CivilRegistryDatabasePage
                await page.evaluate((idx) => {
                    const cards = document.querySelectorAll('.cursor-pointer.border-slate-200');
                    if (cards[idx]) cards[idx].click();
                }, item.index);
                await new Promise(r => setTimeout(r, 1500));
            } else if (item.action === 'click-eye') {
                // Click the first Eye icon in GenericDataTable
                await page.evaluate(() => {
                    const eyeBtn = document.querySelector('button[title="Xem chi tiết"]');
                    if (eyeBtn) eyeBtn.click();
                });
                await new Promise(r => setTimeout(r, 1500));
            }

            // Save Screenshot
            const savePath = path.join(imgDir, item.filename);
            const parentDir = path.dirname(savePath);
            if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir, { recursive: true });

            await page.screenshot({ path: savePath });
            console.log(`Success: ${item.filename}`);

            // Close modal if opened to reset state for next capture on same page
            if (item.action) {
                await page.evaluate(() => {
                    const closeBtnArray = Array.from(document.querySelectorAll('button')).filter(b => b.innerHTML.includes('lucide-x') || b.querySelector('.lucide-x'));
                    if (closeBtnArray.length > 0) closeBtnArray[0].click();
                    else {
                        // Fallback: click backdrop or some general close button
                        const modalClose = document.querySelector('button[aria-label="Close"]');
                        if (modalClose) modalClose.click();
                    }
                });
                await new Promise(r => setTimeout(r, 1000));
            }
        } catch (err) {
            console.error(`FAILED to capture ${item.id}:`, err.message);
        }
    }

    console.log('\n--- ALL DONE ---');
    console.log(`Total screenshots captured: ${captureList.length}`);
    await browser.close();
})().catch(err => {
    console.error('CRITICAL SCRIPT ERROR:', err);
    process.exit(1);
});
