global.Blob = Buffer;
require('./shell');

global.Multimap = require('./Multimap').Multimap;

require('chrome-devtools-frontend/front_end/common/Object.js');
require('chrome-devtools-frontend/front_end/common/SegmentedRange.js');

const bindings = {};
global.Bindings = bindings;
require('chrome-devtools-frontend/front_end/bindings/TempFile.js');

const sdk = {};
global.SDK = sdk;
require('chrome-devtools-frontend/front_end/sdk/TracingModel.js');
require('chrome-devtools-frontend/front_end/sdk/TargetManager.js');

const timelineModel = {};
global.TimelineModel = timelineModel;
require('chrome-devtools-frontend/front_end/timeline_model/TimelineModel.js');
require('chrome-devtools-frontend/front_end/timeline_model/TimelineFrameModel.js');
require('chrome-devtools-frontend/front_end/timeline_model/TimelineIRModel.js');

global.UI = { TreeElement: class {} };

const timeline = {};
global.Timeline = timeline;
require('chrome-devtools-frontend/front_end/timeline/TimelineLoader.js');
require('chrome-devtools-frontend/front_end/timeline/PerformanceModel.js');
require('chrome-devtools-frontend/front_end/timeline/TimelineUIUtils.js'); //?

function getTracingModel(trace) {
  return new Promise(resolve => {
    timeline.TimelineLoader.loadFromEvents(trace.traceEvents, {
      loadingStarted: () => {},
      loadingProgress: () => {},
      processingStarted: () => {},
      loadingComplete: resolve,
    });
  });
}

exports.getPerformanceModel = async function(trace) {
  const tracingModel = await getTracingModel(trace);
  // eslint-disable-next-line no-undef
  const performanceModel = new Timeline.PerformanceModel();
  performanceModel.setTracingModel(tracingModel);

  return performanceModel;
};
