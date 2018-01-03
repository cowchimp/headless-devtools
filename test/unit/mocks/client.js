const {chunks} = require('./chunks-provider');

exports.mockClient = function() {
  let listener;
  return {
    send: async (foo) => {
      if(foo != 'HeapProfiler.takeHeapSnapshot') {
        return;
      }
      return await chunks.reduce((promise, chunk) => promise.then(() => listener({chunk})), Promise.resolve());
    }, on: (e, cb) => {
      listener = cb;
    }
  };
};