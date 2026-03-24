const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    try {
        await page.goto('http://localhost:3002/management/in-network/overview', { waitUntil: 'networkidle2' });
        
        // Login if redirected
        const loginBtn = await page.$('button[type="submit"]');
        if (loginBtn) {
            await loginBtn.click();
            await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
        }

        await new Promise(r => setTimeout(r, 3000));
        
        // We are at /management/in-network/overview. Let's dump all text.
        const dashboardText = await page.evaluate(() => document.body.innerText);
        console.log("=== IN-NETWORK DASHBOARD TEXT ===");
        // Don't print everything, just find Khai sinh and click it
        
        await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('a, div.cursor-pointer, div[role="button"]'));
            const card = links.find(el => el.textContent.toLowerCase().includes('khai sinh'));
            if (card) card.click();
        });

        await new Promise(r => setTimeout(r, 4000)); // wait for module to load

        // WE SHOULD NOW BE INSIDE "Khai sinh"
        // Let's dump all text to see the tabs!
        const moduleTabs = await page.evaluate(() => {
            // Find tab-like elements
            const tabs = Array.from(document.querySelectorAll('[role="tab"], button.tab, div.tab, li[role="tab"]'));
            if (tabs.length > 0) return tabs.map(t => t.textContent.trim());
            
            // If explicit tabs not found, maybe look at a header row
            const buttons = Array.from(document.querySelectorAll('button, a.nav-link'));
            return buttons.map(b => b.textContent.trim()).filter(t => t.length > 0 && t.length < 50);
        });

        console.log("=== TABS / BUTTONS INSIDE MODULE ===");
        console.log(moduleTabs);

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
