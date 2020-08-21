<template>
  <el-table
    v-loading="listLoading"
    :data="list"
    stripe
    border
    @selection-change="change"
  >
    <slot name="selection"></slot>
    <template v-for="(field, index) in tableFields">
      <el-table-column v-if="field.prop === 'actions'" :key="index" v-bind="field" align="center">
        <template slot-scope="{row}">
          <slot :row="row"></slot>
        </template>
      </el-table-column>
      <el-table-column v-else :key="index" v-bind="field" align="center"></el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableFields: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      listLoading: true
    }
  },
  watch: {
    list() {
      this.listLoading = false
    }
  },
  methods: {
    change(val) {
      this.$emit('change', val)
    }
  }
}
</script>
