<template>
  <div class="app-container">
    <div class="filter-head">
      <p>数据筛选</p>
    </div>
    <div class="filter-container">
      <el-form
        :model="form"
        class="filter-flex"
      >
        <el-form-item label="输入查询:" class="form-flex">
          <el-input v-model="keyword" style="width:200px" placeholder="部门名称" @input="handleFilter"></el-input>
        </el-form-item>
        <el-button
          class="pan-btn violet-btn"
          style="height:40px; margin-top: 15px; margin-left:250px"
          icon="el-icon-plus"
          @click="add()"
        >添加</el-button>
      </el-form>
    </div>
    <template>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        stripe
        style="width: 100%"
        border
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          v-for="{prop,label} in colConfigs"
          :key="prop"
          align="center"
          :prop="prop"
          :label="label"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <svg-icon icon-class="edit" title="编辑" @click.native="edit(row)" />
            <svg-icon icon-class="delete" title="删除" @click.native="handleSingleDelete(row)" />
            <svg-icon v-if="row.pid === 0" icon-class="add" title="添加职务" @click.native="addJob(row)" />
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      center
      @close="clearValidate"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="form"
        label-width="120px"
        label-position="left"
      >
        <el-form-item v-if="!job" label="部门:" prop="name">
          <el-input v-model="form.name" placeholder="请添部门"></el-input>
        </el-form-item>
        <el-form-item v-if="job" label="职务:" prop="name">
          <el-input v-model="form.name" placeholder="请添职务"></el-input>
        </el-form-item>
        <el-form-item label="描述:">
          <el-input v-model="form.remark" type="textarea" placeholder="请填写描述"></el-input>
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
import { mixinDelete, mixinData, mixinCreate } from '@/publicfun'
// import { departmentList, addDepartment, editDepartment, deleDepartment } from '@/api/department.js'
export default {
  mixins: [mixinDelete, mixinData, mixinCreate],
  data() {
    return {
      value: '',
      // 用来判断是添加部门还是添加职务 两个的文本框字段不一样
      job: false,
      // 用来判断是触发编辑函数还是触发添加函数
      editState: false,
      deleId: '',
      colConfigs: [
        { prop: 'name', label: '部门名称' },
        { prop: 'create_time', label: '添加时间' },
        { prop: 'remark', label: '部门描述' }
      ],
      rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      keyword: '',
      dialogFormVisible: false,
      title: '',
      // 选择课程的开始时间和结束时间
      form: {
        name: '',
        remark: '',
        pid: 0
      },
      tableData: []
    }
  },
  methods: {
    add() {
      this.form.pid = 0
      this.job = false
      this.editState = false
      this.dialogFormVisible = !this.dialogFormVisible
      this.title = '添加部门信息'
    },
    edit(row) {
      this.form.pid = row.pid
      this.form.id = row.id
      this.job = false
      this.editState = true
      this.form.name = row.name
      this.form.remark = row.remark
      this.dialogFormVisible = !this.dialogFormVisible
      this.title = '编辑部门信息'
    },
    addJob(row) {
      this.form.pid = row.id
      this.job = true
      this.editState = false
      this.dialogFormVisible = !this.dialogFormVisible
      this.title = '添加职务信息'
    },
    // 初始化获取列表
    getTableList() {
      this.listLoading = true
      this.$http.departmentList().then(response => {
        this.tableData = response.data
        this.listLoading = false
      })
    },
    // 搜索
    handleFilter(val) {
      this.$http.departmentList({ keyword: this.keyword }).then(response => {
        this.tableData = response.data
        this.listLoading = false
      })
    },
    // 当弹框消失清除校验
    clearValidate() {
      for (var item in this.form) {
        this.form[item] = ''
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 增加或者编辑
    createData() {
      if (this.editState === true) {
        this.editData()
      } else {
        this.$http.addDepartment(this.form).then(response => {
          this.dialogFormVisible = false
          this.showNotify(response)
        })
      }
    },
    // 点击编辑的时候调用
    editData() {
      this.$http.editDepartment(this.form).then(response => {
        this.dialogFormVisible = false
        this.showNotify(response)
      })
    },
    // 删除
    handleDelete(row) {
      console.log(row)
      this.$http.deleDepartment({ id: row.id[0] }).then(response => {
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
.filter-head {
  height: 50px;
  border: 1px solid #dfe6ec;
  background: #ffffff;
  padding-left: 20px;
  border-bottom: none;
  box-shadow: 0px 1px 3px #e7e7e7;
}
.filter-flex {
  display: flex;
  height: 100%;
  width: 95%;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
}
.form-flex {
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 15px;
}
.input {
  display: inline-block;
  width: 100px;
}
</style>
