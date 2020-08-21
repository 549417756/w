<template>
  <div class="app-container">
    <search>
      <el-input v-model="listQuery.keyword" placeholder="分类名称" />
      <el-select v-model="listQuery.category" clearable placeholder="话题分类">
        <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </search>

    <data-table :list="list" :table-fields="tableFields">
      <template v-slot="{ row }">
        <svg-icon v-if="row.is_hot == 1" icon-class="set-hot" title="取消热门" @click.native="setHot(row)" />
        <svg-icon v-if="row.is_hot == 0" icon-class="cancel-hot" title="设为热门" @click.native="setHot(row)" />
        <router-link :to="'/forum/topic-details/'+ row.id">
          <svg-icon icon-class="detail" title="详情" />
        </router-link>
        <svg-icon icon-class="delete" title="删除" @click.native="handleDelete(row, 'deleteTopic')" />
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
  name: 'TopicList',
  mixins: [mixin],
  data() {
    return {
      categoryList: [],
      tableFields: [
        { prop: 'title', label: '标题' },
        { prop: 'category.name', label: '分类' },
        { prop: 'create_time', label: '发布时间' },
        { prop: 'fav_num', label: '收藏' },
        { prop: 'view_num', label: '阅读' },
        { prop: 'reply_num', label: '评论' },
        { prop: 'actions', label: '操作' }
      ]
    }
  },
  // 分类列表
  created() {
    this.$http.fetchForumClassifyListNP().then(({ data }) => {
      this.categoryList = data
    })
  },
  methods: {
    getTableList() {
      this.$http.fetchTopicList(this.listQuery).then(({ data: { lists, total }}) => {
        this.list = lists
        this.total = total
      })
    },
    // 设置热门和取消热门
    setHot(row) {
      const isHot = row.is_hot === 1 ? 0 : 1
      this.$http.setHot({ id: row.id, hot: isHot }).then(response => {
        this.message(isHot === 1 ? '设为热门成功!' : '热门已取消!')
      })
    },
    message(msg) {
      this.$notify({
        title: '成功',
        message: msg,
        type: 'success',
        duration: 5000
      })
      this.getTableList()
    }
  }
}
</script>
