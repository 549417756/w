<template>
  <div class="app-container">
    <search>
      <el-input v-model="listQuery.keyword" placeholder="消息名称" />
      <el-select v-model="listQuery.category" clearable placeholder="消息分类">
        <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <router-link :to="'/message/list/create'">
        <add-button />
      </router-link>
    </search>

    <data-table :list="list" :table-fields="tableFields">
      <template v-slot="{ row }">
        <router-link :to="'/message/list/edit/'+ row.id">
          <svg-icon icon-class="edit" title="编辑" />
        </router-link>
        <svg-icon
          icon-class="detail"
          title="详情"
          @click.native="handleDetail(row)"
        />
        <svg-icon icon-class="delete" title="删除" @click.native="handleDelete(row, 'deleteMessage')" />
      </template>
    </data-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getTableList"
    />

    <el-drawer :visible.sync="drawerVisible" direction="rtl" size="40%">
      <div class="detail-wrapper">
        <h3>{{ detailInfo.title }}</h3>
        <div class="detail-info">
          <span>{{ detailInfo.create_time }}</span>
          <span v-if="detailInfo.category">分类：{{ detailInfo.category.name }}</span>
        </div>
        <div class="detail-main" v-html="detailInfo.content"></div>
      </div>
    </el-drawer>

  </div>
</template>

<script>
import MixinTable from '@/tablemixin'

export default {
  name: 'MessageList',
  mixins: [MixinTable],
  data() {
    return {
      listQuery: {
        category: null
      },
      categoryList: [],
      tableFields: [
        { prop: 'title', label: '分类名称' },
        { prop: 'category.name', label: '消息分类' },
        { prop: 'grade.name', label: '接收对象' },
        { prop: 'sort', label: '分类权重' },
        { prop: 'create_time', label: '添加时间' },
        { prop: 'actions', label: '操作' }
      ],
      drawerVisible: false,
      detailInfo: {}
    }
  },
  created() {
    this.$http.fetchMsgClassifyListNP().then(({ data }) => {
      this.categoryList = data
    })
  },
  methods: {
    getTableList() {
      this.$http.fetchMessageList(this.listQuery).then(({ data: { lists, total }}) => {
        this.list = lists
        this.total = total
      })
    },
    handleDetail(row) {
      this.$http.fetchMsgClassifyDetail({ id: row.id }).then(({ data }) => {
        this.detailInfo = data
        this.detailInfo.category = row.category
        this.drawerVisible = true
      })
    }
  }
}
</script>
