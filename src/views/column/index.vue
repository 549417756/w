<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline">

        <el-form-item label="批量操作">
          <el-select v-model="formInline.region"
                     placeholder="批量操作">
            <el-option label="区域一"
                       value="shanghai"></el-option>
            <el-option label="区域二"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="全部栏目">
          <el-select v-model="formInline.region"
                     placeholder="全部栏目">
            <el-option label="区域一"
                       value="shanghai"></el-option>
            <el-option label="区域二"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="全部类目">
          <el-select v-model="formInline.region"
                     placeholder="全部类目">
            <el-option label="区域一"
                       value="shanghai"></el-option>
            <el-option label="区域二"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.region"
                    placeholder="请输入文章名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">搜索</el-button>

        </el-form-item>
      </el-form>
    </div>

    <el-button type="primary"
               size="medium"
               class="mb10"
               @click="addarticle">新增</el-button>

    <el-table ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              style=""
              border
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column label="标题"
                       prop="date">
      </el-table-column>

      <el-table-column label="来源"
                       prop="date">

      </el-table-column>
      <el-table-column prop="name"
                       label="栏目">
      </el-table-column>
      <el-table-column prop="address"
                       label="分类">
      </el-table-column>
      <el-table-column prop="name"
                       label="发布时间">
      </el-table-column>

      <el-table-column prop="name"
                       label="置顶">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="130">
        <template slot-scope="">
          <el-button type="text"
                     size="small">查看</el-button>
          <el-button type="text"
                     size="small">编辑</el-button>
          <el-button type="text"
                     size="small"
                     style="color:red">删除</el-button>
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
    <!-- 新增 -->
    <el-dialog title="添加站点"
               :visible.sync="dialogFormVisible"
               append-to-body
               top="0"
               width="50%">
      <el-form :model="form1"
               label-width="80px">
        <el-form-item label="站点名称"
                      :label-width="formLabelWidth">
          <el-input v-model="form1.name1"
                    placeholder="请输入站点名称"></el-input>
        </el-form-item>
        <el-form-item label="站点域名"
                      :label-width="formLabelWidth">
          <el-input v-model="form1.name1"
                    placeholder="请输入站点域名"></el-input>
        </el-form-item>
        <el-form-item label="Logo"
                      :label-width="formLabelWidth">
          <p style="margin:0">建议图片比例为 1:1(200 * 200像素)，支持png、jpg格式，小于50k

          </p>
          <el-upload class="avatar-uploader"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :show-file-list="false"
                     :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="站点管理员账号"
                      :label-width="formLabelWidth">
          <el-input v-model="form1.name1"
                    placeholder="要包含字母和数字"></el-input>
        </el-form-item>
        <el-form-item label="站点管理员密码"
                      :label-width="formLabelWidth">
          <el-input v-model="form1.name1"
                    placeholder="长度至少六位,包含字母和数字"></el-input>
        </el-form-item>

        <el-form-item label="所属区域"
                      :label-width="formLabelWidth">
          <el-select v-model="formInline.region"
                     placeholder="活动区域">
            <el-option label="区域一"
                       value="shanghai"></el-option>
            <el-option label="区域二"
                       value="beijing"></el-option>
          </el-select>

        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即新增</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'articlemgmt',
  data () {
    return {
      formInline: {
        user: '',
        region: '',
        date1: '',
        date2: ''
      },
      value1: true,
      value2: true,
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
      multipleSelection: []
    }
  },
  methods: {
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
    },
    // 跳转新增页面
    addarticle () {
      this.$router.push({ path: '/column/addarticle' })
    }
  }
}
</script>
<style lang="scss" scoped >
.el-pagination {
  text-align: center;
  margin: 20px 0;
}
.filter-container /deep/ .el-select,
.filter-container /deep/ .el-input {
  margin: 0;
  width: 150px;
}
</style>