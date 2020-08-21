<template>
  <div class="app-container">
    <search>
      <el-input v-model="listQuery.keyword" placeholder="编号" />
      <span class="filter-item">校牌状态：</span>
      <el-select v-model="listQuery.status" clearable>
        <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <add-button text="批量分配" @click.native="distributeSome" />
      <el-upload
        action="/"
        :show-file-list="false"
        :on-change="importExcel"
        :auto-upload="false"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        style="float: right; margin-right: 50px;"
      >
        <el-button slot="trigger" icon="el-icon-upload">导入</el-button>
      </el-upload>
    </search>
    <data-table :list="list" :table-fields="tableFields" @change="change">
      <template v-slot:selection>
        <el-table-column type="selection" width="55" :selectable="checkDisabled">
        </el-table-column>
      </template>
      <template v-slot="{ row }">
        <svg-icon
          v-if="row.status.id === 0"
          icon-class="distribute"
          title="分配"
          @click.native="distributeSignle(row)"
        />
        <svg-icon
          v-if="row.status.id === 1"
          icon-class="recycle"
          title="回收"
          @click.native="handleRecycle(row)"
        />
        <svg-icon
          v-if="row.status.id === 0"
          icon-class="delete"
          title="删除"
          @click.native="handleDelete(row, 'deleteDevice')"
        />
      </template>
    </data-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getTableList"
    />

    <!-- 分配 -->
    <el-dialog v-el-drag-dialog center :title="distributeType.title" :visible.sync="visible">
      <div class="warning-container">
        <el-alert
          :title="distributeType.message"
          type="warning"
          :closable="false"
          show-icon
        ></el-alert>
      </div>
      <el-tree
        ref="tree"
        show-checkbox
        accordion
        node-key="id"
        highlight-current
        :props="props"
        :load="loadNode"
        lazy
        @check-change="handleCheckChange"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button
          v-if="mode === 'signle'"
          type="primary"
          :disabled="signleWarning"
          @click="createData"
        >确定</el-button>
        <el-button
          v-if="mode === 'some'"
          type="primary"
          :disabled="someWarning"
          @click="createData"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import MixinTable from '@/tablemixin'

export default {
  name: 'Device',
  mixins: [MixinTable],
  data() {
    return {
      visible: false,
      mode: '',
      statusList: [
        { id: 0, name: '未绑定' },
        { id: 1, name: '已绑定' }
      ],
      multipleSelect: [],
      listQuery: {
        status: null
      },
      tableFields: [
        { prop: 'number', label: '校牌编号' },
        { prop: 'status.name', label: '状态' },
        { prop: 'create_time', label: '添加时间' },
        { prop: 'actions', label: '操作' }
      ],
      props: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      },
      checkArray: [],
      signleTip: {
        title: '校牌分配',
        message: '一个校牌只能分配给一个学生'
      },
      someTip: {
        title: '校牌批量分配',
        message: '批量分配时校牌数量不能低于选择的学生的数量'
      }
    }
  },
  computed: {
    signleWarning() {
      return this.checkArray.length > 1
    },
    someWarning() {
      return this.checkArray.length > this.multipleSelect.length
    },
    distributeType() {
      return this.mode === 'signle' ? this.signleTip : this.someTip
    }
  },
  methods: {
    checkDisabled(row) {
      return row.status.id === 0 ? 1 : 0
    },
    // 获取年级班级列表
    fetchGradeClassList(id) {
      return new Promise((resolve, reject) => {
        this.$http
          .fetchGradeList({ pid: id })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 根据年级班级获取学生列表
    fetchStudentList(data) {
      return new Promise((resolve, reject) => {
        this.$http
          .fetchStudentById(data)
          .then(({ data }) => {
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getTableList() {
      this.$http.fetchDeviceList(this.listQuery).then(({ data: { lists, total }}) => {
        this.list = lists
        this.total = total
      })
    },
    change(val) {
      this.multipleSelect = []
      val.forEach(device => {
        this.multipleSelect.push(device.id)
      })
    },
    // 批量分配
    distributeSome(row) {
      this.temp()
      if (this.multipleSelect.length !== 0) {
        this.visible = true
        this.mode = 'some'
      } else {
        this.$message.error('请选择需要分配的校牌')
      }
    },
    // 单一分配
    distributeSignle(row) {
      this.temp()
      this.visible = true
      this.mode = 'signle'
      this.multipleSelect.push(row.id)
    },
    temp() {
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys([])
      }
      this.checkArray = []
    },
    // 设备分配与批量分配
    createData() {
      this.$http
        .allotDevice({ device: this.multipleSelect, student: this.checkArray })
        .then(({ data }) => {
          if (data.successData.length !== 0 && data.errorData.length === 0) {
            this.tip('校牌分配成功')
            this.visible = false
          } else {
            this.$message.error(data.msg)
            this.visible = false
          }
        })
    },
    handleCheckChange() {
      this.checkArray = this.$refs.tree.getCheckedKeys(true, true)
    },
    // 设备导入
    async importExcel(file) {
      const number = []
      const tabData = await this.file2Xce(file)
      tabData.forEach(item => {
        item.sheet.forEach(sheet => {
          number.push(sheet['校牌编号'])
        })
      })

      const array = number.sort()
      for (var i = 0; i < array.length - 1; i++) {
        if (array[i] === array[i + 1]) {
          this.$message.error(`校牌编号重复 重复编号为 ${array[i]}`)
          return false
        }
      }
      this.$http.importDevice({ number }).then(({ data }) => {
        if (data.successData.length !== 0 && data.errorData.length === 0) {
          this.tip('校牌导入成功')
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 解析.xlsx
    file2Xce(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = function(e) {
          const data = e.target.result
          this.wb = XLSX.read(data, {
            type: 'binary'
          })
          const result = []
          this.wb.SheetNames.forEach(sheetName => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            })
          })
          resolve(result)
        }
        reader.readAsBinaryString(file.raw)
      })
    },
    // 加载子节点
    async loadNode(node, resolve) {
      if (node.level === 0) {
        const data = await this.fetchGradeClassList(0)
        return resolve(data)
      } else if (node.level === 1) {
        const data = await this.fetchGradeClassList(node.data.id)
        resolve(data)
      } else if (node.level === 2) {
        const gradeId = node.parent.data.id
        const classId = node.data.id
        const data = await this.fetchStudentList({ grade: gradeId, class: classId })
        data.forEach(item => {
          item.leaf = true
        })
        resolve(data)
      } else {
        return resolve([])
      }
    },
    tip(msg) {
      this.$notify({
        title: '成功',
        message: msg,
        type: 'success',
        duration: 5000
      })
      this.getTableList() // reload form
    },
    // 回收已绑定的校牌
    handleRecycle(row) {
      this.$http.recycleDevice({ id: row.id }).then(({ data }) => {
        if (data) {
          this.tip('校牌回收成功')
        }
      })
    }
  }
}
</script>
