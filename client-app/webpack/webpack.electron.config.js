const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

const { electronBuildPath } = require("./common");

module.exports = [
   {
      resolve: {
         extensions: ['.tsx', '.ts'],
      },
      devtool: 'source-map',
      entry: path.resolve(__dirname, '../electron/main/index.ts'),
      target: 'electron-main',
      module: {
         rules: [
            {
               test: /\.tsx?$/,
               use: 'ts-loader',
               exclude: /node_modules/,
            },
            {
               test: /\.node$/,
               loader: "native-ext-loader"
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
      entry: path.resolve(__dirname, '../electron/preload/index.ts'),
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
