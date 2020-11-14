const path = require('path');

module.exports = {
   context: __dirname,
   mode: 'production',
   entry: '../src/index.ts',
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            options: {
               configFileName: 'tsconfig.prod.json'
            },
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
   },
   output: {
      filename: 'index.js',
      path: path.resolve(__dirname, "..", "bin"),
   },
};
