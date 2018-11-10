<template>
<div>
    <div @click='sub' class="left">-</div>
    <div class="middle">{{initCount}}</div>
    <div @click='add' class="right">+</div>
</div>
</template>
<style>
.left,
.middle,
.right {
  width: 25px;
  height: 30px;
  display: inline-block;
  text-align: center;
  line-height: 30px;
  border: 1px solid #ccc;
}
.middle {
  width: 35px;
  margin: 0 3px;
}
</style>

<script>
export default {
  // 接受父组件传递的值 方式一
  //   props: ['goodsId', 'count'],
  // 方式二
  props: {
    goodsId: {
      Type: String,
      //   必须传递参数
      required: true
    },
    count: {
      Tyoe: Number,
      //不穿默认为1
      default: 1
    }
  },
  data() {
    return {
      initCount: 0
    }
  },
  created() {
    this.initCount = this.count
  },
  methods: {
    //减
    sub() {
      //当数量减为1的时候不在继续相减
      if (this.initCount === 1) return
      this.initCount--
      this.notify()
    },
    //加
    add() {
      this.initCount++
      this.notify()
    },
    notify() {
      // 子组件，通过触发自定义事件，传递载荷
      this.$emit('goodsCountChange',{
          goodsId:this.goodsId,
          count:this.initCount
      })
    }
  }
}
</script>
