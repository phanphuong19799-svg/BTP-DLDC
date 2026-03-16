const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    console.log('Script started...');
    const imgDir = path.join(__dirname, 'tailieu', 'tailieuphantich', 'images');
    console.log('Image directory:', imgDir);
    
    if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir, { recursive: true });
    }

    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to app...');
    try {
        await page.goto('http://localhost:3002/', { waitUntil: 'networkidle2', timeout: 30000 });
    } catch (e) {
        console.error('FAILED to load app. Is npm run dev running on port 3002?');
        await browser.close();
        return;
    }

    console.log('Logging in...');
    const loginBtn = await page.$('button[type="submit"]');
    if (loginBtn) {
        await loginBtn.click();
        await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
    }

    await new Promise(r => setTimeout(r, 2000));
    
    // Tong quan is typically the default page after login. We'll capture it directly.
    await new Promise(r => setTimeout(r, 3000)); // wait for charts
    const savePath = path.join(imgDir, 'TongQuan', 'dashboard_tongquan.png');
    await page.screenshot({ path: savePath });
    console.log(`[PHOTO] TongQuan/dashboard_tongquan.png`);

    // Capture popups
    const cards = [
        { text: 'Tổng bản ghi', filename: 'popup_tongbanghi.png' },
        { text: 'Bản ghi đã xử lý', filename: 'popup_banghixuly.png' },
        { text: 'Lượt chia sẻ', filename: 'popup_luotchiase.png' }
    ];

    for (const card of cards) {
        console.log(`Searching for: ${card.text}...`);
        
        // Log all labels for debugging
        const allLabels = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.bg-white div')).map(d => d.textContent.trim()).filter(t => t.length > 0);
        });
        console.log('Available labels found:', allLabels);

        const el = await page.evaluateHandle((text) => {
            const divs = Array.from(document.querySelectorAll('.bg-white div'));
            return divs.find(d => d.textContent.trim().toLowerCase().includes(text.toLowerCase()));
        }, card.text);
        
        const isElement = await page.evaluate(node => node !== null && node !== undefined, el);
        
        if (isElement) {
            console.log(`Found element for ${card.text}. Clicking...`);
            await page.evaluate((node) => {
                const clickable = node.closest('.bg-white');
                if (clickable) clickable.click();
            }, el);
            
            await new Promise(r => setTimeout(r, 1500)); // wait for modal animation
            const popupPath = path.join(imgDir, 'TongQuan', card.filename);
            await page.screenshot({ path: popupPath });
            console.log(`[PHOTO] TongQuan/${card.filename}`);
            
            await page.keyboard.press('Escape'); // close modal
            await new Promise(r => setTimeout(r, 1000)); // wait for close animation
        } else {
            console.log(`Not found: ${card.text}`);
        }
    }

    console.log('--- ALL DONE ---');
    await browser.close();
})();
