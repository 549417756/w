<template>
  <div class="app-container">
    <div class="filter-head">
      <p>数据筛选</p>
    </div>
    <div class="filter-container">
      <span class="filter-item">输入搜索：</span>
      <el-input v-model="keyword" class="input" placeholder="请输入年级" @input="getTableList()"></el-input>
      <el-button class="float-btn" style="margin-top:20px" icon="el-icon-plus" @click="add()">添加</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column align="center" prop="name" label="年级" sortable width="180"></el-table-column>
      <el-table-column align="center" prop="create_time" label="添加时间"></el-table-column>
      <el-table-column align="center" prop="remark" label="备注"></el-table-column>
      <el-table-column align="center" prop="device_no" label="设备号"></el-table-column>
      <el-table-column align="center" prop="operation" label="操作">
        <template slot-scope="{row}">
          <svg-icon icon-class="edit" title="编辑" @click.native="edit(row)" />
          <svg-icon icon-class="delete" title="删除" @click.native="handleSingleDelete(row)" />
          <svg-icon v-if="row.pid == 0" icon-class="add" title="增加班级" @click.native="add(row)" />
          <el-tooltip :content="row.teacher.name" placement="top">
            <svg-icon v-if="row.pid >= 1" icon-class="teacher" title="班主任"></svg-icon>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击添加年级 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      @close="close()"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="form"
        label-width="115px"
        label-position="left"
      >
        <el-form-item :label="label" prop="name">
          <el-input v-model="form.name" :placeholder="place"></el-input>
        </el-form-item>

        <el-form-item v-if="addEditShow" label="班主任" prop="teacher_id">
          <el-select
            v-model="form.teacher_id"
            placeholder="班主任姓名"
          >
            <el-option
              v-for="item in teacherArr"
              :key="item.id"
              :label="item.name"
              :value="item.account_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="addEditShow" label="设备号">
          <el-input v-model="form.device_no" placeholder="班级设备号必须是整数"></el-input>
        </el-form-item>
        <el-form-item v-if="!addEditShow" label="备注信息">
          <el-input v-model="form.remark" placeholder="请添加备注信息"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹出班主任 -->
    <el-dialog :title="title" :visible.sync="className">
      <div>
        <p><span>姓名:{{ teacherName }}</span></p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="className = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mixinDelete, mixinData, mixinCreate } from '@/publicfun'
export default {
  mixins: [mixinDelete, mixinData, mixinCreate],
  data() {
    return {
      keyword: '',
      title: '',
      label: '',
      place: '',
      dialogFormVisible: false,
      dialogEdit: false,
      // 是否显示增加班主任字段
      classShow: false,
      teacherName: '',
      // 判断年级添加和班级年纪是否出现添加班主任
      addEditShow: false,
      className: false,
      teacherArr: [],
      formLabelWidth: '200px',
      form: {
        name: '',
        device_no: '',
        teacher_id: ''
      },
      tableData: [],
      rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        teacher_id: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    edit(row) {
      this.editShow = true
      this.form.id = row.id
      this.form.pid = row.pid
      if (row.pid === 0) {
        this.form.name = row.name
        this.title = '编辑年级'
        this.label = '编辑年级名称'
        this.place = '请输入年级'
        this.classShow = false
        this.addEditShow = false
      } else {
        this.addEditShow = true
        this.form.name = row.name
        this.form.teacher_id = row.teacher_id
        this.form.device_no = row.device_no !== '--' ? row.device_no : ''
        this.classShow = true
        this.title = '编辑班级'
        this.label = '编辑年纪班级'
        this.place = '请输入班级'
        this.teacherData()
      }
      this.dialogFormVisible = true
    },
    // 增加年级和班级
    add(row) {
      if (!row) {
        this.form.pid = 0
        this.title = '增加年级'
        this.label = '年级名称'
        this.place = '请输入年级'
        this.addEditShow = false
      } else {
        this.form.pid = row.id
        this.addEditShow = true
        this.title = '增加班级'
        this.label = '班级名称'
        this.place = '请输入班级'
        this.teacherData()
      }
      this.dialogFormVisible = true
    },
    // 初始化列表
    getTableList() {
      this.$http.gradeList({ keyword: this.keyword }).then(response => {
        this.tableData = response.data
      })
    },
    // 增加班级和年级 编辑班级和年级
    createData() {
      if (this.editShow) {
        this.$http.editGrade(this.form).then(response => {
          this.showNotify(response)
          this.dialogFormVisible = false
        })
      } else {
        this.$http.addGrade(this.form).then(response => {
          this.showNotify(response)
          this.dialogFormVisible = false
        })
      }
    },
    // 获取老师列表
    teacherData() {
      this.$http.classList().then(response => {
        this.teacherArr = response.data
      })
    },
    // 删除
    handleDelete(row) {
      this.$http.staffDele({ id: row.id[0] }).then(response => {
        this.showNotify(response)
      })
    },
    close() {
      this.editShow = false
      this.closeDialog()
    }
  }
}
</script>
<style scoped>
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
