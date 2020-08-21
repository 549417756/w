<template>
  <div class="app-container">
    <div v-if="!importShow">
      <div class="filter-head">
        <p>数据筛选</p>
      </div>
      <div class="filter-container">
        <el-form ref="queryData"
                 :rules="rules"
                 :model="listQuery"
                 class="filter-flex"
                 inline-message>
          <el-form-item label="输入查询:"
                        class="form-flex">
            <el-input v-model="listQuery.keyword"
                      placeholder="姓名"
                      @input="getScoreList()"></el-input>
          </el-form-item>
          <el-form-item label="年级:"
                        class="form-flex"
                        prop="grade">
            <el-select v-model="listQuery.grade"
                       clearable
                       placeholder="年级"
                       class="input"
                       @change="getGrade('classArr',listQuery.grade)">
              <el-option v-for="item in gradeArr"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级:"
                        class="form-flex"
                        prop="class">
            <el-select v-model="listQuery.class"
                       clearable
                       placeholder="班级"
                       class="input"
                       @change="examName()">
              <el-option v-for="item in classArr"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="考试名称:"
                        class="form-flex"
                        prop="exam">
            <el-select v-model="listQuery.exam"
                       clearable
                       placeholder="考试名称"
                       class="input">
              <el-option v-for="item in examArr"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-button @click="queryData('getScoreList')">确定</el-button>
            <el-button @click="queryData('ranking')">更新排名
            </el-button>
            <el-button icon="el-icon-upload"
                       @click="importShow=true">导入</el-button>
            <el-button icon="el-icon-plus"
                       @click="add()">添加</el-button>
          </div>
        </el-form>
      </div>
      <template>
        <el-table v-loading="listLoading"
                  :data="tableData"
                  stripe
                  style="width: 100%"
                  border>
          <el-table-column v-for="{prop,label} in colConfigs"
                           :key="prop"
                           align="center"
                           :prop="prop"
                           :label="label"></el-table-column>
          <el-table-column label="科目"
                           align="center">
            <template slot-scope="{row}">
              <span class="operation"
                    @click="lookScore(row)">查看考试科目</span>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="{row}">
              <svg-icon icon-class="edit"
                        title="编辑"
                        @click.native="edit(row)" />
              <svg-icon icon-class="delete"
                        title="删除"
                        @click.native="handleSingleDelete(row)" />
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0"
                    :total="total"
                    :page.sync="listQuery.page"
                    :limit.sync="listQuery.size"
                    hidden
                    @pagination="parameter" />
      </template>
      <el-dialog :title="title"
                 :visible.sync="dialogFormVisible"
                 center
                 @close="close()">
        <template>
          <div>
            <el-form ref="dataForm"
                     :model="form"
                     label-width="120px"
                     class="form-data">
              <el-form-item prop="number"
                            label="学生学号:"
                            :rules="[
                  { required: true, message: '请输入学生学号', trigger: 'blur' },
                ]">
                <el-input v-model="form.number"
                          placeholder="请输入学生学号"
                          :disabled="editShow"
                          @input="infoPer()"></el-input>
              </el-form-item>
              <el-form-item label="学生姓名:">
                <el-input v-model="permissions.name"
                          placeholder="请输入学生行"
                          disabled></el-input>
              </el-form-item>
              <el-form-item label="学生性别:">
                <span>{{ permissions.sex }}</span>
              </el-form-item>
              <el-form-item label="入学年份:">
                <el-input v-model="permissions.register_time"
                          placeholder="请输入入学年份"
                          disabled></el-input>
              </el-form-item>
              <el-form-item label="年级:">
                <el-input v-model="gradeName"
                          placeholder="请输入年级"
                          disabled></el-input>
              </el-form-item>
              <el-form-item label="班级:">
                <el-input v-model="className"
                          placeholder="请输入班级"
                          disabled></el-input>
              </el-form-item>
              <el-form-item label="考试名称:"
                            prop="exam_id"
                            :rules="{
                  required: true, message: '考试名称不能为空', trigger: 'change'
                }">
                <el-select v-model="form.exam_id"
                           placeholder="考试名称">
                  <el-option v-for="item in testsArr"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-for="(item,index) in form.subjectsArr"
                            :key="index"
                            :prop="'subjectsArr.'+ index+'.subject'"
                            :label="'科目' + (++index)"
                            :rules="{
                  required: true, message: '科目名不能为空', trigger: 'change'
                }">
                <el-col :span="8">
                  <el-form-item>
                    <el-select v-model="item.subject"
                               placeholder="请选择科目"
                               @change="setSub(index,item.subject)">
                      <el-option v-for="(itemData,indexData) in subjectData"
                                 :key="indexData"
                                 :label="itemData.name"
                                 :value="itemData.id"
                                 :disabled="itemData.disabled"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item style="margin-left:10px">
                    <el-input v-model="item.score"
                              placeholder="请填写分数"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item class="choose">
                    <el-button v-if="index===form.subjectsArr.length && subjectData.length > form.subjectsArr.length"
                               @click="chooseAdd(index)">增加</el-button>
                    <el-button v-if="index > 1 && index===form.subjectsArr.length"
                               @click="chooseDele(index)">删除</el-button>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item style="margin-left:20%;margin-top:50px;">
                <el-button type="primary"
                           @click="addDete()">确定</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-dialog>
      <!-- 考试科目查看的弹框 -->
      <el-dialog title=" 学科查看"
                 :visible.sync="lookDataShow"
                 center
                 @close="lookData = []">
        <template>
          <el-table :data="lookData"
                    label-width="120px"
                    border>
            <el-table-column label="学科"
                             prop="name"
                             align="center"></el-table-column>
            <el-table-column label="成绩"
                             prop="score"
                             align="center"></el-table-column>
          </el-table>
        </template>
      </el-dialog>
    </div>
    <Import v-if="importShow"
            check-methods="fractionCheck"
            import-methods="fractionImport"
            :input-pas="true"
            :template-ulr="templateUlr"
            :err-arr="errArr"
            :check-data="checkData"
            @cancel="cancel"></Import>
  </div>
</template>
<script>
import { mixinDelete, mixinData, mixinCreate, mixinPaging } from '@/publicfun'
export default {
  mixins: [mixinDelete, mixinData, mixinCreate, mixinPaging],
  data () {
    return {
      // 用来查询的参数
      listQuery: {
        keyword: '',
        exam: '',
        grade: '',
        class: ''
      },
      importShow: false,
      // 学科列表
      subjectData: [],
      // 部门
      departmentData: [],
      // 职务
      positionData: [],
      colConfigs: [
        { prop: 'student.name', label: '姓名' },
        // { prop: 'student.sex', label: '性别' },
        { prop: 'student.number', label: '学号' },
        { prop: 'student.register_time', label: '入学年份' },
        { prop: 'grade.name', label: '年级' },
        { prop: 'class.name', label: '班级' },
        { prop: 'exam.name', label: '考试名称' },
        { prop: 'exam.exam_time', label: '考试时间' },
        { prop: 'score', label: '总分' },
        { prop: 'class_order', label: '班级排名' },
        { prop: 'grade_order', label: '年级排名' }
      ],
      templateUlr: 'https://uploads-img.oss-cn-hangzhou.aliyuncs.com/upload-article/student-grade.xlsx',
      // 显示错误的字段
      errArr: [
        { prop: 'grade', label: '年级' },
        { prop: 'class', label: '班级' },
        { prop: 'exam', label: '考试配置编号' },
        { prop: 'name', label: '学生名称' },
        { prop: 'number', label: '学生编号' },
        { prop: 'msg', label: '错误提示' }
      ],
      // 检查重复字段
      checkData: [
        // 把表格里所有的账户名提取出来
        { name: 'userNameArr', check: 'number', prompt: '学生编号' }
      ],
      rules: {
        grade: [{ required: true, message: '不能为空', trigger: 'change' }],
        class: [{ required: true, message: '不能为空', trigger: 'change' }],
        exam: [{ required: true, message: '不能为空', trigger: 'change' }]
      },
      title: '',
      total: 0,
      lookData: [],
      lookDataShow: false,
      // 选择课程的开始时间和结束时间
      form: {
        number: '',
        exam_id: '',
        grade_id: '',
        class_id: '',
        student_id: '',
        subject: {},
        subjectsArr: [
          {
            subject: '',
            score: ''
          }
        ]
      },
      gradeName: '',
      className: '',
      // 学科
      discipline: [],
      // 弹框中学生的信息
      permissions: {},
      gradeArr: [],
      classArr: [],
      examArr: [],
      tableData: [],
      testsArr: []
    }
  },
  watch: {
    'listQuery.grade' (newName, oldName) {
      this.listQuery.class = ''
      this.listQuery.exam = ''
      this.examArr = []
      this.classArr = []
    },
    'listQuery.class' (newName, oldName) {
      this.listQuery.exam = ''
      this.examArr = []
    }
  },
  created () {
    this.getGrade('gradeArr', 0)
    this.listLoading = false
  },
  methods: {
    add () {
      delete this.form.id
      this.title = '增加成绩'
      // 把添加里面的考试名称清空
      this.testsArr = []
      this.dialogFormVisible = true
      this.editShow = false
      this.listSubject()
    },
    edit (row) {
      this.title = '编辑成绩'
      this.form.number = row.student.number
      this.form.exam_id = row.exam.id
      this.form.class_id = row.class_id
      this.form.grade_id = row.grade_id
      this.form.student_id = row.student_id
      this.form.id = row.id
      this.permissions.name = row.student.name
      this.permissions.register_time = row.student.register_time
      this.permissions.sex = row.student.sex
      this.gradeName = row.grade.name
      this.className = row.class.name
      this.form.subjectsArr = []
      for (var item in row.mark_list) {
        this.form.subjectsArr.push({
          subject: row.mark_list[item].id,
          score: row.mark_list[item].score
        })
      }
      console.log(this.form.subjectsArr)
      this.dialogFormVisible = true
      this.editShow = true
      this.tesrsGat(row.grade_id, row.class_id, 'testsArr')
      this.listSubject()
    },
    // 查看科目
    lookScore (row) {
      this.lookDataShow = true
      for (var item in row.mark_list) {
        this.lookData.push({
          name: row.mark_list[item].name,
          score: row.mark_list[item].score
        })
      }
    },
    // 获取初始化列表和搜索列表
    getScoreList () {
      this.listLoading = true
      this.$http.fractionList(this.listQuery).then(response => {
        this.tableData = response.data.lists
        this.total = response.data.total
        this.listLoading = false
      })
    },
    // 添加或者编辑
    createData () {
      if (this.editShow) {
        this.$http.fractionEdit(this.form).then(response => {
          this.showNotify(response)
          this.getScoreList()
          this.dialogFormVisible = false
        })
      } else {
        this.$http.fractionAdd(this.form).then(response => {
          if (response.code === 200) {
            this.showNotify(response)
          } else {
            this.errInfo(response.msg)
          }
          this.dialogFormVisible = false
        })
      }
    },
    // 删除
    handleDelete (row) {
      this.$http.fractionDele({ id: row.id[0] }).then(response => {
        this.getScoreList()
        this.showNotify(response)
      })
    },
    // 获取班级和年级
    getGrade (name, par) {
      if (par !== '') {
        this.$http.fetchGradeList({ pid: par }).then(response => {
          this[name] = response.data
        })
      }
    },
    // 获取考试名称
    examName () {
      if (this.listQuery.class !== '') {
        this.tesrsGat(this.listQuery.grade, this.listQuery.class, 'examArr')
      }
    },
    // 查询请求
    queryData (par) {
      this.$refs['queryData'].validate(valid => {
        if (valid) {
          this[par]()
        }
      })
    },
    // 更新排名
    ranking () {
      this.$http.fractionRanking(this.listQuery).then(response => {
        this.showNotify(response)
      })
    },
    // 增加科目
    chooseAdd () {
      if (this.subjectData.length > this.form.subjectsArr.length) {
        this.form.subjectsArr.push({
          subject: '',
          score: ''
        })
      }
    },
    // 删除科目
    chooseDele (index) {
      this.form.subjectsArr.pop()
      for (var item in this.subjectData) {
        if (this.subjectData[item].index && this.subjectData[item].index === index) {
          delete this.subjectData[item].disabled
        }
      }
    },
    // 获取学科列表
    listSubject () {
      this.$http.fetchSubjectList().then(response => {
        this.subjectData = response.data
      })
    },
    // 当学科列表的数据已被选择 下面这个数据将变为不可选状态
    setSub (index, par) {
      for (var item in this.subjectData) {
        if (this.subjectData[item].index && this.subjectData[item].index === index) {
          delete this.subjectData[item].disabled
        }
        if (par === this.subjectData[item].id) {
          this.subjectData[item].disabled = true
          this.subjectData[item].index = index
        }
      }
    },
    // 组件内点击取消
    cancel () {
      this.importShow = false
      this.getTableList()
    },
    // 关闭弹框的时候
    close () {
      this.closeDialog()
      for (var item in this.permissions) {
        this.permissions[item] = ''
      }
      this.gredeName = ''
      this.className = ''
      this.form.subjectsArr = [
        {
          subject: '',
          score: ''
        }
      ]
    },
    // 增加点确定把科目的值赋值到另一个对象 改成特定成形式
    addDete () {
      this.form.subject = {}
      for (var item in this.form.subjectsArr) {
        this.form.subject[this.form.subjectsArr[item].subject] = this.form.subjectsArr[item].score
      }
      this.handleCreate()
    },
    // 通过学号获得学生信息
    infoPer () {
      this.$http.permisInfo({ number: this.form.number }).then(response => {
        if (response.code === 200) {
          this.permissions = response.data
          this.form.student_id = response.data.id
          this.form.class_id = response.data.class_id
          this.form.grade_id = response.data.grade_id
          this.gradeName = response.data.grade.name ? response.data.grade.name : response.data.grade
          this.className = response.data.class.name ? response.data.class.name : response.data.class
          if (response.data) {
            this.tesrsGat(response.data.grade_id, response.data.class_id, 'testsArr')
          }
        } else {
          this.permissions = {}
          this.gradeName = ''
          this.className = ''
        }
      })
    },
    // 获取考试名称
    tesrsGat (grade_id, class_id, name) {
      this.$http.exam({ grade: grade_id, class: class_id }).then(response => {
        this[name] = response.data
      })
    },
    getTableList () { }
  }
}
</script>
<style lang="scss" scoped>
.operation {
  color: #409eff;
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
  margin-top: 20px;
}
.choose {
  display: flex;
  justify-content: flex-end;
}
.filter-container {
  /deep/ {
    .el-input,
    .el-select {
      width: 150px;
      margin-right: 0px;
    }
  }
  white-space: nowrap;
  overflow-x: auto;
}
</style>
