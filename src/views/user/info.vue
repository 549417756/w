<template>
  <div class="app-container">
    <el-table :data="list" :row-class-name="tableRowClassName">
      <el-table-column align="center" prop="title"></el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-avatar v-if="scope.row.img" :size="60" :src="scope.row.value">
            <img src />
          </el-avatar>
          <span v-else>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <svg-icon
            v-if="scope.row.option === 'avatar' && user_info.staff"
            icon-class="edit"
            title="更换头像"
            @click.native="show = true"
          />
          <svg-icon
            v-if="scope.row.option === 'password'"
            icon-class="edit"
            title="修改"
            @click.native="showDialog((status = 'password'))"
          />
          <svg-icon
            v-if="scope.row.option === 'alipay' && user_info.staff"
            icon-class="edit"
            title="修改"
            @click.native="showDialog((status = 'alipay'))"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改头像的弹窗 -->
    <!-- :value.sync="show" -->
    <image-cropper
      v-model="show"
      :width="300"
      :height="300"
      lang-type="zh"
      :no-rotate="false"
      @src-file-set="srcFileSet"
      @crop-success="uploadAvatar"
    />
    <data-dialog ref="dialog" :title="title">
      <data-form ref="form" :rules="rules" :rule-form="ruleForm" @createData="createData">
        <template v-if="status === 'alipay'">
          <el-form-item label="支付宝账号：" prop="alipay">
            <el-input v-model="ruleForm.alipay" />
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="新密码：" prop="password">
            <el-input v-model="ruleForm.password" show-password />
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkPass">
            <el-input v-model="ruleForm.checkPass" show-password />
          </el-form-item>
        </template>
      </data-form>
    </data-dialog>
  </div>
</template>
<script>
import 'babel-polyfill'
import ImageCropper from 'vue-image-crop-upload'
import { validMoblie } from '@/utils/validate'
import { mapGetters } from 'vuex'
import MixinPublicOss from '@/tablemixin/public-oss'

export default {
  components: { ImageCropper },
  mixins: [MixinPublicOss],
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      status: 'alipay',
      fileName: '',
      show: false,
      ruleForm: {
        alipay: '',
        password: '',
        checkPass: ''
      },
      rules: {
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        alipay: [{ required: true, validator: validMoblie, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['user_info']),
    list() {
      return [
        {
          title: '工号',
          value: this.user_info.id
        },
        {
          title: '职务',
          value: this.user_info.staff ? this.user_info.staff.position.name : '超级管理员'
        },
        {
          title: '姓名',
          value: this.user_info.staff ? this.user_info.staff.name : this.user_info.nickname
        },
        {
          title: '账号',
          value: this.user_info.username
        },
        {
          title: '头像',
          img: true,
          value: this.user_info.staff
            ? this.user_info.staff.head_img
            : 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
          option: 'avatar'
        },
        {
          title: '用户名',
          value: this.user_info.nickname
        },
        {
          title: '密码',
          value: '......',
          option: 'password'
        },
        {
          title: '支付宝账户',
          value: this.user_info.staff ? this.user_info.staff.pay_account : 0,
          option: 'alipay'
        },
        {
          title: '总收入',
          value: this.user_info.money
        },
        {
          title: '当前余额',
          value: this.user_info.freeze_money
        },
        {
          title: '提现金额',
          value: this.user_info.freeze_money
        }
      ]
    },
    title() {
      return this.status === 'alipay' ? '修改支付宝账号' : '修改密码'
    }
  },
  methods: {
    showDialog() {
      Object.assign(this.$data.ruleForm, this.$options.data().ruleForm)
      this.$refs['dialog'].show() // show dialog
      this.$nextTick(() => {
        this.$refs['form'].clear() // 清除校验
      })
    },
    handleValidate() {
      this.$refs['form'].validate() // 表单校验
    },
    getInfo() {
      const staff = this.user_info.staff
      return {
        id: staff.id,
        name: staff.name,
        number: staff.number,
        sex: staff.sex === '男' ? 1 : 2,
        department: staff.department.id,
        position: staff.position.id,
        mobile: staff.mobile
      }
    },
    createData() {
      const data = this.getInfo()
      if (this.status === 'alipay') {
        data.pay_account = this.ruleForm.alipay
      } else {
        data.password = this.ruleForm.password
      }

      this.$http.staffEdit(data).then(({ data }) => {
        if (data) {
          this.$notify({
            title: `${this.title}`,
            message: '修改成功！',
            type: 'success',
            duration: 5000
          })
          if (this.status === 'alipay') {
            // 更新支付宝账号
            this.user_info.staff.pay_account = data.pay_account
            this.$store.dispatch('user/info', this.user_info)
          }
        }
        this.$refs['dialog'].hidden()
      })
    },
    srcFileSet(fileName) {
      const ext = fileName.split('.')[1]
      this.fileName = new Date().getTime() + '.' + ext
    },
    // 上传头像
    async uploadAvatar(imgDataUrl) {
      const file = this.dataURLtoBlob(imgDataUrl)
      const url = await this.uploadFile(file, this.fileName)
      this.setAvatar(url)
    },
    // base64转blob对象
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], {
        type: mime
      })
    },
    setAvatar(avatar) {
      const data = this.getInfo()
      data.head_img = avatar
      this.$http.staffEdit(data).then(({ data }) => {
        if (data) {
          this.$notify({
            title: '支付宝账号',
            message: `修改成功！`,
            type: 'success',
            duration: 5000
          })
        }
        // 更新头像
        this.user_info.staff.head_img = data.head_img
        this.$store.dispatch('user/info', this.user_info)
        this.show = false
      })
    },
    tableRowClassName({ rowIndex }) {
      return rowIndex & 1 ? 'success-row' : 'warning-row'
    }
  }
}
</script>
<style>
.el-table .warning-row {
  background: #fafaff;
}
</style>
