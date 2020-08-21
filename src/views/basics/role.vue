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
          :prop="prop"
          :label="label"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <svg-icon icon-class="distribute" title="分配" @click.native="permission(row)" />
            <svg-icon icon-class="edit" title="编辑" @click.native="edit(row)" />
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
        <el-form-item label="角色别名" prop="name">
          <el-input v-model="form.name" placeholder="请添加角色别名"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="alias">
          <el-input v-model="form.alias" placeholder="请添加角色名称"></el-input>
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
    <el-dialog
      title="分配权限"
      :visible.sync="dialogPermission"
      center
    >
      <el-tree
        ref="tree"
        :data="PermissionsData"
        show-checkbox
        :props="defaultProps"
        :default-checked-keys="existingPermis"
        node-key="id"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPermission = false">取 消</el-button>
        <el-button type="primary" @click="getCheckedKeys()">确 定</el-button>
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
        { prop: 'id', label: 'ID' },
        { prop: 'alias', label: '名称' },
        { prop: 'created_at', label: '创建时间' }
      ],
      form: {
        name: '',
        alias: '',
        remark: ''
      },
      rules: {
        name: [{ required: true, message: '角色别名不能为空', trigger: 'blur' }],
        alias: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      tableData: [],
      // 从接口获取的全部权限
      roleId: null,
      PermissionsData: [],
      // 存放已有的权限
      existingPermis: null,
      defaultProps: {
        children: 'children',
        label: 'alias'
      }
    }
  },
  methods: {
    edit(row) {
      this.editShow = true
      this.title = '编辑角色'
      this.dialogFormVisible = true
      this.form.name = row.name
      this.form.alias = row.alias
      this.form.remark = row.remark
      this.form.id = row.id
    },
    add() {
      this.editShow = false
      this.title = '添加角色'
      this.dialogFormVisible = true
    },
    // 获取权限列表
    permission(par) {
      this.fetchRolePermission(par.id)
      this.dialogPermission = true
      this.$http.permissionList().then(response => {
        this.roleId = par.id
        this.PermissionsData = response.data
      })
    },
    fetchRolePermission(par) {
      this.$http.fetchRolePermission({ id: par }).then(response => {
        this.existingPermis = response.data
      })
    },
    getTableList() {
      this.$http.roleList().then(response => {
        this.tableData = response.data
      })
    },
    // 创建数据
    createData() {
      if (this.editShow) {
        this.$http.roleEdit(this.form).then(response => {
          this.showNotify(response)
          this.dialogFormVisible = false
        })
      } else {
        this.$http.roleAdd(this.form).then(response => {
          this.showNotify(response)
          this.dialogFormVisible = false
        })
      }
    },
    // 删除数据
    handleDelete(row) {
      this.$http.roleDele({ id: row.id[0] }).then(response => {
        this.showNotify(response)
      })
    },
    // 获取权限分配的id
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys())
      this.$http.permissionDistr({ id: this.roleId, permission: this.$refs.tree.getCheckedKeys() }).then(response => {
        this.showNotify(response)
      })
      this.dialogPermission = false
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
