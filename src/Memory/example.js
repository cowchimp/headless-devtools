const puppeteer = require('puppeteer');
const filesize = require('filesize');
const fs = require('fs').promises;
const { getHeapSnapshot } = require('./getHeapSnapshot');

init();

async function init() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://yonatan.dev');

  const client = await page.target().createCDPSession();

  const chunks = [];
  client.on('HeapProfiler.addHeapSnapshotChunk', ({ chunk }) => {
    chunks.push(chunk);
  });

  await client.send('HeapProfiler.takeHeapSnapshot', { reportProgress: false });

  const heapSnapshot = await getHeapSnapshot(chunks);

  console.log(filesize(heapSnapshot.totalSize));

  await fs.writeFile('Heap.heapsnapshot', chunks.join(''));
  // you can load `Heap.heapsnapshot` in Chrome's Memory tab to review the snapshot manually

  await browser.close();
}
