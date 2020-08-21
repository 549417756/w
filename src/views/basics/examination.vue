<template>
  <div class="app-container">
    <div class="filter-head">
      <p>数据筛选</p>
    </div>
    <div class="filter-container">
      <el-button class="float-btn" style="margin-top:20px" icon="el-icon-plus" @click="add()">添加</el-button>
    </div>
    <template>
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column
          v-for="{ prop, label } in colConfigs"
          :key="prop"
          width="230"
          :prop="prop"
          :label="label"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <svg-icon icon-class="edit" title="编辑" @click.native="edit(row)" />
            <svg-icon icon-class="delete" title="删除" @click.native="handleSingleDelete(row)" />
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.size"
        hidden
        @pagination="parameter"
      />
    </template>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      center
      @close="closeDialog()"
    >
      <el-form
        ref="dataForm"
        :model="form"
        label-position="left"
        label-width="115px"
        :rules="rules"
      >
        <el-form-item label="考试时间" prop="exam_time">
          <el-date-picker
            v-model="form.exam_time"
            type="date"
            placeholder="选择日期时间"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="getTableList()"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="考试对象" prop="grade_id">
          <el-select
            v-model="form.grade_id"
            placeholder="请选年级"
            style="width:120px"
            @change="gitGrade('classArr', form.grade_id)"
          >
            <el-option
              v-for="item in gradeArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-form-item style="display: inline-block">
            <el-select v-model="form.class_id" placeholder="请选班级" style="width:120px; margin-left:7%">
              <el-option v-for="item in classArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item label="考试名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入考试名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreate()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mixinData, mixinDelete, mixinCreate, mixinPaging } from '@/publicfun'
export default {
  mixins: [mixinData, mixinDelete, mixinCreate, mixinPaging],
  data() {
    return {
      // 学科的开关
      dialogFormVisible: false,
      title: '',
      form: {
        exam_time: '',
        name: '',
        class_id: '',
        grade_id: ''
      },
      rules: {
        exam_time: [{ required: true, message: '请选择时间', trigger: 'blur' }],
        name: [{ required: true, message: '请输入考试名称', trigger: 'blur' }],
        grade_id: [{ required: true, message: '请选择年级', trigger: 'blur' }]
      },
      total: 5,
      // 考试对象年级
      gradeArr: [],
      classArr: [],
      colConfigs: [
        { prop: 'exam_time', label: '考试时间' },
        { prop: 'name', label: '考试名称' },
        { prop: 'grade.name', label: '年级' },
        { prop: 'class.name', label: '班级' },
        { prop: 'number', label: '考试编号' },
        { prop: 'create_time', label: '添加时间' }
      ],
      tableData: []
    }
  },
  watch: {
    'form.grade_id'(newName, oldName) {
      if (oldName !== '' && newName !== '') {
        this.form.class_id = ''
        this.classArr = []
      }
    }
  },
  methods: {
    edit(row) {
      this.title = '编辑考试'
      this.editShow = true
      this.dialogFormVisible = true
      this.gitGrade('gradeArr', 0)
      this.form.id = row.id
      for (var item in this.form) {
        this.form[item] = row[item]
      }
    },
    add() {
      delete this.form.id
      this.editShow = false
      this.title = '添加考试'
      this.dialogFormVisible = true
      this.gitGrade('gradeArr', 0)
    },
    getTableList() {
      this.$http.examList(this.listQuery).then(response => {
        this.tableData = response.data.lists
        this.total = response.data.total
      })
    },
    // 获取班级年级
    gitGrade(name, par) {
      this.$http.fetchGradeList({ pid: par }).then(response => {
        if (this.form.grade_id !== '' && par === 0) {
          this.gitGrade('classArr', this.form.grade_id)
        }
        this[name] = response.data
      })
    },
    // 创建和编辑
    createData() {
      if (this.editShow) {
        this.$http.examEdit(this.form).then(response => {
          this.showNotify(response)
          this.dialogFormVisible = false
        })
      } else {
        this.$http.examAdd(this.form).then(response => {
          this.showNotify(response)
          this.dialogFormVisible = false
          console.log(response)
        })
      }
    },
    // 删除
    handleDelete(row) {
      this.$http.examDele({ id: row.id[0] }).then(response => {
        this.showNotify(response)
      })
    }
  }
}
</script>
<style scoped>
.operation {
  color: #7280e6;
  cursor: pointer;
  margin-left: 5px;
}
.input {
  width: 200px;
}
.filter-head {
  height: 50px;
  border: 1px solid #dfe6ec;
  background: #ffffff;
  padding-left: 20px;
  border-bottom: none;
  box-shadow: 0px 1px 3px #e7e7e7;
}
</style>
