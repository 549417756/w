<template>
  <div class="app-container">
    <div class="filter-head">
      <p>数据筛选</p>
    </div>
    <div class="filter-container">
      <span class="filter-item">输入搜索：</span>
      <el-input v-model="keyword" class="input" placeholder="请输入学科" @input="getTableList()"></el-input>
      <el-button class="float-btn" style="margin-top:20px" icon="el-icon-plus" @click="add()">添加</el-button>
    </div>
    <template>
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column prop="name" label="学科" width="180" align="center"></el-table-column>
        <el-table-column prop="create_time" label="添加时间" width="180" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注信息" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <svg-icon icon-class="edit" title="编辑" @click.native="edit(row)" />
            <svg-icon icon-class="delete" title="删除" @click.native="handleSingleDelete(row)" />
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 添加学科 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      @close="closeDialog()"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="form"
        label-width="115px"
        label-position="left"
      >
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name" placeholder="请添加学科名称"></el-input>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input v-model="form.remark" placeholder="请添加备注信息"></el-input>
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
export default {
  mixins: [mixinDelete, mixinData, mixinCreate],
  data() {
    return {
      // 学科的开关
      dialogFormVisible: false,
      title: '',
      keyword: '',
      form: {
        name: '',
        remark: ''
      },
      rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      tableData: []
    }
  },
  methods: {
    edit(row) {
      this.editShow = true
      this.title = '编辑学科'
      this.dialogFormVisible = true
      this.form.name = row.name
      this.form.remark = row.remark
      this.form.id = row.id
    },
    add() {
      delete this.form.id
      this.editShow = false
      this.title = '添加学科'
      this.dialogFormVisible = true
    },
    getTableList() {
      this.$http.subjectList({ keyword: this.keyword }).then(response => {
        this.tableData = response.data
      })
    },
    // 创建数据
    createData() {
      if (this.editShow) {
        this.$http.subjectEdit(this.form).then(response => {
          this.showNotify(response)
          this.dialogFormVisible = false
        })
      } else {
        this.$http.subjectAdd(this.form).then(response => {
          this.showNotify(response)
          this.dialogFormVisible = false
        })
      }
    },
    // 删除数据
    handleDelete(row) {
      this.$http.subjectDele({ id: row.id[0] }).then(response => {
        this.showNotify(response)
      })
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
