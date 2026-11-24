const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testPomegranateFlow() {
  const outputDir = path.join(__dirname, '..', 'verification_screenshots', 'pomegranate_test');
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
  await new Promise(r => setTimeout(r, 4500));

  await page.screenshot({ path: path.join(outputDir, '01_landing_cluster.png') });
  console.log('Captured: 01_landing_cluster.png');

  // Check section positions using getBoundingClientRect
  const sections = await page.evaluate(() => {
    const getAbsoluteTop = (el) => el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : 0;
    const mixed = document.getElementById('fruit-canvas-section');
    const orange = document.getElementById('orange');
    const blueberry = document.getElementById('blueberry');
    const pomegranate = document.getElementById('pomegranate');
    return {
      mixedTop: getAbsoluteTop(mixed),
      orangeTop: getAbsoluteTop(orange),
      blueberryTop: getAbsoluteTop(blueberry),
      pomegranateTop: getAbsoluteTop(pomegranate),
      pomegranateHeight: pomegranate ? pomegranate.offsetHeight : 0,
    };
  });
  console.log('Continuous sections layout:', sections);

  // 1. Scroll into Pomegranate Hero (top of pomegranate section)
  console.log('Scrolling to Pomegranate 3D start...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top, behavior: 'instant' });
  }, sections.pomegranateTop);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, '02_pomegranate_start.png') });
  console.log('Captured: 02_pomegranate_start.png');

  // 2. Scroll to 45% of Pomegranate (burst / arils cracking)
  console.log('Scrolling to Pomegranate burst (45%)...');
  await page.evaluate((top, height) => {
    window.scrollTo({ top: top + (height - 900) * 0.45, behavior: 'instant' });
  }, sections.pomegranateTop, sections.pomegranateHeight);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, '03_pomegranate_burst.png') });
  console.log('Captured: 03_pomegranate_burst.png');

  // 3. Scroll to 85% of Pomegranate (Floating Nutrition Facts HUD on canvas)
  console.log('Scrolling to Pomegranate Nutrition Facts Reveal (85%)...');
  await page.evaluate((top, height) => {
    window.scrollTo({ top: top + (height - 900) * 0.85, behavior: 'instant' });
  }, sections.pomegranateTop, sections.pomegranateHeight);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, '04_pomegranate_nutrition_up.png') });
  console.log('Captured: 04_pomegranate_nutrition_up.png');

  console.log('\n--- 2. Testing Direct Route (/pomegranate) ---');
  await page.goto('http://127.0.0.1:5173/pomegranate', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3500));
  await page.screenshot({ path: path.join(outputDir, '05_pomegranate_page_direct.png') });
  console.log('Captured: 05_pomegranate_page_direct.png');

  await browser.close();
  console.log('\nVerification completed successfully!');
}

testPomegranateFlow().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
