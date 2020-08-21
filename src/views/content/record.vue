<template>
  <div class="app-container">
    <search>
      <el-input v-model="listQuery.keyword" placeholder="消息名称" />
      <el-select v-model="listQuery.category" clearable placeholder="推送分类">
        <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </search>

    <data-table :list="list" :table-fields="tableFields">
      <template v-slot="{ row }">
        <svg-icon icon-class="delete" title="删除" @click.native="handleDelete(row, 'deleteContentRecord')" />
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
  name: 'PushRecode',
  mixins: [MixinTable],
  data() {
    return {
      listQuery: {
        category: null
      },
      ruleForm: {
        name: null,
        weights: 1
      },
      categoryList: [],
      abnormalList: [],
      tableFields: [
        { prop: 'title', label: '推送标题' },
        { prop: 'category.name', label: '推送分类' },
        { prop: 'receive', label: '接收对象' },
        { prop: 'view_num', label: '浏览量' },
        { prop: 'fav_num', label: '收藏量' },
        { prop: 'create_time', label: '推送时间' },
        { prop: 'actions', label: '操作' }
      ]
    }
  },
  created() {
    this.$http.fetchContentClassifyListNP().then(({ data }) => {
      this.categoryList = data
    })
    // 获取状态列表
    this.$http.fetchAbnormalList().then(({ data }) => {
      data.forEach(item => {
        this.abnormalList[item.id] = item.name
      })
    })
  },
  methods: {
    getTableList() {
      this.$http.fetchContentRecordList(this.listQuery).then(({ data: { lists, total }}) => {
        this.lists = lists
        lists.forEach(item => {
          if (item.status === 0 && item.province === null) {
            item.receive = '全部'
          }
          if (item.status !== 0) {
            item.receive = this.abnormalList[item.status]
          }
          if (item.status === 0 && item.province !== null) {
            const province = item.province.name
            const city = item.city !== null ? item.city.name : ''
            const area = item.area !== null ? item.area.name : ''
            const school = item.school_info !== null ? item.school_info.name : ''
            item.receive = province + city + area + school
          }
        })
        this.list = this.lists
        this.total = total
      })
    }
  }
}
</script>

