<template>
  <div class="app-container">
    <search>
      <el-input v-model="listQuery.keyword" placeholder="编号" @input="getTableList()" />
      <el-button style="float: right; margin-right: 50px; margin-top:20px" icon="el-icon-plus" @click="add()">添加</el-button>
    </search>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
    >
      <el-table-column align="center" prop="name" label="场所名称"></el-table-column>
      <el-table-column align="center" label="基站">
        <template v-slot="{ row }">
          <span class="operation" @click="pointShow = true;poinData = row.device">查看</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="{row}">
          <span>{{ row.type === 0 ?'普通':'万能' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="remark" label="备注信息"></el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot="{ row }">
          <svg-icon icon-class="edit" title="编辑" @click.native="eidt(row)" />
          <svg-icon icon-class="delete" title="删除" @click.native="deleteEvent(row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="parameter"
    />
    <!-- 查看基站的弹框 -->
    <el-dialog title="查看基点" center :visible.sync="pointShow">
      <el-table
        :data="poinData"
        style="width: 100%"
        row-key="id"
        border
      >
        <el-table-column align="center" prop="id" label="ID"></el-table-column>
        <el-table-column align="center" prop="number" label="编号"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 增加场所的弹框 -->
    <el-dialog
      v-el-drag-dialog
      center
      title="增加基点"
      :visible.sync="visible"
      @close="close"
    >
      <template>
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="form"
          label-width="115px"
          label-position="left"
        >
          <el-form-item label="场所名称" prop="name">
            <el-input v-model="form.name" placeholder="请添加场所名称"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="form.type" placeholder="请添加类型">
              <el-option label="普通" :value="0"></el-option>
              <el-option label="万能" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-for="(item,index) in form.device"
            :key="index"
            label="基点编号"
            :prop="'device.'+ index+'.id'"
            :rules="{
              required: true, message: '基点编号不能为空', trigger: 'change'
            }"
          >
            <el-col :span="16">
              <el-select v-model="item.id" placeholder="基点编号" @change="setSub(index,item.id)">
                <el-option
                  v-for="(child,tag) in getPoin"
                  :key="tag"
                  :label="child.number"
                  :value="child.id"
                  :disabled="child.disabled"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <div class="choose">
                <el-button v-if="form.device.length > 1 && form.device.length === index + 1" @click="chooseDele(index)">删除</el-button>
                <el-button v-if="form.device.length < getPoin.length" @click="form.device.push({id:''})">增加</el-button>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input v-model="form.remark" placeholder="请添加备注信息"></el-input>
          </el-form-item>
          <el-form-item style="margin-left:20%;margin-top:50px;">
            <el-button type="primary" @click="handleCreate()">确定</el-button>
            <el-button @click="visible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { mixinData, mixinDelete, mixinCreate, mixinPaging } from '@/publicfun'
export default {
  mixins: [mixinData, mixinDelete, mixinCreate, mixinPaging],
  data() {
    return {
      total: 0,
      tableData: [],
      // 列表储存基站信息
      poinData: '',
      // 下拉框获取基点信息
      getPoin: [],
      pointShow: false,
      visible: false,
      listQuery: {
        keyword: ''
      },
      statusList: [
        { id: 0, name: '未绑定' },
        { id: 1, name: '已绑定' }
      ],
      form: {
        name: '',
        type: 0,
        remark: '',
        device: [
          {
            id: ''
          }
        ]
      },
      tableFields: [
        { prop: 'name', label: '场所名称' },
        { prop: 'type', label: '类型' },
        { prop: 'remark', label: '备注信息' },
        { prop: 'actions', label: '操作' }
      ],
      rules: {
        name: [{ required: true, message: '场所名称不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '类型不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    add() {
      delete this.form.id
      this.visible = true
      this.editShow = false
      this.infoPlace()
    },
    eidt(row) {
      this.editShow = true
      this.visible = true
      this.form.id = row.id
      this.form.name = row.name
      this.form.type = row.type
      this.form.remark = row.remark
      this.form.device = []
      Object.assign(this.form.device, row.device)
      this.infoPlace()
    },
    // 编辑或者创建
    createData() {
      if (this.editShow) {
        // 编辑所执行的
        this.$http.placeEidt(this.form).then(response => {
          this.showNotify(response)
          this.visible = false
        })
      } else {
        // 创建所执行的
        this.$http.placeAdd(this.form).then(response => {
          this.showNotify(response)
          this.visible = false
        })
      }
      this.getTableList()
    },
    getTableList() {
      this.$http.placeList(this.listQuery).then(({ data: { lists, total }}) => {
        this.tableData = lists
        this.total = Number(total)
      })
    },
    // 弹框关闭时清空表单和验证
    close() {
      this.form.name = ''
      this.form.type = 0
      this.form.remark = ''
      this.form.device = [{ id: '' }]
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 获取基地的信息
    infoPlace() {
      this.getPoin = []
      this.$http.placeInfo().then(response => {
        const dataPoin = response.data
        if (this.editShow === false) {
          for (const item in dataPoin) {
            if (dataPoin[item].status.id !== 1) {
              this.getPoin.push(dataPoin[item])
            }
          }
        } else {
          this.getPoin = dataPoin
        }
        console.log(this.getPoin)
      })
    },
    chooseDele(index) {
      this.form.device.pop()
      for (const item in this.getPoin) {
        if (this.getPoin[item].index && this.getPoin[item].index === index) {
          delete this.getPoin[item].disabled
        }
      }
    },
    // 选择基点后选择向将变为不可选状态
    setSub(index, par) {
      for (const item in this.getPoin) {
        if (this.getPoin[item].index !== '' && this.getPoin[item].index === index) {
          delete this.getPoin[item].disabled
        }
        if (this.getPoin[item].id === par) {
          this.getPoin[item].disabled = true
          this.getPoin[item].index = index
        }
      }
    },
    // 删除
    handleDelete(par) {
      this.$http.placeDele({ id: par }).then(response => {
        this.getTableList()
      })
    }
  }
}
</script>
<style scoped>
.operation {
  color: #409eff;
  cursor: pointer;
  margin-left: 5px;
}
.choose {
  display: flex;
  justify-content: flex-end;
}
</style>
