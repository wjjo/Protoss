const webpack = require('webpack');
const config = require('../config/webpack.config');

const compiler = webpack(config);


compiler.run((err, stats) => {
  if(err) return console.error(err);
  console.log("Production build complete.");
});