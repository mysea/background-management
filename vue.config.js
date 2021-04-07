module.exports = {
  lintOnSave: false,
  publicPath: './',
  assetsDir: 'assets', // 放置静态资源(js、css、fonts、img)的文件夹
  productionSourceMap: false, // 不输出map文件
  devServer: {
    proxy: {
      '/api': {
        target: 'https://10.252.254.182:9981',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
