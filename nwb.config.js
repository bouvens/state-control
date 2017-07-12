module.exports = {
    type: 'react-component',
    npm: {
        esModules: true,
        umd: {
            global: 'ReactStateControl',
            externals: {
                react: 'React'
            }
        }
    },
    webpack: {
        rules: {
            babel: {
                test: /\.jsx?/
            },
            css: {
                modules: true,
                localIdentName: '[name]__[local]__[hash:base64:5]'
            }
        },
        extra: {
            resolve: {
                extensions: ['.js', '.jsx', '.json']
            },
            node: {
                process: false
            }
        },
        publicPath: ''
    }
}
