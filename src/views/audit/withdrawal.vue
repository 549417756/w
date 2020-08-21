<template>
  <div class="app-container">
    <div class="filter-head">
      <p>数据筛选</p>
    </div>
    <div class="filter-container">
      <el-form class="filter-flex">
        <el-form-item label="输入搜索:" class="form-flex">
          <el-input v-model="listQuery.keyword" style="width:200px" placeholder="名称" @input="getTableList()"></el-input>
        </el-form-item>
        <region-query
          @provinceList="provinceList"
        ></region-query>
        <el-form-item style="margin-top:15px;">
          <el-select
            v-model="listQuery.school"
            placeholder="学校"
            clearable
            @change="getTableList()"
          >
            <el-option
              v-for="item in schoolArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-top:15px;">
          <el-date-picker
            v-model="listQuery.time"
            type="date"
            placeholder="选择日期时间"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="getTableList()"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <data-table :list="list" :table-fields="tableFields">
      <template v-slot="{ row }">
        <svg-icon v-if="row.status.name === '待审核'" icon-class="audit-manage" title="审核" @click.native="audit(row)" />
      </template>
    </data-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getTableList"
    />
    <el-dialog
      title="提现审核"
      :visible.sync="dialogFormVisible"
      center
      @close="from.check_content = null"
    >
      <data-form ref="form" :rules="{}" :rule-form="from">
        <el-form-item label="反馈内容">
          <el-input
            v-model="from.check_content"
            :rows="6"
            type="textarea"
            placeholder="请输入反馈内容"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
      </data-form>
      <template slot="footer">
        <el-button type="danger" @click="operation(2)">拒绝</el-button>
        <el-button type="success" @click="operation(1)">通过</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mixinData, mixinCreate } from '@/publicfun'
export default {
  name: 'UserWithdrawal',
  mixins: [mixinData, mixinCreate],
  data() {
    return {
      from: {
        check_content: null,
        status: '',
        id: ''
      },
      schoolArr: [],
      listQuery: {
        keyword: '',
        province: '',
        city: '',
        area: '',
        school: '',
        time: ''
      },
      querySchool: {
        province: '',
        city: '',
        area: ''
      },
      tableFields: [
        { prop: 'id', label: '提现编号' },
        { prop: 'money', label: '提现金额' },
        { prop: 'pay_account', label: '提现账号' },
        { prop: 'account_id', label: '用户工号' },
        { prop: 'account_name', label: '用户姓名' },
        { prop: 'province.name', label: '省' },
        { prop: 'city.name', label: '市' },
        { prop: 'area.name', label: '县' },
        { prop: 'school_name', label: '所属学校' },
        { prop: 'create_time', label: '提交时间' },
        { prop: 'status.name', label: '状态' },
        { prop: 'actions', label: '操作' }
      ]
    }
  },
  created() {
    this.chooseSchool()
  },
  methods: {
    getTableList() {
      this.$http.fetchWithdrawalList(this.listQuery).then(({ data: { lists, total }}) => {
        this.list = lists
        this.total = total
      })
    },
    provinceList(par) {
      this.listQuery[par.parameter] = par.item
      this.querySchool[par.parameter] = par.item
      this.getTableList()
      this.chooseSchool()
    },
    // 选择学校
    chooseSchool() {
      this.$http.schoolList(this.querySchool).then(response => {
        this.schoolArr = response.data.lists
      })
    },
    auditThrough(order_state) {
      this.auditInfo.order_state = order_state
      this.dialogFormVisible = false
      this.$http.extractingMoneyAudit(this.auditInfo).then(response => {
        this.showNotify(response.message)
      })
    },
    //  点击审核
    audit(row) {
      this.from.id = row.id
      this.dialogFormVisible = true
    },
    // 点击通过
    operation(par) {
      this.from.status = par
      this.$http.audit(this.from).then(response => {
        this.showNotify(response)
        this.dialogFormVisible = false
      })
    }
  }
}
</script>
<style scoped lang="scss">
.school {
  display: flex;
}
.filter-head {
  height: 50px;
  border: 1px solid #dfe6ec;
  background: #ffffff;
  padding-left: 20px;
  border-bottom: none;
  box-shadow: 0px 1px 3px #e7e7e7;
}
.filter-flex {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
}
.form-flex {
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 15px;
}
.filter-container {
  /deep/ {
    .el-input,
    .el-select {
   
      margin-right: 35px;
    }
  }
}
</style>
