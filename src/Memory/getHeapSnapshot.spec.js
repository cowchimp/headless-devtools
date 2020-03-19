const { getHeapSnapshot } = require('./getHeapSnapshot');
const { getChunks } = require('./fixtures/getChunks');

test('returns a JS heap snapshot with total size', async function() {
  const chunks = await getChunks();

  const { totalSize } = await getHeapSnapshot(chunks);

  expect(totalSize).toBe(2676392);
});
