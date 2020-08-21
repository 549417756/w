<template>
  <div class="app-container">
    <div class="fl lefttree">
      <el-button type="text"
                 @click="dialogFormVisible = true">新建部门</el-button>
      <el-button type="text"
                 @click="dialogFormVisible1 = true">导入部门</el-button>
      <el-button type="text"
                 @click="editortree(show1)">编辑</el-button>
      <el-input placeholder="请输入内容"
                v-model="filterText"
                prefix-icon="el-icon-search"
                class="seach mb10">
      </el-input>

      <el-tree class="filter-tree"
               :data="treedata"
               :props="defaultProps"
               node-key="id"
               :filter-node-method="filterNode"
               :render-content="renderContent"
               :expand-on-click-node="false"
               @node-click="handleNodeClick"
               @node-expand="showedt"
               ref="tree">
      </el-tree>

    </div>
    <div class="fl righttable">
      <p>
        <span class="treename ">xxx卫健委<el-button class="el-icon-setting"
                     type="text"
                     style="width:30px"
                     @click="dialogFormVisible4 = true"></el-button>
          <el-tag v-show="orgshow">机构码：{{orgid}}</el-tag>
        </span>
        <el-button class="fr ml10"
                   @click="dialogFormVisible3 = true">导入用户</el-button>
        <el-button class="fr"
                   type="primary"
                   @click="dialogFormVisible2 = true">添加用户</el-button>
        <span class="clearfix"></span>
      </p>

      <el-table ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style=""
                :resizable="false"
                border>

        <el-table-column label="姓名"
                         prop="name "
                         align="center"
                         :resizable="false">
        </el-table-column>

        <el-table-column label="手机号"
                         prop="mobile"
                         align="center"
                         :resizable="false">

        </el-table-column>
        <el-table-column prop="角色"
                         label="角色"
                         align="center"
                         :resizable="false">
        </el-table-column>
        <el-table-column prop="状态"
                         label="状态"
                         align="center"
                         :resizable="false">
        </el-table-column>

        <el-table-column label="操作"
                         width="130"
                         align="center"
                         :resizable="false">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="editor">编辑</el-button>
            <el-button type="text"
                       @click="disableuser(scope)">禁用</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="clear:both"></div>
    <!-- 新建部门 -->
    <el-dialog title="新建部门"
               :visible.sync="dialogFormVisible"
               append-to-body
               top="0"
               width="550px">
      <el-form :model="form1"
               label-width="80px">
        <el-form-item label="部门名称"
                      :label-width="formLabelWidth">
          <el-input v-model="form.name"
                    placeholder="请输入部门名称"></el-input>
        </el-form-item>

        <el-form-item label="上级部门"
                      :label-width="formLabelWidth">
          <el-tree class="filter-tree"
                   :data="treedata"
                   :props="defaultProps"
                   node-key="id"
                   show-checkbox
                   :check-strictly="true"
                   @check-change="handleCheckChange"
                   :filter-node-method="filterNode"
                   :render-content="renderContent"
                   ref="tree2">
          </el-tree>

        </el-form-item>
        <el-form-item class=" dialogfixed">
          <el-button type="primary"
                     @click="newdep">确定</el-button>
          <el-button @click="dialogFormVisible=false">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
    <!-- 导入部门 -->
    <el-dialog title="导入部门"
               :visible.sync="dialogFormVisible1"
               append-to-body
               top="0"
               width="550px">
      <div>
        <div style="height: 200px;width:50px"
             class="fl">
          <el-steps direction="vertical"
                    :active="1">
            <el-step title="1">
              <template>
                <div>

                </div>
              </template>

            </el-step>
            <el-step title="2">

            </el-step>

          </el-steps>
        </div>
        <div style="height: 300px;"
             class="fl">
          <p class="org_text"><b>下载组织部门模板填写信息</b></p>
          <el-button type="primary"
                     style="margin-bottom:95px">
            <a :href="`${publicPath}template.xls`"
               download="导入模板">下载模板</a> </el-button>
          <p class="org_text"><b>上传填写好的部门信息表格</b></p>
          <el-upload class="upload-demo"
                     action="/api/org/importOrg"
                     ref="upload"
                     :on-change="handleChange"
                     :data="file"
                     :on-success="onsuccess"
                     :on-error="onerror"
                     multiple
                     :auto-upload="false"
                     :before-upload="beforeUpload"
                     :file-list="fileList3">
            <el-button type="primary">点击上传</el-button>

          </el-upload>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="text-center dialogfixed">
        <el-button type="primary"
                   @click=" submitUpload">立即新增</el-button>
        <el-button @click="dialogFormVisible1 = false">取消</el-button>
      </div>

    </el-dialog>

    <!-- 导入用户-->
    <el-dialog title="导入人员"
               :visible.sync="dialogFormVisible3"
               append-to-body
               top="0"
               width="550px">
      <div>
        <div style="height: 200px;width:50px"
             class="fl">
          <el-steps direction="vertical"
                    :active="1">
            <el-step title="1">
              <template>
                <div>

                </div>
              </template>

            </el-step>
            <el-step title="2">

            </el-step>

          </el-steps>
        </div>
        <div style="height: 300px;"
             class="fl">
          <p class="org_text"><b>下载通讯录模版，填写成员信息</b></p>
          <el-button type="primary"
                     style="margin-bottom:95px">下载模板</el-button>
          <p class="org_text"><b>上传填好的文件</b></p>
          <el-button>选择文件</el-button>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="text-center dialogfixed">
        <el-button type="primary">立即新增</el-button>
        <el-button>取消</el-button>
      </div>

    </el-dialog>
    <el-dialog title="修改部门名称"
               :visible.sync="dialogFormVisible4"
               append-to-body
               top="0"
               width="550px">
      <el-form :model="form1"
               label-width="80px">
        <el-form-item label="部门名称"
                      :label-width="formLabelWidth">
          <el-input v-model="form.name"
                    placeholder="请输入部门名称"></el-input>
        </el-form-item>

        <el-form-item label="上级部门"
                      :label-width="formLabelWidth">
          <el-tree class="filter-tree"
                   :data="treedata"
                   :props="defaultProps"
                   node-key="id"
                   show-checkbox
                   :filter-node-method="filterNode"
                   :render-content="renderContent"
                   ref="tree3">
          </el-tree>

        </el-form-item>
        <el-form-item class="dialogfixed">
          <el-button type="primary">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
    <!-- 添加用户 -->
    <el-dialog title="用户"
               :visible.sync="dialogFormVisible2"
               append-to-body
               top="0"
               @close="close"
               width="550px">
      <el-form :model="adduser"
               label-width="80px"
               ref="adduser"
               :rules="rules">
        <el-form-item label="姓名"
                      :label-width="formLabelWidth"
                      prop="realName">
          <el-input v-model="adduser.realName"
                    placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
                      :label-width="formLabelWidth"
                      prop="mobile">
          <el-input v-model="adduser.mobile"
                    placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="角色"
                      :label-width="formLabelWidth"
                      prop="roles">
          <el-checkbox-group v-model="adduser.roles"
                             @change="getrolearr">
            <el-checkbox v-for="list in roleArr"
                         :label="list.id"
                         :key="list.id">{{list.name}}</el-checkbox>
          </el-checkbox-group>

        </el-form-item>
        <el-form-item label="上级部门"
                      :label-width="formLabelWidth"
                      prop="orgIds">

          <el-tree class="filter-tree"
                   :data="treedata"
                   :props="defaultProps"
                   v-model="adduser.orgIds"
                   node-key="id"
                   show-checkbox
                   @check-change="getCheckedKey"
                   :expand-on-click-node="false"
                   @node-expand="showedt"
                   ref="tree4">
          </el-tree>
        </el-form-item>
        <el-form-item class="dialogfixed">
          <el-button type="primary"
                     @click="adduserinfo('adduser')">确定</el-button>
          <el-button @click="resetForm('adduser')"
                     class="reset">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      publicPath: process.env.BASE_URL,
      orgid: '',
      orgshow: false,
      // 修改用户
      user: {
        tel: '',
        role: '',
        region: ''
      },

      // 添加用户
      adduser: {
        realName: '',
        mobile: '',
        siteId: this.$store.state.siteid,
        orgIds: [],
        roles: [],
      },
      form1: {
        name1: ''
      },
      file: {
        siteId: this.$store.state.siteid,
      },
      show: false,
      show1: 1,
      filterText: '',
      //  新建部门
      dialogFormVisible: false,
      form: {
        name: '',
      },
      parentId: '',
      parentCode: '',
      code: '',
      orgName: '',
      // ·=导入部门
      dialogFormVisible1: false,
      siteId: this.$store.state.siteid,
      // siteId: 57,
      // 添加用户
      dialogFormVisible2: false,
      rules: {
        realName: [{ required: true, message: '请输入姓名', }],
        mobile: [{ required: true, message: '请输入手机号', }],
        // role: [{ required: true, message: '请选择角色', }],
        orgIds: [{ required: true, message: '请选择机构', }],
      },
      roleArr: [],
      // 导入用户
      dialogFormVisible3: false,
      // 修改部门名字
      dialogFormVisible4: false,
      // 编辑用户
      dialogFormVisible5: false,
      formLabelWidth: '',
      treedata: [],
      tableData: [],
      defaultProps: {
        children: 'children',
        label: 'orgName'
      },
      checked: [],
      fileList3: [],
    };
  },
  watch: {
    filterText (val) {
      console.log(this.$refs)
      this.$refs.tree.filter(val);
    }
  },
  created () {
    this.gettree()
    this.findsiterole()
  },
  methods: {
    close () {
      $('.reset').click()
    },
    resetForm (formName) {
      this.dialogFormVisible2 = false
      this.$refs[formName].resetFields();
      this.$refs[formName].clearValidate();
    },

    getCheckedKey (val) {

      this.adduser.orgIds = this.$refs.tree4.getCheckedKeys();

    },
    getrolearr (val) {
      console.log(val)
    },
    //查找角色
    findsiterole () {
      var that = this
      this.$axios.get('/api/role/findRoleBySiteId?siteId=' + this.siteId, {


      }).then(function (response) {
        that.roleArr = response.data.data;
      })
        .catch(function (error) {
          console.log(error);
        });

    },
    // 添加用户
    adduserinfo (formName) {
      this.dialogFormVisible2 = true;
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/account/addAccount', this.adduser).then(function (response) {
            if (response.data.status == '200') {
              // that.$set(that.)
              that.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
              });
              that.$refs[formName].clearValidate();
              that.$refs[formName].resetFields();
              that.dialogFormVisible2 = false;
            } else {
              that.$notify({
                title: '失败',
                message: '操作失败',
                type: 'warning'
              });
              that.$refs[formName].clearValidate();
              that.$refs[formName].resetFields();
              that.dialogFormVisible2 = false;
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 上传部门导入模板
    submitUpload () {
      this.$refs.upload.submit();
    },

    // 编辑2
    showedt () {
      if (this.show1 == 2) {
        this.$nextTick(function () {
          $('.el-tree').find('.show').show()
        })
      } else {
        this.$nextTick(function () {
          $('.el-tree').find('.show').hide()
        })

      }
    },
    // 获取树
    gettree () {
      var that = this;
      this.$axios.get('/api/org/getOrgListBySiteIdAndParentId?parentId=0&siteId=' + this.siteId, {

      }).then(function (response) {
        that.treedata = response.data.data;
      })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 新加部门
    newdep () {
      var that = this
      this.$axios.post('/api/org/addOrg', {
        orgName: that.form.name,
        parentId: that.parentId,
        siteId: this.siteId,
        code: that.code,
        parentCode: that.parentCode
      })
        .then(function (response) {
          that.$message({
            message: '添加成功',
            type: 'success'
          });
          that.dialogFormVisible = false
          that.gettree()
          // console.log(response.data.data);
        })
        .catch(function (error) {
          that.$message({
            message: '创建失败，请选择上级部门',
            type: 'warning'
          });
        });
    },
    // 禁用用户
    disableuser (rows) {
      console.log(rows.row)
    },
    // 编辑
    editor (rows) {
      this.dialogFormVisible5 = true
    },
    // 显示部门删除按钮
    editortree (a) {

      if (a == 1) {
        $('.show').show()
        this.show1 = 2
      } else {
        $('.show').hide()
        this.show1 = 1
      }

    },
    // 部门搜索过滤
    filterNode (value, data) {
      if (!value) return true;
      return data.orgName.indexOf(value) !== -1;
    },
    // 禁用部门
    remove (node, data) {
      var that = this
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      console.log(data.id)
      this.$confirm('此操作将禁用改部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('/api/org/delOrg?id=' + data.id + '&siteId=' + this.siteId, {

        }).then(function (response) {
          if (response.data.status == '200') {
            that.$message({
              type: 'success',
              message: '禁用成功!'
            });
            children.splice(index, 1);
          } else {
            that.$message({
              type: 'error',
              message: response.data.msg
            });

          }

        })
          .catch(function (response) {
            that.$message({
              type: 'error',
              message: response.data.msg
            });
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁用'
        });
      });


    },
    //点击树获取节点数据源
    handleNodeClick (data, node, a) {
      this.orgshow = true
      this.orgid = data.id
      var that = this
      this.$axios.post('/api/account/findAccountInfoPage', {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        param: {
          orgId: this.orgid,
          siteId: this.siteId,
        }
      })
        .then(function (response) {
          that.tableData = response.data.data
        })
        .catch(function (error) {
        });
    },
    // 禁止多次选择部门，只能选择一次
    handleCheckChange (data, checked, indeterminate) {
      let { id } = data
      console.log(data)
      let index = this.checked.indexOf(id)
      // 当前节点不在this.checked中,且当前节点为选中状态
      if (index < 0 && this.checked.length && checked) {
        this.$message.warning('只能选择一个上级部门')
        this.$refs.tree2.setChecked(data, false)  // 取消当前节点的选中状态
        return
      }
      // 当前节点在this.checked中,当前节点为未选中状态(主动去掉当前选中状态)
      if (!checked && index >= 0 && this.checked.length) {
        this.checked = []
        return
      }
      // 当前节点不在this.checked(长度为0)中,当前节点为选中状态,this.checked中存储当前节点id
      if (index < 0 && !this.checked.length && checked) {
        this.checked.push(id)
      }
      this.parentId = data.id;
      this.parentCode = data.parentCode;
      this.orgName = data.orgName
      this.code = data.code
      console.log(data, checked, indeterminate);
    },
    // 树的每行添加禁用按钮
    renderContent (h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span v-show="this.show" class="show">

            <el-button style="font-size: 12px;" type="text" on-click={() => this.remove(node, data)}>禁用</el-button>
          </span>
        </span>);
    },
    handleChange (file, fileList) {
      // this.file.file = file.raw
      // console.log(file)
      // this.fileList3 = fileList.slice(-3);
    },
    // 上传前
    beforeUpload (file) {
      console.log(file)
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      // const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'warning'
        });
      }
      // if(!isLt2M) {
      //     this.$message({
      //         message: '上传文件大小不能超过 10MB!',
      //         type: 'warning'
      //     });
      // }
      // return (extension || extension2) && isLt2M
      return extension || extension2
    },
    // 上传成功
    onsuccess (response, file, fileList) {
      console.log(response, file, fileList)
      this.dialogFormVisible1 = false
      this.$message({
        message: '导入部门成功',
        type: 'success'
      });
      this.fileList3 = []
      this.gettree()
    },
    // 导入失败
    onerror (err, file, fileList) {
      this.$message({
        message: '导入部门失败，请重新导入',
        type: 'warning'
      });
      this.fileList3 = []
    }
  },


};
</script>
<style lang="scss" scope="">
.seach .el-input__inner {
  width: 200px;
}

.org_text {
  margin: 0 0 15px;
  font-size: 20px;
}
.lefttree {
  width: 250px;
  padding: 20px 0;
  background: #fff;
}
.treename {
  color: #282828;
  line-height: 40px;
}
.righttable {
  min-height: 500px;
  margin-left: 5px;
  padding: 0;
  padding-left: 15px;
  border-left: 1px solid #eee;
  width: -moz-calc(100% - 255px);

  width: -webkit-calc(100% - 255px);
  background: #fff;
  width: calc(100% - 255px);
}
.show {
  display: none;
}
</style>