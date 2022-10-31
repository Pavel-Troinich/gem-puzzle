const path = require('path')

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/js/index.js'),
  },
  module: {
    rules: [
      {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'production',
}