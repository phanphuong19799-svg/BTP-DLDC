const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--window-size=1440,900'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    try {
        await page.goto('http://localhost:3002', { waitUntil: 'networkidle2' });
        
        // 1. Login
        const loginBtn = await page.$('button[type="submit"]');
        if (loginBtn) {
            await loginBtn.click();
            await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
        }

        await new Promise(r => setTimeout(r, 2000));

        // Click "Quản lý thu thập"
        await page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('aside span'));
            const node = spans.find(span => span.textContent.trim() === 'Quản lý thu thập');
            if (node) node.closest('div').click();
        });
        
        await new Promise(r => setTimeout(r, 1000));
        
        // Click CSDL Trong ngành
        await page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('aside span'));
            const node = spans.find(span => span.textContent.trim() === 'CSDL Trong ngành');
            if (node) node.closest('div').click();
        });

        await new Promise(r => setTimeout(r, 1000));

        // Click CSDL Hộ tịch điện tử
        await page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('aside span'));
            const node = spans.find(span => span.textContent.trim() === 'CSDL Hộ tịch điện tử');
            if (node) node.closest('div').click();
        });

        await new Promise(r => setTimeout(r, 3000));

        await page.screenshot({ path: 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/images/mauthuthapCSDL_hotich_dashboard.png', fullPage: true });
        console.log("Saved mauthuthapCSDL_hotich_dashboard.png");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
