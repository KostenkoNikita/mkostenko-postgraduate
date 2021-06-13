const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

const { electronBuildPath } = require("./common");

module.exports = [
   {
      resolve: {
         extensions: ['.tsx', '.ts'],
      },
      devtool: 'source-map',
      entry: path.resolve(__dirname, '../electron/main.ts'),
      target: 'electron-renderer',
      module: {
         rules: [
            {
               test: /\.tsx?$/,
               use: 'ts-loader',
               exclude: /node_modules/,
            }
         ]
      },
      optimization: {
         minimizer: [
            new TerserPlugin({
               parallel: true,
               terserOptions: {
               }
            }),
         ],
      },
      output: {
         path: electronBuildPath,
         filename: '[name].js',
      },
   },
   {
      entry: path.resolve(__dirname, '../electron/preload.ts'),
      target: 'electron-preload',
      output: {
         path: electronBuildPath,
         filename: 'preload.js'
      },
      module: {
         rules: [
            {
               test: /\.tsx?$/,
               use: 'ts-loader',
               exclude: /node_modules/,
            }
         ]
      },
      optimization: {
         minimizer: [
            new TerserPlugin({
               parallel: true,
               terserOptions: {
               }
            }),
         ],
      },
      resolve: {
         extensions: ['.tsx', '.ts'],
      },
      devtool: 'source-map',
   }
];
