const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isProduction = process.env.NODE_ENV === 'production'
const isDemo = process.env.NODE_ENV === 'demo'

module.exports = {
  entry: path.resolve(isProduction ? 'src/index.js' : 'demo/src/index.js'),
  output: isProduction ? {
    path: path.resolve('lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  } : {
    path: path.resolve('demo/dist'),
    publicPath: '',
    filename: '[name].bundle.js',
    globalObject: 'this',
  },
  devtool: 'source-map',
  externals: { react: 'commonjs react' },
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
            isDemo ? MiniCssExtractPlugin.loader : 'style-loader',
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
  plugins: isProduction ? [new CleanWebpackPlugin()] : [
    new HtmlWebpackPlugin({
      template: path.resolve('demo/src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
