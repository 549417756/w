<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline">

        <el-form-item label="课程名称">
          <el-input v-model="formInline.name"
                    placeholder="请输入课程名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">查询</el-button>

        </el-form-item>
      </el-form>
    </div>

    <el-button type="primary"
               class="mb10"
               @click="dialogTableVisible1 = true">上传课件</el-button>

    <el-table ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              style=""
              border>
      <el-table-column type="index"
                       width="55"
                       label="序号"
                       align="center">
      </el-table-column>
      <el-table-column label="名称"
                       prop="date"
                       align="center">
        <!-- <template slot-scope="tableData3">
          <el-button type="text"
                     size="small">{{tableData3.row.date}}</el-button>

        </template> -->
      </el-table-column>

      <el-table-column label="操作"
                       width="130"
                       align="center">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="preview(scope.$index, tableData3)">预览</el-button>

          <el-button type="text"
                     size="small"
                     style="color:red"
                     @click.native.prevent="deleteRow(scope.$index, tableData3)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 预览课件视频 -->
    <el-dialog title="预览"
               :visible.sync="dialogTableVisible"
               append-to-body
               custom-class="dialogcenter">
      <video src=""></video>
    </el-dialog>
    <!-- 上传课件 -->
    <el-dialog title="选择课件"
               :visible.sync="dialogTableVisible1"
               append-to-body
               custom-class="dialogcenter"
               width="500px">
      <el-form :model="formInline">
        <el-form-item label="课件名称">
          <el-input v-model="formInline.name"
                    auto-complete="off"
                    style="width:320px"></el-input>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload class="upload-demo"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :on-preview="handlePreview"
                     :on-remove="handleRemove"
                     :before-remove="beforeRemove"
                     multiple
                     :limit="3"
                     :on-exceed="handleExceed"
                     :file-list="fileList"
                     :show-file-list="false">
            <el-button type="primary"
                       id="upload"
                       class="mb10">点击上传</el-button>

          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogTableVisible1=false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
// import { SWFObject } from '@/utils/swfobject'
// var swfobj = new SWFObject('http://p.bokecc.com/flash/api/uploader.swf', 'upload', '80', '80', '8');
// swfobj.addVariable('title', 'test');
// swfobj.addVariable('number', 123);
// swfobj.addParam('allowFullscreen', 'true');
// swfobj.addParam('allowScriptAccess', 'always');
// swfobj.addParam('wmode', 'transparent');
// swfobj.write('divid');
// upload["func"](param);

// on_spark_selected_file(file_name, file_size)
export default {
  data () {
    return {
      formInline: {
        name: ''
      },
      dialogTableVisible: false,

      dialogTableVisible1: false,

      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
      ,
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        state: false
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        state: true
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        state: true
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        state: false
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        state: false
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        state: false
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        state: true
      }],
    }
  },
  methods: {
    onSubmit () {

    },
    preview (rows, data) {
      this.dialogTableVisible = true
    },
    deleteRow (rows, data) {
      // 添加行
      // var obj = { date: 'name' }
      // this.tableData3.unshift(obj)
      this.$confirm('此操作将删除此课件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        // 删除行
        data.splice(rows, 1);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件,本次选择了 ${files.length} 个文件,共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
}
</script>