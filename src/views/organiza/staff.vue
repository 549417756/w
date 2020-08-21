<template>
  <div class="app-container">
    <div v-if="!importShow">
      <div class="filter-head">
        <p>数据筛选</p>
      </div>
      <div class="filter-container">
        <el-form :model="form" class="filter-flex">
          <el-form-item label="输入查询:" class="form-flex">
            <el-input v-model="listQuery.keyword" style="width:200px" placeholder="姓名/手机号/账号" @input="getTableList()"></el-input>
          </el-form-item>
          <el-form-item class="form-flex">
            <el-select v-model="listQuery.department" clearable placeholder="所属部门" class="input" @change="getPosition">
              <el-option
                v-for="item in departmentData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-flex">
            <el-select v-model="listQuery.position" clearable placeholder="员工职务" class="input">
              <el-option
                v-for="item in positionData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-button
              class="pan-btn violet-btn"
              style="height:40px; margin-top: 15px"
              icon="el-icon-upload"
              @click="importShow=true"
            >导入</el-button>
            <el-button
              class="pan-btn violet-btn"
              style="height:40px; margin-top: 15px;"
              icon="el-icon-plus"
              @click="add()"
            >添加</el-button>
          </div>
        </el-form>
      </div>
      <template>
        <el-table
          v-loading="listLoading"
          :data="tableData"
          stripe
          style="width: 100%"
          border
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
      <!-- @pagination="parameter" -->
      </template>
      <el-dialog
        :title="title"
        :visible.sync="dialogFormVisible"
        center
        @close="close()"
      >
        <template>
          <div>
            <el-form
              ref="dataForm"
              :rules="rules"
              :model="form"
              label-width="120px"
              class="form-data"
            >
              <el-form-item label="登录账号:" prop="username">
                <el-input v-model="form.username" placeholder="请输入登录账号" :disabled="editShow"></el-input>
              </el-form-item>
              <el-form-item label="登录密码:" :prop="editShow?'':'password'">
                <el-input v-model="form.password" placeholder="请输入登录密码" type="password"></el-input>
              </el-form-item>
              <el-form-item label="员工工号:" prop="number">
                <el-input v-model="form.number" placeholder="请输入员工工号"></el-input>
              </el-form-item>
              <el-form-item label="员工姓名:" prop="name">
                <el-input v-model="form.name" placeholder="请输入员工姓名"></el-input>
              </el-form-item>
              <el-form-item label="员工性别:" prop="sex">
                <el-radio-group v-model="form.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="手机号码:" prop="mobile">
                <el-input v-model="form.mobile" placeholder="请输入手机号码"></el-input>
              </el-form-item>
              <el-form-item label="所属角色" prop="role_id">
                <el-select v-model="form.role_id" placeholder="角色">
                  <el-option
                    v-for="item in roleArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属部门" prop="department">
                <el-select v-model="form.department" placeholder="部门" @change="getPosition">
                  <el-option
                    v-for="item in departmentData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="当前职务" prop="position">
                <el-select v-model="form.position" placeholder="全部">
                  <el-option
                    v-for="item in positionData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="margin-left:20%;margin-top:50px;">
                <el-button type="primary" @click="handleCreate()">确定</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-dialog>
    </div>
    <Import
      v-if="importShow"
      check-methods="checkStaff"
      import-methods="importStaff"
      :err-arr="errArr"
      :template-ulr="templateUlr"
      :check-data="checkData"
      @cancel="cancel"
    ></Import>
  </div>
</template>
<script>
import { mixinDelete, mixinData, mixinCreate, mixinPaging } from '@/publicfun'
import { validMoblie, validNumber, validName } from '@/utils/validate'
export default {
  mixins: [mixinDelete, mixinData, mixinCreate, mixinPaging],
  data() {
    return {
      listQuery: {
        keyword: '',
        department: '',
        position: ''
      },
      // 部门
      departmentData: [],
      // 职务
      importShow: false,
      positionData: [],
      // 导入 下载模板的url
      templateUlr: 'https://uploads-img.oss-cn-hangzhou.aliyuncs.com/upload-article/yuangong.xlsx',
      // 导入时的错误列表字段
      colConfigs: [
        { prop: 'number', label: '工号' },
        { prop: 'name', label: '员工姓名' },
        // { prop: 'sex', label: '性别' },
        { prop: 'department.name', label: '所属部门' },
        { prop: 'position.name', label: '当前职务' },
        { prop: 'account.username', label: '账号' },
        { prop: 'mobile', label: '手机' }
      ],
      rules: {
        number: [{ required: true, validator: validNumber, trigger: 'blur' }],
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        sex: [{ required: true, message: '不能为空', trigger: 'blur' }],
        department: [{ required: true, message: '不能为空', trigger: 'change' }],
        position: [{ required: true, message: '不能为空', trigger: 'blur' }],
        mobile: [{ required: true, validator: validMoblie, trigger: 'blur' }],
        username: [{ required: true, validator: validName, trigger: 'blur' }],
        password: [{ required: true, message: '不能为空', trigger: 'blur' }],
        role_id: [{ required: true, message: '不能为空', trigger: 'chenge' }]
      },
      value: '',
      dialogFormVisible: false,
      title: '',
      total: 10,
      // 选择课程的开始时间和结束时间
      form: {
        number: '',
        name: '',
        sex: '',
        department: '',
        position: '',
        mobile: '',
        username: '',
        password: '',
        role_id: ''
      },
      roleArr: [],
      tableData: [],
      // 在导入的时候传递错误的列表
      errArr: [
        { prop: 'number', label: '工号' },
        { prop: 'name', label: '姓名' },
        { prop: 'sex', label: '性别' },
        { prop: 'username', label: '登录帐号' },
        { prop: 'department', label: '部门' },
        { prop: 'position', label: '职务' },
        { prop: 'mobile', label: '手机' },
        { prop: 'msg', label: '错误提示' }
      ],
      // 导入时需要查重 和 提示重复的数据
      checkData: [
        // 把表格里所有的账户名提取出来
        { name: 'userNameArr', check: 'username', prompt: '用户名' },
        // 把表格里所有的手机号提取出来
        { name: 'mobileArr', check: 'mobile', prompt: '手机号' },
        // 把表格里的所有的工号提取出来
        { name: 'numberArr', check: 'number', prompt: '工号' }
      ]
    }
  },
  watch: {
    // 如果所属部门 重新请求列表
    'listQuery.department'() {
      this.getTableList()
    },
    // 如果员工职务 重新请求列表
    'listQuery.position'() {
      this.getTableList()
    },
    'form.department'(newName, oldName) {
      if (oldName !== '' && newName !== '') {
        this.form.position = ''
        this.positionData = []
      }
    }
  },
  methods: {
    add() {
      this.dialogFormVisible = !this.dialogFormVisible
      this.title = '新增员工'
      this.roleList()
    },
    edit(row) {
      console.log('row is', row)
      this.editShow = true
      this.dialogFormVisible = !this.dialogFormVisible
      this.title = '编辑员工'
      this.form.number = row.number
      this.form.name = row.name
      this.form.sex = row.sex === '男' ? 1 : 2
      this.form.department = row.department.id
      this.form.position = row.position.id
      this.form.mobile = row.mobile
      this.form.username = row.account.username
      this.form.id = row.id
      this.form.role_id = row.role === null ? '' : row.role.id
      console.log('row id', this.form.role_id)
      // 获取相应的职务
      this.roleList()
      this.getPosition(row.department.id)
    },
    // 获取初始化列表和搜索列表
    getTableList() {
      this.listLoading = true
      this.$http.staffList(this.listQuery).then(response => {
        this.tableData = response.data.lists
        this.total = response.data.total
        this.listLoading = false
        this.departmentGet()
      })
    },
    // 添加或者编辑
    createData() {
      if (this.editShow) {
        this.$http.staffEdit(this.form).then(response => {
          this.showNotify(response)
          this.dialogFormVisible = false
        })
      } else {
        this.$http.addStaff(this.form).then(response => {
          this.showNotify(response)
          this.dialogFormVisible = false
        })
      }
    },
    // 获取部门
    departmentGet() {
      this.$http.getDepartment({ pid: 0 }).then(response => {
        this.departmentData = response.data
      })
    },
    // 获取职务
    getPosition(par) {
      if (par === '' || par === 0) {
        this.listQuery.position = ''
        this.positionData = []
      } else {
        this.listQuery.position = ''
        this.positionData = []
        this.$http.getDepartment({ pid: par }).then(response => {
          this.positionData = response.data
        })
      }
    },
    // 删除
    handleDelete(row) {
      this.$http.deleEdit({ id: row.id[0] }).then(response => {
        this.showNotify(response)
      })
    },
    // 获取角色列表
    roleList(par) {
      this.$http.staffRole().then(response => {
        this.roleArr = response.data
        console.log(response)
      })
    },
    // 关闭弹框的时候
    close() {
      this.editShow = false
      this.$refs['dataForm'].resetFields()
      for (var item in this.form) {
        this.form[item] = ''
      }
      this.positionData = []
    },
    // 组件内点击取消
    cancel() {
      this.importShow = false
      this.getTableList()
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
  width: 150px;
}
</style>
