const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testNutritionUp() {
  const outputDir = path.join(__dirname, '..', 'verification_screenshots', 'nutrition_up_test');
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

  console.log('\n--- 1. Testing /orange route ---');
  await page.goto('http://127.0.0.1:5173/orange', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Check section height
  const heroHeight = await page.evaluate(() => {
    const s = document.getElementById('orange');
    return s ? s.offsetHeight : 0;
  });
  console.log(`Orange hero section height: ${heroHeight}px`);

  // Scroll to 85% of Orange hero (where the nutrition facts reveal appears on the 3D canvas)
  console.log('Scrolling to 85% of Orange hero (Nutrition Facts Reveal)...');
  await page.evaluate((h) => {
    window.scrollTo({ top: (h - 900) * 0.85, behavior: 'instant' });
  }, heroHeight);
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: path.join(outputDir, '01_orange_nutrition_reveal_up.png') });
  console.log('Captured: 01_orange_nutrition_reveal_up.png');

  // Verify that removed sections are absent from DOM
  const checkRemoved = await page.evaluate(() => {
    const textContent = document.body.innerText;
    return {
      hasHealthBenefits: textContent.includes('Health Benefits') || textContent.includes('Immune Fortress'),
      hasCalculator: !!document.getElementById('calculator'),
      hasHowToEnjoy: !!document.getElementById('enjoy'),
      hasMoreFruitsGrid: textContent.includes('More Fruits Coming Soon') || textContent.includes('Crisp Apple'),
    };
  });
  console.log('Verification of removed sections on /orange:', checkRemoved);

  // Check total document scroll height
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log(`Total document scroll height: ${totalHeight}px`);

  console.log('\n--- 2. Testing Continuous Landing Page (/) ---');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Click on "Nutrition Facts" in the navbar
  console.log('Clicking "Nutrition Facts" in Navbar...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('header a')).find(a => a.textContent.includes('Nutrition Facts'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({ path: path.join(outputDir, '02_landing_navbar_to_nutrition.png') });
  console.log('Captured: 02_landing_navbar_to_nutrition.png');

  await browser.close();
  console.log('\nAll tests completed successfully!');
}

testNutritionUp().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
