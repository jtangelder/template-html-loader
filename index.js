var cons = require('consolidate');
var utils = require('loader-utils');
var path = require('path');


module.exports = function(content) {
  this.cacheable && this.cacheable();

  var callback = this.async();
  var opt = utils.parseQuery(this.query);

  function exportContent(content) {
    if (opt.raw) {
      callback(null, content);
    } else {
      callback(null, "module.exports = " + JSON.stringify(content));
    }
  }

  // with no engine given, use the file extension as engine
  if(!opt.engine) {
    opt.engine = path.extname(this.request).substr(1).toLowerCase();
  }

  if(!cons[opt.engine]) {
    throw new Error("Engine '"+ opt.engine +"' isn't available in Consolidate.js");
  }

  // for relative includes
  opt.filename = this.resourcePath;
  opt.dirname = path.dirname(this.resourcePath);

  cons[opt.engine].render(content, opt, function(err, html) {
    if(err) {
      throw err;
    }
    exportContent(html);
  });
};
