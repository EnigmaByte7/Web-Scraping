const puppeteer = require('puppeteer')

async function Extract() {
      const browser = await puppeteer.launch({headless:true});
      const page = await browser.newPage();

      await page.goto('https://www.jecjabalpur.ac.in');
      await page.waitForSelector('.ImpText1')
      await page.waitForSelector('.ImpText2')

      const example = await page.evaluate(() => {
          const elements = document.getElementsByClassName('ImpText1');
          const elements1 = document.getElementsByClassName('ImpText2');
          let result = [];
          Array.from(elements).forEach((ele) => {
            let obj = {};
            obj.notice = ele.innerText.replace("Click Here to View","");
            obj.link = ele.children[0].href;
            result.push(obj);
          })
          Array.from(elements1).forEach((ele) => {            
            let obj = {};
            obj.notice = ele.innerText.replace("Click Here to View","");
            obj.link = ele.children[0].href;
            result.push(obj);
          })
          console.log(result);
          return result;
      });
      browser.close();
      return example;
}

module.exports = {Extract};