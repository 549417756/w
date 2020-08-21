<template>
  <div class="app-container">
    <div class="class-table">
      <div class="table-wrapper">
        <div class="tabel-container">
          <table>
            <thead>
              <tr>
                <th>时间</th>
                <th
                  v-for="(week, index) in weeks"
                  :key="index"
                >{{ '周' + digital2Chinese(index+1, 'week') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, rowIndex) in courseTable" :key="rowIndex">
                <td>
                  <p>{{ item.name }}</p>
                  <p class="period">{{ item.start_time }} - {{ item.end_time }}</p>
                </td>
                <td
                  v-for="(week, columnIndex) in weeks"
                  :key="columnIndex"
                  @click="confirmEdit(rowIndex + 1, columnIndex + 1)"
                >
                  <el-select
                    v-if="selectIndex(rowIndex + 1, columnIndex + 1)=== currentIndex"
                    v-model="subject_id"
                    clearable
                    placeholder="请填写科目名称"
                    @change="change(rowIndex, columnIndex, item)"
                  >
                    <el-option
                      v-for="subject in subjectList"
                      :key="subject.id"
                      :label="subject.name"
                      :value="subject.id"
                    ></el-option>
                  </el-select>
                  <template v-else> {{ name(item, week) }}</template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weeks: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      currentIndex: 0,
      courseTable: null,
      subjectList: [],
      subject_id: null,
      subjectObject: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // 获取科目列表
      this.$http.fetchSubjectList().then(({ data }) => {
        this.subjectList = data
        data.forEach(item => {
          this.subjectObject[item.id] = item.name
        })
        // 获取课程表列表
        this.$http.fetchScheduleList().then(({ data }) => {
          this.courseTable = data
        })
      })
    },
    digital2Chinese(num, identifier) {
      const character = [
        '零',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九',
        '十',
        '十一',
        '十二'
      ]
      return identifier === 'week' && (num === 0 || num === 7) ? '日' : character[num]
    },
    confirmEdit(rowIndex, columnIndex) {
      const item = this.courseTable[rowIndex - 1]
      const key = this.weeks[columnIndex - 1]
      const vulue = item[key]
      const index = (rowIndex.toString() + columnIndex.toString()) * 1
      this.currentIndex = index
      this.subject_id = vulue
    },
    name(item, week) {
      return this.subjectObject[item[week]] || '-'
    },
    selectIndex(rowIndex, columnIndex) {
      return (rowIndex.toString() + columnIndex.toString()) * 1
    },
    change(rowIndex, columnIndex, item) {
      const key = this.weeks[columnIndex]
      const obj = this.courseTable[rowIndex]
      obj[key] = this.subject_id
      delete obj.create_time
      obj.timetable_id = item.id
      if (item.schedule_id === 0) {
        this.$http.createSchedule(obj).then(({ data }) => {
          if (data) {
            this.message('创建成功！')
          }
        })
      } else {
        obj.id = item.schedule_id
        this.$http.editSchedule(obj).then(({ data }) => {
          if (data) {
            this.message('修改成功！')
          }
        })
      }
    },
    message(msg) {
      this.$notify({
        title: '成功',
        message: msg,
        type: 'success',
        duration: 5000
      })
      this.getList()
      this.currentIndex = 0
      this.currentIndex = null
    }
  }
}
</script>

<style lang='scss' scoped>
.class-table {
  .tabel-container {
    margin: 7px;

    table {
      width: 100%;

      thead {
        background-color: #67a1ff;
        th {
          color: #fff;
          line-height: 20px;
          font-weight: normal;
        }
      }
      tbody {
        background-color: #eaf2ff;
        td {
          color: #677998;
          font-size: 15px;
          cursor: pointer;
          /deep/ {
            .el-input__inner {
              font-size: 15px;
              text-align: center;
              color: #67a1ff;
              border: none;
              background-color: #eaf2ff;
            }
          }
        }
      }
      th,
      td {
        width: 60px;
        padding: 12px 2px;
        font-size: 12px;
        text-align: center;
      }

      tr td:first-child {
        color: #333;
      }
    }
  }
}
</style>
