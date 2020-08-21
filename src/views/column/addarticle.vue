<template>
  <div class="compontent-container">
    <el-form ref="ruleForm"
             :rules="rules"
             :model="ruleForm"
             label-position="left"
             label-width="120px">
      <el-form-item label="文章标题:"
                    prop="category_id">
        <el-input v-model="ruleForm.title"
                  placeholder="请填写消息标题" />
      </el-form-item>
      <el-form-item label="文章分类:">
        <el-select v-model="ruleForm.category_id"
                   placeholder="文章分类">
          <el-option v-for="item in categoryList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="文章栏目:">
        <el-select v-model="ruleForm.category_id"
                   placeholder="文章栏目">
          <el-option v-for="item in categoryList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="文章来源:"
                    id="ly">
        <el-select v-model="ruleForm.category_id"
                   placeholder="来源">
          <el-option v-for="item in categoryList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id" />

        </el-select>
        <el-input v-model="ruleForm.title"
                  placeholder="请输入作者"
                  id="auth" />
      </el-form-item>
      <el-form-item label="文章摘要"
                    prop="desc">
        <el-input type="textarea"
                  v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="消息标题："
                    prop="title">
        <el-input v-model="ruleForm.title"
                  placeholder="请填写消息标题" />
      </el-form-item>

      <el-form-item label="消息内容："
                    prop="content">
        <markdown-editor :content.sync="ruleForm.content" />
      </el-form-item>
      <el-form-item label="文章封面">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                   list-type="picture-card"
                   :on-preview="handlePictureCardPreview"
                   :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible"
                   size="tiny">
          <img width="100%"
               :src="dialogImageUrl"
               alt="">
        </el-dialog>

      </el-form-item>
      <el-form-item label="发布日期">
        <div class="block">

          <el-date-picker v-model="value"
                          type="date"
                          placeholder="请选择日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="附件下载">
        <el-upload class="upload-demo"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :on-change="handleChange"
                   :file-list="fileList3">
          <el-button type="primary">添加附件</el-button>
          <div slot="tip"
               class="el-upload__tip">只能上传zip文件，且不超过50MB</div>
        </el-upload>

      </el-form-item>
    </el-form>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px">
      <el-col :span="11"
              style="text-align: right">
        <el-button type="primary">完成</el-button>
      </el-col>
      <el-col :span="2"></el-col>
      <el-col :span="11">
        <el-button>重置</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>


export default {
  name: 'addarticle',

  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      value: '',
      categoryList: [],
      fileList3: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        status: 'finished'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        status: 'finished'
      }],
      ruleForm: {
        category_id: null,
        title: null,
        content: '',
        big_img: null,
        small_img: null,
        desc: ''
      },
      imgType: '',
      rules: {
        category_id: [{ required: true, message: '消息分类不能为空', trigger: 'change' }],
        title: [{ required: true, message: '内容标题不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '内容标题不能为空', trigger: 'blur' }],
        big_img: [{ required: true, message: '请先上传封面大图' }],

      },
      id: this.$route.params && this.$route.params.id
    }
  },
  created () {

  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange (file, fileList) {
      this.fileList3 = fileList.slice(-3);
    }
  }
}
</script>
<style lang="scss" scope>
#ly .el-select,
#ly .el-select .el-input {
  width: 100px;
}

#auth {
  width: 396px;
}
.el-textarea__inner {
  width: 500px;
  height: 200px;
}
</style>