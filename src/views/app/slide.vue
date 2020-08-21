<template>
  <div class="app-container">
    <div class="card-wrapper">
      <div v-for="(row, index) in list" :key="index" class="card-item">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="row.path" class="image" />
          <div style="padding: 14px;">
            <span>{{ row.sort }}</span>
            <div class="bottom">
              <time class="time">{{ row.create_time }}</time>
              <el-button
                type="text"
                class="button"
                @click="handleDelete(row, 'deleteSlide')"
              >删除</el-button>
              <el-button type="text" class="button" @click="handleUpdate(row)">编辑</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <div v-if="showUpload" class="upload-wrapper">
        <i class="el-icon-plus uploader-icon" @click="handleCreate()"></i>
      </div>
    </div>

    <data-dialog ref="dialog" :title="title">
      <data-form ref="form" :rules="rules" :rule-form="ruleForm" @createData="createData">
        <el-form-item label="分类权重:" prop="sort">
          <el-input v-model.number="ruleForm.sort" />
        </el-form-item>
        <el-form-item label="上传课件:" prop="path">
          <el-upload
            action=""
            accept="image/*"
            :http-request="handleUpload"
            :file-list="fileList"
            list-type="picture"
          >
            <div class="el-upload__text"><em>点击上传</em></div>
          </el-upload>
        </el-form-item>
      </data-form>
    </data-dialog>
  </div>
</template>

<script>
import MixinTable from '@/tablemixin'
import { validSort } from '@/utils/validate'
import MixinPublicOss from '@/tablemixin/public-oss'

export default {
  mixins: [MixinTable, MixinPublicOss],
  data() {
    return {
      ruleForm: {
        sort: 50,
        path: null
      },
      showUpload: false,
      fileList: [],
      rules: {
        sort: [{ required: true, validator: validSort, trigger: 'blur' }],
        path: [{ required: true, message: '请先上传资料文件' }]
      }
    }
  },
  methods: {
    getTableList() {
      this.$http.fetchSlidelList().then(({ data: { lists, total }}) => {
        this.list = lists
        this.total = total
        setTimeout(() => {
          this.showUpload = true
        }, 500)
      })
    },
    async handleUpload(param) {
      const file = param.file
      const name = file.name
      const url = await this.uploadFile(file, name, 'APP轮播图上传成功')
      this.ruleForm.path = url
    },
    // 创建数据
    createData() {
      if ('id' in this.ruleForm) {
        this.$http.editSlide(this.ruleForm).then(response => {
          this.message(response)
        })
      } else {
        this.$http.createSlide(this.ruleForm).then(response => {
          this.message(response)
        })
      }
    }
  }
}
</script>

<style lang="scss">
.card-wrapper {
  display: flex;
  .card-item {
    width: 400px;
    margin-right: 10px;
    .time {
      font-size: 13px;
      color: #999;
    }
    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }
    .button {
      padding: 0 10px;
      float: right;
    }

    .image {
      width: 100%;
      height: 280px;
      display: block;
    }
  }
  .upload-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 353px;
    border-radius: 4px;
    border: 1px dashed #e6ebf5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .uploader-icon {
      font-size: 46px;
      color: #8c939d;
      text-align: center;
      cursor: pointer;
    }
    &:hover {
      border-color: #409eff;
    }
  }
}
</style>
