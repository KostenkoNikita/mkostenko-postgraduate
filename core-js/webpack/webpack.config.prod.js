const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
   context: __dirname,
   mode: 'production',
   entry: '../src/index.ts',
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         },
         {
            test: /\.js$/,
            loader: "source-map-loader",
            exclude: /node_modules/,
         },
      ]
   },
   resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
      fallback: {
         fs: false,
      },
   },
   output: {
      filename: 'index.js',
      path: path.resolve(__dirname, "..", "bin"),
   },
   plugins: [
      new NodePolyfillPlugin(),
   ],
   externals: {
      "jquery": "jQuery"
   },
};
