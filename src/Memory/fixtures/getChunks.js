const { readdir, readJson } = require('fs-extra');
const { parse, join } = require('path');

const root = join(__dirname, 'chunks');

exports.getChunks = async function() {
  const files = await readdir(root);
  files.sort((a, b) => normalizeFilename(a) - normalizeFilename(b));

  const chunks = await Promise.all(
    files.map(async file => {
      const obj = await readJson(join(root, file));
      return obj.params.chunk;
    }),
  );

  return chunks;
};

function normalizeFilename(filename) {
  return Number(parse(filename).name);
}
