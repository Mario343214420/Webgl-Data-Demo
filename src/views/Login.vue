<template>
  <div class="page-login">
    <!--背景-->
    <div class="layer area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <!-- logo -->
    <img class="page-login--logo" src="../assets/images/logo.png" alt="logo">
    <!--登录框-->
    <div class="layer">
      <div class="content" flex="dir:top main:center cross:center">
        <div class="form">
          <div class="title">登录系统</div>
          <b-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin" size="default">
            <b-form-item prop="username">
              <b-input type="text" v-model="formLogin.username" placeholder="请输入用户名" prefix="ios-contact"></b-input>
            </b-form-item>
            <b-form-item prop="password">
              <b-input type="password" v-model="formLogin.password" placeholder="请输入密码" prefix="ios-key"></b-input>
            </b-form-item>
            <b-form-item prop="captcha">
              <b-input type="text" v-model="formLogin.captcha" placeholder="- - - -" style="width: 60%;"
                       prefix="ios-bulb"></b-input>
              <span class="login-code" @click="refreshCode" title="点击刷新">
                    <img :src="verifyCodeUrl" alt="code">
                  </span>
            </b-form-item>
            <b-button @click="submit" type="primary" class="button-login" v-waves :loading="loginLoading">
              {{ loginLoading? '登录中...' :'登 录' }}
            </b-button>
          </b-form>
        </div>
        <div class="footer">
          <p class="footer-copyright">
            技术支持：徐州金蝶软件有限公司
          </p>
          <p class="footer-copyright">
            copyright:2016-2020 Kingdee All Right Reserved
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getVerifyCode, login } from '../api/login.api'

  export default {
    name: 'Login',
    data() {
      return {
        verifyCodeUrl: '',
        timeInterval: null,
        // 表单
        formLogin: {
          username: 'admin',
          password: '123456',
          captcha: ''
        },
        // 校验
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          captcha: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },
        loginLoading: false
      }
    },
    created() {
      this.refreshCode()
      document.addEventListener('keyup', this.enter)
    },
    methods: {
      // enter键盘事件
      enter(e) {
        if (e.code === 'Enter') {
          this.submit()
        }
      },
      // 刷新验证码
      refreshCode() {
        getVerifyCode().then(response => {
          if (response.status === 200) {
            this.verifyCodeUrl = 'data:image/png;base64,' + btoa(
              new Uint8Array(response.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
            )
            this.formLogin.captcha = ''
          } else {
            this.$message({ type: 'danger', content: '验证码请求错误' })
          }
        })
      },
      // 提交登录信息
      submit() {
        this.$refs.loginForm.validate((valid) => {
          valid = true
          if (valid) {
            this.loginLoading = true
            // 登录
            login(this.formLogin)
              .then((res) => this.loginSuccess(res))
              .catch(err => this.requestFailed(err))
          } else {
            // 登录表单校验失败
            this.$message({ type: 'danger', content: '请输入登录信息后登录' })
          }
        })
      },
      loginSuccess(res) {
        if (res.data.code === '0') {
          const token = res.data.data
          this.$store.dispatch('setToken', token).then(() => {
            // 重定向对象不存在则返回顶层路径
            this.$router.push('/')
          })
        } else {
          this.$message({ content: res.data.message, type: 'danger' })
          this.refreshCode()
        }
        this.loginLoading = false
      },
      // 登录失败
      requestFailed(err) {
        this.loginLoading = false
        this.refreshCode()
        this.$message({ type: 'danger', content: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试' })
      }
    },
    beforeDestroy() {
      document.removeEventListener('keyup', this.enter)
    }
  }
</script>

<style lang="stylus" scoped>
  .page-login {
    user-select: none;
    background: url("../assets/images/login-bg.jpg") no-repeat center center;
    height: 100%;
    position: relative;
    // 层

    .layer {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      overflow: auto;
    }

    .area {
      overflow: hidden;
    }

    .page-login--logo {
      position: absolute;
      top: 50px;
      left: 80px;
    }

    // 登陆页面控件的容器

    .content {
      height: 100%;
      min-height: 500px;
      // 登录表单

      .form {
        position: relative;
        width: 400px;
        padding: 60px 40px 40px;
        background: #fff;
        border-radius: 5px;
        box-sizing: border-box;

        .title {
          position: absolute;
          top: 0;
          left: 60px;
          margin-top: -24px;
          background: url("../assets/images/title-bg.png") no-repeat 0 0;
          width 280px;
          height: 48px;
          line-height: 48px;
          background-size: 100% 100%
          text-align: center;
          color: #fff;
          font-size: 20px;
          font-family: '宋体';
        }

        // 登录按钮

        .button-login {
          width: 100%;
        }

        .login-code {
          display: inline-block;
          vertical-align: middle;
          width: 40%;
          padding-left: 10px;
          height: 36px;
          overflow: hidden;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            border: 1px solid #dcdee2;
          }
        }
      }

      // footer

      .footer {
        padding: 2em 0 0;

        .footer-copyright {
          text-align: center;
          padding: 0;
          margin: 0;
          font-size: 12px;
          line-height: 20px;
          color: #000000;
        }
      }
    }

    // 背景

    .circles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;

      li {
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        background: #FFF;
        animation: animate 25s linear infinite;
        bottom: -200px;
        @keyframes animate {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: .3;
            border-radius: 0;
          }
          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
          }
        }

        &:nth-child(1) {
          left: 15%;
          width: 30px;
          height: 30px;
          animation-delay: 0s;
        }

        &:nth-child(2) {
          left: 5%;
          width: 20px;
          height: 20px;
          animation-delay: 2s;
          animation-duration: 12s;
        }

        &:nth-child(3) {
          left: 70%;
          width: 20px;
          height: 20px;
          animation-delay: 4s;
        }

        &:nth-child(4) {
          left: 40%;
          width: 60px;
          height: 60px;
          animation-delay: 0s;
          animation-duration: 18s;
        }

        &:nth-child(5) {
          left: 65%;
          width: 20px;
          height: 20px;
          animation-delay: 0s;
        }

        &:nth-child(6) {
          left: 75%;
          width: 50px;
          height: 50px;
          animation-delay: 3s;
        }

        &:nth-child(7) {
          left: 35%;
          width: 20px;
          height: 20px;
          animation-delay: 7s;
        }

        &:nth-child(8) {
          left: 50%;
          width: 25px;
          height: 25px;
          animation-delay: 15s;
          animation-duration: 45s;
        }

        &:nth-child(9) {
          left: 20%;
          width: 15px;
          height: 15px;
          animation-delay: 2s;
          animation-duration: 35s;
        }

        &:nth-child(10) {
          left: 85%;
          width: 50px;
          height: 50px;
          animation-delay: 0s;
          animation-duration: 11s;
        }
      }
    }
  }
</style>
