<template>
  <div :class="{'has-logo':showLogo}" style="margin-top: 50px">
    <!--<logo v-if="showLogo" :collapse="isCollapse" />-->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="true"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
        <template v-for="menu in $store.state.user.routers">
          <sidebar-item  v-for="route in menu.children || []" :key="route.path" :item="route" :base-path="route.meta.fullPath"/>
        </template>
        <!--<el-menu-tree-->
                <!--v-for="menu in $store.state.user.routers"-->
                <!--:menus="menu.children||[]"-->
                <!--:key="menu.path"-->
        <!--&gt;-->
        <!--</el-menu-tree>-->
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import ElMenuTree from './ElMenuTree'

export default {
  components: { SidebarItem, Logo, ElMenuTree},
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
    methods:{

    },
}
</script>