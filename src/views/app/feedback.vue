<template>
  <div class="app-container">
    <search>
      <el-input v-model="listQuery.keyword" placeholder="反馈标题" />
    </search>

    <data-table :list="list" :table-fields="tableFields">
      <template v-slot="{ row }">
        <svg-icon icon-class="delete" title="删除" @click.native="handleDelete(row, 'deleteFeedback')" />
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
import MixinTable from '@/tablemixin'

export default {
  name: 'Feedback',
  mixins: [MixinTable],
  data() {
    return {
      categoryList: [],
      tableFields: [
        { prop: 'content', label: '反馈信息' },
        { prop: 'contact', label: '联系方式' },
        { prop: 'create_time', label: '反馈时间' },
        { prop: 'actions', label: '操作' }
      ]
    }
  },
  methods: {
    getTableList() {
      this.$http.fetchFeedbacklList(this.listQuery).then(({ data: { lists, total }}) => {
        this.list = lists
        this.total = total
      })
    }
  }
}
</script>

