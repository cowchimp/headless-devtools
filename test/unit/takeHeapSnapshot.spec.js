const prettyBytes = require('pretty-bytes');
const {launch} = require('puppeteer');
const {mockClient} = require('./mocks/client');
const {takeHeapSnapshot} = require('../../src/index');

jest.mock('puppeteer');

test('returns a JS heap snapshot with total size', async function () {
  const client = mockClient();
  const page = {_client: client, goto: () => Promise.resolve()};
  const browser = {newPage: () => Promise.resolve(page), close: () => Promise.resolve()};
  launch.mockImplementationOnce(() => browser);

  const heapSnapshot = await takeHeapSnapshot('https://google.com');
  const result = prettyBytes(heapSnapshot.totalSize);

  expect(result).toBe('2.68 MB');
});

test('returns the raw snapshot data', async function() {
  const client = mockClient();
  const page = {_client: client, goto: () => Promise.resolve()};
  const browser = {newPage: () => Promise.resolve(page), close: () => Promise.resolve()};
  launch.mockImplementationOnce(() => browser);

  const heapSnapshot = await takeHeapSnapshot('https://google.com');
  const result = heapSnapshot.rawSnapshotData;

  expect(result).toMatchSnapshot();
});

