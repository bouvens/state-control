/* eslint-disable import/no-extraneous-dependencies */
const karmaJasmine = require('karma-jasmine')

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
  },
  webpack: {
    html: {
      template: 'src/index.html',
    },
    copy: [
      {
        from: 'demo/public',
      },
    ],
    rules: {
      babel: {
        test: /\.jsx?/,
      },
    },
    extra: {
      resolve: {
        extensions: ['.js', '.jsx', '.json'],
      },
    },
    publicPath: '',
  },
  karma: {
    // browsers: ['Chrome'],
    frameworks: ['jasmine'],
    plugins: [
      karmaJasmine,
    ],
    reporters: ['progress'],
    testContext: 'setupTests.js',
  },
}
