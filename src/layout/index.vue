<template>
  <div class="app-wrapper">
    <header-view />
    <sidebar class="sidebar-container" />
    <div class="hasTagsView main-container">
      <div class="fixed-header">
        <navbar />

      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar, HeaderView } from './components'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    HeaderView
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 56px;
  right: 0;
  z-index: 3;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
.fixed-header.active {
  position: fixed;
  top: 56px;
  right: 0;
  z-index: 3;
  width: calc(100% - 85px);
  transition: width 0.28s;
}
</style>
