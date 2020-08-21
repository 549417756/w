<template>
  <div class="app-container">
    <div class="filter-head">
      <p>数据筛选</p>
    </div>
    <div class="filter-container">
      <el-form :model="form" class="filter-flex">
        <el-form-item label="输入搜索:" class="form-flex">
          <el-input v-model="queryData.keyword" style="width:200px" placeholder="名称" @input="handleFilter"></el-input>
        </el-form-item>
        <region-query
          @provinceList="provinceList"
        ></region-query>
        <el-button
          v-if="type === '1' && type == userType.type"
          class="pan-btn violet-btn"
          style="height:40px; margin-top: 15px; margin-left:250px"
          icon="el-icon-plus"
          @click="add()"
        >添加</el-button>
      </el-form>
    </div>
    <template>
      <el-table v-loading="listLoading" :data="tableData" stripe style="width: 100%" border>
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
            <svg-icon v-if="type === '1' && type == userType.type" icon-class="delete" title="删除" @click.native="handleSingleDelete(row)" />
            <svg-icon v-if="type === '1' && type == userType.type" icon-class="go" title="进入" @click.native="switchSchool(row.id)" />
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="page"
        :limit.sync="limit"
        hidden
        @pagination="parameter"
      />
    </template>
    <!-- @pagination="pagination" -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" center @close="close()">
      <region-query
        label="选择地区:"
        status
        label-width="120px"
        :operation="operation"
        :region-province="regionProvince"
        :region-area="regionArea"
        :region-city="regionCity"
        @provinceList="queryArea"
      ></region-query>
      <el-form
        ref="dataForm"
        :model="form"
        label-width="120px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item label="学校名称:" prop="name">
          <el-input v-model="form.name" placeholder="请添加学校名称"></el-input>
        </el-form-item>
        <el-form-item label="教材版本:" prop="textbook">
          <el-select v-model="form.textbook">
            <el-option
              v-for="item in bookArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="operation != 'edit'" label="学校主账号:" prop="username">
          <el-input v-model="form.username" placeholder="请填写学校主账号"></el-input>
        </el-form-item>
        <el-form-item v-if="operation != 'edit'" label="学校密码:" prop="password">
          <el-input v-model="form.password" placeholder="请填写学校密码" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="handleCreate()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mixinDelete, mixinCreate, mixinData } from '@/publicfun'
import { validNumber, validPassWorld } from '@/utils/validate'
import { setToken, getToken } from '@/utils/auth'
export default {
  mixins: [mixinDelete, mixinCreate, mixinData],
  data() {
    return {
      colConfigs: [
        { prop: 'id', label: '学校编号' },
        { prop: 'province.name', label: '省' },
        { prop: 'city.name', label: '市' },
        { prop: 'area.name', label: '县' },
        { prop: 'name', label: '学校名称' },
        { prop: 'account.username', label: '主账号' }
      ],
      rules: {
        name: [{ required: true, message: '请输入学校名称', trigger: 'blur' }],
        username: [{ required: true, validator: validNumber, trigger: 'blur' }],
        password: [{ required: true, validator: validPassWorld, trigger: 'blur' }],
        textbook: [{ required: true, message: '请选择学校教材版本', trigger: 'change' }]
      },
      value: '',
      dialogFormVisible: false,
      title: '',
      bookArr: [
        { id: 1, name: '苏教版' },
        { id: 2, name: '人教版' }
      ],
      // 查询编号名称 里面存的有省市县id 和查询的内容
      queryData: {
        keyword: ''
      },
      query: '',
      // 分页总条数
      total: 0,
      // 当前页
      page: null,
      limit: null,
      regionProvince: '',
      regionArea: '',
      regionCity: '',
      operation: '',
      form: {
        name: '',
        username: '',
        password: '',
        province: '',
        city: '',
        area: '',
        textbook: ''
      },
      tableData: []
    }
  },
  computed: {
    type() {
      return getToken('type')
    },
    userType() {
      return this.$store.getters.user_info
    }
  },
  methods: {
    add(row) {
      this.dialogFormVisible = !this.dialogFormVisible
      this.title = '添加学校信息'
      this.operation = 'shut'
      this.regionProvince = 0
      this.regionArea = 0
      this.regionCity = 0
      this.form.name = ''
    },
    edit(row) {
      this.dialogFormVisible = !this.dialogFormVisible
      this.title = '编辑学校信息'
      this.operation = 'edit'
      this.form.textbook = row.textbook
      this.form.id = row.id
      this.form.province = row.province.id
      this.form.area = row.area === null ? row.area : row.area.id
      this.form.city = row.city === null ? row.city : row.city.id
      this.form.name = row.name
      this.regionProvince = row.province.id
      this.regionArea = row.area === null ? row.area : row.area.id
      this.regionCity = row.city === null ? row.city : row.city.id
      this.form.name = row.name
    },
    provinceList(response) {
      this.queryData[response.parameter] = response.item
      if (response.parameter === 'province') {
        this.queryData.city = ''
        this.queryData.area = ''
      } else if (response.parameter === 'city') {
        this.queryData.area = ''
      }
      this.$http.schoolList(this.queryData).then(res => {
        this.tableData = res.data.lists
      })
    },
    // 页面刚加载 获取列表
    getTableList() {
      this.listLoading = true
      this.$http.schoolList(this.listQuery).then(response => {
        this.tableData = response.data.lists
        this.total = response.data.total
        this.page = response.data.currentPage
        this.limit = Number(response.data.perPage)
        this.listLoading = false
      })
    },
    // 请求的创建学校的区域id
    queryArea(response) {
      // 获得编辑的省市县id
      this.form[response.parameter] = response.item
      response.parameter === 'province' ? this.form.area = '' : 'aa'
      if (response.parameter === 'province') {
        this.form.area = ''
        this.form.city = ''
        this.form.city = 0
        this.form.area = 0
      } else if (response.parameter === 'city') {
        this.form.city = ''
        this.form.area = 0
      }
      this.form[response.parameter] = response.item
    },
    // 添加学校或者编辑学校
    createData() {
      if (this.form.province !== '') {
        if (this.operation === 'edit') {
          this.form.name = this.form.name
          this.form.number = 0
          this.editData()
        } else {
          this.$http.addSchool(this.form).then(response => {
            this.showNotify(response)
            this.operation = 'remove'
            this.form.name = ''
            this.form.password = ''
            this.form.username = ''
            this.dialogFormVisible = false
          })
        }
      } else {
        this.showNotify({ msg: '请检查地区是否选择' })
      }
    },
    // 取消
    cancel() {
      this.operation = 'remove'
      this.form.name = ''
      this.form.password = ''
      this.form.username = ''
      this.dialogFormVisible = false
      this.clearValidate('dataForm')
    },
    // 删除
    handleDelete(row) {
      this.$http.deleteSchool({ id: row.id[0] }).then(response => {
        this.showNotify(response)
      })
    },
    // 关闭弹框的时候
    close() {
      this.operation = 'remove'
      this.closeDialog()
    },
    // 点击分页的页数触发
    parameter(par) {
      this.listQuery.page = par.page
      this.listQuery.size = par.limit
      this.listQuery.keyword = this.queryData.keyword
      this.listQuery.province = this.queryData.province
      this.listQuery.city = this.queryData.city
      this.listQuery.area = this.queryData.area
      this.getTableList()
    },
    // 输入查询
    handleFilter() {
      this.queryData.size = this.limit
      this.$http.schoolList(this.queryData).then(response => {
        this.tableData = response.data.lists
        this.total = response.data.total
      })
    },
    // 当弹框消失清除校验
    clearValidate(form) {
      this.$nextTick(() => {
        this.$refs[form].clearValidate()
      })
    },
    // 编辑
    editData() {
      this.$http.editSchool(this.form).then(response => {
        this.showNotify(response)
        this.dialogFormVisible = !this.dialogFormVisible
      })
    },
    switchSchool(par) {
      this.$http.goSchool({ id: par }).then(response => {
        setToken('Token', response.data.access_token)
        this.$router.push('/')
        location.reload()
      })
    }
    // 切换到指定学校
  }
}
</script>
<style lang="scss" scoped>
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
  width: 100%;
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
</style>
