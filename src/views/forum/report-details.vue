<template>
  <div class="app-container">
    <el-table v-if="list.account" :data="details" :show-header="false" border :cell-class-name="cell">
      <el-table-column prop="date" align="center" width="300"></el-table-column>
      <el-table-column prop="name" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.date === '举报内容'">
            <router-link :to="'/forum/topic-details/'+ list.report_id">{{ scope.row.name }}</router-link>
          </template>
          <template v-else>
            {{ scope.row.name }}
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="list.deal_id !== 0" style="margin: 30px 0;">
      <el-table v-if="list.deal_account" :data="results" :show-header="false" border :cell-class-name="cell">
        <el-table-column prop="date" align="center" width="300"></el-table-column>
        <el-table-column prop="name" align="center"></el-table-column>
      </el-table>
    </div>
    <el-row v-else type="flex" justify="center" style="margin: 30px 0;">
      <el-col :span="11" style="text-align: right">
        <el-button type="success" @click="handleReport(1)">有效举报</el-button>
      </el-col>
      <el-col :span="2"></el-col>
      <el-col :span="11" style="text-align: left">
        <el-button type="danger" @click="handleReport(2)">无效举报</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MixinDeleteView from '@/tablemixin/delete-view'

export default {
  name: 'ReportDetails',
  mixins: [MixinDeleteView],
  data() {
    return {
      list: {},
      id: this.$route.params && this.$route.params.id
    }
  },
  computed: {
    details() {
      return [
        {
          date: '编号',
          name: this.list.id
        },
        {
          date: '举报类型',
          name: this.list.type
        },
        {
          date: '举报次数',
          name: this.list.number
        },
        {
          date: '举报时间',
          name: this.list.create_time
        },
        {
          date: '举报对象',
          name: this.list.account.name
        },
        {
          date: '举报状态',
          name: this.list.status
        },
        {
          date: '举报内容',
          name: this.list.report_content
        }
      ]
    },
    results() {
      return [
        {
          date: '处理人员',
          name: this.list.deal_account.name
        },
        {
          date: '处理时间',
          name: this.list.update_time
        },
        {
          date: '处理结果',
          name: this.list.deal_result
        }
      ]
    }
  },
  created() {
    this.$http.fetchReportDetails({ id: this.id }).then(({ data }) => {
      this.list = data
    })
  },
  methods: {
    cell({ row, column, rowIndex, columnIndex }) {
      if (!isNaN(rowIndex) && columnIndex % 2 === 0) {
        return 'cell-bg'
      }
    },
    handleReport(result) {
      this.$http.setReport({ id: this.id, result }).then(({ data }) => {
        if (data) {
          this.deleteCurrentView()
        }
      })
    }
  }
}
</script>

<style>
.cell-bg {
  background: #f5f7fa;
}
</style>
