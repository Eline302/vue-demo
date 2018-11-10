<template>
    <div>
        <div>
        <div class="section">
            <div class="location">
            <span>当前位置:</span>
            <a href="/index.html">首页</a> &gt;
            <a href="/goods.html">购物商城</a> &gt;
            <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <!--渲染两次,第一次用空对象去渲染(goods的参数为空对象),所以title为undefined,当请求完毕goods有数据时,
            再次渲染页面,此时页面上显示数据,所以每次渲染的时候用v-if判断是否获取到数据,没有就不渲染页面,有就渲染页面 -->
        <div v-if='goods.goodsinfo' class="section">
            <div class="wrapper clearfix">
            <div class="wrap-box">
                <div class="left-925">
                <div class="goods-box clearfix">
                    <!-- 放大镜的代码写在这里(商品图片展示) -->
                    <div class="pic-box">
                    <div class="magnifier" id="magnifier1">
                        <div class="magnifier-container">
                        <div class="images-cover"></div>
                        <!--当前图片显示容器-->
                        <div class="move-view"></div>
                        <!--跟随鼠标移动的盒子-->
                        </div>
                        <div class="magnifier-assembly">
                        <div class="magnifier-btn">
                            <span class="magnifier-btn-left">&lt;</span>
                            <span class="magnifier-btn-right">&gt;</span>
                        </div>
                        <!--按钮组-->
                        <div class="magnifier-line">
                            <ul class="clearfix animation03">
                            <li v-for='item in goods.imglist' :key='item.id'>
                                <div class="small-img">
                                <img :src="item.thumb_path" />
                                </div>
                            </li>
                            </ul>
                        </div>
                        <!--缩略图-->
                        </div>
                        <div class="magnifier-view"></div>
                        <!--经过放大的图片显示容器-->
                    </div>
                    </div>
                    <!-- 商品详情 -->
                    <div class="goods-spec">
                    <h1>{{goods.goodsinfo.title}}</h1>
                    <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                    <div class="spec-box">
                        <dl>
                        <dt>货号</dt>
                        <dd id="commodityGoodsNo">{{ goods.goodsinfo.goods_no}}</dd>
                        </dl>
                        <dl>
                        <dt>市场价</dt>
                        <dd>
                            <s id="commodityMarketPrice">{{ goods.goodsinfo.market_price}}</s>
                        </dd>
                        </dl>
                        <dl>
                        <dt>销售价</dt>
                        <dd>
                            <em id="commoditySellPrice" class="price">{{ goods.goodsinfo.sell_price}}</em>
                        </dd>
                        </dl>
                    </div>
                    <div class="spec-box">
                        <dl>
                        <dt>购买数量</dt>
                        <dd>
                            <div class="stock-box">
                            <el-input-number size="small" :step=1 :min=0 :max='goods.goodsinfo.stock_quantity' v-model="buyCounnt"></el-input-number>
                            </div>
                            <span class="stock-txt">
                            库存
                            <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                            </span>
                        </dd>
                        </dl>
                        <dl>
                        <dd>
                            <div id="buyButton" class="btn-buy">
                            <button class="buy">立即购买</button>
                            <button ref='addToShopCartRef' @click='addCart' class="add">加入购物车</button>
                            </div>
                        </dd>
                        </dl>
                    </div>
                    </div>
                </div>

                <!-- 商品评论和商品介绍部分 -->
                <!-- 使用iview的Affix,使用图钉可以将商品介绍和商品评论固定在屏幕上，并且不随页面的滚动而滚动 -->
                <Affix>
                    <div id="goodsTabs" class="goods-tab bg-wrap">
                    <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                        <ul>
                        <li>
                            <a @click="commentIsShow=false" :class="commentIsShow?'':'selected'" href="javascript:;">商品介绍</a>
                        </li>
                        <li>
                            <a @click="commentIsShow=true" :class="commentIsShow?'selected':''" href="javascript:;">商品评论</a>
                        </li>
                        </ul>
                    </div>
                    </div>
                </Affix>
                <!-- 商品介绍 -->
                <div v-show='!commentIsShow' class="tab-content entry" style="display: block;">
                    <!-- 通过v-html显示商品介绍页面 -->
                    <div v-html='goods.goodsinfo.content'></div>
                </div>
                <!-- 商品评论 -->
                <div v-show='commentIsShow' class="tab-content" style="display: block;">
                    <div class="comment-box">
                    <div id="commentForm" name="commentForm" class="form-box">
                        <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                        </div>
                        <div class="conn-box">
                        <div class="editor">
                            <textarea ref='textareaRef' id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                            <span class="Validform_checktip"></span>
                        </div>
                        <div class="subcon">
                            <input id="btnSubmit" @click='postComment' name=" it" type="submit" value="提交评论" class="submit">
                            <span class="Validform_checktip"></span>
                        </div>
                        </div>
                    </div>
                    <ul id="commentList" class="list-box">
                        <p v-if='commentlist.length===0' style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                        <li v-for='item in commentlist' :key='item.id'>
                        <div class="avatar-box">
                            <i class="iconfont icon-user-full"></i>
                        </div>
                        <div class="inner-box">
                            <div class="info">
                            <span>{{item.user_name}}</span>
                            <span>{{item.add_time |dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
                            </div>
                            <p>{{item.content}}</p>
                        </div>
                        </li>
                    </ul>
                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                        <div id="pagination" class="digg">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[5, 10, 20, 30]"
                            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <!-- 右边商品推荐区域 -->
            <div class="left-220">
                <div class="bg-wrap nobg">
                <div class="sidebar-box">
                    <h4>推荐商品</h4>
                    <ul class="side-img-list">
                    <li v-for='item in goods.hotgoodslist' :key='item.id'>
                        <router-link :to="'/goodsinfo/'+item.id" class="">
                        <div class="img-box">
                            <img :src="item.img_url">
                        </div>
                        <div class="txt-box">
                            <a href="#" class="">{{item.title}}</a>
                            <span>{{ item.add_time | dateFmt}}</span>
                        </div>
                        </router-link>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        <!-- 动画元素 -->
        <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
        <!-- v-if='goods.imglist' 如果存在就显示动画的元素 -->
        <div class="animateDiv" ref='animateDivRef' v-if='goods.imglist' v-show='isShow'>
            <img :src="goods.imglist[0].original_path" alt="">
        </div>
        </transition>
    </div>    
</template>
<style scoped>
/*导入渲染图册的css样式*/
@import '../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css';
.animateDiv {
  width: 40px;
  position: absolute;
  top: 0;
  left: 0;
}
.animateDiv img {
  width: 100%;
}
</style>
<script>
// import axios from 'axios'
//  导入渲染图册的js
import '../../statics/site/jquery_plugins/jqimgzoom/js/magnifier.js'
// 导入Affix组件
import { Affix } from 'iview'
export default {
  // 局部注册,Affix就是goodsinfo的子组件
  components: {
    Affix
  },
  data() {
    return {
      //商品详情信息
      goods: {},
      //评论数据
      commentlist: [], //评论列表
      //购买数量
      buyCounnt: 1,
      commentIsShow: false, //是否显示商品评论
      pageIndex: 1, //页码
      pageSize: 2, //页容量
      total: 0, //总条数
      addCartOffset: null, //加入购物车按钮元素的偏移量
      shopCart: null, //顶部购物车偏移量
      isShow: false //是否显示飞入购物车的图片
    }
  },
// 用来监控页面路径改变后,重新渲染页面
//点击商品推荐部分商品,商品ID就会改变,根据id调用下面方法,重新渲染页面
  watch: {
    $route() {
      // 获取商品数据
      this.getGoodsData()
      // 获取商品评论数据
      this.getCommentData()
    }
  },
  updated() {
    //放在这里是因为，我们点击了右边的连接之后，要重新图册
    $('#magnifier1').imgzoon({ magnifier: '#magnifier1' })
  },
  // 当vm实例的data和methods初始化完毕后,vm实例会自动执行created这个生命周期
  created() {
    this.getGoodsData()
    this.getCommentData()
  },
  methods: {
    //获取商品详情数据
    getGoodsData() {
      //$route.params.goodsId属于data中的数据,需要加上this,页面中不需要加this
      var url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`
      this.$axios.get(url).then(res => {
        this.goods = res.data.message

        // 等页面渲染完毕后获取加入购物车dom元素的偏移量,需要设置定时器,可能页面数据还没完全渲染完毕此时获取不到数据
        setTimeout(() => {
          // 获取加入购物车按钮起始位置(动画开始的位置)
          this.addCartOffset = $(this.$refs.addToShopCartRef).offset()
          //   console.log($(this.$refs.addToShopCartRef).offset())
          //给被动画的元素设置起始位置,既购物车按钮的位置
          $(this.$refs.animateDivRef).css({
            top: this.addCartOffset.top,
            left: this.addCartOffset.left
          })
          // 获取顶部购物车的起始位置(动画结束的位置)
          this.shopCart = $('#shoppingCartCount').offset()
          //   console.log($('#shoppingCartCount').offset())
        }, 200)
      })
    },
    // 获取商品评论数据
    getCommentData() {
      var url = `site/comment/getbypage/goods/${
        this.$route.params.goodsId
      }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      this.$axios.get(url).then(res => {
        // 总评论数
        this.total = res.data.totalcount
        this.commentlist = res.data.message
      })
    },

    // 分页相关---更改了页容量
    handleSizeChange(pageSize) {
      //更改页容量后重新设置pageIndex为1
      this.pageIndex = 1
      this.pageSize = pageSize
      this.getCommentData()
    },
    //分页相关----更改了页码
    handleCurrentChange(pageIndex) {
      //更改的页数赋值给data的pageIndex
      this.pageIndex = pageIndex
      // 重新获取数据
      this.getCommentData()
    },
    // 提交评论
    postComment() {
      // 获取文本框中评论的内容
      var content = this.$refs.textareaRef.value
      //判断内容是否为空,为空提示
      if (content.trim().length === 0) {
        this.$message({
          message: '评论区域内容不能为空,请填写你的评论',
          type: 'warning'
        })
        return
      }

      //不为空提交数据,发请求
      var url = `site/validate/comment/post/goods/${this.$route.params.goodsId}`
      this.$axios.post(url, { commenttxt: content }).then(res => {
        // console.log(res.data)
        //提示提交成功
        this.$message({
          message: '评论成功!',
          type: 'success'
        })
        //清空文本框数据
        this.$refs.textareaRef.value = ''
        //重新加载第一页
        this.pageIndex = 1
        this.getCommentData()
      })
    },
    //加入购物车点击事件
    addCart() {
      //点击加入购物车,显示需要添加商品的图片
      this.isShow = true
      //准备好载荷 goods={goodsId:90,count:5}
      const goods = {
        goodsId: this.$route.params.goodsId,
        count: this.buyCounnt
      }
      //调用mutations中的方法（同步调用）,vuex中的action可以可以将实现异步
      this.$store.commit('addGoods', goods)
    },
    //动画相关方法
    beforeEnter(el) {
      //动画起始位置
      el.style.top = this.addCartOffset.top + 'px'
      el.style.left = this.addCartOffset.left + 'px'
      el.style.transform = 'scale(1)'
    },
    enter(el, done) {
      // 1.设置动画时长
      el.style.transition = 'all  0.8s'
      // 2.刷新动画
      el.offsetHeight
      // 3.动画结束代码
      el.style.top = this.shopCart.top - 10 + 'px'
      el.style.left = this.shopCart.left + 10 + 'px'
      el.style.transform = 'scale(0.3)'
      // 4.等动画执行完后,再去执行afterEnter中的代码,但是需要调用done(),否则不会执afterEnter中的代码,相当于afterEnter的引用
      done()
    },
    afterEnter(el) {
      //动画结束后隐藏
      this.isShow = false
    }
  }
}
</script>


