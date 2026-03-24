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

        await new Promise(r => setTimeout(r, 2000));
        
        // Click on the first card "Hồ sơ đăng ký khai sinh" or just any module
        await page.evaluate(() => {
            // Find a card/link containing 'khai sinh'
            const links = Array.from(document.querySelectorAll('a, div.cursor-pointer, div[role="button"]'));
            const card = links.find(el => el.textContent.toLowerCase().includes('khai sinh'));
            if (card) card.click();
        });

        await new Promise(r => setTimeout(r, 2000));

        // Take screenshot of the screen inside a module
        await page.screenshot({ path: 'D:/tuphap/khodldc/dldc_1/module_inside.png', fullPage: true });
        console.log("Saved module_inside.png");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
