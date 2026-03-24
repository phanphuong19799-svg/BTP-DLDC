const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    console.log('Capturing MH01...');
    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    
    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 900 });
        await page.goto('http://localhost:3002/');
        await new Promise(r => setTimeout(r, 4000));
        
        try {
            await page.click('button[type="submit"]');
            await new Promise(r => setTimeout(r, 4000));
        } catch(e) { console.log('Login skip/error', e.message); }
        
        await page.evaluate(() => {
            if (window.navigateToPage) window.navigateToPage('processing');
        });
        
        await new Promise(r => setTimeout(r, 3000));
        const savePath = path.join(__dirname, 'tailieu', 'tailieuphantich', 'images', 'xuly', 'MH01_dashboard.png');
        await page.screenshot({ path: savePath });
        console.log('Done capturing MH01 to:', savePath);
    } catch(e) {
        console.error('Error:', e);
    } finally {
        await browser.close();
    }
})();
