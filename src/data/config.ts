import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';

const config = safeLoad(readFileSync('./_config.yml', 'utf8'));
const code = `module.exports = ${JSON.stringify(config)};\n`;

module.exports = function() {
  return { code };
};

