<template>
  <el-container>
    <el-header class="nav-container">
      <navbar :navIndex="1" @nav-items-click="navClick"></navbar>
    </el-header>
    <el-container>
      <el-aside width="auto" class="aside-container">
        <sidebar :items="sidebarItems" mainRouter="background"></sidebar>
      </el-aside>
      <el-main id="main-container" style="padding:15px;">
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['backgroundRouter']),
    sidebarItems () {
      return this.backgroundRouter.children
    }
  },
  methods: {
    navClick (index) {}
  }
}
</script>

<style lang="scss" scoped>
@import './styles/common.scss';
.el-container {
  height: 100%;
  overflow: hidden;
}
.nav-container {
  padding: 0;
  box-shadow: 0px 1px 2px #dbdbdb;
  z-index: 100;
  min-width: 1200px;
}
.aside-container {
  position: relative;
  background-color: #2d3037;
  box-sizing: border-box;
  border-right: solid 1px #e6e6e6;
  overflow: visible;
}
.quick-add {
  height: 178px;
}
</style>
