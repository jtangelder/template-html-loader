template-html-loader
====================

Parse templates to html loader for webpack. It parses any template language supported by [consolidate.js](https://github.com/visionmedia/consolidate.js), and returns the html.

You will still need to install the template engine, like [Jade](https://github.com/visionmedia/jade) or [EJS](https://github.com/visionmedia/ejs), in the example below.

````js
loaders: [
  { test: /\.jade/, loader: "template-html-loader?engine=jade" },
  { test: /\.ejs/, loader: "template-html-loader?engine=ejs" }
]
````
