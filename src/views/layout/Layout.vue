<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <div class="sidebar-container" @mouseover="mouseover()" @mouseout="mouseleve()">
      <div class="jss959">
        <logo></logo>
        <sidebar></sidebar>
      </div>
      <div class="jss960"></div>
    </div>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, Logo } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  data() {
    return {
      isOpen: false
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Logo
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    mouseover() {
      if (!this.sidebar.opened) {
        this.isOpen = true
        this.$store.dispatch('ToggleSideBar')
      }
    },
    mouseleve() {
      if (this.isOpen) {
        this.$store.dispatch('ToggleSideBar')
        this.isOpen = false
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
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
  .jss959{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    padding: 10px;
    display: block;
    position: absolute;
    background-color:rgba(0, 0, 0, 0.8);
    
  }
  .jss960{
    background: url("../../assets/img/sidebar.jpg");
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: block;
    position: absolute;
    transition: all 300ms linear;
    background-size: cover;
    background-position: center center;
  }
</style>
