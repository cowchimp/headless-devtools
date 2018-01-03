const fs = require('fs');
const path = require('path');

const root = 'test/unit/mocks/chunks';
const files = fs.readdirSync(root, 'utf8');

files.sort((a, b) => normalizeFilename(a) - normalizeFilename(b));

exports.chunks = files
  .map(p => fs.readFileSync(path.join(root, p), 'utf8'))
  .map(x => JSON.parse(x).params.chunk);

function normalizeFilename(filename) {
  return Number(path.parse(filename).name)
}