const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function recordWalkthrough() {
  const framesDir = path.join(__dirname, '..', 'walkthrough_frames');
  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
  }

  console.log('Launching browser for smooth walkthrough capture...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const totalHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
  console.log(`Total scroll range: ${totalHeight}px`);

  // We capture 32 evenly spaced frames down the entire page
  const frameCount = 32;
  for (let i = 0; i < frameCount; i++) {
    const scrollY = (i / (frameCount - 1)) * totalHeight;
    await page.evaluate((y) => {
      window.scrollTo({ top: y, behavior: 'instant' });
    }, scrollY);
    await new Promise(r => setTimeout(r, 120));

    const frameNum = String(i + 1).padStart(3, '0');
    await page.screenshot({ path: path.join(framesDir, `walk_${frameNum}.jpg`), quality: 85, type: 'jpeg' });
  }

  console.log('Finished capturing scroll frames.');
  await browser.close();
}

recordWalkthrough().catch(console.error);
