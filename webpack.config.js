const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: isProduction ? {
    index: path.resolve('src/index.js'),
    Check: path.resolve('src/Check/index.js'),
    Connector: path.resolve('src/Connector/index.js'),
    Input: path.resolve('src/Input/index.js'),
    Radio: path.resolve('src/Radio/index.js'),
    SettersBlock: path.resolve('src/SettersBlock/index.js'),
  } : path.resolve('demo/src/index.js'),
  output: isProduction ? {
    path: path.resolve('lib'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  } : {
    path: path.resolve('demo/dist'),
    publicPath: '',
    filename: '[name].bundle.js',
  },
  ...isProduction && { externals: { react: 'commonjs react' } },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      ...isProduction ? [] : [
        {
          test: /\.css$/,
          use: [
            isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  localIdentName: '[name]__[local]__[hash:base64:5]',
                },
              },
            },
          ],
        },
      ],
    ],
  },
  plugins: [
    ...isDevelopment ? [] : [new CleanWebpackPlugin()],
    ...isProduction ? [] : [
      new HtmlWebpackPlugin({
        template: 'demo/src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
