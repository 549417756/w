<template>
  <div class="app-container">

    <div class="filter-container">
      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline pl10">

        <el-form-item label="姓名">
          <el-input v-model="formInline.region"
                    placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item class="fr">
          <el-button type="primary"
                     @click="onSubmit">查询</el-button>
          <el-button type="primary"
                     @click="onSubmit">导入人员模板</el-button>
          <el-button type="primary"
                     @click="onSubmit">导入人员</el-button>
          <el-button type="primary"
                     @click="onSubmit">导出人员</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mb10">
      直播名称：睡眠综合征临床研究
    </div>
    <el-table :data="tableData3"
              style="width: 100%"
              border>
      <el-table-column type="index"
                       label="序号"
                       width="55"
                       align="center"
                       fixed
                       :resizable="false">
      </el-table-column>
      <el-table-column :label="item.propName"
                       :property="item.prop"
                       v-for="(item,index) in tableheader"
                       :fixed="index==0"
                       :key="item.prop"
                       align="center"
                       :resizable="false">
        <template slot-scope="scope">
          <span>{{scope.row[scope.column.property]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否预约"
                       width="100"
                       align="center">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="deleteRow">取消预约</el-button>

        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName2: 'first',
      formInline: {
        region: ''
      },
      tableheader: [
        { prop: 'id', propName: '编号' },
        { prop: 'name', propName: '名字' },
        { prop: 'age', propName: '保质期' },
        { prop: 'remark', propName: '特点' },
        { prop: 'country', propName: '国家' },
        { prop: 'address', propName: '地址' },
      ],
      tableData3: [
        { 'id': '100001', 'name': '小红萝卜', 'age': '2年', 'remark': '适合油炸', 'country': '中国', 'address': '广东省深圳市', 'type': 'push' },
        { 'id': '100002', 'name': '萝卜妹', 'age': '2年', 'remark': '适合水煮', 'country': '美国', 'address': '硅谷', 'type': 'on' },
        { 'id': '100003', 'name': '胖萝卜头', 'age': '1年', 'remark': '适合玩儿', 'country': '泰国', 'address': '清迈', 'type': 'on' },
        { 'id': '100004', 'name': '萝卜酱', 'age': '4年', 'remark': '适合吃火锅', 'country': '韩国', 'address': '首尔', 'type': 'push' }
      ],
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },
    onSubmit () {

    },
    // 删除当前行
    deleteRow (row, index, rows) {
      this.$confirm('此操作将取消预约, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '取消成功!',
        });
        // rows.splice(index, 1);
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
      // rows.splice(index, 1);
      console.log(row.id, index, rows)
    },
  }
};
</script>
<style lang="scss">
</style>