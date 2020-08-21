<template>
  <div class="bglogin">
    <img :src="imgsrc"
         alt=""
         class="bgimg">
    <div class="login-container">
      <img :src="logo"
           alt=""
           class="logo">
      <div class="title-container">
        <h3 class="title"
            style="color: #20d2a0;">好医生云课堂后台管理系统</h3>
      </div>
      <el-form ref="loginForm"
               :model="loginForm"
               :rules="loginRules"
               class="login-form"
               auto-complete="on"
               label-position="left"
               autocomplete="off">

        <el-form-item prop="username"
                      class="input-container">

          <el-input ref="username"
                    v-model="loginForm.username"
                    placeholder="请输入手机号"
                    name="username"
                    auto-complete="new-password"
                    type="text"
                    tabindex="1"
                    maxlength="11" />
        </el-form-item>
        <el-form-item prop="code"
                      class="input-container mb20">

          <el-input style="width:215px;margin-right:20px"
                    placeholder="请输入验证码"
                    v-model="loginForm.code"
                    maxlength="6" />
          <el-button type="text"
                     style="width:100px">获取手机验证码</el-button>
        </el-form-item>
        <el-form-item prop="password"
                      class="input-container mb20">

          <el-input :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    type="password"
                    auto-complete="new-password"
                    placeholder="请输入密码"
                    name="password"
                    tabindex="2"
                    @keyup.enter.native="handleLogin"
                    autocomplete="off" />

        </el-form-item>
        <el-form-item prop="password2"
                      class="input-container mb20">

          <el-input :key="passwordType"
                    ref="password"
                    v-model="loginForm.password2"
                    type="password"
                    placeholder="请再次输入密码"
                    name="password"
                    auto-complete="new-password"
                    tabindex="2"
                    @keyup.enter.native="handleLogin"
                    autocomplete="off" />

        </el-form-item>

        <el-button :loading="loading"
                   type="primary"
                   class="login-button"
                   style="background: #20d2a0;"
                   @click.native.prevent="handleLogin">确定重置</el-button>
      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'forgetPassword',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.loginForm.password !== '') {
          this.$refs.loginForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.loginForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var checkphone = (rule, value, callback) => {
      // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      if (value == "") {
        callback(new Error("请输入手机号"));
      } else if (!this.isCellPhone(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (value.toString().length < 6) {
        callback(new Error('验证长度为6个字符'))
      } else {

        callback();
      }
    };
    return {
      imgsrc: require('../../assets/images/bg.png'),
      logo: require('../../assets/images/logo.jpg'),
      tellogin: false,
      pwlogin: true,
      loginForm: {
        username: '',
        password: '',
        password2: '',
        code: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: checkphone }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        code: [{ required: true, trigger: 'blur', validator: validateCode }],
        password2: [
          { validator: validatePass2, trigger: 'blur', required: true, }
        ],

      },
      passwordType: 'password',
      loading: false
    }
  },
  mounted () {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {


    forgetPassword () {
      this.$router.path('/forgetPassword')
    },
    isCellPhone (val) {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },

    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: '/site' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: rgba(255, 255, 255, 0.1);
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;

    position: relative;

    input {
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
    }
  }

  .el-form-item {
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #333;
.bglogin {
  width: 100%;
  height: 100%;
  position: relative;
}
.bgimg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}
.logo {
  margin: 0 auto;
  display: block;
  margin-top: 20px;
}
.login-container {
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  height: 450px;
  padding: 0 30px 35px;
  margin: auto;
  overflow: hidden;

  -moz-box-shadow: 0px 0px 10px #333333;
  -webkit-box-shadow: 0px 0px 10px #333333;
  box-shadow: 0px 0px 10px #333333;

  .login-form {
    .rulaiyun-logo {
      height: 53px;
      width: 182px;
      margin: 0 auto;
    }
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 25px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .login-button {
    width: 100%;
  }
}
</style>
