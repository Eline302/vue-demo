<template>
<!--获取query传的参数$route.query.ids -->
<!-- <div>填写订单信息页面 {{$route.query.ids}}</div> -->

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
                            <li class="active">
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
                <div class="cart-box">
                    <h2 class="slide-tit">
                        <span>1、收货地址</span>
                    </h2>
                    <div id="orderForm" name="orderForm" url="">
                        <div class="form-box address-info">
                            <el-form :model="order" status-icon :rules="rules" ref="orderRef" label-width="150px" class="demo-ruleForm">
                                <el-form-item label="收货人姓名:" prop="accept_name">
                                    <el-input v-model="order.accept_name" style='width:500px;'></el-input>
                                </el-form-item>
                                <el-form-item label="所属地区:" prop="area">
                                    <v-distpicker
                                     :province='order.area.province.value' 
                                     :city='order.area.city.value'
                                      :area='order.area.area.value' 
                                      @selected="onSelected"></v-distpicker>
                                </el-form-item>
                                <el-form-item label="详细地址:" prop="address">
                                    <el-input v-model="order.address" style='width:500px;'></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码:"  prop="mobile">
                                    <el-input v-model="order.mobile" style='width:500px;'></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱:">
                                    <el-input v-model="order.email" style='width:500px;'></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码:">
                                    <el-input v-model="order.post_code" style='width:500px;'></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                        <h2 class="slide-tit">
                            <span>2、支付方式</span>
                        </h2>
                        <ul class="item-box clearfix">
                            <!--取得一个DataTable-->
                            <li>
                                <label>
                                    <el-radio v-model="order.payment_id" label="6">在线支付</el-radio>
                                    <em>手续费：0.00元</em>
                                </label>
                            </li>
                        </ul>
                        <h2 class="slide-tit">
                            <span>3、配送方式</span>
                        </h2>
                        <ul class="item-box clearfix">
                            <!--取得一个DataTable-->
                            <li>
                                <label>
                                    <!-- order.express_id的值和label的值相同,就选中那种快递 -->
                                     <el-radio-group v-model="order.express_id" @change='expressChange'>
                                        <el-radio label="1">顺丰快递<em>费用：20.00元</em></el-radio>
                                        <el-radio label="2">圆通快递<em>费用：10.00元</em></el-radio>
                                        <el-radio label="3">韵达快递<em>费用：8.00元</em></el-radio>
                                    </el-radio-group>
                                </label>
                            </li>
                        </ul>
                        <h2 class="slide-tit">
                            <span>4、商品清单</span>
                        </h2>
                        <div class="line15"></div>
                        <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                            <tbody>
                                <tr>
                                    <th colspan="2" align="left">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="84" align="center">购买数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                </tr>
                                <tr v-for='item in goodsList' :key='item.id'>
                                    <td width="68">
                                        <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                    </td>
                                    <td>
                                        <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                    </td>
                                    <td>
                                        <span class="red">
                                            ￥{{item.sell_price}}
                                        </span>
                                    </td>
                                    <td align="center">{{item.buycount}}</td>
                                    <td>
                                        <span class="red">
                                            ￥{{item.buycount*item.totalamount}}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="line15"></div>
                        <h2 class="slide-tit">
                            <span>5、结算信息</span>
                        </h2>
                        <div class="buy-foot clearfix">
                            <div class="left-box">
                                <dl>
                                    <dt>订单备注(100字符以内)</dt>
                                    <dd>
                                        <textarea name="message" v-model='order.message' class="input" style="height:35px;"></textarea>
                                    </dd>
                                </dl>
                            </div>
                            <div class="right-box">
                                <p>
                                    商品
                                    <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                    <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                                <p>
                                    运费：￥
                                    <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                                </p>
                                <p class="txt-box">
                                    应付总金额：￥
                                    <label id="totalAmount" class="price">{{getTotalAmount}}</label>
                                </p>
                                <p class="btn-box">
                                    <a class="btn button"  @click="goBack">>返回购物车</a>
                                    <a id="btnSubmit" class="btn submit" @click='goToOrder'>确认提交</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// 导入vue省市联动
import VDistpicker from 'v-distpicker'
// 导入getLocalGoods获取本地存储的数据
import { getLocalGoods } from '../../common/localStorage.js'
export default {
  components: {
    VDistpicker
  },
  data() {
    var checkMoblie = (rule, value, callback) => {
      if (/^1[34578]\d{9}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('手机号码不合法'))
      }
    }
    //将来要提交给后台进行下单的数据
    return {
      goodsList: [],
      totalCount: 0,
      totalPrice: 0,
      order: {
        goodsAmount: 0,
        accept_name: 'jack',
        address: '庭威402',
        mobile: '13715245898',
        email: 'jack@163.com',
        post_code: '710546', //邮编
        area: {
          // 所属区域
          province: {
            code: '440000',
            value: '广东省'
          },
          city: {
            code: '440300',
            value: '深圳市'
          },
          area: {
            code: '440306',
            value: '宝安区'
          }
        },
        payment_id: '6', //支付方式
        express_id: '1', //运送方式
        expressMoment: 20, //快递费
        message: '请尽快发货....'
      },
      //表单校验规则
      rules: {
        accept_name: [
          {
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            validator: checkMoblie,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getGoodsListData()
  },
  computed: {
    //应付总金额
    getTotalAmount() {
      return this.totalPrice + this.order.expressMoment
    }
  },
  methods: {
    getGoodsListData() {
      // 获取本地存取的值,对象
      const localGoods = getLocalGoods()
      //解决从支付页面回到到本页面,商品数量和金额为NaN的问题
      //判断被删除商品id是否在本地(query传参),不存在就跳转到商品列表页面
      var isDeleteId = this.$route.query.ids.split(',')[0]
      if (!localGoods[isDeleteId]) {
        this.$router.push({ path: '/goodslist' })
        return
      }
      //给order赋值
      this.order.goodsids = this.$route.query.ids
      //定义一个临时独享
      let tempObj = {}
      //shopcart.vue是通过query传值的,所以获取ids是通过query
      this.$axios
        .get(`site/validate/order/getgoodslist/${this.$route.query.ids}`)
        .then(res => {
          res.data.message.forEach(item => {
            // 修改数组中商品的数量
            item.buycount = localGoods[item.id]
            tempObj[item.id] = item.buycount
            //商品总数
            this.totalCount += localGoods[item.id]
            //商品总价格
            this.totalPrice += localGoods[item.id] * item.sell_price
          })
          //总金额,不包含运费
          this.order.goodsAmount = this.totalPrice
          //给order添加cargoodsobj,后台需要
          this.order.cargoodsobj = tempObj
          //   console.log(res.data.message)
          // 获取的数据存入goodlist中
          this.goodsList = res.data.message
        })
    },
    //选择最后一项时触发,返回省市区的值
    onSelected(data) {
      // 将改变的值重新赋值给area,会返回给后台改变的数据,否则会显示原样数据
      this.order.area = data
    },
    //切换快递方式,参数配送方式的label,
    expressChange(label) {
      switch (label) {
        case '1':
          this.order.expressMoment = 20
          break
        case '2':
          this.order.expressMoment = 10
          break
        case '3':
          this.order.expressMoment = 8
          break
      }
    },
    //返回购物车
    goBack() {
      //this.$router.push({path:'/shopcart'})
      this.$router.go(-1)
    },
    // 确认提交
    goToOrder() {
      this.$refs.orderRef.validate(valid => {
        if (!valid) {
          console.log('error submit!!')
          return
        }
        // console.log(this.order);
        // 发请求
        this.$axios
          .post('site/validate/order/setorder', this.order)
          .then(res => {
            if (res.data.status === 0) {
              //成功跳转到支付页面payorder.vue,并将订单号res.data.message.orderid传递过去query传参
              this.$router.push({
                path: '/pay',
                query: { orderid: res.data.message.orderid }
              })
              //console.log(res.data.message.orderid)
              //删除本地购买过的商品
              //split方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。
              var idsArray = this.$route.query.ids.split(',')
              //调用购物车中的删除方法
              idsArray.forEach(id => {
                //调用vuex中deleteGoods方法,根据id删除数据(已经封装好的方法)
                this.$store.commit('deleteGoods', id)
              })
              //   console.log(idsArray) //["94", "95"]
            }
          })
      })
    }
  }
}
</script>
