<template>
  <el-form
    ref="dataForm"
    :label-width="labelWidth"
    label-position="left"
    :rules="rules"
  >
    <el-form-item :label="label" class="form-style" :prop="status?'area':''">
      <el-select
        v-model="provinceData"
        placeholder="省"
        :class="label=='' ? '': 'input'"
        clearable
        :disabled="pushShow && !(chooseShow =='school')"
        @change="chooseArea('city',provinceData)"
      >
        <el-option
          v-for="item in province"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select
        v-model="cityData"
        placeholder="市"
        :class="label=='' ? '': 'input'"
        clearable
        :disabled="pushShow && !(chooseShow =='school')"
        @change="chooseArea('area',cityData)"
      >
        <el-option
          v-for="item in city"
          :key="item.value"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select
        v-model="areaeData"
        placeholder="县"
        :class="label=='' ? '': 'input'"
        clearable
        :disabled="pushShow && !(chooseShow =='school')"
        @change="chooseArea(' ',areaeData)"
      >
        <el-option
          v-for="item in area"
          :key="item.value"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: '50px'
    },
    operation: {
      type: String,
      default: ''
    },
    regionProvince: {
      type: Number,
      default: 0
    },
    regionArea: {
      type: Number,
      default: 0
    },
    regionCity: {
      type: Number,
      default: 0
    },
    // 判断组件是否是必填项
    status: {
      type: Boolean,
      default: false
    },
    // 判断组件是是否可选
    chooseShow: {
      type: String,
      default: ''
    },
    // 判断组件是是否可选
    pushShow: {
      type: Boolean
    }
  },
  data() {
    return {
      provinceData: '',
      cityData: '',
      areaeData: '',
      province: [
        { id: 1, name: '北京' },
        { id: 2, name: '天津' },
        { id: 3, name: '河北' },
        { id: 4, name: '山西' },
        { id: 5, name: '内蒙古' },
        { id: 6, name: '辽宁' },
        { id: 7, name: '吉林' },
        { id: 8, name: '黑龙江' },
        { id: 9, name: '上海' },
        { id: 10, name: '江苏' },
        { id: 11, name: '浙江' },
        { id: 12, name: '安徽' },
        { id: 13, name: '福建' },
        { id: 14, name: '江西' },
        { id: 15, name: '山东' },
        { id: 16, name: '河南' },
        { id: 17, name: '湖北' },
        { id: 18, name: '湖南' },
        { id: 19, name: '广东' },
        { id: 20, name: '广西' },
        { id: 21, name: '海南' },
        { id: 22, name: '重庆' },
        { id: 23, name: '四川' },
        { id: 24, name: '贵州' },
        { id: 25, name: '云南' },
        { id: 26, name: '西藏' },
        { id: 27, name: '陕西' },
        { id: 28, name: '甘肃' },
        { id: 29, name: '青海' },
        { id: 30, name: '宁夏' },
        { id: 31, name: '新疆' },
        { id: 32, name: '台湾' },
        { id: 33, name: '香港' },
        { id: 34, name: '澳门' },
        { id: 35, name: '海外' },
        { id: 36, name: '其他' }
      ],
      city: [],
      area: [],
      rules: {
        area: [{ required: true, message: '请选择区域', trigger: 'blur' }]
      }
    }
  },
  watch: {
    provinceData() {
      this.cityData = ''
      this.areaeData = ''
      this.city = []
      this.area = []
    },
    operation: {
      handler(newName, oldName) {
        if (newName === 'remove') {
          this.provinceData = ''
          this.cityData = ''
          this.areaeData = ''
        } else if (newName === 'edit') {
          this.eidtQuery('city', this.regionProvince)
          this.eidtQuery('area', this.regionCity)
          this.provinceData = this.regionProvince
        }
      },
      immediate: true
    }
  },
  mounted() {
  },
  methods: {
    chooseArea(area, item) {
      if (area === 'area') {
        this.areaeData = ''
        this.area = []
      }
      if (item !== '') {
        this.$http.fetchAreaList({ pid: item }).then(response => {
          this[area] = response.data
        })
      }
      const parameter =
        area === 'city' ? 'province' : area === 'area' ? 'city' : 'area'
      // 每次点击父组件根据这里传递的参数请求列表
      this.$emit('provinceList', { parameter, item })
    },
    // 点击编辑自动请求默认的省市县数据
    eidtQuery(area, item) {
      this.$http.fetchAreaList({ pid: item }).then(response => {
        this[area] = response.data
        if (this.operation === 'edit' && this.city.length > 0 && this.area.length) {
          this.cityData = this.regionCity
          this.areaeData = this.regionArea
        }
      })
    }
  }
}
</script>
<style scoped>
.input {
  width: 120px!important;
}
.form-style {
  margin-top: 15px;
}
</style>
