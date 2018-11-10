import Vue from 'vue'
import moment from 'moment'
// 使用moment第三方包
Vue.filter('dateFmt',(input,formatStr='YYYY-MM-DD')=>{
    return moment(input).format(formatStr)
})