import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();

await page.goto('https://www.jecjabalpur.ac.in');
await page.waitForSelector('.ImpText1')

const example = await page.evaluate(() => {
  const elements = document.getElementsByClassName('tab-content');
  const result = [];

  result.push(elements[i]);

  return result;
});

console.log(example)