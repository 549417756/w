<template>
  <div class="app-container">
    <search>
      <el-input v-model="listQuery.keyword" placeholder="标题" />
      <add-button @click.native="handleCreate()" />
    </search>

    <data-table :list="list" :table-fields="tableFields">
      <template v-slot="{ row }">
        <svg-icon icon-class="edit" title="编辑" @click.native="handleUpdate(row)" />
        <svg-icon
          icon-class="detail"
          title="详情"
          @click.native="drawerVisible = true, homeworkInfo = row"
        />
        <svg-icon icon-class="delete" title="删除" @click.native="handleDelete(row, 'deleteHomework')" />
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
        <el-button @click="addHomework">新增</el-button>
        <template v-for="(item, index) in ruleForm.domains">
          <el-form-item
            :key="'1' + index"
            :label="'选择科目' + (index+1)*1"
            :prop="'domains.' + index + '.subject'"
            :rules="{
              required: true, message: '科目不能为空', trigger: 'change'
            }"
          >
            <el-select v-model="item.subject" placeholder="请填写科目名称" @change="change(item.subject, index)">
              <el-option
                v-for="sub in subjectList"
                :key="sub.id"
                :label="sub.name"
                :value="sub.id"
                :disabled="sub.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :key="'2' + index"
            :label="'作业内容' + (index+1)*1"
            :prop="'domains.' + index + '.content'"
            :rules="{
              required: true, message: '作业内容不能为空', trigger: 'blur'
            }"
          >
            <el-input v-model="item.content" type="textarea" :rows="2" placeholder="请填写作业内容"></el-input>
            <el-button v-if="ruleForm.domains.length !== 1" @click="removeHomework(item)">删除</el-button>
          </el-form-item>
        </template>
      </data-form>
    </data-dialog>

    <el-drawer :visible.sync="drawerVisible" direction="rtl" size="30%">
      <div class="detail-wrapper">
        <h3>作业发布时间：{{ homeworkInfo.create_time }}</h3>
        <div class="detail-info">
          <div v-for="item in homeworkInfo.lists" :key="item.id">
            <span>科目：{{ item.subject_name }}</span>
            <span>内容：{{ item.content }}</span>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import mixin from '@/tablemixin'

export default {
  name: 'Homework',
  mixins: [mixin],
  data() {
    return {
      ruleForm: {
        domains: [
          {
            subject: '',
            content: ''
          }
        ]
      },
      id: null,
      edit: false,
      rules: {},
      tableFields: [
        { prop: 'create_time', label: '添加时间' },
        { prop: 'actions', label: '操作' }
      ],
      subjectList: [],
      drawerVisible: false,
      homeworkInfo: {}
    }
  },
  created() {
    // 获取科目列表
    this.$http.fetchSubjectList().then(({ data }) => {
      this.subjectList = data
    })
  },
  methods: {
    getTableList() {
      this.$http.fetchHomeworkList(this.listQuery).then(({ data: { lists, total }}) => {
        this.list = lists
        this.total = total
      })
    },
    // 重写handleUpdate
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.ruleForm.domains.length = 0
      row.lists.forEach(item => {
        this.ruleForm.domains.push({
          subject: item.subject_id,
          content: item.content
        })
      })
      this.id = row.id
      this.showDialog()
    },
    createData() {
      const list = {}
      this.ruleForm.domains.forEach(item => {
        list[item.subject] = item.content
      })
      if (this.dialogStatus === 'update') {
        this.$http.editHomework({ id: this.id, subject: list }).then((response) => {
          if (response) {
            this.message(response)
          }
        })
      } else {
        this.$http.createHomework({ subject: list }).then((response) => {
          if (response) {
            this.message(response)
          }
        })
      }
    },
    change(value, index) {
      if (index === 0) {
        return false
      }
      const temp = []
      this.ruleForm.domains.forEach(item => {
        if (item.subject === value) {
          temp.push(value)
          if (temp.length === 2) {
            this.$message.error('请勿重复添加！')
            item.subject = ''
          }
        }
      })
    },
    // 新增作业
    addHomework() {
      if (this.ruleForm.domains.length + 1 > this.subjectList.length) {
        return false
      } else {
        this.ruleForm.domains.push({
          subject: '',
          content: ''
        })
      }
    },
    // 删除作业
    removeHomework(item) {
      const index = this.ruleForm.domains.indexOf(item)
      if (index !== -1) {
        this.ruleForm.domains.splice(index, 1)
      }
    }
  }
}
</script>
