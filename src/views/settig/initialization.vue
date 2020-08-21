<template>
  <div class="app-container">
    <el-tabs v-model="activeName2"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="个人信息"
                   name="first">
        <!-- 个人信息 -->
        <div class="mb10">

          <el-tag>说明：此处个人信息设置仅针对“普通用户”</el-tag>
        </div>
        <el-table ref="multipleTable"
                  :data="tableData1"
                  tooltip-effect="dark"
                  border
                  class="mb10">

          <el-table-column label="字段名称"
                           prop="fieldName"
                           align="center">

          </el-table-column>
          <el-table-column label="字段别名"
                           prop="fieldAlias"
                           align="center">

          </el-table-column>
          <el-table-column prop="name"
                           label="字段类型"
                           align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.fieldType=='1'">文本</span>
              <span v-if="scope.row.fieldType=='2'">选项</span>
              <span v-if="scope.row.fieldType=='3'">日期</span>
              <span v-if="scope.row.fieldType=='4'">图片</span>
            </template>
          </el-table-column>
          <el-table-column label="个人信息维护"
                           align="center"
                           label-class-name="DisabledSelection1">
            <template slot-scope="scope"
                      class="111">

              <el-checkbox class="cheackcenter"
                           v-model="scope.row.isPersonal"
                           :true-label="1"
                           :false-label="0"
                           :disabled="scope.row.name=='mobile'"
                           @change="checkisPersonal(scope.row,scope.row.isPersonal)"></el-checkbox>

              <el-switch v-model="scope.row.personalIsRequired"
                         :active-value="1"
                         :inactive-value="0"
                         active-text="必填"
                         inactive-text="关"
                         active-color="#ff4949"
                         :disabled="scope.row.isPersonal=='0'||scope.row.name=='mobile'"
                         @change="infoRequired(scope.row,scope.row.personalIsRequired)"
                         class="swichstyle">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="
                         预约时信息"
                           align="center">
            <template slot-scope="scope">

              <el-checkbox class="cheackcenter"
                           v-model="scope.row.isOrder"
                           :true-label="1"
                           :false-label="0"
                           :disabled="scope.row.isPersonal=='0'||scope.row.name=='mobile'"
                           @change="Orderinfo(scope.row,scope.row.isOrder)"></el-checkbox>
              <el-switch v-model="scope.row.orderIsRequired"
                         :active-value="1"
                         :inactive-value="0"
                         active-text="必填"
                         inactive-text="关"
                         active-color="#ff4949"
                         class="swichstyle"
                         :disabled="scope.row.isPersonal=='0'||scope.row.isOrder=='0'||scope.row.name=='mobile'"
                         @change="Orderinforeq(scope.row,scope.row.orderIsRequired)"
                         　>
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="
                         申请学分必备"
                           width="200"
                           align="center">
            <template slot-scope="scope">
              <el-checkbox :disabled="scope.row.isPersonal=='0'||scope.row.name=='mobile'"
                           v-model="scope.row.applyCredits"
                           :true-label="1"
                           :false-label="0"
                           @change="applyCreditsinfo(scope.row,scope.row.applyCredits)"></el-checkbox>

            </template>
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="editor(scope.row,scope.$index,tableData1)">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="项目直播"
                   name="second">
        <!-- 直播 -->
        <div class="mb10">

          <el-tag>
            说明：此处针对 项目直播 添加项目和课题时的字段设置

          </el-tag>
        </div>
        <el-tag>项目字段</el-tag>
        <el-table ref="multipleTable"
                  :data="tableData2"
                  tooltip-effect="dark"
                  border
                  class="mb10">

          <el-table-column label="字段名称"
                           prop="fieldName"
                           align="center">

          </el-table-column>
          <el-table-column label="字段别名"
                           prop="fieldAlias"
                           align="center">

          </el-table-column>
          <el-table-column prop="name"
                           label="字段类型"
                           align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.fieldType=='1'">文本</span>
              <span v-if="scope.row.fieldType=='2'">选项</span>
              <span v-if="scope.row.fieldType=='3'">日期</span>
              <span v-if="scope.row.fieldType=='4'">图片</span>
            </template>
          </el-table-column>

          <el-table-column label="是否显示"
                           width="200"
                           align="center">
            <template slot-scope="scope">
              <el-checkbox class="cheackcenter"
                           v-model="scope.row.isView"
                           :true-label="1"
                           :false-label="0"
                           @change="view(scope.row,scope.row.isView)"></el-checkbox>
              <el-switch v-model="scope.row.isRequired"
                         :active-value="1"
                         :inactive-value="0"
                         active-text="必填"
                         inactive-text="关"
                         active-color="#ff4949"
                         class="swichstyle"
                         :disabled="scope.row.isView=='0'"
                         @change="requiredinfo(scope.row,scope.row.isRequired)"
                         　>
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="editor(scope.row,scope.$index,tableData2)">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-tag>课题字段</el-tag>
        <el-table ref="multipleTable"
                  :data="tableData3"
                  tooltip-effect="dark"
                  border>

          <el-table-column label="字段名称"
                           prop="fieldName"
                           align="center">

          </el-table-column>
          <el-table-column label="字段别名"
                           prop="fieldAlias"
                           align="center">

          </el-table-column>
          <el-table-column prop="name"
                           label="字段类型"
                           align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.fieldType=='1'">文本</span>
              <span v-if="scope.row.fieldType=='2'">选项</span>
              <span v-if="scope.row.fieldType=='3'">日期</span>
              <span v-if="scope.row.fieldType=='4'">图片</span>
            </template>
          </el-table-column>

          <el-table-column label="是否显示"
                           width="200"
                           align="center">
            <template slot-scope="scope">
              <el-checkbox class="cheackcenter"
                           v-model="scope.row.isView"
                           :true-label="1"
                           :false-label="0"
                           @change="view(scope.row,scope.row.isView)"></el-checkbox>
              <el-switch v-model="scope.row.isRequired"
                         :active-value="1"
                         :inactive-value="0"
                         active-text="必填"
                         inactive-text="关"
                         active-color="#ff4949"
                         class="swichstyle"
                         :disabled="scope.row.isView=='0'"
                         @change="requiredinfo(scope.row,scope.row.isRequired)"
                         　>
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="editor(scope.row,scope.$index,tableData3)">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="非项目直播"
                   name="five">
        <!-- 非项目直播 -->
        <div class="mb10">
          <el-tag>说明：此处针对 非项目直播 添加课程和课件时的字段设置
          </el-tag>
        </div>
        <el-table ref="multipleTable"
                  :data="tableData4"
                  tooltip-effect="dark"
                  border>

          <el-table-column label="字段名称"
                           prop="fieldName"
                           align="center">

          </el-table-column>
          <el-table-column label="字段别名"
                           prop="fieldAlias"
                           align="center">

          </el-table-column>
          <el-table-column prop="name"
                           label="字段类型"
                           align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.fieldType=='1'">文本</span>
              <span v-if="scope.row.fieldType=='2'">选项</span>
              <span v-if="scope.row.fieldType=='3'">日期</span>
              <span v-if="scope.row.fieldType=='4'">图片</span>
            </template>
          </el-table-column>

          <el-table-column label="是否显示"
                           width="200"
                           align="center">
            <template slot-scope="scope">
              <el-checkbox class="cheackcenter"
                           v-model="scope.row.isView"
                           :true-label="1"
                           :false-label="0"
                           @change="view(scope.row,scope.row.isView)"></el-checkbox>
              <el-switch v-model="scope.row.isRequired"
                         :active-value="1"
                         :inactive-value="0"
                         active-text="必填"
                         inactive-text="关"
                         active-color="#ff4949"
                         class="swichstyle"
                         :disabled="scope.row.isView=='0'"
                         @change="requiredinfo(scope.row,scope.row.isRequired)"
                         　>
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="editor(scope.row,scope.$index,tableData4)">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="录播"
                   name="third">
        <!-- 录播 -->
        <div class="mb10">

          <el-tag>说明：此处针对 录播 添加课程和课件时的字段设置

          </el-tag>
        </div>
        <el-tag>课程字段</el-tag>
        <el-table ref="multipleTable"
                  :data="tableData5"
                  tooltip-effect="dark"
                  border
                  class="mb10">

          <el-table-column label="字段名称"
                           prop="fieldName"
                           align="center">

          </el-table-column>
          <el-table-column label="字段别名"
                           prop="fieldAlias"
                           align="center">

          </el-table-column>
          <el-table-column prop="name"
                           label="字段类型"
                           align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.fieldType=='1'">文本</span>
              <span v-if="scope.row.fieldType=='2'">选项</span>
              <span v-if="scope.row.fieldType=='3'">日期</span>
              <span v-if="scope.row.fieldType=='4'">图片</span>
            </template>
          </el-table-column>

          <el-table-column label="是否显示"
                           width="200"
                           align="center">
            <template slot-scope="scope">
              <el-checkbox class="cheackcenter"
                           v-model="scope.row.isView"
                           :true-label="1"
                           :false-label="0"
                           @change="view(scope.row,scope.row.isView)"></el-checkbox>
              <el-switch v-model="scope.row.isRequired"
                         :active-value="1"
                         :inactive-value="0"
                         active-text="必填"
                         inactive-text="关"
                         active-color="#ff4949"
                         class="swichstyle"
                         :disabled="scope.row.isView=='0'"
                         @change="requiredinfo(scope.row,scope.row.isRequired)"
                         　>
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="editor(scope.row,scope.$index,tableData5)">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-tag>课件字段</el-tag>
        <el-table ref="multipleTable"
                  :data="tableData6"
                  tooltip-effect="dark"
                  border>

          <el-table-column label="字段名称"
                           prop="fieldName"
                           align="center">

          </el-table-column>
          <el-table-column label="字段别名"
                           prop="fieldAlias"
                           align="center">

          </el-table-column>
          <el-table-column prop="name"
                           label="字段类型"
                           align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.fieldType=='1'">文本</span>
              <span v-if="scope.row.fieldType=='2'">选项</span>
              <span v-if="scope.row.fieldType=='3'">日期</span>
              <span v-if="scope.row.fieldType=='4'">图片</span>
            </template>
          </el-table-column>

          <el-table-column label="是否显示"
                           width="200"
                           align="center">
            <template slot-scope="scope">
              <el-checkbox class="cheackcenter"
                           v-model="scope.row.isView"
                           :true-label="1"
                           :false-label="0"
                           @change="view(scope.row,scope.row.isView)"></el-checkbox>
              <el-switch v-model="scope.row.isRequired"
                         :active-value="1"
                         :inactive-value="0"
                         active-text="必填"
                         inactive-text="关"
                         active-color="#ff4949"
                         class="swichstyle"
                         :disabled="scope.row.isView=='0'"
                         @change="requiredinfo(scope.row,scope.row.isRequired)"
                         　>
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="editor(scope.row,scope.$index,tableData6)">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="线下班"
                   name="fourth">
        <!-- 线下班 -->
        <div class="mb10">

          <el-tag>
            说明：此处针对 线下班 添加课程和课件时的字段设置

          </el-tag>
        </div>
        <el-tag>线下班字段</el-tag>
        <el-table ref="multipleTable"
                  :data="tableData7"
                  tooltip-effect="dark"
                  border
                  class="mb10">

          <el-table-column label="字段名称"
                           prop="fieldName"
                           align="center">

          </el-table-column>
          <el-table-column label="字段别名"
                           prop="fieldAlias"
                           align="center">

          </el-table-column>
          <el-table-column prop="name"
                           label="字段类型"
                           align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.fieldType=='1'">文本</span>
              <span v-if="scope.row.fieldType=='2'">选项</span>
              <span v-if="scope.row.fieldType=='3'">日期</span>
              <span v-if="scope.row.fieldType=='4'">图片</span>
            </template>
          </el-table-column>

          <el-table-column label="是否显示"
                           width="200"
                           align="center">
            <template slot-scope="scope">
              <el-checkbox class="cheackcenter"
                           v-model="scope.row.isView"
                           :true-label="1"
                           :false-label="0"
                           @change="view(scope.row,scope.row.isView)"></el-checkbox>
              <el-switch v-model="scope.row.isRequired"
                         :active-value="1"
                         :inactive-value="0"
                         active-text="必填"
                         inactive-text="关"
                         active-color="#ff4949"
                         class="swichstyle"
                         :disabled="scope.row.isView=='0'"
                         @change="requiredinfo(scope.row,scope.row.isRequired)"
                         　>
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="editor(scope.row,scope.$index,tableData7)">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-tag>课表字段</el-tag>
        <el-table ref="multipleTable"
                  :data="tableData8"
                  tooltip-effect="dark"
                  border>

          <el-table-column label="字段名称"
                           prop="fieldName"
                           align="center">

          </el-table-column>
          <el-table-column label="字段别名"
                           prop="fieldAlias"
                           align="center">

          </el-table-column>
          <el-table-column prop="name"
                           label="字段类型"
                           align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.fieldType=='1'">文本</span>
              <span v-if="scope.row.fieldType=='2'">选项</span>
              <span v-if="scope.row.fieldType=='3'">日期</span>
              <span v-if="scope.row.fieldType=='4'">图片</span>
            </template>
          </el-table-column>

          <el-table-column label="是否显示"
                           width="200"
                           align="center">
            <template slot-scope="scope">
              <el-checkbox class="cheackcenter"
                           v-model="scope.row.isView"
                           :true-label="1"
                           :false-label="0"
                           @change="view(scope.row,scope.row.isView)"></el-checkbox>
              <el-switch v-model="scope.row.isRequired"
                         :active-value="1"
                         :inactive-value="0"
                         active-text="必填"
                         inactive-text="关"
                         active-color="#ff4949"
                         class="swichstyle"
                         :disabled="scope.row.isView=='0'"
                         @change="requiredinfo(scope.row,scope.row.isRequired)"
                         　>
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="editor(scope.row,scope.$index,tableData8)">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="编辑字段"
               :visible.sync="dialogFormVisible"
               append-to-body
               top="0"
               width="550px">
      <el-form :model="edtform"
               label-width="130px">
        <el-form-item label="字段名称">
          <el-input v-model="edtform.fieldName"
                    disabled
                    placeholder="请输入字段名称"></el-input>
        </el-form-item>
        <el-form-item label="字段别名">
          <el-input v-model="edtform.fieldAlias"
                    placeholder="请输入字段别名"></el-input>
        </el-form-item>
        <el-form-item label="字段类型">
          <span v-if="edtform.fieldType=='1'">文本</span>
          <span v-if="edtform.fieldType=='2'">选项</span>
          <span v-if="edtform.fieldType=='3'">日期</span>
          <span v-if="edtform.fieldType=='4'">图片</span>

        </el-form-item>
        <el-form-item label="选项内容"
                      class="textlength"
                      v-if="edtform.name =='isNotWestward'||edtform.name =='isNotFromBasic'">

          <el-radio-group @change="changeradio"
                          v-model="radio">
            <template v-for="(domain, index) in selectitem">
              <el-radio :label="domain.code"
                        :key="domain.code">{{domain.name}}</el-radio>
            </template>
          </el-radio-group>
          <template>
            <el-radio-group v-model="edtform.defaultSelect">
              <div v-for="(domain, index) in westarr"
                   :key="domain.code"
                   class="selectitem">
                <el-input v-model="domain.name"
                          class="mb10"
                          placeholder="请输入选项内容"
                          width="150"
                          :disabled="domain.state=='0' "></el-input>
                <el-button type="text"
                           style="color:red"
                           class="ml10">禁用</el-button>
                <el-button type="text"
                           style="red"
                           @click="addwest">新增</el-button>

                <el-radio :label="domain.code"
                          class="ml10"
                          @change="defaultradio(domain.code)">默认</el-radio>

              </div>
            </el-radio-group>
          </template>

        </el-form-item>
        <el-form-item label="选项内容"
                      class="textlength"
                      v-if="edtform.canEdit=='1'&&edtform.fieldType=='2'&&edtform.name !='isNotWestward'&&edtform.name !='isNotFromBasic'">
          <template>
            <el-radio-group v-model="edtform.defaultSelect">
              <div v-for="(domain, index) in selectitem"
                   :key="domain.key"
                   class="selectitem">
                {{domain.code}}
                <el-input v-model="domain.name"
                          class="mb10"
                          :id="domain.code"
                          placeholder="请输入选项内容"
                          :disabled="domain.state=='0'"
                          width="150"></el-input>
                <el-button type="text"
                           style="color:red"
                           class="ml10"
                           @click="disabledinput(index)">禁用</el-button>
                <el-button type="text"
                           style="red"
                           @click="addselect">新增</el-button>

                <el-radio :label="domain.code"
                          class="ml10"
                          @change="defaultradio(domain.code)">默认</el-radio>
              </div>
            </el-radio-group>
          </template>

        </el-form-item>

        <el-form-item label="文本内容"
                      v-if="edtform.fieldType=='1'">
          <el-input v-model="edtform.placeholder"
                    class="mb10"
                    placeholder="请输入文本内容"
                    width="150"></el-input>

        </el-form-item>

        <el-form-item class="dialogfixed">
          <el-button type="primary"
                     @click="edtinfo(edtform)">确定</el-button>
          <el-button @click="dialogFormVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>
<script>
export default {
  data () {
    return {
      activeName2: 'first',
      value: false,
      // 西部基层model
      radio: '',
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableData6: [],
      tableData7: [],
      tableData8: [],
      type: 1,
      // siteId: this.$store.state.siteid,
      siteId: 57,
      dialogFormVisible: false,
      edtform: [],
      selectitem: [],
      categoryCode: '',
      code2: '',
      westarr: [],
      isPersonal: '',
      defaultSelect: '',
      personalIsRequired: '',
      isOrder: '',
      orderIsRequired: '',
      applyCredits: '',
      dictValueJson: [],
      rowid: '',
      isView: '',
      isRequired: '',
      index: '',
      nowdata: []//现在锁打开的表格
    };
  },
  created () {
    var that = this
    this.gettable()
  },
  methods: {

    // 申请学分
    applyCreditsinfo (row, val) {
      this.applyCredits = val
      this.submitinfo(row)
    },
    //预约信息必填
    Orderinforeq (row, val) {
      this.orderIsRequired = val
      this.submitinfo(row)
    },
    // 是否显示
    view (row, val) {
      this.isView = val
      this.isRequired = val
      row.isView = val;
      row.isRequired = val;
      this.submitinfo(row)
    },
    // 是否必填
    requiredinfo (row, val) {
      this.isRequired = val
      this.submitinfo(row)

    },
    // 预约信息
    Orderinfo (row, val) {
      this.isOrder = val
      this.orderIsRequired = val
      row.isOrder = val;
      row.orderIsRequired = val;
      this.submitinfo(row)
    },
    // 默认
    defaultradio (val) {

      this.defaultSelect = val

    },
    // 个人信息是否显示
    checkisPersonal (row, val) {

      this.isPersonal = val;
      this.isOrder = val;
      this.orderIsRequired = val;
      this.applyCredits = val;
      this.personalIsRequired = val;
      row.isPersonal = val;
      row.isOrder = val;
      row.orderIsRequired = val;
      row.applyCredits = val;
      row.personalIsRequired = val;
      this.submitinfo(row)
    },
    // 个人信息是否必填
    infoRequired (row, val) {
      this.personalIsRequired = val
      this.submitinfo(row)
    },
    // 禁用
    disabledinput (i) {

      if (this.selectitem[i].state == '1' || this.selectitem[i].state == undefined) {
        this.$set(this.selectitem[i], 'state', '0')
      } else {
        this.$set(this.selectitem[i], 'state', '1')
      }


    },
    // 修改信息提交
    edtinfo (row) {
      var that = this;
      var arr = [];
      if (this.selectitem != []) {
        arr = this.selectitem
      } else {
        arr = this.westarr
      }
      this.dictValueJson = []
      for (let i = 0; i < $('.selectitem').length; i++) {
        this.dictValueJson.push({
          code: arr[i].code,
          name: arr[i].name,
          state: arr[i].state
        })

      }
      this.submitinfo(row)
    },
    // 提交接口
    submitinfo (row) {
      var that = this
      this.rowid = row.id;
      this.code2 = row.categoryCode2;
      this.categoryCode = row.categoryCode
      this.$axios.post('/api/config/editBaseConfig', {
        id: this.rowid,
        siteId: this.siteId,
        fieldAlias: this.edtform.fieldAlias,
        categoryCode: this.categoryCode,
        categoryCode2: this.code2,
        placeholder: this.edtform.placeholder,
        isPersonal: this.isPersonal,
        defaultSelect: this.defaultSelect,
        applyCredits: this.applyCredits,
        isOrder: this.isOrder,
        isPersonal: this.isPersonal,
        personalIsRequired: this.personalIsRequired,
        orderIsRequired: this.orderIsRequired,
        isView: this.isView,
        isRequired: this.isRequired,
        dictValueJson: JSON.stringify(this.dictValueJson)

      }).then(function (response) {
        if (response.data.status == '200') {

          that.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          });
          that.$set(that.nowdata[that.index], 'defaultSelect', that.defaultSelect)

          that.dialogFormVisible = false
          that.rowid = '';
          that.categoryCode = '';
          that.code2 = '';
          that.isPersonal = '';
          that.applyCredits = '';
          that.isOrder = '';
          that.personalIsRequired = '';
          that.orderIsRequired = '';
          that.thendictValueJson = '';
          that.dictValueJson = [];
          that.isView = ''
          that.isRequired = ''

        } else {
          that.$notify({
            title: '失败',
            message: response.data.msg,
            type: 'error'
          });
        }

      })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 下拉是否类型
    changeradio (val) {
      var that = this;
      if (val == '1') {
        this.$axios.get('/api/config/getDictValueList?categoryCode=' + this.code2 + '&siteId=' + this.siteId, {

        }).then(function (response) {

          that.westarr = response.data.data

        })
          .catch(function (error) {
            console.log(error);
          });
      }

    },
    // 获取对应栏目下表格
    gettable () {
      var that = this;
      this.$axios.get('/api/config/getConfigListBySiteId?type=' + this.type + '&siteId=' + this.siteId, {

      }).then(function (response) {
        if (that.type == '1') {
          that.tableData1 = response.data.data;
        } else if (that.type == '2') {
          that.tableData2 = response.data.data;
          that.type = 3;
          that.gettable()
        } else if (that.type == '3') {
          that.tableData3 = response.data.data;
        } else if (that.type == '4') {
          that.tableData4 = response.data.data;
        } else if (that.type == '5') {
          that.tableData5 = response.data.data;
          that.type = 6;
          that.gettable()
        } else if (that.type == '6') {
          that.tableData6 = response.data.data;
        } else if (that.type == '7') {
          that.tableData7 = response.data.data;
          that.type = 8;
          that.gettable()
        } else {
          that.tableData8 = response.data.data;
        }
      })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 编辑表格信息
    editor (row, index, data) {
      var list = JSON.parse(JSON.stringify(row));
      this.edtform = list;
      this.nowdata = data;
      this.index = index;

      this.dialogFormVisible = true
      var code = row.categoryCode
      var that = this;
      if (row.canEdit == '1' && row.fieldType == '2') {
        this.$axios.get('/api/config/getDictValueList?categoryCode=' + code + '&siteId=' + this.siteId, {

        }).then(function (response) {

          that.selectitem = response.data.data

        })
          .catch(function (error) {
            console.log(error);
          });
      }

    },
    handleClick (tab, event) {
      var index = tab.index;
      if (index == '1' && this.tableData2 == '') {
        this.type = 2;
        this.gettable();
      }
      if (index == '2' && this.tableData4 == '') {

        this.type = 4;
        this.gettable();
      }
      if (index == '3' && this.tableData5 == '') {

        this.type = 5;
        this.gettable();
      }
      if (index == '4' && this.tableData7 == '') {

        this.type = 7;
        this.gettable();
      }
    },


    addwest () {
      var that = this
      var coed = this.code2 + '_' + Date.now()
      this.westarr.push({
        name: '',
        code: coed

      });

    },
    addselect () {
      var that = this
      var coed = this.categoryCode + '_' + Date.now()
      this.selectitem.push({
        name: '',
        code: coed

      });

    }
  }
};
</script>
 <style lang="scss" >
/* switch按钮样式 */
.swichstyle .switch .el-switch__label {
  position: absolute;
  display: none;
  color: #fff !important;
}
/*打开时文字位置设置*/
.swichstyle .el-switch__label--left {
  position: absolute;
  left: 23px;
  color: #fff;
  z-index: -1;
}
.swichstyle .el-switch__label--right {
  position: absolute;
  right: 17px;
  width: 30px;
  z-index: -1;
}
.swichstyle .el-switch__label.is-active {
  z-index: 2;
  color: #fff;
}

.swichstyle .el-switch__label--left {
  position: absolute;
  left: 23px;
  color: #fff;
  z-index: -1;
}
.swichstyle .el-switch__label--right {
  position: absolute;
  right: 17px;
  width: 30px;
  z-index: -1;
}
.swichstyle .el-switch__label--right.is-active {
  z-index: 2;
  color: #fff !important;
}
.swichstyle .el-switch__label--left.is-active {
  z-index: 2;
}
.el-switch__core {
  width: 50px !important;
}
.el-table /deep/.DisabledSelection .cell .el-checkbox__inner {
  position: relative;
}
.el-dialog__body form .textlength .el-input {
  width: 200px;
}
</style>
