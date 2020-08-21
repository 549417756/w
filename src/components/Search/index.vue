
<template>
  <div>
    <div class="filter-title">数据筛选</div>
    <div class="filter-container">
      <span class="filter-item">输入搜索：</span>
      <slot></slot>
    </div>
  </div>

</template>

<script>
import { debounce } from '@/utils'
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      filterQuery: {
        search: null
      }
    }
  },
  watch: {
    filterQuery: {
      handler: 'filter',
      deep: true
    }
  },
  methods: {
    filter: debounce(function () {
      this.$emit('filter', this.filterQuery)
    }, 500)
  }
}
</script>

<style lang="scss">
.filter-title {
  height: 45px;
  line-height: 45px;
  padding: 0 20px;
  background-color: #fff;
  border: 1px solid #dfe6ec;
  border-bottom: none;
}


</style>
