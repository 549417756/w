<template>
  <div class="app-container">
    <el-steps :active="active" finish-status="success" style="margin:0 100px; margin-bottom:50px">
      <el-step title="上传文件"></el-step>
      <el-step title="执行导入"></el-step>
      <el-step title="导入完成"></el-step>
    </el-steps>
    <div v-show="importShow==1">
      <div class="box-head">
        <div class="item-ioc">
          <i class="el-icon-download ioc" style="color:#1296DB"></i>
        </div>
        <div class="item-txt">
          <h3 style="margin-left:20px">填写导入信息</h3>
          <p style="margin-left:20px">请按照数据模板的格式准备导入数据，模板中的表头名称不可更改，表头行不能删除</p>
          <span style="margin-left:20px; color:#7280e6; cursor: pointer;">
            <a :href="templateUlr" download class="downLoad-btn">下载模板</a>
          </span>
        </div>
      </div>
      <div class="box-head">
        <div class="item-ioc">
          <i class="el-icon-upload ioc" style="color:#1296DB"></i>
        </div>
        <div class="item-txt">
          <h3 style="margin-left:20px">上传填好的信息表</h3>
          <p style="margin-left:20px">文件后缀名必须为xls 或xlsx （即Excel格式），文件大小不得大于10M</p>
          <el-upload
            :limit="limitNum"
            :auto-upload="false"
            accept=".xlsx, .xls"
            action=""
            :on-exceed="exceedFile"
            :on-change="importExcel"
            :file-list="fileList"
            :on-remove="removeFile"
          >
            <span style="margin-left:20px; color:#FE9400; cursor: pointer;">上传文件</span>
          </el-upload>
        </div>
      </div>
      <div style="margin: 0 200px;">
        <el-alert
          v-for="(item,index) in repeatData"
          :key="index"
          :title="'表中'+ index +'内容重复   ' + item + '   请修改'"
          type="error"
        >
        </el-alert>
      </div>
      <div v-if="!inputPas" class="box-head">
        <div class="item-ioc">
          <i class="el-icon-key ioc" style="color:red"></i>
        </div>
        <div class="item-txt">
          <h3 style="margin-left:20px">初始密码 (8-20位字符, 不允许输入空格)</h3>
          <el-input
            v-model="form.password"
            placeholder="设置初始密码"
            style="margin-left:20px;width:300px"
            type="password"
          ></el-input>
        </div>
      </div>
      <div class="but-click">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="uploadFile">确定</el-button>
      </div>
    </div>
    <div v-show="importShow==2">
      <div class="box-head" style="height: 100px;">
        <div class="item-ioc">
          <i class="el-icon-success import-ioc" style="color:#52C41A"></i>
        </div>
        <div class="item-txt">
          <p style="margin-left:20px">本次可导入文件数量：</p>
          <span style="margin-left:20px; color:#7280e6; cursor: pointer;">
            {{ okLength }}
          </span>
        </div>
      </div>
      <div class="box-head" style="height: 100px;">
        <div class="item-ioc">
          <i class="el-icon-error import-ioc" style="color:#D81E06"></i>
        </div>
        <div class="item-txt">
          <p style="margin-left:20px">本次不可导入文件数量：</p>
          <span style="margin-left:20px; color:#7280e6; cursor: pointer;">
            {{ errLength }}
          </span>
        </div>
      </div>
      <div class="but-click">
        <el-button type="primary" @click="dataImport">继续上传</el-button>
        <el-button @click="importShow = 1,active = 0">重新上传</el-button>
      </div>
      <div>
        <el-table
          class="table"
          :data="errContent"
        >
          <el-table-column
            v-for="{prop,label} in errArr"
            :key="prop"
            align="center"
            :prop="prop"
            :label="label"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <div v-show="importShow ==3">
      <div class="import-ok">
        <div class="item-ioc">
          <i class="el-icon-success" style="color:#52C41A; font-size: 100px;"></i>
        </div>
        <h2>批量导入完成</h2>
        <span>成功导入数量:{{ okLength }}人，默认密码:{{ form.password ? form.password: '暂无' }}</span>
        <p>
          <el-button type="primary" @click="cancel">完成</el-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import Vue from 'vue'
export default {
  props: {
    checkMethods: {
      type: String,
      default: ''
    },
    importMethods: {
      type: String,
      default: ''
    },
    errArr: {
      type: Array,
      default() {
        return []
      }
    },
    templateUlr: {
      type: String,
      default: ''
    },
    checkData: {
      type: Array,
      default() {
        return []
      }
    },
    // 学生成绩导入不需要输入学生密码
    inputPas: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 0,
      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [], // excel文件列表
      importShow: 1,
      repeatData: {},
      form: {
        data: [],
        password: ''
      },
      errContent: [],
      okContent: [],
      errLength: '',
      okLength: ''
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    UploadUrl: function() {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return ''
    },
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$message.warning(
        `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`
      )
    },
    // 移除文件的时候
    removeFile(file, fileList) {
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      this.fileList.push(file.raw)
    },
    // 点击确定
    uploadFile() {
      console.log('this.form is', this.form)
      if (this.form.data.length === 0) {
        this.$message.error('请确定文件类型是否正确文件按内容是否为空')
      } else if (Object.keys(this.repeatData).length !== 0) {
        this.$message.error('请将文件内重复字段去除')
      } else if (this.form.password === '' && this.inputPas === false) {
        this.$message.error('请填写初始密码')
      } else {
        this.errContent = []
        this.$http[this.checkMethods](this.form).then(response => {
          console.log('this.form is', this.form)
          if (response.code === 200) {
            this.errContent = response.data.errorData
            // 因为时间格式有问题 这里是处理时间格式的 后台做了处理 这里注销吧
            // for (let i = 0; i < this.errContent.length; i++) {
            //   if (this.errContent[i].register_time) {
            //     const dateee = new Date(this.errContent[i].register_time).toJSON()
            //     const date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            //     this.errContent[i].register_time = date.slice(0, date.length - 9)
            //   }
            // }
            this.okContent = response.data.successData
            this.errLength = response.data.errorData.length
            this.okLength = response.data.successData.length
            this.importShow = 2
            this.active = 1
          }
        })
      }
    },
    // 点击继续上传
    dataImport() {
      this.$http[this.importMethods]({ data: this.okContent, password: this.form.password }).then(response => {
        this.$message.warning(response.msg)
        if (response.code === 200) {
          this.importShow = 3
          this.active = 3
        }
      })
    },
    // 检查重复数据的函数
    cycle(par, prompt) {
      // 把数组中的重复函数提取到[...new Set(filterUnique(par))]里面
      const filterUnique = par => par.filter(i => par.indexOf(i) !== par.lastIndexOf(i))
      const parData = []
      for (let i = 0; i < [...new Set(filterUnique(par))].length; i++) {
        if ([...new Set(filterUnique(par))][i] !== undefined) {
          parData.push([...new Set(filterUnique(par))][i])
        }
      }
      if (parData.length !== 0) {
        // 利用set方法去重 并且把放进this.repeatData对象里面
        Vue.set(this.repeatData, prompt, parData)
      }
    },
    importExcel(file) {
      // let file = file.files[0] // 使用传统的input方法需要加上这一步
      const types = file.name.split('.')[1]
      const fileType = ['xlsx', 'xls'].some(item => item === types)
      this.form.data = []
      this.repeatData = {}
      for (const item in this.checkData) {
        this[this.checkData[item].name] = []
      }
      if (!fileType) {
        this.$message.error('格式错误！请重新选择')
      } else {
        this.file2Xce(file).then(tabJson => {
          if (tabJson && tabJson.length > 0) {
            for (const page in tabJson) {
              for (const item in tabJson[page]) {
                for (const item1 in tabJson[page][item]) {
                  if (typeof (tabJson[page][item][item1]) === 'object') {
                    // 把表格里所有的对象提取出来
                    this.form.data.push(tabJson[page][item][item1])
                    // 把你需要检查重复的数据提取到一个数组里
                    for (const data in this.checkData) {
                      this[this.checkData[data].name].push(tabJson[page][item][item1][this.checkData[data].check])
                    }
                  }
                }
              }
            }
          }
          // 循环调用你要检查重复的数组数据 比如: 手机号 工号之类的
          for (const item in this.checkData) {
            this.cycle(this[this.checkData[item].name], this.checkData[item].prompt)
          }
        })
      }
    },
    file2Xce(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        reader.onload = function(e) {
          const data = e.target.result
          this.wb = XLSX.read(data, {
            type: 'binary',
            cellDates: true
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
        // reader.readAsBinaryString(file) // 传统input方法
      })
    }
  }
}
</script>
<style scoped>
.importBox {
  width: 97%;
  margin: 0 auto;
}
.box-head {
  display: flex;
  border: 1px solid #e9e9e9;
  margin: 0 200px;
  height: 150px;
  margin-top: 30px;
}
.item-ioc {
  display: flex;
  border-right: 1px solid #e9e9e9;
  width: 150px;
  justify-content: center;
  align-items: center;
}
.item-txt {
  width: 90%;
}
.but-click {
  margin-top: 20px;
  width: 300px;
  margin-left: 50%;
  transform: translateX(-75px);
}
.ioc {
  display: inline-block;
  font-size: 70px;
}
.import-ioc {
  display: inline-block;
  font-size: 50px;
}
.table {
  margin: 0 auto;
  max-width: 1200px;
  margin-top: 30px;
}
.import-ok {
  display: flex;
  margin-top: 100px;
  align-items: center;
  flex-direction: column;
}
</style>
