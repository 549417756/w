<template>
  <div class="compontent-container">
    <el-form
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      label-position="left"
      label-width="120px"
    >
      <el-form-item label="消息分类:" prop="category_id">
        <el-select v-model="ruleForm.category_id" placeholder="请选择消息分类">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分类权重:" prop="sort">
        <el-input v-model.number="ruleForm.sort" />
      </el-form-item>
      <el-form-item label="消息标题:" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请填写消息标题" />
      </el-form-item>
      <el-form-item label="接收对象:" prop="grade_id">
        <el-select
          v-model="ruleForm.grade_id"
          @change="fetchGradeClassList('classList', ruleForm.grade_id)"
        >
          <el-option
            v-for="item in gradeListAll"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select v-if="ruleForm.grade_id !== 0" v-model="ruleForm.class_id" style="display: block; margin: 10px 0">
          <el-option
            v-for="item in classList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面缩略图：">
        <el-upload action="" accept="image/*" :http-request="handleUpload" :show-file-list="false">
          <div class="el-upload__text">
            <em>点击上传 (图片格式为：290 * 216)</em>
          </div>
        </el-upload>
        <img v-if="ruleForm.img" :src="ruleForm.img" class="upload-img" />
      </el-form-item>
      <el-form-item label="消息内容:" prop="content">
        <markdown-editor :content.sync="ruleForm.content" />
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center" style="margin-top:30px">
      <el-col :span="11" style="text-align: right">
        <el-button type="primary" @click="handleCreate()">完成</el-button>
      </el-col>
      <el-col :span="2"></el-col>
      <el-col :span="11">
        <el-button @click="reset()">重置</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MixinGrade from '@/tablemixin/grade-class'
import MixinDeleteView from '@/tablemixin/delete-view'
import MixinPublicOss from '@/tablemixin/public-oss'
import { validSort } from '@/utils/validate'

export default {
  name: 'MessageCreate',
  mixins: [MixinGrade, MixinDeleteView, MixinPublicOss],
  data() {
    return {
      categoryList: [],
      ruleForm: {
        category_id: null,
        sort: 50,
        title: null,
        grade_id: null,
        class_id: null,
        img: null,
        content: ''
      },
      rules: {
        category_id: [{ required: true, message: '消息分类不能为空', trigger: 'change' }],
        sort: [{ required: true, validator: validSort, trigger: 'blur' }],
        title: [{ required: true, message: '内容标题不能为空', trigger: 'blur' }],
        grade_id: [{ required: true, message: '接收对象不能为空', trigger: 'change' }],
        content: [{ required: true, message: '内容标题不能为空', trigger: 'blur' }]
      },
      id: this.$route.params && this.$route.params.id
    }
  },
  computed: {
    gradeListAll() {
      return [{ id: 0, name: '全部' }].concat(this.gradeList)
    }
  },
  watch: {
    'ruleForm.grade_id': {
      handler(value) {
        this.fetchGradeClassList('classList', value)
      }
    }
  },
  created() {
    if (this.id) {
      this.$http.fetchMsgClassifyDetail({ id: this.id }).then(({ data }) => {
        this.ruleForm = Object.assign(this.ruleForm, data)
      })
    }
    this.$http.fetchMsgClassifyListNP().then(({ data }) => {
      this.categoryList = data
    })
  },
  methods: {
    handleCreate() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          if (this.id) {
            this.createData('editMessage')
          } else {
            this.createData('createMessage')
          }
        }
      })
    },
    createData(event) {
      this.$http[event](this.ruleForm).then(({ data }) => {
        if (data) {
          this.deleteCurrentView()
        }
      })
    },
    reset() {
      this.$refs['ruleForm'].resetFields()
    },
    async handleUpload(param) {
      const file = param.file
      const name = file.name
      const url = await this.uploadFile(file, name, '封面缩略图上传成功')
      this.ruleForm.img = url
    }
  }
}
</script>
