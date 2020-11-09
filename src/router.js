import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home = ()=>import('@/routes/home/Home.vue')
const Cate = ()=>import('@/routes/cate/Cate.vue')
const Cart = ()=>import('@/routes/cart/Cart.vue')
const User = ()=>import('@/routes/user/User.vue')
const Login = ()=>import('@/routes/user/Login.vue')
const Regist = ()=>import('@/routes/user/Regist.vue')
const GoodDetail = ()=>import('@/routes/home/GoodDetail.vue')

const router = new VueRouter({
  mode: 'hash',
  routes: [
    // 这三个页面，使用App中名字叫alive的视图容器来显示
    { path: '/', components: { alive: Home }},
    { path: '/cate', components: { alive: Cate }},
    { path: '/user', components: { alive: User }},
    // 以下页面，都使用App中名字叫default的视图容器来显示
    { path: '/cart', component: Cart },
    { path: '/login', component: Login },
    { path: '/regist', component: Regist },
    { path: '/detail/:id', component: GoodDetail },
    { path: '/*', redirect: '/' }
  ]
})

// 全局的路由守卫
// 把原来没有条件限制的路由跳转，添加上限制条件
router.beforeEach((to, from, next)=>{
  // 仅对购物车页面进行拦截
  if(to.path === '/cart') {
    // 用token表示用户是否已经登录
    let token = localStorage.getItem('token')
    if(token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
