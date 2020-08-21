<template>
  <div class="app-container">
    <search>
      <el-input v-model="listQuery.keyword" placeholder="内容标题" />
      <el-select v-model="listQuery.category" clearable placeholder="推送分类">
        <el-option
          v-for="item in categoryList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <router-link :to="'/content/info/create'">
        <add-button />
      </router-link>
    </search>

    <data-table :list="list" :table-fields="tableFields">
      <template v-slot="{ row }">
        <router-link :to="'/content/info/edit/' + row.id">
          <svg-icon icon-class="edit" title="编辑" />
        </router-link>
        <svg-icon icon-class="push" title="推送" @click.native="push(row)" />
        <svg-icon
          icon-class="detail"
          title="详情"
          @click.native=";(drawerVisible = true), (detailInfo = row)"
        />
        <svg-icon icon-class="delete" title="删除" @click.native="handleDelete(row, 'deleteContent')" />
      </template>
    </data-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getTableList"
    />

    <el-dialog ref="dialog" :visible.sync="pushLoading" center @close="close">
      <span slot="title">
        <p>选择推送对象</p>
        <p style="color: red">{{ prompt }}</p>
      </span>
      <data-form ref="form" :rules="{}" :rule-form="ruleForm" @createData="pushContent">
        <el-form-item label="全部:">
          <el-switch
            v-model="allData"
            :active-value="1"
            :inactive-value="0"
            :disabled="pushShow && !(chooseShow == 'all')"
            @change="handleSwitch"
          ></el-switch>
        </el-form-item>
        <div class="school">
          <region-query
            label="学校:"
            label-width="120px"
            :choose-show="chooseShow"
            :push-show="pushShow"
            :operation="operation"
            @provinceList="provinceList"
          />
          <el-select
            v-model="ruleForm.school_id"
            placeholder="学校"
            style="width:120px; margin-top:15px;margin-left:5px;"
            :disabled="pushShow && !(chooseShow == 'school')"
          >
            <el-option
              v-for="(item, index) in schoollList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <el-form-item label="状态:">
          <el-select
            v-model="ruleForm.status"
            clearable
            :disabled="pushShow && !(chooseShow == 'status')"
          >
            <el-option
              v-for="item in abnormalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </data-form>
      <div slot="footer">
        <el-button @click="pushLoading = false">取 消</el-button>
        <el-button type="primary" @click="pushData()">确 定</el-button>
      </div>
    </el-dialog>

    <el-drawer :visible.sync="drawerVisible" direction="rtl" size="40%">
      <div class="detail-wrapper">
        <h3>{{ detailInfo.title }}</h3>
        <div class="detail-info">
          <span>{{ detailInfo.create_time }}</span>
          <span v-if="detailInfo.category">分类：{{ detailInfo.category.name }}</span>
        </div>
        <div class="detail-main" v-html="detailInfo.content"></div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import MixinTable from '@/tablemixin'
export default {
  name: 'ContentInfo',
  mixins: [MixinTable],
  data() {
    return {
      schoolName: '',
      listQuery: {
        category: null
      },
      allData: 0,
      ruleForm: {
        push_id: '',
        school_id: '',
        status: '',
        province: '',
        city: '',
        area: '',
        sort: 50
      },
      tableFields: [
        { prop: 'title', label: '推送标题' },
        { prop: 'category.name', label: '分类' },
        { prop: 'create_time', label: '添加时间' },
        { prop: 'actions', label: '操作' }
      ],
      categoryList: [],
      abnormalList: [],
      schoollList: [],
      drawerVisible: false,
      // 推送时三选一的总开关
      pushShow: false,
      // 推送时三选一的分开关
      chooseShow: '',
      operation: '',
      prompt: '',
      pushLoading: false,
      detailInfo: {},
      // 学校请求的参数
      responseData: {}
    }
  },
  watch: {
    allData() {
      this.allData === 0
        ? (this.pushShow = false)
        : ((this.pushShow = true), (this.chooseShow = 'all'))
    },
    'ruleForm.status'() {
      this.ruleForm.status === ''
        ? (this.pushShow = false)
        : ((this.pushShow = true), (this.chooseShow = 'status'))
    }
  },
  // 分类列表
  created() {
    // 获取分类列表
    this.$http.fetchContentClassifyListNP().then(({ data }) => {
      this.categoryList = data
    })
    // 获取状态列表
    this.$http.fetchAbnormalList().then(({ data }) => {
      this.abnormalList = data
    })
  },
  methods: {
    getTableList() {
      this.$http.fetchContenInfotList(this.listQuery).then(({ data: { lists, total }}) => {
        this.list = lists
        this.total = total
      })
    },
    provinceList(par) {
      // 监听 用户是否利用省市县来请求
      this.ruleForm[par.parameter] = par.item
      par.parameter === 'province' && par.item === ''
        ? this.pushShow = false : (this.pushShow = true, this.chooseShow = 'school')
      // 每次选择省 就清空市和县
      par.parameter === 'province' ? (this.responseData = {}) : ''
      this.responseData[par.parameter] = par.item
      this.$http.fetchSchoolList(this.responseData).then(response => {
        this.schoollList = response.data
      })
    },
    handleSwitch() {},
    pushContent() {},
    close() {
      this.allData = 0
      this.operation = 'remove'
      for (var item in this.ruleForm) {
        if (item !== 'sort') {
          this.ruleForm[item] = ''
        }
      }
    },
    // 点击推送按钮
    push(row) {
      this.ruleForm.push_id = row.id
      this.pushLoading = true
      this.pushShow = false
      this.operation = ''
      this.chooseShow = ''
    },
    // 点击确定 推送数据
    pushData() {
      if (this.allData === 0 && this.ruleForm.province === '' && this.ruleForm.status === '') {
        this.$message.error('以下三个条件请选择一个条件')
      } else {
        for (var item in this.ruleForm) {
          if (this.ruleForm[item] === '') {
            this.ruleForm[item] = 0
          }
        }
        this.$http.pushAdd(this.ruleForm).then(response => {
          this.$message.success('推送成功!')
          this.pushLoading = false
        })
      }
    }
  }
}
</script>

<style lang="scss">
.school {
  display: flex;
}
</style>
