const heapSnapshotLoader = require('./heapSnapshotLoader');

exports.getHeapSnapshot = async function(chunks) {
  chunks.forEach(x => heapSnapshotLoader.write(x));

  heapSnapshotLoader.close();

  await nextTick();

  const jsHeapSnapshot = heapSnapshotLoader.buildSnapshot();
  return jsHeapSnapshot;
};

function nextTick() {
  return new Promise(resolve => process.nextTick(resolve));
}
