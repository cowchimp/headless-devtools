const { getPerformanceModel } = require('../index');
const trace = require('./fixtures/trace.json');

test('getPerformanceModel', async () => {
  const result = await getPerformanceModel(trace);

  const frames = result.frames();
  expect(frames).toMatchSnapshot();
});
