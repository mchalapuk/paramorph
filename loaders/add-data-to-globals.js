const utils = require('loader-utils');

module.exports = function addDataToGlobalsLoader(source) {
  this.cacheable && this.cacheable();
  const opts = utils.getOptions(this);

	if (typeof opts.data != 'string') {
		throw new Error('addDataToGlobalsLoader expects data option'
      + 'of type string; got ' + typeof opts.data);
	}

  const data = this.exec('module.exports = require(\'paramorph/data/'+ opts.data +'\');', this.resource);

  return 'const data = require(\'paramorph/data/'+ opts.data +'\');\n'
    + data.map(entry => 'const '+ entry.name +' = data.'+ entry.name +';\n').join('')
    + sources;
};

