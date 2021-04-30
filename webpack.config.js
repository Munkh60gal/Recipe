const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'docs'),
  },

  devtool: 'inline-source-map',
  
  devServer: {
    contentBase: './docs', // dist folderoos ajillana 
  },

  plugins: [
    new HtmlWebpackPlugin({  
      filename: 'index.html',
      template: 'src/index.html'  // src dotor bga index,html iig zagvar bolgon ashiglan dist ru html file hiine mun js iig holboj ugnu
    })
  ],

  module: {
    rules: [
      {
        test: /\.m?js$/, // buh js file dr ajillana
        exclude: /node_modules/, // zarim gazruudig algasah(node_modules)
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  }

};