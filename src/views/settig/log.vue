<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="操作人">
                <el-select v-model="formInline.region"
                           placeholder="活动区域">
                  <el-option label="区域一"
                             value="shanghai"></el-option>
                  <el-option label="区域二"
                             value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="创建时间">

                <el-date-picker v-model="value3"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="操作事件">
                <el-input v-model="formInline.user"
                          placeholder="请输入操作事件"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-button type="primary"
                           @click="onSubmit">查询</el-button>

              </el-form-item>
            </div>
          </el-col>
        </el-row>

      </el-form>
    </div>
    <el-table ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              style=""
              border
              @selection-change="handleSelectionChange">

      <el-table-column label="操作人"
                       prop="date">
      </el-table-column>
      <el-table-column prop="name"
                       label="操作事件">
      </el-table-column>
      <el-table-column prop="address"
                       label="操作模块">
      </el-table-column>
      <el-table-column prop="name"
                       label="操作事件">
      </el-table-column>
      <el-table-column prop="name"
                       label="IP地址">
      </el-table-column>

    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage4"
                   :page-sizes="[100, 200, 300, 400]"
                   :page-size="100"
                   layout="total, sizes, prev, pager, next"
                   :total="400">
    </el-pagination>

  </div>
</template>
<script>
export default {
  data () {
    return {
      formInline: {
        user: '',
        region: '',
        date1: '',
        date2: ''
      },
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      value3: '',
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
    }
  },
  methods: {
    onSubmit () {

    },

    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
