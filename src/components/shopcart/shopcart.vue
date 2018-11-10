<template>
     <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 购物车商品显示区域 -->
                                <tr v-for='(item,index) in goodsList' :key='item.id'>
                                    <td width="48" align="center">
                                        <el-switch v-model="item.isSelect">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <!-- 父组件中集成子组件, 使用子组件注册自定义事件goodsCountChange-->
                                        <inputnumber :goodsId='item.id' :count='item.buycount' @goodsCountChange='getChangedGoods'></inputnumber>
                                    </td>
                                    <td width="104" align="left">{{item.sell_price*item.buycount}}</td>
                                    <td width="54" align="center">
                                        <!-- 传入索引用于删除数据中数据,通过数组对应项找到id删除本地中数据 -->
                                        <a @click='deleteGoods(index)'>删除</a>
                                    </td>
                                </tr>
                                <!-- 当购物车没有数据的时候显示的内容-->
                                <tr v-if='goodsList.length===0'>
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity" >{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalAmount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click='counterBuy'>继续购物</button>
                            <button class="submit" @click='goToPay'>立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 导入本地存储
import { getLocalGoods } from '../../common/localStorage.js'
// 导入子组件
import inputnumber from '../../components/subcomponents/inputnumber'
export default {
  // 注册子组件
  components: {
    inputnumber
  },
  data() {
    return {
      goodsList: []
    }
  },
  created() {
    this.getGoodsListData()
  },
  //通过计算属性来实时改变商品总数量,和总价格,只要data中的数据以改变,页面数据会立即改变
  computed: {
    //计算商品总数量
    getTotalCount() {
      let totalCount = 0
      this.goodsList.forEach(item => {
        // 如果选择按钮时开启在计算总数量,关闭不计入总数里面
        if (item.isSelect) {
          totalCount += item.buycount
        }
      })
      return totalCount
    },
    // 计算商品总金额
    getTotalAmount() {
      let totalAmount = 0
      this.goodsList.forEach(item => {
        // 如果选择按钮时开启在计算总数量,关闭不计入总数里面
        if (item.isSelect) {
          totalAmount += item.sell_price * item.buycount
        }
      })
      return totalAmount
    }
  },
  methods: {
    getGoodsListData() {
      // 获取本地存储(对象)
      const localGoods = getLocalGoods()
      //获取对象中的key 通过ES5的Object.keys(obj)获取到key值,返回值为数组
      const keys = Object.keys(localGoods)
      // 判断是否有值
      if (keys.length === 0) {
        return
      }
      // 发请求获取数据
      const url = `site/comment/getshopcargoods/${keys.join(',')}`
      this.$axios(url).then(response => {
        //将本地数据中商品的数量存入获取数据的buycount
        response.data.message.forEach(item => {
          item.buycount = localGoods[item.id]
          item.isSelect = true
        })
        //将获取的数据存入goodsList中,用于渲染页面
        this.goodsList = response.data.message
        // console.log(response.data.message)
      })
    },
    // 子组件传值给父组件之后，父组件执行的函数
    getChangedGoods(changeGoods) {
      // 当子组件的商品数量改变时,重新计算商品总数量和总价格,
      //  既根据子组件和父组件的ID把子组件更改的数量重新传值给goodsList的count
      this.goodsList.forEach(item => {
        if (item.id === changeGoods.goodsId) {
          item.buycount = changeGoods.count
        }
      })
      // 准备好载荷,调用Vuex的mutation的updateGoods方法
      this.$store.commit('updateGoods', changeGoods)
    },
    // 删除商品数据
    deleteGoods(index) {
      this.$confirm('是否删除次商品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //   删除成功
          // 根据id删除本地数据,更新数据
          this.$store.commit('deleteGoods', this.goodsList[index].id)
          // 删除数组中的值
          this.goodsList.splice(index, 1)
        })
        .catch(() => {
          //  删除失败
        })
    },
    //立即结算
    goToPay() {
      var ids = []
      // 获取选中的Id
      this.goodsList.forEach(item => {
        if (item.isSelect) {
          ids.push(item.id)
        }
      })
      //判断ids是否有值,没有提示
      if (ids.length === 0) {
        this.$message({
          message: '至少选择一个商品下单',
          type: 'warning'
        })
        return
      }
      // 通过编程式导航跳转到下单页面(通过query传参)
     this.$router.push({ path: '/order', query: { ids: ids.join(',') }})
    },
    // 继续购物
    counterBuy(){
        // 通过路径跳转过去
        this.$router.push({path:'/goodslist'})
    }
  }
}
</script>

