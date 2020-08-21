<template>
  <div>
    <logo />
    <el-radio-group v-model="isCollapse">
      <el-radio-button :label="false"
                       icon="el-icon-search"
                       v-show="isCollapse"
                       @click="sq()">

        <i class="el-icon-d-arrow-right"
           @click="zk()"></i>
      </el-radio-button>

      <el-radio-button :label="true"
                       icon="el-icon-search"
                       v-show="!isCollapse"
                       @click="zk()">
        <i class="el-icon-d-arrow-left"
           @click="sq()"></i>
      </el-radio-button>
    </el-radio-group>
    <el-scrollbar wrap-class="scrollbar-wrapper">

      <el-menu :default-active="activeMenu"
               :background-color="variables.menuBg"
               :text-color="variables.menuText"
               :unique-opened="true"
               :active-text-color="variables.menuActiveText"
               :collapse-transition="true"
               :collapse="isCollapse"
               @open="handleOpen"
               @close="handleClose">
        <sidebar-item v-for="route in permission_routes"
                      :key="route.path"
                      :item="route"
                      :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
export default {
  data () {
    return {
      isCollapse: false,
      aa: '222'
    }

  },
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(['permission_routes']),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables () {
      return variables
    }
  },
  methods: {
    zk () {
      // alert('展开')
      var side = document.getElementsByClassName("sidebar-container");
      side[0].style.width = 250 + 'px'

      var mian = document.getElementsByClassName('main-container');
      mian[0].style.marginLeft = 250 + 'px'
      $('.fixed-header').removeClass('active')
    },
    sq () {
      // alert('收起')
      var side = document.getElementsByClassName("sidebar-container");
      side[0].style.width = 85 + 'px'
      var mian = document.getElementsByClassName('main-container');
      mian[0].style.marginLeft = 85 + 'px'
      $('.fixed-header').addClass('active')
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style type="text/css" scope>
.el-radio-button__inner {
  padding: 0;
  border: none;
  background: none;
}
/* .el-radio-group {
  position: absolute;
  z-index: 2;
  top: 0px;
  right: 0;
  width: 15px;
  height: 15px;
} */
.sidebar-container {
  overflow: inherit !important;
  z-index: 5;
}
.el-radio-button:first-child .el-radio-button__inner {
  border: none;
}
/* .el-icon-d-arrow-left:before,
.el-icon-d-arrow-right:before {
  color: #fff;
} */
/* .el-tooltip,
.el-submenu__title {
  padding: 0 !important;
} */
</style>