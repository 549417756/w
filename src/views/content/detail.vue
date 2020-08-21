<template>
  <div class="compontent-container">
    <el-form ref="ruleForm"
             :rules="rules"
             :model="ruleForm"
             label-position="left"
             label-width="120px">
      <el-form-item label="推送分类:"
                    prop="category_id">
        <el-select v-model="ruleForm.category_id"
                   placeholder="请选择消息分类">
          <el-option v-for="item in categoryList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="消息标题："
                    prop="title">
        <el-input v-model="ruleForm.title"
                  placeholder="请填写消息标题" />
      </el-form-item>
      <el-form-item label="封面大图："
                    prop="big_img">
        <el-upload action=""
                   accept="image/*"
                   :http-request="handleUpload"
                   :show-file-list="false">
          <div class="el-upload__text"
               @click="imgType = 'big_img'">
            <em>点击上传 (图片格式为：1080 * 404)</em>
          </div>
        </el-upload>
        <img v-if="ruleForm.big_img"
             :src="ruleForm.big_img"
             class="upload-img" />
      </el-form-item>
      <el-form-item label="封面缩略图："
                    prop="small_img">
        <el-upload action=""
                   accept="image/*"
                   :http-request="handleUpload"
                   :show-file-list="false">
          <div class="el-upload__text"
               @click="imgType = 'small_img'">
            <em>点击上传 (图片格式为：290 * 216)</em>
          </div>
        </el-upload>
        <img v-if="ruleForm.small_img"
             :src="ruleForm.small_img"
             class="upload-img" />
      </el-form-item>
      <el-form-item label="消息内容："
                    prop="content">
        <markdown-editor :content.sync="ruleForm.content" />
      </el-form-item>
    </el-form>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px">
      <el-col :span="11"
              style="text-align: right">
        <el-button type="primary"
                   @click="handleCreate()">完成</el-button>
      </el-col>
      <el-col :span="2"></el-col>
      <el-col :span="11">
        <el-button @click="reset()">重置</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MixinDeleteView from '@/tablemixin/delete-view'
// import MixinPublicOss from '@/tablemixin/public-oss'

export default {
  name: 'ContentCreate',
  // mixins: [MixinDeleteView, MixinPublicOss],
  data () {
    return {
      categoryList: [],
      ruleForm: {
        category_id: null,
        title: null,
        content: '',
        big_img: null,
        small_img: null
      },
      imgType: '',
      rules: {
        category_id: [{ required: true, message: '消息分类不能为空', trigger: 'change' }],
        title: [{ required: true, message: '内容标题不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '内容标题不能为空', trigger: 'blur' }],
        big_img: [{ required: true, message: '请先上传封面大图' }],
        small_img: [{ required: true, message: '请先上传封面缩略图' }]
      },
      id: this.$route.params && this.$route.params.id
    }
  },
  created () {
    if (this.id) {
      this.$http.fetchContentInfoDetail({ id: this.id }).then(({ data }) => {
        this.ruleForm = Object.assign(this.ruleForm, data)
      })
    }
    this.$http.fetchContentClassifyListNP().then(({ data }) => {
      this.categoryList = data
    })
  },
  methods: {
    handleCreate () {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          if (this.id) {
            this.createData('editContentInfo')
          } else {
            this.createData('createContentInfo')
          }
        }
      })
    },
    createData (event) {
      this.$http[event](this.ruleForm).then(({ data }) => {
        if (data) {
          this.deleteCurrentView()
        }
      })
    },
    reset () {
      this.$refs['ruleForm'].resetFields()
    },
    async handleUpload (param) {
      const message = this.imgType === 'big_img' ? '封面大图上传成功' : '封面缩略图上传成功'
      const file = param.file
      const name = file.name
      const url = await this.uploadFile(file, name, message)
      this.ruleForm[this.imgType] = url
    }
  }
}
</script>
