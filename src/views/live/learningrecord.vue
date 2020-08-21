<template>
  <div class="app-container">
    <div class="mb10">
      直播名称：睡眠综合征临床研究
    </div>
    <el-tabs v-model="activeName2"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="汇总"
                   name="first">
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline pl10">

          <el-form-item label="姓名">
            <el-input v-model="formInline.region"
                      placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item label="手机号">
            <el-input v-model="formInline.region"
                      placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="是否预约">
            <el-select v-model="formInline.region"
                       placeholder="活动区域">
              <el-option label="全部"
                         value="shanghai"></el-option>
              <el-option label="是"
                         value="beijing"></el-option>
              <el-option label="否"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="fr">
            <el-button type="primary"
                       @click="onSubmit">查询</el-button>
            <el-button @click="onSubmit">导出</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData3"
                  style="width: 100%"
                  border>
          <el-table-column type="index"
                           label="序号"
                           width="55"
                           align="center"
                           fixed
                           :resizable="false">
          </el-table-column>
          <el-table-column :label="item.propName"
                           :property="item.prop"
                           v-for="(item,index) in tableheader"
                           :fixed="index==0"
                           :key="item.prop"
                           align="center"
                           :resizable="false">
            <template slot-scope="scope">
              <span>{{scope.row[scope.column.property]}}</span>
            </template>
          </el-table-column>

        </el-table>
      </el-tab-pane>

      <el-tab-pane label="观看记录"
                   name="third">
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline pl10">

          <el-form-item label="姓名">
            <el-input v-model="formInline.region"
                      placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item label="手机号">
            <el-input v-model="formInline.region"
                      placeholder="请输入手机号"></el-input>
          </el-form-item>

          <el-form-item class="fr">
            <el-button type="primary"
                       @click="onSubmit">查询</el-button>
            <el-button @click="onSubmit">导出</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData3"
                  style="width: 100%"
                  border>
          <el-table-column type="index"
                           label="序号"
                           width="55"
                           align="center"
                           fixed
                           :resizable="false">
          </el-table-column>
          <el-table-column :label="item.propName"
                           :property="item.prop"
                           v-for="(item,index) in tableheader"
                           :fixed="index==0"
                           :key="item.prop"
                           align="center"
                           :resizable="false">
            <template slot-scope="scope">
              <span>{{scope.row[scope.column.property]}}</span>
            </template>
          </el-table-column>

        </el-table>
      </el-tab-pane>
      <el-tab-pane label="签到记录"
                   name="fourth">
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline pl10">

          <el-form-item label="姓名">
            <el-input v-model="formInline.region"
                      placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item label="手机号">
            <el-input v-model="formInline.region"
                      placeholder="请输入手机号"></el-input>
          </el-form-item>

          <el-form-item class="fr">
            <el-button type="primary"
                       @click="onSubmit">查询</el-button>
            <el-button @click="onSubmit">导出</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData3"
                  style="width: 100%"
                  border>
          <el-table-column type="index"
                           label="序号"
                           width="55"
                           align="center"
                           fixed
                           :resizable="false">
          </el-table-column>
          <el-table-column :label="item.propName"
                           :property="item.prop"
                           v-for="(item,index) in tableheader"
                           :fixed="index==0"
                           :key="item.prop"
                           align="center"
                           :resizable="false">
            <template slot-scope="scope">
              <span>{{scope.row[scope.column.property]}}</span>
            </template>
          </el-table-column>

        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName2: 'first',
      formInline: {
        region: ''
      },
      tableheader: [
        { prop: 'id', propName: '编号' },
        { prop: 'name', propName: '名字' },
        { prop: 'age', propName: '保质期' },
        { prop: 'remark', propName: '特点' },
        { prop: 'country', propName: '国家' },
        { prop: 'address', propName: '地址' },
      ],
      tableData3: [
        { 'id': '100001', 'name': '小红萝卜', 'age': '2年', 'remark': '适合油炸', 'country': '中国', 'address': '广东省深圳市', 'type': 'push' },
        { 'id': '100002', 'name': '萝卜妹', 'age': '2年', 'remark': '适合水煮', 'country': '美国', 'address': '硅谷', 'type': 'on' },
        { 'id': '100003', 'name': '胖萝卜头', 'age': '1年', 'remark': '适合玩儿', 'country': '泰国', 'address': '清迈', 'type': 'on' },
        { 'id': '100004', 'name': '萝卜酱', 'age': '4年', 'remark': '适合吃火锅', 'country': '韩国', 'address': '首尔', 'type': 'push' }
      ],
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },
    onSubmit () {

    }
  }
};
</script>
