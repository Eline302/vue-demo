<template>
    <div>
      <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" name="txtUserName" v-model='username' type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" name="txtPassword" v-model='password' type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" @click='login' name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
import {bus} from '../../common/commonvue.js'
export default {
  data() {
    return {
      username: 'zhangsan',
      password: '123'
    }
  },
  methods: {
    login() {
      this.$axios
        .post('site/account/login', {
          user_name: this.username,
          password: this.password
        })
        .then(res => {
          if (res.data.status === 0) {
            // 登录成功,跳转到本地存储里的页面
            this.$router.push({path:localStorage.getItem('wantVisitPath')})
            // 发送消息给APP.vue,表示登录成功了
            bus.$emit('loginSuccess',true)
          } else {
            // 登录失败
            this.$message({
              message: '用户名或密码有误',
              type: 'warning'
            })
          }
        })
    }
  }
}
</script>

