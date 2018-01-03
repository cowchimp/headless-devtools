/* This test relies on https://unused-css-example-site-qijunirqpu.now.sh being available! */

const puppeteer = require('puppeteer');
const { calcUnusedCss } = require('../../src');

jest.setTimeout(6000);

test('calculates the percentage of unused CSS after interaction with the page successfully', async function () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const interactionCallback = async function(page) {
    const url = 'https://unused-css-example-site-qijunirqpu.now.sh';
    await page.goto(url);
    await page.click('.tab.type2');
    await page.click('.tab.type3');
    await page.click('.tab.type4');
  };

  const result = await calcUnusedCss({
    page,
    interactionCallback
  });

  expect(result).toBe(15);

  await browser.close();
});