<template>
  <div class="app-container">
    <div class="filter-head">
      <p>数据筛选</p>
    </div>
    <div class="filter-container">
      <el-button class="float-btn" style="margin-top:20px" icon="el-icon-plus" @click="add()">添加</el-button>
    </div>
    <template>
      <el-table
        :data="tableData"
        stripe
        row-key="id"
        style="width: 100%"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          v-for="{ prop, label } in colConfigs"
          :key="prop"
          :prop="prop"
          :label="label"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <svg-icon icon-class="edit" title="编辑" @click.native="edit(row)" />
            <svg-icon icon-class="add" title="增加" @click.native="add(row)" />
            <svg-icon icon-class="delete" title="删除" @click.native="handleSingleDelete(row)" />
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 添加角色 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      center
      @close="closeDialog()"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="form"
        label-width="115px"
        label-position="left"
      >
        <el-form-item label="模块名" prop="alias">
          <el-input v-model="form.alias" :placeholder="`请填写模块名称`"></el-input>
        </el-form-item>
        <el-form-item label="路由" prop="name">
          <el-input v-model="form.name" :placeholder="`请填写路由名称`"></el-input>
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
      dialogPermission: false,
      title: '',
      keyword: '',
      colConfigs: [
        { prop: 'alias', label: '名称' },
        { prop: 'name', label: '路由' },
        { prop: 'remark', label: '备注信息' }
      ],
      form: {
        name: '',
        alias: '',
        remark: ''
      },
      rules: {
        alias: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '路由不能为空', trigger: 'blur' }]
      },
      tableData: []
    }
  },
  methods: {
    edit(row) {
      this.editShow = true
      this.title = '编辑权限'
      this.dialogFormVisible = true
      this.form.name = row.name
      this.form.alias = row.alias
      this.form.remark = row.remark
      this.form.id = row.id
      delete this.form.pid
    },
    add(row) {
      this.editShow = false
      this.dialogFormVisible = true
      this.title = '添加权限'
      !row ? this.form.pid = 0 : this.form.pid = row.id
    },
    getTableList() {
      this.$http.permissionList().then(response => {
        this.tableData = response.data
      })
    },
    // 创建和编辑数据
    createData() {
      if (this.editShow) {
        this.$http.permissionsEdit(this.form).then(response => {
          this.showNotify(response)
          this.dialogFormVisible = false
        })
      } else {
        this.$http.permissionsAdd(this.form).then(response => {
          this.showNotify(response)
          this.dialogFormVisible = false
        })
      }
    },
    // 删除数据
    handleDelete(row) {
      this.$http.permissionDele({ id: row.id[0] }).then(response => {
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
