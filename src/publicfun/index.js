import { Message } from 'element-ui'
// 初始化数据
export const mixinData = {
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      multipleSelected: [],
      dialogStatus: '',
      editShow: false,
      dialogFormVisible: false,
      prompt: null,
      listQuery: {
        page: 1,
        size: 10
      }
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    showNotify(response) {
      if (response.code === 200) {
        this.notify(this, response.msg)
        this.getTableList()
      } else {
        this.$message({
          showClose: true,
          message: response.msg,
          type: 'error'
        })
      }
    },
    notify(_this, message) {
      _this.$notify({
        title: '成功',
        message: message,
        type: 'success',
        duration: 2000
      })
    }
  }
}
// 删除，批量删除
export const mixinDelete = {
  methods: {
    // 删除一行
    handleSingleDelete(row) {
      this.deleteEvent({ id: [row.id] })
    },
    // 删除事件
    deleteEvent(prop) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.handleDelete(prop)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
// 创建，更新数据 关闭弹框
export const mixinCreate = {
  methods: {
    handleCreate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.createData()
        }
      })
    },
    closeDialog() {
      for (var item in this.form) {
        this.form[item] = ''
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}

// 分页
export const mixinPaging = {
  methods: {
    parameter(par) {
      this.listQuery.page = par.page
      this.listQuery.size = par.limit
      this.getTableList()
    },
    errInfo(par) {
      Message({
        message: `${par}`,
        type: 'error'
      })
    }
  }
}

