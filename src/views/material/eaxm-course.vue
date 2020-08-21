<template>
  <div class="app-container">
    <search>
      <el-input v-model="listQuery.keyword" placeholder="素材名称" />
      <el-select v-model="listQuery.type" clearable placeholder="类型">
        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.grade" clearable placeholder="适用年级">
        <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.subject" clearable placeholder="选择科目">
        <el-option v-for="item in subjectList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <add-button @click.native="handleCreate()" />
    </search>

    <data-table :list="list" :table-fields="tableFields">
      <template v-slot="{ row }">
        <svg-icon icon-class="edit" title="编辑" @click.native="handleUpdate(row)" />
        <svg-icon icon-class="delete" title="删除" @click.native="handleDelete(row, 'deleteCourseExam')" />
        <svg-icon icon-class="download" title="下载" @click.native="handleDownload(row.url)" />
      </template>
    </data-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getTableList"
    />

    <data-dialog ref="dialog" :title="title">
      <data-form ref="form" :rules="rules" :rule-form="ruleForm" @createData="createData">
        <el-form-item label="素材类型:" prop="type">
          <el-select v-model="ruleForm.type">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
          <div class="warning-container">
            <el-alert
              :title="uploadType.message"
              type="warning"
              :closable="false"
              show-icon
            ></el-alert>
          </div>
        </el-form-item>
        <el-form-item label="课件:" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="选择科目:" prop="subject_id">
          <el-select v-model="ruleForm.subject_id">
            <el-option v-for="item in subjectList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="教材版本:" prop="textbook">
          <el-select v-model="ruleForm.textbook">
            <el-option v-for="item in bookList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="适用年级:" prop="grade_id">
          <el-select v-model="ruleForm.grade_id">
            <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="接收对象:" prop="receive_type">
          <el-select v-model="ruleForm.receive_type" clearable>
            <el-option v-for="item in acceptList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
          <template v-if="!hiddenOuter">
            <el-select v-model="ruleForm.receive_grade" placeholder="接收年级" style="margin: 5px 0" clearable>
              <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
            <el-select v-model="ruleForm.receive_class" placeholder="接收班级" clearable>
              <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="收费:" prop="price">
          <el-input v-model.number="ruleForm.price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="上传课件:" prop="url">
          <el-upload
            action=""
            :accept="uploadType.type"
            :http-request="handleUpload"
            :show-file-list="false"
          >
            <div class="el-upload__text"><em>点击上传</em></div>
          </el-upload>
          <el-progress v-if="showProgress" :percentage="percentage"></el-progress>
        </el-form-item>
      </data-form>
    </data-dialog>
  </div>
</template>

<script>
import { Message, Loading } from 'element-ui'
import MixinTable from '@/tablemixin'
import MixinGrade from '@/tablemixin/grade-class'
import MixinPrivateOss from '@/tablemixin/private-oss'
import { privateHost } from '@/config'

export default {
  name: 'TradeSetting',
  mixins: [MixinTable, MixinGrade, MixinPrivateOss],
  data() {
    return {
      listQuery: {
        type: null,
        grade: null,
        subject: null
      },
      typeList: [
        { id: 1, name: '试卷' },
        { id: 2, name: '课件' }
      ],
      acceptList: [
        { id: 0, name: '全部' },
        { id: 1, name: '本校' },
        { id: 2, name: '外校' }
      ],
      subjectList: [],
      bookList: [],
      tableFields: [
        { prop: 'id', label: '课件编号' },
        { prop: 'name', label: '课件名称' },
        { prop: 'grade.name', label: '适用年级' },
        { prop: 'subject.name', label: '科目' },
        { prop: 'textbook.name', label: '教材版本' },
        { prop: 'type.name', label: '类型' },
        { prop: 'create_time', label: '添加时间' },
        { prop: 'actions', label: '操作' }
      ],
      ruleForm: {
        name: null,
        subject_id: null,
        textbook: null,
        grade_id: null,
        receive_type: 0,
        receive_grade: null,
        receive_class: null,
        price: 0,
        type: 2,
        url: null
      },
      rules: {
        name: [{ required: true, message: '课件不能为空', trigger: 'blur' }],
        subject_id: [{ required: true, message: '选择科目不能为空', trigger: 'change' }],
        textbook: [{ required: true, message: '教材版本不能为空', trigger: 'change' }],
        grade_id: [{ required: true, message: '适用年级不能为空', trigger: 'change' }],
        receive_type: [{ required: true, message: '接收对象不能为空', trigger: 'change' }],
        price: [{ required: true, message: '收费不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '素材类型不能为空', trigger: 'change' }],
        url: [{ required: true, message: '请先上传资料文件' }]
      },
      courseTip: {
        type: 'video/*, .pdf, .ppt, .pptx, .doc, .docx',
        message: '课件可以上传的格式为 视频 ptf ppt pptx word'
      },
      examTip: {
        type: '.pdf, .ppt, .pptx, .doc, .docx',
        message: '试卷可以上传的格式为 ptf ppt ppt word'
      },
      percentage: 0,
      showProgress: false
    }
  },
  computed: {
    hiddenOuter() {
      return this.ruleForm.receive_type === 2 || this.ruleForm.receive_type === 0
    },
    uploadType() {
      return this.ruleForm.type === 1 ? this.examTip : this.courseTip
    }
  },
  watch: {
    'ruleForm.receive_grade': {
      handler(value) {
        this.fetchGradeClassList('classList', value)
      }
    }
  },
  created() {
    // 获取科目列表
    this.$http.fetchSubjectList().then(({ data }) => {
      this.subjectList = data
    })
    // 获取教材版本
    this.$http.fetchTextbook().then(({ data }) => {
      this.bookList = data
    })
  },
  methods: {
    getTableList() {
      this.$http.fetchCourseExamList(this.listQuery).then(({ data: { lists, total }}) => {
        lists.map(item => {
          const id = item.type
          return this.$set(item, 'type', { id, name: this.typeList[id - 1].name })
        })
        this.list = lists
        this.total = total
      })
    },
    // 创建数据
    createData() {
      if (this.ruleForm.receive_type === 2 && this.ruleForm.receive_grade === null) {
        this.ruleForm.receive_grade = 0
        this.ruleForm.receive_class = 0
      }
      if ('id' in this.ruleForm) {
        this.$http.editCourseExam(this.ruleForm).then(response => {
          this.message(response)
        })
      } else {
        this.$http.createCourseExam(this.ruleForm).then(response => {
          this.message(response)
        })
      }
    },
    // 上传
    async handleUpload(param) {
      const message = '资料文件上传成功'
      const url = await this.uploadFile(param, message)
      this.ruleForm.url = url
    },
    // 下载
    handleDownload(name) {
      const loading = Loading.service({
        lock: true,
        text: '下载中请稍后....',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        // 获取文件名
        const encodeName = name.split(privateHost)[1].split('?')[0]
        const url = decodeURI(encodeName)
        // 文件下载
        const downloadUrl = this.privateStore.signatureUrl(url, {
          response: {
            'content-disposition': `attachment; filename="${url}"`
          }
        })
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = url
        a.click()
        loading.close()
      } catch {
        Message({
          message: '下载失败请稍后再试',
          type: 'error'
        })
        loading.close()
      }
    }
  }
}
</script>
