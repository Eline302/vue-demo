// ES6导入模块的方式,相当于require('')
import Vue from 'vue'
// 导入element-ui组件,用于轮播图
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI)
//按需导入ElementUI
import {
  Button,
  Pagination,
  Input,
  InputNumber,
  Switch,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  MessageBox,
  Message,
  Carousel,
  CarouselItem,
  Row,
  Col
} from 'element-ui'

Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
// 导入Vue懒加载
import VueLazyload from 'vue-lazyload'
// 懒加载
Vue.use(VueLazyload,{
  loading:require('./statics/site/images/01.gif')
})

// 导入跟组件
import App from './App.vue'
// 导入全局样式文件(如果是全局都要用到的样式导入main.js中)
import './statics/site/css/style.css'
// 导入过滤器
import './filter/index.js'
Vue.config.productionTip = false
// 导入路由对象(如果一个文件下有一个文件叫index.js,可以直接写文件)
import router from './router/index.js'
//导入vuex(index.js可以省略)
import store from './store'

// 创建跟实例,整个项目中只需要有一个跟实例
// 使用render函数，渲染组件
new Vue({
  // 渲染组件
  render: h => h(App),
  router,
  store
}).$mount('#app')
