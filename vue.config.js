
'use strict'
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require('webpack');
module.exports = {
  // 部署应用包时配置的
  publicPath: './',
  // 打包后的目录
  outputDir: 'dist',
  // 放置生成的静态资源
  assetsDir: '',
  // 指定生成的 index.html 的输出路径
  // indexPath:'/',
  // css
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/views/pc/theme/theme.scss";
          @import "@/views/mobile/style/_theme.scss";
        `
      }
    }
  },
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8081,
    https: false,
    hotOnly: false,
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
     return {
       plugins: [
         new CompressionPlugin({
           test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
           threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
           deleteOriginalAssets: false // 是否删除原文件
         })
       ]
     }
   }
 }
}
