const puppeteer = require('puppeteer');

module.exports = function validateArgs(executeCallback) {
  return async function(args) {
    if(args && !args.url && args.page && args.page._client && typeof args.interactionCallback == 'function') {
      return await executeCallback(args);
    }
    if(typeof args == 'string' && args.length) {
      return await goToUrlAndExecute(args);
    }
    if(typeof args.url == 'string' && args.url.length) {
      return await goToUrlAndExecute(args.url, args);
    }

    throw new Error('Passed arguments are not valid');
  };

  async function goToUrlAndExecute(url, args = {}) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const interactionCallback = page => page.goto(url);

    let newArgs = Object.assign(args, { page, interactionCallback });
    const result = await executeCallback(newArgs);

    await browser.close();

    return result;
  }
};