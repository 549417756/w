import { debounce } from '@/utils'
// 初始化数据
export default {
  data() {
    return {
      list: null,
      total: 0,
      dialogStatus: '',
      listQuery: {
        page: 1,
        size: 20,
        keyword: null
      }
    }
  },
  watch: {
    listQuery: {
      handler: 'handleFilter', // filter
      deep: true,
      immediate: true
    }
  },
  computed: {
    title() {
      const title = this.$route.meta.title
      return this.dialogStatus === 'create' ? `添加${title}` : `编辑${title}`
    }
  },
  methods: {
    // 过滤
    handleFilter: debounce(function() {
      this.getTableList()
    }, 500),
    // 创建
    handleCreate() {
      this.dialogStatus = 'create'
      Object.assign(this.$data.ruleForm, this.$options.data().ruleForm)
      // 删除 edit 的 id
      delete this.$data.ruleForm.id
      this.showDialog()
    },
    // 编辑
    handleUpdate(row) {
      this.dialogStatus = 'update'
      for (const key in this.ruleForm) {
        if (typeof row[key] === 'object') {
          this.ruleForm[key] = row[key].id
        } else {
          this.ruleForm[key] = row[key]
        }
      }
      this.ruleForm.id = row.id
      this.showDialog()
    },
    showDialog() {
      this.$refs['dialog'].show() // show dialog
      this.$nextTick(() => {
        this.$refs['form'].clear() // 清除校验
      })
    },
    handleValidate() {
      this.$refs['form'].validate() // 表单校验
    },
    // 删除事件
    handleDelete(row, event) {
      this.dialogStatus = 'delete'
      this.$confirm('删除后无法恢复，确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http[event]({ id: row.id }).then(response => {
            this.message(response)
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // message
    message(response) {
      if (response.code === 200) {
        const notifyMessage = {
          create: '创建成功！',
          update: '修改成功！',
          delete: '删除成功！'
        }
        const h = this.$createElement
        const name = this.$route.meta.title
        const msg = notifyMessage[this.dialogStatus]
        this.$notify({
          title: name,
          message: h('i', { style: 'color: teal' }, msg),
          duration: 5000
        })
        this.getTableList() // reload form
        if (this.dialogStatus !== 'delete') {
          this.$refs['dialog'].hidden() // hidden dialog
        }
      } else {
        this.$message({
          message: response.message,
          type: 'error'
        })
      }
    }
  }
}
