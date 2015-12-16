var cons = require('consolidate');
var utils = require('loader-utils');
var extname = require('path').extname;


module.exports = function(content) {
  this.cacheable && this.cacheable();

  var callback = this.async();
  var opt = utils.parseQuery(this.query);

  function exportContent(content) {
    if (opt.raw) {
      callback(null, content);
    } else {
      content = "module.exports = " + JSON.stringify(content)
      content = content.replace(
        /__WEBPACK_TEMPLATE_HTML_LOADER__\(([^\)]+)\)/g,
        '" + require("$1") + "'
      )
      callback(null, content);
    }
  }

  // with no engine given, use the file extension as engine
  if(!opt.engine) {
    opt.engine = extname(this.request).substr(1).toLowerCase();
  }

  if(!cons[opt.engine]) {
    throw new Error("Engine '"+ opt.engine +"' isn't available in Consolidate.js");
  }

  // for relative includes
  opt.filename = this.resourcePath;
  opt.require = function(path) {
    this.addDependency(path)
    // Adding the default !file! loader for requires without a loader specified.
    // This will create links to assets (images, etc.) without a module.exports=
    // prefix at the top of the asset file.
    if (path.match(/^\-?\!/) === null) path = "!file!" + path
    // Substituting a placeholder string for the require. This will be replaced
    // with an actual call to the require function in the generated javascript
    return "__WEBPACK_TEMPLATE_HTML_LOADER__("+path+")"
  }.bind(this)

  cons[opt.engine].render(content, opt, function(err, html) {
    if(err) {
      throw err;
    }
    exportContent(html);
  });
};
