const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to app...');
  await page.goto('http://localhost:3002/');

  console.log('Logging in...');
  await page.waitForSelector('button[type="submit"]', { timeout: 5000 }).catch(() => console.log('No login button found'));
  try {
    await page.click('button[type="submit"]');
  } catch (e) { }

  console.log('Waiting for app to load...');
  await page.waitForFunction('typeof window.navigateToPage === "function"', { timeout: 15000 });

  const takeScreenshot = async (pageId, filename, action = null) => {
    console.log(`Navigating to ${pageId}...`);
    await page.evaluate((id) => window.navigateToPage(id), pageId);
    await new Promise(r => setTimeout(r, 1000)); // Wait for render

    if (action) {
      await action(page);
    }

    await page.screenshot({ path: `tailieu/tailieuphantich/images/${filename}` });
    console.log(`Saved ${filename}`);
  };

  // 1. Dashboard Hộ tịch điện tử
  await takeScreenshot('data-info-civil-registry', 'dashboard_hotichdientu.png');

  // 2. Danh sách hồ sơ khai sinh (from data-info-civil-registry, 'Hồ sơ khai sinh' might redirect to 'processing-civil-registry')
  // Let's just go to a list page that looks like "Danh sách"
  await takeScreenshot('processing-data-info-civil-registry', 'danhsach_hosokhaisinh.png');

  // 3. Popup Chi tiết bản ghi khai sinh
  await takeScreenshot('processing-data-info-civil-registry', 'popup_chitietkhaisinh.png', async (p) => {
    // Click on the first row or an eye icon
    try {
      await p.waitForSelector('table tbody tr', { timeout: 2000 });
      await p.click('table tbody tr'); // click a row
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.log('No table row to click');
    }
  });

  // 4. Chi tiết nhật ký
  // Go to admin logs? Or collection dashboard?
  await takeScreenshot('admin-access-log', 'chitietnhatky.png');

  // 5. Chi tiết lỗi
  await takeScreenshot('admin-error-log', 'chitiet_loi.png');

  // 6. Dashboard Danh mục ngoài ngành
  await takeScreenshot('processing-external-category-group', 'dashboard_danhmuc_ngoai.png');

  await browser.close();
  console.log('Done.');
})();
