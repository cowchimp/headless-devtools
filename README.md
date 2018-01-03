![node](https://img.shields.io/node/v/headless-devtools.svg)
[![npm](https://img.shields.io/npm/v/headless-devtools.svg)](https://www.npmjs.com/package/headless-devtools)

# headless-devtools

Lets you perform Chrome DevTools actions from code by leveraging [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)+[Puppeteer](https://github.com/GoogleChrome/puppeteer).

## Motivation

Chrome DevTools is great for getting valuable information about your app 🕵️‍♂️.  
Using `headless-devtools` you can automate this process 🤖.  
One use-case is to collect this data over time 📈, which can help you keep your app in good health 👩‍⚕️.

Some tools that provide similar metrics work by executing right after the page loads. This can lead to a skewed perception because these metrics don't mean much unless the user has interacted with the page (some CSS rules weren't applied, JS wasn't executed, etc.).  
To fix this, `headless-devtools` lets you mimic the user interacting with the page before\during when data is collected.

If you'd like to learn more about why this kind of tool is useful and how it works, check out [this](http://blog.cowchimp.com/monitoring-unused-css-by-unleashing-the-devtools-protocol/) blogpost.

## Features

- [calcUnusedCss](#calcunusedcss) - Calculates the percentage of unused CSS of a webpage after user interaction
- [takeHeapSnapshot](#takeheapsnapshot) - Takes a snapshot of a webpage's JS heap
- Suggest more features by opening up an issue! 🎉

### calcUnusedCss

Calculates the percentage of unused CSS of a webpage.

![Coverage tab](/screenshots/calcUnusedCss.png)

Notice in the example how you can use [Puppeteer](https://github.com/GoogleChrome/puppeteer) to mimic user interaction and trigger CSS rules.

```javascript
const puppeteer = require('puppeteer');
const { calcUnusedCss } = require('headless-devtools');

(async function() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const interactionCallback = async function(page) {
    const url = 'https://unused-css-example-site-qijunirqpu.now.sh';
    await page.goto(url);
    await page.click('.tab.type2');
    await page.click('.tab.type3');
    await page.click('.tab.type4');
  };
  const unusedCSS = await calcUnusedCss({ page, interactionCallback });

  console.log(`${unusedCSS}% of your CSS is unused`); // 15% of your CSS is unused

  await browser.close();
})();
```

If you don't care about mimicking user interaction, use this simplified notation:

```javascript
const { calcUnusedCss } = require('headless-devtools');

(async function() {
  const unusedCSS = await calcUnusedCss('https://unused-css-example-site-qijunirqpu.now.sh');

  console.log(`${unusedCSS}% of your CSS is unused`); // 55% of your CSS is unused
})();
```

DevTools Protocol API: [CSS.startRuleUsageTracking](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-startRuleUsageTracking)

### takeHeapSnapshot

Takes a snapshot of a webpage's JS heap.  
The raw snapshot data is available for further analysis. Just save `rawSnapshotData` to file, open up regular DevTools in your browser and right-click on the left hand side of the Memory panel, and choose "Load...".

![Heap snapshot](/screenshots/takeHeapSnapshot.png)

```javascript
const { takeHeapSnapshot } = require('headless-devtools');
const prettyBytes = require('pretty-bytes');
const fs = require('fs');

const heapSnapshot = await takeHeapSnapshot('https://google.com');

console.log(prettyBytes(heapSnapshot.totalSize)); // 8.96 MB

fs.writeFileSync('homepage.heapsnapshot', rawSnapshotData.rawSnapshotData, 'utf8');
```

DevTools Protocol API: [HeapProfiler.takeHeapSnapshot](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#method-takeHeapSnapshot)

## Prerequisites

`headless-devtools` requires Node.js 7.6 or greater because it relies on async\await.

## Running tests

Run tests with `npm test`

## Prior art

* Paul Irish's [automated-chrome-profiling](https://github.com/paulirish/automated-chrome-profiling)

## License

MIT
