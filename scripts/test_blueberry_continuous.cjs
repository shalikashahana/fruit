const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testBlueberryFlow() {
  const outputDir = path.join(__dirname, '..', 'verification_screenshots', 'blueberry_test');
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

  console.log('\n--- 1. Testing Continuous Landing Page (/) ---');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });

  console.log('Waiting for all sequences to load...');
  await new Promise(r => setTimeout(r, 4000));

  await page.screenshot({ path: path.join(outputDir, '01_landing_cluster.png') });
  console.log('Captured: 01_landing_cluster.png');

  // Check section positions
  const sections = await page.evaluate(() => {
    const mixed = document.getElementById('fruit-canvas-section');
    const orange = document.getElementById('orange');
    const blueberry = document.getElementById('blueberry');
    return {
      mixedTop: mixed ? mixed.offsetTop : 0,
      orangeTop: orange ? orange.offsetTop : 0,
      blueberryTop: blueberry ? blueberry.offsetTop : 0,
      blueberryHeight: blueberry ? blueberry.offsetHeight : 0,
    };
  });
  console.log('Continuous sections layout:', sections);

  // 1. Scroll into Blueberry Hero (top of blueberry section)
  console.log('Scrolling to Blueberry 3D start...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top, behavior: 'instant' });
  }, sections.blueberryTop);
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '02_blueberry_start.png') });
  console.log('Captured: 02_blueberry_start.png');

  // 2. Scroll to 45% of Blueberry (burst / impact)
  console.log('Scrolling to Blueberry burst (45%)...');
  await page.evaluate((top, height) => {
    window.scrollTo({ top: top + (height - 900) * 0.45, behavior: 'instant' });
  }, sections.blueberryTop, sections.blueberryHeight);
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '03_blueberry_burst.png') });
  console.log('Captured: 03_blueberry_burst.png');

  // 3. Scroll to 85% of Blueberry (Floating Nutrition Facts HUD on canvas)
  console.log('Scrolling to Blueberry Nutrition Facts Reveal (85%)...');
  await page.evaluate((top, height) => {
    window.scrollTo({ top: top + (height - 900) * 0.85, behavior: 'instant' });
  }, sections.blueberryTop, sections.blueberryHeight);
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '04_blueberry_nutrition_up.png') });
  console.log('Captured: 04_blueberry_nutrition_up.png');

  console.log('\n--- 2. Testing Direct Route (/blueberry) ---');
  await page.goto('http://127.0.0.1:5173/blueberry', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(outputDir, '05_blueberry_page_direct.png') });
  console.log('Captured: 05_blueberry_page_direct.png');

  await browser.close();
  console.log('\nVerification completed successfully!');
}

testBlueberryFlow().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
