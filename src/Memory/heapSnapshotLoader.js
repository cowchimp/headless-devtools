const {
  HeapSnapshotWorkerDispatcher,
  HeapSnapshotLoader,
} = require('./HeapSnapshotWorker');

const dispatcher = new HeapSnapshotWorkerDispatcher({}, () => {});

const loader = new HeapSnapshotLoader(dispatcher);

module.exports = loader;
