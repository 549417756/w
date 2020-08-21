<template>
  <div class="app-container">
    <el-tag class="mb10">本单位编码：11111</el-tag>
    <el-tag type="danger">绑定单位编码的用户，可查看该单位发布的项目</el-tag>
    <el-card class="box-card mb10">
      <div slot="header"
           class="clearfix">
        <span>手机号</span>

      </div>
      <div class="clearfix">
        <span class="name">1333333333333333</span>
        <el-button class="fr"
                   type="text"
                   @click="dialogFormVisible = true">更改</el-button>
      </div>
    </el-card>
    <el-card class="box-card mb10">
      <div slot="header"
           class="clearfix">
        <span>密码</span>

      </div>
      <div class="clearfix">
        <span class="name">已设置 可以根据密码登录</span>
        <el-button class="fr"
                   type="text"
                   @click="dialogFormVisible1 = true">更改</el-button>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span>微信</span>

      </div>
      <div class="clearfix">
        <span class="name">微信名字</span>
        <el-button class="fr"
                   type="text">解绑</el-button>
      </div>
    </el-card>
    <!-- 手机号 -->
    <el-dialog title="更改手机号"
               :visible.sync="dialogFormVisible"
               append-to-body
               top="0"
               width="550px">
      <el-form label-width="80px">
        <el-form-item label="手机号">
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input placeholder="请输入验证码"
                    v-model="form.phone"
                    style="width:300px"></el-input>
          <el-button type="primary"
                     @click="getVerify"
                     :disabled="disabled=!show">
            <span v-show="show">获取验证码</span>
            <span v-show="!show"
                  class="count">{{count}} s</span>
          </el-button>
        </el-form-item>
        <el-form-item class="text-center">
          <el-button type="primary">添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 更改密码 -->
    <el-dialog title="更改密码"
               :visible.sync="dialogFormVisible1"
               append-to-body
               top="0"
               width="550px">
      <el-form label-width="80px">
        <el-form-item label="手机号">
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input placeholder="请输入验证码"
                    v-model="form.phone"
                    style="width:300px"></el-input>
          <el-button type="primary"
                     @click="getVerify"
                     :disabled="disabled=!show">
            <span v-show="show">获取验证码</span>
            <span v-show="!show"
                  class="count">{{count}} s</span>
          </el-button>
        </el-form-item>
        <el-form-item label="旧密码"
                      prop="pass">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码"
                      prop="checkPass">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"
                      prop="checkPass">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item class="text-center">
          <el-button type="primary">添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogFormVisible: false,
      dialogFormVisible1: false,
      show: true,
      count: "", // 初始化次数
      timer: null,
      form: {
        phone: ''
      }
    }
  },
  methods: {
    getVerify () {
      // 验证手机号
      if (this.checkPhone() == false) {
        return false;
      } else {
        const TIME_COUNT = 60; //更改倒计时时间
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer); // 清除定时器
              this.timer = null;
            }
          }, 1000);
        }
      }
    },
    checkPhone () {
      let phone = this.form.phone;
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        this.$message.error("请填写正确的手机号");
        return false;
      }
    }

  }
}
</script>
<style lang="scss" >
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
.box-card /deep/ .el-card__body {
  padding: 0 20px;
}
.box-card /deep/ .el-card__body .name {
  line-height: 40px;
}
</style>