<template>
  <el-form
    ref="form"
    :rules="rules"
    :model="ruleForm"
    label-position="left"
    label-width="120px"
  >
    <slot></slot>
  </el-form>
</template>

<script>
export default {
  props: {
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    ruleForm: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    clear() {
      this.$refs['form'].clearValidate()
    },
    validate() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('createData')
        }
      })
    }
  }
}
</script>

<style>

</style>
