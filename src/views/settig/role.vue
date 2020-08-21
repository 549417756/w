<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline">
        <el-form-item>
          <el-button type="primary"
                     size="medium"
                     @click="resetForm">新增</el-button>
        </el-form-item>
        <el-form-item class="fr">
          <el-button @click="onSubmit">搜索</el-button>

        </el-form-item>
        <el-form-item class="fr">
          <el-input v-model="formInline.name"
                    placeholder="请输入角色名称"></el-input>
        </el-form-item>

      </el-form>
    </div>

    <el-table ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style=""
              border>

      <el-table-column label="角色"
                       prop="name"
                       align="center">
      </el-table-column>

      <el-table-column label="角色类型"
                       prop="roleType"
                       align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.roleType=='3'">用户管理员</span>
          <span v-if="scope.row.roleType=='4'">用户</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark"
                       label="描述"
                       align="center">
      </el-table-column>

      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">

          <el-button type="text"
                     size="small"
                     @click="editor(scope.row)">编辑</el-button>
          <el-button type="text"
                     size="small"
                     style="color:red"
                     @click="disabledrole(scope)"
                     v-show="scope.row.status=='1'">禁用</el-button>
          <el-button type="text"
                     size="small"
                     style="color:red"
                     @click="disabledrole(scope)"
                     v-show="scope.row.status=='0'">恢复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="
                     handleSizeChange"
                   @current-change="handleCurrentChange"
                   :page-size="pageSize"
                   layout="total, prev, pager, next,jumper"
                   :total="total">
    </el-pagination>
    </el-pagination>
    <!-- 新增 -->
    <el-dialog title="角色"
               :visible.sync="dialogFormVisible"
               append-to-body
               top="0"
               @close="close"
               width="550px">
      <el-form :model="form1"
               ref="form1"
               :rules="rules"
               label-width="80px">
        <el-form-item label="角色名称"
                      :label-width="formLabelWidth"
                      prop="name">
          <el-input v-model="
                      form1.name"
                    class="a"
                    placeholder="请输入角色名称">
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="角色类型"
                      :label-width="formLabelWidth"
                      prop="type">
          <template>
            <el-radio v-model="form1.type"
                      label="3">管理员</el-radio>
            <el-radio v-model="form1.type"
                      label="4">普通用户</el-radio>
          </template>
        </el-form-item> -->

        <el-form-item label="角色描述"
                      :label-width="formLabelWidth"
                      prop="des">
          <el-input type="textarea"
                    v-model="form1.des"></el-input>
        </el-form-item>

        <el-form-item label="授权管理"
                      :label-width="formLabelWidth"
                      prop="list">
          <el-tree :data="treedata"
                   v-model="form1.list"
                   show-checkbox
                   node-key="id"
                   ref="tree"
                   @check-change="getCheckedKey"
                   :default-checked-keys="checkedArr"
                   :props="defaultProps">
          </el-tree>

        </el-form-item>

        <el-form-item class="dialogfixed">
          <el-button @click="addrole('form1')"
                     type="primary">确定</el-button>

          <el-button @click="restform('form1')"
                     class="reset">取消</el-button>

        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'role',
  data () {
    return {
      formInline: {
        name: ''
      },
      treedata: [],
      defaultProps: {
        children: 'children',
        label: 'resName'
      },
      form1: {
        name: '',
        list: [],
        des: '',
      },
      isshow: false,
      formLabelWidth: '80px',
      dialogFormVisible: false,
      siteId: 0,
      // siteId: this.$store.state.siteid,
      tableData: [],
      multipleSelection: [],
      pageNum: 1,
      pageSize: 20,
      total: 0,
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        des: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        list: [
          { required: true, message: '请授权', trigger: 'blur' }
        ]
      },
      mgmtarr: [],
      webarr: [],
      checkedArr: [],
      addurl: '',
      subdata: {},
      id: ''
    }
  },
  created () {
    this.getrolelist()

  },
  methods: {
    // 禁用用户
    disabledrole (scope) {
      var id = scope.row.id
      var that = this
      this.$axios.get('/api/role/updateRoleStatus?roleId=' + scope.row.id + '&status=' + scope.row.status + '&siteId=' + this.siteId,)
        .then(function (response) {

          if (response.data.status == '200') {
            // that.$set(that.)
            that.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            });
          } else {
            that.$notify({
              title: '失败',
              message: '操作失败',
              type: 'warning'
            });
          }

        })
        .catch(function (error) {
        });
    },
    // 获取树节点
    getCheckedKey () {

      this.form1.list = this.$refs.tree.getCheckedKeys();
      console.log(this.form1.list)
    },
    // 重置表单
    restform (formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields();
      this.$refs[formName].clearValidate();
    },
    // 关闭弹框
    close () {
      $('.reset').click()
    },
    // 增加修改角色
    addrole (formName) {
      var that = this
      this.subdata = {
        name: this.form1.name,
        remark: this.form1.des,
        resIds: this.form1.list,
        siteId: this.siteId
      }
      if (this.isshow == true) {
        this.addurl = '/api/role/saveRole'

      } else {
        this.addurl = '/api/role/updateRole'
        this.$set(this.subdata, 'id', this.id)
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(this.addurl, this.subdata)
            .then(function (response) {

              if (response.data.status == '200') {
                that.$notify({
                  title: '成功',
                  message: '操作成功',
                  type: 'success'
                });
              } else {
                that.$notify({
                  title: '失败',
                  message: '操作失败',
                  type: 'warning'
                });
              }
              that.dialogFormVisible = false
              $('.reset').click()
              that.getrolelist()
            })
            .catch(function (error) {
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    // houtia应用
    findmgmt () {
      var that = this
      this.$axios.get('/api/res/findResList?isNotSite=1&resCategory=0', {})
        .then(function (response) {
          that.treedata = response.data.data
        })
        .catch(function (error) {
        });
    },
    // 前台应用
    finduser () {
      var that = this
      this.$axios.get('/api/res/findResList?isNotSite=1&resCategory=1',)
        .then(function (response) {
          that.treedata = response.data.data
          for (var i = 0; i < that.treedata.length; i++) {
            if (that.treedata[i].children == 'null') {
              that.$set(that.treedata[i], 'children', [])
            }
          }
        })
        .catch(function (error) {
        });
    },

    // 获取角色列表
    getrolelist () {
      var that = this
      this.$axios.post('/api/role/findRoleBySiteIdPage', {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        param: {
          siteId: this.siteId,
          name: this.formInline.name,
        }
      })
        .then(function (response) {
          that.tableData = response.data.data

        })
        .catch(function (error) {

        });
    },
    // 重置用户表单
    resetForm () {
      this.isshow = true
      this.dialogFormVisible = true
      this.findmgmt()
    },
    // 修改用户
    editor (row) {
      this.isshow = false
      this.dialogFormVisible = true
      this.form1.name = row.name;
      this.form1.des = row.remark;
      this.id = row.id

      if (row.roleType == '3') {
        this.findmgmt()
      } else {
        this.finduser()
      }
    },
    // 搜索
    onSubmit () {
      this.getrolelist()
    },
    // 分页

    handleSizeChange (val) {
      this.pageNum = val
      this.getrolelist()
    },
    handleCurrentChange (val) {

      this.pageNum = val
      this.getrolelist()
    },



  }
}
</script>
<style lang="scss" scope >
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