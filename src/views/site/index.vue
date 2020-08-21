<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="formInline"
               ref="formInline"
               :rules="rules"
               class="demo-form-inline">

        <el-form-item label="站点域名"
                      prop="name">
          <el-input v-model="formInline.domainName"
                    placeholder="站点域名"></el-input>
        </el-form-item>

        <el-form-item label="站点名称"
                      prop="name">
          <el-input v-model="formInline.siteName"
                    placeholder="站点名称"></el-input>
        </el-form-item>
        <el-form-item label="所属区域"
                      prop="region">
          <el-select v-model="formInline.provinceCode"
                     placeholder="请选择"
                     @change="handleItemChange"
                     style="width:130px;margin-right:0">
            <el-option v-for="item in options1"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code">
            </el-option>
          </el-select>
          <el-select v-model="formInline.cityCode"
                     placeholder="请选择"
                     :disabled="formInline.provinceCode==''"
                     style="width:130px">
            <el-option v-for="item in options2"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间"
                      prop="time">
          <el-date-picker type="daterange"
                          v-model="date"
                          @change="time"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit ">查询</el-button>
          <el-button @click="resetForm1('formInline')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mb10">
      <el-button type="primary"
                 size="medium"
                 @click="dialogFormVisible = true,isid=false">新增</el-button>
    </div>

    <el-table ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style=""
              border
              @selection-change="handleSelectionChange">

      <el-table-column label="站点名称"
                       prop="siteName"
                       align="center">
      </el-table-column>
      <el-table-column prop="domainName"
                       label="站点域名"
                       align="center">
      </el-table-column>
      <el-table-column label="Logo"
                       align="center"
                       width="200">
        <template slot-scope="scope">

          <img :src="scope.row.logo"
               alt="">
        </template>
      </el-table-column>
      <el-table-column prop="name"
                       label="账号"
                       align="center"
                       width="200">
        <template slot-scope="scope">

          <span v-if="scope.row.siteManager!=null">{{scope.row.siteManager.mobile}}/{{scope.row.siteManager.password}}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属区域"
                       prop="provinceName"
                       align="center">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="创建时间"
                       align="center">
        <template slot-scope="scope">
          <span>
            {{scope.row.createTime | formatDate}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center">

        <template slot-scope="scope">

          <el-button type="text"
                     size="small"
                     @click="editor(scope)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :page-size="pageSize"
                   layout="total, prev, pager, next,jumper"
                   :total="total">
    </el-pagination>

    <!-- 新增 -->
    <el-dialog title="添加站点"
               :visible.sync="dialogFormVisible"
               append-to-body
               @close="close"
               top="0"
               width="550px">
      <el-form :model="form"
               label-width="80px"
               ref="form"
               :rules="rules">
        <el-form-item label="站点名称"
                      prop="siteName"
                      :label-width="formLabelWidth">
          <el-input v-model="form.siteName"
                    placeholder="请输入站点名称"></el-input>
        </el-form-item>
        <el-form-item label="站点域名"
                      prop="domainName"
                      :label-width="formLabelWidth"
                      required
                      :rules="[{ required: true, message: '请输入站点域名', trigger: 'blur' }]">
          <el-input v-model="form.domainName"
                    placeholder="请输入站点域名"
                    :disabled="isid"></el-input>
        </el-form-item>
        <el-form-item label="Logo"
                      prop="Logo"
                      :label-width="formLabelWidth">
          <p style="margin:0">建议图片比例为 1:1(200 * 200像素)，支持png、jpg格式，小于50k

          </p>
          <el-upload class="avatar-uploader"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="站点管理员账号"
                      prop="managerMobile"
                      :label-width="formLabelWidth">
          <el-input v-model="form.managerMobile"
                    placeholder="请输入手机号"
                    required></el-input>
        </el-form-item>
        <el-form-item label="站点管理员密码"
                      prop="password"
                      :label-width="formLabelWidth">
          <el-input v-model="form.password"
                    placeholder="长度至少六位"
                    required></el-input>
        </el-form-item>

        <el-form-item label="所属区域"
                      prop="cityCode"
                      :label-width="formLabelWidth">
          <el-select v-model="form.provinceCode"
                     placeholder="请选择"
                     @change="handleItemChange"
                     style="width:160px">
            <el-option v-for="item in options1"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code">
            </el-option>
          </el-select>
          <el-select v-model="form.cityCode"
                     placeholder="请选择"
                     :disabled="form.provinceCode==''"
                     style="width:160px">
            <el-option v-for="item in options2"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="后台应用"
                      prop="managerResCode"
                      :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.managerResCode">
            <el-checkbox :label="list.resCode"
                         v-for="(list,index) in mgmtarr"
                         :key="list.id">{{list.resName}}</el-checkbox>

          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="前台应用"
                      prop="customerResCode"
                      :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.customerResCode">
            <el-checkbox :label="list.resCode"
                         v-for="(list,index) in webarr"
                         :key="list.id">{{list.resName}}</el-checkbox>

          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="text-center dialogfixed">
          <el-button type="primary"
                     @click="addsite('form')"
                     v-show="!isid">确定</el-button>
          <el-button type="primary"
                     @click="editorsite('form')"
                     v-show="isid">确定</el-button>
          <el-button @click="resetForm('form')"
                     class="reset">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'sitemgmt',
  data () {
    return {
      formInline: {
        domainName: '',
        siteName: '',
        startDate: '',
        endDate: '',
        provinceCode: '',
        cityCode: ''
      },
      date: '',
      isid: false,
      form: {
        domainName: '',
        siteName: '',
        password: '',
        provinceCode: '',
        managerMobile: '',
        password: '',
        logo: '',
        customerResCode: [],
        managerResCode: [],
        provinceCode: '',
        cityCode: '',
      },
      options1: [],
      options2: [],

      formLabelWidth: '150px',

      dialogFormVisible: false,

      imageUrl: '',
      siteId: 57,
      tableData: [],
      pageNum: 1,
      pageSize: 20,
      data1: {},
      total: 0,
      rules: {
        siteName: [{ required: true, message: '请输入站点名称', }],
        // domainName: [{ required: true, message: '请输入站点域名', }],
        password: [{ required: true, message: '请输入密码', }],
        // Logo: [{ required: true, message: '请上传logo', }],
        managerMobile: [{ required: true, message: '请输入管理员账号', }],
        cityCode: [{ required: true, message: '请选择地区', }],
        customerResCode: [{ required: true, message: '请选择应用', }],
        managerResCode: [{ required: true, message: '请选择应用', }],
      },
      mgmtarr: [],
      webarr: [],

    }
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
  },
  created () {
    this.getsiteTable();
    this.findres()
    this.getValuesWithParent()
  },
  methods: {
    // 关闭弹窗清空表单
    close () {
      $('.reset').click()
    },
    // 重置表单
    resetForm (formName) {

      this.dialogFormVisible = false
      this.$refs[formName].resetFields();
      this.$refs[formName].clearValidate();
    },
    resetForm1 () {
      this.formInline.domainName = '';
      this.formInline.siteName = '';
      this.formInline.startDate = '';
      this.formInline.endDate = '';
      this.formInline.provinceCode = '';
      this.formInline.cityCode = '';
    },
    editorsite (formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/site/updateSite',
            this.form
          )
            .then(function (response) {
              if (response.data.status == '200') {
                that.$message({
                  message: '修改成功',
                  type: 'success'
                });
                that.getsiteTable();
                that.$refs[formName].clearValidate();
                that.$refs[formName].resetFields();
                that.form.provinceCode = ''
                that.dialogFormVisible = false;
              } else {
                that.$message({
                  message: response.data.msg,
                  type: 'error'
                });
                that.$refs[formName].clearValidate();
                that.$refs[formName].resetFields();
                that.form.provinceCode = ''
                that.dialogFormVisible = false;
              }

            })
            .catch(function (error) {
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    editor (scope) {

      this.isid = true;
      this.dialogFormVisible = true
      var row = scope.row;
      console.log(row)
      this.form.domainName = row.domainName
      this.form.siteName = row.siteName
      this.form.password = row.password
      this.form.provinceCode = row.provinceCode
      this.form.managerMobile = row.siteManager.mobile
      this.form.password = row.siteManager.password
      this.form.logo = row.logo
      // this.form.customerResCode = row.customerResCode
      // this.form.managerResCode = row.managerResCode

      this.form.cityCode = row.cityCode
      this.$set(this.form, 'id', row.id)
      console.log(this.form)

    },
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
    //新增站点
    addsite (formName) {

      this.$delete(this.form, 'id')
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/site/addSite',
            this.form
          )
            .then(function (response) {
              if (response.data.status == '200') {
                that.$message({
                  message: '添加成功',
                  type: 'success'
                });
                that.dialogFormVisible = false;
                that.getsiteTable();
                that.$refs[formName].clearValidate();
                that.$refs[formName].resetFields();
                that.form.provinceCode = ''
              } else {
                that.$message({
                  message: response.data.msg,
                  type: 'error'
                });
                that.dialogFormVisible = false;
                that.$refs[formName].clearValidate();
                that.$refs[formName].resetFields();
                that.form.provinceCode = ''
              }
              // that.options1 = response.data.data.data

            })
            .catch(function (error) {
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    findres () {
      var that = this
      this.$axios.get('/api/res/findResList?isNotSite=1&resCategory=0', {})
        .then(function (response) {
          that.mgmtarr = response.data.data
        })
        .catch(function (error) {
        });
      this.$axios.get('/api/res/findResList?isNotSite=1&resCategory=1',)
        .then(function (response) {
          that.webarr = response.data.data
        })
        .catch(function (error) {
        });
    },
    getsiteTable () {
      var that = this
      this.$axios.post('/api/site/findSitePage', {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        param: this.data1
      })
        .then(function (response) {
          that.tableData = response.data.data.list
          that.total = response.data.data.total

        })
        .catch(function (error) {

        });
    },
    time (val) {
      this.formInline.startDate = val[0];
      this.formInline.endDate = val[1];
    },
    // 查询
    onSubmit () {
      this.pageNum = 1;
      var that = this
      this.$axios.post('/api/site/findSitePage', {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        param: this.formInline
      })
        .then(function (response) {
          if (response.data.status == '200') {
            that.tableData = response.data.data.list
            that.total = response.data.data.total;
            that.$notify({
              title: '成功',
              message: '查询成功',
              type: 'success'
            });
          } else {
            that.$notify({
              title: '失败',
              message: '查询失败',
              type: 'warning'
            });
          }


        })
        .catch(function (error) {

        });
    },

    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    handleSizeChange (val) {
      this.pageNum = val
      this.getsiteTable()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.getsiteTable()
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleItemChange (val) {
      this.formInline.cityCode = '';
      this.form.cityCode = '';
      var that = this
      this.$axios.get('/api/dict/getValuesWithParent?categoryCode=REGION&siteId=' + this.siteId + '&parentCode=' + val,)
        .then(function (response) {
          that.options2 = response.data.data.data
        })
        .catch(function (error) {
        });
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
.el-form-item .el-date-editor .el-range-separator {
  width: auto !important;
}
</style>