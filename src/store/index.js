import Vue from 'vue'; 
import Vuex from 'vuex';

// 需要注册vuex到vue中,集成Vue
Vue.use(Vuex);   //相当于Vue.prototype.$store

//按需导入本地存储数据的addLocalGoods方法
import {addLocalGoods,getTotalCount,updateLocalGoods,deleteLocalGoods} from '../common/localStorage.js'
// 使用 es6 语法把vuex的实例对象输出
export default new Vuex.Store({
    //vuex中的数据源,在state中去声明全局变量，可以通过 this.$store.state 访问
    state:{
        //要操作的数据
        buyCount:0
    },
    /* 只能执行同步方法，不要去执行异步方法 通过 this.$store.commit('方法名(addGoods)',载荷(goods)) 方法去调用
       state 就是上面的state 固定
       goods载荷 参数 约定goods={goodsId:90,count:5}*/
    mutations:{
        // 添加购物车
        addGoods(state, goods){
            // state.buyCount+=goods.count
            // 调用addLocalGoods方法获取购物车的总数量
            state.buyCount = addLocalGoods(goods)
        },
        /**
         * 更新购物车数据
         state 就是上面的state 固定
         goods载荷 参数 约定goods={goodsId:90,count:5}
         */
        updateGoods(state, goods){
            state.buyCount = updateLocalGoods(goods)
        },
        // 删除购物车商品
        deleteGoods(state, goodsId){
            state.buyCount =deleteLocalGoods(goodsId)
        }
    },
    // 在getters中声明state中变量的计算函数，缓存计算后的数据， 通过 this.$store.getters 调用
    getters:{
        getBuyCount(state) {
            //判断state.buyCount的值是否为0,为0就调用getTotalCount去获取本地数据,得到总数,
            // 如果不为0就返回当前state.buyCount的值
            return state.buyCount===0?getTotalCount():state.buyCount
        }
    }
})
