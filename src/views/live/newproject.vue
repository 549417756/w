<template>
  <div class="compontent-container">
    <el-form ref="ruleForm"
             :model="ruleForm"
             label-position="left"
             label-width="120px">
      <template v-for="(list,index) in dataarr">
        <!-- input类型 -->
        <el-form-item :label="list.label"
                      v-if="list.type=='input'"
                      prop="category_id">
          <el-input v-model="list.value"
                    :placeholder="list.placeholder" />
        </el-form-item>
        <!-- 下拉框类型 -->
        <el-form-item :label="list.label"
                      v-if="list.type=='select'">
          <el-select v-model="list.value"
                     :placeholder="list.placeholder">
            <el-option v-for="item in list.data"
                       :key="item.id"
                       :label="item.key"
                       :value="item.val" />
          </el-select>
        </el-form-item>
        <!-- 时间类型 -->
        <el-form-item :label="list.label"
                      v-if="list.type=='time'">
          <el-date-picker v-model="list.value"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <!-- 文本域类型 -->
        <el-form-item :label="list.label"
                      v-if="list.type=='textarea'"
                      prop="desc">
          <el-input type="textarea"
                    v-model="list.value"></el-input>
        </el-form-item>
        <!-- 富文本编辑器类型 -->
        <el-form-item :label="list.label"
                      prop="content"
                      v-if="list.type=='texteditor'">
          <markdown-editor :content.sync="list.value" />
        </el-form-item>
        <!-- 单选类型 -->
        <el-form-item :label="list.label"
                      v-if="list.type=='radio'">
          <el-radio-group v-model="list.value">

            <el-radio :label="item.label"
                      v-for="item in list.radio"
                      :key="item.value"></el-radio>

          </el-radio-group>
        </el-form-item>
        <!-- 上传封面 -->
        <el-form-item label="文章封面"
                      v-if="list.type=='upload'">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                     list-type="picture-card"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible"
                     size="tiny">
            <img width="100%"
                 :src="dialogImageUrl"
                 alt="">
          </el-dialog>

        </el-form-item>
      </template>

    </el-form>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px">
      <el-col :span="11"
              style="text-align: right">
        <el-button type="primary"
                   @click="onSubmit">确定</el-button>
      </el-col>
      <el-col :span="2"></el-col>
      <el-col :span="11">
        <el-button>返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>


export default {
  name: 'addarticle',

  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      value: '',
      categoryList: [],
      fileList3: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        status: 'finished'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        status: 'finished'
      }],
      ruleForm: {
        category_id: null,
        title: null,
        content: '',
        big_img: null,
        small_img: null,
        desc: ''
      },
      imgType: '',
      // rules: {
      //   category_id: [{ required: true, message: '消息分类不能为空', trigger: 'change' }],
      //   title: [{ required: true, message: '内容标题不能为空', trigger: 'blur' }],
      //   content: [{ required: true, message: '内容标题不能为空', trigger: 'blur' }],
      //   big_img: [{ required: true, message: '请先上传封面大图' }],

      // },
      id: this.$route.params && this.$route.params.id,
      dataarr: [
        {
          type: 'input',
          value: '',
          placeholder: '提示',
          label: '字段名称',
          name: 'a',
        },
        {
          type: 'input',
          value: '',
          placeholder: '提示',
          label: '字段名称1',
          name: 'a',
        },
        {
          type: 'select',
          value: '',
          placeholder: '提示',
          label: '字段名称',
          name: 'b',
          data: [
            {
              key: '选项一',
              val: '1'
            }, {
              key: '选项2',
              val: '2'
            },
          ]
        }, {
          type: 'time',
          value: '',
          placeholder: '提示',
          label: '字段名称',
          name: 'c',
        },
        {
          type: 'textarea',
          value: '',
          placeholder: '提示',
          label: '字段名称',
          name: 'd',
        },
        {
          type: 'texteditor',
          value: '',
          placeholder: '提示',
          label: '字段名称',
          name: 'e',
        }, {
          type: 'upload',
          value: '',
          placeholder: '提示',
          label: '字段名称',
          name: 'f',
        },
        {
          type: 'radio',
          value: '',
          placeholder: '提示',
          label: '字段名称',
          name: 'g',
          radio: [{
            label: "公开",
            value: "0",
            selected: "1"
          },
          {
            label: "公正",
            value: "1",
            selected: "0"
          }]
        },

      ],
      dome: {
        domains: {},
      },
    }
  },
  created () {

  },
  methods: {
    onSubmit () {

      for (var i = 0; i < this.dataarr.length; i++) {
        this.$set(this.dome.domains, this.dataarr[i].name, this.dataarr[i].value)
      }


    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange (file, fileList) {
      this.fileList3 = fileList.slice(-3);
    }
  }
}
</script>
<style lang="scss" scope>
#ly .el-select,
#ly .el-select .el-input {
  width: 100px;
}

#auth {
  width: 396px;
}
.el-textarea__inner {
  width: 500px;
  height: 200px;
}
</style>