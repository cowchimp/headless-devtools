const HeapSnapshotModel = require('./HeapSnapshotModel');

const self = global;

self.HeapSnapshotWorker = {};
self.HeapSnapshotModel = HeapSnapshotModel;
self.Common = { UIString: x => x, serializeUIString: x => x };
self.ls = () => {};

self.TextUtils = { TextUtils: {} };
require('chrome-devtools-frontend/front_end/text_utils/TextUtils');

const runtime = { queryParam: () => false };
self.Runtime = runtime;
self.self = {
  Runtime: runtime,
  addEventListener: () => {},
};

require('chrome-devtools-frontend/front_end/heap_snapshot_worker/AllocationProfile');
require('chrome-devtools-frontend/front_end/heap_snapshot_worker/HeapSnapshot');
require('chrome-devtools-frontend/front_end/heap_snapshot_worker/HeapSnapshotLoader');
require('chrome-devtools-frontend/front_end/heap_snapshot_worker/HeapSnapshotWorkerDispatcher');
require('chrome-devtools-frontend/front_end/heap_snapshot_worker/HeapSnapshotWorker');

module.exports = self.HeapSnapshotWorker;
