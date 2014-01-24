template-html-loader
====================

Parse templates to html loader for webpack. It parses any template language supported
by [consolidate.js](https://github.com/visionmedia/consolidate.js), and returns the html.

You will still need to install the template engine. The script will try to detect
the template engine by the file extension. You can overwrite this by setting the engine parameter.

````js
loaders: [
  { test: /\.jade/, loader: "template-html-loader" },
  { test: /\.ejs/, loader: "template-html-loader" }
  { test: /\.mustache/, loader: "template-html-loader?engine=hogan" }
]
````

Available on NPM, `template-html-loader`.
