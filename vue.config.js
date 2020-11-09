
// 开发环境：公司内部搭建开发环境
// 测试环境：公司内部搭建测试环境
// 生产环境：阿里云、腾讯云、百度云、华为云、亚马逊云

// 当前端项目打包(npm run build)前，至少要考虑这两个问题：
// 1、api的baseUrl：上线时，要把本地地址baseUrl改成线上的后端访问地址
// 2、图片url：上线时，要考虑项目中所使用到图片的线上地址

module.exports = {

  // 本地服务的配置
  devServer: {
    port: 8001,
    open: true,  // 自动打开浏览器
    // 代理，是我们在脚手架环境解决跨都是这种方式
    // 这个代理，只对开发环境有用，对测试和生产环境是没有用的
    // 那么上测试或生产环境时，如果跨域了怎么办？后端使用使用Nginx等服务器做代理配置
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        ws: true,
        changeOrigin: true
      }
    }
  }
  // publicPath: './qf/webapp',
  // 用于多页面应用程序的配置
  // pages: {
    // index: {
    //   // page 的入口
    //   entry: 'src/main.js',
    //   // 模板来源
    //   template: 'public/index.html',
    //   // 在 dist/index.html 的输出
    //   filename: 'index.html',
    //   // 当使用 title 选项时，
    //   // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //   title: '2006',
    //   // 在这个页面中包含的块，默认情况下会包含
    //   // 提取出来的通用 chunk 和 vendor chunk。
    //   chunks: ['chunk-vendors', 'chunk-common', 'index']
    // },
  //   home: {
  //     entry: 'src/home.js',
  //     template: 'public/index.html',
  //     filename: 'home.html',
  //     title: 'home',
  //     chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   },
  //   cate: {
  //     entry: 'src/cate.js',
  //     template: 'public/index.html',
  //     filename: 'cate.html',
  //     title: 'home',
  //     chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   }
  // }
}
