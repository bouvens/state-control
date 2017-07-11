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
  }
}
