<template>
  <div class="app-container">
    <search>
      <el-input v-model="listQuery.keyword" placeholder="编号" @input="getTableList()" />
      <el-button style="float: right; margin-right: 50px; margin-top:20px" icon="el-icon-plus" @click="add()">添加</el-button>
    </search>
    <data-table :list="list" :table-fields="tableFields">
      <template v-slot:selection>
        <el-table-column type="selection" width="55">
        </el-table-column>
      </template>
      <template v-slot="{ row }">
        <svg-icon
          icon-class="edit"
          title="编辑"
          @click.native="edit(row)"
        />
        <svg-icon
          icon-class="delete"
          title="删除"
          @click.native="deleteEvent(row.id)"
        />
      </template>
    </data-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getTableList"
    />
    <el-dialog
      v-el-drag-dialog
      center
      title="增加基点"
      :visible.sync="visible"
      @close="closeDialog"
    >
      <template>
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="form"
          label-width="115px"
          label-position="left"
        >
          <el-form-item label="基点编号" prop="number">
            <el-input v-model="form.number" placeholder="请添加基点编号"></el-input>
          </el-form-item>
          <el-form-item label="X轴坐标" prop="local_x">
            <el-input v-model="form.local_x" placeholder="请添加X轴坐标"></el-input>
          </el-form-item>
          <el-form-item label="Y轴坐标" prop="local_y">
            <el-input v-model="form.local_y" placeholder="请添加Y轴坐标"></el-input>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input v-model="form.remark" placeholder="请添加备注信息"></el-input>
          </el-form-item>
          <el-form-item style="margin-left:20%;margin-top:50px;">
            <el-button type="primary" @click="handleCreate()">确定</el-button>
            <el-button @click="visible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { mixinData, mixinDelete, mixinCreate, mixinPaging } from '@/publicfun'
export default {
  name: 'Device',
  mixins: [mixinData, mixinDelete, mixinCreate, mixinPaging],
  data() {
    return {
      list: null,
      total: 0,
      visible: false,
      listQuery: {
        password: ''
      },
      form: {
        number: null,
        local_x: '',
        local_y: '',
        remark: ''
      },
      tableFields: [
        { prop: 'number', label: '基站编号' },
        { prop: 'status.name', label: 'X坐标' },
        { prop: 'status.name', label: 'Y坐标' },
        { prop: 'remark', label: '备注' },
        { prop: 'create_time', label: '添加时间' },
        { prop: 'actions', label: '操作' }
      ],
      rules: {
        number: [{ required: true, message: '基站编号不能为空', trigger: 'blur' }],
        local_x: [{ required: true, message: 'X坐标不能为空', trigger: 'blur' }],
        local_y: [{ required: true, message: 'Y坐标不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getTableList() {
      this.$http.baseList(this.listQuery).then(({ data: { lists, total }}) => {
        this.list = lists
        this.total = total
      })
    },
    add() {
      this.visible = true
      this.eidtShow = false
      delete this.form.id
    },
    edit(row) {
      this.visible = true
      this.eidtShow = true
      for (const item in this.form) {
        this.form[item] = row[item]
      }
      this.form.id = row.id
    },
    createData() {
      if (this.eidtShow) {
        this.$http.baseEdit(this.form).then(response => {
          this.showNotify(response)
          this.visible = false
        })
      } else {
        this.form.number = Number(this.form.number)
        this.$http.baseAdd(this.form).then(response => {
          this.showNotify(response)
          this.visible = false
        })
      }
      this.getTableList()
    },
    handleDelete(par) {
      this.$http.baseDele({ id: par }).then(response => {
        this.showNotify(response)
        this.getTableList()
      })
    }
  }
}
</script>
