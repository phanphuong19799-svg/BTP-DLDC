const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--window-size=1440,900'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    try {
        console.log('1. Navigating to login...');
        await page.goto('http://localhost:3002/login', { waitUntil: 'networkidle2' });
        await page.screenshot({ path: 'D:/tmp/debug_login_step_1.png' });
        
        console.log('2. Typing credentials...');
        await page.type('input[type="text"]', 'admin');
        await page.type('input[type="password"]', 'admin123@');
        await page.screenshot({ path: 'D:/tmp/debug_login_step_2.png' });
        
        console.log('3. Clicking login...');
        const loginBtn = await page.$('button[type="submit"]');
        if (loginBtn) {
            await loginBtn.click();
            await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(e => console.log('Wait for nav failed, moving on...'));
        }
        await page.screenshot({ path: 'D:/tmp/debug_login_step_3.png' });

        console.log('4. Navigating to Civil Status...');
        await page.goto('http://localhost:3002/management/in-network/in-network/civil-status', { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 6000)); 
        await page.screenshot({ path: 'D:/tmp/debug_login_step_4.png' });

        const headerText = await page.evaluate(() => document.body.innerText);
        if (headerText.includes('Hộ tịch điện tử')) {
            await page.screenshot({ path: 'D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/images/mauthuthapCSDL_hotich_dashboard.png', fullPage: true });
            console.log("SUCCESS: Saved mauthuthapCSDL_hotich_dashboard.png");
        } else {
            console.log("FAILURE: Not on Civil Status page");
        }

    } catch (e) {
        console.error('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
