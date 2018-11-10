import Vue from 'vue'
import VueRouter from 'vue-router'
// 如果是使用模块化来开发,必须写下面代码
// 整个项目中在路由中导入axios的好处,在这里可以使用,将他写入vue原型后,后面用到,直接写this.$axios即可
import axios from 'axios'
axios.defaults.baseURL = 'http://47.106.148.205:8899/'
// 做vue项目时遇到登录权限问题，登录以后再发送的请求头部并没有携带登录后设置的cookie，导致后台无法校验其是否登录
axios.defaults.withCredentials = true //让ajax携带cookie
Vue.prototype.$axios = axios

Vue.use(VueRouter)
// 设置路由规则
// // 导入商品列表组件
// import goodslist from '../components/goods/goodslist.vue'
// // 导入商品详情组件
// import goodsinfo from '../components/goods/goodsinfo.vue'
// // 导入购物车组件
// import shopcart from '../components/shopcart/shopcart.vue'
// // 登录页面
// import login from '../components/account/login.vue'
// // 下单页面
// import order from '../components/order/order.vue'
// // 支付页面
// import pay from '../components/pay/payorder.vue'
// // 支付成功页面
// import paySuccess from '../components/pay/paySuccess.vue'
// //会员中心页面
// import vipCenter from '../components/vip/vipCenter.vue'
// //交易订单页面
// import myOrders from '../components/vip/myOrders.vue'
// //查看订单列表页面
// import orderInfo from '../components/vip/orderInfo.vue'
// 使用Vue router懒加载来实现异步加载
const goodslist = () => import(/* webpackChunkName: "goodslist" */ '../components/goods/goodslist.vue')
const goodsinfo = () => import(/* webpackChunkName: "goodsinfo" */ '../components/goods/goodsinfo.vue')
const shopcart = () => import(/* webpackChunkName: "shopcart" */ '../components/shopcart/shopcart.vue')
const login = () => import(/* webpackChunkName: "login" */ '../components/account/login.vue')
const order = () => import(/* webpackChunkName: "order" */ '../components/order/order.vue')
const pay = () => import(/* webpackChunkName: "pay" */ '../components/pay/payorder.vue')
const paySuccess = () => import(/* webpackChunkName: "paySuccess" */ '../components/pay/paySuccess.vue')
const vipCenter = () => import(/* webpackChunkName: "vipCenter" */ '../components/vip/vipCenter.vue')
const myOrders = () => import(/* webpackChunkName: "myOrders" */ '../components/vip/myOrders.vue')
const orderInfo = () => import(/* webpackChunkName: "orderInfo" */ '../components/vip/orderInfo.vue')
const router = new VueRouter({
  routes: [
    // 重定向
    { path: '/', redirect: '/goodslist' },
    { path: '/goodslist', component: goodslist },
    { path: '/goodsinfo/:goodsId', component: goodsinfo },
    { path: '/shopcart', component: shopcart },
    { path: '/login', component: login },
    /**下面路由规则需要校验是否登录 */
    // 通过编程式导航跳转到下单页面(通过query传参)
    // meta: { checkLogin: true }路由元信息,用于标记是否需要登录
    { path: '/order', component: order, meta: { checkLogin: true } },
    { path: '/pay', component: pay, meta: { checkLogin: true } },
    { path: '/paySuccess', component: paySuccess, meta: { checkLogin: true } },
    { path: '/vipCenter', component: vipCenter, meta: { checkLogin: true } },
    { path: '/myOrders', component: myOrders, meta: { checkLogin: true } },
    { path: '/orderInfo', component: orderInfo, meta: { checkLogin: true } }
  ]
})
// 导航守卫
// 这个方法可以拦截所以的路由跳转,如果不调用next就不跳转
// from:从哪里   to:去哪里
router.beforeEach((to, from, next) => {
  //   console.log(to)
  // 记录想要跳转的页面,存入本地,用于登录成功后跳转到这个页面
  if (to.path != '/login') {
    //排除/login,否则会成死循环
    localStorage.setItem('wantVisitPath', to.fullPath)
  }

  if (to.meta.checkLogin) {
    axios.get('site/account/islogin').then(response => {
      if (response.data.code === 'logined') {
        //登录过
        next()
      } else {
        // 没有登录,跳转到登录页面
        router.push({ path: '/login' })
      }
    })
  } else {
    // 不需要登录直接跳转
    next()
  }
})
// es6中导入出一个成员
export default router
