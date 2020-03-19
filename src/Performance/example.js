const puppeteer = require('puppeteer');
const { getPerformanceModel } = require('./getPerformanceModel');

init();

async function init() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    'https://footguns.yonatan.dev/animation/js/?bmt=true&interval=300',
  );
  await page.tracing.start({ path: 'trace.json' });
  await page.waitFor(3000);
  const traceBuffer = await page.tracing.stop();
  const trace = JSON.parse(traceBuffer.toString());

  const performanceModel = await getPerformanceModel(trace);

  const frames = performanceModel.frames();
  console.log(`FPS: ${1000 / average(frames.map(x => x.duration))}`);
  console.log(`Slowest frame: ${Math.max(...frames.map(x => x.duration))} ms`);

  await browser.close();
}

function average(values) {
  return values.reduce((acc, item) => acc + item, 0) / values.length;
}
