<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="站点名称:">
              <el-input v-model="formInline.mingcheng"
                        placeholder="站点域名"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="用户单位:">
              <el-input v-model="formInline.danwei"
                        placeholder="站点内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="所属区域"
                          prop="region">
              <el-select v-model="formInline.provinceCode"
                         placeholder="请选择"
                         @change="handleItemChange"
                         style="width:140px;margin-right:0">
                <el-option v-for="item in options1"
                           :key="item.code"
                           :label="item.name"
                           :value="item.code">
                </el-option>
              </el-select>
              <el-select v-model="formInline.cityCode"
                         placeholder="请选择"
                         :disabled="formInline.provinceCode==''"
                         style="width:140px">
                <el-option v-for="item in options2"
                           :key="item.code"
                           :label="item.name"
                           :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>

          </el-col>
          <el-col :span="16">
            <el-form-item label="用户搜索:">

              <el-input v-model="formInline.juese"
                        placeholder="请输入角色名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary">查询</el-button>

            <el-button>重置</el-button>

          </el-col>

        </el-row>

      </el-form>
    </div>

    <el-table ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style=""
              border
              @selection-change="handleSelectionChange">

      <el-table-column label="姓名"
                       prop="date"
                       align="center">
      </el-table-column>

      <el-table-column label="手机号"
                       prop="date"
                       align="center">

      </el-table-column>
      <el-table-column label="站点名称"
                       prop="date"
                       align="center">
      </el-table-column>

      <el-table-column label="机构码"
                       prop="date"
                       align="center">

      </el-table-column>
      <el-table-column label="机构码所属单位"
                       prop="date"
                       width="130"
                       align="center">

      </el-table-column>
      <el-table-column label="所属区县"
                       prop="date"
                       align="center">

      </el-table-column>
      <el-table-column prop="name"
                       label="用户单位"
                       align="center">
      </el-table-column>
      <el-table-column prop="name"
                       label="常驻地"
                       align="center">
      </el-table-column>
      <el-table-column prop="name"
                       label="加入时间"
                       align="center">
      </el-table-column>
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="">

          <el-button type="text"
                     size="small"
                     style="color:red">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :page-size="pageSize"
                   layout="total, prev, pager, next,jumper"
                   :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'role',
  data () {
    return {
      formInline: {
        mingcheng: '',
        region: '',
        date1: '',
        date2: '',
        provinceCode: '',
        cityCode: ''
      },

      defaultProps: {
        children: 'children',
        label: 'label'
      },
      radio: '1',
      value1: true,
      value2: true,
      form1: {
        name1: ''
      },
      formLabelWidth: '150px',


      siteId: 0,
      // siteId: this.$store.state.siteid,
      tableData: [],
      multipleSelection: [],
      pageNum: 1,
      pageSize: 20,
      total: 0,
      options1: [],
      options2: [],
    }
  },
  created () {
    this.getValuesWithParent()
    this.getuser()
  },
  methods: {
    // 获取省
    getValuesWithParent () {
      var that = this
      this.$axios.get('/api/dict/getValuesWithParent?categoryCode=REGION&siteId=' + this.siteId,)
        .then(function (response) {

          that.options1 = response.data.data.data

        })
        .catch(function (error) {
        });
    },
    handleItemChange (val) {
      this.formInline.cityCode = '';
      this.formInline.cityCode = '';
      var that = this
      this.$axios.get('/api/dict/getValuesWithParent?categoryCode=REGION&siteId=' + this.siteId + '&parentCode=' + val,)
        .then(function (response) {
          that.options2 = response.data.data.data
        })
        .catch(function (error) {
        });
    },
    getuser () {

      var that = this
      this.$axios.post('/api/account/findAccountInfoAllPage', {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        param: {
          orgId: '',
          siteId: this.siteId,
        }
      })
        .then(function (response) {
          that.tableData = response.data.data

        })
        .catch(function (error) {

        });

    },

    onSubmit () {
      console.log('submit!');
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },


  }
}
</script>
<style lang="scss" scope >
.filter-container /deep/ .el-select,
.filter-container /deep/ .el-input {
  margin: 0;
  // width: 200px;
}
.filter-container /deep/ .rolese {
  width: 120px;
}
.filter-container /deep/ .rolese .el-input {
  width: 120px;
}
</style>