const cons = require('consolidate'),
      utils = require('loader-utils'),
      path = require('path'),
      fs = require('fs');


module.exports = function(content) {
  this.cacheable && this.cacheable();

  const callback = this.async();
  var opt = utils.getOptions(this);

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

  const self = this;
  if(opt.files instanceof Array) {
    opt.files.reverse().forEach(function(file) {
      var file = path.join(opt.dirname, file + '.json');
      if(!fs.existsSync(file)) {
        throw new Error("Data file '"+ file +"' does not exist");
      }
      opt = Object.assign(JSON.parse(fs.readFileSync(file)), opt);    // ensure that opt takes precedence
      self.addDependency(file);
    })
    delete opt.files;
  }

  cons[opt.engine].render(content, opt, function(err, html) {
    if(err) {
      throw err;
    }
    exportContent(html);
  });
};
