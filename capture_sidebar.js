const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--window-size=1440,2000'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 2000 });

    try {
        await page.goto('http://localhost:3002', { waitUntil: 'networkidle2' });
        
        // Login if needed
        const loginBtn = await page.$('button[type="submit"]');
        if (loginBtn) {
            await loginBtn.click();
            await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
        }

        // Wait a bit
        await new Promise(r => setTimeout(r, 2000));

        // Click "Quản lý thu thập"
        await page.evaluate(() => {
            const all = Array.from(document.querySelectorAll('aside div, aside button, aside li'));
            const node = all.find(el => el.textContent.trim().includes('Quản lý thu thập'));
            if (node) node.click();
        });
        
        await new Promise(r => setTimeout(r, 1000));

        // Click CSDL Trong nganh & Ngoai nganh to expand them
        await page.evaluate(() => {
            const all = Array.from(document.querySelectorAll('aside div, aside button, aside li'));
            const trong = all.find(el => el.textContent.trim() === 'CSDL Trong ngành');
            if (trong && trong.closest('div')) trong.closest('div').click();
            const ngoai = all.find(el => el.textContent.trim() === 'CSDL Ngoài ngành');
            if (ngoai && ngoai.closest('div')) ngoai.closest('div').click();
        });

        await new Promise(r => setTimeout(r, 1000));

        await page.screenshot({ path: 'D:/tuphap/khodldc/dldc_1/sidebar_full.png', fullPage: true });
        console.log("Screenshot saved to sidebar_full.png");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
