const path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src/components');

module.exports = {
  context: path.join(__dirname, '/client/src'),
  entry: './index.jsx',
  module: {
    rules : [
      {
        test: /\.css$/,
        loader: 'style-loader'
      }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]__[hash:base64:5]'
        }
      },

      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      },
      {
        test : /\.js|.jsx$/,
        exclude: /node_modules/,
        include : SRC_DIR,
        loader: 'babel-loader',

        query: {
          presets: ['react', 'es2015']
        }
      }
    ],
  },
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'app.js',
  }
};
