<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment" style='height:500px;'>
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}} {{orderInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderInfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <img id="imgLogo" src="../../statics/site/images/cah.jpg" hidden>
                                <!-- 第一种方式,使用老师封装的代码 -->
                                <!-- <dzh-qrcode :img_url="img_url"></dzh-qrcode> -->
                                <!-- 使用http://www.jq22.com/jquery-info4094中的代码 -->
                                <div id="container2">
                                    <canvas width="400" height="400"></canvas>
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
// import DZHQRCode from 'dzh-qrcode'
import '../../statics/site/jquery_plugins/qrcode/js/qrcode.js'
export default {
    //   components: {
    //     'dzh-qrcode': DZHQRCode
    //   },
    data() {
        return {
            orderInfo: {},
            //   img_url: ''
            timeId: null
        }
    },
    created() {
        this.getOrderInfoData()
        // 导入本地图片生成二维码中心图片
        // this.img_url = require('../../statics/site/images/cah.jpg')
        this.mask()
    },
    // 等页面dom树已经创建完毕,在显示二维码
    //   mounted() {
    //     //vue解析的时候，在去加载img的时候，如果发现有hidden属性，可能会延迟加载
    //     setTimeout(() => {
    //       //二维码图片logo
    //       $('#container2').erweima({
    //         mode: 4,
    //         mSize: 20,
    //         image: $('#imgLogo')[0],
    //         //公司自己提供的接口,覆盖后台的text
    //         text: `http://47.106.148.205:8899/site/validate/pay/alipay/${this.$route.query.orderid}`
    //       })
    //     }, 200)
    //   },
    updated() {
        $('#container2').erweima({
            mode: 4,
            mSize: 20,
            image: $('#imgLogo')[0],
            //公司自己提供的接口,覆盖后台的text
            text: `http://47.106.148.205:8899/site/validate/pay/alipay/${
        this.$route.query.orderid
      }`
        })
    },
    methods: {
        //设置定时器,用于不定时向后台发送请求,检测用户是否扫码支付成功
        mask() {
            this.timeId = setInterval(() => {
                this.getOrderInfoData()
            }, 3000)
        },
        // 获取页面数据
        getOrderInfoData() {
            this.$axios(
                `site/validate/order/getorder/${this.$route.query.orderid}`
            ).then(res => {
                console.log(this.$route.query.orderid)
                if (res.data.status === 0) {
                    // 请求成功
                    if (res.data.message[0].status === 2) {
                        //支付成功,跳转到支付成功页面
                        this.$router.push({
                            path: '/paySuccess'
                        })
                    }
                    this.orderInfo = res.data.message[0]
                }
            })
        }
    },
    //在销毁阶段清除定时器
    beforeDestroy() {
        clearInterval(this.timeId)
    }
}
</script>
