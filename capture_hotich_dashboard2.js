const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--window-size=1440,900'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    try {
        await page.goto('http://localhost:3002/login', { waitUntil: 'networkidle2' });
        
        await new Promise(r => setTimeout(r, 2000));
        
        // Login
        const u = await page.$('input[type="text"]');
        if (u) await u.type('admin');
        const p = await page.$('input[type="password"]');
        if (p) await p.type('admin123@');
        
        const loginBtn = await page.$('button[type="submit"]');
        if (loginBtn) {
            await loginBtn.click();
            await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
        }

        await new Promise(r => setTimeout(r, 2000));
        
        // Try direct nav again after login
        await page.goto('http://localhost:3002/management/in-network/in-network/civil-status', { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 3000));

        // Wait to make sure the charts load
        await new Promise(r => setTimeout(r, 2000));

        // Make sure sidebar is expanded
        let isExpanded = await page.evaluate(() => {
            return document.body.innerText.includes('CSDL Hộ tịch điện tử');
        });
        if (!isExpanded) {
            await page.evaluate(() => {
                const spans = Array.from(document.querySelectorAll('aside span'));
                const node = spans.find(span => span.textContent.trim() === 'CSDL Trong ngành');
                if (node) node.closest('div').click();
            });
            await new Promise(r => setTimeout(r, 1000));
            // Just click around to ensure it is active
        }

        await new Promise(r => setTimeout(r, 2000));

        await page.screenshot({ path: 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/images/mauthuthapCSDL_hotich_dashboard.png', fullPage: true });
        console.log("Saved mauthuthapCSDL_hotich_dashboard.png");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
