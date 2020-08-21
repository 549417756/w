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
            style="color: #20d2a0;">后台管理系统</h3>
      </div>
      <el-form ref="loginForm"
               :model="loginForm"
               :rules="loginRules"
               class="login-form"
               auto-complete="on"
               label-position="left"
               autocomplete="off"
               v-show="pwlogin">

        <el-form-item prop="mobile"
                      class="input-container">

          <el-input ref="mobile"
                    v-model="loginForm.mobile"
                    placeholder="请输入手机号"
                    name="mobile"
                    type="text"
                    auto-complete="new-password"
                    tabindex="1"
                    maxlength="11" />
        </el-form-item>

        <el-form-item prop="password"
                      class="input-container ">

          <el-input :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    type="password"
                    placeholder="请输入密码"
                    name="password"
                    auto-complete="new-password"
                    tabindex="2"
                    @keyup.enter.native="handleLogin"
                    autocomplete="off" />

        </el-form-item>
        <el-form-item prop="imageCode"
                      class="input-container mb10">

          <el-input :key="passwordType"
                    ref="imageCode"
                    v-model="loginForm.imageCode"
                    type="text"
                    placeholder="请输入图形验证码"
                    name="imageCode"
                    auto-complete="new-password"
                    tabindex="2"
                    style="width:225px"
                    @keyup.enter.native="handleLogin"
                    autocomplete="off" />
          <img :src="tpsrc"
               @click="tpCode"
               style="    float: right;width: 110px;cursor:pointer"
               alt=""
               title="点击刷新图形验证码">
        </el-form-item>
        <el-form-item class="mb10">
          <el-button type="text"
                     @click="tablogin('1')">手机验证码登录</el-button>
          <!-- <el-button type="text"
                     class="fr"
                     @click="register">快速注册</el-button>
          <el-button type="text"
                     class="fr"
                     @click="forgetPassword">忘记密码</el-button> -->
        </el-form-item>
        <el-button :loading="loading"
                   type="primary"
                   class="login-button"
                   style="background: #20d2a0;"
                   @click.native.prevent="handleLogin">登录</el-button>
      </el-form>
      <el-form ref="loginForm1"
               :model="loginForm1"
               :rules="loginRules1"
               class="login-form"
               auto-complete="on"
               label-position="left"
               autocomplete="off"
               v-show="tellogin">

        <el-form-item prop="mobile"
                      class="input-container">

          <el-input ref="mobile"
                    v-model="loginForm1.mobile"
                    placeholder="请输入手机号"
                    name="mobile"
                    type="text"
                    tabindex="1"
                    maxlength="11" />
        </el-form-item>

        <el-form-item prop="smsCode"
                      class="input-container mb10">

          <el-input style="width:215px;margin-right:20px"
                    placeholder="请输入验证码"
                    maxlength="6"
                    v-model="loginForm1.smsCode" />
          <el-button type="text"
                     style="width:100px">获取手机验证码</el-button>
        </el-form-item>
        <el-form-item class="mb10">
          <el-button type="text"
                     @click="tablogin('2')">账号密码登录</el-button>
          <!-- <el-button type="text"
                     class="fr"
                     @click="register">快速注册</el-button> -->
        </el-form-item>
        <el-button :loading="loading"
                   type="primary"
                   class="login-button"
                   style="background: #20d2a0;    margin-top: 62px;"
                   @click.native.prevent="handleLogin1">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Login',
  data () {
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.toString().length < 6 || value.toString().length > 18) {
        callback(new Error('密码长度为6 - 18个字符'))
      } else {
        if (this.loginForm.password !== '') {
          // this.$refs.loginForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validateimageCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入图形验证码'));
      } else if (value.toString().length < 4) {
        callback(new Error('图形验证码长度为4个字符'))
      } else {
        if (this.loginForm.imageCode !== '') {
          // this.$refs.loginForm.validateField('checkPass');
        }
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
      // 密码表单
      loginForm: {
        mobile: '',
        password: '',
        imageCode: '',
        siteId: '0',
        // siteId: this.$store.state.siteid,
        code: '',
      },
      // 图形验证码
      tpsrc: '',
      // 获取站点
      domain: {
        domainName: ''
      },
      // 短信表单
      loginForm1: {
        mobile: '',
        smsCode: '',
        siteId: '0',
      },
      //密码表单验证规则
      loginRules: {
        mobile: [{ required: true, trigger: 'blur', validator: checkphone }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        imageCode: [{ required: true, trigger: 'blur', validator: validateimageCode }]
      },
      // 短信表单验证规则
      loginRules1: {
        mobile: [{ required: true, trigger: 'blur', validator: checkphone }],
        smsCode: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      passwordType: 'password',
      loading: false
    }
  },
  created () {
    this.getsite()
    this.tpCode()
  },
  mounted () {

    if (this.loginForm.mobile === '') {
      this.$refs.mobile.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {

    tpCode () {
      var that = this
      this.$axios.get('/api/sendVerifyCode', {

      })
        .then(function (response) {
          that.loginForm.code = response.data.data.code
          that.tpsrc = response.data.data.image

        })
        .catch(function (error) {

        });
    },
    getsite () {
      this.domain.domainName = window.location.hostname;
      var that = this
      this.$axios.post('/api/site/findSite', {
        domainName: that.domain.domainName
      })
        .then(function (response) {

          console.log(response.data.data)
          window.localStorage.setItem('siteid', response)
          this.$store.commit('SET_NUM', response.data.data);

        })
        .catch(function (error) {

        });
    },
    tablogin (n) {
      if (n == 1) {
        this.tellogin = true;
        this.pwlogin = false;
      } else {
        this.tellogin = false;
        this.pwlogin = true;
      }

    },
    forgetPassword () {

      this.$router.push({ path: '/forgetPassword' })

    },
    isCellPhone (val) {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },
    register () {
      this.$router.push({ path: '/register' })
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
    },
    handleLogin1 () {
      this.$refs.loginForm1.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/codelogin', this.loginForm1)
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
    },
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
  height: 430px;
  padding: 0 30px 35px;
  margin: auto;
  overflow: hidden;
  z-index: 3;

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
