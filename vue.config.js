module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.21:9091/cvoperation_cmcc/',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
}