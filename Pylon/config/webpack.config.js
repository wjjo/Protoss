const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, '../src/www.ts'),
  mode: 'development',
  target: "node", // node js environment
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'pylon.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }  
};