<template>
  <div class="app-container">
    <search>
      <el-select v-model="listQuery.type" clearable placeholder="举报类型">
        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.status" clearable placeholder="举报状态">
        <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.deal_result" clearable placeholder="处理结果">
        <el-option v-for="item in resultList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </search>

    <data-table :list="list" :table-fields="tableFields">
      <template v-slot="{ row }">
        <router-link :to="'/forum/report-details/'+ row.id">
          <svg-icon icon-class="detail" title="详情" />
        </router-link>
        <svg-icon icon-class="delete" title="删除" @click.native="handleDelete(row, 'deleteReport')" />
      </template>
    </data-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getTableList"
    />

  </div>
</template>

<script>
import mixin from '@/tablemixin'
export default {
  name: 'ReportManage',
  mixins: [mixin],
  data() {
    return {
      listQuery: {
        type: null,
        status: null,
        deal_result: null
      },
      typeList: [
        { id: 1, name: '话题内容' },
        { id: 2, name: '话题评论' }
      ],
      statusList: [
        { id: 0, name: '未处理' },
        { id: 1, name: '已处理' }
      ],
      resultList: [
        { id: 1, name: '有效举报' },
        { id: 2, name: '无效举报' }
      ],
      tableFields: [
        { prop: 'id', label: '编号' },
        { prop: 'type', label: '举报类型' },
        { prop: 'number', label: '举报次数' },
        { prop: 'create_time', label: '举报时间' },
        { prop: 'account.name', label: '举报对象' },
        { prop: 'status', label: '举报状态' },
        { prop: 'deal_result', label: '处理结果' },
        { prop: 'actions', label: '操作' }
      ]
    }
  },
  methods: {
    getTableList() {
      this.$http.fetchReportList(this.listQuery).then(({ data: { lists, total }}) => {
        this.list = lists
        this.total = total
      })
    }
  }
}
</script>
