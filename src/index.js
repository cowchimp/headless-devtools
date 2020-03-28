const self = global;

self.Common = { UIString: x => x, serializeUIString: x => x, console };

self.TextUtils = { TextUtils: {} };
require('chrome-devtools-frontend/front_end/text_utils/TextUtils');

exports.getPerformanceModel = require('./Performance/getPerformanceModel').getPerformanceModel;
exports.getHeapSnapshot = require('./Memory/getHeapSnapshot').getHeapSnapshot;
