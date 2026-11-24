const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testBlueberryAbsolute() {
  const outputDir = path.join(__dirname, '..', 'verification_screenshots', 'blueberry_test');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 4000));

  // Compute absolute document offsets
  const layout = await page.evaluate(() => {
    const getDocTop = (el) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return rect.top + window.scrollY;
    };

    const mixed = document.getElementById('fruit-canvas-section');
    const orange = document.getElementById('orange');
    const blueberry = document.getElementById('blueberry');

    return {
      mixedTop: getDocTop(mixed),
      mixedHeight: mixed ? mixed.offsetHeight : 0,
      orangeTop: getDocTop(orange),
      orangeHeight: orange ? orange.offsetHeight : 0,
      blueberryTop: getDocTop(blueberry),
      blueberryHeight: blueberry ? blueberry.offsetHeight : 0,
      docHeight: document.documentElement.scrollHeight
    };
  });
  console.log('Absolute Document Layout:', layout);

  // 1. Scroll to start of Blueberry section
  console.log(`Scrolling to Blueberry Start at ${layout.blueberryTop}px...`);
  await page.evaluate((top) => {
    window.scrollTo({ top: top, behavior: 'instant' });
  }, layout.blueberryTop);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, '02_blueberry_start.png') });
  console.log('Captured 02_blueberry_start.png');

  // 2. Scroll to 45% of Blueberry (burst)
  const burstScroll = layout.blueberryTop + (layout.blueberryHeight - 900) * 0.45;
  console.log(`Scrolling to Blueberry Burst at ${burstScroll}px...`);
  await page.evaluate((top) => {
    window.scrollTo({ top: top, behavior: 'instant' });
  }, burstScroll);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, '03_blueberry_burst.png') });
  console.log('Captured 03_blueberry_burst.png');

  // 3. Scroll to 85% of Blueberry (Nutrition Facts HUD on canvas)
  const nutritionScroll = layout.blueberryTop + (layout.blueberryHeight - 900) * 0.85;
  console.log(`Scrolling to Blueberry Nutrition HUD at ${nutritionScroll}px...`);
  await page.evaluate((top) => {
    window.scrollTo({ top: top, behavior: 'instant' });
  }, nutritionScroll);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, '04_blueberry_nutrition_up.png') });
  console.log('Captured 04_blueberry_nutrition_up.png');

  await browser.close();
  console.log('Done!');
}

testBlueberryAbsolute().catch(console.error);
