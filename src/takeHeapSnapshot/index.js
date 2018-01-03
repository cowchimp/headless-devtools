const heapSnapshotLoader = require('./heapSnapshotLoader');
const validateArgs = require('../validateArgs');

module.exports = validateArgs(takeHeapSnapshot);

async function takeHeapSnapshot({page, interactionCallback}) {
  const client = page._client;
  await client.send('Page.enable');
  await client.send('HeapProfiler.enable');

  await interactionCallback(page);

  const chunks = [];
  client.on('HeapProfiler.addHeapSnapshotChunk', ({chunk}) => {
    heapSnapshotLoader.write(chunk);
    chunks.push(chunk);
  });

  await client.send('HeapProfiler.takeHeapSnapshot', {reportProgress: false});
  heapSnapshotLoader.close();

  const jsHeapSnapshot = heapSnapshotLoader.buildSnapshot();

  jsHeapSnapshot.rawSnapshotData = chunks.join('');

  return jsHeapSnapshot;
}

