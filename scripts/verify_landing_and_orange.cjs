const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testSite() {
  const outputDir = path.join(__dirname, '..', 'verification_screenshots', 'landing_test');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.toString()));

  console.log('\n--- 1. Testing Landing Page (/) ---');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });

  // Wait for loading screen to complete and fade out
  console.log('Waiting for frames to preload on Landing Page...');
  await new Promise(r => setTimeout(r, 3000));

  await page.screenshot({ path: path.join(outputDir, '01_landing_hero.png') });
  console.log('Captured: 01_landing_hero.png');

  // Check section height
  const sectionHeight = await page.evaluate(() => {
    const s = document.getElementById('fruit-canvas-section');
    return s ? s.offsetHeight : 0;
  });
  console.log(`Landing scroll section height: ${sectionHeight}px`);

  // Scroll to 50% of the canvas sequence (explosion)
  console.log('Scrolling to 50% (explosion)...');
  await page.evaluate((h) => {
    window.scrollTo({ top: (h - 900) * 0.5, behavior: 'instant' });
  }, sectionHeight);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, '02_landing_explosion_50.png') });
  console.log('Captured: 02_landing_explosion_50.png');

  // Scroll to 90% (Orange CTA overlay)
  console.log('Scrolling to 90% (Orange CTA)...');
  await page.evaluate((h) => {
    window.scrollTo({ top: (h - 900) * 0.9, behavior: 'instant' });
  }, sectionHeight);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, '03_landing_orange_cta.png') });
  console.log('Captured: 03_landing_orange_cta.png');

  // Scroll to Fruit Grid
  console.log('Scrolling to Fruit Grid...');
  await page.evaluate(() => {
    const grid = document.getElementById('all-fruits');
    if (grid) grid.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, '04_landing_fruit_grid.png') });
  console.log('Captured: 04_landing_fruit_grid.png');

  console.log('\n--- 2. Testing Navigation to /orange ---');
  // Click on the Orange card in the grid or nav button
  await page.evaluate(() => {
    const navOrangeBtn = document.querySelector('button[type="button"]');
    // Find button containing 'Explore Orange'
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent && b.textContent.includes('Explore Orange'));
    if (btn) {
      btn.click();
    } else {
      window.location.href = '/orange';
    }
  });

  await new Promise(r => setTimeout(r, 3000));
  const currentUrl = page.url();
  console.log(`Current URL after navigation: ${currentUrl}`);

  await page.screenshot({ path: path.join(outputDir, '05_orange_page_hero.png') });
  console.log('Captured: 05_orange_page_hero.png');

  // Scroll on Orange Page
  console.log('Scrolling on Orange page to Nutrition section...');
  await page.evaluate(() => {
    const elem = document.getElementById('nutrition');
    if (elem) elem.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '06_orange_nutrition.png') });
  console.log('Captured: 06_orange_nutrition.png');

  console.log('\n--- 3. Testing Navigation Back to / ---');
  await page.evaluate(() => {
    // Click FruitWise logo to go home
    const logo = document.querySelector('header a');
    if (logo) logo.click();
  });
  await new Promise(r => setTimeout(r, 2000));
  console.log(`Returned to URL: ${page.url()}`);
  await page.screenshot({ path: path.join(outputDir, '07_back_to_landing.png') });
  console.log('Captured: 07_back_to_landing.png');

  await browser.close();
  console.log('\nVerification completed successfully!');
}

testSite().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
