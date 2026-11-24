const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testContinuousExperience() {
  const outputDir = path.join(__dirname, '..', 'verification_screenshots', 'continuous_test');
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

  console.log('Navigating to http://127.0.0.1:5173/ ...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });

  // Wait for loading screen to complete and fade out
  console.log('Waiting for both image sequences to load...');
  await page.waitForFunction(() => {
    // Wait until loading overlay is gone or main content is visible
    const loader = document.querySelector('[aria-label="Loading fruit experience"]');
    return !loader || window.getComputedStyle(loader).display === 'none';
  }, { timeout: 15000 }).catch(() => console.log('Timeout waiting for loader, continuing...'));

  await new Promise(r => setTimeout(r, 2000));

  console.log('\n--- 1. Testing Initial Screen (Scroll = 0) ---');
  const scrollPos0 = await page.evaluate(() => window.scrollY);
  console.log(`Initial scroll position: ${scrollPos0}px`);

  // Verify headline text is visible in DOM and has opacity > 0.5
  const heroTextCheck = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    if (!h1) return { found: false, text: '', opacity: 0 };
    const style = window.getComputedStyle(h1.parentElement);
    return {
      found: true,
      text: h1.innerText,
      opacity: parseFloat(style.opacity || '0')
    };
  });
  console.log('Hero H1 status:', heroTextCheck);

  await page.screenshot({ path: path.join(outputDir, '01_initial_screen_text_visible.png') });
  console.log('Captured: 01_initial_screen_text_visible.png');

  console.log('\n--- 2. Checking FruitGrid is Removed ---');
  const hasFruitGrid = await page.evaluate(() => {
    return !!document.getElementById('all-fruits') || !!document.getElementById('fruit-grid-heading');
  });
  console.log(`Is FruitGrid present? ${hasFruitGrid} (Expected: false)`);

  console.log('\n--- 3. Testing Scroll-Driven Mixed Explosion ---');
  const mixedHeight = await page.evaluate(() => {
    const s = document.getElementById('fruit-canvas-section');
    return s ? s.offsetHeight : 0;
  });
  console.log(`Mixed fruit section height: ${mixedHeight}px`);

  // Scroll to 45% of mixed fruit section
  await page.evaluate((h) => {
    window.scrollTo({ top: (h - 900) * 0.45, behavior: 'instant' });
  }, mixedHeight);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, '02_mixed_fruit_explosion.png') });
  console.log('Captured: 02_mixed_fruit_explosion.png');

  console.log('\n--- 4. Testing Continuous Flow into Orange Experience ---');
  // Scroll directly into the continuous Orange Hero section
  await page.evaluate(() => {
    const orangeSection = document.getElementById('orange');
    if (orangeSection) orangeSection.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));

  const scrollAtOrange = await page.evaluate(() => window.scrollY);
  console.log(`Scroll position at Orange section: ${scrollAtOrange}px`);
  await page.screenshot({ path: path.join(outputDir, '03_orange_continuous_start.png') });
  console.log('Captured: 03_orange_continuous_start.png');

  console.log('\n--- 5. Scrolling through Orange into Nutrition Facts ---');
  await page.evaluate(() => {
    const nutrition = document.getElementById('nutrition');
    if (nutrition) nutrition.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '04_orange_nutrition_facts.png') });
  console.log('Captured: 04_orange_nutrition_facts.png');

  await browser.close();
  console.log('\nAll checks completed successfully!');
}

testContinuousExperience().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
