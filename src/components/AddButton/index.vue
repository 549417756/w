<template>
  <el-button class="float-btn" :icon="icon" style="position:relative">{{ text }}</el-button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '添加'
    },
    icon: {
      type: String,
      default: 'el-icon-plus'
    }
  }
}
</script>

<style>
.float-btn {
  float:right;
  top:20px;
  right:30px;
}
</style>
