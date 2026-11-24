const puppeteer = require('puppeteer');
const path = require('path');

async function testScroll() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Navigating to landing page http://127.0.0.1:5173/ ...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  console.log('Scrolling down to the Fruit Grid...');
  await page.evaluate(() => {
    const grid = document.getElementById('all-fruits');
    if (grid) grid.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));

  const scrollBefore = await page.evaluate(() => window.scrollY);
  console.log(`Scroll position at Fruit Grid: ${scrollBefore}px`);

  console.log('Clicking on the Orange card in the grid...');
  await page.evaluate(() => {
    // Find the Orange card in the grid
    const cards = Array.from(document.querySelectorAll('[role="button"]'));
    const orangeCard = cards.find(c => c.textContent && c.textContent.includes('Orange'));
    if (orangeCard) {
      orangeCard.click();
    }
  });

  await new Promise(r => setTimeout(r, 2000));
  const urlAfter = page.url();
  console.log(`Navigated to: ${urlAfter}`);

  const scrollAfter = await page.evaluate(() => window.scrollY);
  console.log(`Scroll position on Orange page: ${scrollAfter}px`);

  const screenshotPath = path.join(__dirname, '..', 'verification_screenshots', 'orange_top_view_verified.png');
  await page.screenshot({ path: screenshotPath });
  console.log(`Captured screenshot to: ${screenshotPath}`);

  if (scrollAfter === 0) {
    console.log('SUCCESS: Page properly scrolled to top view (0px)!');
  } else {
    console.error(`FAIL: Page scroll position is ${scrollAfter}px instead of 0px!`);
  }

  await browser.close();
}

testScroll().catch(err => {
  console.error(err);
  process.exit(1);
});
