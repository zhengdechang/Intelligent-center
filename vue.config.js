const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CDN = require('./cdn.config')
const ENV = process.env.NODE_ENV

module.exports = {
  publicPath: './',
  devServer: {
    port: 9000,
    open: true,
    hotOnly: true,
    proxy: {
      '/api': {
        target: 'http://cloudia-api.aliyun01.iplusbot.com',
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  lintOnSave: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugin('html').tap(args => {
      args[0].cdn = CDN[ENV]
      return args
    })
  },
  configureWebpack: config => {
    if (ENV === 'production') {
      return {
        externals: CDN[ENV].externals,
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|.\css/,
            threshold: 10240,
            deleteOriginalAssets: false
          }),
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
              }
            },
            sourceMap: false,
            parallel: true
          })
        ]
      }
    }

    return {
      externals: CDN[ENV].externals
    }
  }
}
