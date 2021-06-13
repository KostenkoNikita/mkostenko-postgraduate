const webpack = require("webpack");
const TypescriptDeclarationPlugin = require('typescript-declaration-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const { reactBuildPath } = require("./common");

module.exports = {
   entry: "./react-app/index.tsx",
   resolve: {
      extensions: [".ts", ".tsx", ".js"],
   },
   devtool: false,
   devServer: {
      contentBase: reactBuildPath,
      compress: true,
      port: 3000,
      hot: true,
      https: false,
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
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./react-app/index.html"
      }),
      new TypescriptDeclarationPlugin({
         out: 'index.d.ts'
      }),
      new webpack.SourceMapDevToolPlugin({
         filename: "[file].map",
      }),
   ],
   output: {
      path: reactBuildPath,
      filename: "index.js"
   }
}
