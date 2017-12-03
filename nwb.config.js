module.exports = {
    type: 'react-component',
    npm: {
        esModules: true,
    },
    webpack: {
        html: {
            template: 'src/index.html',
        },
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
            require('karma-jasmine'),
        ],
        reportersList: ['progress', 'jasmine-diff'],
        // testContext: 'setupTests.js',
    },
}
