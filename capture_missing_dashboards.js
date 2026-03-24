const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const LIST = [
    { name: 'CSDL Hộ tịch điện tử', slug: 'hotich' },
    { name: 'HTTT TG Pháp lý', slug: 'tgpl' },
    { name: 'CSDL Hợp tác quốc tế', slug: 'htqt' }
];

(async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--window-size=1440,900'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    try {
        console.log('Navigating to login...');
        await page.goto('http://localhost:3002/login', { waitUntil: 'networkidle2' });
        await page.type('input[type="text"]', 'admin');
        await page.type('input[type="password"]', 'admin123@');
        await page.click('button[type="submit"]');
        await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
        await new Promise(r => setTimeout(r, 2000));

        // Click "Quản lý thu thập"
        await page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('aside span'));
            const node = spans.find(span => span.textContent.trim() === 'Quản lý thu thập');
            if (node) node.closest('div').click();
        });
        await new Promise(r => setTimeout(r, 1000));

        // Click "CSDL Trong ngành"
        await page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('aside span'));
            const node = spans.find(span => span.textContent.trim() === 'CSDL Trong ngành');
            if (node) node.closest('div').click();
        });
        await new Promise(r => setTimeout(r, 1000));

        for (const item of LIST) {
            console.log(`Capturing dashboard for: ${item.name}`);
            await page.evaluate((txt) => {
                const spans = Array.from(document.querySelectorAll('aside span'));
                const node = spans.find(span => span.textContent.trim() === txt);
                if (node) node.closest('div').click();
            }, item.name);
            
            await new Promise(r => setTimeout(r, 3000));
            await page.screenshot({ path: `D:/tuphap/khodldc/dldc_1/tailieu/tailieuphantich/images/mauthuthapCSDL_${item.slug}_dashboard.png`, fullPage: true });
            console.log(`Saved mauthuthapCSDL_${item.slug}_dashboard.png`);
        }

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
