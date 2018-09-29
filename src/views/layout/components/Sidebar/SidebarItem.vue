<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">

      <el-menu-item :index="item.name" v-if="item.type==='item'" @click="showMenu(item,item.name)">
        <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
      <!--submenu菜单:hiddenMenu:false-->
      
        <el-submenu :index="item.name" v-else-if="item.type==='submenu' && !item.meta.hiddenMenu">
                <template slot="title">
                  <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
                  <span>{{item.meta.title}}</span>
                </template>
                <template v-for="submenuitem in item.children">
                  <el-menu-item :index="submenuitem.name" @click="showMenu(submenuitem,submenuitem.name)" v-if="!submenuitem.meta.hidden">
                    <svg-icon v-if="submenuitem.meta.icon" :icon-class="submenuitem.meta.icon"></svg-icon>
                    <span slot="title">{{submenuitem.meta.title}}</span>
                  </el-menu-item>
                </template>
        </el-submenu>
      
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showMenu(menu, path) {
      if (menu['meta'].hasOwnProperty('url')) {
        window.open(`${menu['meta']['url']}?trackId=${this.$store.state.user.token}`)
      } else {
        this.$router.push({ name: path })
      }
    },
    switchMenu(type) {
      this.$store.dispatch('SetCurrentMenu', type)
    }
  }
}
</script>


