<template>
  <div class="app-container">
    <search>
      <el-input v-model="listQuery.keyword" placeholder="分类名称" />
      <add-button @click.native="handleCreate()" />
    </search>

    <data-table :list="list" :table-fields="tableFields">
      <template v-slot="{ row }">
        <svg-icon icon-class="edit" title="编辑" @click.native="handleUpdate(row)" />
        <svg-icon icon-class="delete" title="删除" @click.native="handleDelete(row, 'deleteForumClassify')" />
      </template>
    </data-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getTableList"
    />

    <data-dialog ref="dialog" :title="title">
      <data-form ref="form" :rules="rules" :rule-form="ruleForm" @createData="createData">
        <el-form-item label="分类名称:" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="分类权重:" prop="sort">
          <el-input v-model.number="ruleForm.sort" />
        </el-form-item>
      </data-form>
    </data-dialog>
  </div>
</template>

<script>
import MixinTable from '@/tablemixin'
import { validSort } from '@/utils/validate'

export default {
  name: 'ForumClassify',
  mixins: [MixinTable],
  data() {
    return {
      ruleForm: {
        name: null,
        sort: 50
      },
      tableFields: [
        { prop: 'name', label: '分类名称' },
        { prop: 'sort', label: '分类权重' },
        { prop: 'create_time', label: '添加时间' },
        { prop: 'actions', label: '操作' }
      ],
      rules: {
        name: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }],
        sort: [
          { required: true, validator: validSort, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getTableList() {
      this.$http.fetchForumClassifyList(this.listQuery).then(({ data: { lists, total }}) => {
        this.list = lists
        this.total = total
      })
    },
    // 创建数据
    createData() {
      if ('id' in this.ruleForm) {
        this.$http.editForumClassify(this.ruleForm).then(response => {
          this.message(response)
        })
      } else {
        this.$http.createForumClassify(this.ruleForm).then(response => {
          this.message(response)
        })
      }
    }
  }
}
</script>
