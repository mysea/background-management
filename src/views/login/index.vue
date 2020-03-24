<template>
  <div class="body">
    <div class="container">
      <div class="logo"></div>
      <div class="content">
        <div class="title">项目协同平台</div>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left">
          <el-form-item prop="employeeid">
            <el-input
              ref="name"
              v-model="loginForm.employeeid"
              autofocus="autofocus"
              name="employeeid"
              type="text"
              auto-complete="on"
              placeholder="请输入工号"
              @keyup.enter.native="handleLogin" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              name="password"
              auto-complete="on"
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin" />
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" @click.native.prevent="handleLogin" class="submit-btn">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="tip">
          <b>温馨提示</b>：建议使用谷歌Chrome或FireFox、Sarfri、Microsoft Edge、Internet Explorer 10.0或以上版本登录。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loginForm: {
        employeeid: '',
        password: ''
      },
      loginRules: {
        employeeid: [
          { required: true, trigger: 'blur', message: '工号不能为空' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' }
        ]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      }
    }
  },
  methods: {
    ...mapActions([
      'login',
      'getAuth',
      'getUserInfo'
    ]),
    handleLogin () {
      var _this = this
      _this.$refs.loginForm.validate(valid => {
        if (valid) {
          _this.loading = true
          _this.login(_this.loginForm).then(res => {
            _this.loading = false
            _this.$router.push({ path: this.redirect || '/' })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$dark_gray: #ccc;
$light_gray: #333;
$login_theme: #09aaff;

/deep/ input {
  border: 0 none;
  background-color: white;
  -webkit-appearance: none;
  &:-webkit-autofill {
    background-image: none;
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
    -webkit-text-fill-color: $light_gray !important;
  }
}
/deep/ .el-input__inner {
  height: 40px;
  padding: 0 12px;
  background-color: white;
  border: 0 none;
  border-bottom: 1px solid #e6e6e6 !important;
}
/deep/ .el-form-item__error {
  left: 12px;
}

.body {
  background: url('../../assets/img/login.jpg') no-repeat center;
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  .container {
    width: 360px;
    margin: 80px auto;
    .logo {
      background: url('../../assets/img/logo_white.png') no-repeat;
      background-size: 59% auto;
      height: 42px;
      overflow-y: hidden !important;
      margin-bottom: 10px;
    }
    .title {
      font-size: 22px;
      color: $light_gray;
      margin: 0 auto 20px;
      text-align: center;
    }
    .content {
      border-radius: 4px;
      background: #fff;
      padding: 20px;
      border-top: 0;
      color: #666;
      .login-form {
        .submit-btn {
          width: 100%;
          height: 41px;
          font-size: 16px;
          color: white;
          border-radius: 3px;
          background-color: $login_theme;
          display: block;
        }
        .el-button {
          border: 0 none;
        }
      }
    }
    .tip {
      font-size: 10px;
      line-height: 1.5;
    }
  }
}
</style>
