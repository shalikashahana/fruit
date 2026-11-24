const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function runVerification() {
  const outputDir = path.join(__dirname, '..', 'verification_screenshots');
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
  console.log('Waiting for frames to preload...');
  await new Promise(r => setTimeout(r, 2500));

  console.log('1. Capturing Initial Hero Screen (Frame 1)...');
  await page.screenshot({ path: path.join(outputDir, '01_hero_initial.png') });

  // Check scroll height of hero section
  const heroHeight = await page.evaluate(() => {
    const hero = document.getElementById('hero-section');
    return hero ? hero.offsetHeight : 0;
  });
  console.log(`Hero section total scroll height: ${heroHeight}px`);

  // Total scrollable distance for the pinned hero is (heroHeight - windowHeight)
  const pinDistance = heroHeight - 900;
  console.log(`Pin distance: ${pinDistance}px`);

  // Scroll to 30% of hero
  console.log('2. Scrolling to Section 01 (Peel back the facts, ~30%)...');
  await page.evaluate((d) => {
    window.scrollTo({ top: d * 0.30, behavior: 'instant' });
  }, pinDistance);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '02_hero_peel_facts.png') });

  // Scroll to 55% of hero
  console.log('3. Scrolling to Section 02 (Burst with goodness, ~55%)...');
  await page.evaluate((d) => {
    window.scrollTo({ top: d * 0.55, behavior: 'instant' });
  }, pinDistance);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '03_hero_burst_goodness.png') });

  // Scroll to 88% of hero
  console.log('4. Scrolling to Section 03 (Fresh. Pure. Powerful, ~88%)...');
  await page.evaluate((d) => {
    window.scrollTo({ top: d * 0.88, behavior: 'instant' });
  }, pinDistance);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '04_hero_fresh_pure.png') });

  // Scroll to Nutrition Facts
  console.log('5. Scrolling to Nutrition Facts...');
  await page.evaluate(() => {
    const elem = document.getElementById('nutrition');
    if (elem) elem.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '05_nutrition_facts.png') });

  // Scroll to Health Benefits
  console.log('6. Scrolling to Health Benefits...');
  await page.evaluate(() => {
    const elem = document.getElementById('benefits');
    if (elem) elem.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '06_health_benefits.png') });

  // Scroll to How to Enjoy
  console.log('7. Scrolling to How to Enjoy...');
  await page.evaluate(() => {
    const elem = document.getElementById('enjoy');
    if (elem) elem.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '07_how_to_enjoy.png') });

  // Scroll to Calculator and interact
  console.log('8. Interacting with Daily Intake Calculator...');
  await page.evaluate(() => {
    const elem = document.getElementById('calculator');
    if (elem) elem.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 400));
  
  // Set slider to 3 oranges
  await page.evaluate(() => {
    const slider = document.getElementById('orange-slider');
    if (slider) {
      slider.value = '3';
      slider.dispatchEvent(new Event('change', { bubbles: true }));
      slider.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outputDir, '08_calculator_3_oranges.png') });

  // Scroll to Coming Soon & Footer
  console.log('9. Scrolling to Coming Soon & Footer...');
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '09_coming_soon_footer.png') });

  // Mobile Viewport test
  console.log('10. Testing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, '10_mobile_hero.png') });

  // Scroll mobile to splash
  await page.evaluate((h) => {
    window.scrollTo({ top: h * 0.55, behavior: 'instant' });
  }, heroHeight);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '11_mobile_splash.png') });

  console.log('All screenshots captured successfully in verification_screenshots/');
  await browser.close();
}

runVerification().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
