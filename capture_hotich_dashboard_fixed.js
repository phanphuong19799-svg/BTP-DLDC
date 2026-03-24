const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--window-size=1440,900'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    try {
        console.log('Navigating to login...');
        await page.goto('http://localhost:3002/login', { waitUntil: 'networkidle2' });
        
        await new Promise(r => setTimeout(r, 2000));
        
        // Login
        console.log('Typing credentials...');
        await page.type('input[type="text"]', 'admin');
        await page.type('input[type="password"]', 'admin123@');
        
        await page.click('button[type="submit"]');
        await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});

        console.log('Navigating to Civil Status...');
        // Directly go to the civil status page which usually has the dashboard
        await page.goto('http://localhost:3002/management/in-network/in-network/civil-status', { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 5000)); // Wait for charts to load

        await page.screenshot({ path: 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/images/mauthuthapCSDL_hotich_dashboard.png', fullPage: true });
        console.log("Saved mauthuthapCSDL_hotich_dashboard.png");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
