created by 2006 at 2020-9-14

# 环境

windows  64bit
node.js v10+
调试工具：谷歌浏览器+devTools

技术栈：vue + vue-router + vuex + sass + vant + axios


# 项目架构

1、项目配置

```
# vue.config.js
# 把端口号改成 8001
```
```
# package.json
# 项目运行：npm start
# 项目打包：npm run build
```

2、路由集成

cnpm install vue-router -S
创建 /src/router.js 并编写路由规则
在main.js挂载
使用 <router-view></router-view>

3、使用sass

cnpm install sass-loader -D
cnpm install node-sass -D
组件中的style标签，使用lang='scss'指定CSS语言类型

4、安装vant组件库

Vant官方文档：https://vant-contrib.gitee.io/vant/#/zh-CN/

cnpm install vant -S
cnpm install babel-plugin-import -D

Babel是运行在Node.js环境中的JS编译器。
它的作用是把ES6代码转化成浏览器兼容性更好的ES5代码。
```
# babel.config.js
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
# 配置完成后，重启项目即可
```
在组件中如何使用vant组件呢？
```
# 导入所需要的组件
import { Button } from 'vant'
# 把Vant组件变成局部组件
components: {
  [Button.name]: Button
}
# 在视图中使用vant组件
<van-button type='danger'>按钮</van-button>
```

# rem布局

dpr = 屏幕像素(px) / 物理尺寸
dpr = 2  二倍屏
dpr = 3  三倍屏

移动端布局：vw/vh，flexible，rem（最常用）

rem：相对html标签的根字体大小，倍数关系
em：相对于父级字体的大小，倍数关系
px：绝对单位

目标：10rem等于满屏
做法：把当前页面的根字体的大小等于当前屏幕宽度的1/10
  第一步获取html标签dom对象 oHTML
  第二步通过js获取当前屏幕的宽度 w（单位是px）
  第三步，oHTML.fontSize = w*0.1 + 'px'
原理：等比缩放

建议在vscode安装一个cssrem的插件，它的作用是自动帮我把px单位转化成rem单位。
它需要进行基准单位设置，设置成75（1rem=75px）

# 接口文档

baseURL = 'http://10.36.138.122:9999'

注册：/jd/regist
    入参: username, password, password2
    方法: POST

登录：/jd/login
    入参: username, password
    方法: POST

获取首页推荐商品：/jd/getHotGoodList
    方法：GET
    入参：
        hot: Boolean  非必填, 默认是 false, 传true时返回热销推荐的产品，如果不传或传false就返回所有商品
        page: Number  非必填，默认是 1, 用于实现分页功能
        size: Number  非必填，默认是 10

获取全部品类：/jd/getAllCates
    方法：GET
    入参：无

基于品类进行筛选：/jd/getCateGoodList
    方法：GET
    入参：
        cate: String  品类的英文字段

获取商品详情：/jd/getGoodDetail
    方法：GET
    入参：
        good_id: String  商品id

添加到购物车：/jd/addToCart
    方法：POST
    入参：
        num: Number      选填，购买数量
        good_id: String  商品id

获取购物车列表：/jd/getCartList
    方法：GET
    入参：无

更改购物车中的商品数量：/jd/updateCartNum
    方法：POST
    入参：
        num: Number     新的数量
        id: String      购物车id

删除购物车中的商品：/jd/deleteToCart
    方法：GET
    入参：
        id: String      购物车id

提交购物：/jd/submitToCart
    方法：POST
    入参：
        goods: String  购物车id字符串，多个商品id要用英式;进行连接。

添加商品：/jd/addGood
    方法：POST
    入参：
        img: String,   // 图片
        name: String,  // 商品名称
        desc: String,  // 商品描述
        price: Number, // 价格
        cate: String,  // 品类
        hot: Boolean,  // 是否推荐
