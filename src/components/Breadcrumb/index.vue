<template>
  <el-breadcrumb class="app-breadcrumb"
                 separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList"
                          :key="item.path">
        <span v-if="index===levelList.length-1"
              class="no-redirect">{{ item.meta.title }}</span>
        <router-link v-else
                     :to="item.path">{{ item.meta.title }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>

export default {
  data () {
    return {
      levelList: []
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/', meta: { title: '系统首页' } }].concat(matched)
      }

      this.levelList = matched
    },
    isDashboard (route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'explainSystem'.toLocaleLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 15px;
  line-height: 40px;
  margin-left: 15px;
  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all 0.5s;
  }
  .breadcrumb-enter,
  .breadcrumb-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }
  .breadcrumb-leave-active {
    position: absolute;
  }
}
</style>
