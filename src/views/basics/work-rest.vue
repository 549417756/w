<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="float-btn" style="margin-top:20px" icon="el-icon-plus" @click="add()">添加</el-button>
    </div>
    <template>
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column prop="name" label="课程" align="center"></el-table-column>
        <el-table-column prop="start_time,end_time" label="时间" align="center">
          <template slot-scope="{row}">
            {{ row.start_time }} -- {{ row.end_time }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <svg-icon icon-class="edit" title="编辑" @click.native="edit(row)" />
            <svg-icon icon-class="delete" title="删除" @click.native="deleteEvent(row)" />
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog
      :title="title"
      center
      :visible.sync="dialogFormVisible"
      @close="closeDialog()"
    >
      <el-form
        ref="dataForm"
        :model="form"
        :rules="rules"
        label-width="115px"
        label-position="left"
      >
        <el-form-item label="第几节课程" prop="name">
          <el-input v-model="form.name" placeholder="请添第几节课程"></el-input>
        </el-form-item>
        <div class="time">
          <el-form-item label="开始/结束时间" prop="start_time">
            <el-time-select
              v-model="form.start_time"
              style="width:190px"
              placeholder="起始时间"
              :picker-options="{
                start: '05:00',
                step: '00:05',
                end: '23:00',
                maxTime: form.end_time
              }"
            ></el-time-select>
          </el-form-item>
          <el-form-item prop="end_time">
            <el-time-select
              v-model="form.end_time"
              style="width:190px; margin-left:3%"
              placeholder="结束时间"
              :picker-options="{
                start: '05:00',
                step: '00:05',
                end: '23:00',
                minTime: form.start_time
              }"
            ></el-time-select>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreate()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mixinData, mixinCreate, mixinDelete } from '@/publicfun'
export default {
  mixins: [mixinData, mixinCreate, mixinDelete],
  data() {
    return {
      dialogFormVisible: false,
      title: '',
      // 选择课程的开始时间和结束时间
      startTime: '',
      endTime: '',
      // 学科的开关
      form: {
        name: '',
        start_time: '',
        end_time: ''
      },
      tableData: [],
      rules: {
        name: [{ required: true, message: '请填写第几节课程', trigger: 'blur' }],
        start_time: [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
        end_time: [{ required: true, message: '请选择结束时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    add() {
      delete this.form.id
      this.editShow = false
      this.dialogFormVisible = !this.dialogFormVisible
      this.title = '添加课程'
    },
    edit(row) {
      this.editShow = true
      this.dialogFormVisible = !this.dialogFormVisible
      this.title = '编辑课程'
      this.form.id = row.id
      for (var item in this.form) {
        this.form[item] = row[item]
      }
    },
    handleDelete(row) {
      this.$http.timetableDele(row).then(response => {
        this.showNotify(response)
      })
    },
    // 创建
    createData() {
      if (this.editShow) {
        this.$http.timetableEdit(this.form).then(response => {
          this.showNotify(response)
          this.dialogFormVisible = false
        })
      } else {
        this.$http.timetableAdd(this.form).then(response => {
          this.showNotify(response)
          this.dialogFormVisible = false
        })
      }
    },
    getTableList() {
      this.$http.timetableList().then((response) => {
        this.tableData = response.data
        console.log(response)
      })
    }
  }
}
</script>
<style scoped>
.butt {
  border: 1px solid #e6ebf5;
  background: #ffffff;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
.filter-head {
  height: 50px;
  border: 1px solid #dfe6ec;
  background: #ffffff;
  padding-left: 20px;
  border-bottom: none;
  box-shadow: 0px 1px 3px #e7e7e7;
}
.time {
  display: flex
}
</style>
