const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
   context: __dirname,
   mode: 'production',
   entry: '../src/index.ts',
   target: "node",
   node: {
      __dirname: false,
   },
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
         {
            test: /\.node$/,
            loader: "native-ext-loader"
         }
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
