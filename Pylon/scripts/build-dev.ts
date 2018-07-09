const webpack = require('webpack');
const config = require('../config/webpack.config');

const compiler = webpack(config);

const watching = compiler.watch({
  aggregateTimeout: 500,
  poll: 1200,
  ignored: /node_modules/
}, (err, stats) => {
  if(err) return console.error(err);

  console.log("Server is updated.");
});

compiler.run((err, stats) => {
  if(err) return console.error(err);
  console.log("Development build complete.");
});