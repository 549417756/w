<template>
  <div class="app-container">
    <search>
      <el-input v-model="listQuery.keyword" placeholder="订单/课件/试卷编号" />
      <span class="filter-item">类型：</span>
      <el-select v-model="listQuery.type" clearable>
        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <span class="filter-item">支付方式：</span>
      <el-select v-model="listQuery.payment" clearable>
        <el-option v-for="item in paymentList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <span class="filter-item">支付状态：</span>
      <el-select v-model="listQuery.status" clearable>
        <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </search>
    <data-table :list="list" :table-fields="tableFields" />
  </div>
</template>

<script>
import MixinTable from '@/tablemixin'

export default {
  name: 'Income',
  mixins: [MixinTable],
  data() {
    return {
      typeList: [
        {
          id: 1,
          name: '试卷 '
        },
        {
          id: 2,
          name: '课件 '
        }
      ],
      paymentList: [
        {
          id: 0,
          'name': '待支付'
        },
        {
          id: 1,
          name: '支付宝'
        },
        {
          id: 2,
          name: '微信'
        }
      ],
      statusList: [
        {
          id: 0,
          name: '待付款'
        },
        {
          id: 1,
          name: '成功'
        },
        {
          id: 2,
          name: '失败'
        }
      ],
      listQuery: {
        type: '',
        payment: '',
        status: ''
      },
      tableFields: [
        { prop: 'order_number', label: '订单编号' },
        { prop: 'name', label: '教程名称' },
        { prop: 'create_time', label: '下单时间' },
        { prop: 'id', label: '用户账号' },
        { prop: 'order_money', label: '订单金额' },
        { prop: 'payment.name', label: '支付方式' },
        { prop: 'order_status.name', label: '订单状态' }
      ]
    }
  },
  methods: {
    getTableList() {
      this.$http.fetchOrderList(this.listQuery).then(({ data: { lists, total }}) => {
        this.list = lists
        this.total = total
      })
    }
  }
}
</script>
