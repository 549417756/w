<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline">
        <el-row :gutter="0">
          <template v-for="(list,index) in datatable">
            <!-- <el-col :span="8"> -->
            <el-form-item :label="list.name"
                          v-if="list.type=='input'">
              <el-input v-model="list.value"
                        :placeholder="list.placeholder"></el-input>
            </el-form-item>
            <!-- </el-col> -->
            <!-- <el-col :span="8"
                    > -->
            <el-form-item :label="list.name"
                          v-if="list.type=='select'">
              <el-select v-model="list.value"
                         :placeholder="list.placeholder">
                <el-option :label="list1.key"
                           v-for="(list1,index) in list.data"
                           :value="list1.val"></el-option>
              </el-select>
            </el-form-item>

            <!-- </el-col> -->
            <!-- <el-col :span="10"> -->
            <el-form-item :label="list.name"
                          v-if="list.type=='time'">
              <el-date-picker v-model="list.value"
                              type="daterange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>

            <!-- </el-col> -->
          </template>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">查询</el-button>
          </el-form-item>

        </el-row>

      </el-form>

    </div>
    <div class="mb10">
      <el-button type="primary"
                 size="medium"
                 @click="dialogFormVisible = true">新建项目</el-button>
    </div>
    <el-table ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              style=""
              border
              @row-click="getDetails"
              @selection-change="handleSelectionChange">
      <el-table-column type="index"
                       label="序号"
                       width="55">
      </el-table-column>

      <el-table-column :label="item.propName"
                       :property="item.prop"
                       v-for="item in tableheader"
                       :key="item.prop"
                       align="center">
        <template slot-scope="scope">
          <span>{{scope.row[scope.column.property]}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       width="230"
                       align="center">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small">编辑</el-button>
          <el-button type="text"
                     size="small">管理</el-button>
          <el-button type="text"
                     size="small"
                     v-if="tableData3[scope.$index].type=='push'">发布</el-button>
          <el-button type="text"
                     size="small"
                     v-if="tableData3[scope.$index].type=='on'">下架</el-button>
          <!-- <el-button type="text"
                     size="small"
                     style="color:red"
                     @click.native.prevent="deleteRow(scope.$index, tableData3,)">删除</el-button> -->
          <el-button type="text"
                     size="small"
                     style="color:red"
                     @click.native.prevent="deleteRow(scope.row,scope.$index, tableData3)">删除</el-button>

        </template>
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
  name: 'sitemgmt',
  data () {
    return {
      formInline: {
        user: '',
        region: '',
        date1: '',
        date2: ''
      },
      datatable: [
        {
          text: 'a',
          name: '字段名字',
          type: 'input',
          value: '',
          placeholder: '提示'
        },
        {
          text: 'b',
          name: '字段名字',
          type: 'select',
          value: '',
          placeholder: '提示',
          data: [
            {
              key: '第一',
              val: '1'
            },
            {
              key: '第2',
              val: '2'
            },
          ]
        },
        {
          text: 'c',
          name: '选择时间',
          type: 'time',
          time1: '',
          time2: '',
          value: ''
        },
      ],
      form1: {
        name1: ''
      },
      formLabelWidth: '150px',
      dialogTableVisible: false,
      dialogFormVisible: false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      imageUrl: '',
      tableheader: [

        { prop: 'name', propName: '名字' },
        { prop: 'age', propName: '保质期' },
        { prop: 'remark', propName: '特点' },
        { prop: 'country', propName: '国家' },
        { prop: 'address', propName: '地址' },
        { prop: 'id', propName: '编号' },
      ],
      tableData3: [
        { 'id': '100001', 'name': '小红萝卜', 'age': '2年', 'remark': '适合油炸', 'country': '中国', 'address': '广东省深圳市', 'type': 'push' },
        { 'id': '100002', 'name': '萝卜妹', 'age': '2年', 'remark': '适合水煮', 'country': '美国', 'address': '硅谷', 'type': 'on' },
        { 'id': '100003', 'name': '胖萝卜头', 'age': '1年', 'remark': '适合玩儿', 'country': '泰国', 'address': '清迈', 'type': 'on' },
        { 'id': '100004', 'name': '萝卜酱', 'age': '4年', 'remark': '适合吃火锅', 'country': '韩国', 'address': '首尔', 'type': 'push' }
      ],
      multipleSelection: [],
      dome: {
        domains: {},
      },
      rowid: ''
    }
  },
  created: function () {

    // for (var i = 0; i < this.datatable.length; i++) {
    //   this.$set(this.dome.domains, this.datatable[i].text, '')
    // }

  },
  methods: {
    getDetails (row) {
      this.rowid = row.id
    },
    onSubmit () {
      for (var i = 0; i < this.datatable.length; i++) {
        this.$set(this.dome.domains, this.datatable[i].text, this.datatable[i].value)
      }

      console.log(this.dome.domains)
    },

    // 删除当前行
    deleteRow (row, index, rows) {
      rows.splice(index, 1);
      console.log(row.id, index, rows)
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

    },
    handleCurrentChange (val) {

    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }

  }
}
</script>
<style lang="scss" >
.el-pagination {
  text-align: center;
  margin: 20px 0;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-form-item .el-select {
  width: 220px;
  margin: 0;
}
.el-form-item .el-date-editor .el-range-separator {
  width: auto !important;
}
</style>