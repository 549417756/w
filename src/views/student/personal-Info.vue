<template>
  <div class="app-container">
    <div class="student-info">
      <div class="head">
        <img src="http://pic39.nipic.com/20140307/13928177_195158772185_2.jpg" alt="头像" class="img" />
        <span class="name">{{ info[0].value }}</span>
      </div>
      <table>
        <tr v-for="(item,index) in info" :key="index">
          <td style="height: 83px; width: 255px; background-color:#FAFAFF">{{ item.key }}</td>
          <td style="height: 83px; width: 500px; border-right: none;">{{ item.value }}</td>
        </tr>
      </table>
      <table style="margin-left: -.05%">
        <tr v-for="(item,index) in info1" :key="index">
          <td style="height: 83px; width:255px; background-color:#FAFAFF">{{ item.key }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </table>
    </div>
    <div class="record">
      <div class="record-security">
        <div class="record-item">
          <div class="herad-title">
            <div>体温记录</div>
            <div class="more" @click="more()">更多 ></div>
          </div>
          <div class="table">
            <el-table :data="tableData" stripe border center>
              <el-table-column label="体温" align="center" prop="name"></el-table-column>
              <el-table-column label="记录时间" align="center" prop="time"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="record-item" style="margin:0 1%" center>
          <div class="herad-title">
            <div>SOS记录</div>
            <div class="more" @click="more()">更多 ></div>
          </div>
          <div>
            <el-table :data="tableData" border center>
              <el-table-column label="SOS记录" align="center" prop="name"></el-table-column>
              <el-table-column label="记录时间" align="center" prop="time"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="record-item">
          <div class="herad-title">
            <div>考勤记录</div>
            <div class="more" @click="more()">更多 ></div>
          </div>
          <div>
            <el-table :data="tableData" stripe border>
              <el-table-column label="考勤记录" align="center" prop="name"></el-table-column>
              <el-table-column label="记录时间" align="center" prop="time"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="results">
        <template>
          <div class="herad-title">成绩记录</div>
          <el-table :data="tableData" stripe border>
            <el-table-column
              v-for="{prop,label} in colConfigs"
              :key="prop"
              align="center"
              :prop="prop"
              :label="label"
            ></el-table-column>
            <el-table-column label="科目" align="center">
              <template slot-scope="{row}">
                <span class="operation" @click="lookScore(row)">查看考试科目</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
    <!-- 考试科目查看的弹框 -->
    <el-dialog
      title=" 学科查看"
      :visible.sync="lookDataShow"
      center
      @close="lookData = []"
    >
      <template>
        <el-table
          :data="lookData"
          label-width="120px"
          border
        >
          <el-table-column label="学科" prop="name" align="center"></el-table-column>
          <el-table-column label="成绩" prop="score" align="center"></el-table-column>
        </el-table>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lookDataShow: false,
      lookData: [],
      tableData: [],
      colConfigs: [
        { prop: 'exam.name', label: '考试名称' },
        { prop: 'exam.exam_time', label: '考试时间' },
        { prop: 'score', label: '总分' },
        { prop: 'class_order', label: '班级排名' },
        { prop: 'grade_order', label: '年纪排名' }
      ],
      studentInfo: {},
      info: [
        {
          name: 'name',
          key: '姓名',
          value: ''
        },
        {
          name: 'number',
          key: '学号',
          value: ''
        },
        {
          name: 'sex',
          key: '性别',
          value: ''
        }
      ],
      info1: [
        {
          name: 'update_time',
          key: '入学年份',
          value: ''
        },
        {
          name: 'device_no',
          key: '设备号',
          value: ''
        },
        {
          name: 'status',
          key: '状态',
          value: ''
        }
      ]
    }
  },
  created() {
    this.infoData()
    this.studentMark()
  },
  methods: {
    more() {
      this.$router.push('./more')
    },
    // 查看科目
    lookScore(row) {
      this.lookDataShow = true
      for (var item in row.mark_list) {
        this.lookData.push({
          name: row.mark_list[item].name,
          score: row.mark_list[item].score
        })
      }
    },
    // 获取学生信息
    infoData() {
      this.$http.permisInfo({ id: this.$route.params.id }).then(response => {
        // 因为页面展示需求 所有写了两个表格 所以请求的数据要赋值两个变量里面 info 和 info1
        for (const item in this.info) {
          this.info[item].value = response.data[this.info[item].name]
        }
        for (const item in this.info1) {
          // 因为请求的状态是0 或 1的数字 所有要判断一下
          if (this.info1[item].name === 'status') {
            this.info1[item].value = response.data[this.info1[item].name] === 0
              ? '在读' : response.data[this.info1[item].name] === 1 ? '毕业' : '其他'
          } else {
            this.info1[item].value = response.data[this.info1[item].name]
          }
        }
      })
    },
    // 获取学生成绩
    studentMark() {
      this.$http.fractionMark({ id: this.$route.params.id }).then(response => {
        this.tableData = response.data.lists
      })
    }
  }
}
</script>
<style scoped>
table,
table tr th,
table tr td {
  border: 1px solid #dcdfe6;
}
.operation {
  color: #409eff;
  cursor: pointer;
  margin-left: 5px;
}
table {
  width: 100%;
  min-height: 25px;
  line-height: 25px;
  text-align: center;
  border-collapse: collapse;
  padding: 2px;
  background: #ffffff;
  background-color: #fff;
  border: 1px solid #dfe6ec;
  box-shadow: 0px 1px 3px #e7e7e7;
}
.student-info {
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
}
.head {
  width: 35%;
  height: 251px;
  background-color: #fafaff;
  border: 1px solid #dfe6ec;
  box-shadow: 0px 1px 3px #e7e7e7;
  border-right: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-top: 50px;
}
.name {
  margin-top: 30px;
}
.record {
  border: 1px solid #dfe6ec;
  box-shadow: 0px 1px 3px #e7e7e7;
  background-color: #fff;
}
.record-security {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 15px;
}
.record-item {
  width: 80%;
  flex-grow: 1;
}
.herad-title {
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
  flex-shrink: 1;
}
.more {
  font-size: 15px;
  color: #dadada;
  cursor: pointer;
}
.more:hover {
  color: #4f60e0;
}
.table {
  flex-shrink: 1;
}
.results {
  padding: 0 15px;
  margin-top: 100px;
  margin-bottom: 50px;
}
@media screen and (min-width: 300px) {
  .record-item {
    width: 80%;
    flex-grow: 1;
  }
}
</style>
