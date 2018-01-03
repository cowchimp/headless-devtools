const {HeapSnapshotWorkerDispatcher, HeapSnapshotLoader} = require('../../lib/HeapSnapshotWorker');

const dispatcher = new HeapSnapshotWorkerDispatcher({}, () => {});

const loader = new HeapSnapshotLoader(dispatcher);

module.exports = loader;