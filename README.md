![node](https://img.shields.io/node/v/headless-devtools.svg)
[![npm](https://img.shields.io/npm/v/headless-devtools.svg)](https://www.npmjs.com/package/headless-devtools)

# headless-devtools

Lets you use Chrome DevTools from code.

```bash
npm install headless-devtools
```

## Motivation

Chrome DevTools is an indispensable tool for analyzing your Web application.  
`headless-devtools` lets you automate the process of using DevTools.  
This is useful for gathering data over time, writing tests, etc.  

## Usage

`headless-devtools` is designed to be used together with [Puppeteer](https://github.com/puppeteer/puppeteer).  
See examples below 

## API

- [getPerformanceModel](#getperformancemodel) - Extracts the data model used the render a trace file in the DevTools Performance Tab
- [getHeapSnapshot](#getheapsnapshot) - Extracts the data model used to render a Heap Snapshot in the Memory tab
- Suggest more features by opening up an issue!

### getPerformanceModel

Extracts the data model used the render a trace file in the DevTools Performance Tab.  
It's useful for calculating your animation's frame-rate programmatically.

```javascript
const performanceModel = await getPerformanceModel(trace);

const frames = performanceModel.frames();
console.log(`FPS: ${1000 / average(frames.map(x => x.duration))}`);
console.log(`Slowest frame: ${max(frames.map(x => x.duration))} ms`);

// FPS: 43.01310441575974
// Slowest frame: 360.7630000114441 ms
```

**[See complete example](src/Performance/example.js)**

### getHeapSnapshot

Extracts the data model used to render a Heap Snapshot in the Memory tab.  
It's useful for avoiding memory leaks.

```javascript
const heapSnapshot = await getHeapSnapshot(chunks);

console.log(filesize(heapSnapshot.totalSize));

// 1.59 MB
``` 

**[See complete example](src/Memory/example.js)**

## High Level Design

As the Readme for the DevTools codebase states:

> DevTools frontend is also available on NPM as the `chrome-devtools-frontend` package. It's not currently available via CJS or ES2015 modules, so consuming this package in other tools may require some effort.

`headless-devtools` does a bunch of monkey patching in order to make the [DevTools frontend code](https://github.com/ChromeDevTools/devtools-frontend) run smoothly in Node.js.

## Changelog

#### 2.0.0

* Remove `calcUnusedCss`. CSS & JS Coverage info is now available in Puppeteer ([more info](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#class-coverage)).
* Remove Puppeteer as a dependency.

## Running tests

Run tests with `npm test`

## Related projects

* Paul Irish's [automated-chrome-profiling](https://github.com/paulirish/automated-chrome-profiling) and [devtools-timeline-model](https://github.com/paulirish/devtools-timeline-model)
* Lighthouse [tracehouse](https://github.com/GoogleChrome/lighthouse/tree/master/lighthouse-core/test/lib/tracehouse)

## License

MIT
