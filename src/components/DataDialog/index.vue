<template>
  <el-dialog
    v-el-drag-dialog
    center
    :title="title"
    :visible.sync="visible"
  >
    <slot></slot>
    <div slot="footer" class="dialog-footer">
      <template>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleValidate">确定</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleValidate() {
      this.$parent.handleValidate()
    },
    show() {
      this.visible = true
    },
    hidden() {
      this.visible = false
    }
  }
}
</script>

<style lang='scss' scoped>
/deep/ {
  .el-button {
    padding: 10px 20px;
  }
}
</style>
