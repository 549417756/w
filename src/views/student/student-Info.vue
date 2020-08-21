<template>
  <div class="app-container">
    <div v-if="!importShow">
      <div class="filter-head">
        <p>数据筛选</p>
      </div>
      <div class="filter-container">
        <el-form :model="form" class="filter-flex">
          <el-form-item label="输入查询:" class="form-flex">
            <el-input v-model="listQuery.keyword" style="width:200px" placeholder="设备号" @input="getTableList()"></el-input>
          </el-form-item>
          <el-form-item class="form-flex">
            <el-date-picker
              v-model="listQuery.register_time"
              type="month"
              placeholder="入学年份"
              format="yyyy-MM"
              value-format="yyyy-MM"
              @change="getTableList()"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class="form-flex">
            <el-select v-model="listQuery.status" clearable placeholder="状态" class="input" @change="getTableList()">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
        <el-table :data="tableData" stripe style="width: 100%" border>
          <el-table-column
            v-for="{prop,label} in colConfigs"
            :key="prop"
            align="center"
            :prop="prop"
            :label="label"
          ></el-table-column>
          <el-table-column label="操作" align="center" width="400px">
            <template slot-scope="{row}">
              <svg-icon icon-class="edit" title="编辑" @click.native="edit(row)" />
              <svg-icon icon-class="body-tem" title="体温记录" @click.native="health(row,'perature','体温记录')" />
              <svg-icon icon-class="sos" title="SOS记录" @click.native="health(row,'help','SOS记录')" />
              <svg-icon icon-class="attendance" title="考勤记录" @click.native="health(row,'atten','考勤记录')" />
              <svg-icon icon-class="traje" title="轨迹记录" @click.native="health(row,'trajectory','轨迹记录')" />
              <svg-icon icon-class="detail" title="详情" @click.native="$router.push(`./personal-Info/${row.id}`)" />
              <svg-icon icon-class="delete" title="删除" @click.native="handleSingleDelete(row)" />
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
      <!-- 增加和编辑的框 -->
      <el-dialog
        :title="title"
        :visible.sync="dialogFormVisible"
        center
        @close="closeDialog()"
      >
        <template>
          <div>
            <el-form
              ref="dataForm"
              :model="form"
              label-width="120px"
              class="form-data"
              :rules="rules"
            >
              <el-form-item label="学生学号:" prop="number">
                <el-input v-model="form.number" placeholder="请输入学生学号"></el-input>
              </el-form-item>
              <el-form-item label="登录密码:" :prop="editShow ? '' : 'password'">
                <el-input v-model="form.password" placeholder="请输入登录密码" type="password"></el-input>
              </el-form-item>
              <el-form-item label="学生姓名:" prop="name">
                <el-input v-model="form.name" placeholder="请输入学生姓名"></el-input>
              </el-form-item>
              <el-form-item label="入学年份:" prop="register_time">
                <el-date-picker
                  v-model="form.register_time"
                  type="date"
                  placeholder="选择日期时间"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="学生性别:" prop="sex">
                <el-radio-group v-model="form.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="年级:" prop="grade_id">
                <el-select v-model="form.grade_id" placeholder="全部" class="input" @change="getGrade">
                  <el-option
                    v-for="item in gradeArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="班级:" prop="class_id">
                <el-select v-model="form.class_id" placeholder="全部" class="input">
                  <el-option
                    v-for="item in classArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设备号:">
                <el-input v-model="form.device_no" placeholder="请输入设备号"></el-input>
              </el-form-item>
              <el-form-item style="margin-left:20%;margin-top:50px;">
                <el-button type="primary" @click="handleCreate()">确定</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-dialog>
      <!-- 体温/SOS/考勤/轨迹/等 -->
      <el-dialog
        :title="healthTitle"
        :visible.sync="healthShow"
        center
      >
        <template>
          <el-table :data="healthData" stripe style="width: 100%" border>
            <el-table-column></el-table-column>
          </el-table>
          <div style="display: flex;justify-content: center">
            <el-button type="primary" style="margin-top:10px" @click="healthShow = false">确 定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <Import
      v-if="importShow"
      check-methods="checkStudent"
      import-methods="importStudent"
      :err-arr="errArr"
      :template-ulr="templateUlr"
      :check-data="checkData"
      @cancel="cancel"
    ></Import>
  </div>
</template>
<script>
import { mixinData, mixinDelete, mixinCreate, mixinPaging } from '@/publicfun'
import { validNumber } from '@/utils/validate'
export default {
  mixins: [mixinDelete, mixinData, mixinCreate, mixinPaging],
  data() {
    return {
      options: [
        { value: 0, label: '在读' },
        { value: 1, label: '毕业' },
        { value: 2, label: '其他' }
      ],
      colConfigs: [
        { prop: 'number', label: '学号' },
        { prop: 'device_no', label: '设备号' },
        { prop: 'name', label: '姓名' },
        // { prop: 'sex', label: '性别' },
        { prop: 'register_time', label: '入学年份' },
        { prop: 'grade.name', label: '年级' },
        { prop: 'class.name', label: '班级' },
        { prop: 'status', label: '状态' }
      ],

      // 检查错误的字段
      errArr: [
        { prop: 'number', label: '学号' },
        { prop: 'name', label: '学生名称' },
        { prop: 'sex', label: '性别' },
        { prop: 'grade', label: '年级' },
        { prop: 'class', label: '班级' },
        { prop: 'register_time', label: '时间' },
        { prop: 'device_no', label: '设备号' },
        { prop: 'msg', label: '错误提示' }
      ],
      // 检查数据
      checkData: [
        // 把表格里所有的账户名提取出来
        { name: 'userNameArr', check: 'number', prompt: '学生学号' },
        // 把表格里所有的手机号提取出来
        { name: 'device_noArr', check: 'device_no', prompt: '设备号' }
      ],
      rules: {
        name: [{ required: true, message: '请输入学生名称', trigger: 'blur' }],
        number: [{ required: true, validator: validNumber, trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        register_time: [{ required: true, message: '请选择时间', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        grade_id: [{ required: true, message: '请选择年级', trigger: 'blur' }],
        class_id: [{ required: true, message: '请选择班级', trigger: 'blur' }]
      },
      // 导入下载模板的链接
      templateUlr: 'https://uploads-img.oss-cn-hangzhou.aliyuncs.com/upload-article/student.xls',
      total: 0,
      page: 0,
      limit: 0,
      yearData: '',
      importShow: false,
      gradeArr: [],
      classArr: [],
      dialogFormVisible: false,
      healthShow: false,
      healthTitle: '',
      title: '',
      // 选择课程的开始时间和结束时间
      form: {
        number: '',
        password: '',
        name: '',
        register_time: '',
        sex: '',
        grade_id: '',
        class_id: '',
        device_no: ''
      },
      listQuery: {
        register_time: '',
        keyword: '',
        status: ''
      },
      healthData: [],
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
    add() {
      this.editShow = false
      delete this.form.id
      this.dialogFormVisible = !this.dialogFormVisible
      this.title = '新增学生'
      this.getGrade(0)
    },
    edit(row) {
      this.editShow = true
      this.dialogFormVisible = !this.dialogFormVisible
      this.title = '编辑学生'
      this.getGrade(0)
      this.form.id = row.id
      for (var item in this.form) {
        this.form[item] = row[item]
      }
      this.form.sex = row.sex === '男' ? 1 : 2
    },
    getTableList() {
      this.$http.studentList(this.listQuery).then(response => {
        // 把表格中 状态 过滤一遍 并附上相应的值
        this.tableData = response.data.lists.filter((v) => {
          v.status === 0 ? v.status = '在读' : v.status === 1 ? v.status = '毕业' : '其他'
          return response.data.lists
        })
        this.total = response.data.total
        this.page = Number(response.data.currentPage)
        this.limit = Number(response.data.perPage)
      })
    },
    // 获取年级和班级
    getGrade(par) {
      this.$http.fetchGradeList({ pid: par }).then(response => {
        if (par === 0) {
          this.gradeArr = response.data
          if (this.form.grade_id !== '') {
            this.getGrade(this.form.grade_id)
          }
        } else {
          this.classArr = response.data
        }
      })
    },
    // 增加和编辑
    createData() {
      if (this.editShow) {
        console.log('this.form', this.form)
        this.$http.studentEdit(this.form).then(response => {
          this.showNotify(response)
          this.dialogFormVisible = false
        })
      } else {
        this.$http.studentAdd(this.form).then(response => {
          this.showNotify(response)
          this.dialogFormVisible = false
        })
      }
    },
    // 删除
    handleDelete(row) {
      this.$http.studentDele({ id: row.id[0] }).then(response => {
        this.showNotify(response)
      })
    },
    perature() {
    },
    health(row, run, title) {
      this[run]()
      this.healthTitle = title
      this.healthShow = true
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
