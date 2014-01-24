template-html-loader
====================

Parse templates to html loader for webpack.

````js
loaders: [
  { test: /\.jade/, loader: "template-html-loader?engine=jade" },
  { test: /\.ejs/, loader: "template-html-loader?engine=ejs" }
]
````