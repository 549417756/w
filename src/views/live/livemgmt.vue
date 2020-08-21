<template>
  <div class="app-container">

    <div class="mb10">
      <el-button type="primary"
                 size="medium"
                 @click="keti('1')">新建课题</el-button>
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
                       width="55"
                       :resizable="false">
      </el-table-column>

      <el-table-column :label="item.propName"
                       :property="item.prop"
                       v-for="item in tableheader"
                       :key="item.prop"
                       align="center"
                       width="130"
                       :resizable="false">
        <template slot-scope="scope">
          <span>{{scope.row[scope.column.property]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序"
                       align="center"
                       :resizable="false"
                       class-name="small-padding fixed-width ">
        <template slot-scope="scope">
          <el-button type="text"
                     icon="el-icon-sort-up"
                     @click="handleUp(scope.$index, scope.row)">
          </el-button>
          <el-button type="text"
                     icon="el-icon-sort-down"
                     @click="handleDown(scope.$index, scope.row)">
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       width="350"
                       :resizable="false">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="keti('2',scope.row)">编辑</el-button>
          <el-button type="text"
                     size="small"
                     @click="dialogFormVisible1 = true">海报</el-button>
          <el-button type="text"
                     size="small">学习记录</el-button>
          <el-button type="text"
                     size="small">进入直播</el-button>
          <el-button type="text"
                     size="small">试题</el-button>
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
    <el-dialog :title="ketitext"
               :visible.sync="dialogFormVisible"
               append-to-body
               top="0"
               width="550px">
      <el-form :model="form1"
               label-width="80px">
        <template v-for="(list,index) in tableheader">
          <el-form-item :label="list.propName"
                        v-if="list.type=='input'">
            <el-input v-model="list.value"
                      placeholder="请输入站点名称"></el-input>
          </el-form-item>
          <el-form-item :label="list.propName"
                        v-if="list.type=='select'">
            <el-select v-model="list.value"
                       placeholder="活动区域">
              <el-option :label="item.key"
                         v-for="item in list.data"
                         :value="item.val"></el-option>

            </el-select>

          </el-form-item>
          <el-form-item :label="list.propName"
                        v-if="list.type=='time'">
            <el-date-picker v-model="list.value"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="list.propName"
                        v-if="list.type=='radio'">
            <el-radio-group v-model="list.value">

              <el-radio :label="item.label"
                        v-for="item in list.radio"
                        :key="item.value"></el-radio>

            </el-radio-group>
          </el-form-item>
        </template>

      </el-form>
      <div class="text-center dialogfixed">
        <el-button type="primary"
                   @click="onSubmit">立即新增</el-button>
        <el-button>取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="海报"
               :visible.sync="dialogFormVisible1"
               append-to-body
               top="0"
               width="550px">
      <el-form :model="form1"
               label-width="80px">
        <template v-for="(list,index) in tableheader">
          <el-form-item :label="list.propName"
                        v-if="list.type=='input'">
            <el-input v-model="list.value"
                      placeholder="请输入站点名称"></el-input>
          </el-form-item>
          <el-form-item :label="list.propName"
                        v-if="list.type=='select'">
            <el-select v-model="list.value"
                       placeholder="活动区域">
              <el-option :label="item.key"
                         v-for="item in list.data"
                         :value="item.val"></el-option>

            </el-select>

          </el-form-item>
          <el-form-item :label="list.propName"
                        v-if="list.type=='time'">
            <el-date-picker v-model="list.value"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="list.propName"
                        v-if="list.type=='radio'">
            <el-radio-group v-model="list.value">

              <el-radio :label="item.label"
                        v-for="item in list.radio"
                        :key="item.value"></el-radio>

            </el-radio-group>
          </el-form-item>
        </template>

      </el-form>
      <div class="text-center dialogfixed">
        <el-button type="primary"
                   @click="onSubmit">立即新增</el-button>
        <el-button>取消</el-button>
      </div>
    </el-dialog>
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
      ketitext: '',
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
      dialogTableVisible1: false,
      dialogFormVisible1: false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      imageUrl: '',
      tableheader: [
        { prop: 'id', propName: '编号', type: 'input', value: '', placeholder: '提示' },
        {
          prop: 'name', propName: '名字', type: 'select', value: '', placeholder: '提示', data: [{
            key: '第一',
            val: '1'
          }, {
            key: '第2',
            val: '2'
          }]
        },
        { prop: 'age', propName: '保质期', type: 'time', value: '', placeholder: '提示' },
        {
          prop: 'remark', propName: '特点', type: 'radio', value: '', placeholder: '提示', radio: [{
            label: "公开",
            value: "0",
            selected: "1"
          },
          {
            label: "公正",
            value: "1",
            selected: "0"
          }]
        },
        { prop: 'country', propName: '国家' },
        { prop: 'address', propName: '地址' },
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
    keti (a, row) {
      console.log(row)
      if (a == '1') {
        this.ketitext = '新增课题'
      } else {
        this.ketitext = '编辑课题'
      }
      this.dialogFormVisible = true
    },
    handleUp (index, row) {
      if (index <= 0) {

        this.$notify.error({
          title: '错误',
          message: '已经是第一条了'
        });
      } else {
        const upData = this.tableData3[index - 1]
        this.tableData3.splice(index - 1, 1)
        this.tableData3.splice(index, 0, upData)
        this.$notify({
          title: '成功',
          message: '排序成功',
          type: 'success'
        });
      }


    },
    handleDown (index, row) {
      if (index == (this.tableData3.length - 1)) {

        this.$notify.error({
          title: '错误',
          message: '已经是最后一条了'
        });
      } else {
        const downData = this.tableData3[index + 1]
        this.tableData3.splice(index + 1, 1)
        this.tableData3.splice(index, 0, downData)
        this.$notify({
          title: '成功',
          message: '排序成功',
          type: 'success'
        });
      }
    },
    getDetails (row) {
      this.rowid = row.id
    },
    onSubmit () {
      for (var i = 0; i < this.tableheader.length; i++) {
        this.$set(this.dome.domains, this.tableheader[i].prop, this.tableheader[i].value)
      }

      console.log(this.dome.domains)
    },

    // 删除当前行
    deleteRow (row, index, rows) {
      this.$confirm('此操作将删除该直播, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
        // rows.splice(index, 1);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      // rows.splice(index, 1);
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
</style>