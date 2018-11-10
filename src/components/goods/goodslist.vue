<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in goodsData.catelist" :key='item.id'>
                                    <!-- 左边标题 -->
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{ item.title}}</span>
                                        <p>
                                            <span v-for='subItem in item.subcates' :key='subItem.id'>
                                                {{subItem.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <!-- 鼠标移入显示轮播图内容 -->
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for='subItem in item.subcates' :key='subItem.id' href="/goods/43.html">{{subItem.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 轮播图 -->
                    <div class="left-705">
                        <div class="banner-img">
                            <el-carousel :interval="3000" height='341px' arrow="always">
                                <el-carousel-item v-for="item in goodsData.sliderlist" :key="item.id">
                                    <img :src="item.img_url" alt="">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for='(item,index) in goodsData.toplist' :key="item.id">
                                <div class="img-box">
                                    <label>{{ index+1 }}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{ item.title }}</a>
                                    <span>{{ item.add_time |dateFmt() }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in goodsList" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{ item.catetitle }}</h2>
                <p>
                    <a v-for="subItem in item.level2catelist" :key='subItem.subcateid' href="/goods/43.html">{{subItem.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for='subItem in item.datas' :key='subItem.artID'>
                            <!-- 使用 router-link 组件来导航. -->
                            <!-- 通过传入 `to` 属性指定链接. -->
                            <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
                            <router-link :to="'/goodsinfo/'+subItem.artID" class="">
                                <div class="img-box">
                                    <!-- 图片懒加载 -->
                                    <img v-lazy="subItem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{ subItem.artTitle }}</h3>
                                    <p class="price">
                                        <b>{{subItem.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{subItem.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{subItem.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.el-carousel img {
  width: 100%;
  height: 100%;
}
</style>

<script>
// 导入axios,在router--->index.js将axios写入Vue的原型中,以后使用直接用this.$axios
// import axios from 'axios'
// 导出
export default {
  data() {
    return {
      // 头部数据
      goodsData: {},
      //商品列表
      goodsList: {}
    }
  },
// 页面以渲染就去调用方法获取数据
  created() {
    this.getGoodsData()
    this.goodsListData()
  },
  methods: {
    //头部数据
    getGoodsData() {
      var url = 'site/goods/gettopdata/goods'
      this.$axios.get(url).then(response => {
        this.goodsData = response.data.message
      })
    },
    //商品列表
    goodsListData() {
      var url = 'site/goods/getgoodsgroup'
      this.$axios.get(url).then(response => {
        this.goodsList = response.data.message
      })
    }
  }
}
</script>
